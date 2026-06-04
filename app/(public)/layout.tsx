import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { LocaleProvider } from '@/components/LocaleProvider'
import { getDictionary, getLocale } from '@/lib/i18n'
import { siteJsonLd } from '@/lib/seo'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const dict = getDictionary(locale)

  return (
    <LocaleProvider locale={locale}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary focus:shadow-lg"
      >
        {dict.a11y.skipToContent}
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
      <JsonLd data={siteJsonLd(locale)} />
    </LocaleProvider>
  )
}
