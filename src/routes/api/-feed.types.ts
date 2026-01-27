/**
 * Ball Lightning Feed API Types
 *
 * TypeScript types for consuming The Builder Coil's public feed endpoint.
 * Copy these to Ball Lightning's codebase for type-safe API consumption.
 */

export interface FeedItem {
	type: "blog" | "news";
	title: string;
	slug: string;
	url: string;
	publishedAt: string;
	excerpt: string;
	image?: {
		url: string;
		alt: string;
	};
}

export interface FeedResponse {
	items: FeedItem[];
	meta: {
		count: number;
		generatedAt: string;
	};
}
