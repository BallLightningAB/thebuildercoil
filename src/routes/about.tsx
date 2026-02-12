import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Codesandbox, Globe, Linkedin, Zap } from "lucide-react";
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
						building software in public. Here, I document the journey of
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
							projects like{" "}
							<a
								className="text-tbc-violet hover:underline"
								href="https://chronomation.com"
								rel="noopener noreferrer"
								target="_blank"
							>
								Chronomation
							</a>
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
						My Projects
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
								<CardTitle className="font-serif">
									<a
										className="text-tbc-violet hover:underline"
										href="https://chronomation.com"
										rel="noopener noreferrer"
										target="_blank"
									>
										Chronomation
									</a>
								</CardTitle>
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
									The parent company behind{" "}
									<a
										className="text-tbc-violet hover:underline"
										href="https://chronomation.com"
										rel="noopener noreferrer"
										target="_blank"
									>
										Chronomation
									</a>{" "}
									and The Builder Coil. Software consulting and product
									development.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* The Builder */}
				<div className="mb-16">
					<p className="mb-4 font-mono text-xs uppercase tracking-widest text-tbc-teal">
						The Builder
					</p>
					<h2 className="mb-8 font-serif text-2xl font-semibold md:text-3xl">
						Built by Nicolas Brulay
					</h2>
					<div className="rounded-lg border border-border bg-background p-8">
						<div className="flex flex-col gap-6 sm:flex-row sm:items-start">
							<img
								alt="Nicolas Brulay"
								className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-tbc-teal/30"
								height={64}
								src="/media/face.png"
								width={64}
							/>
							<div>
								<h3 className="mb-1 font-serif text-xl font-semibold">
									Nicolas Brulay
								</h3>
								<p className="mb-4 text-sm text-muted-foreground">
									Founder, Ball Lightning AB &middot; Mölndal, Sweden
								</p>
								<p className="text-muted-foreground leading-relaxed">
									Building{" "}
									<a
										className="text-tbc-violet hover:underline"
										href="https://chronomation.com"
										rel="noopener noreferrer"
										target="_blank"
									>
										Chronomation
									</a>{" "}
									in the open — documenting every decision, every experiment,
									every lesson on The Builder Coil. Background in project
									management and web development, now channeling it all into a
									platform that makes the solo builder's life easier.
								</p>
								<div className="mt-4 flex gap-3">
									<Button asChild className="gap-2" size="sm" variant="outline">
										<a
											href="https://www.linkedin.com/in/nicolas-brulay-vip/"
											rel="noopener noreferrer"
											target="_blank"
										>
											<Linkedin className="h-3.5 w-3.5" />
											LinkedIn
										</a>
									</Button>
									<Button asChild className="gap-2" size="sm" variant="outline">
										<a
											href="https://chronomation.com?utm_source=thebuildercoil&utm_medium=website&utm_campaign=about_builder"
											rel="noopener noreferrer"
											target="_blank"
										>
											<ArrowRight className="h-3.5 w-3.5" />
											Chronomation
										</a>
									</Button>
								</div>
							</div>
						</div>
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
