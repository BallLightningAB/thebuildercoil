import { z } from "zod";

/**
 * Zod schemas for content validation
 * These match the TypeScript types in types.ts
 */

export const PostTypeSchema = z.enum(["blog", "news"]);
export const PostStatusSchema = z.enum(["draft", "published", "archived"]);

export const PostSchema = z.object({
	id: z.string().min(1),
	slug: z
		.string()
		.min(1)
		.regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
	title: z.string().min(1).max(200),
	type: PostTypeSchema,
	summary: z.string().min(1).max(500),
	body: z.string().min(1),
	bodyIsMarkdown: z.boolean().optional().default(true),
	heroImage: z.string().url().optional(),
	heroImageAlt: z.string().optional(),
	tags: z.array(z.string()).default([]),
	author: z.string().min(1),
	authorAvatar: z.string().url().optional(),
	status: PostStatusSchema,
	publishedAt: z.string().datetime(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
	readingTime: z.number().positive().optional(),
	projectSlug: z.string().optional(),
});

export const PostMetaSchema = PostSchema.omit({
	body: true,
	bodyIsMarkdown: true,
});

export const PostInputSchema = PostSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export const ContentManifestSchema = z.object({
	posts: z.array(
		z.object({
			id: z.string(),
			slug: z.string(),
			type: PostTypeSchema,
			title: z.string(),
			publishedAt: z.string(),
		})
	),
	lastUpdated: z.string().datetime(),
});

// Type exports for runtime validation
export type PostSchemaType = z.infer<typeof PostSchema>;
export type PostMetaSchemaType = z.infer<typeof PostMetaSchema>;
