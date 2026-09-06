# EOE-PQBL-1.0 — Production QA, Build Validation & Launch Readiness

Status: **STATIC QA PASSED · PRODUCTION BUILD BLOCKED BY REGISTRY ACCESS · PUBLIC LAUNCH BLOCKED BY UNRESOLVED LAUNCH INPUTS**

Date: 6 September 2026 (project milestone)

## Purpose

This milestone audits the SAPSI-1.0 repository, fixes issues that can be verified without external infrastructure, and distinguishes code readiness from public-launch and GARI-send readiness.

## QA executed

- `node scripts/qa-static.mjs` — PASS.
  - 69 TypeScript/TSX/CSS source files scanned.
  - 19 public page routes checked for internal-link targets.
  - Canonical cover SHA-256 matched the frozen asset fingerprint.
  - Real author portrait SHA-256 matched the frozen asset fingerprint.
  - No placeholder `href="#"` links detected.
  - No unapproved CSS/reimagined EOE brand mark remains in the header.
- CSS parser audit — PASS: 21 CSS files, 0 parser errors.
- TypeScript parser-only/no-resolution scan — no syntax/parser errors observed; dependency resolution errors remain expected because `node_modules` is unavailable.
- npm connectivity — FAIL due environment DNS/network: `EAI_AGAIN registry.npmjs.org`.
- `npm install`, `npm run typecheck`, `npm run lint`, `npm run build` — NOT EXECUTABLE in this environment because dependencies cannot be downloaded.

## Corrections made during PQBL

1. Removed the provisional CSS-drawn EOE mark. Until A002 is supplied, the header is wordmark-only rather than presenting a reimagined canonical symbol.
2. Added `next/font/google` for Crimson Text and Inter. Next.js will self-host the fetched font output at build time, avoiding runtime Google Fonts requests.
3. Added an explicit `NEXT_PUBLIC_GARI_REQUESTS_ENABLED` release gate. The public form stays safely unavailable until production infrastructure is deliberately enabled.
4. Added the same GARI enable gate server-side to prevent direct API use while disabled.
5. Added `Cache-Control: no-store` to GARI API responses.
6. Added database error handling for rate-limit lookup and request persistence.
7. Improved GARI form accessibility: programmatic focus on error/success feedback, checkbox error association, browser max-length constraints aligned to server validation, and human-readable consent validation.
8. Changed Turnstile integration from `onLoad` to `onReady` so it can re-render reliably after client navigation.
9. Added static QA and prelaunch environment gate scripts.
10. Pinned direct package versions and recorded Node/npm expectations. A lockfile is still required after the first successful dependency install.

## Release commands

```bash
npm install
npm run qa:static
npm run typecheck
npm run lint
npm run build
npm run qa:prelaunch
```

A successful production candidate requires all commands above to pass in a network-enabled environment.

## GO / BLOCKED matrix

| Area | Status | Reason |
|---|---|---|
| Repository structure | GO | Static audit passed |
| Canonical cover A001 | GO | Fingerprint verified |
| Real author portrait A004 | GO | Fingerprint verified |
| Header brand treatment | GO, wordmark-only | Unapproved provisional symbol removed |
| Internal route integrity | GO | Static link audit passed |
| CSS syntax | GO | 21 files parsed with 0 errors |
| GARI safe-disabled state | GO | Client + server release gate implemented |
| GARI form validation/accessibility | GO in code | Requires browser/E2E validation after build |
| TypeScript typecheck | BLOCKED | Dependencies unavailable |
| ESLint | BLOCKED | Dependencies unavailable |
| Next.js production build | BLOCKED | npm registry unavailable; no `node_modules` |
| Deterministic dependency tree | BLOCKED | `package-lock.json` cannot be generated offline |
| Browser/mobile QA | BLOCKED | Needs successful build/preview deployment |
| Lighthouse/CWV | BLOCKED | Needs deployed preview |
| A002 canonical symbol | DEFERRED for wordmark-only launch | Do not recreate it |
| A017 1200×630 social image | BLOCKED for final social launch polish | Current metadata falls back to canonical cover |
| A018 favicon/app icon | BLOCKED | Prefer canonical A002 when supplied |
| Amazon URL A013 | BLOCKED | Must be real before purchase CTA |
| Exact domain emails A014–A016 | BLOCKED | Must be confirmed and activated |
| Terms of Use | BLOCKED | Page explicitly says production terms are not final |
| Privacy retention/contact details | BLOCKED | Page explicitly records these as launch-gate items |
| GARI production DB | BLOCKED | Must be provisioned and migrated |
| Turnstile production keys | BLOCKED | Must be configured and verified |
| Transactional email | BLOCKED | Sending domain/from address must be verified |
| SPF/DKIM/DMARC | BLOCKED for GARI outreach | Mandatory trust gate |
| GARI end-to-end staging test | BLOCKED | Requires DB + Turnstile + email |

## Launch decision

### Engineering continuation
**GO.** The repository can move to a real preview/build environment.

### Public website launch
**BLOCKED.** Do not connect the production domain as the public canonical site until the production build passes and the legal/contact/retailer/social-asset launch gates are closed.

### GARI public form activation
**BLOCKED.** Keep `NEXT_PUBLIC_GARI_REQUESTS_ENABLED=false` until the complete GARI infrastructure passes end-to-end staging validation.

### GARI-USA-001 / Pittsburgh send
**BLOCKED.** Website identity pages, professional academic-review email, SPF/DKIM/DMARC, GARI workflow, deliverability and updated Stage-1 package must all pass first.

## Freeze rule

PQBL-1.0 does not change the editorial architecture. It hardens implementation and prevents incomplete infrastructure from appearing operational.

> A page may be visually complete without being launch-ready. Launch readiness requires the code, infrastructure, identity, legal text, delivery paths and trust signals to agree with one another.
