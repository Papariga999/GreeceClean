import { getLocale, getDictionary } from '@/lib/i18n'
import Logo from './Logo'

const STATIC = {
  el: { privacy: 'Απόρρητο', impressum: 'Impressum', terms: 'Όροι Χρήσης', tagline: 'Βοηθάμε να κρατήσουμε την Ελλάδα καθαρή' },
  en: { privacy: 'Privacy Policy', impressum: 'Impressum', terms: 'Terms of Service', tagline: 'Helping keep Greece clean' },
  de: { privacy: 'Datenschutz', impressum: 'Impressum', terms: 'Nutzungsbedingungen', tagline: 'Griechenland sauber halten' },
}

export default async function Footer() {
  const locale = await getLocale()
  const l = STATIC[locale] ?? STATIC.el
  const partnersLink = getDictionary(locale).partners.footerLink

  return (
    <footer className="border-t border-gray-100 bg-white mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <Logo variant="symbol" size={20} />
          <p>© {new Date().getFullYear()} GreeceClean — {l.tagline}</p>
        </div>
        <nav className="flex items-center gap-5">
          <a href="/partners" className="hover:text-gray-600 transition-colors">{partnersLink}</a>
          <a href="/privacy" className="hover:text-gray-600 transition-colors">{l.privacy}</a>
          <a href="/impressum" className="hover:text-gray-600 transition-colors">{l.impressum}</a>
          <a href="/terms" className="hover:text-gray-600 transition-colors">{l.terms}</a>
        </nav>
      </div>
    </footer>
  )
}
