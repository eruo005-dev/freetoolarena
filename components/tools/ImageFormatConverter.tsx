"use client";

import { useState, useEffect } from "react";

type Format = "jpeg" | "png" | "webp";

export function ImageFormatConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [format, setFormat] = useState<Format>("webp");
  const [quality, setQuality] = useState(0.9);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setOutUrl(null);
    setOutSize(null);
    setErr(null);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function convert() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D not supported in this browser.");
      // For JPEG, flatten transparency onto white.
      if (format === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, `image/${format}`, quality),
      );
      if (!blob) throw new Error("Conversion failed — your browser may not support this format.");
      if (outUrl) URL.revokeObjectURL(outUrl);
      const url = URL.createObjectURL(blob);
      setOutUrl(url);
      setOutSize(blob.size);
    } catch (e: any) {
      setErr(e.message || "Conversion failed.");
    } finally {
      setBusy(false);
    }
  }

  const ext = format === "jpeg" ? "jpg" : format;
  const outName = file ? file.name.replace(/\.[^.]+$/, "") + `.${ext}` : `image.${ext}`;

  return (
    <div className="space-y-5">
      <FileDrop
        file={file}
        onFile={setFile}
        accept="image/*"
        hint="JPG, PNG, WebP, GIF, BMP — anything your browser can decode."
      />

      {previewUrl && (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Output format
              </span>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as Format)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="webp">WebP (smallest)</option>
                <option value="jpeg">JPG</option>
                <option value="png">PNG (lossless)</option>
              </select>
            </label>
            {format !== "png" && (
              <label className="block">
                <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                  Quality · {Math.round(quality * 100)}%
                </span>
                <input
                  type="range"
                  min={0.3}
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
            {busy ? "Converting…" : `Convert to ${format.toUpperCase()}`}
          </button>
        </>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-slate-600">
              <strong>{fmtBytes(outSize || 0)}</strong>
              {file && (
                <span className="text-slate-500">
                  {" · original "}
                  {fmtBytes(file.size)}
                </span>
              )}
            </p>
            <a
              href={outUrl}
              download={outName}
              className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
            >
              Download
            </a>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={outUrl}
            alt="Converted output"
            className="max-h-72 rounded-lg border border-slate-200 bg-white"
          />
        </div>
      )}
    </div>
  );
}

// ---------- shared helpers (also used by other image tools) ----------

export function FileDrop({
  file,
  onFile,
  accept,
  hint,
  multiple = false,
  onFiles,
}: {
  file?: File | null;
  onFile?: (f: File) => void;
  onFiles?: (f: File[]) => void;
  accept: string;
  hint?: string;
  multiple?: boolean;
}) {
  const [over, setOver] = useState(false);

  function handleFiles(list: FileList | null | undefined) {
    if (!list || !list.length) return;
    if (multiple && onFiles) onFiles(Array.from(list));
    else if (onFile) onFile(list[0]);
  }

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        handleFiles(e.dataTransfer?.files);
      }}
      className={`block rounded-xl border-2 border-dashed px-4 py-6 text-center cursor-pointer transition ${
        over ? "border-brand bg-brand/5" : "border-slate-300 bg-slate-50 hover:bg-slate-100"
      }`}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="sr-only"
      />
      {file ? (
        <>
          <p className="text-sm font-medium text-slate-900">{file.name}</p>
          <p className="text-xs text-slate-500">{fmtBytes(file.size)} — click or drop to replace</p>
        </>
      ) : (
        <>
          <p className="text-sm font-medium text-slate-800">Drop a file or click to choose</p>
          {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
        </>
      )}
    </label>
  );
}

export function loadImage(file: File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Couldn't decode the image — is the file corrupt?"));
    };
    img.src = url;
  });
}

export function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}
