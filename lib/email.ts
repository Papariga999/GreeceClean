import { Resend } from 'resend'

// Lazily initialised so the module can be imported in environments where
// RESEND_API_KEY is not set (e.g. during static builds) without throwing.
let _resend: Resend | null = null
let warnedFromDomain = false

function getClient(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error('RESEND_API_KEY is not set')
    _resend = new Resend(key)
  }
  return _resend
}

function emailDomain(from: string): string | null {
  const match = from.match(/@([^>\s]+)>?$/)
  return match?.[1]?.toLowerCase() ?? null
}

function warnIfFromDomainLooksUnverified(from: string) {
  if (warnedFromDomain) return
  warnedFromDomain = true

  const expected = process.env.RESEND_VERIFIED_DOMAIN?.trim().toLowerCase()
  const actual = emailDomain(from)
  if (!actual) {
    console.warn('[email] EMAIL_FROM does not include a parseable sender domain')
    return
  }
  if (!expected) {
    console.warn('[email] RESEND_VERIFIED_DOMAIN is not set; confirm SPF/DKIM are configured for', actual)
    return
  }
  if (actual !== expected) {
    console.warn(`[email] EMAIL_FROM domain "${actual}" does not match RESEND_VERIFIED_DOMAIN "${expected}"`)
  }
}

export type EmailPayload = {
  to: string
  subject: string
  html: string
}

/**
 * Send a single transactional email via Resend.
 * Throws on API error so callers can catch and log to email_logs.
 */
export async function sendEmail(payload: EmailPayload): Promise<void> {
  const from = process.env.EMAIL_FROM ?? 'GreeceClean <noreply@greececlean.gr>'
  warnIfFromDomainLooksUnverified(from)
  const { error } = await getClient().emails.send({
    from,
    to:      payload.to,
    subject: payload.subject,
    html:    payload.html,
  })
  if (error) throw new Error(error.message)
}
