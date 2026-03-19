'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal'
  className?: string
}

export default function AdUnit({ slot, format = 'auto', className = '' }: AdUnitProps) {
  const insRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    try {
      if (insRef.current && insRef.current.getAttribute('data-adsbygoogle-status') === null) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch {
      // AdSense not yet loaded — will render once script initializes
    }
  }, [])

  return (
    <div className={className}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5249658333733157"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
