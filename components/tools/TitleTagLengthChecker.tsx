"use client";

import { useMemo, useState } from "react";

const NARROW = new Set(["i", "l", "t", "I", "j", "f", "1", "!", "|", ".", ",", ":", ";", "'"]);
const WIDE = new Set(["w", "m", "W", "M", "G", "O", "Q", "%", "@", "&"]);

function pixelWidth(text: string): number {
  let w = 0;
  for (const c of text) {
    if (NARROW.has(c)) w += 3;
    else if (WIDE.has(c)) w += 11;
    else if (c === " ") w += 3;
    else w += 7;
  }
  return Math.round(w);
}

export function TitleTagLengthChecker() {
  const [title, setTitle] = useState(
    "SEO Title Tag Length Checker — Pixel Width & Character Count",
  );
  const [url, setUrl] = useState("https://example.com/page");
  const [description, setDescription] = useState(
    "Quick preview of how this page's title appears in Google search results.",
  );

  const px = useMemo(() => pixelWidth(title), [title]);
  const chars = title.length;

  const tooLong = px > 580;
  const tooShort = px < 200 && px > 0;

  const status = tooLong ? "danger" : tooShort ? "warn" : "good";
  const barColor =
    status === "danger" ? "bg-rose-500" : status === "warn" ? "bg-amber-500" : "bg-emerald-500";
  const fill = Math.min(100, (px / 600) * 100);

  const message =
    status === "danger"
      ? `${px}px — Google may truncate titles over ~580px.`
      : status === "warn"
        ? `${px}px — under 200px may look too short on desktop SERPs.`
        : `${px}px — looks good.`;

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Title tag
        </span>
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Stat label="Characters" value={String(chars)} />
        <Stat label="Pixels (approx)" value={`${px}px`} />
        <Stat label="Budget" value="580px" />
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          Width usage
        </p>
        <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
          <div
            className={`h-full ${barColor} transition-all`}
            style={{ width: `${fill}%` }}
          />
        </div>
        <p
          className={`text-sm ${
            status === "danger"
              ? "text-rose-600"
              : status === "warn"
                ? "text-amber-700"
                : "text-slate-700"
          }`}
        >
          {message}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            URL (for preview)
          </span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Meta description (for preview)
          </span>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          SERP preview
        </p>
        <div className="rounded-lg border border-slate-200 bg-white p-4 max-w-[600px]">
          <p className="text-xs text-emerald-700 truncate">{url}</p>
          <p className="text-lg text-blue-700 hover:underline cursor-pointer leading-tight">
            {title}
          </p>
          <p className="text-sm text-slate-600 mt-1">{description}</p>
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
