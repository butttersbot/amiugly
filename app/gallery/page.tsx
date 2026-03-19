'use client'

import { useEffect, useState, useCallback } from 'react'
import { getSupabase, Submission } from '@/lib/supabase'
import Image from 'next/image'
import AdUnit from '@/app/components/AdUnit'

const PAGE_SIZE = 24

export default function GalleryPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [cursor, setCursor] = useState<string | null>(null)

  const loadMore = useCallback(async () => {
    setLoading(true)
    let query = getSupabase()
      .from('submissions')
      .select('id, image_url, label, created_at')
      .eq('in_gallery', true)
      .order('created_at', { ascending: false })
      .limit(PAGE_SIZE)

    if (cursor) {
      query = query.lt('created_at', cursor)
    }

    const { data } = await query
    if (!data || data.length === 0) {
      setHasMore(false)
    } else {
      setSubmissions(prev => [...prev, ...(data as Submission[])])
      setCursor(data[data.length - 1].created_at)
      if (data.length < PAGE_SIZE) setHasMore(false)
    }
    setLoading(false)
  }, [cursor])

  useEffect(() => { loadMore() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="mono text-xs tracking-[4px] uppercase mb-2" style={{ color: 'var(--accent)' }}>
            ✨ Subject Registry
          </div>
          <h1 className="serif text-3xl" style={{ color: 'var(--text)' }}>The Gallery</h1>
        </div>
        <a
          href="/"
          className="text-white font-bold py-2 px-5 rounded-2xl transition-colors text-sm"
          style={{ background: 'var(--accent)' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-dark)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
        >
          Rate Me ✨
        </a>
      </div>

      {submissions.length === 0 && !loading && (
        <div className="text-center py-24 mono text-sm" style={{ color: 'var(--very-muted)' }}>
          No subjects yet. Be the first to submit.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {submissions.map((s) => (
          <a key={s.id} href={`/results/${s.id}`} className="group block">
            <div
              className="aspect-square relative overflow-hidden rounded-2xl transition-colors"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <Image
                src={s.image_url}
                alt={s.label}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                loading="lazy"
              />
            </div>
            <p className="mt-1.5 text-xs mono leading-tight truncate transition-colors" style={{ color: 'var(--muted)' }}>
              {s.label}
            </p>
          </a>
        ))}

        {/* Ad slot every 24 items */}
        <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6">
          <AdUnit slot="7310699401" format="horizontal" />
        </div>
      </div>

      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={loadMore}
            disabled={loading}
            className="font-bold py-3 px-8 rounded-2xl transition-colors disabled:opacity-50 mono text-sm"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            {loading ? 'Loading subjects...' : 'Load more subjects'}
          </button>
        </div>
      )}

      {loading && submissions.length === 0 && (
        <div className="text-center py-24 mono text-sm animate-pulse" style={{ color: 'var(--very-muted)' }}>
          Loading subjects...
        </div>
      )}
    </main>
  )
}
