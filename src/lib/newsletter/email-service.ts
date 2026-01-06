/**
 * Newsletter Email Service
 * Phase 1: TBC-only using Chronomation Resend account
 */

import { Resend } from "resend";
import { ConfirmationEmail } from "./emails/confirmation";

const resend = new Resend(process.env.CHRONO_RESEND_API_KEY);

export interface SendConfirmationEmailParams {
	to: string;
	confirmationToken: string;
	unsubToken: string;
}

export interface SendEmailResult {
	success: boolean;
	messageId?: string;
	error?: string;
}

/**
 * Send a double opt-in confirmation email
 */
export async function sendConfirmationEmail({
	to,
	confirmationToken,
	unsubToken,
}: SendConfirmationEmailParams): Promise<SendEmailResult> {
	const baseUrl = process.env.APP_BASE_URL_TBC || "http://localhost:3000";
	const confirmUrl = `${baseUrl}/newsletter/confirm?token=${confirmationToken}`;
	const unsubscribeUrl = `${baseUrl}/newsletter/unsubscribe?token=${unsubToken}`;

	try {
		const { data, error } = await resend.emails.send({
			from:
				process.env.TBC_RESEND_DEFAULT_FROM ||
				"The Upkeep <theupkeep@updates.chronomation.com>",
			to,
			subject: "Confirm your subscription to The Upkeep",
			react: ConfirmationEmail({ confirmUrl, unsubscribeUrl }),
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
			messageId: data?.id,
		};
	} catch (err) {
		console.error("Error sending confirmation email:", err);
		return {
			success: false,
			error: err instanceof Error ? err.message : "Unknown error",
		};
	}
}
