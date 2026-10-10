import { afterEach, expect, it, vi } from "vitest";
import { loadPostInternal, loadPostsInternal } from "./loader-server";
import { PostSchema } from "./schemas";

afterEach(() => vi.useRealTimers());

it("validates every content record and resolves its Markdown body", () => {
	const records = import.meta.glob<{ default: unknown }>(
		"../../data/{blog,news}/*.json",
		{ eager: true },
	);
	for (const record of Object.values(records)) {
		const metadata = PostSchema.parse(record.default);
		const loaded = loadPostInternal(metadata.slug, metadata.type);
		expect(loaded?.post.body.trim().length).toBeGreaterThan(0);
		expect(loaded?.post.body).not.toBe(metadata.bodyFile);
		expect(loaded?.post.readingTime).toBeGreaterThan(0);
		for (const [index, block] of (loaded?.codeBlocks ?? []).entries()) {
			expect(loaded?.html).toContain(`data-post-code-block="${index}"`);
			expect(block.code.length).toBeGreaterThan(0);
		}
	}
});

it("excludes drafts and future publications and sorts newest first", () => {
	vi.useFakeTimers();
	vi.setSystemTime(new Date("2026-07-10T12:00:00Z"));
	const posts = loadPostsInternal();
	const dates = posts.map((post) => Date.parse(post.publishedAt));
	expect(posts.length).toBeGreaterThan(0);
	for (const post of posts) {
		expect(post.status).toBe("published");
		expect(Date.parse(post.publishedAt)).toBeLessThanOrEqual(Date.now());
		expect(post).not.toHaveProperty("body");
	}
	expect(dates).toEqual([...dates].sort((a, b) => b - a));
	vi.setSystemTime(new Date("2000-01-01T00:00:00Z"));
	expect(loadPostsInternal()).toEqual([]);
});

it("returns null for an unknown slug", () => {
	expect(loadPostInternal("missing-post", "blog")).toBeNull();
});
