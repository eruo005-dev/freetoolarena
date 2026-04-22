"use client";

import { useEffect, useRef, useState } from "react";

type Ecc = "L" | "M" | "Q" | "H";

export function QrCodeGenerator() {
  const [data, setData] = useState("https://freetoolarena.com");
  const [size, setSize] = useState(512);
  const [ecc, setEcc] = useState<Ecc>("M");
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#FFFFFF");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const byteLen = new Blob([data]).size;
  const warn = byteLen > 900;

  useEffect(() => {
    let cancelled = false;
    async function render() {
      if (!canvasRef.current || !data) return;
      setBusy(true);
      setErr(null);
      try {
        const QRCode = (await import("qrcode")).default;
        if (cancelled) return;
        await QRCode.toCanvas(canvasRef.current, data, {
          width: size,
          errorCorrectionLevel: ecc,
          color: { dark: fg, light: bg },
          margin: 2,
        });
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Failed to render QR code.");
      } finally {
        if (!cancelled) setBusy(false);
      }
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [data, size, ecc, fg, bg]);

  async function downloadPng() {
    try {
      const QRCode = (await import("qrcode")).default;
      const url = await QRCode.toDataURL(data, {
        width: size,
        errorCorrectionLevel: ecc,
        color: { dark: fg, light: bg },
        margin: 2,
        type: "image/png",
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = "qr.png";
      a.click();
    } catch (e: any) {
      setErr(e?.message || "PNG download failed.");
    }
  }

  async function downloadSvg() {
    try {
      const QRCode = (await import("qrcode")).default;
      const svg = await QRCode.toString(data, {
        type: "svg",
        errorCorrectionLevel: ecc,
        color: { dark: fg, light: bg },
        margin: 2,
        width: size,
      });
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qr.svg";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (e: any) {
      setErr(e?.message || "SVG download failed.");
    }
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Data
        </span>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
        />
        <p className={`mt-1 text-xs ${warn ? "text-amber-600" : "text-slate-500"}`}>
          {byteLen} byte{byteLen === 1 ? "" : "s"}
          {warn && " — over 900 bytes: QR may be dense and hard to scan."}
        </p>
      </label>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Size · {size}px
          </span>
          <input
            type="range"
            min={128}
            max={1024}
            step={16}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Error correction
          </span>
          <select
            value={ecc}
            onChange={(e) => setEcc(e.target.value as Ecc)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            <option value="L">L — 7%</option>
            <option value="M">M — 15%</option>
            <option value="Q">Q — 25%</option>
            <option value="H">H — 30%</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Foreground
          </span>
          <input
            type="color"
            value={fg}
            onChange={(e) => setFg(e.target.value)}
            className="w-full h-10 rounded-lg border border-slate-300 bg-white px-1"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Background
          </span>
          <input
            type="color"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            className="w-full h-10 rounded-lg border border-slate-300 bg-white px-1"
          />
        </label>
      </div>

      {err && <p className="text-sm text-rose-600">{err}</p>}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col items-center gap-4">
        <canvas
          ref={canvasRef}
          className="max-w-full rounded-lg border border-slate-200 bg-white"
          style={{ maxHeight: 420 }}
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadPng}
            disabled={busy || !data}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
          >
            Download PNG
          </button>
          <button
            type="button"
            onClick={downloadSvg}
            disabled={busy || !data}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Download SVG
          </button>
        </div>
      </div>
    </div>
  );
}
