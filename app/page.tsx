'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import GalleryPreview from './components/GalleryPreview'

export default function Home() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState('')

  const PROGRESS_STEPS = [
    'Initializing UglyNet™ v4.2.1...',
    'Scanning 47 facial dimensions...',
    'Calibrating ugliness vectors...',
    'Cross-referencing 14 million faces...',
    'Consulting the council of ugly...',
    'Preparing your results — brace yourself.',
  ]

  async function handleFile(file: File) {
    if (!confirmed) {
      setError('Please confirm this is a photo of you.')
      return
    }
    setError('')
    setLoading(true)
    setProgress(0)

    // Fake progress animation
    let step = 0
    const progressInterval = setInterval(() => {
      step++
      setProgress(Math.min(step * 16, 90))
      setProgressText(PROGRESS_STEPS[Math.min(step - 1, PROGRESS_STEPS.length - 1)])
    }, 900)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const res = await fetch('/api/analyze', { method: 'POST', body: formData })
      const data = await res.json()

      clearInterval(progressInterval)

      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        setLoading(false)
        return
      }

      setProgress(100)
      setTimeout(() => router.push(`/results/${data.id}`), 400)
    } catch {
      clearInterval(progressInterval)
      setError('Network error. UglyNet™ is overwhelmed.')
      setLoading(false)
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <main>
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="mono text-[#dc2626] text-xs tracking-[4px] uppercase mb-6">
          UglyNet™ · Facial Analysis System v4.2.1
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-[#f5f5f5] leading-tight mb-6">
          Find out how ugly<br />you really are.
        </h1>
        <p className="text-[#a3a3a3] text-xl mb-12">
          Science doesn&apos;t lie. Unfortunately.
        </p>

        {!loading ? (
          <div className="max-w-md mx-auto space-y-4">
            {/* Upload zone */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#262626] hover:border-[#dc2626] rounded-lg p-10 cursor-pointer transition-colors group"
            >
              <div className="text-4xl mb-3">📸</div>
              <p className="text-[#a3a3a3] text-sm group-hover:text-[#f5f5f5] transition-colors">
                Drop a selfie here or tap to upload
              </p>
              <p className="text-[#525252] text-xs mt-1">JPG, PNG, WEBP</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="user"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Consent */}
            <label className="flex items-start gap-3 text-left cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={e => setConfirmed(e.target.checked)}
                className="mt-0.5 accent-[#dc2626]"
              />
              <span className="text-[#a3a3a3] text-sm">
                I confirm this is a photo of me. I consent to appearing in the uglypeople.com gallery.
                (<a href="#" className="underline hover:text-[#dc2626]">opt out on results page</a>)
              </span>
            </label>

            {error && (
              <p className="text-[#dc2626] text-sm mono">{error}</p>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={!confirmed}
              className="w-full bg-[#dc2626] hover:bg-[#b91c1c] disabled:bg-[#3f3f3f] disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Analyze My Face
            </button>
          </div>
        ) : (
          /* Loading screen */
          <div className="max-w-md mx-auto space-y-6">
            <div className="mono text-[#dc2626] text-sm animate-pulse">{progressText}</div>
            <div className="w-full bg-[#1a1a1a] rounded-full h-2">
              <div
                className="bg-[#dc2626] h-2 rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[#525252] text-xs mono">
              UglyNet™ is analyzing 47 facial dimensions. Please stand by.
            </p>
            {/* Ad slot */}
            <div className="ad-slot bg-[#111] border border-[#262626] rounded-lg p-6 text-[#525252] text-xs mono text-center min-h-[100px] flex items-center justify-center">
              [ Advertisement ]
            </div>
          </div>
        )}
      </section>

      {/* Gallery preview */}
      <section className="border-t border-[#262626] pt-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="mono text-[#dc2626] text-sm tracking-widest uppercase">
              Recent Subjects
            </h2>
            <a href="/gallery" className="text-[#a3a3a3] text-sm hover:text-[#f5f5f5] transition-colors">
              View all →
            </a>
          </div>
          <GalleryPreview />
        </div>
      </section>
    </main>
  )
}
