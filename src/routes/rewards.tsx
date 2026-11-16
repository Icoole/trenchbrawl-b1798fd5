import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/components/site/Landing";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "XP & Rewards | Trench Brawl" },
      { name: "description", content: "Explore Trench Brawl XP, Top 100 powers, referrals, and proposed $SAVIOUR season pools." },
      { property: "og:title", content: "XP & Rewards | Trench Brawl" },
      { property: "og:description", content: "How XP, competitive powers, referrals, and season pools are described in the current rules." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RewardsPage,
});

function RewardsPage() {
  return <Landing page="rewards" />;
}