"use client";

import { useMemo, useState } from "react";

interface PlateFormat {
  state: string;
  abbr: string;
  pattern: string;
  regex: string;
  maxLength: number;
  examples: [string, string, string];
  personalizedMax: number;
  commercial: string;
  vanity: string;
}

const PLATES: PlateFormat[] = [
  { state: "Alabama", abbr: "AL", pattern: "2 digits + 2 letters + 3 digits", regex: "^[0-9]{2}[A-Z]{2}[0-9]{3}$", maxLength: 7, examples: ["12AB345", "47JK982", "10XY221"], personalizedMax: 7, commercial: "Truck prefix + 5 digits", vanity: "Up to 7 characters, no spaces" },
  { state: "Alaska", abbr: "AK", pattern: "3 letters + 3 digits", regex: "^[A-Z]{3}[0-9]{3}$", maxLength: 6, examples: ["ABC123", "JKL908", "ZNP502"], personalizedMax: 6, commercial: "N prefix + 5 digits", vanity: "Up to 6 characters" },
  { state: "Arizona", abbr: "AZ", pattern: "3 letters + 4 digits", regex: "^[A-Z]{3}[0-9]{4}$", maxLength: 7, examples: ["ABC1234", "LMN0099", "TUV5521"], personalizedMax: 7, commercial: "CM + 5 digits", vanity: "Up to 7 alphanumeric, space allowed" },
  { state: "Arkansas", abbr: "AR", pattern: "3 digits + 3 letters", regex: "^[0-9]{3}[A-Z]{3}$", maxLength: 6, examples: ["123ABC", "456XYZ", "901PQR"], personalizedMax: 6, commercial: "T prefix + 5 digits", vanity: "Up to 6 characters" },
  { state: "California", abbr: "CA", pattern: "1 digit + 3 letters + 3 digits", regex: "^[0-9][A-Z]{3}[0-9]{3}$", maxLength: 7, examples: ["1ABC234", "7XYZ890", "5JKL012"], personalizedMax: 7, commercial: "Number prefix + letters", vanity: "Up to 7 characters incl. spaces" },
  { state: "Colorado", abbr: "CO", pattern: "3 letters + 3 digits", regex: "^[A-Z]{3}[0-9]{3}$", maxLength: 6, examples: ["ABC123", "LMN456", "XYZ789"], personalizedMax: 7, commercial: "Starts with 0", vanity: "Up to 7 characters" },
  { state: "Connecticut", abbr: "CT", pattern: "3 letters + 4 digits or AB-12345", regex: "^[A-Z]{2,3}[-·][0-9]{4,5}$", maxLength: 7, examples: ["AB12345", "ABC1234", "XY98765"], personalizedMax: 7, commercial: "CT + 5 digits", vanity: "Up to 7 characters" },
  { state: "Delaware", abbr: "DE", pattern: "Up to 6 digits", regex: "^[0-9]{1,6}$", maxLength: 6, examples: ["123456", "47829", "9"], personalizedMax: 7, commercial: "C prefix + digits", vanity: "Up to 7 alphanumeric" },
  { state: "District of Columbia", abbr: "DC", pattern: "2 letters + 4 digits", regex: "^[A-Z]{2}[0-9]{4}$", maxLength: 6, examples: ["AB1234", "DC9900", "GH4521"], personalizedMax: 7, commercial: "H prefix + digits", vanity: "Up to 7 characters" },
  { state: "Florida", abbr: "FL", pattern: "3 letters + 2 digits + 1 letter", regex: "^[A-Z]{3}[0-9]{2}[A-Z]$", maxLength: 7, examples: ["ABC12D", "LMN45P", "XYZ78Q"], personalizedMax: 7, commercial: "Truck + digits", vanity: "Up to 7 characters" },
  { state: "Georgia", abbr: "GA", pattern: "3 letters + 4 digits", regex: "^[A-Z]{3}[0-9]{4}$", maxLength: 7, examples: ["ABC1234", "LMN5678", "XYZ9012"], personalizedMax: 7, commercial: "P prefix + digits", vanity: "Up to 7 characters" },
  { state: "Hawaii", abbr: "HI", pattern: "3 letters + 3 digits", regex: "^[A-Z]{3}[0-9]{3}$", maxLength: 6, examples: ["HIB123", "ALO808", "KAI456"], personalizedMax: 7, commercial: "T + digits", vanity: "Up to 7 characters" },
  { state: "Idaho", abbr: "ID", pattern: "County code + letter + digits", regex: "^[0-9][A-Z][0-9]{4,5}$", maxLength: 7, examples: ["1A12345", "2B98765", "7K44210"], personalizedMax: 7, commercial: "Based on weight class", vanity: "Up to 7 characters" },
  { state: "Illinois", abbr: "IL", pattern: "AB 12345 or ABC 1234", regex: "^[A-Z]{1,3}[0-9]{4,5}$", maxLength: 7, examples: ["AB12345", "ABC1234", "XYZ5678"], personalizedMax: 7, commercial: "B prefix + digits", vanity: "Up to 7 characters" },
  { state: "Indiana", abbr: "IN", pattern: "3 digits + letter + 2 digits", regex: "^[0-9]{3}[A-Z][0-9]{2}$", maxLength: 6, examples: ["123A45", "456B78", "901X22"], personalizedMax: 7, commercial: "Weight class prefix", vanity: "Up to 7 characters" },
  { state: "Iowa", abbr: "IA", pattern: "3 letters + 3 digits", regex: "^[A-Z]{3}[0-9]{3}$", maxLength: 6, examples: ["ABC123", "IOW456", "FMR789"], personalizedMax: 7, commercial: "T + digits", vanity: "Up to 7 characters" },
  { state: "Kansas", abbr: "KS", pattern: "3 digits + 3 letters", regex: "^[0-9]{3}[A-Z]{3}$", maxLength: 6, examples: ["123ABC", "456LMN", "789XYZ"], personalizedMax: 7, commercial: "County + digits", vanity: "Up to 7 characters" },
  { state: "Kentucky", abbr: "KY", pattern: "3 letters + 3 digits", regex: "^[A-Z]{3}[0-9]{3}$", maxLength: 6, examples: ["ABC123", "LMN456", "DER789"], personalizedMax: 6, commercial: "T + digits", vanity: "Up to 6 characters" },
  { state: "Louisiana", abbr: "LA", pattern: "3 letters + 3 digits", regex: "^[A-Z]{3}[0-9]{3}$", maxLength: 6, examples: ["ABC123", "LAF456", "BAT789"], personalizedMax: 7, commercial: "T + digits", vanity: "Up to 7 characters" },
  { state: "Maine", abbr: "ME", pattern: "4 digits + 2 letters", regex: "^[0-9]{4}[A-Z]{2}$", maxLength: 6, examples: ["1234AB", "9876ME", "4521PQ"], personalizedMax: 7, commercial: "CMB + digits", vanity: "Up to 7 characters" },
  { state: "Maryland", abbr: "MD", pattern: "1 letter + 6 digits", regex: "^[0-9][A-Z]{2}[0-9]{4}$", maxLength: 7, examples: ["1AB2345", "7CD8901", "5EF4321"], personalizedMax: 7, commercial: "Truck + 5 digits", vanity: "Up to 7 characters" },
  { state: "Massachusetts", abbr: "MA", pattern: "1 digit + 3 letters + 3 digits", regex: "^[0-9][A-Z]{3}[0-9]{3}$", maxLength: 7, examples: ["1ABC234", "7XYZ890", "5JKL012"], personalizedMax: 6, commercial: "C + 5 digits", vanity: "Up to 6 characters" },
  { state: "Michigan", abbr: "MI", pattern: "3 letters + 4 digits", regex: "^[A-Z]{3}[0-9]{4}$", maxLength: 7, examples: ["ABC1234", "DEF5678", "XYZ9012"], personalizedMax: 7, commercial: "Truck prefix", vanity: "Up to 7 characters" },
  { state: "Minnesota", abbr: "MN", pattern: "3 letters + 3 digits", regex: "^[A-Z]{3}[0-9]{3}$", maxLength: 7, examples: ["ABC123", "MNV456", "LMN789"], personalizedMax: 7, commercial: "Weight class", vanity: "Up to 7 characters, spaces allowed" },
  { state: "Mississippi", abbr: "MS", pattern: "3 letters + 3 digits", regex: "^[A-Z]{3}[0-9]{3}$", maxLength: 6, examples: ["ABC123", "MSH456", "DLT789"], personalizedMax: 7, commercial: "C + digits", vanity: "Up to 7 characters" },
  { state: "Missouri", abbr: "MO", pattern: "2 letters + 1 digit + 1 letter + 2 digits", regex: "^[A-Z]{2}[0-9][A-Z][0-9]{2}$", maxLength: 6, examples: ["AB1C23", "MO5D99", "LK7P12"], personalizedMax: 6, commercial: "T + digits", vanity: "Up to 6 characters" },
  { state: "Montana", abbr: "MT", pattern: "County + letter + digits", regex: "^[0-9]{1,2}-[0-9]{4}[A-Z]$", maxLength: 7, examples: ["1-1234A", "12-5678B", "5-9901X"], personalizedMax: 7, commercial: "T prefix", vanity: "Up to 7 characters" },
  { state: "Nebraska", abbr: "NE", pattern: "County + letters + digits", regex: "^[0-9]{1,2}-[A-Z][0-9]{3}$", maxLength: 6, examples: ["1-A123", "47-B456", "12-K789"], personalizedMax: 7, commercial: "County + T", vanity: "Up to 7 characters" },
  { state: "Nevada", abbr: "NV", pattern: "3 letters + 3 digits", regex: "^[0-9]{3}[·][A-Z]{3}$", maxLength: 6, examples: ["123ABC", "456XYZ", "789NVR"], personalizedMax: 7, commercial: "Truck prefix", vanity: "Up to 7 characters" },
  { state: "New Hampshire", abbr: "NH", pattern: "3 digits + 4 digits", regex: "^[0-9]{3}[ ][0-9]{4}$", maxLength: 7, examples: ["123 4567", "456 7890", "789 0123"], personalizedMax: 7, commercial: "C + digits", vanity: "Up to 7 characters" },
  { state: "New Jersey", abbr: "NJ", pattern: "1 letter + 2 digits + 3 letters", regex: "^[A-Z][0-9]{2}[A-Z]{3}$", maxLength: 6, examples: ["A12BCD", "X45LMN", "K78PQR"], personalizedMax: 7, commercial: "XA + digits", vanity: "Up to 7 characters" },
  { state: "New Mexico", abbr: "NM", pattern: "3 letters + 3 digits", regex: "^[A-Z]{3}[-·][0-9]{3}$", maxLength: 6, examples: ["ABC-123", "NMX-456", "LMN-789"], personalizedMax: 7, commercial: "C + digits", vanity: "Up to 7 characters" },
  { state: "New York", abbr: "NY", pattern: "3 letters + 4 digits", regex: "^[A-Z]{3}[-·][0-9]{4}$", maxLength: 7, examples: ["ABC-1234", "NYC-5678", "LMN-9012"], personalizedMax: 8, commercial: "Com + digits", vanity: "Up to 8 characters" },
  { state: "North Carolina", abbr: "NC", pattern: "3 letters + 4 digits", regex: "^[A-Z]{3}[-·][0-9]{4}$", maxLength: 7, examples: ["ABC-1234", "NCR-5678", "LMN-9012"], personalizedMax: 8, commercial: "TR + digits", vanity: "Up to 8 characters" },
  { state: "North Dakota", abbr: "ND", pattern: "3 letters + 3 digits", regex: "^[0-9]{3}[A-Z]{3}$", maxLength: 6, examples: ["123ABC", "456NDK", "789LMN"], personalizedMax: 7, commercial: "T + digits", vanity: "Up to 7 characters" },
  { state: "Ohio", abbr: "OH", pattern: "3 letters + 4 digits", regex: "^[A-Z]{3}[ ][0-9]{4}$", maxLength: 7, examples: ["ABC 1234", "OHI 5678", "LMN 9012"], personalizedMax: 7, commercial: "P + digits", vanity: "Up to 7 characters" },
  { state: "Oklahoma", abbr: "OK", pattern: "3 letters + 3 digits", regex: "^[A-Z]{3}[-·][0-9]{3}$", maxLength: 6, examples: ["ABC-123", "OKL-456", "LMN-789"], personalizedMax: 7, commercial: "Truck + digits", vanity: "Up to 7 characters" },
  { state: "Oregon", abbr: "OR", pattern: "3 digits + 3 letters", regex: "^[0-9]{3}[ ][A-Z]{3}$", maxLength: 6, examples: ["123 ABC", "456 ORE", "789 LMN"], personalizedMax: 6, commercial: "Weight code", vanity: "Up to 6 characters" },
  { state: "Pennsylvania", abbr: "PA", pattern: "3 letters + 4 digits", regex: "^[A-Z]{3}[-·][0-9]{4}$", maxLength: 7, examples: ["ABC-1234", "PAG-5678", "LMN-9012"], personalizedMax: 7, commercial: "XH + digits", vanity: "Up to 7 characters" },
  { state: "Rhode Island", abbr: "RI", pattern: "3 digits + 3 letters or 2 letters + 4 digits", regex: "^[0-9]{3}[A-Z]{3}$", maxLength: 6, examples: ["123ABC", "RI4567", "901LMN"], personalizedMax: 7, commercial: "PC + digits", vanity: "Up to 7 characters" },
  { state: "South Carolina", abbr: "SC", pattern: "3 letters + 3 digits", regex: "^[A-Z]{3}[ ][0-9]{3}$", maxLength: 6, examples: ["ABC 123", "SCH 456", "LMN 789"], personalizedMax: 7, commercial: "TF + digits", vanity: "Up to 7 characters" },
  { state: "South Dakota", abbr: "SD", pattern: "County + letters + digits", regex: "^[0-9]{1,2}[A-Z][0-9]{3}$", maxLength: 6, examples: ["1A123", "47B456", "12K789"], personalizedMax: 7, commercial: "T + digits", vanity: "Up to 7 characters" },
  { state: "Tennessee", abbr: "TN", pattern: "3 letters + 3 digits", regex: "^[A-Z]{3}[-·][0-9]{3}$", maxLength: 6, examples: ["ABC-123", "TNS-456", "LMN-789"], personalizedMax: 7, commercial: "CT + digits", vanity: "Up to 7 characters" },
  { state: "Texas", abbr: "TX", pattern: "3 letters + 4 digits", regex: "^[A-Z]{3}[-·][0-9]{4}$", maxLength: 7, examples: ["ABC-1234", "TXR-5678", "LMN-9012"], personalizedMax: 7, commercial: "AA + digits", vanity: "Up to 7 characters" },
  { state: "Utah", abbr: "UT", pattern: "1 letter + 2 digits + 2 letters", regex: "^[A-Z][0-9]{3}[A-Z]{2}$", maxLength: 6, examples: ["A123BC", "U456TL", "P789ZK"], personalizedMax: 7, commercial: "T + digits", vanity: "Up to 7 characters" },
  { state: "Vermont", abbr: "VT", pattern: "3 letters + 3 digits", regex: "^[A-Z]{3}[0-9]{3}$", maxLength: 7, examples: ["ABC123", "VTM456", "LMN789"], personalizedMax: 7, commercial: "T + digits", vanity: "Up to 7 characters" },
  { state: "Virginia", abbr: "VA", pattern: "3 letters + 4 digits", regex: "^[A-Z]{3}[-·][0-9]{4}$", maxLength: 7, examples: ["ABC-1234", "VAX-5678", "LMN-9012"], personalizedMax: 7, commercial: "T + digits", vanity: "Up to 7 characters" },
  { state: "Washington", abbr: "WA", pattern: "3 letters + 4 digits", regex: "^[A-Z]{3}[0-9]{4}$", maxLength: 7, examples: ["ABC1234", "WAS5678", "LMN9012"], personalizedMax: 7, commercial: "Truck prefix", vanity: "Up to 7 characters, space ok" },
  { state: "West Virginia", abbr: "WV", pattern: "3 letters + 3 digits", regex: "^[0-9][A-Z]{2}[0-9]{3}$", maxLength: 6, examples: ["1AB234", "7WV890", "5LM012"], personalizedMax: 6, commercial: "PC + digits", vanity: "Up to 6 characters" },
  { state: "Wisconsin", abbr: "WI", pattern: "3 letters + 4 digits", regex: "^[A-Z]{3}[-·][0-9]{4}$", maxLength: 7, examples: ["ABC-1234", "WIS-5678", "LMN-9012"], personalizedMax: 7, commercial: "C + digits", vanity: "Up to 7 characters" },
  { state: "Wyoming", abbr: "WY", pattern: "County + digits + letters", regex: "^[0-9]{1,2}-[0-9]{4,5}[A-Z]?$", maxLength: 7, examples: ["1-12345", "2-6789A", "17-4521"], personalizedMax: 5, commercial: "T + digits", vanity: "Up to 5 characters" },
];

export function LicensePlateFormatLookup() {
  const [abbr, setAbbr] = useState("CA");

  const selected = useMemo(() => PLATES.find((p) => p.abbr === abbr) ?? PLATES[0], [abbr]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Select state</span>
        <select
          value={abbr}
          onChange={(e) => setAbbr(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        >
          {PLATES.map((p) => (
            <option key={p.abbr} value={p.abbr}>
              {p.state} ({p.abbr})
            </option>
          ))}
        </select>
      </label>

      <div className="rounded-xl bg-slate-50 p-5 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">{selected.state} standard plate</p>
          <p className="text-2xl font-bold text-brand">{selected.pattern}</p>
          <p className="text-xs text-slate-500 mt-1">Regex: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">{selected.regex}</code></p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {selected.examples.map((ex) => (
            <div key={ex} className="rounded-lg border-2 border-slate-800 bg-white px-3 py-4 text-center">
              <p className="font-mono text-xl font-bold tracking-widest text-slate-900">{ex}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
        <p className="text-sm font-semibold text-slate-800">Plate specifications</p>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-0.5">Max length (standard)</p>
            <p className="text-slate-800 font-medium">{selected.maxLength} characters</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-0.5">Personalized max</p>
            <p className="text-slate-800 font-medium">{selected.personalizedMax} characters</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-0.5">Commercial</p>
            <p className="text-slate-800 font-medium">{selected.commercial}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-0.5">Vanity rules</p>
            <p className="text-slate-800 font-medium">{selected.vanity}</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Formats shown reflect current standard-issue passenger plates. Specialty, antique, dealer, and military plates follow separate patterns not covered here. Your state&rsquo;s DMV is the authoritative source &mdash; confirm before printing.
      </p>
    </div>
  );
}
