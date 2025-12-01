import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type NewsletterCTAProps = {
	/** Compact mode for footer placement */
	compact?: boolean;
};

/**
 * Newsletter call-to-action component.
 * Can be used in footer (compact) or as a standalone section.
 */
export function NewsletterCTA({ compact = false }: NewsletterCTAProps) {
	if (compact) {
		return (
			<div className="space-y-3">
				<h4 className="font-semibold text-foreground text-sm">🌀 The Upkeep</h4>
				<p className="text-muted-foreground text-sm">
					Get devlogs on Chronomation, agentic AI experiments, and lessons from
					Ball Lightning AB.
				</p>
				<Button asChild className="gap-2" size="sm" variant="outline">
					<Link to="/newsletter">
						Subscribe
						<ArrowRight className="h-4 w-4" />
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="rounded-lg border border-border bg-muted/20 p-8 text-center">
			<div className="mb-4 text-4xl">🌀</div>
			<h3 className="mb-2 font-semibold text-2xl">The Upkeep</h3>
			<p className="mb-2 text-primary text-sm">
				Engineering card advantage in real life
			</p>
			<p className="mx-auto mb-6 max-w-md text-muted-foreground">
				Get devlogs from The Builder Coil sharing progress on Chronomation,
				real-world agentic building experiments, and lessons learned running
				Ball Lightning AB.
			</p>
			<Button asChild className="gap-2">
				<Link to="/newsletter">
					Subscribe to Newsletter
					<ArrowRight className="h-4 w-4" />
				</Link>
			</Button>
		</div>
	);
}
