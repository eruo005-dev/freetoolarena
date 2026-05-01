import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    &ldquo;AI fluency&rdquo; is the 2026 buzzword that actually means something specific: the practical skills that
    let someone get 5x output from AI vs the median user. Here&rsquo;s the concrete checklist.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The 8 sub-skills that matter</h2>
    <ol>
      <li><strong>Prompt structure:</strong> Role / Task / Audience / Constraints / Format / Example. Stop typing one-line questions.</li>
      <li><strong>Model selection:</strong> knowing when Claude beats GPT beats Gemini beats DeepSeek for a specific task.</li>
      <li><strong>Tool use:</strong> running an LLM with web search, code interpreter, file upload, agents.</li>
      <li><strong>Quality calibration:</strong> spotting hallucinations and grounding answers.</li>
      <li><strong>Iteration:</strong> following up + rewriting prompts vs accepting first output.</li>
      <li><strong>Context management:</strong> when to use Projects, custom GPTs, system prompts, RAG.</li>
      <li><strong>Cost awareness:</strong> caching, batch APIs, model swap, when to self-host.</li>
      <li><strong>Privacy posture:</strong> what NOT to paste in.</li>
    </ol>

    <h2>How to actually develop it</h2>
    <ul>
      <li>Use AI for one real task daily for 90 days. Not casual chat &mdash; real work.</li>
      <li>Read 1-2 prompts/week from people known for being good at this (Karpathy, Riley Goodside, Simon Willison).</li>
      <li>Track what worked + what didn&rsquo;t in a personal prompt library.</li>
      <li>Run head-to-head: same task on 2-3 models, grade outputs.</li>
    </ul>

    <h2>Common gaps</h2>
    <ul>
      <li>One model use only &mdash; missing the model-selection skill.</li>
      <li>Not using projects / custom GPTs &mdash; reinventing context every time.</li>
      <li>No quality calibration &mdash; trusting AI output without verifying citations.</li>
      <li>Not knowing prompt caching exists &mdash; paying 10x more than needed on API.</li>
    </ul>
    <p>
      Tools to practice: <a href="/tools/prompt-rewriter">prompt rewriter</a>,{" "}
      <a href="/tools/system-prompt-generator">system prompt generator</a>,{" "}
      <a href="/tools/ai-model-picker-quiz">AI model picker quiz</a>.
    </p>
  </>
);
