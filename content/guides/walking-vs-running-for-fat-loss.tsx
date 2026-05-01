import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    The fitness internet flipped on this in 2025-2026. Walking is having a moment, even (especially) for fat loss.
    Here&rsquo;s the honest math and why the long-walks-and-zone-2 approach often beats the &ldquo;you have to
    run&rdquo; orthodoxy.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Calorie math</h2>
    <p>
      Running burns ~100 calories per mile. Walking burns ~80. So mile-for-mile running has a 20% edge &mdash; far
      smaller than the cultural assumption.
    </p>
    <h2>Why walking often wins for fat loss</h2>
    <ul>
      <li>Adherence: people walk for 60+ min consistently. Running for 60+ min daily breaks down most non-elites.</li>
      <li>Recovery: walking doesn&rsquo;t crater the next day&rsquo;s lifting. Running often does.</li>
      <li>Hunger response: vigorous cardio drives compensatory eating; walking doesn&rsquo;t.</li>
      <li>Joint cost: running carries injury risk that pulls people out of training entirely.</li>
    </ul>
    <h2>When running wins</h2>
    <ul>
      <li>You enjoy it &mdash; adherence beats theoretical optima.</li>
      <li>Time-constrained: 30 min running &gt; 60 min walking on calories burned.</li>
      <li>VO&#8322; max ceiling: walking won&rsquo;t hit it; running sessions or HIIT will.</li>
    </ul>
    <h2>The 2026 stack</h2>
    <p>
      Most fat-loss-coaching protocols now recommend: 8-10K daily steps + 2-3 strength sessions + 1-2 zone 2 sessions
      (any modality) + caloric deficit. Running is optional, not required.
    </p>
    <p>
      Run the math: <a href="/tools/step-count-target-calculator">step count target</a>,{" "}
      <a href="/tools/calorie-calculator">calorie calculator</a>.
    </p>
  </>
);
