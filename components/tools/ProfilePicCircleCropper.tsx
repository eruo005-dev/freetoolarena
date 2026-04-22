"use client";

import { useEffect, useRef, useState } from "react";

export function ProfilePicCircleCropper() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [ox, setOx] = useState(0);
  const [oy, setOy] = useState(0);
  const [size, setSize] = useState(512);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const i = new Image();
    i.onload = () => { setImg(i); setZoom(1); setOx(0); setOy(0); };
    i.src = URL.createObjectURL(f);
  }

  useEffect(() => {
    const c = canvasRef.current;
    if (!c || !img) return;
    c.width = size;
    c.height = size;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    const scale = (size / Math.min(img.naturalWidth, img.naturalHeight)) * zoom;
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (size - w) / 2 + ox, (size - h) / 2 + oy, w, h);
    ctx.restore();
  }, [img, zoom, ox, oy, size]);

  function download() {
    canvasRef.current?.toBlob((b) => {
      if (!b) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = `avatar-${size}.png`;
      a.click();
    }, "image/png");
  }

  return (
    <div className="space-y-5">
      <input type="file" accept="image/*" onChange={onFile} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark" />

      {img && (
        <>
          <div className="rounded-xl bg-[repeating-conic-gradient(#f1f5f9_0%_25%,#e2e8f0_0%_50%)] bg-[length:20px_20px] p-4 flex justify-center">
            <canvas ref={canvasRef} className="max-h-72 w-auto rounded-full shadow" />
          </div>

          <label className="block">
            <div className="flex items-baseline justify-between mb-1"><span className="text-sm font-medium">Zoom</span><span className="text-sm tabular-nums">{Math.round(zoom * 100)}%</span></div>
            <input type="range" min={50} max={400} value={zoom * 100} onChange={(e) => setZoom(parseInt(e.target.value) / 100)} className="w-full accent-brand" />
          </label>
          <div className="grid grid-cols-3 gap-3">
            <label className="block"><span className="text-xs text-slate-500">Offset X</span><input type="range" min={-400} max={400} value={ox} onChange={(e) => setOx(parseInt(e.target.value))} className="w-full accent-brand" /></label>
            <label className="block"><span className="text-xs text-slate-500">Offset Y</span><input type="range" min={-400} max={400} value={oy} onChange={(e) => setOy(parseInt(e.target.value))} className="w-full accent-brand" /></label>
            <label className="block">
              <span className="text-xs text-slate-500">Size (px)</span>
              <select value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full rounded-lg border border-slate-300 px-2 py-1 text-sm">
                <option value={128}>128</option><option value={256}>256</option><option value={400}>400</option><option value={512}>512</option><option value={1024}>1024</option>
              </select>
            </label>
          </div>

          <button onClick={download} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">Download PNG</button>
        </>
      )}
    </div>
  );
}
