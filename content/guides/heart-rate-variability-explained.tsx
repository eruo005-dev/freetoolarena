import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    HRV (heart-rate variability) became the wellness metric of the late 2010s and stayed mainstream through 2026.
    Whoop, Oura, and Apple Watch all surface it. Here&rsquo;s what it actually measures, what raises it, and the
    common mistakes.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What HRV is</h2>
    <p>
      Variation in time between heartbeats, measured in milliseconds. Higher = better adapted, more parasympathetic
      tone, generally fitter. Genetics + age set your baseline; lifestyle moves it ~10-20%.
    </p>
    <h2>Typical ranges by age</h2>
    <ul>
      <li>Twenties: 60-90 ms (rMSSD, common metric)</li>
      <li>Thirties: 50-80</li>
      <li>Forties: 40-70</li>
      <li>Fifties+: 30-60</li>
    </ul>
    <p>
      Athletes typically run 20-30% above peers. Compare to YOUR baseline, not other people&rsquo;s.
    </p>
    <h2>What raises HRV</h2>
    <ul>
      <li>Sleep quality + duration (biggest single lever).</li>
      <li>Zone 2 cardio + strength training.</li>
      <li>Hydration.</li>
      <li>Lower alcohol intake (huge effect &mdash; one drink drops it 10-30%).</li>
      <li>Resolved emotional stress.</li>
    </ul>
    <h2>What lowers it</h2>
    <ul>
      <li>Late meals + alcohol within 3 hours of sleep.</li>
      <li>Overtraining without recovery.</li>
      <li>Acute illness (early signal &mdash; HRV drops before you feel sick).</li>
      <li>Chronic stress.</li>
    </ul>
    <h2>Common mistakes</h2>
    <ul>
      <li>Comparing your HRV to other people&rsquo;s. Useless.</li>
      <li>Optimizing daily for HRV at the cost of training stimulus.</li>
      <li>Reading single-day variation as meaningful (look at 7-day rolling average).</li>
    </ul>
  </>
);
