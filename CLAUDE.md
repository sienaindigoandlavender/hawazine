# Claude working notes — Hawazine

This file captures conventions for future Claude Code sessions on the
hawazine repo so you do not have to re-derive them from the original brief.

## Project shape

- Next.js 14, App Router, TypeScript, Tailwind.
- **Flat-file content by default.** Quarters, properties, pages, glossary,
  and The Index live as typed TS data under `lib/content/`. Only the
  Journal lives in Supabase — specifically so Cloudinary image URLs can
  be pasted via Supabase Studio rather than committed to the repo.
  Glossary and The Index briefs both explicitly chose flat file over
  Supabase; do not migrate them without an equivalent explicit decision.
- **Supabase is Journal-only.** `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` power `/journal`. Schema lives at
  `supabase/schema.sql`. RLS grants the anon role `SELECT` on
  `published = true` rows only; edits go through Supabase Studio with
  the service role.
- **No admin routes.** The editing surface is Supabase Studio (for the
  Journal) and git (for flat-file content). Do not build `/admin` UI
  without an explicit decision to reverse this rule.
- **No `/api/revalidate`.** Journal pages use time-based ISR
  (`revalidate = 3600`). Flat-file content rebuilds on git push.

## Content model

Flat-file content in `lib/content/`:

- `quarters.ts` — medina neighbourhoods (Laksour, Mouassine, etc.)
- `properties.ts` — listings (riad/dar/land/other)
- `pages.ts` — long-form static pages (Marrakech landing, Buying and its
  sub-pages, About, How we work). Slugs match the route path.
- `glossary.ts` — single-page glossary terms
- `the-index.ts` — /buying reference entries
- `oracle.ts` — market intelligence (private transactions + public notes)

Supabase-backed content:

- `journal.ts` exports **async** helpers that query the `journal_entries`
  table via `lib/supabase.ts`. When env vars are missing, every helper
  returns an empty result — pages must render their empty-state paths
  without crashing.
- Inline images: each entry can carry up to two inline images
  (`inline_image_{1,2}_{url,alt}` columns; `inlineImage{1,2}{Url,Alt}` on
  the type). `injectInlineImages(entry)` inserts inline 1 after the third
  paragraph and inline 2 after the seventh, splitting on `\n\n`. Bodies
  with fewer than 4 paragraphs render no inline images; 4–7 paragraphs
  render only inline 1; 8+ render both. URLs starting with `PLACEHOLDER_`
  are treated as unset so seeded entries degrade to prose-only until real
  Cloudinary URLs land in Supabase Studio. Position is fixed across
  entries by editorial decision — do not make it data-driven.
- Image prompts: `hero_image_prompt` and `inline_image_{1,2}_prompt`
  carry the MJ prompt strings used to generate each image. They round
  trip through `JournalEntry` (`heroImagePrompt`, `inlineImage{1,2}Prompt`)
  so internal tooling could surface them later, but they are **never**
  rendered on the public entry page — they exist for the editorial
  workflow inside Supabase Studio only.

Types are in `lib/types.ts`. Flat-file lists have a `published` flag;
filter with the `getPublished…` helpers, never use the raw arrays in
page code.

Markdown bodies render through `react-markdown` + `remark-gfm` via the
`EssayBody` component. Do not reach for MDX unless the brief requests it.

## Design tokens

- Colours live in `tailwind.config.ts` (April 2026 restructure): `paper
  #FFFFFF` (pure white site background — the warm-paper variant was tried
  and reverted), `paper-deep #F5F5F4` (**small inline panels only** —
  property info cards overlaying hero imagery, for example — never a
  full-width section-band background), `ink #1A1714` (warm near-black),
  `ink-soft #3D342E` (default body prose — the site `body` declaration
  binds to this), `quiet #7A6E63`, `accent #8B3A2F` (deep terracotta —
  hover / occasional highlight only, not for large fills; currently
  under evaluation against the white background), `rule #E5E5E5` (cool
  hairlines, legible on white). Footer keeps its dark inline gradient
  `#1f1f1f → #161616 → #0e0e0e`.
- Fonts: `Fraunces` (serif, display + body) and `IBM_Plex_Sans` (sans, nav,
  metadata, UI). Exposed as CSS variables `--font-serif` and `--font-sans`.
  Tailwind: `font-serif` and `font-sans`. The earlier `.font-ui` CSS class
  has been retired in new components; prefer `font-sans`.
- Backgrounds: pure white `#FFFFFF` site-wide. A warm-paper variant was
  tried and reverted. **Sections separate through whitespace and typographic
  rhythm, not background fills.** Grey bands across full-width sections are
  off-register for this project (reference: The Modern House — pure white
  page throughout; grey only appears as floating cards over photography).
  If a section genuinely needs visual separation, a single 1px `border-rule`
  rule above and/or below it — never a coloured fill. **One sanctioned
  exception (April 2026):** the "More from the Journal" strip on
  individual journal entry pages sits on a full-width `bg-gray-100`
  (#F3F4F6) band, marking the post-article browsing zone before the
  dark footer. Use `gray-100` rather than `paper-deep` here — at
  full-width scale, paper-deep's warm cast reads beige. Treat this as
  the only such band; do not add others without a parallel decision.
- Body prose: `ink-soft` default. Editorial prose inside `.prose-hawazine`
  reads `ink` (slightly heavier). Use `quiet` for metadata/captions only.

## Route map (April 2026 restructure)

Primary nav (April 2026 four-verb restructure):
`Buy · Learn · Build · Contact`.

- `Buy` → `/properties`
- `Learn` → `/journal`, with a hover/focus dropdown that exposes the
  three editorial / reference destinations: **Journal**, **The Index**
  (`/buying`), **Glossary**.
- `Build` → `/build` — the renovation-practice page (replaces the
  earlier `/craft` scaffold).
- `Contact` → `/contact`.

There is no separate secondary nav; the previous secondary destinations
fold into the LEARN dropdown. The Marrakech overview is reachable from
the site footer's Reference column.

**Buying and The Index are still the same destination.** The route is
`/buying`; nav exposes it labelled "The Index" inside the LEARN
dropdown. Individual reference entries live at `/buying/<slug>`.

- `/marrakech` — the medina overview + quarter cards + interactive map.
  No longer in primary nav; reachable from footer Reference.
- `/marrakech/[quarter]` — per-quarter page; map highlights that quarter.
- `/buying` — The Index landing. Reached as "The Index" inside LEARN.
- `/buying/[slug]` — individual Index entries, driven by `indexEntries`
  and rendered through `app/buying/[slug]/page.tsx`. Emits FAQPage or
  Article JSON-LD based on body length. `generateStaticParams`
  pre-renders every entry at build.
- `/buying/melkia`, `/buying/the-process`, `/buying/costs`,
  `/buying/what-to-ask` — older static reference pages, kept resolvable
  pending migration into Index entry schema.
- `/build` — renovation practice page (formerly `/craft`, renamed in
  April 2026 to match the four-verb primary nav). Static long-form
  content rendered through `EditorialHero` + `EssayBody`.
- `/properties`, `/properties/[slug]` — listings.
- `/contact` — contact form.
- `/glossary` — single-page glossary with same-page anchors
  (`/glossary#melkia`). No per-term routes.
- `/journal`, `/journal/[slug]` — editorial. The LEARN destination.
- `/about`, `/how-we-work` — footer only, not in primary nav.
- `/disclaimer`, `/terms`, `/privacy` — footer legal strip.

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
- `image-with-panel.tsx` — the Modern House pattern (image + floating
  info panel). Used by properties. `tone="paper-deep"` is the property
  default (warm off-white card over photography); `tone="paper"` is the
  Journal default. `size="featured"` floats the panel mid-left; `size="card"`
  pins it bottom-left in a smaller footprint.
- `property-featured.tsx`, `property-card.tsx` — wrap `ImageWithPanel` for
  the landing top entry and grid cards respectively. The whole card is the
  link; no separate CTA on cards.
- `property-info-panel.tsx` — single source for the three panel densities
  (featured / card / hero), all driven by one `Property`. Keep new panel
  variants here rather than inlining panel content at call sites.
- `property-specs-block.tsx` — TYPE/SIZE/BEDROOMS/etc. as a 2- or 4-col
  grid that omits rows when fields are absent. No bedrooms/bathrooms icon
  triplet.
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
- Translation widget: an Elfsight Website Translator is mounted at the
  bottom of `site-footer.tsx` (script via `next/script` with
  `strategy="lazyOnload"`). Widget ID
  `90709076-65f3-443c-8cee-5041f5884859`, configured for EN / ES / FR.
  The earlier "no in-site translation widget" rule was reversed in
  April 2026 — most Marrakech-medina buyers read French, sometimes
  Spanish, and English-only was costing reach. The widget style
  (dropdown vs buttons vs flags) is configured on Elfsight's
  dashboard, not in code. `/privacy` discloses the Elfsight cookie.
  Note: when signed into Elfsight in the same browser, you may see an
  admin overlay ("Share", "Views N%", a promo popup) — that overlay
  is not visible to public visitors.
