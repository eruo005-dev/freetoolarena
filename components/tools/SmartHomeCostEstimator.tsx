"use client";

import { useMemo, useState } from "react";

type HubKind = "none" | "aqara" | "smartthings" | "homekit" | "premium";

export function SmartHomeCostEstimator() {
  const [cameras, setCameras] = useState(2);
  const [locks, setLocks] = useState(1);
  const [doorbell, setDoorbell] = useState(true);
  const [thermostat, setThermostat] = useState(true);
  const [bulbs, setBulbs] = useState(8);
  const [switches, setSwitches] = useState(3);
  const [speakers, setSpeakers] = useState(2);
  const [blinds, setBlinds] = useState(0);
  const [plugs, setPlugs] = useState(4);
  const [hub, setHub] = useState<HubKind>("smartthings");
  const [laborHours, setLaborHours] = useState(4);
  const [diy, setDiy] = useState(false);

  const hubCost = (k: HubKind) => {
    if (k === "none") return 0;
    if (k === "aqara") return 50;
    if (k === "smartthings") return 100;
    if (k === "homekit") return 100;
    return 150;
  };

  const result = useMemo(() => {
    const safe = (n: number) => (Number.isFinite(n) ? Math.max(0, n) : 0);
    const items = [
      { name: "Security cameras", qty: safe(cameras), unit: 150, cost: safe(cameras) * 150 },
      { name: "Smart locks", qty: safe(locks), unit: 250, cost: safe(locks) * 250 },
      { name: "Video doorbell", qty: doorbell ? 1 : 0, unit: 200, cost: doorbell ? 200 : 0 },
      { name: "Smart thermostat", qty: thermostat ? 1 : 0, unit: 250, cost: thermostat ? 250 : 0 },
      { name: "Smart bulbs", qty: safe(bulbs), unit: 15, cost: safe(bulbs) * 15 },
      { name: "Smart switches", qty: safe(switches), unit: 50, cost: safe(switches) * 50 },
      { name: "Smart speakers", qty: safe(speakers), unit: 120, cost: safe(speakers) * 120 },
      { name: "Smart blinds", qty: safe(blinds), unit: 275, cost: safe(blinds) * 275 },
      { name: "Smart plugs", qty: safe(plugs), unit: 18, cost: safe(plugs) * 18 },
      { name: "Hub", qty: hub === "none" ? 0 : 1, unit: hubCost(hub), cost: hubCost(hub) },
    ];
    const hardware = items.reduce((s, i) => s + i.cost, 0);
    const labor = diy ? 0 : safe(laborHours) * 100;
    const total = hardware + labor;

    // Monthly subscription scales loosely with cameras and locks
    const sub = Math.min(30, Math.max(10, safe(cameras) * 3 + safe(locks) * 2 + (doorbell ? 3 : 0) + 6));

    const proLabor = safe(laborHours) * 100;
    const diyLabor = 0;
    const proTotal = hardware + proLabor;
    const diyTotal = hardware + diyLabor;

    return { items, hardware, labor, total, sub, proTotal, diyTotal };
  }, [cameras, locks, doorbell, thermostat, bulbs, switches, speakers, blinds, plugs, hub, laborHours, diy]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Security cameras</span>
          <input
            type="number"
            value={cameras}
            onChange={(e) => setCameras(parseInt(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Smart locks</span>
          <input
            type="number"
            value={locks}
            onChange={(e) => setLocks(parseInt(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={doorbell} onChange={(e) => setDoorbell(e.target.checked)} />
          <span className="font-medium">Video doorbell</span>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={thermostat} onChange={(e) => setThermostat(e.target.checked)} />
          <span className="font-medium">Smart thermostat</span>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Smart bulbs</span>
          <input
            type="number"
            value={bulbs}
            onChange={(e) => setBulbs(parseInt(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Smart switches</span>
          <input
            type="number"
            value={switches}
            onChange={(e) => setSwitches(parseInt(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Smart speakers</span>
          <input
            type="number"
            value={speakers}
            onChange={(e) => setSpeakers(parseInt(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Smart blinds</span>
          <input
            type="number"
            value={blinds}
            onChange={(e) => setBlinds(parseInt(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Smart plugs</span>
          <input
            type="number"
            value={plugs}
            onChange={(e) => setPlugs(parseInt(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Hub</span>
          <select
            value={hub}
            onChange={(e) => setHub(e.target.value as HubKind)}
            className="rounded border border-slate-300 px-3 py-2"
          >
            <option value="none">No hub</option>
            <option value="aqara">Aqara ($50)</option>
            <option value="smartthings">SmartThings ($100)</option>
            <option value="homekit">HomeKit ($100)</option>
            <option value="premium">Premium hub ($150)</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Install labor (hrs)</span>
          <input
            type="number"
            value={laborHours}
            onChange={(e) => setLaborHours(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={diy} onChange={(e) => setDiy(e.target.checked)} />
          <span className="font-medium">DIY install (no labor cost)</span>
        </label>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-3 py-2">Item</th>
              <th className="px-3 py-2">Qty</th>
              <th className="px-3 py-2">Unit</th>
              <th className="px-3 py-2">Cost</th>
            </tr>
          </thead>
          <tbody>
            {result.items
              .filter((i) => i.qty > 0)
              .map((i) => (
                <tr key={i.name} className="border-t border-slate-100">
                  <td className="px-3 py-2">{i.name}</td>
                  <td className="px-3 py-2">{i.qty}</td>
                  <td className="px-3 py-2">{fmt(i.unit)}</td>
                  <td className="px-3 py-2">{fmt(i.cost)}</td>
                </tr>
              ))}
            {!diy && (
              <tr className="border-t border-slate-100">
                <td className="px-3 py-2">Install labor</td>
                <td className="px-3 py-2">{laborHours} hr</td>
                <td className="px-3 py-2">$100/hr</td>
                <td className="px-3 py-2">{fmt(result.labor)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Hardware total</div>
          <div className="text-2xl font-bold text-brand">{fmt(result.hardware)}</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Total (with labor)</div>
          <div className="text-2xl font-bold text-brand">{fmt(result.total)}</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Monthly subscriptions</div>
          <div className="text-2xl font-bold text-brand">{fmt(result.sub)}/mo</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">DIY vs Pro</div>
          <div className="text-sm">
            DIY: <strong>{fmt(result.diyTotal)}</strong>
            <br />
            Pro: <strong>{fmt(result.proTotal)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
