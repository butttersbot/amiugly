import type { Metadata } from 'next'
import { Fragment } from 'react'
import Link from 'next/link'
import AdUnit from '@/app/components/AdUnit'
import { AD_SLOTS } from '@/app/components/ad-slots'

export const metadata: Metadata = {
  title: 'FAQ — amiugly.lol',
  description: 'Frequently asked questions about amiugly.lol, UglyNet™, the satirical AI selfie analyzer. Privacy, accuracy, opt-out, and more.',
  alternates: { canonical: '/faq' },
}

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Is amiugly.lol serious?',
    a: (
      <>
        <p>
          No. amiugly.lol is a satirical entertainment website. UglyNet™ is a fictional &quot;AI&quot; that
          generates absurdist category labels — Jawline Aura, Cheekbone Energy, Eye Socket Drama —
          all designed to be funny, not informative. The premise is that an AI confidently
          narrating ridiculous things about human faces is comedy. Nothing about the result is a
          real assessment of attractiveness, health, or anything else.
        </p>
        <p className="mt-2">
          If you are looking for actual information about facial attractiveness research, our{' '}
          <Link href="/blog" style={{ color: 'var(--accent)' }} className="underline">UglyNet™ Journal</Link>{' '}
          has substantive articles on facial symmetry, the golden ratio, beauty standards across
          history and cultures, and why AI systems struggle with this question in the first place.
        </p>
      </>
    ),
  },
  {
    q: 'What happens to my photo?',
    a: (
      <>
        <p>
          When you upload, your photo is processed to generate the satirical Ugly Report. If you
          consented to gallery inclusion (the checkbox on the upload page), your photo and labels
          appear in the public gallery and at a results URL you can share.
        </p>
        <p className="mt-2">
          If you did <em>not</em> consent to gallery inclusion, your photo is processed and
          discarded — we do not retain it. For the full data-handling story see our{' '}
          <Link href="/privacy" style={{ color: 'var(--accent)' }} className="underline">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    q: 'How do I remove my photo from the gallery?',
    a: (
      <>
        <p>
          Two options:
        </p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>
            Go to your results page (the URL you got after submitting) and click{' '}
            <strong>Opt out of gallery</strong>. The photo and labels are removed within seconds.
          </li>
          <li>
            Email{' '}
            <a href="mailto:hello@amiugly.lol" style={{ color: 'var(--accent)' }} className="underline">hello@amiugly.lol</a>{' '}
            with the results URL or any identifying detail. We respond within 48 hours and remove
            the entry.
          </li>
        </ul>
        <p className="mt-2">
          Removal is total — the photo is deleted from storage, not just hidden from the gallery.
        </p>
      </>
    ),
  },
  {
    q: 'Can I submit a photo of someone else?',
    a: (
      <>
        <p>
          No. Our{' '}
          <Link href="/terms" style={{ color: 'var(--accent)' }} className="underline">Terms</Link>{' '}
          require that the photo is of yourself, that you are 18 or older, and that you have the
          right to submit it. We do not allow photos of minors, photos of public figures used to
          mock them, or any photo submitted without the depicted person&apos;s consent.
        </p>
        <p className="mt-2">
          If you believe a photo of you (or someone else) was submitted without consent, email{' '}
          <a href="mailto:hello@amiugly.lol" style={{ color: 'var(--accent)' }} className="underline">hello@amiugly.lol</a>{' '}
          and we will remove it on receipt — no questions asked.
        </p>
      </>
    ),
  },
  {
    q: 'Is the AI actually rating my attractiveness?',
    a: (
      <>
        <p>
          No. UglyNet™ is a comedy concept, not a real attractiveness scoring system. The
          category labels (&quot;Jawline Aura: chaotic&quot;, &quot;Cheekbone Energy: librarian core&quot;) are
          satirical commentary designed for entertainment.
        </p>
        <p className="mt-2">
          Real AI systems used in beauty scoring carry serious biases around race, lighting,
          camera quality, and cultural beauty standards — see{' '}
          <Link href="/blog/ai-cant-tell-ugly" style={{ color: 'var(--accent)' }} className="underline">
            Why AI Can&apos;t Actually Tell If You&apos;re Ugly
          </Link>{' '}
          for the long version. amiugly.lol exists to comment on those biases by making them
          obviously absurd.
        </p>
      </>
    ),
  },
  {
    q: 'Why did I get the same result as someone else?',
    a: (
      <>
        <p>
          UglyNet™ uses a deterministic visual fingerprint of your photo to seed the satirical
          label generator — meaning the same photo always produces the same Ugly Report. If two
          photos happen to produce overlapping category labels, that&apos;s an artifact of the satirical
          label set being intentionally finite and absurd, not a real signal.
        </p>
      </>
    ),
  },
  {
    q: 'Is amiugly.lol safe for kids or teens?',
    a: (
      <>
        <p>
          No. amiugly.lol is intended for users 18 and older. Submission requires you to confirm
          you are 18+, and our{' '}
          <Link href="/privacy" style={{ color: 'var(--accent)' }} className="underline">Privacy Policy</Link>{' '}
          explicitly does not allow data collection from children. We will remove any photo
          believed to depict a minor on receipt.
        </p>
      </>
    ),
  },
  {
    q: 'Why does this site have ads?',
    a: (
      <>
        <p>
          amiugly.lol uses{' '}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)' }}
            className="underline"
          >
            Google AdSense
          </a>{' '}
          to keep the site free and cover hosting and AI compute costs. You can opt out of
          personalized advertising at{' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)' }}
            className="underline"
          >
            Google Ads Settings
          </a>.
        </p>
      </>
    ),
  },
  {
    q: 'Who built this?',
    a: (
      <>
        <p>
          A small independent team that thought the internet needed one more reason to take a
          selfie. We treat amiugly.lol as a satire and commentary project on AI beauty rating
          tools and the cultural pressure to measure faces against an algorithmic ideal.
        </p>
        <p className="mt-2">
          For business inquiries, content removal, or just to say hi:{' '}
          <a href="mailto:hello@amiugly.lol" style={{ color: 'var(--accent)' }} className="underline">hello@amiugly.lol</a>.
        </p>
      </>
    ),
  },
]

// Plain-text version for FAQPage schema (no JSX)
const faqsForSchema: { q: string; a: string }[] = [
  {
    q: 'Is amiugly.lol serious?',
    a: 'No. amiugly.lol is a satirical entertainment website. UglyNet™ is a fictional AI that generates absurdist category labels designed to be funny, not informative. Nothing about the result is a real assessment of attractiveness, health, or anything else.',
  },
  {
    q: 'What happens to my photo?',
    a: 'If you consented to gallery inclusion, your photo and labels appear in the public gallery and at a results URL. If you did not consent, your photo is processed and immediately discarded — we do not retain it.',
  },
  {
    q: 'How do I remove my photo from the gallery?',
    a: 'You can opt out directly from your results page using the Opt out of gallery button, or email hello@amiugly.lol. Removal is total — the photo is deleted from storage, not just hidden.',
  },
  {
    q: 'Can I submit a photo of someone else?',
    a: 'No. Our Terms require that the photo is of yourself, that you are 18 or older, and that you have the right to submit it. We do not allow photos of minors or photos submitted without the depicted person\'s consent.',
  },
  {
    q: 'Is the AI actually rating my attractiveness?',
    a: 'No. UglyNet™ is a comedy concept, not a real attractiveness scoring system. The category labels are satirical commentary designed for entertainment.',
  },
  {
    q: 'Why did I get the same result as someone else?',
    a: 'UglyNet™ uses a deterministic visual fingerprint of your photo to seed the satirical label generator — the same photo always produces the same Ugly Report. Overlapping labels across users are an artifact of the intentionally finite satirical label set, not a real signal.',
  },
  {
    q: 'Is amiugly.lol safe for kids or teens?',
    a: 'No. amiugly.lol is intended for users 18 and older. Submission requires you to confirm you are 18+. We will remove any photo believed to depict a minor on receipt.',
  },
  {
    q: 'Why does this site have ads?',
    a: 'amiugly.lol uses Google AdSense to keep the site free and cover hosting and AI compute costs. You can opt out of personalized advertising at Google Ads Settings.',
  },
  {
    q: 'Who built this?',
    a: 'A small independent team that thought the internet needed one more reason to take a selfie. amiugly.lol is a satire and commentary project on AI beauty rating tools. Contact: hello@amiugly.lol.',
  },
]

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqsForSchema.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
        Frequently Asked Questions
      </h1>
      <p className="text-xs mb-10" style={{ color: 'var(--muted)' }}>
        About amiugly.lol, UglyNet™, your photos, and other things people ask before they upload.
      </p>

      <AdUnit slot={AD_SLOTS.DISPLAY} format="auto" className="mb-10" />

      <div className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
        {faqs.map(({ q, a }, i) => (
          <Fragment key={i}>
            <section>
              <h2 className="font-semibold text-base mb-3" style={{ color: 'var(--text)' }}>
                {q}
              </h2>
              <div className="space-y-2" style={{ color: 'var(--muted)' }}>
                {a}
              </div>
            </section>
            {(i === 3 || i === 7) && (
              <AdUnit slot={AD_SLOTS.IN_ARTICLE} format="in-article" className="my-2" />
            )}
          </Fragment>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t text-sm" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
        <p>
          Still have a question?{' '}
          <a href="mailto:hello@amiugly.lol" style={{ color: 'var(--accent)' }} className="underline">
            Email us
          </a>{' '}
          and we&apos;ll add it here.
        </p>
      </div>
    </main>
  )
}
