"use client";

import { useState, useMemo } from "react";
import { fmtBytes } from "./ImageFormatConverter";

export function SvgToPng() {
  const [svg, setSvg] = useState<string>(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="16" fill="#0f766e"/>
  <text x="50" y="62" text-anchor="middle" font-size="40" font-family="system-ui, sans-serif" fill="#fff" font-weight="700">FT</text>
</svg>`);
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [transparent, setTransparent] = useState(true);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const svgPreview = useMemo(() => {
    try {
      const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
      return url;
    } catch {
      return null;
    }
  }, [svg]);

  async function render() {
    setBusy(true);
    setErr(null);
    try {
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Couldn't load the SVG — is it valid XML?"));
        img.src = url;
      });
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D not supported.");
      if (!transparent) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      const outBlob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!outBlob) throw new Error("Rasterization failed.");
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(outBlob));
      setOutSize(outBlob.size);
    } catch (e: any) {
      setErr(e.message || "SVG to PNG failed.");
    } finally {
      setBusy(false);
    }
  }

  async function onFile(f: File) {
    setSvg(await f.text());
  }

  return (
    <div className="space-y-5">
      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            SVG input
          </p>
          <label className="text-xs font-medium text-brand hover:underline cursor-pointer">
            Load file
            <input
              type="file"
              accept=".svg,image/svg+xml"
              onChange={(e) => e.target.files && e.target.files[0] && onFile(e.target.files[0])}
              className="sr-only"
            />
          </label>
        </div>
        <textarea
          value={svg}
          onChange={(e) => setSvg(e.target.value)}
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-3 items-end">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Width (px)
          </span>
          <input
            type="number"
            value={width}
            min={16}
            max={8192}
            onChange={(e) => setWidth(Number(e.target.value) || 512)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Height (px)
          </span>
          <input
            type="number"
            value={height}
            min={16}
            max={8192}
            onChange={(e) => setHeight(Number(e.target.value) || 512)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex items-center gap-2 text-sm pb-2">
          <input
            type="checkbox"
            checked={transparent}
            onChange={(e) => setTransparent(e.target.checked)}
          />
          Transparent
        </label>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={render}
          disabled={busy}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          {busy ? "Rendering…" : "Convert to PNG"}
        </button>
        {[256, 512, 1024, 2048].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setWidth(s);
              setHeight(s);
            }}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {s}
          </button>
        ))}
      </div>

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {svgPreview && !outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
            SVG preview
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={svgPreview} alt="SVG preview" className="max-h-48 rounded bg-white border border-slate-200" />
        </div>
      )}

      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-slate-700">
              {width}×{height}px PNG · <strong>{fmtBytes(outSize || 0)}</strong>
            </p>
            <a
              href={outUrl}
              download={`image-${width}x${height}.png`}
              className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
            >
              Download
            </a>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={outUrl} alt="Rendered PNG" className="max-h-72 rounded-lg border border-slate-200 bg-white" />
        </div>
      )}
    </div>
  );
}
