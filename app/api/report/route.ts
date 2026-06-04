import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { normalizeGreekName, reverseGeocode } from '@/lib/geocoding'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { VALID_CATEGORIES } from '@/lib/categories'
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/lib/i18n/types'
import { localizedHref } from '@/lib/i18n/routing'

const MAX_BYTES = 500 * 1024 // 500 KB per image
const STORAGE_BUCKET = 'reports'
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000

function reportRateLimitPerHour(): number {
  const parsed = Number.parseInt(process.env.REPORT_RATE_LIMIT_PER_HOUR ?? '10', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 10
}

async function compressImage(raw: Buffer): Promise<Buffer> {
  const attempts = [
    { width: 1920, quality: 80 },
    { width: 1200, quality: 65 },
    { width: 900,  quality: 50 },
    { width: 700,  quality: 30 },
  ] as const

  for (const { width, quality } of attempts) {
    const buf = await sharp(raw)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer()
    if (buf.length <= MAX_BYTES) return buf
  }

  throw new Error('Image cannot be compressed below 500 KB')
}

function originOf(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-host')
  const proto = req.headers.get('x-forwarded-proto') ?? 'http'
  if (forwarded) return `${proto}://${forwarded}`
  return req.nextUrl.origin
}

function trackingUrl(req: NextRequest, token: string, locale: Locale): string {
  return `${originOf(req)}${localizedHref(locale, `/r/${token}`)}`
}

async function resolveMunicipalityId(name: string): Promise<string | null> {
  const normalizedName = normalizeGreekName(name)
  if (!normalizedName) return null

  const { data: municipalities, error } = await supabaseAdmin
    .from('municipalities')
    .select('id, name_el')

  if (error) {
    console.warn('Municipality lookup failed:', error)
    return null
  }

  const rows = municipalities ?? []
  const exact = rows.find((m) => normalizeGreekName(m.name_el) === normalizedName)
  if (exact) return exact.id

  const partial = rows.find((m) => {
    const candidate = normalizeGreekName(m.name_el)
    return candidate.includes(normalizedName) || normalizedName.includes(candidate)
  })
  if (partial) return partial.id

  const { data: created, error: createError } = await supabaseAdmin
    .from('municipalities')
    .insert({ name_el: name.slice(0, 255), name_en: '', name_de: '', is_auto_created: true })
    .select('id')
    .single()

  if (createError) {
    const { data: fallback } = await supabaseAdmin
      .from('municipalities')
      .select('id')
      .eq('name_el', name.slice(0, 255))
      .maybeSingle()
    return fallback?.id ?? null
  }

  return created?.id ?? null
}

async function cleanupUploadedImages(paths: string[]): Promise<void> {
  if (paths.length === 0) return
  const { error } = await supabaseAdmin.storage.from(STORAGE_BUCKET).remove(paths)
  if (error) {
    console.error('Storage cleanup error:', error)
  }
}

export async function POST(req: NextRequest) {
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid request body', code: 'invalid_request_body' }, { status: 400 })
  }

  // ── Honeypot ───────────────────────────────────────────────────────────────
  const requestedLocale = formData.get('locale')?.toString()
  const locale = isLocale(requestedLocale) ? requestedLocale : DEFAULT_LOCALE
  const honeypot = formData.get('hp_field')?.toString() ?? ''
  if (honeypot.trim() !== '') {
    const fakeToken = crypto.randomUUID().replace(/-/g, '').slice(0, 12)
    return NextResponse.json({
      token: fakeToken,
      trackingUrl: trackingUrl(req, fakeToken, locale),
    })
  }

  const rate = checkRateLimit(`report:${getClientIp(req.headers)}`, {
    limit: reportRateLimitPerHour(),
    windowMs: RATE_LIMIT_WINDOW_MS,
  })
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.', code: 'rate_limited' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rate.retryAfterSeconds),
          'X-RateLimit-Limit': String(rate.limit),
          'X-RateLimit-Remaining': String(rate.remaining),
        },
      },
    )
  }

  // ── Input validation ───────────────────────────────────────────────────────
  const imageFiles = [
    formData.get('image')  as File | null,
    formData.get('image2') as File | null,
    formData.get('image3') as File | null,
  ].filter((f): f is File => f !== null && f.size > 0)

  const lat      = parseFloat(formData.get('lat')?.toString() ?? '')
  const lng      = parseFloat(formData.get('lng')?.toString() ?? '')
  const category = formData.get('category')?.toString() ?? ''
  const description = formData.get('description')?.toString().slice(0, 500) || null

  if (imageFiles.length === 0 || isNaN(lat) || isNaN(lng) || !category) {
    return NextResponse.json({ error: 'Missing required fields', code: 'missing_fields' }, { status: 400 })
  }

  if (!isFinite(lat) || !isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return NextResponse.json({ error: 'Invalid coordinates', code: 'invalid_coordinates' }, { status: 400 })
  }

  for (const f of imageFiles) {
    if (f.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image too large (max 10 MB)', code: 'image_too_large' }, { status: 413 })
    }
  }

  if (!VALID_CATEGORIES.includes(category)) {
    return NextResponse.json({ error: 'Invalid category', code: 'invalid_category' }, { status: 422 })
  }

  // ── Compress all images ────────────────────────────────────────────────────
  let compressedImages: Buffer[]
  try {
    compressedImages = await Promise.all(
      imageFiles.map(async (f) => {
        const raw = Buffer.from(await f.arrayBuffer())
        return compressImage(raw)
      })
    )
  } catch (err) {
    console.error('Image processing error:', err)
    return NextResponse.json({ error: 'Image processing failed', code: 'image_processing_failed' }, { status: 422 })
  }

  // ── Token & geocoding ──────────────────────────────────────────────────────
  const publicToken = crypto.randomUUID().replace(/-/g, '').slice(0, 12)
  const { municipalityName } = await reverseGeocode(lat, lng)

  // ── Stub mode ──────────────────────────────────────────────────────────────
  if (!isSupabaseConfigured) {
    console.info(`[stub] report ${publicToken} | ${municipalityName} | ${category} | ${compressedImages.length} image(s)`)
    return NextResponse.json({
      token: publicToken,
      trackingUrl: trackingUrl(req, publicToken, locale),
      _stub: true,
    })
  }

  // ── Upload all images + resolve municipality in parallel ───────────────────
  const storagePaths = compressedImages.map((_, i) =>
    i === 0 ? `${publicToken}.webp` : `${publicToken}_${i + 1}.webp`
  )

  const municipalityIdPromise = resolveMunicipalityId(municipalityName)
  const uploadedPaths: string[] = []

  for (let i = 0; i < compressedImages.length; i++) {
    try {
      const result = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .upload(storagePaths[i], compressedImages[i], { contentType: 'image/webp', upsert: false })

      if (result.error) {
        console.error('Storage upload error:', result.error)
        await cleanupUploadedImages(uploadedPaths)
        return NextResponse.json({ error: 'Storage error', code: 'storage_error' }, { status: 500 })
      }
      uploadedPaths.push(storagePaths[i])
    } catch (err) {
      console.error('Storage upload exception:', err)
      await cleanupUploadedImages(uploadedPaths)
      return NextResponse.json({ error: 'Storage error', code: 'storage_error' }, { status: 500 })
    }
  }

  const municipalityId = await municipalityIdPromise

  const imageUrls = storagePaths.map((path) =>
    supabaseAdmin.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl
  )

  // ── Insert report ──────────────────────────────────────────────────────────
  const { error: dbErr } = await supabaseAdmin.from('reports').insert({
    public_token:    publicToken,
    image_url:       imageUrls[0],
    image_urls:      imageUrls,
    lat,
    lng,
    category,
    status:          'pending',
    is_approved:     false,
    municipality_id: municipalityId,
    description,
  })

  if (dbErr) {
    console.error('DB insert error:', dbErr)
    await cleanupUploadedImages(uploadedPaths)
    return NextResponse.json({ error: 'Database error', code: 'database_error' }, { status: 500 })
  }

  return NextResponse.json({
    token:       publicToken,
    trackingUrl: trackingUrl(req, publicToken, locale),
  })
}
