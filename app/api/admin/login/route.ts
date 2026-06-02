import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_MAX_AGE_SECONDS, isValidAdminPassword, signAdminToken } from '@/lib/adminAuth'
import { checkRateLimit, getClientIp, resetRateLimit } from '@/lib/rateLimit'

const ADMIN_LOGIN_WINDOW_MS = 15 * 60 * 1000

function adminLoginLimit(): number {
  const parsed = Number.parseInt(process.env.ADMIN_LOGIN_RATE_LIMIT_PER_15_MIN ?? '5', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 5
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const password = formData.get('password')?.toString() ?? ''

  const adminPassword = process.env.ADMIN_PASSWORD
  const cookieSecret = process.env.ADMIN_COOKIE_SECRET

  if (!adminPassword || !cookieSecret) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  const rateLimitKey = `admin-login:${getClientIp(req.headers)}`
  const rate = checkRateLimit(rateLimitKey, {
    limit: adminLoginLimit(),
    windowMs: ADMIN_LOGIN_WINDOW_MS,
  })
  if (!rate.allowed) {
    const loginUrl = new URL('/admin/login', req.url)
    loginUrl.searchParams.set('error', 'rate_limited')
    return NextResponse.redirect(loginUrl, {
      status: 303,
      headers: { 'Retry-After': String(rate.retryAfterSeconds) },
    })
  }

  if (!isValidAdminPassword(password)) {
    const loginUrl = new URL('/admin/login', req.url)
    loginUrl.searchParams.set('error', '1')
    return NextResponse.redirect(loginUrl, { status: 303 })
  }

  resetRateLimit(rateLimitKey)

  const token = signAdminToken(adminPassword, cookieSecret)
  const dashboardUrl = new URL('/admin/dashboard', req.url)
  const res = NextResponse.redirect(dashboardUrl, { status: 303 })

  res.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  })

  return res
}
