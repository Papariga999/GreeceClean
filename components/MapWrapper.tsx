'use client'

import dynamic from 'next/dynamic'
import type { SeedReport } from '@/lib/seed-data'
import { useLocale } from './LocaleProvider'

function MapLoading() {
  const { t } = useLocale()

  return (
    <div
      className="flex items-center justify-center h-[calc(100vh-64px)] bg-marble"
      role="status"
      aria-live="polite"
    >
      <p className="text-gray-600">{t.map.loading}</p>
    </div>
  )
}

const MapClient = dynamic(() => import('@/components/MapClient'), {
  ssr: false,
  loading: () => <MapLoading />,
})

export default function MapWrapper({ reports }: { reports: SeedReport[] }) {
  return <MapClient reports={reports} />
}
