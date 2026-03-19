'use client'

import { useState } from 'react'

export default function OptOutButton({ id, inGallery }: { id: string; inGallery: boolean }) {
  const [removed, setRemoved] = useState(!inGallery)
  const [loading, setLoading] = useState(false)

  async function handleOptOut() {
    setLoading(true)
    await fetch(`/api/opt-out/${id}`, { method: 'POST' })
    setRemoved(true)
    setLoading(false)
  }

  if (removed) {
    return <span className="text-xs mono" style={{ color: 'var(--very-muted)' }}>Removed from gallery ✓</span>
  }

  return (
    <button
      onClick={handleOptOut}
      disabled={loading}
      className="text-xs mono transition-colors disabled:opacity-50"
      style={{ color: 'var(--very-muted)' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--very-muted)')}
    >
      {loading ? 'Removing...' : 'Remove me from gallery'}
    </button>
  )
}
