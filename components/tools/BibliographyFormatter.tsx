"use client";

import { useMemo, useState } from "react";

type Style = "apa" | "mla" | "chicago" | "harvard";

interface Source {
  id: string;
  type: "book" | "journal" | "website" | "newspaper";
  authors: string;
  year: string;
  title: string;
  publisher: string;
  url: string;
  accessed: string;
  pages: string;
  journal: string;
  volume: string;
  issue: string;
}

const STYLES: Record<Style, { name: string }> = {
  apa: { name: "APA 7" },
  mla: { name: "MLA 9" },
  chicago: { name: "Chicago 17 (author-date)" },
  harvard: { name: "Harvard" },
};

function formatAuthors(authors: string, style: Style): string {
  const list = authors.split(/\s*[;]\s*/).filter(Boolean);
  if (list.length === 0) return "";
  if (style === "apa" || style === "harvard") {
    if (list.length === 1) return list[0];
    if (list.length === 2) return `${list[0]} & ${list[1]}`;
    return list.slice(0, -1).join(", ") + ", & " + list[list.length - 1];
  }
  if (style === "mla") {
    if (list.length === 1) return list[0];
    if (list.length === 2) return `${list[0]} and ${list[1]}`;
    return `${list[0]}, et al.`;
  }
  // chicago
  if (list.length === 1) return list[0];
  if (list.length === 2) return `${list[0]} and ${list[1]}`;
  if (list.length === 3) return list.slice(0, -1).join(", ") + ", and " + list[list.length - 1];
  return `${list[0]} et al.`;
}

function format(s: Source, style: Style): string {
  const a = formatAuthors(s.authors, style);
  if (s.type === "book") {
    if (style === "apa" || style === "harvard") return `${a} (${s.year}). *${s.title}*. ${s.publisher}.`;
    if (style === "mla") return `${a}. *${s.title}*. ${s.publisher}, ${s.year}.`;
    return `${a}. ${s.year}. *${s.title}*. ${s.publisher}.`;
  }
  if (s.type === "journal") {
    if (style === "apa" || style === "harvard") return `${a} (${s.year}). ${s.title}. *${s.journal}*, ${s.volume}${s.issue ? `(${s.issue})` : ""}, ${s.pages}.`;
    if (style === "mla") return `${a}. "${s.title}." *${s.journal}*, vol. ${s.volume}, no. ${s.issue}, ${s.year}, pp. ${s.pages}.`;
    return `${a}. ${s.year}. "${s.title}." *${s.journal}* ${s.volume}, no. ${s.issue}: ${s.pages}.`;
  }
  if (s.type === "website") {
    if (style === "apa" || style === "harvard") return `${a} (${s.year}). ${s.title}. *${s.publisher}*. ${s.url}`;
    if (style === "mla") return `${a}. "${s.title}." *${s.publisher}*, ${s.year}, ${s.url}. Accessed ${s.accessed}.`;
    return `${a}. ${s.year}. "${s.title}." *${s.publisher}*. ${s.url}.`;
  }
  // newspaper
  if (style === "apa" || style === "harvard") return `${a} (${s.year}). ${s.title}. *${s.publisher}*. ${s.url}`;
  if (style === "mla") return `${a}. "${s.title}." *${s.publisher}*, ${s.year}, ${s.url}.`;
  return `${a}. ${s.year}. "${s.title}." *${s.publisher}*. ${s.url}.`;
}

const STARTER: Source[] = [
  { id: "1", type: "book", authors: "Newport, Cal", year: "2016", title: "Deep Work", publisher: "Grand Central Publishing", url: "", accessed: "", pages: "", journal: "", volume: "", issue: "" },
  { id: "2", type: "journal", authors: "Mandsager, K.; Harb, S.; Cremer, P.", year: "2018", title: "Association of cardiorespiratory fitness with long-term mortality", publisher: "", url: "", accessed: "", pages: "1-10", journal: "JAMA Network Open", volume: "1", issue: "6" },
  { id: "3", type: "website", authors: "freetoolarena.com", year: "2026", title: "Best AI for Coding (2026)", publisher: "Free Tool Arena", url: "https://freetoolarena.com/guides/best-ai-for-coding-2026", accessed: "April 1, 2026", pages: "", journal: "", volume: "", issue: "" },
];

function newSource(): Source {
  return { id: String(Date.now()), type: "book", authors: "", year: "", title: "", publisher: "", url: "", accessed: "", pages: "", journal: "", volume: "", issue: "" };
}

export function BibliographyFormatter() {
  const [style, setStyle] = useState<Style>("apa");
  const [sources, setSources] = useState<Source[]>(STARTER);

  const formatted = useMemo(() => {
    return [...sources].sort((a, b) => a.authors.localeCompare(b.authors)).map((s) => format(s, style));
  }, [sources, style]);

  const update = (id: string, key: keyof Source, val: string) =>
    setSources((s) => s.map((x) => x.id === id ? { ...x, [key]: val } : x));
  const remove = (id: string) => setSources((s) => s.filter((x) => x.id !== id));
  const add = () => setSources((s) => [...s, newSource()]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Style</label>
        <select value={style} onChange={(e) => setStyle(e.target.value as Style)} className="rounded border border-slate-300 px-3 py-2 text-sm">
          {(Object.keys(STYLES) as Style[]).map((k) => <option key={k} value={k}>{STYLES[k].name}</option>)}
        </select>
        <button onClick={add} className="ml-auto rounded bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-brand-dark">Add source</button>
      </div>

      <div className="space-y-3">
        {sources.map((s) => (
          <div key={s.id} className="rounded-lg border border-slate-200 bg-white p-3">
            <div className="grid gap-2 sm:grid-cols-4">
              <select value={s.type} onChange={(e) => update(s.id, "type", e.target.value)} className="rounded border border-slate-300 px-2 py-1 text-xs">
                <option value="book">Book</option>
                <option value="journal">Journal</option>
                <option value="website">Website</option>
                <option value="newspaper">Newspaper</option>
              </select>
              <input value={s.authors} onChange={(e) => update(s.id, "authors", e.target.value)} placeholder="Authors (semicolon-separated)" className="rounded border border-slate-300 px-2 py-1 text-xs" />
              <input value={s.year} onChange={(e) => update(s.id, "year", e.target.value)} placeholder="Year" className="rounded border border-slate-300 px-2 py-1 text-xs" />
              <input value={s.title} onChange={(e) => update(s.id, "title", e.target.value)} placeholder="Title" className="rounded border border-slate-300 px-2 py-1 text-xs" />
              {(s.type === "book" || s.type === "website" || s.type === "newspaper") && (
                <input value={s.publisher} onChange={(e) => update(s.id, "publisher", e.target.value)} placeholder="Publisher / Site" className="rounded border border-slate-300 px-2 py-1 text-xs" />
              )}
              {s.type === "journal" && (
                <>
                  <input value={s.journal} onChange={(e) => update(s.id, "journal", e.target.value)} placeholder="Journal" className="rounded border border-slate-300 px-2 py-1 text-xs" />
                  <input value={s.volume} onChange={(e) => update(s.id, "volume", e.target.value)} placeholder="Vol" className="rounded border border-slate-300 px-2 py-1 text-xs" />
                  <input value={s.issue} onChange={(e) => update(s.id, "issue", e.target.value)} placeholder="Issue" className="rounded border border-slate-300 px-2 py-1 text-xs" />
                  <input value={s.pages} onChange={(e) => update(s.id, "pages", e.target.value)} placeholder="Pages" className="rounded border border-slate-300 px-2 py-1 text-xs" />
                </>
              )}
              {(s.type === "website" || s.type === "newspaper") && (
                <input value={s.url} onChange={(e) => update(s.id, "url", e.target.value)} placeholder="URL" className="rounded border border-slate-300 px-2 py-1 text-xs sm:col-span-3" />
              )}
              {s.type === "website" && (
                <input value={s.accessed} onChange={(e) => update(s.id, "accessed", e.target.value)} placeholder="Date accessed" className="rounded border border-slate-300 px-2 py-1 text-xs" />
              )}
              <button onClick={() => remove(s.id)} className="text-xs text-rose-600 hover:underline sm:col-span-4 sm:justify-self-end">remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <h4 className="text-sm font-semibold text-emerald-900">References / Works Cited ({STYLES[style].name})</h4>
          <button onClick={() => navigator.clipboard?.writeText(formatted.join("\n\n"))} className="text-xs text-emerald-800 underline">Copy all</button>
        </div>
        <ol className="list-decimal space-y-2 pl-5 text-xs text-emerald-900">
          {formatted.map((f, i) => <li key={i}><span dangerouslySetInnerHTML={{ __html: f.replace(/\*([^*]+)\*/g, "<em>$1</em>") }} /></li>)}
        </ol>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Note:</strong> sorted alphabetically by author. Italics indicate formatting. For complex citations (edited
        books, multi-volume works, conference proceedings) verify final formatting against your style manual. Pair with
        the <a href="/tools/citation-generator" className="underline">citation generator</a> for in-text citations.
      </div>
    </div>
  );
}
