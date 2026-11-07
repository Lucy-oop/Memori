"use client";

import { GraduationCap, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLibrary } from "@/components/LibraryProvider";
import { Button, Panel, Segmented, Spinner } from "@/components/ui";
import { signOut, updateProfile } from "@/lib/data";
import { currentUnit, unitLabel } from "@/lib/curriculum";

type Theme = "system" | "light" | "dark";

export default function SettingsPage() {
  const { profile, setProfile, furigana, setFurigana, loading, units, progress, lang, setLang } = useLibrary();
  const router = useRouter();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(20);
  const [tz, setTz] = useState("UTC");
  const [theme, setTheme] = useState<Theme>("system");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setName(profile.display_name ?? "");
    setGoal(profile.daily_goal);
    setTz(profile.timezone);
  }, [profile]);

  useEffect(() => {
    setTheme((localStorage.getItem("memori-theme") as Theme) ?? "system");
  }, []);

  const applyTheme = (t: Theme) => {
    setTheme(t);
    if (t === "system") {
      localStorage.removeItem("memori-theme");
      document.documentElement.dataset.theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      localStorage.setItem("memori-theme", t);
      document.documentElement.dataset.theme = t;
    }
  };

  if (loading || !profile) return <Spinner />;

  const zones = typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("timeZone") : [tz];
  const deviceTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const save = async () => {
    const patch = { display_name: name.trim() || null, daily_goal: goal, timezone: tz, furigana_default: furigana };
    await updateProfile(patch);
    setProfile({ ...profile, ...patch });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Panel className="space-y-4 p-5">
        <h2 className="flex items-center gap-2 font-semibold"><GraduationCap size={20} /> Course</h2>
        <ul className="space-y-1 text-sm">
          {(["goi", "kanji"] as const).map((track) => {
            const p = progress[track];
            const u = p ? currentUnit(units, p) : null;
            return (
              <li key={track} className="flex justify-between gap-3">
                <span className="text-muted">{track === "goi" ? "Vocabulary (Goi)" : "Kanji"}</span>
                <span className="font-medium">{u ? unitLabel(u) : "Not set"}</span>
              </li>
            );
          })}
        </ul>
        <Link href="/onboarding"><Button variant="secondary" className="w-full">Change level or day</Button></Link>
        {profile.is_admin && (
          <Link href="/admin/units"><Button variant="ghost" className="w-full">Admin · Import Soumatome units</Button></Link>
        )}
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium">Meaning language</span>
          <Segmented value={lang} onChange={setLang} options={[{ value: "en", label: "English" }, { value: "my", label: "မြန်မာ" }]} />
        </div>
      </Panel>

      <Panel className="space-y-4 p-4">
        <label className="block space-y-1">
          <span className="text-sm font-medium text-muted">Display name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="input" />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-muted">Daily goal (reviews per day)</span>
          <input type="number" min={1} max={1000} value={goal} onChange={(e) => setGoal(Math.max(1, Number(e.target.value)))} className="input" />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-muted">Timezone (your streak day starts at midnight here)</span>
          <select value={tz} onChange={(e) => setTz(e.target.value)} className="input">
            {zones.map((z) => <option key={z} value={z}>{z}</option>)}
          </select>
          {deviceTz !== tz && (
            <button type="button" className="text-sm text-primary underline" onClick={() => setTz(deviceTz)}>Use this device&apos;s timezone ({deviceTz})</button>
          )}
        </label>
        <label className="flex items-center justify-between">
          <span>Show furigana by default</span>
          <input type="checkbox" checked={furigana} onChange={(e) => setFurigana(e.target.checked)} className="h-5 w-5 accent-[var(--primary)]" />
        </label>
        <Button onClick={save}>{saved ? "Saved ✓" : "Save"}</Button>
      </Panel>

      <Panel className="flex items-center justify-between p-4">
        <span>Appearance</span>
        <Segmented value={theme} onChange={applyTheme} options={[{ value: "system", label: "Auto" }, { value: "light", label: "Light" }, { value: "dark", label: "Dark" }]} />
      </Panel>

      <Panel className="space-y-2 p-4 text-sm">
        <p className="font-medium">Install the app</p>
        <p className="text-muted">
          iPhone/iPad: Safari → Share → <em>Add to Home Screen</em>. Android/desktop Chrome: menu → <em>Install app</em>.
          Your decks stay studyable offline; reviews sync when you&apos;re back online.
        </p>
      </Panel>

      <div className="flex items-center justify-between">
        <Link href="/about" className="text-sm text-muted underline">About &amp; data credits</Link>
        <Button variant="secondary" onClick={async () => { await signOut(); router.push("/login"); router.refresh(); }}>
          <LogOut size={18} /> Sign out
        </Button>
      </div>
    </div>
  );
}
