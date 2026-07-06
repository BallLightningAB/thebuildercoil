import { Link } from "@tanstack/react-router";

const footerLinks = {
	site: [
		{ href: "/", label: "Home" },
		{ href: "/blog", label: "Blog" },
		{ href: "/news", label: "News" },
		{ href: "/about", label: "About" },
		{ href: "/contact", label: "Contact" },
	],
	resources: [
		{
			href: "https://balllightning.cloud",
			label: "Ball Lightning AB",
			external: true,
		},
		{
			href: "https://balllightning.cloud/chronomation",
			label: "Chronomation (archived)",
			external: true,
		},
		{
			href: "https://balllightning.cloud/privacy",
			label: "Privacy Policy",
			external: true,
		},
	],
};

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-border border-t bg-background">
			<div className="container mx-auto max-w-6xl px-4 py-12">
				<div className="grid gap-8 md:grid-cols-3">
					{/* Brand */}
					<div className="md:col-span-1">
						<Link className="flex items-center gap-2" to="/">
							<img
								alt="The Builder Coil"
								className="h-6 w-6"
								height={24}
								src="/logo.png"
								width={24}
							/>
							<span className="font-semibold text-lg">The Builder Coil</span>
						</Link>
						<p className="mt-3 text-muted-foreground text-sm">
							An occasional personal devlog by Nicolas Brulay for hobby
							projects, technical experiments, learning notes, and archived
							project reflections.
						</p>
					</div>

					{/* Site Links */}
					<div>
						<h4 className="mb-3 font-semibold text-foreground text-sm">Site</h4>
						<ul className="space-y-2">
							{footerLinks.site.map((link) => (
								<li key={link.href}>
									<Link
										className="text-muted-foreground text-sm transition-colors hover:text-foreground"
										to={link.href}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Resources */}
					<div>
						<h4 className="mb-3 font-semibold text-foreground text-sm">
							Resources
						</h4>
						<ul className="space-y-2">
							{footerLinks.resources.map((link) => (
								<li key={link.href}>
									{link.external ? (
										<a
											className="text-muted-foreground text-sm transition-colors hover:text-foreground"
											href={link.href}
											rel="noopener noreferrer"
											target="_blank"
										>
											{link.label} ↗
										</a>
									) : (
										<Link
											className="text-muted-foreground text-sm transition-colors hover:text-foreground"
											to={link.href}
										>
											{link.label}
										</Link>
									)}
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom */}
				<div className="mt-8 flex flex-col items-center justify-between gap-4 border-border border-t pt-8 md:flex-row">
					<p className="text-muted-foreground text-sm">
						© {currentYear} Ball Lightning AB. All rights reserved.
					</p>
					<p className="text-muted-foreground text-sm">
						A personal hobby site — posts are sporadic by design.
					</p>
				</div>
			</div>
		</footer>
	);
}
