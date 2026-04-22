"use client";

import { useMemo, useState } from "react";

type OgType = "website" | "article";
type TwCard = "summary" | "summary_large_image";

export function MetaTagGenerator() {
  const [title, setTitle] = useState("Free Tool Area — 150+ Free Online Tools");
  const [description, setDescription] = useState(
    "Fast, ad-free online tools for developers, designers, and marketers.",
  );
  const [keywords, setKeywords] = useState("free tools, online tools, generator, converter");
  const [author, setAuthor] = useState("Free Tool Area");
  const [canonical, setCanonical] = useState("https://freetoolarea.com/");
  const [indexBot, setIndexBot] = useState(true);
  const [followBot, setFollowBot] = useState(true);
  const [ogTitle, setOgTitle] = useState("Free Tool Area");
  const [ogDescription, setOgDescription] = useState(
    "150+ free online tools — fast, private, no signup.",
  );
  const [ogImage, setOgImage] = useState("https://freetoolarea.com/og.png");
  const [ogType, setOgType] = useState<OgType>("website");
  const [twCard, setTwCard] = useState<TwCard>("summary_large_image");
  const [twHandle, setTwHandle] = useState("@freetoolarea");
  const [copied, setCopied] = useState(false);

  const robots = `${indexBot ? "index" : "noindex"}, ${followBot ? "follow" : "nofollow"}`;

  const html = useMemo(() => {
    const lines: string[] = [];
    if (title) lines.push(`<title>${escapeHtml(title)}</title>`);
    if (description)
      lines.push(`<meta name="description" content="${escapeHtml(description)}" />`);
    if (keywords) lines.push(`<meta name="keywords" content="${escapeHtml(keywords)}" />`);
    if (author) lines.push(`<meta name="author" content="${escapeHtml(author)}" />`);
    lines.push(`<meta name="robots" content="${robots}" />`);
    if (canonical) lines.push(`<link rel="canonical" href="${escapeHtml(canonical)}" />`);
    lines.push("");
    lines.push(`<meta property="og:type" content="${ogType}" />`);
    if (ogTitle) lines.push(`<meta property="og:title" content="${escapeHtml(ogTitle)}" />`);
    if (ogDescription)
      lines.push(`<meta property="og:description" content="${escapeHtml(ogDescription)}" />`);
    if (canonical) lines.push(`<meta property="og:url" content="${escapeHtml(canonical)}" />`);
    if (ogImage) lines.push(`<meta property="og:image" content="${escapeHtml(ogImage)}" />`);
    lines.push("");
    lines.push(`<meta name="twitter:card" content="${twCard}" />`);
    if (twHandle) lines.push(`<meta name="twitter:site" content="${escapeHtml(twHandle)}" />`);
    if (ogTitle) lines.push(`<meta name="twitter:title" content="${escapeHtml(ogTitle)}" />`);
    if (ogDescription)
      lines.push(`<meta name="twitter:description" content="${escapeHtml(ogDescription)}" />`);
    if (ogImage) lines.push(`<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`);
    return lines.join("\n");
  }, [
    title,
    description,
    keywords,
    author,
    canonical,
    robots,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    twCard,
    twHandle,
  ]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Page title
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
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Keywords (comma-separated)
          </span>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Author
          </span>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Canonical URL
          </span>
          <input
            type="text"
            value={canonical}
            onChange={(e) => setCanonical(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          Robots
        </p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={indexBot}
              onChange={(e) => setIndexBot(e.target.checked)}
            />
            index
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={followBot}
              onChange={(e) => setFollowBot(e.target.checked)}
            />
            follow
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          Open Graph
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              OG Title
            </span>
            <input
              type="text"
              value={ogTitle}
              onChange={(e) => setOgTitle(e.target.value)}
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
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              OG Description
            </span>
            <textarea
              value={ogDescription}
              onChange={(e) => setOgDescription(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              OG Image URL
            </span>
            <input
              type="text"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          Twitter
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Card
            </span>
            <select
              value={twCard}
              onChange={(e) => setTwCard(e.target.value as TwCard)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="summary">summary</option>
              <option value="summary_large_image">summary_large_image</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Handle
            </span>
            <input
              type="text"
              value={twHandle}
              onChange={(e) => setTwHandle(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Generated HTML
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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
