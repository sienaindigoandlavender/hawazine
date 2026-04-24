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

- Colours live in `tailwind.config.ts`: `ink #111`, `paper #fff`, `quiet #6B6B6B`,
  `accent #1B2A4E`. Footer uses an inline linear gradient from `#1f1f1f` →
  `#161616` → `#0e0e0e`. Do not introduce terracotta, saffron, zellige-blue.
- Fonts: `EB_Garamond` (serif, body + editorial display) and `Inter` (sans,
  navigation, metadata, UI). Exposed as CSS variables `--font-serif` and
  `--font-sans`. Tailwind classes `font-serif` and `font-sans`; there is also
  a `.font-ui` CSS class bound to the sans stack, used interchangeably.
- Backgrounds: pure white on all content pages. No cream, no parchment.
- Body text: `#111`, never grey. Use `quiet` only for metadata/captions.

## Tailwind conventions

- **Use explicit class names.** Dynamic Tailwind classes get purged — if a
  class name is built from a variable (`\`text-${color}\``), it will not ship.
  Use `clsx` with full class strings in conditionals.
- Reading width: `max-w-reading` (680px). Page width: `max-w-page` (1200px).
- Text scales: `text-display`, `text-section`, `text-subtitle`, `text-body`,
  `text-meta` are defined in `tailwind.config.ts`.

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

- `/api/contact` (runtime: nodejs) reads `RESEND_API_KEY`, `CONTACT_EMAIL_TO`,
  and `CONTACT_EMAIL_FROM`.
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
- When adding a new dynamic collection (e.g., land listings), remember to
  also add its `generateStaticParams` on the route and include it in the
  sitemap loop.
- Do not introduce `@next/mdx`, `contentlayer`, or other content tooling.
  Markdown-in-TS is deliberate.
- Do not rewire the admin UI / Supabase unless explicitly asked.

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
