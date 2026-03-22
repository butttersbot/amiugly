import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — amiugly.lol',
  description: 'Deeply scientific articles about beauty, faces, and why none of it matters.',
}

const articles = [
  { slug: 'facial-symmetry', title: 'What Is Facial Symmetry and Does It Actually Matter?', desc: 'Science has opinions. Most of them are complicated and slightly depressing.' },
  { slug: 'history-of-beauty-standards', title: 'The History of Beauty Standards (A Completely Unbiased Report)', desc: 'Spoiler: they keep changing, which is suspicious.' },
  { slug: 'selfie-angle-lie', title: 'Why Your Selfie Angle Is a Lie', desc: 'Your face is not what you think it is. Sorry.' },
  { slug: 'golden-ratio', title: 'The Science of the Golden Ratio (And Why It\'s Mostly Made Up)', desc: 'Phi = 1.618. The math is real. The conclusions, less so.' },
  { slug: '10-things-attractive', title: '10 Things That Actually Make You More Attractive (According to Science)', desc: 'Some of these will surprise you. Others will not.' },
  { slug: 'ai-cant-tell-ugly', title: 'Why AI Can\'t Actually Tell If You\'re Ugly', desc: 'Including, frankly, UglyNet™. We said it.' },
  { slug: 'jawline-industrial-complex', title: 'The Jawline Industrial Complex: A Deep Dive', desc: 'How a bone structure became a personality trait.' },
  { slug: 'beauty-standards-around-world', title: 'Beauty Standards Around the World', desc: 'What\'s considered attractive varies wildly. The universe is chaotic.' },
  { slug: 'eye-shape-meaning', title: 'What Your Eye Shape Says About You (Nothing, Scientifically)', desc: 'We looked into it. Extensively. It says nothing.' },
  { slug: 'psychology-first-impressions', title: 'The Psychology of First Impressions', desc: 'You have 100ms. Good luck.' },
  { slug: 'cheekbones', title: 'Cheekbones: Overrated or Actually Important?', desc: 'A rigorous investigation into a bone that shouldn\'t be this famous.' },
  { slug: 'social-media-beauty', title: 'How Social Media Distorted Our Perception of Beauty', desc: 'Filters, FaceTune, and the slow erosion of normal-looking faces.' },
]

export default function BlogIndex() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>The UglyNet™ Journal</h1>
      <p className="text-xs mb-10" style={{ color: 'var(--muted)' }}>Deeply scientific articles about faces, beauty, and why it's all extremely complicated.</p>

      <div className="space-y-6">
        {articles.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="block group">
            <div className="p-5 rounded-lg border transition-colors" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
              <h2 className="font-semibold text-sm mb-1 group-hover:opacity-80 transition-opacity" style={{ color: 'var(--accent)' }}>{article.title}</h2>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{article.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
