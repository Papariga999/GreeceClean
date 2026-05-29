import { describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { POST as sendReportEmail } from '../../app/api/send-report-email/route'
import { PATCH as patchAdminReport } from '../../app/api/admin/report/[id]/route'

const REPORT_ID = '11111111-1111-4111-8111-111111111111'

describe('protected route authorization', () => {
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
})
