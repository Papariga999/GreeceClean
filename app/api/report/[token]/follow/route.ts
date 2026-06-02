import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'Reporter status email subscriptions are disabled for the initial phase.' },
    { status: 410 },
  )
}
