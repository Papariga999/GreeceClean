import type { NextRequest } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'

export function signAdminToken(password: string, secret: string): string {
  return createHmac('sha256', secret).update(password).digest('hex')
}

export function isValidAdminSession(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  const cookieSecret = process.env.ADMIN_COOKIE_SECRET
  const token = req.cookies.get('admin_session')?.value

  if (!token || !adminPassword || !cookieSecret) return false

  const expected = signAdminToken(adminPassword, cookieSecret)
  try {
    return token.length === expected.length &&
      timingSafeEqual(Buffer.from(token), Buffer.from(expected))
  } catch {
    return false
  }
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
