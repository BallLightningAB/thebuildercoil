import { createFileRoute, Link } from "@tanstack/react-router";
// import { createServerFn } from "@tanstack/react-start";
// import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { ArrowLeft, Mail } from "lucide-react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Button } from "@/components/ui/button";
// import { findByToken, updateStatusByToken } from "@/lib/newsletter/storage";
// import type { TokenValidationResult } from "@/lib/newsletter/types";

// --- Phase 2: restore token-based confirmation (TBC #14) ---
// const confirmSubscription = createServerFn({ method: "GET" })
// 	.inputValidator((data: { token: string }) => data)
// 	.handler(async ({ data }): Promise<TokenValidationResult> => {
// 		const { token } = data;
//
// 		if (!token) {
// 			return {
// 				success: false,
// 				message: "No confirmation token provided",
// 				error: "missing_token",
// 			};
// 		}
//
// 		// Find record by confirmation token
// 		const record = await findByToken(token, "confirmation");
//
// 		if (!record) {
// 			return {
// 				success: false,
// 				message: "Invalid or expired confirmation link",
// 				error: "invalid_token",
// 			};
// 		}
//
// 		if (record.status === "confirmed") {
// 			return {
// 				success: true,
// 				message: "You're already subscribed to The Upkeep!",
// 				status: "confirmed",
// 			};
// 		}
//
// 		if (record.status === "unsubscribed") {
// 			// Re-subscribe
// 			await updateStatusByToken(token, "confirmation", "confirmed");
// 			return {
// 				success: true,
// 				message: "Welcome back! You're now re-subscribed to The Upkeep.",
// 				status: "confirmed",
// 			};
// 		}
//
// 		// Confirm pending subscription
// 		await updateStatusByToken(token, "confirmation", "confirmed");
//
// 		return {
// 			success: true,
// 			message: "You're now subscribed to The Upkeep! ",
// 			status: "confirmed",
// 		};
// 	});

export const Route = createFileRoute("/newsletter/confirm")({
	component: ConfirmPage,
	// --- Phase 2: restore token-based route config (TBC #14) ---
	// validateSearch: (search: Record<string, unknown>) => ({
	// 	token: (search.token as string) || "",
	// }),
	// loaderDeps: ({ search }) => ({ token: search.token }),
	// loader: ({ deps }) => {
	// 	if (!deps.token) {
	// 		return {
	// 			success: false,
	// 			message: "No confirmation token provided",
	// 			error: "missing_token",
	// 		} as TokenValidationResult;
	// 	}
	//
	// 	return confirmSubscription({ data: { token: deps.token } });
	// },
});

// --- Phase 2: restore result components (TBC #14) ---
// function SuccessResult({ message }: { message: string }) {
// 	return (
// 		<div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
// 			<CheckCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
// 			<h2 className="mb-2 font-semibold text-2xl">{message}</h2>
// 			<p className="mb-6 text-muted-foreground">
// 				You'll receive devlogs from The Builder Coil sharing progress on{" "}
// 				<a
// 					className="text-tbc-violet hover:underline"
// 					href="https://chronomation.com"
// 					rel="noopener noreferrer"
// 					target="_blank"
// 				>
// 					Chronomation
// 				</a>
// 				, real-world agentic building experiments, and lessons learned.
// 			</p>
// 			<Button asChild>
// 				<Link to="/blog">Explore the Blog</Link>
// 			</Button>
// 		</div>
// 	);
// }
//
// function InvalidTokenResult({ message }: { message: string }) {
// 	return (
// 		<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
// 			<XCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
// 			<h2 className="mb-2 font-semibold text-2xl">Invalid Link</h2>
// 			<p className="mb-6 text-muted-foreground">{message}</p>
// 			<Button asChild variant="outline">
// 				<Link to="/newsletter">Try signing up again</Link>
// 			</Button>
// 		</div>
// 	);
// }
//
// function ErrorResult({ message }: { message: string }) {
// 	return (
// 		<div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-8 text-center">
// 			<AlertCircle className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
// 			<h2 className="mb-2 font-semibold text-2xl">Something went wrong</h2>
// 			<p className="mb-6 text-muted-foreground">{message}</p>
// 			<Button asChild variant="outline">
// 				<Link to="/newsletter">Go to Newsletter</Link>
// 			</Button>
// 		</div>
// 	);
// }

function ConfirmPage() {
	// --- Phase 2: restore loader-based rendering (TBC #14) ---
	// const result = Route.useLoaderData();
	//
	// const renderResult = () => {
	// 	if (result.success) {
	// 		return <SuccessResult message={result.message} />;
	// 	}
	// 	if (result.error === "invalid_token") {
	// 		return <InvalidTokenResult message={result.message} />;
	// 	}
	// 	return <ErrorResult message={result.message} />;
	// };

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
					<p className="text-muted-foreground">Newsletter Confirmation</p>
				</div>

				{/* Static contact-us message (workaround — TBC #13) */}
				{/* Phase 2: replace with {renderResult()} */}
				<div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
					<Mail className="mx-auto mb-4 h-12 w-12 text-primary" />
					<h2 className="mb-2 font-semibold text-2xl">
						Need help with your subscription?
					</h2>
					<p className="mb-6 text-muted-foreground">
						We're currently migrating our newsletter system. If you need to
						confirm or manage your subscription, please reach out to us
						directly.
					</p>
					<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
						<Button asChild>
							<a href="mailto:contact@thebuildercoil.com">Contact Us</a>
						</Button>
						<Button asChild variant="outline">
							<Link to="/newsletter">Back to Newsletter</Link>
						</Button>
					</div>
				</div>
			</AnimatedGroup>
		</div>
	);
}
