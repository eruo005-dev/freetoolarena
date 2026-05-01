"use client";

import { useMemo, useState } from "react";

type Unit = "in" | "cm";

function inToCm(v: number) { return v * 2.54; }
function cmToIn(v: number) { return v / 2.54; }

export function ErgonomicDeskSetupChecker() {
  const [height, setHeight] = useState<number>(68); // inches
  const [unit, setUnit] = useState<Unit>("in");

  const result = useMemo(() => {
    const h = unit === "cm" ? cmToIn(height) : height;
    if (!Number.isFinite(h) || h < 50 || h > 90) return null;

    const elbowFromFloor = h * 0.49;
    const popliteal = h * 0.27;
    const eye = h * 0.93;

    const desk = elbowFromFloor;
    const chair = popliteal;
    const monitorCenter = eye - 2;
    const monitorTop = eye + 1;
    const monitorDistMin = 20;
    const monitorDistMax = 30;
    const keyboardHeight = elbowFromFloor;

    const out = (v: number) => unit === "cm" ? inToCm(v) : v;
    const fmt = (v: number) => out(v).toFixed(1) + " " + unit;

    return {
      desk: fmt(desk),
      chair: fmt(chair),
      monitorCenter: fmt(monitorCenter),
      monitorTop: fmt(monitorTop),
      keyboardHeight: fmt(keyboardHeight),
      distance: unit === "cm"
        ? `${inToCm(monitorDistMin).toFixed(0)}-${inToCm(monitorDistMax).toFixed(0)} cm`
        : `${monitorDistMin}-${monitorDistMax} in`,
    };
  }, [height, unit]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Your height</span>
          <input
            type="number"
            min={unit === "cm" ? 130 : 50}
            max={unit === "cm" ? 220 : 90}
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Units</span>
          <select
            value={unit}
            onChange={(e) => {
              const next = e.target.value as Unit;
              setUnit(next);
              setHeight((h) => (next === "cm" && unit === "in" ? Math.round(inToCm(h)) : next === "in" && unit === "cm" ? Math.round(cmToIn(h)) : h));
            }}
            className="w-full rounded border border-slate-300 px-3 py-2"
          >
            <option value="in">Inches</option>
            <option value="cm">Centimeters</option>
          </select>
        </label>
      </div>

      {result && (
        <>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <h4 className="mb-3 text-sm font-semibold text-emerald-900">
              Ideal setup for your height
            </h4>
            <ul className="grid gap-2 text-sm text-emerald-900 sm:grid-cols-2">
              <li><strong>Desk surface:</strong> {result.desk} from floor</li>
              <li><strong>Chair seat:</strong> {result.chair} from floor</li>
              <li><strong>Monitor top edge:</strong> {result.monitorTop} from floor</li>
              <li><strong>Monitor center:</strong> {result.monitorCenter} from floor</li>
              <li><strong>Monitor distance:</strong> {result.distance} from eyes</li>
              <li><strong>Keyboard height:</strong> {result.keyboardHeight} from floor</li>
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h4 className="mb-2 text-sm font-semibold text-slate-700">
              How to verify with your body
            </h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li><strong>Elbows:</strong> sit relaxed; forearms parallel to floor at the keyboard.</li>
              <li><strong>Knees:</strong> 90&deg; or slightly more; thighs parallel to floor; feet flat.</li>
              <li><strong>Eyes:</strong> top of monitor at or just below eye line when sitting tall.</li>
              <li><strong>Wrists:</strong> straight, never bent up or down at the keyboard.</li>
              <li><strong>Back:</strong> chair lumbar support hits the small of your back.</li>
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h4 className="mb-2 text-sm font-semibold text-slate-700">Cheap fixes if your numbers are off</h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Desk too tall? Raise the chair, then add a footrest (a thick book works).</li>
              <li>Desk too short? Riser blocks under the legs, or a laptop stand.</li>
              <li>Monitor too low? Stack of books or a $20 monitor riser. Don&rsquo;t look down all day.</li>
              <li>Monitor too close? Move it back; eye strain compounds over hours.</li>
              <li>Bad chair lumbar? Roll a small towel into the small of your back.</li>
            </ul>
          </div>

          <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
            <strong>Note:</strong> heights are anthropometric averages from BIFMA G1-2013 and OSHA
            guidelines. Adjust by an inch or so based on shoe height, chair cushion compression,
            and personal preference. The 20-20-20 rule still applies regardless of geometry.
          </div>
        </>
      )}
    </div>
  );
}
