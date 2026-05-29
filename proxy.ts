import { NextRequest, NextResponse } from 'next/server'
import { isValidAdminSession } from '@/lib/adminAuth'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isAuthRoute =
    pathname === '/admin/login' ||
    pathname.startsWith('/api/admin/login') ||
    pathname.startsWith('/api/admin/logout')

  if (isAuthRoute) return NextResponse.next()

  if (!isValidAdminSession(req)) {
    const loginUrl = new URL('/admin/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
