# EOE-SAPSI-1.0 — SEO, Accessibility, Performance, Security & GARI Backend Integration

Status: IMPLEMENTED IN CODE · PRODUCTION ACTIVATION REQUIRES ENVIRONMENT/DNS/DB CONFIGURATION

## SEO
- Canonical metadata base is `https://evolutionofenergy.org`.
- Page-specific canonical URLs and descriptions are defined for the principal public routes.
- Production deployments are indexable; preview/non-production deployments are noindex.
- `robots.ts` blocks API/private review paths and `sitemap.ts` enumerates launch routes.
- JSON-LD is implemented for WebSite, Book and Person. Publisher/ISBN are omitted until factual values are frozen.
- The canonical cover is the current social-image fallback. A017 remains a later canonical social-card asset.
- Journal remains noindex until a substantive article is approved.

## Accessibility
- WCAG 2.2 AA remains the production target.
- Skip link, focus states, semantic landmarks, reduced-motion handling and forced-colors focus fallback are implemented.
- GARI form now exposes field-level errors, an error summary, disabled submitting state, required controls, accessible status confirmation and keyboard-operable controls.
- Turnstile is used only as a form security control and is not rendered when no public key is configured.
- Manual keyboard, screen-reader, 200% zoom, contrast and reduced-motion QA remain required before launch.

## Performance
- Canonical and author images use `next/image` responsive delivery.
- AVIF/WebP image optimization and 30-day optimized-image cache TTL are configured.
- Vercel Web Analytics and Speed Insights scripts are optional and disabled unless `NEXT_PUBLIC_ENABLE_VERCEL_OBSERVABILITY=true`.
- Core Web Vitals targets remain LCP <=2.5s, INP <=200ms, CLS <=0.1; field data must be measured after deployment.

## Security
- Security headers include CSP, HSTS in production, nosniff, Referrer-Policy, frame denial and restrictive Permissions-Policy.
- CSP allows only the site plus Cloudflare Turnstile's required script/frame/connect origin; unsafe-eval is development-only.
- GARI API validates same-origin requests, Zod payloads, honeypot field and Turnstile verification.
- Rate limiting uses recent institutional email and, when configured, a SHA-256 request fingerprint. Raw IP addresses are not persisted in the GARI request table.
- Secrets are environment variables only.

## GARI backend
- POST endpoint: `/api/gari/review-request`.
- PostgreSQL schema: `gari_review_requests`.
- ORM: Drizzle; driver: postgres-js.
- External reference format is randomized `GARI-YYYY-XXXXXXXX`; DB UUID is not exposed.
- Status model preserves REQUESTED -> UNDER_REVIEW -> APPROVED / NOT_ISSUED -> ISSUED -> RESPONSE_RECEIVED -> CLOSED.
- A SQL migration is included under `drizzle/0001_gari_review_requests.sql`.
- Transactional email uses a small Resend-compatible HTTPS adapter. It is dormant until API key, verified sending identity and the confirmed academic-review inbox are configured.
- Review-copy PDF generation, private object storage and expiring signed links remain a later GARI issuance milestone.

## Required production variables
- `DATABASE_URL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `RATE_LIMIT_PEPPER`
- `EMAIL_API_KEY`
- `TRANSACTIONAL_FROM_EMAIL`
- `ACADEMIC_REVIEW_EMAIL`
- plus confirmed `AUTHOR_EMAIL`, `CONTACT_EMAIL`, `AMAZON_BOOK_URL` when available.

## Production activation gates
1. Provision PostgreSQL and apply migration.
2. Configure Turnstile domain/site keys.
3. Confirm professional email addresses and transactional sending identity.
4. Verify SPF/DKIM/DMARC coexistence before GARI outreach.
5. Set production secrets in Vercel; do not commit `.env`.
6. Enable GARI form only after a real end-to-end submission test reaches DB + applicant confirmation + academic-review inbox.
7. Run build, typecheck, accessibility, Lighthouse, browser/device and security-header QA.

## Validation note
Dependency installation could not complete in the artifact execution environment because npm registry access timed out. Global TypeScript parsing reached the source tree but cannot resolve Next/React/Drizzle modules without `node_modules`. Therefore this milestone is implemented but does not claim a mechanically verified `next build` yet.
