import { render, waitFor } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { CodeBlockContent } from "./index";
import { CodeBlockContent as ServerCodeBlockContent } from "./server";

it("highlights client code with both themes and preserves diff annotations", async () => {
	const { container } = render(
		<CodeBlockContent language="typescript">
			{"const value = 1; // [!code ++]"}
		</CodeBlockContent>,
	);
	await waitFor(() =>
		expect(container.querySelector("pre.shiki")).not.toBeNull(),
	);
	expect(container.querySelector(".diff.add")).not.toBeNull();
	expect(container.innerHTML).toContain("--shiki-dark");
	expect(container.textContent).toContain("const value = 1;");
	expect(container.textContent).not.toContain("[!code ++]");
});

it("renders server code with focus/highlight annotations and escapes HTML", async () => {
	const element = await ServerCodeBlockContent({
		children: 'const value = "<script>alert(1)</script>"; // [!code highlight]',
		language: "typescript",
	});
	const html = renderToStaticMarkup(element);
	expect(html).toContain("highlighted");
	expect(html).toContain("--shiki-dark");
	expect(html).not.toContain("<script>");
	const rendered = new DOMParser().parseFromString(html, "text/html");
	expect(rendered.querySelector("script")).toBeNull();
	expect(rendered.body.textContent).toContain("<script>alert(1)</script>");
});

it("keeps unhighlighted client code escaped", () => {
	const { container } = render(
		<CodeBlockContent syntaxHighlighting={false}>
			{"<script>alert(1)</script>"}
		</CodeBlockContent>,
	);
	expect(container.querySelector("script")).toBeNull();
	expect(container.textContent).toContain("<script>alert(1)</script>");
});
