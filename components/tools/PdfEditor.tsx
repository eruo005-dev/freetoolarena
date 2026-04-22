"use client";

/**
 * Traditional PDF editor — WYSIWYG click-to-place, drag-to-move.
 *
 * Tools:
 *   • Text        — click to place editable text
 *   • Signature   — draw in a popup, then place as an image
 *   • Image       — upload PNG/JPG, click to place
 *   • Rectangle   — drag to draw a solid black box
 *   • Highlight   — drag to draw a translucent yellow box
 *   • Line        — drag to draw a straight line
 *   • Checkmark   — click to place a ✓
 *   • Date        — click to place today's date as text
 *
 * Elements are stored in fractional coords (0..1 of page size) so saving is
 * resolution-independent. Save composites every element onto the original
 * PDF with pdf-lib (no rasterization — text stays selectable).
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

type ToolKind =
  | "select"
  | "text"
  | "signature"
  | "image"
  | "rectangle"
  | "highlight"
  | "line"
  | "checkmark"
  | "date";

type BaseEl = {
  id: string;
  pageIndex: number;
  kind: Exclude<ToolKind, "select" | "signature" | "image"> | "signature" | "image";
};

type TextEl = BaseEl & {
  kind: "text" | "date" | "checkmark";
  text: string;
  x: number; // fraction of page width [0..1], top-left
  y: number; // fraction of page height [0..1], measured from top
  size: number; // font points at 100% page
  color: string; // hex
  bold?: boolean;
};

type ImgEl = BaseEl & {
  kind: "image" | "signature";
  src: string; // data URL
  x: number; y: number; w: number; h: number;
};

type RectEl = BaseEl & {
  kind: "rectangle" | "highlight";
  x: number; y: number; w: number; h: number;
  color: string;
  opacity: number;
};

type LineEl = BaseEl & {
  kind: "line";
  x1: number; y1: number; x2: number; y2: number;
  color: string;
  thickness: number;
};

type Element = TextEl | ImgEl | RectEl | LineEl;

function uid() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = h.length === 3
    ? h.split("").map((c) => c + c).join("")
    : h;
  const r = parseInt(n.slice(0, 2), 16) / 255;
  const g = parseInt(n.slice(2, 4), 16) / 255;
  const b = parseInt(n.slice(4, 6), 16) / 255;
  return [isNaN(r) ? 0 : r, isNaN(g) ? 0 : g, isNaN(b) ? 0 : b];
}

export function PdfEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<{ url: string; w: number; h: number }[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [elements, setElements] = useState<Element[]>([]);
  const [tool, setTool] = useState<ToolKind>("select");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sigOpen, setSigOpen] = useState(false);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const dragEl = useRef<{ id: string; offX: number; offY: number } | null>(null);
  const imgInputRef = useRef<HTMLInputElement | null>(null);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      pages.forEach((p) => URL.revokeObjectURL(p.url));
      if (outUrl) URL.revokeObjectURL(outUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onPick(f: File) {
    pages.forEach((p) => URL.revokeObjectURL(p.url));
    if (outUrl) URL.revokeObjectURL(outUrl);
    setFile(f);
    setPages([]);
    setElements([]);
    setPageIndex(0);
    setSelectedId(null);
    setOutUrl(null);
    setOutSize(null);
    setErr(null);
    setLoading(true);
    try {
      const pdfjs: any = await import("pdfjs-dist/legacy/build/pdf.js");
      pdfjs.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      const buf = await f.arrayBuffer();
      const doc = await pdfjs.getDocument({ data: buf }).promise;
      const out: { url: string; w: number; h: number }[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const vp = page.getViewport({ scale: 1.5 });
        const c = document.createElement("canvas");
        c.width = Math.ceil(vp.width);
        c.height = Math.ceil(vp.height);
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, c.width, c.height);
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        const blob: Blob | null = await new Promise((r) =>
          c.toBlob((b) => r(b), "image/png"),
        );
        if (blob) out.push({ url: URL.createObjectURL(blob), w: c.width, h: c.height });
        await new Promise((r) => setTimeout(r, 0));
      }
      setPages(out);
    } catch (e: any) {
      const msg = (e?.message || "") as string;
      setErr(
        /encrypt/i.test(msg)
          ? "This PDF is password-protected. Unlock it first, then try again."
          : msg || "Could not open PDF.",
      );
    } finally {
      setLoading(false);
    }
  }

  // ---- Stage interaction ----

  function stageCoords(e: React.MouseEvent) {
    const r = stageRef.current!.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
      rect: r,
    };
  }

  function onStageMouseDown(e: React.MouseEvent) {
    if (!stageRef.current) return;
    const { x, y } = stageCoords(e);
    if (tool === "rectangle" || tool === "highlight" || tool === "line") {
      dragStart.current = { x, y };
      return;
    }
    if (tool === "text") {
      addText(x, y, "Text", 16, "#111111");
      setTool("select");
      return;
    }
    if (tool === "checkmark") {
      addText(x, y, "✓", 32, "#16a34a", true);
      setTool("select");
      return;
    }
    if (tool === "date") {
      const today = new Date().toISOString().slice(0, 10);
      addText(x, y, today, 14, "#111111");
      setTool("select");
      return;
    }
    if (tool === "image" && pendingImage) {
      addImage(pendingImage, x, y, 0.2, 0.2, "image");
      setPendingImage(null);
      setTool("select");
      return;
    }
    if (tool === "signature") {
      setSigOpen(true);
      return;
    }
    // select mode: click empty area deselects
    setSelectedId(null);
  }

  function onStageMouseUp(e: React.MouseEvent) {
    if (!stageRef.current) return;
    const { x, y } = stageCoords(e);
    const start = dragStart.current;
    dragStart.current = null;
    if (!start) {
      dragEl.current = null;
      return;
    }
    if (tool === "rectangle" || tool === "highlight") {
      const w = Math.abs(x - start.x);
      const h = Math.abs(y - start.y);
      if (w < 0.01 || h < 0.01) return;
      const el: RectEl = {
        id: uid(),
        pageIndex,
        kind: tool,
        x: Math.min(start.x, x),
        y: Math.min(start.y, y),
        w, h,
        color: tool === "highlight" ? "#fde047" : "#111111",
        opacity: tool === "highlight" ? 0.35 : 1,
      };
      setElements((p) => [...p, el]);
      setSelectedId(el.id);
      setTool("select");
      return;
    }
    if (tool === "line") {
      const dx = x - start.x;
      const dy = y - start.y;
      if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) return;
      const el: LineEl = {
        id: uid(),
        pageIndex,
        kind: "line",
        x1: start.x, y1: start.y, x2: x, y2: y,
        color: "#111111",
        thickness: 2,
      };
      setElements((p) => [...p, el]);
      setSelectedId(el.id);
      setTool("select");
      return;
    }
  }

  function onStageMouseMove(e: React.MouseEvent) {
    if (!dragEl.current || !stageRef.current) return;
    const { x, y } = stageCoords(e);
    const { id, offX, offY } = dragEl.current;
    setElements((prev) =>
      prev.map((el) => {
        if (el.id !== id) return el;
        if (el.kind === "line") {
          const l = el as LineEl;
          const dx = x - offX;
          const dy = y - offY;
          return {
            ...l,
            x1: l.x1 + dx, y1: l.y1 + dy,
            x2: l.x2 + dx, y2: l.y2 + dy,
          };
        }
        const nx = Math.max(0, Math.min(1, x - offX));
        const ny = Math.max(0, Math.min(1, y - offY));
        return { ...el, x: nx, y: ny } as Element;
      }),
    );
    // keep the drag origin fresh for line-mode relative movement
    if (dragEl.current) {
      dragEl.current = { id: dragEl.current.id, offX: x, offY: y };
    }
  }

  function startElementDrag(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    if (tool !== "select") return;
    const { x, y } = stageCoords(e);
    const el = elements.find((x) => x.id === id);
    if (!el) return;
    setSelectedId(id);
    if ("x1" in el) {
      dragEl.current = { id, offX: x, offY: y };
    } else if ("x" in el) {
      dragEl.current = { id, offX: x - el.x, offY: y - el.y };
    }
    dragStart.current = null;
  }

  // ---- Element mutators ----

  function addText(x: number, y: number, text: string, size: number, color: string, bold = false) {
    const el: TextEl = {
      id: uid(), pageIndex, kind: "text", text, x, y, size, color, bold,
    };
    setElements((p) => [...p, el]);
    setSelectedId(el.id);
  }
  function addImage(src: string, x: number, y: number, w: number, h: number, kind: "image" | "signature") {
    const el: ImgEl = { id: uid(), pageIndex, kind, src, x, y, w, h };
    setElements((p) => [...p, el]);
    setSelectedId(el.id);
  }
  function patchElement(id: string, patch: Partial<Element>) {
    setElements((prev) => prev.map((e) => (e.id === id ? ({ ...e, ...patch } as Element) : e)));
  }
  function removeElement(id: string) {
    setElements((prev) => prev.filter((e) => e.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  // ---- Image upload ----

  function onImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPendingImage(String(reader.result));
      setTool("image");
    };
    reader.readAsDataURL(f);
    e.target.value = "";
  }

  // ---- Save via pdf-lib ----

  async function save() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: false });
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
      const docPages = doc.getPages();

      // Embed images once, keyed by data URL
      const embeds = new Map<string, any>();
      for (const el of elements) {
        if ((el.kind === "image" || el.kind === "signature") && !embeds.has((el as ImgEl).src)) {
          const src = (el as ImgEl).src;
          const comma = src.indexOf(",");
          const raw = src.slice(comma + 1);
          const bin = Uint8Array.from(atob(raw), (c) => c.charCodeAt(0));
          const isPng = src.startsWith("data:image/png");
          embeds.set(src, isPng ? await doc.embedPng(bin) : await doc.embedJpg(bin));
        }
      }

      for (const el of elements) {
        const p = docPages[el.pageIndex];
        if (!p) continue;
        const { width: W, height: H } = p.getSize();
        if (el.kind === "text" || el.kind === "date" || el.kind === "checkmark") {
          const t = el as TextEl;
          const [r, g, b] = hexToRgb(t.color);
          p.drawText(t.text, {
            x: t.x * W,
            y: H - t.y * H - t.size,
            size: t.size,
            font: t.bold ? fontBold : font,
            color: rgb(r, g, b),
          });
        } else if (el.kind === "rectangle" || el.kind === "highlight") {
          const r = el as RectEl;
          const [cr, cg, cb] = hexToRgb(r.color);
          p.drawRectangle({
            x: r.x * W,
            y: H - r.y * H - r.h * H,
            width: r.w * W,
            height: r.h * H,
            color: rgb(cr, cg, cb),
            opacity: r.opacity,
          });
        } else if (el.kind === "line") {
          const l = el as LineEl;
          const [cr, cg, cb] = hexToRgb(l.color);
          p.drawLine({
            start: { x: l.x1 * W, y: H - l.y1 * H },
            end:   { x: l.x2 * W, y: H - l.y2 * H },
            thickness: l.thickness,
            color: rgb(cr, cg, cb),
          });
        } else if (el.kind === "image" || el.kind === "signature") {
          const im = el as ImgEl;
          const embed = embeds.get(im.src);
          if (!embed) continue;
          p.drawImage(embed, {
            x: im.x * W,
            y: H - im.y * H - im.h * H,
            width: im.w * W,
            height: im.h * H,
          });
        }
      }

      const b = await doc.save();
      const blob = new Blob([b], { type: "application/pdf" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } catch (e: any) {
      const msg = (e?.message || "") as string;
      setErr(
        /encrypt/i.test(msg)
          ? "This PDF is password-protected. Unlock it first, then try again."
          : msg || "Save failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  const baseName = (file?.name || "document").replace(/\.pdf$/i, "");
  const currentPage = pages[pageIndex];
  const selected = useMemo(
    () => elements.find((e) => e.id === selectedId) || null,
    [elements, selectedId],
  );

  const toolBtn = (k: ToolKind, label: string, icon: string) => (
    <button
      type="button"
      onClick={() => {
        if (k === "image") {
          imgInputRef.current?.click();
          return;
        }
        setTool(k);
        setSelectedId(null);
      }}
      className={`rounded-md border px-2 py-1 text-sm font-medium flex items-center gap-1 ${
        tool === k
          ? "border-brand bg-brand text-white"
          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
      }`}
      title={label}
    >
      <span aria-hidden>{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="space-y-5">
      <FileDrop
        file={file}
        onFile={onPick}
        accept="application/pdf,.pdf"
        hint="Open a PDF, then click on the page to place text, shapes, signatures, or images."
      />
      <input
        ref={imgInputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={onImageUpload}
      />

      {loading && <p className="text-sm text-slate-600">Opening PDF…</p>}
      {err && <p className="text-sm text-rose-600">{err}</p>}

      {pages.length > 0 && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            {toolBtn("select", "Select", "↖")}
            {toolBtn("text", "Text", "T")}
            {toolBtn("signature", "Signature", "✍")}
            {toolBtn("image", "Image", "🖼")}
            {toolBtn("rectangle", "Rectangle", "▭")}
            {toolBtn("highlight", "Highlight", "▓")}
            {toolBtn("line", "Line", "╱")}
            {toolBtn("checkmark", "Checkmark", "✓")}
            {toolBtn("date", "Date", "📅")}
          </div>

          {pages.length > 1 && (
            <div className="flex items-center gap-2 text-sm">
              <button
                type="button"
                onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
                className="rounded-md border border-slate-300 bg-white px-2 py-1 hover:bg-slate-50"
                disabled={pageIndex === 0}
              >
                ← Prev
              </button>
              <span>Page {pageIndex + 1} of {pages.length}</span>
              <button
                type="button"
                onClick={() => setPageIndex((p) => Math.min(pages.length - 1, p + 1))}
                className="rounded-md border border-slate-300 bg-white px-2 py-1 hover:bg-slate-50"
                disabled={pageIndex === pages.length - 1}
              >
                Next →
              </button>
            </div>
          )}

          {currentPage && (
            <div
              ref={stageRef}
              className={`relative border border-slate-300 select-none ${
                tool === "select" ? "cursor-default" : "cursor-crosshair"
              }`}
              style={{ aspectRatio: `${currentPage.w} / ${currentPage.h}` }}
              onMouseDown={onStageMouseDown}
              onMouseUp={onStageMouseUp}
              onMouseMove={onStageMouseMove}
              onMouseLeave={() => { dragEl.current = null; dragStart.current = null; }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentPage.url}
                alt={`page ${pageIndex + 1}`}
                draggable={false}
                className="block w-full h-full pointer-events-none"
              />
              {elements.filter((e) => e.pageIndex === pageIndex).map((el) => {
                const isSel = el.id === selectedId;
                if (el.kind === "text" || el.kind === "date" || el.kind === "checkmark") {
                  const t = el as TextEl;
                  return (
                    <div
                      key={t.id}
                      onMouseDown={(e) => startElementDrag(e, t.id)}
                      onDoubleClick={() => setSelectedId(t.id)}
                      style={{
                        position: "absolute",
                        left: `${t.x * 100}%`,
                        top: `${t.y * 100}%`,
                        color: t.color,
                        fontSize: `calc(${t.size}px * (100% / ${currentPage.w}px))`,
                        fontWeight: t.bold ? 700 : 400,
                        fontFamily: "Helvetica, Arial, sans-serif",
                        lineHeight: 1,
                        whiteSpace: "pre",
                        cursor: tool === "select" ? "move" : "default",
                      }}
                      className={isSel ? "outline outline-2 outline-brand/60" : ""}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          // Approximate the font size relative to stage width
                          fontSize: `${(t.size / currentPage.w) * 100}cqw`,
                        }}
                      >
                        {t.text}
                      </span>
                    </div>
                  );
                }
                if (el.kind === "rectangle" || el.kind === "highlight") {
                  const r = el as RectEl;
                  return (
                    <div
                      key={r.id}
                      onMouseDown={(e) => startElementDrag(e, r.id)}
                      style={{
                        position: "absolute",
                        left: `${r.x * 100}%`,
                        top: `${r.y * 100}%`,
                        width: `${r.w * 100}%`,
                        height: `${r.h * 100}%`,
                        background: r.color,
                        opacity: r.opacity,
                        cursor: tool === "select" ? "move" : "default",
                      }}
                      className={isSel ? "outline outline-2 outline-brand" : ""}
                    />
                  );
                }
                if (el.kind === "line") {
                  const l = el as LineEl;
                  return (
                    <svg
                      key={l.id}
                      onMouseDown={(e) => startElementDrag(e, l.id)}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                      }}
                    >
                      <line
                        x1={`${l.x1 * 100}%`} y1={`${l.y1 * 100}%`}
                        x2={`${l.x2 * 100}%`} y2={`${l.y2 * 100}%`}
                        stroke={l.color}
                        strokeWidth={l.thickness}
                        style={{ pointerEvents: "stroke", cursor: tool === "select" ? "move" : "default" }}
                      />
                    </svg>
                  );
                }
                if (el.kind === "image" || el.kind === "signature") {
                  const im = el as ImgEl;
                  return (
                    <div
                      key={im.id}
                      onMouseDown={(e) => startElementDrag(e, im.id)}
                      style={{
                        position: "absolute",
                        left: `${im.x * 100}%`,
                        top: `${im.y * 100}%`,
                        width: `${im.w * 100}%`,
                        height: `${im.h * 100}%`,
                        cursor: tool === "select" ? "move" : "default",
                      }}
                      className={isSel ? "outline outline-2 outline-brand" : ""}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={im.src} alt="" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}

          {/* Properties panel for selected element */}
          {selected && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">
                  Selected: {selected.kind}
                </p>
                <button
                  type="button"
                  onClick={() => removeElement(selected.id)}
                  className="rounded-md border border-rose-200 text-rose-600 px-2 py-1 text-xs hover:bg-rose-50"
                >
                  Delete
                </button>
              </div>
              {(selected.kind === "text" || selected.kind === "date" || selected.kind === "checkmark") && (
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 text-sm items-center">
                  <input
                    value={(selected as TextEl).text}
                    onChange={(e) => patchElement(selected.id, { text: e.target.value } as any)}
                    className="sm:col-span-3 rounded-md border border-slate-300 px-2 py-1"
                    placeholder="Text"
                  />
                  <label className="flex items-center gap-1 text-xs text-slate-600">
                    Size
                    <input
                      type="number" min={6} max={144} step={1}
                      value={(selected as TextEl).size}
                      onChange={(e) => patchElement(selected.id, { size: Math.max(6, Math.min(144, Number(e.target.value))) } as any)}
                      className="w-full rounded-md border border-slate-300 px-2 py-1"
                    />
                  </label>
                  <label className="flex items-center gap-1 text-xs text-slate-600">
                    Color
                    <input
                      type="color"
                      value={(selected as TextEl).color}
                      onChange={(e) => patchElement(selected.id, { color: e.target.value } as any)}
                      className="h-8 w-10 rounded border border-slate-300"
                    />
                  </label>
                  <label className="flex items-center gap-1 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={!!(selected as TextEl).bold}
                      onChange={(e) => patchElement(selected.id, { bold: e.target.checked } as any)}
                    />
                    Bold
                  </label>
                </div>
              )}
              {(selected.kind === "rectangle" || selected.kind === "highlight") && (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm items-center">
                  <label className="flex items-center gap-1 text-xs text-slate-600">
                    Color
                    <input
                      type="color"
                      value={(selected as RectEl).color}
                      onChange={(e) => patchElement(selected.id, { color: e.target.value } as any)}
                      className="h-8 w-10 rounded border border-slate-300"
                    />
                  </label>
                  <label className="flex items-center gap-1 text-xs text-slate-600">
                    Opacity
                    <input
                      type="range" min={0.1} max={1} step={0.05}
                      value={(selected as RectEl).opacity}
                      onChange={(e) => patchElement(selected.id, { opacity: Number(e.target.value) } as any)}
                      className="w-full"
                    />
                  </label>
                </div>
              )}
              {selected.kind === "line" && (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm items-center">
                  <label className="flex items-center gap-1 text-xs text-slate-600">
                    Color
                    <input
                      type="color"
                      value={(selected as LineEl).color}
                      onChange={(e) => patchElement(selected.id, { color: e.target.value } as any)}
                      className="h-8 w-10 rounded border border-slate-300"
                    />
                  </label>
                  <label className="flex items-center gap-1 text-xs text-slate-600">
                    Thickness
                    <input
                      type="number" min={1} max={20} step={1}
                      value={(selected as LineEl).thickness}
                      onChange={(e) => patchElement(selected.id, { thickness: Math.max(1, Math.min(20, Number(e.target.value))) } as any)}
                      className="w-full rounded-md border border-slate-300 px-2 py-1"
                    />
                  </label>
                </div>
              )}
              {(selected.kind === "image" || selected.kind === "signature") && (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm items-center">
                  <label className="flex items-center gap-1 text-xs text-slate-600">
                    Width %
                    <input
                      type="number" min={1} max={100} step={1}
                      value={Math.round((selected as ImgEl).w * 100)}
                      onChange={(e) => patchElement(selected.id, { w: Math.max(0.01, Math.min(1, Number(e.target.value) / 100)) } as any)}
                      className="w-full rounded-md border border-slate-300 px-2 py-1"
                    />
                  </label>
                  <label className="flex items-center gap-1 text-xs text-slate-600">
                    Height %
                    <input
                      type="number" min={1} max={100} step={1}
                      value={Math.round((selected as ImgEl).h * 100)}
                      onChange={(e) => patchElement(selected.id, { h: Math.max(0.01, Math.min(1, Number(e.target.value) / 100)) } as any)}
                      className="w-full rounded-md border border-slate-300 px-2 py-1"
                    />
                  </label>
                </div>
              )}
            </div>
          )}

          <p className="text-xs text-slate-500">
            {elements.length} element{elements.length === 1 ? "" : "s"} across all pages.
            {tool !== "select" && ` — ${tool} mode active, click the page to place.`}
          </p>

          <button
            type="button"
            onClick={save}
            disabled={busy || elements.length === 0}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
          >
            {busy ? "Saving…" : "Save edited PDF"}
          </button>
        </>
      )}

      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            Edited PDF ready — <strong>{fmtBytes(outSize || 0)}</strong>
          </p>
          <a
            href={outUrl}
            download={`${baseName}-edited.pdf`}
            className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download
          </a>
        </div>
      )}

      {sigOpen && (
        <SignaturePad
          onClose={() => setSigOpen(false)}
          onSave={(dataUrl) => {
            setSigOpen(false);
            addImage(dataUrl, 0.2, 0.2, 0.3, 0.1, "signature");
            setTool("select");
          }}
        />
      )}
    </div>
  );
}

// ---------- Signature pad ----------

function SignaturePad({
  onSave,
  onClose,
}: {
  onSave: (dataUrl: string) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const lastPt = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#111111";
  }, []);

  function pos(e: React.MouseEvent | React.TouchEvent): { x: number; y: number } {
    const c = ref.current!;
    const r = c.getBoundingClientRect();
    const t = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
    return {
      x: ((t.clientX - r.left) / r.width) * c.width,
      y: ((t.clientY - r.top) / r.height) * c.height,
    };
  }

  function onDown(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    drawing.current = true;
    lastPt.current = pos(e);
  }
  function onMove(e: React.MouseEvent | React.TouchEvent) {
    if (!drawing.current) return;
    e.preventDefault();
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const p = pos(e);
    const prev = lastPt.current;
    if (prev) {
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    lastPt.current = p;
  }
  function onUp() {
    drawing.current = false;
    lastPt.current = null;
  }
  function clear() {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, c.width, c.height);
  }
  function save() {
    const c = ref.current!;
    onSave(c.toDataURL("image/png"));
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-4 space-y-3">
        <h3 className="text-base font-semibold text-slate-900">Draw your signature</h3>
        <canvas
          ref={ref}
          width={600}
          height={220}
          className="w-full border border-slate-300 rounded touch-none bg-white"
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          onTouchStart={onDown}
          onTouchMove={onMove}
          onTouchEnd={onUp}
        />
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={clear}
            className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm hover:bg-slate-50"
          >
            Clear
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              className="rounded-md bg-brand text-white px-3 py-1 text-sm font-semibold hover:bg-brand-dark"
            >
              Add signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
