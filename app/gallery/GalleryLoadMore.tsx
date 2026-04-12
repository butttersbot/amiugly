"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { getSupabase } from "@/lib/supabase"

const PAGE_SIZE = 24

export default function GalleryLoadMore({ initialCursor, initialCount }: { initialCursor?: string; initialCount: number }) {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [cursor, setCursor] = useState<string | undefined>(initialCursor)
  const [hasMore, setHasMore] = useState(initialCount >= PAGE_SIZE)
  const [loading, setLoading] = useState(false)

  const loadMore = useCallback(async () => {
    if (!cursor) return
    setLoading(true)
    const { data } = await getSupabase()
      .from("submissions")
      .select("id, image_url, label, created_at")
      .eq("in_gallery", true)
      .order("created_at", { ascending: false })
      .lt("created_at", cursor)
      .limit(PAGE_SIZE)

    if (!data || data.length === 0) {
      setHasMore(false)
    } else {
      setSubmissions(prev => [...prev, ...data])
      setCursor(data[data.length - 1].created_at)
      if (data.length < PAGE_SIZE) setHasMore(false)
    }
    setLoading(false)
  }, [cursor])

  return (
    <>
      {submissions.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
          {submissions.map((s) => (
            <a key={s.id} href={`/results/${s.id}`} className="group block">
              <div className="aspect-square relative overflow-hidden rounded-2xl" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
                <Image src={s.image_url} alt={s.label} fill className="object-cover" sizes="(max-width: 640px) 50vw, 16vw" />
              </div>
              <p className="mt-1.5 text-xs mono leading-tight truncate" style={{ color: "var(--muted)" }}>{s.label}</p>
            </a>
          ))}
        </div>
      )}
      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={loadMore}
            disabled={loading}
            className="font-bold py-3 px-8 rounded-2xl transition-colors disabled:opacity-50 mono text-sm"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
          >
            {loading ? "Loading subjects..." : "Load more subjects"}
          </button>
        </div>
      )}
    </>
  )
}
