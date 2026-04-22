"use client";

import { useMemo, useState } from "react";

const SAMPLE = "Hello\u200B world\u00A0— this\u200C text\uFEFF contains\u200D hidden\u2028characters\u2029that\u00ADmay\u200Bbreak things.";

type Entry = { code: string; name: string; re: RegExp };

const ENTRIES: Entry[] = [
  { code: "U+200B", name: "Zero-width space", re: /\u200B/g },
  { code: "U+200C", name: "Zero-width non-joiner", re: /\u200C/g },
  { code: "U+200D", name: "Zero-width joiner", re: /\u200D/g },
  { code: "U+FEFF", name: "BOM / ZWNBSP", re: /\uFEFF/g },
  { code: "U+00A0", name: "Non-breaking space", re: /\u00A0/g },
  { code: "U+2028", name: "Line separator", re: /\u2028/g },
  { code: "U+2029", name: "Paragraph separator", re: /\u2029/g },
  { code: "U+00AD", name: "Soft hyphen", re: /\u00AD/g },
  { code: "U+180E", name: "Mongolian vowel separator", re: /\u180E/g },
  { code: "U+2060", name: "Word joiner", re: /\u2060/g },
  { code: "U+202A-E", name: "Bidi formatting", re: /[\u202A-\u202E]/g },
];

const ALL_INVISIBLE = /[\u200B\u200C\u200D\uFEFF\u00A0\u2028\u2029\u00AD\u180E\u2060\u202A-\u202E]/g;

export function InvisibleCharacterDetector({ initial = SAMPLE }: { initial?: string } = {}) {
  const [input, setInput] = useState(initial);
  const [copied, setCopied] = useState(false);

  const counts = useMemo(() => {
    return ENTRIES.map((e) => ({
      ...e,
      count: (input.match(e.re) || []).length,
    }));
  }, [input]);

  const total = counts.reduce((a, c) => a + c.count, 0);

  const cleaned = useMemo(() => input.replace(ALL_INVISIBLE, ""), [input]);

  const highlighted = useMemo(() => {
    const parts: Array<{ type: "text" | "hit"; value: string; label?: string }> = [];
    let buf = "";
    for (const ch of input) {
      const hit = ENTRIES.find((e) => {
        e.re.lastIndex = 0;
        return e.re.test(ch);
      });
      if (hit) {
        if (buf) {
          parts.push({ type: "text", value: buf });
          buf = "";
        }
        parts.push({ type: "hit", value: ch, label: hit.code });
      } else {
        buf += ch;
      }
    }
    if (buf) parts.push({ type: "text", value: buf });
    return parts;
  }, [input]);

  function copyCleaned() {
    navigator.clipboard?.writeText(cleaned);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function applyClean() {
    setInput(cleaned);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Input Text
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Total chars</p>
          <p className="text-2xl font-bold text-slate-900">{input.length}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Invisible found</p>
          <p className="text-2xl font-bold text-slate-900">{total}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Types detected</p>
          <p className="text-2xl font-bold text-slate-900">
            {counts.filter((c) => c.count > 0).length}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2 block">
          Breakdown
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {counts.map((c) => (
            <div
              key={c.code}
              className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm ${
                c.count > 0 ? "border-rose-200 bg-rose-50" : "border-slate-200 bg-white"
              }`}
            >
              <span className="text-slate-700">
                <span className="font-mono text-xs text-slate-500">{c.code}</span> {c.name}
              </span>
              <span className={`font-semibold ${c.count > 0 ? "text-rose-700" : "text-slate-400"}`}>
                {c.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2 block">
          Highlighted Text
        </span>
        <div className="font-mono text-sm whitespace-pre-wrap break-words leading-relaxed">
          {highlighted.map((p, i) =>
            p.type === "text" ? (
              <span key={i}>{p.value}</span>
            ) : (
              <span
                key={i}
                title={p.label}
                className="inline-block bg-rose-200 text-rose-900 px-1 rounded font-bold"
              >
                {p.label}
              </span>
            ),
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={applyClean}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
          disabled={total === 0}
        >
          Remove all invisible
        </button>
        <button
          type="button"
          onClick={copyCleaned}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          {copied ? "Copied!" : "Copy cleaned text"}
        </button>
      </div>
    </div>
  );
}
