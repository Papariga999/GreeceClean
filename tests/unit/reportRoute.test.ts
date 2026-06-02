import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '../../app/api/report/route'
import { resetRateLimit } from '../../lib/rateLimit'

function requestWithForm(form: FormData, ip = '198.51.100.9'): NextRequest {
  return new NextRequest('http://localhost/api/report', {
    method: 'POST',
    headers: { 'x-forwarded-for': ip },
    body: form,
  })
}

function baseForm(overrides: {
  category?: string
  lat?: string
  lng?: string
  image?: File
} = {}): FormData {
  const form = new FormData()
  form.set('image', overrides.image ?? new File(['x'], 'photo.jpg', { type: 'image/jpeg' }))
  form.set('lat', overrides.lat ?? '37.9838')
  form.set('lng', overrides.lng ?? '23.7275')
  form.set('category', overrides.category ?? 'illegal_dump')
  return form
}

describe('POST /api/report validation', () => {
  beforeEach(() => {
    resetRateLimit()
    vi.unstubAllEnvs()
  })

  it('returns a fake success for honeypot submissions without validating the rest', async () => {
    const form = new FormData()
    form.set('hp_field', 'not empty')

    const res = await POST(requestWithForm(form))
    const body = await res.json() as { token: string; trackingUrl: string }

    expect(res.status).toBe(200)
    expect(body.token).toHaveLength(12)
    expect(body.trackingUrl).toContain(`/r/${body.token}`)
  })

  it('rejects missing required fields with a typed error', async () => {
    const res = await POST(requestWithForm(new FormData()))
    const body = await res.json() as { code: string }

    expect(res.status).toBe(400)
    expect(body.code).toBe('missing_fields')
  })

  it('allows valid coordinate ranges outside Greece past geography validation', async () => {
    const res = await POST(requestWithForm(baseForm({ lat: '52.52', lng: '13.405' })))
    const body = await res.json() as { code: string }

    expect(res.status).toBe(422)
    expect(body.code).toBe('image_processing_failed')
  })

  it('rejects invalid categories before image processing', async () => {
    const res = await POST(requestWithForm(baseForm({ category: 'not_real' })))
    const body = await res.json() as { code: string }

    expect(res.status).toBe(422)
    expect(body.code).toBe('invalid_category')
  })

  it('ignores reporter email fields during the initial phase', async () => {
    const image = new File([new Uint8Array(10 * 1024 * 1024 + 1)], 'large.jpg', { type: 'image/jpeg' })
    const form = baseForm({ image })
    form.set('reporter_email', 'not-an-email')

    const res = await POST(requestWithForm(form))
    const body = await res.json() as { code: string }

    expect(res.status).toBe(413)
    expect(body.code).toBe('image_too_large')
  })

  it('rejects oversized images before image processing', async () => {
    const image = new File([new Uint8Array(10 * 1024 * 1024 + 1)], 'large.jpg', { type: 'image/jpeg' })
    const res = await POST(requestWithForm(baseForm({ image })))
    const body = await res.json() as { code: string }

    expect(res.status).toBe(413)
    expect(body.code).toBe('image_too_large')
  })

  it('rate-limits repeated non-honeypot submissions by IP', async () => {
    vi.stubEnv('REPORT_RATE_LIMIT_PER_HOUR', '2')
    const ip = '203.0.113.55'

    expect((await POST(requestWithForm(new FormData(), ip))).status).toBe(400)
    expect((await POST(requestWithForm(new FormData(), ip))).status).toBe(400)

    const res = await POST(requestWithForm(new FormData(), ip))
    const body = await res.json() as { code: string }

    expect(res.status).toBe(429)
    expect(body.code).toBe('rate_limited')
    expect(res.headers.get('Retry-After')).toBeTruthy()
  })
})
