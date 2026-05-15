// Moderation logging + IP block check. Both are defensive: if the new
// `moderation_log` / `ip_blocks` tables don't exist yet (migration not run),
// every helper degrades quietly so the upload path keeps working.

import { getSupabaseAdmin } from '@/lib/supabase'

// Both error codes mean "table doesn't exist": 42P01 from Postgres,
// PGRST205 from PostgREST's schema cache when the migration hasn't run.
const MISSING_TABLE_CODES = new Set(['42P01', 'PGRST205'])
const isMissingTable = (code: string | undefined) =>
  code ? MISSING_TABLE_CODES.has(code) : false

type Decision = 'pass' | 'block' | 'ip_blocked'

export async function isIpBlocked(ip: string | null): Promise<boolean> {
  if (!ip) return false
  const { data, error } = await getSupabaseAdmin()
    .from('ip_blocks')
    .select('ip')
    .eq('ip', ip)
    .maybeSingle()
  if (error && !isMissingTable(error.code)) {
    console.warn('ip_blocks check failed:', error.message)
  }
  return Boolean(data)
}

export async function logModeration(params: {
  ip: string | null
  imageHash: string | null
  decision: Decision
  reason?: string | null
  scores?: Record<string, number> | null
}): Promise<void> {
  const { error } = await getSupabaseAdmin().from('moderation_log').insert({
    client_ip: params.ip,
    image_hash: params.imageHash,
    decision: params.decision,
    reason: params.reason ?? null,
    scores: params.scores ?? null,
  })
  if (error && !isMissingTable(error.code)) {
    console.warn('moderation_log insert failed:', error.message)
  }
}
