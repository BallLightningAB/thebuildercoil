/**
 * JSON-LD Structured Data for The Builder Coil
 *
 * Provides schema.org structured data for SEO:
 * - WebSite schema on home page
 * - BlogPosting schema on post pages
 * - Organization schema on about page
 */

import type { Post } from "@/lib/content/types";

const SITE_URL = "https://thebuildercoil.com";
const SITE_NAME = "The Builder Coil";
const ORGANIZATION_NAME = "Ball Lightning AB";
const AUTHOR_NAME = "Nicolas Brulay";
const BALL_LIGHTNING_URL = "https://balllightning.cloud";
const CHRONOMATION_ARCHIVE_URL = `${BALL_LIGHTNING_URL}/chronomation`;

const ORGANIZATION_ID = `${BALL_LIGHTNING_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function generateRootEntityGraphSchema() {
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": ORGANIZATION_ID,
				name: ORGANIZATION_NAME,
				url: BALL_LIGHTNING_URL,
				description:
					"A maintained but mostly passive company presence, portfolio, and archive behind The Builder Coil and the archived Chronomation concept.",
				founder: {
					"@type": "Person",
					name: AUTHOR_NAME,
				},
				sameAs: [
					"https://github.com/BallLightningAB",
					"https://x.com/nicbrulay",
					"https://linkedin.com/in/nicolasbrulay",
				],
			},
			{
				"@type": "WebSite",
				"@id": WEBSITE_ID,
				name: SITE_NAME,
				description:
					"An occasional personal devlog by Nicolas Brulay for hobby projects, technical experiments, learning notes, and archived project reflections.",
				url: SITE_URL,
				publisher: {
					"@id": ORGANIZATION_ID,
				},
				potentialAction: {
					"@type": "SearchAction",
					target: {
						"@type": "EntryPoint",
						urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
					},
					"query-input": "required name=search_term_string",
				},
			},
			{
				"@type": "CreativeWork",
				"@id": `${CHRONOMATION_ARCHIVE_URL}/#creativework`,
				name: "Chronomation (archived)",
				description:
					"A productivity platform concept, now paused and archived under Ball Lightning AB.",
				url: CHRONOMATION_ARCHIVE_URL,
				creativeWorkStatus: "Archived",
				publisher: {
					"@id": ORGANIZATION_ID,
				},
			},
		],
	};
}

/**
 * WebSite schema for home page
 */
export function generateWebSiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": WEBSITE_ID,
		name: SITE_NAME,
		description:
			"An occasional personal devlog by Nicolas Brulay for hobby projects, technical experiments, learning notes, and archived project reflections.",
		url: SITE_URL,
		publisher: {
			"@id": ORGANIZATION_ID,
		},
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	};
}

/**
 * Organization schema for about page
 */
export function generateOrganizationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		"@id": ORGANIZATION_ID,
		name: ORGANIZATION_NAME,
		url: BALL_LIGHTNING_URL,
		logo: `${SITE_URL}/logo.png`,
		description:
			"A maintained but mostly passive company presence, portfolio, and archive behind The Builder Coil and the archived Chronomation concept.",
		founder: {
			"@type": "Person",
			name: AUTHOR_NAME,
		},
		sameAs: [
			"https://github.com/BallLightningAB",
			"https://x.com/nicbrulay",
			"https://linkedin.com/in/nicolasbrulay",
		],
	};
}

/**
 * BlogPosting schema for blog/news post pages
 */
export function generateBlogPostingSchema(post: Post) {
	const postUrl = `${SITE_URL}/${post.type}/${post.slug}`;

	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.summary,
		url: postUrl,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt || post.publishedAt,
		author: {
			"@type": "Person",
			name: post.author || AUTHOR_NAME,
		},
		publisher: {
			"@id": ORGANIZATION_ID,
			logo: {
				"@type": "ImageObject",
				url: `${SITE_URL}/logo.png`,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": postUrl,
		},
		...(post.heroImage && {
			image: post.heroImage.startsWith("http")
				? post.heroImage
				: `${SITE_URL}${post.heroImage}`,
		}),
		...(post.tags?.length && {
			keywords: post.tags.join(", "),
		}),
		...(post.readingTime && {
			timeRequired: `PT${post.readingTime}M`,
		}),
	};
}

/**
 * Blog schema for blog index page
 */
export function generateBlogSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: `${SITE_NAME} Blog`,
		description:
			"Occasional devlogs on hobby projects, technical experiments, and learning notes.",
		url: `${SITE_URL}/blog`,
		publisher: {
			"@id": ORGANIZATION_ID,
		},
	};
}

export function generateNewsSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: `${SITE_NAME} News`,
		description:
			"Occasional status updates and announcements from The Builder Coil.",
		url: `${SITE_URL}/news`,
		publisher: {
			"@id": ORGANIZATION_ID,
		},
	};
}

export function generateNewsArticleSchema(post: Post) {
	const postUrl = `${SITE_URL}/news/${post.slug}`;

	return {
		"@context": "https://schema.org",
		"@type": "NewsArticle",
		headline: post.title,
		description: post.summary,
		url: postUrl,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt || post.publishedAt,
		author: {
			"@type": "Person",
			name: post.author || AUTHOR_NAME,
		},
		publisher: {
			"@id": ORGANIZATION_ID,
			logo: {
				"@type": "ImageObject",
				url: `${SITE_URL}/logo.png`,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": postUrl,
		},
		...(post.heroImage && {
			image: post.heroImage.startsWith("http")
				? post.heroImage
				: `${SITE_URL}${post.heroImage}`,
		}),
		...(post.tags?.length && {
			keywords: post.tags.join(", "),
		}),
		...(post.readingTime && {
			timeRequired: `PT${post.readingTime}M`,
		}),
	};
}

/**
 * Generate script tag content for JSON-LD
 */
export function jsonLdScript(data: object): string {
	return JSON.stringify(data);
}
