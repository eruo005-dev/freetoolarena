"use client";

import { useEffect, useRef, useState } from "react";

export function SignatureDrawer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#111827");
  const [thickness, setThickness] = useState(3);
  const [bg, setBg] = useState<"transparent" | "white">("transparent");
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = c.clientWidth * 2;
    c.height = c.clientHeight * 2;
    const ctx = c.getContext("2d")!;
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  function pos(e: React.PointerEvent) {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function start(e: React.PointerEvent) {
    drawing.current = true;
    last.current = pos(e);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function move(e: React.PointerEvent) {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.moveTo(last.current!.x, last.current!.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  }

  function end() {
    drawing.current = false;
    last.current = null;
  }

  function clear() {
    const c = canvasRef.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
  }

  function download() {
    const src = canvasRef.current!;
    const out = document.createElement("canvas");
    out.width = src.width;
    out.height = src.height;
    const ctx = out.getContext("2d")!;
    if (bg === "white") { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, out.width, out.height); }
    ctx.drawImage(src, 0, 0);
    out.toBlob((b) => {
      if (!b) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = "signature.png";
      a.click();
    }, "image/png");
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 items-center">
        <label className="flex items-center gap-2 text-sm">Ink <input type="color" value={color} onChange={(e) => setColor(e.target.value)} /></label>
        <label className="flex items-center gap-2 text-sm">
          Thickness
          <input type="range" min={1} max={10} value={thickness} onChange={(e) => setThickness(parseInt(e.target.value))} className="accent-brand" />
          <span className="tabular-nums text-xs w-6">{thickness}</span>
        </label>
        <label className="flex items-center gap-2 text-sm">
          Background
          <select value={bg} onChange={(e) => setBg(e.target.value as any)} className="rounded-lg border border-slate-300 px-2 py-1">
            <option value="transparent">Transparent</option>
            <option value="white">White</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-2">
        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          className="w-full h-56 bg-white border border-slate-300 rounded-lg touch-none cursor-crosshair"
        />
      </div>

      <div className="flex gap-2">
        <button onClick={download} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">Download PNG</button>
        <button onClick={clear} className="bg-slate-200 text-slate-800 font-semibold rounded-lg px-4 py-2 text-sm hover:bg-slate-300">Clear</button>
      </div>
    </div>
  );
}
