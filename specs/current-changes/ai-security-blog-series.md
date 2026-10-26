# AI and solo-development security: four review drafts

Created: 2026-10-26
Status: first article approved; remaining three awaiting Nicolas's editorial review

## Publication plan

Nicolas approved the first article as written on October 26 and requested publication tomorrow. Its metadata is now `status: "published"`, the exact lowercase value accepted by `PostStatusSchema`, with `publishedAt: "2026-10-27T09:00:00.000Z"`. Its approved Markdown is unchanged. The remaining three articles retain `status: "draft"` and their proposed dates.

Nicolas has authorized committing and deploying the changes. The public index/feed, single-post and related-post loaders now all require published status and a publication time at or before the request time. Publication is driven by runtime date checks, so no scheduled job or release-time rebuild is needed for the article to become accessible after deployment.

Nicolas has scheduled the TBC LinkedIn post and tagged himself at its end. That replaces the proposed separate personal-profile promotion; no additional LinkedIn action is needed.

Every proposed slot is Tuesday at **10:00 CET (Europe/Stockholm, UTC+01:00)**, stored as **09:00 UTC**. These are four planned posts, not a permanent weekly publishing commitment.

| Date | Original angle | Draft |
| --- | --- | --- |
| 2026-10-27 | 1: maintenance capacity | [Keeping My Side Projects Secure as AI Speeds Everything Up](../../src/data/blog/2026-10-27-keeping-side-projects-secure-with-ai.md) |
| 2026-11-03 | 2: agent access | [AI Helps Me Maintain My Projects. Its Access Needs Maintenance Too.](../../src/data/blog/2026-11-03-ai-agent-access-needs-maintenance.md) |
| 2026-11-10 | 4: removing features | [Deleting Features Is Part of How I Keep a Side Project Maintainable](../../src/data/blog/2026-11-10-deleting-features-side-project-maintenance.md) |
| 2026-11-17 | 5: evidence and verification | [A Clean Security Scan Is One Piece of Evidence](../../src/data/blog/2026-11-17-clean-security-scan-one-piece-of-evidence.md) |

Each draft has paired JSON metadata, a unique ID (`post-023` through `post-026`), a summary, tags, and Nicolas Brulay as author. Reading time uses the existing loader calculation. Hero images have not been selected.

## Editorial approach

- First-person personal devlog, using the existing dependency, skills, and project-scope posts as voice references.
- Practical language for one developer, hobby projects, and companies with limited development capacity.
- Shared theme: AI increases what one person can build, while the resulting projects, permissions, and upkeep still need an owner.
- Different purpose for each post: capacity, access, scope reduction, and evidence.
- Completed work is grounded in project records. Proposed habits and access arrangements are described as aims, not invented completed changes.
- External examples are attributed. No claim that AI caused or discovered this repository's specific vulnerabilities.
- No employer incident, internal architecture, or endorsement claims; no revived newsletter or consulting offer.
- No links to later drafts that would be unavailable when an earlier post is released.

## Factual basis

Local records:

- `dependency-security-review-2026-10-10.md`: thirteen original alerts, framework update, Windows build friction, preview authentication, content and deployment checks.
- `dependency-security-review-2026-10-20.md`: lockfile repair, separate launch-editor security fix after Dependabot failed to open a PR, exposure assessment of the then-open braces advisory.
- `dependency-security-review-2026-10-26.md`: retained security overrides, clean audits, withdrawn advisory, validation scope.
- `ai-renovation-buildercoil-plan.md`, active context, and the July status post: removed newsletter/contact functionality, archived Chronomation, occasional devlog and full-time role context.
- March skills and Dependabot articles: personal tooling, workflow, and voice reference.

Primary external sources, checked on 2026-10-26:

- [Mozilla: Behind the Scenes Hardening Firefox](https://hacks.mozilla.org/2026/05/behind-the-scenes-hardening-firefox/): longstanding bugs, reproducible test cases, and the work surrounding AI-assisted findings.
- [Microsoft: ARTEX and the ConnectWise supply-chain compromise](https://www.microsoft.com/en-us/security/blog/2026/10/21/storm-0940-uses-artex-agentic-ai-connectwise-supply-chain-compromise/): operational use of AI by attackers; used as context, not an analogue of an incident in Nicolas's projects.
- [Adnan Khan: Clinejection](https://adnanthekhan.com/posts/clinejection/): issue-title prompt injection, cache poisoning, publication-credential theft, and unauthorized package release. The researcher's mirror proof of concept and subsequent real-world attack are distinct.
- [TanStack security update](https://tanstack.com/blog/tanstack-start-security-update-cve-2026-102989): affected framework and patched-package guidance.
- [Withdrawn braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm): withdrawn October 23 because it was not a practically exploitable vulnerability. The articles preserve the distinction between decisions made while the finding was open and its later withdrawal.

## Publication status

1. Nicolas reads and edits the three remaining drafts; the October 27 article is approved as written.
2. Confirm dates if review runs past the first proposed slot.
3. Select any desired hero artwork.
4. Deploy the approved first article and its metadata under the October 26 authorization; publish the remaining articles only after Nicolas's review and authorization.

The initial review identified that single-post lookup ignored status/date. Public requests now use `loadPublishedPostInternal`, while internal raw loading remains available for content validation. A shared predicate keeps the same publication rules in the public index and detail paths. Both blog/news detail routes consume the guarded server function; no route modules were changed. Future and draft direct URLs return 404 until eligible.

The regenerated static sitemap includes the approved article URL, which returns 404 until release, and excludes the three drafts. The feed retains its existing cache policy, so feed consumers may see the item after the article becomes directly available as cached responses refresh.

## LinkedIn follow-up

TBC page copy and the superseded personal-profile proposal are saved separately under the ignored `.socials/20261027-ai-security-maintenance/` directory. Nicolas scheduled the TBC page post himself and tagged himself. No additional social posting or scheduling is enabled by this change.

## Initial draft validation

- Existing Vitest suite: all 10 tests pass, including content-schema validation and Markdown resolution for the new posts, publication filtering, rendering behavior, syntax highlighting and accessible navigation.
- Targeted Biome check passes for the four metadata files after formatting one tags array.
- Checked unique IDs/slugs across the content library, exact title/Markdown-heading matches, existing published destinations for internal links, and draft status for all four posts.
- Confirmed all four dates fall on Tuesdays, seven days apart, and each 09:00 UTC timestamp renders as 10:00 in Europe/Stockholm.
- Drafts are approximately 780–825 words each, or about four to five minutes' reading time using the site's existing calculation.
- No application code, sitemap, release version, or publication automation changed. Release bookkeeping is deferred until publication work; this document and active context track the editorial work.

## First-article approval validation

- Confirmed `published` is the accepted schema value and the approved article retains `2026-10-27T09:00:00.000Z` (Tuesday 10:00 CET).
- Confirmed the remaining three records stay drafts. The approved article's Markdown was not edited.
- Targeted metadata Biome check passes; all 10 existing tests pass after the status change.
- Live publication remains dependent on deployment. The date gate currently applies to indexes/feed, not single-post lookup; no stronger embargo is claimed.

## Deployment preparation — release 0.1.16

- Followed `C:/Users/nicol/.codeium/windsurf/global_workflows/commitprocess.md` through the windsurf-workflows skill. Nicolas's explicit commit/deployment authorization permits committing and pushing after its preparation steps.
- The pre-entry changelog had 598 lines, below the workflow's greater-than-600 rotation threshold; no rotation was needed before this entry. Recorded the previous release's actual merge commit, `d68965f96f6e038887cbcfdd3390fb445a37673d`.
- Only the first article is published; the remaining three are stored as drafts and are inaccessible via public loaders even after their proposed dates.
- Formatting, Ultracite fix, lint and typecheck pass. All 12 tests pass, including the exact 09:00 UTC release boundary and draft privacy after November 17.
- Production build passes, including Nitro Vercel packaging, after one retry of the known Windows public-asset chmod race. No dependency source patches or build workarounds were introduced.
- Regenerated the sitemap with the approved article. No approved Markdown text or social copy was changed by formatting.
- Built-site HTTP checks pass for home, About, static contact, blog/news indexes and an existing article. All four new article URLs correctly return 404 before release; feed has 27 existing items and CORS; retired newsletter remains 404. All-file private-key and Gitleaks scans pass.
- Fresh secret scans, production build, branch CI, preview deployment and post-merge production verification gate release. Final CI/deployment outcomes are recorded against the pushed commits on GitHub.

Commit: `feat(content): schedule approved AI maintenance post and protect drafts (I3Docs I3Fix I3Test)`

Refs: v0.1.16 I3Docs I3Fix I3Test ai-security-blog-series
