import { NextRequest, NextResponse } from 'next/server'
import { RekognitionClient, DetectFacesCommand } from '@aws-sdk/client-rekognition'
import { getSupabaseAdmin } from '@/lib/supabase'
import { scoreImage } from '@/lib/scoring'

const rekognition = new RekognitionClient({
  region: process.env.AWS_REGION ?? 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('image') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image provided.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Confirm it's a face
    const detectResult = await rekognition.send(
      new DetectFacesCommand({ Image: { Bytes: buffer } })
    )

    if (!detectResult.FaceDetails || detectResult.FaceDetails.length === 0) {
      return NextResponse.json(
        { error: "UglyNet™ could not locate a face. Are you sure that's you?" },
        { status: 422 }
      )
    }

    // Score the image
    const { score, label, categories } = scoreImage(buffer)

    // Upload to Supabase Storage
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`
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
      .insert({ image_url, label, score, categories, in_gallery: true })
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
