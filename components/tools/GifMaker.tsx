"use client";

import { useEffect, useState } from "react";
import { FileDrop, fmtBytes, loadImage } from "./ImageFormatConverter";

type Item = { id: string; file: File };

const GIF_JS_URL = "https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.js";
const GIF_WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js";

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

function loadGifJs(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("No window."));
    if ((window as any).GIF) return resolve();
    const existing = document.querySelector(`script[data-gifjs]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load gif.js")));
      return;
    }
    const s = document.createElement("script");
    s.src = GIF_JS_URL;
    s.async = true;
    s.setAttribute("data-gifjs", "1");
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load gif.js from CDN."));
    document.head.appendChild(s);
  });
}

export function GifMaker() {
  const [items, setItems] = useState<Item[]>([]);
  const [delay, setDelay] = useState(200);
  const [width, setWidth] = useState(480);
  const [loop, setLoop] = useState(true);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    loadGifJs().catch((e) => setErr(e.message));
  }, []);

  function onFiles(files: File[]) {
    const added = files
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ id: uid(), file: f }));
    setItems((prev) => [...prev, ...added]);
  }

  function move(id: string, dir: -1 | 1) {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx < 0) return prev;
      const next = idx + dir;
      if (next < 0 || next >= prev.length) return prev;
      const copy = prev.slice();
      [copy[idx], copy[next]] = [copy[next], copy[idx]];
      return copy;
    });
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearAll() {
    setItems([]);
    if (outUrl) URL.revokeObjectURL(outUrl);
    setOutUrl(null);
    setOutSize(null);
    setProgress(0);
  }

  async function makeGif() {
    if (items.length === 0) {
      setErr("Add at least one image.");
      return;
    }
    setBusy(true);
    setErr(null);
    setProgress(0);
    if (outUrl) URL.revokeObjectURL(outUrl);
    setOutUrl(null);
    setOutSize(null);

    try {
      await loadGifJs();
      const firstImg = await loadImage(items[0].file);
      const ratio = firstImg.naturalHeight / firstImg.naturalWidth;
      const W = Math.max(16, Math.round(width));
      const H = Math.max(16, Math.round(W * ratio));

      const GIFCtor = (window as any).GIF;
      if (!GIFCtor) throw new Error("gif.js failed to load. Check your internet connection.");
      const gif = new GIFCtor({
        workers: 2,
        quality: 10,
        width: W,
        height: H,
        workerScript: GIF_WORKER_URL,
        repeat: loop ? 0 : -1,
      });

      for (const it of items) {
        const img = it.file === items[0].file ? firstImg : await loadImage(it.file);
        const canvas = document.createElement("canvas");
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas 2D not supported.");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, W, H);
        // Cover fit while preserving aspect: scale to fit within W x H.
        const s = Math.min(W / img.naturalWidth, H / img.naturalHeight);
        const dw = img.naturalWidth * s;
        const dh = img.naturalHeight * s;
        const dx = (W - dw) / 2;
        const dy = (H - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
        gif.addFrame(canvas, { delay, copy: true });
      }

      gif.on("progress", (p: number) => setProgress(Math.round(p * 100)));
      gif.on("finished", (blob: Blob) => {
        setOutUrl(URL.createObjectURL(blob));
        setOutSize(blob.size);
        setBusy(false);
      });
      gif.render();
    } catch (e: any) {
      setErr(e?.message || "Failed to create GIF.");
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <FileDrop
        accept="image/*"
        multiple
        onFiles={onFiles}
        hint="Drop 2+ images in the order you want them to animate."
      />

      {items.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              {items.length} frame{items.length === 1 ? "" : "s"}
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Clear all
            </button>
          </div>

          <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {items.map((it, i) => (
              <li key={it.id} className="flex items-center gap-3 p-3">
                <span className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand font-semibold text-sm">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{it.file.name}</p>
                  <p className="text-xs text-slate-500">{fmtBytes(it.file.size)}</p>
                </div>
                <div className="flex gap-1 text-sm">
                  <button
                    type="button"
                    onClick={() => move(it.id, -1)}
                    disabled={i === 0}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(it.id, 1)}
                    disabled={i === items.length - 1}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(it.id)}
                    className="rounded-md border border-rose-200 bg-white px-2 py-1 text-rose-600 hover:bg-rose-50"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="grid sm:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Frame delay · {delay} ms
              </span>
              <input
                type="range"
                min={40}
                max={2000}
                step={20}
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                className="w-full"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Width · {width}px
              </span>
              <input
                type="range"
                min={80}
                max={1200}
                step={20}
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full"
              />
            </label>
            <label className="flex items-end gap-2 pb-1">
              <input
                type="checkbox"
                checked={loop}
                onChange={(e) => setLoop(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300"
              />
              <span className="text-sm text-slate-700">Loop forever</span>
            </label>
          </div>

          <button
            type="button"
            onClick={makeGif}
            disabled={busy || items.length === 0}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
          >
            {busy ? "Rendering…" : "Create GIF"}
          </button>

          {busy && (
            <div className="space-y-1">
              <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-brand transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">Rendering · {progress}%</p>
            </div>
          )}
        </>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-slate-700">
              GIF ready — <strong>{fmtBytes(outSize || 0)}</strong>
            </p>
            <a
              href={outUrl}
              download="animated.gif"
              className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
            >
              Download
            </a>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={outUrl}
            alt="Generated GIF"
            className="max-h-72 rounded-lg border border-slate-200 bg-white"
          />
        </div>
      )}
    </div>
  );
}
