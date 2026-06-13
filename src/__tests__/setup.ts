import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Cleanup after each test
afterEach(() => {
	cleanup();
});

// Mock window.matchMedia for responsive components
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
	disconnect() {
		// Mock implementation
	}
	observe() {
		// Mock implementation
	}
	takeRecords() {
		return [];
	}
	unobserve() {
		// Mock implementation
	}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
	disconnect() {
		// Mock implementation
	}
	observe() {
		// Mock implementation
	}
	unobserve() {
		// Mock implementation
	}
} as any;
