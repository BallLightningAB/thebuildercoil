import { createServerFn } from "@tanstack/react-start";

export interface GitHubContributionDay {
	date: string;
	count: number;
}

export interface GitHubContributionResponse {
	total: Record<string, number>;
	contributions: Array<{
		date: string;
		count: number;
		level: number;
	}>;
}

export interface GitHubGraphData {
	activities: { date: string; count: number; level: number }[];
	totalCount: number;
	year: number;
}

async function fetchGitHubContributions(
	username: string
): Promise<GitHubGraphData> {
	const res = await fetch(
		`https://github-contributions-api.jogruber.de/v4/${username}`,
		{
			// Avoid caching too aggressively during development; you can tune this later.
			cache: "no-store",
		}
	);

	if (!res.ok) {
		throw new Error(`Failed to fetch GitHub contributions: ${res.status}`);
	}

	const json = (await res.json()) as GitHubContributionResponse;

	// Calculate date for 12 months ago
	const twelveMonthsAgo = new Date();
	twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

	// Calculate today's date
	const today = new Date();

	// Keep only contributions from the last 12 months, up to today
	const activities = json.contributions
		.filter((day) => {
			const dayDate = new Date(day.date);
			return dayDate >= twelveMonthsAgo && dayDate <= today;
		})
		.map((day) => ({
			date: day.date,
			count: day.count,
			// Clamp level to the 0–4 range expected by ContributionGraph
			level: Math.max(0, Math.min(4, day.level)),
		}));

	// Calculate total count for the last 12 months
	const totalCount = activities.reduce((sum, day) => sum + day.count, 0);

	return {
		activities,
		totalCount,
		year: new Date().getFullYear(),
	};
}

export const getGitHubContributions = createServerFn({ method: "GET" })
	.inputValidator((input: { username: string }) => input)
	.handler(async ({ data }) => {
		try {
			return await fetchGitHubContributions(data.username);
		} catch {
			// If the external API is unavailable, degrade gracefully with an empty graph.
			return {
				activities: [],
				totalCount: 0,
				year: new Date().getFullYear(),
			};
		}
	});
