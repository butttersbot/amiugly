import type { Metadata } from 'next'
import AdUnit from '@/app/components/AdUnit'
import { AD_SLOTS } from '@/app/components/ad-slots'

export const metadata: Metadata = {
  title: 'What Your Eye Shape Says About You (Nothing, Scientifically) — amiugly.lol',
  description: 'A comprehensive investigation into whether eye shapes carry personality meaning, predictive power, or cosmic significance. Spoiler: they do not.',
}

export default function Article() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>What Your Eye Shape Says About You (Nothing, Scientifically)</h1>
      <p className="text-xs mb-8" style={{ color: 'var(--muted)' }}>By the UglyNet™ Research Division</p>
      <AdUnit slot={AD_SLOTS.DISPLAY} format="auto" className="mb-8" />

      <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
        <p>The internet is full of articles that will tell you what your eye shape reveals about your personality, your fate, your compatibility, and your inner nature. Almond eyes mean one thing. Hooded eyes mean another. Upturned eyes suggest a certain temperament. Downturned eyes indicate something else entirely.</p>

        <p>We investigated all of this. We have findings.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Findings</h2>
        <p>Your eye shape does not predict your personality. It does not determine your fate. It is not correlated with your temperament in any validated, peer-reviewed way. Eye shape is determined by genetics — specifically by the structure of your orbit (the bony eye socket), the amount of periorbital fat, the positioning of the epicanthic fold (where present), and the position of your eyelid crease. These are anatomical facts about your heritage and development, not personality data.</p>

        <p>This is the finding. We spent very little time on it because there was not much to find.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>What Eye Shape Actually Affects</h2>
        <p>Eye shape does affect how other people perceive your emotional state. Upturned eyes can read as more "happy" or "friendly" at rest. Downturned eyes can read as sadder or more serious at rest (the "resting sad face" phenomenon). Larger-looking eyes are often perceived as more youthful. Hooded eyes can look more "intense" or "mysterious" depending on the context.</p>

        <p>These are not revelations about who you are. They are observations about how your particular anatomy creates certain visual impressions. They say more about how human brains process faces than about you specifically.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>Eye Attractiveness: What&apos;s Actually Researched</h2>
        <p>Larger irises relative to the eye are broadly perceived as attractive across many cultures — this may relate to youth signaling, as irises appear larger in children. Limbal rings (the dark border around the iris) that are clearly defined are perceived as attractive. Whites of the eyes that are clear and bright signal health. These are all health and youth signals, not specific eye shapes.</p>

        <p>Preferences for specific eye shapes — almond vs. round, for instance — vary across cultures and time periods. East Asian beauty culture has at different times both embraced monolid eyes as elegant and created enormous demand for double eyelid surgery. Neither standard is "correct." They reflect cultural preferences, not objective hierarchy.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Physiognomy Problem</h2>
        <p>The broader idea that facial features predict character — physiognomy — has a long history and an extremely bad track record. Historically, physiognomy was used to justify racism, classism, and discrimination of all kinds. The idea that you can read a person&apos;s criminality, intelligence, or moral character from their face has been thoroughly discredited.</p>

        <p>The lighter entertainment version of this — eye shapes and personality types, face reading, and so on — is physiognomy with the harmful edges sanded off. It is mostly harmless fun. It is also not scientifically valid.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>UglyNet™&apos;s Eye Assessment</h2>
        <p>We measure Eye Luminosity, Iris Contrast Coefficient, Periorbital Symmetry, and Lateral Canthal Tilt across three axes. What does this tell us about you? Mostly where to position our score on the results page. What does your eye shape say about you? That your ancestors came from somewhere. Welcome to Earth.</p>
      <AdUnit slot={AD_SLOTS.IN_ARTICLE} format="in-article" className="mt-10" />
      </div>
    </main>
  )
}
