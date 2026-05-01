import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    The EV/hybrid decision shifted in 2025-2026 as charging infrastructure matured and PHEV (plug-in hybrid)
    options expanded. Here&rsquo;s the honest decision tree for buying in 2026.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Pick a full EV if</h2>
    <ul>
      <li>You can charge at home (garage / driveway with outlet).</li>
      <li>Your daily commute is under 200 miles.</li>
      <li>You take road trips less than 4&times;/year.</li>
      <li>You live in a metro with strong public charging coverage.</li>
      <li>Federal $7,500 + state credits apply to your purchase.</li>
    </ul>
    <h2>Pick a PHEV (plug-in hybrid) if</h2>
    <ul>
      <li>You can charge at home but take long drives 1+&times;/month.</li>
      <li>Mostly city driving but cross-country needs.</li>
      <li>Towing or hauling needs that pure EVs strain on.</li>
      <li>Live in a region with cold winters (range anxiety still real on EVs at 0°F).</li>
    </ul>
    <h2>Stick with a hybrid (no plug) if</h2>
    <ul>
      <li>Apartment / no charging access at home.</li>
      <li>Long road-trips frequently &mdash; charging interruptions add real time.</li>
      <li>Very cold climate without garage parking.</li>
      <li>You want simplicity and long-term reliability of Toyota Prius / Camry Hybrid class.</li>
    </ul>
    <h2>Total cost of ownership in 2026</h2>
    <ul>
      <li><strong>EV:</strong> lowest fuel + maintenance; higher up-front; battery replacement risk after 8-10 yr.</li>
      <li><strong>PHEV:</strong> lower fuel if commute fits electric range; battery + ICE = double maintenance complexity.</li>
      <li><strong>Hybrid:</strong> highest fuel cost of the three; lowest complexity; reliable 200k-mile lifespan.</li>
    </ul>
    <p>
      Run range math at <a href="/tools/ev-range-estimator">EV range estimator</a>. For solar payback to power
      home charging see <a href="/tools/solar-panel-payback-calculator">solar panel payback calculator</a>.
    </p>
  </>
);
