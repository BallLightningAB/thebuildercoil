import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
} from "@/components/kibo-ui/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPost } from "@/lib/content/server";

export const Route = createFileRoute("/news/$slug")({
	component: NewsPostPage,
	loader: async ({ params }) => {
		const result = await getPost({ data: { slug: params.slug, type: "news" } });
		if (!result) {
			throw notFound();
		}
		return {
			post: result.post,
			html: result.html,
			codeBlocks: result.codeBlocks,
		};
	},
	notFoundComponent: () => (
		<div className="py-20 text-center">
			<h1 className="mb-4 font-bold text-3xl">News Not Found</h1>
			<p className="mb-8 text-muted-foreground">
				The news article you're looking for doesn't exist.
			</p>
			<Button asChild>
				<Link to="/news">Back to News</Link>
			</Button>
		</div>
	),
});

function NewsPostPage() {
	const { post, html, codeBlocks } = Route.useLoaderData();

	const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<article className="py-12 md:py-20">
			<div className="container mx-auto max-w-4xl px-4">
				{/* Back link */}
				<Button asChild className="mb-8 gap-2" size="sm" variant="ghost">
					<Link to="/news">
						<ArrowLeft className="h-4 w-4" />
						Back to News
					</Link>
				</Button>
				{/* Article Header */}
				<header className="mb-12">
					{/* Tags */}
					<div className="mb-4 flex flex-wrap gap-2">
						{post.tags.map((tag: string) => (
							<Badge
								className="bg-background/80 border-border/60 text-tbc-violet"
								key={tag}
								variant="secondary"
							>
								{tag}
							</Badge>
						))}
					</div>

					{/* Title */}
					<h1 className="mb-6 font-bold text-3xl leading-tight md:text-4xl lg:text-5xl">
						{post.title}
					</h1>

					{/* Meta */}
					<div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
						<span className="flex items-center gap-1.5">
							<User className="h-4 w-4" />
							{post.author}
						</span>
						<span className="flex items-center gap-1.5">
							<Calendar className="h-4 w-4" />
							{formattedDate}
						</span>
						{post.readingTime && (
							<span className="flex items-center gap-1.5">
								<Clock className="h-4 w-4" />
								{post.readingTime} min read
							</span>
						)}
					</div>
				</header>
				{/* Hero Image */}
				{post.heroImage && (
					<div className="mb-12 rounded-lg">
						<img
							alt={post.heroImageAlt || post.title}
							className="w-full object-contain h-auto"
							height={504}
							src={post.heroImage}
							width={896}
						/>
					</div>
				)}
				{/* Article Content */}
				<div
					className="prose prose-lg dark:prose-invert max-w-none prose-code:rounded prose-pre:border prose-pre:border-border prose-code:bg-muted prose-pre:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-headings:font-semibold prose-headings:prose-a:text-tbc-teal prose-a:no-underline prose-code:before:content-none prose-code:after:content-none hover:prose-a:underline"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
				{codeBlocks.length > 0 && (
					<section className="mt-16 border-border border-t pt-12">
						<h2 className="mb-6 font-semibold text-2xl">Code samples</h2>
						<CodeBlock
							className="bg-card/60"
							data={codeBlocks}
							defaultValue={codeBlocks[0]?.language}
						>
							<CodeBlockHeader>
								<CodeBlockFiles>
									{(item) => (
										<CodeBlockFilename
											key={`${item.language}-${item.filename || "snippet"}`}
											value={item.language}
										>
											{item.filename || item.language || "snippet"}
										</CodeBlockFilename>
									)}
								</CodeBlockFiles>
								<CodeBlockCopyButton />
							</CodeBlockHeader>
							<CodeBlockBody>
								{(item) => (
									<CodeBlockItem
										key={`${item.language}-${item.filename || "snippet"}`}
										value={item.language}
									>
										<CodeBlockContent>{item.code}</CodeBlockContent>
									</CodeBlockItem>
								)}
							</CodeBlockBody>
						</CodeBlock>
					</section>
				)}
			</div>
		</article>
	);
}
