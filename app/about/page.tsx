import type { Metadata } from 'next'
import AdUnit from '@/app/components/AdUnit'
import { AD_SLOTS } from '@/app/components/ad-slots'

export const metadata: Metadata = {
  title: 'About — amiugly.lol',
  description: 'About amiugly.lol and UglyNet™',
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>About amiugly.lol</h1>
      <p className="text-xs mb-10" style={{ color: 'var(--muted)' }}>The internet&apos;s most unnecessarily scientific beauty analysis.</p>

      <AdUnit slot={AD_SLOTS.DISPLAY} format="auto" className="mb-10" />

      <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>

        <section>
          <h2 className="font-semibold text-base mb-2">What is this?</h2>
          <p>amiugly.lol is a satirical entertainment website. UglyNet™ generates an absurdist &quot;Ugly Report&quot; for your selfie — a comedy concept dressed up in pseudo-scientific UI. It does not measure attractiveness. Nobody can. Beauty is subjective, cultural, and not something a website should be telling you about, despite what our loading screen says.</p>
          <p className="mt-2">We built this because the internet needed one more reason to take selfies, and also because watching an AI confidently narrate someone&apos;s &quot;jawline symmetry across 47 facial dimensions&quot; is extremely funny when everyone knows the framing is satire.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">How does UglyNet™ work?</h2>
          <p>You upload a photo. UglyNet™ analyzes it across satirical dimensions including jawline aura, cheekbone energy, eye socket drama, and general vibe. It then produces an absurdist &quot;Ugly Report&quot; with category labels designed to be funny — a comedy filter for selfies dressed up in pseudo-scientific UI.</p>
          <p className="mt-2">Everything UglyNet™ outputs is satirical commentary. It is not a real attractiveness assessment, a medical opinion, or a personality test. If you feel bad about your result: the AI is satire. You look great.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">The gallery</h2>
          <p>When you submit a photo, you can optionally consent to having your result appear in the public gallery. This is entirely opt-in. If you change your mind, you can remove your photo at any time from your results page or by contacting us.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Is this mean?</h2>
          <p>It&apos;s meant to be funny, not mean. The whole premise is that AI confidently saying ridiculous things about faces is absurd and worth laughing at. We take content moderation seriously and will remove anything used to harass or demean specific individuals.</p>
        </section>

        <AdUnit slot={AD_SLOTS.IN_ARTICLE} format="in-article" className="my-6" />

        <section>
          <h2 className="font-semibold text-base mb-2">Contact</h2>
          <p>Questions, concerns, or want your photo removed? Email <a href="mailto:hello@amiugly.lol" className="underline">hello@amiugly.lol</a></p>
        </section>

      </div>
    </main>
  )
}
