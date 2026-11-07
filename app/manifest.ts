import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Memori メモリ — Kanji & Vocabulary",
    short_name: "Memori",
    description: "JLPT N5/N4 kanji & vocabulary flashcards with spaced repetition.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f3ea",
    theme_color: "#1e5b36",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
