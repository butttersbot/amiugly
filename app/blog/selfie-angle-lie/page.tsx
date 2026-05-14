import type { Metadata } from 'next'
import AdUnit from '@/app/components/AdUnit'
import { AD_SLOTS } from '@/app/components/ad-slots'

export const metadata: Metadata = {
  title: 'Why Your Selfie Angle Is a Lie — amiugly.lol',
  description: 'The science of why your face looks different in photos, from different angles, and in mirrors — and what that means for how you see yourself.',
}

export default function Article() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>Why Your Selfie Angle Is a Lie</h1>
      <p className="text-xs mb-8" style={{ color: 'var(--muted)' }}>By the UglyNet™ Research Division</p>
      <AdUnit slot={AD_SLOTS.DISPLAY} format="auto" className="mb-8" />

      <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
        <p>You have a go-to selfie angle. Everyone does. It&apos;s the angle that makes your jaw look sharper, your nose look smaller, and your eyes look slightly more like you&apos;ve figured something out about life. You&apos;ve found it through rigorous personal research, and you protect it fiercely.</p>

        <p>Here is the thing: that angle is not a lie in a bad way. It is, however, a very specific version of the truth. And understanding the optics of why it works will make you feel better about faces in general, including yours.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Lens Distortion Problem</h2>
        <p>Standard smartphone cameras have a wide-angle lens — typically somewhere between 24mm and 28mm equivalent focal length. Wide-angle lenses distort perspective: objects closer to the lens appear larger relative to objects further away. When you hold a phone close to your face for a selfie, your nose — the feature closest to the lens — appears disproportionately larger than it would in reality or in a photo taken from several feet away with a longer focal length lens.</p>

        <p>This is not a flaw in your face. It is a flaw in close-up wide-angle photography. Portrait photographers know this and typically shoot faces with 85mm or longer focal lengths to minimize distortion. Your phone selfie camera is doing the opposite.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>Why Angle Changes Everything</h2>
        <p>Shooting slightly from above (the classic "high angle selfie") counteracts some of this distortion by moving your nose further from the lens relative to other features. It also creates the appearance of larger eyes and a smaller jaw — features many people find more appealing. This is not cheating. It is applied optics.</p>

        <p>Shooting straight on or from below creates the opposite effect: nose forward, jaw widened, forehead minimized. This is why photos taken at parties by people shorter than you are always devastating.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Mirror Reversal Problem</h2>
        <p>There&apos;s also the mirror issue. You are used to seeing yourself in mirrors, which show a horizontally flipped version of your face. When you see a photo of yourself — which shows you as others see you, unreversed — it looks subtly wrong. Your part is on the "wrong" side. Your face is slightly different from the one you know.</p>

        <p>This is called mere exposure effect: you prefer the version of your face you see most often, which is the mirror version. Other people don&apos;t have this preference because they see both versions of you or just the unflipped version. What looks strange to you is perfectly normal to everyone else.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>Lighting: The Ultimate Cheat Code</h2>
        <p>Soft, diffuse front-facing light minimizes the appearance of texture and shadows on skin. It is genuinely the most powerful tool in selfie photography. Hard light from below (holding your phone at waist level in a dimly lit room) creates shadows that emphasize every texture, line, and asymmetry. Soft natural light from a window will make almost anyone look better in a photo.</p>

        <p>This is not a secret. This is just physics.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>What This Means for UglyNet™</h2>
        <p>When you submit a photo to amiugly.lol, UglyNet™ is analyzing whatever version of your face appears in that specific photo, at that specific angle, in that specific light. It is not analyzing your face. It is analyzing a two-dimensional projection of your face as captured by your particular camera in those particular conditions.</p>

        <p>This is, we acknowledge, a very good reason to take our scores with the appropriate amount of salt. The AI is not wrong. It&apos;s just analyzing something different from what you think it&apos;s analyzing. As are all of us, always, every day, when we look at faces in photos.</p>
      <AdUnit slot={AD_SLOTS.IN_ARTICLE} format="in-article" className="mt-10" />
      </div>
    </main>
  )
}
