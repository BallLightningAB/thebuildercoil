/**
 * Content Types for The Builder Coil
 *
 * These types mirror the Chronomation API response shape for easy migration
 * from Phase 1 (local JSON) to Phase 2 (API calls).
 */

export type PostType = "blog" | "news";
export type PostStatus = "draft" | "published" | "archived";

/**
 * Blog/News Post - matches Chronomation blog_posts table shape
 */
export type Post = {
	/** Unique identifier */
	id: string;
	/** URL-friendly slug */
	slug: string;
	/** Post title */
	title: string;
	/** Post type: blog or news */
	type: PostType;
	/** Short summary/excerpt for listings */
	summary: string;
	/** Full post content (HTML or markdown string) */
	body: string;
	/** Whether body is markdown (true) or HTML (false) */
	bodyIsMarkdown?: boolean;
	/** Hero/featured image URL */
	heroImage?: string;
	/** Hero image alt text */
	heroImageAlt?: string;
	/** Post tags/categories */
	tags: string[];
	/** Author name */
	author: string;
	/** Author avatar URL */
	authorAvatar?: string;
	/** Publication status */
	status: PostStatus;
	/** When the post was published (ISO 8601) */
	publishedAt: string;
	/** When the post was created (ISO 8601) */
	createdAt: string;
	/** When the post was last updated (ISO 8601) */
	updatedAt: string;
	/** Estimated reading time in minutes (computed or stored) */
	readingTime?: number;
	/** Related project slug (for Chronomation integration) */
	projectSlug?: string;
};

export type PostCodeBlock = {
	/** Language identifier from fenced code block, e.g. ts, sql, bash */
	language: string;
	/** Optional filename or label parsed from the info string */
	filename: string;
	/** Raw code contents inside the fenced block */
	code: string;
};

/**
 * Post metadata for listings (excludes body content)
 */
export type PostMeta = Omit<Post, "body" | "bodyIsMarkdown">;

/**
 * Post input for creating/updating posts
 */
export type PostInput = Omit<Post, "id" | "createdAt" | "updatedAt">;

/**
 * Pagination info
 */
export type PaginationInfo = {
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
};

/**
 * Paginated posts response
 */
export type PaginatedPosts = {
	posts: PostMeta[];
	pagination: PaginationInfo;
};

/**
 * Content manifest for quick listing
 */
export type ContentManifest = {
	posts: {
		id: string;
		slug: string;
		type: PostType;
		title: string;
		publishedAt: string;
	}[];
	lastUpdated: string;
};
