import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    The free AI ecosystem in 2026 is genuinely good. You can do serious work &mdash; research,
    coding, writing, image gen, voice &mdash; without paying anyone. Here&rsquo;s the honest
    free-tier ranking by category, with the rate limits that actually bite.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The 2026 free-tier all-stars</h2>
    <ul>
      <li><strong>NotebookLM (Google)</strong> &mdash; up to 50 sources, full chat with citations,
        audio overviews. Best free tool, full stop. No rate limits worth caring about.</li>
      <li><strong>Claude.ai (free)</strong> &mdash; Claude Sonnet 4.6 with daily message cap. Excellent
        free coding + writing AI.</li>
      <li><strong>ChatGPT (free)</strong> &mdash; GPT-5 with message caps. Voice mode in the app.</li>
      <li><strong>Gemini (free)</strong> &mdash; Gemini 2.5 Flash unlimited; Gemini 2.5 Pro
        rate-limited.</li>
      <li><strong>Perplexity (free)</strong> &mdash; quick search unlimited, Pro Search rate-limited
        to ~5/day.</li>
      <li><strong>DeepSeek (free)</strong> &mdash; chat.deepseek.com gives V3.2 / R1 access.</li>
      <li><strong>Kimi (free)</strong> &mdash; 1M context chat, free at kimi.com.</li>
      <li><strong>Microsoft Copilot (free)</strong> &mdash; Bing-powered, GPT-5 access without a
        ChatGPT account.</li>
    </ul>

    <h2>By task &mdash; free options</h2>
    <ul>
      <li><strong>Research with citations:</strong> NotebookLM + Perplexity free.</li>
      <li><strong>Writing / drafting:</strong> Claude.ai free + ChatGPT free.</li>
      <li><strong>Coding:</strong> Claude.ai free + GitHub Copilot via Student Pack.</li>
      <li><strong>Image gen:</strong> Bing Image Creator (free, DALL-E 3) + Gemini (free, Imagen 3).</li>
      <li><strong>Voice mode:</strong> ChatGPT free voice (limited daily); Gemini Live (free).</li>
      <li><strong>Long context:</strong> Kimi (1M free) or Gemini Flash (1M, free).</li>
      <li><strong>Local / self-host:</strong> Ollama + Llama 3.3 / Qwen 3.5 / DeepSeek-distill.
        Free if you have the hardware.</li>
    </ul>

    <h2>The free-only stack that works</h2>
    <p>
      For most casual users in 2026, the &ldquo;don&rsquo;t pay for AI&rdquo; stack is: Claude.ai
      free for writing + reasoning, NotebookLM for research, Bing Image Creator for images,
      ChatGPT free for the times you hit Claude&rsquo;s daily limit. Total cost: $0/mo.
    </p>

    <h2>When free becomes painful</h2>
    <ul>
      <li>You hit Claude / ChatGPT daily caps regularly &mdash; pay $20 for one of them.</li>
      <li>You need image gen at brand-marketing quality &mdash; Midjourney $10/mo.</li>
      <li>You&rsquo;re building anything API-driven &mdash; you&rsquo;re past free tiers anyway.</li>
      <li>You need a paid feature only available behind the paywall (Sora, Veo, Code Interpreter,
        Custom GPTs).</li>
    </ul>
  </>
);
