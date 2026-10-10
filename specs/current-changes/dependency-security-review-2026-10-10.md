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

Subsequent PR outcomes and deployment verification will be recorded as they complete.
