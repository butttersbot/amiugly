import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Science of the Golden Ratio (And Why It\'s Mostly Made Up) — amiugly.lol',
  description: 'Phi equals 1.618. The golden ratio is real mathematics. Its application to facial beauty is, however, significantly more complicated than influencers suggest.',
}

export default function Article() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>The Science of the Golden Ratio (And Why It&apos;s Mostly Made Up)</h1>
      <p className="text-xs mb-8" style={{ color: 'var(--muted)' }}>By the UglyNet™ Research Division</p>

      <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
        <p>The golden ratio is 1.618033... It appears in mathematics, in spiral patterns in nature, and in a truly remarkable number of Instagram posts claiming to explain why certain celebrities are "mathematically perfect." Let&apos;s talk about what&apos;s real here and what&apos;s vibes.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>What the Golden Ratio Actually Is</h2>
        <p>Phi (φ) is an irrational number, approximately 1.618, that emerges naturally from certain mathematical relationships. A line is divided in "golden ratio" proportions when the ratio of the whole line to the longer segment equals the ratio of the longer segment to the shorter segment. This produces some genuinely remarkable mathematical properties and appears in various natural growth patterns — the spiral of a nautilus shell, the arrangement of seeds in a sunflower, the branching of trees.</p>

        <p>The mathematics is real. The number is real. What happens next is where things get complicated.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Face Claims</h2>
        <p>The claim goes: the most beautiful faces have features in golden ratio proportions — the ratio of the face&apos;s length to width, the ratio of the nose to the mouth, the spacing of the eyes — all approximate 1.618. Therefore, beauty is mathematical. Phi is the formula for a perfect face.</p>

        <p>This is a genuinely appealing idea. It&apos;s clean. It&apos;s quantifiable. It gives you something to measure. It is also not well-supported by research.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>What the Research Actually Shows</h2>
        <p>Studies that have actually tested whether golden ratio proportions correlate with attractiveness ratings have found weak or inconsistent results. Faces rated as most attractive don&apos;t consistently show phi proportions. And when researchers present people with faces at varying proportions — some at phi, some not — participants don&apos;t reliably prefer the phi proportions.</p>

        <p>The problem is that the golden ratio is flexible enough to find almost anywhere if you look hard enough and measure selectively. If you take a face, measure enough ratios between enough points, you will find some that approximate 1.618. This doesn&apos;t mean the face is "golden ratio" — it means you measured a lot of ratios.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>Why It Won&apos;t Go Away</h2>
        <p>The golden ratio in beauty is a compelling story. It connects mathematics to aesthetics, gives a scientific-sounding framework to something subjective, and produces satisfying diagrams. The fact that the empirical evidence is weak doesn&apos;t stop it from appearing in plastic surgery consultations, beauty YouTube, and AI beauty rating apps.</p>

        <p>We at UglyNet™ will neither confirm nor deny whether phi is involved in our scoring algorithm. What we will say is that your facial proportions are almost certainly fine, regardless of whether they happen to approximate an irrational number named after a Greek letter.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Honest Takeaway</h2>
        <p>The golden ratio is beautiful mathematics. It appears in nature in genuinely interesting ways. Its application to human facial attractiveness is largely pseudoscience dressed up in satisfying numbers. This doesn&apos;t mean beauty is completely random — there are real patterns in what humans find attractive. It just means those patterns are more complex, more cultural, and more individual than a single irrational number can capture.</p>

        <p>Anyone who pulls out calipers and tells you your face is 1.61 or 1.58 and that means something definitive is selling something. Probably a procedure. Don&apos;t buy it.</p>
      </div>
    </main>
  )
}
