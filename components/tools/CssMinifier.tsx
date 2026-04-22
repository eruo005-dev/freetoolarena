"use client";

import { useMemo, useState } from "react";

function minifyCss(src: string): string {
  // Tokenize by quoted strings so we don't mangle their contents.
  // Split into parts: even indexes = outside strings, odd indexes = string literals (with quotes).
  const parts: string[] = [];
  let i = 0;
  let buf = "";
  while (i < src.length) {
    const ch = src[i];
    if (ch === '"' || ch === "'") {
      parts.push(buf);
      buf = "";
      const quote = ch;
      let s = ch;
      i++;
      while (i < src.length) {
        const c = src[i];
        s += c;
        i++;
        if (c === "\\" && i < src.length) {
          s += src[i];
          i++;
          continue;
        }
        if (c === quote) break;
      }
      parts.push(s);
      continue;
    }
    buf += ch;
    i++;
  }
  parts.push(buf);

  const out: string[] = [];
  for (let idx = 0; idx < parts.length; idx++) {
    if (idx % 2 === 1) {
      // string literal — preserve verbatim
      out.push(parts[idx]);
      continue;
    }
    let chunk = parts[idx];
    // Strip /* ... */ comments
    chunk = chunk.replace(/\/\*[\s\S]*?\*\//g, "");
    // Collapse whitespace to a single space
    chunk = chunk.replace(/\s+/g, " ");
    // Remove whitespace around delimiters
    chunk = chunk.replace(/\s*([{};:,])\s*/g, "$1");
    // Remove trailing semicolon before }
    chunk = chunk.replace(/;}/g, "}");
    out.push(chunk);
  }

  return out.join("").trim();
}

export function CssMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const origBytes = useMemo(() => new Blob([input]).size, [input]);
  const minBytes = useMemo(() => new Blob([output]).size, [output]);
  const saved = origBytes - minBytes;
  const pct = origBytes > 0 ? Math.round((saved / origBytes) * 100) : 0;

  function handleMinify() {
    setOutput(minifyCss(input));
    setCopied(false);
  }

  async function handleCopy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setCopied(false);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          CSS input
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          placeholder="/* paste your CSS here */&#10;body { margin: 0; padding: 20px; }"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleMinify}
          disabled={!input}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          Minify
        </button>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Clear
        </button>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Minified output
        </span>
        <textarea
          value={output}
          readOnly
          rows={8}
          placeholder="Minified CSS appears here…"
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
        />
      </label>

      {output && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-700">
            Original: <strong>{origBytes} B</strong> · Minified:{" "}
            <strong>{minBytes} B</strong> ·{" "}
            {saved > 0 ? (
              <span className="text-emerald-700 font-medium">
                Saved {saved} bytes ({pct}%)
              </span>
            ) : (
              <span className="text-slate-500">No gain — input may already be minified.</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
