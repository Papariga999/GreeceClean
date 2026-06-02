import type { NextRequest } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'

export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8

function signPayload(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex')
}

export function signAdminToken(password: string, secret: string, now = Date.now()): string {
  const expiresAt = Math.floor(now / 1000) + ADMIN_SESSION_MAX_AGE_SECONDS
  const payload = `${password}:${expiresAt}`
  return `${expiresAt}.${signPayload(payload, secret)}`
}

export function isValidAdminToken(token: string | undefined): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  const cookieSecret = process.env.ADMIN_COOKIE_SECRET

  if (!token || !adminPassword || !cookieSecret) return false

  const [expiresAtRaw, signature] = token.split('.')
  const expiresAt = Number.parseInt(expiresAtRaw ?? '', 10)
  if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false

  const expected = signPayload(`${adminPassword}:${expiresAt}`, cookieSecret)
  try {
    return Boolean(signature) &&
      signature.length === expected.length &&
      timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  } catch {
    return false
  }
}

export function isValidAdminSession(req: NextRequest): boolean {
  return isValidAdminToken(req.cookies.get('admin_session')?.value)
}

export function isValidAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false

  try {
    return password.length === adminPassword.length &&
      timingSafeEqual(Buffer.from(password), Buffer.from(adminPassword))
  } catch {
    return false
  }
}
