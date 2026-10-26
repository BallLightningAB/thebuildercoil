# Keeping My Side Projects Secure as AI Speeds Everything Up

AI has made it possible for me to build much more than I could reasonably have built alone a few years ago. A small tool, a website, an integration, a proof of concept. The distance between having an idea and having something working has become very short.

I like that. It is a large part of why I keep experimenting.

But the projects stay around after the productive weekend is over. They still have dependencies, hosting, credentials, and the occasional security alert. That work has to fit into the same spare time I wanted to spend building the next thing.

Lately, that has felt like the hangover from building so quickly.

## October involved quite a lot of upkeep

During October, maintenance on The Builder Coil included clearing thirteen dependency alerts, updating the framework, fixing lockfiles, and checking that the site still worked after the updates.

Then another update arrived. Then a Windows command-injection vulnerability in development tooling needed attention. Dependabot failed to open the PR for that one, so the fix needed to be prepared separately.

Some grouped dependency updates also dropped settings from the lockfile that were needed to preserve earlier security fixes. A routine update could therefore fail installation or propose a dependency graph that needed repairing before I could trust it.

None of this involved adding a new feature to the blog. It was the work required to keep the existing site in a state I was comfortable running.

I wrote earlier about [the workflow work hidden inside dependency updates](/blog/dependabot-prs-codex-sandbox-workflow-lessons). October gave me more examples.

## AI is helping on both sides

There is a wider reason this feels relevant now.

[Mozilla has described using AI to find longstanding security bugs in Firefox](https://hacks.mozilla.org/2026/05/behind-the-scenes-hardening-firefox/). That is useful defensive work. It also means maintainers have more findings to investigate and fixes to get out to users.

On the other side, [Microsoft reported in October that attackers were using an AI agent framework to accelerate attacks](https://www.microsoft.com/en-us/security/blog/2026/10/21/storm-0940-uses-artex-agentic-ai-connectwise-supply-chain-compromise/), including activity connected to a supply-chain compromise.

I cannot attribute the vulnerabilities in my own dependencies to AI. What these reports do show is that AI is becoming useful for finding weaknesses and for acting on them. The extra capability is available to people maintaining software and people trying to break into it.

As a hobby developer or a very small company, I still have to decide what that means for an ordinary week.

## My maintenance capacity has a limit

I work full-time, and Ball Lightning is now mostly a company presence, portfolio, and archive. My personal projects have to fit around that.

AI can help me investigate an alert, prepare a fix, and run checks. It cannot give me another evening. If I use the saved time to start three more projects, I have also created three more things that may need attention later.

That is becoming part of how I judge a new idea. Alongside whether I can build it, I need to consider whether I want to keep it running six months from now.

A public page with some writing is one commitment. A service with user accounts, stored data, and integrations is a larger one. Both may be within reach to build. They ask different things of me afterward.

## A routine I can actually keep

The approach I want to stick to is fairly ordinary:

- Give routine dependency work a regular slot, so it does not depend on remembering which repository I last opened.
- Interrupt that routine when an advisory affects something exposed and needs prompt action.
- Keep installation, tests, builds, and deployment checks repeatable, so every update does not become a fresh investigation.
- Write down an unresolved risk and the reason for the decision, so I do not have to reconstruct it next time.
- Reconsider projects and features that keep demanding attention without serving much purpose.

An update bot helps with the first part of the job. I still need to check that the proposed update makes sense, that earlier fixes survive, and that the deployed application works.

I also need to be realistic about what a passing check proves. A successful build tells me the application builds. It does not establish that every security concern has been covered.

## I still want the building part

I have no interest in turning every hobby experiment into a large operational exercise. Being able to try things cheaply and quickly is valuable, especially when you are one person.

For me, keeping that freedom means being more selective about what stays online and making upkeep part of the project from the beginning.

The speed is still useful. I just need to leave enough time for the work that arrives after it.
