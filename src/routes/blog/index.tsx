import { createFileRoute } from "@tanstack/react-router";
import { BlogPostGrid } from "@/components/blog/BlogPostGrid";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { getPosts } from "@/lib/content/server";

export const Route = createFileRoute("/blog/")({
	component: BlogIndexPage,
	loader: async () => {
		const posts = await getPosts({ data: { type: "blog" } });
		return { posts };
	},
});

function BlogIndexPage() {
	const { posts } = Route.useLoaderData();

	return (
		<div className="py-12 md:py-20">
			<AnimatedGroup
				className="container mx-auto max-w-6xl px-4"
				variants={{
					container: {
						hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
						visible: {
							opacity: 1,
							y: 0,
							filter: "blur(0px)",
							transition: { duration: 0.9, delayChildren: 0.1 },
						},
					},
					item: {
						hidden: { opacity: 0, y: 16 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.7 },
						},
					},
				}}
			>
				{/* Header */}
				<div className="mb-12 text-center">
					<TextEffect
						as="h1"
						className="mb-4 font-bold text-4xl md:text-5xl"
						preset="fade-in-blur"
					>
						The Builder's Log
					</TextEffect>
					<TextEffect
						as="p"
						className="mx-auto max-w-2xl text-lg text-muted-foreground"
						delay={0.2}
						preset="fade-in-blur"
					>
						Devlogs, technical deep-dives, and lessons learned from building
						software and running Ball Lightning AB.
					</TextEffect>
				</div>

				{/* Posts Grid */}
				<BlogPostGrid
					emptyMessage="No blog posts yet. Check back soon!"
					posts={posts}
				/>
			</AnimatedGroup>
		</div>
	);
}
