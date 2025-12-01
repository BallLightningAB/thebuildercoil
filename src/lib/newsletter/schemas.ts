/**
 * Newsletter Zod Schemas
 * Phase 1: TBC-only JSON storage
 */

import { z } from "zod";

export const subscriptionStatusSchema = z.enum([
	"pending",
	"confirmed",
	"unsubscribed",
]);

export const signupMetaSchema = z.object({
	source: z.string(),
	userAgent: z.string().optional(),
	ip: z.string().optional(),
	createdFromPath: z.string().optional(),
	notes: z.string().optional(),
});

export const signupRecordSchema = z.object({
	email: z.string().email(),
	status: subscriptionStatusSchema,
	confirmationToken: z.string().uuid(),
	unsubToken: z.string().uuid(),
	meta: signupMetaSchema,
	createdAt: z.string().datetime(),
	confirmedAt: z.string().datetime().nullable(),
	unsubscribedAt: z.string().datetime().nullable(),
});

export const signupRecordsArraySchema = z.array(signupRecordSchema);

// Form validation schemas
export const newsletterSignupFormSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	consent: z
		.boolean()
		.refine(
			(val) => val === true,
			"You must agree to receive emails to continue"
		),
});

export const tokenQuerySchema = z.object({
	token: z.string().uuid("Invalid token format"),
});

export type SignupRecordSchema = z.infer<typeof signupRecordSchema>;
export type NewsletterSignupFormSchema = z.infer<
	typeof newsletterSignupFormSchema
>;
