// NSFW moderation gate. Loads the NSFWJS model lazily (one-time cost on first
// invocation, kept warm for the lifetime of the Vercel function instance).
//
// Decision policy:
// - reject if Porn > 0.6 OR Hentai > 0.6
// - reject if Sexy > 0.85 (looser threshold — some swimwear / lingerie scores ~0.6 false-positive)
// - everything else passes
//
// These thresholds err on the side of allowing through borderline cases since
// the gallery is opt-in already. Tune up if AdSense flags anything.

import * as tf from '@tensorflow/tfjs-node'
import * as nsfw from 'nsfwjs'
import type { NSFWJS } from 'nsfwjs'

let modelPromise: Promise<NSFWJS> | null = null

function getModel(): Promise<NSFWJS> {
  if (!modelPromise) {
    // First call kicks off the model load. Subsequent calls reuse the same promise.
    modelPromise = nsfw.load()
  }
  return modelPromise
}

export type Classification = {
  className: 'Drawing' | 'Hentai' | 'Neutral' | 'Porn' | 'Sexy'
  probability: number
}

export type ModerationResult = {
  safe: boolean
  reason: string | null
  scores: Record<string, number>
}

export async function classifyImage(buffer: Buffer): Promise<ModerationResult> {
  const model = await getModel()
  const tensor = tf.node.decodeImage(buffer, 3) as tf.Tensor3D
  try {
    const predictions = (await model.classify(tensor)) as Classification[]
    const scores = Object.fromEntries(
      predictions.map((p) => [p.className.toLowerCase(), p.probability])
    )

    if (scores.porn > 0.6) {
      return { safe: false, reason: `porn confidence ${scores.porn.toFixed(2)}`, scores }
    }
    if (scores.hentai > 0.6) {
      return { safe: false, reason: `hentai confidence ${scores.hentai.toFixed(2)}`, scores }
    }
    if (scores.sexy > 0.85) {
      return { safe: false, reason: `sexy confidence ${scores.sexy.toFixed(2)}`, scores }
    }
    return { safe: true, reason: null, scores }
  } finally {
    tensor.dispose()
  }
}
