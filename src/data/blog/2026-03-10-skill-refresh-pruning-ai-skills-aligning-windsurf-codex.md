# Skill Refresh: Why I Cleaned Up My AI Skills Library Before It Slowed Me Down

On March 9, I spent part of the day doing the kind of work nobody sees directly, but that quietly improves every future build session: I reviewed my AI skill stack, cut the overlap, refreshed the pieces worth keeping, and then standardized how Windsurf and Codex share instructions.

It started as a skills review. It ended up becoming an operational cleanup for how I work at Ball Lightning AB.

---

## The problem was not "too few skills." It was too much drift.

I had accumulated a healthy library of local AI skills under `/agents/skills`. On paper, that sounds great. More skills should mean better output, assuming they are used correctly.

In practice, it had started to drift:

- Some skills were genuinely high-value and specific
- Some were stale relative to March 2026 documentation
- Some were too generic to justify their context cost
- Some overlapped so heavily that they competed with each other
- Some vendor-provided skills existed in both namespaced and top-level installs

That combination creates a subtle problem. The AI still works, but the system around it gets noisier. It becomes harder to know which instruction set should win, which skill is actually current, and which one is just taking up space because I installed it months ago.

That is exactly the kind of operational entropy I try to eliminate in my projects.

Add to it that skills can effectively render your LLM "dumber" by providing too many options, conflicting instructions or outdated information.

## What I reviewed

I reviewed `47` skill files and treated them as active pieces of infrastructure, not just prompt snippets.

Three were excluded from the main audit because I had already updated or authored them recently. That left `44` skills in scope.

I scored them against four simple questions:

1. Does this add durable value beyond a strong base model?
2. Is it current enough for March 2026?
3. Is it lean and structured like a real agent skill?
4. Is it distinct enough to deserve its own trigger surface?

That framing helped me make better decisions quickly. Instead of asking, "Is this skill good?" I asked, "Is this skill still worth the operational cost of keeping it installed?"

## What stayed, what changed, and what I cut

The strongest skills were the ones with local or ecosystem-specific value:

- `mcp-builder`
- the TanStack skills
- the Resend family
- `mobile-optimization`
- `mobile-responsiveness`
- `react-performance`

Those are the skills that can genuinely outperform general model memory because they encode a repeatable way of working, a current API surface, or a product-specific stack.

The weakest cluster was the generic marketing and CRO set. A few were solid, but too many were narrow siblings of the same core idea. That meant more triggers, more overlap, and more maintenance than the library really needed.

So I cleaned it up.

### Skills I refreshed

I refreshed the keeper set where currentness mattered most:

- `schema-markup`
- `seo-audit`
- `react-performance`
- `react-email`
- `mcp-builder`
- `tanstack-start-best-practices`
- `tanstack-query-best-practices`
- `tanstack-router-best-practices`
- `tanstack-integration-best-practices`

I also rewrote `social-content` as a more platform-native operator skill and promoted `page-cro` into the main umbrella CRO skill instead of letting too many adjacent skills compete for the same job.

### Skills I archived

I archived `11` skills that were either too generic, too overlapping, or mostly wrappers around stronger skills:

- `find-skills`
- `marketing-ideas`
- `marketing-psychology`
- `launch-strategy`
- `performance-audit-workflow`
- `web-design-guidelines`
- `form-cro`
- `popup-cro`
- `signup-flow-cro`
- `onboarding-cro`
- `paywall-upgrade-cro`

That left me with a much sharper active set.

## The real lesson: local skills are infrastructure

This review changed how I think about skills.

I do not see them as nice-to-have prompt add-ons anymore. I see them as part of the operating system for AI-assisted development.

A good skill should do at least one of these things:

- encode a workflow I want repeated consistently,
- capture local knowledge that a base model cannot reliably infer,
- or keep me aligned with a current ecosystem that changes too fast for memory alone.

A weak skill does the opposite. It adds noise. It duplicates obvious knowledge. It increases maintenance without increasing leverage.

That is why pruning matters just as much as adding.

## The second step was standardizing Windsurf and Codex

Once the skills were in better shape, the next problem became obvious: the tools themselves still had mismatched configuration models.

Windsurf and Codex share a lot conceptually, but they do not expose the exact same primitives in the exact same way.

So I standardized the parts that *should* be shared and adapted the parts that should not.

### What I standardized directly

At the repo level, I moved to a shared root `AGENTS.md`. That gives both IDEs one workspace entry point for instructions.
More and more IDEs are adopting this pattern, so it makes sense to standardize on it.

At the global level, I kept Windsurf's native `global_rules.md` as the canonical source, then linked Codex's global `AGENTS.md` to it. That means I now update one global file and both tools stay aligned.

### What I adapted instead of forcing

Windsurf workflows and plan files do not map one-to-one to Codex features.

So instead of pretending a symlink would solve everything, I added small Codex-native bridge skills:

- a `plan` skill that uses `C:\Users\nicol\.windsurf\plans`
- a `windsurf-workflows` skill that resolves repo workflows first and global workflows second

That was the right choice because it respects the actual product models:

- rules and instructions can be shared directly
- workflows and plans need translation into each tool's native extension model
- Windsurf remains my home base and main source of truth

This is a pattern I will reuse when I integrate Cline next.

## Why this matters beyond one cleanup session

The obvious result is a tidier skills folder.

The more important result is lower cognitive overhead:

- fewer overlapping triggers
- clearer sources of truth
- better odds that the AI uses the right instruction set
- less time wondering whether a workflow is current, duplicated, or misplaced

This kind of cleanup rarely looks exciting from the outside and can feel unproductive. But it compounds. Every future session starts from a cleaner system.

That is the kind of leverage I care about most.

## What I am keeping from this process

If I had to compress the whole exercise into one principle, it would be this:

**share instruction files directly when the tools support the same concept, and bridge behavior through native extensions when they do not.**

That principle helped me avoid a brittle setup and gave me something better:

- one shared workspace instruction file,
- one shared global rule source,
- a cleaner active skill library,
- and a clearer path for integrating more tools later.

## How did I do it?

This was a great usecase for having added Codex to my workflow.
Since I already use OpenAI Plus, Codex is free to use within certains limitations that I don't surpass using it as my secondary IDE.
This meant that I didn't have to use my monthly included Windsurf credits and still could use GPT-5.4 Codex X-High, the best model for the task at hand.

I was able to use it to:

- Review the skills folder and identify which skills were still relevant
- Identify which skills were stale or outdated
- Identify which skills were too generic to justify their context cost
- Identify which skills were too similar to each other
- Identify which skills were vendor-provided and existed in both namespaced and top-level installs

Cline can also be set up to use your existing OpenAI API key, so you can use it without any additional cost, assuming you have one of the paid plans.

## What comes next

The immediate next step is simple: keep using `AGENTS.md` for repo-level instructions, keep using Windsurf's `global_rules.md` as the canonical global file, and continue treating local skills as infrastructure that needs maintenance, not just accumulation.

After that, I want to apply the same thinking to Cline.

Because the goal is not to collect AI tools.

The goal is to make them work together cleanly enough that they actually improve how I build.

---

If you are building with multiple AI coding tools yourself, this is probably worth doing sooner than you think. A smaller, sharper skill library and a clearer instruction model will usually buy you more than another month of unmanaged growth.
