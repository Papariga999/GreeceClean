import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Mono } from 'next/font/google'
import './globals.css'
import { getLocale } from '@/lib/i18n'
import { ogLocale } from '@/lib/seo'

const cormorant = Cormorant_Garamond({
  subsets: ['greek', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#006994',
  width: 'device-width',
  initialScale: 1,
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://greececlean.vercel.app'),
    title: 'GreeceClean',
    description: 'Report environmental problems to the responsible municipality in Greece.',
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
      description: 'Report environmental problems in Greece.',
      locale: ogLocale(locale),
      type: 'website',
      images: [{ url: '/brand/og-image.png', width: 1200, height: 630, alt: 'GreeceClean' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'GreeceClean',
      description: 'Report environmental problems in Greece.',
      images: ['/brand/og-image.png'],
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <body className={`${cormorant.variable} ${dmMono.variable}`}>{children}</body>
    </html>
  )
}
