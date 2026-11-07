"use client";

import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Panel } from "@/components/ui";
import { supabaseBrowser } from "@/lib/supabase/client";

/** Landing page for the password-reset email (reached through /auth/callback, so a session exists). */
export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return setError("Passwords don't match.");
    setBusy(true);
    setError(null);
    const { error } = await supabaseBrowser().auth.updateUser({ password });
    setBusy(false);
    if (error) return setError(error.message);
    router.replace("/");
    router.refresh();
  };

  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      <Panel className="w-full max-w-sm space-y-4 p-5">
        <div className="text-center">
          <KeyRound className="mx-auto text-primary" size={32} />
          <h1 className="mt-2 text-lg font-semibold">Set a new password</h1>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password (8+ characters)" className="input" autoComplete="new-password" />
          <input type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat new password" className="input" autoComplete="new-password" />
          <Button type="submit" className="w-full" disabled={busy}>{busy ? "Saving…" : "Save password"}</Button>
        </form>
        {error && <p className="text-center text-sm text-bad">{error}</p>}
      </Panel>
    </main>
  );
}
