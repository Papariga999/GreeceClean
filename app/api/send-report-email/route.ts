import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'
import { buildMunicipalityReportEmail, type ReportForEmail } from '@/lib/emailTemplates'
import type { Lang } from '@/emails/MunicipalityReport'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.WEBHOOK_SECRET
  if (!secret) return false
  const auth = req.headers.get('authorization') ?? ''
  return auth === `Bearer ${secret}`
}

export async function POST(req: NextRequest) {
  // ── Auth ────────────────────────────────────────────────────────────────────
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
  }

  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: { report_id?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { report_id } = body
  if (!report_id || !UUID_RE.test(report_id)) {
    return NextResponse.json({ error: 'Invalid report_id' }, { status: 400 })
  }

  // ── Fetch report + municipality ─────────────────────────────────────────────
  const { data: report, error: fetchErr } = await supabaseAdmin
    .from('reports')
    .select(`
      id, public_token, category, description, lat, lng,
      image_url, created_at, status,
      municipality:municipality_id (id, name_el, email_official, name_de)
    `)
    .eq('id', report_id)
    .single()

  if (fetchErr || !report) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 })
  }

  const muni = report.municipality as unknown as {
    id: string
    name_el: string
    email_official: string | null
    name_de: string | null
  } | null

  if (!muni) {
    return NextResponse.json({ error: 'No municipality linked to this report' }, { status: 422 })
  }
  if (!muni.email_official) {
    return NextResponse.json({ error: `Municipality ${muni.name_el} has no official email` }, { status: 422 })
  }

  // Determine email language: German municipalities get 'de', rest default to 'el'
  const lang: Lang = muni.name_de ? 'de' : 'el'

  // ── Build & send email ─────────────────────────────────────────────────────
  const { subject, html } = await buildMunicipalityReportEmail(
    report as unknown as ReportForEmail,
    { id: muni.id, name_el: muni.name_el, email_official: muni.email_official, lang },
  )

  let emailStatus: 'sent' | 'failed' = 'sent'
  let emailError: string | null = null

  try {
    await sendEmail({ to: muni.email_official, subject, html })
  } catch (e) {
    emailStatus = 'failed'
    emailError = e instanceof Error ? e.message : 'Unknown error'
    console.error('[send-report-email] Resend error:', emailError)
  }

  // ── Log to email_logs ──────────────────────────────────────────────────────
  await supabaseAdmin.from('email_logs').insert({
    report_id,
    municipality_id: muni.id,
    recipient_email: muni.email_official,
    status:          emailStatus,
    error_message:   emailError,
  })

  if (emailStatus === 'failed') {
    return NextResponse.json({ error: 'Email delivery failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, recipient: muni.email_official })
}
