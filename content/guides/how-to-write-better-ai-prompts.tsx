import { type ReactElement } from "react";

export const intro: ReactElement = (<p>The difference between a useless AI output and a genuinely useful one is almost never the model &mdash; it&rsquo;s the prompt.</p>);

export const body: ReactElement = (
  <>
    <p>Prompt engineering sounds intimidating, but for small-business owners and solo founders it boils down to a few repeatable habits. If you&rsquo;re pasting one-line questions into ChatGPT or Claude and getting mushy, generic answers, you&rsquo;re leaving 70% of the model on the table. This guide walks through the formula that consistently produces publishable, usable output &mdash; no PhD required.</p>

    <h2>The 4-part formula: role + task + context + format</h2>
    <p>Every strong prompt names a <em>role</em> (who the AI should act as), a <em>task</em> (what it should do), <em>context</em> (the specifics of your situation), and a <em>format</em> (how the answer should be shaped). Miss any one of the four and quality drops. Think of it as briefing a freelancer: you wouldn&rsquo;t just say &ldquo;write me something.&rdquo;</p>

    <h2>Weak vs strong prompts, side by side</h2>
    <ul>
      <li>Weak: &ldquo;Write a cold email.&rdquo; Strong: &ldquo;You&rsquo;re a B2B SaaS sales rep. Write a 90-word cold email to a head of marketing at a 50-person agency. Hook: our tool cuts reporting time 60%. Format: subject line + 3 short paragraphs + single CTA.&rdquo;</li>
      <li>Weak: &ldquo;Summarize this.&rdquo; Strong: &ldquo;Summarize this customer call transcript for a busy CEO. Return: 3 bullets of wins, 3 bullets of concerns, one recommended next step.&rdquo;</li>
      <li>Weak: &ldquo;Help me name my product.&rdquo; Strong: &ldquo;You&rsquo;re a brand strategist. Suggest 10 names for a dog-walking app targeting urban millennials. Tone: warm and playful. Avoid anything with &lsquo;paw&rsquo; or &lsquo;pup.&rsquo; Include the .com availability guess for each.&rdquo;</li>
    </ul>

    <h2>System prompt vs user prompt</h2>
    <p>The system prompt sets the persona and the unchanging rules &mdash; who the AI is, what it never does, the tone it holds across a whole session. The user prompt is the specific request you send each turn. If you&rsquo;re building a custom GPT or a Claude Project, front-load the durable stuff (style guide, brand voice, banned words) into the system prompt so you don&rsquo;t repeat yourself in every message.</p>

    <h2>Chain-of-thought and few-shot examples</h2>
    <p>Chain-of-thought simply means asking the model to &ldquo;think step by step&rdquo; or &ldquo;work through this out loud before giving the final answer.&rdquo; It noticeably improves accuracy on anything involving math, logic, or multi-step reasoning. Few-shot means showing the model 2&ndash;3 examples of input &rarr; desired output before the real task. For anything repetitive like tagging, classifying, or formatting, few-shot beats any amount of instructions.</p>

    <h2>Temperature: 0 vs 0.7</h2>
    <p>Temperature controls randomness. Set it to 0 (or close to it) when you want deterministic, factual, repeatable output &mdash; data extraction, code, summaries, anything where wrong is worse than boring. Crank it up to 0.7&ndash;1.0 when you want creativity &mdash; brainstorms, taglines, fiction, variant generation. Most chat UIs hide temperature, but the API and most playgrounds expose it.</p>

    <h2>Iterate, save wins, build a library</h2>
    <p>Treat prompts like code. When one works, save it to a Notion page, a Google Doc, or a dedicated prompt library tool. Name it, tag it, note what model and what date. Next month when you need the same thing, you won&rsquo;t reinvent it. Solo founders who do this compound a personal moat over time.</p>

    <h2>Common mistakes</h2>
    <p>Vague instructions (&ldquo;make it better&rdquo;), stuffing 10 tasks into one prompt, and telling instead of showing. The fix for all three is the same: show the model an example of what &ldquo;good&rdquo; looks like rather than describing it in adjectives. This is the show-don&rsquo;t-tell rule and it&rsquo;s the single biggest upgrade most people can make today.</p>

    <h2>Bottom line</h2>
    <p>Use role + task + context + format, show examples, pick temperature deliberately, and save what works. Do that for a month and you&rsquo;ll out-prompt 95% of users on any model you touch.</p>
  </>
);
