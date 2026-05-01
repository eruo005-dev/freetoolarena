import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Fermented foods crossed from health-fad to mainstream in 2025-2026 with broad clinical evidence supporting their
    role in gut microbiome diversity. Here&rsquo;s the realistic 2026 view &mdash; what helps, what&rsquo;s
    overhyped.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The actual evidence</h2>
    <p>
      Stanford&rsquo;s 2021 Sonnenburg study found a 6-week high-fermented-foods diet (6 servings/day) significantly
      increased microbiome diversity and decreased inflammatory markers. Multiple replications since.
    </p>
    <h2>What &ldquo;fermented&rdquo; actually means</h2>
    <ul>
      <li><strong>Live + active cultures:</strong> kimchi, sauerkraut (refrigerated, NOT shelf-stable), yogurt with active cultures, kefir, kombucha (refrigerated), miso, tempeh.</li>
      <li><strong>Doesn&rsquo;t count:</strong> shelf-stable pickles, pasteurized sauerkraut, supermarket kombucha brands that pasteurize.</li>
    </ul>
    <h2>What helps + what doesn&rsquo;t</h2>
    <ul>
      <li><strong>Helps:</strong> daily 1-2 servings, varied (rotate 4-5 types weekly).</li>
      <li><strong>Doesn&rsquo;t help much:</strong> commercial probiotic capsules &mdash; effects are small + transient.</li>
      <li><strong>Probably wastes money:</strong> &ldquo;gut microbiome test kits&rdquo; &mdash; results aren&rsquo;t actionable.</li>
    </ul>
    <h2>If you&rsquo;re starting</h2>
    <ol>
      <li>Add 1 serving/day for 2 weeks. Some people get bloating; ramp slowly.</li>
      <li>Vary types &mdash; different bacteria families.</li>
      <li>Pair with fiber (the fuel for the bacteria you&rsquo;re adding).</li>
      <li>Don&rsquo;t cook the heat-sensitive ones &mdash; live cultures die above ~115°F.</li>
    </ol>
    <p>
      Pair with <a href="/guides/fiber-target-2026">fiber target 2026</a>.
    </p>
  </>
);
