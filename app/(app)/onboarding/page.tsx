"use client";

import clsx from "clsx";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLibrary } from "@/components/LibraryProvider";
import { Button, Panel, Spinner } from "@/components/ui";
import { courseUnits, startOfLevel, unitLabel, type Position, type Track } from "@/lib/curriculum";
import { updateProfile } from "@/lib/data";
import { LEVELS } from "@/lib/levels";
import type { MeaningLang } from "@/lib/types";

const LEVEL_BLURB: Record<number, string> = {
  5: "Beginner · basic words & ~80 kanji",
  4: "Elementary · everyday conversation",
  3: "Intermediate · Soumatome N3",
  2: "Upper-intermediate · Soumatome N2",
};

/**
 * First-run setup (also reachable from Settings): meaning language → JLPT level →
 * which study day the learner is on for Goi and Kanji.
 */
export default function OnboardingPage() {
  const router = useRouter();
  const { loading, units, progress, profile, lang, setLang, setPosition, setProfile } = useLibrary();
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState<number>(5);
  const [pos, setPos] = useState<Record<Track, Position | null>>({ goi: null, kanji: null });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Start from the learner's saved position when they come back to change it.
  useEffect(() => {
    if (progress.goi) setLevel(progress.goi.level);
    setPos({ goi: progress.goi ?? null, kanji: progress.kanji ?? null });
  }, [progress.goi, progress.kanji]);

  const levelsWithUnits = useMemo(() => LEVELS.filter((l) => units.some((u) => u.level === l)), [units]);

  if (loading) return <Spinner />;

  const choose = (l: number) => {
    setLevel(l);
    // Changing level resets both tracks to day 1 of that level (user can adjust next).
    setPos({ goi: startOfLevel(units, "goi", l), kanji: startOfLevel(units, "kanji", l) });
  };

  const finish = async () => {
    setSaving(true);
    setError(null);
    try {
      for (const track of ["goi", "kanji"] as Track[]) {
        await setPosition(pos[track] ?? startOfLevel(units, track, level));
      }
      await updateProfile({ onboarded: true, meaning_lang: lang });
      if (profile) setProfile({ ...profile, onboarded: true, meaning_lang: lang });
      router.replace("/");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg space-y-5 py-4">
      <div className="flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div key={i} className={clsx("h-1.5 flex-1 rounded-full", i <= step ? "bg-primary" : "bg-line")} />
        ))}
      </div>

      {step === 0 && (
        <Panel className="space-y-4 p-5">
          <h1 className="text-xl font-bold">Which language should meanings be in?</h1>
          <p className="text-sm text-muted">You can switch any time from the EN / မြန်မာ button at the top.</p>
          <div className="grid gap-2">
            {([["en", "English", "meet, see"], ["my", "မြန်မာ", "တွေ့သည်"]] as [MeaningLang, string, string][]).map(([l, name, sample]) => (
              <Choice key={l} active={lang === l} onClick={() => setLang(l)} title={name} sub={`会う → ${sample}`} />
            ))}
          </div>
          <Button className="w-full" onClick={() => setStep(1)}>Next <ArrowRight size={18} /></Button>
        </Panel>
      )}

      {step === 1 && (
        <Panel className="space-y-4 p-5">
          <h1 className="text-xl font-bold">Which JLPT level are you studying?</h1>
          <p className="text-sm text-muted">Easier levels count as learned and will appear in your random reviews.</p>
          <div className="grid gap-2">
            {levelsWithUnits.map((l) => (
              <Choice key={l} active={level === l} onClick={() => choose(l)} title={`N${l}`} sub={LEVEL_BLURB[l]} />
            ))}
          </div>
          {levelsWithUnits.length === 0 && (
            <p className="text-sm text-bad">No course days found. Run the database migration and seed_units.sql first (see README).</p>
          )}
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setStep(0)}><ArrowLeft size={18} /></Button>
            <Button
              className="flex-1"
              disabled={!levelsWithUnits.length}
              onClick={() => {
                if (!pos.goi || pos.goi.level !== level) choose(level);
                setStep(2);
              }}
            >
              Next <ArrowRight size={18} />
            </Button>
          </div>
        </Panel>
      )}

      {step === 2 && (
        <Panel className="space-y-5 p-5">
          <h1 className="text-xl font-bold">Which day are you on in N{level}?</h1>
          <p className="text-sm text-muted">
            Pick the day you&apos;re studying now. Flashcards will mix that day with every earlier day and all easier levels.
          </p>
          {(["goi", "kanji"] as Track[]).map((track) => {
            const days = courseUnits(units, track).filter((u) => u.level === level);
            const cur = pos[track];
            const value = cur && cur.level === level ? `${cur.week}-${cur.day}` : days[0] ? `${days[0].week}-${days[0].day}` : "";
            return (
              <label key={track} className="block space-y-1.5">
                <span className="font-semibold">{track === "goi" ? "Vocabulary (語彙 Goi)" : "Kanji (漢字)"}</span>
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
                      {unitLabel(u)} · {u.card_ids.length} {track === "goi" ? "words" : "kanji"}
                      {u.source === "soumatome" ? " · Soumatome" : ""}
                    </option>
                  ))}
                </select>
              </label>
            );
          })}
          {error && <p className="text-sm text-bad">{error}</p>}
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setStep(1)}><ArrowLeft size={18} /></Button>
            <Button className="flex-1" disabled={saving} onClick={finish}>
              <Check size={18} /> {saving ? "Saving…" : "Start studying"}
            </Button>
          </div>
        </Panel>
      )}
    </div>
  );
}

function Choice({ active, onClick, title, sub }: { active: boolean; onClick: () => void; title: string; sub: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        "flex items-center justify-between rounded-xl border p-4 text-left transition",
        active ? "border-primary bg-primary-soft" : "border-line bg-surface hover:bg-surface-2",
      )}
    >
      <span>
        <span className="block text-lg font-semibold">{title}</span>
        <span className="block text-sm text-muted">{sub}</span>
      </span>
      {active && <Check className="text-primary" size={20} />}
    </button>
  );
}
