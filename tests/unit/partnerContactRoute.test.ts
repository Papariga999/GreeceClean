import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  sendEmail: vi.fn(),
}))

vi.mock('@/lib/email', () => ({
  sendEmail: mocks.sendEmail,
}))

function request(body: object, ip = '203.0.113.10'): NextRequest {
  return new NextRequest('http://localhost/api/partners/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  })
}

const VALID_BODY = {
  name: 'Ada Partner',
  org: 'Clean Foundation',
  role: 'Director',
  email: 'ada@example.test',
  interest: 'Foundation / funding',
  region: 'Cyclades',
  message: 'We would like to help.',
  consent: true,
  company: '',
}

describe('/api/partners/contact', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('treats honeypot submissions as successful without sending email', async () => {
    const { POST } = await import('../../app/api/partners/contact/route')

    const res = await POST(request({ ...VALID_BODY, company: 'bot-value' }))
    const body = await res.json() as { ok?: boolean }

    expect(res.status).toBe(200)
    expect(body.ok).toBe(true)
    expect(mocks.sendEmail).not.toHaveBeenCalled()
  })

  it('rejects missing required fields', async () => {
    const { POST } = await import('../../app/api/partners/contact/route')

    const res = await POST(request({ ...VALID_BODY, name: '' }))
    const body = await res.json() as { error?: string }

    expect(res.status).toBe(422)
    expect(body.error).toBe('missing_fields')
    expect(mocks.sendEmail).not.toHaveBeenCalled()
  })

  it('escapes submitted values before rendering the internal email', async () => {
    const { POST } = await import('../../app/api/partners/contact/route')

    const res = await POST(request({
      ...VALID_BODY,
      name: 'Ada <script>',
      org: 'Clean & Co',
      message: 'Hello <b>team</b> & friends',
    }))

    expect(res.status).toBe(200)
    expect(mocks.sendEmail).toHaveBeenCalledOnce()

    const payload = mocks.sendEmail.mock.calls[0][0] as { html: string }
    expect(payload.html).toContain('Ada &lt;script&gt;')
    expect(payload.html).toContain('Clean &amp; Co')
    expect(payload.html).toContain('Hello &lt;b&gt;team&lt;/b&gt; &amp; friends')
    expect(payload.html).not.toContain('<b>team</b>')
  })
})
