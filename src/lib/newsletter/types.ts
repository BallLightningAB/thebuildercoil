/**
 * Newsletter Types
 * Phase 1: TBC-only JSON storage
 */

export type SubscriptionStatus = "pending" | "confirmed" | "unsubscribed";

export type SignupMeta = {
	source: string; // e.g. "tbc_blog_form", "footer_cta"
	userAgent?: string;
	ip?: string;
	createdFromPath?: string; // e.g. "/newsletter"
	notes?: string;
};

export type SignupRecord = {
	email: string;
	status: SubscriptionStatus;
	confirmationToken: string;
	unsubToken: string;
	meta: SignupMeta;
	createdAt: string; // ISO 8601
	confirmedAt: string | null;
	unsubscribedAt: string | null;
};

export type NewsletterSignupInput = {
	email: string;
	consent: boolean;
	source?: string;
	path?: string;
};

export type NewsletterSignupResult = {
	success: boolean;
	message: string;
	error?: string;
};

export type TokenValidationResult = {
	success: boolean;
	message: string;
	status?: SubscriptionStatus;
	error?: string;
};
