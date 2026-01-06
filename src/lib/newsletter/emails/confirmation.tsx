/**
 * Confirmation Email Template
 * The Upkeep Newsletter - Double Opt-in
 */

import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";

export interface ConfirmationEmailProps {
	confirmUrl: string;
	unsubscribeUrl: string;
}

export function ConfirmationEmail({
	confirmUrl,
	unsubscribeUrl,
}: ConfirmationEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Confirm your subscription to The Upkeep</Preview>
			<Body style={main}>
				<Container style={container}>
					{/* Header */}
					<Section style={header}>
						<Text style={logo}>🌀</Text>
						<Heading style={heading}>The Upkeep</Heading>
						<Text style={tagline}>Engineering card advantage in real life</Text>
					</Section>

					<Hr style={hr} />

					{/* Main content */}
					<Section style={content}>
						<Text style={paragraph}>
							Thanks for signing up for The Upkeep! Please confirm your
							subscription by clicking the button below.
						</Text>

						<Button href={confirmUrl} style={button}>
							Confirm Subscription
						</Button>

						<Text style={paragraph}>
							Or copy and paste this link into your browser:
						</Text>
						<Text style={link}>{confirmUrl}</Text>
					</Section>

					<Hr style={hr} />

					{/* What to expect */}
					<Section style={content}>
						<Heading as="h2" style={subheading}>
							What to expect
						</Heading>
						<Text style={paragraph}>
							→ Progress updates on Chronomation development
							<br />→ Real-world agentic AI building experiments
							<br />→ Lessons learned running Ball Lightning AB
							<br />→ Occasional updates, not daily spam
						</Text>
					</Section>

					<Hr style={hr} />

					{/* Footer */}
					<Section style={footer}>
						<Text style={footerText}>
							If you didn't sign up for The Upkeep, you can safely ignore this
							email.
						</Text>
						<Text style={footerText}>
							<Link href={unsubscribeUrl} style={footerLink}>
								Unsubscribe
							</Link>
							{" · "}
							<Link href="https://thebuildercoil.com" style={footerLink}>
								The Builder Coil
							</Link>
							{" · "}
							<Link href="https://balllightning.cloud" style={footerLink}>
								Ball Lightning AB
							</Link>
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

// Styles
const main = {
	backgroundColor: "#05070A",
	fontFamily:
		'Montserrat, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "40px 20px",
	maxWidth: "560px",
};

const header = {
	textAlign: "center" as const,
	padding: "20px 0",
};

const logo = {
	fontSize: "48px",
	margin: "0 0 16px 0",
};

const heading = {
	color: "#F5E6D3",
	fontSize: "32px",
	fontWeight: "700",
	margin: "0 0 8px 0",
	fontFamily: 'Lora, "Times New Roman", ui-serif, Georgia, serif',
};

const tagline = {
	color: "#23F0FF",
	fontSize: "16px",
	fontWeight: "500",
	margin: "0",
};

const hr = {
	borderColor: "rgba(148, 163, 184, 0.35)",
	margin: "24px 0",
};

const content = {
	padding: "0",
};

const paragraph = {
	color: "#E5E7EB",
	fontSize: "16px",
	lineHeight: "24px",
	margin: "16px 0",
};

const button = {
	backgroundColor: "#a78bfa",
	borderRadius: "8px",
	color: "#05070A",
	display: "inline-block",
	fontSize: "16px",
	fontWeight: "600",
	padding: "12px 24px",
	textDecoration: "none",
	textAlign: "center" as const,
	margin: "16px 0",
};

const link = {
	color: "#a78bfa",
	fontSize: "14px",
	wordBreak: "break-all" as const,
};

const subheading = {
	color: "#F5E6D3",
	fontSize: "20px",
	fontWeight: "600",
	margin: "0 0 12px 0",
};

const footer = {
	textAlign: "center" as const,
	padding: "20px 0",
};

const footerText = {
	color: "#9CA3AF",
	fontSize: "12px",
	lineHeight: "20px",
	margin: "8px 0",
};

const footerLink = {
	color: "#9CA3AF",
	textDecoration: "underline",
};

export default ConfirmationEmail;
