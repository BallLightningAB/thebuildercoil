# AI Helps Me Maintain My Projects. Its Access Needs Maintenance Too.

When I ask an AI coding agent to help with a project, I usually want it to do quite a lot. Read the repository, understand the setup, change files, run commands, investigate a failed build, and check the result.

That is where much of the value comes from. I can spend more time deciding what I want and less time carrying out every step myself.

But that useful assistant may also have access to source code, credentials, external services, and commands on my machine. Adding another connection can take minutes. Remembering everything I have connected becomes a job of its own.

For a solo developer, the convenience is very real. So is the responsibility that comes with it.

## My tooling has grown along with my projects

Earlier this year, I [reviewed my AI skills library and cleaned up overlapping instructions](/blog/skill-refresh-pruning-ai-skills-aligning-devin-codex). I also worked on making instructions and workflows consistent between my coding tools.

That work was mostly about clarity and maintenance. I wanted fewer stale instructions, fewer conflicts, and less time spent explaining the same repository again.

It also made me think about how much context and access I was adding to the setup. Skills can contain instructions and scripts. Tool connections can reach other systems. Repository files, issue descriptions, and web pages all contribute material an agent might read while working.

Those pieces deserve a review for more than whether they make the agent productive.

## An issue title became an entry point

One example that brings this into focus is [Adnan Khan's Clinejection research](https://adnanthekhan.com/posts/clinejection/).

An AI agent was being used to triage GitHub issues. A malicious issue title could influence the agent, which had broad tool access. The attack then crossed into traditional CI problems: poisoned caches, stolen release credentials, and an unauthorized package publication.

The full chain involved several weaknesses. The AI did not somehow invent access that was unavailable to the workflow. Its place in the workflow gave an attacker a way to reach capabilities and trust that were already there.

That is the part I can relate to. Automating issue triage sounds helpful when one person is doing everything. It is easy to focus on the time saved and give less thought to what that automation can reach.

## Instructions alone cannot carry this

I use repository instructions because they help an agent work consistently. They can explain the package manager, coding conventions, and how to validate a change.

I would not want to rely on a sentence in those instructions as the only thing protecting a production credential.

If an agent can read a secret or run a command, I need to consider what happens if it makes a mistake or follows instructions embedded in something it was supposed to inspect. A strong model and a well-written prompt are useful, but neither removes that question.

For me, the practical starting point is to look at each connection and ask:

- What can it read?
- What can it change?
- Does this task need that access?
- What would I have to repair or revoke if something went wrong?

That is understandable without becoming an AI security specialist. It is also a useful way to spot connections I added for one task and no longer need.

## Keep the useful autonomy, narrow the consequences

I want agents to be able to inspect code, prepare changes, and run checks with as little unnecessary interruption as possible. Requiring approval for every small step would consume much of the time I was trying to save.

The more consequential actions deserve a different setup. Publishing a package, changing production data, or using a credential that reaches several services should require a deliberate decision about access and review.

My aim is to give a task the access it needs for the time it needs it. For experiments, that can mean test accounts and a separate environment. For maintenance, it can mean preparing and validating a change before granting the ability to publish it.

The details will depend on the tools. The question stays fairly simple: if this task goes wrong, how far can the damage spread?

## The connections need occasional cleanup

There is a familiar pattern here. I install something to solve a problem, it works, and it quietly becomes part of the permanent setup.

With AI tools, that can leave behind skills, scripts, permissions, and connected accounts. Reviewing those belongs alongside reviewing dependencies.

I still want the extra capability AI gives me. For a small company or hobby developer, being able to get competent help across so many parts of a project is remarkable.

I also want to be able to explain what that help can access. If I lose track of that, the setup has grown beyond what I can comfortably manage alone.
