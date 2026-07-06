# Builder Coil AI Renovation — Final Validation Report

Date: 2026-07-06
Branch: `codex/ai-renovation-buildercoil`

## Automated checks

| Check | Command | Result |
| --- | --- | --- |
| Typecheck | `pnpm typecheck` | PASS |
| Lint | `pnpm lint` (Biome) | PASS (1 pre-existing `biome migrate` info) |
| Build | `pnpm build` (Vite + Nitro, vercel preset) | PASS |
| Sitemap | `pnpm tsx scripts/generate-sitemap.ts` | PASS — 22 blog + 5 news, no `/newsletter` |
| Tests | `pnpm test` | N/A — repo contains no test files (pre-existing; vitest exits 1 with "No test files found"; unrelated to this change) |

Note: `pnpm build` on Windows requires clearing `.vercel/output` first (nitro copies
read-only files and later fails `chmod` on them). Pre-existing environment quirk.

## Forbidden-term sweep (source)

Query: `newsletter | The Upkeep | subscribe | waitlist | chronomation.com | consulting`
over `src/` and `public/`. Remaining matches, all reviewed and justified:

| File | Match | Justification |
| --- | --- | --- |
| `src/routes/about.tsx` | "not a consulting channel" | Negation disclaimer — required repositioning copy |
| `src/data/news/2026-07-03-new-chapter-hultafors-group.md` | "The Upkeep newsletter is retired", "not a consulting channel" | Status post must explain the removals (plan requirement) |
| `src/data/news/2025-11-25-site-launch.md` | "Newsletter – The Upkeep" heading + historical note | Edited to clearly historical; states retirement and links to status post |
| `src/data/news/2026-02-12-chronomation-launch.{md,json}` | Title/slug "Chronomation.com Is Live" | Historical title; slug preserved to avoid breaking published URLs; body carries archival note; no live links |
| `src/data/blog/2026-02-23-debugging-tanstack-store...md` | `progressStore.subscribe(...)` | TanStack Store API inside a code sample — not newsletter language |
| `public/` | none | Clean |

## Built-output sweep (`.vercel/output`, 387 js/mjs/html/json/xml files)

- **`"/newsletter` route strings**: 0
- **`https://chronomation.com` links**: 0
- **"The Upkeep"**: only inside the content bundle (`loader-server-*.mjs`) from the two allowlisted historical/status posts
- **New post**: present in content bundle, route manifest, and `sitemap.xml`

## Rendered smoke checks (`vite preview`, port 4173)

| Route | Result |
| --- | --- |
| `/` | 200; hero shows "Occasional Personal Devlog"; no newsletter/Upkeep/chronomation.com in HTML |
| `/news/new-chapter-hultafors-group` | 200; Hultafors Group status renders |
| `/newsletter` | **404** (route removed) |
| `/about` | 200; "Product & Service Owner" status block renders |
| `/contact` | 200; no `<form>` element (static contact info only) |
| `/api/feed` | 200; no live chronomation.com URLs (historical post title only) |

## Feed / SSR leak check

`/api/feed` and SSR loader data serialize post titles/summaries. The
chronomation-launch JSON summary was rewritten to archival framing, so no active
product-marketing copy leaks through the feed consumed by Ball Lightning.

## Requirements traceability

- **Newsletter/waitlist removal**: routes, component, lib, env vars, sitemap entry, deps (`resend`, `@react-email/components`) — done
- **Repositioning**: hero, about, contact, header, footer, root meta, `meta.ts`, JSON-LD (`structured-data.ts`), blog/news index copy — done
- **Chronomation archive framing**: all links → `balllightning.cloud/chronomation`; Product JSON-LD node → CreativeWork with `creativeWorkStatus: "Archived"` — done
- **Status post**: `news/new-chapter-hultafors-group` (2026-07-03) covering Hultafors role, Chronomation pause, Ball Lightning passive status, newsletter/contact-form removal — done
- **Docs**: PDD v0.3.0, active-context v0.1.12, CHANGELOG v0.1.12, README — done
- **AGENTS.md rules-path fix**: done (prerequisite commit)
