import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-background text-foreground">
			<h1 className="font-bold text-4xl uppercase tracking-tight">
				thebuildercoil
			</h1>
		</main>
	);
}
