import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { error } = await getSupabaseAdmin()
    .from('submissions')
    .update({ in_gallery: false })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: 'Failed to remove from gallery.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
