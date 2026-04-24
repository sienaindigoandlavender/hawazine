# Claude working notes — Hawazine

This file captures conventions for future Claude Code sessions on the
hawazine repo so you do not have to re-derive them from the original brief.

## Project shape

- Next.js 14, App Router, TypeScript, Tailwind.
- **No database, no CMS.** Content is hardcoded in typed TS modules under
  `lib/content/`. This is a deliberate v1 choice and should not be reversed
  without explicit approval — the original brief specified Supabase, but
  Jacqueline overrode that.
- **No admin routes.** The `/admin` routes from the brief do not exist in v1.
  Editing content = editing files under `lib/content/` + a redeploy. If a
  future session reintroduces Supabase, the admin routes can be added then.
- **No `/api/revalidate`.** Static generation only, via `generateStaticParams`
  on dynamic routes.

## Content model

All content lives under `lib/content/`:

- `quarters.ts` — medina neighbourhoods (Laksour, Mouassine, etc.)
- `properties.ts` — listings (riad/dar/land/other)
- `journal.ts` — editorial pieces
- `pages.ts` — long-form static pages (Marrakech landing, Buying and its
  sub-pages, About, How we work). Slugs match the route path.

Types are in `lib/types.ts`. Every list has a `published` flag; filter with
the `getPublished…` helpers, never use the raw arrays in page code.

Markdown bodies render through `react-markdown` + `remark-gfm` via the
`EssayBody` component. Do not reach for MDX unless the brief requests it.

## Design tokens

- Colours live in `tailwind.config.ts` (April 2026 restructure):
  `paper #F8F4EC` (warm off-white, site background), `paper-deep #F1EBDE`
  (section bands), `ink #1A1714` (warm near-black), `ink-soft #3D342E`
  (default body prose — the site `body` declaration binds to this),
  `quiet #7A6E63`, `accent #8B3A2F` (deep terracotta — hover / occasional
  highlight only, not for large fills), `rule #D9CFBE` (hairlines). Footer
  keeps its dark inline gradient `#1f1f1f → #161616 → #0e0e0e`.
- Fonts: `Fraunces` (serif, display + body) and `IBM_Plex_Sans` (sans, nav,
  metadata, UI). Exposed as CSS variables `--font-serif` and `--font-sans`.
  Tailwind: `font-serif` and `font-sans`. The earlier `.font-ui` CSS class
  has been retired in new components; prefer `font-sans`.
- Backgrounds: warm paper `#F8F4EC` everywhere. Do not reintroduce pure
  white or cream.
- Body prose: `ink-soft` default. Editorial prose inside `.prose-hawazine`
  reads `ink` (slightly heavier). Use `quiet` for metadata/captions only.

## Route map (April 2026 restructure)

Primary nav: `Marrakech · Buying · Craft · Properties · Contact`.
Secondary nav (smaller, quieter, reference-only): `The Index · Glossary · Journal`.

- `/marrakech` — the medina overview + quarter cards + interactive map
- `/marrakech/[quarter]` — per-quarter page; map highlights that quarter
- `/buying`, `/buying/*` — existing procedural content (melkia, the-process,
  costs, what-to-ask)
- `/craft` — architecture / restoration / trades (scaffold, content TK)
- `/properties`, `/properties/[slug]` — listings (may be empty; current
  inventory is flagged on the homepage as "represented via Mubawab")
- `/contact` — contact form
- `/the-index`, `/the-index/[slug]` — longform reference entries (scaffold,
  empty until content lands)
- `/glossary` — single-page glossary with same-page anchors
  (`/glossary#melkia`). No per-term routes — that decision is resolved, not
  open.
- `/journal`, `/journal/[slug]` — editorial. Demoted to secondary nav.
  `journalEntries` is empty at scaffold; content arrives when there's
  something worth publishing under one of the four formats.
- `/about`, `/how-we-work` — only reachable via footer, not top nav
- `/disclaimer`, `/terms`, `/privacy` — footer legal strip

## Tailwind conventions

- **Use explicit class names.** Dynamic Tailwind classes get purged — if a
  class name is built from a variable (`\`text-${color}\``), it will not ship.
  Use `clsx` with full class strings in conditionals.
- Reading width: `max-w-reading` (640px — narrowed from 680 in the April
  2026 restructure). Page width: `max-w-page` (1200px).
- Text scales: `text-display` (4rem), `text-section` (2.5rem),
  `text-subtitle` (1.5rem), `text-body` (1.125rem/1.65), `text-meta`
  (0.8125rem) — defined in `tailwind.config.ts`.

## Components

Shared components in `components/`:

- `site-header.tsx`, `site-footer.tsx` — chrome.
- `editorial-hero.tsx` — kicker + title + subtitle + optional image.
- `essay-body.tsx` — markdown → typographically consistent prose. Internal
  links (`/foo`) resolve to Next.js `Link`; external links open in a new tab.
- `static-page.tsx` — wraps `EditorialHero` + `EssayBody` for static pages.
- `property-card.tsx`, `property-hero.tsx`, `property-meta.tsx` — listing UI.
  Meta renders as a sticky sidebar; no bedrooms/bathrooms icon triplet.
- `quarter-card.tsx`, `journal-card.tsx` — index cards.
- `contact-form.tsx` — POSTs JSON to `/api/contact`.
- `newsletter-form.tsx` — footer signup. POSTs to `/api/contact` with
  `source: "newsletter"` so the same Resend mail path handles it.
- `google-analytics.tsx` — loads the GA4 gtag script via
  `<Script strategy="afterInteractive">`. Renders nothing when
  `NEXT_PUBLIC_GA_MEASUREMENT_ID` is unset, so dev/preview stays clean.
  Mounted once from `app/layout.tsx`.
- `quarter-map.tsx` — Mapbox GL JS client component. Renders a neutral
  placeholder if `NEXT_PUBLIC_MAPBOX_TOKEN` is not set.

## SEO

- `app/layout.tsx` sets the default metadata and a `RealEstateAgent`
  organization JSON-LD block.
- Property pages emit `RealEstateListing` JSON-LD.
- Journal entries emit `Article` JSON-LD.
- `app/sitemap.ts` generates URLs via `safeSitemapUrl()` in
  `lib/sitemap-helpers.ts` to URL-encode `&` and other specials in slugs.
- `app/robots.ts` allows `/`, disallows `/api/`.

## Contact form

- `/api/contact` (runtime: nodejs) requires `RESEND_API_KEY`.
  `CONTACT_EMAIL_TO` and `CONTACT_EMAIL_FROM` are optional overrides;
  defaults are baked into the route (morocco@hawazine.com and
  noreply@hawazine.com respectively).
- Inputs are trimmed and length-capped before templating into HTML.
- HTML body uses `escapeHtml()` on every user-provided value to avoid
  injection.
- On missing env, returns a 500 with a clear message and logs a dev-only
  console warning.
- There is **no inquiries table** — submissions are email-only.

## Gotchas

- `lib/content/pages.ts` uses slashes in slugs (`buying/melkia`) — these match
  the route path. Do not change them to underscores or flatten them.
- When adding a new static page, update `app/sitemap.ts` `STATIC_ROUTES`.
- Glossary is a **single page**. Terms live at `/glossary#<slug>` anchors,
  never at `/glossary/[term]`. Do not scaffold a dynamic term route.
- When adding a new dynamic collection (e.g., land listings), remember to
  also add its `generateStaticParams` on the route and include it in the
  sitemap loop.
- Do not introduce `@next/mdx`, `contentlayer`, or other content tooling.
  Markdown-in-TS is deliberate.
- Do not rewire the admin UI / Supabase unless explicitly asked.

## Voice and positioning

This is the editorial and brand register for every piece of copy on the
site — hero, pages, journal, form microcopy, metadata. Read before
writing a sentence.

### Who we are

Hawazine is a Marrakech medina real estate agency with editorial
authority. We are not a portal. We are not a samsar. We are not a
branch of a French luxury network parachuted into the souks.

We are inside the medina — by history, by residency, by the work of
actually reading the titles, walking the derbs, and understanding what
a house here has been through before it became available.

We write about the medina the way Monocle writes about cities — with
intelligence, specificity, and genuine affection. The writing is not
content marketing. It is the work itself.

### The voice

- **The Empress, not the Fool.** Warm, grounded, unhurried. We do not
  chase. We do not perform. We hold the knowledge and offer it plainly
  to people who are ready to receive it.
- **The Oracle.** We see patterns. We state them without promising
  outcomes. We give buyers the data and the context to think clearly
  — and we trust them to draw their own conclusions.
- **Monocle register, not Barnes register.** Barnes writes brochures.
  Monocle writes about the world. We write about the medina — its
  quarters, its titles, its prices, its buildings, its people. The
  properties we sell are part of that world, not the other way around.
- **Authentic Moroccan warmth, not performed hospitality.** There is a
  difference between the mint tea that appears before you have sat
  down in a tourist shop and the tea a family makes you when you come
  to look at their house. We are the second kind.
- **Authority without aggression.** We do not argue. We do not need
  to. We state what we know with enough precision that the alternative
  — the portal listing, the unqualified agent, the uninformed offer —
  reveals itself as insufficient.

### What we do not do

- We do not announce our credentials. The work speaks.
- We do not say "nestled", "discover", "journey", "unlock", "luxury
  living", or "investment opportunity".
- We do not keep ourselves small out of false modesty.
- We do not inflate ourselves with borrowed prestige.
- We do not use humour — the buyers are serious, the transactions are
  complex, the stakes are real.
- We do not list every neighbourhood in every sentence — we speak of
  the medina as a whole.

### What we write

- **The Medina** — the place itself. A quarter, a street, a building.
  Written mid-scene, present tense, from inside.
- **The Market** — price, pattern, structure. What the data actually
  shows. The Oracle register. Dense, honest, no promises.
- **The House** — a portrait of a single property. Not a listing
  description. A history.
- **The Record** — one observation, one paragraph. Published when
  something is worth noting.

(These are the `JournalFormat` slugs in `lib/types.ts`: `the-medina`,
`the-market`, `the-house`, `the-record`.)

### The positioning

We are building toward becoming the authoritative English-language
intelligence source on Marrakech medina real estate — and eventually
Moroccan property more broadly. The agency is the first expression of
that authority. The editorial is the proof of it. The data layer comes
next.

We do not need to say any of this on the site. We simply need to be it.

## Rules copied forward from the brief

- Ship complete replacement files when editing; no partial diffs in
  deliverables.
- Zip archives (if ever generated) must exclude `node_modules`, `.next`,
  `.vercel`, `.env*` (except `.env.example`), and `*.sql`.
- No founder bios anywhere in the site.
- No bedrooms/bathrooms icon triplet. No fake trust widgets, counters, or
  partner logo walls.
- No carousel on property pages — gallery is an arrow-navigable horizontal
  scroll with scrollbars hidden (`.no-scrollbar`).
- No in-site translation widget in v1; the site ships English-only.
