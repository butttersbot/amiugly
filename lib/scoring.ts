import crypto from 'crypto'

export type CategoryKey = 'nose' | 'eye_placement' | 'forehead' | 'jawline' | 'mouth' | 'vibe'

export interface CategoryResult {
  label: string
  callout: string
}

export interface ScoreResult {
  score: number
  label: string
  categories: Record<CategoryKey, CategoryResult>
}

const CALLOUTS: Record<CategoryKey, string[]> = {
  nose: [
    'Structurally ambitious',
    'An architectural statement',
    'Nature overdelivered here',
    'Bold choice by evolution',
    'A centerpiece, whether you like it or not',
    'Aerodynamically challenged',
  ],
  eye_placement: [
    'Concerning symmetry',
    'Asymmetry as a lifestyle',
    'Eyes charting their own course',
    'Independently minded',
    'Two eyes, two opinions',
    'Symmetry is overrated anyway',
  ],
  forehead: [
    'A generous canvas',
    'Expansive and proud',
    'Room for a billboard',
    'Commanding presence',
    'Nature thought big here',
    'Five-head energy',
  ],
  jawline: [
    "Nature's abstract period",
    'Softly undefined',
    'More of a suggestion',
    'Character-building geometry',
    'Jawline: pending',
    'Soft launch vibes',
  ],
  mouth: [
    'Expressive in the wrong ways',
    'Working harder than necessary',
    'Doing its best',
    'A lot going on here',
    'Loud even when silent',
    'The face\'s wild card',
  ],
  vibe: [
    'A face made for radio',
    'Personality must be incredible',
    'Science cannot explain this',
    'Unforgettable for all the wrong reasons',
    'A face that tells a story (not a good one)',
    'Charisma not included',
  ],
}

const LABELS: { min: number; max: number; label: string }[] = [
  { min: 91, max: 100, label: 'A Medical Curiosity' },
  { min: 81, max: 90,  label: 'Clinically Unfortunate' },
  { min: 71, max: 80,  label: 'Visually Challenging' },
  { min: 61, max: 70,  label: 'Unremarkable' },
  { min: 51, max: 60,  label: 'Passable' },
  { min: 21, max: 50,  label: 'Easy on the Eyes' },
  { min: 1,  max: 20,  label: 'Suspiciously Gorgeous' },
]

function seededRandom(seed: string, index: number): number {
  const hash = crypto.createHash('sha256').update(`${seed}-${index}`).digest('hex')
  return parseInt(hash.slice(0, 8), 16) / 0xffffffff
}

export function scoreImage(imageBuffer: Buffer): ScoreResult {
  const seed = crypto.createHash('sha256').update(imageBuffer).digest('hex')

  // Always score 70–96
  const rawRandom = seededRandom(seed, 0)
  const score = Math.floor(70 + rawRandom * 27) // 70..96

  const labelEntry = LABELS.find(l => score >= l.min && score <= l.max)!
  const label = labelEntry.label

  const categories: Record<CategoryKey, CategoryResult> = {} as Record<CategoryKey, CategoryResult>
  const categoryKeys = Object.keys(CALLOUTS) as CategoryKey[]

  categoryKeys.forEach((key, i) => {
    const calloutList = CALLOUTS[key]
    const idx = Math.floor(seededRandom(seed, i + 1) * calloutList.length)
    categories[key] = {
      label: key.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()),
      callout: calloutList[idx],
    }
  })

  return { score, label, categories }
}
