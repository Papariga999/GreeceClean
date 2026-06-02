import type { Metadata } from 'next'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { SEED_REPORTS } from '@/lib/seed-data'
import { getLocale, getDictionary } from '@/lib/i18n'
import { getElapsed, getSeverityTier } from '@/lib/elapsed'
import CategoryBadge from '@/components/CategoryBadge'
import ElapsedTimeBadge from '@/components/reports/ElapsedTimeBadge'
import VoteButtons from '@/components/reports/VoteButtons'
import TrackingActions from '@/components/reports/TrackingActions'
import ResolvedView from '@/components/reports/ResolvedView'
import ReportLocationMap from '@/components/reports/ReportLocationMap'

type Report = {
  public_token: string
  status: string
  image_url: string | null
  image_urls?: string[] | null
  lat: number
  lng: number
  category: string
  created_at: string
  confirmed_at?: string | null
  notified_at?: string | null
  resolved_at?: string | null
  description?: string | null
  votes?: number
  confirmations?: number
  municipality_id?: string | null
  municipality: { name_el: string } | null
}

type NearbyReport = {
  public_token: string
  lat: number
  lng: number
  category: string
  created_at: string
  municipality: { name_el: string } | null
  distanceKm: number
}

async function getReport(token: string): Promise<Report | null> {
  if (isSupabaseConfigured) {
    const { data } = await supabaseAdmin
      .from('reports')
      .select('public_token, status, image_url, image_urls, lat, lng, category, created_at, confirmed_at, notified_at, resolved_at, description, votes, confirmations, municipality_id, municipality:municipality_id(name_el)')
      .eq('public_token', token)
      .single()
    if (data) return data as unknown as Report
  }
  return SEED_REPORTS.find((r) => r.public_token === token) ?? null
}

function calcDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLng = (lng2 - lng1) * (Math.PI / 180)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

async function getNearby(current: Report): Promise<NearbyReport[]> {
  let rows: Array<{ public_token: string; lat: number; lng: number; category: string; created_at: string; municipality: { name_el: string } | null }>

  if (isSupabaseConfigured) {
    const { data } = await supabaseAdmin
      .from('reports')
      .select('public_token, lat, lng, category, created_at, municipality:municipality_id(name_el)')
      .eq('is_approved', true)
    rows = (data ?? []) as unknown as typeof rows
  } else {
    rows = SEED_REPORTS as typeof rows
  }

  return rows
    .filter((r) => r.public_token !== current.public_token)
    .map((r) => ({ ...r, distanceKm: calcDistanceKm(current.lat, current.lng, r.lat, r.lng) }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 2)
}

function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? 'https://greececlean.gr'
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>
}): Promise<Metadata> {
  const { token } = await params
  const [report, locale] = await Promise.all([getReport(token), getLocale()])
  const t = getDictionary(locale)

  if (!report) {
    return { title: `${t.tracking.notFoundTitle} – GreeceClean` }
  }

  const category = t.tracking.categories[report.category] ?? report.category
  const place    = report.municipality?.name_el ?? 'GreeceClean'
  const title    = `${category} – ${place}`
  const desc     = report.description ?? `${t.tracking.pageTitle} | GreeceClean`
  const url      = `${appUrl()}/r/${token}`

  return {
    title: `${title} | GreeceClean`,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url,
      locale: locale === 'el' ? 'el_GR' : locale === 'de' ? 'de_DE' : 'en_GB',
      type: 'website',
      ...(report.image_url && {
        images: [{ url: report.image_url, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: report.image_url ? 'summary_large_image' : 'summary',
      title,
      description: desc,
      ...(report.image_url && { images: [report.image_url] }),
    },
  }
}

// Severity colour for nearby cards
const SEV_COLORS: Record<string, { bg: string; text: string }> = {
  fresh:    { bg: '#DCFCE7', text: '#15803D' },
  waiting:  { bg: '#FEF3C7', text: '#D97706' },
  overdue:  { bg: '#FFEDD5', text: '#EA580C' },
  ignored:  { bg: '#FEE2E2', text: '#DC2626' },
}

function daysOpen(createdAt: string) {
  return Math.floor((Date.now() - new Date(createdAt).getTime()) / 86_400_000)
}

export default async function TrackingPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const [report, locale] = await Promise.all([getReport(token), getLocale()])
  const t  = getDictionary(locale)
  const tr = t.tracking

  const nearby = report ? await getNearby(report) : []

  if (!report) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="card max-w-md w-full text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-xl font-bold text-primary mb-2">{tr.notFoundTitle}</h1>
          <p className="text-gray-500 text-sm">{tr.notFoundDesc}</p>
        </div>
      </div>
    )
  }

  const trackingUrl = `${appUrl()}/r/${report.public_token}`
  // Plain text for share sheet (URL appended per-platform inside ShareSheet)
  const shareText   = tr.whatsappTemplate.replace('{url}', '').replace(/\s+$/, '')
  const isRejected   = report.status === 'rejected'
  const isResolved   = report.status === 'resolved'

  const elapsed = getElapsed(report)
  const primaryDays = elapsed.daysSinceNotified ?? elapsed.daysSinceReported
  const mapTier = isResolved ? 'fresh' : getSeverityTier(primaryDays)

  const formatMilestoneDate = (value?: string | null) =>
    value
      ? new Date(value).toLocaleDateString(locale === 'el' ? 'el-GR' : locale === 'de' ? 'de-DE' : 'en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : null

  const milestoneDates = [
    report.created_at,
    report.confirmed_at,
    report.notified_at,
    report.resolved_at,
  ]

  const STEPS = tr.steps.map((label, i) => ({
    label,
    date: formatMilestoneDate(milestoneDates[i]),
    done: [
      () => true,
      (s: string) => ['in_review', 'forwarded', 'resolved'].includes(s),
      (s: string) => ['forwarded', 'resolved'].includes(s),
      (s: string) => s === 'resolved',
    ][i],
  }))

  const votes         = report.votes         ?? 0
  const confirmations = report.confirmations ?? 1

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto space-y-5">
        <h1 className="text-2xl font-bold text-primary">{tr.pageTitle}</h1>

        {/* Photos */}
        {report.image_url && (() => {
          const allUrls = report.image_urls?.length ? report.image_urls : [report.image_url]
          return allUrls.length === 1 ? (
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <img src={allUrls[0]} alt={tr.pageTitle} className="w-full object-cover max-h-72" />
            </div>
          ) : (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {allUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`${tr.pageTitle} ${i + 1}`}
                  className="h-56 w-auto rounded-2xl object-cover shrink-0 shadow-sm"
                />
              ))}
            </div>
          )
        })()}

        {/* Map */}
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-52">
          <ReportLocationMap lat={report.lat} lng={report.lng} tier={mapTier} title={tr.pageTitle} />
        </div>

        {/* Details */}
        <div className="card">
          <dl className="text-sm text-gray-600 space-y-1.5">
            <div className="flex gap-2">
              <dt className="font-medium shrink-0">{tr.labelCategory}</dt>
              <dd>
                <CategoryBadge
                  categoryId={report.category}
                  label={tr.categories[report.category] ?? report.category}
                  size="sm"
                />
              </dd>
            </div>
            {report.municipality && (
              <div className="flex gap-2">
                <dt className="font-medium shrink-0">{tr.labelMunicipality}</dt>
                <dd>
                  {report.municipality_id ? (
                    <a href={`/scorecard/${report.municipality_id}`} className="text-primary hover:underline font-medium">
                      {report.municipality.name_el} ›
                    </a>
                  ) : report.municipality.name_el}
                </dd>
              </div>
            )}
            <div className="flex gap-2">
              <dt className="font-medium shrink-0">{tr.labelSubmitted}</dt>
              <dd>{new Date(report.created_at).toLocaleDateString(locale === 'el' ? 'el-GR' : locale === 'de' ? 'de-DE' : 'en-GB')}</dd>
            </div>
            {report.description && (
              <div className="pt-2 border-t border-gray-100 mt-2">
                <dt className="font-medium text-gray-700 mb-1">{tr.labelDescription}</dt>
                <dd className="text-gray-600 leading-relaxed">{report.description}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Rejected */}
        {isRejected && (
          <div className="card bg-red-50 border border-red-200">
            <p className="text-red-700 text-sm font-medium">{tr.rejectedMsg}</p>
          </div>
        )}

        {/* Status stepper */}
        {!isRejected && (
          <div className="card">
            <h2 className="font-semibold text-primary mb-6">{tr.progressTitle}</h2>
            <ol className="relative ml-3 space-y-0">
              {STEPS.map(({ label, date, done }, i) => {
                const isDone = done(report.status)
                const isLast = i === STEPS.length - 1
                return (
                  <li key={label} className={`relative flex gap-4 ${!isLast ? 'pb-7' : ''}`}>
                    {!isLast && (
                      <span className={`absolute left-3.5 top-7 bottom-0 w-0.5 -translate-x-1/2 ${isDone ? 'bg-action' : 'bg-gray-200'}`} />
                    )}
                    <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${isDone ? 'bg-action border-action text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                      {isDone ? '✓' : i + 1}
                    </span>
                    <span className="pt-0.5">
                      <span className={`block text-sm font-medium ${isDone ? 'text-gray-800' : 'text-gray-400'}`}>
                        {label}
                      </span>
                      {isDone && date && (
                        <time className="block text-xs text-gray-400 mt-0.5" dateTime={milestoneDates[i] ?? undefined}>
                          {date}
                        </time>
                      )}
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>
        )}

        {/* Elapsed-time pressure badge */}
        {!isRejected && (
          <ElapsedTimeBadge
            report={report}
            strings={t.elapsed}
            locale={locale}
          />
        )}

        {/* Resolved celebration */}
        {isResolved && (
          <ResolvedView
            url={trackingUrl}
            shareText={shareText}
            total={votes + confirmations}
            strings={{
              resolvedTitle:     tr.resolvedTitle,
              resolvedBy:        tr.resolvedBy,
              resolvedShare:     tr.resolvedShare,
              resolvedShareTitle: tr.resolvedShareTitle,
              copy:              t.copy.copy,
              copied:            t.copy.copied,
            }}
          />
        )}

        {/* Vote buttons — accountability pressure (hidden for rejected/resolved) */}
        {!isRejected && !isResolved && (
          <VoteButtons
            token={report.public_token}
            initialVotes={votes}
            initialConfirmations={confirmations}
            strings={{
              title:          tr.voteTitle,
              important:      tr.voteImportant,
              importantSub:   tr.voteImportantSub,
              stillThere:     tr.voteStillThere,
              stillThereSub:  tr.voteStillThereSub,
              peopleCare:     tr.votePeopleCare,
            }}
          />
        )}

        {/* Clean confirm + Share sheet */}
        {!isRejected && (
          <TrackingActions
            url={trackingUrl}
            shareText={shareText}
            strings={{
              cleanLabel:     tr.cleanLabel,
              cleanThanks:    tr.cleanThanks,
              shareBtn:       tr.shareBtn,
              shareSheetTitle: tr.shareSheetTitle,
              copy:            t.copy.copy,
              copied:          t.copy.copied,
            }}
          />
        )}

        {/* Nearby reports — card grid */}
        {nearby.length > 0 && (
          <div>
            <p className="text-sm font-bold text-gray-700 mb-3">{tr.nearbyTitle} · {nearby.length}</p>
            <div className="grid grid-cols-2 gap-3">
              {nearby.map((r) => {
                const days = daysOpen(r.created_at)
                const tier = getSeverityTier(days)
                const sev  = SEV_COLORS[tier]
                return (
                  <a
                    key={r.public_token}
                    href={`/r/${r.public_token}`}
                    className="card flex flex-col gap-2 p-3 hover:bg-gray-50 active:bg-gray-100 transition-colors no-underline"
                  >
                    <div className="flex items-center justify-between">
                      <CategoryBadge categoryId={r.category} label="" size="sm" />
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: sev.bg, color: sev.text }}
                      >
                        {days}d
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary leading-tight">
                        {tr.categories[r.category] ?? r.category}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {r.municipality?.name_el ?? ''}
                        {r.distanceKm < 1
                          ? ` · ${Math.round(r.distanceKm * 1000)} m`
                          : ` · ${r.distanceKm.toFixed(1)} km`}
                      </p>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
