"use client";

import { useMemo, useState } from "react";

type Style = "dash" | "asterisk" | "bullet" | "none";

const BULLET_RE = /^[\s]*(?:[-*•●◦▪▫■□◆→⇒»·]|\d+[.)]|[a-zA-Z][.)])\s*/;

export function BulletListCleaner() {
  const [input, setInput] = useState(`• First item
- Second item
* Third item
1. Fourth item
a) Fifth item
→ Sixth item`);
  const [strip, setStrip] = useState(false);
  const [style, setStyle] = useState<Style>("dash");
  const [removeNumbering, setRemoveNumbering] = useState(true);
  const [trim, setTrim] = useState(true);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const lines = input.split("\n");
    const cleaned = lines.map((line) => {
      let l = line;
      if (trim) l = l.trimEnd();
      const hasContent = l.trim().length > 0;
      if (!hasContent) return "";

      let stripped = l.replace(BULLET_RE, "");
      if (!removeNumbering) {
        // re-add numbering if original had it and user doesn't want removed
        const m = l.match(/^\s*(\d+[.)]|[a-zA-Z][.)])\s*/);
        if (m) stripped = m[0].trim() + " " + stripped.trim();
      }
      if (trim) stripped = stripped.trim();

      if (strip) return stripped;

      const marker = style === "dash" ? "- " : style === "asterisk" ? "* " : style === "bullet" ? "• " : "";
      return marker + stripped;
    });
    return cleaned.join("\n");
  }, [input, strip, style, removeNumbering, trim]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Input</span>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={strip} onChange={(e) => setStrip(e.target.checked)} className="h-4 w-4 accent-brand" />
          <span className="text-sm text-slate-700">Strip all bullet markers</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={removeNumbering} onChange={(e) => setRemoveNumbering(e.target.checked)} className="h-4 w-4 accent-brand" />
          <span className="text-sm text-slate-700">Remove numbering (1., a))</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} className="h-4 w-4 accent-brand" />
          <span className="text-sm text-slate-700">Trim whitespace</span>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Standardize to</span>
          <select value={style} disabled={strip} onChange={(e) => setStyle(e.target.value as Style)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand disabled:opacity-50">
            <option value="dash">- (dash)</option>
            <option value="asterisk">* (asterisk)</option>
            <option value="bullet">• (bullet)</option>
            <option value="none">(none)</option>
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-slate-700">Output</div>
        <button type="button" onClick={copy}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">{output}</pre>
    </div>
  );
}
