import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Picking the right AI for agents in 2026 is mostly about reliability over long horizons. Claude
    Opus 4.7 and Sonnet 4.6 lead the agentic harness category; GPT-5 is competitive but drifts
    sooner; DeepSeek V3.2 wins on cost. Pick by horizon length and budget.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What &ldquo;best for agents&rdquo; means</h2>
    <p>
      An agent is a model in a loop: think &rarr; act (tool call) &rarr; observe &rarr; think
      again. The hard part isn&rsquo;t the first step &mdash; it&rsquo;s step 50 when the context
      is 80k tokens of prior tool outputs and the model needs to make a smart next move. Reliability
      compounds; small differences become huge over long horizons.
    </p>

    <h2>The 2026 agent stack ranking</h2>
    <ul>
      <li><strong>Claude Opus 4.7:</strong> top reliability over 50+ steps. Highest cost. Right for
        production agents that can&rsquo;t fail.</li>
      <li><strong>Claude Sonnet 4.6:</strong> 95% of Opus reliability at 1/5 cost. Default agent
        model for most teams.</li>
      <li><strong>GPT-5:</strong> excellent reasoning, ecosystem. Drifts sooner than Claude on
        very long horizons.</li>
      <li><strong>Gemini 2.5/3 Pro:</strong> strong on multimodal-input agents (vision + text
        steps). Behind Claude on pure-text reasoning loops.</li>
      <li><strong>DeepSeek V3.2:</strong> cheapest viable agent model. Use for cost-sensitive loops
        where the marginal reliability gap is acceptable.</li>
    </ul>

    <h2>Frameworks worth knowing</h2>
    <ul>
      <li><strong>Claude Agent SDK</strong> &mdash; Anthropic&rsquo;s purpose-built harness. Hooks,
        skills, slash commands, MCP. Best agent surface in 2026.</li>
      <li><strong>OpenAI Agents SDK</strong> &mdash; tight Python/TS API for GPT-5 agents.</li>
      <li><strong>LangGraph</strong> &mdash; framework-agnostic graph-based agent orchestrator.</li>
      <li><strong>AutoGen</strong> &mdash; Microsoft&rsquo;s multi-agent framework.</li>
      <li><strong>Crew AI</strong> &mdash; opinionated multi-agent role assignment.</li>
    </ul>

    <h2>Cost reality</h2>
    <p>
      Agent costs explode with horizon length because the context grows every step. Use prompt
      caching always; use Sonnet not Opus by default; mix DeepSeek for cheap steps and Claude
      for hard ones. Use the <a href="/tools/ai-agent-loop-cost-estimator">AI agent loop cost
      estimator</a> to budget before you build.
    </p>

    <h2>The hidden tip</h2>
    <p>
      Don&rsquo;t skip prompt caching. With Anthropic&rsquo;s 90%-off cached input, an agent that
      reuses the same system prompt across 50 steps costs ~10x less than a naive version. The
      single biggest cost lever in agentic work is caching, not model choice.
    </p>
    <p>
      Compare: <a href="/compare/claude-vs-chatgpt">Claude vs ChatGPT</a>,{" "}
      <a href="/compare/claude-opus-vs-sonnet">Claude Opus vs Sonnet</a>.
    </p>
  </>
);
