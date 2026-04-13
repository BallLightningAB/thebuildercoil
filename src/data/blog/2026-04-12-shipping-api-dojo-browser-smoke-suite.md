# Browser Smoke Suite: Cost-Efficient Route Validation for Shipping API Dojo v2

As issue #9 (full content migration) progressed deeper into the content-family migration, random spot checks were no longer sufficient as the only browser-level protection. I needed a durable smoke layer.

Issue #17 added a minimal, cost-efficient browser smoke suite using Playwright Test. The goal: complement existing unit/integration coverage without introducing high maintenance cost or broad CI/runtime expense.

This is how I built a smoke suite that's cheap to run, easy to extend, and reusable for future mirror sites.

## Why now: the checkpoint validation need

The content-family migration in issue #9 is substantial. Lessons are being converted to the new model. Drills are being shuffled. Scenarios are being restructured.

Random spot checks were fine early in the migration. But as the work progressed, I needed systematic route-level validation. I needed to know that:

- Core routes still render correctly
- Auth flows work end-to-end
- Randomization doesn't break SSR
- The site remains functional through each migration wave

The smoke suite provides that checkpoint validation. Run it at each wave boundary, and I get confidence that the migration hasn't broken the visible surfaces.

## The scope: minimal but representative

The smoke suite is intentionally narrow. It's not a full end-to-end test suite. It's a smoke layer—quick, focused, route-level validation.

The scope:

- Use Playwright Test with a single Chromium project by default
- Keep traces and screenshots only for retries or failures
- Add a dedicated `pnpm browser-test` script that's easy to run locally
- Smoke-test the current SSR/browser-visible surfaces:
  - Home page
  - Learn track hubs
  - One representative lesson flow
  - Arena landing/open flow
  - Wiki page
  - Directory page

That's it. No deep auth/billing end-to-end coverage. No full cross-browser matrix by default. No screenshot golden testing for content-heavy pages.

The focus is route-level regressions and core user-visible flows. The unit/integration tests cover the logic. The smoke suite covers the routes.

## The Playwright configuration

The implementation uses Playwright Test with a single Chromium project. That's the default—fast, reliable, and sufficient for smoke testing.

Key configuration decisions:

- Single Chromium project: avoids cross-browser matrix overhead
- Traces/screenshots only on failure: reduces CI storage cost
- Dedicated `pnpm browser-test` script: makes it easy to run at checkpoints
- Test structure designed for extension: future mirror sites can add their own smoke tests without cloning a large suite

The test structure is modular. Each surface has its own test file. Adding a new surface is a matter of adding a new test file, not rearchitecting the suite.

## The test surfaces

The smoke suite covers six core surfaces:

**Home page**: Validates that the landing page renders correctly, navigation works, and core CTAs are functional.

**Learn track hubs**: Validates that track listing pages render, track cards display correctly, and track navigation works.

**Representative lesson flow**: Validates that a lesson page renders, drills shuffle based on seed, MCQ answers randomize, and progress tracking works. This is the critical test for the content-family migration.

**Arena landing/open flow**: Validates that the arena landing page renders and the arena open flow initiates correctly.

**Wiki page**: Validates that wiki pages render correctly and internal wiki navigation works.

**Directory page**: Validates that the carrier/service directory renders and filtering works.

These six surfaces represent the core user-visible flows. If they work, the site is fundamentally functional. If they don't, the migration has broken something critical.

## Out of scope: what we deliberately avoided

The smoke suite deliberately avoids several things to keep it cost-efficient:

- Full cross-browser matrix: Chromium is sufficient for smoke testing. Cross-browser can be added later if needed.
- Screenshot golden testing: content-heavy pages change frequently. Golden tests would be high-maintenance.
- Deep auth/billing end-to-end coverage: those flows are covered by integration tests. The smoke suite validates route-level behavior, not full user journeys.
- AI/browser tooling as the primary regression layer: the smoke suite is deterministic and fast. AI tooling can complement it, not replace it.

These out-of-scope decisions are deliberate. They keep the suite maintainable and fast.

## The acceptance criteria

The smoke suite met four acceptance criteria:

1. Browser smoke suite runs locally with one documented command: `pnpm browser-test`
2. Suite passes against the current Wave 2 app state
3. README documents when to use the suite and how it fits with the existing test stack
4. Active-context and local current-changes artifacts are updated so the work is resumable

The README is important. It documents the purpose of the suite, when to run it (at issue checkpoints), and how it complements the existing unit/integration coverage. That documentation makes the suite maintainable by anyone, not just the original author.

## Future mirror sites

The smoke suite is designed with future mirror sites in mind. The planned EDI site under the API Dojo umbrella will need the same kind of route-level validation.

The test structure is easy to extend. A mirror site can:

- Add its own surface-specific test files
- Reuse the existing Playwright configuration
- Run its own `pnpm browser-test` command
- Benefit from the same cost-efficient approach

This means the investment in the smoke suite pays off across multiple products, not just Shipping API Dojo.

## How it fits with the existing test stack

The smoke suite doesn't replace the existing test stack. It complements it.

- Unit tests: cover individual functions, helpers, and data transformations
- Integration tests: cover API endpoints, database operations, and service boundaries
- Browser smoke suite: covers route-level behavior and core user-visible flows

Each layer has its purpose. The smoke suite is the layer that validates "the site still works from a user's perspective" without the overhead of full end-to-end testing.

## What this enables

With the smoke suite in place, the content migration in issue #9 has a reliable checkpoint validation mechanism. Each wave can end with a smoke suite run. If it passes, the migration can continue. If it fails, the regression is caught early.

The smoke suite also provides confidence for domain cutover and other infrastructure changes. Before pointing shipping.apidojo.app at the new infrastructure, run the smoke suite. If it passes, the cutover is safe.

## The cost-efficiency principle

The guiding principle throughout was cost-efficiency. Not cost-cutting—cost-efficiency.

The smoke suite provides high value for low cost:

- Fast to run: seconds to minutes, not hours
- Easy to maintain: narrow scope, clear purpose
- Cheap in CI: Chromium only, traces only on failure
- Reusable across products: designed for mirror sites from the start

That's the sweet spot for a smoke suite. Enough coverage to be useful, narrow enough to be sustainable.

<!--
## Hero Image Ideas

### Option 1: Playwright test runner dashboard

A clean, technical dashboard showing the Playwright test runner with six test results passing: home, learn track hubs, lesson flow, arena, wiki, directory. Small status indicators, pass/fail badges, and a runtime summary. Scandinavian design, warm neutrals with teal accents, precise and test-focused.

### Option 2: Smoke layer visualization

A more abstract visualization: a layered diagram showing unit tests at the bottom, integration tests in the middle, and the browser smoke suite as a thin layer on top protecting the core routes. Small icons representing each test surface. Less literal dashboard, more about the test layering concept.

## Image Prompt

Editorial technology illustration, wide blog hero image, browser smoke suite presented as a clean Playwright test runner dashboard, six test results showing home learn track hubs lesson flow arena wiki directory all passing, small status indicators and pass badges, runtime summary showing fast execution, Scandinavian design sensibility, warm neutrals with teal accents, precise and test-focused, no vendor logos, no gibberish text, test clarity over chaos

## Screenshot Idea

Create a composite screenshot showing the Playwright test runner output with all six smoke tests passing, overlaid with small visual callouts: one showing the pnpm browser-test script from package.json, one showing the test file structure for the six surfaces, and one showing the README documentation for when to run the suite. That tells the whole story in one image: the passing test results, the easy-to-run command, the test structure, and the documentation.
-->
