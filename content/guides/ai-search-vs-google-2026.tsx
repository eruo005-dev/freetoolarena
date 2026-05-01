import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Google still owns search by usage in 2026 &mdash; but its share dropped meaningfully for the first time in 20+
    years as AI search engines (Perplexity, ChatGPT Search, Bing Copilot, Kagi) ate the synthesis-heavy queries. Here&rsquo;s
    where each wins.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Where AI search wins</h2>
    <ul>
      <li><strong>Synthesis questions:</strong> &ldquo;compare X and Y&rdquo;, &ldquo;summarize the recent debate on Z&rdquo;.</li>
      <li><strong>Multi-step research:</strong> Pro Search modes chain queries.</li>
      <li><strong>Code questions:</strong> Phind and ChatGPT beat Google on this.</li>
      <li><strong>Anything you&rsquo;d normally read 5 tabs to answer.</strong></li>
    </ul>
    <h2>Where Google still wins</h2>
    <ul>
      <li><strong>Local search:</strong> &ldquo;coffee near me&rdquo;, &ldquo;hardware store hours&rdquo;.</li>
      <li><strong>Transactional queries:</strong> shopping, flights, products.</li>
      <li><strong>Breaking news:</strong> Google indexes faster than most AI engines.</li>
      <li><strong>Image search:</strong> reverse image, visual lookup.</li>
      <li><strong>Trusted source authority:</strong> when you specifically want the .gov / .edu page.</li>
    </ul>
    <h2>The new mental model</h2>
    <p>
      Use Perplexity / ChatGPT Search for &ldquo;explain X&rdquo; and &ldquo;help me decide Y.&rdquo; Use Google for
      &ldquo;find me the X near me&rdquo; and &ldquo;what&rsquo;s the latest on news Y.&rdquo; The skill is knowing
      which tool fits which question.
    </p>
    <p>
      Compare engines side-by-side at <a href="/tools/ai-search-engine-comparison">the AI search engine comparison</a>.
    </p>
  </>
);
