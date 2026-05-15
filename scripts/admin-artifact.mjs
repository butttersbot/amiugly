#!/usr/bin/env node
// Generates a self-contained HTML snapshot of the admin dashboard.
// Run: npm run admin:artifact -- [output_path]
// Default output: ./admin-snapshot.html
//
// Designed to be served via the Tailscale artifact substrate — Boss can pull
// it up on his phone, see what needs attention, and copy CLI commands.

import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const CONFIG = {
  storageBucket: 'faces',
  submissionsTable: 'submissions',
  imageHashColumn: 'image_hash',
  inGalleryColumn: 'in_gallery',
  siteName: 'amiugly.lol',
}

const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPA_URL || !SUPA_KEY) {
  console.error('Missing Supabase credentials.')
  process.exit(1)
}

const sb = createClient(SUPA_URL, SUPA_KEY)
const outPath = resolve(process.argv[2] || 'admin-snapshot.html')

// Run a query with the optional client_ip column, fall back without it if
// the migration hasn't been applied (Postgres 42703 undefined_column).
async function selectWithFallback(buildQuery, fallbackBuildQuery) {
  const res = await buildQuery()
  if (res.error?.code === '42703') return fallbackBuildQuery()
  return res
}

const today = new Date()
today.setHours(0, 0, 0, 0)
const todayIso = today.toISOString()

const [total, gallery, hidden, todayUploads, recent, flagged, recentBlocks] = await Promise.all([
  sb.from(CONFIG.submissionsTable).select('id', { count: 'exact', head: true }),
  sb.from(CONFIG.submissionsTable).select('id', { count: 'exact', head: true }).eq(CONFIG.inGalleryColumn, true),
  sb.from(CONFIG.submissionsTable).select('id', { count: 'exact', head: true }).eq(CONFIG.inGalleryColumn, false),
  sb.from(CONFIG.submissionsTable).select('id', { count: 'exact', head: true }).gte('created_at', todayIso),
  selectWithFallback(
    () =>
      sb
        .from(CONFIG.submissionsTable)
        .select(`id, label, image_url, ${CONFIG.inGalleryColumn}, client_ip, created_at`)
        .order('created_at', { ascending: false })
        .limit(20),
    () =>
      sb
        .from(CONFIG.submissionsTable)
        .select(`id, label, image_url, ${CONFIG.inGalleryColumn}, created_at`)
        .order('created_at', { ascending: false })
        .limit(20)
  ),
  selectWithFallback(
    () =>
      sb
        .from(CONFIG.submissionsTable)
        .select(`id, label, image_url, client_ip, created_at`)
        .eq(CONFIG.inGalleryColumn, false)
        .order('created_at', { ascending: false }),
    () =>
      sb
        .from(CONFIG.submissionsTable)
        .select(`id, label, image_url, created_at`)
        .eq(CONFIG.inGalleryColumn, false)
        .order('created_at', { ascending: false })
  ),
  sb
    .from('moderation_log')
    .select('client_ip, decision, reason, scores, created_at')
    .eq('decision', 'block')
    .order('created_at', { ascending: false })
    .limit(50),
])

// Compute repeat offenders from recent blocks (top 10 by count).
const offenderCounts = {}
if (!recentBlocks.error) {
  for (const row of recentBlocks.data) {
    if (!row.client_ip) continue
    offenderCounts[row.client_ip] = (offenderCounts[row.client_ip] || 0) + 1
  }
}
const repeatOffenders = Object.entries(offenderCounts)
  .filter(([, n]) => n >= 2)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)

const MISSING_TABLE_CODES = new Set(['42P01', 'PGRST205'])
const moderationLogMissing =
  recentBlocks.error && MISSING_TABLE_CODES.has(recentBlocks.error.code)

const todayRejectCount = recentBlocks.error
  ? null
  : recentBlocks.data.filter((r) => r.created_at >= todayIso).length

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  )

const fmtDate = (iso) => new Date(iso).toISOString().replace('T', ' ').slice(0, 19)

const snapshotTs = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(CONFIG.siteName)} admin · ${esc(snapshotTs)}</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0; font: 14px/1.5 -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
    background: #0b0d10; color: #e5e7eb; padding: 16px;
  }
  h1 { font-size: 18px; margin: 0 0 4px; }
  h2 { font-size: 14px; margin: 24px 0 8px; text-transform: uppercase; letter-spacing: 0.06em; color: #9ca3af; }
  .ts { color: #6b7280; font-size: 12px; margin-bottom: 16px; }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 8px; margin-bottom: 8px; }
  .stat { background: #111418; border: 1px solid #1f2329; border-radius: 8px; padding: 10px 12px; }
  .stat .n { font-size: 22px; font-weight: 600; }
  .stat .l { font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
  .card {
    background: #111418; border: 1px solid #1f2329; border-radius: 8px; overflow: hidden;
  }
  .card img { width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; background: #1f2329; }
  .card .meta { padding: 8px 10px; }
  .card .meta .label { font-size: 12px; color: #e5e7eb; margin-bottom: 4px; }
  .card .meta .id { font-family: ui-monospace, monospace; font-size: 10px; color: #6b7280; word-break: break-all; }
  .card .meta .ip { font-family: ui-monospace, monospace; font-size: 10px; color: #9ca3af; margin-top: 2px; }
  .card .cmd { font-family: ui-monospace, monospace; font-size: 10px; color: #f59e0b; padding: 6px 10px; border-top: 1px solid #1f2329; user-select: all; word-break: break-all; }
  .hidden-pill { background: #7f1d1d; color: #fecaca; padding: 1px 6px; border-radius: 3px; font-size: 10px; margin-left: 4px; }
  table { width: 100%; border-collapse: collapse; }
  th, td { padding: 6px 10px; text-align: left; border-bottom: 1px solid #1f2329; font-size: 13px; }
  th { color: #9ca3af; font-weight: 500; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; }
  td.ip { font-family: ui-monospace, monospace; }
  td.cmd { font-family: ui-monospace, monospace; color: #f59e0b; user-select: all; font-size: 11px; }
  .empty { color: #6b7280; font-style: italic; padding: 12px 0; }
  .warning { background: #422006; border: 1px solid #92400e; color: #fbbf24; padding: 8px 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; }
</style>
</head>
<body>
  <h1>${esc(CONFIG.siteName)} · admin snapshot</h1>
  <div class="ts">${esc(snapshotTs)}</div>

  ${
    moderationLogMissing
      ? `<div class="warning">⚠ moderation_log table missing — run migrations/0001_admin_toolkit.sql for full visibility</div>`
      : ''
  }

  <div class="stats">
    <div class="stat"><div class="n">${total.count ?? '?'}</div><div class="l">total</div></div>
    <div class="stat"><div class="n">${gallery.count ?? '?'}</div><div class="l">in gallery</div></div>
    <div class="stat"><div class="n">${hidden.count ?? '?'}</div><div class="l">hidden</div></div>
    <div class="stat"><div class="n">${todayUploads.count ?? '?'}</div><div class="l">today's uploads</div></div>
    <div class="stat"><div class="n">${todayRejectCount ?? '—'}</div><div class="l">today's rejects</div></div>
  </div>

  <h2>Repeat offenders ${repeatOffenders.length ? `(${repeatOffenders.length})` : ''}</h2>
  ${
    repeatOffenders.length
      ? `<table>
          <tr><th>IP</th><th>Rejections</th><th>Block command</th></tr>
          ${repeatOffenders
            .map(
              ([ip, count]) =>
                `<tr><td class="ip">${esc(ip)}</td><td>${count}</td><td class="cmd">npm run admin -- block ${esc(ip)}</td></tr>`
            )
            .join('')}
        </table>`
      : `<div class="empty">No IPs with 2+ rejections in the last 50 events.</div>`
  }

  <h2>Moderation queue (hidden from gallery) ${flagged.error ? '' : `(${flagged.data.length})`}</h2>
  ${
    flagged.data?.length
      ? `<div class="grid">${flagged.data
          .map(
            (r) => `
        <div class="card">
          <img src="${esc(r.image_url)}" loading="lazy" alt="">
          <div class="meta">
            <div class="label">${esc(r.label || '—')}</div>
            <div class="id">${esc(r.id)}</div>
            ${r.client_ip ? `<div class="ip">${esc(r.client_ip)}</div>` : ''}
          </div>
          <div class="cmd">npm run admin -- delete ${esc(r.id)}</div>
        </div>`
          )
          .join('')}</div>`
      : `<div class="empty">Queue empty. Nice.</div>`
  }

  <h2>Recent uploads (last 20)</h2>
  ${
    recent.data?.length
      ? `<div class="grid">${recent.data
          .map(
            (r) => `
        <div class="card">
          <img src="${esc(r.image_url)}" loading="lazy" alt="">
          <div class="meta">
            <div class="label">${esc(r.label || '—')}${r[CONFIG.inGalleryColumn] ? '' : '<span class="hidden-pill">hidden</span>'}</div>
            <div class="id">${esc(r.id)}</div>
            ${r.client_ip ? `<div class="ip">${esc(r.client_ip)}</div>` : ''}
            <div class="ip">${esc(fmtDate(r.created_at))}</div>
          </div>
        </div>`
          )
          .join('')}</div>`
      : `<div class="empty">No submissions yet.</div>`
  }
</body>
</html>`

writeFileSync(outPath, html)
console.log(`Wrote ${outPath}`)
