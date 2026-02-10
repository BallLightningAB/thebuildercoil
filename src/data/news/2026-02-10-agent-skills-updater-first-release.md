# Agent Skills Updater: First Open-Source Release

I'm pleased to announce the release of [Agent Skills Updater](https://github.com/BallLightningAB/agent-skills-updater) — a cross-platform CLI tool that keeps AI coding skills in sync across more than 40 IDEs and AI coding assistants. It's available now on [PyPI](https://pypi.org/project/agent-skills-updater/) and it's the first open-source release from Ball Lightning AB.

## What It Does

AI coding assistants like Windsurf, Cursor, Claude Code, and GitHub Copilot use "skills" — markdown files that give them specialised knowledge about specific domains. SEO, copywriting, frontend design, security patterns, and dozens more. These skills come from various GitHub repositories, each with a different structure, and each IDE stores them in a different location.

Agent Skills Updater handles all of that. You configure your skill sources once in a YAML file, run a single command, and it pulls, detects, and installs everything to the right places. It backs up your current skills before every update and can roll back with one command if something breaks.

```bash
pip install agent-skills-updater
agent-skills-update --verbose
```

## Key Features

- **40+ supported IDEs** — Windsurf, Cursor, Claude Code, GitHub Copilot, Amp, Gemini CLI, and many more
- **Automatic structure detection** — Handles four different repository layouts without manual configuration
- **Backup and rollback** — Timestamped snapshots before every update, one-command restore
- **Lockfile tracking** — Know exactly what's installed and when it was last updated
- **Self-update** — Checks PyPI for new versions after each run, upgrades itself with `agent-skills-update self-update`
- **Cross-platform** — Windows, macOS, and Linux. Python 3.12+

## Why Open-Source

This started as a PowerShell script I wrote for my own workflow. When I realised other people using AI coding assistants were managing skills the same tedious way — manually checking for updates, manually downloading and copying files — it made sense to build it properly and share it.

Open-sourcing it under Apache 2.0 was a straightforward decision. The tool solves a real workflow problem, and making it freely available means more people can focus on actually using their AI assistants instead of maintaining them.

## Part of a Larger Ecosystem

Agent Skills Updater is the first publicly available tool in the Chronomation ecosystem — a collection of tools and services I'm building around AI-assisted development targeting indie makers and small teams. More to come on that front.

## Links

- **GitHub**: [BallLightningAB/agent-skills-updater](https://github.com/BallLightningAB/agent-skills-updater)
- **PyPI**: [agent-skills-updater](https://pypi.org/project/agent-skills-updater/)
- **Discover skills**: [skills.sh](https://skills.sh/)

## What's Next

I'm actively developing this tool and have a public [project board](https://github.com/users/BallLightningAB/projects/7) tracking what's coming next. If you use AI coding assistants with skills, I'd genuinely like to hear what would make this tool more useful for your workflow. Open an [issue on GitHub](https://github.com/BallLightningAB/agent-skills-updater/issues), or reach out directly.

For updates on this and other Ball Lightning AB projects, subscribe to [The Upkeep](https://thebuildercoil.com/newsletter) newsletter.
