import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import readingTime from "reading-time";
import { PostSchema } from "./schemas";
import type { PaginatedPosts, Post, PostMeta, PostType } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const BLOG_DIR = path.join(CONTENT_DIR, "blog");
const NEWS_DIR = path.join(CONTENT_DIR, "news");

/**
 * Get content directory for a post type
 */
function getContentDir(type: PostType): string {
	return type === "blog" ? BLOG_DIR : NEWS_DIR;
}

/**
 * Load all JSON files from a directory
 */
function loadJsonFiles<T>(dir: string): T[] {
	if (!fs.existsSync(dir)) {
		return [];
	}

	const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
	const items: T[] = [];

	for (const file of files) {
		const filePath = path.join(dir, file);
		const content = fs.readFileSync(filePath, "utf-8");
		try {
			const parsed = JSON.parse(content);
			items.push(parsed);
		} catch {
			console.error(`Failed to parse ${filePath}`);
		}
	}

	return items;
}

/**
 * Load a single post by slug and type
 */
export function loadPost(slug: string, type: PostType): Post | null {
	const dir = getContentDir(type);
	const files = fs.existsSync(dir)
		? fs.readdirSync(dir).filter((f) => f.endsWith(".json"))
		: [];

	for (const file of files) {
		const filePath = path.join(dir, file);
		const content = fs.readFileSync(filePath, "utf-8");
		try {
			const post = JSON.parse(content);
			if (post.slug === slug) {
				// Validate with Zod
				const validated = PostSchema.parse(post);

				// Calculate reading time if not present
				if (!validated.readingTime) {
					const stats = readingTime(validated.body);
					validated.readingTime = Math.ceil(stats.minutes);
				}

				return validated;
			}
		} catch {
			console.error(`Failed to parse ${filePath}`);
		}
	}

	return null;
}

/**
 * Load all posts of a specific type
 */
export function loadPosts(type?: PostType): PostMeta[] {
	const posts: Post[] = [];

	if (!type || type === "blog") {
		const blogPosts = loadJsonFiles<Post>(BLOG_DIR);
		posts.push(...blogPosts);
	}

	if (!type || type === "news") {
		const newsPosts = loadJsonFiles<Post>(NEWS_DIR);
		posts.push(...newsPosts);
	}

	// Filter to published only, sort by date (newest first)
	const published = posts
		.filter((p) => p.status === "published")
		.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
		);

	// Return metadata only (exclude body)
	return published.map(
		({ body, bodyIsMarkdown, ...meta }): PostMeta => ({
			...meta,
			readingTime: meta.readingTime || Math.ceil(readingTime(body).minutes),
		})
	);
}

/**
 * Load paginated posts
 */
export function loadPaginatedPosts(
	type?: PostType,
	page = 1,
	perPage = 10
): PaginatedPosts {
	const allPosts = loadPosts(type);
	const total = allPosts.length;
	const totalPages = Math.ceil(total / perPage);
	const offset = (page - 1) * perPage;
	const posts = allPosts.slice(offset, offset + perPage);

	return {
		posts,
		pagination: {
			page,
			perPage,
			total,
			totalPages,
		},
	};
}

/**
 * Load featured/recent posts for home page
 */
export function loadFeaturedPosts(limit = 6): PostMeta[] {
	const posts = loadPosts();
	return posts.slice(0, limit);
}

/**
 * Load posts by tag
 */
export function loadPostsByTag(tag: string, type?: PostType): PostMeta[] {
	const posts = loadPosts(type);
	return posts.filter((p) => p.tags.includes(tag));
}

/**
 * Get all unique tags
 */
export function getAllTags(type?: PostType): string[] {
	const posts = loadPosts(type);
	const tagSet = new Set<string>();
	for (const post of posts) {
		for (const tag of post.tags) {
			tagSet.add(tag);
		}
	}
	return Array.from(tagSet).sort();
}

/**
 * Render markdown body to HTML
 */
export function renderMarkdown(markdown: string): string {
	return marked.parse(markdown, { async: false }) as string;
}

/**
 * Get post content as HTML (handles both markdown and HTML bodies)
 */
export function getPostHtml(post: Post): string {
	if (post.bodyIsMarkdown !== false) {
		return renderMarkdown(post.body);
	}
	return post.body;
}

/**
 * Get related posts (same type, shared tags)
 */
export function getRelatedPosts(post: Post, limit = 3): PostMeta[] {
	const allPosts = loadPosts(post.type);

	// Score posts by number of shared tags
	const scored = allPosts
		.filter((p) => p.slug !== post.slug)
		.map((p) => ({
			post: p,
			score: p.tags.filter((t) => post.tags.includes(t)).length,
		}))
		.sort((a, b) => b.score - a.score);

	return scored.slice(0, limit).map((s) => s.post);
}
