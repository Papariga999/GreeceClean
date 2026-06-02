import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { getLocale } from '@/lib/i18n'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params

  if (!/^[0-9a-f]{12}$/.test(token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  }

  let body: unknown
  try { body = await req.json() } catch { body = {} }
  const email = ((body as Record<string, unknown>).email ?? '').toString().trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 422 })
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json({ ok: true })
  }

  const { data: report } = await supabaseAdmin
    .from('reports')
    .select('id, is_approved')
    .eq('public_token', token)
    .single()

  if (!report?.is_approved) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 })
  }

  const locale = await getLocale()

  // Insert subscriber; ignore if (report_id, email) already exists
  const { error } = await supabaseAdmin
    .from('report_subscribers')
    .upsert(
      { report_id: report.id, email, locale },
      { onConflict: 'report_id,email', ignoreDuplicates: true },
    )

  if (error) {
    console.error('report_subscribers upsert error:', error)
    return NextResponse.json({ error: 'Could not save subscription' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
