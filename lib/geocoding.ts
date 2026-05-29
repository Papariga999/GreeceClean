export type GeocodeResult = {
  municipalityName: string
  municipalityId: string | null
}

type NominatimAddress = {
  municipality?: string
  city?: string
  town?: string
  village?: string
  hamlet?: string
  city_district?: string
  suburb?: string
  county?: string
  state_district?: string
  state?: string
}

type NominatimResponse = {
  address?: NominatimAddress
}

type CacheEntry = {
  result: GeocodeResult
  expiresAt: number
}

type ReverseGeocodeProvider = {
  name: string
  reverse(lat: number, lng: number): Promise<GeocodeResult>
}

const NOMINATIM = 'https://nominatim.openstreetmap.org/reverse'
const USER_AGENT = process.env.NOMINATIM_USER_AGENT ?? 'GreeceClean/1.0 (contact@greececlean.gr)'
const CACHE_TTL_MS = 24 * 60 * 60 * 1000
const CACHE_MAX = 500
const REQUEST_SPACING_MS = 1100

const cache = new Map<string, CacheEntry>()
let queue = Promise.resolve()
let lastRequestAt = 0

function roundedKey(lat: number, lng: number): string {
  return `${lat.toFixed(4)},${lng.toFixed(4)}`
}

function setCache(key: string, result: GeocodeResult) {
  if (cache.size >= CACHE_MAX) {
    const oldestKey = cache.keys().next().value as string | undefined
    if (oldestKey) cache.delete(oldestKey)
  }
  cache.set(key, { result, expiresAt: Date.now() + CACHE_TTL_MS })
}

function getCache(key: string): GeocodeResult | null {
  const entry = cache.get(key)
  if (!entry) return null
  if (entry.expiresAt <= Date.now()) {
    cache.delete(key)
    return null
  }

  cache.delete(key)
  cache.set(key, entry)
  return entry.result
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function runQueued<T>(task: () => Promise<T>): Promise<T> {
  const previous = queue
  let release: () => void
  queue = new Promise<void>((resolve) => { release = resolve })

  await previous
  try {
    const elapsed = Date.now() - lastRequestAt
    if (elapsed < REQUEST_SPACING_MS) {
      await sleep(REQUEST_SPACING_MS - elapsed)
    }
    lastRequestAt = Date.now()
    return await task()
  } finally {
    release!()
  }
}

export function normalizeGreekName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('el-GR')
    .replace(/^δημος\s+/u, '')
    .replace(/^κοινοτητα\s+/u, '')
    .replace(/[’'`´]/g, '')
    .replace(/[\s\-.]+/g, ' ')
    .trim()
}

export function pickMunicipalityName(address: NominatimAddress = {}): string {
  return (
    address.municipality ??
    address.city ??
    address.town ??
    address.village ??
    address.hamlet ??
    address.city_district ??
    address.suburb ??
    address.county ??
    address.state_district ??
    address.state ??
    ''
  )
}

async function fetchNominatim(lat: number, lng: number, zoom: 10 | 8): Promise<NominatimResponse | null> {
  const url = new URL(NOMINATIM)
  url.searchParams.set('lat', String(lat))
  url.searchParams.set('lon', String(lng))
  url.searchParams.set('format', 'json')
  url.searchParams.set('accept-language', 'el')
  url.searchParams.set('zoom', String(zoom))

  const res = await runQueued(() => fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
    cache: 'no-store',
  }))

  if (!res.ok) throw new Error(`Nominatim ${res.status}`)
  return (await res.json()) as NominatimResponse
}

const nominatimProvider: ReverseGeocodeProvider = {
  name: 'nominatim',
  async reverse(lat, lng) {
    const primary = await fetchNominatim(lat, lng, 10)
    const primaryName = pickMunicipalityName(primary?.address)
    if (primaryName) return { municipalityName: primaryName, municipalityId: null }

    const wide = await fetchNominatim(lat, lng, 8)
    const wideName = pickMunicipalityName(wide?.address)
    return { municipalityName: wideName, municipalityId: null }
  },
}

function getProvider(): ReverseGeocodeProvider {
  const provider = process.env.GEOCODER_PROVIDER ?? 'nominatim'
  if (provider !== 'nominatim') {
    console.warn(`Unsupported GEOCODER_PROVIDER "${provider}", falling back to Nominatim`)
  }
  return nominatimProvider
}

export async function reverseGeocode(lat: number, lng: number): Promise<GeocodeResult> {
  const key = roundedKey(lat, lng)
  const cached = getCache(key)
  if (cached) return cached

  try {
    const result = await getProvider().reverse(lat, lng)
    setCache(key, result)
    return result
  } catch (err) {
    console.warn('reverseGeocode failed:', err)
    const empty = { municipalityName: '', municipalityId: null }
    setCache(key, empty)
    return empty
  }
}
