"use client";

import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";

type Size = { label: string; size: number; filename: string };

const SIZES: Size[] = [
  { label: "16×16", size: 16, filename: "favicon-16x16.png" },
  { label: "32×32", size: 32, filename: "favicon-32x32.png" },
  { label: "48×48", size: 48, filename: "favicon-48x48.png" },
  { label: "180×180 (apple)", size: 180, filename: "apple-touch-icon.png" },
  { label: "192×192", size: 192, filename: "android-chrome-192x192.png" },
  { label: "512×512", size: 512, filename: "android-chrome-512x512.png" },
];

const HTML_SNIPPET = `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />`;

export function FaviconGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Record<number, string>>({});
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!file) {
      setSourceUrl(null);
      setPreviews({});
      return;
    }
    const url = URL.createObjectURL(file);
    setSourceUrl(url);
    setErr(null);
    setBusy(true);

    const img = new Image();
    img.onload = () => {
      const out: Record<number, string> = {};
      let pending = SIZES.length;
      SIZES.forEach(({ size }) => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          pending -= 1;
          return;
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        canvas.toBlob((blob) => {
          if (blob) {
            out[size] = URL.createObjectURL(blob);
          }
          pending -= 1;
          if (pending === 0) {
            setPreviews(out);
            setBusy(false);
          }
        }, "image/png");
      });
    };
    img.onerror = () => {
      setErr("Couldn't read image.");
      setBusy(false);
    };
    img.src = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  useEffect(() => {
    return () => {
      Object.values(previews).forEach((u) => URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
  }

  function download(size: Size) {
    const url = previews[size.size];
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = size.filename;
    a.click();
  }

  async function copyHtml() {
    try {
      await navigator.clipboard.writeText(HTML_SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Source image (PNG / JPG, square works best)
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </label>

      {err && <p className="text-sm text-rose-600">{err}</p>}
      {busy && <p className="text-sm text-slate-500">Generating favicons…</p>}

      {sourceUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sourceUrl}
            alt="Source"
            className="max-h-40 rounded-lg border border-slate-200 bg-white"
          />
        </div>
      )}

      {Object.keys(previews).length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SIZES.map((s) => {
            const url = previews[s.size];
            if (!url) return null;
            return (
              <div
                key={s.size}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col items-center gap-3"
              >
                <div className="flex items-center justify-center h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={s.label}
                    width={Math.min(s.size, 96)}
                    height={Math.min(s.size, 96)}
                    className="rounded-md border border-slate-200 bg-white"
                    style={{ imageRendering: s.size <= 48 ? "pixelated" : "auto" }}
                  />
                </div>
                <p className="text-xs font-semibold text-slate-700">{s.label}</p>
                <button
                  type="button"
                  onClick={() => download(s)}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Download
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            HTML snippet
          </p>
          <button
            type="button"
            onClick={copyHtml}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">
          {HTML_SNIPPET}
        </pre>
      </div>
    </div>
  );
}
