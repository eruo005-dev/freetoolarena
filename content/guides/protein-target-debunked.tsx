import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    The 1g of protein per pound of body weight rule is everywhere on fitness social media. The actual research
    suggests less for most people. Here&rsquo;s what 2026 evidence says and how to set your real target.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The actual numbers</h2>
    <ul>
      <li><strong>Sedentary adults:</strong> 0.36 g/lb (RDA) is enough to avoid deficiency. Most people exceed this without trying.</li>
      <li><strong>Recreational lifters / runners:</strong> 0.6-0.8 g/lb is plenty for most goals.</li>
      <li><strong>Serious lifters in surplus / deficit:</strong> 0.8-1.0 g/lb covers it. Above 1.0 has diminishing returns.</li>
      <li><strong>Older adults (50+):</strong> 0.8 g/lb minimum. Higher (vs RDA) protects against sarcopenia.</li>
      <li><strong>People on GLP-1s:</strong> 0.8-1.0 g/lb is genuinely important to preserve lean mass during loss.</li>
    </ul>
    <h2>Where the &ldquo;1g/lb&rdquo; came from</h2>
    <p>
      Bodybuilding lore from the 80s, popularized by social media. It&rsquo;s not wrong &mdash; it&rsquo;s just not
      necessary for most people, and it crowds out other dietary goals (fiber, micronutrients, calorie balance).
    </p>
    <h2>What to spend optimization energy on instead</h2>
    <ul>
      <li>Hitting 25-40g per meal (the leucine threshold for synthesis).</li>
      <li>Eating protein within 2 hours of strength training.</li>
      <li>Spreading protein across 3-4 meals, not stacking it at dinner.</li>
      <li>Quality (complete amino acid profile) before quantity.</li>
    </ul>
    <p>
      Build a meal plan around it &mdash; see the <a href="/tools/macro-calculator">macro calculator</a> and{" "}
      <a href="/guides/how-to-meal-prep">how to meal prep</a>.
    </p>
  </>
);
