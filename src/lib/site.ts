export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://evolutionofenergy.org";
export const SITE_NAME = "Evolution of Energy";
export const AUTHOR_NAME = "Sreedhar G.";
export const BOOK_SUBTITLE = "A Philosophical Invitation to Reality, Understanding, and Joyful Participation";
export const PUBLICATION_DATE = "2026-08-09";
export const PUBLICATION_EDITION = "First Canonical Edition";
export const DEFAULT_DESCRIPTION = "Evolution of Energy by Sreedhar G. is a philosophical invitation to explore reality, understanding, change, human experience and joyful participation through observation, questioning and continuing inquiry.";

// Public indexing is an explicit launch gate, independent of the build target.
export const SITE_IS_LIVE = process.env.NEXT_PUBLIC_SITE_IS_LIVE === "true" &&
  (process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production");
