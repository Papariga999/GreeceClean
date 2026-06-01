import { afterEach, describe, expect, it, vi } from 'vitest'
import { isValidAdminToken, signAdminToken } from '../../lib/adminAuth'

describe('admin auth tokens', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllEnvs()
  })

  it('accepts signed unexpired tokens', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))
    vi.stubEnv('ADMIN_PASSWORD', 'correct horse battery staple')
    vi.stubEnv('ADMIN_COOKIE_SECRET', '0123456789abcdef0123456789abcdef')

    const token = signAdminToken('correct horse battery staple', '0123456789abcdef0123456789abcdef')

    expect(isValidAdminToken(token)).toBe(true)
  })

  it('rejects expired signed tokens', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))
    vi.stubEnv('ADMIN_PASSWORD', 'correct horse battery staple')
    vi.stubEnv('ADMIN_COOKIE_SECRET', '0123456789abcdef0123456789abcdef')

    const token = signAdminToken(
      'correct horse battery staple',
      '0123456789abcdef0123456789abcdef',
      Date.parse('2025-12-31T00:00:00Z'),
    )

    expect(isValidAdminToken(token)).toBe(false)
  })
})
