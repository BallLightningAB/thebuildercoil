/**
 * Contact Form Email Service
 * Sends contact form submissions via Resend
 */

import { Resend } from "resend";

const resend = new Resend(process.env.CHRONO_RESEND_API_KEY);

export interface ContactFormData {
	name: string;
	email: string;
	message: string;
}

export interface SendEmailResult {
	success: boolean;
	messageId?: string;
	error?: string;
}

/**
 * Send contact form submission to admin email
 */
export async function sendContactEmail(
	data: ContactFormData
): Promise<SendEmailResult> {
	const { name, email, message } = data;

	// Recipient for contact form submissions
	const toEmail = process.env.TBC_CONTACT_EMAIL || "contact@thebuildercoil.com";

	try {
		const { data: result, error } = await resend.emails.send({
			from:
				process.env.TBC_RESEND_DEFAULT_FROM ||
				"The Builder Coil <noreply@updates.chronomation.com>",
			to: toEmail,
			replyTo: email,
			subject: `Contact Form: Message from ${name}`,
			html: `
				<div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #8B5CFF;">New Contact Form Submission</h2>
					<div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
						<p><strong>From:</strong> ${name}</p>
						<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
						<hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;">
						<p><strong>Message:</strong></p>
						<p style="white-space: pre-wrap;">${message}</p>
					</div>
					<p style="color: #666; font-size: 12px;">
						This message was sent from the contact form on The Builder Coil.
					</p>
				</div>
			`,
		});

		if (error) {
			console.error("Resend error:", error);
			return {
				success: false,
				error: error.message,
			};
		}

		return {
			success: true,
			messageId: result?.id,
		};
	} catch (err) {
		console.error("Error sending contact email:", err);
		return {
			success: false,
			error: err instanceof Error ? err.message : "Unknown error",
		};
	}
}
