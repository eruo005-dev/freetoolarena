import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    The 4-day workweek went from fringe pilot to mainstream conversation between 2022 and 2026. Here&rsquo;s what
    actually happened in the largest pilots, what the data really says, and what to ask your employer if you&rsquo;re
    pushing for one.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The biggest pilots so far</h2>
    <ul>
      <li><strong>UK 4DWW (2022, 61 companies):</strong> 92% extended the trial. Revenue +1.4% on average. Stress +71% lower; sick days down 65%.</li>
      <li><strong>Iceland (2015-2019, 2,500+ workers):</strong> productivity stayed equal or improved. Now 86% of Iceland&rsquo;s workforce is on shorter hours.</li>
      <li><strong>4 Day Week Global (rolling pilots, 2023-2026):</strong> consistent results across countries: revenue flat or up, retention up, hiring up.</li>
    </ul>
    <h2>Why it works in practice</h2>
    <ul>
      <li>Forces meeting culture audit (most teams cut meetings 25-40%).</li>
      <li>Less context-switching: people batch deep work.</li>
      <li>Recovery is a productivity input, not a competitor to it.</li>
      <li>Selection effect: companies willing to try it tend to be well-managed already.</li>
    </ul>
    <h2>Where it doesn&rsquo;t work</h2>
    <ul>
      <li>Customer-facing roles requiring 5-day coverage (without rotation overhead).</li>
      <li>Manufacturing / shift work without process redesign.</li>
      <li>Companies that compress 40 hours into 4 days vs reducing hours to 32.</li>
    </ul>
    <h2>If you&rsquo;re proposing one</h2>
    <ol>
      <li>Pitch a 90-day pilot, not a permanent change.</li>
      <li>Define clear outcome metrics upfront (revenue, NPS, deadline hits).</li>
      <li>Suggest staggered Fridays first (half the team off Fri, half off Mon) to keep coverage.</li>
      <li>Reference 4dayweek.com&rsquo;s playbook + case studies.</li>
    </ol>
  </>
);
