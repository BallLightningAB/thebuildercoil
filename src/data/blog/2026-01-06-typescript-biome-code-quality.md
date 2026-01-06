# Level Up Your TypeScript: Consistent Code Quality with Biome and Agentic Coding

I still often see skepticism about code quality and consistency for agentic coding, often not distinguishing it from vibe-coding. Critics argue that AI-generated code lacks the discipline and standards of human-written code. Today, I want to share how I maintain professional-grade code quality across my TypeScript codebase using Biome, the Ultracite preset, and thoughtful AI collaboration.

**Good code is good code and bad code is bad code, irrespective of whether a human or AI wrote it.**

## The Challenge: 39 Lint Errors and Inconsistent Patterns

Today began with a common scenario: a codebase with somewhat inconsistent TypeScript patterns. Running my linter revealed 39 violations of the `useConsistentTypeDefinitions` rule—some parts of the code used `type` for object shapes, others used `interface`. This inconsistency was partially cosmetic, but also affected readability, maintainability, and my ability to maintain standards.

```typescript
// Before: Inconsistent patterns
export type User = { name: string; age: number };
export interface Product { id: string; price: number };
export type Config = { theme: string };
```

For developers using AI assistance, this presents a perfect test case. Can I maintain high code quality standards while leveraging AI for development?

## Enter Biome: The Modern Toolchain

Biome is a fast, Rust-based toolchain that combines linting and formatting. But what makes it special for AI-assisted development is its ability to automatically fix most issues it detects. This creates a powerful feedback loop: AI writes code, Biome validates and fixes it, and I learn from the patterns.

### Setting Up Biome with Ultracite

I use the Ultracite preset—a strict Biome configuration that enforces best practices. Here's how I integrated it:

```json
{
  "extends": ["ultracite/core", "ultracite/remix"],
  "linter": {
    "rules": {
      "recommended": true,
      "style": {
        "useConsistentTypeDefinitions": "error"
      }
    }
  }
}
```

The Ultracite preset includes rules that:
- Enforce consistent type definitions
- Promote explicit TypeScript usage
- Encourage modern JavaScript patterns
- Maintain accessibility standards

## My AI-Human Collaboration Workflow

Here's how I turned those 39 errors into zero while maintaining productivity:

### 1. AI Generates Initial Code

Together with my AI assistant (Hubert) I have implemented features across my codebase, including:
- Contact form types
- GitHub API interfaces
- Newsletter service definitions
- UI component props

### 2. Biome Validates and Reports

Running `pnpm biome lint --write --unsafe` automatically:
- Identified all 39 violations
- Fixed them in place
- Maintained code functionality

### 3. I Review and Learn

Each fix taught me something:
- When to use `interface` (object shapes)
- When to use `type` (unions, utilities, primitives)
- Why consistency matters for maintainability

```typescript
// After: Consistent patterns
export interface User { name: string; age: number };
export interface Product { id: string; price: number };
export interface Config { theme: string };
```

## Beyond Auto-Fixes: Establishing Standards

The real value comes from establishing lasting standards. I added a new guideline to my project's coding standards:

```markdown
### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- **Type Definitions**: Use `interface` for object shapes and `type` for unions, intersections, utilities, and primitives. This provides better error messages, declaration merging capabilities, and follows Biome's `useConsistentTypeDefinitions` rule.
```

This documentation ensures that both I and my AI assistant follow the same patterns.

## Where AI Actually Shines

Here's what might surprise seasoned developers: AI assistance excels at maintaining code quality precisely because it's systematic and tireless. While experienced developers know the rules, they might cut corners under pressure or forget to apply them consistently. An AI assistant, when properly configured:

1. **Never forgets the rules** - Apply every lint rule, every time
2. **Scales effortlessly** - Maintain consistency across hundreds of files
3. **Learns from feedback** - Once corrected, applies the pattern everywhere
4. **Reduces cognitive load** - I focus on logic, not style

Consider the alternative: manually reviewing and fixing 39 violations across multiple files. The AI doesn't just write code—it helps me enforce standards at scale.

## Addressing the Skepticism

Let's tackle the common concerns about AI-assisted development:

### "AI Doesn't Understand Best Practices"

While AI models don't inherently know my project's standards, they excel at:
- Following explicit instructions
- Learning from examples
- Applying patterns consistently

The key is providing clear guidelines and using tools like Biome to enforce them.

### "AI-Generated Code Is Inconsistent"

Consistency comes from:
1. **Tooling**: Biome automatically enforces style rules
2. **Configuration**: presets like Ultracite define standards
3. **Iteration**: AI learns from feedback and corrections

### "You Can't Maintain Quality at Scale"

With automated tooling:
- Every commit is validated
- Fixes are applied automatically
- Standards evolve with the project

## Practical Tips for Developers

If you're using AI assistance in your development, here's how I maintain quality:

### 1. Start with Strict Tooling

```bash
pnpm add -D @biomejs/biome
pnpm biome init
# Configure with a strict preset like Ultracite
```

### 2. Integrate into Your Workflow

```json
{
  "scripts": {
    "lint": "biome lint",
    "format": "biome format --write",
    "check": "biome check --write"
  }
}
```

### 3. Use Pre-commit Hooks

```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: biome
        name: Biome
        entry: pnpm biome check --write
        language: system
        files: '\.(ts|tsx|js|jsx)$'
```

### 4. Document Your Standards

Create clear guidelines for both yourself and your AI assistant. Include examples of preferred patterns.

### 5. Review and Refine

Regularly review AI-generated code, provide feedback, and update your guidelines based on what works.

## The Results

After implementing this workflow:

- ✅ 0 lint errors
- ✅ Consistent type definitions across the entire codebase
- ✅ Clear documentation for future reference
- ✅ Automated quality checks
- ✅ Improved productivity

## Looking Forward

This experience demonstrates that AI-assisted development and code quality aren't opposing forces. With the right tooling and processes, they complement each other:

- **AI** accelerates development
- **Biome** ensures consistency
- **I** provide direction and judgment

## Conclusion

The narrative that AI can't produce high-quality code is outdated. The reality is that AI-assisted development, when combined with modern tooling like Biome and thoughtful processes, can actually elevate code quality standards.

What matters isn't whether code is written by humans or AI, but whether it meets your project's standards. With tools like Biome and presets like Ultracite, those standards are enforceable, measurable, and maintainable—regardless of who (or what) writes the initial code.

The future of development isn't human vs AI; it's human + AI + better tools.

And for seasoned developers? Here's the real insight: AI doesn't replace your expertise—it amplifies it. You define the standards, and the AI ensures they're applied everywhere, every time. That's not just convenient; it's a superpower.

**Normally these lint errors would have been noticed earlier, but I had installed Biome only locally in the repo and not globally, which means that only files actually opened are checked. That's an easy mistake to make, but it's exactly the kind of thing that tooling like Biome can catch automatically, once you have it correctly set up. Make sure to use the same version locally and globally to avoid conflicts!**
