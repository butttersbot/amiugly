import type { Metadata } from 'next'
import AdUnit from '@/app/components/AdUnit'
import { AD_SLOTS } from '@/app/components/ad-slots'

export const metadata: Metadata = {
  title: 'The Psychology of First Impressions — amiugly.lol',
  description: 'Research on how quickly humans form impressions, how accurate they are, and what factors actually drive snap judgments about faces.',
}

export default function Article() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>The Psychology of First Impressions</h1>
      <p className="text-xs mb-8" style={{ color: 'var(--muted)' }}>By the UglyNet™ Research Division</p>
      <AdUnit slot={AD_SLOTS.DISPLAY} format="auto" className="mb-8" />

      <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
        <p>You have somewhere between 100 milliseconds and seven seconds to make a first impression, depending on whose research you cite. The exact number varies by study and context, but the core finding is consistent: humans form rapid, automatic judgments about other people&apos;s faces, and these judgments are surprisingly sticky.</p>

        <p>Here is what the research actually says about what&apos;s happening in those fractions of a second.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Two-Dimension Model</h2>
        <p>Research by Todorov and colleagues found that first impressions of faces tend to cluster around two primary dimensions: trustworthiness and dominance. When people look at an unfamiliar face for as little as 100ms, they form judgments on these axes almost immediately. These judgments influence how they interact with the person even when they&apos;re told to ignore them.</p>

        <p>The trustworthy/dominant framework maps roughly onto different evolutionary concerns: "is this person a threat?" (dominance dimension) and "will this person cooperate?" (trustworthiness dimension). Your face&apos;s position on these axes is largely determined by the resemblance of your resting expression to emotional expressions — faces that look slightly happy at rest are rated as more trustworthy; faces that look slightly angry at rest are rated as dominant and less trustworthy.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>How Accurate Are These Judgments?</h2>
        <p>Not very, when tested rigorously. People feel confident in their rapid face judgments but these impressions show limited correlation with actual personality traits or behavior. You cannot reliably determine whether someone is trustworthy, competent, or dangerous from their face. The brain is doing something, but it is not reliably accurate.</p>

        <p>There are some modest correlations — certain facial features do predict certain real-world outcomes — but these are weak effects and are heavily confounded by actual behavior, context, and what people are told about each other. The face is a noisy signal at best.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Halo Effect</h2>
        <p>One of the most robust findings in social psychology is the halo effect: attractive people are perceived as more intelligent, more competent, more moral, and generally more positive across a range of dimensions. This has real-world consequences — research has documented correlations between physical attractiveness and career outcomes, sentencing decisions, and social mobility.</p>

        <p>The halo effect is real, consequential, and not particularly fair. It is a cognitive bias. Being aware of it is useful both for understanding how others see you and for examining how you see others.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>What First Impressions Are Actually Based On</h2>
        <p>Beyond face structure, first impressions are also heavily influenced by expressions, grooming, clothing, posture, and movement. A warm smile rewires a first impression faster than most facial structure changes. Confident posture affects perceived status and competence. Clean, intentional presentation signals self-awareness and social intelligence.</p>

        <p>This is good news. The behavioral and presentational components of first impressions are significantly more malleable than bone structure.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>Can First Impressions Be Overridden?</h2>
        <p>Yes, substantially. Research shows that additional information, actual interaction, and time consistently override initial face-based impressions. The first impression is the starting point, not the conclusion. This is why showing up, being competent, being warm, and treating people well matters more than any particular facial feature in most contexts where those things are relevant.</p>

        <p>UglyNet™ forms its impression of your face in approximately 0 milliseconds (we precomputed the weights). Our impression is fixed. The impressions of actual humans you meet are not. Worth keeping in mind.</p>
      <AdUnit slot={AD_SLOTS.IN_ARTICLE} format="in-article" className="mt-10" />
      </div>
    </main>
  )
}
