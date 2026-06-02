import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const REPORT_ID = '11111111-1111-4111-8111-111111111111'

const mocks = vi.hoisted(() => ({
  sendEmail: vi.fn(),
  buildMunicipalityReportEmail: vi.fn(async () => ({ subject: 'subject', html: '<p>body</p>' })),
  notifyReporterStatus: vi.fn(async () => ({ attempted: false, sent: false, reason: 'not needed' })),
  reportResult: {
    data: {
      id: '11111111-1111-4111-8111-111111111111',
      public_token: 'abc123def456',
      category: 'illegal_dump',
      description: null,
      lat: 37.9838,
      lng: 23.7275,
      image_url: 'https://example.test/report.webp',
      created_at: '2026-01-01T00:00:00Z',
      status: 'in_review',
      notified_at: null,
      municipality: {
        id: '22222222-2222-4222-8222-222222222222',
        name_el: 'Δήμος Αθήνας',
        email_official: 'city@example.test',
        name_de: null,
      },
    },
    error: null,
  },
  sentLogResult: {
    data: {
      id: '33333333-3333-4333-8333-333333333333',
      recipient_email: 'city@example.test',
      sent_at: '2026-01-01T00:00:00Z',
    },
    error: null,
  },
}))

function query(result: { single?: unknown; maybeSingle?: unknown }) {
  const chain = {
    select: vi.fn(() => chain),
    eq: vi.fn(() => chain),
    order: vi.fn(() => chain),
    limit: vi.fn(() => chain),
    single: vi.fn(async () => result.single),
    maybeSingle: vi.fn(async () => result.maybeSingle),
  }
  return chain
}

vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabaseAdmin: {
    from: vi.fn((table: string) => {
      if (table === 'reports') return query({ single: mocks.reportResult })
      if (table === 'email_logs') return query({ maybeSingle: mocks.sentLogResult })
      return query({})
    }),
  },
}))

vi.mock('@/lib/email', () => ({
  sendEmail: mocks.sendEmail,
}))

vi.mock('@/lib/emailTemplates', () => ({
  buildMunicipalityReportEmail: mocks.buildMunicipalityReportEmail,
}))

vi.mock('@/lib/reporterNotifications', () => ({
  notifyReporterStatus: mocks.notifyReporterStatus,
}))

function request(body: object): NextRequest {
  return new NextRequest('http://localhost/api/send-report-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer test-webhook-secret',
    },
    body: JSON.stringify(body),
  })
}

describe('/api/send-report-email idempotency', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    vi.stubEnv('WEBHOOK_SECRET', 'test-webhook-secret')
  })

  it('skips sending when a report already has a sent email log', async () => {
    const { POST } = await import('../../app/api/send-report-email/route')

    const res = await POST(request({ report_id: REPORT_ID }))
    const body = await res.json() as { skipped?: boolean; reason?: string }

    expect(res.status).toBe(200)
    expect(body.skipped).toBe(true)
    expect(body.reason).toBe('already_sent')
    expect(mocks.buildMunicipalityReportEmail).not.toHaveBeenCalled()
    expect(mocks.sendEmail).not.toHaveBeenCalled()
  })
})
