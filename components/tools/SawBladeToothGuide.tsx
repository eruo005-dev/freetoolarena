"use client";

import { useMemo, useState } from "react";

type Material =
  | "softwood"
  | "hardwood"
  | "plywood"
  | "mdf"
  | "melamine"
  | "aluminum"
  | "steel"
  | "plastic";

type CutType = "ripping" | "crosscut" | "combo";

interface Recommendation {
  teeth: string;
  bladeType: string;
  hookAngle: string;
  rpm: string;
  safety: string;
}

function recommend(material: Material, cut: CutType): Recommendation {
  if (material === "softwood") {
    if (cut === "ripping")
      return {
        teeth: "24T",
        bladeType: "Rip (flat-top grind)",
        hookAngle: "20&deg; positive",
        rpm: "3,800 - 4,500 RPM",
        safety: "Use a riving knife and push stick for ripping."
      };
    if (cut === "crosscut")
      return {
        teeth: "60T",
        bladeType: "ATB (alternate top bevel)",
        hookAngle: "10-15&deg; positive",
        rpm: "3,800 - 4,500 RPM",
        safety: "Support long stock with an outfeed roller."
      };
    return {
      teeth: "40T-50T",
      bladeType: "Combination ATB+R",
      hookAngle: "15&deg; positive",
      rpm: "3,800 - 4,500 RPM",
      safety: "General-purpose blade; check for kickback on rip cuts."
    };
  }
  if (material === "hardwood") {
    if (cut === "ripping")
      return {
        teeth: "24T-30T",
        bladeType: "Rip (flat-top grind)",
        hookAngle: "18-20&deg; positive",
        rpm: "3,500 - 4,200 RPM",
        safety: "Feed slow; hardwood can bind and cause kickback."
      };
    if (cut === "crosscut")
      return {
        teeth: "80T",
        bladeType: "ATB fine-finish",
        hookAngle: "5-10&deg; positive",
        rpm: "3,500 - 4,200 RPM",
        safety: "Sharp blade required; burn marks mean dull teeth."
      };
    return {
      teeth: "50T",
      bladeType: "Combination ATB+R",
      hookAngle: "15&deg; positive",
      rpm: "3,500 - 4,200 RPM",
      safety: "Balance rip aggression and crosscut smoothness."
    };
  }
  if (material === "plywood" || material === "mdf") {
    return {
      teeth: "80T",
      bladeType: "Hi-ATB (high alternate top bevel)",
      hookAngle: "5-10&deg; positive",
      rpm: "3,800 - 4,500 RPM",
      safety: "Score cut or zero-clearance insert to prevent tear-out."
    };
  }
  if (material === "melamine") {
    return {
      teeth: "80T",
      bladeType: "TCG (triple-chip grind)",
      hookAngle: "5&deg; positive",
      rpm: "3,800 - 4,500 RPM",
      safety: "Use scoring blade on both sides to avoid chipping."
    };
  }
  if (material === "aluminum") {
    return {
      teeth: "80T",
      bladeType: "Non-ferrous TCG",
      hookAngle: "-5 to 0&deg; (negative)",
      rpm: "3,000 - 3,500 RPM",
      safety: "Use cutting wax/lube. Clamp workpiece securely."
    };
  }
  if (material === "steel") {
    return {
      teeth: "Abrasive or carbide metal-cut",
      bladeType: "Metal-cutting abrasive / ferrous TCG",
      hookAngle: "-5&deg; negative",
      rpm: "1,500 - 2,500 RPM",
      safety: "Eye/ear protection mandatory. Sparks + hot chips."
    };
  }
  return {
    teeth: "60T-80T",
    bladeType: "TCG (triple-chip grind)",
    hookAngle: "0&deg; neutral",
    rpm: "3,000 - 4,000 RPM",
    safety: "Slow feed prevents melting; clear chips frequently."
  };
}

export function SawBladeToothGuide() {
  const [material, setMaterial] = useState<Material>("hardwood");
  const [cut, setCut] = useState<CutType>("crosscut");

  const rec = useMemo(() => recommend(material, cut), [material, cut]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-brand">Saw Blade Tooth Guide</h2>
        <p className="text-sm text-gray-600 mt-1">
          Pick the right blade tooth count and geometry for your material and cut type.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Material</label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value as Material)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="softwood">Softwood (pine, fir, cedar)</option>
            <option value="hardwood">Hardwood (oak, maple, walnut)</option>
            <option value="plywood">Plywood</option>
            <option value="mdf">MDF</option>
            <option value="melamine">Melamine</option>
            <option value="aluminum">Aluminum (non-ferrous)</option>
            <option value="steel">Steel (ferrous)</option>
            <option value="plastic">Plastic / Acrylic</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cut type</label>
          <select
            value={cut}
            onChange={(e) => setCut(e.target.value as CutType)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="ripping">Ripping (with grain)</option>
            <option value="crosscut">Crosscut (across grain)</option>
            <option value="combo">Combination / general</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 border rounded p-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Tooth count</span>
          <span className="font-semibold">{rec.teeth}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Blade type</span>
          <span className="font-semibold">{rec.bladeType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Hook angle</span>
          <span
            className="font-semibold"
            dangerouslySetInnerHTML={{ __html: rec.hookAngle }}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Table saw RPM</span>
          <span className="font-semibold">{rec.rpm}</span>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded p-4 text-sm text-amber-900">
        <strong>Safety:</strong> {rec.safety} Always wear eye protection and keep guards
        installed. Let the blade reach full speed before entering the cut.
      </div>

      <div className="text-xs text-gray-500">
        Rule of thumb: more teeth &#61; smoother cut but slower feed &#43; more heat. Fewer
        teeth &#61; faster rip with larger gullets to clear chips.
      </div>
    </div>
  );
}
