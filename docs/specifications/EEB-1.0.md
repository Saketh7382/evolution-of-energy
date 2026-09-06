# EOE-EEB-1.0 — Explore Experience Build

Status: IMPLEMENTED

This build realizes EEIS-1.0 on the homepage.

## Desktop
- 400vh normal-scroll wrapper with a 100svh sticky frame.
- Six stages share one canonical configuration source.
- Active stage derives from normal page scroll progress.
- Atmospheric scenes crossfade rather than hard-cut.
- Persistent six-step progress navigation is keyboard accessible.
- Progress nodes can move the document to any stage.
- Deep links use `#explore-<slug>` and are restored on direct load.
- Browser scrolling is never hijacked.

## Mobile / tablet / reduced motion
- Sequential editorial chapters replace the sticky experience.
- No forced scroll snapping.
- A vertical numbered rail preserves the sense of progression.
- `prefers-reduced-motion: reduce` always receives the sequential model.

## Accessibility
- All concept text remains real HTML.
- Hidden inactive desktop stages are removed from the tab sequence.
- Progress controls are real buttons with `aria-current` and descriptive labels.
- Atmospheric scenes are decorative and hidden from assistive technology.
- Focus indicators are explicit.

## Content rule
Homepage wording remains website invitation copy. Detailed concept pages require manuscript-grounded editorial work before production release.
