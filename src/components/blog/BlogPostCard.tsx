import { Link } from "@tanstack/react-router";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { PostMeta } from "@/lib/content/types";

interface BlogPostCardProps {
	post: PostMeta;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
	const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const linkPath =
		post.type === "news" ? `/news/${post.slug}` : `/blog/${post.slug}`;

	return (
		<Card className="group overflow-hidden transition-all hover:border-tbc-teal/50 hover:shadow-lg hover:shadow-tbc-teal/5">
			{post.heroImage && (
				<div className="aspect-video flex items-center justify-center bg-card/60">
					<img
						alt={post.heroImageAlt || post.title}
						className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
						height={360}
						src={post.heroImage}
						width={640}
					/>
				</div>
			)}
			<CardHeader className="space-y-2">
				<div className="flex flex-wrap gap-2">
					{post.tags.slice(0, 3).map((tag) => (
						<Badge
							className="bg-background/80 border-border/60 text-tbc-teal hover:bg-background"
							key={tag}
							variant="secondary"
						>
							{tag}
						</Badge>
					))}
				</div>
				<Link to={linkPath}>
					<h3 className="font-semibold text-xl leading-tight transition-colors group-hover:text-tbc-teal">
						{post.title}
					</h3>
				</Link>
			</CardHeader>
			<CardContent className="space-y-4">
				<p className="line-clamp-2 text-muted-foreground text-sm">
					{post.summary}
				</p>
				<div className="flex items-center gap-4 text-muted-foreground text-xs">
					<span className="flex items-center gap-1">
						<Calendar className="h-3.5 w-3.5" />
						{formattedDate}
					</span>
					{post.readingTime && (
						<span className="flex items-center gap-1">
							<Clock className="h-3.5 w-3.5" />
							{post.readingTime} min read
						</span>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
