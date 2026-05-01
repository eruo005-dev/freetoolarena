"use client";

import { useMemo, useState } from "react";

interface Section {
  heading: string;
  level: number;
  words: number;
  chars: number;
  paragraphs: number;
}

function analyze(text: string): { total: { words: number; chars: number; paragraphs: number; sentences: number; readingMin: number }; sections: Section[] } {
  const lines = text.split(/\r?\n/);
  let total = { words: 0, chars: 0, paragraphs: 0, sentences: 0, readingMin: 0 };
  const sections: Section[] = [];
  let current: Section | null = null;

  const wc = (s: string) => s.trim() ? s.trim().split(/\s+/).length : 0;
  const cc = (s: string) => s.length;

  for (const line of lines) {
    total.chars += cc(line);
    total.words += wc(line);

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      if (current) sections.push(current);
      current = { heading: headingMatch[2].trim(), level: headingMatch[1].length, words: 0, chars: 0, paragraphs: 0 };
      continue;
    }
    if (line.trim() === "") {
      // paragraph delimiter
    } else {
      total.paragraphs++;
      const sentMatches = line.match(/[.!?]+(\s|$)/g);
      total.sentences += sentMatches?.length ?? 0;
      if (current) {
        current.words += wc(line);
        current.chars += cc(line);
        current.paragraphs++;
      }
    }
  }
  if (current) sections.push(current);

  total.readingMin = total.words / 250;
  // Each non-empty line was counted as a paragraph; consolidate based on blank-line separation: better approximation.
  total.paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;

  return { total, sections };
}

export function WordCountByDocSection() {
  const [text, setText] = useState<string>("# Introduction\n\nThis is the intro paragraph. It covers what the document is about.\n\n# Background\n\nSome context, including a few sentences. The point is to give the reader the lay of the land before going deeper.\n\n## Prior Work\n\nA discussion of related projects and prior research.\n\n# Method\n\nA description of methodology. We did X, then Y, then Z.\n\n# Results\n\nWe found A. We also found B. Most surprisingly, we found C.\n\n# Discussion\n\nWhat the results mean and limitations of the approach.");

  const { total, sections } = useMemo(() => analyze(text), [text]);

  return (
    <div className="space-y-5">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">Paste document (Markdown headings preferred)</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-xs" />
      </label>

      <div className="grid gap-3 sm:grid-cols-5">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
          <div className="text-xs uppercase tracking-wide text-slate-500">Words</div>
          <div className="text-xl font-bold">{total.words.toLocaleString()}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
          <div className="text-xs uppercase tracking-wide text-slate-500">Characters</div>
          <div className="text-xl font-bold">{total.chars.toLocaleString()}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
          <div className="text-xs uppercase tracking-wide text-slate-500">Paragraphs</div>
          <div className="text-xl font-bold">{total.paragraphs}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
          <div className="text-xs uppercase tracking-wide text-slate-500">Sentences</div>
          <div className="text-xl font-bold">{total.sentences}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
          <div className="text-xs uppercase tracking-wide text-slate-500">Reading time</div>
          <div className="text-xl font-bold">{total.readingMin.toFixed(1)} min</div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-700">By section</h4>
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Section</th><th className="text-right">Words</th><th className="text-right">Paragraphs</th><th className="text-right">% of total</th></tr>
          </thead>
          <tbody>
            {sections.map((s, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="py-1" style={{ paddingLeft: `${(s.level - 1) * 1.25}em` }}>
                  <span className="text-xs text-slate-400">{"#".repeat(s.level)}</span> {s.heading}
                </td>
                <td className="py-1 text-right">{s.words.toLocaleString()}</td>
                <td className="py-1 text-right">{s.paragraphs}</td>
                <td className="py-1 text-right">{total.words ? ((s.words / total.words) * 100).toFixed(1) : "0"}%</td>
              </tr>
            ))}
            {sections.length === 0 && <tr><td colSpan={4} className="py-3 text-center text-slate-500">Add markdown headings (# Heading) to see per-section breakdown.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Reading time:</strong> calculated at ~250 words/minute (average adult reading speed for non-fiction).
        Adjust mentally if your audience reads denser/lighter content. Longer sections often warrant being split — most
        modern long-form sweet spot is 200-500 words per section.
      </div>
    </div>
  );
}
