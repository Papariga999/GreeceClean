import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LocaleProvider } from '@/components/LocaleProvider'
import { getLocale } from '@/lib/i18n'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <LocaleProvider locale={locale}>
      <Header />
      <main>{children}</main>
      <Footer locale={locale} />
    </LocaleProvider>
  )
}
