# Dependency PR security review — 2026-10-26

## Queue and sequence

- Only [PR #61](https://github.com/BallLightningAB/thebuildercoil/pull/61) was open: nine updates to Hook Form resolvers, TanStack Router/Start/plugins, Lucide, Biome, baseline-browser-mapping and Vite. No unresolved review comments or submitted reviews existed.
- Fetched main at `ea2e55234c36b3959a7f369bdf38efb503cb2627`; the PR already descends from that merge, so rebase made no history changes. Previous PR #60's main CI, production deployment and live-content verification completed in the October 20 session.
- Before any subsequent PR: require fresh checks and preview deployment on this final head, merge, then wait for main CI and production deployment and verify live content. Waiting for actual completion takes precedence over an arbitrary delay.

## Findings and repairs

- Initial GitHub Validate failed during frozen installation with `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH`. The proposed lockfile omitted package.json's bounded esbuild/postcss-selector-parser overrides. Regenerated with CI's pnpm 10.23.0 while retaining both overrides; frozen installation passes.
- Preserved patched esbuild 0.28.2, postcss-selector-parser 7.1.7 and launch-editor 2.14.2. TanStack Start is 1.169.4 and start-server-core 1.169.45, above the [maintainer's patched versions](https://tanstack.com/blog/tanstack-start-security-update-cve-2026-102989). Lockfile regeneration also resolves Rolldown 1.2.15 within the existing constraints.
- Biome 2.6.2 cannot load the previous `nursery.useSortedClasses` key. Ran the official migration: use `useTailwindSortedClasses` and `preset: "recommended"`. This also removes the old preset deprecation notice.
- Biome 2.6 newly formats Markdown included by the existing source glob. Restored the formatter's changes to published posts and explicitly disabled Markdown formatting, preserving prior behavior. No published copy, route code or content metadata changes are included.
- `pnpm audit --json` and `pnpm audit --prod`: zero vulnerabilities, no muted advisories. GitHub reports zero open Dependabot alerts.
- The previously documented [braces advisory GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) was withdrawn upstream on October 23, 2026. Historical review reports remain unchanged; this dated report supersedes their outstanding-risk statement. No advisory was dismissed or suppressed by this work.

## Validation

- Node 24.12.0 / pnpm 10.23.0. Frozen install, Ultracite fix, formatting, lint and typecheck pass on the final configuration.
- All 10 tests across four files pass: actual content schemas/Markdown/publication filtering, English card dates and destinations, syntax themes/annotations/HTML escaping, and accessible Sheet dismissal/focus restoration.
- Production `pnpm build` passes locally, including Nitro Vercel packaging with Node 24. Existing dependency `use client` bundler warnings are nonblocking. No local dependency source patches were introduced.
- Built-site preview passes home, About, static contact, blog/news indexes and one detail route of each type, including English HTML/date content and current Hultafors copy. Feed returns 27 items with consistent metadata and CORS; retired newsletter returns 404. Contact has no form and navigation has no newsletter link.
- Localization remains English-only (`lang="en"`, explicit `en-US` dates); no translation catalogs or locale routing exist.
- All-file and final staged private-key/Gitleaks hooks pass; YAML parsing and release synchronization checks pass. GitHub Validate, Gitleaks and Vercel checks must pass on the updated head before merge. Preview SSO redirects are not counted as application-content verification.

## Release workflow

- Followed `C:/Users/nicol/.codeium/windsurf/global_workflows/commitprocess.md` through the windsurf-workflows skill. The user's earlier authorization to commit, push and merge remains in force.
- Release 0.1.15.4 updates active-context and changelog; previous release 0.1.15.3 now references #60's actual merge SHA. The pre-entry changelog was 585 lines, below the greater-than-600 rotation threshold.
- Proposed commit: `fix(deps): repair PR #61 and migrate Biome 2.6 configuration`.

Refs: v0.1.15.4 I3Fix I3Biome I3Test I3Docs PR-61
