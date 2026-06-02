import { describe, expect, it, beforeEach } from 'vitest'
import { checkRateLimit, getClientIp, resetRateLimit } from '../../lib/rateLimit'

describe('checkRateLimit', () => {
  beforeEach(() => resetRateLimit())

  it('allows requests until the limit and then returns retry metadata', () => {
    const first = checkRateLimit('ip:1', { limit: 2, windowMs: 60_000, now: 1000 })
    const second = checkRateLimit('ip:1', { limit: 2, windowMs: 60_000, now: 2000 })
    const third = checkRateLimit('ip:1', { limit: 2, windowMs: 60_000, now: 3000 })

    expect(first.allowed).toBe(true)
    expect(second.allowed).toBe(true)
    expect(third.allowed).toBe(false)
    expect(third.retryAfterSeconds).toBe(58)
  })

  it('starts a new bucket after the window resets', () => {
    expect(checkRateLimit('ip:2', { limit: 1, windowMs: 1000, now: 0 }).allowed).toBe(true)
    expect(checkRateLimit('ip:2', { limit: 1, windowMs: 1000, now: 500 }).allowed).toBe(false)
    expect(checkRateLimit('ip:2', { limit: 1, windowMs: 1000, now: 1001 }).allowed).toBe(true)
  })
})

describe('getClientIp', () => {
  it('prefers trusted forwarding headers', () => {
    const headers = new Headers({
      'x-forwarded-for': '203.0.113.7, 10.0.0.1',
    })
    expect(getClientIp(headers)).toBe('203.0.113.7')
  })
})
