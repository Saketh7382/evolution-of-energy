# Launch Readiness Runbook

## 1. Network-enabled build gate

Run:

```bash
npm install
npm run check
```

Commit the generated `package-lock.json` after reviewing the dependency tree. Do not launch from a repository without a reproducible lockfile.

## 2. Preview deployment gate

Deploy a non-indexed preview and verify:

- Home, Book, Explore, six concept routes, Author, GARI, Get the Book, Contact, Privacy and Terms.
- Chrome, Safari, Firefox and Edge.
- iPhone-class and Android-class mobile viewport.
- 200% zoom, keyboard-only navigation and reduced-motion mode.
- No horizontal overflow, clipped focused controls or sticky-scroll traps.
- Real canonical cover and real author portrait remain visually unaltered.

## 3. Performance gate

Target:

- LCP <= 2.5s
- INP <= 200ms
- CLS <= 0.1
- Lighthouse Performance >= 90
- Accessibility >= 95
- Best Practices >= 95
- SEO >= 95

Record actual measurements before GO.

## 4. Public identity gate

Required:

- AMAZON_BOOK_URL
- AUTHOR_EMAIL
- ACADEMIC_REVIEW_EMAIL
- CONTACT_EMAIL
- final Privacy retention/contact wording
- final Terms of Use
- A017 social image
- A018 favicon, or an explicitly approved temporary wordmark/text fallback

A002 must never be regenerated merely to close the favicon gate.

## 5. GARI infrastructure gate

Provision and verify:

- DATABASE_URL
- database migration
- NEXT_PUBLIC_TURNSTILE_SITE_KEY
- TURNSTILE_SECRET_KEY
- RATE_LIMIT_PEPPER
- EMAIL_API_KEY
- TRANSACTIONAL_FROM_EMAIL
- ACADEMIC_REVIEW_EMAIL
- SPF
- DKIM
- DMARC

Keep `NEXT_PUBLIC_GARI_REQUESTS_ENABLED=false` until all tests pass.

## 6. GARI E2E staging test

Test at minimum:

1. valid request
2. validation failure
3. missing consent
4. honeypot request
5. failed Turnstile token
6. rate-limit threshold
7. database outage behavior
8. applicant acknowledgement
9. internal notification
10. email provider failure with DB persistence retained
11. no-store response headers
12. public reference recorded correctly

Only then set `NEXT_PUBLIC_GARI_REQUESTS_ENABLED=true` for production.

## 7. Email deliverability gate

From the exact production academic-review identity, test delivery to major mailbox providers. Confirm SPF, DKIM and DMARC authentication in received-message headers, inbox/spam placement, replies, PDF attachment/link behavior and mobile rendering.

## 8. Final decision

Public launch and GARI outreach are separate decisions. The website may become public before GARI is enabled, provided the GARI request UI remains safely closed and accurately says so.
