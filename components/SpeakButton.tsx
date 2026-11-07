"use client";

import { Volume2 } from "lucide-react";
import { speak } from "@/lib/speech";

export function SpeakButton({ text }: { text: string }) {
  return (
    <button
      type="button"
      aria-label="Play pronunciation"
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      className="rounded-full p-2 text-muted transition hover:bg-surface-2 hover:text-ink"
    >
      <Volume2 size={20} />
    </button>
  );
}
