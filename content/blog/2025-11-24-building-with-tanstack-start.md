# Building with TanStack Start: First Impressions

When we started building [The Builder Coil](/news/the-builder-coil-is-live), we had a choice to make: Next.js, Remix, Astro, or something newer. We chose **[TanStack Start](https://tanstack.com/start)** – and here's why.

## Why TanStack Start?

### Type-Safe Routing

[TanStack Router](https://tanstack.com/router) provides fully type-safe routing out of the box. Every link, every parameter, every loader – all typed. No more runtime errors from typos in route paths.

```typescript
// This won't compile if the route doesn't exist
<Link to="/blog/$slug" params={{ slug: post.slug }}>
  {post.title}
</Link>
```

### File-Based with Flexibility

Like Next.js, TanStack Start uses file-based routing. But it also gives you the flexibility to define routes programmatically when needed.

### Server Functions

Server functions in TanStack Start feel natural. They're just async functions that run on the server, with full access to Node.js APIs.

```typescript
export const serverFn = createServerFn()
  .validator(z.object({ email: z.string().email() }))
  .handler(async ({ data }) => {
    // This runs on the server
    await sendEmail(data.email);
    return { success: true };
  });
```

## The Learning Curve

Honestly, the documentation is still catching up with the features. We spent time reading source code and examples. But the Discord community is helpful, and the patterns make sense once you understand them.

## What's Next

We'll be sharing more about our TanStack Start setup in future posts, including:

- SEO and meta tag management
- Server-side data loading patterns
- Integration with [shadcn/ui components](https://ui.shadcn.com)

For a deeper dive into the backend side of Chronomation, see
[Chronomation: Key Architecture Decisions](/blog/chronomation-architecture-decisions).

Stay tuned! 🚀