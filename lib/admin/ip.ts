// Extract the real client IP from an incoming request. Vercel sets
// `x-forwarded-for` with the chain "client, proxy1, proxy2..." — the first
// entry is the real client. `x-real-ip` is the fallback some setups use.
//
// Returns null when nothing usable is present (local dev, tests).

import type { NextRequest } from 'next/server'

export function getClientIp(req: NextRequest): string | null {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) {
    const first = xff.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return null
}
