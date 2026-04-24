"use client";

import { useMemo, useState } from "react";

type Style = "apa" | "mla" | "chicago" | "harvard";
type SourceType = "book" | "journal" | "website" | "newspaper";

export interface CitationGeneratorProps {
  initialStyle?: Style;
  initialType?: SourceType;
}

export function CitationGenerator({ initialStyle = "apa", initialType = "book" }: CitationGeneratorProps = {}) {
  const [style, setStyle] = useState<Style>(initialStyle);
  const [type, setType] = useState<SourceType>(initialType);
  const [lastName, setLastName] = useState("Harari");
  const [firstName, setFirstName] = useState("Yuval Noah");
  const [year, setYear] = useState("2015");
  const [title, setTitle] = useState("Sapiens: A Brief History of Humankind");
  const [container, setContainer] = useState("Harper");
  const [url, setUrl] = useState("https://example.com/sapiens");
  const [accessDate, setAccessDate] = useState("2026-04-24");
  const [pages, setPages] = useState("45-67");
  const [volume, setVolume] = useState("12");
  const [issue, setIssue] = useState("3");

  const citation = useMemo(() => {
    const authorFull = `${lastName}, ${firstName}`;
    const firstInitial = firstName.split(" ").map((n) => n[0] + ".").join(" ");
    const yr = year || "n.d.";
    let full = "";
    let inText = "";

    if (style === "apa") {
      const author = `${lastName}, ${firstInitial}`;
      if (type === "book") {
        full = `${author} (${yr}). *${title}*. ${container}.`;
      } else if (type === "journal") {
        full = `${author} (${yr}). ${title}. *${container}*, *${volume}*(${issue}), ${pages}.`;
      } else if (type === "website") {
        full = `${author} (${yr}). *${title}*. ${container}. ${url}`;
      } else {
        full = `${author} (${yr}). ${title}. *${container}*. ${url}`;
      }
      inText = `(${lastName}, ${yr})`;
    } else if (style === "mla") {
      if (type === "book") {
        full = `${authorFull}. *${title}*. ${container}, ${yr}.`;
      } else if (type === "journal") {
        full = `${authorFull}. &ldquo;${title}.&rdquo; *${container}*, vol. ${volume}, no. ${issue}, ${yr}, pp. ${pages}.`;
      } else if (type === "website") {
        full = `${authorFull}. &ldquo;${title}.&rdquo; *${container}*, ${yr}, ${url}. Accessed ${accessDate}.`;
      } else {
        full = `${authorFull}. &ldquo;${title}.&rdquo; *${container}*, ${yr}, ${url}.`;
      }
      inText = `(${lastName} ${pages || ""})`.trim();
    } else if (style === "chicago") {
      if (type === "book") {
        full = `${authorFull}. *${title}*. ${container}, ${yr}.`;
      } else if (type === "journal") {
        full = `${authorFull}. &ldquo;${title}.&rdquo; *${container}* ${volume}, no. ${issue} (${yr}): ${pages}.`;
      } else if (type === "website") {
        full = `${authorFull}. &ldquo;${title}.&rdquo; ${container}. ${yr}. ${url}.`;
      } else {
        full = `${authorFull}. &ldquo;${title}.&rdquo; *${container}*, ${yr}. ${url}.`;
      }
      inText = `(${lastName} ${yr}, ${pages || ""})`.trim();
    } else {
      const author = `${lastName}, ${firstInitial}`;
      if (type === "book") {
        full = `${author} (${yr}) *${title}*. ${container}.`;
      } else if (type === "journal") {
        full = `${author} (${yr}) &lsquo;${title}&rsquo;, *${container}*, ${volume}(${issue}), pp. ${pages}.`;
      } else if (type === "website") {
        full = `${author} (${yr}) *${title}*. Available at: ${url} (Accessed: ${accessDate}).`;
      } else {
        full = `${author} (${yr}) &lsquo;${title}&rsquo;, *${container}*, ${yr}. Available at: ${url}.`;
      }
      inText = `(${lastName}, ${yr})`;
    }

    return { full, inText };
  }, [style, type, lastName, firstName, year, title, container, url, accessDate, pages, volume, issue]);

  const renderMarkdown = (s: string) => {
    const parts = s.split(/(\*[^*]+\*)/g);
    return parts.map((p, i) =>
      p.startsWith("*") && p.endsWith("*") ? (
        <em key={i}>{p.slice(1, -1)}</em>
      ) : (
        <span key={i} dangerouslySetInnerHTML={{ __html: p }} />
      )
    );
  };

  const showContainer =
    type === "book" ? "Publisher" : type === "journal" ? "Journal" : type === "newspaper" ? "Newspaper" : "Website";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Citation style</span>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value as Style)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="apa">APA 7</option>
            <option value="mla">MLA 9</option>
            <option value="chicago">Chicago 17</option>
            <option value="harvard">Harvard</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Source type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as SourceType)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="book">Book</option>
            <option value="journal">Journal article</option>
            <option value="website">Website</option>
            <option value="newspaper">Newspaper</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Author last name</span>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Author first name(s)</span>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Year</span>
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">{showContainer}</span>
          <input
            value={container}
            onChange={(e) => setContainer(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        {type === "journal" ? (
          <>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Volume</span>
              <input
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Issue</span>
              <input
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Pages</span>
              <input
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
          </>
        ) : null}
        {type === "book" ? (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Pages (for in-text)</span>
            <input
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
        ) : null}
        {type === "website" || type === "newspaper" ? (
          <>
            <label className="block sm:col-span-2">
              <span className="block text-sm font-medium text-slate-700 mb-1">URL</span>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Access date</span>
              <input
                type="date"
                value={accessDate}
                onChange={(e) => setAccessDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
          </>
        ) : null}
      </div>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Full citation</p>
        <p className="text-base text-slate-900 leading-relaxed">{renderMarkdown(citation.full)}</p>
        <p className="mt-4 text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">In-text citation</p>
        <p className="text-base font-semibold text-brand">{citation.inText}</p>
      </div>

      <p className="text-xs text-slate-500">
        Italics rendered from asterisks &mdash; paste the raw text into Word and re-apply formatting as needed.
      </p>
    </div>
  );
}
