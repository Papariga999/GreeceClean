import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { getLocale } from '@/lib/i18n'
import { getSeverityTier } from '@/lib/elapsed'
import CategoryBadge from '@/components/CategoryBadge'

// Severity dot colours
const SEV_PILL: Record<string, { bg: string; text: string }> = {
  fresh:   { bg: '#DCFCE7', text: '#15803D' },
  waiting: { bg: '#FEF3C7', text: '#D97706' },
  overdue: { bg: '#FFEDD5', text: '#EA580C' },
  ignored: { bg: '#FEE2E2', text: '#DC2626' },
}

function daysOpen(iso: string) {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
}

type MuniRow = {
  id: string
  name_el: string
  region: string | null
  email_official: string | null
}

type ReportRow = {
  public_token: string
  category: string
  status: string
  created_at: string
  notified_at: string | null
  resolved_at: string | null
  votes: number
  confirmations: number
}

async function getData(id: string): Promise<{ muni: MuniRow; reports: ReportRow[]; rank: number; total: number } | null> {
  if (!isSupabaseConfigured) return null

  const [{ data: muni }, { data: rawReports }, { count: total }] = await Promise.all([
    supabaseAdmin.from('municipalities').select('id, name_el, region, email_official').eq('id', id).single(),
    supabaseAdmin.from('reports').select('public_token, category, status, created_at, notified_at, resolved_at, votes, confirmations').eq('municipality_id', id).eq('is_approved', true).order('created_at', { ascending: false }).limit(20),
    supabaseAdmin.from('municipalities').select('id', { count: 'exact', head: true }),
  ])

  if (!muni) return null

  // Compute rank: how many municipalities have a higher resolution rate
  const resolved = (rawReports ?? []).filter(r => r.status === 'resolved').length
  const totalReports = (rawReports ?? []).length
  const rate = totalReports > 0 ? resolved / totalReports : 0

  let rank = 1
  if (totalReports > 0) {
    const { data: allRates } = await supabaseAdmin
      .from('reports')
      .select('municipality_id, status')
      .eq('is_approved', true)
      .not('municipality_id', 'is', null)

    if (allRates) {
      const rateMap = new Map<string, { total: number; resolved: number }>()
      for (const r of allRates) {
        const mid = r.municipality_id as string
        const s = rateMap.get(mid) ?? { total: 0, resolved: 0 }
        s.total++
        if (r.status === 'resolved') s.resolved++
        rateMap.set(mid, s)
      }
      rank = 1 + Array.from(rateMap.values()).filter(s => s.total > 0 && s.resolved / s.total > rate).length
    }
  }

  return {
    muni: muni as MuniRow,
    reports: (rawReports ?? []) as ReportRow[],
    rank,
    total: total ?? 0,
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const data = await getData(id)
  if (!data) return { title: 'Δήμος – GreeceClean' }
  return { title: `${data.muni.name_el} – GreeceClean` }
}

export default async function ScorecardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const locale = await getLocale()

  const data = await getData(id)
  if (!data) notFound()

  const { muni, reports, rank, total } = data
  const resolved   = reports.filter(r => r.status === 'resolved').length
  const open       = reports.filter(r => !['resolved', 'rejected'].includes(r.status)).length
  const forwarded  = reports.filter(r => ['forwarded', 'resolved'].includes(r.status))
  const avgDays    = forwarded.length > 0
    ? Math.round(forwarded.reduce((sum, r) => {
        const start = new Date(r.created_at).getTime()
        const end   = r.notified_at ? new Date(r.notified_at).getTime() : Date.now()
        return sum + (end - start) / 86_400_000
      }, 0) / forwarded.length)
    : null

  const rate = reports.length > 0 ? Math.round((resolved / reports.length) * 100) : 0
  const longOpen = reports.filter(r => !['resolved', 'rejected'].includes(r.status) && daysOpen(r.created_at) > 60)

  const locStr = locale === 'el' ? 'el-GR' : locale === 'de' ? 'de-DE' : 'en-GB'

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto space-y-4">
        <Link href="/" className="text-sm text-primary font-medium flex items-center gap-1">
          ‹ GreeceClean
        </Link>

        {/* Municipality header */}
        <div
          className="rounded-2xl p-5 text-white flex items-center justify-between gap-4"
          style={{ background: 'linear-gradient(140deg, #0D6FDB, #0B57AD)' }}
        >
          <div>
            <p className="text-sm opacity-80 mb-0.5">🏛️ Δήμος</p>
            <h1 className="text-2xl font-extrabold leading-tight">{muni.name_el}</h1>
            {muni.region && <p className="text-sm opacity-70 mt-1">{muni.region}</p>}
          </div>
          {reports.length > 0 && (
            <div
              className="text-center rounded-xl px-4 py-3 shrink-0"
              style={{ background: 'rgba(234,88,12,0.25)' }}
            >
              <p className="text-xs font-semibold" style={{ color: '#FED7AA' }}>Κατάταξη</p>
              <p className="text-3xl font-black leading-none mt-0.5">#{rank}</p>
              <p className="text-xs mt-0.5" style={{ color: '#FED7AA' }}>από {total}</p>
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { v: `${rate}%`,  label: 'Λύθηκαν',       color: '#39B24A' },
            { v: avgDays != null ? `${avgDays}η` : '—', label: '⌀ αντίδραση', color: '#EA580C' },
            { v: open,        label: 'Ανοιχτές',       color: '#DC2626' },
            { v: resolved,    label: 'Καθαρίστηκαν',  color: '#39B24A' },
          ].map(s => (
            <div key={s.label} className="card text-center p-3">
              <p className="text-xl font-extrabold leading-none" style={{ color: s.color }}>{s.v}</p>
              <p className="text-[10px] text-gray-400 mt-1.5 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Long-open warning */}
        {longOpen.length > 0 && (
          <div className="rounded-2xl p-4" style={{ background: '#FFF7ED' }}>
            <p className="text-sm leading-relaxed" style={{ color: '#9A3412' }}>
              <strong>{longOpen.length} αναφορές</strong> περιμένουν δράση πάνω από 60 ημέρες.
            </p>
          </div>
        )}

        {/* Report list */}
        {reports.length > 0 && (
          <div className="card p-0 overflow-hidden divide-y divide-gray-100">
            <p className="text-sm font-bold text-primary px-5 py-3">Αναφορές</p>
            {reports.slice(0, 12).map(r => {
              const days = daysOpen(r.created_at)
              const tier = getSeverityTier(days)
              const sev  = SEV_PILL[tier]
              const isResolved = r.status === 'resolved'
              return (
                <Link
                  key={r.public_token}
                  href={`/r/${r.public_token}`}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors no-underline"
                >
                  <CategoryBadge categoryId={r.category} label="" size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 truncate">
                      {new Date(r.created_at).toLocaleDateString(locStr)}
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                    style={isResolved ? { background: '#DCFCE7', color: '#15803D' } : { background: sev.bg, color: sev.text }}
                  >
                    {isResolved ? '✓' : `${days}d`}
                  </span>
                  <span className="text-gray-300 text-sm">›</span>
                </Link>
              )
            })}
          </div>
        )}

        {reports.length === 0 && (
          <div className="card text-center py-10">
            <p className="text-4xl mb-3">🏅</p>
            <p className="font-bold text-primary">Καμία ανοιχτή αναφορά</p>
            <p className="text-sm text-gray-500 mt-1">Αυτός ο δήμος δεν έχει εκκρεμείς αναφορές.</p>
          </div>
        )}

        {!muni.email_official && (
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
            <p className="text-sm text-yellow-800">
              ⚠️ Δεν υπάρχει καταχωρημένο email επικοινωνίας για αυτόν τον δήμο.
              Οι αναφορές δεν μπορούν ακόμη να προωθηθούν.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
