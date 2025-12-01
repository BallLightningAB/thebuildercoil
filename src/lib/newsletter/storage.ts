/**
 * Newsletter JSON Storage Utilities
 * Phase 1: TBC-only JSON storage
 *
 * All I/O is wrapped in utility functions for easy migration to Neon later.
 */

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { signupRecordsArraySchema } from "./schemas";
import type { SignupRecord } from "./types";

const STORAGE_PATH = join(process.cwd(), "content/newsletter/subscribers.json");

/**
 * Ensure the newsletter directory exists
 */
async function ensureStorageDir(): Promise<void> {
	const dir = dirname(STORAGE_PATH);
	if (!existsSync(dir)) {
		await mkdir(dir, { recursive: true });
	}
}

/**
 * Load all signup records from JSON file
 */
export async function loadNewsletterSignups(): Promise<SignupRecord[]> {
	try {
		await ensureStorageDir();

		if (!existsSync(STORAGE_PATH)) {
			return [];
		}

		const data = await readFile(STORAGE_PATH, "utf-8");
		const parsed = JSON.parse(data);

		// Validate the data structure
		const result = signupRecordsArraySchema.safeParse(parsed);
		if (!result.success) {
			console.error(
				"Newsletter storage validation error:",
				result.error.issues
			);
			return [];
		}

		return result.data as SignupRecord[];
	} catch (error) {
		console.error("Error loading newsletter signups:", error);
		return [];
	}
}

/**
 * Atomically write all records back to JSON file
 */
export async function saveNewsletterSignups(
	records: SignupRecord[]
): Promise<void> {
	try {
		await ensureStorageDir();
		const data = JSON.stringify(records, null, 2);
		await writeFile(STORAGE_PATH, data, "utf-8");
	} catch (error) {
		console.error("Error saving newsletter signups:", error);
		throw new Error("Failed to save newsletter data");
	}
}

/**
 * Find a record by email
 */
export async function findByEmail(email: string): Promise<SignupRecord | null> {
	const records = await loadNewsletterSignups();
	const normalizedEmail = email.toLowerCase().trim();
	return records.find((r) => r.email.toLowerCase() === normalizedEmail) ?? null;
}

/**
 * Find a record by confirmation or unsub token
 */
export async function findByToken(
	token: string,
	type: "confirmation" | "unsub"
): Promise<SignupRecord | null> {
	const records = await loadNewsletterSignups();

	if (type === "confirmation") {
		return records.find((r) => r.confirmationToken === token) ?? null;
	}

	return records.find((r) => r.unsubToken === token) ?? null;
}

/**
 * Create or update a signup record
 */
export async function upsertSignup(
	email: string,
	data: Partial<SignupRecord>
): Promise<SignupRecord> {
	const records = await loadNewsletterSignups();
	const normalizedEmail = email.toLowerCase().trim();
	const existingIndex = records.findIndex(
		(r) => r.email.toLowerCase() === normalizedEmail
	);

	if (existingIndex >= 0) {
		// Update existing record
		const existing = records[existingIndex];
		const updated: SignupRecord = {
			...existing,
			...data,
			email: normalizedEmail,
		};
		records[existingIndex] = updated;
		await saveNewsletterSignups(records);
		return updated;
	}

	// Create new record
	const newRecord: SignupRecord = {
		email: normalizedEmail,
		status: "pending",
		confirmationToken: data.confirmationToken ?? crypto.randomUUID(),
		unsubToken: data.unsubToken ?? crypto.randomUUID(),
		meta: data.meta ?? { source: "unknown" },
		createdAt: new Date().toISOString(),
		confirmedAt: null,
		unsubscribedAt: null,
		...data,
	};

	records.push(newRecord);
	await saveNewsletterSignups(records);
	return newRecord;
}

/**
 * Update a record's status by token
 */
export async function updateStatusByToken(
	token: string,
	type: "confirmation" | "unsub",
	newStatus: SignupRecord["status"]
): Promise<SignupRecord | null> {
	const records = await loadNewsletterSignups();

	const index = records.findIndex((r) =>
		type === "confirmation"
			? r.confirmationToken === token
			: r.unsubToken === token
	);

	if (index === -1) {
		return null;
	}

	const record = records[index];
	record.status = newStatus;

	if (newStatus === "confirmed") {
		record.confirmedAt = new Date().toISOString();
	} else if (newStatus === "unsubscribed") {
		record.unsubscribedAt = new Date().toISOString();
	}

	await saveNewsletterSignups(records);
	return record;
}
