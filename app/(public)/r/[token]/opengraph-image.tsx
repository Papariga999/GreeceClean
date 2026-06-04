import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { SEED_REPORTS } from '@/lib/seed-data'

export const runtime     = 'nodejs'
export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Severity pill colours — mirrors tailwind tokens / elapsed.ts
const SEV = (days: number) => {
  if (days < 7)  return { bg: '#E3EAD2', text: '#495427', label: 'φρέσκο' }
  if (days < 30) return { bg: '#F8F3EA', text: '#8A6B30', label: 'προσοχή' }
  if (days < 60) return { bg: '#F8EEE3', text: '#7A4510', label: 'κλιμακώνεται' }
  return { bg: '#F5E0D8', text: '#6B1F0A', label: 'αγνοείται' }
}

async function getReport(token: string) {
  if (isSupabaseConfigured) {
    const { data } = await supabaseAdmin
      .from('reports')
      .select('image_url, category, created_at, notified_at, votes, confirmations, municipality:municipality_id(name_el)')
      .eq('public_token', token)
      .eq('is_approved', true)
      .single()
    return data as { image_url: string | null; category: string; created_at: string; notified_at: string | null; votes: number; confirmations: number; municipality: { name_el: string } | null } | null
  }
  return SEED_REPORTS.find(r => r.public_token === token) as typeof import('@/lib/seed-data').SEED_REPORTS[0] | null | undefined
}

export default async function ReportOGImage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const report    = await getReport(token)

  // Brand assets
  const symbolBuf = readFileSync(join(process.cwd(), 'public/brand/logo-symbol-white.png'))
  const symbolSrc = `data:image/png;base64,${symbolBuf.toString('base64')}`

  const days   = report ? Math.floor((Date.now() - new Date(report.created_at).getTime()) / 86_400_000) : 0
  const sev    = SEV(days)
  const r2     = report as { votes?: number; confirmations?: number } | null
  const total  = r2 ? (r2.votes ?? 0) + (r2.confirmations ?? 1) : 0
  const muniEl = (report as { municipality?: { name_el: string } | null } | null | undefined)?.municipality?.name_el ?? 'GreeceClean'

  // Try to fetch the report photo as base64 (may fail → show blue fallback)
  let photoSrc: string | null = null
  if (report?.image_url) {
    try {
      const res = await fetch(report.image_url)
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer())
        photoSrc  = `data:image/jpeg;base64,${buf.toString('base64')}`
      }
    } catch { /* skip */ }
  }

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', fontFamily: 'system-ui, sans-serif' }}>
        {/* Left — photo or solid brand colour */}
        <div style={{
          width: 480, height: '100%', flexShrink: 0,
          background: photoSrc ? 'transparent' : '#005A80',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        }}>
          {photoSrc
            ? <img src={photoSrc} width={480} height={630} alt="" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            : <img src={symbolSrc} width={160} alt="GreeceClean" />}
        </div>

        {/* Right — details */}
        <div style={{
          flex: 1, background: '#fff',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '52px 56px',
        }}>
          {/* Brand header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={symbolSrc} width={36} alt="" style={{ filter: 'invert(30%) sepia(80%) saturate(600%) hue-rotate(190deg)' }} />
            <span style={{ fontSize: 22, fontWeight: 800, color: '#006994' }}>GreeceClean</span>
          </div>

          {/* Core info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Severity pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: sev.bg, color: sev.text,
              borderRadius: 999, padding: '10px 20px', width: 'fit-content',
            }}>
              <span style={{ fontSize: 22 }}>⏱</span>
              <span style={{ fontSize: 28, fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>{days}</span>
              <span style={{ fontSize: 16, fontWeight: 600 }}>ημέρες ανοιχτό</span>
            </div>

            {/* Municipality */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 24 }}>🏛️</span>
              <span style={{ fontSize: 26, fontWeight: 700, color: '#111827' }}>{muniEl}</span>
            </div>

            {/* Vote count */}
            <div style={{ fontSize: 20, color: '#4B5563', fontWeight: 500 }}>
              <span style={{ fontWeight: 800, color: '#006994' }}>{total}</span> άτομα θέλουν να καθαριστεί αυτό
            </div>
          </div>

          {/* Footer CTA */}
          <div style={{
            background: '#006994', color: '#fff',
            borderRadius: 16, padding: '18px 28px',
            fontSize: 18, fontWeight: 700, textAlign: 'center',
          }}>
            Δες την αναφορά → greececlean.gr
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
