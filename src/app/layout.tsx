import type { Metadata, Viewport } from "next";
import { Crimson_Text, Inter } from "next/font/google";
import { Observability } from "@/components/analytics/Observability";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WebsiteJsonLd } from "@/components/seo/JsonLd";
import { BOOK_SUBTITLE, DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL, SITE_IS_LIVE } from "@/lib/site";
import "@/styles/globals.css";

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-crimson-text",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "light" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Evolution of Energy | Sreedhar G.", template: "%s | Evolution of Energy" },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Sreedhar G.", url: "/author" }],
  creator: "Sreedhar G.",
  publisher: undefined,
  alternates: { canonical: "/" },
  robots: SITE_IS_LIVE ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Evolution of Energy — Sreedhar G.",
    description: BOOK_SUBTITLE,
    siteName: SITE_NAME,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Evolution of Energy by Sreedhar G." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evolution of Energy — Sreedhar G.",
    description: BOOK_SUBTITLE,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${crimsonText.variable} ${inter.variable}`}>
      <body>
        <a className="skipLink" href="#main">Skip to main content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <WebsiteJsonLd />
        <Observability />
      </body>
    </html>
  );
}
