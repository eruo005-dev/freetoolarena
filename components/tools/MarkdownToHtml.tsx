"use client";

import { useMemo, useState } from "react";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function mdToHtml(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let inCode = false;
  let inList = false;
  for (let raw of lines) {
    if (raw.startsWith("```")) {
      if (inCode) { out.push("</code></pre>"); inCode = false; }
      else { out.push('<pre><code>'); inCode = true; }
      continue;
    }
    if (inCode) { out.push(escapeHtml(raw)); continue; }
    const line = raw;
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      if (inList) { out.push("</ul>"); inList = false; }
      out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`);
      continue;
    }
    if (/^-\s+/.test(line)) {
      if (!inList) { out.push("<ul>"); inList = true; }
      out.push(`<li>${inline(line.replace(/^-\s+/, ""))}</li>`);
      continue;
    }
    if (inList) { out.push("</ul>"); inList = false; }
    if (line.trim() === "") { out.push(""); continue; }
    out.push(`<p>${inline(line)}</p>`);
  }
  if (inCode) out.push("</code></pre>");
  if (inList) out.push("</ul>");
  return out.join("\n");
}

function inline(s: string): string {
  return escapeHtml(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

export function MarkdownToHtml() {
  const [md, setMd] = useState(
    "# Hello\n\nThis is **markdown**.\n\n- Item one\n- Item two\n\n[Link](https://example.com)"
  );
  const html = useMemo(() => mdToHtml(md), [md]);

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Markdown</span>
        <textarea
          value={md}
          onChange={(e) => setMd(e.target.value)}
          rows={8}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">HTML</span>
        <textarea
          readOnly
          value={html}
          rows={8}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm"
        />
      </label>
      <button type="button" onClick={() => navigator.clipboard.writeText(html)}
        className="rounded-lg bg-brand-dark text-white px-4 py-2 text-sm font-semibold hover:bg-brand">
        Copy HTML
      </button>
    </div>
  );
}
