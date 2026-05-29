'use client'

import { useEffect, useRef } from 'react'
import type * as LeafletType from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { SeedReport } from '@/lib/seed-data'
import { useLocale } from './LocaleProvider'
import { getElapsed, getSeverityTier, formatDuration } from '@/lib/elapsed'

function escHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

function formatDate(iso: string | null | undefined, locale: string): string {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString(locale === 'el' ? 'el-GR' : locale === 'de' ? 'de-DE' : 'en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
  } catch { return '—' }
}

type StatusKey = 'pending' | 'in_review' | 'forwarded' | 'resolved' | 'rejected'

const STATUS_STYLE: Record<StatusKey, { bg: string; color: string }> = {
  pending:   { bg: '#f3f4f6', color: '#6b7280' },
  in_review: { bg: '#fffbeb', color: '#b45309' },
  forwarded: { bg: '#eff6ff', color: '#1d4ed8' },
  resolved:  { bg: '#f0fdf4', color: '#15803d' },
  rejected:  { bg: '#fef2f2', color: '#b91c1c' },
}

const GREECE_CENTER: [number, number] = [39.0742, 21.8243]

export default function MapClient({ reports }: { reports: SeedReport[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef       = useRef<LeafletType.Map | null>(null)
  const { t, locale } = useLocale()

  useEffect(() => {
    if (!containerRef.current) return
    if (mapRef.current) { mapRef.current.remove(); mapRef.current = null }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet') as typeof LeafletType

    const map = L.map(containerRef.current).setView(GREECE_CENTER, 6)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    // Severity colours for circle markers — mirrors tailwind tokens
    const SEVERITY_COLOR: Record<string, string> = {
      fresh:   '#6B8E23',
      waiting: '#d97706',
      overdue: '#ea580c',
      ignored: '#dc2626',
    }

    reports.forEach((r) => {
      const municipalityName = r.municipality?.name_el ?? t.map.unknownMunicipality
      const categoryLabel    = t.tracking.categories[r.category as keyof typeof t.tracking.categories] ?? r.category
      const statusKey        = (r.status ?? 'pending') as StatusKey
      const statusLabel      = t.map.statuses[statusKey] ?? r.status
      const statusStyle      = STATUS_STYLE[statusKey] ?? STATUS_STYLE.pending
      const date             = formatDate(r.created_at, locale)

      // Elapsed / severity
      const elapsed    = getElapsed(r)
      const primaryDays = elapsed.daysSinceNotified ?? elapsed.daysSinceReported
      const tier       = getSeverityTier(primaryDays)
      const markerColor = SEVERITY_COLOR[tier]

      // Elapsed block HTML for popup
      const el = t.elapsed
      let elapsedHtml: string
      if (elapsed.daysSinceNotified !== null) {
        const nDays = elapsed.daysSinceNotified
        elapsedHtml = `
          <div style="background:${markerColor}11;border:1px solid ${markerColor}44;border-radius:8px;padding:8px 10px;margin-bottom:10px">
            <div style="display:flex;align-items:baseline;gap:4px">
              <span style="font-size:28px;font-weight:900;color:${markerColor};line-height:1;font-variant-numeric:tabular-nums">${nDays}</span>
              <span style="font-size:11px;font-weight:600;color:${markerColor}">${escHtml(el.daysUnit)}</span>
            </div>
            <p style="margin:1px 0 0;font-size:10px;font-weight:500;color:${markerColor}">${escHtml(el.notifiedLabel)}</p>
          </div>`
      } else {
        elapsedHtml = `<p style="font-size:10px;color:#9ca3af;font-style:italic;margin:0 0 8px">${escHtml(el.notNotified)}</p>`
      }
      const reportedLine = `<p style="font-size:10px;color:#9ca3af;margin:0 0 10px">${escHtml(el.reportedAgo.replace('{n}', formatDuration(elapsed.daysSinceReported, locale)))}</p>`

      const popup = `
        <div style="width:260px;font-family:system-ui,-apple-system,sans-serif;overflow:hidden">
          ${r.image_url ? `<img
            src="${escHtml(r.image_url)}"
            alt="${escHtml(categoryLabel)}"
            loading="lazy"
            style="width:100%;height:140px;object-fit:cover;display:block;border-radius:6px 6px 0 0;background:#f3f4f6"
          />` : `<div style="width:100%;height:60px;background:#f3f4f6;border-radius:6px 6px 0 0;display:flex;align-items:center;justify-content:center;font-size:28px">🗑️</div>`}
          <div style="padding:10px 12px 10px">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:8px">
              <span style="font-weight:700;font-size:13px;color:#111827;line-height:1.3">
                ${escHtml(municipalityName)}
              </span>
              <span style="
                flex-shrink:0;font-size:10px;font-weight:600;white-space:nowrap;
                padding:2px 8px;border-radius:9999px;
                background:${statusStyle.bg};color:${statusStyle.color}
              ">${escHtml(statusLabel)}</span>
            </div>
            ${elapsedHtml}
            ${reportedLine}
            <p style="font-size:11px;color:#4b5563;margin:0 0 10px;font-weight:500">${escHtml(categoryLabel)} · ${escHtml(date)}</p>
            <a
              href="/r/${escHtml(r.public_token)}"
              style="
                display:block;text-align:center;text-decoration:none;
                background:#005BAE;color:#ffffff;
                padding:9px 12px;border-radius:8px;
                font-size:12px;font-weight:600;letter-spacing:0.2px
              "
            >${escHtml(t.map.viewReport)}</a>
          </div>
        </div>
      `

      L.circleMarker([r.lat, r.lng], {
        radius: 9,
        fillColor: markerColor,
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85,
      })
        .addTo(map)
        .bindPopup(popup, { maxWidth: 280, minWidth: 260 })
    })

    mapRef.current = map
    return () => { map.remove(); mapRef.current = null }
  }, [reports, t, locale])

  return <div ref={containerRef} className="h-full w-full" />
}
