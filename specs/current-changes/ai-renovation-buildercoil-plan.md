# Builder Coil AI Renovation Plan

Created: 2026-07-03

## Summary

Reposition The Builder Coil as an occasional personal hobby/devlog site, not a product marketing channel, newsletter funnel, or consulting acquisition surface. Remove The Upkeep, newsletter/waitlist flows, Chronomation launch language, and active build-in-public product positioning. Add a concise status post about Nicolas Brulay's full-time Hultafors Group role and link Chronomation references to the Ball Lightning archive page at `https://balllightning.cloud/chronomation`.

This plan is based on the AI renovation kit in Ball Lightning's `specs/current-changes/ai-renovation-kit/` and the lessons learned while refreshing Ball Lightning.

## Desired Public Position

- The Builder Coil is an occasional personal devlog for hobby projects, technical experiments, learning notes, and archived project reflections.
- Nicolas Brulay works full-time at Hultafors Group as Product & Service Owner - Integrations.
- Public role framing may mention integration ownership, modernization, harmonization, strategy, AI, automation, and technical ownership.
- Do not imply Hultafors Group endorsement, representation, line management responsibility, confidential internal work, internal architecture, vendors, budgets, incidents, or roadmap details.
- Ball Lightning AB remains open but mostly passive as a maintained company presence, portfolio, and archive.
- Chronomation is paused and archived under Ball Lightning, not an active product or maintained standalone domain.

## Repo-Specific Findings From Initial Map

- Stack: TanStack Start, TanStack Router, React 19, TypeScript, Vite, Biome/Ultracite.
- Public routes include `/`, `/about`, `/contact`, `/blog`, `/news`, `/newsletter`, `/newsletter/confirm`, `/newsletter/unsubscribe`, and `/api/feed`.
- Newsletter implementation currently includes `src/routes/newsletter/*`, `src/components/newsletter/NewsletterCta.tsx`, `src/lib/newsletter/*`, Resend helpers, and sitemap exposure.
- Contact implementation includes Resend-backed helpers under `src/lib/contact/*`.
- Sitemap generation is in `scripts/generate-sitemap.ts` and currently exposes `/newsletter`.
- Feed output is served by `src/routes/api/feed.ts`.
- Content lives under `src/data/blog/*` and `src/data/news/*`, with paired Markdown and JSON metadata.
- Existing public content contains old Chronomation launch, build-in-public, newsletter, and consulting/service positioning that must be reviewed page by page.
- Builder Coil AGENTS.md references `.windsurf/rules`, but the available always-on rules are currently under `.devin/rules`. Correct or account for that before implementation.

## Key Changes

- Remove all newsletter/waitlist public UX:
  - Delete or neutralize `/newsletter`, `/newsletter/confirm`, and `/newsletter/unsubscribe`.
  - Remove The Upkeep from header, footer, mobile navigation, CTAs, metadata, sitemap, and feed descriptions.
  - Remove `NewsletterCta` usage and newsletter forms.
  - Remove newsletter server functions, storage, email templates, schemas, and Resend dependencies if unused after deletion.
  - Remove newsletter/waitlist environment variables from `.env.example`.
- Reposition homepage and about page:
  - Add a clear About/status block using the approved Hultafors role framing.
  - Describe The Builder Coil as occasional hobby/devlog material.
  - Remove active product marketing, consulting funnel, regular cadence promises, and launch-list wording.
- Add required status post:
  - Suggested slug: `new-chapter-hultafors-group`.
  - Suggested title: `A new chapter: full-time at Hultafors Group`.
  - Include the Hultafors role, integration ownership focus, Ball Lightning's mostly passive status, The Builder Coil's occasional devlog role, Chronomation paused/archive status, and newsletter/waitlist removal.
  - Add both Markdown content and matching JSON metadata if the current content model requires paired files.
- Reframe Chronomation references:
  - Replace active build-in-public/product/launch wording with paused/archived wording.
  - Replace all public `chronomation.com` links with `https://balllightning.cloud/chronomation` where a link is still useful.
  - Keep old posts only if edited enough that they are clearly historical/archived and no longer solicit signups.
- Update metadata and feeds:
  - Homepage, about, blog/news index, post templates, root metadata, Open Graph, Twitter/X metadata, JSON-LD, sitemap, robots if relevant, and `/api/feed`.
  - Make feed descriptions devlog-oriented.
  - Exclude removed newsletter routes from sitemap and route tree.
- Update documentation:
  - Update `specs/memory-bank/thebuildercoil-pdd.yaml`, `specs/memory-bank/active-context.yaml`, and `specs/memory-bank/CHANGELOG.yaml`.
  - Add implementation summary and validation report under a scoped renovation folder, for example `specs/current-changes/ai-renovation-buildercoil/`.

## Lessons Learned From Ball Lightning Refresh

- Do not only filter visible components. TanStack Start can serialize loader data into SSR HTML, so stale external or loader-fed content can leak forbidden terms even when not visibly rendered.
- Run both source sweeps and rendered SSR route checks. Source-only validation misses serialized feed payloads and generated sitemap issues.
- Move hardcoded head metadata into message keys when a route already uses localized copy patterns.
- Exclude generated Paraglide output and route-tree/generated files from exploratory greps, but rebuild so route tree changes are regenerated.
- Delete unused backend/server functions and dependencies when a public form or email flow is removed.
- Keep old specs/archive docs out of public-content failure criteria unless they drive generated pages, but do not let old specs influence public copy.
- For local instruction packages that intentionally contain forbidden strings, keep them ignored or outside the repo so validation sweeps stay meaningful.
- Validate contact/newsletter removals by checking both public routes and absence of `<form>` or submission code paths.
- When external feeds are consumed by another site, sanitize or curate the feed at the source so downstream sites do not inherit stale launch/product language.

## Execution Steps

1. Create branch `codex/ai-renovation-buildercoil`.
2. Confirm repo rules and fix the AGENTS.md rule-path mismatch if appropriate.
3. Create a discovery report under `specs/current-changes/ai-renovation-buildercoil/discovery-report.md`.
4. Inventory routes, layout, nav/footer/mobile menu, content files, sitemap, feed endpoint, metadata, server functions, env vars, and dependencies.
5. Remove newsletter/waitlist routes and code paths where safe; update route tree via build.
6. Remove or neutralize contact/email flows that no longer serve a non-commercial public purpose.
7. Reposition homepage, about page, footer, header, mobile nav, contact page, metadata, and feed copy.
8. Add the `new-chapter-hultafors-group` post with paired metadata.
9. Update Chronomation references and links across routes, posts, news items, metadata, JSON files, and feed output.
10. Regenerate sitemap and verify `/newsletter` is not exposed.
11. Update memory-bank/PDD/changelog documentation.
12. Write implementation summary under `specs/current-changes/ai-renovation-buildercoil/implementation-summary.md`.
13. Run technical and content validation.
14. Write final validation report under `specs/current-changes/ai-renovation-buildercoil/final-validation-report.md`.

## Validation Plan

Run available commands:

```powershell
corepack pnpm run typecheck
corepack pnpm run lint
corepack pnpm run test
corepack pnpm run build
corepack pnpm tsx scripts/generate-sitemap.ts
```

Run content sweeps over source, content, messages if present, public, scripts, and docs that generate public pages, excluding `.git`, `node_modules`, generated route output where appropriate, archived specs, and renovation-kit files.

Forbidden public terms include:

- newsletter
- waitlist
- subscribe
- The Upkeep
- early access
- launching 2026
- coming soon
- get started
- let's collaborate
- book a call
- have a project in mind
- respond within one business day
- Care Lite
- Care Pro
- Scale plan
- SLA tier
- fixed-price
- custom quote
- landing page from
- smart site from
- chronomation.com

Required public signals:

- Hultafors Group
- Product & Service Owner - Integrations
- full-time
- integration ownership or integration modernization
- harmonization
- strategy
- AI and automation
- occasional personal devlog
- hobby projects or technical experiments
- paused or archived Chronomation
- Ball Lightning archive link: `https://balllightning.cloud/chronomation`

Rendered route checks:

- `/`
- `/about`
- `/contact`
- `/blog`
- `/news`
- required new post route
- existing Chronomation-related posts/news after edits
- `/api/feed`
- `public/sitemap.xml`

Manual checks:

- Desktop and mobile navigation contain no newsletter links.
- Footer contains no The Upkeep or newsletter CTA.
- Contact page does not solicit consulting work.
- Chronomation references read as historical, paused, or archived.
- No page implies Hultafors Group endorsement.
- External links are intentional and do not point to `chronomation.com`.

## Risks And Open Questions

- Historical posts may contain valid old context but still create current public positioning risk. Prefer short editorial notes and wording edits over wholesale deletion unless the content is only a launch funnel.
- Removing Resend may also affect the contact form. Decide whether contact becomes static like Ball Lightning or remains direct email/social only.
- The `/api/feed` endpoint is consumed by Ball Lightning, so stale terms in feed output can leak into Ball Lightning SSR payloads. Validate feed output directly.
- If newsletter routes have backlinks, decide whether to return static explanatory pages, remove from navigation/sitemap only, or redirect to the new status post.
- The Builder Coil currently has a rule-path mismatch in AGENTS.md. Fixing that may be a small prerequisite or a separate housekeeping commit.

## Recommended Commit Message

`content: reposition Builder Coil as hobby devlog`
