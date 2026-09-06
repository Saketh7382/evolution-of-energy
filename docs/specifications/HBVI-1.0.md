# EOE-HBVI-1.0 — Homepage Build & Visual Integration

Status: IMPLEMENTED FOR V1 STATIC HOMEPAGE

This milestone converts the RBDS shell into the approved EOE homepage visual journey without introducing the full desktop scrollytelling engine reserved for the Explore build milestone.

## Implemented

- Canonical A001 cover remains unchanged and is used directly from `public/canonical/eoe-canonical-cover.png`.
- Hero rebuilt as a dawn landscape using CSS-only atmospheric layers so no generated visual can accidentally replace the publication identity.
- Hero cover treatment, edition metadata, epigraph, CTA hierarchy and mobile layout refined.
- Why EOE converted to an editorial reading composition with section indexing and restrained visual ornament.
- Observe / Question / Understand / Participate rebuilt as a responsive editorial grid.
- Explore preview rebuilt into six immersive sequential visual chapters: Reality, Understanding, Difference & Relation, Change, Development, Participation.
- Explore scenes use CSS atmosphere and metaphor placeholders. They are intentionally replaceable by approved atmospheric assets in later production work.
- Book section refined as a warm visual reset after the dark Explore journey.
- Author section receives a deliberate A004 placeholder rather than a fabricated portrait.
- GARI receives a visually distinct midnight academic treatment with no university-logo or endorsement cues.
- Final invitation receives the starlight end-state of the sunrise-to-midnight visual journey.
- Primary navigation hides Journal until substantive launch content exists, in accordance with PWSC-1.0.
- Header and footer refined for production hierarchy.
- Responsive container widths now follow the VDRS 48px desktop / 32px tablet / 20px mobile outer-margin intent.
- Reduced-motion support remains inherited from global accessibility rules.

## Not yet implemented

- Full sticky/scrollytelling Explore desktop engine (EEIS-1.0): reserved for [1267d-4].
- Approved author photograph A004.
- Original EOE symbol A002; current header mark is a CSS-only temporary brand motif, not a replacement canonical logo.
- Approved atmospheric image assets A005–A012. Current visual environments are CSS constructions.
- Journal homepage module; intentionally hidden until first substantive article exists.
- Final retailer URL and professional email values.

## Asset law

Canonical publication assets are reproduced, never reimagined. Atmospheric layers can be replaced or refined without altering A001.

## Build-validation note

`npm install` was attempted in the execution environment but exceeded the available command window before dependencies were installed. The repository therefore has not been represented as a verified production build. Dependency installation and `npm run build` remain the first validation gate of the next runnable environment.
