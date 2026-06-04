import type { Metadata } from 'next'
import type { Dictionary, Locale } from './i18n/types'
import { DEFAULT_LOCALE, LOCALES } from './i18n/types'
import { localizedHref } from './i18n/routing'

export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://greececlean.vercel.app').replace(/\/$/, '')

export function absoluteUrl(path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized === '/' ? '' : normalized}`
}

export function ogLocale(locale: Locale): string {
  if (locale === 'de') return 'de_DE'
  if (locale === 'en') return 'en_GB'
  return 'el_GR'
}

export function localeAlternates(locale: Locale, path: string): NonNullable<Metadata['alternates']> {
  return {
    canonical: absoluteUrl(localizedHref(locale, path)),
    languages: {
      el: absoluteUrl(localizedHref('el', path)),
      en: absoluteUrl(localizedHref('en', path)),
      de: absoluteUrl(localizedHref('de', path)),
      'x-default': absoluteUrl(localizedHref(DEFAULT_LOCALE, path)),
    },
  }
}

export function publicPageMetadata(
  locale: Locale,
  dict: Dictionary,
  page: keyof Dictionary['meta'],
  path: string,
): Metadata {
  const meta = dict.meta[page]
  const url = absoluteUrl(localizedHref(locale, path))

  return {
    title: meta.title,
    description: meta.description,
    alternates: localeAlternates(locale, path),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      locale: ogLocale(locale),
      type: 'website',
      images: [{ url: '/brand/og-image.png', width: 1200, height: 630, alt: 'GreeceClean' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/brand/og-image.png'],
    },
  }
}

export function siteJsonLd(locale: Locale) {
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL
  const organization: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'GreeceClean',
    url: SITE_URL,
    logo: absoluteUrl('/brand/logo-symbol.png'),
  }

  if (linkedinUrl) organization.sameAs = [linkedinUrl]

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'GreeceClean',
        url: SITE_URL,
        inLanguage: locale,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#reporting-service`,
        name: 'GreeceClean environmental reporting',
        serviceType: 'Environmental reporting',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: {
          '@type': 'Country',
          name: 'Greece',
        },
        availableLanguage: [...LOCALES],
      },
    ],
  }
}

export function datasetJsonLd(locale: Locale, path: string, dict: Dictionary) {
  const meta = path === '/top' ? dict.meta.top : dict.meta.map

  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: meta.title,
    description: meta.description,
    url: absoluteUrl(localizedHref(locale, path)),
    inLanguage: locale,
    creator: { '@id': `${SITE_URL}/#organization` },
    isAccessibleForFree: true,
    keywords: ['environmental reports', 'waste', 'Greece', 'municipal accountability'],
  }
}

export function breadcrumbJsonLd(
  locale: Locale,
  items: Array<{ name: string; path: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localizedHref(locale, item.path)),
    })),
  }
}
