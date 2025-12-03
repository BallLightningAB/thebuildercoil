/**
 * Contact Form Server Functions
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sendContactEmail } from "./email-service";

const ContactFormSchema = z.object({
	name: z.string().min(1, "Name is required").max(100),
	email: z.string().email("Invalid email address"),
	message: z
		.string()
		.min(10, "Message must be at least 10 characters")
		.max(5000),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

/**
 * Server function to handle contact form submission
 */
export const submitContactForm = createServerFn({ method: "POST" })
	.inputValidator((input: ContactFormInput) => ContactFormSchema.parse(input))
	.handler(async ({ data }) => {
		const result = await sendContactEmail(data);

		if (!result.success) {
			throw new Error(result.error || "Failed to send message");
		}

		return {
			success: true,
			message: "Your message has been sent successfully!",
		};
	});
