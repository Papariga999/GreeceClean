import { describe, expect, it } from 'vitest'
import { buildReporterStatusEmail } from '../../lib/reporterEmailTemplates'

describe('buildReporterStatusEmail', () => {
  it('builds a reporter forwarded update with the tracking link', async () => {
    const result = await buildReporterStatusEmail({
      lang: 'en',
      status: 'forwarded',
      reportUrl: 'https://greececlean.test/r/abc123def456',
      municipalityName: 'Athens',
    })

    expect(result.subject).toContain('forwarded')
    expect(result.html).toContain('https://greececlean.test/r/abc123def456')
    expect(result.html).toContain('Athens')
  })

  it('builds a German resolved update', async () => {
    const result = await buildReporterStatusEmail({
      lang: 'de',
      status: 'resolved',
      reportUrl: 'https://greececlean.test/r/abc123def456',
      municipalityName: null,
    })

    expect(result.subject).toContain('erledigt')
  })
})
