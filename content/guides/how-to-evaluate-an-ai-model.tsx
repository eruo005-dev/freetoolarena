import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Public benchmarks (MMLU, SWE-bench, HumanEval) are useful but only get you partway. To know
    which model is actually best for <em>your</em> use case, you have to evaluate it on your own
    tasks. Here&rsquo;s a 2026 protocol that takes a couple of hours and saves months of switching.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The 4-step evaluation protocol</h2>

    <h3>1. Build a 30-task evaluation set (1 hour)</h3>
    <p>
      Pick 30 tasks that represent your real work. Cover edge cases, ambiguity, your domain&rsquo;s
      specific quirks. Save inputs and your &ldquo;ideal&rdquo; outputs (or rubrics if outputs are
      open-ended). 30 tasks is the sweet spot &mdash; enough to be statistically meaningful, few
      enough to grade by hand.
    </p>

    <h3>2. Run each candidate model with the same system prompt (30 min)</h3>
    <p>
      Use a consistent prompt template. Don&rsquo;t bias one model with longer instructions or more
      examples than another. For a fair fight, run each candidate with default temperature and the
      same context. Save the outputs.
    </p>

    <h3>3. Grade with rubrics (1 hour)</h3>
    <p>
      Score each output 1-5 on relevant dimensions: correctness, faithfulness, format compliance,
      conciseness. Aggregate by mean score per model. The numbers will surprise you &mdash; the
      model that &ldquo;feels&rdquo; best in casual chat often loses on consistency.
    </p>

    <h3>4. Spot-check the failures (30 min)</h3>
    <p>
      Look at the worst 5 outputs from each model. Patterns tell you more than averages. If model
      A fails on edge cases but nails the common case, and model B is mediocre across the board,
      A wins for production.
    </p>

    <h2>What to actually measure</h2>
    <ul>
      <li><strong>Correctness:</strong> binary right/wrong on tasks with verifiable answers.</li>
      <li><strong>Faithfulness:</strong> does the output stay grounded in the provided source? (Most
        important for RAG.)</li>
      <li><strong>Instruction adherence:</strong> did it actually do what you asked?</li>
      <li><strong>Format compliance:</strong> did it output JSON when you asked for JSON?</li>
      <li><strong>Latency:</strong> p50 and p95 to first token + completion.</li>
      <li><strong>Cost per task:</strong> total input + output tokens × price.</li>
    </ul>

    <h2>Tools to make this easier</h2>
    <ul>
      <li><strong>OpenAI Evals</strong> &mdash; structured eval framework, model-agnostic.</li>
      <li><strong>Promptfoo</strong> &mdash; YAML-driven multi-model bake-off. Easiest entry point.</li>
      <li><strong>Anthropic Workbench</strong> &mdash; for Claude-specific iteration.</li>
      <li><strong>LangSmith</strong> &mdash; tracing + eval, integrates with LangChain.</li>
      <li><strong>Braintrust / Humanloop</strong> &mdash; production-grade eval ops.</li>
    </ul>

    <h2>The trap to avoid</h2>
    <p>
      &ldquo;Vibe-checking&rdquo; with 5 prompts and picking the model that gave the best answer
      <em> on those 5</em>. You&rsquo;re biased. Always evaluate at scale (30+ tasks) and grade
      structurally. Most people picking models in 2026 are still vibe-checking, which is why so
      many production deployments use the wrong model.
    </p>
    <p>
      Compare models head-to-head: <a href="/tools/frontier-model-tracker">frontier model
      tracker</a>. Cost-compare: <a href="/tools/claude-vs-deepseek-cost-calculator">Claude vs
      DeepSeek</a>.
    </p>
  </>
);
