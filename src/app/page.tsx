import { Hero } from "@/features/home/Hero";
import { BookJsonLd } from "@/components/seo/JsonLd";
import { WhyEOE } from "@/features/home/WhyEOE";
import { FourInvitations } from "@/features/home/FourInvitations";
import { ExploreJourney } from "@/features/explore/ExploreJourney";
import { BookSection } from "@/features/home/BookSection";
import { AuthorSection } from "@/features/home/AuthorSection";
import { GariSection } from "@/features/home/GariSection";
import { FinalInvitation } from "@/features/home/FinalInvitation";

export default function HomePage() {
  return (
    <>
      <BookJsonLd />
      <Hero />
      <WhyEOE />
      <FourInvitations />
      <ExploreJourney />
      <BookSection />
      <AuthorSection />
      <GariSection />
      <FinalInvitation />
    </>
  );
}
