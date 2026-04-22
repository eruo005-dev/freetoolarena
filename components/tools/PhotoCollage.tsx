"use client";

import { useEffect, useRef, useState } from "react";

type Layout = { cols: number; rows: number };
const LAYOUTS: Record<string, Layout> = {
  "2×1": { cols: 2, rows: 1 },
  "1×2": { cols: 1, rows: 2 },
  "2×2": { cols: 2, rows: 2 },
  "3×2": { cols: 3, rows: 2 },
  "3×3": { cols: 3, rows: 3 },
  "4×2": { cols: 4, rows: 2 },
};

export function PhotoCollage() {
  const [imgs, setImgs] = useState<HTMLImageElement[]>([]);
  const [layoutKey, setLayoutKey] = useState("2×2");
  const [gap, setGap] = useState(16);
  const [bg, setBg] = useState("#ffffff");
  const [size, setSize] = useState(1600);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const loaded = await Promise.all(
      files.map((f) => new Promise<HTMLImageElement>((res) => {
        const i = new Image();
        i.onload = () => res(i);
        i.src = URL.createObjectURL(f);
      })),
    );
    setImgs(loaded);
  }

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const lay = LAYOUTS[layoutKey];
    const aspect = lay.cols / lay.rows;
    c.width = size;
    c.height = Math.round(size / aspect);
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, c.width, c.height);
    const cellW = (c.width - gap * (lay.cols + 1)) / lay.cols;
    const cellH = (c.height - gap * (lay.rows + 1)) / lay.rows;
    let n = 0;
    for (let r = 0; r < lay.rows; r++) {
      for (let col = 0; col < lay.cols; col++) {
        const x = gap + col * (cellW + gap);
        const y = gap + r * (cellH + gap);
        const img = imgs[n++];
        if (!img) {
          ctx.fillStyle = "#f1f5f9";
          ctx.fillRect(x, y, cellW, cellH);
          continue;
        }
        const scale = Math.max(cellW / img.naturalWidth, cellH / img.naturalHeight);
        const w = img.naturalWidth * scale;
        const h = img.naturalHeight * scale;
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, cellW, cellH);
        ctx.clip();
        ctx.drawImage(img, x + (cellW - w) / 2, y + (cellH - h) / 2, w, h);
        ctx.restore();
      }
    }
  }, [imgs, layoutKey, gap, bg, size]);

  function download() {
    canvasRef.current?.toBlob((b) => {
      if (!b) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = "collage.jpg";
      a.click();
    }, "image/jpeg", 0.95);
  }

  return (
    <div className="space-y-5">
      <input type="file" accept="image/*" multiple onChange={onFile} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark" />

      <div className="grid sm:grid-cols-4 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Layout</span>
          <select value={layoutKey} onChange={(e) => setLayoutKey(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            {Object.keys(LAYOUTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Gap (px)</span>
          <input type="number" min={0} max={100} value={gap} onChange={(e) => setGap(parseInt(e.target.value) || 0)} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Background</span>
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full h-10 rounded-lg border border-slate-300" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Width (px)</span>
          <select value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value={1200}>1200</option><option value={1600}>1600</option><option value={2400}>2400</option><option value={3200}>3200</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-2 overflow-auto">
        <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-sm" />
      </div>

      <button onClick={download} disabled={imgs.length === 0} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark disabled:opacity-50">
        Download JPEG
      </button>
    </div>
  );
}
