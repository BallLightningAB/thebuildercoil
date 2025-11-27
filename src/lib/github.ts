import { createServerFn } from "@tanstack/react-start";

export type GitHubContributionDay = {
	date: string;
	count: number;
};

export type GitHubContributionResponse = {
	total: Record<string, number>;
	contributions: Array<{
		date: string;
		count: number;
		level: number;
	}>;
};

export type GitHubGraphData = {
	activities: { date: string; count: number; level: number }[];
	totalCount: number;
	year: number;
};

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

	// Find the latest year we have totals for
	const years = Object.keys(json.total).map((y) => Number.parseInt(y, 10));
	const latestYear =
		years.length > 0 ? Math.max(...years) : new Date().getFullYear();

	// Keep only contributions for that year
	const activities = json.contributions
		.filter((day) => day.date.startsWith(String(latestYear)))
		.map((day) => ({
			date: day.date,
			count: day.count,
			// Clamp level to the 0–4 range expected by ContributionGraph
			level: Math.max(0, Math.min(4, day.level)),
		}));

	const totalCountFromTotals = json.total[String(latestYear)];
	const totalCount =
		totalCountFromTotals ?? activities.reduce((sum, day) => sum + day.count, 0);

	return {
		activities,
		totalCount,
		year: latestYear,
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
