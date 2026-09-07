# EOE-PCEC-1.0 — Preview Correction & Explore Completion

Status: IMPLEMENTED IN CODE

## Scope
1. Replace the unfinished `/explore` implementation shell with the production Explore journey.
2. Remove internal milestone / implementation-shell language from public source.
3. Add an explicit indexing launch gate so Vercel preview/staging remains `noindex, nofollow` until approved official-domain launch.
4. Prepare the codebase for redeployment.

## Changes
- `/explore` now renders `ExploreJourney` in full-page mode.
- `ExploreJourney` accepts `fullPage`:
  - homepage remains a gateway with "Enter the full exploration".
  - `/explore` uses an H1 and ends with "Continue to the book" rather than linking to itself.
- Explore typography CSS supports both H1 and H2 without changing the existing visual system.
- `NEXT_PUBLIC_SITE_IS_LIVE` is the sole indexing launch gate.
- Root metadata emits `noindex, nofollow, nocache` unless `NEXT_PUBLIC_SITE_IS_LIVE=true`.
- `robots.txt` disallows all crawling unless the same launch gate is true.

## Launch rule
Keep `NEXT_PUBLIC_SITE_IS_LIVE=false` on all preview/staging deployments. Set it to `true` only after `evolutionofenergy.org` is attached and final launch approval is given.

## QA
`npm run qa:static` passes with zero static QA failures. Existing unrelated launch warnings remain for Terms and Privacy details. The current lockfile is retained.

## Integration with LPVQ fixes
- Preserved mobile menu, portrait, lint, and Explore hash-navigation corrections.
- Adopted `NEXT_PUBLIC_SITE_IS_LIVE` in place of `SITE_INDEXING_ENABLED`; the old variable is no longer used.
- Retained the production-environment check so non-production deployments remain non-indexable even if the launch flag is set.
- The six detailed concept routes remain manuscript-copy placeholders; this milestone completes the Explore landing experience.
