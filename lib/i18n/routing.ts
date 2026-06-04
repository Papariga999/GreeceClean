import { DEFAULT_LOCALE, LOCALES, type Locale } from './types'

export const LOCALE_COOKIE = 'locale'

export function localizedHref(locale: Locale, path: string): string {
  if (!path || path === '/') return `/${locale}`
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path

  const [pathname, suffix = ''] = path.split(/(?=[?#])/, 2)
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  const segments = normalized.split('/').filter(Boolean)

  if (segments.length > 0 && LOCALES.includes(segments[0] as Locale)) {
    segments[0] = locale
    return `/${segments.join('/')}${suffix}`
  }

  return `/${locale}${normalized === '/' ? '' : normalized}${suffix}`
}

export function stripLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length > 0 && LOCALES.includes(segments[0] as Locale)) {
    const rest = `/${segments.slice(1).join('/')}`
    return rest === '/' ? '/' : rest
  }
  return pathname || '/'
}

export function replacePathLocale(pathname: string, locale: Locale): string {
  return localizedHref(locale, stripLocaleFromPath(pathname))
}

export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE

  const preferred = header
    .split(',')
    .map((entry) => {
      const [tag, ...params] = entry.trim().split(';')
      const q = params
        .map((param) => param.trim())
        .find((param) => param.startsWith('q='))
      return {
        tag: tag.toLowerCase(),
        q: q ? Number(q.slice(2)) : 1,
      }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of preferred) {
    const base = tag.split('-')[0]
    if (LOCALES.includes(base as Locale)) return base as Locale
  }

  return DEFAULT_LOCALE
}
