'use client'

import { useEffect, useRef } from 'react'
import type * as LeafletType from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { SeverityTier } from '@/lib/elapsed'

const PIN_SRC: Record<SeverityTier, string> = {
  fresh: '/brand/pins/pin-fresh.png',
  waiting: '/brand/pins/pin-recent.png',
  overdue: '/brand/pins/pin-aging.png',
  ignored: '/brand/pins/pin-ignored.png',
}

type Props = {
  lat: number
  lng: number
  tier: SeverityTier
  title: string
}

export default function ReportLocationMap({ lat, lng, tier, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletType.Map | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet') as typeof LeafletType
    const center: [number, number] = [lat, lng]

    const map = L.map(el, {
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: true,
    }).setView(center, 15)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map)

    const icon = L.icon({
      iconUrl: PIN_SRC[tier],
      iconSize: [30, 41],
      iconAnchor: [15, 41],
      popupAnchor: [0, -38],
      className: 'gc-pin',
    })

    L.marker(center, { icon }).addTo(map)

    mapRef.current = map
    const resizeTimer = window.setTimeout(() => map.invalidateSize(), 0)

    return () => {
      window.clearTimeout(resizeTimer)
      map.remove()
      mapRef.current = null
    }
  }, [lat, lng, tier])

  return (
    <div
      ref={containerRef}
      aria-label={title}
      role="img"
      className="h-full w-full"
    />
  )
}
