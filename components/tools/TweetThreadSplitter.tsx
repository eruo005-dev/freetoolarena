"use client";

import { useMemo, useState } from "react";

function split(text: string, limit: number, numbered: boolean): string[] {
  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const chunks: string[] = [];
  let buf = "";

  const flush = () => { if (buf.trim()) { chunks.push(buf.trim()); buf = ""; } };

  for (const p of paragraphs) {
    const words = p.split(/\s+/);
    for (const w of words) {
      const next = buf ? buf + " " + w : w;
      const reserve = numbered ? 8 : 0;
      if (next.length + reserve > limit) {
        flush();
        buf = w;
      } else {
        buf = next;
      }
    }
    if (buf && buf.length + 2 <= limit) buf += "\n\n";
    else { flush(); }
  }
  flush();

  if (numbered) {
    const total = chunks.length;
    return chunks.map((c, i) => {
      const tag = `${i + 1}/${total} `;
      return (tag + c).slice(0, limit);
    });
  }
  return chunks;
}

export function TweetThreadSplitter() {
  const [text, setText] = useState(
    "Paste your long post or essay here. The splitter will break it into tweet-sized chunks without slicing mid-word, and optionally prefix each tweet with 1/N numbering.\n\nLeave a blank line between paragraphs to preserve structure.",
  );
  const [limit, setLimit] = useState(280);
  const [numbered, setNumbered] = useState(true);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const chunks = useMemo(() => split(text, limit, numbered), [text, limit, numbered]);

  function copyAll() {
    navigator.clipboard?.writeText(chunks.join("\n\n---\n\n"));
  }

  function copyOne(i: number) {
    navigator.clipboard?.writeText(chunks[i]);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1200);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Long post</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </label>

      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2 text-sm">
          Limit
          <select value={limit} onChange={(e) => setLimit(parseInt(e.target.value))} className="rounded-lg border border-slate-300 px-2 py-1">
            <option value={240}>240 (safe)</option>
            <option value={280}>280 (X / Twitter)</option>
            <option value={300}>300 (Threads)</option>
            <option value={500}>500 (Bluesky)</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={numbered} onChange={(e) => setNumbered(e.target.checked)} className="accent-brand" />
          Prefix with 1/N
        </label>
        <button onClick={copyAll} className="ml-auto bg-slate-900 text-white text-xs font-semibold rounded-lg px-3 py-2 hover:bg-slate-800">Copy all</button>
      </div>

      <div className="space-y-3">
        {chunks.map((c, i) => (
          <div key={i} className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Tweet {i + 1} / {chunks.length} — {c.length} chars</span>
              <button onClick={() => copyOne(i)} className="text-xs bg-brand text-white rounded-lg px-3 py-1 hover:bg-brand-dark">
                {copiedIdx === i ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="text-sm whitespace-pre-wrap">{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
