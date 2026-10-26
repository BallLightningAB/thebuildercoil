# Deleting Features Is Part of How I Keep a Side Project Maintainable

When I changed the scope of The Builder Coil, I removed the newsletter and contact form. I also removed the email code and dependencies that supported them.

The reason was straightforward. The site had become an occasional personal devlog. I was no longer building a newsletter funnel or using it to attract consulting work. Keeping those features would have left the site promising something I was not planning to maintain.

That cleanup has stayed with me because it is a useful response to a problem AI makes very easy to create: building more than I want to look after.

## Adding the feature has become the easy part

A contact form sounds small. With AI helping, getting one working can be a short task. Add the fields, validation, a server function, and an email provider. Test the happy path and there it is.

Afterward, there are other questions. Does delivery still work? What happens when someone submits rubbish? Where does the data go? Is the credential still needed? Which dependencies are involved? If something breaks, who notices?

For a small company, a form may easily justify that work. For my occasional devlog, direct email and GitHub were enough.

AI helped make the more complicated version affordable to build. I still had to decide whether it was worth keeping.

## I removed the working parts too

The cleanup went beyond taking links out of the navigation.

The newsletter routes, signup components, supporting server code, email dependencies, and configuration were removed. The contact page became a static page with ways to reach me. The sitemap and public copy were updated as well.

That mattered because hiding a form would have left much of the maintenance behind it in place. A route or server function can still exist even if nobody can find it in the menu.

There is no claim here that removing these features made the whole site secure. It did reduce the amount of code and configuration I needed to understand and maintain.

It also made the site more honest about its purpose.

## Each feature needs a reason to stay

I have become more interested in the ongoing cost of small features.

One integration may need very little attention. Several integrations, a login system, a payment flow, and an email service add up. They may all be perfectly reasonable decisions individually. Together, they can become a lot for one person working in spare time.

The same applies to a small company with limited development capacity. Someone has to own the updates, accounts, failures, and data handling after the feature is delivered.

Before keeping or adding something, I want to be able to answer a few questions:

- Who is using it, and what useful job does it do?
- What data and permissions does it require?
- What will need attention if I leave the project alone for a month?
- Is there a simpler way to provide enough of the same value?

Sometimes the answer will be to keep the feature. Sometimes the simpler option will be good enough. Both are easier decisions when I account for the work afterward.

## An archive needs boundaries too

When I [paused Chronomation and narrowed the scope of my projects](/news/new-chapter-hultafors-group), I kept the writing and lessons available as an archive.

That let me preserve work I valued without continuing to present the product as actively developing.

An archive still needs some care if it is hosted online. Calling a project archived does not update its dependencies or remove an old service. I need to separate the material I want to keep available from the running parts I no longer want to operate.

For The Builder Coil, that meant keeping the posts while removing features that belonged to the site's earlier purpose.

## Making room for the next experiment

The current security climate gives me another reason to keep this under control. There are more capable tools for finding weaknesses, and the tools I use to build are themselves becoming more connected and powerful.

My response cannot be to spend every spare hour watching alerts across an ever-growing collection of projects. I need a collection small enough that I can maintain it sensibly.

I still want to build things because they look interesting. That is one of the best uses of AI for me. I can explore an idea that previously would have taken too much time to attempt.

Deleting a feature that no longer earns its place helps make that possible. It leaves me with less unattended work and more room to enjoy the next project.
