"use client";

import { useMemo, useState } from "react";

type InputMode = "riseRun" | "angle";

function categorize(pitch: number): { label: string; color: string } {
  if (pitch < 3) return { label: "Flat / low-slope", color: "text-red-700" };
  if (pitch < 5) return { label: "Low slope", color: "text-orange-700" };
  if (pitch <= 9) return { label: "Conventional", color: "text-green-700" };
  return { label: "Steep", color: "text-blue-700" };
}

function shingleSpec(pitch: number): string {
  if (pitch < 2)
    return "Requires membrane roofing (EPDM, TPO, or built-up). Shingles not permitted.";
  if (pitch < 4)
    return "Use rolled roofing or install shingles with ice-and-water shield over entire deck.";
  if (pitch <= 12)
    return "Architectural asphalt shingles acceptable. Standard underlayment is fine.";
  return "Steep-slope shingles with extra fasteners required. Consider safety harnesses for install.";
}

export function RoofPitchCalculator() {
  const [mode, setMode] = useState<InputMode>("riseRun");
  const [rise, setRise] = useState(6);
  const [run, setRun] = useState(12);
  const [angle, setAngle] = useState(26.57);

  const result = useMemo(() => {
    let rIn = rise;
    let rRun = run;
    let degrees = 0;

    if (mode === "riseRun") {
      if (
        !Number.isFinite(rise) ||
        !Number.isFinite(run) ||
        run <= 0 ||
        rise < 0
      ) {
        return null;
      }
      degrees = (Math.atan(rise / run) * 180) / Math.PI;
      rIn = rise;
      rRun = run;
    } else {
      if (!Number.isFinite(angle) || angle < 0 || angle >= 90) return null;
      degrees = angle;
      rRun = 12;
      rIn = Math.tan((angle * Math.PI) / 180) * 12;
    }

    const pitchPer12 = (rIn / rRun) * 12;
    const grade = (rIn / rRun) * 100;
    const cat = categorize(pitchPer12);
    const spec = shingleSpec(pitchPer12);
    const rafterMultiplier = Math.sqrt(1 + (rIn / rRun) ** 2);

    return {
      pitchPer12: +pitchPer12.toFixed(2),
      degrees: +degrees.toFixed(2),
      grade: +grade.toFixed(1),
      cat,
      spec,
      rafterMultiplier: +rafterMultiplier.toFixed(4)
    };
  }, [mode, rise, run, angle]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-brand">Roof Pitch Calculator</h2>
        <p className="text-sm text-gray-600 mt-1">
          Convert between X-in-12 pitch, angle in degrees, and percent grade.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Input mode</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as InputMode)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="riseRun">Rise &amp; run</option>
          <option value="angle">Angle in degrees</option>
        </select>
      </div>

      {mode === "riseRun" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Rise (inches)</label>
            <input
              type="number"
              value={rise}
              onChange={(e) => setRise(parseFloat(e.target.value))}
              className="w-full border rounded px-3 py-2"
              min={0}
              step={0.25}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Run (inches, default 12)
            </label>
            <input
              type="number"
              value={run}
              onChange={(e) => setRun(parseFloat(e.target.value))}
              className="w-full border rounded px-3 py-2"
              min={1}
              step={0.25}
            />
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium mb-1">Roof angle (degrees)</label>
          <input
            type="number"
            value={angle}
            onChange={(e) => setAngle(parseFloat(e.target.value))}
            className="w-full border rounded px-3 py-2"
            min={0}
            max={89.9}
            step={0.1}
          />
        </div>
      )}

      {result && (
        <>
          <div className="bg-gray-50 border rounded p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Pitch</span>
              <span className="font-semibold text-brand">
                {result.pitchPer12}/12
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Angle</span>
              <span className="font-semibold">{result.degrees}&deg;</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Percent grade</span>
              <span className="font-semibold">{result.grade}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Rafter length factor</span>
              <span className="font-semibold">
                &times;{result.rafterMultiplier} per ft of run
              </span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-sm text-gray-600">Category</span>
              <span className={`font-semibold ${result.cat.color}`}>
                {result.cat.label}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-blue-900">
            <strong>Roofing material:</strong> {result.spec}
          </div>

          <div className="text-xs text-gray-500">
            Categories: flat &lt; 3/12 &bull; low 3&ndash;4/12 &bull; conventional
            5&ndash;9/12 &bull; steep &gt; 9/12. Architectural shingles require a
            minimum 4/12 pitch per most manufacturer warranties.
          </div>
        </>
      )}
    </div>
  );
}
