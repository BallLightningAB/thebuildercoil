# Shipper API Dojo: Built in One Day

I planned, built, debugged, and launched Shipper API Dojo in a single day. It’s an open-source training track that helps shipping and logistics teams (including sales and implementation folks) harden their APIs fast, without needing to be full-time engineers.

## The Problem I’m Solving

Shipping and logistics stacks are brittle. Carrier integrations, rate shopping, labels, tracking, exceptions, webhooks, retries — each vendor is different, and each customer’s setup is unique. Engineering time is scarce, but the pain is shared across the org: sales teams need credible demos, implementation teams need reliable playbooks, and ops needs confidence the APIs won’t break on launch day.

## The One-Day Plan

I scoped a single-day sprint to ship something real:
- **Define the dojo track**: focus on carrier integration hardening, webhook resilience, idempotency, retry/backoff, and sandbox-to-prod checklists.
- **Noncommercial-first**: PolyForm Noncommercial 1.0.0 — fork and adapt for noncommercial use; reach out for commercial licensing.
- **Audience inclusive**: engineers, sales engineers, and implementation leads — anyone who touches shipping flows.
- **Training-ready**: exercises, prompts, and checklists that map to real shipping scenarios.

## What I Built Today

- **API hardening drills**: scenarios for label creation, tracking updates, and exception handling with clear inputs/outputs.
- **Webhook resilience lab**: simulate dropped/duplicated webhooks, test idempotency keys, and verify retry policies.
- **Playbooks for non-engineers**: plain-language guides so sales and implementation can explain and validate flows with customers.
- **Logging and observability tips**: minimal, copy-pasteable patterns for request/response tracing in shipping contexts.
- **OSS repo structure**: organized modules so teams can plug in their carrier SDKs or in-house adapters.

## Debugging in the Open

I hit the usual friction: mismatched carrier sandbox behaviors, overzealous idempotency caches, and flaky test data. Each issue was documented, fixed, and folded into the drills so teams can reproduce and prevent the same failures.

## Who This Helps

- **Engineers**: tighten reliability before the next peak season.
- **Sales & SEs**: demo credible, resilient flows without waiting on engineering tickets.
- **Implementation**: faster customer onboardings with repeatable API checklists.
- **Support/Success**: clearer runbooks for diagnosing carrier and webhook edge cases.

## How to Use It

1. Use the product at https://api-trainer.balllightning.cloud
2. Or clone or fork the repo (PolyForm Noncommercial 1.0.0).  
3. Run the drills locally with your carrier adapters.  
4. Hand the playbooks to sales/implementation so they can validate flows with customers.  
5. Add your own scenarios and PR them back — I’ll keep curating.

## What’s Next

- Expand scenarios for multi-carrier rate shopping and returns. 
- Add guided videos and annotated traces.
- Publish a companion checklist for SOC2-ready logging in logistics APIs.

## Feedback Wanted

I’ll post a LinkedIn recap next — drop your requested features or scenarios in the comments there so I can prioritize the next drills. Your input (from engineering, sales, or implementation) guides the roadmap.