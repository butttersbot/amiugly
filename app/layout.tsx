import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'uglypeople.com — Science doesn\'t lie. Unfortunately.',
  description: 'Find out how ugly you really are. UglyNet™ analyzes 47 facial dimensions across 6 ugliness vectors.',
  openGraph: {
    title: 'uglypeople.com',
    description: 'Find out how ugly you really are. Science doesn\'t lie.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] antialiased">
        <nav className="border-b border-[#262626] px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <a href="/" className="mono text-[#dc2626] font-bold tracking-widest text-sm">
              🔬 UGLYPEOPLE.COM
            </a>
            <a href="/gallery" className="text-[#a3a3a3] text-sm hover:text-[#f5f5f5] transition-colors">
              Gallery →
            </a>
          </div>
        </nav>
        {children}
        <footer className="border-t border-[#262626] px-6 py-8 mt-20">
          <div className="max-w-5xl mx-auto text-center text-[#525252] text-xs mono space-y-1">
            <p>uglypeople.com · UglyNet™ v4.2.1</p>
            <p>UglyNet™ is a satirical AI for entertainment purposes only. We think you&apos;re beautiful.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
