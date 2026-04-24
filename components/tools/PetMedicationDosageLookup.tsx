"use client";

import { useMemo, useState } from "react";

type Species = "dog" | "cat";
type MedId = "benadryl" | "pepcid" | "aspirin" | "claritin" | "cerenia";

type Med = {
  id: MedId;
  label: string;
  generic: string;
  mgPerLbLow: number;
  mgPerLbHigh: number;
  freqLow: number;
  freqHigh: number;
  maxDose?: number;
  tabletStrengthsMg: number[];
  allowedIn: Species[];
  notes: string;
  warning?: string;
};

const MEDS: Med[] = [
  {
    id: "benadryl",
    label: "Benadryl (diphenhydramine)",
    generic: "diphenhydramine",
    mgPerLbLow: 1,
    mgPerLbHigh: 1,
    freqLow: 2,
    freqHigh: 3,
    maxDose: 50,
    tabletStrengthsMg: [25],
    allowedIn: ["dog"],
    notes: "Used for mild allergies, itching, or travel anxiety in dogs. Avoid formulas with decongestants (pseudoephedrine, xylitol).",
  },
  {
    id: "pepcid",
    label: "Pepcid (famotidine)",
    generic: "famotidine",
    mgPerLbLow: 0.25,
    mgPerLbHigh: 0.5,
    freqLow: 1,
    freqHigh: 2,
    tabletStrengthsMg: [10, 20],
    allowedIn: ["dog", "cat"],
    notes: "Reduces stomach acid. Often used short-term for acid reflux or mild GI upset.",
  },
  {
    id: "aspirin",
    label: "Aspirin (acetylsalicylic acid)",
    generic: "aspirin",
    mgPerLbLow: 5,
    mgPerLbHigh: 10,
    freqLow: 2,
    freqHigh: 2,
    tabletStrengthsMg: [81, 325],
    allowedIn: ["dog"],
    notes: "Only buffered or baby aspirin, never with other NSAIDs. Not for long-term use.",
    warning: "NEVER give aspirin to cats &mdash; it is highly toxic to felines.",
  },
  {
    id: "claritin",
    label: "Claritin (loratadine)",
    generic: "loratadine",
    mgPerLbLow: 0.1,
    mgPerLbHigh: 0.5,
    freqLow: 1,
    freqHigh: 1,
    tabletStrengthsMg: [10],
    allowedIn: ["dog"],
    notes: "Non-drowsy antihistamine. Use plain loratadine only &mdash; never Claritin-D (contains pseudoephedrine, which is toxic).",
  },
  {
    id: "cerenia",
    label: "Cerenia (maropitant)",
    generic: "maropitant",
    mgPerLbLow: 0.45,
    mgPerLbHigh: 1,
    freqLow: 1,
    freqHigh: 1,
    tabletStrengthsMg: [16, 24, 60, 160],
    allowedIn: ["dog", "cat"],
    notes: "Prescription-only anti-nausea medication &mdash; only use if prescribed by your vet.",
  },
];

function round(n: number, decimals = 1) {
  const p = 10 ** decimals;
  return Math.round(n * p) / p;
}

export function PetMedicationDosageLookup() {
  const [species, setSpecies] = useState<Species>("dog");
  const [weight, setWeight] = useState(30);
  const [medId, setMedId] = useState<MedId>("benadryl");

  const med = MEDS.find((m) => m.id === medId)!;

  const result = useMemo(() => {
    if (!Number.isFinite(weight) || weight <= 0) return null;
    if (!med.allowedIn.includes(species)) return { blocked: true } as const;

    let low = weight * med.mgPerLbLow;
    let high = weight * med.mgPerLbHigh;
    if (med.maxDose) {
      low = Math.min(low, med.maxDose);
      high = Math.min(high, med.maxDose);
    }
    const strength = med.tabletStrengthsMg[0];
    const tabletsLow = low / strength;
    const tabletsHigh = high / strength;

    return {
      blocked: false as const,
      low,
      high,
      tabletsLow,
      tabletsHigh,
      strength,
    };
  }, [weight, med, species]);

  return (
    <div className="space-y-5">
      <div className="rounded-md border-2 border-amber-400 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-white font-bold text-sm"
          >
            !
          </span>
          <p className="text-sm text-amber-900">
            <strong>This is a reference only.</strong> Always consult your veterinarian before
            giving any medication. Some human meds are fatal to pets (Tylenol to cats, chocolate
            to dogs, etc).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Species</span>
          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value as Species)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Weight (lbs)</span>
          <input
            type="number"
            min={1}
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Medication</span>
          <select
            value={medId}
            onChange={(e) => setMedId(e.target.value as MedId)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="benadryl">Benadryl (diphenhydramine)</option>
            <option value="pepcid">Pepcid (famotidine)</option>
            <option value="aspirin">Aspirin &mdash; DO NOT USE IN CATS</option>
            <option value="claritin">Claritin (loratadine)</option>
            <option value="cerenia">Cerenia (maropitant) &mdash; vet Rx only</option>
          </select>
        </label>
      </div>

      {result ? (
        result.blocked ? (
          <div className="rounded-md border-2 border-red-400 bg-red-50 p-4 text-sm text-red-900">
            <strong>{med.label} is not safe for {species}s.</strong>
            {med.warning ? (
              <span
                className="block mt-1"
                dangerouslySetInnerHTML={{ __html: med.warning }}
              />
            ) : null}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500">
                Dosage range for a {weight.toLocaleString()} lb {species}
              </div>
              <div className="text-2xl font-semibold text-brand">
                {round(result.low, 2)} &ndash; {round(result.high, 2)} mg
              </div>
              <div className="text-sm text-gray-600">
                Given {med.freqLow === med.freqHigh ? med.freqLow : `${med.freqLow}\u2013${med.freqHigh}`}x daily
                {med.maxDose ? ` (max ${med.maxDose} mg per dose)` : ""}
              </div>
            </div>

            <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-700">
              Approx.{" "}
              <strong>
                {round(result.tabletsLow, 2)} &ndash; {round(result.tabletsHigh, 2)}
              </strong>{" "}
              of a {result.strength} mg tablet. Scored tablets can be split; others may need a
              pharmacy-cut dose.
            </div>

            <p className="text-sm text-gray-700">{med.notes}</p>

            {med.warning ? (
              <div
                className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-900"
                dangerouslySetInnerHTML={{ __html: `<strong>Warning:</strong> ${med.warning}` }}
              />
            ) : null}
          </div>
        )
      ) : null}
    </div>
  );
}
