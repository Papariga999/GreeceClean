import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { notifyReporterStatus } from '@/lib/reporterNotifications'
import { VALID_CATEGORIES } from '@/lib/categories'
import { isValidAdminSession } from '@/lib/adminAuth'

type Params = { params: Promise<{ id: string }> }

type EmailDispatchResult =
  | { emailDispatched: true; statusUpdated?: boolean; logRecorded?: boolean; reporterNotified?: boolean; skipped?: boolean; reason?: string }
  | { emailDispatched: false; reason: string }

function imageStoragePathFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    const marker = '/reports/'
    const index = parsed.pathname.indexOf(marker)
    if (index === -1) return null
    return decodeURIComponent(parsed.pathname.slice(index + marker.length))
  } catch {
    return null
  }
}

async function dispatchApprovalEmail(reportId: string, options: { force?: boolean } = {}): Promise<EmailDispatchResult> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
  const webhookSecret = process.env.WEBHOOK_SECRET

  if (!appUrl || !webhookSecret) {
    const reason = 'missing webhook configuration'
    console.warn('[auto-email] skipped:', reason, {
      hasAppUrl: Boolean(appUrl),
      hasWebhookSecret: Boolean(webhookSecret),
    })
    return { emailDispatched: false, reason }
  }

  let endpoint: string
  try {
    endpoint = new URL('/api/send-report-email', appUrl).toString()
  } catch {
    const reason = 'invalid NEXT_PUBLIC_APP_URL'
    console.warn('[auto-email] skipped:', reason)
    return { emailDispatched: false, reason }
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${webhookSecret}`,
      },
      body: JSON.stringify({
        report_id: reportId,
        ...(options.force ? { force: true } : {}),
      }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({})) as { error?: string }
      const reason = body.error ?? `email webhook returned HTTP ${res.status}`
      console.warn('[auto-email] webhook did not dispatch:', reason)
      return { emailDispatched: false, reason }
    }

    const body = await res.json().catch(() => ({})) as {
      statusUpdated?: boolean
      logRecorded?: boolean
      reporterNotified?: boolean
      skipped?: boolean
      reason?: string
    }
    return {
      emailDispatched: true,
      statusUpdated: body.statusUpdated,
      logRecorded: body.logRecorded,
      reporterNotified: body.reporterNotified,
      skipped: body.skipped,
      reason: body.reason,
    }
  } catch (e) {
    const reason = e instanceof Error ? e.message : 'email webhook request failed'
    console.warn('[auto-email] webhook request failed:', reason)
    return { emailDispatched: false, reason }
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!isValidAdminSession(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
  }

  const { id } = await params
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ error: 'Invalid report ID' }, { status: 400 })
  }

  let body: {
    action?: string
    category?: string
    status?: string
    municipality_id?: string | null
    description?: string | null
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const VALID_STATUSES = ['pending', 'in_review', 'forwarded', 'resolved', 'rejected']

  let update: Record<string, unknown>
  let dispatchEmailAfterUpdate = false
  let reporterStatusAfterUpdate: 'resolved' | null = null
  if (body.action === 'approve') {
    update = { is_approved: true, status: 'in_review', confirmed_at: new Date().toISOString() }
    dispatchEmailAfterUpdate = true
  } else if (body.action === 'mark_cleaned') {
    update = { status: 'resolved', resolved_at: new Date().toISOString() }
    reporterStatusAfterUpdate = 'resolved'
  } else if (body.action === 'reject') {
    update = { is_approved: false, status: 'rejected' }
  } else if (body.action === 'deactivate') {
    update = { is_approved: false, status: 'pending' }
  } else if (body.action === 'forward') {
    return handleForward(id)
  } else if (body.action === 'resend_email') {
    const dispatch = await dispatchApprovalEmail(id, { force: true })
    return NextResponse.json({ ok: true, ...dispatch })
  } else if (body.action === 'edit') {
    update = {}
    if (body.category && VALID_CATEGORIES.includes(body.category)) update.category = body.category
    if (body.status && VALID_STATUSES.includes(body.status)) update.status = body.status
    if ('municipality_id' in body) {
      update.municipality_id = body.municipality_id && UUID_RE.test(body.municipality_id)
        ? body.municipality_id
        : null
    }
    if ('description' in body) {
      update.description = body.description?.trim() || null
    }
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }
  } else {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('reports').update(update).eq('id', id)
  if (error) {
    console.error('Admin PATCH error:', error)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }

  if (dispatchEmailAfterUpdate) {
    const dispatch = await dispatchApprovalEmail(id)
    return NextResponse.json({ ok: true, ...dispatch })
  }

  if (reporterStatusAfterUpdate) {
    const reporterNotification = await notifyReporterStatus(id, reporterStatusAfterUpdate)
    return NextResponse.json({
      ok: true,
      reporterNotified: reporterNotification.sent,
      reporterNotificationReason: reporterNotification.sent ? undefined : reporterNotification.reason,
    })
  }

  return NextResponse.json({ ok: true })
}

async function handleForward(id: string): Promise<NextResponse> {
  const dispatch = await dispatchApprovalEmail(id)
  if (!dispatch.emailDispatched) {
    return NextResponse.json({ error: dispatch.reason }, { status: 422 })
  }

  return NextResponse.json({ ok: true, ...dispatch })
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!isValidAdminSession(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
  }

  const { id } = await params
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ error: 'Invalid report ID' }, { status: 400 })
  }

  // Fetch storage identifiers first so we can remove every stored image.
  const { data: report } = await supabaseAdmin
    .from('reports')
    .select('public_token, image_urls')
    .eq('id', id)
    .single()

  const paths = new Set<string>()
  if (report?.public_token) {
    paths.add(`${report.public_token}.webp`)
    paths.add(`${report.public_token}_2.webp`)
    paths.add(`${report.public_token}_3.webp`)
  }
  if (Array.isArray(report?.image_urls)) {
    for (const url of report.image_urls) {
      if (typeof url !== 'string') continue
      const path = imageStoragePathFromUrl(url)
      if (path) paths.add(path)
    }
  }

  if (paths.size > 0) {
    const { error: storageError } = await supabaseAdmin.storage.from('reports').remove([...paths])
    if (storageError) {
      console.error('Admin DELETE storage cleanup error:', storageError)
    }
  }

  const { error } = await supabaseAdmin.from('reports').delete().eq('id', id)
  if (error) {
    console.error('Admin DELETE error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
