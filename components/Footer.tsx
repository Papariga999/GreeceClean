import Link from 'next/link'
import { getLocale, getDictionary } from '@/lib/i18n'
import { localizedHref } from '@/lib/i18n/routing'
import type { Locale } from '@/lib/i18n/types'
import { BrandMark } from './Logo'

const STATIC = {
  el: { privacy: 'Απόρρητο', impressum: 'Impressum', terms: 'Όροι Χρήσης', tagline: 'Βοηθάμε να κρατήσουμε την Ελλάδα καθαρή' },
  en: { privacy: 'Privacy Policy', impressum: 'Impressum', terms: 'Terms of Service', tagline: 'Helping keep Greece clean' },
  de: { privacy: 'Datenschutz', impressum: 'Impressum', terms: 'Nutzungsbedingungen', tagline: 'Griechenland sauber halten' },
}

export default async function Footer({ locale: explicitLocale }: { locale?: Locale }) {
  const locale = explicitLocale ?? (await getLocale())
  const l = STATIC[locale] ?? STATIC.el
  const partnersLink = getDictionary(locale).partners.footerLink

  return (
    <footer className="border-t border-gray-100 bg-white mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <BrandMark size={20} variant="color" />
          <p>© {new Date().getFullYear()} Katharos — {l.tagline}</p>
        </div>
        <nav className="flex items-center gap-5">
          <Link href={localizedHref(locale, '/partners')} className="hover:text-gray-900 transition-colors">{partnersLink}</Link>
          <Link href={localizedHref(locale, '/privacy')} className="hover:text-gray-900 transition-colors">{l.privacy}</Link>
          <Link href={localizedHref(locale, '/impressum')} className="hover:text-gray-900 transition-colors">{l.impressum}</Link>
          <Link href={localizedHref(locale, '/terms')} className="hover:text-gray-900 transition-colors">{l.terms}</Link>
        </nav>
      </div>
    </footer>
  )
}
