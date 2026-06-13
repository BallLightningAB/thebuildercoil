import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { resolve } from "node:path";

export default defineConfig({
	plugins: [
		tanstackStart(),
		react(),
	],
	resolve: {
		tsconfigPaths: true,
		alias: {
			"@": resolve(import.meta.dirname, "./src"),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/__tests__/setup.ts"],
		include: ["src/**/*.{test,spec}.{ts,tsx}"],
		exclude: [
			"**/node_modules/**",
			"**/dist/**",
			"**/.vercel/**",
		],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: [
				"node_modules/",
				"src/routeTree.gen.ts",
				"**/*.test.{ts,tsx}",
				"**/*.spec.{ts,tsx}",
				"src/__tests__/**",
			],
		},
	},
});
