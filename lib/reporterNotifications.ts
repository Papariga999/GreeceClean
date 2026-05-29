import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'
import { buildReporterStatusEmail } from '@/lib/reporterEmailTemplates'
import type { ReporterStatus, ReporterStatusLang } from '@/emails/ReporterStatusUpdate'

type SubscriberRow = {
  id: string
  email: string
  locale: ReporterStatusLang
  forwarded_notified_at: string | null
  resolved_notified_at: string | null
}

type ReportRow = {
  id: string
  public_token: string
  municipality: { name_el: string } | null
}

export type ReporterNotificationResult =
  | { attempted: false; sent: false; reason: string }
  | { attempted: true; sent: true }
  | { attempted: true; sent: false; reason: string }

function appUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? 'https://greececlean.gr'
}

function notificationColumn(status: ReporterStatus): 'forwarded_notified_at' | 'resolved_notified_at' {
  return status === 'forwarded' ? 'forwarded_notified_at' : 'resolved_notified_at'
}

export async function notifyReporterStatus(
  reportId: string,
  status: ReporterStatus,
): Promise<ReporterNotificationResult> {
  if (!isSupabaseConfigured) {
    return { attempted: false, sent: false, reason: 'supabase not configured' }
  }

  const { data: subscriber, error: subscriberError } = await supabaseAdmin
    .from('report_subscribers')
    .select('id, email, locale, forwarded_notified_at, resolved_notified_at')
    .eq('report_id', reportId)
    .maybeSingle()

  if (subscriberError) {
    console.error('[reporter-email] subscriber lookup failed:', subscriberError)
    return { attempted: false, sent: false, reason: 'subscriber lookup failed' }
  }
  if (!subscriber) {
    return { attempted: false, sent: false, reason: 'no subscriber' }
  }

  const typedSubscriber = subscriber as SubscriberRow
  const timestampColumn = notificationColumn(status)
  if (typedSubscriber[timestampColumn]) {
    return { attempted: false, sent: false, reason: 'already notified' }
  }

  const { data: report, error: reportError } = await supabaseAdmin
    .from('reports')
    .select('id, public_token, municipality:municipality_id(name_el)')
    .eq('id', reportId)
    .single()

  if (reportError || !report) {
    console.error('[reporter-email] report lookup failed:', reportError)
    return { attempted: false, sent: false, reason: 'report lookup failed' }
  }

  const typedReport = report as unknown as ReportRow
  const { subject, html } = await buildReporterStatusEmail({
    status,
    lang: typedSubscriber.locale,
    reportUrl: `${appUrl()}/r/${typedReport.public_token}`,
    municipalityName: typedReport.municipality?.name_el ?? null,
  })

  try {
    await sendEmail({ to: typedSubscriber.email, subject, html })
  } catch (e) {
    const reason = e instanceof Error ? e.message : 'reporter email failed'
    console.error('[reporter-email] send failed:', reason)
    return { attempted: true, sent: false, reason }
  }

  const { error: updateError } = await supabaseAdmin
    .from('report_subscribers')
    .update({ [timestampColumn]: new Date().toISOString() })
    .eq('id', typedSubscriber.id)

  if (updateError) {
    console.error('[reporter-email] notification timestamp update failed:', updateError)
  }

  return { attempted: true, sent: true }
}
