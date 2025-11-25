import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
		const consent = formData.get("consent");

		if (!consent) {
			setFormState("error");
			setErrorMessage("Please agree to receive emails to continue.");
			return;
		}

		// TODO: Integrate with newsletter server function
		// For now, simulate a successful submission
		await new Promise((resolve) => setTimeout(resolve, 1000));

		console.log("Newsletter signup:", { email });
		setFormState("success");
	};

	return (
		<div className="py-12 md:py-20">
			<div className="container mx-auto max-w-2xl px-4">
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
					<h1 className="mb-4 font-bold font-serif text-4xl md:text-5xl">
						The Upkeep
					</h1>
					<p className="mb-2 font-medium text-lg text-tbc-teal">
						Engineering card advantage in real life
					</p>
					<p className="text-muted-foreground">
						Get devlogs from The Builder Coil sharing progress on Chronomation,
						real-world agentic building experiments, and lessons learned running
						Ball Lightning AB.
					</p>
				</div>

				{formState === "success" ? (
					<div className="rounded-lg border border-green-500/50 bg-green-500/10 p-8 text-center">
						<CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
						<h2 className="mb-2 font-semibold font-serif text-2xl">
							Check your inbox!
						</h2>
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
							We respect your privacy. No spam, ever. Read our{" "}
							<Link className="underline hover:text-foreground" to="/about">
								privacy policy
							</Link>
							.
						</p>
					</form>
				)}

				{/* What to expect */}
				<div className="mt-16 rounded-lg border border-border bg-card p-8">
					<h2 className="mb-4 font-semibold font-serif text-xl">
						What to expect
					</h2>
					<ul className="space-y-3 text-muted-foreground">
						<li className="flex items-start gap-3">
							<span className="text-tbc-teal">→</span>
							<span>Progress updates on Chronomation development</span>
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
			</div>
		</div>
	);
}
