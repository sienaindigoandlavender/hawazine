# Hawazine

The Hawazine website — a Next.js 14 App Router project, deployed to Vercel.
Editorial publication for a licensed Marrakech-medina real estate agency.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Content | Hardcoded in typed TS modules under `lib/content/` |
| Fonts | EB Garamond (serif) + Inter (sans) via `next/font/google` |
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

Never commit `.env*` files; only `.env.example` ships in git.

## Editing content

| Entity | File |
| --- | --- |
| Quarters (medina neighbourhoods) | `lib/content/quarters.ts` |
| Properties (listings) | `lib/content/properties.ts` |
| Journal entries (editorial) | `lib/content/journal.ts` |
| Static pages (Marrakech, Buying, About, How we work) | `lib/content/pages.ts` |
| Site config (nav, email, carte pro. number) | `lib/site.ts` |

Each entity has a `published` boolean; set it to `false` to hide without
deleting. Markdown bodies are rendered through `react-markdown` + `remark-gfm`
in the `EssayBody` component.

After editing content, commit and push — Vercel will rebuild automatically.

## Routes

Public routes:

- `/` — home
- `/marrakech`, `/marrakech/[quarter]`
- `/buying`, `/buying/melkia`, `/buying/the-process`, `/buying/costs`, `/buying/what-to-ask`
- `/journal`, `/journal/[slug]`
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

- **Mouad's carte professionnelle number** is a TK placeholder in `lib/site.ts`.
  Replace before the site goes live.
- **Demo Cloudinary URLs** (`res.cloudinary.com/demo/...`) are used throughout
  the content modules so the scaffold renders without setup. Replace with real
  photography before launch.
- The contact form has no database persistence. Every submission is an email
  (TO via Resend) and nothing else.
