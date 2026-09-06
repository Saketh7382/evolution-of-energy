import { AUTHOR_NAME, BOOK_SUBTITLE, PUBLICATION_DATE, PUBLICATION_EDITION, SITE_NAME, SITE_URL } from "@/lib/site";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function WebsiteJsonLd() {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL, inLanguage: "en" }} />;
}

export function BookJsonLd() {
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@type": "Book",
    name: SITE_NAME,
    alternateName: `${SITE_NAME}: ${BOOK_SUBTITLE}`,
    author: { "@type": "Person", name: AUTHOR_NAME, url: `${SITE_URL}/author` },
    datePublished: PUBLICATION_DATE,
    bookEdition: PUBLICATION_EDITION,
    inLanguage: "en",
    image: `${SITE_URL}/canonical/eoe-canonical-cover.png`,
    url: `${SITE_URL}/book`,
    description: BOOK_SUBTITLE,
  }} />;
}

export function PersonJsonLd() {
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    birthDate: "1971-01-06",
    image: `${SITE_URL}/author/sreedhar-g-cropped.jpg`,
    url: `${SITE_URL}/author`,
    jobTitle: "Author",
    description: `Author of ${SITE_NAME}.`,
  }} />;
}
