# Hawazine

The Hawazine website — a Next.js 14 App Router project, deployed to Vercel.
Editorial publication for a Marrakech-medina real estate agency.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Content | Hardcoded in typed TS modules under `lib/content/` |
| Fonts | Fraunces (serif) + IBM Plex Sans (sans) via `next/font/google` |
| Maps | Mapbox GL JS |
| Email | Resend |
| Hosting | Vercel |

There is no CMS and no database in v1. All quarters, properties, journal
entries, and pages live as typed TS data under `lib/content/`. To update
content, edit the source files and redeploy.

## Local development

```bash
cp .env.example .env.local   # then fill in real values
npm install
npm run dev                  # http://localhost:3000
```

## Environment variables

See `.env.example` for the authoritative list with inline comments.
At minimum, for local dev you need:

- `RESEND_API_KEY` — required for the contact form to send mail. The form
  returns a 500 with a clear message until this is set. `CONTACT_EMAIL_TO`
  and `CONTACT_EMAIL_FROM` are optional overrides; sensible defaults
  (morocco@hawazine.com, noreply@hawazine.com) are baked into the route.
- `NEXT_PUBLIC_MAPBOX_TOKEN` — required for `/marrakech/[quarter]` maps.
  Without it, the map component renders a neutral placeholder.
- `NEXT_PUBLIC_SITE_URL` — optional; defaults to `https://hawazine.com`.
  Set to `http://localhost:3000` in dev if you need accurate canonical URLs.
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` — only needed if you wish to reference
  a real Cloudinary account in image URLs. URLs are hardcoded in content
  modules, so the cloud name can also simply be part of those URLs.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` — required
  for the Journal (`/journal`) to fetch entries. Without them, the Journal
  renders its empty state; the rest of the site is unaffected.

Never commit `.env*` files; only `.env.example` ships in git.

## Editing content

| Entity | File |
| --- | --- |
| Quarters (medina neighbourhoods) | `lib/content/quarters.ts` |
| Properties (listings) | `lib/content/properties.ts` |
| Journal entries (editorial) | `lib/content/journal.ts` |
| Glossary terms | `lib/content/glossary.ts` |
| The Oracle (market intelligence) | `lib/content/oracle.ts` |
| Static pages — Marrakech, Buying (= The Index), About, How we work | `lib/content/pages.ts` |
| Site config (nav, email) | `lib/site.ts` |

Each entity has a `published` boolean; set it to `false` to hide without
deleting. Markdown bodies are rendered through `react-markdown` + `remark-gfm`
in the `EssayBody` component.

After editing content, commit and push — Vercel will rebuild automatically.

## Routes

Public routes:

- `/` — home
- `/marrakech`, `/marrakech/[quarter]`
- `/buying`, `/buying/melkia`, `/buying/the-process`, `/buying/costs`, `/buying/what-to-ask` — reference content. Labelled "Buying" in primary nav, "The Index" in secondary nav. Same destination, two doors for two reading intents.
- `/craft` — scaffold
- `/glossary` — single-page glossary with same-page anchors (no per-term URLs; this is a deliberate decision matching the Slow Morocco format)
- `/journal`, `/journal/[slug]` — editorial, demoted to secondary nav
- `/properties`, `/properties/[slug]`
- `/about`, `/how-we-work`, `/contact`

Infrastructure:

- `/sitemap.xml` (generated from content)
- `/robots.txt` (disallows `/api/`)
- `/api/contact` (Resend)

## Deployment

1. Import the repo into Vercel.
2. Add all variables from `.env.example` in the Vercel project settings.
3. Set the production branch. The default build command (`next build`) works.
4. Connect `hawazine.com` in Vercel's Domains UI.

## Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # production server
npm run lint       # next lint
npm run typecheck  # tsc --noEmit
```

## Operational notes

- **Demo Cloudinary URLs** (`res.cloudinary.com/demo/...`) are used throughout
  the content modules so the scaffold renders without setup. Replace with real
  photography before launch.
- The contact form has no database persistence. Every submission is an email
  (TO via Resend) and nothing else.
- **Glossary lives in a flat TypeScript file** at `lib/content/glossary.ts`.
  Not Supabase. Entries change rarely, render statically, deploy on git push;
  the flat-file shape is simpler and faster for iteration than a CMS.
  `app/api/glossary/route.ts` serves the same data as JSON (schema.org
  `DefinedTermSet` by default; `?format=simple`, `?term=<slug>`, and
  `?category=<slug>` variants) with `Cache-Control: public, max-age=3600`
  and `Access-Control-Allow-Origin: *` so AI systems can fetch and cite it.
- **The Index (`/buying`) lives in a flat TypeScript file** at
  `lib/content/the-index.ts`. Same architecture decision as the Glossary —
  flat file, not Supabase, for v1. The landing page at `/buying` lists
  questions by category; individual entries render at `/buying/<slug>` via
  `app/buying/[slug]/page.tsx`. Entry pages emit FAQPage schema under
  1,500 chars and Article schema above. The older static sub-pages at
  `/buying/melkia`, `/buying/the-process`, `/buying/costs`, and
  `/buying/what-to-ask` continue to resolve (Next.js prefers specific
  segments over `[slug]`) pending a later content migration.
- **The Journal (`/journal`) is the one piece of site content in Supabase.**
  Schema lives at `supabase/schema.sql` — run it once in the Supabase SQL
  Editor to create the `journal_entries` table, the `updated_at` trigger,
  and the anon-reads-published-only RLS policy. Entries are edited via
  Supabase Studio (Table Editor); no custom admin UI in Hawazine. Pages
  use ISR with a 1-hour revalidate window, so edits surface within an
  hour without a redeploy. If the Supabase env vars are unset, the
  Journal renders its empty state — the site degrades rather than
  crashing.

## Layout pass — April 2026

This iteration restructured identity and layout without touching infrastructure:

- Typography: Fraunces + IBM Plex Sans; new display/section/subtitle/body/meta
  scale in `tailwind.config.ts`.
- Palette: pure white paper `#FFFFFF`, paper-deep `#F5F5F4` (small inline
  panels only, never full-width section bands), warm ink `#1A1714`,
  ink-soft `#3D342E` for body prose, quiet `#7A6E63`, accent terracotta
  `#8B3A2F` (under evaluation against the white background), rule `#E5E5E5`
  for cool hairlines. A warm-paper variant was tried and reverted.
  Sections separate through whitespace and typography, not background
  fills — reference: The Modern House.
- Wordmark: 1.75rem serif with a small all-caps tagline on desktop.
- Nav: primary `Marrakech · Buying · Craft · Properties · Contact`; a smaller
  secondary `The Index · Glossary · Journal` sits below it.
- Reading column narrows to 640px.
- New route scaffolds: `/craft`, `/glossary`.
- **Glossary URL structure — resolved**: single page, same-page anchors
  (`/glossary#melkia`), no per-term routes. Matches the Slow Morocco format.
  Decision documented here rather than left flagged.
- **Buying / The Index overlap — resolved**: one destination, two doors.
  Primary nav "Buying" and secondary nav "The Index" both link to `/buying`;
  individual reference entries live at `/buying/<slug>`. The short-lived
  `/the-index` and `/the-index/[slug]` routes created earlier in this pass
  have been removed.
