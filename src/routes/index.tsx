import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/components/site/Landing";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Trench Brawl — Pick a fight. Make a legend." },
      {
        name: "description",
        content:
          "Enter the Trench Brawl arcade: choose your fighter, battle the CPU, build XP, and explore the latest game and reward rules.",
      },
      { property: "og:title", content: "Trench Brawl — Pick a fight. Make a legend." },
      {
        property: "og:description",
        content:
          "Choose from 14 fighters, jump into a CPU battle, and explore Trench Brawl's game loop, rewards, and roadmap.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});
