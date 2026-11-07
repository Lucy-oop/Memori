"use client";

import clsx from "clsx";
import { BarChart3, BookOpen, CloudOff, Home, Languages, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { t, type I18nKey } from "@/lib/i18n";
import { useLibrary } from "./LibraryProvider";

const NAV: { href: string; label: I18nKey; icon: typeof Home }[] = [
  { href: "/", label: "home", icon: Home },
  { href: "/decks/vocab", label: "vocab", icon: Languages },
  { href: "/decks/kanji", label: "kanji", icon: BookOpen },
  { href: "/stats", label: "progress", icon: BarChart3 },
  { href: "/settings", label: "settings", icon: Settings },
];

/** EN / မြန်မာ switch for card meanings and UI labels. */
export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLibrary();
  return (
    <div role="group" aria-label="Meaning language" className={clsx("inline-flex rounded-lg border border-line bg-surface-2 p-0.5 text-xs font-semibold", className)}>
      {(["en", "my"] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={clsx("rounded-md px-2 py-1 transition", lang === l ? "bg-surface text-primary shadow-sm" : "text-muted")}
        >
          {l === "en" ? "EN" : <span className="font-my">မြန်မာ</span>}
        </button>
      ))}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { pending, profile, lang } = useLibrary();
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  const onboarding = path.startsWith("/onboarding");
  // Full-screen pages: no navigation chrome.
  const studying = path.startsWith("/study") || onboarding;

  // New learners pick their level before anything else.
  useEffect(() => {
    if (profile && !profile.onboarded && !onboarding) router.replace("/onboarding");
  }, [profile, onboarding, router]);

  return (
    <div className="min-h-dvh md:flex">
      {/* Sidebar — tablet & desktop */}
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-line bg-surface px-3 py-5 md:flex">
        <Link href="/" className="mb-6 flex items-center gap-2 px-2">
          <Image src="/logo-mark.png" alt="" width={40} height={40} className="rounded-lg" />
          <span className="text-xl font-bold text-primary">Memori</span>
          <span lang="ja" className="font-jp text-sm text-muted">メモリ</span>
        </Link>
        <nav className="flex flex-col gap-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition",
                isActive(href) ? "bg-primary-soft text-primary" : "text-muted hover:bg-surface-2 hover:text-ink",
              )}
            >
              <Icon size={20} /> {t(lang, label)}
            </Link>
          ))}
        </nav>
        <LangToggle className="mx-2 mt-4 self-start" />
        {pending > 0 && <OfflineBadge pending={pending} className="mt-auto" />}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar — phones */}
        {!studying && (
          <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-line bg-bg/90 px-4 py-2 backdrop-blur md:hidden">
            <Image src="/logo-mark.png" alt="" width={32} height={32} className="rounded-md" />
            <span className="text-lg font-bold text-primary">Memori</span>
            <LangToggle className="ml-auto" />
            {pending > 0 && <OfflineBadge pending={pending} />}
          </header>
        )}
        <main className={clsx("mx-auto w-full max-w-5xl flex-1 px-4 py-5 sm:px-6", !studying && "pb-24 md:pb-8")}>{children}</main>
      </div>

      {/* Bottom tabs — phones */}
      {!studying && (
        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx("flex flex-col items-center gap-0.5 py-2 text-[11px]", isActive(href) ? "text-primary" : "text-muted")}
            >
              <Icon size={22} />
              {t(lang, label)}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

function OfflineBadge({ pending, className }: { pending: number; className?: string }) {
  return (
    <span className={clsx("flex items-center gap-1.5 rounded-full bg-warn/15 px-2.5 py-1 text-xs text-warn", className)}>
      <CloudOff size={14} /> {pending} to sync
    </span>
  );
}
