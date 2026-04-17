# Auth Foundation: The Infrastructure That Makes Shipping API Dojo a Real Product

Issue #11 is now complete. The auth, entitlements, billing, email, and domain foundation for Shipping API Dojo v2 is in place on the feature branch codex/issue-11-auth-foundation.

This is the infrastructure that enables Shipping API Dojo to become a real product. Better Auth for authentication. Creem for billing. Resend for email. shipping.apidojo.app as the production domain.

This is how the implementation went.

## Better Auth: authentication and organization management

The authentication layer is built on Better Auth. The decision to use Better Auth came from the technical scoping phase—it was the right fit for the requirements:

- User accounts with email/password and OAuth (Google, GitHub)
- Session management handled by Better Auth
- Organization/tenant model for multi-product support under the apidojo.app umbrella
- Magic link tokens for passwordless flows
- Verification table for email confirmation and other token-based workflows
- Smooth integration with Creem with great documentation and SDK

Better Auth manages several tables automatically: user, session, account, verification, organization, member, and invitation. I mapped these to custom table names where needed—organization becomes tenants, member becomes tenant_members—to align with the apidojo.app multi-product vision.

The auth configuration also includes custom additionalFields:

- On users: terms_accepted_at, privacy_policy_accepted_at, deleted_at
- On tenants: plan, seat_limit, default_currency, billing_status, creem_customer_id, creem_subscription_id, current_period_end, settings

This is where the billing integration starts to take shape.

## Creem: merchant of record for billing

Creem replaces earlier Polar assumptions as the merchant of record. Creem handles invoicing, tax, payments, refunds, and chargebacks. It's very developer-friendly and has no fixed costs. I handle the product logic and entitlement enforcement.

The billing state lives on the tenant record:

- creem_customer_id: links the tenant to their Creem customer
- creem_subscription_id: links the tenant to their active subscription
- billing_status: tracks the subscription state (active, past_due, canceled, etc.)
- current_period_end: when the current billing period ends

I also introduced two new tables for Creem integration:

- creem_products: maps Creem product IDs to internal plan keys and module slugs
- creem_webhook_events: provides idempotency for webhook processing

The webhook events table is critical. Creem sends webhooks for checkout.completed, subscription lifecycle events, refunds, and disputes. The unique constraint on event_id ensures I process each webhook exactly once, even if Creem retries the delivery.

## Resend: transactional email infrastructure

Transactional email needs a dedicated setup. The foundation includes:

- Dedicated Resend account for API Dojo
- Verified domain under the apidojo.app umbrella, mail.apidojo.app for Resend
- Multiple sender identities on the verified domain
- Transactional email architecture for notifications, receipts, and account-related emails

Resend Free allows one verified domain per team with multiple sender identities. That's sufficient since I use the umbrella domain for all future products.

The email architecture is designed to support:

- Welcome emails and onboarding flows
- Subscription notifications and receipts
- Password reset and magic link delivery
- Product announcements and updates

## Domain foundation: shipping.apidojo.app

The domain strategy from scoping is now in foundation:

- apidojo.app is the umbrella/root domain
- shipping.apidojo.app is the production hostname for this product
- mail.apidojo.app is the Resend domain
- DNS configuration for the production hostname
- SSL certificate setup
- Proper canonical URLs and redirect handling

The domain cutover is planned as a controlled site move, not an ad hoc rename. That means proper SEO preservation throughout the transition—redirects, canonical URLs, and sitemap updates.

The apidojo.app umbrella is important. It positions Shipping API Dojo as the first product under a broader API Dojo brand, with room for future sibling products like the planned EDI site.

## Server functions and webhook handlers

The implementation includes both authenticated server functions and server-only HTTP request handlers:

- Authenticated server functions for signed-in progress and user-facing operations
- Server-only HTTP request handlers for webhook endpoints that require raw-body signature verification

This separation is important. Webhook endpoints from Creem need access to the raw request body for signature verification. That's only possible with server-only handlers. User-facing operations use authenticated server functions for proper session handling.

## Environment variables and configuration

The foundation includes a complete environment variable checklist covering authentication session encryption, callback URLs, API keys for billing and email services, webhook signature verification secrets, and database connection strings.

Every external service integration is documented with its required environment variables. That's the handoff checklist from scoping made real.

## What this foundation enables

With issue #11 complete, the infrastructure is in place for:

- User registration and authentication
- Subscription management through Creem
- Entitlement enforcement based on subscription status
- Transactional email delivery
- Progress tracking tied to authenticated users
- Multi-tenant support under the apidojo.app umbrella

This is the foundation that makes the content-family migration in issue #8 and the full content expansion in issue #9 possible. Without auth and billing, randomized learning at scale is just a technical demo. With it, it's a real product.

## What's next

The auth foundation is complete. The proof of concept for content families and seeded randomization (issue #8) can now build on this foundation. The full content migration (issue #9) can assume authenticated users and server-authoritative progress.

The browser smoke suite (issue #17) will validate that all of this works together at the route level—auth flows, protected routes, and the core user-visible surfaces.

The infrastructure is ready. Now the real product work begins.

<!--
## Hero Image Ideas

### Option 1: Infrastructure stack diagram

A clean, layered diagram showing the auth foundation stack: Better Auth at the authentication layer, Creem at the billing layer, Resend at the email layer, Neon Postgres at the data layer, with shipping.apidojo.app as the domain label. Each layer has small icons representing the key components—user accounts, subscriptions, email delivery, database tables. Scandinavian design, warm neutrals with teal accents.

### Option 2: Foundation blocks composition

A more editorial composition: foundation blocks labeled "Authentication", "Billing", "Email", and "Domain" arranged as a stable base, with the content-family and randomization layers sitting on top. The blocks have small visual elements representing Better Auth, Creem, Resend, and the apidojo.app domain. Less technical diagram, more about the foundation concept.

## Image Prompt

Editorial technology illustration, wide blog hero image, auth foundation infrastructure presented as a clean layered diagram, Better Auth for authentication with user accounts and organizations, Creem for billing with subscriptions and webhooks, Resend for email with transactional delivery, Neon Postgres for data storage, shipping.apidojo.app domain label, Scandinavian design sensibility, warm neutrals with teal accents, precise and structured, no vendor logos, no gibberish text, infrastructure clarity over chaos

## Screenshot Idea

Create a composite screenshot showing the GitHub issue #11 completed status with its deliverables, overlaid with small visual callouts: one showing the Better Auth configuration from the codebase, one showing the Creem webhook event schema, and one showing the Resend email template structure. That tells the whole story in one image: the completed auth foundation, the Better Auth integration, the Creem billing setup, and the Resend email infrastructure.
-->
