import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Space_Grotesk } from 'next/font/google';
import { routing } from '@/i18n/routing';
import DemoBanner from '@/components/demo-banner';
import PersonaSwitcher from '@/components/persona-switcher';
import LocaleSwitcher from '@/components/locale-switcher';

const inter = Inter({
  subsets: ['latin', 'greek'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'el' | 'en' | 'sq')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans min-h-screen bg-white">
        <NextIntlClientProvider messages={messages}>
          <DemoBanner />
          <main className="pb-24">{children}</main>
          <PersonaSwitcher />
          <LocaleSwitcher />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
