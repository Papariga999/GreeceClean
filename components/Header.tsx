'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLocale } from './LocaleProvider'
import LanguageSwitcher from './LanguageSwitcher'
import { Logo } from './Logo'
import { localizedHref } from '@/lib/i18n/routing'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { locale, t } = useLocale()

  const nav = [
    { href: localizedHref(locale, '/'), label: t.nav.home },
    { href: localizedHref(locale, '/map'), label: t.nav.map },
  ]

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href={localizedHref(locale, '/')} className="shrink-0">
          <Logo on="blue" mark={22} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium flex-1 justify-end">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-action-300 transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
          <Link
            href={localizedHref(locale, '/report')}
            className="bg-action text-white px-4 py-2 rounded-2xl hover:bg-action-600 transition-colors duration-150"
          >
            {t.nav.report}
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* Mobile right-side: flags + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            className="p-2 rounded-xl hover:bg-primary-600 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className="block w-5 h-0.5 bg-white mb-1" />
            <span className="block w-5 h-0.5 bg-white mb-1" />
            <span className="block w-5 h-0.5 bg-white" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-primary-600 px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-action-300 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href={localizedHref(locale, '/report')}
            className="bg-action text-white px-4 py-2 rounded-2xl text-center hover:bg-action-600 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.report}
          </Link>
        </div>
      )}
    </header>
  )
}
