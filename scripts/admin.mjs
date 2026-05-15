#!/usr/bin/env node
// Admin CLI for site moderation. Generic — no amiugly-specific assumptions.
// New site = drop this in, swap CONFIG values, you're done.
//
// Usage:
//   npm run admin -- <command> [args]
//
// Commands:
//   list [n=20]              List recent submissions (id, label, gallery, ip, ts)
//   hidden [n=20]            List submissions hidden from gallery
//   delete <id>              Full delete: storage file + DB row
//   flag <id>                Hide from gallery (in_gallery=false), keep row + file
//   restore <id>             Un-hide a previously flagged submission
//   block <ip> [reason]      Add IP to block list (stealth-banned from uploads)
//   unblock <ip>             Remove IP from block list
//   blocks                   List all blocked IPs
//   ip-stats <ip>            Show every submission + moderation event for an IP
//   top-offenders [n=10]     IPs with the most NSFW rejections (default n=10)
//   stats                    Counts: total, gallery, hidden, today's uploads/rejections
//   rescan                   Re-run NSFW classifier on gallery (slow)
//
// Needs in env (auto-loaded from .env.local via `node --env-file`):
//   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { createClient } from '@supabase/supabase-js'

// Site config. Change these per-site. Everything below this block is generic.
const CONFIG = {
  storageBucket: 'faces',
  submissionsTable: 'submissions',
  imageHashColumn: 'image_hash',
  inGalleryColumn: 'in_gallery',
  // File extension stored in the bucket (we always normalize to .jpg).
  storageExt: 'jpg',
}

const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPA_URL || !SUPA_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.')
  process.exit(1)
}

const sb = createClient(SUPA_URL, SUPA_KEY)

const MISSING_TABLE_CODES = new Set(['42P01', 'PGRST205'])
const isMissingTable = (code) => (code ? MISSING_TABLE_CODES.has(code) : false)

// Some queries reference client_ip, which doesn't exist until the migration
// runs. selectWithFallback runs the query with the optional column and falls
// back to a version without it if Postgres reports 42703 (undefined_column).
async function selectWithFallback(buildQuery, fallbackBuildQuery) {
  const res = await buildQuery()
  if (res.error?.code === '42703') return fallbackBuildQuery()
  return res
}

const [cmd, ...args] = process.argv.slice(2)

const commands = {
  list: () => listSubmissions({ inGallery: true, n: parseInt(args[0] || '20', 10) }),
  hidden: () => listSubmissions({ inGallery: false, n: parseInt(args[0] || '20', 10) }),
  delete: () => deleteSubmission(args[0]),
  flag: () => setGallery(args[0], false),
  restore: () => setGallery(args[0], true),
  block: () => blockIp(args[0], args.slice(1).join(' ') || null),
  unblock: () => unblockIp(args[0]),
  blocks: () => listBlocks(),
  'ip-stats': () => ipStats(args[0]),
  'top-offenders': () => topOffenders(parseInt(args[0] || '10', 10)),
  stats: () => showStats(),
  rescan: () => rescanGallery(),
}

if (!cmd || !commands[cmd]) {
  console.error('Unknown command:', cmd || '(none)')
  console.error('Available:', Object.keys(commands).join(', '))
  process.exit(1)
}

try {
  await commands[cmd]()
} catch (e) {
  console.error('ERROR:', e.message)
  process.exit(1)
}

// ---------- commands ----------

async function listSubmissions({ inGallery, n }) {
  const { data, error } = await selectWithFallback(
    () =>
      sb
        .from(CONFIG.submissionsTable)
        .select(`id, label, ${CONFIG.inGalleryColumn}, client_ip, created_at`)
        .eq(CONFIG.inGalleryColumn, inGallery)
        .order('created_at', { ascending: false })
        .limit(n),
    () =>
      sb
        .from(CONFIG.submissionsTable)
        .select(`id, label, ${CONFIG.inGalleryColumn}, created_at`)
        .eq(CONFIG.inGalleryColumn, inGallery)
        .order('created_at', { ascending: false })
        .limit(n)
  )
  if (error) throw error
  if (!data.length) {
    console.log('(none)')
    return
  }
  for (const row of data) {
    const ip = row.client_ip || '—'
    const ts = new Date(row.created_at).toISOString().replace('T', ' ').slice(0, 19)
    console.log(`${row.id}  ${ts}  ${ip.padEnd(15)}  ${row.label}`)
  }
}

async function deleteSubmission(id) {
  if (!id) throw new Error('usage: delete <id>')
  const { data: row, error } = await sb
    .from(CONFIG.submissionsTable)
    .select(`id, ${CONFIG.imageHashColumn}`)
    .eq('id', id)
    .single()
  if (error) throw new Error(`row not found: ${error.message}`)
  const hash = row[CONFIG.imageHashColumn]
  if (hash) {
    const filename = `${hash}.${CONFIG.storageExt}`
    const { error: stErr } = await sb.storage.from(CONFIG.storageBucket).remove([filename])
    if (stErr) console.warn(`storage delete failed (continuing): ${stErr.message}`)
    else console.log(`  storage:  ${filename} removed`)
  }
  const { error: dbErr } = await sb.from(CONFIG.submissionsTable).delete().eq('id', id)
  if (dbErr) throw dbErr
  console.log(`  row:      ${id} removed`)
}

async function setGallery(id, value) {
  if (!id) throw new Error(`usage: ${value ? 'restore' : 'flag'} <id>`)
  const { error } = await sb
    .from(CONFIG.submissionsTable)
    .update({ [CONFIG.inGalleryColumn]: value })
    .eq('id', id)
  if (error) throw error
  console.log(`  ${id}  ${CONFIG.inGalleryColumn}=${value}`)
}

async function blockIp(ip, reason) {
  if (!ip) throw new Error('usage: block <ip> [reason]')
  const { error } = await sb.from('ip_blocks').upsert({ ip, reason })
  if (error) throw error
  console.log(`  blocked: ${ip}${reason ? ` (${reason})` : ''}`)
}

async function unblockIp(ip) {
  if (!ip) throw new Error('usage: unblock <ip>')
  const { error } = await sb.from('ip_blocks').delete().eq('ip', ip)
  if (error) throw error
  console.log(`  unblocked: ${ip}`)
}

async function listBlocks() {
  const { data, error } = await sb
    .from('ip_blocks')
    .select('*')
    .order('blocked_at', { ascending: false })
  if (error) throw error
  if (!data.length) {
    console.log('(none)')
    return
  }
  for (const row of data) {
    const ts = new Date(row.blocked_at).toISOString().replace('T', ' ').slice(0, 19)
    console.log(`${row.ip.padEnd(20)}  ${ts}  ${row.reason || ''}`)
  }
}

async function ipStats(ip) {
  if (!ip) throw new Error('usage: ip-stats <ip>')
  const [subs, mods] = await Promise.all([
    sb
      .from(CONFIG.submissionsTable)
      .select(`id, label, ${CONFIG.inGalleryColumn}, created_at`)
      .eq('client_ip', ip)
      .order('created_at', { ascending: false }),
    sb
      .from('moderation_log')
      .select('decision, reason, created_at')
      .eq('client_ip', ip)
      .order('created_at', { ascending: false }),
  ])
  if (subs.error) throw subs.error
  console.log(`SUBMISSIONS (${subs.data.length}):`)
  for (const row of subs.data) {
    const ts = new Date(row.created_at).toISOString().replace('T', ' ').slice(0, 19)
    const gal = row[CONFIG.inGalleryColumn] ? 'public' : 'hidden'
    console.log(`  ${row.id}  ${ts}  ${gal.padEnd(7)}  ${row.label}`)
  }
  if (mods.error && !isMissingTable(mods.error.code)) throw mods.error
  if (!mods.error) {
    console.log(`\nMODERATION EVENTS (${mods.data.length}):`)
    for (const row of mods.data) {
      const ts = new Date(row.created_at).toISOString().replace('T', ' ').slice(0, 19)
      console.log(`  ${ts}  ${row.decision.padEnd(10)}  ${row.reason || ''}`)
    }
  }
}

async function topOffenders(n) {
  // Pull all block events, group in memory. Cheap until volume gets huge.
  const { data, error } = await sb
    .from('moderation_log')
    .select('client_ip, decision')
    .eq('decision', 'block')
  if (error) {
    if (isMissingTable(error.code)) {
      console.log('(moderation_log table missing — run the migration first)')
      return
    }
    throw error
  }
  const counts = {}
  for (const row of data) {
    if (!row.client_ip) continue
    counts[row.client_ip] = (counts[row.client_ip] || 0) + 1
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, n)
  if (!sorted.length) {
    console.log('(no rejections recorded)')
    return
  }
  console.log('REJECTIONS  IP')
  for (const [ip, count] of sorted) {
    console.log(`${String(count).padStart(10)}  ${ip}`)
  }
}

async function showStats() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayIso = today.toISOString()

  const [total, gallery, hidden, todayUploads, todayRejects] = await Promise.all([
    sb.from(CONFIG.submissionsTable).select('id', { count: 'exact', head: true }),
    sb.from(CONFIG.submissionsTable).select('id', { count: 'exact', head: true }).eq(CONFIG.inGalleryColumn, true),
    sb.from(CONFIG.submissionsTable).select('id', { count: 'exact', head: true }).eq(CONFIG.inGalleryColumn, false),
    sb.from(CONFIG.submissionsTable).select('id', { count: 'exact', head: true }).gte('created_at', todayIso),
    sb.from('moderation_log').select('id', { count: 'exact', head: true }).eq('decision', 'block').gte('created_at', todayIso),
  ])

  console.log(`Total submissions:   ${total.count ?? '?'}`)
  console.log(`In gallery:          ${gallery.count ?? '?'}`)
  console.log(`Hidden:              ${hidden.count ?? '?'}`)
  console.log(`Today's uploads:     ${todayUploads.count ?? '?'}`)
  if (isMissingTable(todayRejects.error?.code) || todayRejects.count === null) {
    console.log(`Today's rejections:  (moderation_log table missing — run migration)`)
  } else {
    console.log(`Today's rejections:  ${todayRejects.count}`)
  }
}

async function rescanGallery() {
  console.log('rescan: see `npm run scan:gallery` — same job, kept separate so this file stays light.')
}
