import { createFileRoute } from "@tanstack/react-router";
import { BlogPostGrid } from "@/components/blog/BlogPostGrid";
import { loadPosts } from "@/lib/content/loader";

export const Route = createFileRoute("/blog/")({
	component: BlogIndexPage,
	loader: () => {
		const posts = loadPosts("blog");
		return { posts };
	},
});

function BlogIndexPage() {
	const { posts } = Route.useLoaderData();

	return (
		<div className="py-12 md:py-20">
			<div className="container mx-auto max-w-6xl px-4">
				{/* Header */}
				<div className="mb-12 text-center">
					<h1 className="mb-4 font-bold font-serif text-4xl md:text-5xl">
						The Builder's Log
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Devlogs, technical deep-dives, and lessons learned from building
						software and running Ball Lightning AB.
					</p>
				</div>

				{/* Posts Grid */}
				<BlogPostGrid
					emptyMessage="No blog posts yet. Check back soon!"
					posts={posts}
				/>
			</div>
		</div>
	);
}
