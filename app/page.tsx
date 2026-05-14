'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import GalleryPreview from './components/GalleryPreview'

export default function Home() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState('')

  // Refs to coordinate: only navigate when BOTH animation AND API are done
  const pendingIdRef = useRef<string | null>(null)
  const animDoneRef = useRef(false)

  const PROGRESS_STEPS = [
    'Initializing UglyNet™ v4.2.1...',
    'Scanning your jawline, cheekbones & aura...',
    'Calibrating across 47 facial dimensions...',
    'Cross-referencing 14 million faces...',
    'Consulting the beauty council... 👀',
    'Preparing your results... bestie, sit down.',
  ]

  // Clean up object URL on unmount
  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl) }
  }, [previewUrl])

  function tryNavigate() {
    if (pendingIdRef.current && animDoneRef.current) {
      router.push(`/results/${pendingIdRef.current}`)
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click()
  }

  function selectFile(file: File) {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    setError('')
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (file) selectFile(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) selectFile(file)
  }

  async function handleSubmit() {
    if (!selectedFile || !confirmed) return
    setError('')
    setLoading(true)
    setProgress(0)
    setProgressText(PROGRESS_STEPS[0])
    pendingIdRef.current = null
    animDoneRef.current = false

    // Animation runs for exactly PROGRESS_STEPS.length ticks regardless of API speed
    let step = 0
    const progressInterval = setInterval(() => {
      step++
      const pct = Math.round((step / PROGRESS_STEPS.length) * 100)
      setProgress(Math.min(pct, 95))
      setProgressText(PROGRESS_STEPS[Math.min(step, PROGRESS_STEPS.length - 1)])

      if (step >= PROGRESS_STEPS.length) {
        clearInterval(progressInterval)
        setProgress(100)
        animDoneRef.current = true
        tryNavigate() // navigate now if API already returned
      }
    }, 900)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const res = await fetch('/api/analyze', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) {
        clearInterval(progressInterval)
        setError(data.error || 'Something went wrong.')
        setLoading(false)
        return
      }

      // Store result — don't navigate yet, wait for animation to finish
      pendingIdRef.current = data.id
      tryNavigate() // navigate now if animation already finished
    } catch {
      clearInterval(progressInterval)
      setError('Network error. UglyNet™ is overwhelmed.')
      setLoading(false)
    }
  }

  const canSubmit = confirmed && !!selectedFile

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'amiugly.lol',
    url: 'https://amiugly.lol',
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'Web',
    description:
      'Satirical AI selfie analyzer. UglyNet™ generates an absurdist Ugly Report for your photo — pure entertainment, not a real attractiveness assessment.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: [
      'Satirical AI face analysis',
      'Photo upload and instant Ugly Report',
      'Shareable result cards',
      'Public opt-in gallery',
    ],
    audience: { '@type': 'Audience', audienceType: 'Adults 18+' },
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">

        {/* Pill badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-8 mono"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--accent)' }}
        >
          🎭 100% Satire · For Entertainment Only
        </div>

        <h1 className="serif text-5xl md:text-7xl leading-tight mb-5" style={{ color: 'var(--text)' }}>
          What does the AI<br />
          <span style={{ color: 'var(--accent)' }}>think of your selfie?</span>
        </h1>
        <p className="text-xl mb-3" style={{ color: 'var(--muted)' }}>
          Get a satirical &quot;Ugly Report&quot; in seconds. Science doesn&apos;t lie. Unfortunately.
        </p>
        <p className="text-sm mb-12 mono" style={{ color: 'var(--very-muted)' }}>
          (UglyNet™ is satire. Your face is fine. We promise.)
        </p>

        {!loading ? (
          <div className="max-w-md mx-auto space-y-4">

            {/* Upload zone — always clickable */}
            {!previewUrl ? (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={openFilePicker}
                className="rounded-3xl p-10 cursor-pointer transition-all"
                style={{ border: '2px dashed var(--border)', background: 'var(--surface)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div className="text-4xl mb-3">🤳</div>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  Drop a selfie here or tap to upload
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--very-muted)' }}>JPG, PNG, WEBP, HEIC</p>
              </div>
            ) : (
              /* Preview */
              <div
                className="rounded-3xl overflow-hidden relative cursor-pointer group"
                style={{ border: '2px solid var(--border)', background: 'var(--surface)' }}
                onClick={openFilePicker}
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={previewUrl}
                    alt="Your selfie"
                    fill
                    className="object-cover"
                    sizes="448px"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(225,29,72,0.55)' }}
                  >
                    <span className="text-white font-semibold text-sm">📸 Change photo</span>
                  </div>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Consent */}
            <label className="flex items-start gap-3 text-left cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={e => {
                  setConfirmed(e.target.checked)
                  if (e.target.checked) setError('')
                }}
                className="mt-0.5"
                style={{ accentColor: 'var(--accent)' }}
              />
              <span className="text-sm" style={{ color: 'var(--muted)' }}>
                I confirm this is a photo of me, I&apos;m 18 or older, and I consent to appearing in the gallery. (You can opt out from your results page after submitting.)
              </span>
            </label>

            {error && (
              <p className="text-sm mono" style={{ color: 'var(--accent)' }}>{error}</p>
            )}

            {/* Submit button — disabled until photo + consent */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full font-bold py-4 px-8 rounded-2xl transition-all text-lg"
              style={{
                background: canSubmit ? 'var(--accent)' : 'var(--border)',
                color: canSubmit ? '#ffffff' : 'var(--very-muted)',
                cursor: canSubmit ? 'pointer' : 'not-allowed',
              }}
              onMouseEnter={e => { if (canSubmit) e.currentTarget.style.background = 'var(--accent-dark)' }}
              onMouseLeave={e => { if (canSubmit) e.currentTarget.style.background = 'var(--accent)' }}
            >
              {!selectedFile ? 'Upload a photo first 📸' : !confirmed ? 'Check the box to continue ☝️' : 'Rate My Face ✨'}
            </button>

          </div>
        ) : (
          /* Loading screen */
          <div className="max-w-md mx-auto space-y-5">
            <div className="mono text-sm animate-pulse min-h-[20px]" style={{ color: 'var(--accent)' }}>
              {progressText}
            </div>
            <div className="w-full rounded-full h-2" style={{ background: 'var(--border)' }}>
              <div
                className="h-2 rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, background: 'var(--accent)' }}
              />
            </div>
            <p className="text-xs mono" style={{ color: 'var(--very-muted)' }}>
              UglyNet™ is analyzing 47 facial dimensions. Please stand by.
            </p>
          </div>
        )}
      </section>


      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
          <article className="rounded-3xl p-7" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h2 className="serif text-3xl mb-3" style={{ color: 'var(--text)' }}>What is amiugly.lol?</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              amiugly.lol is a satire project where UglyNet™ gives your selfie an intentionally absurd "ugliness" report.
              It is designed for humor and commentary on internet beauty culture, not for real appearance judgments.
            </p>
            <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--muted)' }}>
              If you want the long version, read our{' '}
              <Link href="/about" className="underline" style={{ color: 'var(--accent)' }}>About page</Link>
              {' '}or browse the{' '}
              <Link href="/blog" className="underline" style={{ color: 'var(--accent)' }}>UglyNet Journal</Link>
              {' '}for deeper explainers.
            </p>
          </article>

          <article>
            <h2 className="mono text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>Satire, not science</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              The score, labels, and category callouts are entertainment output. Even when the UI jokes about
              "47 dimensions" and "14 million faces," this should not be treated as a factual measure of attractiveness.
              Human beauty is subjective, cultural, and context-dependent.
            </p>
          </article>

          <article>
            <h2 className="mono text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>AI limitations</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              AI vision systems can be biased by lighting, camera angle, image quality, training data, and social stereotypes.
              They can misread facial features and overstate confidence. That is exactly why amiugly.lol frames results as
              satire and not as a scientific or personal truth about anyone.
            </p>
            <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--muted)' }}>
              For policy details, data handling, and user rights, see{' '}
              <Link href="/privacy" className="underline" style={{ color: 'var(--accent)' }}>Privacy</Link>
              {' '}and{' '}
              <Link href="/terms" className="underline" style={{ color: 'var(--accent)' }}>Terms</Link>.
            </p>
          </article>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="border-t pt-16" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="mono text-sm tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
              ✨ Recent Subjects
            </h2>
            <a href="/gallery" className="text-sm transition-colors" style={{ color: 'var(--muted)' }}>
              View all →
            </a>
          </div>
          <GalleryPreview />
        </div>
      </section>
    </main>
  )
}
