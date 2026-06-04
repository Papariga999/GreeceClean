import { describe, expect, it } from 'vitest'
import { getDictionary, LOCALES } from '../../lib/i18n'
import type { Dictionary } from '../../lib/i18n/types'
import { localeAlternates, publicPageMetadata } from '../../lib/seo'

const PAGES: Array<{ page: keyof Dictionary['meta']; path: string }> = [
  { page: 'home', path: '/' },
  { page: 'report', path: '/report' },
  { page: 'map', path: '/map' },
  { page: 'partners', path: '/partners' },
  { page: 'top', path: '/top' },
  { page: 'region', path: '/region' },
]

describe('SEO metadata helpers', () => {
  it('emits self-referential canonicals and all hreflang alternates', () => {
    for (const locale of LOCALES) {
      for (const { page, path } of PAGES) {
        const metadata = publicPageMetadata(locale, getDictionary(locale), page, path)
        expect(metadata.alternates?.canonical).toContain(`/${locale}${path === '/' ? '' : path}`)
        expect(metadata.alternates?.languages).toMatchObject({
          el: expect.stringContaining(`/el${path === '/' ? '' : path}`),
          en: expect.stringContaining(`/en${path === '/' ? '' : path}`),
          de: expect.stringContaining(`/de${path === '/' ? '' : path}`),
          'x-default': expect.stringContaining(`/el${path === '/' ? '' : path}`),
        })
      }
    }
  })

  it('keeps dynamic report alternates on the same token path', () => {
    const alternates = localeAlternates('de', '/r/example-token')

    expect(alternates.canonical).toContain('/de/r/example-token')
    expect(alternates.languages).toMatchObject({
      el: expect.stringContaining('/el/r/example-token'),
      en: expect.stringContaining('/en/r/example-token'),
      de: expect.stringContaining('/de/r/example-token'),
      'x-default': expect.stringContaining('/el/r/example-token'),
    })
  })
})
