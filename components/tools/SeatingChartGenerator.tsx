"use client";

import { useMemo, useState } from "react";

interface Guest {
  name: string;
  group?: string;
}

interface Table {
  number: number;
  seats: Guest[];
  capacity: number;
}

const DEFAULT_GUESTS = `Alice Johnson - bride family
Bob Johnson - bride family
Carol Johnson - bride family
David Smith - groom family
Emma Smith - groom family
Frank Smith - groom family
Grace Lee - college friends
Henry Lee - college friends
Iris Park - college friends
Jack Park - college friends
Kate Miller - work
Leo Miller - work
Maya Chen
Noah Chen
Olivia Brooks
Paul Brooks
Quinn Davis
Ryan Davis
Sara Wu
Tom Wu`;

export interface SeatingChartGeneratorProps {
  initialGuests?: string;
  initialTables?: number;
  initialSeats?: number;
}

function parseGuests(raw: string): Guest[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const m = line.match(/^(.+?)\s*-\s*(.+)$/);
      if (m) return { name: m[1].trim(), group: m[2].trim() };
      return { name: line };
    });
}

function assign(guests: Guest[], tableCount: number, seats: number): { tables: Table[]; overflow: Guest[] } {
  const tables: Table[] = Array.from({ length: Math.max(1, tableCount) }, (_, i) => ({
    number: i + 1,
    seats: [],
    capacity: seats,
  }));

  const groups = new Map<string, Guest[]>();
  const singles: Guest[] = [];
  for (const g of guests) {
    if (g.group) {
      if (!groups.has(g.group)) groups.set(g.group, []);
      groups.get(g.group)!.push(g);
    } else {
      singles.push(g);
    }
  }

  const sortedGroups = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
  const overflow: Guest[] = [];

  for (const [, members] of sortedGroups) {
    let remaining = [...members];
    while (remaining.length > 0) {
      const bestTable = tables
        .filter((t) => t.seats.length < t.capacity)
        .sort((a, b) => (b.capacity - b.seats.length) - (a.capacity - a.seats.length))[0];
      if (!bestTable) {
        overflow.push(...remaining);
        break;
      }
      const slots = bestTable.capacity - bestTable.seats.length;
      const take = remaining.splice(0, slots);
      bestTable.seats.push(...take);
    }
  }

  for (const g of singles) {
    const bestTable = tables
      .filter((t) => t.seats.length < t.capacity)
      .sort((a, b) => (a.capacity - a.seats.length) - (b.capacity - b.seats.length))[0];
    if (!bestTable) {
      overflow.push(g);
      continue;
    }
    bestTable.seats.push(g);
  }

  return { tables, overflow };
}

export function SeatingChartGenerator({
  initialGuests = DEFAULT_GUESTS,
  initialTables = 3,
  initialSeats = 8,
}: SeatingChartGeneratorProps = {}) {
  const [guestsRaw, setGuestsRaw] = useState(initialGuests);
  const [tableCount, setTableCount] = useState(String(initialTables));
  const [seatsPerTable, setSeatsPerTable] = useState(String(initialSeats));
  const [copied, setCopied] = useState(false);

  const { tables, overflow, totalGuests, totalCapacity } = useMemo(() => {
    const guests = parseGuests(guestsRaw);
    const t = Math.max(1, parseInt(tableCount) || 1);
    const s = Math.max(1, parseInt(seatsPerTable) || 1);
    const tNum = Number.isFinite(t) ? t : 1;
    const sNum = Number.isFinite(s) ? s : 1;
    const { tables, overflow } = assign(guests, tNum, sNum);
    return {
      tables,
      overflow,
      totalGuests: guests.length,
      totalCapacity: tNum * sNum,
    };
  }, [guestsRaw, tableCount, seatsPerTable]);

  const printable = useMemo(() => {
    const lines: string[] = [];
    for (const t of tables) {
      lines.push(`Table ${t.number} (${t.seats.length}/${t.capacity})`);
      for (const s of t.seats) lines.push(`  - ${s.name}${s.group ? ` [${s.group}]` : ""}`);
      lines.push("");
    }
    if (overflow.length > 0) {
      lines.push("OVERFLOW (unseated):");
      for (const g of overflow) lines.push(`  - ${g.name}${g.group ? ` [${g.group}]` : ""}`);
    }
    return lines.join("\n");
  }, [tables, overflow]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(printable);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-4">
        <label className="block md:row-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Guests (one per line, optional &ldquo;- group&rdquo; tag)
          </span>
          <textarea
            rows={10}
            value={guestsRaw}
            onChange={(e) => setGuestsRaw(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Number of tables</span>
          <input
            type="number"
            min={1}
            step={1}
            value={tableCount}
            onChange={(e) => setTableCount(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Seats per table</span>
          <input
            type="number"
            min={1}
            step={1}
            value={seatsPerTable}
            onChange={(e) => setSeatsPerTable(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 grid sm:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Guests</p>
          <p className="text-2xl font-bold text-slate-900">{totalGuests}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Capacity</p>
          <p className="text-2xl font-bold text-slate-900">{totalCapacity}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Overflow</p>
          <p className={`text-2xl font-bold ${overflow.length > 0 ? "text-rose-600" : "text-emerald-600"}`}>
            {overflow.length}
          </p>
        </div>
      </div>

      {overflow.length > 0 && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          <strong>Warning:</strong> {overflow.length} guest(s) have no seat. Add more tables or seats.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {tables.map((t) => (
          <div key={t.number} className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-semibold text-slate-900">Table {t.number}</h3>
              <span className="text-xs text-slate-500">
                {t.seats.length}/{t.capacity} seats
              </span>
            </div>
            <ul className="text-sm text-slate-700 space-y-1">
              {t.seats.length === 0 ? (
                <li className="text-slate-400 italic">Empty</li>
              ) : (
                t.seats.map((g, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs w-4">{i + 1}.</span>
                    <span>{g.name}</span>
                    {g.group && <span className="text-xs text-slate-500">[{g.group}]</span>}
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="font-semibold text-slate-900">Printable / copy-friendly</h3>
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-300 bg-white hover:border-brand transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-xs text-slate-800 whitespace-pre-wrap overflow-auto max-h-80">
{printable}
        </pre>
      </div>
    </div>
  );
}
