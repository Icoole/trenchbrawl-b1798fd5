import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/components/site/Landing";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap & FAQ | Trench Brawl" },
      { name: "description", content: "Review Trench Brawl's launch gates, fair-play commitments, and frequently asked questions." },
      { property: "og:title", content: "Roadmap & FAQ | Trench Brawl" },
      { property: "og:description", content: "See the planned release gates and answers about Trench Brawl gameplay and rewards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoadmapPage,
});

function RoadmapPage() {
  return <Landing page="roadmap" />;
}