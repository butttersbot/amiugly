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

-- Storage bucket (run in Supabase dashboard or via API)
-- Create a public bucket named "faces"
-- Set public access: true
