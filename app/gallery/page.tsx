'use client'

import { useEffect, useState, useCallback } from 'react'
import { getSupabase, Submission } from '@/lib/supabase'
import Image from 'next/image'

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
          <div className="mono text-[#dc2626] text-xs tracking-[4px] uppercase mb-2">
            Subject Registry
          </div>
          <h1 className="text-3xl font-bold">The Gallery</h1>
        </div>
        <a
          href="/"
          className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold py-2 px-5 rounded-lg transition-colors text-sm"
        >
          Analyze Me →
        </a>
      </div>

      {submissions.length === 0 && !loading && (
        <div className="text-center py-24 text-[#525252] mono text-sm">
          No subjects yet. Be the first to submit.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {submissions.map((s) => (
          <a key={s.id} href={`/results/${s.id}`} className="group block">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-[#111] border border-[#262626] group-hover:border-[#dc2626] transition-colors">
              <Image
                src={s.image_url}
                alt={s.label}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                loading="lazy"
              />
            </div>
            <p className="mt-1.5 text-[#a3a3a3] text-xs mono leading-tight group-hover:text-[#dc2626] transition-colors truncate">
              {s.label}
            </p>
          </a>
        ))}

        {/* Ad slot every 24 items */}
        <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6 ad-slot bg-[#111] border border-[#262626] rounded-lg p-6 text-[#525252] text-xs mono text-center min-h-[80px] flex items-center justify-center">
          [ Advertisement ]
        </div>
      </div>

      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-[#111] border border-[#262626] hover:border-[#dc2626] text-[#f5f5f5] font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 mono text-sm"
          >
            {loading ? 'Loading subjects...' : 'Load more subjects'}
          </button>
        </div>
      )}

      {loading && submissions.length === 0 && (
        <div className="text-center py-24 text-[#525252] mono text-sm animate-pulse">
          Loading subjects...
        </div>
      )}
    </main>
  )
}
