/**
 * Content Loader - Server-side
 *
 * Uses Vite's import.meta.glob to statically import content at BUILD TIME.
 * This bundles all JSON/MD files into the JavaScript, making it work
 * seamlessly on serverless platforms like Vercel.
 *
 * See: https://vite.dev/guide/features#glob-import
 */

import { marked } from "marked";
import { PostSchema } from "./schemas";
import type { Post, PostCodeBlock, PostMeta, PostType } from "./types";

// ============================================================================
// Static content imports using Vite's glob import
// These are resolved at BUILD TIME and bundled into the application
// ============================================================================

// Import all blog JSON files
const blogJsonModules = import.meta.glob<{ default: unknown }>(
	"../../data/blog/*.json",
	{ eager: true }
);

// Import all blog markdown files (as raw strings)
const blogMdModules = import.meta.glob<string>("../../data/blog/*.md", {
	eager: true,
	query: "?raw",
	import: "default",
});

// Import all news JSON files
const newsJsonModules = import.meta.glob<{ default: unknown }>(
	"../../data/news/*.json",
	{ eager: true }
);

// Import all news markdown files (as raw strings)
const newsMdModules = import.meta.glob<string>("../../data/news/*.md", {
	eager: true,
	query: "?raw",
	import: "default",
});

// ============================================================================
// Helper functions
// ============================================================================

const WORD_SPLIT_REGEX = /\s+/;
const WORDS_PER_MINUTE = 200;
const LEADING_HEADING_PATTERN = /^#\s+(.+?)\s*$/m;
const LEADING_BLANK_LINE_PATTERN = /^\s*\n/;
const INFO_SPLIT_REGEX = /\s+/;

function calculateReadingTime(text: string): number {
	const words = text.trim().split(WORD_SPLIT_REGEX).length;
	return Math.ceil(words / WORDS_PER_MINUTE);
}

function renderMarkdownWithCodeBlocks(body: string): {
	html: string;
	codeBlocks: PostCodeBlock[];
} {
	const codeBlocks: PostCodeBlock[] = [];
	const renderer = new marked.Renderer();

	renderer.code = ({ text, lang }) => {
		const infoString = (lang ?? "").trim();
		const [languagePart, filenamePart] = infoString.split(INFO_SPLIT_REGEX, 2);
		const language = languagePart ?? "";
		const baseFilename = filenamePart ?? "";
		const indexLabel = codeBlocks.length + 1;
		const filename = baseFilename || `snippet-${indexLabel}`;
		const normalizedCode = text.endsWith("\n") ? text.slice(0, -1) : text;
		const index = codeBlocks.length;

		codeBlocks.push({ language, filename, code: normalizedCode });

		return `\n<div class="not-prose my-6" data-post-code-block="${index}"></div>\n`;
	};

	const html = marked.parse(body, { async: false, renderer }) as string;
	return { html, codeBlocks };
}

export function stripLeadingTitleHeading(title: string, body: string): string {
	const match = body.match(LEADING_HEADING_PATTERN);
	if (!match) {
		return body;
	}
	const headingText = match[1]?.trim();
	if (headingText !== title.trim()) {
		return body;
	}
	const start = match.index ?? 0;
	const end = start + match[0].length;
	const after = body.slice(end).replace(LEADING_BLANK_LINE_PATTERN, "");
	return body.slice(0, start) + after;
}

// ============================================================================
// Content loading functions
// ============================================================================

function getModules(type: PostType) {
	return type === "blog"
		? { json: blogJsonModules, md: blogMdModules }
		: { json: newsJsonModules, md: newsMdModules };
}

function getMarkdownContent(
	bodyFile: string | undefined,
	type: PostType
): string | undefined {
	if (!bodyFile) {
		return;
	}

	const { md } = getModules(type);
	// Find the matching markdown file
	for (const [filePath, content] of Object.entries(md)) {
		if (filePath.endsWith(bodyFile)) {
			return content;
		}
	}
	return;
}

function buildPost(
	data: unknown,
	type: PostType
): { post: Post; html: string; codeBlocks: PostCodeBlock[] } | null {
	const validated = PostSchema.parse(data);

	// Resolve body from external markdown file if provided
	const externalMd = getMarkdownContent(validated.bodyFile, type);
	const resolvedBody = externalMd ?? validated.body;

	if (!validated.readingTime) {
		validated.readingTime = calculateReadingTime(resolvedBody);
	}

	validated.body = resolvedBody;

	const sourceBody =
		validated.bodyIsMarkdown !== false
			? stripLeadingTitleHeading(validated.title, resolvedBody)
			: resolvedBody;

	if (validated.bodyIsMarkdown === false) {
		return { post: validated, html: sourceBody, codeBlocks: [] };
	}

	const rendered = renderMarkdownWithCodeBlocks(sourceBody);
	return {
		post: validated,
		html: rendered.html,
		codeBlocks: rendered.codeBlocks,
	};
}

/**
 * Load a single post by slug
 */
export function loadPostInternal(
	slug: string,
	type: PostType
): { post: Post; html: string; codeBlocks: PostCodeBlock[] } | null {
	const { json } = getModules(type);

	for (const [, module] of Object.entries(json)) {
		try {
			const data = (module as { default: unknown }).default;
			const result = buildPost(data, type);
			if (result?.post.slug === slug) {
				return result;
			}
		} catch (e) {
			console.error("Failed to parse post:", e);
		}
	}

	return null;
}

/**
 * Load all posts, optionally filtered by type
 */
export function loadPostsInternal(type?: PostType): PostMeta[] {
	const posts: Post[] = [];

	const loadFromModules = (
		modules: Record<string, { default: unknown }>,
		postType: PostType
	) => {
		for (const [, module] of Object.entries(modules)) {
			try {
				const data = module.default;
				const result = buildPost(data, postType);
				if (result) {
					posts.push(result.post);
				}
			} catch (e) {
				console.error("Failed to parse post:", e);
			}
		}
	};

	if (!type || type === "blog") {
		loadFromModules(blogJsonModules, "blog");
	}

	if (!type || type === "news") {
		loadFromModules(newsJsonModules, "news");
	}

	const now = Date.now();
	const published = posts
		.filter((p) => {
			if (p.status !== "published") {
				return false;
			}
			const publishedTime = new Date(p.publishedAt).getTime();
			return !Number.isNaN(publishedTime) && publishedTime <= now;
		})
		.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
		);

	return published.map(
		({ body, bodyIsMarkdown, ...meta }): PostMeta => ({
			...meta,
			readingTime: meta.readingTime || calculateReadingTime(body),
		})
	);
}
