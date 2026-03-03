import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: submission, error } = await getSupabaseAdmin()
    .from('submissions')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !submission) {
    return new NextResponse('Not found', { status: 404 })
  }

  const categories = Object.values(submission.categories) as { label: string; callout: string }[]

  const element = {
    type: 'div',
    key: null,
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column' as const,
        width: '600px',
        height: '400px',
        backgroundColor: '#0a0a0a',
        padding: '40px',
        border: '1px solid #dc2626',
        fontFamily: 'monospace',
      },
      children: [
        {
          type: 'div',
          key: 'header',
          props: {
            style: { display: 'flex', alignItems: 'center', marginBottom: '12px' },
            children: {
              type: 'span',
              key: null,
              props: {
                style: { color: '#dc2626', fontSize: '13px', fontWeight: 'bold', letterSpacing: '3px' },
                children: '🔬 UGLY REPORT™',
              },
            },
          },
        },
        {
          type: 'div',
          key: 'label',
          props: {
            style: { color: '#f5f5f5', fontSize: '40px', fontWeight: 'bold', marginBottom: '6px', lineHeight: 1.1 },
            children: submission.label as string,
          },
        },
        {
          type: 'div',
          key: 'subline',
          props: {
            style: { color: '#a3a3a3', fontSize: '10px', letterSpacing: '1px', marginBottom: '24px' },
            children: 'ANALYZED BY UGLYNET™ · 14M FACES · 47 UGLINESS DIMENSIONS',
          },
        },
        {
          type: 'div',
          key: 'categories',
          props: {
            style: { display: 'flex', flexDirection: 'column' as const, gap: '8px', flex: 1 },
            children: categories.slice(0, 4).map((cat, i) => ({
              type: 'div',
              key: String(i),
              props: {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
                children: [
                  {
                    type: 'span',
                    key: 'l',
                    props: { style: { color: '#a3a3a3', fontSize: '12px' }, children: cat.label },
                  },
                  {
                    type: 'span',
                    key: 'r',
                    props: { style: { color: '#dc2626', fontSize: '12px' }, children: cat.callout },
                  },
                ],
              },
            })),
          },
        },
        {
          type: 'div',
          key: 'footer',
          props: {
            style: {
              color: '#525252',
              fontSize: '11px',
              marginTop: '20px',
              borderTop: '1px solid #262626',
              paddingTop: '12px',
            },
            children: "uglypeople.com · science doesn't lie. unfortunately.",
          },
        },
      ],
    },
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svg = await satori(element as any, {
    width: 600,
    height: 400,
    fonts: [],
  })

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 600 } })
  const pngData = resvg.render().asPng()
  const png = new Uint8Array(pngData)

  return new NextResponse(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
