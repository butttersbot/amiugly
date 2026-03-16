import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'amiugly.lol — Science doesn\'t lie. Unfortunately.',
  description: 'Find out how ugly you really are. UglyNet™ analyzes 47 facial dimensions across 6 ugliness vectors.',
  openGraph: {
    title: 'amiugly.lol',
    description: 'Find out how ugly you really are. Science doesn\'t lie.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <nav className="border-b px-6 py-4" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 font-bold tracking-wide text-sm" style={{ color: 'var(--accent)' }}>
              <span className="text-lg">💅</span>
              <span className="serif text-base">amiugly.lol</span>
            </a>
            <a href="/gallery" className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>
              Gallery →
            </a>
          </div>
        </nav>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5249658333733157"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
        <footer className="border-t px-6 py-8 mt-20" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-5xl mx-auto text-center text-xs mono space-y-2" style={{ color: 'var(--very-muted)' }}>
            <p>amiugly.lol · UglyNet™ v4.2.1</p>
            <p>UglyNet™ is a satirical AI for entertainment purposes only. We think you&apos;re gorgeous. 💅</p>
            <div className="flex items-center justify-center gap-4 pt-1">
              <a href="/about" className="hover:opacity-80 transition-opacity">About</a>
              <span>·</span>
              <a href="/privacy" className="hover:opacity-80 transition-opacity">Privacy Policy</a>
              <span>·</span>
              <a href="mailto:hello@amiugly.lol" className="hover:opacity-80 transition-opacity">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
