# Shipping API Dojo v2: What I'm Building and Why

I'm rebuilding Shipping API Dojo. Not because the v1 is broken—it works fine as a reference site—but because I want it to be more than that.

The direction I'm heading toward is a platform that can deliver randomized, gamefied, repeatable learning experiences. That means content families, seeded randomization, and a full auth/billing/email/domain stack. It's a substantial rebuild, and issue #5 (https://github.com/BallLightningAB/shipping-api-dojo/issues/5) is the umbrella issue tracking the whole chain.

The visible goal is straightforward: expand to 20 lessons, 20 drill families, and 20 scenario families. But the real constraint is how to get there without breaking what already works.

## The 20/20/20 curriculum target

The numbers are straightforward: 20 lessons, 20 drill families, 20 scenario families.
It's a very extensive curriculum, but it's doable and it leaves room for growth.

- 20 lessons covering REST and SOAP APIs across major carriers
- 20 drill families with stronger explanations and stronger distractors
- 20 scenario families through a deeper scenario-family direction

But the biggest work isn't just writing more content. It's restructuring how content exists.

The content-family model means lessons, drills, and scenarios exist as families with stable IDs and run variants. That's what makes seeded randomization possible without breaking progress tracking—if I complete drill-family-abc, that completion survives whether I saw variant-3 or you saw variant-5.

## Minimum viable randomization

The biggest technical shift in v2 is randomization.

v1 has fixed answer orders and fixed drill sequences. That works for reference, but it doesn't work well for practice—if the correct answer is always in slot C, users learn the pattern, not the concept.

v2 introduces minimum viable randomization at three levels:

- MCQ answer order: the correct answer is no longer fixed in one slot
- Lesson drill order: drills shuffle within a lesson based on a seed
- Arena scenario order: scenarios shuffle based on a seed

The key is that this is seeded, not chaotic. Same seed, same order. Different seed, different order. That's what makes progress tracking stable while still giving users varied practice.

Higher-value randomization—review modes, shareable certificates, challenge modes—is tracked separately in issue #10. I'm focusing on the minimum viable version first.

I very purposefully avoid any AI usage at this point, as I want to build a solid foundation first and want to avoid unnecessary running costs.

## The content-family data model

Content families are the structural backbone of v2.

Instead of monolithic lesson files, I'm moving to a model where:

- Lessons, drill families, and scenario families have stable IDs
- Each family can have multiple run variants
- Progress maps to family IDs, not specific runs
- The model is future-compatible with TanStack AI content generation

This is a significant shift from v1. It means more upfront structure in exchange for more flexibility down the line. It also means I can migrate incrementally—compatibility adapters let old and new content coexist during the transition.

## The auth, billing, and email foundation

v2 is also the moment Shipping API Dojo becomes a real product, not just a public resource.

That means:

- Better Auth for user accounts, sessions, and organization management
- Neon Postgres with Drizzle ORM for server-authoritative progress tracking
- Creem as the merchant of record for billing and entitlements
- A dedicated Resend account and domain for transactional email
- The shipping.apidojo.app production hostname under the apidojo.app umbrella

The access model follows a clear progression: anonymous sample → signed-in free → Pro (→ Enterprise planned). The public repo remains AGPL-3.0-only, but trademarks and premium materials stay outside the public repo once they become proprietary assets.

## SEO-first and SSR-visible

One constraint that doesn't change in v2 is the SEO requirement.

Lessons, wiki pages, and directory surfaces must remain crawlable and SSR-visible. The domain cutover to shipping.apidojo.app is planned as a controlled site move, not an ad hoc rename.

That means randomization has to be implemented carefully. The primary lesson content stays SSR-visible. Only the parts that truly need runtime seeds—answer orders, drill sequences—randomize on the client or in authenticated contexts.

## The implementation chain

This umbrella issue tracks the overall direction, but the actual work happens through linked sub-issues:

- Issue #7: Technical scoping for content families, seeded randomization, and gated progress
- Issue #11: Auth, entitlements, billing, email, and domain foundation
- Issue #8: Proof of concept for content families, seeded randomization, and deeper scenarios
- Issue #9: Full content migration and expansion to 20 lessons, 20 drill families, and 20 scenario families
- Issue #17: Cost-efficient browser smoke suite for checkpoint validation

Each issue in the chain maximizes automated testing coverage while still using browser-control validation where route or auth behavior requires it. The goal is a foundation that's both robust and resumable—implementation can pause and resume without losing momentum.

## What's next

The v2 rebuild is already in progress. The technical scoping and auth foundation are complete. The proof of concept validated the content-family model and seeded randomization approach. Full content migration is underway.

The remaining work is straightforward in concept but substantial in execution: migrate the remaining lessons to the content-family model, expand to the 20/20/20 target, and validate that the whole system holds together under real usage.

This is the kind of rebuild that only happens once. The foundation I'm building now—content families, seeded randomization, auth/billing/email/domain—will determine how Shipping API Dojo can grow for years to come.

<!--
## Hero Image Ideas

### Option 1: Architectural foundation diagram

A clean, layered diagram showing the v2 stack: TanStack Start at the top, content-family data models in the middle, Neon Postgres + Drizzle below that, Better Auth + Creem billing at the infrastructure layer, with shipping.apidojo.app as the domain label. Scandinavian design, warm neutrals with teal accents, precise and technical but approachable.

### Option 2: 20/20/20 curriculum visualization

A more editorial composition: three columns showing 20 lesson cards, 20 drill family cards, and 20 scenario family cards, with subtle randomization arrows and seed icons scattered between them. The content-family concept visualized as grouped cards with stable IDs. Less technical, more product-focused.

## Image Prompt

Editorial technology illustration, wide blog hero image, Shipping API Dojo v2 architecture presented as a clean layered diagram, TanStack Start at the application layer, content-family data models with stable IDs, Neon Postgres and Drizzle ORM, Better Auth for authentication, Creem for billing, Resend for email, shipping.apidojo.app domain label, Scandinavian design sensibility, warm neutrals with teal accents, precise and structured, no vendor logos, no gibberish text, architectural clarity over chaos

## Screenshot Idea

Create a composite screenshot showing the GitHub issue #5 umbrella view with its linked sub-issues (#7, #8, #9, #11, #17), overlaid with small visual callouts: one showing the content-family data model structure from the technical scoping, one showing the Better Auth + Creem integration from the auth foundation, and one showing the 20/20/20 curriculum target. That tells the whole story in one image: the umbrella issue, the technical foundation, and the curriculum goal.
-->
