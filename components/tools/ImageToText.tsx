"use client";

import { useState } from "react";

export function ImageToText() {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [lang, setLang] = useState("eng");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    setText("");
    setProgress(0);
    setStage("loading engine");
    try {
      const Tess = (await import("tesseract.js")).default as any;
      const worker = await Tess.createWorker(lang, 1, {
        logger: (m: any) => {
          setStage(m.status || "");
          if (typeof m.progress === "number") setProgress(Math.round(m.progress * 100));
        },
      });
      const { data } = await worker.recognize(f);
      setText(data.text);
      await worker.terminate();
    } catch (err: any) {
      setText(`Error: ${err?.message ?? err}`);
    } finally {
      setBusy(false);
      setStage("");
    }
  }

  function copy() {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 items-center">
        <label className="flex items-center gap-2 text-sm">
          Language
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="rounded-lg border border-slate-300 px-2 py-1">
            <option value="eng">English</option>
            <option value="spa">Spanish</option>
            <option value="fra">French</option>
            <option value="deu">German</option>
            <option value="por">Portuguese</option>
            <option value="ita">Italian</option>
            <option value="nld">Dutch</option>
            <option value="pol">Polish</option>
            <option value="rus">Russian</option>
            <option value="jpn">Japanese</option>
            <option value="chi_sim">Chinese (Simplified)</option>
            <option value="chi_tra">Chinese (Traditional)</option>
            <option value="kor">Korean</option>
            <option value="ara">Arabic</option>
            <option value="hin">Hindi</option>
          </select>
        </label>
      </div>

      <input type="file" accept="image/*" onChange={onFile} disabled={busy} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark disabled:opacity-50" />

      {busy && (
        <div className="rounded-xl bg-slate-50 p-4 text-sm">
          <div className="flex justify-between text-xs text-slate-500 mb-1"><span>{stage}</span><span>{progress}%</span></div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-brand transition-all" style={{ width: `${progress}%` }} /></div>
        </div>
      )}

      {text && (
        <>
          <textarea readOnly value={text} rows={14} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-slate-50" />
          <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">{copied ? "Copied" : "Copy text"}</button>
        </>
      )}

      <p className="text-xs text-slate-500">OCR runs entirely in your browser via Tesseract WebAssembly. First run downloads the language pack (~10MB); later runs are instant.</p>
    </div>
  );
}
