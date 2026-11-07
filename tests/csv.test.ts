import { describe, expect, it } from "vitest";
import { cardsToCsv, parseCardsCsv } from "@/lib/csv";
import { card } from "./helpers";

describe("csv", () => {
  it("parses rows with list fields, levels and default tags", () => {
    const csv = "term,reading,meaning_en,meaning_my,jlpt_level,tags,similar\n" +
      '待つ,まつ,"to wait; to await",စောင့်သည်,N4,#Week1,持\n';
    const { cards, errors } = parseCardsCsv(csv, "vocab", ["Soumatome"]);
    expect(errors).toEqual([]);
    expect(cards[0]).toMatchObject({
      type: "vocab", term: "待つ", reading: "まつ", meaning_en: ["to wait", "to await"],
      meaning_my: "စောင့်သည်", jlpt_level: 4, tags: ["N4", "Week1", "Soumatome"], similar: ["持"],
    });
  });
  it("reports rows without a term or with a bad type", () => {
    const { cards, errors } = parseCardsCsv("type,term\nkanji,\nfoo,山\n", "kanji");
    expect(cards).toHaveLength(0);
    expect(errors).toHaveLength(2);
  });
  it("round-trips export → import", () => {
    const c = card({ term: "待", meaning_en: ["wait"], onyomi: ["タイ"], kunyomi: ["ま.つ"], similar: ["持", "特"], tags: ["N4"], jlpt_level: 4, meaning_my: "စောင့်" });
    const { cards } = parseCardsCsv(cardsToCsv([c]), "kanji");
    expect(cards[0]).toMatchObject({ term: "待", meaning_en: ["wait"], onyomi: ["タイ"], kunyomi: ["ま.つ"], similar: ["持", "特"], tags: ["N4"], jlpt_level: 4, meaning_my: "စောင့်" });
  });
});
