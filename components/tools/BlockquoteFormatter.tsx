"use client";

import { useMemo, useState } from "react";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildMarkdown(text: string, attribution: string): string {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const quoted = lines.map((l) => `> ${l}`.trimEnd()).join("\n");
  const attr = attribution.trim() ? `\n> \n> — ${attribution.trim()}` : "";
  return `${quoted}${attr}`;
}

function buildHtml(text: string, attribution: string): string {
  const paragraphs = text
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n+/)
    .filter((p) => p.trim().length > 0)
    .map((p) => `  <p>${escapeHtml(p.replace(/\n/g, " "))}</p>`)
    .join("\n");
  const footer = attribution.trim()
    ? `\n  <footer>— ${escapeHtml(attribution.trim())}</footer>`
    : "";
  return `<blockquote>\n${paragraphs}${footer}\n</blockquote>`;
}

export function BlockquoteFormatter() {
  const [text, setText] = useState(
    "The only way to do great work is to love what you do.",
  );
  const [attribution, setAttribution] = useState("Steve Jobs");
  const [tab, setTab] = useState<"markdown" | "html">("markdown");

  const markdown = useMemo(() => buildMarkdown(text, attribution), [text, attribution]);
  const html = useMemo(() => buildHtml(text, attribution), [text, attribution]);

  const active = tab === "markdown" ? markdown : html;

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-sm font-semibold text-slate-700 mb-1 block">Quote</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="Enter the quote…"
          className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700 mb-1 block">Attribution</span>
        <input
          type="text"
          value={attribution}
          onChange={(e) => setAttribution(e.target.value)}
          placeholder="e.g. Albert Einstein"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>

      <div className="flex gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setTab("markdown")}
          className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px ${
            tab === "markdown"
              ? "border-brand text-brand"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Markdown
        </button>
        <button
          type="button"
          onClick={() => setTab("html")}
          className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px ${
            tab === "html"
              ? "border-brand text-brand"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          HTML
        </button>
      </div>

      <textarea
        readOnly
        value={active}
        rows={8}
        className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm bg-slate-50"
      />

      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(active)}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
      >
        Copy {tab === "markdown" ? "Markdown" : "HTML"}
      </button>
    </div>
  );
}
