import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Codesandbox, Globe, Zap } from "lucide-react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
	component: AboutPage,
});

function AboutPage() {
	return (
		<div className="py-12 md:py-20">
			<AnimatedGroup
				className="container mx-auto max-w-4xl px-4"
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
				<div className="mb-16 text-center">
					<h1 className="mb-4 font-bold font-serif text-4xl md:text-5xl">
						About The Builder Coil
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						A builder's grimoire for modern development
					</p>
				</div>

				{/* Main Content */}
				<div className="prose prose-lg dark:prose-cream mx-auto mb-16 max-w-none prose-headings:font-serif">
					<h2>What Is The Builder Coil?</h2>
					<p>
						The Builder Coil is more than just a blog – it's a living record of
						building software in public. Here, we document the journey of
						creating products, experimenting with agentic AI workflows, and
						sharing the lessons learned along the way.
					</p>
					<p>
						The name comes from the intersection of engineering and magic – the
						coil as both an electrical component and a metaphor for the
						iterative, spiraling nature of software development. Each turn of
						the coil builds on the last.
					</p>

					<h2>What You'll Find Here</h2>
					<ul>
						<li>
							<strong>Building in public:</strong> Real progress updates on
							projects like Chronomation
						</li>
						<li>
							<strong>Agentic experiments:</strong> Testing AI-assisted
							development workflows
						</li>
						<li>
							<strong>Engineering decisions:</strong> The reasoning behind
							technical choices
						</li>
						<li>
							<strong>Lessons learned:</strong> What works, what doesn't, and
							why
						</li>
					</ul>
				</div>

				{/* Projects Grid */}
				<div className="mb-16">
					<h2 className="mb-8 text-center font-semibold font-serif text-2xl">
						Our Projects
					</h2>
					<div className="grid gap-6 md:grid-cols-3">
						<Card className="transition-all hover:border-tbc-teal/50">
							<CardHeader>
								<Codesandbox className="mb-2 h-8 w-8 text-tbc-teal" />
								<CardTitle className="font-serif">The Builder Coil</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-sm">
									This site – a builder's log and public devlog for Ball
									Lightning AB.
								</p>
							</CardContent>
						</Card>

						<Card className="transition-all hover:border-tbc-violet/50">
							<CardHeader>
								<Zap className="mb-2 h-8 w-8 text-tbc-violet" />
								<CardTitle className="font-serif">Chronomation</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-sm">
									Multi-tenant content engine that turns work artifacts into
									blog posts and social content.
								</p>
							</CardContent>
						</Card>

						<Card className="transition-all hover:border-tbc-ember/50">
							<CardHeader>
								<Globe className="mb-2 h-8 w-8 text-tbc-ember" />
								<CardTitle className="font-serif">Ball Lightning AB</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-sm">
									The parent company behind Chronomation and The Builder Coil.
									Software consulting and product development.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* CTA */}
				<div className="rounded-lg border border-border bg-background p-8 text-center">
					<h2 className="mb-4 font-semibold font-serif text-2xl">
						Want to stay updated?
					</h2>
					<p className="mb-6 text-muted-foreground">
						Subscribe to The Upkeep newsletter for devlogs and updates.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Button asChild className="gap-2" size="lg">
							<Link to="/newsletter">
								Subscribe to Newsletter
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
						<Button asChild size="lg" variant="outline">
							<Link to="/contact">Get in Touch</Link>
						</Button>
					</div>
				</div>
			</AnimatedGroup>
		</div>
	);
}
