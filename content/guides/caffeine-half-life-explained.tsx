import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Caffeine has a 5-6 hour half-life on average. That 4 PM coffee is still ~25% in your system at midnight.
    Here&rsquo;s the actual math and how to time caffeine for energy without sleep destruction.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The half-life math</h2>
    <p>
      A 200mg coffee at 8am: 100mg by 1-2pm, 50mg by 6-7pm, 25mg by midnight, fully clear by ~25 hours later.
      Genetics matter (CYP1A2 fast vs slow metabolizers shift this by 2-3x in either direction).
    </p>
    <h2>What that means in practice</h2>
    <ul>
      <li><strong>Cutoff for 11pm bedtime:</strong> stop caffeine by 1-3pm to clear under 25% by sleep.</li>
      <li><strong>Late afternoon coffee:</strong> measurably reduces deep sleep even if you fall asleep fine.</li>
      <li><strong>If you sleep with caffeine in system:</strong> sleep quality drops 30-40% even at the same duration.</li>
    </ul>
    <h2>Optimal timing</h2>
    <ul>
      <li>First coffee 90-120 min after waking (let cortisol peak first).</li>
      <li>Second hit (if you do two) before noon.</li>
      <li>Hard cutoff 8-10 hours before bed.</li>
      <li>Switch to decaf or matcha (lower dose) for late-day cravings.</li>
    </ul>
    <h2>Caffeine cycling</h2>
    <p>
      Building tolerance is real. To reset sensitivity, take 7-14 days off caffeine every 3-6 months. The first 3 days
      are rough; week 2 you sleep better than you have in years.
    </p>
  </>
);
