"use client";

import { useEffect, useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

type Mode = "file" | "url";

type Info = {
  width: number;
  height: number;
  size?: number;
  type?: string;
  src: string;
};

export function ImageDimensionsChecker() {
  const [mode, setMode] = useState<Mode>("file");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState<Info | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    const src = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setInfo({
        width: img.naturalWidth,
        height: img.naturalHeight,
        size: file.size,
        type: file.type,
        src,
      });
      setErr(null);
    };
    img.onerror = () => {
      setErr("Couldn't decode the image.");
      URL.revokeObjectURL(src);
    };
    img.src = src;
    return () => {
      URL.revokeObjectURL(src);
    };
  }, [file]);

  function loadUrl() {
    if (!url) return;
    setErr(null);
    const img = new Image();
    img.onload = () => {
      setInfo({
        width: img.naturalWidth,
        height: img.naturalHeight,
        src: url,
      });
    };
    img.onerror = () => {
      setErr("Couldn't load that URL — CORS or bad link.");
    };
    img.src = url;
  }

  const ratio = info ? gcd(info.width, info.height) : 1;
  const aspect = info ? `${info.width / ratio}:${info.height / ratio}` : "";
  const decimal = info ? (info.width / info.height).toFixed(4) : "";

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("file")}
          className={`rounded-md border px-3 py-2 text-sm font-semibold ${
            mode === "file"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
        >
          Upload file
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`rounded-md border px-3 py-2 text-sm font-semibold ${
            mode === "url"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
        >
          From URL
        </button>
      </div>

      {mode === "file" ? (
        <FileDrop file={file} onFile={setFile} accept="image/*" hint="JPG, PNG, WebP, GIF, BMP, SVG." />
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
          <button
            type="button"
            onClick={loadUrl}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
          >
            Check
          </button>
        </div>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {info && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
          <table className="w-full text-sm">
            <tbody>
              <tr className="even:bg-white odd:bg-slate-50">
                <td className="py-2 px-3 text-slate-500">Natural width</td>
                <td className="py-2 px-3 font-mono font-semibold text-slate-900">{info.width}px</td>
              </tr>
              <tr className="even:bg-white odd:bg-slate-50">
                <td className="py-2 px-3 text-slate-500">Natural height</td>
                <td className="py-2 px-3 font-mono font-semibold text-slate-900">{info.height}px</td>
              </tr>
              <tr className="even:bg-white odd:bg-slate-50">
                <td className="py-2 px-3 text-slate-500">Aspect ratio</td>
                <td className="py-2 px-3 font-mono text-slate-900">{aspect}</td>
              </tr>
              <tr className="even:bg-white odd:bg-slate-50">
                <td className="py-2 px-3 text-slate-500">Decimal ratio</td>
                <td className="py-2 px-3 font-mono text-slate-900">{decimal}</td>
              </tr>
              {info.size !== undefined && (
                <tr className="even:bg-white odd:bg-slate-50">
                  <td className="py-2 px-3 text-slate-500">File size</td>
                  <td className="py-2 px-3 font-mono text-slate-900">{fmtBytes(info.size)}</td>
                </tr>
              )}
              {info.type && (
                <tr className="even:bg-white odd:bg-slate-50">
                  <td className="py-2 px-3 text-slate-500">MIME type</td>
                  <td className="py-2 px-3 font-mono text-slate-900">{info.type}</td>
                </tr>
              )}
              <tr className="even:bg-white odd:bg-slate-50">
                <td className="py-2 px-3 text-slate-500">Megapixels</td>
                <td className="py-2 px-3 font-mono text-slate-900">
                  {((info.width * info.height) / 1_000_000).toFixed(2)} MP
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={info.src}
              alt="Preview"
              className="max-h-64 rounded-lg border border-slate-200 bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}
