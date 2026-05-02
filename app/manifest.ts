import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/pages";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "FreeToolArena",
    description: SITE_TAGLINE,
    start_url: "/",
    // minimal-ui makes the site installable as a PWA across Chrome, Edge,
    // Safari (iOS 17+), and Android while keeping the address bar — better
    // for a tool aggregator where users land on different routes from search.
    display: "minimal-ui",
    orientation: "any",
    scope: "/",
    categories: ["productivity", "utilities", "education"],
    background_color: "#ffffff",
    theme_color: "#0f766e",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
    shortcuts: [
      { name: "All tools", url: "/tools", description: "Browse every tool" },
      { name: "Curated lists", url: "/best", description: "Best-of-X hubs" },
      { name: "Compare", url: "/compare", description: "Head-to-head comparisons" },
    ],
  };
}
