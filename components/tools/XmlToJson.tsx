"use client";

import { useState } from "react";

type Props = {
  initialXml?: string;
};

const SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <book id="1" lang="en">
    <title>XML Guide</title>
    <author>Ada</author>
  </book>
  <book id="2" lang="en">
    <title>Design Systems</title>
    <author>Bob</author>
  </book>
</catalog>`;

function elementToJson(el: Element): any {
  const obj: any = {};

  if (el.attributes && el.attributes.length > 0) {
    const attrs: Record<string, string> = {};
    for (let i = 0; i < el.attributes.length; i++) {
      const a = el.attributes[i];
      attrs[a.name] = a.value;
    }
    obj["@attributes"] = attrs;
  }

  const children = Array.from(el.childNodes);
  const elementChildren = children.filter(
    (n): n is Element => n.nodeType === 1,
  );
  const textNodes = children
    .filter((n) => n.nodeType === 3)
    .map((n) => (n.textContent ?? "").trim())
    .filter((t) => t.length > 0);

  if (elementChildren.length === 0) {
    const text = textNodes.join(" ");
    if (obj["@attributes"]) {
      if (text) obj["#text"] = text;
      return obj;
    }
    return text;
  }

  if (textNodes.length > 0) {
    obj["#text"] = textNodes.join(" ");
  }

  const buckets: Record<string, any[]> = {};
  for (const child of elementChildren) {
    if (!buckets[child.nodeName]) buckets[child.nodeName] = [];
    buckets[child.nodeName].push(elementToJson(child));
  }
  for (const [k, v] of Object.entries(buckets)) {
    obj[k] = v.length === 1 ? v[0] : v;
  }

  return obj;
}

export function XmlToJson({ initialXml = SAMPLE }: Props = {}) {
  const [input, setInput] = useState(initialXml);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function convert() {
    setError(null);
    setCopied(false);
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "application/xml");
      const err = doc.getElementsByTagName("parsererror")[0];
      if (err) {
        throw new Error(err.textContent?.trim() || "Invalid XML");
      }
      const root = doc.documentElement;
      if (!root) throw new Error("No root element found.");
      const json = { [root.nodeName]: elementToJson(root) };
      setOutput(JSON.stringify(json, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed.");
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
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          Input XML
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          spellCheck={false}
          placeholder="<root><item/></root>"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={convert}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          Convert to JSON
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
          onClick={download}
          disabled={!output}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Download .json
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
