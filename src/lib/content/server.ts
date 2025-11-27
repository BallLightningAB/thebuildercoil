import { createServerFn } from "@tanstack/react-start";
import { loadPostInternal, loadPostsInternal } from "./loader-server";
import type { PostType } from "./types";

// Server function to load a single post
export const getPost = createServerFn({ method: "GET" })
	.inputValidator((input: { slug: string; type: PostType }) => input)
	.handler(({ data }) => {
		return loadPostInternal(data.slug, data.type);
	});

// Server function to load all posts
export const getPosts = createServerFn({ method: "GET" })
	.inputValidator((input: { type?: PostType }) => input)
	.handler(({ data }) => {
		return loadPostsInternal(data.type);
	});

// Server function to get related posts
export const getRelatedPosts = createServerFn({ method: "GET" })
	.inputValidator(
		(input: { slug: string; type: PostType; limit?: number }) => input
	)
	.handler(({ data }) => {
		const { slug, type, limit = 3 } = data;
		const postResult = loadPostInternal(slug, type);
		if (!postResult) {
			return [];
		}

		const currentTags = postResult.post.tags;
		const allPosts = loadPostsInternal(type);

		// Calculate related scores
		const scored = allPosts
			.filter((p) => p.slug !== slug)
			.map((p) => ({
				post: p,
				score: p.tags.filter((t) => currentTags.includes(t)).length,
			}))
			.sort((a, b) => b.score - a.score);

		return scored.slice(0, limit).map((s) => s.post);
	});

// Server function to get featured posts
export const getFeaturedPosts = createServerFn({ method: "GET" })
	.inputValidator((input: { limit?: number }) => input)
	.handler(({ data }) => {
		const { limit = 6 } = data;
		const posts = loadPostsInternal();
		return posts.slice(0, limit);
	});
