# LPVQ-1.0 — Live Preview Visual QA & Responsive Audit

Date: 2026-09-07
Baseline commit: `ac2b45c` (existing deployed website, before audit edits).
Live baseline: https://evolutionofenergy.vercel.app
Verification of fixes: local production build at http://127.0.0.1:3001.
The changes in this audit have not been deployed.

## Findings and corrections

- Mobile navigation was clipped to a 108px strip at a 390px viewport. Its fixed positioning interacted with the header's backdrop filter. Position the menu below the header and size it to the available viewport height, with scrolling for short screens.
- Mobile navigation stayed open after following links and pressing Escape. Close on link selection; Escape closes the menu and returns focus to its summary.
- Author images retained a 1216px HTML height despite a responsive width, excessively cropping the face. Use the replacement asset's actual 574×861 dimensions and CSS `height: auto` with the existing 4:5 frame.
- Image references contained `cropperd` rather than `cropped`. Use the correct existing filename in both page components and Person JSON-LD. Retain the previous asset URL for compatibility.
- The portrait fingerprint check still expected the old image. Update the required asset path, hash manifest, and static check to the user-supplied replacement; the canonical book cover is unchanged.
- Production builds enabled indexing before public launch. Metadata and robots.txt now share an explicit `SITE_INDEXING_ENABLED` gate, defaulting to false. Even with the gate enabled, non-production builds remain non-indexed. The official canonical URL remains unchanged.
- Explore hash changes on an already-open page did not select the matching stage. Listen for hash changes and clean up the listener when the effect ends.
- Fix the five lint errors and one hook warning: escape apostrophes without changing rendered text, declare the Explore callback before its effect, include the callback dependency, and remove unnecessary memoization of form error entries.

## Verification

- Live baseline: all 19 page routes at 390, 768, and 1440px widths (57 combinations) returned HTTP 200 with no detected horizontal overflow, broken loaded images, or uncaught browser exceptions.
- Captured full-page baseline screenshots for Home, Author, Explore, and Academic Review Request at each width. Visual inspection identified the portrait crop and clipped menu, which automated overflow checks alone did not detect.
- Final local build: `npm run check` passed static QA, TypeScript, ESLint, and Next.js production compilation/static generation.
- Chromium regression checks passed mobile navigation bounds, Escape dismissal, link-selection dismissal, portrait aspect ratio, and overflow at 320, 390, and 768px.
- All six desktop Explore stage buttons, same-page hash navigation, and reduced-motion sequential presentation passed.
- Verified `noindex` metadata and `Disallow: /` in the local production build with the indexing gate unset.
- Verified the disabled GARI message and expected HTTP 503 from the disabled API. No request was stored or email sent.
- No uncaught browser exceptions in the final interaction checks.

## Remaining review and launch gates

- `/explore` still displays implementation placeholder copy. This audit preserves it for content review rather than inventing replacement text.
- Terms, privacy contact/retention, retailer URL, contact addresses, and production GARI services remain launch gates.
- Live Vercel indexing remains unchanged until these fixes are deployed. Set `SITE_INDEXING_ENABLED=true` in the production environment and rebuild only when the official-domain public launch is approved.
- The old misspelled Vercel alias remains available; removal belongs to final domain cleanup.
- This is a Chromium viewport audit, not physical-device, Safari/Firefox, screen-reader, or Lighthouse certification. Those checks remain open before declaring the complete launch audit finished.

## PCEC-1.0 follow-up
The Explore landing placeholder is replaced by the full-page journey. PCEC adopts `NEXT_PUBLIC_SITE_IS_LIVE` as the launch flag, superseding the `SITE_INDEXING_ENABLED` instructions above while retaining the production-only guard. See `../specifications/PCEC-1.0.md`.
