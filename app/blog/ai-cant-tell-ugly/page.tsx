import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why AI Can\'t Actually Tell If You\'re Ugly — amiugly.lol',
  description: 'An honest look at what AI vision models can and cannot determine about facial attractiveness — including UglyNet™\'s own limitations.',
}

export default function Article() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>Why AI Can&apos;t Actually Tell If You&apos;re Ugly</h1>
      <p className="text-xs mb-8" style={{ color: 'var(--muted)' }}>By the UglyNet™ Research Division</p>

      <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
        <p>We are going to level with you. UglyNet™ is a satirical entertainment tool. The score it gives you is not a real measurement of your attractiveness. The AI behind it cannot actually tell if you are ugly. No AI can, in any meaningful sense of the word. Here is why, explained with the depth the topic deserves.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>What AI Vision Models Actually Do</h2>
        <p>Modern AI vision models are trained to recognize patterns in images. A good model can identify faces, detect emotions in expressions, estimate age, classify features, and compare faces to others. These are real, useful capabilities. But they are fundamentally different from evaluating attractiveness.</p>

        <p>Attractiveness is not a pattern in pixel data. It is a judgment made by a human being, shaped by their cultural background, personal history, emotional state, context, and a thousand other factors. A model trained to predict "attractiveness ratings" is really trained to predict <em>average human ratings from a particular dataset</em> — which is a different and much more limited thing.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Training Data Problem</h2>
        <p>AI models learn from data. If you train a model to predict attractiveness scores, you train it on a dataset of human-rated faces. That dataset reflects the biases, cultural backgrounds, and demographic makeup of the raters. Models trained primarily on Western data will perform differently on faces from other cultural backgrounds. Models trained by young raters will encode those preferences. There is no neutral, universal attractiveness dataset.</p>

        <p>This means any "AI attractiveness score" is actually "how close your face is to the patterns that raters in this particular dataset, at this particular time, rated highly." That&apos;s a much less impressive-sounding sentence, which is why nobody puts it on their app homepage.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Context Problem</h2>
        <p>Human attractiveness perception is wildly context-dependent. The same face looks different in different lighting, at different angles, with different expressions, in different social settings. People rate faces differently depending on what faces they&apos;ve seen recently (the contrast effect), whether they&apos;re in a good mood, what features they personally find appealing, and whether they have any relationship or familiarity with the person.</p>

        <p>An AI looking at a single photo has none of this context. It is making a judgment from a two-dimensional snapshot with all the limitations that implies.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Ethical Dimension</h2>
        <p>There are legitimate concerns about AI systems that rate faces. They can encode and amplify biases. They can be used harmfully — to bully people, to discriminate in hiring or dating apps, to create anxiety about appearance. The technology is real; the responsible use of it is an ongoing challenge.</p>

        <p>amiugly.lol is specifically framed as satire because we think the right context for this kind of tool is one where you don&apos;t take the score seriously. The roast is funny. The number is made up. This is the appropriate relationship to have with AI facial analysis tools.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>What UglyNet™ Is Actually Doing</h2>
        <p>UglyNet™ analyzes your photo and generates a satirical score and commentary. It is designed to make you laugh, not to make you feel bad about your face. If the score is high, we made it high because the bit required it. If it&apos;s low, same reason. It is entertainment.</p>

        <p>The real measure of whether you&apos;re attractive is whether the people whose opinions matter to you find you appealing. That involves your personality, your presence, how you treat people, your sense of humor, your energy, your values. An AI looking at a JPEG has no opinion on any of that.</p>

        <p>You look fine. Go outside.</p>
      </div>
    </main>
  )
}
