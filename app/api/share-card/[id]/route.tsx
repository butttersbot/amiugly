import { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'
import { getSupabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: submission, error } = await getSupabaseAdmin()
    .from('submissions')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !submission) {
    return new Response('Not found', { status: 404 })
  }

  const categories = Object.values(submission.categories) as { label: string; callout: string }[]

  // Fetch photo → base64 so Satori embeds it reliably
  let photoSrc = submission.image_url as string
  try {
    const imgRes = await fetch(submission.image_url)
    if (imgRes.ok) {
      const buf = await imgRes.arrayBuffer()
      const b64 = Buffer.from(buf).toString('base64')
      const mime = imgRes.headers.get('content-type') || 'image/jpeg'
      photoSrc = `data:${mime};base64,${b64}`
    }
  } catch {
    // fall back to remote URL
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#0d0005',
          padding: '48px 44px',
          fontFamily: 'monospace',
        }}
      >
        {/* Top accent line */}
        <div style={{ display: 'flex', width: '100%', height: '3px', backgroundColor: '#e11d48', marginBottom: '36px' }} />

        {/* Header row: badge + thumbnail */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <span style={{ color: '#e11d48', fontSize: '13px', fontWeight: 'bold', letterSpacing: '3px', paddingTop: '4px' }}>
            💅 UGLY REPORT™
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt="subject"
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '12px',
              border: '2px solid #e11d48',
              flexShrink: 0,
            }}
          />
        </div>

        {/* Big label */}
        <div
          style={{
            display: 'flex',
            color: '#fff4f6',
            fontSize: '58px',
            fontWeight: 'bold',
            lineHeight: 1.05,
            marginBottom: '12px',
          }}
        >
          {submission.label as string}
        </div>

        {/* Subline */}
        <div style={{ display: 'flex', color: '#9d6b73', fontSize: '10px', letterSpacing: '2px', marginBottom: '36px' }}>
          UGLYNET™ · 14M FACES · 47 UGLINESS DIMENSIONS
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', height: '1px', backgroundColor: '#2a0010', marginBottom: '28px' }} />

        {/* All 6 categories — single full-width column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
          {categories.map((cat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ color: '#9d6b73', fontSize: '13px' }}>{cat.label}</span>
              <span style={{ color: '#fda4af', fontSize: '13px', textAlign: 'right', maxWidth: '300px' }}>{cat.callout}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', height: '1px', backgroundColor: '#2a0010', marginTop: '32px', marginBottom: '20px' }} />

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#5a2030', fontSize: '11px' }}>amiugly.lol</span>
          <span style={{ color: '#e11d48', fontSize: '11px' }}>science doesn&apos;t lie. unfortunately.</span>
        </div>
      </div>
    ),
    { width: 600, height: 900 }
  )
}
