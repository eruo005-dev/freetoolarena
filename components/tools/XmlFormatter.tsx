"use client";

import { useState } from "react";

function parseXml(src: string): { ok: true; doc: Document } | { ok: false; error: string } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(src, "application/xml");
  const err = doc.getElementsByTagName("parsererror")[0];
  if (err) {
    return { ok: false, error: err.textContent?.trim() || "Invalid XML" };
  }
  return { ok: true, doc };
}

function prettyXml(src: string, indent = "  "): string {
  // Normalize first: collapse whitespace between tags
  // Token-based pass: split on tags
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
      const text = next === -1 ? src.slice(i) : src.slice(i, next);
      if (text.trim().length > 0) tokens.push(text.trim());
      i = next === -1 ? src.length : next;
    }
  }

  let depth = 0;
  const out: string[] = [];

  for (let k = 0; k < tokens.length; k++) {
    const tok = tokens[k];
    if (tok.startsWith("<?") || tok.startsWith("<!--") || tok.startsWith("<![CDATA[") || tok.startsWith("<!DOCTYPE")) {
      out.push(indent.repeat(depth) + tok);
      continue;
    }
    if (tok.startsWith("<")) {
      const isClose = tok.startsWith("</");
      const isSelfClose = tok.endsWith("/>");
      if (isClose) {
        depth = Math.max(0, depth - 1);
        // Inline: if previous out line was opening this same tag with a text token right after, merge
        const prev = out[out.length - 1];
        const prev2 = out[out.length - 2];
        // If pattern is: <tag>\n  text\n</tag>  -> collapse to <tag>text</tag>
        if (
          prev !== undefined &&
          prev2 !== undefined &&
          !prev.trim().startsWith("<") &&
          prev2.trim().startsWith("<") &&
          !prev2.trim().startsWith("</") &&
          !prev2.trim().endsWith("/>")
        ) {
          const merged = prev2.trimEnd() + prev.trim() + tok;
          out.splice(out.length - 2, 2, merged);
        } else {
          out.push(indent.repeat(depth) + tok);
        }
      } else if (isSelfClose) {
        out.push(indent.repeat(depth) + tok);
      } else {
        out.push(indent.repeat(depth) + tok);
        depth++;
      }
    } else {
      // Text content
      out.push(indent.repeat(depth) + tok);
    }
  }

  return out.join("\n");
}

function minifyXml(src: string): string {
  // Remove whitespace between tags; preserve text content but trim
  return src
    .replace(/>\s+</g, "><")
    .replace(/^\s+|\s+$/g, "")
    .replace(/\s+/g, (m) => (m.includes("\n") ? " " : m));
}

const SAMPLE = `<?xml version="1.0"?><catalog><book id="1"><title>XML Guide</title><author>Ada</author></book><book id="2"><title>Design</title><author>Bob</author></book></catalog>`;

export function XmlFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function format() {
    setError(null);
    setCopied(false);
    const res = parseXml(input);
    if (!res.ok) {
      setError(res.error);
      setOutput("");
      return;
    }
    try {
      const serialized = new XMLSerializer().serializeToString(res.doc);
      setOutput(prettyXml(serialized, "  "));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to format XML.");
      setOutput("");
    }
  }

  function minify() {
    setError(null);
    setCopied(false);
    const res = parseXml(input);
    if (!res.ok) {
      setError(res.error);
      setOutput("");
      return;
    }
    try {
      const serialized = new XMLSerializer().serializeToString(res.doc);
      setOutput(minifyXml(serialized));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to minify XML.");
      setOutput("");
    }
  }

  function copy() {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function clear() {
    setInput("");
    setOutput("");
    setError(null);
    setCopied(false);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Input XML</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          spellCheck={false}
          placeholder="<root><item/></root>"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 font-mono text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 resize-y"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={format}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          Format
        </button>
        <button
          type="button"
          onClick={minify}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Minify
        </button>
        <button
          type="button"
          onClick={copy}
          disabled={!output}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          type="button"
          onClick={clear}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Clear
        </button>
      </div>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      {output && !error && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Output</p>
          <pre className="font-mono text-sm whitespace-pre-wrap break-all text-slate-900">{output}</pre>
        </div>
      )}
    </div>
  );
}
