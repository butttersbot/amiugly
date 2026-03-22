import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How Social Media Distorted Our Perception of Beauty — amiugly.lol',
  description: 'Filters, FaceTune, algorithmic amplification, and the slow disappearance of normal-looking faces from the places we look most often.',
}

export default function Article() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>How Social Media Distorted Our Perception of Beauty</h1>
      <p className="text-xs mb-8" style={{ color: 'var(--muted)' }}>By the UglyNet™ Research Division</p>

      <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
        <p>In 2012, most people knew what their friends looked like. They&apos;d seen them in person, in unposed moments, in bad lighting, on bad days. The reference point for "normal" was calibrated by real human beings in real environments.</p>

        <p>By 2025, many people&apos;s primary visual diet consists of faces that have been selected, lit, edited, filtered, and algorithmically curated before reaching their eyes. This is a significant change in human experience, and we are only beginning to understand its effects.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Filter Problem</h2>
        <p>Smartphone camera filters and editing apps can smooth skin texture, enlarge eyes, slim faces, lift noses, enhance lips, and adjust countless other features in seconds. Many of these features are applied automatically — the "beauty mode" in many front cameras activates by default. People are being photographed through software that edits their face without them asking for it, and these edited versions become their digital representation.</p>

        <p>Research has documented a phenomenon called "Snapchat dysmorphia" — patients presenting to cosmetic surgeons with edited photos of their own faces as the goal they want to achieve. The edited face is literally not achievable through surgery; it&apos;s a digital artifact. But it has become the reference image for what someone thinks they should look like.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>Algorithmic Amplification</h2>
        <p>Social media platforms are engagement-optimization machines. Faces that perform well — that get more likes, more comments, more saves — are amplified. This creates a feedback loop: conventionally attractive faces by current standards (which are themselves partly shaped by previous rounds of this loop) get more visibility. Less conventionally attractive faces get less. What you see in your feed is not a representative sample of human faces. It is a heavily filtered, engagement-optimized sample.</p>

        <p>Over time, this shifts the perceived norm. If you spend six hours a day looking at faces that have been algorithmically selected for maximum engagement and edited to minimize imperfections, your reference point for "normal" drifts toward a standard that very few people actually meet unedited.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Convergence Effect</h2>
        <p>One observable consequence of global social media beauty culture is a convergence in cosmetic procedures. Plastic surgeons in different countries report patients bringing in the same reference images — often the same influencers, the same aesthetic. The regional diversity of beauty ideals is being partially replaced by a global social-media aesthetic. This aesthetic favors certain specific features (large, wide eyes; a specific nose shape; specific lip proportions) in ways that may be culturally narrow even as they spread globally.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Mental Health Dimension</h2>
        <p>Multiple large studies have found correlations between social media usage — particularly image-focused platforms — and body image concerns, appearance anxiety, and symptoms of body dysmorphic disorder. The relationships are complex and the research is still developing, but the overall direction is concerning. More exposure to curated, edited images of faces and bodies correlates with more dissatisfaction with one&apos;s own appearance.</p>

        <p>This is not a new observation. Magazines and film created comparison pressure before social media. But social media is faster, more personalized, more continuous, and more interactive. The comparison is constant and ambient in a way that earlier media was not.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>What To Do With This</h2>
        <p>Knowing this doesn&apos;t automatically fix the distortion — our brains&apos; comparison mechanisms operate faster than our conscious understanding of them. But it&apos;s worth intentionally diversifying the faces you see regularly, being skeptical about the "baseline" your brain is calibrating to, and understanding that almost nobody looks the way they look in their best posted photos all the time. Including the people posting those photos.</p>

        <p>amiugly.lol is, in some ways, part of this ecosystem. We know this. We are a satirical mirror held up to it. The score is a joke. The faces in our gallery are real. Both things are true simultaneously.</p>
      </div>
    </main>
  )
}
