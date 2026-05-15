import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Content Policy — amiugly.lol',
  description:
    'What amiugly.lol jokes about, what we never joke about, and how we keep the satire from punching down. Plus content moderation, age policy, and reporting.',
}

export default function ContentPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 prose prose-sm">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
        Content Policy
      </h1>
      <p className="text-xs mb-8" style={{ color: 'var(--muted)' }}>
        Last updated: May 15, 2026
      </p>

      <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
        <section>
          <h2 className="font-semibold text-base mb-2">1. The short version</h2>
          <p>
            amiugly.lol is a satirical entertainment site. UglyNet™ generates an absurd, intentionally
            random &quot;ugliness&quot; report — the joke is on AI scoring systems, not on the person
            uploading the photo. We roast the bit, not the body.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">2. What we may joke about</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Made-up &quot;facial dimensions&quot; like the &quot;47-point ugliness index&quot;</li>
            <li>Pseudo-technical categories (jawline, forehead, eye placement, vibe)</li>
            <li>The absurdity of AI face-scoring as a concept</li>
            <li>Internet beauty culture, filtered selfies, and dating-app posturing in our blog</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">3. What we never joke about</h2>
          <p className="mb-2">
            UglyNet™ does not, and will not, generate content that targets a person&apos;s:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Race or ethnicity</li>
            <li>Religion</li>
            <li>Disability</li>
            <li>Body weight or body type</li>
            <li>Age</li>
            <li>Gender identity or sexual orientation</li>
            <li>National origin</li>
            <li>Any other protected characteristic</li>
          </ul>
          <p className="mt-2">
            If you ever see output that crosses one of these lines, please{' '}
            <a href="mailto:privacy@amiugly.lol" className="underline" style={{ color: 'var(--accent)' }}>
              email us
            </a>{' '}
            with the submission ID — we&apos;ll review and remove it.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">4. The scoring is not real</h2>
          <p>
            Scores are seeded from a hash of the image itself, not from any actual judgment of
            attractiveness. The same photo will always get the same satirical score, regardless of
            who you are. UglyNet™ does not analyze 47 facial dimensions. There is no &quot;face
            database of 14 million.&quot; That&apos;s the joke.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">5. What you may upload</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              <strong>Your own face.</strong> By using amiugly.lol you confirm the photo is of yourself
              and that you are 18 or older.
            </li>
            <li>Standard image formats: JPEG, PNG, WebP, or HEIC, up to 10MB.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">6. What you may not upload</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              <strong>Photos of other people</strong> without their explicit consent — especially
              photos meant to embarrass, harass, or mock someone.
            </li>
            <li>
              <strong>Photos of minors.</strong> No exceptions. amiugly.lol is not directed at users
              under 18, and we will not display any content depicting minors.
            </li>
            <li>
              <strong>Nudity, pornography, or sexually explicit content.</strong> We run an automated
              content classifier on every upload that blocks images meeting these criteria before they
              reach our servers or the gallery.
            </li>
            <li>
              <strong>Hate symbols, violence, gore, or harmful content.</strong>
            </li>
            <li>
              <strong>Images that are not of a human face</strong> (memes, screenshots, copyrighted
              characters, etc.). UglyNet™ has no idea what to do with them and they clutter the gallery.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">7. Automated moderation</h2>
          <p>
            Every upload is checked by an automated NSFW classifier before it touches storage or the
            gallery. Images flagged as containing pornography, sexual content, or other prohibited
            material are rejected at the upload step and never stored. We also log abuse patterns and
            block repeat offenders by IP.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">8. Photo deletion &amp; data removal</h2>
          <p>
            If you did not consent to gallery inclusion, your photo is processed and immediately
            discarded — we never retain it. If you did consent and want to remove your photo from the
            gallery later, use the opt-out link on your results page, or email{' '}
            <a href="mailto:privacy@amiugly.lol" className="underline" style={{ color: 'var(--accent)' }}>
              privacy@amiugly.lol
            </a>{' '}
            and we will remove it within 48 hours. Full details in our{' '}
            <Link href="/privacy" className="underline" style={{ color: 'var(--accent)' }}>
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">9. Reporting a problem</h2>
          <p>
            If you see anything on amiugly.lol that violates this Content Policy — your own photo
            uploaded without consent, output that targets a protected characteristic, content
            involving a minor, or any other concern — email{' '}
            <a href="mailto:privacy@amiugly.lol" className="underline" style={{ color: 'var(--accent)' }}>
              privacy@amiugly.lol
            </a>{' '}
            with the submission URL or ID and we will respond within 48 hours.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">10. Related policies</h2>
          <p>
            <Link href="/privacy" className="underline" style={{ color: 'var(--accent)' }}>
              Privacy Policy
            </Link>{' '}
            ·{' '}
            <Link href="/terms" className="underline" style={{ color: 'var(--accent)' }}>
              Terms of Use
            </Link>{' '}
            ·{' '}
            <Link href="/about" className="underline" style={{ color: 'var(--accent)' }}>
              About
            </Link>{' '}
            ·{' '}
            <Link href="/faq" className="underline" style={{ color: 'var(--accent)' }}>
              FAQ
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
