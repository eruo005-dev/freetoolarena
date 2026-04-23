import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Promptfoo is a CLI that treats prompts like code &mdash; YAML tests, assertions, diffs, and CI-friendly output.</p>);

export const body: ReactElement = (
  <>
    <p>Promptfoo is what unit tests look like for LLMs. You declare prompts, test cases, and assertions in a YAML file, run <code>promptfoo eval</code>, and get a side-by-side grid of outputs with pass/fail scoring. It plugs into CI, supports red-teaming, and speaks nearly every model provider natively.</p>
    <h2>What it is</h2>
    <p>A Node.js CLI and web viewer. It loads a config, fans out requests across providers and prompt variants, runs deterministic (contains, regex, equals) and model-graded (llm-rubric, similar) assertions, and writes results to a local SQLite database. The viewer renders diffs and lets you share results.</p>
    <h2>Install / set up</h2>
    <pre>{`# global install
npm install -g promptfoo
promptfoo init
export OPENAI_API_KEY=sk-...`}</pre>
    <h2>First run</h2>
    <p><code>promptfoo init</code> creates a <code>promptfooconfig.yaml</code> with a sample prompt and two test cases. Run <code>promptfoo eval</code> and it executes every combination of prompts, providers, and tests, then opens a browser view of the results grid.</p>
    <pre>{`$ promptfoo eval
[==================] 8/8 complete
$ promptfoo view
Open http://localhost:15500`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>Compare GPT-4o, Claude, and a local Llama on the same test set to pick the cheapest model that still passes.</li>
      <li>Gate pull requests with <code>promptfoo eval --assert</code> in CI so prompt regressions never ship.</li>
      <li>Run <code>promptfoo redteam</code> to generate adversarial inputs (jailbreaks, PII leaks, prompt injection) against your app.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>Model-graded assertions use an LLM to grade outputs, which means cost doubles per test and the grader itself can be wrong. Pin the grader to a strong model (<code>gpt-4o</code> or <code>claude-3-5-sonnet</code>), cache aggressively with <code>--no-cache=false</code>, and spot-check failures manually for the first few runs.</p>
    <p>Config files grow fast. Split tests into separate YAMLs and include them with <code>tests: file://tests/*.yaml</code>, and store expensive fixtures in <code>vars</code> files so you&rsquo;re not pasting 500-line prompts into the main config. Commit the SQLite database to keep a history if you don&rsquo;t have a shared backend.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Engineers who treat prompts as production code and want a Jest-style workflow for them. Also security teams running red-team exercises &mdash; the built-in attack library is genuinely useful and saves weeks of manual work.</p>
  </>
);
