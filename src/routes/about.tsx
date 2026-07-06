import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Zap } from "lucide-react";
import { CodesandboxIcon } from "@/components/icons/CodesandboxIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
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
						An occasional personal devlog for hobby projects and technical
						experiments
					</p>
				</div>

				{/* Main Content */}
				<div className="prose prose-lg dark:prose-cream mx-auto mb-16 max-w-none prose-headings:font-serif">
					<h2>What Is The Builder Coil?</h2>
					<p>
						The Builder Coil is an occasional personal devlog. It collects hobby
						projects, technical experiments, learning notes, and reflections on
						archived projects. Posts appear when there is something worth
						writing down — there is no schedule and no product roadmap behind
						it.
					</p>
					<p>
						The name comes from the intersection of engineering and magic – the
						coil as both an electrical component and a metaphor for the
						iterative, spiraling nature of software development. Each turn of
						the coil builds on the last.
					</p>

					<h2>Current Status</h2>
					<p>
						I work full-time at Hultafors Group as Product &amp; Service Owner —
						Integrations. The role covers integration ownership: modernization,
						harmonization, strategy, AI, automation, and end-to-end technical
						ownership. Everything published here is personal hobby material and
						does not represent Hultafors Group.
					</p>
					<p>
						Ball Lightning AB remains open but mostly passive — a company
						presence, portfolio, and archive. Chronomation is paused and
						archived under Ball Lightning. This site is not an active product
						marketing channel and not a consulting channel.
					</p>

					<h2>What You'll Find Here</h2>
					<ul>
						<li>
							<strong>Hobby projects:</strong> Small tools and side builds,
							shared for the fun of it
						</li>
						<li>
							<strong>Agentic experiments:</strong> Testing AI-assisted
							development workflows
						</li>
						<li>
							<strong>Learning notes:</strong> The reasoning behind technical
							choices
						</li>
						<li>
							<strong>Archived project reflections:</strong> What worked, what
							didn't, and why
						</li>
					</ul>
				</div>

				{/* Projects Grid */}
				<div className="mb-16">
					<h2 className="mb-8 text-center font-semibold font-serif text-2xl">
						Projects &amp; Archive
					</h2>
					<div className="grid gap-6 md:grid-cols-3">
						<Card className="transition-all hover:border-tbc-teal/50">
							<CardHeader>
								<CodesandboxIcon className="mb-2 h-8 w-8 text-tbc-teal" />
								<CardTitle className="font-serif">The Builder Coil</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-sm">
									This site – an occasional personal devlog for hobby projects
									and technical experiments.
								</p>
							</CardContent>
						</Card>

						<Card className="transition-all hover:border-tbc-violet/50">
							<CardHeader>
								<Zap className="mb-2 h-8 w-8 text-tbc-violet" />
								<CardTitle className="font-serif">
									<a
										className="text-tbc-violet hover:underline"
										href="https://balllightning.cloud/chronomation"
										rel="noopener noreferrer"
										target="_blank"
									>
										Chronomation (paused)
									</a>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-sm">
									A productivity platform concept, now paused and archived under
									Ball Lightning.
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
									The company behind The Builder Coil and the Chronomation
									archive. Maintained but mostly passive — a portfolio and
									archive presence.
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
								src="/media/face-64.svg"
								width={64}
							/>
							<div>
								<h3 className="mb-1 font-serif text-xl font-semibold">
									Nicolas Brulay
								</h3>
								<p className="mb-4 text-sm text-muted-foreground">
									Product &amp; Service Owner — Integrations, Hultafors Group
									&middot; Mölndal, Sweden
								</p>
								<p className="text-muted-foreground leading-relaxed">
									Working full-time on integration ownership — modernization,
									harmonization, strategy, AI, and automation. Outside work, I
									tinker with hobby projects and write the occasional devlog
									here. Founder of Ball Lightning AB, which now serves as a
									passive company presence and archive.
								</p>
								<div className="mt-4 flex gap-3">
									<Button asChild className="gap-2" size="sm" variant="outline">
										<a
											href="https://www.linkedin.com/in/nicolas-brulay-vip/"
											rel="noopener noreferrer"
											target="_blank"
										>
											<LinkedinIcon className="h-3.5 w-3.5" />
											LinkedIn
										</a>
									</Button>
									<Button asChild className="gap-2" size="sm" variant="outline">
										<a
											href="https://balllightning.cloud"
											rel="noopener noreferrer"
											target="_blank"
										>
											<ArrowRight className="h-3.5 w-3.5" />
											Ball Lightning AB
										</a>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Reading pointer */}
				<div className="rounded-lg border border-border bg-background p-8 text-center">
					<h2 className="mb-4 font-semibold font-serif text-2xl">
						Want to read more?
					</h2>
					<p className="mb-6 text-muted-foreground">
						There is no list to join and no schedule — the blog and news archive
						are the whole site.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Button asChild className="gap-2" size="lg">
							<Link to="/blog">
								Browse the Blog
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
						<Button asChild size="lg" variant="outline">
							<Link to="/contact">Contact</Link>
						</Button>
					</div>
				</div>
			</AnimatedGroup>
		</div>
	);
}
