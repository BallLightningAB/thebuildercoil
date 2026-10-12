# Dependency PR security review — 2026-10-10

Sequence: #57 (grouped security updates), #55/#56 (verify superseded fixes), #37 (Shiki), #35 (Lucide).

## PR #57

- Reviewed dependency changes and all five open PRs, including existing inline review findings.
- Refreshed browserslist, js-yaml, shell-quote and source-map-js transitives; added bounded overrides for patched esbuild and postcss-selector-parser because their parents constrain older vulnerable versions.
- Added content and card regression tests: all metadata validates, Markdown resolves, code-block placeholders survive, drafts/future posts are filtered, ordering is descending, English publication dates and blog/news destinations render correctly.
- Made Gitleaks failures blocking and added Node 24 CI for frozen installation, typecheck, lint, tests and production build.
- Local validation: frozen install, typecheck, lint and 5 tests pass. Production build passes after retrying the known Windows Nitro public-asset chmod race. Biome emits an existing configuration deprecation notice.
- Localization scope: the site is English-only (`en-US` dates); no Paraglide, locale routing or translations exist.
- Audit: zero critical, moderate or low findings; one high finding remains in `braces@3.0.3` through Ultracite -> fast-glob -> micromatch. GHSA-vfj7-8cjw-p6xm has no patched release. This is development tooling over repository-controlled paths, with no request-time use. Avoid untrusted glob patterns; revisit when upstream publishes a fix. Not dismissed or suppressed.
- No application translations, published copy or retired newsletter functionality are reintroduced.
- Vercel blocked the first updated deployment for CVE-2026-102989, which was absent from the registry audit. Upgraded React Start to 1.168.61 and verified start-server-core resolves to 1.169.40 (patched minimum 1.169.39). Aligned Router packages to avoid duplicate incompatible route types. Source: https://tanstack.com/blog/tanstack-start-security-update-cve-2026-102989.

## PRs #55 and #56

Closed as superseded after #57 merged: Vitest 4.1.11 and baseline-browser-mapping 2.11.25 are installed and tested. All 13 original GitHub Dependabot alerts cleared after the merge. #57 preview and production deployments passed; production feed returns 27 items.

## PR #37

Rebased onto the verified #57 merge, removed the invalid compatibility alias, and installed matching shiki/@shikijs/transformers 4.5.0 with the updated lockfile. Added three tests covering client highlighting, light/dark themes, diff/highlight annotations, server highlighting and script-text escaping. Typecheck, lint, all eight tests and production build pass locally. Audit still has only the unpatched development-tooling braces finding described above.

Fresh GitHub validation, secret scanning, Vercel preview and production deployments passed. Waited for main checks and production deployment to complete before rebasing #35. Correction: direct preview HTTP requests followed redirects to Vercel authentication; their 200 responses did not verify application content. Local built-site checks verified application routes; production checks verify deployed content separately.

## PR #35

Rebased onto the verified #37 merge. Current main already contains the custom brand icons, so retained main's Header/About implementations and resolved away the stale closing-tag deletion and old copy. The application code diff is empty; only the Lucide dependency/lockfile changes remain. Lucide resolves to 1.55.0. Typecheck, lint, eight regression tests and production build pass locally. Updated memory-bank release tracking to 0.1.15.

## Continuation — 2026-10-12

Lucide's validation, secret scan and Vercel preview deployment passed on the final code. Preview page requests require Vercel authentication; direct preview page-content checks are not counted as application verification. GitHub currently reports zero open Dependabot alerts. A new grouped update, #58, opened during the interval and is queued after #35.
