import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LocaleProvider } from '@/components/LocaleProvider'
import { getLocale } from '@/lib/i18n'

const inter = Inter({ subsets: ['latin', 'greek'] })

export const viewport: Viewport = {
  themeColor: '#0D6FDB',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://greececlean.vercel.app'),
  title: 'GreeceClean – Αναφορά Απορριμμάτων',
  description: 'Βοηθήστε να κρατήσουμε την Ελλάδα καθαρή. Αναφέρετε παράνομες χωματερές και σκουπίδια στον δήμο σας.',
  keywords: ['ελλάδα', 'καθαριότητα', 'αναφορά', 'δήμος', 'περιβάλλον'],
  authors: [{ name: 'GreeceClean' }],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'GreeceClean',
    description: 'Κρατήστε την Ελλάδα καθαρή',
    locale: 'el_GR',
    type: 'website',
    images: [{ url: '/brand/og-image.png', width: 1200, height: 630, alt: 'GreeceClean' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GreeceClean',
    description: 'Κρατήστε την Ελλάδα καθαρή',
    images: ['/brand/og-image.png'],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <LocaleProvider locale={locale}>
          <Header />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  )
}
