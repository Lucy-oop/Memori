"use client";

import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { LangToggle } from "@/components/AppShell";
import { useLibrary } from "@/components/LibraryProvider";
import { Button, Panel, Spinner } from "@/components/ui";
import { courseUnits, startOfLevel, unitLabel, type Position, type Track } from "@/lib/curriculum";
import { updateProfile } from "@/lib/data";
import { t, type I18nKey } from "@/lib/i18n";
import { LEVELS } from "@/lib/levels";

const TRACKS: Track[] = ["goi", "kanji"];

/**
 * First-run setup in one screen: tap a level → both tracks start at that level's Day 1 → dashboard.
 * "I'm already partway through" reveals week/day pickers for learners mid-book.
 * Also reachable from Settings to change level or day later.
 */
export default function OnboardingPage() {
  const router = useRouter();
  const { metaReady, units, progress, profile, lang, setLang, setPosition, setProfile } = useLibrary();
  const [partway, setPartway] = useState(false);
  const [level, setLevel] = useState<number>(5);
  const [pos, setPos] = useState<Record<Track, Position | null>>({ goi: null, kanji: null });
  const [saving, setSaving] = useState<number | "custom" | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Returning users (changing level from Settings) start from where they are.
  useEffect(() => {
    if (progress.goi) setLevel(progress.goi.level);
    setPos({ goi: progress.goi ?? null, kanji: progress.kanji ?? null });
  }, [progress.goi, progress.kanji]);

  // Coming back from Settings: show the day pickers straight away so a tap on a level card
  // isn't the only option (that resets to Day 1).
  useEffect(() => {
    if (profile?.onboarded) setPartway(true);
  }, [profile?.onboarded]);

  // First visit: default the meaning language to Burmese on Burmese devices.
  useEffect(() => {
    if (!profile || profile.onboarded) return;
    if (localStorage.getItem("memori-lang-chosen")) return;
    if (navigator.language?.toLowerCase().startsWith("my") && lang !== "my") setLang("my");
  }, [profile, lang, setLang]);

  const counts = useMemo(() => {
    const c: Record<number, { goi: number; kanji: number }> = {};
    for (const u of units) {
      c[u.level] ??= { goi: 0, kanji: 0 };
      c[u.level][u.track] += u.card_ids.length;
    }
    return c;
  }, [units]);
  const levels = LEVELS.filter((l) => counts[l]);

  if (!metaReady) return <Spinner />;

  const save = async (positions: Position[], key: number | "custom") => {
    setSaving(key);
    setError(null);
    try {
      for (const p of positions) await setPosition(p);
      await updateProfile({ onboarded: true, meaning_lang: lang });
      if (profile) setProfile({ ...profile, onboarded: true, meaning_lang: lang });
      router.replace("/");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setSaving(null);
    }
  };

  const pickLevel = (l: number) => save(TRACKS.map((tr) => startOfLevel(units, tr, l)), l);
  const saveCustom = () => save(TRACKS.map((tr) => (pos[tr]?.level === level ? pos[tr]! : startOfLevel(units, tr, level))), "custom");

  return (
    <div className="mx-auto max-w-lg space-y-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{t(lang, "onbTitle")}</h1>
          <p className="mt-1 text-sm text-muted">{t(lang, "onbSub")}</p>
        </div>
        <LangToggle
          className="shrink-0"
          onChange={() => {
            try { localStorage.setItem("memori-lang-chosen", "1"); } catch {}
          }}
        />
      </div>

      {levels.length === 0 && (
        <p className="text-sm text-bad">No course days found. Run the database migrations and the files in supabase/seed/ first (see README).</p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {levels.map((l) => (
          <button
            key={l}
            type="button"
            disabled={saving !== null}
            onClick={() => pickLevel(l)}
            className={clsx(
              "flex flex-col items-start gap-1 rounded-2xl border border-line bg-surface p-4 text-left transition",
              "hover:border-primary hover:bg-primary-soft active:scale-[0.98] disabled:opacity-60",
              saving === l && "border-primary bg-primary-soft",
            )}
          >
            <span className="text-3xl font-bold">N{l}</span>
            <span className="text-sm font-medium">{t(lang, `levelN${l}` as I18nKey)}</span>
            <span className="text-xs text-muted">
              {counts[l].goi.toLocaleString()} {t(lang, "words")} · {counts[l].kanji} {t(lang, "kanjiUnit")}
            </span>
            {saving === l && <span className="text-xs font-medium text-primary">{t(lang, "settingUp")}</span>}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setPartway((v) => !v)}
        className="flex w-full items-center justify-center gap-1 text-sm text-primary underline"
        aria-expanded={partway}
      >
        {t(lang, "partway")} <ChevronDown size={16} className={clsx("transition", partway && "rotate-180")} />
      </button>

      {partway && (
        <Panel className="space-y-4 p-5">
          <p className="text-sm text-muted">{t(lang, "partwayHint")}</p>
          <div className="flex gap-2" role="group" aria-label="Level">
            {levels.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLevel(l)}
                aria-pressed={level === l}
                className={clsx("flex-1 rounded-xl border px-3 py-2 font-semibold", level === l ? "border-primary bg-primary-soft text-primary" : "border-line")}
              >
                N{l}
              </button>
            ))}
          </div>
          {TRACKS.map((track) => {
            const days = courseUnits(units, track).filter((u) => u.level === level);
            const cur = pos[track];
            const value = cur && cur.level === level ? `${cur.week}-${cur.day}` : days[0] ? `${days[0].week}-${days[0].day}` : "";
            return (
              <label key={track} className="block space-y-1.5">
                <span className="font-semibold">{track === "goi" ? t(lang, "goi") : t(lang, "kanji")}</span>
                <select
                  className="input"
                  value={value}
                  onChange={(e) => {
                    const [week, day] = e.target.value.split("-").map(Number);
                    setPos((p) => ({ ...p, [track]: { track, level, week, day } }));
                  }}
                >
                  {days.map((u) => (
                    <option key={u.id} value={`${u.week}-${u.day}`}>
                      {unitLabel(u)} · {u.card_ids.length} {track === "goi" ? t(lang, "words") : t(lang, "kanjiUnit")}
                      {u.source === "soumatome" ? " · Soumatome" : ""}
                    </option>
                  ))}
                </select>
              </label>
            );
          })}
          <Button className="w-full" disabled={saving !== null} onClick={saveCustom}>
            <Check size={18} /> {saving === "custom" ? t(lang, "settingUp") : t(lang, "startStudying")}
          </Button>
        </Panel>
      )}

      {error && <p role="alert" className="text-sm text-bad">{error}</p>}
    </div>
  );
}
