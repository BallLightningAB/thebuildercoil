import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { BlogPostGrid } from "@/components/blog/BlogPostGrid";
import {
	ContributionGraph,
	ContributionGraphBlock,
	ContributionGraphCalendar,
	ContributionGraphFooter,
	ContributionGraphLegend,
	ContributionGraphTotalCount,
} from "@/components/kibo-ui/contribution-graph";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { Button } from "@/components/ui/button";
import { getFeaturedPosts } from "@/lib/content/server";
import { getGitHubContributions } from "@/lib/github";

export const Route = createFileRoute("/")({
	component: HomePage,
	loader: async () => {
		const [posts, github] = await Promise.all([
			getFeaturedPosts({ data: { limit: 6 } }),
			getGitHubContributions({ data: { username: "BallLightningAB" } }),
		]);

		return { posts, github };
	},
});

function HomePage() {
	const { posts, github } = Route.useLoaderData();

	return (
		<div className="flex flex-col">
			{/* Hero Section */}
			<section className="relative overflow-hidden py-20 md:py-32">
				<div className="container mx-auto max-w-6xl px-4">
					<div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
						{/* Hero copy */}
						<AnimatedGroup
							variants={{
								container: {
									hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
									visible: {
										opacity: 1,
										y: 0,
										filter: "blur(0px)",
										transition: {
											staggerChildren: 0.12,
											delayChildren: 0.1,
											duration: 0.9,
										},
									},
								},
								item: {
									hidden: { opacity: 0, y: 20 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											type: "spring",
											bounce: 0.25,
											duration: 0.9,
										},
									},
								},
							}}
						>
							<div className="text-left">
								<TextEffect
									as="h1"
									className="mb-6 font-bold text-4xl leading-tight md:text-5xl lg:text-6xl"
									preset="fade-in-blur"
								>
									A Builder's Grimoire for{" "}
									<span className="text-tbc-teal">Modern Development</span>
								</TextEffect>

								<TextEffect
									className="mb-8 text-lg text-muted-foreground md:text-xl"
									delay={0.3}
									preset="fade-in-blur"
								>
									Devlogs, experiments, and lessons learned from building
									Chronomation and running Ball Lightning AB. Engineering card
									advantage in real life.
								</TextEffect>

								<AnimatedGroup
									className="flex flex-col justify-start gap-4 sm:flex-row"
									variants={{
										container: {
											visible: {
												transition: {
													staggerChildren: 0.1,
													delayChildren: 0.5,
												},
											},
										},
										item: {
											hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
											visible: {
												opacity: 1,
												y: 0,
												filter: "blur(0px)",
												transition: {
													type: "spring",
													bounce: 0.3,
													duration: 1,
												},
											},
										},
									}}
								>
									<Button asChild className="gap-2" size="lg">
										<Link to="/blog">
											Read the Blog
											<ArrowRight className="h-4 w-4" />
										</Link>
									</Button>
									<Button asChild size="lg" variant="outline">
										<Link to="/newsletter">Subscribe to The Upkeep</Link>
									</Button>
								</AnimatedGroup>
							</div>
						</AnimatedGroup>

						{/* GitHub contribution graph */}
						<motion.div
							animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
							className="mt-10 md:mt-0"
							initial={{ opacity: 0, x: 80, filter: "blur(16px)" }}
							transition={{
								type: "spring",
								bounce: 0.25,
								duration: 1.1,
								delay: 0.25,
							}}
						>
							<div className="mb-4 flex items-center justify-between gap-2">
								<div>
									<p className="text-xs uppercase tracking-wide text-muted-foreground">
										GitHub Activity
									</p>
									<p className="font-mono text-sm text-foreground">
										@BallLightningAB
									</p>
								</div>
								<a
									className="text-xs text-tbc-teal hover:underline"
									href="https://github.com/BallLightningAB"
									rel="noopener noreferrer"
									target="_blank"
								>
									View profile
								</a>
							</div>
							<div className="rounded-lg border border-tbc-teal/30 bg-card/40 p-4 shadow-[0_0_40px_rgba(45,212,191,0.08)]">
								<ContributionGraph
									className="w-full"
									data={github.activities}
									maxLevel={4}
									totalCount={github.totalCount}
									weekStart={1}
								>
									<ContributionGraphCalendar className="mb-3">
										{({ activity, dayIndex, weekIndex }) => (
											<ContributionGraphBlock
												activity={activity}
												className="data-[level='0']:fill-muted data-[level='1']:fill-tbc-teal/20 data-[level='2']:fill-tbc-teal/40 data-[level='3']:fill-tbc-teal/60 data-[level='4']:fill-tbc-teal"
												dayIndex={dayIndex}
												weekIndex={weekIndex}
											/>
										)}
									</ContributionGraphCalendar>
									<ContributionGraphFooter>
										<ContributionGraphTotalCount className="text-xs text-muted-foreground">
											{({ totalCount, year }) => (
												<span>
													{totalCount} contributions in {year}
												</span>
											)}
										</ContributionGraphTotalCount>
										<ContributionGraphLegend />
									</ContributionGraphFooter>
								</ContributionGraph>
							</div>
						</motion.div>
					</div>
				</div>

				{/* Background decoration */}
				<div className="-z-10 absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tbc-teal/5 via-transparent to-transparent" />
			</section>

			{/* Featured Posts */}
			<section className="py-16 md:py-24">
				<AnimatedGroup
					className="container mx-auto max-w-6xl px-4"
					variants={{
						container: {
							hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
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
					<div className="mb-10 flex items-center justify-between">
						<div>
							<h2 className="font-semibold text-3xl">
								Channeling knowledge and creativity
							</h2>
							<p className="mt-2 text-secondary">Recent devlogs and updates</p>
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
				</AnimatedGroup>
			</section>

			{/* CTA Section */}
			<section className="border-border border-t bg-background py-16 md:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="mb-4 font-semibold text-3xl">🌀 The Upkeep</h2>
						<p className="mb-2 font-medium text-lg text-secondary">
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
