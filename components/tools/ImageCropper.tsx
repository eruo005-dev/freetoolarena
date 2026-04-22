"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FileDrop, fmtBytes, loadImage } from "./ImageFormatConverter";

type Ratio = "free" | "1:1" | "4:5" | "16:9" | "9:16";

type Box = { x: number; y: number; w: number; h: number };

type DragMode =
  | null
  | { type: "move"; startX: number; startY: number; start: Box }
  | { type: "tl" | "tr" | "bl" | "br"; startX: number; startY: number; start: Box };

function parseRatio(r: Ratio): number | null {
  if (r === "free") return null;
  const [a, b] = r.split(":").map(Number);
  return a / b;
}

export function ImageCropper() {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [ratio, setRatio] = useState<Ratio>("free");
  const [box, setBox] = useState<Box>({ x: 0, y: 0, w: 0, h: 0 });
  const [displaySize, setDisplaySize] = useState({ w: 0, h: 0 });
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragRef = useRef<DragMode>(null);

  // Load file → image + preview URL.
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setErr(null);
    setOutUrl(null);
    setOutSize(null);
    loadImage(file)
      .then((i) => setImg(i))
      .catch((e: any) => setErr(e?.message || "Couldn't read image."));
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Compute display size (max 600w) and initial center 50% box.
  useEffect(() => {
    if (!img) return;
    const maxW = 600;
    const scale = Math.min(1, maxW / img.naturalWidth);
    const w = Math.round(img.naturalWidth * scale);
    const h = Math.round(img.naturalHeight * scale);
    setDisplaySize({ w, h });
    setBox({ x: w * 0.25, y: h * 0.25, w: w * 0.5, h: h * 0.5 });
  }, [img]);

  // Enforce aspect ratio when user changes it.
  useEffect(() => {
    const r = parseRatio(ratio);
    if (!r || displaySize.w === 0) return;
    setBox((b) => {
      // Keep center, adjust height to match ratio.
      const cx = b.x + b.w / 2;
      const cy = b.y + b.h / 2;
      let w = b.w;
      let h = w / r;
      if (h > displaySize.h) {
        h = displaySize.h;
        w = h * r;
      }
      let x = cx - w / 2;
      let y = cy - h / 2;
      x = Math.max(0, Math.min(displaySize.w - w, x));
      y = Math.max(0, Math.min(displaySize.h - h, y));
      return { x, y, w, h };
    });
  }, [ratio, displaySize.w, displaySize.h]);

  // Live crop preview to side canvas.
  useEffect(() => {
    if (!img || !previewCanvasRef.current || displaySize.w === 0) return;
    const r = displaySize.w === 0 ? 1 : img.naturalWidth / displaySize.w;
    const sx = Math.max(0, box.x * r);
    const sy = Math.max(0, box.y * r);
    const sw = Math.max(1, box.w * r);
    const sh = Math.max(1, box.h * r);
    const canvas = previewCanvasRef.current;
    const maxPrev = 240;
    const pScale = Math.min(1, maxPrev / Math.max(sw, sh));
    canvas.width = Math.max(1, Math.round(sw * pScale));
    canvas.height = Math.max(1, Math.round(sh * pScale));
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  }, [box, img, displaySize.w, displaySize.h]);

  function clamp(b: Box): Box {
    const r = parseRatio(ratio);
    let { x, y, w, h } = b;
    w = Math.max(10, w);
    h = Math.max(10, h);
    if (r) h = w / r;
    w = Math.min(w, displaySize.w);
    h = Math.min(h, displaySize.h);
    x = Math.max(0, Math.min(displaySize.w - w, x));
    y = Math.max(0, Math.min(displaySize.h - h, y));
    return { x, y, w, h };
  }

  function onPointerDown(e: React.PointerEvent, type: "move" | "tl" | "tr" | "bl" | "br") {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    dragRef.current = { type, startX: e.clientX, startY: e.clientY, start: { ...box } };
    e.stopPropagation();
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    const s = d.start;
    const r = parseRatio(ratio);
    let nb: Box = { ...s };
    if (d.type === "move") {
      nb.x = s.x + dx;
      nb.y = s.y + dy;
    } else {
      if (d.type === "tl") {
        nb.x = s.x + dx;
        nb.y = s.y + dy;
        nb.w = s.w - dx;
        nb.h = s.h - dy;
      } else if (d.type === "tr") {
        nb.y = s.y + dy;
        nb.w = s.w + dx;
        nb.h = s.h - dy;
      } else if (d.type === "bl") {
        nb.x = s.x + dx;
        nb.w = s.w - dx;
        nb.h = s.h + dy;
      } else if (d.type === "br") {
        nb.w = s.w + dx;
        nb.h = s.h + dy;
      }
      if (r) {
        // lock to ratio based on width
        nb.h = nb.w / r;
        if (d.type === "tl" || d.type === "tr") {
          nb.y = s.y + s.h - nb.h;
        }
      }
    }
    setBox(clamp(nb));
  }

  function onPointerUp() {
    dragRef.current = null;
  }

  async function exportCrop() {
    if (!img) return;
    setBusy(true);
    setErr(null);
    try {
      const r = img.naturalWidth / displaySize.w;
      const sx = Math.round(box.x * r);
      const sy = Math.round(box.y * r);
      const sw = Math.round(box.w * r);
      const sh = Math.round(box.h * r);
      const canvas = document.createElement("canvas");
      canvas.width = sw;
      canvas.height = sh;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D not supported.");
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob) throw new Error("Crop failed.");
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } catch (e: any) {
      setErr(e?.message || "Crop failed.");
    } finally {
      setBusy(false);
    }
  }

  const outName = useMemo(() => {
    if (!file) return "cropped.png";
    return file.name.replace(/\.[^.]+$/, "") + "-cropped.png";
  }, [file]);

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={setFile} accept="image/*" hint="Drop an image to crop." />

      {img && previewUrl && (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Aspect ratio
              </span>
              <select
                value={ratio}
                onChange={(e) => setRatio(e.target.value as Ratio)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="free">Free</option>
                <option value="1:1">1:1</option>
                <option value="4:5">4:5</option>
                <option value="16:9">16:9</option>
                <option value="9:16">9:16</option>
              </select>
            </label>
            <div className="flex items-end">
              <p className="text-sm text-slate-600">
                Source: <strong>{img.naturalWidth}×{img.naturalHeight}px</strong>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-4">
            <div
              ref={containerRef}
              className="relative select-none rounded-xl border border-slate-200 bg-slate-50 overflow-hidden"
              style={{ width: displaySize.w, height: displaySize.h, maxWidth: "100%" }}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="To crop"
                width={displaySize.w}
                height={displaySize.h}
                draggable={false}
                className="block"
              />
              {/* Dim outside the crop box using four overlay panels */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: `0 0 0 9999px rgba(15,23,42,0.45)`,
                  clipPath: `polygon(
                    0 0, 100% 0, 100% 100%, 0 100%, 0 0,
                    ${box.x}px ${box.y}px,
                    ${box.x}px ${box.y + box.h}px,
                    ${box.x + box.w}px ${box.y + box.h}px,
                    ${box.x + box.w}px ${box.y}px,
                    ${box.x}px ${box.y}px
                  )`,
                }}
              />
              {/* Crop rectangle */}
              <div
                className="absolute border-2 border-white shadow-[0_0_0_1px_rgba(15,23,42,0.6)] cursor-move"
                style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
                onPointerDown={(e) => onPointerDown(e, "move")}
              >
                {/* corner handles */}
                {(["tl", "tr", "bl", "br"] as const).map((corner) => {
                  const style: React.CSSProperties = {
                    position: "absolute",
                    width: 14,
                    height: 14,
                    background: "#fff",
                    border: "1px solid #0f172a",
                    borderRadius: 2,
                  };
                  if (corner === "tl") Object.assign(style, { left: -7, top: -7, cursor: "nwse-resize" });
                  if (corner === "tr") Object.assign(style, { right: -7, top: -7, cursor: "nesw-resize" });
                  if (corner === "bl") Object.assign(style, { left: -7, bottom: -7, cursor: "nesw-resize" });
                  if (corner === "br") Object.assign(style, { right: -7, bottom: -7, cursor: "nwse-resize" });
                  return (
                    <div
                      key={corner}
                      style={style}
                      onPointerDown={(e) => onPointerDown(e, corner)}
                    />
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Preview</p>
              <canvas
                ref={previewCanvasRef}
                className="rounded-lg border border-slate-200 bg-white max-w-full"
              />
              <p className="text-xs text-slate-500">
                {Math.round((box.w / displaySize.w) * img.naturalWidth)}×
                {Math.round((box.h / displaySize.h) * img.naturalHeight)}px
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={exportCrop}
            disabled={busy}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
          >
            {busy ? "Exporting…" : "Export cropped"}
          </button>
        </>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            Cropped PNG ready — <strong>{fmtBytes(outSize || 0)}</strong>
          </p>
          <a
            href={outUrl}
            download={outName}
            className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
