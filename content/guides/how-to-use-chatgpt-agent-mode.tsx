export const intro = (
  <>
    <p>
      ChatGPT agent mode is OpenAI&rsquo;s hosted agent: tell it what to do, it
      browses, clicks, reads, and comes back with a result. It&rsquo;s the
      easiest way to run an agent today — no code, no SDK, no infrastructure.
      It lives inside a ChatGPT Plus, Pro, or Team conversation.
    </p>
    <p>
      This guide walks you through enabling it, a first real task, and the
      guardrails you&rsquo;ll want to set before you trust it with anything
      sensitive. Written April 2026 against the current ChatGPT agent
      experience.
    </p>
  </>
);

export const body = (
  <>
    <h2>What it is (and isn&rsquo;t)</h2>
    <p>
      Agent mode lets ChatGPT use a browser, a terminal, and a file workspace
      to complete a multi-step task while you watch. Think: &ldquo;find the
      three cheapest flights, compare on layover length, and write the
      comparison to a doc.&rdquo; It is <strong>not</strong> a background
      worker — it runs live inside your conversation and stops when you close
      it. For always-on automations, see our{" "}
      <a href="/guides/how-to-set-up-an-ai-agent">setup overview</a>.
    </p>

    <h2>Step 1 — Confirm you have access</h2>
    <p>
      Agent mode ships on Plus, Pro, and Team plans. Free-tier accounts don&rsquo;t
      see it. If you&rsquo;re on Enterprise or Education, your admin may have
      toggled it off; ask them first before you spend an afternoon debugging.
    </p>

    <h2>Step 2 — Turn it on inside a chat</h2>
    <p>
      Open any conversation. In the composer, click the tools dropdown and
      select <strong>agent mode</strong>, or type <code>/agent</code> to
      activate it. You&rsquo;ll see the composer change — ChatGPT is now in
      agent posture rather than chat posture.
    </p>

    <h2>Step 3 — Write a good first prompt</h2>
    <p>
      Agent prompts aren&rsquo;t chat prompts. They should include:
    </p>
    <ul>
      <li><strong>Goal</strong> — the outcome you want.</li>
      <li><strong>Sources</strong> — which sites or accounts to use.</li>
      <li><strong>Stop condition</strong> — when you consider it done.</li>
      <li><strong>Output shape</strong> — a doc, a table, an email draft.</li>
    </ul>
    <p>
      Example: &ldquo;Find three independent bookshops in Lisbon open Sundays,
      write their addresses and opening hours in a markdown table. Stop after
      three; don&rsquo;t list more.&rdquo; Use our{" "}
      <a href="/tools/prompt-improver">prompt improver</a> to tighten the
      prompt before you run — agent tokens cost more than chat tokens.
    </p>

    <h2>Step 4 — Watch the first run end to end</h2>
    <p>
      The first time, <strong>do not walk away</strong>. Watch it open tabs,
      click, and reason. You&rsquo;ll see two things: where it&rsquo;s smarter
      than you expected, and where it confidently does the wrong thing. You
      can interrupt with &ldquo;stop and ask me&rdquo; or &ldquo;use this site
      instead&rdquo; mid-run.
    </p>

    <h2>Step 5 — Approve sensitive actions manually</h2>
    <p>
      For anything that <em>writes</em> — sending email, posting on a site,
      clicking &ldquo;buy&rdquo; — agent mode will pause and ask you to
      approve. Don&rsquo;t disable this. An agent that confidently sends the
      wrong email to your boss is a bad day. The small friction of one click
      is worth it.
    </p>

    <h2>Step 6 — Log in only when you need to</h2>
    <p>
      Agent mode can ask you to log into sites. Do it inline, in the agent&rsquo;s
      browser window, for that single session. Don&rsquo;t save passwords in the
      agent; use your password manager and type them in when asked. Never share
      two-factor codes or banking credentials with an agent — not this one, not
      any other.
    </p>

    <h2>Good tasks for agent mode</h2>
    <ul>
      <li>Researching a short list (books, flights, apartments, tools).</li>
      <li>Comparing 3–10 items across a fixed set of criteria.</li>
      <li>Pulling data from a site that has no API.</li>
      <li>Drafting an email, doc, or spreadsheet from browsing.</li>
      <li>Light form-filling with your supervision.</li>
    </ul>

    <h2>Bad tasks for agent mode</h2>
    <ul>
      <li>Anything that takes more than ~20 minutes end-to-end.</li>
      <li>Tasks that run overnight or on a schedule (use an SDK or Zapier).</li>
      <li>Large-scale data collection (hundreds of pages).</li>
      <li>Anything with your real money or real credentials.</li>
    </ul>

    <h2>When to graduate off it</h2>
    <p>
      If you find yourself running the same agent-mode task weekly, you&rsquo;ve
      outgrown it. Move to an SDK or platform that can schedule the job — see{" "}
      <a href="/guides/how-to-build-an-agent-with-the-openai-agents-sdk">
        the OpenAI Agents SDK guide
      </a>
      {" "}for the developer path, or our{" "}
      <a href="/guides/how-to-set-up-an-ai-agent">agent setup overview</a> for
      the full decision tree.
    </p>
  </>
);
