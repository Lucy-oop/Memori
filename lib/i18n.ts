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
  onbTitle: "What are you studying?",
  onbSub: "Tap your JLPT level to start at Day 1. You can change it any time in Settings.",
  partway: "I'm already partway through",
  partwayHint: "Pick the day you're on now. Earlier days and easier levels go into your reviews.",
  startStudying: "Start studying",
  settingUp: "Setting up…",
  words: "words",
  kanjiUnit: "kanji",
  levelN5: "Beginner",
  levelN4: "Elementary",
  levelN3: "Intermediate",
  levelN2: "Upper-intermediate",
} as const;

export type I18nKey = keyof typeof en;

const my: Partial<Record<I18nKey, string>> = {
  home: "ပင်မ",
  vocab: "ဝေါဟာရ",
  kanji: "ခန်းဂျီး",
  progress: "တိုးတက်မှု",
  settings: "ဆက်တင်",
  goi: "ဝေါဟာရ (Goi)",
  today: "ယနေ့",
  learn: "ယနေ့ စကားလုံးများ လေ့လာရန်",
  learnKanji: "ယနေ့ ခန်းဂျီး လေ့လာရန်",
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
  onbTitle: "ဘယ်အဆင့်ကို လေ့လာနေပါသလဲ?",
  onbSub: "သင့် JLPT အဆင့်ကို နှိပ်ပြီး Day 1 မှ စတင်ပါ။ ဆက်တင်တွင် အချိန်မရွေး ပြောင်းနိုင်ပါသည်။",
  partway: "စာအုပ်ထဲ လေ့လာနေဆဲ ဖြစ်ပါသည်",
  partwayHint: "ယခု ရောက်နေသော နေ့ကို ရွေးပါ။ ယခင်နေ့များနှင့် အောက်အဆင့်များကို ပြန်လေ့ကျင့်ရာတွင် ထည့်ပါမည်။",
  startStudying: "စတင်လေ့လာမည်",
  settingUp: "ပြင်ဆင်နေသည်…",
  words: "စကားလုံး",
  kanjiUnit: "ခန်းဂျီး",
  levelN5: "အခြေခံ",
  levelN4: "အခြေခံ အဆင့်မြင့်",
  levelN3: "အလယ်အလတ်",
  levelN2: "အလယ်အလတ် အဆင့်မြင့်",
};

export function t(lang: MeaningLang, k: I18nKey): string {
  return (lang === "my" ? my[k] : undefined) ?? en[k];
}
