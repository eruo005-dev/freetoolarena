"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

type Out = { id: string; name: string; url: string; size: number };

export function HeicToJpg() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(0.9);
  const [format, setFormat] = useState<"jpeg" | "png">("jpeg");
  const [outputs, setOutputs] = useState<Out[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  async function onFiles(list: File[]) {
    // Keep anything HEIC/HEIF or with those extensions.
    const allowed = list.filter((f) =>
      /heic|heif/i.test(f.type) || /\.(heic|heif)$/i.test(f.name),
    );
    if (allowed.length === 0) {
      setErr("Pick at least one .heic or .heif file.");
      return;
    }
    setFiles(allowed);
    setErr(null);
  }

  async function convert() {
    if (!files.length) return;
    setBusy(true);
    setErr(null);
    outputs.forEach((o) => URL.revokeObjectURL(o.url));
    setOutputs([]);
    try {
      const heic2any: any = (await import("heic2any")).default;
      const out: Out[] = [];
      setProgress({ done: 0, total: files.length });
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const converted: Blob | Blob[] = await heic2any({
          blob: f,
          toType: `image/${format}`,
          quality,
        });
        const blob = Array.isArray(converted) ? converted[0] : converted;
        const ext = format === "jpeg" ? "jpg" : "png";
        out.push({
          id: `${i}-${f.name}`,
          name: f.name.replace(/\.(heic|heif)$/i, "") + `.${ext}`,
          url: URL.createObjectURL(blob),
          size: blob.size,
        });
        setProgress({ done: i + 1, total: files.length });
        await new Promise((r) => setTimeout(r, 0));
      }
      setOutputs(out);
    } catch (e: any) {
      setErr(
        e?.message ||
          "HEIC decode failed. Some iPhone HEIC variants can't be decoded in the browser — try a different export from Photos.",
      );
    } finally {
      setBusy(false);
      setProgress(null);
    }
  }

  return (
    <div className="space-y-5">
      <FileDrop
        accept=".heic,.heif,image/heic,image/heif"
        multiple
        onFiles={onFiles}
        hint=".heic or .heif files from iPhone. Drop multiple — they batch."
      />

      {files.length > 0 && (
        <>
          <p className="text-sm text-slate-600">
            {files.length} file{files.length === 1 ? "" : "s"} queued · total{" "}
            {fmtBytes(files.reduce((s, f) => s + f.size, 0))}
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Output format
              </span>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="jpeg">JPG</option>
                <option value="png">PNG (lossless)</option>
              </select>
            </label>
            {format === "jpeg" && (
              <label className="block">
                <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                  Quality · {Math.round(quality * 100)}%
                </span>
                <input
                  type="range"
                  min={0.5}
                  max={1}
                  step={0.05}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full"
                />
              </label>
            )}
          </div>

          <button
            type="button"
            onClick={convert}
            disabled={busy}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
          >
            {busy ? "Converting…" : `Convert ${files.length} file${files.length === 1 ? "" : "s"}`}
          </button>

          {progress && (
            <div className="rounded-lg bg-slate-100 overflow-hidden">
              <div
                className="h-2 bg-brand transition-all"
                style={{ width: `${(progress.done / progress.total) * 100}%` }}
              />
            </div>
          )}
        </>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {outputs.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-slate-700">
            {outputs.length} converted · total {fmtBytes(outputs.reduce((s, o) => s + o.size, 0))}
          </p>
          <ul className="space-y-2">
            {outputs.map((o) => (
              <li
                key={o.id}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={o.url} alt="" className="h-12 w-12 object-cover rounded border border-slate-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{o.name}</p>
                  <p className="text-xs text-slate-500">{fmtBytes(o.size)}</p>
                </div>
                <a
                  href={o.url}
                  download={o.name}
                  className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-slate-500">
        iPhone photos default to HEIC because it&rsquo;s smaller, but most sites and
        forms only accept JPG/PNG. This tool runs the conversion offline —
        your photos never leave the browser.
      </p>
    </div>
  );
}
