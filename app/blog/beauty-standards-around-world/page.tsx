import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Beauty Standards Around the World — amiugly.lol',
  description: 'How definitions of beauty vary across cultures, regions, and time periods — and what this tells us about the nature of attractiveness.',
}

export default function Article() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>Beauty Standards Around the World</h1>
      <p className="text-xs mb-8" style={{ color: 'var(--muted)' }}>By the UglyNet™ Research Division</p>

      <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
        <p>If there is one thing that should dismantle the idea of a single objective standard of beauty, it is a global tour of what different cultures have considered attractive throughout history. The variation is significant, the contradictions are real, and the takeaway is that whoever told you there&apos;s a universal gold standard is working with a very small sample size.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>East Asia: The Evolution of Ideals</h2>
        <p>Contemporary East Asian beauty standards, particularly those amplified through Korean pop culture and media, emphasize fair skin, double eyelids, a small face, a v-shaped jawline, and a certain delicacy of features. The global reach of K-pop and K-drama has spread these preferences widely. However, traditional Chinese beauty ideals from different periods emphasized different features — sometimes a rounder face, sometimes specific proportions that differ from contemporary standards. The "ideal" has evolved significantly even within one cultural sphere.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>South Asia: Complexity and Contrast</h2>
        <p>South Asian beauty standards are highly varied across the subcontinent&apos;s enormous geographic and cultural diversity. Fair skin has historically been privileged in many contexts — a preference with complex roots in caste, colonialism, and economics. Yet traditional aesthetics also celebrated features that differ substantially from European or East Asian standards. Bollywood has both reflected and shaped contemporary preferences while slowly diversifying the range of faces considered beautiful.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>West Africa and the Diaspora</h2>
        <p>West African and African diaspora beauty traditions have historically celebrated features that Western commercial beauty culture ignored or marginalized for much of the 20th century: full lips, wider noses, kinky and coily hair textures, and fuller figures in many contexts. The natural hair movement and the growing global influence of Black beauty culture represents in part a reclamation of standards that were systematically devalued. This is a beauty culture story that is also a story about power.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Middle East</h2>
        <p>Middle Eastern beauty standards have historically prized dramatic features — dark eyes, defined brows, full lips, and olive to darker skin tones. Contemporary standards, particularly in Gulf states, reflect a mix of traditional preferences and global influences, with a significant cosmetics and beauty industry. The relationship between modest dress codes and beauty culture is complex and varies enormously across the region.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>The Western Ideal: More Variable Than It Seems</h2>
        <p>Even within "Western" beauty standards, the variation over time is enormous. The full-figured ideal of the Renaissance, the angular androgyny of the 1920s, the bombshell curves of the 1950s, the waif aesthetic of the 1990s, the athletic look of the 2010s — these are all from the same cultural lineage and they disagree substantially. The "current" standard in any era feels universal only because you&apos;re living in it.</p>

        <h2 className="font-semibold text-base mt-6 mb-2" style={{ color: 'var(--text)' }}>What&apos;s Actually Universal</h2>
        <p>Cross-cultural research does find some consistencies: health signals (clear skin, symmetry, certain markers of physical vitality) are broadly appealing. Extreme deformity or signs of disease are broadly unappealing. Certain very general proportional patterns appear across many cultures. But the specific features that get coded as beautiful — skin color, body type, facial features, hair — vary enormously.</p>

        <p>The honest conclusion is that there are some weak universals in attractiveness and enormous cultural variation layered on top. Your features are beautiful somewhere. They may or may not match the standard of wherever you happen to be. That&apos;s a fact about geography, not about you.</p>
      </div>
    </main>
  )
}
