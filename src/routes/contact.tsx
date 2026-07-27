import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Mail, MapPin } from "lucide-react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
});

function ContactPage() {
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
					<h1 className="mb-4 font-bold text-4xl md:text-5xl">Contact</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						This is a personal hobby site, so replies can take a while. For
						feedback on a post or a hobby project, email or GitHub works best.
					</p>
				</div>

				<div className="mx-auto max-w-md space-y-4">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="flex items-center gap-2 text-base">
								<Mail className="h-4 w-4 text-tbc-teal" />
								Email
							</CardTitle>
						</CardHeader>
						<CardContent>
							<a
								className="text-muted-foreground hover:text-tbc-teal"
								href="mailto:contact@thebuildercoil.com"
							>
								contact@thebuildercoil.com
							</a>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="flex items-center gap-2 text-base">
								<MapPin className="h-4 w-4 text-tbc-violet" />
								Location
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">Mölndal, Sweden</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="flex items-center gap-2 text-base">
								<ExternalLink className="h-4 w-4 text-tbc-ember" />
								Links
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<a
								className="block text-muted-foreground hover:text-tbc-teal"
								href="https://balllightning.cloud"
								rel="noopener noreferrer"
								target="_blank"
							>
								Ball Lightning AB ↗
							</a>
							<a
								className="block text-muted-foreground hover:text-tbc-teal"
								href="https://balllightning.cloud/chronomation"
								rel="noopener noreferrer"
								target="_blank"
							>
								Chronomation archive ↗
							</a>
							<a
								className="block text-muted-foreground hover:text-tbc-teal"
								href="https://github.com/BallLightningAB"
								rel="noopener noreferrer"
								target="_blank"
							>
								GitHub ↗
							</a>
						</CardContent>
					</Card>
				</div>
			</AnimatedGroup>
		</div>
	);
}
