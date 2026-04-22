"use client";

import { useMemo, useState } from "react";

function extractId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
    /^([A-Za-z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

const SIZES: Array<{ key: string; label: string; note: string }> = [
  { key: "maxresdefault", label: "Max resolution (1280×720)", note: "Highest quality, only for HD uploads" },
  { key: "sddefault", label: "Standard (640×480)", note: "Backup for older videos" },
  { key: "hqdefault", label: "High quality (480×360)", note: "Always available" },
  { key: "mqdefault", label: "Medium (320×180)", note: "Smaller thumbnail" },
  { key: "default", label: "Default (120×90)", note: "Tiny icon size" },
];

export function YoutubeThumbnailDownloader() {
  const [url, setUrl] = useState("");
  const id = useMemo(() => extractId(url.trim()), [url]);

  async function download(size: string) {
    if (!id) return;
    const src = `https://img.youtube.com/vi/${id}/${size}.jpg`;
    const res = await fetch(src);
    if (!res.ok) return alert(`${size} is not available for this video.`);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${id}-${size}.jpg`;
    a.click();
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">YouTube URL or video ID</span>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      {id && (
        <>
          <div className="rounded-xl bg-slate-50 p-4 flex justify-center">
            <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={`Thumbnail for ${id}`} className="max-h-72 rounded-lg border border-slate-200" />
          </div>
          <div className="space-y-2">
            {SIZES.map((s) => (
              <div key={s.key} className="flex items-center gap-3 flex-wrap rounded-lg border border-slate-200 p-3">
                <div className="flex-1 min-w-[200px]">
                  <div className="text-sm font-medium">{s.label}</div>
                  <div className="text-xs text-slate-500">{s.note}</div>
                </div>
                <button onClick={() => download(s.key)} className="bg-slate-900 text-white text-xs font-semibold rounded-lg px-3 py-2 hover:bg-slate-800">
                  Download
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {url && !id && <p className="text-sm text-red-600">Couldn't find a YouTube video ID in that URL.</p>}
    </div>
  );
}
