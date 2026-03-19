import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { scoreImage } from '@/lib/scoring'

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic']
const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('image') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image provided.' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'UglyNet™ only accepts JPEG, PNG, WebP, or HEIC images.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'Image too large. UglyNet™ has standards. Keep it under 10MB.' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Score the image (hash-seeded pseudorandom — same photo always gets same score)
    const { score, label, categories, imageHash } = scoreImage(buffer)

    // Dedup: if this exact image was uploaded before, return the existing result
    const { data: existing } = await getSupabaseAdmin()
      .from('submissions')
      .select('id, label, categories')
      .eq('image_hash', imageHash)
      .single()

    if (existing) {
      return NextResponse.json({ id: existing.id, label: existing.label, categories: existing.categories })
    }

    // Upload to Supabase Storage
    const filename = `${imageHash}.jpg`
    const { error: uploadError } = await getSupabaseAdmin().storage
      .from('faces')
      .upload(filename, buffer, { contentType: file.type, upsert: false })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: 'Failed to store image.' }, { status: 500 })
    }

    const { data: urlData } = getSupabaseAdmin().storage.from('faces').getPublicUrl(filename)
    const image_url = urlData.publicUrl

    // Store submission
    const { data: submission, error: dbError } = await getSupabaseAdmin()
      .from('submissions')
      .insert({ image_url, label, score, categories, in_gallery: true, image_hash: imageHash })
      .select()
      .single()

    if (dbError) {
      console.error('DB error:', dbError)
      return NextResponse.json({ error: 'Failed to save submission.' }, { status: 500 })
    }

    return NextResponse.json({ id: submission.id, label, categories })
  } catch (err) {
    console.error('Analyze error:', err)
    return NextResponse.json({ error: 'Something went wrong. UglyNet™ is overwhelmed.' }, { status: 500 })
  }
}
