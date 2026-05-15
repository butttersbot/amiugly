# BOSS_TODO.md — amiugly.lol launch prep

> Tracking what's blocking the social-push greenlight. Friend with 8M followers is on standby — we light the launch once everything below is checked.

## 🔴 BLOCKED by AdSense approval

> Current AdSense status: **"Getting ready"** (as of 2026-05-14 11:30 PDT). This is the post-policy-review, pre-serving state. Typically flips to **"Ready"** within 24-72 hours. Once it flips, the items below unblock in order.

- [ ] P0 — Create 4 ad units in [AdSense dashboard](https://www.google.com/adsense/new/u/0/pub-5249658333733157/myads/units):
  - In-article (rectangle, for mid-content placement on blog posts)
  - Display (responsive, for top of editorial pages)
  - In-feed (for between blog index cards)
  - Multiplex (end-of-article related)
- [ ] P0 — Add the 4 slot IDs to Vercel project env vars (Production scope):
  - `NEXT_PUBLIC_AD_SLOT_IN_ARTICLE`
  - `NEXT_PUBLIC_AD_SLOT_DISPLAY`
  - `NEXT_PUBLIC_AD_SLOT_IN_FEED`
  - `NEXT_PUBLIC_AD_SLOT_MULTIPLEX`
  - **Order matters:** set env vars BEFORE merging PR #2 — Next.js inlines `NEXT_PUBLIC_*` at build time, not runtime. If merged first, need to trigger a fresh build (not a cached redeploy) for ads to serve.
- [ ] P0 — Merge [PR #2 — Launch prep: AdSense placements + homepage schema](https://github.com/butttersbot/amiugly/pull/2). Reviewed, GO for merge, blocked only on env vars first.
- [ ] P0 — After deploy: hit `/about`, `/faq`, `/blog`, and one blog post — confirm AdSense `<ins>` blocks render with the populated slot IDs.
- [ ] P1 — 24h after first live page view: confirm "Ads showing on your site" is green in the AdSense dashboard.

## 🟡 NOT blocked — can knock out now in parallel

- [ ] P0 — **Apply admin toolkit migration.** Paste `migrations/0001_admin_toolkit.sql` into the [Supabase SQL editor](https://supabase.com/dashboard/project/peroeylequnartycqiri/sql/new). Unlocks IP capture per upload, moderation event logging, and the IP block list. Site works fine without it (defensive code) but `top-offenders` and IP visibility stay dark until applied.
- [ ] P1 — **Restore browser MCP** (`@playwright/mcp` or peekaboo) in `~/.openclaw/tmp/openclaw-cli-mcp-*/mcp.json`. Was wired months ago, fell off in a config rotation. Cost is small (~10 min) but unlocks remote SQL pastes, GitHub button clicks, Vercel env-var edits, etc. without Boss at a desk.
- [ ] P0 — **Vercel tier check.** Confirm Pro tier ($20/mo) before viral spike. Hobby (free) caps at 100GB bandwidth/month — 8M-follower push will burn that in hours.
- [ ] P0 — **Supabase tier check.** Free tier caps at 500MB DB + 1GB egress/mo. Verify capacity for image upload load.
- [ ] P0 — **Google Search Console** — submit sitemap (`https://amiugly.lol/sitemap.xml`) + request indexing for `/`, `/blog`, `/faq`, `/about`. Social-push backlinks compound massively if Google has the site indexed when traffic hits.
- [ ] P1 — **Email capture install.** Highest-leverage retention move. Modal or footer signup on results page → captures viral spike for re-engagement forever. Suggested: ConvertKit or Mailchimp free tier (handles 1K-2K subs).
- [ ] P1 — **Conversion funnel walkthrough on phone.** Time the home → upload → score → share flow. Fix any friction >2 seconds.
- [ ] P2 — **Schema validation.** Run homepage + /faq through [Google's Rich Results Test](https://search.google.com/test/rich-results) — confirm WebApplication + FAQPage schemas parse.

## 🟢 DONE

- [x] AdSense compliance pass (6+ resubmission cycle, 2026-04 → 2026-05). Approved 2026-05-14. **Playbook saved to `~/.openclaw/workspace/reference/adsense-approval-playbook.md`** so future sites don't re-discover the same blockers.
- [x] PR #2 — wired AdSense placements across all editorial surfaces (about, faq, blog index, 12 blog posts), added WebApplication JSON-LD to homepage. Code-reviewed independently. TypeScript clean, build clean, AdSense policy check passes. Awaiting env vars + merge.

## 🎯 Greenlight criteria for friend's social post

All P0 above must be ✅ before greenlight. Then it's go.
