# The Memory Bank: Theory, Practice, and Agentic Pair Programming

Earlier in my Agentic Coding Journey I coming back to the same problem when building solo (or in a tiny team): **context leaks**.

- Code evolves.
- Decisions get made.
- “Why did we do it this way?” fades.
- Then you return two weeks later and either re-derive the same conclusions… or ship a regression.

Now add AI coding agents to the mix and the failure mode becomes sharper: *the agent can be extremely competent at local reasoning, but it can’t hold your product’s long-term intent unless you teach it*. That’s what my **memory-bank** is for.

This post documents:

- The theory behind a memory-bank.
- How it works in practice in The Builder Coil.
- How it differs from an older revision I used earlier today on **jorild.se**.
- The prompting patterns that make it actually usable.

---

## What a memory-bank is (for me)

A memory-bank is **structured, versioned project context** that sits next to the code and can be read and updated continuously.

It’s not documentation “for the sake of documentation”. It’s documentation *as operational leverage*.

I want three outcomes:

1. **Decision persistence**: the reason behind a change survives the sprint.
2. **Planning continuity**: work can be resumed without re-triage.
3. **Agent alignment**: an AI pair programmer gets the same constraints I’m carrying in my head.

---

## The core loop: plan → implement → reconcile

The loop I try to enforce is:

1. Plan work in a structured format.
2. Implement changes.
3. Update the memory-bank so the plan and reality converge.

This is especially important for tasks that are deceptively small but highly cross-cutting (SEO, schema markup, deployment fixes, content loader refactors).

In practice, that means I always try to keep:

- A single “what’s active now” file.
- A changelog that records *what shipped*.
- A place to store implementation plans (current vs archived).

---

## The Builder Coil memory-bank (the newer template)

In this repo, the memory-bank lives under:

- `specs/memory-bank/active-context.yaml`
- `specs/memory-bank/CHANGELOG.yaml`
- `specs/current-changes/` (work-in-progress plans)
- `specs/archived-changes/` (completed plans)
- `specs/future-changes/` (future and optional plans)

The key design choice is the **ID-based tracking system**.

An “issue” (often mirroring a GitHub issue) has deliverables like:

- `I6D1`
- `I6D2`
- `I6D3`

This makes three things easier:

- You can talk about work with precision (no vague “we did the SEO thing”).
- You can link changelog entries to specific deliverables.
- You can summarize progress without rewriting history.

---

## How the memory-bank helped this specific SEO/schema work

This week’s schema work is a good example of why I like the system.

The task was not just “add JSON-LD”. It was:

- Audit what already existed.
- Add missing schema on listing pages.
- Refine semantics (`NewsArticle` vs `BlogPosting`).
- Add a global root-level entity graph so AI/search can connect:
  - Ball Lightning AB (org)
  - The Builder Coil (website)
  - Chronomation (product)

Because the memory-bank forces explicit deliverables, it’s hard to accidentally stop halfway.

It also creates a clean story that can be reused later when Chronomation automates this content and needs the same metadata contracts.

---

## jorild.se vs The Builder Coil: why the TBC version wins

Earlier today, I used a slightly different memory-bank structure on jorild.se.

It works, but The Builder Coil version is the one I want to standardize going forward because:

- It has clearer separation between *active plan* and *archived record*.
- The ID system makes the changelog and roadmap mechanically consistent.
- It is easier for an AI agent to navigate:
  - “What is the current state?”
  - “What was recently completed?”
  - “What is planned next?”

That last point matters a lot when you use agentic tooling daily.

---

## Prompting pattern: give the agent structure, then enforce reconciliation

Here’s a representative prompt style (based on the jorild.se example), which I often reuse as a template:

```text
My prompt (using SWE-1.5 + Opus 4.5 (Planning):
I've already updated the meta version of @package.json, but not of @activeContext.md.
Let's add a small update to @activeContext.md for our work adding internal shortlinks using Cloudflare Redirects, internally saved to ops\redirects\bulk-redirects.csv.
Run /commitprocess and prepare to commit.
Let's also create and subsequently close a small issue to track this as this is a small but important addition.
Please also create a separate issue for the Backlog, moving from Prettier to Biome, which is our standard formatting/linting solution starting with the The Builder Coil project.
```

The critical part isn’t the model choice.

The critical part is that the prompt:

- Names specific files.
- Defines explicit outcomes.
- Requires a final reconciliation step.

That last step is what keeps an agent from shipping code that “works” but leaves the project state incoherent.

---

## What I’m optimizing for long-term

The memory-bank is not a perfect system.

But it’s a system that scales down (solo dev) and up (small team), and it integrates naturally with:

- GitHub issues
- PRs
- changelogs
- repeatable workflows like `/commitprocess`

Most importantly: it’s the bridge between *product intent* and *code changes*.

And that bridge is exactly what agentic development needs.

---

## Next: making it a Chronomation feature

Chronomation’s original purpose was always to turn work artifacts (commits, notes, issues, emails) into narrative content.

A memory-bank is essentially a structured “work artifact stream” already.

Long-term, I want Chronomation to:

- ingest these memory-bank updates,
- propose diffs,
- and publish coherent narrative updates (blog posts, changelog summaries, release notes)

…without losing the precision that makes the memory-bank valuable.

*The initial inspiration for my Memory Bank Process is the Cline Memory Bank and it has evolved over the past six months based on that*