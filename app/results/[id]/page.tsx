import { getSupabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import OptOutButton from './OptOutButton'

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: submission } = await getSupabaseAdmin()
    .from('submissions')
    .select('*')
    .eq('id', id)
    .single()

  if (!submission) notFound()

  const categories = Object.entries(submission.categories) as [string, { label: string; callout: string }][]
  const shareCardUrl = `/api/share-card/${id}`
  const shareText = `UglyNet™ classified me as "${submission.label}" 💀 uglypeople.com/results/${id}`

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mono text-[#dc2626] text-xs tracking-[4px] uppercase mb-8 fade-in-up">
        🔬 UGLY REPORT™ · Case #{id.slice(0, 8).toUpperCase()}
      </div>

      {/* Subject photo */}
      <div className="relative w-48 h-48 mx-auto mb-8 fade-in-up-delay-1">
        <div className="w-full h-full rounded-lg overflow-hidden border border-[#262626]">
          <Image
            src={submission.image_url}
            alt="Subject"
            fill
            className="object-cover"
            sizes="192px"
            priority
          />
        </div>
        {/* Red corner accent */}
        <div className="absolute -bottom-2 -right-2 bg-[#dc2626] mono text-white text-[10px] px-2 py-1 rounded tracking-widest">
          SUBJECT
        </div>
      </div>

      {/* Big label */}
      <h1 className="text-5xl md:text-6xl font-bold text-[#f5f5f5] leading-tight mb-3 fade-in-up-delay-2 text-center">
        {submission.label}
      </h1>
      <p className="text-[#a3a3a3] mono text-xs tracking-widest mb-12 fade-in-up-delay-3 text-center">
        ANALYZED BY UGLYNET™ · TRAINED ON 14M FACES · 47 UGLINESS DIMENSIONS
      </p>

      {/* Category breakdown */}
      <div className="space-y-0 border border-[#262626] rounded-lg overflow-hidden mb-10 fade-in-up-delay-3">
        {categories.map(([key, cat]) => (
          <div
            key={key}
            className="flex items-center justify-between px-5 py-4 border-b border-[#262626] last:border-b-0 hover:bg-[#111] transition-colors"
          >
            <span className="text-[#a3a3a3] mono text-sm">{cat.label}</span>
            <div className="flex items-center gap-3">
              <span className="text-[#f5f5f5] text-sm text-right">{cat.callout}</span>
              <span className="text-[#dc2626] text-xs">●</span>
            </div>
          </div>
        ))}
      </div>

      {/* Ad slot */}
      <div className="ad-slot bg-[#111] border border-[#262626] rounded-lg p-6 text-[#525252] text-xs mono text-center min-h-[100px] flex items-center justify-center mb-10 fade-in-up-delay-4">
        [ Advertisement ]
      </div>

      {/* Share */}
      <div className="space-y-3 fade-in-up-delay-5">
        <h2 className="mono text-[#dc2626] text-xs tracking-widest uppercase mb-4">Share Your Results</h2>

        <a
          href={shareCardUrl}
          download={`ugly-report-${id.slice(0, 8)}.png`}
          className="flex items-center justify-center gap-2 w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          📥 Download Share Card
        </a>

        <a
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#111] hover:bg-[#1a1a1a] border border-[#262626] hover:border-[#dc2626] text-[#f5f5f5] font-bold py-3 px-6 rounded-lg transition-colors"
        >
          𝕏 Post to X
        </a>

        <a
          href={`https://www.instagram.com/`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#111] hover:bg-[#1a1a1a] border border-[#262626] hover:border-[#dc2626] text-[#f5f5f5] font-bold py-3 px-6 rounded-lg transition-colors"
        >
          📸 Share to Instagram
        </a>
      </div>

      {/* Actions */}
      <div className="mt-10 pt-8 border-t border-[#262626] flex items-center justify-between fade-in-up-delay-6">
        <a href="/" className="text-[#a3a3a3] text-sm hover:text-[#f5f5f5] transition-colors">
          ← Analyze another face
        </a>
        <OptOutButton id={id} inGallery={submission.in_gallery} />
      </div>
    </main>
  )
}
