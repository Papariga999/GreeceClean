import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

const PARTNERS_EMAIL = 'partners@greececlean.gr'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Simple in-process rate limiter: max 5 requests per IP per 10 minutes.
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT
}

type Body = {
  name?: string
  org?: string
  role?: string
  email?: string
  interest?: string
  region?: string
  message?: string
  consent?: boolean
  company?: string
}

function buildHtml(b: Required<Omit<Body, 'consent' | 'company'>> & { consentAt: string }): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;background:#F9FAFB;font-weight:600;color:#374151;font-size:13px;width:140px">${label}</td><td style="padding:6px 12px;color:#1F2937;font-size:13px">${value || '—'}</td></tr>`

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>body{font-family:Inter,ui-sans-serif,sans-serif;background:#F2F7FB;margin:0;padding:24px}
.wrap{max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E0EAF4}
.head{background:#0D6FDB;color:#fff;padding:24px 28px}.head h1{margin:0;font-size:20px;font-weight:800}
.head p{margin:4px 0 0;font-size:13px;color:#A6C7F7}
table{width:100%;border-collapse:collapse;margin:16px 0}
tr:nth-child(even) td{background:#fff}
.foot{padding:16px 28px;background:#F9FAFB;font-size:11px;color:#9CA3AF}</style></head>
<body>
<div class="wrap">
  <div class="head">
    <h1>New partner enquiry</h1>
    <p>GreeceClean · ${new Date().toISOString()}</p>
  </div>
  <div style="padding:0 28px">
    <table>
      ${row('Name', b.name)}
      ${row('Organisation', b.org)}
      ${row('Role', b.role)}
      ${row('Email', b.email)}
      ${row('Interest', b.interest)}
      ${row('Region', b.region)}
    </table>
    <div style="padding:12px 0;border-top:1px solid #F3F4F6">
      <p style="font-size:13px;font-weight:600;color:#374151;margin:0 0 6px">Message</p>
      <p style="font-size:14px;color:#1F2937;line-height:1.6;margin:0;white-space:pre-wrap">${b.message}</p>
    </div>
    <p style="font-size:11px;color:#9CA3AF;margin:12px 0;padding-top:12px;border-top:1px solid #F3F4F6">
      GDPR consent recorded: ${b.consentAt}
    </p>
  </div>
  <div class="foot">GreeceClean partner enquiry — reply directly to ${b.email}</div>
</div>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: Body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Honeypot — treat as success without sending
  if (body.company) {
    return NextResponse.json({ ok: true })
  }

  // Validate required fields
  const { name, org, email, interest, message, consent } = body
  if (!name?.trim() || !org?.trim() || !interest?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 422 })
  }
  if (!email?.trim() || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 422 })
  }
  if (!consent) {
    return NextResponse.json({ error: 'consent_required' }, { status: 422 })
  }

  const consentAt = new Date().toISOString()

  try {
    await sendEmail({
      to: PARTNERS_EMAIL,
      subject: `Partner enquiry: ${name?.trim()} — ${org?.trim()}`,
      html: buildHtml({
        name: name!.trim(),
        org: org!.trim(),
        role: body.role?.trim() ?? '',
        email: email!.trim(),
        interest: interest!.trim(),
        region: body.region?.trim() ?? '',
        message: message!.trim(),
        consentAt,
      }),
    })
  } catch (e) {
    console.error('[partners/contact] email send failed:', e)
    return NextResponse.json({ error: 'send_failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
