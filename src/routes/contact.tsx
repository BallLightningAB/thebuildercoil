import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
});

function ContactPage() {
	const [formState, setFormState] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState("loading");
		setErrorMessage("");

		const formData = new FormData(e.currentTarget);
		const data = {
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			message: formData.get("message") as string,
		};

		// TODO: Integrate with Resend server function
		// For now, simulate a successful submission
		await new Promise((resolve) => setTimeout(resolve, 1000));

		console.log("Contact form submission:", data);
		setFormState("success");
	};

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
					<h1 className="mb-4 font-bold text-4xl md:text-5xl">Get in Touch</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Have a question or want to work together? We'd love to hear from
						you.
					</p>
				</div>

				<div className="grid gap-12 md:grid-cols-2">
					{/* Contact Form */}
					<div>
						<h2 className="mb-6 font-semibold text-2xl">Send a Message</h2>

						{formState === "success" ? (
							<Card className="border-green-500/50 bg-green-500/10">
								<CardContent className="pt-6">
									<p className="text-center text-green-600 dark:text-green-400">
										Thanks for your message! We'll get back to you soon.
									</p>
								</CardContent>
							</Card>
						) : (
							<form className="space-y-6" onSubmit={handleSubmit}>
								<div className="space-y-2">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										name="name"
										placeholder="Your name"
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										name="email"
										placeholder="your@email.com"
										required
										type="email"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="message">Message</Label>
									<Textarea
										id="message"
										name="message"
										placeholder="How can we help?"
										required
										rows={5}
									/>
								</div>

								{formState === "error" && (
									<p className="text-destructive text-sm">{errorMessage}</p>
								)}

								<Button
									className="w-full"
									disabled={formState === "loading"}
									size="lg"
									type="submit"
								>
									{formState === "loading" ? "Sending..." : "Send Message"}
								</Button>
							</form>
						)}
					</div>

					{/* Contact Info */}
					<div>
						<h2 className="mb-6 font-semibold text-2xl">
							Other Ways to Connect
						</h2>

						<div className="space-y-4">
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
										href="https://chronomation.com"
										rel="noopener noreferrer"
										target="_blank"
									>
										Chronomation ↗
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
					</div>
				</div>
			</AnimatedGroup>
		</div>
	);
}
