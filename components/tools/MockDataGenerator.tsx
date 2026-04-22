"use client";

import { useMemo, useState } from "react";

const FIRST = ["Alex", "Jordan", "Sam", "Taylor", "Casey", "Morgan", "Riley", "Jamie", "Quinn", "Avery", "Skyler", "Dakota", "Hayden", "Parker", "Rowan"];
const LAST = ["Smith", "Jones", "Garcia", "Nguyen", "Patel", "Kim", "Lopez", "Brown", "Davis", "Wilson", "Martinez", "Clark", "Khan", "Singh", "Rossi"];
const DOMAINS = ["example.com", "mail.test", "demo.io", "sample.dev", "placeholder.co"];
const CITIES = ["Lisbon", "Tokyo", "Berlin", "Austin", "Lagos", "Toronto", "Seoul", "Oslo", "Dublin", "Mumbai"];
const COMPANIES = ["Acme", "Globex", "Initech", "Umbrella", "Stark", "Wayne", "Wonka", "Hooli", "Pied Piper", "Soylent"];
const JOBS = ["Engineer", "Designer", "Manager", "Analyst", "Writer", "Consultant", "Developer", "Marketer", "Scientist", "Architect"];

function rng(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
const pick = <T,>(a: T[], r: () => number) => a[Math.floor(r() * a.length)];

type Field = "id" | "firstName" | "lastName" | "email" | "phone" | "city" | "company" | "job" | "age" | "date";

const ALL_FIELDS: Field[] = ["id", "firstName", "lastName", "email", "phone", "city", "company", "job", "age", "date"];

function makeRow(i: number, fields: Field[], r: () => number) {
  const first = pick(FIRST, r);
  const last = pick(LAST, r);
  const row: Record<string, any> = {};
  for (const f of fields) {
    if (f === "id") row.id = i + 1;
    else if (f === "firstName") row.firstName = first;
    else if (f === "lastName") row.lastName = last;
    else if (f === "email") row.email = `${first.toLowerCase()}.${last.toLowerCase()}@${pick(DOMAINS, r)}`;
    else if (f === "phone") row.phone = `+1-${200 + Math.floor(r() * 799)}-${100 + Math.floor(r() * 899)}-${1000 + Math.floor(r() * 8999)}`;
    else if (f === "city") row.city = pick(CITIES, r);
    else if (f === "company") row.company = pick(COMPANIES, r);
    else if (f === "job") row.job = pick(JOBS, r);
    else if (f === "age") row.age = 18 + Math.floor(r() * 50);
    else if (f === "date") {
      const d = new Date(Date.now() - Math.floor(r() * 365 * 24 * 3600 * 1000));
      row.date = d.toISOString().slice(0, 10);
    }
  }
  return row;
}

function toCSV(rows: Record<string, any>[]): string {
  if (rows.length === 0) return "";
  const keys = Object.keys(rows[0]);
  const esc = (v: any) => {
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [keys.join(","), ...rows.map((r) => keys.map((k) => esc(r[k])).join(","))].join("\n");
}

export function MockDataGenerator() {
  const [count, setCount] = useState(25);
  const [seed, setSeed] = useState(42);
  const [format, setFormat] = useState<"json" | "csv">("json");
  const [fields, setFields] = useState<Field[]>(["id", "firstName", "lastName", "email", "city"]);
  const [copied, setCopied] = useState(false);

  const rows = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: count }, (_, i) => makeRow(i, fields, r));
  }, [count, seed, fields]);

  const out = useMemo(() => (format === "json" ? JSON.stringify(rows, null, 2) : toCSV(rows)), [rows, format]);

  function toggle(f: Field) {
    setFields((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]));
  }

  function copy() {
    navigator.clipboard?.writeText(out);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Rows</span>
          <input type="number" min={1} max={1000} value={count} onChange={(e) => setCount(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Seed</span>
          <input type="number" value={seed} onChange={(e) => setSeed(parseInt(e.target.value) || 0)} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Format</span>
          <select value={format} onChange={(e) => setFormat(e.target.value as any)} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
        </label>
      </div>

      <div>
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2 block">Fields</span>
        <div className="flex flex-wrap gap-2">
          {ALL_FIELDS.map((f) => (
            <button key={f} onClick={() => toggle(f)} className={`text-xs px-3 py-1 rounded-full border ${fields.includes(f) ? "bg-brand text-white border-brand" : "bg-white text-slate-700 border-slate-300"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <textarea readOnly value={out} rows={12} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs bg-slate-50" />

      <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">
        {copied ? "Copied" : `Copy ${format.toUpperCase()}`}
      </button>
    </div>
  );
}
