import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { BlogPostGrid } from "@/components/blog/BlogPostGrid";
import { Button } from "@/components/ui/button";
import { loadFeaturedPosts } from "@/lib/content/loader";

export const Route = createFileRoute("/")({
	component: HomePage,
	loader: () => {
		const posts = loadFeaturedPosts(6);
		return { posts };
	},
});

function HomePage() {
	const { posts } = Route.useLoaderData();

	return (
		<div className="flex flex-col">
			{/* Hero Section */}
			<section className="relative overflow-hidden py-20 md:py-32">
				<div className="container mx-auto max-w-6xl px-4">
					<div className="mx-auto max-w-3xl text-center">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-tbc-teal/30 bg-tbc-teal/10 px-4 py-1.5 text-sm text-tbc-teal">
							<Sparkles className="h-4 w-4" />
							<span>Building in public</span>
						</div>
						<h1 className="mb-6 font-bold font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
							A Builder's Grimoire for{" "}
							<span className="text-tbc-teal">Modern Development</span>
						</h1>
						<p className="mb-8 text-lg text-muted-foreground md:text-xl">
							Devlogs, experiments, and lessons learned from building
							Chronomation and running Ball Lightning AB. Engineering card
							advantage in real life.
						</p>
						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<Button asChild className="gap-2" size="lg">
								<Link to="/blog">
									Read the Blog
									<ArrowRight className="h-4 w-4" />
								</Link>
							</Button>
							<Button asChild size="lg" variant="outline">
								<Link to="/newsletter">Subscribe to The Upkeep</Link>
							</Button>
						</div>
					</div>
				</div>

				{/* Background decoration */}
				<div className="-z-10 absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tbc-teal/5 via-transparent to-transparent" />
			</section>

			{/* Featured Posts */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<div className="mb-10 flex items-center justify-between">
						<div>
							<h2 className="font-semibold font-serif text-3xl">
								Latest from the Coil
							</h2>
							<p className="mt-2 text-muted-foreground">
								Recent devlogs and updates
							</p>
						</div>
						<Button asChild className="hidden gap-2 sm:flex" variant="ghost">
							<Link to="/blog">
								View all posts
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
					</div>

					<BlogPostGrid
						emptyMessage="No posts yet. Check back soon!"
						posts={posts}
					/>

					<div className="mt-8 text-center sm:hidden">
						<Button asChild className="gap-2" variant="outline">
							<Link to="/blog">
								View all posts
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="border-border border-t bg-card py-16 md:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="mb-4 font-semibold font-serif text-3xl">
							🌀 The Upkeep
						</h2>
						<p className="mb-2 font-medium text-lg text-tbc-teal">
							Engineering card advantage in real life
						</p>
						<p className="mb-8 text-muted-foreground">
							Get devlogs from The Builder Coil sharing progress on
							Chronomation, real-world agentic building experiments, and lessons
							learned running Ball Lightning AB.
						</p>
						<Button asChild className="gap-2" size="lg">
							<Link to="/newsletter">
								Subscribe to Newsletter
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
