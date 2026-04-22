"use client";

import { useState } from "react";

const TAGS: Record<number, string> = {
  0x010F: "Make", 0x0110: "Model", 0x0112: "Orientation", 0x011A: "XResolution", 0x011B: "YResolution",
  0x0131: "Software", 0x0132: "DateTime", 0x013B: "Artist", 0x8298: "Copyright",
  0x829A: "ExposureTime", 0x829D: "FNumber", 0x8822: "ExposureProgram", 0x8827: "ISO",
  0x9003: "DateTimeOriginal", 0x9004: "DateTimeDigitized", 0x9201: "ShutterSpeed",
  0x9202: "Aperture", 0x9204: "ExposureBias", 0x9207: "Metering", 0x9208: "LightSource",
  0x9209: "Flash", 0x920A: "FocalLength", 0xA002: "PixelWidth", 0xA003: "PixelHeight",
  0xA405: "FocalLength35mm", 0xA430: "OwnerName", 0xA434: "LensModel",
};

function readExif(buf: ArrayBuffer): Record<string, any> {
  const v = new DataView(buf);
  if (v.getUint16(0) !== 0xFFD8) return { error: "Not a JPEG" };
  let o = 2;
  while (o < v.byteLength) {
    if (v.getUint8(o) !== 0xFF) break;
    const marker = v.getUint16(o);
    if (marker === 0xFFE1) {
      const exifStart = o + 4;
      if (String.fromCharCode(v.getUint8(exifStart), v.getUint8(exifStart + 1), v.getUint8(exifStart + 2), v.getUint8(exifStart + 3)) !== "Exif") return { error: "No EXIF" };
      const tiffStart = exifStart + 6;
      const little = v.getUint16(tiffStart) === 0x4949;
      const ifd0 = tiffStart + v.getUint32(tiffStart + 4, little);
      const count = v.getUint16(ifd0, little);
      const out: Record<string, any> = {};
      for (let i = 0; i < count; i++) {
        const entry = ifd0 + 2 + i * 12;
        const tag = v.getUint16(entry, little);
        const type = v.getUint16(entry + 2, little);
        const cnt = v.getUint32(entry + 4, little);
        const valOff = entry + 8;
        const name = TAGS[tag];
        if (!name) continue;
        try {
          if (type === 2) {
            const strOff = cnt > 4 ? tiffStart + v.getUint32(valOff, little) : valOff;
            let s = "";
            for (let j = 0; j < cnt - 1; j++) s += String.fromCharCode(v.getUint8(strOff + j));
            out[name] = s;
          } else if (type === 3) {
            out[name] = v.getUint16(valOff, little);
          } else if (type === 4) {
            out[name] = v.getUint32(valOff, little);
          } else if (type === 5) {
            const off = tiffStart + v.getUint32(valOff, little);
            const num = v.getUint32(off, little);
            const den = v.getUint32(off + 4, little);
            out[name] = den === 0 ? 0 : num / den;
          }
        } catch {}
      }
      return out;
    }
    const size = v.getUint16(o + 2);
    o += 2 + size;
  }
  return { error: "No APP1 segment" };
}

export function ExifViewer() {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [name, setName] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setName(f.name);
    const buf = await f.arrayBuffer();
    setData(readExif(buf));
  }

  return (
    <div className="space-y-5">
      <input type="file" accept="image/jpeg,image/jpg" onChange={onFile} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark" />

      {data && (
        <div className="rounded-xl bg-slate-50 p-4 space-y-1">
          <div className="text-xs text-slate-500 mb-2">{name}</div>
          {Object.keys(data).length === 0 ? (
            <p className="text-sm text-slate-500">No EXIF tags found in this image.</p>
          ) : (
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              {Object.entries(data).map(([k, v]) => (
                <>
                  <dt key={k + "k"} className="font-mono text-xs text-slate-500">{k}</dt>
                  <dd key={k + "v"} className="font-mono text-xs break-all">{String(v)}</dd>
                </>
              ))}
            </dl>
          )}
        </div>
      )}

      <p className="text-xs text-slate-500">Your file never leaves your browser. EXIF reading happens locally.</p>
    </div>
  );
}
