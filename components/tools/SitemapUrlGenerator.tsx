"use client";

import { useState } from "react";

const CHANGEFREQS = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
] as const;

const PRIORITIES = [
  "0.0",
  "0.1",
  "0.2",
  "0.3",
  "0.4",
  "0.5",
  "0.6",
  "0.7",
  "0.8",
  "0.9",
  "1.0",
];

function today(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function SitemapUrlGenerator() {
  const [urls, setUrls] = useState(
    "https://example.com/\nhttps://example.com/about\nhttps://example.com/contact"
  );
  const [changefreq, setChangefreq] =
    useState<(typeof CHANGEFREQS)[number]>("weekly");
  const [priority, setPriority] = useState("0.5");
  const [lastmod, setLastmod] = useState(today());
  const [output, setOutput] = useState("");

  function generate() {
    const lines = urls
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    const body = lines
      .map(
        (u) =>
          `  <url>\n    <loc>${escapeXml(u)}</loc>\n    <lastmod>${escapeXml(
            lastmod
          )}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
      )
      .join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
    setOutput(xml);
  }

  function copy() {
    if (output) navigator.clipboard?.writeText(output);
  }

  function download() {
    if (!output) return;
    const blob = new Blob([output], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700 mb-1 block">
          URLs (one per line)
        </span>
        <textarea
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1 block">
            Change frequency
          </span>
          <select
            value={changefreq}
            onChange={(e) =>
              setChangefreq(e.target.value as (typeof CHANGEFREQS)[number])
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {CHANGEFREQS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1 block">
            Priority
          </span>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1 block">
            Last modified
          </span>
          <input
            type="date"
            value={lastmod}
            onChange={(e) => setLastmod(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={generate}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
        >
          Generate sitemap
        </button>
        <button
          type="button"
          onClick={download}
          disabled={!output}
          className="rounded-lg border border-slate-300 px-4 py-2 font-semibold hover:bg-slate-50 disabled:opacity-50"
        >
          Download sitemap.xml
        </button>
      </div>

      {output && (
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <p className="text-sm font-medium text-slate-700">Output</p>
            <button
              type="button"
              onClick={copy}
              className="text-xs font-semibold text-brand hover:text-brand-dark"
            >
              Copy
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            rows={12}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
