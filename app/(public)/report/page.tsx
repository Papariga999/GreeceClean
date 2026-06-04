import type { Metadata } from 'next'
import ReportForm from '@/components/ReportForm'
import { getLocale, getDictionary } from '@/lib/i18n'
import { publicPageMetadata } from '@/lib/seo'

const metadata: Metadata = {
  title: 'Νέα Αναφορά – GreeceClean',
  description: 'Υποβάλετε αναφορά για παράνομη χωματερή ή σκουπίδια στον δήμο σας.',
}

void metadata

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return publicPageMetadata(locale, getDictionary(locale), 'report', '/report')
}

export default async function ReportPage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  const { form: f, copy: c, partners: p } = dict

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto">
        <div className="pt-8 pb-2 px-4">
          <h1 className="text-3xl font-extrabold text-primary">{f.pageTitle}</h1>
          <p className="text-gray-500 text-sm mt-1">{f.pageSubtitle}</p>
        </div>
        <ReportForm translations={f} copyTranslations={c} locale={locale} partnerCta={p.reportCta} />
      </div>
    </div>
  )
}
