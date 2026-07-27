# Builder Coil AI Renovation — Implementation Summary

Date: 2026-07-27 · Branch: `codex/ai-renovation-buildercoil` · Version: v0.1.13

## Removed

- `src/routes/newsletter/` (index, confirm, unsubscribe)
- `src/components/newsletter/` (NewsletterCta + .gitkeep)
- `src/lib/newsletter/` (email-service, schemas, storage, types, emails/confirmation)
- `src/lib/contact/` (server, email-service) — contact form replaced by static page
- Dependencies: `resend`, `@react-email/components`
- Env vars: `CHRONO_RESEND_API_KEY`, `TBC_RESEND_DEFAULT_FROM`, `APP_BASE_URL_TBC`, `TBC_NEWSLETTER_SECRET`, commented Chronomation API block
- Sitemap `/newsletter` entry; header "The Upkeep" nav link; footer newsletter column; "Powered by Chronomation" footer line

## Repositioned (code)

- `src/routes/index.tsx` — devlog hero, About CTA, "Current Status" section linking the status post
- `src/routes/about.tsx` — devlog framing, Hultafors Group status block, archived project cards, non-solicitation copy
- `src/routes/contact.tsx` — rewritten as static page (email, location, links)
- `src/components/layout/{Header,Footer}.tsx` — nav/link/copy updates
- `src/routes/__root.tsx`, `src/lib/seo/meta.ts` — devlog title/description
- `src/lib/seo/structured-data.ts` — org description de-commercialized; Chronomation Product node → CreativeWork (Archived) at `balllightning.cloud/chronomation`
- `src/routes/{blog,news}/index.tsx` — occasional-devlog descriptions

## Content

- **New**: `src/data/news/2026-07-03-new-chapter-hultafors-group.{json,md}` (slug `new-chapter-hultafors-group`)
- **Edited (9 posts)**: archival notes on chronomation-launch and site-launch; The Upkeep CTAs removed from agent-skills-updater release/design/build posts, documentation post, client-quest post; "Newsletter service" → "Email service" in biome post; `media.chronomation.com` genericized in media-hosting post

## Docs & meta

- PDD → v0.3.0 (devlog vision, retired scope section, trimmed env)
- `active-context.yaml` → release 0.1.12, renovation entry, retired Chronomation next step, fixed duplicate `recent_done` key
- `CHANGELOG.yaml` → v0.1.12 entry
- README repositioned; `AGENTS.md` rules path fixed (`.devin/rules`)

## Follow-up Content Refinement

- Rewrote `src/data/news/2026-07-03-new-chapter-hultafors-group.md` in a direct first-person voice, removing generic AI-style framing and announcement language.
- Updated the matching JSON summary and added `/media/2026-07-03-new-chapter-hultafors-group.jpg` as the hero image with descriptive alt text.

## Validation

See `final-validation-report.md` — typecheck/lint/build pass, source + built-output
sweeps clean (allowlisted exceptions documented), rendered smoke checks pass,
`/newsletter` returns 404, feed sanitized.
