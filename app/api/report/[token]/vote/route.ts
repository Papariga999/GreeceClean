import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'

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
  const type = (body as Record<string, unknown>).type as string
  if (type !== 'vote' && type !== 'confirm') {
    return NextResponse.json({ error: 'type must be vote or confirm' }, { status: 400 })
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json({ votes: 1, confirmations: 1 })
  }

  const { data: report, error: fetchErr } = await supabaseAdmin
    .from('reports')
    .select('id, votes, confirmations, is_approved')
    .eq('public_token', token)
    .single()

  if (fetchErr || !report?.is_approved) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 })
  }

  const col = type === 'vote' ? 'votes' : 'confirmations'
  const newVal = ((report[col] as number) ?? 0) + 1

  const { error: updateErr } = await supabaseAdmin
    .from('reports')
    .update({ [col]: newVal })
    .eq('id', report.id)

  if (updateErr) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }

  return NextResponse.json({
    votes:         type === 'vote'    ? newVal : (report.votes as number),
    confirmations: type === 'confirm' ? newVal : (report.confirmations as number),
  })
}
