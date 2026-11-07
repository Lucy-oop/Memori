"use client";

import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState, type ReactNode } from "react";
import { Flashcard } from "@/components/Flashcard";
import { useLibrary } from "@/components/LibraryProvider";
import { Button, Panel, Segmented, Spinner } from "@/components/ui";
import { deleteCard, saveCard, saveOverride, setDeckMembership, type CardInput } from "@/lib/data";
import type { CardType, StudyCard } from "@/lib/types";

export default function EditCardPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <EditCard />
    </Suspense>
  );
}

const blank = (type: CardType): CardInput => ({
  type, term: "", reading: null, furigana: null, meaning_en: [], meaning_my: null, pos: null,
  onyomi: [], kunyomi: [], stroke_count: null, radical: null, similar: [], similar_note: null,
  example_jp: null, example_en: null, example_my: null, notes: null, jlpt_level: null, tags: [],
});

const toList = (s: string) => s.split(/[;；,、]/).map((x) => x.trim()).filter(Boolean);
const toChars = (s: string) => [...s.replace(/[\s,、;]/g, "")];

function EditCard() {
  const params = useSearchParams();
  const router = useRouter();
  const { cards, decks, loading, reload } = useLibrary();
  const id = params.get("id");
  const existing = useMemo(() => cards.find((c) => c.id === id) ?? null, [cards, id]);
  const builtIn = !!existing && !existing.owner_id;

  const [form, setForm] = useState<CardInput>(() => blank((params.get("type") as CardType) ?? "vocab"));
  const [deckIds, setDeckIds] = useState<string[]>(params.get("deck") ? [params.get("deck")!] : []);
  const [flipped, setFlipped] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!existing) return;
    setForm(Object.fromEntries(Object.keys(blank(existing.type)).map((k) => [k, existing[k as keyof CardInput]])) as CardInput);
    setDeckIds(decks.filter((d) => d.card_ids.includes(existing.id)).map((d) => d.id));
  }, [existing, decks]);

  if (loading) return <Spinner />;
  if (id && !existing) return <p className="text-muted">Card not found.</p>;

  const set = <K extends keyof CardInput>(k: K, v: CardInput[K]) => setForm((f) => ({ ...f, [k]: v }));
  const str = (v: string) => (v.trim() ? v : null);
  const preview: StudyCard = { ...form, id: id ?? "preview", owner_id: existing?.owner_id ?? "me", userState: existing?.userState ?? null };

  const save = async () => {
    if (!form.term.trim()) return setError("Please enter the kanji or word.");
    setSaving(true);
    setError(null);
    try {
      let cardId = id;
      if (builtIn) {
        await saveOverride(id!, {
          meaning_my: form.meaning_my,
          notes: form.notes,
          similar: form.similar,
          similar_note: form.similar_note,
          example_my: form.example_my,
          tags: form.tags,
        });
      } else {
        const tags = form.jlpt_level && !form.tags.includes(`N${form.jlpt_level}`) ? [`N${form.jlpt_level}`, ...form.tags] : form.tags;
        cardId = await saveCard({ ...form, term: form.term.trim(), tags }, id ?? undefined);
      }
      await setDeckMembership(cardId!, deckIds, decks.map((d) => d.id));
      await reload();
      if (id) router.back();
      else {
        setForm(blank(form.type));
        setFlipped(false);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!id || !confirm("Delete this card and its progress?")) return;
    await deleteCard(id);
    await reload();
    router.back();
  };

  const isKanji = form.type === "kanji";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => router.back()} aria-label="Back"><ArrowLeft size={20} /></Button>
        <h1 className="text-2xl font-bold">{id ? (builtIn ? "Card details" : "Edit card") : "New card"}</h1>
      </div>
      {builtIn && (
        <p className="rounded-xl bg-primary-soft px-3 py-2 text-sm text-primary">
          Built-in card — you can add your own Burmese meaning, notes, similar kanji and tags. They&apos;re saved just for you.
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="lg:sticky lg:top-6 lg:self-start">
          {form.term ? (
            <Flashcard card={preview} flipped={flipped} onFlip={() => setFlipped(!flipped)} />
          ) : (
            <Panel className="flex h-64 items-center justify-center text-muted">Preview appears here</Panel>
          )}
        </div>

        <Panel className="space-y-4 p-4">
          {!id && (
            <Segmented value={form.type} onChange={(t) => set("type", t)} options={[{ value: "vocab", label: "Vocabulary" }, { value: "kanji", label: "Kanji" }]} />
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label={isKanji ? "Kanji" : "Word (kanji)"}>
              <input lang="ja" disabled={builtIn} value={form.term} onChange={(e) => set("term", e.target.value)} className="input font-jp text-xl" placeholder={isKanji ? "待" : "待つ"} />
            </Field>
            {!isKanji && (
              <Field label="Reading (hiragana)">
                <input lang="ja" disabled={builtIn} value={form.reading ?? ""} onChange={(e) => set("reading", str(e.target.value))} className="input font-jp" placeholder="まつ" />
              </Field>
            )}
            {isKanji && (
              <>
                <Field label="On'yomi (; separated)">
                  <input lang="ja" disabled={builtIn} value={form.onyomi.join("; ")} onChange={(e) => set("onyomi", toList(e.target.value))} className="input font-jp" placeholder="タイ" />
                </Field>
                <Field label="Kun'yomi (; separated)">
                  <input lang="ja" disabled={builtIn} value={form.kunyomi.join("; ")} onChange={(e) => set("kunyomi", toList(e.target.value))} className="input font-jp" placeholder="ま.つ" />
                </Field>
                <Field label="Strokes">
                  <input type="number" disabled={builtIn} value={form.stroke_count ?? ""} onChange={(e) => set("stroke_count", Number(e.target.value) || null)} className="input" />
                </Field>
              </>
            )}
          </div>

          <Field label="English meaning (; separated)">
            <input disabled={builtIn} value={form.meaning_en.join("; ")} onChange={(e) => set("meaning_en", toList(e.target.value))} className="input" placeholder="to wait; to await" />
          </Field>
          <Field label="Burmese meaning · မြန်မာ အဓိပ္ပာယ်">
            <input lang="my" value={form.meaning_my ?? ""} onChange={(e) => set("meaning_my", str(e.target.value))} className="input font-my" placeholder="စောင့်သည်" />
          </Field>

          {!isKanji && (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Part of speech">
                <input disabled={builtIn} value={form.pos ?? ""} onChange={(e) => set("pos", str(e.target.value))} className="input" placeholder="verb (godan)" />
              </Field>
              <Field label="Furigana override (optional)">
                <input lang="ja" disabled={builtIn} value={form.furigana ?? ""} onChange={(e) => set("furigana", str(e.target.value))} className="input font-jp" placeholder="待[ま]つ" />
              </Field>
            </div>
          )}

          <fieldset className="space-y-3 rounded-xl border border-warn/40 bg-warn/5 p-3">
            <legend className="px-1 text-sm font-semibold text-warn">Similar Kanji warning</legend>
            <Field label="Look-alike kanji">
              <input lang="ja" value={form.similar.join("")} onChange={(e) => set("similar", toChars(e.target.value))} className="input font-jp text-xl" placeholder="持特" />
            </Field>
            <Field label="How to tell them apart">
              <textarea value={form.similar_note ?? ""} onChange={(e) => set("similar_note", str(e.target.value))} className="input min-h-20 py-2" placeholder="待 has 彳 (going person); 持 has 扌 (hand)" />
            </Field>
          </fieldset>

          <Field label={isKanji ? "Example words (one per line)" : "Example sentence (Japanese)"}>
            <textarea lang="ja" disabled={builtIn} value={form.example_jp ?? ""} onChange={(e) => set("example_jp", str(e.target.value))} className="input min-h-16 py-2 font-jp" />
          </Field>
          {!isKanji && (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Example (English)">
                <input disabled={builtIn} value={form.example_en ?? ""} onChange={(e) => set("example_en", str(e.target.value))} className="input" />
              </Field>
              <Field label="Example (Burmese)">
                <input lang="my" value={form.example_my ?? ""} onChange={(e) => set("example_my", str(e.target.value))} className="input font-my" />
              </Field>
            </div>
          )}
          <Field label="Notes">
            <textarea value={form.notes ?? ""} onChange={(e) => set("notes", str(e.target.value))} className="input min-h-16 py-2" />
          </Field>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="JLPT level">
              <select disabled={builtIn} value={form.jlpt_level ?? ""} onChange={(e) => set("jlpt_level", Number(e.target.value) || null)} className="input">
                <option value="">—</option>
                {[5, 4, 3, 2, 1].map((l) => <option key={l} value={l}>N{l}</option>)}
              </select>
            </Field>
            <Field label="Tags (space separated)">
              <input
                value={form.tags.map((t) => `#${t}`).join(" ")}
                onChange={(e) => set("tags", e.target.value.split(/\s+/).map((t) => t.replace(/^#/, "")).filter(Boolean))}
                className="input"
                placeholder="#Soumatome #Week1"
              />
            </Field>
          </div>

          {decks.length > 0 && (
            <Field label="Decks">
              <div className="flex flex-wrap gap-3">
                {decks.map((d) => (
                  <label key={d.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="accent-[var(--primary)]"
                      checked={deckIds.includes(d.id)}
                      onChange={(e) => setDeckIds(e.target.checked ? [...deckIds, d.id] : deckIds.filter((x) => x !== d.id))}
                    />
                    {d.name}
                  </label>
                ))}
              </div>
            </Field>
          )}

          {error && <p className="text-sm text-bad">{error}</p>}
          <div className="flex gap-2">
            <Button onClick={save} disabled={saving} className="flex-1"><Save size={18} /> {saving ? "Saving…" : id ? "Save" : "Save & add another"}</Button>
            {id && !builtIn && <Button variant="danger" onClick={remove} aria-label="Delete card"><Trash2 size={18} /></Button>}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
