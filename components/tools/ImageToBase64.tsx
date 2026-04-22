"use client";

import { useState } from "react";

export function ImageToBase64() {
  const [dataUrl, setDataUrl] = useState("");
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setName(f.name);
    const reader = new FileReader();
    reader.onload = () => setDataUrl(String(reader.result));
    reader.readAsDataURL(f);
  }

  function copy() {
    navigator.clipboard?.writeText(dataUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const size = dataUrl ? new Blob([dataUrl]).size : 0;

  return (
    <div className="space-y-5">
      <input
        type="file"
        accept="image/*"
        onChange={onFile}
        className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark"
      />

      {dataUrl && (
        <>
          <div className="rounded-xl bg-slate-50 p-4 space-y-2">
            <div className="text-xs text-slate-500">
              {name} — {(size / 1024).toFixed(1)} KB data URL
            </div>
            <img src={dataUrl} alt="preview" className="max-h-48 rounded-lg border border-slate-200" />
          </div>

          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Data URL (paste into CSS / HTML / email)</span>
            <textarea
              readOnly
              value={dataUrl}
              rows={6}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs bg-slate-50"
            />
          </label>

          <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">
            {copied ? "Copied" : "Copy data URL"}
          </button>
        </>
      )}
    </div>
  );
}
