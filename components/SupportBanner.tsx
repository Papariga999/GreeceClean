import Link from 'next/link'
import { getLocale, getDictionary } from '@/lib/i18n'

export default async function SupportBanner() {
  const locale = await getLocale()
  const { banner } = getDictionary(locale).partners

  return (
    <section className="py-10 px-4 bg-sea-mist border-t border-primary-100">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm font-bold text-gray-800 mb-1">{banner.title}</p>
        <p className="text-xs text-gray-500 mb-4">{banner.sub}</p>
        <Link
          href="/partners"
          className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-600 text-white text-sm font-semibold px-6 py-2.5 rounded-2xl transition-colors shadow-sm"
        >
          {banner.cta}
        </Link>
      </div>
    </section>
  )
}
