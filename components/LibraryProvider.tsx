"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Position, Track, Unit } from "@/lib/curriculum";
import {
  currentUserId,
  flushOfflineReviews,
  loadDecks,
  loadLibrary,
  loadProfile,
  loadProgress,
  loadUnits,
  saveLibraryCache,
  saveProgress,
  updateProfile,
  type Deck,
} from "@/lib/data";
import { pendingCount } from "@/lib/offlineQueue";
import type { CardState, MeaningLang, Profile, StudyCard } from "@/lib/types";

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
  /** Course structure (study days) and where the learner is in each track. */
  units: Unit[];
  progress: Partial<Record<Track, Position>>;
  setPosition: (pos: Position) => Promise<void>;
  /** Language card meanings are shown in. */
  lang: MeaningLang;
  setLang: (l: MeaningLang) => void;
}

const Ctx = createContext<LibraryContext | null>(null);

const emptyState = (card_id: string): CardState => ({
  card_id, fsrs: null, due_at: null, state: 0, reps: 0, lapses: 0,
  right_count: 0, wrong_count: 0, starred: false, override: {},
});

const LANG_KEY = "memori-lang";

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<StudyCard[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [progress, setProgress] = useState<Partial<Record<Track, Position>>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(0);
  const [furigana, setFuriganaState] = useState(true);
  const [lang, setLangState] = useState<MeaningLang>("en");
  const dirty = useRef(false);

  const reload = useCallback(async () => {
    try {
      const [c, d, p, u, pr] = await Promise.all([loadLibrary(), loadDecks(), loadProfile(), loadUnits(), loadProgress()]);
      setCards(c);
      setDecks(d);
      setUnits(u);
      setProgress(Object.fromEntries(pr.map((x) => [x.track, x])));
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
      setLangState(p.meaning_lang ?? "en");
      localStorage.setItem(LANG_KEY, p.meaning_lang ?? "en");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Show the remembered language immediately, before the profile arrives.
    const l = localStorage.getItem(LANG_KEY);
    if (l === "en" || l === "my") setLangState(l);

    const sync = async () => {
      await flushOfflineReviews();
      const uid = await currentUserId().catch(() => undefined);
      setPending(await pendingCount(uid));
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
    currentUserId()
      .catch(() => undefined)
      .then((uid) => pendingCount(uid))
      .then(setPending);
    dirty.current = true;
  }, []);

  // Persist in-session progress to the offline cache (debounced) so an offline reload isn't stale.
  useEffect(() => {
    if (!dirty.current) return;
    const t = setTimeout(() => {
      dirty.current = false;
      saveLibraryCache(cards);
    }, 1500);
    return () => clearTimeout(t);
  }, [cards]);

  const setFurigana = useCallback((v: boolean) => {
    setFuriganaState(v);
    localStorage.setItem("memori-furigana", v ? "1" : "0");
  }, []);

  const setLang = useCallback((l: MeaningLang) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
    setProfile((p) => (p ? { ...p, meaning_lang: l } : p));
    updateProfile({ meaning_lang: l }).catch(() => {});
  }, []);

  const setPosition = useCallback(async (pos: Position) => {
    setProgress((prev) => ({ ...prev, [pos.track]: pos }));
    await saveProgress(pos);
  }, []);

  const byTerm = useMemo(() => {
    const m = new Map<string, StudyCard>();
    for (const c of cards) if (c.type === "kanji" && !m.has(c.term)) m.set(c.term, c);
    return m;
  }, [cards]);

  const value = useMemo(
    () => ({
      cards, decks, profile, loading, error, pending, byTerm, reload, patchState, setProfile,
      furigana, setFurigana, units, progress, setPosition, lang, setLang,
    }),
    [cards, decks, profile, loading, error, pending, byTerm, reload, patchState, furigana, setFurigana, units, progress, setPosition, lang, setLang],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLibrary(): LibraryContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLibrary must be used inside <LibraryProvider>");
  return ctx;
}
