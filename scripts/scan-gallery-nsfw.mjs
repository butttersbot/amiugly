#!/usr/bin/env node
// Polyfill: tfjs-node 4.x still uses util.isNullOrUndefined which was removed
// in Node 22+. Vercel runs Node 22 (pinned via engines) so this only matters
// for local execution on Node 24.
import util from 'node:util'
if (!util.isNullOrUndefined) {
  util.isNullOrUndefined = (v) => v === null || v === undefined
}

// Retroactive NSFW sweep on the existing gallery.
//
// For every submission with in_gallery=true, fetch the image, classify via
// NSFWJS, and flip in_gallery=false on anything flagged. Logs what it did
// (and why) for audit. Does NOT delete the row or the storage file — leaves
// them in place so Boss can review and decide whether to fully delete.
//
// Usage:  npm run scan-gallery-nsfw
// Needs:  NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in env

import { createClient } from '@supabase/supabase-js'
import * as tf from '@tensorflow/tfjs-node'
import * as nsfw from 'nsfwjs'

const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPA_URL || !SUPA_KEY) {
  console.error('Missing Supabase credentials. Source .env.local first.')
  process.exit(1)
}

const supa = createClient(SUPA_URL, SUPA_KEY)
console.log('Loading NSFWJS model...')
const model = await nsfw.load()
console.log('Model loaded.')

const { data: submissions, error: listErr } = await supa
  .from('submissions')
  .select('id, image_url, image_hash, label, created_at')
  .eq('in_gallery', true)
  .order('created_at', { ascending: false })

if (listErr) {
  console.error('Failed to list submissions:', listErr.message)
  process.exit(1)
}

console.log(`Scanning ${submissions.length} gallery submissions...`)

let flagged = 0
let scanned = 0
let errored = 0

for (const sub of submissions) {
  scanned++
  try {
    const res = await fetch(sub.image_url)
    if (!res.ok) {
      console.warn(`  [${scanned}/${submissions.length}] ${sub.id} — fetch ${res.status}, skipping`)
      errored++
      continue
    }
    const buffer = Buffer.from(await res.arrayBuffer())
    const tensor = tf.node.decodeImage(buffer, 3)
    let scores
    try {
      const preds = await model.classify(tensor)
      scores = Object.fromEntries(preds.map((p) => [p.className.toLowerCase(), p.probability]))
    } finally {
      tensor.dispose()
    }

    let reason = null
    if (scores.porn > 0.6) reason = `porn=${scores.porn.toFixed(2)}`
    else if (scores.hentai > 0.6) reason = `hentai=${scores.hentai.toFixed(2)}`
    else if (scores.sexy > 0.85) reason = `sexy=${scores.sexy.toFixed(2)}`

    if (reason) {
      flagged++
      console.log(`  [${scanned}/${submissions.length}] FLAGGED ${sub.id} (${reason}) — ${sub.image_url}`)
      const { error: updErr } = await supa
        .from('submissions')
        .update({ in_gallery: false })
        .eq('id', sub.id)
      if (updErr) console.error(`    update failed: ${updErr.message}`)
    } else if (scanned % 20 === 0) {
      console.log(`  [${scanned}/${submissions.length}] ok so far (flagged=${flagged} errored=${errored})`)
    }
  } catch (e) {
    console.error(`  [${scanned}/${submissions.length}] ${sub.id} — error: ${e.message}`)
    errored++
  }
}

console.log()
console.log(`Done. scanned=${scanned} flagged=${flagged} errored=${errored}`)
console.log('Flagged submissions have in_gallery=false (hidden from gallery, not deleted).')
console.log('Boss can review at the Supabase dashboard or run a follow-up script to fully delete.')
