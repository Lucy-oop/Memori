"use client";

import { Eye, EyeOff, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button, Panel } from "@/components/ui";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}

/**
 * Fast sign-in: Google on top, then ONE email + password form. "Continue" signs in when the
 * account exists and creates it when it doesn't, so new users never have to pick a tab.
 * New accounts go straight to onboarding; middleware routes everyone else.
 */
function Login() {
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get("next") ?? "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(params.get("error") ? "That sign-in link expired or was invalid. Please try again." : null);
  const [busy, setBusy] = useState(false);

  const redirectTo = (to = next) => `${location.origin}/auth/callback?next=${encodeURIComponent(to)}`;

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const go = (to: string) => {
    router.replace(to);
    router.refresh();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    run(async () => {
      if (password.length < 8) throw new Error("Password must be at least 8 characters.");
      const auth = supabaseBrowser().auth;

      // 1. Existing account?
      const signIn = await auth.signInWithPassword({ email, password });
      if (!signIn.error) return go(next);
      if (!/invalid login credentials/i.test(signIn.error.message)) throw signIn.error;

      // 2. No match: try creating the account with these details.
      const signUp = await auth.signUp({ email, password, options: { emailRedirectTo: redirectTo("/onboarding") } });
      const alreadyExists =
        /already (registered|exists)/i.test(signUp.error?.message ?? "") ||
        (!signUp.error && signUp.data.user && signUp.data.user.identities?.length === 0);
      if (alreadyExists) throw new Error("Wrong password for this email. Try again or tap “Forgot password?”.");
      if (signUp.error) throw signUp.error;
      if (signUp.data.session) return go("/onboarding");
      // Email confirmation is switched on in Supabase.
      setSent(`We sent a confirmation link to ${email}. Open it to start studying.`);
    });
  };

  const forgot = () =>
    run(async () => {
      if (!email) throw new Error("Enter your email first, then tap “Forgot password?”.");
      const { error } = await supabaseBrowser().auth.resetPasswordForEmail(email, { redirectTo: redirectTo("/auth/reset") });
      if (error) throw error;
      setSent(`We sent a password reset link to ${email}.`);
    });

  const magicLink = () =>
    run(async () => {
      if (!email) throw new Error("Enter your email first.");
      const { error } = await supabaseBrowser().auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo() } });
      if (error) throw error;
      setSent(`We sent a sign-in link to ${email}. Open it on this device.`);
    });

  const google = async () => {
    const { error } = await supabaseBrowser().auth.signInWithOAuth({ provider: "google", options: { redirectTo: redirectTo() } });
    if (error) setError(error.message);
  };

  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center text-center">
          <Image src="/logo-full.png" alt="Memori (メモリ)" width={320} height={179} priority className="rounded-2xl" />
          <p className="mt-2 text-muted">Remember JLPT kanji &amp; vocabulary, N5 → N2</p>
        </div>

        <Panel className="space-y-4 p-5">
          {sent ? (
            <div className="space-y-2 text-center">
              <Mail className="mx-auto text-primary" size={36} />
              <p className="font-semibold">Check your email</p>
              <p className="text-sm text-muted">{sent}</p>
              <button className="text-sm text-primary underline" onClick={() => setSent(null)}>Back</button>
            </div>
          ) : (
            <>
              <Button className="w-full" size="lg" variant="secondary" onClick={google}>
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
                Continue with Google
              </Button>
              <div className="flex items-center gap-3 text-xs text-muted"><div className="h-px flex-1 bg-line" />or use email<div className="h-px flex-1 bg-line" /></div>

              <form onSubmit={submit} className="space-y-3">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input" autoComplete="email" inputMode="email" aria-label="Email" />
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password (8+ characters)"
                    className="input pr-11"
                    autoComplete="current-password"
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={busy}>{busy ? "Please wait…" : "Continue"}</Button>
                <p className="text-center text-xs text-muted">New here? Continue creates your account automatically.</p>
              </form>
              <div className="flex justify-between text-sm">
                <button type="button" onClick={forgot} disabled={busy} className="text-primary underline">Forgot password?</button>
                <button type="button" onClick={magicLink} disabled={busy} className="text-muted underline">Email me a link instead</button>
              </div>
            </>
          )}
          {error && <p role="alert" className="text-center text-sm text-bad">{error}</p>}
        </Panel>
      </div>
    </main>
  );
}
