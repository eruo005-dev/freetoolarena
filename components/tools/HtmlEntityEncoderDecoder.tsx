"use client";

import { useState, useMemo } from "react";

type Props = {
  initialText?: string;
};

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00A0",
  copy: "\u00A9",
  reg: "\u00AE",
  trade: "\u2122",
  hellip: "\u2026",
  mdash: "\u2014",
  ndash: "\u2013",
  lsquo: "\u2018",
  rsquo: "\u2019",
  ldquo: "\u201C",
  rdquo: "\u201D",
  laquo: "\u00AB",
  raquo: "\u00BB",
  cent: "\u00A2",
  pound: "\u00A3",
  euro: "\u20AC",
  yen: "\u00A5",
  deg: "\u00B0",
  times: "\u00D7",
  divide: "\u00F7",
  plusmn: "\u00B1",
};

function encode(s: string): string {
  let out = "";
  for (const ch of s) {
    const code = ch.codePointAt(0) ?? 0;
    if (ch === "&") out += "&amp;";
    else if (ch === "<") out += "&lt;";
    else if (ch === ">") out += "&gt;";
    else if (ch === '"') out += "&quot;";
    else if (ch === "'") out += "&#39;";
    else if (code > 127) out += `&#${code};`;
    else out += ch;
  }
  return out;
}

function decode(s: string): string {
  return s.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g, (m, body) => {
    if (body.startsWith("#x") || body.startsWith("#X")) {
      const code = parseInt(body.slice(2), 16);
      if (isNaN(code)) return m;
      try {
        return String.fromCodePoint(code);
      } catch {
        return m;
      }
    }
    if (body.startsWith("#")) {
      const code = parseInt(body.slice(1), 10);
      if (isNaN(code)) return m;
      try {
        return String.fromCodePoint(code);
      } catch {
        return m;
      }
    }
    const named = NAMED_ENTITIES[body];
    return named !== undefined ? named : m;
  });
}

export function HtmlEntityEncoderDecoder({
  initialText = `<p>Jay's "toolbox" & café ☕</p>`,
}: Props = {}) {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState(initialText);
  const [copied, setCopied] = useState(false);

  const output = useMemo(
    () => (mode === "encode" ? encode(input) : decode(input)),
    [mode, input],
  );

  function copy() {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function swap() {
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    setInput(output);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("encode")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
            mode === "encode"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Encode
        </button>
        <button
          type="button"
          onClick={() => setMode("decode")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
            mode === "decode"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Decode
        </button>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          {mode === "encode" ? "Input text" : "Input HTML entities"}
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copy}
          disabled={!output}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          type="button"
          onClick={swap}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Swap (use output as input)
        </button>
        <button
          type="button"
          onClick={() => setInput("")}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Clear
        </button>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Output
        </span>
        <textarea
          value={output}
          readOnly
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
    </div>
  );
}
