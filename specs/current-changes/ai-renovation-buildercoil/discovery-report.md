# Builder Coil AI Renovation — Discovery Report

Date: 2026-07-03
Branch: `codex/ai-renovation-buildercoil`
Plan: `specs/current-changes/ai-renovation-buildercoil-plan.md`

## Rules-path mismatch

`AGENTS.md` referenced `.windsurf/rules/*` (including a nonexistent `paraglide.md`), but the
repo's actual always-on rules live under `.devin/rules/` (`tanstack-start.md`, `ultracite.md`).
Fixed in `AGENTS.md` as a prerequisite. No Paraglide usage exists in this repo.

## Routes

| Route | File | Renovation action |
| --- | --- | --- |
| `/` | `src/routes/index.tsx` | Reposition hero + CTA; remove newsletter buttons and chronomation.com links |
| `/about` | `src/routes/about.tsx` | Add Hultafors status block; archive Chronomation; remove newsletter CTA |
| `/contact` | `src/routes/contact.tsx` | Neutralize: static contact info, remove form + commercial copy |
| `/blog`, `/blog/$slug` | `src/routes/blog/*` | Update index description copy |
| `/news`, `/news/$slug` | `src/routes/news/*` | Keep; new status post lands here |
| `/newsletter`, `/newsletter/confirm`, `/newsletter/unsubscribe` | `src/routes/newsletter/*` | Delete entirely |
| `/api/feed` | `src/routes/api/feed.ts` | Keep (consumed by Ball Lightning); content is post-driven, sanitized via post edits |

## Newsletter surface (to remove)

- `src/routes/newsletter/` — index (signup form + server fn), confirm, unsubscribe
- `src/components/newsletter/NewsletterCta.tsx` (+ `.gitkeep`) — used only by `Footer.tsx`
- `src/lib/newsletter/` — email-service, schemas, storage, types, `emails/confirmation.tsx`
- `Header.tsx` navLinks: `🌀 The Upkeep` entry (desktop + mobile sheet)
- `Footer.tsx`: `<NewsletterCTA compact />` column
- `scripts/generate-sitemap.ts`: `/newsletter` static entry; `public/sitemap.xml` regenerated
- `.env.example`: `CHRONO_RESEND_API_KEY`, `TBC_RESEND_DEFAULT_FROM`, `APP_BASE_URL_TBC`,
  `TBC_NEWSLETTER_SECRET`, commented Chronomation API block

## Contact/email flow decision

The contact page solicits work ("want to work together?") and posts through
`src/lib/contact/{server,email-service}.ts` via Resend. Decision: make contact static
(email + location + links), delete `src/lib/contact/`, and drop the now-unused `resend`
and `@react-email/components` dependencies. Mirrors the Ball Lightning refresh outcome.

## Chronomation references (public code)

- `Footer.tsx`: resources link + "Powered by Chronomation" (both `chronomation.com`)
- `index.tsx`: hero + CTA section links
- `about.tsx`: 4 links incl. UTM-tagged button
- `contact.tsx`: links card
- `src/lib/seo/structured-data.ts`: `CHRONOMATION_URL`, Product node in root entity graph,
  org/blog descriptions with active-product framing
- Content (see below)

## Content files needing edits

| File | Issue |
| --- | --- |
| `news/2026-02-12-chronomation-launch.{md,json}` | Launch language, chronomation.com links, The Upkeep CTA → archival note + archive links |
| `news/2025-11-25-site-launch.md` | The Upkeep section + subscribe CTA → historical note |
| `news/2026-02-10-agent-skills-updater-first-release.md` | The Upkeep subscribe line |
| `blog/2026-02-14-designing-agent-skills-updater...md` | 2 × The Upkeep lines |
| `blog/2026-02-12-from-powershell-to-pypi...md` | The Upkeep subscribe line |
| `blog/2026-01-27-documentation-unsung-hero...md` | "launching The Upkeep soon" P.S. |
| `blog/2026-02-18-the-client-quest...md` | The Upkeep signup sentence |
| `blog/2026-01-06-typescript-biome-code-quality.md` | "Newsletter service definitions" list item |
| `blog/2025-11-28-media-hosting-strategy...md` | `media.chronomation.com` example hostnames |

Non-issue: `blog/2026-02-23-debugging-tanstack-store...md` contains `progressStore.subscribe`
inside a code sample — TanStack Store API, not newsletter language. Allowlisted.

## Metadata / SEO

- `__root.tsx` head: title "Builder's Grimoire", description references Ball Lightning devlogs → devlog copy
- `src/lib/seo/meta.ts`: `DEFAULT_DESCRIPTION`
- `src/lib/seo/structured-data.ts`: root entity graph (Organization "consulting" description,
  Chronomation Product node), blog/news schema descriptions
- `blog/index.tsx`, `news/index.tsx` head() descriptions

## Feed / SSR leak risk

`/api/feed` serializes post titles/summaries consumed by Ball Lightning SSR. Sanitization is
achieved by editing post JSON summaries (chronomation-launch). Loader data on `/` (featured posts)
also serializes summaries into SSR HTML — same fix applies. Validation must check the built
output, not just source.

## Env vars & dependencies

- Env removals as above; keep `VITE_APP_NAME`, `VITE_APP_BASE_URL`, `VITE_TBC_ENV`
- Dependency removals (post-deletion, verified unused): `resend`, `@react-email/components`
- Keep `react-hook-form`/`@hookform/resolvers` (used by `src/components/ui/form.tsx`)

## New status post

`src/data/news/2026-07-03-new-chapter-hultafors-group.{json,md}`, slug
`new-chapter-hultafors-group`, title "A new chapter: full-time at Hultafors Group".
Paired JSON+MD per existing content model (`bodyFile` + `PostSchema`).
