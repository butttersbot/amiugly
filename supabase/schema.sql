-- uglypeople.com — Supabase Schema
-- Run this in your Supabase SQL editor

create table submissions (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  label text not null,
  score integer not null,
  categories jsonb not null,
  in_gallery boolean not null default true,
  created_at timestamptz not null default now()
);

-- Index for gallery queries (most recent, in_gallery only)
create index on submissions (created_at desc) where in_gallery = true;

-- Row Level Security
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can read gallery entries
CREATE POLICY "Allow public read of gallery"
  ON public.submissions FOR SELECT
  USING (in_gallery = true);

-- NOTE: INSERT, UPDATE (opt-out), and DELETE are all handled server-side
-- via /api/analyze and /api/opt-out using SUPABASE_SERVICE_ROLE_KEY,
-- which bypasses RLS entirely. No anon INSERT policy needed.

-- Storage bucket (run in Supabase dashboard or via API)
-- Create a public bucket named "faces"
-- Set public access: true
