import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildMunicipalityReportEmail, type ReportForEmail } from '../../lib/emailTemplates'

const report: ReportForEmail = {
  id: '11111111-1111-4111-8111-111111111111',
  public_token: 'abc123def456',
  category: 'illegal_dump',
  description: 'Near the old road',
  lat: 37.9838,
  lng: 23.7275,
  image_url: 'https://example.test/photo.webp',
  created_at: '2026-05-29T12:00:00Z',
  status: 'in_review',
}

describe('buildMunicipalityReportEmail', () => {
  afterEach(() => vi.unstubAllEnvs())

  it('builds a Greek municipality email with report and map links', async () => {
    vi.stubEnv('NEXT_PUBLIC_APP_URL', 'https://greececlean.test')

    const result = await buildMunicipalityReportEmail(report, {
      id: 'muni-1',
      name_el: 'Δήμος Ρόδου',
      email_official: 'info@example.gr',
      lang: 'el',
    })

    expect(result.subject).toContain('Δήμος Ρόδου')
    expect(result.html).toContain('https://greececlean.test/r/abc123def456')
    expect(result.html).toContain('https://www.google.com/maps?q=37.9838,23.7275')
  })

  it('uses the German subject prefix when requested', async () => {
    const result = await buildMunicipalityReportEmail(report, {
      id: 'muni-2',
      name_el: 'Gemeinde Rhodos',
      email_official: 'info@example.gr',
      lang: 'de',
    })

    expect(result.subject).toContain('[ACHTUNG]')
    expect(result.subject).toContain('Gemeinde Rhodos')
  })
})
