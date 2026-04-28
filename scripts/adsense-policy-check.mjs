import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'

const blockedAdSurfaces = [
  'app/page.tsx',
  'app/gallery/page.tsx',
  'app/results/[id]/page.tsx',
]

const supabaseBackedPages = [
  'app/gallery/page.tsx',
  'app/results/[id]/page.tsx',
]

const failures = []

const rootLayout = readFileSync('app/layout.tsx', 'utf8')
if (rootLayout.includes('googlesyndication.com/pagead/js/adsbygoogle.js')) {
  failures.push('app/layout.tsx loads the AdSense script globally; Auto Ads could still serve on low-value/tool surfaces.')
}

const blogLayout = 'app/blog/layout.tsx'
try {
  const source = readFileSync(blogLayout, 'utf8')
  if (!source.includes('googlesyndication.com/pagead/js/adsbygoogle.js')) {
    failures.push(`${blogLayout} should load the AdSense script for publisher-authored editorial pages.`)
  }
} catch {
  failures.push(`${blogLayout} is missing; AdSense script should be scoped to editorial pages only.`)
}

for (const file of blockedAdSurfaces) {
  const source = readFileSync(file, 'utf8')
  if (source.includes('<AdUnit') || source.includes("from '@/app/components/AdUnit'")) {
    failures.push(`${file} still renders AdSense units on a tool, gallery, or result surface.`)
  }
}

for (const file of globSync('app/**/page.tsx')) {
  const source = readFileSync(file, 'utf8')
  if (source.includes('Advertisement') && !source.includes('<AdUnit')) {
    failures.push(`${file} has an advertisement label without an ad unit.`)
  }
}

for (const file of supabaseBackedPages) {
  const source = readFileSync(file, 'utf8')
  if (!source.includes("export const dynamic = 'force-dynamic'")) {
    failures.push(`${file} reads live Supabase data but is not marked force-dynamic.`)
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log('AdSense policy check passed.')
