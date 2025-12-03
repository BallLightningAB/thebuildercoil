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

/**
 * WebSite schema for home page
 */
export function generateWebSiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: SITE_NAME,
		description:
			"A builder's grimoire for modern development. Devlogs, experiments, and lessons from Ball Lightning AB.",
		url: SITE_URL,
		publisher: {
			"@type": "Organization",
			name: ORGANIZATION_NAME,
			url: "https://balllightning.cloud",
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
		name: ORGANIZATION_NAME,
		url: "https://balllightning.cloud",
		logo: `${SITE_URL}/logo.png`,
		description:
			"Software consulting and product development company behind Chronomation and The Builder Coil.",
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
			"@type": "Organization",
			name: ORGANIZATION_NAME,
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
			"Devlogs, experiments, and lessons from building Chronomation and running Ball Lightning AB.",
		url: `${SITE_URL}/blog`,
		publisher: {
			"@type": "Organization",
			name: ORGANIZATION_NAME,
		},
	};
}

/**
 * Generate script tag content for JSON-LD
 */
export function jsonLdScript(data: object): string {
	return JSON.stringify(data);
}
