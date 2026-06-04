'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import type { SeedReport } from '@/lib/seed-data'
import { useLocale } from './LocaleProvider'

function MapLoading() {
  const { t } = useLocale()

  return (
    <div
      className="flex items-center justify-center h-[calc(100vh-64px)] bg-gray-100"
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
  const [isReady, setIsReady] = useState(false)
  const { t } = useLocale()

  if (isReady) return <MapClient reports={reports} />

  return (
    <div className="relative flex h-full min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-sea-mist">
      <div
        className="absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(13,111,219,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(13,111,219,0.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <p id="map-load-hint" className="sr-only">
          {t.map.loadHint}
        </p>
        <button
          type="button"
          className="btn-primary px-7 py-3.5 text-base shadow-md"
          aria-describedby="map-load-hint"
          onClick={() => setIsReady(true)}
        >
          {t.map.loadInteractive}
        </button>
      </div>
    </div>
  )
}
