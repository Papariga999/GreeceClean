import { describe, it, expect } from 'vitest'
import { getElapsed, getSeverityTier, formatDuration } from '../../lib/elapsed'

const NOW = new Date('2025-06-01T12:00:00Z')

function daysAgo(n: number): string {
  return new Date(NOW.getTime() - n * 86_400_000).toISOString()
}

describe('getElapsed', () => {
  it('fresh report — 0 days ago', () => {
    const r = { created_at: daysAgo(0), status: 'pending' }
    const e = getElapsed(r, NOW)
    expect(e.daysSinceReported).toBe(0)
    expect(e.daysSinceNotified).toBeNull()
    expect(e.isFrozen).toBe(false)
  })

  it('45-day report, notified 20 days ago', () => {
    const r = { created_at: daysAgo(45), notified_at: daysAgo(20), status: 'forwarded' }
    const e = getElapsed(r, NOW)
    expect(e.daysSinceReported).toBe(45)
    expect(e.daysSinceNotified).toBe(20)
    expect(e.isFrozen).toBe(false)
  })

  it('120-day ignored report, no notified_at', () => {
    const r = { created_at: daysAgo(120), status: 'in_review' }
    const e = getElapsed(r, NOW)
    expect(e.daysSinceReported).toBe(120)
    expect(e.daysSinceNotified).toBeNull()
    expect(e.isFrozen).toBe(false)
  })

  it('resolved report — clock frozen at resolved_at', () => {
    const resolvedAt = daysAgo(5)
    const r = {
      created_at: daysAgo(50),
      notified_at: daysAgo(30),
      resolved_at: resolvedAt,
      status: 'resolved',
    }
    const e = getElapsed(r, NOW)
    // anchor is resolved_at (5 days ago), not NOW
    expect(e.daysSinceReported).toBe(45)   // 50 - 5
    expect(e.daysSinceNotified).toBe(25)   // 30 - 5
    expect(e.isFrozen).toBe(true)
  })

  it('report without notified_at shows null', () => {
    const r = { created_at: daysAgo(10), status: 'in_review' }
    const e = getElapsed(r, NOW)
    expect(e.daysSinceNotified).toBeNull()
  })
})

describe('getSeverityTier', () => {
  it('0 days → fresh', () => expect(getSeverityTier(0)).toBe('fresh'))
  it('7 days → fresh', () => expect(getSeverityTier(7)).toBe('fresh'))
  it('8 days → waiting', () => expect(getSeverityTier(8)).toBe('waiting'))
  it('30 days → waiting', () => expect(getSeverityTier(30)).toBe('waiting'))
  it('31 days → overdue', () => expect(getSeverityTier(31)).toBe('overdue'))
  it('90 days → overdue', () => expect(getSeverityTier(90)).toBe('overdue'))
  it('91 days → ignored', () => expect(getSeverityTier(91)).toBe('ignored'))
  it('500 days → ignored', () => expect(getSeverityTier(500)).toBe('ignored'))
})

describe('formatDuration', () => {
  it('0 days → "today" in EN', () => expect(formatDuration(0, 'en')).toBe('today'))
  it('0 days → "σήμερα" in EL', () => expect(formatDuration(0, 'el')).toBe('σήμερα'))
  it('0 days → "heute" in DE', () => expect(formatDuration(0, 'de')).toBe('heute'))
  it('147 days EN', () => expect(formatDuration(147, 'en')).toBe('147 days'))
  it('147 days EL', () => expect(formatDuration(147, 'el')).toBe('147 ημέρες'))
  it('147 days DE', () => expect(formatDuration(147, 'de')).toBe('147 Tage'))
  it('unknown locale falls back to EN', () => expect(formatDuration(5, 'fr')).toBe('5 days'))
})
