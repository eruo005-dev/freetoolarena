"use client";

import { useRef, useState } from "react";

const PRESETS: Array<{ name: string; w: number; h: number; dpi: number }> = [
  { name: "US Passport (2x2in)", w: 2, h: 2, dpi: 300 },
  { name: "UK Passport (35x45mm)", w: 35 / 25.4, h: 45 / 25.4, dpi: 300 },
  { name: "EU / Schengen (35x45mm)", w: 35 / 25.4, h: 45 / 25.4, dpi: 300 },
  { name: "India (35x45mm)", w: 35 / 25.4, h: 45 / 25.4, dpi: 300 },
  { name: "Canada (50x70mm)", w: 50 / 25.4, h: 70 / 25.4, dpi: 300 },
];

const BG_COLORS = [
  { name: "White", color: "#ffffff" },
  { name: "Off-white", color: "#f5f5f5" },
  { name: "Light blue", color: "#e6f0ff" },
  { name: "Light gray", color: "#e5e7eb" },
];

export function PassportPhotoMaker() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [preset, setPreset] = useState(0);
  const [bg, setBg] = useState("#ffffff");
  const [zoom, setZoom] = useState(1);
  const [ox, setOx] = useState(0);
  const [oy, setOy] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = URL.createObjectURL(f);
  }

  function render() {
    if (!img || !canvasRef.current) return;
    const p = PRESETS[preset];
    const c = canvasRef.current;
    c.width = Math.round(p.w * p.dpi);
    c.height = Math.round(p.h * p.dpi);
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, c.width, c.height);
    const scale = (c.width / img.naturalWidth) * zoom;
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (c.width - w) / 2 + ox, (c.height - h) / 2 + oy, w, h);
  }

  function download() {
    render();
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((b) => {
      if (!b) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = `passport-${PRESETS[preset].name.split(" ")[0].toLowerCase()}.jpg`;
      a.click();
    }, "image/jpeg", 0.95);
  }

  if (img) setTimeout(render, 0);

  return (
    <div className="space-y-5">
      <input type="file" accept="image/*" onChange={onFile} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark" />

      {img && (
        <>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Preset</span>
              <select value={preset} onChange={(e) => setPreset(parseInt(e.target.value))} className="w-full rounded-lg border border-slate-300 px-3 py-2">
                {PRESETS.map((p, i) => <option key={i} value={i}>{p.name}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Background</span>
              <div className="flex gap-2 pt-1">
                {BG_COLORS.map((b) => (
                  <button key={b.color} onClick={() => setBg(b.color)} className={`w-9 h-9 rounded-full border-2 ${bg === b.color ? "border-brand" : "border-slate-200"}`} style={{ backgroundColor: b.color }} title={b.name} />
                ))}
              </div>
            </label>
          </div>

          <label className="block">
            <div className="flex items-baseline justify-between mb-1"><span className="text-sm font-medium">Zoom</span><span className="text-sm tabular-nums">{Math.round(zoom * 100)}%</span></div>
            <input type="range" min={50} max={300} value={zoom * 100} onChange={(e) => setZoom(parseInt(e.target.value) / 100)} className="w-full accent-brand" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="text-xs text-slate-500">Offset X</span><input type="range" min={-200} max={200} value={ox} onChange={(e) => setOx(parseInt(e.target.value))} className="w-full accent-brand" /></label>
            <label className="block"><span className="text-xs text-slate-500">Offset Y</span><input type="range" min={-200} max={200} value={oy} onChange={(e) => setOy(parseInt(e.target.value))} className="w-full accent-brand" /></label>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 flex justify-center">
            <canvas ref={canvasRef} className="max-h-80 border border-slate-200 rounded-lg shadow-sm" />
          </div>

          <button onClick={download} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">
            Download JPEG (300 DPI)
          </button>
        </>
      )}
    </div>
  );
}
