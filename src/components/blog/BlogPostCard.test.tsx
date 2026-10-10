import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { expect, it, vi } from "vitest";
import { loadPostsInternal } from "@/lib/content/loader-server";
import { BlogPostCard } from "./BlogPostCard";

vi.mock("@tanstack/react-router", () => ({
	Link: ({ to, children }: { to: string; children: ReactNode }) => (
		<a href={to}>{children}</a>
	),
}));

it.each(["blog", "news"] as const)(
	"renders English dates, updated status and the %s destination",
	(type) => {
		const post = loadPostsInternal(type)[0];
		if (!post) throw new Error(`No ${type} fixture available`);
		render(
			<BlogPostCard
				post={{
					...post,
					publishedAt: "2026-07-03T12:00:00Z",
					updatedAt: "2026-07-04T12:00:00Z",
				}}
			/>,
		);
		expect(screen.getByText("July 3, 2026")).toBeInTheDocument();
		expect(screen.getByText("Updated")).toBeInTheDocument();
		expect(screen.getByRole("link", { name: post.title })).toHaveAttribute(
			"href",
			`/${type}/${post.slug}`,
		);
	},
);
