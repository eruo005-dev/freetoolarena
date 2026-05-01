import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    &ldquo;AI-proof&rdquo; jobs don&rsquo;t exist. AI-resistant ones do &mdash; the ones where displacement happens
    last and where new tooling makes humans more valuable, not less. Here&rsquo;s what 2026 looks like and how to
    pick a direction.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What AI is fastest at displacing</h2>
    <ul>
      <li>Routine cognitive work: copywriting, basic analytics, paralegal research, level-1 support.</li>
      <li>Pattern-recognition with clear rules: invoice processing, claim adjudication, medical coding.</li>
      <li>Translation, transcription, basic editing.</li>
      <li>Code review of small changes; generation of routine boilerplate.</li>
    </ul>
    <h2>What stays human longer</h2>
    <ul>
      <li><strong>Hands-on work:</strong> trades (electrician, plumber, HVAC), nursing, dental hygiene, physical therapy.</li>
      <li><strong>High-trust relationship roles:</strong> therapists, executive coaches, financial advisors, lead salespeople.</li>
      <li><strong>Complex judgment under uncertainty:</strong> senior product, M&amp;A, litigation strategy, surgery.</li>
      <li><strong>Creative direction:</strong> not creative execution &mdash; that&rsquo;s being commoditized.</li>
      <li><strong>AI-leverage roles:</strong> people who use AI to do 5x the work; demand goes UP, not down.</li>
    </ul>
    <h2>The skill mix that wins</h2>
    <ul>
      <li>Domain expertise + AI fluency. Not either alone.</li>
      <li>Working with ambiguity (AI is bad at this).</li>
      <li>Stakeholder management.</li>
      <li>Quality calibration: knowing what good looks like.</li>
    </ul>
    <h2>What to do about it</h2>
    <p>
      Don&rsquo;t pivot careers. Layer AI fluency into what you already do, look for places where AI cuts time on
      the work but raises the ceiling on output quality, and double down on the parts that need taste, judgment,
      relationships. Most people hedge with the wrong move (learn to code at 45 to escape AI) when the right move
      is to be the best AI user in your existing domain.
    </p>
    <p>
      Tooling: <a href="/tools/ai-readiness-score">AI readiness score</a>,{" "}
      <a href="/tools/ai-model-picker-quiz">AI model picker</a>.
    </p>
  </>
);
