"use client";

import { useMemo, useState } from "react";

type BumpType = "major" | "minor" | "patch" | "pre-major" | "pre-minor" | "pre-patch";

function parseVersion(v: string) {
  const m = v.trim().match(/^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+([0-9A-Za-z.-]+))?$/);
  if (!m) return null;
  return {
    major: parseInt(m[1], 10),
    minor: parseInt(m[2], 10),
    patch: parseInt(m[3], 10),
    pre: m[4] ?? null,
    build: m[5] ?? null,
  };
}

function bumpPre(pre: string | null, preId: string) {
  if (!pre) return `${preId}.0`;
  const parts = pre.split(".");
  const last = parts[parts.length - 1];
  if (/^\d+$/.test(last)) {
    parts[parts.length - 1] = String(parseInt(last, 10) + 1);
    return parts.join(".");
  }
  return `${pre}.0`;
}

function bump(version: string, type: BumpType, preId: string): string {
  const v = parseVersion(version);
  if (!v) return "invalid";
  const { major, minor, patch, pre } = v;

  if (type === "major") return `${major + 1}.0.0`;
  if (type === "minor") return `${major}.${minor + 1}.0`;
  if (type === "patch") {
    if (pre) return `${major}.${minor}.${patch}`;
    return `${major}.${minor}.${patch + 1}`;
  }
  if (type === "pre-major") {
    if (pre && major > 0 && minor === 0 && patch === 0) return `${major}.0.0-${bumpPre(pre, preId)}`;
    return `${major + 1}.0.0-${preId}.0`;
  }
  if (type === "pre-minor") {
    if (pre && patch === 0) return `${major}.${minor}.0-${bumpPre(pre, preId)}`;
    return `${major}.${minor + 1}.0-${preId}.0`;
  }
  if (type === "pre-patch") {
    if (pre) return `${major}.${minor}.${patch}-${bumpPre(pre, preId)}`;
    return `${major}.${minor}.${patch + 1}-${preId}.0`;
  }
  return "invalid";
}

export function SemverBumper() {
  const [current, setCurrent] = useState("1.2.3");
  const [type, setType] = useState<BumpType>("patch");
  const [preId, setPreId] = useState("rc");

  const parsed = useMemo(() => parseVersion(current), [current]);
  const next = useMemo(() => bump(current, type, preId), [current, type, preId]);

  const options: { value: BumpType; label: string; hint: string }[] = [
    { value: "major", label: "major", hint: "breaking change" },
    { value: "minor", label: "minor", hint: "new feature" },
    { value: "patch", label: "patch", hint: "bug fix" },
    { value: "pre-major", label: "pre-major", hint: "2.0.0-rc.0" },
    { value: "pre-minor", label: "pre-minor", hint: "1.3.0-rc.0" },
    { value: "pre-patch", label: "pre-patch", hint: "1.2.4-rc.0" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Current version</label>
          <input value={current} onChange={(e) => setCurrent(e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono" placeholder="1.2.3" />
          {!parsed && current.trim() && <p className="mt-1 text-xs text-rose-600">Not a valid semver string.</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Prerelease identifier</label>
          <input value={preId} onChange={(e) => setPreId(e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono" placeholder="rc, beta, alpha" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((opt) => (
          <label key={opt.value} className={`rounded-lg border p-3 text-sm cursor-pointer ${type === opt.value ? "border-brand bg-brand/10" : "border-slate-300 bg-white"}`}>
            <input type="radio" name="bump" value={opt.value} checked={type === opt.value} onChange={() => setType(opt.value)} className="mr-2" />
            <span className="font-semibold">{opt.label}</span>
            <span className="block text-xs text-slate-500 mt-0.5">{opt.hint}</span>
          </label>
        ))}
      </div>
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
        <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Next version</div>
        <div className="text-2xl font-mono font-semibold text-slate-800">{next}</div>
      </div>
      <pre className="rounded-lg bg-slate-900 text-slate-100 p-3 text-xs overflow-auto">{`npm version ${next === "invalid" ? "1.2.3" : next} --no-git-tag-version`}</pre>
    </div>
  );
}
