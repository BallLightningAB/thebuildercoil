# Debugging TanStack Store: When Your React App Crashes Before It Renders

Sometimes the simplest bugs are the most instructive. This is the story of a TanStack Store implementation that looked correct, compiled without errors, and crashed spectacularly in the browser.

The project: **Carrier API-Trainer**, an interactive learning platform for REST and SOAP carrier integrations. The stack: TanStack Start, React 19, TailwindCSS v4. The problem: `atom?.get is not a function`.

Let me walk you through what went wrong, how I fixed it, and what I learned about reading documentation and debugging using three tools: the Context7 MCP, the TanStack Store docs, and the browser's debugger.

---

## The Setup: A Working MVP That Suddenly Wasn't

The API-Trainer MVP was complete. Eight lessons, 20+ drills, five incident scenarios, all built on a previous session. Progress tracking worked via `@tanstack/react-store` with localStorage persistence, debounced writes, and cross-tab sync.

Or so I thought.

When I spun up the dev server for a fresh session to add branding updates, the console exploded:

```
Uncaught TypeError: atom?.get is not a function
    at @tanstack_react-store.js:638:70
    at chunk-XG4JXUYT.js:126:41
    at mountSyncExternalStore
```

The app wouldn't render. No progress widgets, no XP badges, no streak counters. Just a white screen and a stack trace pointing at TanStack Store internals.

---

## The Investigation: What Does the Documentation Actually Say?

First instinct: check the implementation. The previous session had created a custom `useProgressStore` hook that bypassed TanStack's built-in `useStore`:

```typescript
// ❌ WRONG: Custom hook using useSyncExternalStore
export function useProgressStore<T>(selector: (state: ProgressData) => T): T {
  return useSyncExternalStore(
    (callback) => progressStore.subscribe(callback).unsubscribe,
    () => selector(progressStore.state),
    () => selector(progressStore.state)
  );
}
```

The comment even said: *"Bypasses @tanstack/react-store `useStore` to avoid `atom?.get is not a function` errors."*

That's a red flag. If you're working around a library's API, you're probably using it wrong.

I pulled up the [TanStack Store documentation](https://tanstack.com/store/latest/docs/framework/react/quick-start) and compared it to our implementation:

**Official pattern:**
```typescript
import { Store, useStore } from "@tanstack/react-store";

const store = new Store({ dogs: 0, cats: 0 });

function Display({ animal }) {
  const count = useStore(store, (state) => state[animal]);
  return <div>{animal}: {count}</div>;
}
```

**Our broken pattern:**
```typescript
import { useProgressStore } from "@/lib/progress/progress.store";

function XpBadge() {
  const xp = useProgressStore((s) => s.xp);
  return <div>XP: {xp}</div>;
}
```

The difference: **we weren't passing the store instance to the hook**. TanStack's `useStore` takes two arguments: the store, then the selector. Our custom hook only took the selector and tried to access `progressStore.state` directly.

---

## The Fix: Use the Library's API, Not Your Own

The fix was straightforward once I understood the pattern:

1. **Remove the custom hook** from `progress.store.ts`
2. **Import `useStore` from `@tanstack/react-store`** in every component
3. **Pass both the store and selector** to `useStore`

Before:
```typescript
// ❌ Custom workaround
import { useProgressStore } from "@/lib/progress/progress.store";

const xp = useProgressStore((s) => s.xp);
```

After:
```typescript
// ✅ Correct TanStack Store API
import { useStore } from "@tanstack/react-store";
import { progressStore } from "@/lib/progress/progress.store";

const xp = useStore(progressStore, (s) => s.xp);
```

I updated six files:
- `src/components/progress/ProgressWidgets.tsx`
- `src/components/progress/LessonStatus.tsx`
- `src/components/progress/ContinueBanner.tsx`
- `src/routes/settings.tsx`
- `src/routes/arena/index.tsx`
- `src/lib/progress/progress.store.ts` (removed the custom hook)

Restarted the dev server. The app rendered. Progress widgets appeared. XP and streak badges worked. No errors.

---

## The Lesson: Read the Docs, Then Read Them Again

This bug taught me three things:

### 1. **Don't Work Around Library APIs**

If you find yourself writing a custom hook to "fix" a library's behavior, stop. You're probably misusing the library. Check the documentation first.

The previous session's comment — *"Bypasses @tanstack/react-store to avoid errors"* — was a warning sign I should have caught earlier. Libraries don't ship broken APIs. If the official pattern doesn't work, you're not following the official pattern.

### 2. **Context7 MCP Is Your Friend**

I used the Context7 MCP to query TanStack Store's latest docs directly from the IDE. The query: *"How to properly use useStore hook with createStore in React - correct selector syntax and atom usage"*

The response showed me the exact pattern I needed, with working examples. No guessing, no Stack Overflow archaeology. Just the canonical answer from the source.

### 3. **Small Fixes, Big Impact**

This was a one-line change per component. Import the right hook, pass the right arguments, done. But it fixed a crash that blocked the entire app.

The fix took 10 minutes. The investigation took 30. The lesson: when something breaks, check your assumptions before you check the library.

---

## The Bonus: A Fresh Color Scheme

While I was in there fixing the store, I also updated the color scheme. The API-Trainer had inherited Ball Lightning's red branding (`#DD3A28`), but the new logo uses blue, green, and yellow.

Updated:
- CSS variables: `--bl-red` → `#3B82F6` (blue)
- Theme meta tags: `#DD3A28` → `#3B82F6`
- Chart colors: red/rose/ember → blue/green/yellow
- All component hover states and accent colors

The rebrand took another 15 minutes. Total time from crash to commit-ready: under an hour.

---

## The Worse Bug: Hydration Overwrote the Progress Store

After the crash fix, hydration still bit me. On first load, the client rehydration step replaced my in-memory `progressStore` with an empty default state, wiping lesson completion. The symptom: the UI flickered from “completed” to “0%” after hydration, even though data was present on the server render.

**Root cause:** I was instantiating the store inside the component tree, so the server instance and client instance weren’t the same object. During hydration, the client created a fresh store and overwrote the serialized snapshot.

**Fix:** hoist the store singleton to a module boundary and pass the initial snapshot into `hydrateStore(initialState)`. Concretely:
- Move `const progressStore = createStore(...)` to a shared module.
- Export a `hydrateProgressStore(initialState)` helper that calls `progressStore.setState(initialState)` on the client.
- In the route loader, serialize the store state; in the component, call the hydrate helper before subscribing with `useStore(progressStore, selector)`.

Result: no more state reset, and hydration now preserves completed drills across SSR/CSR. Lesson learned — keep stateful singletons out of render scope, and always hydrate before subscribing.

---

## The Takeaway

**When your React app crashes with `atom?.get is not a function`:**

1. Check if you're using the library's official API
2. Verify you're passing all required arguments to hooks
3. Query the docs (Context7 MCP makes this trivial)
4. Don't write workarounds for problems you don't understand

**The commit message:**
```
fix(store): resolve TanStack Store crash + rebrand color scheme

- Fixed TanStack Store crash: replaced custom useProgressStore 
  with proper useStore hook from @tanstack/react-store
- Updated all component imports to use useStore(progressStore, selector)
- Updated color scheme: removed red in favor of blue/green/yellow from logo
- Updated theme-color meta tags, CSS variables, and chart colors

Refs: v1.0.1, TanStack Store fix, color rebrand
```

Clean code. Working app. Lessons learned. That's a good day.

---

**Tech Stack:** TanStack Start, React 19, TanStack Store, TypeScript, TailwindCSS v4  
**Project:** [Carrier API-Trainer](https://api-trainer.balllightning.cloud)  
**Related:** [Building with TanStack Start](/blog/building-with-tanstack-start)
