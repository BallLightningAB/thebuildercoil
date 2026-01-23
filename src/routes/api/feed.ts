import { createFileRoute } from "@tanstack/react-router";
import { loadPostsInternal } from "../../lib/content/loader-server";

const SITE_URL = "https://thebuildercoil.com";

export const Route = createFileRoute("/api/feed")({
	server: {
		handlers: {
			GET: () => {
				const posts = loadPostsInternal();

				const feedItems = posts.map((post) => {
					const canonicalUrl = `${SITE_URL}/${post.type}/${post.slug}`;

					let heroImageUrl: string | undefined;
					if (post.heroImage) {
						heroImageUrl = post.heroImage.startsWith("http")
							? post.heroImage
							: `${SITE_URL}${post.heroImage}`;
					}

					return {
						type: post.type,
						title: post.title,
						slug: post.slug,
						url: canonicalUrl,
						publishedAt: post.publishedAt,
						excerpt: post.summary,
						image: heroImageUrl
							? {
									url: heroImageUrl,
									alt: post.heroImageAlt || post.title,
								}
							: undefined,
					};
				});

				return Response.json(
					{
						items: feedItems,
						meta: {
							count: feedItems.length,
							generatedAt: new Date().toISOString(),
						},
					},
					{
						headers: {
							"Content-Type": "application/json",
							"Cache-Control":
								"public, max-age=300, stale-while-revalidate=600",
							"Access-Control-Allow-Origin": "*",
							"Access-Control-Allow-Methods": "GET",
						},
					}
				);
			},
		},
	},
});
