/** Speak Japanese text with the browser's built-in TTS (no audio files needed). */
export function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  u.rate = 0.9;
  const voice = speechSynthesis.getVoices().find((v) => v.lang.startsWith("ja"));
  if (voice) u.voice = voice;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

export const canSpeak = () => typeof window !== "undefined" && "speechSynthesis" in window;

/**
 * Resolves true when the device has a Japanese voice. Voices load asynchronously in most
 * browsers, so wait for `voiceschanged` (up to ~1.5 s) before deciding.
 */
export function hasJapaneseVoice(): Promise<boolean> {
  if (!canSpeak()) return Promise.resolve(false);
  const check = () => speechSynthesis.getVoices().some((v) => v.lang.toLowerCase().startsWith("ja"));
  if (speechSynthesis.getVoices().length) return Promise.resolve(check());
  return new Promise((resolve) => {
    const done = () => {
      speechSynthesis.removeEventListener("voiceschanged", done);
      resolve(check());
    };
    speechSynthesis.addEventListener("voiceschanged", done);
    setTimeout(done, 1500);
  });
}
