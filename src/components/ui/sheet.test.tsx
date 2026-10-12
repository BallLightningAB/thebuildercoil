import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "./sheet";

it.each(["Escape", "Close"])(
	"opens the navigation sheet and restores focus after %s",
	async (dismissal) => {
		render(
			<Sheet>
				<SheetTrigger>Open navigation</SheetTrigger>
				<SheetContent>
					<SheetTitle>Navigation</SheetTitle>
					<SheetDescription>Choose a page</SheetDescription>
					<a href="/about">About</a>
				</SheetContent>
			</Sheet>,
		);
		const trigger = screen.getByRole("button", { name: "Open navigation" });
		trigger.focus();
		fireEvent.click(trigger);
		const dialog = await screen.findByRole("dialog", { name: "Navigation" });
		expect(dialog).toHaveAccessibleDescription("Choose a page");
		expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
			"href",
			"/about",
		);
		if (dismissal === "Escape") {
			fireEvent.keyDown(dialog, { key: "Escape" });
		} else {
			fireEvent.click(screen.getByRole("button", { name: "Close" }));
		}
		await waitFor(() =>
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
		);
		await waitFor(() => expect(trigger).toHaveFocus());
	},
);
