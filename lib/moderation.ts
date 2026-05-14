// NSFW moderation gate. Pure-JS tfjs + sharp pipeline so the serverless bundle
// stays under Vercel's 250MB limit (tfjs-node is ~383MB and made deploys fail).
//
// Decision policy:
// - reject if Porn > 0.6 OR Hentai > 0.6
// - reject if Sexy > 0.85 (looser threshold — some swimwear / lingerie scores ~0.6 false-positive)
// - everything else passes

import * as tf from '@tensorflow/tfjs'
import * as nsfw from 'nsfwjs'
import type { NSFWJS } from 'nsfwjs'
import sharp from 'sharp'

let modelPromise: Promise<NSFWJS> | null = null

function getModel(): Promise<NSFWJS> {
  if (!modelPromise) {
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

// NSFWJS expects a 224×224 RGB tensor. Decode with sharp and hand tfjs the
// raw pixel buffer — tfjs-node's decodeImage isn't available in pure JS.
async function bufferToTensor(buffer: Buffer): Promise<tf.Tensor3D> {
  const { data, info } = await sharp(buffer)
    .resize(224, 224, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const pixels = new Uint8Array(data.buffer, data.byteOffset, data.byteLength)
  return tf.tensor3d(pixels, [info.height, info.width, 3], 'int32')
}

export async function classifyImage(buffer: Buffer): Promise<ModerationResult> {
  const model = await getModel()
  const tensor = await bufferToTensor(buffer)
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
