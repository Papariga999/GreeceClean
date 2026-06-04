import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { LocaleProvider } from '@/components/LocaleProvider'
import { getDictionary } from '@/lib/i18n'
import { isLocale, LOCALES } from '@/lib/i18n/types'
import { siteJsonLd } from '@/lib/seo'

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const dict = getDictionary(lang)

  return (
    <LocaleProvider locale={lang}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary focus:shadow-lg"
      >
        {dict.a11y.skipToContent}
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer locale={lang} />
      <JsonLd data={siteJsonLd(lang)} />
    </LocaleProvider>
  )
}
