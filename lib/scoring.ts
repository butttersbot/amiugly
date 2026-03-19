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
  imageHash: string
}

const CALLOUTS: Record<CategoryKey, string[]> = {
  nose: [
    'Structurally ambitious',
    'An architectural statement',
    'Nature overdelivered here',
    'Bold choice by evolution',
    'A centerpiece, whether you like it or not',
    'Aerodynamically challenged',
    'Aggressively present',
    'Takes up more real estate than expected',
    'The room notices it first',
    'A feature, not a bug (allegedly)',
    'Arrived before the rest of the face',
    'Doing a lot of heavy lifting',
    'Optimistically proportioned',
    'Deserves its own zip code',
    'Structurally… creative',
    'Prominent in all the wrong ways',
    'Nature was feeling ambitious',
    'Cartographers have noted it',
    'A conversation starter, whether you want one or not',
    'The face\'s load-bearing element',
    'Larger than its brief',
    'More nose than the face strictly required',
  ],
  eye_placement: [
    'Concerning symmetry',
    'Asymmetry as a lifestyle',
    'Eyes charting their own course',
    'Independently minded',
    'Two eyes, two opinions',
    'Symmetry is overrated anyway',
    'The eyes have different managers',
    'Left eye not speaking to the right eye',
    'A unique interpretation of bilateral symmetry',
    'One eye judging you, one looking for an exit',
    'Placement: creative',
    'The Picasso coefficient is elevated',
    'Placed with enthusiasm, not precision',
    'Both present, not necessarily aligned',
    'They aim in the same direction most of the time',
    'Calibration: ongoing',
    'Eyes set to wide mode',
    'Eyes set to narrow mode',
    'Set far enough apart to cause concern',
    'Set close enough together to raise questions',
    'Distance between them: disputed',
    'A unique take on bilateral architecture',
  ],
  forehead: [
    'A generous canvas',
    'Expansive and proud',
    'Room for a billboard',
    'Commanding presence',
    'Nature thought big here',
    'Five-head energy',
    'An investment in cranial real estate',
    'Nature left extra space, just in case',
    'A landing strip',
    'Architecturally… significant',
    'Could host an IMAX screening',
    'Aggressively horizontal',
    'Hairline: retreating',
    'More forehead than strictly necessary',
    'NASA could land something here',
    'The scalp had ambitions',
    'Proportions: unchecked',
    'The highlight reel of the face',
    'Vast. Simply vast.',
    'A bold statement about vertical real estate',
    'The face\'s penthouse',
    'Roomier than average',
  ],
  jawline: [
    'Nature\'s abstract period',
    'Softly undefined',
    'More of a suggestion',
    'Character-building geometry',
    'Jawline: pending',
    'Soft launch vibes',
    'Where does the face end? Hard to say',
    'The chin region: approximate',
    'Geometric ambiguity',
    'Blending seamlessly into the neck',
    'A loose interpretation of facial structure',
    'Contour: theoretical',
    'The face just sort of… stops',
    'Structural integrity: low',
    'More of a gradient than a line',
    'Filing under: "character"',
    'Clinically unresolved',
    'The jawline has left the building',
    'Definition: not yet',
    'Somewhere between a chin and a concept',
    'Lost below the cheekbones',
    'Nature deprioritized this one',
  ],
  mouth: [
    'Expressive in the wrong ways',
    'Working harder than necessary',
    'Doing its best',
    'A lot going on here',
    'Loud even when silent',
    'The face\'s wild card',
    'Communicates distress even in repose',
    'The most honest part of the face',
    'Overengineered for basic use',
    'Has strong opinions',
    'More mouth than the face budgeted for',
    'Placed with confidence, if not precision',
    'Sends mixed signals',
    'Doing overtime',
    'Nature was improvising here',
    'Proportionally assertive',
    'The center of ongoing controversy',
    'A feature that demands attention',
    'Expressive range: unfortunate',
    'Resting state: concerning',
    'The wildest part of an already wild face',
    'A statement piece',
  ],
  vibe: [
    'A face made for radio',
    'Personality must be incredible',
    'Science cannot explain this',
    'Unforgettable for all the wrong reasons',
    'A face that tells a story (not a good one)',
    'Charisma not included',
    'Defies easy classification',
    'A testament to genetic diversity',
    'We have questions',
    'Nature was experimenting',
    'The overall gestalt is… a lot',
    'Statistically improbable',
    'No two faces like it (for a reason)',
    'An experience, not just a face',
    'The subject appears unbothered, which is admirable',
    'Would benefit from a hat',
    'A face that builds character — in others',
    'Deeply singular',
    'A study in controlled chaos',
    'The camera did not soften this',
    'Memorable. Not in the good way.',
    'A unique contribution to the gene pool',
    'A face that rewards absolutely no one',
    'Objectively a lot to take in',
  ],
}

const LABELS: { min: number; max: number; label: string }[] = [
  { min: 96, max: 100, label: 'A Medical Curiosity' },
  { min: 91, max: 95,  label: 'Structurally Alarming' },
  { min: 81, max: 90,  label: 'Clinically Unfortunate' },
  { min: 71, max: 80,  label: 'Visually Challenging' },
  { min: 61, max: 70,  label: 'Unremarkable' },
  { min: 51, max: 60,  label: 'Mildly Catastrophic' },
  { min: 43, max: 50,  label: 'A Difficult Watch' },
  { min: 33, max: 42,  label: 'A Polite Disaster' },
  { min: 23, max: 32,  label: 'An Acquired Taste' },
  { min: 14, max: 22,  label: "Nature's First Draft" },
  { min: 9,  max: 13,  label: 'Human Beige' },
  { min: 5,  max: 8,   label: 'Deeply Forgettable' },
  { min: 1,  max: 4,   label: 'Without Ambition' },
]

// Weighted distribution — skewed toward "ugly" end (it's the theme) but with real variety.
// Weights correspond to LABELS array order above. Must sum to 100.
const TIER_WEIGHTS = [4, 8, 16, 21, 18, 13, 5, 5, 4, 3, 1, 1, 1]

function seededRandom(seed: string, index: number): number {
  const hash = crypto.createHash('sha256').update(`${seed}-${index}`).digest('hex')
  return parseInt(hash.slice(0, 8), 16) / 0xffffffff
}

export function scoreImage(imageBuffer: Buffer): ScoreResult {
  const seed = crypto.createHash('sha256').update(imageBuffer).digest('hex')

  // Pick tier using weighted distribution
  const tierRand = seededRandom(seed, 0) * 100
  let cumWeight = 0
  let tierIdx = 0
  for (let i = 0; i < TIER_WEIGHTS.length; i++) {
    cumWeight += TIER_WEIGHTS[i]
    if (tierRand < cumWeight) { tierIdx = i; break }
  }

  // Pick exact score within that tier
  const tier = LABELS[tierIdx]
  const posRand = seededRandom(seed, 1)
  const score = Math.floor(tier.min + posRand * (tier.max - tier.min + 1))
  const label = tier.label

  // Pick category callouts
  const categories: Record<CategoryKey, CategoryResult> = {} as Record<CategoryKey, CategoryResult>
  const categoryKeys = Object.keys(CALLOUTS) as CategoryKey[]

  categoryKeys.forEach((key, i) => {
    const calloutList = CALLOUTS[key]
    const idx = Math.floor(seededRandom(seed, i + 2) * calloutList.length)
    categories[key] = {
      label: key.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()),
      callout: calloutList[idx],
    }
  })

  return { score, label, categories, imageHash: seed }
}
