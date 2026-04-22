"use client";

import { useMemo, useState } from "react";

const NARROW = new Set(["i", "l", "t", "I", "j", "f", "1", "!", "|", ".", ",", ":", ";"]);
const WIDE = new Set(["w", "m", "W", "M", "G", "O", "Q", "%", "@", "&"]);

function pixelWidth(text: string, scale = 1): number {
  let w = 0;
  for (const c of text) {
    if (NARROW.has(c)) w += 3;
    else if (WIDE.has(c)) w += 11;
    else if (c === " ") w += 3;
    else w += 7;
  }
  return Math.round(w * scale);
}

export function SerpSnippetPreview() {
  const [title, setTitle] = useState("Free Tool Area — 150+ Free Online Tools for Developers");
  const [url, setUrl] = useState("https://freetoolarea.com/tools/serp-snippet-preview");
  const [description, setDescription] = useState(
    "Preview your Google search result before publishing. Live pixel width and length checks for titles and meta descriptions. Fast, private, and ad-free.",
  );
  const [favicon, setFavicon] = useState("");

  const titlePx = useMemo(() => pixelWidth(title), [title]);
  const descChars = description.length;
  const titleChars = title.length;

  const titleWarn =
    titlePx > 580
      ? `Title is ${titlePx}px — Google desktop may truncate over 580px.`
      : titleChars > 65
        ? `Title is ${titleChars} chars — keep under ~65 for safety.`
        : null;
  const descWarn =
    descChars > 160
      ? `Description is ${descChars} chars — over 160 may truncate.`
      : descChars < 120 && descChars > 0
        ? `Description is ${descChars} chars — 120–160 is ideal.`
        : null;

  const breadcrumb = useMemo(() => {
    try {
      const u = new URL(url);
      const parts = u.pathname.split("/").filter(Boolean);
      return [u.hostname, ...parts].join(" › ");
    } catch {
      return url;
    }
  }, [url]);

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Title
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            URL
          </span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Meta description
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Favicon URL (optional)
          </span>
          <input
            type="text"
            value={favicon}
            onChange={(e) => setFavicon(e.target.value)}
            placeholder="https://example.com/favicon.ico"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="Title chars" value={String(titleChars)} />
        <Stat label="Title pixels" value={`${titlePx}px`} />
        <Stat label="Desc chars" value={String(descChars)} />
        <Stat label="Desc words" value={String(description.trim().split(/\s+/).filter(Boolean).length)} />
      </div>

      {(titleWarn || descWarn) && (
        <div className="space-y-1">
          {titleWarn && <p className="text-sm text-amber-700">{titleWarn}</p>}
          {descWarn && <p className="text-sm text-amber-700">{descWarn}</p>}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          Desktop preview
        </p>
        <div className="rounded-lg border border-slate-200 bg-white p-4 max-w-[600px]">
          <div className="flex items-center gap-2 mb-1">
            {favicon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={favicon} alt="" className="w-4 h-4 rounded" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-slate-200" />
            )}
            <span className="text-xs text-emerald-700 truncate">{breadcrumb}</span>
          </div>
          <p className="text-lg text-blue-700 hover:underline cursor-pointer leading-tight">
            {title}
          </p>
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          Mobile preview
        </p>
        <div className="rounded-lg border border-slate-200 bg-white p-3 max-w-[360px]">
          <div className="flex items-center gap-2 mb-1">
            {favicon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={favicon} alt="" className="w-4 h-4 rounded" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-slate-200" />
            )}
            <span className="text-xs text-emerald-700 truncate">{breadcrumb}</span>
          </div>
          <p className="text-base text-blue-700 hover:underline cursor-pointer leading-snug">
            {title}
          </p>
          <p className="text-sm text-slate-600 mt-1 line-clamp-3">{description}</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-900 tabular-nums">{value}</p>
    </div>
  );
}
