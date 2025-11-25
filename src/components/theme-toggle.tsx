import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

function renderThemeIcon(theme: string, resolvedTheme: string) {
	if (theme === "system") {
		return <Monitor className="h-5 w-5" />;
	}
	if (resolvedTheme === "dark") {
		return <Moon className="h-5 w-5" />;
	}
	return <Sun className="h-5 w-5" />;
}

export function ThemeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme();

	const cycleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
		} else if (theme === "dark") {
			setTheme("system");
		} else {
			setTheme("light");
		}
	};

	return (
		<Button
			aria-label={`Current theme: ${theme}. Click to change.`}
			className="relative h-9 w-9"
			onClick={cycleTheme}
			size="icon"
			variant="ghost"
		>
			{renderThemeIcon(theme, resolvedTheme)}
		</Button>
	);
}
