import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Mentat is an open-source command-line coding assistant from AbanteAI that plans and applies multi-file edits directly from your terminal.</p>);

export const body: ReactElement = (
  <>
    <p>Mentat predates the current wave of agent CLIs and is still a clean, scriptable option. You give it a set of files and a natural-language task; it proposes a diff covering all of them, shows you the patch, and applies it on confirmation. It&rsquo;s BYO-API-key and works with OpenAI, Anthropic, or local models via LiteLLM.</p>
    <h2>What it is</h2>
    <p>Mentat is a Python CLI. It parses the files you include, builds a context window, and prompts the model for a structured edit. Unlike chat-first tools, its primary verb is &ldquo;produce a diff,&rdquo; which makes it feel closer to a human pair-programmer than a chatbot. The project has been a reference implementation for many later agent tools.</p>
    <h2>Install / sign up</h2>
    <pre>{`# Requires Python 3.10+
pipx install mentat

# Set your API key
export OPENAI_API_KEY=sk-...
# or
export ANTHROPIC_API_KEY=sk-ant-...`}</pre>
    <h2>First session</h2>
    <p>From your project root, run mentat with the files (or directories) you want in context. Type your request at the prompt, review the proposed diff, and approve.</p>
    <pre>{`$ mentat src/api/ tests/
> Add rate limiting to the /login endpoint using a token bucket
# Mentat prints a unified diff across 3 files
# y to accept, n to reject, e to edit the prompt`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>1. Include only the directories relevant to a task &mdash; smaller context means cheaper, faster, more accurate edits.</li>
      <li>2. Use /include and /exclude mid-session to adjust context without restarting.</li>
      <li>3. Chain Mentat into a script: pipe a task description in, capture the diff, and gate it behind CI.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>Mentat respects .gitignore and will refuse to touch files outside the paths you pass, which is a nice safety default. For very large repos, combine it with a grep step to narrow context before invoking the agent.</p>
    <p>Because it produces unified diffs, merge conflicts with uncommitted work will abort the apply step cleanly &mdash; commit or stash first. Switch models mid-session with /model gpt-4o or /model claude-sonnet-4.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Terminal-native developers who prefer a lean, diff-first workflow over heavyweight IDE integrations, and anyone who wants to scrip agent edits into a pipeline.</p>
  </>
);
