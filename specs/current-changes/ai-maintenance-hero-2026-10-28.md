# AI maintenance article: square hero and personal repost

Created: 2026-10-28
Release: 0.1.16.1

## Scope

Add the missing square hero image to the published article, "Keeping My Side Projects Secure as AI Speeds Everything Up." The approved article text and October 27 publication time are unchanged. The other three posts remain drafts.

Prepare a fuller personal-profile LinkedIn repost, with a single sentence connecting the topic to Ulf Ödesjö's cybersecurity discussion at Lindholmen Software Development Day. The repost is a proposal only; no LinkedIn action is authorized or performed by this work.

## Social copy and attribution

Draft: `.socials/20261027-ai-security-maintenance/linkedin-personal-repost-2026-10-28.md` (ignored local social material).

The source is [Ulf Ödesjö's own public recap](https://se.linkedin.com/posts/ulfodesjo_lsdd-cybers%C3%A4kerhet-activity-7518588549768699904-UMsJ), found through web search on October 28. It names the presentation "The Perfect Storm Before The Breach" and reports discussion of AI shrinking the window to address risks. The direct LinkedIn page could not be fetched; the search result included the recap text. The [organizer's page](https://www.great-it.se/lsdd) confirms the October 20 event.

The draft refers to the discussion around the talk, without quoting the speaker, claiming attendance, or implying endorsement of the article.

## Image

- Mode: built-in image generation, no CLI fallback.
- Final asset: `public/media/2026-10-27-keeping-side-projects-secure-with-ai.webp`.
- Metadata: article JSON heroImage/heroImageAlt, with the modification date updated.
- Square artwork using the established off-white paper, teal/cyan blueprint, and orange-accent style from `.socials/style.md`.
- Encoding as WebP is delivery optimization; the artwork is not otherwise edited.
- Generated output is 1254 × 1254 pixels; the WebP is 277,042 bytes. The square aspect ratio is preserved.

### Final generation prompt

Use case: stylized-concept. Create one final square 1024x1024 editorial blog hero illustration for The Builder Coil article 'Keeping My Side Projects Secure as AI Speeds Everything Up'. Subject: the long tail of maintenance after fast AI-assisted building, a small independent developer's collection of software projects. Composition: a carefully composed compact isometric stack of modular software tiles and translucent interface panels in the central 65% of the square, thin circuit-like dependency paths branching out underneath into a calm looping maintenance orbit, a few small amber attention marks, and one strong warm orange circle as the counterweight at upper right. The modules suggest a little evolving workshop of software, purposeful and maintainable rather than collapsing or apocalyptic. Brand style: abstract technology blueprint / HUD editorial poster, warm off-white paper background with subtle printed grain and faint drafting grid, exceptionally fine geometric drafting lines, small nodes, spare floating panels, crisp dark teal contours shading into cyan/aqua, sparse orange accents, Scandinavian restraint and generous negative space. Subtle depth but mainly graphic illustration with printed architectural drawing character. No humans, no hooded hackers, no locks or shields, no padlock stock imagery, no robots, no vendor logos. Absolutely no readable text, no numbers, no lettering, no watermark. Keep main forms safely within center for responsive square and landscape crops. Professional distinctive raster illustration, sharp detail, strong legibility at thumbnail size.

## Release process

Continue the previously authorized commit/deployment workflow using `C:/Users/nicol/.codeium/windsurf/global_workflows/commitprocess.md`. The active changelog had 612 lines before this release. The rotation script is absent, so the oldest entry was appended intact to the existing archive, reducing active length to 597 before adding the new entry. Previous release 0.1.16 now references its actual merge SHA.

Commit: `fix(content): add square hero to AI maintenance article`

Refs: v0.1.16.1 I3UI I3Docs ai-maintenance-hero

## Validation

Asset dimensions are verified square. Formatting, Ultracite fix, lint, typecheck and all 12 existing tests pass. The approved article Markdown has no diff; only hero metadata and its modification date change. Final secret-scan, CI and deployment outcomes are recorded against the pushed GitHub commits.

Production build passes after one retry of the known Windows public-asset chmod race. Built-site checks verify the article and WebP return 200, Open Graph/Twitter metadata reference the hero, the 28-item feed includes its image, and the three unapproved articles remain 404. All-file private-key and Gitleaks scans pass.
