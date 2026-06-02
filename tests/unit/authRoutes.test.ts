import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { POST as sendReportEmail } from '../../app/api/send-report-email/route'
import { PATCH as patchAdminReport } from '../../app/api/admin/report/[id]/route'
import { POST as adminLogin } from '../../app/api/admin/login/route'
import { resetRateLimit } from '../../lib/rateLimit'

const REPORT_ID = '11111111-1111-4111-8111-111111111111'

function adminLoginRequest(password: string, ip = '203.0.113.10'): NextRequest {
  const form = new FormData()
  form.set('password', password)
  return new NextRequest('http://localhost/api/admin/login', {
    method: 'POST',
    headers: { 'x-forwarded-for': ip },
    body: form,
  })
}

describe('protected route authorization', () => {
  beforeEach(() => {
    resetRateLimit()
    vi.unstubAllEnvs()
    vi.stubEnv('ADMIN_PASSWORD', 'correct horse battery staple')
    vi.stubEnv('ADMIN_COOKIE_SECRET', '0123456789abcdef0123456789abcdef')
  })

  it('/api/send-report-email rejects missing bearer credentials', async () => {
    const req = new NextRequest('http://localhost/api/send-report-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ report_id: REPORT_ID }),
    })

    const res = await sendReportEmail(req)
    const body = await res.json() as { error: string }

    expect(res.status).toBe(401)
    expect(body.error).toBe('Unauthorized')
  })

  it('/api/admin/report/[id] rejects missing admin sessions before mutations', async () => {
    const req = new NextRequest(`http://localhost/api/admin/report/${REPORT_ID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reject' }),
    })

    const res = await patchAdminReport(req, { params: Promise.resolve({ id: REPORT_ID }) })
    const body = await res.json() as { error: string }

    expect(res.status).toBe(401)
    expect(body.error).toBe('Unauthorized')
  })

  it('/api/admin/login rate-limits repeated password failures by IP', async () => {
    vi.stubEnv('ADMIN_LOGIN_RATE_LIMIT_PER_15_MIN', '2')

    expect((await adminLogin(adminLoginRequest('wrong'))).status).toBe(303)
    expect((await adminLogin(adminLoginRequest('wrong again'))).status).toBe(303)

    const res = await adminLogin(adminLoginRequest('still wrong'))

    expect(res.status).toBe(303)
    expect(res.headers.get('location')).toContain('error=rate_limited')
    expect(res.headers.get('Retry-After')).toBeTruthy()
  })
})
