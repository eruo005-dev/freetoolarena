"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Two-step lookup:
 *   1. api.ipify.org  → your public IPv4 (or IPv6 if that's how you reached it).
 *   2. ipapi.co/{ip}/json → geo + ISP. Free, CORS-enabled, ~1,000 requests/day
 *      per IP. If it rate-limits, we still show the IP — the geo block just
 *      reports "unavailable".
 *
 * Everything runs in the browser. We never see the IP on our servers.
 */

interface GeoInfo {
  city?: string;
  region?: string;
  country_name?: string;
  country_code?: string;
  postal?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  org?: string;
  asn?: string;
  error?: boolean;
  reason?: string;
}

type Status = "loading" | "ready" | "error";

export function IpLookup() {
  const [ip, setIp] = useState<string>("");
  const [geo, setGeo] = useState<GeoInfo | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [copied, setCopied] = useState(false);

  const lookup = useCallback(async () => {
    setStatus("loading");
    setGeo(null);
    try {
      const ipRes = await fetch("https://api.ipify.org?format=json", {
        cache: "no-store",
      });
      if (!ipRes.ok) throw new Error("ipify failed");
      const ipJson = (await ipRes.json()) as { ip: string };
      setIp(ipJson.ip);

      // Geo is best-effort; an ipapi.co 429 shouldn't break the whole card.
      try {
        const geoRes = await fetch(`https://ipapi.co/${ipJson.ip}/json/`, {
          cache: "no-store",
        });
        if (geoRes.ok) {
          const geoJson = (await geoRes.json()) as GeoInfo;
          setGeo(geoJson);
        }
      } catch {
        /* swallow — geo is optional */
      }
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    lookup();
  }, [lookup]);

  function copy() {
    if (!ip) return;
    navigator.clipboard?.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (status === "loading") {
    return (
      <div className="space-y-4">
        <div className="h-24 animate-pulse rounded-xl bg-slate-100" />
        <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <p className="font-semibold">Couldn&rsquo;t reach the IP service.</p>
        <p className="mt-1">
          You may be offline, behind a restrictive firewall, or have a browser
          extension blocking the request.{" "}
          <button
            type="button"
            onClick={lookup}
            className="font-semibold underline underline-offset-2"
          >
            Try again
          </button>
          .
        </p>
      </div>
    );
  }

  const geoOk = geo && !geo.error;
  const location = geoOk
    ? [geo!.city, geo!.region, geo!.country_name].filter(Boolean).join(", ")
    : "";

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-brand-dark p-5 text-white">
        <p className="text-xs uppercase tracking-wide text-white/70">
          Your public IP address
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <p className="font-mono text-2xl font-bold sm:text-3xl">{ip}</p>
          <button
            type="button"
            onClick={copy}
            className="rounded-md bg-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/25"
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={lookup}
            className="rounded-md bg-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/25"
          >
            Refresh
          </button>
        </div>
        <p className="mt-2 text-xs text-white/80">
          {ip.includes(":") ? "IPv6" : "IPv4"} · visible to every site you
          visit
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Approximate location
        </p>
        {geoOk ? (
          <dl className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <InfoRow label="Location" value={location || "Unknown"} />
            <InfoRow label="Postal code" value={geo!.postal} />
            <InfoRow label="Time zone" value={geo!.timezone} />
            <InfoRow
              label="Coordinates"
              value={
                geo!.latitude != null && geo!.longitude != null
                  ? `${geo!.latitude.toFixed(3)}, ${geo!.longitude.toFixed(3)}`
                  : undefined
              }
            />
            <InfoRow label="ISP / carrier" value={geo!.org} />
            <InfoRow label="ASN" value={geo!.asn} />
          </dl>
        ) : (
          <p className="text-sm text-slate-600">
            Geolocation lookup is temporarily unavailable (rate-limited by the
            free tier). Your IP is still shown above.
          </p>
        )}
        <p className="mt-4 text-xs text-slate-500">
          Geolocation is an estimate from your ISP&rsquo;s registered region —
          often the nearest major city, not your home. A VPN will change these
          results.
        </p>
      </div>

      <p className="text-xs text-slate-500">
        Public IP from{" "}
        <a
          href="https://www.ipify.org/"
          target="_blank"
          rel="noreferrer noopener"
          className="underline decoration-dotted underline-offset-2 hover:text-slate-700"
        >
          ipify
        </a>
        . Location from{" "}
        <a
          href="https://ipapi.co/"
          target="_blank"
          rel="noreferrer noopener"
          className="underline decoration-dotted underline-offset-2 hover:text-slate-700"
        >
          ipapi.co
        </a>
        . Requests go from your browser directly — we never see them.
      </p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex min-w-0 items-baseline justify-between gap-4 border-b border-slate-100 py-1.5 last:border-0 sm:border-0 sm:py-0.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="truncate text-right font-medium text-slate-900">
        {value || <span className="text-slate-400">—</span>}
      </dd>
    </div>
  );
}
