import { getElapsed, getSeverityTier, formatDuration, type ElapsedReport, type SeverityTier } from '@/lib/elapsed'
import type { Dictionary } from '@/lib/i18n/types'

type Strings = Dictionary['elapsed']

export type { ElapsedReport }

type Props = {
  report: ElapsedReport
  strings: Strings
  locale: string
}

type TierStyle = {
  wrapper: string
  num: string
  label: string
  secondary: string
  pulse: boolean
}

const TIER_STYLES: Record<SeverityTier, TierStyle> = {
  fresh: {
    wrapper:   'bg-white border border-gray-100',
    num:       'text-action-600',
    label:     'text-action-700',
    secondary: 'text-gray-400',
    pulse: false,
  },
  waiting: {
    wrapper:   'bg-warning-light border border-warning',
    num:       'text-warning',
    label:     'text-warning-text',
    secondary: 'text-warning-text/70',
    pulse: false,
  },
  overdue: {
    wrapper:   'bg-overdue-light border border-overdue',
    num:       'text-overdue',
    label:     'text-overdue-text',
    secondary: 'text-overdue-text/70',
    pulse: false,
  },
  ignored: {
    wrapper:   'bg-critical-light border-2 border-critical',
    num:       'text-critical',
    label:     'text-critical-text',
    secondary: 'text-critical-text/70',
    pulse: true,
  },
}

function sub(template: string, n: string): string {
  return template.replace('{n}', n)
}

function tierLabel(tier: SeverityTier, s: Strings): string {
  return { fresh: s.tierFresh, waiting: s.tierWaiting, overdue: s.tierOverdue, ignored: s.tierIgnored }[tier]
}

export default function ElapsedTimeBadge({ report, strings: s, locale }: Props) {
  const { daysSinceReported, daysSinceNotified, isFrozen } = getElapsed(report)

  // Severity is driven by notified days if available, else reported days
  const primaryDays = daysSinceNotified ?? daysSinceReported
  const tier        = getSeverityTier(primaryDays)
  const style       = TIER_STYLES[tier]

  const reportedStr = formatDuration(daysSinceReported, locale)
  const notifiedStr = daysSinceNotified !== null ? formatDuration(daysSinceNotified, locale) : null

  const ariaLabel = [
    sub(s.ariaReported, reportedStr),
    notifiedStr ? sub(s.ariaNotified, notifiedStr) : s.notNotified,
    tierLabel(tier, s),
  ].join(' ')

  return (
    <div className={`rounded-xl px-4 py-3 ${style.wrapper}`} aria-label={ariaLabel} role="status">

      {/* Primary block — municipality clock (dominant) */}
      {daysSinceNotified !== null ? (
        <div className={style.pulse ? 'motion-safe:animate-pulse' : undefined}>
          {/* Hero: big number + unit */}
          <div className="flex items-baseline gap-1">
            <span className={`text-5xl font-black tabular-nums leading-none ${style.num}`}>
              {daysSinceNotified}
            </span>
            <span className={`text-sm font-semibold ${style.label}`}>{s.daysUnit}</span>
          </div>
          {/* Context label below the number */}
          <p className={`mt-0.5 text-xs font-medium ${style.label}`}>{s.notifiedLabel}</p>
          {/* Tier word — visible, not just color */}
          <span className={`inline-block mt-1 text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${style.num} bg-current/10`}
            aria-hidden="true">
            {tierLabel(tier, s)}
          </span>
        </div>
      ) : (
        <p className={`text-xs italic ${style.secondary}`}>{s.notNotified}</p>
      )}

      {/* Secondary — reported clock (always shown, smaller) */}
      <p className={`mt-2 text-xs ${style.secondary}`}>
        {sub(s.reportedAgo, reportedStr)}
        {isFrozen && ' ✓'}
      </p>
    </div>
  )
}
