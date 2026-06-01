import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'
import { buildMunicipalityReportEmail, type ReportForEmail } from '@/lib/emailTemplates'
import { notifyReporterStatus } from '@/lib/reporterNotifications'
import type { Lang } from '@/emails/MunicipalityReport'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

type EmailRequestBody = {
  report_id?: string
  force?: boolean
}

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
  let body: EmailRequestBody
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
      image_url, created_at, status, notified_at,
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

  if (body.force !== true) {
    const { data: existingSentLog, error: sentLogError } = await supabaseAdmin
      .from('email_logs')
      .select('id, recipient_email, sent_at')
      .eq('report_id', report_id)
      .eq('status', 'sent')
      .order('sent_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (sentLogError) {
      console.error('[send-report-email] sent email lookup failed:', sentLogError)
    }

    const notifiedAt = (report as { notified_at?: string | null }).notified_at
    if (existingSentLog || notifiedAt) {
      return NextResponse.json({
        ok: true,
        recipient: muni.email_official,
        statusUpdated: false,
        reporterNotified: false,
        logRecorded: true,
        skipped: true,
        reason: 'already_sent',
      })
    }
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
  let statusUpdated = false
  let reporterNotified = false
  if (emailStatus === 'sent') {
    const currentStatus = (report as { status?: string }).status
    const update = currentStatus === 'resolved'
      ? { notified_at: new Date().toISOString() }
      : { status: 'forwarded', notified_at: new Date().toISOString() }

    const { error: updateErr } = await supabaseAdmin
      .from('reports')
      .update(update)
      .eq('id', report_id)

    if (updateErr) {
      console.error('[send-report-email] report status update failed:', updateErr)
    } else {
      statusUpdated = true
      const reporterNotification = await notifyReporterStatus(report_id, 'forwarded')
      reporterNotified = reporterNotification.sent
    }
  }

  const { error: logErr } = await supabaseAdmin.from('email_logs').insert({
    report_id,
    municipality_id: muni.id,
    recipient_email: muni.email_official,
    status:          emailStatus,
    error_message:   emailError,
  })

  if (logErr) {
    console.error('[send-report-email] email_logs insert failed:', logErr)
  }

  if (emailStatus === 'failed') {
    return NextResponse.json({ error: 'Email delivery failed' }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    recipient: muni.email_official,
    statusUpdated,
    reporterNotified,
    logRecorded: !logErr,
  })
}
