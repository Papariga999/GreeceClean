import { NextRequest, NextResponse } from 'next/server'
import { isValidAdminPassword, signAdminToken } from '@/lib/adminAuth'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const password = formData.get('password')?.toString() ?? ''

  const adminPassword = process.env.ADMIN_PASSWORD
  const cookieSecret = process.env.ADMIN_COOKIE_SECRET

  if (!adminPassword || !cookieSecret) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  if (!isValidAdminPassword(password)) {
    const loginUrl = new URL('/admin/login', req.url)
    loginUrl.searchParams.set('error', '1')
    return NextResponse.redirect(loginUrl, { status: 303 })
  }

  const token = signAdminToken(adminPassword, cookieSecret)
  const dashboardUrl = new URL('/admin/dashboard', req.url)
  const res = NextResponse.redirect(dashboardUrl, { status: 303 })

  res.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  })

  return res
}
