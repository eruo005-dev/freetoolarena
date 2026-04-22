"use client";

import { useState } from "react";

async function stripExif(file: File): Promise<Blob> {
  const img = new Image();
  const url = URL.createObjectURL(file);
  await new Promise<void>((res, rej) => {
    img.onload = () => res();
    img.onerror = () => rej(new Error("load"));
    img.src = url;
  });
  const c = document.createElement("canvas");
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  c.getContext("2d")!.drawImage(img, 0, 0);
  URL.revokeObjectURL(url);
  return new Promise((res) => c.toBlob((b) => res(b!), "image/jpeg", 0.95));
}

export function ExifRemover() {
  const [original, setOriginal] = useState<File | null>(null);
  const [cleaned, setCleaned] = useState<{ url: string; size: number } | null>(null);
  const [busy, setBusy] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setOriginal(f);
    setCleaned(null);
    setBusy(true);
    try {
      const blob = await stripExif(f);
      setCleaned({ url: URL.createObjectURL(blob), size: blob.size });
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!cleaned || !original) return;
    const a = document.createElement("a");
    a.href = cleaned.url;
    a.download = original.name.replace(/\.(jpe?g|png|webp|gif)$/i, "") + "-clean.jpg";
    a.click();
  }

  return (
    <div className="space-y-5">
      <input type="file" accept="image/*" onChange={onFile} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark" />

      {busy && <p className="text-sm text-slate-500">Stripping metadata…</p>}

      {cleaned && original && (
        <>
          <div className="rounded-xl bg-slate-50 p-4 text-sm grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-500 mb-1">Original</div>
              <div>{original.name}</div>
              <div className="text-xs text-slate-500">{(original.size / 1024).toFixed(1)} KB (with metadata)</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Cleaned</div>
              <div>re-encoded JPEG</div>
              <div className="text-xs text-slate-500">{(cleaned.size / 1024).toFixed(1)} KB (no EXIF, no GPS)</div>
            </div>
          </div>
          <img src={cleaned.url} alt="clean" className="max-h-64 rounded-lg border border-slate-200" />
          <button onClick={download} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">
            Download clean image
          </button>
        </>
      )}
      <p className="text-xs text-slate-500">Canvas re-encode removes EXIF, GPS, camera model, and all embedded thumbnails. Runs entirely in your browser.</p>
    </div>
  );
}
