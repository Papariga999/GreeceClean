// Severity thresholds in days — adjust here to change all tiers at once
const TIER_WAITING = 7
const TIER_OVERDUE = 30
const TIER_IGNORED = 60

export type SeverityTier = 'fresh' | 'waiting' | 'overdue' | 'ignored'

export type ElapsedReport = {
  created_at: string
  notified_at?: string | null
  resolved_at?: string | null
  status?: string
}

export type ElapsedResult = {
  daysSinceReported: number
  daysSinceNotified: number | null
  isFrozen: boolean
}

function daysBetween(from: string, to: Date): number {
  return Math.floor((to.getTime() - new Date(from).getTime()) / 86_400_000)
}

export function getElapsed(report: ElapsedReport, now = new Date()): ElapsedResult {
  const frozen = report.status === 'resolved' || report.status === 'rejected'
  const anchor = frozen && report.resolved_at ? new Date(report.resolved_at) : now

  const daysSinceReported = Math.max(0, daysBetween(report.created_at, anchor))
  const daysSinceNotified =
    report.notified_at != null
      ? Math.max(0, daysBetween(report.notified_at, anchor))
      : null

  return { daysSinceReported, daysSinceNotified, isFrozen: frozen }
}

export function getSeverityTier(days: number): SeverityTier {
  if (days >= TIER_IGNORED) return 'ignored'
  if (days >= TIER_OVERDUE) return 'overdue'
  if (days >= TIER_WAITING) return 'waiting'
  return 'fresh'
}

const DURATION_STRINGS: Record<string, Record<string, string>> = {
  today: { el: 'σήμερα', en: 'today', de: 'heute' },
  days:  { el: 'ημέρες', en: 'days',  de: 'Tage'  },
}

export function formatDuration(days: number, locale: string): string {
  const lang = ['el', 'en', 'de'].includes(locale) ? locale : 'en'
  if (days < 1) return DURATION_STRINGS.today[lang]
  return `${days} ${DURATION_STRINGS.days[lang]}`
}
