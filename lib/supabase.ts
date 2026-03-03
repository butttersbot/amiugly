import { createClient } from '@supabase/supabase-js'

export interface Submission {
  id: string
  image_url: string
  label: string
  score: number
  categories: Record<string, { label: string; callout: string }>
  in_gallery: boolean
  created_at: string
}

export function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
