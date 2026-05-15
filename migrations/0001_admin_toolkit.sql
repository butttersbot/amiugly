-- Admin toolkit migration: IP capture, moderation log, IP block list.
-- Idempotent. Safe to run on a fresh DB or one that already has the
-- `submissions` table from the base schema.
--
-- Apply: paste into Supabase SQL editor, or `psql ... < this_file.sql`.

-- 1. Capture client IP per submission so we can correlate abuse.
alter table submissions add column if not exists client_ip text;
alter table submissions add column if not exists image_hash text;

create index if not exists submissions_client_ip_idx
  on submissions (client_ip) where client_ip is not null;
create index if not exists submissions_image_hash_idx
  on submissions (image_hash);

-- 2. Moderation log — every classifier decision, pass or block.
-- Lets us see attack patterns even when the gate caught them.
create table if not exists moderation_log (
  id uuid primary key default gen_random_uuid(),
  client_ip text,
  image_hash text,
  decision text not null check (decision in ('pass', 'block', 'ip_blocked')),
  reason text,
  scores jsonb,
  created_at timestamptz not null default now()
);

create index if not exists moderation_log_created_idx
  on moderation_log (created_at desc);
create index if not exists moderation_log_ip_idx
  on moderation_log (client_ip) where client_ip is not null;
create index if not exists moderation_log_decision_idx
  on moderation_log (decision, created_at desc);

-- 3. IP block list — kill list for known troll IPs.
create table if not exists ip_blocks (
  ip text primary key,
  reason text,
  blocked_at timestamptz not null default now()
);

-- 4. RLS: both new tables are server-side only. No anon access.
-- Service role bypasses RLS, so admin CLI + API routes work fine.
alter table moderation_log enable row level security;
alter table ip_blocks enable row level security;
