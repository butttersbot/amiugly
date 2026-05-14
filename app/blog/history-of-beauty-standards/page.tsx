import type { Metadata } from 'next'
import AdUnit from '@/app/components/AdUnit'
import { AD_SLOTS } from '@/app/components/ad-slots'

export const metadata: Metadata = {
  title: 'The History of Beauty Standards (A Completely Unbiased Report) — amiugly.lol',
  description: 'Beauty standards have changed dramatically throughout history. A tour through what humans have found attractive, and why it keeps changing.',
}

export default function Article() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>The History of Beauty Standards (A Completely Unbiased Report)</h1>
      <p className="text-xs mb-8" style={{ color: 'var(--muted)' }}>By the UglyNet™ Research Division</p>
      <AdUnit slot={AD_SLOTS.DISPLAY} format="auto" className="mb-8" />

      <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
        <p>The one thing history teaches us about beauty standards is that they are completely, utterly, chaotically inconsistent. What was considered the height of attractiveness in one era is bewildering or even unflattering by another era&apos;s standards. If this is comforting to you, it should be.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>Ancient Egypt: The Kohl Era</h2>
        <p>In ancient Egypt, beauty was elaborate and highly stylized. Both men and women wore heavy kohl eyeliner — not just for aesthetics but for sun protection and to ward off evil spirits. Smooth skin was prized, as was a slim waist, and wigs were fashion statements of the highest order. Being well-groomed signaled status, health, and divine favor. The look: dramatic. The effort: enormous.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>Ancient Greece: The Athletic Ideal</h2>
        <p>The Greeks were obsessed with physical perfection as an expression of moral virtue — the idea that a beautiful body reflected a beautiful soul. Athletic physiques were celebrated. Sculptures of the period show idealized proportions, though it&apos;s worth noting these were aspirational ideals, not documentary photography. The concept of the "golden ratio" as applied to facial beauty traces back to Greek mathematical philosophy, though modern researchers have heavily complicated that origin story.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Renaissance: Pale, Round, and Abundant</h2>
        <p>In Renaissance Europe, the ideal woman was pale, full-figured, and had a high forehead. The high forehead look was so prized that women would pluck their hairlines back to achieve it. Pale skin signaled that you didn&apos;t have to work outdoors, marking you as upper class. Rubens made his career painting women who would be described today in fitness magazines as "goals" but in the opposite direction than intended.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Victorian Era: Corseted and Complicated</h2>
        <p>The Victorian period brought the hourglass silhouette — tiny waist, full hips, full bust — achieved largely through corsetry that was, medically speaking, not great. Pale skin remained fashionable in many Western contexts. Women used lead-based face powder, which was very literally poisonous. The beauty industry has not always had your best interests at heart.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The 1920s: Flat Is In</h2>
        <p>Then, practically overnight, the ideal flipped. The flapper era celebrated a boyish, slim, flat-chested figure with short hair. Everything the Victorian era prized, the 1920s rejected. This is either evidence of how arbitrary beauty standards are, or evidence that fashion designers have always been chaotic agents of change. Possibly both.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Present: Contradictory and Algorithmic</h2>
        <p>Today&apos;s beauty standards are, if anything, more complicated than ever. Social media has created a global beauty standard that is simultaneously more diverse (more body types, skin tones, and features are celebrated than in previous eras) and more demanding (filters, editing tools, and constant visual comparison create impossible benchmarks). The "ideal" face in 2025 looks dramatically different depending on which corner of the internet you&apos;re in.</p>

        <p>The conclusion here isn&apos;t that beauty standards are fake — human beings genuinely respond to certain visual cues. It&apos;s that the specific features that get coded as "beautiful" are heavily shaped by culture, economics, technology, and the whims of whoever is currently most influential. In 200 years, our current beauty ideals will look as dated as high foreheads and lead powder.</p>

        <p>UglyNet™ is a product of its time. We acknowledge this. We are not above it.</p>
      <AdUnit slot={AD_SLOTS.IN_ARTICLE} format="in-article" className="mt-10" />
      </div>
    </main>
  )
}
