"use client";

import { useMemo, useState } from "react";

const PRESETS: Array<{ name: string; pattern: string; flags: string }> = [
  { name: "Email", pattern: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}", flags: "g" },
  { name: "URL", pattern: "https?:\\/\\/[\\w.-]+(?:\\/[\\w\\-._~:/?#[\\]@!$&'()*+,;=]*)?", flags: "g" },
  { name: "IPv4", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", flags: "g" },
  { name: "UUID", pattern: "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", flags: "gi" },
  { name: "Hex color", pattern: "#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?\\b", flags: "g" },
  { name: "Phone (US)", pattern: "\\+?1?[-.\\s]?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}", flags: "g" },
  { name: "Digits", pattern: "\\d+", flags: "g" },
  { name: "Whitespace", pattern: "\\s+", flags: "g" },
];

export function RegexBuilder() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("gi");
  const [text, setText] = useState("Email me at ada@example.com or grace@example.org — thanks!\nBroken: not@mail");
  const [replace, setReplace] = useState("");
  const [copied, setCopied] = useState(false);

  const { matches, highlighted, err } = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      const ms: Array<{ index: number; length: number; match: string; groups: any }> = [];
      let m: RegExpExecArray | null;
      const global = flags.includes("g");
      if (global) {
        while ((m = re.exec(text)) !== null) {
          ms.push({ index: m.index, length: m[0].length, match: m[0], groups: m.slice(1) });
          if (m.index === re.lastIndex) re.lastIndex++;
        }
      } else {
        const r = text.match(re);
        if (r) ms.push({ index: text.indexOf(r[0]), length: r[0].length, match: r[0], groups: r.slice(1) });
      }
      let h = "";
      let i = 0;
      for (const match of ms) {
        h += text.slice(i, match.index).replace(/</g, "&lt;");
        h += `<mark class="bg-yellow-200 rounded px-0.5">${match.match.replace(/</g, "&lt;") || "​"}</mark>`;
        i = match.index + match.length;
      }
      h += text.slice(i).replace(/</g, "&lt;");
      return { matches: ms, highlighted: h, err: "" };
    } catch (e: any) {
      return { matches: [], highlighted: "", err: e.message };
    }
  }, [pattern, flags, text]);

  const replaced = useMemo(() => {
    try { return text.replace(new RegExp(pattern, flags), replace); }
    catch { return ""; }
  }, [pattern, flags, text, replace]);

  function copyPattern() {
    navigator.clipboard?.writeText(`/${pattern}/${flags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button key={p.name} onClick={() => { setPattern(p.pattern); setFlags(p.flags); }} className="text-xs px-3 py-1 rounded-full border bg-white text-slate-700 border-slate-300 hover:bg-slate-50">
            {p.name}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="flex items-center rounded-lg border border-slate-300 px-2 font-mono text-sm w-full">
          <span className="text-slate-400">/</span>
          <input value={pattern} onChange={(e) => setPattern(e.target.value)} className="flex-1 px-1 py-2 focus:outline-none font-mono text-sm" />
          <span className="text-slate-400">/</span>
          <input value={flags} onChange={(e) => setFlags(e.target.value)} className="w-16 px-1 py-2 focus:outline-none font-mono text-sm" placeholder="gimsu" />
        </div>
        <button onClick={copyPattern} className="bg-slate-900 text-white font-semibold rounded-lg px-3 py-2 text-xs hover:bg-slate-800">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {err && <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm p-3">{err}</div>}

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Test string</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs" />
      </label>

      <div className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: highlighted || "<span class='text-slate-400'>No matches yet</span>" }} />
      <div className="text-xs text-slate-500">{matches.length} match{matches.length === 1 ? "" : "es"}</div>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Replacement (use $1, $2 for groups)</span>
        <input value={replace} onChange={(e) => setReplace(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm" />
      </label>
      <pre className="rounded-xl bg-slate-900 text-slate-100 p-4 text-xs font-mono whitespace-pre-wrap">{replaced || "(empty)"}</pre>
    </div>
  );
}
