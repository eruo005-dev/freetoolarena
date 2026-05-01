"use client";

import { useMemo, useState } from "react";

type Granularity = "word" | "line";

function tokenize(s: string, g: Granularity): string[] {
  if (g === "line") return s.split(/\r?\n/);
  return s.split(/(\s+)/);
}

// Standard LCS-based diff (good enough for documents up to ~5,000 tokens)
function diff(a: string[], b: string[]): Array<{ type: "same" | "add" | "del"; text: string }> {
  const n = a.length, m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out: Array<{ type: "same" | "add" | "del"; text: string }> = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { out.push({ type: "same", text: a[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ type: "del", text: a[i] }); i++; }
    else { out.push({ type: "add", text: b[j] }); j++; }
  }
  while (i < n) { out.push({ type: "del", text: a[i] }); i++; }
  while (j < m) { out.push({ type: "add", text: b[j] }); j++; }
  return out;
}

export function DocumentVersionDiff() {
  const [a, setA] = useState<string>("Hi team,\n\nWe will ship the v1 release on Tuesday.\nLet me know if you have concerns.\n\n— Jane");
  const [b, setB] = useState<string>("Hi team,\n\nWe will ship the v1.1 release on Wednesday.\nLet me know if you have concerns or blockers.\n\n— Jane");
  const [g, setG] = useState<Granularity>("word");

  const result = useMemo(() => {
    const at = tokenize(a, g);
    const bt = tokenize(b, g);
    return diff(at, bt);
  }, [a, b, g]);

  const stats = useMemo(() => {
    let added = 0, removed = 0, same = 0;
    for (const r of result) {
      if (r.text.trim() === "") continue;
      if (r.type === "add") added++;
      else if (r.type === "del") removed++;
      else same++;
    }
    return { added, removed, same };
  }, [result]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Original (A)</span>
          <textarea value={a} onChange={(e) => setA(e.target.value)} rows={10} className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-xs" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Revised (B)</span>
          <textarea value={b} onChange={(e) => setB(e.target.value)} rows={10} className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-xs" />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Compare by:</label>
        <select value={g} onChange={(e) => setG(e.target.value as Granularity)} className="rounded border border-slate-300 px-3 py-1 text-sm">
          <option value="word">Word-level</option>
          <option value="line">Line-level</option>
        </select>
        <span className="ml-auto text-sm">
          <span className="text-emerald-700">+{stats.added}</span>{" "}
          <span className="text-rose-700">−{stats.removed}</span>{" "}
          <span className="text-slate-500">≈{stats.same}</span>
        </span>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-700">Diff</h4>
        <div className="font-mono text-sm leading-relaxed text-slate-700" style={{ whiteSpace: g === "line" ? "pre-wrap" : "normal" }}>
          {result.map((r, i) => {
            if (r.type === "same") return <span key={i}>{r.text}</span>;
            if (r.type === "add") return <span key={i} className="bg-emerald-100 text-emerald-900 underline decoration-emerald-400">{r.text}</span>;
            return <span key={i} className="bg-rose-100 text-rose-900 line-through decoration-rose-400">{r.text}</span>;
          })}
        </div>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Algorithm:</strong> standard LCS (longest common subsequence). Works well for documents up to ~5,000
        tokens. For source code or larger documents, dedicated tools (Git, VS Code diff, Beyond Compare) handle them more
        efficiently. All processing in your browser — nothing uploaded.
      </div>
    </div>
  );
}
