"use client";

import { useEffect } from "react";

/**
 * Responsive AdSense display slot. AdSense auto-ads are already enabled
 * site-wide via `layout.tsx`, but manual slots let us control placement
 * for the highest-value positions — specifically above-the-fold on tool
 * pages and mid-article on guides.
 *
 * Ad creation contract:
 * - `client` (publisher ID) is hard-coded via env-friendly constant.
 * - `slot` is the per-placement identifier configured in the AdSense UI.
 * - `format="auto"` + `data-full-width-responsive` lets AdSense pick the
 *   best creative for the available width, including skyscrapers on
 *   wide layouts and leaderboards on mobile.
 *
 * Fills only when the AdSense script has loaded. If the script is
 * blocked (ad-blocker), the component collapses silently — the
 * container has min-height 0 so layout doesn't shift.
 */

const ADSENSE_CLIENT = "ca-pub-8018173696794576";

export interface AdSlotProps {
  /** AdSense slot ID, shaped like "1234567890". Configure in AdSense → Ads → By ad unit. */
  slot?: string;
  /** CSS layout hint. "display" fits rectangles; "in-article" is wider. */
  layout?: "display" | "in-article";
  /** Optional extra classes on the wrapper. */
  className?: string;
  /** Optional label shown above the ad so it's obvious to readers. */
  label?: string;
}

// Re-declare the AdSense push queue type that AdSense adds to window.
declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export function AdSlot({
  slot,
  layout = "display",
  className = "",
  label = "Sponsored",
}: AdSlotProps) {
  useEffect(() => {
    // AdSense re-scans the DOM when push() is called. Safe to call
    // repeatedly (it no-ops if the slot is already filled).
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad-blocker or offline — silently ignore.
    }
  }, []);

  // If no slot is configured yet (pre-AdSense approval), render a
  // minimal placeholder so our layout accounts for the reserved space
  // without showing an empty block or a broken ad unit.
  const hasSlot = !!slot;

  return (
    <div
      className={`my-6 text-center ${className}`.trim()}
      aria-label="Advertisement"
    >
      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">
        {label}
      </p>
      {hasSlot ? (
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format={layout === "in-article" ? "fluid" : "auto"}
          data-ad-layout={layout === "in-article" ? "in-article" : undefined}
          data-full-width-responsive="true"
        />
      ) : (
        // Auto-ads will fill this space when the AdSense script decides
        // it's viable. No manual ins tag = no rejected unit in the console.
        <div className="min-h-[90px]" />
      )}
    </div>
  );
}
