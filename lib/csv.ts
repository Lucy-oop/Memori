import Papa from "papaparse";
import type { CardInput } from "./data";
import type { Card, CardType } from "./types";

/** Column order for import/export. List fields use ";" between items. */
export const CSV_COLUMNS = [
  "type", "term", "reading", "meaning_en", "meaning_my", "pos", "onyomi", "kunyomi",
  "stroke_count", "radical", "similar", "similar_note", "example_jp", "example_en", "example_my",
  "notes", "jlpt_level", "tags",
] as const;

const LIST_FIELDS = new Set(["meaning_en", "onyomi", "kunyomi", "similar", "tags"]);

const splitList = (s: string | undefined) =>
  (s ?? "").split(/[;；]/).map((x) => x.trim()).filter(Boolean);

export function cardsToCsv(cards: Card[]): string {
  const rows = cards.map((c) =>
    Object.fromEntries(
      CSV_COLUMNS.map((col) => {
        const v = c[col as keyof Card];
        return [col, Array.isArray(v) ? v.join("; ") : v ?? ""];
      }),
    ),
  );
  return Papa.unparse({ fields: [...CSV_COLUMNS], data: rows.map((r) => CSV_COLUMNS.map((c) => r[c])) });
}

export interface ParseResult {
  cards: CardInput[];
  errors: string[];
}

/**
 * Parse a CSV with a header row. Only `term` is required; `type` defaults to the
 * deck being imported into, and `defaultTags` (e.g. Soumatome) are added to every row.
 */
export function parseCardsCsv(text: string, defaultType: CardType, defaultTags: string[] = []): ParseResult {
  const { data, errors: parseErrors } = Papa.parse<Record<string, string>>(text.replace(/^﻿/, ""), {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (h) => h.trim().toLowerCase().replace(/\s+/g, "_"),
  });
  const errors = parseErrors.map((e) => `Row ${(e.row ?? 0) + 2}: ${e.message}`);
  const cards: CardInput[] = [];

  data.forEach((row, i) => {
    const term = row.term?.trim();
    if (!term) {
      errors.push(`Row ${i + 2}: missing "term"`);
      return;
    }
    const type = (row.type?.trim().toLowerCase() || defaultType) as CardType;
    if (type !== "vocab" && type !== "kanji") {
      errors.push(`Row ${i + 2}: type must be "vocab" or "kanji"`);
      return;
    }
    const level = Number(row.jlpt_level?.replace(/^n/i, ""));
    const tags = [...new Set([...splitList(row.tags).map((t) => t.replace(/^#/, "")), ...defaultTags])];
    if (level >= 1 && level <= 5 && !tags.includes(`N${level}`)) tags.unshift(`N${level}`);

    const get = (k: string) => row[k]?.trim() || null;
    cards.push({
      type,
      term,
      reading: get("reading"),
      furigana: null,
      meaning_en: splitList(row.meaning_en),
      meaning_my: get("meaning_my"),
      pos: get("pos"),
      onyomi: splitList(row.onyomi),
      kunyomi: splitList(row.kunyomi),
      stroke_count: Number(row.stroke_count) || null,
      radical: get("radical"),
      similar: splitList(row.similar),
      similar_note: get("similar_note"),
      example_jp: get("example_jp"),
      example_en: get("example_en"),
      example_my: get("example_my"),
      notes: get("notes"),
      jlpt_level: level >= 1 && level <= 5 ? level : null,
      tags,
    });
  });
  return { cards, errors };
}

export const isListField = (k: string) => LIST_FIELDS.has(k);
