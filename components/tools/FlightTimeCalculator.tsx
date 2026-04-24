"use client";

import { useMemo, useState } from "react";

type Airport = {
  code: string;
  name: string;
  lat: number;
  lon: number;
};

const AIRPORTS: Airport[] = [
  { code: "JFK", name: "New York JFK", lat: 40.6413, lon: -73.7781 },
  { code: "LAX", name: "Los Angeles", lat: 33.9416, lon: -118.4085 },
  { code: "LHR", name: "London Heathrow", lat: 51.47, lon: -0.4543 },
  { code: "CDG", name: "Paris Charles de Gaulle", lat: 49.0097, lon: 2.5479 },
  { code: "DXB", name: "Dubai", lat: 25.2532, lon: 55.3657 },
  { code: "NRT", name: "Tokyo Narita", lat: 35.772, lon: 140.3929 },
  { code: "SIN", name: "Singapore Changi", lat: 1.3644, lon: 103.9915 },
  { code: "SYD", name: "Sydney", lat: -33.9399, lon: 151.1753 },
  { code: "FRA", name: "Frankfurt", lat: 50.0379, lon: 8.5622 },
  { code: "AMS", name: "Amsterdam Schiphol", lat: 52.3105, lon: 4.7683 },
  { code: "HKG", name: "Hong Kong", lat: 22.308, lon: 113.9185 },
  { code: "ICN", name: "Seoul Incheon", lat: 37.4602, lon: 126.4407 },
  { code: "ORD", name: "Chicago O&rsquo;Hare", lat: 41.9742, lon: -87.9073 },
  { code: "ATL", name: "Atlanta", lat: 33.6407, lon: -84.4277 },
  { code: "DFW", name: "Dallas/Fort Worth", lat: 32.8998, lon: -97.0403 },
  { code: "DEN", name: "Denver", lat: 39.8561, lon: -104.6737 },
  { code: "SFO", name: "San Francisco", lat: 37.6213, lon: -122.379 },
  { code: "MIA", name: "Miami", lat: 25.7959, lon: -80.287 },
  { code: "BOS", name: "Boston Logan", lat: 42.3656, lon: -71.0096 },
  { code: "SEA", name: "Seattle-Tacoma", lat: 47.4502, lon: -122.3088 },
  { code: "MAD", name: "Madrid Barajas", lat: 40.4983, lon: -3.5676 },
  { code: "BCN", name: "Barcelona", lat: 41.2974, lon: 2.0833 },
  { code: "MUC", name: "Munich", lat: 48.3538, lon: 11.7861 },
  { code: "IST", name: "Istanbul", lat: 41.2753, lon: 28.7519 },
  { code: "DOH", name: "Doha", lat: 25.2731, lon: 51.608 },
  { code: "PEK", name: "Beijing Capital", lat: 40.0799, lon: 116.6031 },
  { code: "PVG", name: "Shanghai Pudong", lat: 31.1443, lon: 121.8083 },
  { code: "MEX", name: "Mexico City", lat: 19.4361, lon: -99.0719 },
  { code: "GRU", name: "S\u00e3o Paulo Guarulhos", lat: -23.4356, lon: -46.4731 },
  { code: "EZE", name: "Buenos Aires Ezeiza", lat: -34.8222, lon: -58.5358 },
  { code: "JNB", name: "Johannesburg", lat: -26.1392, lon: 28.246 },
  { code: "CAI", name: "Cairo", lat: 30.1127, lon: 31.4 },
  { code: "YYZ", name: "Toronto Pearson", lat: 43.6777, lon: -79.6248 },
  { code: "BKK", name: "Bangkok Suvarnabhumi", lat: 13.69, lon: 100.7501 },
  { code: "KUL", name: "Kuala Lumpur", lat: 2.7456, lon: 101.7099 },
  { code: "MNL", name: "Manila", lat: 14.5086, lon: 121.0194 },
  { code: "DEL", name: "Delhi", lat: 28.5562, lon: 77.1 },
  { code: "BOM", name: "Mumbai", lat: 19.0887, lon: 72.8679 },
  { code: "YVR", name: "Vancouver", lat: 49.1967, lon: -123.1815 },
  { code: "MCO", name: "Orlando", lat: 28.4293, lon: -81.3089 },
  { code: "LAS", name: "Las Vegas Harry Reid", lat: 36.0801, lon: -115.1523 },
  { code: "PHX", name: "Phoenix Sky Harbor", lat: 33.4484, lon: -112.074 },
  { code: "IAH", name: "Houston Intercontinental", lat: 29.9902, lon: -95.3368 },
  { code: "CLT", name: "Charlotte Douglas", lat: 35.214, lon: -80.9431 },
  { code: "LGA", name: "New York LaGuardia", lat: 40.7772, lon: -73.8726 },
  { code: "EWR", name: "Newark Liberty", lat: 40.6925, lon: -74.1687 },
  { code: "DCA", name: "Washington Reagan", lat: 38.8521, lon: -77.0377 },
  { code: "IAD", name: "Washington Dulles", lat: 38.9531, lon: -77.4565 },
  { code: "AUH", name: "Abu Dhabi", lat: 24.433, lon: 54.6511 },
  { code: "NUE", name: "Nuremberg", lat: 49.4987, lon: 11.078 },
  { code: "ZRH", name: "Zurich", lat: 47.4647, lon: 8.5492 },
  { code: "VIE", name: "Vienna", lat: 48.1103, lon: 16.5697 },
  { code: "CPH", name: "Copenhagen", lat: 55.6181, lon: 12.6561 },
  { code: "OSL", name: "Oslo Gardermoen", lat: 60.1976, lon: 11.1004 },
];

function toRad(d: number) {
  return (d * Math.PI) / 180;
}

function haversineKm(a: Airport, b: Airport) {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function FlightTimeCalculator() {
  const [fromCode, setFromCode] = useState("JFK");
  const [toCode, setToCode] = useState("LHR");

  const result = useMemo(() => {
    const from = AIRPORTS.find((a) => a.code === fromCode);
    const to = AIRPORTS.find((a) => a.code === toCode);
    if (!from || !to || from.code === to.code) return null;
    const km = haversineKm(from, to);
    const miles = km * 0.621371;
    const hours = km / 850 + 0.5;
    if (!Number.isFinite(km) || !Number.isFinite(hours)) return null;
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    const crossesDateline =
      Math.abs(from.lon - to.lon) > 180 ||
      (from.lon > 0 && to.lon < 0 && from.lon - to.lon > 180) ||
      (from.lon < 0 && to.lon > 0 && to.lon - from.lon > 180);
    return {
      km: Math.round(km),
      miles: Math.round(miles),
      h,
      m,
      ultraLong: hours > 13,
      crossesDateline,
      from,
      to,
    };
  }, [fromCode, toCode]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">From</span>
          <select
            value={fromCode}
            onChange={(e) => setFromCode(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            {AIRPORTS.map((a) => (
              <option key={a.code} value={a.code}>
                {a.code} &mdash; {a.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">To</span>
          <select
            value={toCode}
            onChange={(e) => setToCode(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            {AIRPORTS.map((a) => (
              <option key={a.code} value={a.code}>
                {a.code} &mdash; {a.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {result ? (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Distance
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.km.toLocaleString()} km
            </div>
            <div className="text-xs text-slate-600">
              {result.miles.toLocaleString()} miles
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Estimated flight time
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.h}h {result.m}m
            </div>
            <div className="text-xs text-slate-600">
              Cruise 850 km/h + 30 min buffer
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Route notes
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.ultraLong ? "Ultra long-haul" : "Standard"}
            </div>
            <div className="text-xs text-slate-600">
              {result.crossesDateline
                ? "Crosses the International Date Line"
                : "No dateline crossing"}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Pick two different airports to see the route.
        </div>
      )}

      <p className="text-xs text-slate-500">
        Estimates only &mdash; actual flight time varies with winds, routing, and
        ATC. Great-circle distance via the Haversine formula.
      </p>
    </div>
  );
}
