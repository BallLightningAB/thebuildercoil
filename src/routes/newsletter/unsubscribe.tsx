import { createFileRoute, Link } from "@tanstack/react-router";
// import { createServerFn } from "@tanstack/react-start";
// import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { ArrowLeft, Mail } from "lucide-react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Button } from "@/components/ui/button";
// import { findByToken, updateStatusByToken } from "@/lib/newsletter/storage";
// import type { TokenValidationResult } from "@/lib/newsletter/types";

// --- Phase 2: restore token-based unsubscribe (TBC #14) ---
// const unsubscribeFromNewsletter = createServerFn({ method: "GET" })
// 	.inputValidator((data: { token: string }) => data)
// 	.handler(async ({ data }): Promise<TokenValidationResult> => {
// 		const { token } = data;
//
// 		if (!token) {
// 			return {
// 				success: false,
// 				message: "No unsubscribe token provided",
// 				error: "missing_token",
// 			};
// 		}
//
// 		// Find record by unsub token
// 		const record = await findByToken(token, "unsub");
//
// 		if (!record) {
// 			return {
// 				success: false,
// 				message: "Invalid unsubscribe link",
// 				error: "invalid_token",
// 			};
// 		}
//
// 		if (record.status === "unsubscribed") {
// 			return {
// 				success: true,
// 				message: "You're already unsubscribed from The Upkeep.",
// 				status: "unsubscribed",
// 			};
// 		}
//
// 		// Unsubscribe
// 		await updateStatusByToken(token, "unsub", "unsubscribed");
//
// 		return {
// 			success: true,
// 			message: "You've been unsubscribed from The Upkeep.",
// 			status: "unsubscribed",
// 		};
// 	});

export const Route = createFileRoute("/newsletter/unsubscribe")({
	component: UnsubscribePage,
	// --- Phase 2: restore token-based route config (TBC #14) ---
	// validateSearch: (search: Record<string, unknown>) => ({
	// 	token: (search.token as string) || "",
	// }),
	// loaderDeps: ({ search }) => ({ token: search.token }),
	// loader: ({ deps }) => {
	// 	if (!deps.token) {
	// 		return {
	// 			success: false,
	// 			message: "No unsubscribe token provided",
	// 			error: "missing_token",
	// 		} as TokenValidationResult;
	// 	}
	//
	// 	return unsubscribeFromNewsletter({ data: { token: deps.token } });
	// },
});

// --- Phase 2: restore result components (TBC #14) ---
// function SuccessResult({ message }: { message: string }) {
// 	return (
// 		<div className="rounded-lg border border-border bg-muted/20 p-8 text-center">
// 			<CheckCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
// 			<h2 className="mb-2 font-semibold text-2xl">{message}</h2>
// 			<p className="mb-6 text-muted-foreground">
// 				We're sorry to see you go. You can always re-subscribe if you change
// 				your mind.
// 			</p>
// 			<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
// 				<Button asChild variant="outline">
// 					<Link to="/newsletter">Re-subscribe</Link>
// 				</Button>
// 				<Button asChild>
// 					<Link to="/">Go to Home</Link>
// 				</Button>
// 			</div>
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
// 				<Link to="/">Go to Home</Link>
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
// 				<Link to="/">Go to Home</Link>
// 			</Button>
// 		</div>
// 	);
// }

function UnsubscribePage() {
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
					<p className="text-muted-foreground">Unsubscribe</p>
				</div>

				{/* Static contact-us message (workaround — TBC #13) */}
				{/* Phase 2: replace with {renderResult()} */}
				<div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
					<Mail className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
					<h2 className="mb-2 font-semibold text-2xl">Want to unsubscribe?</h2>
					<p className="mb-6 text-muted-foreground">
						We're currently migrating our newsletter system. To unsubscribe or
						manage your subscription, please contact us directly and we'll take
						care of it right away.
					</p>
					<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
						<Button asChild>
							<a href="mailto:contact@thebuildercoil.com">Contact Us</a>
						</Button>
						<Button asChild variant="outline">
							<Link to="/">Go to Home</Link>
						</Button>
					</div>
				</div>
			</AnimatedGroup>
		</div>
	);
}
