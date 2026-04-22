"use client";

import { useMemo, useState } from "react";

type OgType = "website" | "article" | "video" | "product";
type TwCard = "summary" | "summary_large_image" | "app" | "player";

export function OpenGraphGenerator() {
  const [title, setTitle] = useState("Free Tool Area");
  const [description, setDescription] = useState(
    "150+ free online tools — fast, private, no signup.",
  );
  const [image, setImage] = useState("https://freetoolarea.com/og.png");
  const [url, setUrl] = useState("https://freetoolarea.com/");
  const [siteName, setSiteName] = useState("Free Tool Area");
  const [ogType, setOgType] = useState<OgType>("website");
  const [twCard, setTwCard] = useState<TwCard>("summary_large_image");
  const [twCreator, setTwCreator] = useState("@jay");
  const [twSite, setTwSite] = useState("@freetoolarea");
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => {
    const lines: string[] = [];
    lines.push(`<meta property="og:type" content="${ogType}" />`);
    lines.push(`<meta property="og:site_name" content="${esc(siteName)}" />`);
    lines.push(`<meta property="og:title" content="${esc(title)}" />`);
    lines.push(`<meta property="og:description" content="${esc(description)}" />`);
    lines.push(`<meta property="og:url" content="${esc(url)}" />`);
    lines.push(`<meta property="og:image" content="${esc(image)}" />`);
    lines.push("");
    lines.push(`<meta name="twitter:card" content="${twCard}" />`);
    if (twSite) lines.push(`<meta name="twitter:site" content="${esc(twSite)}" />`);
    if (twCreator) lines.push(`<meta name="twitter:creator" content="${esc(twCreator)}" />`);
    lines.push(`<meta name="twitter:title" content="${esc(title)}" />`);
    lines.push(`<meta name="twitter:description" content="${esc(description)}" />`);
    lines.push(`<meta name="twitter:image" content="${esc(image)}" />`);
    return lines.join("\n");
  }, [title, description, image, url, siteName, ogType, twCard, twCreator, twSite]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  const hostname = (() => {
    try {
      return new URL(url).hostname.toUpperCase();
    } catch {
      return "EXAMPLE.COM";
    }
  })();

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
            Description
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
            Image URL
          </span>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
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
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Site name
          </span>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            OG Type
          </span>
          <select
            value={ogType}
            onChange={(e) => setOgType(e.target.value as OgType)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            <option value="website">website</option>
            <option value="article">article</option>
            <option value="video">video</option>
            <option value="product">product</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Twitter card
          </span>
          <select
            value={twCard}
            onChange={(e) => setTwCard(e.target.value as TwCard)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            <option value="summary">summary</option>
            <option value="summary_large_image">summary_large_image</option>
            <option value="app">app</option>
            <option value="player">player</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Twitter creator
          </span>
          <input
            type="text"
            value={twCreator}
            onChange={(e) => setTwCreator(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Twitter site
          </span>
          <input
            type="text"
            value={twSite}
            onChange={(e) => setTwSite(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Facebook preview
          </p>
          <div className="rounded-lg overflow-hidden border border-slate-200 bg-white">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt="OG preview"
                className="w-full h-48 object-cover bg-slate-100"
              />
            ) : (
              <div className="w-full h-48 bg-slate-100" />
            )}
            <div className="p-3 bg-slate-50 border-t border-slate-200">
              <p className="text-[11px] uppercase text-slate-500 truncate">
                {hostname}
              </p>
              <p className="font-semibold text-slate-900 line-clamp-2">{title}</p>
              <p className="text-sm text-slate-600 line-clamp-2">{description}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Twitter preview
          </p>
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt="Twitter preview"
                className="w-full h-48 object-cover bg-slate-100"
              />
            ) : (
              <div className="w-full h-48 bg-slate-100" />
            )}
            <div className="p-3">
              <p className="text-[11px] text-slate-500 truncate">
                {hostname.toLowerCase()}
              </p>
              <p className="font-semibold text-slate-900 line-clamp-1">{title}</p>
              <p className="text-sm text-slate-600 line-clamp-2">{description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            HTML meta tags
          </p>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">
          {html}
        </pre>
      </div>
    </div>
  );
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
