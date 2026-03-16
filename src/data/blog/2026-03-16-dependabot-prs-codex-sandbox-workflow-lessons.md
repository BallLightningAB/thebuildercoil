# What a Day of Dependabot PRs Taught Me About Hidden State, Codex Sandboxes, and Avoiding User-Specific Installs

I started today expecting to review two normal Dependabot PRs, one in `chronomation` and one in `jorild-se`.

Instead, I ended up fixing a broken lockfile, migrating my shared memory store from JSON to JSONL, debugging Vercel access, and tightening a few rules about how I want Codex to work inside my repos.

That happened partly because Codex is stricter than the setup I had been using in Windsurf. The sandbox pushed back sooner. It blocked more things by default. It made environment assumptions visible instead of letting me glide past them.

That was frustrating in the moment. It was also useful.

I also had to re-set up the GitHub MCP, since Codex handles it quite differently than Windsurf does and that likely took half an hour of manual debugging as Codex kept pointing me in the wrong direction.

## The dependency PR was only the visible part

This is the pattern I keep seeing with dependency work: the version bump is the visible change, but it is rarely the whole job.

The real work is everything around it:

- checking that the repo is using the package manager it actually expects
- making sure the lockfile still describes a complete install graph
- separating source-level failures from environment-level failures
- confirming that local validation and remote validation are telling the same story
- writing down repo-specific rules so I do not repeat the same mistakes next time

One of the smallest fixes from today was also one of the most valuable. In `jorild-se`, I added a repo-local note that the repository uses `npm`, not `pnpm`:

```md
# Repository-Specific Exceptions

- Package manager: use `npm` / `npm.cmd` for install, format, lint, and build commands in this repository.
- Do not use `pnpm` for repository workflows unless the user explicitly asks for it.
```

That is not glamorous work. It is also exactly the kind of guardrail that saves time when a repo is touched by another developer, another machine, CI, or an AI agent.

## The stricter sandbox exposed the hidden state

The deeper lesson was not really about Dependabot. It was about hidden local assumptions.

Throughout the day I kept tripping over tools that technically existed, but only in ways that were specific to my machine:

- `pre-commit` installed under my user-level Python environment
- `pnpm` going through Corepack state under `AppData`
- `npm` and pip temp/cache paths landing in user-profile locations
- a shared Memory MCP store living under my own user directory

None of that is ideal if the goal is a reproducible workflow.

Codex kept surfacing those assumptions because it could not casually lean on the same user-profile state that I tend to tolerate in a looser setup. In practice, that gave me a much sharper version of a rule I already believed in:

**avoid user-specific installations whenever you can.**

I would broaden that after today:

**avoid user-specific installs, user-profile caches, and undocumented machine-specific state.**

If a workflow only works because I happen to have the right thing in `%APPDATA%`, `AppData\Local`, or some remembered shell setup, then the workflow is not actually healthy yet.

## This showed me the difference between local friction and real failure

The `jorild-se` PR is where the most concrete debugging happened.

The first issue was easy to spot: `@typescript-eslint/eslint-plugin` had moved forward, so I aligned `@typescript-eslint/parser` with it instead of leaving them skewed:

```json
{
  "@typescript-eslint/eslint-plugin": "^8.57.0",
  "@typescript-eslint/parser": "^8.57.0"
}
```

That mattered, but it was not the real blocker.

The real blocker was the lockfile.

At one point the PR branch ended up with a much smaller `package-lock.json` than the healthy graph. The reduced lockfile had dropped concrete runtime packages such as `detect-node-es` and `intl-messageformat`, even though downstream packages still expected them through `use-sidecar` and `use-intl`.

That is exactly the kind of problem that can look fine until a remote build uses the lockfile literally.
It happened due to Codex initially trying to use pnpm over npm, global rules, as the repo exception wasn't yet present.

Locally, I kept seeing a different kind of failure. `next build` would compile successfully, finish linting and type-checking, and then die later with `spawn EPERM` inside the Codex sandbox. That signal was useful, but it was not the root cause of the broken deployment.

At this point I needed the Vercel MCP to facilitate debugging and of course that didn't work in Codex yet for me, so I had to handle that.

Vercel was what exposed the real failure:

- `Can't resolve 'detect-node-es'`
- `Can't resolve 'intl-messageformat'`

That distinction mattered a lot.

One lesson here is that a strict local sandbox and a strict remote deployment are useful in different ways. The sandbox told me, "your workflow still depends on permissions and user state." Vercel told me, "your lockfile is lying."

Both signals were valuable. They just answered different questions.

Once I restored the full npm dependency graph in `package-lock.json`, the replacement Vercel deployment went green and the PR became safe to merge.

## The memory-store migration made the same point at a different layer

The other thread from today was not a repo PR at all. It was my shared Memory MCP setup.

I had rebuilt the store as `server-memory.json`, which seemed reasonable on the surface. But the current `@modelcontextprotocol/server-memory` expects newline-delimited JSON records in a JSONL file, not one large JSON document with top-level `entities` and `relations`.

The important nuance was this: the upstream package can migrate from `memory.json` to `memory.jsonl`, but only if you let it use its default behavior. If you explicitly point `MEMORY_FILE_PATH` at a custom path, it uses that path as-is.

So this:

```toml
[mcp_servers.server_memory.env]
MEMORY_FILE_PATH = "C:/Users/nicol/.agents/memory/server-memory.jsonl"
```

is very different from pointing the same setting at `server-memory.json` and hoping the server will "figure it out."

That migration ended up touching more than one file:

- the actual shared memory store
- Codex config
- Windsurf MCP config
- the sync script that rebuilds the store
- the documented path in my own global rules

In other words, the problem was not just "wrong file extension." The problem was hidden toolchain state spread across multiple user-specific config locations.

Again, that is the same lesson: if important workflow behavior lives outside the repo, it needs to be explicit, portable, and consistent.

## What I am changing after today

I do not think the answer is to make every environment painful on purpose. Friction by itself is not a virtue.

But I do think stricter tooling is useful when it exposes vague process.

After today, these are the habits I want to keep:

1. One package manager per repo, stated explicitly in the repo.
2. One authoritative lockfile produced by that package manager.
3. Repo-local instructions for anything an agent could reasonably get wrong.
4. Fewer dependencies on tools that only exist in my user profile.
5. Remote validation treated as part of the truth, not as a formality.
6. Shared tool config kept consistent across Codex, Windsurf, and any sync scripts around them.

That is the practical version of repo hygiene for me now.

## The broader takeaway

I started the day thinking I was doing dependency maintenance.

What I was really doing was workflow maintenance.

The version bumps were just the trigger. The useful output was a clearer picture of where my process still relied on local convenience instead of explicit, shareable rules.

AI agents are very good at exposing that gap. They hit the undocumented corners immediately. They find the repo rule that only exists in my head. They find the tool that only works because I installed it for myself six months ago. They find the config path that one app updated and another one did not.

That can be annoying. It can also be exactly what makes the workflow better.

If I had to reduce the day to one sentence, it would be this:

**Use dependency PRs as a forcing function to improve repo hygiene, not just to update versions.**

And if I had to reduce it to one practical rule:

**avoid user-specific installations.**

<!--
## Hero Image Ideas

### Option 1: Workflow audit board

A wide editorial composition with two dependency PR cards, a terminal panel showing `spawn EPERM`, a lockfile diff, a green Vercel deployment badge, and a sticky note that says `json -> jsonl`. Calm, precise, investigative.

### Option 2: Hidden state under the workbench

A cleaner, more metaphorical hero image: package manager cards, lockfile pages, config files, and small labels like `AppData`, `lockfile`, `sandbox`, and `MCP` laid out on a workbench, with some pieces tucked underneath to imply hidden state. More tactile and less UI-literal.

## Image Prompt

Editorial technology illustration, wide blog hero image, dependency-maintenance workflow presented as an audit board, two pull request cards, lockfile diff, terminal output showing `spawn EPERM`, JSON to JSONL migration note, green deployment signal, Scandinavian design sensibility, warm neutrals with teal accents, clean practical lighting, realistic UI fragments, no vendor logos, no gibberish text, sharp and calm rather than chaotic

## Screenshot Idea

Create a three-panel composite screenshot: one panel with the local terminal showing the late `spawn EPERM` failure after compilation, one panel with the Vercel build error for missing `detect-node-es` / `intl-messageformat`, and one small panel showing the config change from `server-memory.json` to `server-memory.jsonl`. That tells the whole story in one image: local sandbox friction, remote lockfile truth, and the workflow cleanup that followed.
-->
