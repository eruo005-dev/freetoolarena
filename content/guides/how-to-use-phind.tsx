import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Phind is an AI search engine built for developers &mdash; it answers technical questions with web-grounded citations and a code-tuned model of its own.</p>);

export const body: ReactElement = (
  <>
    <p>Phind combines live web search with a custom fine-tuned LLM (Phind-70B, based on Llama architectures) to answer programming questions. Unlike general chatbots, it cites the sources it pulled from and formats code blocks with syntax highlighting, making it closer to a &ldquo;Stack Overflow that writes the answer for you.&rdquo;</p>
    <h2>What it is</h2>
    <p>Phind runs a search pipeline that retrieves relevant pages (docs, GitHub issues, blog posts) and feeds them to its model as grounding context. You pick between Phind-70B (fast, default) and Pro models like Claude Sonnet or GPT. It offers a web UI, a VS Code extension, and API access for Pro users.</p>
    <h2>Install / sign up</h2>
    <pre>{`# Web
open https://www.phind.com

# VS Code
code --install-extension Phind.phind

# Pro plan (unlocks bigger models & higher limits)
# https://www.phind.com/plans  ($20/mo)`}</pre>
    <h2>First session</h2>
    <p>Type a technical question into the search bar. Phind shows a streamed answer with inline citation chips; click any chip to open the source page. Follow-up questions keep the same search thread.</p>
    <pre>{`$ # Example prompt
> How do I stream server-sent events from FastAPI to a React client?
# Phind returns code for both sides + 6 citation chips`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>1. Paste an error message &mdash; Phind searches issue trackers and returns the fix with the closest matching GitHub thread.</li>
      <li>2. Use &ldquo;Pair Programmer&rdquo; mode in the VS Code extension to edit files with grounded suggestions.</li>
      <li>3. Save threads to a Workspace so your team can browse previously answered questions.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>Phind&rsquo;s strength is freshness &mdash; it will often beat stock ChatGPT on brand-new library versions because it actually reads the current docs page. Its weakness is long reasoning chains; for multi-file refactors you&rsquo;re better off in a proper coding agent.</p>
    <p>The free tier caps daily Pro-model uses but keeps Phind-70B unlimited. Turn off &ldquo;Concise answers&rdquo; in settings if you want more explanation alongside the code.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Developers who Google dozens of times a day and would rather ask a question once and get a cited, code-first answer.</p>
  </>
);
