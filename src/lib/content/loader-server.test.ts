import { afterEach, expect, it, vi } from "vitest";
import {
	loadPostInternal,
	loadPostsInternal,
	loadPublishedPostInternal,
} from "./loader-server";
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

it("releases the approved article at 10:00 CET in public lookup and indexes", () => {
	vi.useFakeTimers();
	const slug = "keeping-side-projects-secure-with-ai";
	vi.setSystemTime(new Date("2026-10-27T08:59:59.999Z"));
	expect(loadPublishedPostInternal(slug, "blog")).toBeNull();
	expect(loadPostsInternal("blog").some((post) => post.slug === slug)).toBe(
		false,
	);

	vi.setSystemTime(new Date("2026-10-27T09:00:00.000Z"));
	expect(loadPublishedPostInternal(slug, "blog")?.post.slug).toBe(slug);
	expect(loadPostsInternal("blog").some((post) => post.slug === slug)).toBe(
		true,
	);
});

it("keeps unapproved drafts private after their proposed dates", () => {
	vi.useFakeTimers();
	vi.setSystemTime(new Date("2026-11-18T12:00:00Z"));
	for (const slug of [
		"ai-agent-access-needs-maintenance",
		"deleting-features-side-project-maintenance",
		"clean-security-scan-one-piece-of-evidence",
	]) {
		expect(loadPostInternal(slug, "blog")?.post.status).toBe("draft");
		expect(loadPublishedPostInternal(slug, "blog")).toBeNull();
		expect(loadPostsInternal().some((post) => post.slug === slug)).toBe(false);
	}
});
