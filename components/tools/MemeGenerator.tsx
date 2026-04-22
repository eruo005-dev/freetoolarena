"use client";

import { useEffect, useRef, useState } from "react";

export function MemeGenerator() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [top, setTop] = useState("ONE DOES NOT SIMPLY");
  const [bottom, setBottom] = useState("SHIP 50 TOOLS IN A DAY");
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#ffffff");
  const [stroke, setStroke] = useState("#000000");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = URL.createObjectURL(f);
  }

  useEffect(() => {
    if (!img || !canvasRef.current) return;
    const c = canvasRef.current;
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const fs = (fontSize * c.width) / 600;
    ctx.font = `bold ${fs}px Impact, "Anton", "Arial Black", sans-serif`;
    ctx.textAlign = "center";
    ctx.lineWidth = Math.max(2, fs / 14);
    ctx.strokeStyle = stroke;
    ctx.fillStyle = color;
    ctx.lineJoin = "round";

    wrap(ctx, top.toUpperCase(), c.width / 2, fs * 1.1, c.width * 0.9, fs * 1.1);
    const bottomLines = measureLines(ctx, bottom.toUpperCase(), c.width * 0.9);
    wrap(ctx, bottom.toUpperCase(), c.width / 2, c.height - fs * 0.4 - (bottomLines - 1) * fs * 1.1, c.width * 0.9, fs * 1.1);
  }, [img, top, bottom, fontSize, color, stroke]);

  function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lineH: number) {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let cur = "";
    for (const w of words) {
      const test = cur ? cur + " " + w : w;
      if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; }
      else cur = test;
    }
    if (cur) lines.push(cur);
    lines.forEach((line, i) => {
      ctx.strokeText(line, x, y + i * lineH);
      ctx.fillText(line, x, y + i * lineH);
    });
  }

  function measureLines(ctx: CanvasRenderingContext2D, text: string, maxW: number): number {
    const words = text.split(/\s+/);
    let cur = "";
    let n = 1;
    for (const w of words) {
      const test = cur ? cur + " " + w : w;
      if (ctx.measureText(test).width > maxW && cur) { n++; cur = w; } else cur = test;
    }
    return n;
  }

  function download() {
    canvasRef.current?.toBlob((b) => {
      if (!b) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = "meme.jpg";
      a.click();
    }, "image/jpeg", 0.92);
  }

  return (
    <div className="space-y-5">
      <input type="file" accept="image/*" onChange={onFile} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark" />

      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Top text</span>
          <input value={top} onChange={(e) => setTop(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Bottom text</span>
          <input value={bottom} onChange={(e) => setBottom(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Font size</span>
          <input type="range" min={24} max={96} value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full accent-brand" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Fill</span>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 rounded-lg border border-slate-300" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Outline</span>
            <input type="color" value={stroke} onChange={(e) => setStroke(e.target.value)} className="w-full h-10 rounded-lg border border-slate-300" />
          </label>
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-2 overflow-auto">
        {img ? (
          <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-sm" />
        ) : (
          <p className="text-sm text-slate-500 py-12 text-center">Upload a template image to start.</p>
        )}
      </div>

      <button onClick={download} disabled={!img} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark disabled:opacity-50">
        Download meme
      </button>
    </div>
  );
}
