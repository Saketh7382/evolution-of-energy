import type { Metadata } from "next";
import { ExploreJourney } from "@/features/explore/ExploreJourney";

export const metadata: Metadata = {
  title: "Explore the Ideas",
  description: "Follow six questions into the central themes of Evolution of Energy.",
  alternates: { canonical: "/explore" },
};

export default function ExplorePage() {
  return <ExploreJourney fullPage />;
}
