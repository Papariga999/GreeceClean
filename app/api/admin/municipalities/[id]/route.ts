import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { isValidAdminSession } from '@/lib/adminAuth'

type Params = { params: Promise<{ id: string }> }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!isValidAdminSession(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
  }

  const { id } = await params
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ error: 'Invalid municipality ID' }, { status: 400 })
  }

  const body = (await req.json()) as {
    email_official?: string
    region?: string
    name_el?: string
    name_en?: string
    name_de?: string
  }

  const update: Record<string, string | null> = {}

  if ('email_official' in body) {
    const email = (body.email_official ?? '').trim().toLowerCase()
    if (email !== '' && !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    update.email_official = email || null
  }

  if ('region' in body) {
    update.region = (body.region ?? '').trim().slice(0, 255)
  }

  if ('name_el' in body) {
    const val = (body.name_el ?? '').trim().slice(0, 255)
    if (!val) return NextResponse.json({ error: 'name_el cannot be empty' }, { status: 400 })
    update.name_el = val
  }

  if ('name_en' in body) {
    update.name_en = (body.name_en ?? '').trim().slice(0, 255)
  }

  if ('name_de' in body) {
    update.name_de = (body.name_de ?? '').trim().slice(0, 255)
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No valid fields provided' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('municipalities')
    .update(update)
    .eq('id', id)

  if (error) {
    console.error('Municipality PATCH error:', error)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
