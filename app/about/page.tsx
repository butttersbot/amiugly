import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — amiugly.lol',
  description: 'About amiugly.lol and UglyNet™',
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>About amiugly.lol</h1>
      <p className="text-xs mb-10" style={{ color: 'var(--muted)' }}>The internet&apos;s most unnecessarily scientific beauty analysis.</p>

      <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>

        <section>
          <h2 className="font-semibold text-base mb-2">What is this?</h2>
          <p>amiugly.lol is a satirical entertainment website that uses AI to generate a completely made-up &quot;ugliness score&quot; for your selfie. It is not real. UglyNet™ does not actually know if you are ugly. Nobody does. Beauty is subjective and science definitely does not have a definitive answer, despite what our loading screen says.</p>
          <p className="mt-2">We built this because the internet needed one more reason to take selfies, and also because watching an AI confidently rate someone&apos;s &quot;jawline symmetry across 47 facial dimensions&quot; is extremely funny.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">How does UglyNet™ work?</h2>
          <p>You upload a photo. Our AI analyzes it across several totally real and scientifically valid metrics including but not limited to: jawline aura, cheekbone energy, and general vibe. It then produces a score and a roast. The score is random. The roast is AI-generated. Neither should be taken seriously.</p>
          <p className="mt-2">If you feel bad about your score: the AI is wrong. You look great.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">The gallery</h2>
          <p>When you submit a photo, you can optionally consent to having your result appear in the public gallery. This is entirely opt-in. If you change your mind, you can remove your photo at any time from your results page or by contacting us.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Is this mean?</h2>
          <p>It&apos;s meant to be funny, not mean. The whole premise is that AI confidently saying ridiculous things about faces is absurd and worth laughing at. We take content moderation seriously and will remove anything used to harass or demean specific individuals.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Contact</h2>
          <p>Questions, concerns, or want your photo removed? Email <a href="mailto:hello@amiugly.lol" className="underline">hello@amiugly.lol</a></p>
        </section>

      </div>
    </main>
  )
}
