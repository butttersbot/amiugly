import { getSupabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
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
  const shareText = `UglyNet™ classified me as "${submission.label}" 💀 amiugly.lol/results/${id}`

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mono text-xs tracking-[4px] uppercase mb-5 fade-in-up" style={{ color: 'var(--accent)' }}>
        💅 UGLY REPORT™ · Case #{id.slice(0, 8).toUpperCase()}
      </div>

      {/* Subject photo */}
      <div className="relative w-40 h-40 mx-auto mb-3 fade-in-up-delay-1">
        <div
          className="w-full h-full rounded-2xl overflow-hidden"
          style={{ border: '3px solid var(--border)' }}
        >
          <Image
            src={submission.image_url}
            alt="Subject"
            fill
            className="object-cover"
            sizes="160px"
            priority
          />
        </div>
        <div
          className="absolute -bottom-2 -right-2 mono text-white text-[10px] px-2 py-1 rounded-lg tracking-widest"
          style={{ background: 'var(--accent)' }}
        >
          SUBJECT ✨
        </div>
      </div>

      {/* Big label */}
      <h1
        className="serif text-4xl md:text-5xl leading-tight mb-2 fade-in-up-delay-2 text-center"
        style={{ color: 'var(--text)' }}
      >
        {submission.label}
      </h1>
      <p className="mono text-xs tracking-widest mb-4 fade-in-up-delay-3 text-center" style={{ color: 'var(--muted)' }}>
        ANALYZED BY UGLYNET™ · TRAINED ON 14M FACES · 47 UGLINESS DIMENSIONS
      </p>

      {/* Category breakdown */}
      <div
        className="rounded-3xl overflow-hidden mb-8 fade-in-up-delay-3"
        style={{ border: '1px solid var(--border)' }}
      >
        {categories.map(([key, cat]) => (
          <div
            key={key}
            className="flex items-center justify-between px-5 py-3 hover-surface"
            style={{
              borderBottom: '1px solid var(--border)',
              background: 'var(--surface)',
            }}
          >
            <span className="mono text-sm" style={{ color: 'var(--muted)' }}>{cat.label}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm text-right" style={{ color: 'var(--text)' }}>{cat.callout}</span>
              <span className="text-xs" style={{ color: 'var(--accent-light)' }}>●</span>
            </div>
          </div>
        ))}
      </div>


      {/* Share */}
      <div className="space-y-3 fade-in-up-delay-5">
        <h2 className="mono text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
          Share Your Results ✨
        </h2>

        <a
          href={shareCardUrl}
          download={`ugly-report-${id.slice(0, 8)}.png`}
          className="btn-primary flex items-center justify-center gap-2 w-full font-bold py-3 px-6 rounded-2xl transition-colors"
        >
          📥 Download Share Card
        </a>

        <a
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline hover-accent-border flex items-center justify-center gap-2 w-full font-bold py-3 px-6 rounded-2xl transition-colors"
        >
          𝕏 Post to X
        </a>

        <a
          href={`https://www.instagram.com/`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline hover-accent-border flex items-center justify-center gap-2 w-full font-bold py-3 px-6 rounded-2xl transition-colors"
        >
          📸 Share to Instagram
        </a>
      </div>

      {/* Actions */}
      <div
        className="mt-10 pt-8 flex items-center justify-between fade-in-up-delay-6"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <a href="/" className="text-sm transition-colors" style={{ color: 'var(--muted)' }}>
          ← Rate another face
        </a>
        <OptOutButton id={id} inGallery={submission.in_gallery} />
      </div>

      {/* Editorial context — required for AdSense content targeting */}
      <section className="mt-10 pt-8 space-y-4 text-sm leading-relaxed" style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}>
        <h2 className="font-semibold text-base" style={{ color: "var(--text)" }}>About Your UglyNet™ Analysis</h2>
        <p>
          UglyNet™ analyzed your photo across six satirical dimensions: Jawline Aura, Cheekbone Energy,
          Eye Socket Drama, Forehead Real Estate, Nose Bridge Confidence, and General Vibe.
          Each category generates a label based on an elaborate pseudo-scientific scoring rubric
          that we completely made up.
        </p>
        <p>
          The scores are random. The labels are AI-generated absurdist commentary.
          None of this reflects your actual attractiveness, health, genetics, or worth as a person.
          The premise of UglyNet™ is that AI confidently stating ridiculous things about human faces is funny —
          because it is. Real AI systems used in beauty scoring carry serious biases around race,
          lighting, camera quality, and cultural beauty standards. By making those biases explicit and absurd,
          amiugly.lol is commenting on them, not endorsing them.
        </p>
        <p>Curious about what science actually says about facial attractiveness?</p>
        <ul className="list-disc ml-5 space-y-1">
          <li><Link href="/blog/facial-symmetry" style={{ color: "var(--accent)" }}>What Is Facial Symmetry and Does It Actually Matter?</Link></li>
          <li><Link href="/blog/golden-ratio" style={{ color: "var(--accent)" }}>The Science of the Golden Ratio (And Why It&apos;s Mostly Made Up)</Link></li>
          <li><Link href="/blog/ai-cant-tell-ugly" style={{ color: "var(--accent)" }}>Why AI Can&apos;t Actually Tell If You&apos;re Ugly</Link></li>
        </ul>
        <p>
          Want your photo removed from our gallery?{" "}
          <a href="mailto:hello@amiugly.lol" style={{ color: "var(--accent)" }}>Contact us</a>{" "}
          and we&apos;ll handle it within 48 hours.
        </p>
      </section>
    </main>
  )
}
