import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

describe('Supabase security policies', () => {
  it('does not allow public direct inserts into reports', () => {
    const schema = readFileSync(join(root, 'supabase/schema.sql'), 'utf8')

    expect(schema).toContain('drop policy if exists "Anyone can submit a report" on reports;')
    expect(schema).not.toMatch(/create policy "Anyone can submit a report"[\s\S]*?on reports for insert/i)
  })

  it('drops the legacy approval email trigger in the hardening migration', () => {
    const migration = readFileSync(join(root, 'supabase/migrations/005_security_hardening.sql'), 'utf8')

    expect(migration).toContain('drop trigger if exists on_report_approved on reports;')
    expect(migration).toContain('drop function if exists notify_municipality_on_approve();')
  })
})
