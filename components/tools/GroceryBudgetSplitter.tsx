"use client";

import { useMemo, useState } from "react";

type Item = {
  id: number;
  name: string;
  price: number;
  allocation: string; // "all", "shared", or a person name
  sharedWith: string[]; // when allocation === "shared"
};

export function GroceryBudgetSplitter() {
  const [people, setPeople] = useState<string[]>(["Alex", "Sam"]);
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Milk", price: 4.5, allocation: "all", sharedWith: [] },
    { id: 2, name: "Bread", price: 3.25, allocation: "all", sharedWith: [] },
    { id: 3, name: "Protein bars", price: 8.0, allocation: "Alex", sharedWith: [] },
    { id: 4, name: "Coffee beans", price: 14.0, allocation: "shared", sharedWith: ["Alex", "Sam"] },
  ]);
  const [nextId, setNextId] = useState(5);

  const addItem = () => {
    setItems([...items, { id: nextId, name: "", price: 0, allocation: "all", sharedWith: [...people] }]);
    setNextId(nextId + 1);
  };
  const removeItem = (id: number) => setItems(items.filter((i) => i.id !== id));
  const updateItem = (id: number, patch: Partial<Item>) => {
    setItems(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  };

  const addPerson = () => {
    if (people.length >= 6) return;
    setPeople([...people, `Person ${people.length + 1}`]);
  };
  const removePerson = (idx: number) => {
    if (people.length <= 2) return;
    const removed = people[idx];
    const next = people.filter((_, i) => i !== idx);
    setPeople(next);
    setItems(
      items.map((it) => ({
        ...it,
        allocation: it.allocation === removed ? "all" : it.allocation,
        sharedWith: it.sharedWith.filter((p) => p !== removed),
      }))
    );
  };
  const renamePerson = (idx: number, name: string) => {
    const old = people[idx];
    const next = [...people];
    next[idx] = name;
    setPeople(next);
    setItems(
      items.map((it) => ({
        ...it,
        allocation: it.allocation === old ? name : it.allocation,
        sharedWith: it.sharedWith.map((p) => (p === old ? name : p)),
      }))
    );
  };

  const totals = useMemo(() => {
    const perPerson: Record<string, number> = Object.fromEntries(people.map((p) => [p, 0]));
    let bill = 0;
    for (const it of items) {
      const price = Number.isFinite(it.price) && it.price > 0 ? it.price : 0;
      bill += price;
      if (it.allocation === "all") {
        const share = price / people.length;
        for (const p of people) perPerson[p] += share;
      } else if (it.allocation === "shared") {
        const targets = it.sharedWith.filter((p) => people.includes(p));
        if (targets.length > 0) {
          const share = price / targets.length;
          for (const p of targets) perPerson[p] += share;
        }
      } else if (people.includes(it.allocation)) {
        perPerson[it.allocation] += price;
      }
    }
    return { perPerson, bill };
  }, [items, people]);

  const toggleSharedWith = (id: number, person: string) => {
    const it = items.find((i) => i.id === id);
    if (!it) return;
    const has = it.sharedWith.includes(person);
    updateItem(id, {
      sharedWith: has ? it.sharedWith.filter((p) => p !== person) : [...it.sharedWith, person],
    });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium text-slate-800">People ({people.length})</div>
          <button
            onClick={addPerson}
            disabled={people.length >= 6}
            className="text-xs px-2 py-1 rounded-md bg-slate-900 text-white disabled:bg-slate-300"
          >
            + Add person
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {people.map((p, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <input
                value={p}
                onChange={(e) => renamePerson(idx, e.target.value)}
                className="w-28 rounded-md border border-slate-300 px-2 py-1 text-sm"
              />
              <button
                onClick={() => removePerson(idx)}
                disabled={people.length <= 2}
                className="text-xs text-rose-600 disabled:text-slate-300"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200">
        <div className="flex items-center justify-between p-3 border-b border-slate-200">
          <div className="font-medium text-slate-800">Items ({items.length})</div>
          <button onClick={addItem} className="text-xs px-2 py-1 rounded-md bg-slate-900 text-white">+ Add item</button>
        </div>
        <div className="divide-y divide-slate-100">
          {items.map((it) => (
            <div key={it.id} className="p-3 space-y-2">
              <div className="flex flex-wrap gap-2">
                <input
                  placeholder="Item name"
                  value={it.name}
                  onChange={(e) => updateItem(it.id, { name: e.target.value })}
                  className="flex-1 min-w-[10rem] rounded-md border border-slate-300 px-2 py-1 text-sm"
                />
                <input
                  type="number"
                  step="0.01"
                  value={it.price}
                  onChange={(e) => updateItem(it.id, { price: Number(e.target.value) })}
                  className="w-24 rounded-md border border-slate-300 px-2 py-1 text-sm"
                />
                <select
                  value={it.allocation}
                  onChange={(e) => updateItem(it.id, { allocation: e.target.value })}
                  className="rounded-md border border-slate-300 px-2 py-1 text-sm bg-white"
                >
                  <option value="all">All (split evenly)</option>
                  <option value="shared">Shared (pick below)</option>
                  {people.map((p) => (
                    <option key={p} value={p}>{p} only</option>
                  ))}
                </select>
                <button onClick={() => removeItem(it.id)} className="text-xs text-rose-600 px-2">remove</button>
              </div>
              {it.allocation === "shared" && (
                <div className="flex flex-wrap gap-2 text-xs">
                  {people.map((p) => (
                    <label key={p} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-200">
                      <input
                        type="checkbox"
                        checked={it.sharedWith.includes(p)}
                        onChange={() => toggleSharedWith(it.id, p)}
                      />
                      {p}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Bill total</span>
          <span className="text-xl font-semibold text-slate-900">${totals.bill.toFixed(2)}</span>
        </div>
        <div className="border-t border-slate-200 pt-2 space-y-1">
          {people.map((p) => (
            <div key={p} className="flex items-center justify-between text-sm">
              <span className="text-slate-700">{p}</span>
              <span className="font-mono text-slate-900">${totals.perPerson[p].toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
