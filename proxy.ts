import { NextRequest, NextResponse } from 'next/server'
import { isValidAdminSession } from '@/lib/adminAuth'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/types'
import type { Locale } from '@/lib/i18n/types'
import { LOCALE_COOKIE, localeFromAcceptLanguage, localizedHref } from '@/lib/i18n/routing'

function nextWithLocale(req: NextRequest, locale: Locale) {
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-gc-locale', locale)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

function preferredLocale(req: NextRequest): Locale {
  const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value
  if (isLocale(cookieLocale)) return cookieLocale
  return localeFromAcceptLanguage(req.headers.get('accept-language')) ?? DEFAULT_LOCALE
}

function isAuthRoute(pathname: string): boolean {
  return (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/admin/login') ||
    pathname.startsWith('/api/admin/logout')
  )
}

function isAdminRoute(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/api/admin/')
}

function isPublicAsset(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||
    pathname === '/opengraph-image' ||
    pathname.includes('.')
  )
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (isAuthRoute(pathname)) return NextResponse.next()

  if (isAdminRoute(pathname)) {
    if (!isValidAdminSession(req)) {
      const loginUrl = new URL('/admin/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/api') || isPublicAsset(pathname)) {
    return NextResponse.next()
  }

  const firstSegment = pathname.split('/').filter(Boolean)[0]
  if (isLocale(firstSegment)) {
    return nextWithLocale(req, firstSegment)
  }

  const locale = preferredLocale(req)
  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = localizedHref(locale, pathname)

  const response = NextResponse.redirect(redirectUrl, 302)
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    httpOnly: false,
  })
  return response
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
