import type { Metadata } from 'next'
import Link from 'next/link'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { SEED_REPORTS } from '@/lib/seed-data'
import { getLocale, getDictionary } from '@/lib/i18n'
import { getSeverityTier } from '@/lib/elapsed'
import CategoryBadge from '@/components/CategoryBadge'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Πιο Επείγοντα – GreeceClean',
  description: 'Οι αναφορές που οι πολίτες θέλουν πιο πολύ να λυθούν.',
}

const SEV_PILL: Record<string, { bg: string; text: string }> = {
  fresh:   { bg: '#DCFCE7', text: '#15803D' },
  waiting: { bg: '#FEF3C7', text: '#D97706' },
  overdue: { bg: '#FFEDD5', text: '#EA580C' },
  ignored: { bg: '#FEE2E2', text: '#DC2626' },
}

function daysOpen(iso: string) {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
}

type Row = {
  public_token: string
  category: string
  created_at: string
  votes: number
  confirmations: number
  municipality: { name_el: string } | null
}

async function getRows(): Promise<Row[]> {
  if (!isSupabaseConfigured) {
    return (SEED_REPORTS as unknown as Row[]).slice(0, 20)
  }
  const { data } = await supabaseAdmin
    .from('reports')
    .select('public_token, category, created_at, votes, confirmations, municipality:municipality_id(name_el)')
    .eq('is_approved', true)
    .not('status', 'eq', 'resolved')
    .not('status', 'eq', 'rejected')
    .order('votes', { ascending: false })
    .limit(30)
  return (data ?? []) as unknown as Row[]
}

export default async function TopPage() {
  const locale = await getLocale()
  const t      = getDictionary(locale)
  const l      = t.landing
  const tr     = t.tracking
  const rows   = await getRows()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-primary">{l.topVotedTitle}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{l.topVotedSubtitle}</p>
          </div>
          <Link href="/" className="shrink-0 mt-1 text-sm font-bold text-primary bg-primary-50 px-3 py-1.5 rounded-xl hover:bg-primary-100 transition-colors">
            🌿
          </Link>
        </div>

        {/* Filter tabs — static UI, backend filtering deferred */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {[
            { label: locale === 'el' ? 'Πανελλαδικά' : locale === 'de' ? 'Griechenlandweit' : 'All Greece', active: true },
            { label: locale === 'el' ? 'Ο δήμος μου' : locale === 'de' ? 'Meine Gemeinde' : 'My municipality', active: false },
          ].map(tab => (
            <span
              key={tab.label}
              className="shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-colors"
              style={{
                background: tab.active ? '#0D6FDB' : '#fff',
                color:      tab.active ? '#fff' : '#4B5563',
                border:     `1px solid ${tab.active ? '#0D6FDB' : '#E5E7EB'}`,
              }}
            >
              {tab.label}
            </span>
          ))}
        </div>

        {/* List */}
        {rows.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-4xl mb-3">🗺️</p>
            <p className="font-bold text-primary">Καμία ανοιχτή αναφορά</p>
          </div>
        ) : (
          <div className="card p-0 overflow-hidden divide-y divide-gray-100">
            {rows.map((r, i) => {
              const days  = daysOpen(r.created_at)
              const tier  = getSeverityTier(days)
              const sev   = SEV_PILL[tier]
              const total = (r.votes ?? 0) + (r.confirmations ?? 1)

              return (
                <Link
                  key={r.public_token}
                  href={`/r/${r.public_token}`}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors no-underline"
                >
                  {/* Rank */}
                  <span
                    className="w-6 text-center text-sm font-extrabold shrink-0"
                    style={{ color: i < 3 ? '#0D6FDB' : '#9CA3AF' }}
                  >
                    {i + 1}
                  </span>

                  {/* Category icon */}
                  <CategoryBadge categoryId={r.category} label="" size="sm" />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {tr.categories[r.category] ?? r.category}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      {r.municipality?.name_el ?? '—'}
                    </p>
                  </div>

                  {/* Severity pill */}
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                    style={{ background: sev.bg, color: sev.text }}
                  >
                    ⏱ {days}d
                  </span>

                  {/* Vote count */}
                  <div className="shrink-0 text-center bg-primary-50 rounded-xl px-2.5 py-1.5">
                    <p className="text-sm font-extrabold text-primary leading-none">{total}</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">👍</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mt-6">
          {locale === 'el' ? 'Ψηφισμένα από πολίτες · ανοιχτά εδώ και καιρό'
           : locale === 'de' ? 'Von Bürgern gewählt · seit langem offen'
           : 'Voted by citizens · open for a long time'}
        </p>
      </div>
    </div>
  )
}
