import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Menu, Twitter } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/blog", label: "Blog" },
	{ href: "/news", label: "News" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
	{ href: "/newsletter", label: "The Upkeep", highlight: true },
];

const socialLinks = [
	{
		href: "https://github.com/BallLightningAB",
		label: "GitHub",
		icon: Github,
	},
	{ href: "https://twitter.com/balllightningab", label: "X", icon: Twitter },
	{
		href: "https://www.linkedin.com/company/thebuildercoil",
		label: "LinkedIn",
		icon: Linkedin,
	},
];

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
				{/* Logo */}
				<Link className="flex items-center gap-2" to="/">
					<img
						alt="The Builder Coil"
						className="h-16 w-16"
						height={32}
						src="/logo.png"
						width={32}
					/>
					<span className="font-semibold text-foreground text-lg dark:text-tbc-cream">
						The Builder Coil
					</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden items-center gap-6 md:flex">
					{navLinks.map((link) => (
						<Link
							className={
								link.highlight
									? "font-medium text-primary text-sm transition-colors hover:text-primary/80"
									: "font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
							}
							key={link.href}
							to={link.href}
						>
							{link.highlight ? `🌀 ${link.label}` : link.label}
						</Link>
					))}
				</nav>

				{/* Actions */}
				<div className="flex items-center gap-3">
					{/* Social icons - desktop only */}
					<div className="hidden items-center gap-1 md:flex">
						{socialLinks.map((link) => (
							<a
								aria-label={link.label}
								className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
								href={link.href}
								key={link.href}
								rel="noopener noreferrer"
								target="_blank"
							>
								<link.icon className="h-4 w-4" />
							</a>
						))}
					</div>

					<ThemeToggle />

					{/* Mobile Menu */}
					<Sheet onOpenChange={setMobileMenuOpen} open={mobileMenuOpen}>
						<SheetTrigger asChild className="md:hidden">
							<Button size="icon" variant="ghost">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent className="w-[280px]" side="right">
							<SheetHeader>
								<SheetTitle className="text-left">Navigation Menu</SheetTitle>
								<SheetDescription className="sr-only">
									Main navigation links for mobile devices
								</SheetDescription>
							</SheetHeader>
							<nav className="mt-8 flex flex-col gap-4">
								{navLinks.map((link) => (
									<Link
										className={
											link.highlight
												? "font-medium text-primary text-lg transition-colors hover:text-primary/80"
												: "font-medium text-foreground text-lg transition-colors hover:text-tbc-teal"
										}
										key={link.href}
										onClick={() => setMobileMenuOpen(false)}
										to={link.href}
									>
										{link.highlight ? `🌀 ${link.label}` : link.label}
									</Link>
								))}
							</nav>
							{/* Social icons in mobile menu */}
							<div className="mt-8 flex gap-4 border-border border-t pt-6">
								{socialLinks.map((link) => (
									<a
										aria-label={link.label}
										className="text-muted-foreground transition-colors hover:text-foreground"
										href={link.href}
										key={link.href}
										rel="noopener noreferrer"
										target="_blank"
									>
										<link.icon className="h-5 w-5" />
									</a>
								))}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
