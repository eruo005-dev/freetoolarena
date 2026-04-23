import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Bolt.new by StackBlitz is an in-browser, full-stack AI builder. You
    type what you want, and a WebContainer boots a real Node runtime
    right inside your tab &mdash; no server round-trips for the shell, no
    local install, no Docker. The result is a shocking time-to-running-app
    for prototypes and marketing demos.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What Bolt.new actually is</h2>
    <p>
      Bolt.new is StackBlitz&rsquo;s AI product, built on the same
      WebContainer technology that powers their IDE. The agent edits
      files, runs <code>npm install</code>, launches dev servers, and
      lets you deploy to Netlify in one click &mdash; all client-side.
      You&rsquo;re not SSH-ing to a VM like Replit; the Node process is
      literally running in your browser tab via WebAssembly.
    </p>

    <h2>Setting it up</h2>
    <p>
      Go to <a href="https://bolt.new">bolt.new</a> and sign in with
      GitHub or Google. The free tier gives you a daily token allowance;
      Pro plans start around $20/mo with more tokens and private
      projects. No CLI needed.
    </p>
    <pre>{`# Optional: open any public GitHub repo in Bolt by prepending the domain.
https://bolt.new/github.com/<owner>/<repo>

# Or start from a prompt on the home page.`}</pre>

    <h2>Your first session</h2>
    <p>
      A good first prompt is concrete and bounded: &ldquo;A Vite + React
      todo app with drag-and-drop reordering, localStorage persistence,
      and a dark-mode toggle.&rdquo; Bolt lays out the plan, creates
      files, runs the dev server, and shows the preview in the right
      pane. Iterate by chat (&ldquo;add a filter for completed
      items&rdquo;) or edit code directly. When you&rsquo;re happy,
      click <strong>Deploy</strong>.
    </p>

    <h2>A realistic workflow</h2>
    <p>
      Bolt is strongest as a prototype factory. Keep prompts
      incremental, commit to GitHub frequently (Bolt has a connector),
      and pull the repo locally once the app outgrows browser-only
      convenience. For UI-heavy generation, pair it with{" "}
      <a href="/guides/how-to-use-v0-by-vercel">v0</a> for
      component-level work and paste into Bolt for wiring. The feedback
      loop &mdash; type, see, adjust &mdash; is what makes it special;
      lean into that instead of writing one giant spec.
    </p>

    <h2>Gotchas and limits</h2>
    <p>
      Tokens are the budget. An aggressive &ldquo;rewrite the
      app&rdquo; prompt can burn thousands at once &mdash; scope your
      asks. WebContainer is incredible but it&rsquo;s not a full Linux;
      native binaries, Puppeteer, Docker, Rust toolchains &mdash; none
      of it works. Stick to Node, pure-JS packages, and static
      frontends. Mobile browsers struggle with longer sessions; use a
      laptop. Generated code tends to be a bit sprawling &mdash; plan a
      refactor pass before you treat it as production.
    </p>

    <h2>When NOT to use it</h2>
    <p>
      Don&rsquo;t use Bolt for Python, Go, Rust, or anything that needs
      a real OS &mdash; the WebContainer can&rsquo;t run them. Don&rsquo;t
      use it for large existing codebases &mdash; import works but the
      agent&rsquo;s context is shallower than what you&rsquo;d get in
      Cursor or Claude Code. And skip it if offline work matters; the
      whole thing is a live browser session. For a hosted experience
      with a full VM, see <a href="/guides/how-to-use-replit-agent">Replit Agent</a>.
    </p>
  </>
);
