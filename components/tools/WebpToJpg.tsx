"use client";

import { useState } from "react";
import { FileDrop, fmtBytes, loadImage } from "./ImageFormatConverter";

type Item = {
  id: string;
  file: File;
  outUrl?: string;
  outSize?: number;
  status: "pending" | "converting" | "done" | "error";
  error?: string;
};

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

export function WebpToJpg() {
  const [items, setItems] = useState<Item[]>([]);
  const [quality, setQuality] = useState(0.92);
  const [busy, setBusy] = useState(false);

  function onFiles(files: File[]) {
    const added = files
      .filter((f) => /\.webp$/i.test(f.name) || f.type === "image/webp")
      .map((f) => ({ id: uid(), file: f, status: "pending" as const }));
    setItems((prev) => [...prev, ...added]);
  }

  function clearAll() {
    items.forEach((it) => it.outUrl && URL.revokeObjectURL(it.outUrl));
    setItems([]);
  }

  function remove(id: string) {
    setItems((prev) => {
      const it = prev.find((x) => x.id === id);
      if (it?.outUrl) URL.revokeObjectURL(it.outUrl);
      return prev.filter((x) => x.id !== id);
    });
  }

  async function convertOne(it: Item): Promise<Item> {
    try {
      const img = await loadImage(it.file);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D not supported.");
      // Flatten transparency onto white for JPEG.
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", quality),
      );
      if (!blob) throw new Error("Conversion failed.");
      return {
        ...it,
        outUrl: URL.createObjectURL(blob),
        outSize: blob.size,
        status: "done",
      };
    } catch (e: any) {
      return { ...it, status: "error", error: e?.message || "Failed." };
    }
  }

  async function convertAll() {
    setBusy(true);
    const updated: Item[] = [];
    for (const it of items) {
      if (it.status === "done") {
        updated.push(it);
        continue;
      }
      setItems((prev) =>
        prev.map((p) => (p.id === it.id ? { ...p, status: "converting" } : p)),
      );
      const next = await convertOne(it);
      updated.push(next);
      setItems((prev) => prev.map((p) => (p.id === it.id ? next : p)));
    }
    setBusy(false);
  }

  const totalSize = items.reduce((s, i) => s + i.file.size, 0);

  return (
    <div className="space-y-5">
      <FileDrop
        accept="image/webp,.webp"
        multiple
        onFiles={onFiles}
        hint="Drop one or more .webp files. Converts to JPG in your browser."
      />

      {items.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              {items.length} file{items.length === 1 ? "" : "s"} · {fmtBytes(totalSize)} total
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Clear all
            </button>
          </div>

          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Quality · {Math.round(quality * 100)}%
            </span>
            <input
              type="range"
              min={0.5}
              max={1}
              step={0.02}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full"
            />
          </label>

          <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {items.map((it) => {
              const outName = it.file.name.replace(/\.webp$/i, ".jpg");
              return (
                <li key={it.id} className="flex items-center gap-3 p-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{it.file.name}</p>
                    <p className="text-xs text-slate-500">
                      {fmtBytes(it.file.size)}
                      {it.status === "done" && it.outSize !== undefined && (
                        <>
                          {" → "}
                          <span className="text-emerald-700 font-medium">
                            {fmtBytes(it.outSize)}
                          </span>
                        </>
                      )}
                      {it.status === "converting" && <> · converting…</>}
                      {it.status === "error" && (
                        <> · <span className="text-rose-600">{it.error}</span></>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-1 text-sm">
                    {it.status === "done" && it.outUrl && (
                      <a
                        href={it.outUrl}
                        download={outName}
                        className="rounded-md bg-brand text-white px-3 py-1.5 text-xs font-semibold hover:bg-brand-dark"
                      >
                        Download
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => remove(it.id)}
                      className="rounded-md border border-rose-200 bg-white px-2 py-1 text-rose-600 hover:bg-rose-50"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={convertAll}
            disabled={busy || items.length === 0}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
          >
            {busy ? "Converting…" : `Convert all (${items.length})`}
          </button>
        </>
      )}
    </div>
  );
}
