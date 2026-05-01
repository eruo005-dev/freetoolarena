import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Zone 2 cardio &mdash; sustained low-intensity work where you can hold a conversation &mdash; is the single
    most-talked-about training shift of 2025-2026. Here&rsquo;s why it dominates longevity research and how to
    actually do it.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What zone 2 actually is</h2>
    <p>
      Roughly 60-70% of max heart rate, or 60-70% of heart-rate reserve via Karvonen. Easier than most people run
      on a &ldquo;recovery day.&rdquo; Nasal-breathing only. Fully sustainable for 60-90 minutes.
    </p>
    <h2>Why it matters</h2>
    <ul>
      <li>Builds mitochondrial density &mdash; the cellular engines that determine how well you metabolize fat at any intensity.</li>
      <li>Lowers resting heart rate, blood pressure, and HbA1c over weeks-months.</li>
      <li>Strongest correlate (alongside VO2 max) with all-cause mortality reduction.</li>
      <li>Doesn&rsquo;t crater recovery the way HIIT does &mdash; can do daily.</li>
    </ul>
    <h2>Doing it right</h2>
    <ul>
      <li><strong>Time:</strong> 30-90 min, 2-4&times;/week. Less than 30 min isn&rsquo;t the same dose.</li>
      <li><strong>Modality:</strong> easy run, bike, rower, ruck, hike. Walking only counts if it actually gets your HR into zone.</li>
      <li><strong>Pacing by HR, not feel:</strong> use a chest strap. Wrist optical undercounts at steady state.</li>
      <li><strong>Test:</strong> can you hold a full sentence? Yes &rarr; you&rsquo;re in zone. Halting? Slow down.</li>
    </ul>
    <p>
      Get your target range with the <a href="/tools/zone-2-heart-rate-calculator">zone 2 heart rate calculator</a>.
      For VO2 max see the <a href="/tools/vo2-max-estimator">VO2 max estimator</a>.
    </p>
  </>
);
