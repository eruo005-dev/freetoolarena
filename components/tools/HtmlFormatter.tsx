"use client";

import { useState } from "react";

const SAMPLE = `<!DOCTYPE html><html><head><title>Demo</title></head><body><main><h1>Hello</h1><p>World <strong>now</strong></p><img src="x.png"/></main></body></html>`;

const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

function beautifyHtml(src: string): string {
  const tokens: string[] = [];
  let i = 0;
  while (i < src.length) {
    if (src[i] === "<") {
      const end = src.indexOf(">", i);
      if (end === -1) {
        tokens.push(src.slice(i));
        break;
      }
      tokens.push(src.slice(i, end + 1));
      i = end + 1;
    } else {
      const next = src.indexOf("<", i);
      const text = (next === -1 ? src.slice(i) : src.slice(i, next)).replace(/\s+/g, " ").trim();
      if (text) tokens.push(text);
      if (next === -1) break;
      i = next;
    }
  }

  const lines: string[] = [];
  let depth = 0;
  const pad = () => "  ".repeat(Math.max(depth, 0));

  for (const tok of tokens) {
    if (tok.startsWith("<!")) {
      lines.push(pad() + tok);
      continue;
    }
    if (tok.startsWith("<")) {
      const isClose = tok.startsWith("</");
      const nameMatch = tok.match(/^<\/?\s*([a-zA-Z0-9-]+)/);
      const name = nameMatch ? nameMatch[1].toLowerCase() : "";
      const selfClose = tok.endsWith("/>") || VOID_TAGS.has(name);
      if (isClose) {
        depth = Math.max(depth - 1, 0);
        lines.push(pad() + tok);
      } else {
        lines.push(pad() + tok);
        if (!selfClose) depth += 1;
      }
    } else {
      lines.push(pad() + tok);
    }
  }
  return lines.join("\n");
}

function minifyHtml(src: string): string {
  return src.replace(/>\s+</g, "><").replace(/\s+/g, " ").trim();
}

export function HtmlFormatter({ initial = SAMPLE }: { initial?: string } = {}) {
  const [input, setInput] = useState(initial);
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");
  const [output, setOutput] = useState("");
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);

  function run() {
    try {
      const out = mode === "beautify" ? beautifyHtml(input) : minifyHtml(input);
      setOutput(out);
      setErr("");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to process HTML");
      setOutput("");
    }
  }

  function copy() {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function download() {
    if (!output) return;
    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const btn = (active: boolean) =>
    `rounded-md border px-3 py-2 text-sm font-semibold ${
      active
        ? "bg-brand text-white border-brand"
        : "bg-white text-slate-700 border-slate-300 hover:border-brand"
    }`;

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          HTML Input
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
        <button type="button" onClick={() => setMode("beautify")} className={btn(mode === "beautify")}>
          Beautify
        </button>
        <button type="button" onClick={() => setMode("minify")} className={btn(mode === "minify")}>
          Minify
        </button>
        <button
          type="button"
          onClick={run}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          Run
        </button>
      </div>

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {output && (
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 block">
              Output
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={copy}
                className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                type="button"
                onClick={download}
                className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
              >
                Download .html
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={output}
            rows={10}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </div>
      )}
    </div>
  );
}
