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
    return <span className="text-[#525252] text-xs mono">Removed from gallery ✓</span>
  }

  return (
    <button
      onClick={handleOptOut}
      disabled={loading}
      className="text-[#525252] text-xs mono hover:text-[#dc2626] transition-colors disabled:opacity-50"
    >
      {loading ? 'Removing...' : 'Remove me from gallery'}
    </button>
  )
}
