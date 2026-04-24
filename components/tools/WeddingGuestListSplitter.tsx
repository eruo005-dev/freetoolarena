"use client";

import { useMemo, useState } from "react";

type Method = "even" | "contribution" | "custom";

export interface WeddingGuestListSplitterProps {
  initialTotal?: number;
  initialFamilies?: 2 | 3;
  initialMethod?: Method;
}

export function WeddingGuestListSplitter({
  initialTotal = 120,
  initialFamilies = 2,
  initialMethod = "even",
}: WeddingGuestListSplitterProps = {}) {
  const [total, setTotal] = useState(String(initialTotal));
  const [families, setFamilies] = useState<2 | 3>(initialFamilies);
  const [method, setMethod] = useState<Method>(initialMethod);

  const [brideContrib, setBrideContrib] = useState("50");
  const [groomContrib, setGroomContrib] = useState("50");
  const [sharedContrib, setSharedContrib] = useState("0");

  const [brideCustom, setBrideCustom] = useState("60");
  const [groomCustom, setGroomCustom] = useState("60");
  const [sharedCustom, setSharedCustom] = useState("0");

  const { totalNum, slots } = useMemo(() => {
    const t = Math.max(0, parseFloat(total) || 0);
    const tNum = Number.isFinite(t) ? Math.round(t) : 0;

    const labels = families === 2 ? ["Bride / Partner A", "Groom / Partner B"] : ["Bride / Partner A", "Groom / Partner B", "Shared / Couple"];

    let shares: number[];
    if (method === "even") {
      shares = labels.map(() => 1 / labels.length);
    } else if (method === "contribution") {
      const vals = families === 2
        ? [parseFloat(brideContrib) || 0, parseFloat(groomContrib) || 0]
        : [parseFloat(brideContrib) || 0, parseFloat(groomContrib) || 0, parseFloat(sharedContrib) || 0];
      const sum = vals.reduce((a, b) => a + b, 0) || 1;
      shares = vals.map((v) => v / sum);
    } else {
      const vals = families === 2
        ? [parseFloat(brideCustom) || 0, parseFloat(groomCustom) || 0]
        : [parseFloat(brideCustom) || 0, parseFloat(groomCustom) || 0, parseFloat(sharedCustom) || 0];
      const sum = vals.reduce((a, b) => a + b, 0) || 1;
      shares = vals.map((v) => v / sum);
    }

    const rows = labels.map((label, i) => {
      const slotCount = Math.round(tNum * shares[i]);
      const immediate = Math.min(15, Math.round(slotCount * 0.20));
      const coreFriends = Math.round(slotCount * 0.25);
      const extended = Math.round(slotCount * 0.30);
      const plusOnes = Math.round(slotCount * 0.15);
      const workOther = Math.max(0, slotCount - immediate - coreFriends - extended - plusOnes);
      return { label, slotCount, immediate, coreFriends, extended, plusOnes, workOther };
    });

    return { totalNum: tNum, slots: rows };
  }, [total, families, method, brideContrib, groomContrib, sharedContrib, brideCustom, groomCustom, sharedCustom]);

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Total guest count</span>
          <input
            type="number"
            min={0}
            step={1}
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Number of family groups</span>
          <select
            value={families}
            onChange={(e) => setFamilies(parseInt(e.target.value) as 2 | 3)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand bg-white"
          >
            <option value={2}>2 (Bride &amp; Groom)</option>
            <option value={3}>3 (Bride, Groom, Shared)</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Split method</span>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as Method)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand bg-white"
          >
            <option value="even">Even split</option>
            <option value="contribution">By contribution %</option>
            <option value="custom">Custom weights</option>
          </select>
        </label>
      </div>

      {method === "contribution" && (
        <div className="grid sm:grid-cols-3 gap-4 rounded-xl bg-slate-50 p-4">
          <Weight label="Bride / A contribution %" value={brideContrib} onChange={setBrideContrib} />
          <Weight label="Groom / B contribution %" value={groomContrib} onChange={setGroomContrib} />
          {families === 3 && <Weight label="Shared contribution %" value={sharedContrib} onChange={setSharedContrib} />}
        </div>
      )}
      {method === "custom" && (
        <div className="grid sm:grid-cols-3 gap-4 rounded-xl bg-slate-50 p-4">
          <Weight label="Bride / A weight" value={brideCustom} onChange={setBrideCustom} />
          <Weight label="Groom / B weight" value={groomCustom} onChange={setGroomCustom} />
          {families === 3 && <Weight label="Shared weight" value={sharedCustom} onChange={setSharedCustom} />}
        </div>
      )}

      <div className="rounded-xl bg-slate-50 p-5">
        <p className="text-xs uppercase tracking-wide font-semibold mb-2 text-slate-500">Total guests</p>
        <p className="text-3xl font-bold text-brand">{totalNum.toLocaleString("en-US")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {slots.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 p-4 space-y-2">
            <div className="flex items-baseline justify-between">
              <h3 className="font-semibold text-slate-900">{s.label}</h3>
              <span className="text-2xl font-bold text-brand">{s.slotCount}</span>
            </div>
            <ul className="text-sm text-slate-700 space-y-1">
              <li className="flex justify-between"><span>Immediate family</span><span className="font-medium">{s.immediate}</span></li>
              <li className="flex justify-between"><span>Core friends</span><span className="font-medium">{s.coreFriends}</span></li>
              <li className="flex justify-between"><span>Extended family</span><span className="font-medium">{s.extended}</span></li>
              <li className="flex justify-between"><span>Plus-ones</span><span className="font-medium">{s.plusOnes}</span></li>
              <li className="flex justify-between"><span>Work / other</span><span className="font-medium">{s.workOther}</span></li>
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 p-4 bg-white">
        <h3 className="font-semibold text-slate-900 mb-2">Must-haves first worksheet</h3>
        <ol className="text-sm text-slate-700 space-y-1 list-decimal list-inside">
          <li>Round 1: Immediate family (~15 each side)</li>
          <li>Round 2: Core friends &amp; wedding party (~20 each side)</li>
          <li>Round 3: Extended family (~30 each side)</li>
          <li>Round 4: Expand with coworkers, plus-ones, distant friends</li>
        </ol>
        <p className="text-xs text-slate-500 mt-2">
          Build your &ldquo;A list&rdquo; first&mdash;if you hit capacity before round 4, you&rsquo;ve saved yourself a headache.
        </p>
      </div>
    </div>
  );
}

function Weight({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <input
        type="number"
        min={0}
        step={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      />
    </label>
  );
}
