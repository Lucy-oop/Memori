"use client";

import { MeaningText } from "@/components/MeaningText";
import { LEVELS } from "@/lib/levels";
import clsx from "clsx";
import { Download, FolderPlus, Plus, Search, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import { notFound, useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useRef, useState } from "react";
import { FuriganaText } from "@/components/FuriganaText";
import { useLibrary } from "@/components/LibraryProvider";
import { StarButton } from "@/components/StarButton";
import { Button, Chip, Empty, LevelBadge, Panel, Segmented, Spinner } from "@/components/ui";
import { cardsToCsv, parseCardsCsv } from "@/lib/csv";
import { addCardsToDeck, createDeck, deleteDeck, insertCards } from "@/lib/data";
import { allTags, filterCards, mastery, type Only } from "@/lib/filters";
import type { CardType, StudyCard } from "@/lib/types";

export default function DeckPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <DeckBrowser />
    </Suspense>
  );
}

const ONLY: { value: Only; label: string }[] = [
  { value: "all", label: "All" },
  { value: "due", label: "Due" },
  { value: "new", label: "New" },
  { value: "starred", label: "★ Starred" },
  { value: "leech", label: "Tricky" },
];

const MASTERY_DOT = { new: "bg-line", learning: "bg-warn", review: "bg-good", mastered: "bg-primary" };
const SHOW = 120;

function DeckBrowser() {
  const { type } = useParams<{ type: string }>();
  if (type !== "vocab" && type !== "kanji") notFound();
  const cardType = type as CardType;

  const router = useRouter();
  const params = useSearchParams();
  const { cards, decks, loading, furigana, setFurigana, reload } = useLibrary();
  const [limit, setLimit] = useState(SHOW);
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [msg, setMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const levels = params.get("level")?.split(",").map(Number).filter(Boolean) ?? [];
  const tags = params.get("tag")?.split(",").filter(Boolean) ?? [];
  const only = (params.get("only") as Only) ?? "all";
  const deckId = params.get("deck");
  const search = params.get("q") ?? "";

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`?${next}`, { scroll: false });
    setLimit(SHOW);
  };
  const toggleIn = (key: string, list: (string | number)[], v: string | number) => {
    const s = new Set(list.map(String));
    if (!s.delete(String(v))) s.add(String(v));
    setParam(key, [...s].join(",") || null);
  };

  const typeCards = useMemo(() => cards.filter((c) => c.type === cardType), [cards, cardType]);
  const tagOptions = useMemo(() => allTags(typeCards).filter((t) => !/^N\d$/.test(t)), [typeCards]);
  const deck = decks.find((d) => d.id === deckId) ?? null;
  const shown = useMemo(
    () =>
      filterCards(typeCards, {
        levels,
        tags,
        only,
        search,
        deckCardIds: deck ? new Set(deck.card_ids) : null,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [typeCards, params.toString(), deck],
  );

  const studyHref = (mode: string) => {
    const q = new URLSearchParams(params);
    q.set("type", cardType);
    q.set("mode", mode);
    return `/study?${q}`;
  };

  const exportCsv = () => {
    const blob = new Blob(["﻿" + cardsToCsv(shown)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `memori-${cardType}${levels.length ? `-N${levels.join("N")}` : ""}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importCsv = async (file: File) => {
    const extra = prompt("Tag every imported card with (optional, e.g. Soumatome Week1):", tags.join(" ")) ?? "";
    const { cards: parsed, errors } = parseCardsCsv(await file.text(), cardType, extra.split(/\s+/).map((t) => t.replace(/^#/, "")).filter(Boolean));
    if (!parsed.length) {
      setMsg(`Nothing imported. ${errors.slice(0, 3).join(" · ")}`);
      return;
    }
    try {
      await insertCards(parsed);
      await reload();
      setMsg(`Imported ${parsed.length} card${parsed.length === 1 ? "" : "s"}${errors.length ? ` · ${errors.length} row(s) skipped` : ""}.`);
    } catch (e) {
      setMsg(`Import failed: ${e instanceof Error ? e.message : e}`);
    }
  };

  const newDeck = async () => {
    const name = prompt("New deck name (e.g. Soumatome Week 1):");
    if (!name?.trim()) return;
    const id = await createDeck(name.trim());
    if (selected.size) await addCardsToDeck(id, [...selected]);
    await reload();
    setSelecting(false);
    setSelected(new Set());
    setParam("deck", id);
  };

  const addSelectedTo = async (id: string) => {
    await addCardsToDeck(id, [...selected]);
    await reload();
    setMsg(`Added ${selected.size} card(s) to ${decks.find((d) => d.id === id)?.name}.`);
    setSelecting(false);
    setSelected(new Set());
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold">{cardType === "kanji" ? "Kanji" : "Vocabulary"}</h1>
        <span className="text-muted">{shown.length} cards</span>
        <div className="ml-auto flex flex-wrap gap-2">
          <Link href={`/cards/edit?type=${cardType}${deckId ? `&deck=${deckId}` : ""}`}>
            <Button size="sm"><Plus size={16} /> New card</Button>
          </Link>
          <Button size="sm" variant="secondary" onClick={() => fileRef.current?.click()}><Upload size={16} /> Import</Button>
          <Button size="sm" variant="secondary" onClick={exportCsv}><Download size={16} /> Export</Button>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) importCsv(f);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {msg && (
        <p className="rounded-xl bg-primary-soft px-3 py-2 text-sm text-primary" role="status" onClick={() => setMsg(null)}>
          {msg}
        </p>
      )}

      {/* Study buttons */}
      <Panel className="flex flex-wrap items-center gap-2 p-3">
        <span className="mr-1 text-sm font-medium">Study these:</span>
        <Link href={studyHref("flip")}><Button size="sm" variant="secondary">Flashcards</Button></Link>
        <Link href={studyHref("srs")}><Button size="sm">SRS review</Button></Link>
        <Link href={studyHref("mc")}><Button size="sm" variant="secondary">Kanji Trap quiz</Button></Link>
        <Link href={studyHref("type")}><Button size="sm" variant="secondary">Typing</Button></Link>
        <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" checked={furigana} onChange={(e) => setFurigana(e.target.checked)} className="accent-[var(--primary)]" />
          Furigana
        </label>
      </Panel>

      {/* Filters */}
      <div className="space-y-2">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            defaultValue={search}
            onChange={(e) => setParam("q", e.target.value || null)}
            placeholder="Search kanji, reading, English or Burmese…"
            className="h-11 w-full rounded-xl border border-line bg-surface pl-10 pr-3 outline-none focus:border-primary"
          />
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {LEVELS.map((l) => (
            <Chip key={l} active={levels.includes(l)} onClick={() => toggleIn("level", levels, l)}>#N{l}</Chip>
          ))}
          {tagOptions.map((t) => (
            <Chip key={t} active={tags.includes(t)} onClick={() => toggleIn("tag", tags, t)}>#{t}</Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Segmented value={only} options={ONLY} onChange={(v) => setParam("only", v === "all" ? null : v)} />
          <select
            value={deckId ?? ""}
            onChange={(e) => setParam("deck", e.target.value || null)}
            className="h-11 rounded-xl border border-line bg-surface px-3 text-sm"
            aria-label="Deck"
          >
            <option value="">All decks</option>
            {decks.map((d) => (
              <option key={d.id} value={d.id}>{d.name} ({d.card_ids.length})</option>
            ))}
          </select>
          {deck && (
            <Button
              size="sm"
              variant="ghost"
              aria-label="Delete deck"
              onClick={async () => {
                if (!confirm(`Delete deck "${deck.name}"? Cards are kept.`)) return;
                await deleteDeck(deck.id);
                await reload();
                setParam("deck", null);
              }}
            >
              <Trash2 size={16} />
            </Button>
          )}
          <Button size="sm" variant={selecting ? "primary" : "secondary"} onClick={() => { setSelecting(!selecting); setSelected(new Set()); }}>
            <FolderPlus size={16} /> {selecting ? "Cancel" : "Add to deck"}
          </Button>
        </div>
        {selecting && (
          <Panel className="flex flex-wrap items-center gap-2 p-3 text-sm">
            <span>{selected.size} selected —</span>
            <Button size="sm" variant="ghost" onClick={() => setSelected(new Set(shown.map((c) => c.id)))}>Select all {shown.length}</Button>
            {decks.map((d) => (
              <Button key={d.id} size="sm" variant="secondary" disabled={!selected.size} onClick={() => addSelectedTo(d.id)}>→ {d.name}</Button>
            ))}
            <Button size="sm" onClick={newDeck}>+ New deck{selected.size ? " with these" : ""}</Button>
          </Panel>
        )}
      </div>

      {shown.length === 0 ? (
        <Empty title="No cards match">Try removing a filter, or add your own cards with “New card” or CSV import.</Empty>
      ) : (
        <>
          <div className={clsx("grid gap-2", cardType === "kanji" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3")}>
            {shown.slice(0, limit).map((c) => (
              <CardTile
                key={c.id}
                card={c}
                furigana={furigana}
                selecting={selecting}
                selected={selected.has(c.id)}
                onSelect={() => {
                  const s = new Set(selected);
                  if (!s.delete(c.id)) s.add(c.id);
                  setSelected(s);
                }}
              />
            ))}
          </div>
          {shown.length > limit && (
            <Button variant="secondary" className="w-full" onClick={() => setLimit(limit + SHOW)}>
              Show more ({shown.length - limit} left)
            </Button>
          )}
        </>
      )}
    </div>
  );
}

function CardTile({
  card,
  furigana,
  selecting,
  selected,
  onSelect,
}: {
  card: StudyCard;
  furigana: boolean;
  selecting: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          {card.type === "kanji" ? (
            <span lang="ja" className="font-jp text-4xl leading-none">{card.term}</span>
          ) : (
            <FuriganaText term={card.term} reading={card.reading} show={furigana} className="text-2xl leading-[1.9]" />
          )}
        </div>
        <div className="-mr-2 -mt-2 flex items-center">
          <span className={clsx("h-2 w-2 rounded-full", MASTERY_DOT[mastery(card)])} title={mastery(card)} />
          {!selecting && <StarButton card={card} />}
        </div>
      </div>
      <p className="mt-1 line-clamp-2 text-sm"><MeaningText card={card} max={3} /></p>
      <div className="mt-2 flex items-center gap-1">
        <LevelBadge level={card.jlpt_level} />
        {card.similar.length > 0 && <span className="rounded-md bg-warn/15 px-1.5 py-0.5 text-xs text-warn">≈ {card.similar.slice(0, 3).join("")}</span>}
        {card.owner_id && <span className="text-xs text-muted">· mine</span>}
      </div>
    </>
  );
  const cls = clsx("block rounded-xl border bg-surface p-3 transition", selected ? "border-primary ring-2 ring-primary/30" : "border-line hover:border-primary/50");
  return selecting ? (
    <button className={clsx(cls, "text-left")} onClick={onSelect} aria-pressed={selected}>{body}</button>
  ) : (
    <Link href={`/cards/edit?id=${card.id}`} className={cls}>{body}</Link>
  );
}
