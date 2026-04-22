export const intro = (
  <>
    <p>
      GitHub Copilot is the most widely adopted AI coding tool — roughly 15
      million developers use it. In early 2026 it got a meaningful upgrade:
      Claude and Codex model access opened to all plan tiers (including
      Pro at $10/mo), and <strong>Copilot Workspace</strong> — the agent mode
      that works directly from issues and pull requests — matured into a real
      end-to-end workflow.
    </p>
    <p>
      This guide is specifically about the <em>agent side</em> of Copilot: how
      to go from a GitHub issue to a working PR with Copilot doing the
      middle. If you just want autocomplete, you already have it.
    </p>
  </>
);

export const body = (
  <>
    <h2>What is Copilot Workspace / agent mode?</h2>
    <p>
      Copilot Workspace takes a GitHub issue as input, plans a solution, edits
      files, runs tests, and produces a PR. It lives at{" "}
      <a href="https://github.com/copilot">github.com/copilot</a> and inside
      VS Code&rsquo;s Copilot Chat. You still review every diff — you always
      review every diff — but the scaffolding is done for you.
    </p>

    <h2>Step 1 — Make sure your plan has agent mode</h2>
    <p>
      Agent mode is on Pro and above. Free tier gets autocomplete and chat
      but not the multi-file agent. Business/Enterprise adds audit logs,
      IP indemnity, and admin controls. Check your plan at{" "}
      <a href="https://github.com/settings/copilot">github.com/settings/copilot</a>.
    </p>

    <h2>Step 2 — Pick the right model</h2>
    <p>
      Since the February 2026 update, Copilot&rsquo;s model picker exposes
      Claude and Codex options across plans. For agent-mode work, pick:
    </p>
    <ul>
      <li><strong>Claude Opus 4.7</strong> — deep reasoning, multi-file changes.</li>
      <li><strong>GPT-5 / Codex</strong> — structured edits, good tool use.</li>
      <li><strong>Claude Sonnet</strong> — faster, cheaper for routine changes.</li>
    </ul>
    <p>
      You can switch mid-session. For a refactor, start with Opus/GPT-5; for
      &ldquo;add a null check and a test,&rdquo; Sonnet is fine.
    </p>

    <h2>Step 3 — Write the issue like a brief</h2>
    <p>
      The quality of the agent&rsquo;s output is bounded by the quality of
      the issue. Good issues include:
    </p>
    <ul>
      <li>What&rsquo;s broken or missing (with an example).</li>
      <li>What the expected behaviour is.</li>
      <li>Which files or areas to look at.</li>
      <li>Any constraints (don&rsquo;t touch X, keep Y API stable).</li>
    </ul>
    <p>
      Think of it like briefing a capable junior engineer you can&rsquo;t
      talk to in real time. Vague issues produce vague PRs. Our{" "}
      <a href="/tools/prompt-improver">prompt improver</a> works on issue
      text too — paste the body, get a tighter version.
    </p>

    <h2>Step 4 — Hand the issue to Copilot</h2>
    <p>
      From a GitHub issue, click <strong>Assign to Copilot</strong> (or open
      it in Copilot Workspace). The agent produces a plan — the list of files
      it intends to change and why. Read this carefully before approving.
      90% of bad PRs are bad plans that nobody questioned.
    </p>

    <h2>Step 5 — Review the plan, not just the diff</h2>
    <p>
      The plan is where you catch scope creep. If the agent says it&rsquo;s
      about to touch 14 files for a 2-line bug fix, stop and redirect.
      Editing the plan is cheap. Editing the PR afterwards is expensive.
    </p>

    <h2>Step 6 — Let it run, then review like a human PR</h2>
    <p>
      Once you approve the plan, Copilot writes the code, runs tests (if
      configured), and pushes a branch. It opens the PR with an AI-generated
      description. Review it exactly like you&rsquo;d review a teammate&rsquo;s
      work:
    </p>
    <ul>
      <li>Read the actual diff, not just the summary.</li>
      <li>Run the code locally if it touches anything risky.</li>
      <li>Check tests actually test the change, not just pass.</li>
      <li>Look for unrelated edits you didn&rsquo;t ask for.</li>
    </ul>

    <h2>Step 7 — Iterate by comment</h2>
    <p>
      Copilot responds to PR comments. Instead of manually fixing, leave a
      review comment like &ldquo;this logic should handle null&rdquo; and the
      agent pushes a follow-up commit. For small nits, still edit manually —
      faster than a full agent round-trip.
    </p>

    <h2>Step 8 — Configure repo-level rules</h2>
    <p>
      Add a <code>.github/copilot-instructions.md</code> file. Copilot reads
      it automatically on every agent task. Put your repo conventions there —
      framework version, test command, style rules. Same idea as Cursor&rsquo;s{" "}
      <code>.cursorrules</code> and Claude Code&rsquo;s <code>CLAUDE.md</code>.
    </p>

    <h2>When to use Copilot agent mode vs. alternatives</h2>
    <p>
      Copilot wins when your work already lives on GitHub — issue, PR, review,
      merge. The tight integration is the feature.{" "}
      <a href="/guides/how-to-set-up-claude-code">Claude Code</a> wins for
      long reasoning over local repos.{" "}
      <a href="/guides/how-to-set-up-cursor-ai-ide">Cursor</a> wins for
      in-editor flow. Most teams end up with all three and use whichever fits
      the task.
    </p>

    <h2>Security and privacy</h2>
    <p>
      Business and Enterprise Copilot plans don&rsquo;t train on your code and
      provide IP indemnity. On Pro, double-check the privacy settings at{" "}
      <a href="https://github.com/settings/copilot">settings/copilot</a>{" "}
      before pointing the agent at anything sensitive. Never put API keys,
      secrets, or customer data in prompts or issues — that goes for any
      coding agent.
    </p>
  </>
);
