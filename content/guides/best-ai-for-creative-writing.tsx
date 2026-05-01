import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Creative writing AI in 2026 is no longer a single-tool decision. Sudowrite for fiction
    drafting, Claude for literary prose, ChatGPT for stylistic range, NovelCrafter for novel
    structure. Here&rsquo;s when each one earns its place.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>By creative form</h2>
    <ul>
      <li><strong>Literary fiction:</strong> Claude Sonnet 4.6. Best at restrained, character-led
        prose. Specific instruction-following on POV and tense.</li>
      <li><strong>Genre fiction (thriller, romance, sci-fi):</strong> Sudowrite. Novelist-tuned
        UX with Story Bible, Beat Sheet, Brainstorm tools.</li>
      <li><strong>Screenwriting:</strong> ChatGPT Plus or Claude. Both follow industry-format
        constraints reliably with a system prompt example.</li>
      <li><strong>Poetry:</strong> Claude. Less prone to greeting-card cadences; better at
        formal constraint following.</li>
      <li><strong>Worldbuilding / D&amp;D campaigns:</strong> Claude (1M context fits a whole
        setting bible) + custom GPT for in-character interaction.</li>
      <li><strong>Game writing / interactive fiction:</strong> Inkle&rsquo;s tools or Claude with
        a state-tracking system prompt.</li>
      <li><strong>Children&rsquo;s books / picture books:</strong> ChatGPT (text) + DALL-E or
        Midjourney (illustrations).</li>
    </ul>

    <h2>The fiction-specific tools</h2>
    <ul>
      <li><strong>Sudowrite</strong> ($10-29/mo) &mdash; fiction-specific, includes story bible,
        canvas, and beat-sheet workflows. The most-used novelist tool in 2026.</li>
      <li><strong>NovelCrafter</strong> ($14/mo) &mdash; codex + chapter view + AI assistance.
        Strong for plotters.</li>
      <li><strong>Plottr</strong> &mdash; outlining and structure, with AI-assisted scene cards.</li>
      <li><strong>Lex</strong> &mdash; distraction-free writing with AI in the margin.</li>
    </ul>

    <h2>What to avoid</h2>
    <ul>
      <li>Letting the AI write whole scenes from a one-line prompt. Outputs are competent but
        generic.</li>
      <li>Skipping the human voice pass. AI prose is fluent but rhythmically predictable.</li>
      <li>Using AI for the climax. Save the most emotionally loaded scenes for your own pen.</li>
    </ul>

    <h2>The two pricing paths</h2>
    <ul>
      <li><strong>$20/mo:</strong> Claude Pro alone. Sufficient for most literary writing.</li>
      <li><strong>$30-50/mo:</strong> Claude Pro + Sudowrite. Sudowrite&rsquo;s UX adds enough
        novelist-specific value to justify both.</li>
    </ul>
    <p>
      Compare: <a href="/compare/claude-vs-chatgpt">Claude vs ChatGPT</a>.
    </p>
  </>
);
