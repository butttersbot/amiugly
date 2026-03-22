import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Is Facial Symmetry and Does It Actually Matter? — amiugly.lol',
  description: 'A deep dive into facial symmetry, what science actually says about attractiveness, and why your slightly crooked nose is probably fine.',
}

export default function Article() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 prose prose-sm">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>What Is Facial Symmetry and Does It Actually Matter?</h1>
      <p className="text-xs mb-8" style={{ color: 'var(--muted)' }}>By the UglyNet™ Research Division</p>

      <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
        <p>Somewhere along the way, humanity decided that a perfectly symmetrical face was the gold standard of attractiveness. Magazines ran articles about it. Dating apps quietly built it into their algorithms. And now here we all are, staring at our reflections trying to figure out if our left eyebrow is a millimeter higher than our right and whether that means we&apos;re doomed.</p>

        <p>Let&apos;s actually look at what the science says. And then let&apos;s look at what the science <em>doesn&apos;t</em> say, which is honestly more interesting.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Symmetry Hypothesis</h2>
        <p>The idea that symmetry equals attractiveness comes from evolutionary biology. The theory goes: symmetrical development suggests genetic fitness, freedom from disease and developmental stress during childhood, and a robust immune system. So, from an evolutionary standpoint, being attracted to symmetry would help you select a healthy mate.</p>

        <p>Studies have found a correlation between facial symmetry and perceived attractiveness. Some research suggests symmetrical faces are rated as more attractive on average. So far, so logical.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>Here&apos;s Where It Gets Complicated</h2>
        <p>The effect size is much smaller than pop culture would have you believe. In controlled studies, symmetry accounts for only a modest portion of attractiveness ratings — often less than you&apos;d expect. Other factors like skin quality, facial expression, grooming, and averageness (yes, "average" is actually attractive — more on that in a moment) tend to matter more.</p>

        <p>Also: no human face is actually symmetrical. Not yours, not a supermodel&apos;s. When researchers take photos and create perfectly mirrored versions of faces, participants often find the original, asymmetrical face <em>more</em> attractive than the artificially symmetrized version. Perfect symmetry looks slightly uncanny. A little off is, counterintuitively, more human and more appealing.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The "Averageness" Effect</h2>
        <p>One of the more counterintuitive findings in attractiveness research is that composite faces — created by blending many individual faces together — tend to be rated as highly attractive. This isn&apos;t because people like bland faces. It&apos;s because the blending process averages out unusual features, creating a face that hits familiar proportions our brains have learned to process as healthy and normal.</p>

        <p>This means that the most conventionally attractive faces are often just... very average. Which is either comforting or deeply unsatisfying, depending on your worldview.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>Cultural and Individual Variation</h2>
        <p>Attractiveness preferences also vary significantly across cultures and individuals. What reads as attractive in one cultural context can differ from another. And at the individual level, personal preferences, familiarity, and emotional connection have enormous effects on how attractive someone finds a face.</p>

        <p>The symmetry hypothesis is a real thing with real scientific support, but it&apos;s one piece of a very complicated picture. Not a magic formula for beauty.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>So Does Your Facial Symmetry Matter?</h2>
        <p>Somewhat. Less than Instagram would have you believe. More than pure randomness. Your slightly asymmetrical nose or the way one of your eyes is marginally smaller than the other is not a dealbreaker in the evolutionary sweepstakes. It is, in fact, completely normal.</p>

        <p>The real takeaway from symmetry research isn&apos;t that you need a perfectly balanced face. It&apos;s that healthy development, good genetics, and overall facial health matter — and those show up in all kinds of ways beyond pure symmetry. Skin quality, facial muscle tone, proportions, and expression all factor in.</p>

        <p>UglyNet™ has analyzed your facial symmetry to the nearest 0.01 millimeter, across 47 vectors. We are not going to tell you the results. You&apos;re welcome.</p>
      </div>
    </main>
  )
}
