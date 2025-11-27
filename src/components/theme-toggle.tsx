import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<ThemeSwitcher className="h-9 px-1.5" onChange={setTheme} value={theme} />
	);
}
