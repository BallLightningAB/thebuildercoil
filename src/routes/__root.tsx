import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Layout } from "@/components/layout/Layout";
import { ThemeProvider } from "@/components/theme-provider";
import appCss from "../styles.css?url";

function RootNotFound() {
	return (
		<main className="py-20">
			<div className="container mx-auto max-w-3xl px-4 text-center">
				<h1 className="mb-4 font-bold text-3xl">Page not found</h1>
				<p className="mb-6 text-muted-foreground">
					The page you are looking for does not exist.
				</p>
				<a className="text-tbc-teal hover:underline" href="/">
					Go back home
				</a>
			</div>
		</main>
	);
}

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "The Builder Coil | Builder's Grimoire",
			},
			{
				name: "description",
				content:
					"A builder's grimoire for modern development. Devlogs, experiments, and lessons from Ball Lightning AB.",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@400;500;600;700&display=swap",
			},
			{
				rel: "icon",
				href: "/favicon.ico",
			},
		],
	}),
	notFoundComponent: RootNotFound,
	shellComponent: RootDocument,
	component: RootComponent,
});

function RootComponent() {
	return (
		<ThemeProvider defaultTheme="dark">
			<Layout>
				<Outlet />
			</Layout>
		</ThemeProvider>
	);
}

// Inline script to prevent theme flash on page load
const themeScript = `
(function() {
  const storageKey = 'tbc-theme';
  const theme = localStorage.getItem(storageKey) || 'dark';
  let resolved = theme;
  if (theme === 'system') {
    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.classList.add(resolved);
})();
`;

function RootDocument({ children }: { children: React.ReactNode }) {
	const isDev = import.meta.env.DEV;

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body className="scroll-smooth">
				{children}
				{isDev && (
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				)}
				<Scripts />
			</body>
		</html>
	);
}
