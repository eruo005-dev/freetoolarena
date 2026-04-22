"use client";

import { useMemo, useState } from "react";

type Block = {
  userAgent: string;
  allow: string[];
  disallow: string[];
  crawlDelay: string;
};

const DEFAULT_BLOCKS: Block[] = [
  {
    userAgent: "*",
    allow: [],
    disallow: ["/admin/", "/private/"],
    crawlDelay: "",
  },
];

export function RobotsTxtGenerator() {
  const [blocks, setBlocks] = useState<Block[]>(DEFAULT_BLOCKS);
  const [sitemap, setSitemap] = useState<string>("https://freetoolarea.com/sitemap.xml");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => buildRobotsTxt(blocks, sitemap), [blocks, sitemap]);

  function updateBlock(idx: number, patch: Partial<Block>) {
    setBlocks((bs) => bs.map((b, i) => (i === idx ? { ...b, ...patch } : b)));
  }

  function addBlock() {
    setBlocks((bs) => [
      ...bs,
      { userAgent: "*", allow: [], disallow: [], crawlDelay: "" },
    ]);
  }

  function removeBlock(idx: number) {
    setBlocks((bs) => bs.filter((_, i) => i !== idx));
  }

  function addPath(idx: number, kind: "allow" | "disallow") {
    updateBlock(idx, { [kind]: [...blocks[idx][kind], "/"] } as Partial<Block>);
  }

  function updatePath(idx: number, kind: "allow" | "disallow", pi: number, value: string) {
    const next = [...blocks[idx][kind]];
    next[pi] = value;
    updateBlock(idx, { [kind]: next } as Partial<Block>);
  }

  function removePath(idx: number, kind: "allow" | "disallow", pi: number) {
    const next = blocks[idx][kind].filter((_, i) => i !== pi);
    updateBlock(idx, { [kind]: next } as Partial<Block>);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  function download() {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Sitemap URL
        </span>
        <input
          type="text"
          value={sitemap}
          onChange={(e) => setSitemap(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
        />
      </label>

      {blocks.map((b, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
              Block {idx + 1}
            </p>
            <button
              type="button"
              onClick={() => removeBlock(idx)}
              disabled={blocks.length <= 1}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Remove block
            </button>
          </div>

          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              User-agent
            </span>
            <input
              type="text"
              value={b.userAgent}
              onChange={(e) => updateBlock(idx, { userAgent: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
            />
          </label>

          <PathList
            label="Allow"
            paths={b.allow}
            onAdd={() => addPath(idx, "allow")}
            onChange={(pi, v) => updatePath(idx, "allow", pi, v)}
            onRemove={(pi) => removePath(idx, "allow", pi)}
          />
          <PathList
            label="Disallow"
            paths={b.disallow}
            onAdd={() => addPath(idx, "disallow")}
            onChange={(pi, v) => updatePath(idx, "disallow", pi, v)}
            onRemove={(pi) => removePath(idx, "disallow", pi)}
          />

          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Crawl-delay (optional)
            </span>
            <input
              type="text"
              value={b.crawlDelay}
              onChange={(e) => updateBlock(idx, { crawlDelay: e.target.value })}
              placeholder="e.g. 10"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
            />
          </label>
        </div>
      ))}

      <button
        type="button"
        onClick={addBlock}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
      >
        + Add user-agent block
      </button>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            robots.txt
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copy}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              type="button"
              onClick={download}
              className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
            >
              Download .txt
            </button>
          </div>
        </div>
        <textarea
          value={output}
          readOnly
          rows={6}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
        />
      </div>
    </div>
  );
}

function PathList({
  label,
  paths,
  onAdd,
  onChange,
  onRemove,
}: {
  label: string;
  paths: string[];
  onAdd: () => void;
  onChange: (pi: number, v: string) => void;
  onRemove: (pi: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          {label}
        </span>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          + Add
        </button>
      </div>
      {paths.length === 0 && (
        <p className="text-xs text-slate-500 italic">No paths.</p>
      )}
      {paths.map((p, pi) => (
        <div key={pi} className="flex gap-2">
          <input
            type="text"
            value={p}
            onChange={(e) => onChange(pi, e.target.value)}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
          />
          <button
            type="button"
            onClick={() => onRemove(pi)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

function buildRobotsTxt(blocks: Block[], sitemap: string): string {
  const parts: string[] = [];
  blocks.forEach((b, i) => {
    const lines: string[] = [];
    lines.push(`User-agent: ${b.userAgent || "*"}`);
    b.allow.filter(Boolean).forEach((p) => lines.push(`Allow: ${p}`));
    b.disallow.filter(Boolean).forEach((p) => lines.push(`Disallow: ${p}`));
    if (b.crawlDelay.trim()) lines.push(`Crawl-delay: ${b.crawlDelay.trim()}`);
    parts.push(lines.join("\n"));
    if (i < blocks.length - 1) parts.push("");
  });
  if (sitemap.trim()) {
    parts.push("");
    parts.push(`Sitemap: ${sitemap.trim()}`);
  }
  return parts.join("\n");
}
