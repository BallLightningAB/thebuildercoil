# Building with TanStack Start: First Impressions

When I started building [The Builder Coil](/news/the-builder-coil-is-live), I had a choice to make: Next.js, Remix, Astro, or something newer. I chose **[TanStack Start](https://tanstack.com/start)** – and here's why.

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

Like Next.js, TanStack Start uses file-based routing. It also gives you the flexibility to define routes programmatically when needed.

### Server Functions

Server functions in TanStack Start feel natural. They're just async functions that run on the server, with full access to Node.js APIs.
The biggest thing though is that Tanstack Start is Isoporphic be design, so all functions are available on the client and server, unless specified otherwise.

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

Honestly, the documentation is still catching up with the features. I spent time reading source code and examples. But the Discord community is helpful, and the patterns make sense once you understand them.
There is also a lot of content on Tanstack Start as it's very popular with a lot of opensource support.
While LLMs are inherently worse with all frameworks than Next.js since that's historically so popular and thus have the most training data, with MCPs like Context7 your LLM can keep up-to-date with the latest documentation and best practices.

## What's Next

I'll be sharing more about my TanStack Start setup in future posts, including:

- SEO and meta tag management
- Server-side data loading patterns
- Integration with [shadcn/ui components](https://ui.shadcn.com)

For a deeper dive into the backend side of Chronomation, see
[Chronomation: Key Architecture Decisions](/blog/chronomation-architecture-decisions).

Stay tuned! 🚀