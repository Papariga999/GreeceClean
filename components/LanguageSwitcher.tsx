'use client'

import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import { useLocale } from './LocaleProvider'
import type { Locale } from '@/lib/i18n/types'
import { replacePathLocale } from '@/lib/i18n/routing'

const LANGS: { locale: Locale; flag: string; label: string }[] = [
  { locale: 'el', flag: '🇬🇷', label: 'Ελληνικά' },
  { locale: 'en', flag: '🇬🇧', label: 'English' },
  { locale: 'de', flag: '🇩🇪', label: 'Deutsch' },
]

export default function LanguageSwitcher() {
  const { locale, t } = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function switchLocale(next: Locale) {
    if (next === locale) return
    void fetch('/api/locale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locale: next }),
    })

    const query = searchParams.toString()
    const hash = window.location.hash
    router.push(`${replacePathLocale(pathname || '/', next)}${query ? `?${query}` : ''}${hash}`)
  }

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label={t.a11y.languageSwitcher}>
      <span className="text-xs font-bold text-white min-w-7" aria-hidden="true">
        {locale.toUpperCase()} ▾
      </span>
      {LANGS.map(({ locale: l, flag, label }) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          title={label}
          aria-label={label}
          aria-pressed={l === locale}
          className={`text-lg leading-none px-1 py-0.5 rounded transition-opacity focus:outline-none focus:ring-2 focus:ring-white/80 ${
            l === locale ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-80'
          }`}
        >
          {flag}
        </button>
      ))}
    </div>
  )
}
