import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendConfirmationEmail } from "@/lib/newsletter/email-service";
import { findByEmail, upsertSignup } from "@/lib/newsletter/storage";
import type { NewsletterSignupResult } from "@/lib/newsletter/types";

const subscribeToNewsletter = createServerFn({ method: "POST" })
	.inputValidator(
		(data: { email: string; consent: boolean; path?: string }) => data
	)
	.handler(async ({ data }): Promise<NewsletterSignupResult> => {
		const { email, consent, path } = data;

		if (!consent) {
			return {
				success: false,
				message: "Please agree to receive emails to continue.",
				error: "consent_required",
			};
		}

		const normalizedEmail = email.toLowerCase().trim();

		// Check for existing subscription
		const existing = await findByEmail(normalizedEmail);

		if (existing?.status === "confirmed") {
			return {
				success: true,
				message: "You're already subscribed to The Upkeep!",
			};
		}

		// Generate new tokens
		const confirmationToken = crypto.randomUUID();
		const unsubToken = crypto.randomUUID();

		// Upsert the signup record
		await upsertSignup(normalizedEmail, {
			status: "pending",
			confirmationToken,
			unsubToken,
			meta: {
				source: "tbc_newsletter_page",
				createdFromPath: path || "/newsletter",
			},
			createdAt: new Date().toISOString(),
			confirmedAt: null,
			unsubscribedAt: null,
		});

		// Send confirmation email
		const emailResult = await sendConfirmationEmail({
			to: normalizedEmail,
			confirmationToken,
			unsubToken,
		});

		if (!emailResult.success) {
			console.error("Failed to send confirmation email:", emailResult.error);
			return {
				success: false,
				message:
					"Something went wrong sending your confirmation email. Please try again.",
				error: "email_failed",
			};
		}

		return {
			success: true,
			message: "Check your inbox to confirm your subscription!",
		};
	});

export const Route = createFileRoute("/newsletter/")({
	component: NewsletterPage,
});

function NewsletterPage() {
	const [formState, setFormState] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState("loading");
		setErrorMessage("");

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const consent = formData.get("consent") === "on";

		try {
			const result = await subscribeToNewsletter({
				data: {
					email,
					consent,
					path: "/newsletter",
				},
			});

			if (result.success) {
				setFormState("success");
			} else {
				setFormState("error");
				setErrorMessage(result.message);
			}
		} catch (err) {
			setFormState("error");
			setErrorMessage("Something went wrong. Please try again.");
			console.error("Newsletter signup error:", err);
		}
	};

	return (
		<div className="py-12 md:py-20">
			<AnimatedGroup
				className="container mx-auto max-w-2xl px-4"
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
				{/* Back link */}
				<Button asChild className="mb-8 gap-2" size="sm" variant="ghost">
					<Link to="/">
						<ArrowLeft className="h-4 w-4" />
						Back to Home
					</Link>
				</Button>

				{/* Header */}
				<div className="mb-12 text-center">
					<div className="mb-4 text-5xl">🌀</div>
					<h1 className="mb-4 font-bold text-4xl md:text-5xl">The Upkeep</h1>
					<p className="mb-2 font-medium text-lg text-tbc-teal">
						Engineering card advantage in real life
					</p>
					<p className="text-muted-foreground">
						Get devlogs from The Builder Coil sharing progress on{" "}
						<a
							className="text-tbc-violet hover:underline"
							href="https://chronomation.com"
							rel="noopener noreferrer"
							target="_blank"
						>
							Chronomation
						</a>
						, real-world agentic building experiments, and lessons learned
						running Ball Lightning AB.
					</p>
				</div>

				{formState === "success" ? (
					<div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
						<CheckCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
						<h2 className="mb-2 font-semibold text-2xl">Check your inbox!</h2>
						<p className="text-muted-foreground">
							We've sent you a confirmation email. Click the link inside to
							confirm your subscription.
						</p>
					</div>
				) : (
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-2">
							<Label htmlFor="email">Email address</Label>
							<Input
								className="text-lg"
								id="email"
								name="email"
								placeholder="your@email.com"
								required
								type="email"
							/>
						</div>

						<div className="flex items-start gap-3">
							<Checkbox className="mt-1" id="consent" name="consent" />
							<Label
								className="text-muted-foreground text-sm"
								htmlFor="consent"
							>
								I agree to receive emails from The Builder Coil. You can
								unsubscribe at any time.
							</Label>
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
							{formState === "loading"
								? "Subscribing..."
								: "Subscribe to The Upkeep"}
						</Button>

						<p className="text-center text-muted-foreground text-xs">
							We respect your privacy and will never share your email. You can
							unsubscribe at any time via the link in every email. Read our{" "}
							<a
								className="underline hover:text-foreground"
								href="https://balllightning.cloud/privacy"
								rel="noopener noreferrer"
								target="_blank"
							>
								privacy policy
							</a>{" "}
							to learn how we handle your data under GDPR.
						</p>
					</form>
				)}

				{/* What to expect */}
				<div className="mt-16 rounded-lg border border-border bg-background p-8">
					<h2 className="mb-4 font-semibold text-xl">What to expect</h2>
					<ul className="space-y-3 text-muted-foreground">
						<li className="flex items-start gap-3">
							<span className="text-tbc-teal">→</span>
							<span>
								Progress updates on{" "}
								<a
									className="text-tbc-violet hover:underline"
									href="https://chronomation.com"
									rel="noopener noreferrer"
									target="_blank"
								>
									Chronomation
								</a>{" "}
								development
							</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="text-tbc-teal">→</span>
							<span>Real-world agentic AI building experiments</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="text-tbc-teal">→</span>
							<span>Lessons learned running Ball Lightning AB</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="text-tbc-teal">→</span>
							<span>Occasional updates, not daily spam</span>
						</li>
					</ul>
				</div>
			</AnimatedGroup>
		</div>
	);
}
