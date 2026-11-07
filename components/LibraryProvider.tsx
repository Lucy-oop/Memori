"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { flushOfflineReviews, loadDecks, loadLibrary, loadProfile, updateProfile, type Deck } from "@/lib/data";
import { pendingCount } from "@/lib/offlineQueue";
import type { CardState, Profile, StudyCard } from "@/lib/types";

interface LibraryContext {
  cards: StudyCard[];
  decks: Deck[];
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  pending: number;
  byTerm: Map<string, StudyCard>;
  reload: () => Promise<void>;
  patchState: (cardId: string, patch: Partial<CardState>) => void;
  setProfile: (p: Profile) => void;
  furigana: boolean;
  setFurigana: (v: boolean) => void;
}

const Ctx = createContext<LibraryContext | null>(null);

const emptyState = (card_id: string): CardState => ({
  card_id, fsrs: null, due_at: null, state: 0, reps: 0, lapses: 0,
  right_count: 0, wrong_count: 0, starred: false, override: {},
});

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<StudyCard[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(0);
  const [furigana, setFuriganaState] = useState(true);

  const reload = useCallback(async () => {
    try {
      const [c, d, p] = await Promise.all([loadLibrary(), loadDecks(), loadProfile()]);
      setCards(c);
      setDecks(d);
      // New accounts start on UTC — adopt the device timezone so streak days match local midnight.
      const deviceTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (p.timezone === "UTC" && deviceTz && deviceTz !== "UTC") {
        updateProfile({ timezone: deviceTz }).catch(() => {});
        p.timezone = deviceTz;
      }
      setProfile(p);
      setError(null);
      const saved = localStorage.getItem("memori-furigana");
      setFuriganaState(saved === null ? p.furigana_default : saved === "1");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const sync = async () => {
      await flushOfflineReviews();
      setPending(await pendingCount());
    };
    reload().then(sync);
    window.addEventListener("online", sync);
    const t = setInterval(sync, 30_000);
    return () => {
      window.removeEventListener("online", sync);
      clearInterval(t);
    };
  }, [reload]);

  const patchState = useCallback((cardId: string, patch: Partial<CardState>) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, userState: { ...(c.userState ?? emptyState(cardId)), ...patch } } : c)),
    );
    pendingCount().then(setPending);
  }, []);

  const setFurigana = useCallback((v: boolean) => {
    setFuriganaState(v);
    localStorage.setItem("memori-furigana", v ? "1" : "0");
  }, []);

  const byTerm = useMemo(() => {
    const m = new Map<string, StudyCard>();
    for (const c of cards) if (c.type === "kanji" && !m.has(c.term)) m.set(c.term, c);
    return m;
  }, [cards]);

  const value = useMemo(
    () => ({ cards, decks, profile, loading, error, pending, byTerm, reload, patchState, setProfile, furigana, setFurigana }),
    [cards, decks, profile, loading, error, pending, byTerm, reload, patchState, furigana, setFurigana],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLibrary(): LibraryContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLibrary must be used inside <LibraryProvider>");
  return ctx;
}
