# Evolution of Energy — Official Website

Production repository for **Evolution of Energy — First Canonical Edition** by **Sreedhar G.**

## Current milestone

**EOE-SAPSI-1.0 — SEO, Accessibility, Performance, Security & GARI Backend Integration**

Implemented:

- Next.js App Router + strict TypeScript architecture
- frozen EOE design tokens and responsive homepage
- canonical cover component using the approved publication cover
- real Sreedhar G. portrait supplied for the Author experience
- desktop sticky + mobile/reduced-motion Explore journey
- Book, Author and GARI production pages
- page-specific canonical metadata, sitemap and environment-aware robots policy
- WebSite, Book and Person JSON-LD without invented ISBN/publisher metadata
- responsive Next Image delivery and optional Vercel observability scripts
- security headers / CSP / HSTS production policy
- accessible GARI request form with server validation
- PostgreSQL + Drizzle GARI request storage
- Cloudflare Turnstile server verification, honeypot and rate limiting
- transactional GARI acknowledgement/internal notification adapter

See `docs/specifications/SAPSI-1.0.md` for production activation gates.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then visit `http://localhost:3000`.

## Database

Apply the included `drizzle/0001_gari_review_requests.sql` through your managed PostgreSQL migration workflow. Drizzle generation is available after setting `DATABASE_URL`:

```bash
npm run db:generate
# For a non-production development database only:
npm run db:push
```

Do not point development or preview environments at the production GARI database.

## Canonical asset rule

`public/canonical/eoe-canonical-cover.png` is the approved publication asset. **Do not redraw, recolor, crop, regenerate, replace typography or otherwise reinterpret it.** Delivery optimization may preserve the artwork while changing resolution/encoding.

`public/author/sreedhar-g-cropperd.jpg` is the real author photograph supplied for the website. It may be responsively cropped for layout, but must not be replaced by an AI-generated likeness.

## Still unresolved / launch-gated

- A002 original EOE symbol/vector source
- A013 confirmed Amazon/retailer URL
- A014–A016 confirmed official domain email addresses
- email DNS/deliverability: SPF, DKIM and DMARC
- production PostgreSQL provider and credentials
- production Turnstile keys
- verified transactional sending identity
- manuscript-grounded long-form Explore copy
- first Journal article (Journal remains noindex and absent from primary navigation)
- final privacy retention period / privacy contact
- final website Terms of Use
- A017 social/OG artwork (canonical cover is the temporary factual fallback)

## Validation state

The repository is **implemented but build validation remains pending** in this handoff environment because npm registry access timed out. Run `npm install && npm run typecheck && npm run lint && npm run build` in a network-enabled development/CI environment before deployment.

## Engineering law

**Static where possible. Dynamic where necessary. Complex only where meaningful.**
