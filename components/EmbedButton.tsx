"use client";

import { useState } from "react";
import { SITE_URL } from "@/lib/pages";

/**
 * "Embed this tool" button shown on every tool page. Click reveals
 * a copy-ready <iframe> snippet pointed at /embed/<slug>.
 *
 * Kept dead simple — no modal library, no portal. A details element
 * handles the disclosure.
 */
export function EmbedButton({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/embed/${slug}`;
  const snippet = `<iframe src="${url}" width="100%" height="720" frameborder="0" loading="lazy" title="${escapeAttr(title)}" style="border:1px solid #e2e8f0;border-radius:12px;max-width:720px;"></iframe>`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // noop
    }
  };

  return (
    <details className="group rounded-xl border border-slate-200 bg-white">
      <summary className="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
        <span className="flex items-center gap-2">
          <EmbedIcon />
          Embed this tool on your site
        </span>
        <span className="text-xs text-slate-400 group-open:hidden">
          Show snippet
        </span>
        <span className="hidden text-xs text-slate-400 group-open:inline">
          Hide
        </span>
      </summary>

      <div className="space-y-3 border-t border-slate-200 px-4 py-4">
        <p className="text-xs text-slate-600">
          Paste this snippet into any page. Loads on-demand (lazy), no tracking
          scripts, and sized to most dashboards. Replace the <code>height</code>{" "}
          to fit your layout.
        </p>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">
          <code>{snippet}</code>
        </pre>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCopy}
            className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-dark"
          >
            {copied ? "Copied!" : "Copy snippet"}
          </button>
          <a
            href="/embed"
            className="text-xs text-slate-600 underline hover:text-brand"
          >
            Embed docs &rarr;
          </a>
        </div>
      </div>
    </details>
  );
}

function EmbedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function escapeAttr(s: string): string {
  return s.replace(/"/g, "&quot;");
}
