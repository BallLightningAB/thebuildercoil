# Restructuring Documentation for a Multi-Brand Ecosystem

Preparing the rebuild of my company site I was faced with lagging documentation. The original plan when starting with Chronomation+The Builder Coil was to create a core for Chronomation and then create the blog site showcasing it, but I quickly realized that order was in fact counter-productive, as I wanted to cover the whole process.

The Builder Coil went live in December and while I was partly busy with other projects I felt that my company site needed a rebuild. It was already outdated even though it was only half a year old. My understanding for web design had grown quickly in that time. I also needed to add both coverage of my recent work, change the design to be more of a company site and less of a portfolio site and thirdly I needed to make the site Sell my Services.

I had during this time also come to the conclusion that I wanted a common esthetic for my company and brands. This resulted in a documentation drift as I was both creating an "Optional Visual Refresh" plan for The Builder Coil, which I had launched without the final design additions I wanted to make, and fleshing out the ecosystem design in a shared document.

That brings us to this week.

As I began planning the rebuild of https://balllightning.cloud I needed to completely restructure my documentation concerning system architecture and design. Proper documentation is always important, but it's of the utmost importance when you're doing agentic development. Bad preparation generates some combination of poor design, bad code, a subpar user experience and suboptimal conditions for future work on that code. I would go as far as to say that for someone like me who can read code, but not write it all myself, it's even more important.

Here's what I did this week. Rebuilding the company site starts next.

## The Documentation Drift Problem

When you're building multiple related projects simultaneously, documentation has a tendency to diverge. Each repository wants its own Product Definition Document (PDD), its own architecture notes, its own design guidelines. Before I knew it, I had:

- Design tokens duplicated across repositories
- Architecture decisions documented in three different places
- Typography scales that were *almost* but not quite the same
- Color schemes that needed manual synchronization

This wasn't sustainable. Worse, it was counter to my goal of creating a cohesive brand identity across Ball Lightning AB, The Builder Coil, and Chronomation.

## The Solution: A Shared Brand System Repository

I created the [**Ball Lightning Brand System**](https://github.com/BallLightningAB/brand-system) repository—a public, canonical source of truth for everything shared across my ecosystem.

This repository now contains three core documents:

### 1. Shared Ecosystem PDD (`shared-ecosystem-pdd.yaml`)

This defines the product vision, team structure, and high-level goals for the entire Ball Lightning ecosystem. Instead of repeating context in every project, each project-specific PDD now simply references this document:

```yaml
pdd:
  meta:
    name: "The Builder Coil — PDD"
    ecosystem_reference: "shared-ecosystem-pdd.yaml#meta.ecosystem"
    repos_reference: "shared-ecosystem-pdd.yaml#meta.repos"
```

### 2. Shared Architecture (`shared-architecture.yaml`)

All common architecture patterns, technology stack decisions, and infrastructure policies live here. This includes:

- Tech stack specifications per project
- Media hosting strategy (currently Phase 1 static files, Phase 2 will be Chronomation-managed CDN)
- Video strategy and embedding guidelines
- Email infrastructure and sending domain configuration
- Authentication and authorization patterns (for when I need them)

Each project references specific sections:

```yaml
architecture:
  reference: "shared-architecture.yaml#architecture"

media_hosting_strategy:
  reference: "shared-architecture.yaml#architecture.media_hosting_strategy"
```

### 3. Shared Design System (`shared-design-system.yaml`)

This is where the magic happens for visual consistency. The design system includes:

- **Typography scales**: A modular type scale using a major third ratio (1.25) with carefully selected Google Fonts (Montserrat for headings, Lora for body, JetBrains Mono for code)
- **Color schemes**: Brand-specific accent gradients while sharing the same dark "arcane terminal" foundation
- **Layout patterns**: Hero sections, card interactions, and content hierarchy guidelines
- **Component guidelines**: Button states, navigation patterns, and form styling
- **Background patterns**: The signature grid/carbon pattern with animated hover states

Here's an example of how The Builder Coil references the typography system:

```yaml
visual_refresh_spec:
  references:
    shared_design_system:
      file: "shared-design-system.yaml"
      sections:
        typography: "brand_system.design.shared.typography"
        color_schemes: "brand_system.design.shared.color_schemes"
        layout_patterns: "brand_system.design.shared.layout_patterns"
```

## Refactoring Process

The actual refactoring involved several steps:

### Step 1: Extract Common Patterns

I reviewed all existing documentation across The Builder Coil repository and my Ball Lightning site planning notes. Anything that appeared in multiple places became a candidate for extraction.

### Step 2: Create the Brand System Repository

I initialized a new public repository at `github.com/BallLightningAB/brand-system` and structured it with clear, reference-able YAML documents. Public transparency is important to me—just like thebuildercoil and the upcoming balllightning site, this repository is open for anyone to learn from.

### Step 3: Slim Down Project PDDs

The Builder Coil's PDD went from being a monolithic document to a focused, project-specific file that defers to the brand system for shared concerns:

```yaml
pdd:
  meta:
    purpose: >-
      This document is the Product Definition Document (PDD) for The Builder
      Coil, a public builder's log for Ball Lightning AB.
      It's used in conjunction with the shared-ecosystem-pdd.yaml,
      shared-architecture.yaml and shared-design-system.yaml documents
      that define the shared architecture, system policies and design system.
```

### Step 4: Update All References

I updated README.md and all internal documentation to reference the new shared system:

```markdown
📚 Shared Brand System
This project is part of the Ball Lightning AB ecosystem and shares 
architecture, policies, and design systems with other projects. 
See the [Ball Lightning Brand System](https://github.com/BallLightningAB/brand-system) 
for shared resources:
- [Shared Ecosystem PDD](.../shared-ecosystem-pdd.yaml)
- [Shared Architecture](.../shared-architecture.yaml)
- [Shared Design System](.../shared-design-system.yaml)
```

### Step 5: Move Optional Visual Refresh

The `optional-visual-refresh.yaml` specification initially lived in The Builder Coil repository, then I moved it to the brand system repository, and finally brought it back to The Builder Coil as `specs/future-changes/optional-visual-refresh.yaml`. Why the journey?

The visual refresh is specific to implementing the shared design system *in The Builder Coil*, so it belongs in this repository. While doing the refactoring it helped greatly to stay in one repository. It now heavily references the shared design system as its source of truth. This is the right separation of concerns: the design tokens live centrally, the implementation plan lives with the implementing project.

## Benefits I'm Already Seeing

**Single Source of Truth**: When I update the typography scale, all projects that reference it stay in sync. My ambition is to refactor all projects as changes are made to the shared design system, maintaining notes on which aren't yet updated. This is critical to maintain a living record of the state of all projects in the ecosystem.

**Faster Onboarding**: Whether it's an AI coding assistant or a future collaborator, pointing to one repository gives complete context.

**Clearer Boundaries**: Each project's PDD is now focused on what makes *that project* unique, not repeating shared context. PDDs also should be technical, but focus on 

**Public Accountability**: Having the brand system public means I can't cut corners on documentation quality.

**Easier Iteration**: When I initiate the rebuild of balllightning.cloud tomorrow, I won't be copying and adapting—I'll be referencing and implementing.

## The Technology Stack Decision

All of this is documented in YAML rather than in code or a visual design tool. Why?

1. **Version Control**: Changes are trackable with git, reviewable, and revertable
2. **LLM-Friendly**: AI coding assistants can parse and understand YAML documentation effectively
3. **Reference-able**: Using path references like `shared-design-system.yaml#brand_system.design.shared.typography` creates a clear contract
4. **Human-Readable**: YAML is approachable for technical and non-technical collaborators

This approach aligns with my philosophy of treating documentation as first-class code.

## PDD vs Architecture vs Design System decision guide
- **PDD (shared-ecosystem-pdd.yaml)**: Why, who, what.
  - Vision, objectives, personas, scope.
  - Product/brand definitions.
  - References to architecture/design.
- **Architecture (shared-architecture.yaml)**: How, where, deployment.
  - Tech stack, tenancy model, data model, routes.
  - Media/video strategy, email architecture.
  - Non-functional, env vars, implementation plan.
- **Design System (shared-design-system.yaml)**: Visual and interaction standards.
  - Tokens, typography, palettes, component guidance.
  - Cross-brand policies and precedence.

It's helpful to think of the PDD as the "why" of the project, the architecture as the "how" and the design system as the "what".
This is more for the human in the equation than the LLM, but equally important.

## What's Next

Next, I start rebuilding balllightning.cloud using the same TanStack Start + React 19 stack as The Builder Coil. But this time, instead of discovering design patterns as I go, I'm implementing from a complete design system.

The builder's log continues. The brand system is ready.

## Related Reading

For a deeper dive into why documentation becomes MORE important with AI assistance, not less, check out my follow-up article: [Documentation: The Unsung Hero of Modern Software Development](/blog/documentation-unsung-hero-modern-software-development). There, I explore how structured documentation serves as the interface between human intent and AI execution, drawing from my experience in Systems Design and IT Project Management.

## File Structure Overview

For those curious, here's what the brand-system repository structure looks like:

```
brand-system/
specs/
├── LICENSE
├── README.md
├── shared-architecture.yaml
├── shared-design-system.yaml
├── shared-ecosystem-pdd.yaml
└── TRADEMARKS.md
```

Simple, focused, and powerful.

---

**Update**: The [Ball Lightning Brand System](https://github.com/BallLightningAB/brand-system) repository is public, just like [The Builder Coil](https://github.com/BallLightningAB/thebuildercoil) and the upcoming [Ball Lightning](https://github.com/BallLightningAB/balllightning) site. Feel free to explore how I structure multi-brand design systems and learn from (or critique) my approach.
