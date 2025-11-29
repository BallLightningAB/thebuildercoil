# Chronomation: Key Architecture Decisions

Chronomation is the engine that powers [The Builder Coil](/news/the-builder-coil-is-live). It's a multi-tenant content platform designed to turn raw work artifacts into structured blog posts and social content. Here are the key architecture decisions we made.

## Multi-Tenant from Day One

We designed Chronomation to be multi-tenant from the start. Every table has a `tenant_id` column. Every query is scoped. This adds complexity upfront but makes scaling to multiple customers straightforward.

```sql
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  channel_id uuid NOT NULL REFERENCES channels(id),
  slug text NOT NULL,
  -- ...
  UNIQUE (tenant_id, channel_id, slug)
);
```

## Database: Neon + Drizzle

### Why Neon?

- **Serverless scaling**: No connection pool management headaches
- **Branching**: Test migrations on branches before production
- **Cost**: Pay for what you use

Neon is our database host of choice for Chronomation. Learn more at [neon.tech](https://neon.tech).

### Why Drizzle?

- **Type safety**: Schema types flow through your entire app
- **SQL-like**: Feels like writing SQL, not fighting an ORM
- **Lightweight**: Minimal runtime overhead

You can read more in the [Drizzle ORM docs](https://orm.drizzle.team/).

```typescript
const posts = await db
  .select()
  .from(blogPosts)
  .where(and(
    eq(blogPosts.tenantId, tenantId),
    eq(blogPosts.status, 'published')
  ))
  .orderBy(desc(blogPosts.publishedAt));
```

## Content Ingestion

Chronomation ingests content from multiple sources:

1. **GitHub**: Commits, changelogs, releases
2. **Email**: Via [Resend](https://resend.com) inbound webhooks
3. **Manual**: Notes entered in the admin UI built with [shadcn/ui](https://ui.shadcn.com)

Each source creates "feed items" that can later be combined into blog posts.

## What's Next

In future posts, we'll cover:

- The AI-assisted content generation pipeline
- Social sharing automation
- The admin UI built with [shadcn/ui](https://ui.shadcn.com)

Follow along as we build Chronomation in public. 🔧