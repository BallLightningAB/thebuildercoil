import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { PostSchema } from "./schemas";
import type { Post, PostCodeBlock, PostMeta, PostType } from "./types";

// Simple reading time calculation
const WORD_SPLIT_REGEX = /\s+/;
const WORDS_PER_MINUTE = 200;

// Heading stripping helpers (top-level regex for performance)
const LEADING_HEADING_PATTERN = /^#\s+(.+?)\s*$/m;
const LEADING_BLANK_LINE_PATTERN = /^\s*\n/;

// Simple fenced code block matcher for markdown bodies
// Matches ```lang [filename]\n...code...```
const FENCED_CODE_BLOCK_REGEX = /```([^\n`]*)\n([\s\S]*?)```/g;
const INFO_SPLIT_REGEX = /\s+/;

function calculateReadingTime(text: string): number {
	const words = text.trim().split(WORD_SPLIT_REGEX).length;
	return Math.ceil(words / WORDS_PER_MINUTE);
}

function extractCodeBlocksFromMarkdown(body: string): PostCodeBlock[] {
	const blocks: PostCodeBlock[] = [];
	FENCED_CODE_BLOCK_REGEX.lastIndex = 0;
	let match: RegExpExecArray | null = FENCED_CODE_BLOCK_REGEX.exec(body);

	while (match !== null) {
		const infoString = (match[1] ?? "").trim();
		const [languagePart, filenamePart] = infoString.split(INFO_SPLIT_REGEX, 2);
		const language = languagePart ?? "";
		const baseFilename = filenamePart ?? "";
		const indexLabel = blocks.length + 1;
		const filename = baseFilename || `snippet-${indexLabel}`;
		const code = match[2] ?? "";

		blocks.push({ language, filename, code });
		match = FENCED_CODE_BLOCK_REGEX.exec(body);
	}

	return blocks;
}

function buildPostFromFileContent(
	content: string,
	slug: string,
	filePath: string
): { post: Post; html: string; codeBlocks: PostCodeBlock[] } | null {
	const parsed = JSON.parse(content);
	const validated = PostSchema.parse(parsed);
	if (validated.slug !== slug) {
		return null;
	}
	// Resolve body from optional external markdown file if provided
	const resolvedBody = validated.bodyFile
		? fs.readFileSync(
				path.isAbsolute(validated.bodyFile)
					? validated.bodyFile
					: path.join(path.dirname(filePath), validated.bodyFile),
				"utf-8"
			)
		: validated.body;

	if (!validated.readingTime) {
		validated.readingTime = calculateReadingTime(resolvedBody);
	}

	// Ensure callers always see the fully resolved body
	validated.body = resolvedBody;

	const sourceBody =
		validated.bodyIsMarkdown !== false
			? stripLeadingTitleHeading(validated.title, resolvedBody)
			: resolvedBody;
	const html =
		validated.bodyIsMarkdown !== false
			? (marked.parse(sourceBody, { async: false }) as string)
			: sourceBody;
	const codeBlocks =
		validated.bodyIsMarkdown !== false
			? extractCodeBlocksFromMarkdown(sourceBody)
			: [];

	return { post: validated, html, codeBlocks };
}

function getContentDir(type: PostType): string {
	const contentDir = path.join(process.cwd(), "content");
	return type === "blog"
		? path.join(contentDir, "blog")
		: path.join(contentDir, "news");
}

function loadJsonFilesInternal<T>(dir: string): T[] {
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

export function stripLeadingTitleHeading(title: string, body: string): string {
	const match = body.match(LEADING_HEADING_PATTERN);
	if (!match) {
		return body;
	}
	const headingText = match[1]?.trim();
	if (headingText !== title.trim()) {
		return body;
	}
	// Remove the matched heading line and any immediate following blank line(s)
	const start = match.index ?? 0;
	const end = start + match[0].length;
	const after = body.slice(end).replace(LEADING_BLANK_LINE_PATTERN, "");
	return body.slice(0, start) + after;
}

export function loadPostInternal(
	slug: string,
	type: PostType
): { post: Post; html: string; codeBlocks: PostCodeBlock[] } | null {
	const dir = getContentDir(type);
	const files = fs.existsSync(dir)
		? fs.readdirSync(dir).filter((f) => f.endsWith(".json"))
		: [];

	for (const file of files) {
		const filePath = path.join(dir, file);
		const content = fs.readFileSync(filePath, "utf-8");
		try {
			const result = buildPostFromFileContent(content, slug, filePath);
			if (result) {
				return result;
			}
		} catch (e) {
			console.error(`Failed to parse ${filePath}`, e);
		}
	}

	return null;
}

export function loadPostsInternal(type?: PostType): PostMeta[] {
	const posts: Post[] = [];

	if (!type || type === "blog") {
		const blogDir = getContentDir("blog");
		const blogPosts = loadJsonFilesInternal<Post>(blogDir);
		posts.push(...blogPosts);
	}

	if (!type || type === "news") {
		const newsDir = getContentDir("news");
		const newsPosts = loadJsonFilesInternal<Post>(newsDir);
		posts.push(...newsPosts);
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
