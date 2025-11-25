import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	resolvedTheme: "dark" | "light";
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
	undefined
);

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = "tbc-theme",
}: ThemeProviderProps) {
	const [theme, setThemeState] = useState<Theme>(() => {
		if (typeof window === "undefined") {
			return defaultTheme;
		}
		return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
	});

	const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove("light", "dark");

		let effectiveTheme: "dark" | "light";

		if (theme === "system") {
			effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		} else {
			effectiveTheme = theme;
		}

		root.classList.add(effectiveTheme);
		setResolvedTheme(effectiveTheme);
	}, [theme]);

	// Listen for system theme changes
	useEffect(() => {
		if (theme !== "system") {
			return;
		}

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = (e: MediaQueryListEvent) => {
			const root = window.document.documentElement;
			root.classList.remove("light", "dark");
			const newTheme: "dark" | "light" = e.matches ? "dark" : "light";
			root.classList.add(newTheme);
			setResolvedTheme(newTheme);
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme]);

	const setTheme = (newTheme: Theme) => {
		localStorage.setItem(storageKey, newTheme);
		setThemeState(newTheme);
	};

	return (
		<ThemeProviderContext.Provider value={{ theme, setTheme, resolvedTheme }}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeProviderContext);

	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
}
