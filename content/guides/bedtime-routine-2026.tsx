import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    The 2026 sleep optimization conversation has matured. Less Huberman, more boring fundamentals. Here&rsquo;s a
    bedtime routine that actually shows up in sleep-tracking data &mdash; not a 12-step ritual.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The 90-minute window</h2>
    <p>
      The 90 minutes before sleep determines 80% of sleep quality. Optimizing it produces bigger gains than any
      supplement.
    </p>
    <h2>Things that actually move the needle</h2>
    <ul>
      <li><strong>Dim lighting:</strong> shift to warm 2700K bulbs at sunset, &lt; 50 lux.</li>
      <li><strong>Cool bedroom:</strong> 65-68°F. Single most-validated sleep variable.</li>
      <li><strong>Last meal 3+ hours before sleep.</strong> Acid reflux is the silent sleep killer.</li>
      <li><strong>Caffeine cutoff 8-10 hours before bed.</strong> Half-life is 5-6h, 95% clear takes 25h.</li>
      <li><strong>Phone out of the bedroom.</strong> Charge in the kitchen.</li>
    </ul>
    <h2>Things massively oversold</h2>
    <ul>
      <li>Mouth tape (placebo for most; helpful for confirmed mouth-breathers).</li>
      <li>Blue-light glasses (sun-glass tints work; clear lenses with &ldquo;blue light&rdquo; coatings don&rsquo;t).</li>
      <li>Magnesium glycinate (mild signal at 200-400mg, not the miracle sold).</li>
      <li>Melatonin micro-dosing (overdoses common; 0.3-0.5mg max if you use it).</li>
    </ul>
    <h2>What to actually do</h2>
    <ol>
      <li>Cool the bedroom 60 min before sleep.</li>
      <li>Dim lights 90 min before.</li>
      <li>Last meal 3 hours before.</li>
      <li>Phone out of bedroom 30 min before.</li>
      <li>Wake within a 30-min window every day &mdash; including weekends.</li>
    </ol>
    <p>
      For sleep-cycle timing, see the <a href="/tools/sleep-cycle-calculator">sleep cycle calculator</a>.
    </p>
  </>
);
