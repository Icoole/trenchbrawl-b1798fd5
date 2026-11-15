import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/components/site/Landing";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Trench Brawl — Fight. Outplay. Dominate." },
      {
        name: "description",
        content:
          "Trench Brawl: a meme-inspired Solana fighting game. Fight the CPU, earn XP, climb the Top 100 and compete for $SAVIOUR season prizes.",
      },
      { property: "og:title", content: "Trench Brawl — Fight. Outplay. Dominate." },
      {
        property: "og:description",
        content:
          "Choose your fighter. Fight the CPU. Earn XP. Activate your rewards. Top 100 players unlock FUD powers and $SAVIOUR prize eligibility.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});
