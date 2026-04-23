import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Aider is a pair-programming CLI that edits files in your repo and commits the changes directly
    to git. You run it from inside a project, give it a goal in plain English, and it proposes
    diffs one turn at a time &mdash; with every accepted change landing as its own git commit.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What Aider actually does</h2>
    <p>
      Aider loads the files you add to the chat into an LLM&rsquo;s context, then asks the model
      to produce either a unified diff or a whole-file rewrite depending on the edit format it
      negotiated for your model. When you accept, Aider applies the edit and runs{" "}
      <code>git commit</code> with a message it wrote. Undo is just{" "}
      <code>git reset --hard HEAD~1</code>, so there is no magic state to untangle.
    </p>

    <h2>Installing</h2>
    <pre>{`python -m pip install aider-install
aider-install`}</pre>
    <p>
      The installer puts Aider in its own isolated environment so it will not fight your project
      deps. Set <code>ANTHROPIC_API_KEY</code> or <code>OPENAI_API_KEY</code> in your shell profile
      before the first run.
    </p>

    <h2>A first session</h2>
    <pre>{`cd my-project
aider --model sonnet src/handlers.py src/handlers_test.py`}</pre>
    <p>
      Inside the prompt, describe the change: &ldquo;add retry with exponential backoff to the
      fetch_user handler, and extend the existing test to cover three retries.&rdquo; Aider will
      edit both files, run the test command if you set one, and commit. Use <code>/add</code> and{" "}
      <code>/drop</code> to manage the file set, <code>/undo</code> to roll back the last commit,
      and <code>/ask</code> when you want to discuss without editing.
    </p>

    <h2>Picking a model</h2>
    <p>
      Claude Sonnet and GPT-class frontier models are the sweet spot for whole-file edits on
      real code. Aider&rsquo;s own leaderboard is the best live reference &mdash; it measures
      edit-format compliance, not just raw code quality, which is what actually breaks agents in
      practice. For cost-sensitive work, use an <code>--architect</code> plus{" "}
      <code>--editor-model</code> split so a strong reasoner plans and a cheaper model writes.
    </p>

    <h2>Configuration pitfalls</h2>
    <p>
      Drop a <code>.aider.conf.yml</code> at the repo root to pin model, edit format, lint command
      and test command. Aider will run your linter and tests after each edit and feed failures
      back into the next turn &mdash; this is the single biggest quality win and most users skip
      it. Add <code>.aider*</code> to <code>.gitignore</code> so chat history and cache do not
      leak into commits.
    </p>

    <h2>When Aider shines</h2>
    <p>
      Bounded changes across two to six files where you want atomic commits and a clean diff
      trail. Bug fixes with a reproducing test are ideal: write the failing test, tell Aider to
      make it pass, watch it iterate.
    </p>

    <h2>When not to use it</h2>
    <p>
      Greenfield apps where you do not yet have a repo structure &mdash; Aider assumes you know
      which files to put in context, and its retrieval is weaker than IDE-integrated agents.
      Also avoid it for &ldquo;read the whole repo and tell me how auth works&rdquo; exploration;
      tools like Cline or Cursor index the codebase and will answer faster.
    </p>
  </>
);
