"use client";

import { useMemo, useState } from "react";

type Entry = {
  platform: string;
  name: string;
  width: number;
  height: number;
  usage: string;
};

const DATA: Entry[] = [
  { platform: "Instagram", name: "Square post", width: 1080, height: 1080, usage: "Feed post, 1:1 square." },
  { platform: "Instagram", name: "Story", width: 1080, height: 1920, usage: "Vertical 9:16 story." },
  { platform: "Instagram", name: "Reel", width: 1080, height: 1920, usage: "Vertical video, 9:16." },
  { platform: "Instagram", name: "Profile picture", width: 320, height: 320, usage: "Displayed as circle." },
  { platform: "Twitter/X", name: "Post image", width: 1600, height: 900, usage: "In-feed image, 16:9." },
  { platform: "Twitter/X", name: "Header", width: 1500, height: 500, usage: "Profile banner." },
  { platform: "Twitter/X", name: "Profile picture", width: 400, height: 400, usage: "Displayed as circle." },
  { platform: "Facebook", name: "Shared post", width: 1200, height: 630, usage: "Link preview / feed image." },
  { platform: "Facebook", name: "Cover photo", width: 820, height: 312, usage: "Profile / page cover." },
  { platform: "LinkedIn", name: "Shared post", width: 1200, height: 627, usage: "Feed link image." },
  { platform: "LinkedIn", name: "Cover image", width: 1584, height: 396, usage: "Profile banner." },
  { platform: "YouTube", name: "Thumbnail", width: 1280, height: 720, usage: "Video thumbnail, 16:9." },
  { platform: "YouTube", name: "Channel art", width: 2560, height: 1440, usage: "Banner, safe area 1546×423." },
  { platform: "TikTok", name: "Video", width: 1080, height: 1920, usage: "Vertical video, 9:16." },
  { platform: "Pinterest", name: "Standard pin", width: 1000, height: 1500, usage: "2:3 vertical pin." },
];

export function SocialMediaImageSizes() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<string>("All");

  const platforms = useMemo(() => ["All", ...Array.from(new Set(DATA.map((d) => d.platform)))], []);

  const rows = useMemo(() => {
    const q = query.toLowerCase().trim();
    return DATA.filter(
      (d) =>
        (platform === "All" || d.platform === platform) &&
        (!q ||
          d.platform.toLowerCase().includes(q) ||
          d.name.toLowerCase().includes(q) ||
          d.usage.toLowerCase().includes(q)),
    );
  }, [query, platform]);

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="story, thumbnail, cover..."
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Platform
          </span>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="py-2 px-3 text-left font-semibold">Platform</th>
              <th className="py-2 px-3 text-left font-semibold">Format</th>
              <th className="py-2 px-3 text-left font-semibold">Dimensions</th>
              <th className="py-2 px-3 text-left font-semibold">Ratio</th>
              <th className="py-2 px-3 text-left font-semibold">Usage</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const g = gcd(r.width, r.height);
              return (
                <tr key={i} className="even:bg-white odd:bg-slate-50">
                  <td className="py-2 px-3 font-semibold text-slate-900">{r.platform}</td>
                  <td className="py-2 px-3 text-slate-700">{r.name}</td>
                  <td className="py-2 px-3 font-mono text-slate-900">
                    {r.width}×{r.height}
                  </td>
                  <td className="py-2 px-3 font-mono text-slate-700">
                    {r.width / g}:{r.height / g}
                  </td>
                  <td className="py-2 px-3 text-slate-600">{r.usage}</td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 px-3 text-center text-slate-500">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
