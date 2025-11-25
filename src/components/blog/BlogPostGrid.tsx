import type { PostMeta } from "@/lib/content/types";
import { BlogPostCard } from "./BlogPostCard";

type BlogPostGridProps = {
	posts: PostMeta[];
	emptyMessage?: string;
};

export function BlogPostGrid({
	posts,
	emptyMessage = "No posts found.",
}: BlogPostGridProps) {
	if (posts.length === 0) {
		return (
			<div className="py-12 text-center">
				<p className="text-muted-foreground">{emptyMessage}</p>
			</div>
		);
	}

	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{posts.map((post) => (
				<BlogPostCard key={post.id} post={post} />
			))}
		</div>
	);
}
