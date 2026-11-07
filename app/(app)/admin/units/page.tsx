"use client";

import { Upload } from "lucide-react";
import Papa from "papaparse";
import { useMemo, useState } from "react";
import { useLibrary } from "@/components/LibraryProvider";
import { Button, Empty, Panel, Spinner } from "@/components/ui";
import { supabaseBrowser } from "@/lib/supabase/client";

interface Row {
  level: number;
  track: "goi" | "kanji";
  week: number;
  day: number;
  term: string;
  reading: string;
  meaning_en: string;
  meaning_my: string;
}

const COLUMNS = "level,track,week,day,term,reading,meaning_en,meaning_my";

/**
 * Admin-only: import a Soumatome word list (CSV) as course days.
 * Each level+track in the file replaces that level's existing days.
 */
export default function AdminUnitsPage() {
  const { profile, loading, reload } = useLibrary();
  const [rows, setRows] = useState<Row[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const summary = useMemo(() => {
    const m = new Map<string, { days: Set<string>; words: number }>();
    for (const r of rows) {
      const k = `N${r.level} ${r.track}`;
      const v = m.get(k) ?? { days: new Set(), words: 0 };
      v.days.add(`${r.week}-${r.day}`);
      v.words++;
      m.set(k, v);
    }
    return [...m.entries()];
  }, [rows]);

  if (loading) return <Spinner />;
  if (!profile?.is_admin) {
    return <Empty title="Admins only">Ask the app owner to enable admin access for your account.</Empty>;
  }

  const onFile = (file: File) => {
    setStatus(null);
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim().toLowerCase(),
      complete: ({ data }) => {
        const errs: string[] = [];
        const out: Row[] = [];
        data.forEach((r, i) => {
          const row: Row = {
            level: Number(String(r.level ?? "").replace(/^n/i, "")),
            track: (r.track ?? "").trim().toLowerCase() as Row["track"],
            week: Number(r.week),
            day: Number(r.day),
            term: (r.term ?? "").trim(),
            reading: (r.reading ?? "").trim(),
            meaning_en: (r.meaning_en ?? "").trim(),
            meaning_my: (r.meaning_my ?? "").trim(),
          };
          const bad =
            !(row.level >= 1 && row.level <= 5) ||
            !["goi", "kanji"].includes(row.track) ||
            !(row.week >= 1 && row.week <= 99) ||
            !(row.day >= 1 && row.day <= 7) ||
            !row.term;
          if (bad) errs.push(`Row ${i + 2}: check level / track / week / day / term`);
          else out.push(row);
        });
        setRows(out);
        setErrors(errs.slice(0, 20));
      },
    });
  };

  const importNow = async () => {
    setBusy(true);
    setStatus(null);
    const { data, error } = await supabaseBrowser().rpc("import_soumatome", { p_rows: rows });
    setBusy(false);
    if (error) return setStatus(`Import failed: ${error.message}`);
    setStatus(`Imported ${data} words into ${summary.reduce((n, [, v]) => n + v.days.size, 0)} days.`);
    setRows([]);
    reload();
  };

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Import Soumatome units</h1>
      <Panel className="space-y-3 p-5 text-sm">
        <p>Upload a CSV with these columns (one row per word, in book order):</p>
        <code className="block overflow-x-auto rounded-lg bg-surface-2 p-3 font-mono text-xs">
          {COLUMNS}
          <br />3,goi,1,3,会議,かいぎ,meeting;conference,အစည်းအဝေး
        </code>
        <ul className="list-disc space-y-1 pl-5 text-muted">
          <li><b>track</b>: <code>goi</code> or <code>kanji</code>. For kanji leave <code>reading</code> empty.</li>
          <li>Each level + track in the file <b>replaces</b> that level&apos;s current days.</li>
          <li>Words not in the library yet are added. <code>meaning_my</code> (Burmese) is saved on the card.</li>
          <li>Separate several English meanings with <code>;</code>.</li>
        </ul>
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-line p-6 hover:bg-surface-2">
          <Upload size={18} /> Choose CSV file
          <input type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        </label>
      </Panel>

      {errors.length > 0 && (
        <Panel className="space-y-1 p-4 text-sm text-bad">
          {errors.map((e) => <p key={e}>{e}</p>)}
        </Panel>
      )}

      {summary.length > 0 && (
        <Panel className="space-y-3 p-5">
          <h2 className="font-semibold">Ready to import {rows.length} words</h2>
          <ul className="text-sm">
            {summary.map(([k, v]) => (
              <li key={k}>{k}: {v.words} words in {v.days.size} days</li>
            ))}
          </ul>
          <Button className="w-full" disabled={busy || errors.length > 0} onClick={importNow}>
            {busy ? "Importing…" : "Import and replace these levels"}
          </Button>
        </Panel>
      )}

      {status && <p className="text-sm font-medium">{status}</p>}
    </div>
  );
}
