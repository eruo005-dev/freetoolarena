import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Heat pumps are the dominant 2026 home-electrification story. With the IRA tax credit + state rebates often
    cutting effective install cost by half, the math has shifted. Here&rsquo;s when it pays back and when it doesn&rsquo;t.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The basic math</h2>
    <p>
      Heat pumps move heat instead of generating it &mdash; coefficient of performance (COP) typically 2.5-4.0,
      meaning they deliver 2.5-4&times; the heat per unit of energy vs electric resistance. That&rsquo;s the entire
      cost story.
    </p>
    <h2>When payback is fast (under 5 yr)</h2>
    <ul>
      <li>Replacing oil heat in the Northeast/Midwest.</li>
      <li>Replacing propane.</li>
      <li>Replacing electric resistance / baseboard in cold climates.</li>
      <li>Stacking federal IRA credit + state rebates that cover 50%+ of install.</li>
    </ul>
    <h2>When payback is long (10+ yr)</h2>
    <ul>
      <li>Replacing efficient natural gas + low electricity rates.</li>
      <li>Mild climates where heating bills were already low.</li>
      <li>Older homes needing major electrical or duct upgrades.</li>
    </ul>
    <h2>Practical notes</h2>
    <ul>
      <li>Cold-climate heat pumps (Mitsubishi Hyper-Heat, Bosch IDS) work to -5°F+.</li>
      <li>Below that, dual-fuel hybrid setups bridge the gap.</li>
      <li>Find a contractor with heat-pump certification, not a generic HVAC shop.</li>
      <li>Check <code>energy.gov</code> for your state&rsquo;s rebate programs.</li>
    </ul>
    <p>
      Run your numbers with the <a href="/tools/heat-pump-savings-calculator">heat pump savings calculator</a>.
    </p>
  </>
);
