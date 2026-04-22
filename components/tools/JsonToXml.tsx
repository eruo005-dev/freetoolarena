"use client";

import { useState } from "react";

type Props = {
  initialJson?: string;
};

const SAMPLE = `{
  "catalog": {
    "book": [
      { "@attributes": { "id": "1" }, "title": "XML Guide", "author": "Ada" },
      { "@attributes": { "id": "2" }, "title": "Design Systems", "author": "Bob" }
    ]
  }
}`;

function sanitizeTag(name: string): string {
  let out = name.replace(/[^A-Za-z0-9_\-.]/g, "_");
  if (!/^[A-Za-z_]/.test(out)) out = "_" + out;
  return out;
}

function escapeXmlText(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function renderNode(tag: string, value: any, indent: number): string {
  const pad = "  ".repeat(indent);
  const safeTag = sanitizeTag(tag);

  if (value === null || value === undefined) {
    return `${pad}<${safeTag}/>\n`;
  }

  if (Array.isArray(value)) {
    return value.map((v) => renderNode(tag, v, indent)).join("");
  }

  if (typeof value === "object") {
    const attrs = value["@attributes"] || {};
    const attrStr = Object.entries(attrs)
      .map(([k, v]) => ` ${sanitizeTag(k)}="${escapeAttr(String(v))}"`)
      .join("");

    const children = Object.entries(value).filter(
      ([k]) => k !== "@attributes" && k !== "#text",
    );
    const textContent = value["#text"];

    if (children.length === 0 && (textContent === undefined || textContent === null || textContent === "")) {
      return `${pad}<${safeTag}${attrStr}/>\n`;
    }

    if (children.length === 0 && textContent !== undefined) {
      return `${pad}<${safeTag}${attrStr}>${escapeXmlText(String(textContent))}</${safeTag}>\n`;
    }

    let inner = "";
    if (textContent !== undefined && textContent !== null && textContent !== "") {
      inner += `${"  ".repeat(indent + 1)}${escapeXmlText(String(textContent))}\n`;
    }
    for (const [k, v] of children) {
      inner += renderNode(k, v, indent + 1);
    }
    return `${pad}<${safeTag}${attrStr}>\n${inner}${pad}</${safeTag}>\n`;
  }

  return `${pad}<${safeTag}>${escapeXmlText(String(value))}</${safeTag}>\n`;
}

export function JsonToXml({ initialJson = SAMPLE }: Props = {}) {
  const [input, setInput] = useState(initialJson);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function convert() {
    setError(null);
    setCopied(false);
    try {
      const parsed = JSON.parse(input);
      const header = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      let body = "";
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const keys = Object.keys(parsed);
        if (keys.length === 1) {
          body = renderNode(keys[0], parsed[keys[0]], 0);
        } else {
          body = renderNode("root", parsed, 0);
        }
      } else {
        body = renderNode("root", parsed, 0);
      }
      setOutput(header + body.trimEnd());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
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
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Input JSON
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          spellCheck={false}
          placeholder='{"root":{"item":"value"}}'
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={convert}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          Convert to XML
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
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono whitespace-pre-wrap">
          {output}
        </pre>
      )}
    </div>
  );
}
