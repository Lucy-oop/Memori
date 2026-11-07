import type { MeaningLang } from "./types";

/**
 * UI labels in English and Burmese. Burmese strings are a first draft — please have a
 * native speaker review them. Missing Burmese keys fall back to English.
 */
const en = {
  home: "Home",
  vocab: "Vocabulary",
  kanji: "Kanji",
  progress: "Progress",
  settings: "Settings",
  goi: "Vocabulary (Goi)",
  today: "Today",
  learn: "Learn today's words",
  learnKanji: "Learn today's kanji",
  review: "Random review",
  quiz: "Quiz",
  typing: "Typing",
  finishDay: "Finish this day",
  dueNow: "due now",
  dayOf: "seen",
  courseDone: "Course complete 🎉",
  setLevel: "Set my level",
  changeLevel: "Change level",
  reviewHint: "Mix of today, cards due, and everything before",
  language: "Meaning language",
} as const;

export type I18nKey = keyof typeof en;

const my: Partial<Record<I18nKey, string>> = {
  home: "ပင်မ",
  vocab: "ဝေါဟာရ",
  kanji: "ခန်းဂျိ",
  progress: "တိုးတက်မှု",
  settings: "ဆက်တင်",
  goi: "ဝေါဟာရ (Goi)",
  today: "ယနေ့",
  learn: "ယနေ့ စကားလုံးများ လေ့လာရန်",
  learnKanji: "ယနေ့ ခန်းဂျိ လေ့လာရန်",
  review: "ကျပန်း ပြန်လှန်လေ့ကျင့်ရန်",
  quiz: "ဉာဏ်စမ်း",
  typing: "စာရိုက်",
  finishDay: "ဒီနေ့ ပြီးပါပြီ",
  dueNow: "ပြန်လေ့ကျင့်ရန်",
  dayOf: "လေ့လာပြီး",
  courseDone: "သင်ခန်းစာ ပြီးဆုံးပါပြီ 🎉",
  setLevel: "အဆင့် ရွေးရန်",
  changeLevel: "အဆင့် ပြောင်းရန်",
  reviewHint: "ယနေ့၊ ပြန်လေ့ကျင့်ရမည့်ကတ်များနှင့် ယခင်အားလုံး ရောနှော",
  language: "အဓိပ္ပာယ် ဘာသာစကား",
};

export function t(lang: MeaningLang, k: I18nKey): string {
  return (lang === "my" ? my[k] : undefined) ?? en[k];
}
