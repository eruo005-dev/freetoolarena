"use client";

import { useMemo, useState } from "react";

interface Person {
  id: number;
  name: string;
}

interface Shift {
  id: number;
  day: number;
  start: string;
  end: string;
  personId: number;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function toMin(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function overlap(a: Shift, b: Shift): boolean {
  if (a.day !== b.day) return false;
  const as = toMin(a.start), ae = toMin(a.end);
  const bs = toMin(b.start), be = toMin(b.end);
  return as < be && bs < ae;
}

export function ShiftScheduler() {
  const [people, setPeople] = useState<Person[]>([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [pName, setPName] = useState("");
  const [sDay, setSDay] = useState(0);
  const [sStart, setSStart] = useState("09:00");
  const [sEnd, setSEnd] = useState("17:00");
  const [sPerson, setSPerson] = useState<number | null>(null);

  const addPerson = () => {
    const t = pName.trim();
    if (!t) return;
    setPeople((p) => [...p, { id: Date.now(), name: t }]);
    setPName("");
  };
  const removePerson = (id: number) => {
    setPeople((p) => p.filter((x) => x.id !== id));
    setShifts((s) => s.filter((x) => x.personId !== id));
  };
  const addShift = () => {
    const pid = sPerson ?? people[0]?.id;
    if (!pid) return;
    if (toMin(sEnd) <= toMin(sStart)) return;
    setShifts((s) => [...s, { id: Date.now(), day: sDay, start: sStart, end: sEnd, personId: pid }]);
  };
  const removeShift = (id: number) => setShifts((s) => s.filter((x) => x.id !== id));

  const stats = useMemo(() => {
    const conflicts = new Set<number>();
    for (let i = 0; i < shifts.length; i++) {
      for (let j = i + 1; j < shifts.length; j++) {
        if (shifts[i].personId === shifts[j].personId && overlap(shifts[i], shifts[j])) {
          conflicts.add(shifts[i].id);
          conflicts.add(shifts[j].id);
        }
      }
    }
    const hours: Record<number, number> = {};
    for (const s of shifts) {
      hours[s.personId] = (hours[s.personId] || 0) + (toMin(s.end) - toMin(s.start)) / 60;
    }
    return { conflicts, hours };
  }, [shifts]);

  return (
    <div className="space-y-5">
      <div>
        <div className="text-sm font-medium text-slate-700 mb-2">People</div>
        <div className="flex gap-2 mb-2">
          <input value={pName} onChange={(e) => setPName(e.target.value)} placeholder="Name"
            onKeyDown={(e) => e.key === "Enter" && addPerson()}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          <button type="button" onClick={addPerson}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {people.map((p) => (
            <span key={p.id} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700">
              {p.name}
              <button type="button" onClick={() => removePerson(p.id)} className="text-rose-600 hover:underline">x</button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-slate-700 mb-2">Add shift</div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <select value={sDay} onChange={(e) => setSDay(parseInt(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
            {DAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}
          </select>
          <input type="time" value={sStart} onChange={(e) => setSStart(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          <input type="time" value={sEnd} onChange={(e) => setSEnd(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          <select value={sPerson ?? ""} onChange={(e) => setSPerson(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
            <option value="">— person —</option>
            {people.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <button type="button" onClick={addShift}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
            disabled={people.length === 0}>Add shift</button>
        </div>
      </div>

      {people.length > 0 && (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-8 gap-px bg-slate-200 text-sm">
            <div className="bg-slate-100 px-2 py-2 font-semibold">Person</div>
            {DAYS.map((d) => <div key={d} className="bg-slate-100 px-2 py-2 font-semibold">{d}</div>)}
            {people.map((p) => (
              <div key={p.id} className="contents">
                <div className="bg-white px-2 py-2 font-medium text-slate-800">
                  {p.name}
                  <div className="text-xs text-slate-500">{(stats.hours[p.id] || 0).toFixed(1)}h</div>
                </div>
                {DAYS.map((_, di) => {
                  const cellShifts = shifts.filter((s) => s.personId === p.id && s.day === di);
                  return (
                    <div key={di} className="bg-white px-1 py-1 space-y-1">
                      {cellShifts.map((s) => (
                        <div key={s.id} className={`rounded px-1 py-0.5 text-xs flex justify-between items-center ${stats.conflicts.has(s.id) ? "bg-rose-100 text-rose-700" : "bg-brand/10 text-brand"}`}>
                          <span>{s.start}–{s.end}</span>
                          <button type="button" onClick={() => removeShift(s.id)} className="text-xs opacity-60 hover:opacity-100">x</button>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.conflicts.size > 0 && (
        <p className="text-sm text-rose-600">Warning: {stats.conflicts.size} overlapping shift(s) detected.</p>
      )}
    </div>
  );
}
