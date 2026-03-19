'use client'

import { useEffect, useState } from 'react'
import { getSupabase, Submission } from '@/lib/supabase'
import Image from 'next/image'

export default function GalleryPreview() {
  const [submissions, setSubmissions] = useState<Submission[]>([])

  useEffect(() => {
    getSupabase()
      .from('submissions')
      .select('id, image_url, label, created_at')
      .eq('in_gallery', true)
      .order('created_at', { ascending: false })
      .limit(12)
      .then(({ data }) => { if (data) setSubmissions(data as Submission[]) })
  }, [])

  if (submissions.length === 0) {
    return (
      <div className="text-center py-16 mono text-sm" style={{ color: 'var(--very-muted)' }}>
        No subjects yet. Be the first to submit. 💅
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
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
            />
          </div>
          <p className="mt-1.5 text-xs mono leading-tight truncate" style={{ color: 'var(--muted)' }}>
            {s.label}
          </p>
        </a>
      ))}
    </div>
  )
}
