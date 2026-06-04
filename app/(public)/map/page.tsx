import type { Metadata } from 'next'
import { SEED_REPORTS, type SeedReport } from '@/lib/seed-data'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import MapWrapper from '@/components/MapWrapper'
import SupportBanner from '@/components/SupportBanner'
import JsonLd from '@/components/JsonLd'
import { getDictionary, getLocale } from '@/lib/i18n'
import { datasetJsonLd, publicPageMetadata } from '@/lib/seo'

const metadata: Metadata = {
  title: 'Χάρτης Αναφορών – GreeceClean',
  description: 'Δες όλες τις εγκεκριμένες αναφορές σε διαδραστικό χάρτη.',
}

void metadata

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return publicPageMetadata(locale, getDictionary(locale), 'map', '/map')
}

async function getReports(): Promise<SeedReport[]> {
  if (!isSupabaseConfigured) return SEED_REPORTS

  const { data } = await supabase
    .from('reports')
    .select('public_token, image_url, lat, lng, category, status, created_at, notified_at, resolved_at, municipality:municipality_id(name_el)')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  const rows = (data ?? []) as unknown as SeedReport[]
  return rows.length > 0 ? rows : SEED_REPORTS
}

export default async function MapPage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  const reports = await getReports()
  return (
    <div className="flex flex-col">
      <JsonLd data={datasetJsonLd(locale, '/map', dict)} />
      <div className="h-[calc(100vh-64px)]">
        <MapWrapper reports={reports} />
      </div>
      <SupportBanner />
    </div>
  )
}
