import Image from "next/image";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function SetupPage() {
  if (isSupabaseConfigured) redirect("/");
  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <Image src="/logo-mark.png" alt="" width={72} height={72} className="rounded-2xl" />
      <h1 className="text-2xl font-bold">Connect Memori to Supabase</h1>
      <ol className="list-decimal space-y-3 pl-5 text-ink/90">
        <li>Create a free project at <a className="text-primary underline" href="https://supabase.com/dashboard">supabase.com</a>.</li>
        <li>In <b>SQL Editor</b>, run <code>supabase/migrations/0001_init.sql</code>, then <code>supabase/seed.sql</code> (N5/N4 cards).</li>
        <li>
          In <b>Authentication → URL Configuration</b>, add <code>http://localhost:3000/auth/callback</code> (and your deployed URL) to the redirect URLs.
          Optionally enable the <b>Google</b> provider.
        </li>
        <li>Copy <code>.env.example</code> to <code>.env.local</code> and fill in the project URL and anon key from <b>Project Settings → API</b>.</li>
        <li>Restart <code>npm run dev</code>.</li>
      </ol>
    </main>
  );
}
