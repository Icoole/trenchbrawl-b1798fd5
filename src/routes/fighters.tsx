import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/components/site/Landing";

export const Route = createFileRoute("/fighters")({
  head: () => ({
    meta: [
      { title: "Fighters | Trench Brawl" },
      { name: "description", content: "Meet the Trench Brawl roster and explore each fighter's signature move." },
      { property: "og:title", content: "Fighters | Trench Brawl" },
      { property: "og:description", content: "Choose your fighter and discover their signature move." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FightersPage,
});

function FightersPage() {
  return <Landing page="fighters" />;
}