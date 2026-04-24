"use client";

import { useState } from "react";

type DonenessRow = {
  label: string;
  tempF: number;
  tempC: number;
  time: string;
  note?: string;
};

type Protein = {
  key: string;
  name: string;
  rows: DonenessRow[];
};

const PROTEINS: Protein[] = [
  {
    key: "beef-steak",
    name: "Beef steak",
    rows: [
      { label: "Rare", tempF: 120, tempC: 49, time: "1-4 hr" },
      { label: "Medium-rare", tempF: 129, tempC: 54, time: "1-4 hr" },
      { label: "Medium", tempF: 135, tempC: 57, time: "1-4 hr" },
      { label: "Medium-well", tempF: 145, tempC: 63, time: "1-4 hr" },
      { label: "Well done", tempF: 156, tempC: 69, time: "1-4 hr" },
    ],
  },
  {
    key: "beef-roast",
    name: "Beef roast (tough cuts)",
    rows: [
      { label: "Medium-rare tender", tempF: 131, tempC: 55, time: "24-36 hr" },
      { label: "Medium tender", tempF: 140, tempC: 60, time: "18-24 hr" },
      { label: "Fall-apart", tempF: 165, tempC: 74, time: "18-24 hr" },
    ],
  },
  {
    key: "pork-chop",
    name: "Pork chop",
    rows: [
      { label: "Medium-rare", tempF: 130, tempC: 54, time: "1-4 hr" },
      { label: "Medium", tempF: 140, tempC: 60, time: "1-4 hr" },
      { label: "Well done", tempF: 158, tempC: 70, time: "1-4 hr" },
    ],
  },
  {
    key: "pork-shoulder",
    name: "Pork shoulder",
    rows: [
      { label: "Sliceable BBQ", tempF: 158, tempC: 70, time: "24-36 hr" },
      { label: "Pull-apart", tempF: 165, tempC: 74, time: "18-24 hr" },
      { label: "Shreddable classic", tempF: 176, tempC: 80, time: "18-24 hr" },
    ],
  },
  {
    key: "chicken-breast",
    name: "Chicken breast",
    rows: [
      { label: "Very juicy, pasteurized", tempF: 140, tempC: 60, time: "1.5-4 hr" },
      { label: "Traditional tender", tempF: 150, tempC: 66, time: "1-4 hr" },
      { label: "Firm, classic", tempF: 160, tempC: 71, time: "1-4 hr" },
    ],
  },
  {
    key: "chicken-thigh",
    name: "Chicken thigh",
    rows: [
      { label: "Juicy tender", tempF: 150, tempC: 66, time: "1-4 hr" },
      { label: "Fall-off-bone", tempF: 165, tempC: 74, time: "4-8 hr" },
      { label: "Crispy-skin prep", tempF: 167, tempC: 75, time: "1-4 hr" },
    ],
  },
  {
    key: "fish",
    name: "Fish (salmon/cod/tuna)",
    rows: [
      { label: "Translucent sashimi", tempF: 104, tempC: 40, time: "30-45 min", note: "Use sashimi-grade" },
      { label: "Tender flaky", tempF: 122, tempC: 50, time: "30-45 min" },
      { label: "Firm traditional", tempF: 130, tempC: 54, time: "30-45 min" },
    ],
  },
  {
    key: "egg",
    name: "Egg",
    rows: [
      { label: "Soft poached style", tempF: 143, tempC: 62, time: "1 hr" },
      { label: "Custard yolk", tempF: 145, tempC: 63, time: "1 hr" },
      { label: "Hard cooked", tempF: 167, tempC: 75, time: "15 min" },
    ],
  },
  {
    key: "vegetable",
    name: "Vegetable (root/green)",
    rows: [
      { label: "Tender-crisp green", tempF: 185, tempC: 85, time: "10-20 min" },
      { label: "Root vegetable", tempF: 185, tempC: 85, time: "1-2 hr" },
      { label: "Soft braised", tempF: 190, tempC: 88, time: "2-3 hr" },
    ],
  },
];

export function SousVideTimeTemp() {
  const [proteinKey, setProteinKey] = useState("beef-steak");
  const protein = PROTEINS.find((p) => p.key === proteinKey) ?? PROTEINS[0];

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Protein</label>
        <select
          value={proteinKey}
          onChange={(e) => setProteinKey(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
        >
          {PROTEINS.map((p) => (
            <option key={p.key} value={p.key}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-3 py-2 text-left">Doneness</th>
              <th className="px-3 py-2 text-left">Temp (&deg;F)</th>
              <th className="px-3 py-2 text-left">Temp (&deg;C)</th>
              <th className="px-3 py-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {protein.rows.map((r, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-3 py-2 font-medium text-slate-800">
                  {r.label}
                  {r.note ? <span className="ml-2 text-xs text-slate-500">({r.note})</span> : null}
                </td>
                <td className="px-3 py-2">{r.tempF}&deg;F</td>
                <td className="px-3 py-2">{r.tempC}&deg;C</td>
                <td className="px-3 py-2">{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
        <strong>Safety:</strong> Temps below 130&deg;F require a minimum 2-hour pasteurization hold for safety. Food-safe cooking depends on both temperature and time &mdash; short cooks at low temps are not pasteurized.
      </div>

      <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600">
        Tip: Sear the protein hot and fast (cast iron, 60&ndash;90 seconds per side) after the bath for Maillard crust. Pat dry first.
      </div>
    </div>
  );
}
