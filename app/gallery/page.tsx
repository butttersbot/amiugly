import Image from "next/image"
import Link from "next/link"
import { getSupabaseAdmin } from "@/lib/supabase"
import GalleryLoadMore from "./GalleryLoadMore"

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const { data: initial } = await getSupabaseAdmin()
    .from("submissions")
    .select("id, image_url, label, created_at")
    .eq("in_gallery", true)
    .order("created_at", { ascending: false })
    .limit(24)

  const submissions = initial || []

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="mono text-xs tracking-[4px] uppercase mb-2" style={{ color: "var(--accent)" }}>
            ✨ Subject Registry
          </div>
          <h1 className="serif text-3xl" style={{ color: "var(--text)" }}>The Gallery</h1>
        </div>
        <Link
          href="/"
          className="text-white font-bold py-2 px-5 rounded-2xl transition-colors text-sm"
          style={{ background: "var(--accent)" }}
        >
          Rate Me ✨
        </Link>
      </div>

      {/* Editorial content — required for AdSense */}
      <section className="mb-10 space-y-4 text-sm leading-relaxed rounded-3xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)" }}>
        <p>
          Welcome to the UglyNet™ Subject Registry — a collection of brave souls who submitted
          their faces to the world&apos;s least merciful AI beauty analysis system. Every person
          in this gallery consented to public display and received a fully official UglyNet™
          Ugly Report™ in exchange.
        </p>
        <p>
          The labels are satirical. UglyNet™ assigns absurdist category names — Jawline Aura,
          Cheekbone Energy, Eye Socket Drama — that are designed to be funny, not accurate.
          Beauty is subjective, cultural, and entirely dependent on who&apos;s looking. Real AI
          beauty scoring systems carry serious biases around race, lighting, and cultural standards.
          By making those biases explicit and absurd, amiugly.lol is commenting on them.
        </p>
        <p>
          Curious about what science actually says about facial attractiveness? Read our{" "}
          <Link href="/blog" style={{ color: "var(--accent)" }} className="underline">UglyNet™ Journal</Link>{" "}
          — featuring explainers on{" "}
          <Link href="/blog/facial-symmetry" style={{ color: "var(--accent)" }} className="underline">facial symmetry</Link>,{" "}
          <Link href="/blog/golden-ratio" style={{ color: "var(--accent)" }} className="underline">the golden ratio</Link>,
          and{" "}
          <Link href="/blog/ai-cant-tell-ugly" style={{ color: "var(--accent)" }} className="underline">why AI can&apos;t actually tell if you&apos;re ugly</Link>.
        </p>
        <p>
          Want your photo removed? Contact us at{" "}
          <a href="mailto:hello@amiugly.lol" style={{ color: "var(--accent)" }} className="underline">hello@amiugly.lol</a>{" "}
          and we&apos;ll handle it within 48 hours.
        </p>
      </section>

      {submissions.length === 0 ? (
        <div className="text-center py-24 mono text-sm" style={{ color: "var(--very-muted)" }}>
          No subjects yet. Be the first to submit.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {submissions.map((s) => (
              <a key={s.id} href={`/results/${s.id}`} className="group block">
                <div
                  className="aspect-square relative overflow-hidden rounded-2xl"
                  style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
                >
                  <Image
                    src={s.image_url}
                    alt={s.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                </div>
                <p className="mt-1.5 text-xs mono leading-tight truncate" style={{ color: "var(--muted)" }}>
                  {s.label}
                </p>
              </a>
            ))}
          </div>
          <GalleryLoadMore initialCursor={submissions[submissions.length - 1]?.created_at} initialCount={submissions.length} />
        </>
      )}

    </main>
  )
}
