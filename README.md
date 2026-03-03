# uglypeople.com

> Science doesn't lie. Unfortunately.

A viral entertainment app where users upload a selfie and UglyNet™ classifies them on a spectrum from *Visually Challenging* to *A Medical Curiosity*. Shareable results card drives social virality. Ad-monetized.

## V1 Features
- **Upload flow** — selfie or camera roll, consent checkbox
- **UglyNet™ scoring** — pseudorandom engine seeded by image hash (same photo = same score always). Always classifies into the ugly range.
- **Adjective labels** — users see a label, never a number
- **Share card** — PNG generated server-side via Satori, watermarked with uglypeople.com
- **Gallery** — endless scroll of submitted faces with their labels (opt-out available)
- **Face detection** — AWS Rekognition confirms it's actually a face before scoring

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables
```bash
cp .env.local.example .env.local
# Fill in your Supabase and AWS credentials
```

### 3. Supabase setup
- Create a Supabase project at supabase.com
- Create a **public** storage bucket named `faces`
- Run `supabase/schema.sql` in the SQL editor

### 4. AWS Rekognition
- Create an IAM user with `rekognition:DetectFaces` permission
- Add the credentials to `.env.local`

### 5. Run
```bash
npm run dev
```

### 6. Deploy
Push to GitHub and deploy on Vercel. Add env vars in Vercel dashboard.

## Score Spectrum
| Label | Internal Score |
|---|---|
| A Medical Curiosity | 91–100 |
| Clinically Unfortunate | 81–90 |
| Visually Challenging | 71–80 |
| Unremarkable | 61–70 |
| Passable | 51–60 |
| Easy on the Eyes | 21–50 |
| Suspiciously Gorgeous | 1–20 |

UglyNet™ seeds everyone at 70–96 in V1, so all users land in the top 3 ugly tiers.

## V2 Roadmap
- **Swipe deck** — rate other submitted photos (left = ugly, right = would)
- **Community voting** — dynamic scores that update as votes come in
- **Leaderboards** — Ugliest / Most Controversial / Rising / Hall of Fame
- **Score update notifications** — "847 new votes came in. Your classification changed."
- **Second share moment** — community-voted score card

## Monetization
- Google AdSense on loading screen (captive), results page, and gallery
- Affiliate links below results ("UglyNet™ recommends these products. Results not guaranteed.")
- Upgrade to Ezoic (10k sessions) → Mediavine/Raptive (50k sessions)

---

*UglyNet™ is a satirical AI for entertainment purposes only. We think you're beautiful.*
