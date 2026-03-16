import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — amiugly.lol',
  description: 'Privacy policy for amiugly.lol',
}

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 prose prose-sm">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>Privacy Policy</h1>
      <p className="text-xs mb-8" style={{ color: 'var(--muted)' }}>Last updated: March 15, 2026</p>

      <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>

        <section>
          <h2 className="font-semibold text-base mb-2">1. Overview</h2>
          <p>amiugly.lol (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a satirical entertainment website. This Privacy Policy explains how we collect, use, and handle your information when you use our service. By using amiugly.lol, you agree to the terms of this policy.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">2. Information We Collect</h2>
          <p><strong>Photos you submit:</strong> When you upload a photo, it is processed by our AI system to generate a satirical &quot;ugliness score.&quot; If you consent to gallery inclusion, your photo and results are stored and displayed publicly. If you do not consent, your photo is processed and immediately discarded — we do not retain it.</p>
          <p className="mt-2"><strong>Usage data:</strong> We may collect standard web analytics data (page views, browser type, referring URLs) through third-party analytics services. This data is aggregated and not linked to individuals.</p>
          <p className="mt-2"><strong>Cookies:</strong> We use cookies for site functionality and advertising. See Section 5 for details on advertising.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">3. How We Use Your Information</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>To generate your satirical AI analysis result</li>
            <li>To display your photo in the public gallery (only if you consented)</li>
            <li>To improve our service and detect abuse</li>
            <li>To serve relevant advertising</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">4. Photo Removal & Opt-Out</h2>
          <p>If your photo appears in the gallery and you wish to have it removed, you can opt out directly from your results page using the opt-out link. You may also contact us at the email below and we will remove it within 48 hours.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">5. Advertising</h2>
          <p>We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">6. Data Sharing</h2>
          <p>We do not sell your personal data. We do not share your photos with third parties except as required to operate the service (e.g., cloud storage providers). Gallery photos are publicly visible by design when consent is given.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">7. Children&apos;s Privacy</h2>
          <p>amiugly.lol is not directed at children under 13. We do not knowingly collect information from children. If you believe a child has submitted a photo, please contact us immediately and we will remove it.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">8. Changes to This Policy</h2>
          <p>We may update this policy from time to time. We will post the updated date at the top of this page. Continued use of the site constitutes acceptance of the updated policy.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">9. Contact</h2>
          <p>Questions about this policy? Email us at <a href="mailto:privacy@amiugly.lol" className="underline">privacy@amiugly.lol</a></p>
        </section>

      </div>
    </main>
  )
}
