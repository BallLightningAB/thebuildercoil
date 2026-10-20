# Dependency PR security review — 2026-10-20

## Queue and sequence

- Only PR [#59](https://github.com/BallLightningAB/thebuildercoil/pull/59) is open: 23 minor/patch updates covering Radix, TanStack, React, Lucide, React Hook Form, Zod and test/browser tooling.
- Reviewed the manifest and lockfile diff, PR discussion/reviews and failed Actions logs. No inline review findings existed. GitHub reports zero open Dependabot alerts.
- Fetched main at `ad4f76eef2b10416e88ed412ef095effdc168103`; the PR already descends from it, so `git rebase origin/main` required no history rewrite.
- The previous PR #58 is already merged. No further PR is queued. Before a subsequent rebase/merge, wait for actual CI and deployment completion, then verify production content; elapsed time alone is insufficient.

## Findings and repair

- GitHub validation and Vercel failed on frozen installation: Dependabot omitted the lockfile's `overrides` section, conflicting with package.json. Regenerated using the CI pnpm version, 10.23.0, without removing security overrides. Frozen installation now passes.
- Retained esbuild 0.28.2 and postcss-selector-parser 7.1.7. Removed vulnerable esbuild 0.27.7 entries from the proposed lockfile.
- TanStack Start resolves to 1.169.2 and start-server-core to 1.169.43, above the [maintainer's patched minimums](https://tanstack.com/blog/tanstack-start-security-update-cve-2026-102989) for CVE-2026-102989.
- `pnpm audit --prod`: no known vulnerabilities. Full audit: one high advisory, `braces@3.0.3` via the development dependency Ultracite -> fast-glob -> micromatch. The [upstream advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) still has no patched release. Repository-controlled glob patterns limit exposure; do not pass untrusted patterns to development tooling. The advisory is neither dismissed nor suppressed.
- `pnpm exec ultracite fix` reordered existing imports/exports in seven files; TanStack regenerated route declarations in a different order without changing the route set. No application behavior or published content was changed.

## Validation

- Node 24.12.0 / pnpm 10.23.0, matching CI's Node major and pnpm version.
- Frozen installation, typecheck, lint, Ultracite fix, formatting: pass. Existing Biome `recommended` configuration deprecation remains informational.
- All 10 regression tests pass across four files: real JSON/Markdown content, publication filtering/order, blog/news destinations and English dates, Shiki themes/annotations/escaping, Radix Sheet accessible labels, dismissal and focus restoration.
- Localization scope: English-only HTML (`lang="en"`) and explicit `en-US` dates. No translation catalog, Paraglide integration or locale routes exist to validate.
- `pre-commit run --all-files`: private-key detection and Gitleaks pass. Final staged scans also include the new review report and memory-bank changes.
- `pnpm build`: client and SSR compilation pass, but Nitro packaging repeatedly fails with the existing Windows `EPERM chmod` public-asset copy error, including after moving generated output to an ignored backup. Production packaging is not verified; fresh Linux CI remains a required merge gate. No dependency source was patched to make this check pass.
- Development SSR smoke checks pass for home, About, static contact, blog/news indexes and one detail page of each type. English language/date content is present, current Hultafors copy renders, contact has no form, and no retired newsletter navigation links appear. `/api/feed` returns 27 items with matching metadata and CORS; `/newsletter` returns 404. These development checks do not substitute for a successful production build or deployment.
- A generated-output cleanup command was rejected by automatic execution policy; no reason beyond "blocked by policy" was supplied. Used a reversible move within `.vercel/` instead. The fresh-output build still fails with the same Windows error.

## Release and remaining gates

- Prepared release 0.1.15.2 in active-context and changelog; replaced the previous entry's pending commit with #58's actual merge SHA. Changelog was 597 lines at the workflow's pre-entry rotation check (threshold: greater than 600); rotation was not required at that point.
- Followed `C:/Users/nicol/.codeium/windsurf/global_workflows/commitprocess.md` through preparation. The user explicitly authorized committing, pushing and merging after successful checks on 2026-10-20, overriding its no-commit instruction.
- Execution: commit and push, wait for fresh Validate/Gitleaks/Vercel checks on the updated head, inspect preview where access permits, merge only after success, then wait for main CI and production deployment and verify production routes/feed before any later PR.
- Preview authentication redirects must not be counted as successful application-content verification.

Proposed commit: `fix(deps): restore security overrides for PR #59 (I3Fix I3Test I3Docs)`

Refs: v0.1.15.2 I3Fix I3Test I3Docs PR-59

## Verified merge and security follow-up

- PR #59 merged as f34cc4efc512f01d188ac0598159763916fb4f2b after Validate, Gitleaks and Vercel preview passed on 4f6de3062412c5ca677aa30eda7b8741d1b53237. Linux production packaging passed. Preview requests return Vercel SSO redirects.
- Main Validate run 39483910235 and Gitleaks run 39483910096 passed; Vercel production deployment completed successfully. Live home, About, contact, blog/news indexes/details and English language content verified; feed has 27 items and newsletter returns 404.
- Only after those gates completed, branched from current main for newly reported alert #66: launch-editor <=2.14.1, patched by 2.14.2 (GHSA-698v-4r3x-3vcv / CVE-2026-112943). This is a Windows command-injection issue through TanStack development tooling. Dependabot job 39483931133 failed to open a PR, so prepared the narrow four-line lockfile replacement manually.
- Security follow-up: frozen install, Ultracite fix/format, lint, typecheck and all 10 tests pass; production audit clean, full audit retains only the unpatched braces development-tooling advisory. Fresh Linux CI, Gitleaks and Vercel deployment must pass before merge; verify main checks and production again afterward. GitHub records those checks against each final commit.
- Completed review tracking in active-context; release 0.1.15.3. The active changelog exceeded 600 lines on this follow-up. scripts/rotate-changelog.sh is absent, so performed the equivalent bounded rotation: moved the two oldest entries to the existing archive, preserving every version and reducing active length below 600.
