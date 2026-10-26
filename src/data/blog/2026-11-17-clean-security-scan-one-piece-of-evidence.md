# A Clean Security Scan Is One Piece of Evidence

At the end of a dependency review in October, the audits for The Builder Coil came back clean. That was a useful result, especially after the updates and repairs that had led up to it.

But the work during that month also showed me how much judgment sits around those results.

One security update was required by the deployment platform before it appeared in the registry audit I was using. Another advisory remained open without a patched release, so I had to look at how the affected package was used. That advisory was later withdrawn upstream.

The numbers changed. Understanding why they changed was part of the job.

## The tools did not all see the same thing

During the framework update, Vercel blocked a deployment because of a TanStack Start security advisory that was absent from the registry audit at that point.

The framework maintainer's [security update](https://tanstack.com/blog/tanstack-start-security-update-cve-2026-102989) identified the patched versions. Updating and checking the actual resolved dependencies was necessary before proceeding.

The audit was still useful. Its result just did not cover everything the deployment platform was checking at that moment.

For a solo developer, this is an awkward part of maintenance. I want a small set of tools that tells me what needs attention. Sometimes those tools disagree because their information or coverage differs, and I have to spend time resolving that disagreement.

AI is helpful for following those threads. It can compare an advisory with a lockfile and help identify where a package comes from. I still want the conclusion to point back to something I can inspect.

## A severity label needs context

Another finding involved `braces`, a package reached through development tooling. At the time of the review, the advisory was rated high and had no patched release.

The important questions were where it ran and what input could reach it. In this project it was used by development tooling over repository-controlled paths, rather than processing public web requests.

That limited the exposure in the setup I was reviewing. It did not make development tooling irrelevant: local tools and CI can have valuable access of their own. It meant the response needed to account for the actual use of the package.

I documented the finding and the reasoning instead of suppressing it to get a cleaner report.

The [advisory was withdrawn on October 23](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). The later clean audit reflected that upstream change as well as the dependency work. It would have been inaccurate to describe every disappearing alert as a vulnerability I had fixed.

## Checks answer different questions

I try to keep the meaning of each check reasonably clear:

- A dependency audit checks the installed versions against known advisories in its database.
- A secret scan looks for the kinds of exposed credentials it recognizes.
- Tests check the behavior covered by their assertions.
- A build checks that the application can be built with that configuration.
- A check of the deployed site verifies the pages and interactions I actually inspect.

Together, these give me useful evidence. There will still be gaps.

Even a web request needs interpretation. During the October work, preview requests redirected to Vercel authentication. A successful response from the login page could not count as verification that my application content rendered correctly.

That is an easy detail to miss when an automated helper is reporting a long list of passing checks.

## AI review needs something I can verify

AI makes it much easier to ask for a security review. It can also produce a very convincing explanation of a problem that has not been demonstrated.

For a small project, investigating every plausible concern would quickly use up the time I hoped to save.

What I want from a useful finding is fairly concrete: the affected code or dependency, how it can be reached, what input or permission is required, and the evidence supporting the claim. Where practical, I want a reproduction or a test that fails before the fix and passes afterward.

Mozilla makes a similar point in its account of [AI-assisted security work](https://hacks.mozilla.org/2026/05/behind-the-scenes-hardening-firefox/): reproducible test cases and the process around findings were essential to making the extra discovery useful.

A second model agreeing may help me investigate, but agreement alone does not demonstrate the problem. I need to be able to follow the reasoning back to the application.

## Enough confidence to keep working

I do not have a security department behind my hobby projects. I need checks that are affordable to run and conclusions I can understand well enough to act on.

That includes being precise about what passed, what remains unresolved, and what changed upstream. A short note written during the review can save quite a lot of confusion when I return to the project later.

I still like seeing a clean report. I like it more when I can explain how I got there.
