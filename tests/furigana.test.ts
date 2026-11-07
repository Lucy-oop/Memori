import { describe, expect, it } from "vitest";
import { alignFurigana, parseBracketFurigana } from "@/lib/furigana";

describe("alignFurigana", () => {
  it("splits okurigana", () => {
    expect(alignFurigana("待つ", "まつ")).toEqual([{ text: "待", ruby: "ま" }, { text: "つ" }]);
  });
  it("handles kana between kanji", () => {
    expect(alignFurigana("食べ物", "たべもの")).toEqual([
      { text: "食", ruby: "た" }, { text: "べ" }, { text: "物", ruby: "もの" },
    ]);
  });
  it("leaves pure kana alone", () => {
    expect(alignFurigana("ああ", "ああ")).toEqual([{ text: "ああ" }]);
  });
  it("matches katakana in the term against a hiragana reading", () => {
    expect(alignFurigana("ボール箱", "ぼーるばこ")).toEqual([{ text: "ボール" }, { text: "箱", ruby: "ばこ" }]);
  });
  it("falls back to whole-word ruby when alignment fails", () => {
    expect(alignFurigana("今日", "きょう")).toEqual([{ text: "今日", ruby: "きょう" }]);
    expect(alignFurigana("待つ", "まち")).toEqual([{ text: "待つ", ruby: "まち" }]);
  });
});

describe("parseBracketFurigana", () => {
  it("parses explicit readings", () => {
    expect(parseBracketFurigana("日本[にほん]語[ご]を話[はな]す")).toEqual([
      { text: "日本", ruby: "にほん" }, { text: "語", ruby: "ご" }, { text: "を" },
      { text: "話", ruby: "はな" }, { text: "す" },
    ]);
  });
});
