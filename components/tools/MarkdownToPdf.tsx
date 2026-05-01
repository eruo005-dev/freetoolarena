"use client";

import { useMemo, useState } from "react";

const SAMPLE = `# Quarterly Report

A quick brain-dump turned into a printable PDF.

## Highlights

- **Revenue:** $1.4M (+12% QoQ)
- Customer base grew 18%
- Shipped 3 major features

## What worked

The new onboarding flow cut drop-off by 40%. Clear win.

## What didn't

Marketing spend on display ads underperformed. Reallocating to content.

## Action items

1. Hire two engineers
2. Launch enterprise tier in Q3
3. Audit the data pipeline

> "Slow is smooth, smooth is fast." — every Q4 ever.

\`\`\`
budget = revenue * 0.15
\`\`\`

[Visit our docs](https://example.com)
`;

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c] as string));
}

function md(text: string): string {
  const lines = text.split(/\r?\n/);
  const out: string[] = [];
  let inCode = false;
  let codeBuf: string[] = [];
  let inList = false;
  let inOl = false;

  const flushList = () => {
    if (inList) { out.push("</ul>"); inList = false; }
    if (inOl) { out.push("</ol>"); inOl = false; }
  };

  for (const raw of lines) {
    const line = raw;

    if (line.trim().startsWith("```")) {
      if (!inCode) { flushList(); inCode = true; codeBuf = []; }
      else { out.push(`<pre><code>${codeBuf.map(escapeHtml).join("\n")}</code></pre>`); inCode = false; }
      continue;
    }
    if (inCode) { codeBuf.push(line); continue; }

    if (/^#{1,6} /.test(line)) {
      flushList();
      const m = line.match(/^(#{1,6}) (.*)$/);
      if (m) { const level = m[1].length; out.push(`<h${level}>${inline(m[2])}</h${level}>`); continue; }
    }

    if (/^[*-] /.test(line)) {
      if (!inList) { flushList(); out.push("<ul>"); inList = true; }
      out.push(`<li>${inline(line.replace(/^[*-] /, ""))}</li>`);
      continue;
    }
    if (/^\d+\. /.test(line)) {
      if (!inOl) { flushList(); out.push("<ol>"); inOl = true; }
      out.push(`<li>${inline(line.replace(/^\d+\. /, ""))}</li>`);
      continue;
    }
    if (/^> /.test(line)) {
      flushList();
      out.push(`<blockquote>${inline(line.replace(/^> /, ""))}</blockquote>`);
      continue;
    }
    if (line.trim() === "") {
      flushList();
      out.push("");
      continue;
    }
    flushList();
    out.push(`<p>${inline(line)}</p>`);
  }

  flushList();
  if (inCode) out.push(`<pre><code>${codeBuf.map(escapeHtml).join("\n")}</code></pre>`);
  return out.join("\n");
}

function inline(s: string): string {
  s = escapeHtml(s);
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href=\"$2\">$1</a>");
  return s;
}

export function MarkdownToPdf() {
  const [text, setText] = useState<string>(SAMPLE);
  const html = useMemo(() => md(text), [text]);

  const handlePrint = () => window.print();

  return (
    <div className="space-y-5">
      <label className="block text-sm print:hidden">
        <span className="mb-1 block font-medium text-slate-700">Markdown source</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={12} className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-xs" />
      </label>

      <button onClick={handlePrint} className="rounded bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark print:hidden">Print / save as PDF</button>

      <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm print:border-0 print:shadow-none">
        <style>{`
          @media print { @page { margin: 0.75in; } body * { visibility: hidden; } .md-output, .md-output * { visibility: visible; } .md-output { position: absolute; left: 0; top: 0; padding: 0; } }
          .md-output h1 { font-size: 24pt; font-weight: 700; margin-top: 1.4em; margin-bottom: 0.5em; line-height: 1.2; }
          .md-output h2 { font-size: 18pt; font-weight: 700; margin-top: 1.3em; margin-bottom: 0.4em; line-height: 1.25; }
          .md-output h3 { font-size: 14pt; font-weight: 700; margin-top: 1.2em; margin-bottom: 0.3em; line-height: 1.3; }
          .md-output h4, .md-output h5, .md-output h6 { font-size: 12pt; font-weight: 700; margin-top: 1.1em; margin-bottom: 0.3em; }
          .md-output p { font-size: 11pt; line-height: 1.55; margin: 0.5em 0; }
          .md-output ul, .md-output ol { font-size: 11pt; line-height: 1.55; margin: 0.5em 0 0.5em 1.5em; }
          .md-output li { margin: 0.2em 0; }
          .md-output blockquote { border-left: 3px solid #94a3b8; padding-left: 1em; color: #475569; font-style: italic; margin: 0.7em 0; }
          .md-output code { background: #f1f5f9; padding: 1px 4px; border-radius: 3px; font-family: ui-monospace, monospace; font-size: 0.9em; }
          .md-output pre { background: #f1f5f9; padding: 0.8em 1em; border-radius: 6px; font-size: 0.85em; overflow-x: auto; margin: 0.7em 0; }
          .md-output pre code { background: none; padding: 0; }
          .md-output a { color: #1e40af; text-decoration: underline; }
        `}</style>
        <div className="md-output" dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 print:hidden">
        <strong>Print tip:</strong> Cmd/Ctrl+P, set destination to &ldquo;Save as PDF,&rdquo; uncheck headers + footers.
        Result is a clean US Letter / A4 PDF rendered from your markdown. Supports headings, lists, blockquotes, code blocks,
        bold, italic, inline code, and links.
      </div>
    </div>
  );
}
