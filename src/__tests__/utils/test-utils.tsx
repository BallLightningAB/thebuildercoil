import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { vi } from "vitest";

/**
 * Custom render function that can be reused across projects
 * Add any custom providers here (Router, QueryClient, etc.)
 */
export function renderWithProviders(
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
) {
	return render(ui, options);
}

/**
 * Reusable mock for TanStack Router
 */
export const mockRouter = {
	navigate: vi.fn(),
	useLocation: vi.fn(() => ({ pathname: "/" })),
	useSearch: vi.fn(() => ({})),
	useParams: vi.fn(() => ({})),
};

/**
 * Reusable mock for localStorage
 */
export const mockLocalStorage = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
};

/**
 * Setup common mocks for tests
 */
export function setupCommonMocks() {
	global.localStorage = mockLocalStorage as any;
	window.matchMedia = vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	}));
}
