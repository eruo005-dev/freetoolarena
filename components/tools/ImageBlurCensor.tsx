"use client";

import { useEffect, useRef, useState } from "react";

type Box = { x: number; y: number; w: number; h: number };

export function ImageBlurCensor() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [mode, setMode] = useState<"blur" | "pixel" | "black">("blur");
  const [strength, setStrength] = useState(14);
  const displayRef = useRef<HTMLCanvasElement>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const dragBox = useRef<Box | null>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const i = new Image();
    i.onload = () => { setImg(i); setBoxes([]); };
    i.src = URL.createObjectURL(f);
  }

  function draw(toCanvas?: HTMLCanvasElement) {
    if (!img) return;
    const c = toCanvas ?? displayRef.current;
    if (!c) return;
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    for (const b of boxes) applyBox(c, b);
    if (!toCanvas && dragBox.current) {
      ctx.strokeStyle = "#dc2626";
      ctx.lineWidth = 3;
      const d = dragBox.current;
      ctx.strokeRect(d.x, d.y, d.w, d.h);
    }
  }

  function applyBox(c: HTMLCanvasElement, b: Box) {
    const ctx = c.getContext("2d")!;
    if (mode === "black") {
      ctx.fillStyle = "#000";
      ctx.fillRect(b.x, b.y, b.w, b.h);
    } else if (mode === "pixel") {
      const pix = Math.max(4, strength);
      const tmp = document.createElement("canvas");
      tmp.width = Math.max(1, Math.floor(b.w / pix));
      tmp.height = Math.max(1, Math.floor(b.h / pix));
      const tctx = tmp.getContext("2d")!;
      tctx.imageSmoothingEnabled = false;
      tctx.drawImage(c, b.x, b.y, b.w, b.h, 0, 0, tmp.width, tmp.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tmp, 0, 0, tmp.width, tmp.height, b.x, b.y, b.w, b.h);
      ctx.imageSmoothingEnabled = true;
    } else {
      ctx.save();
      ctx.filter = `blur(${strength}px)`;
      ctx.drawImage(c, b.x, b.y, b.w, b.h, b.x, b.y, b.w, b.h);
      ctx.restore();
    }
  }

  useEffect(() => { draw(); }, [img, boxes, mode, strength]);

  function pos(e: React.PointerEvent) {
    const c = displayRef.current!;
    const r = c.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (c.width / r.width), y: (e.clientY - r.top) * (c.height / r.height) };
  }

  function start(e: React.PointerEvent) {
    if (!img) return;
    dragStart.current = pos(e);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function move(e: React.PointerEvent) {
    if (!dragStart.current) return;
    const p = pos(e);
    dragBox.current = { x: Math.min(dragStart.current.x, p.x), y: Math.min(dragStart.current.y, p.y), w: Math.abs(p.x - dragStart.current.x), h: Math.abs(p.y - dragStart.current.y) };
    draw();
  }

  function end() {
    if (dragBox.current && dragBox.current.w > 4 && dragBox.current.h > 4) {
      setBoxes((b) => [...b, dragBox.current!]);
    }
    dragStart.current = null;
    dragBox.current = null;
  }

  function undo() { setBoxes((b) => b.slice(0, -1)); }
  function clear() { setBoxes([]); }

  function download() {
    const out = document.createElement("canvas");
    draw(out);
    out.toBlob((b) => {
      if (!b) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = "censored.png";
      a.click();
    }, "image/png");
  }

  return (
    <div className="space-y-5">
      <input type="file" accept="image/*" onChange={onFile} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark" />

      {img && (
        <>
          <div className="flex flex-wrap gap-3 items-center">
            <label className="flex items-center gap-2 text-sm">
              Mode
              <select value={mode} onChange={(e) => setMode(e.target.value as any)} className="rounded-lg border border-slate-300 px-2 py-1">
                <option value="blur">Blur</option>
                <option value="pixel">Pixelate</option>
                <option value="black">Black bar</option>
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm flex-1 min-w-[200px]">
              Strength
              <input type="range" min={2} max={40} value={strength} onChange={(e) => setStrength(parseInt(e.target.value))} className="flex-1 accent-brand" />
              <span className="tabular-nums text-xs w-6">{strength}</span>
            </label>
          </div>

          <div className="rounded-xl bg-slate-50 p-2 overflow-auto">
            <canvas ref={displayRef} onPointerDown={start} onPointerMove={move} onPointerUp={end} className="max-w-full cursor-crosshair touch-none border border-slate-200 rounded-lg" />
          </div>
          <p className="text-xs text-slate-500">Click and drag over any region you want to censor.</p>

          <div className="flex gap-2 flex-wrap">
            <button onClick={download} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">Download</button>
            <button onClick={undo} className="bg-slate-200 text-slate-800 font-semibold rounded-lg px-4 py-2 text-sm hover:bg-slate-300">Undo</button>
            <button onClick={clear} className="bg-slate-200 text-slate-800 font-semibold rounded-lg px-4 py-2 text-sm hover:bg-slate-300">Clear all</button>
          </div>
        </>
      )}
    </div>
  );
}
