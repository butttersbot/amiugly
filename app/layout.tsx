import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://amiugly.lol'),
  title: 'amiugly.lol — Science doesn\'t lie. Unfortunately.',
  description: 'Find out how ugly you really are. UglyNet™ analyzes 47 facial dimensions across 6 ugliness vectors.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'amiugly.lol',
    description: 'Find out how ugly you really are. Science doesn\'t lie.',
    type: 'website',
    url: 'https://amiugly.lol',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <nav className="border-b px-6 py-4" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold tracking-wide text-sm" style={{ color: 'var(--accent)' }}>
              <span className="text-lg">💅</span>
              <span className="serif text-base">amiugly.lol</span>
            </Link>
            <div className="flex items-center gap-5 text-sm" style={{ color: 'var(--muted)' }}>
              <Link href="/about" className="transition-colors hover:opacity-80">About</Link>
              <Link href="/blog" className="transition-colors hover:opacity-80">Blog</Link>
              <Link href="/faq" className="transition-colors hover:opacity-80 hidden sm:inline">FAQ</Link>
              <Link href="/gallery" className="transition-colors hover:opacity-80" style={{ color: 'var(--accent)' }}>Gallery →</Link>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t px-6 py-8 mt-20" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-5xl mx-auto text-center text-xs mono space-y-2" style={{ color: 'var(--very-muted)' }}>
            <p>amiugly.lol · UglyNet™ v4.2.1</p>
            <p>UglyNet™ is a satirical AI for entertainment purposes only. We think you&apos;re gorgeous. 💅</p>
            <div className="flex items-center justify-center gap-4 pt-1 flex-wrap">
              <Link href="/about" className="hover:opacity-80 transition-opacity">About</Link>
              <span>·</span>
              <Link href="/blog" className="hover:opacity-80 transition-opacity">Blog</Link>
              <span>·</span>
              <Link href="/faq" className="hover:opacity-80 transition-opacity">FAQ</Link>
              <span>·</span>
              <Link href="/privacy" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
              <span>·</span>
              <Link href="/terms" className="hover:opacity-80 transition-opacity">Terms</Link>
              <span>·</span>
              <Link href="/content-policy" className="hover:opacity-80 transition-opacity">Content Policy</Link>
              <span>·</span>
              <a href="mailto:hello@amiugly.lol" className="hover:opacity-80 transition-opacity">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
