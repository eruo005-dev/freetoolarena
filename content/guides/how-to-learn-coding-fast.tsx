export const intro = (
  <>
    <p>
      You can go from zero to building real things in about 90 days if you follow a focused plan.
      Not a &ldquo;senior engineer in three months&rdquo; plan — that&rsquo;s a lie — but the
      &ldquo;I can now build and ship a working app&rdquo; level, which is where every career
      actually starts.
    </p>
    <p>
      Most people fail at learning to code not because it&rsquo;s too hard, but because they
      switch languages, tutorials, and frameworks every week. This guide gives you one path, one
      language, and the habit that makes it stick.
    </p>
  </>
);

export const body = (
  <>
    <h2>Pick one language and stick with it</h2>
    <p>
      Python if you like data, web scraping, or scripting. JavaScript if you want to build things
      in a browser. Don&rsquo;t agonize — either works. What matters is that you pick today and
      resist the urge to switch for 90 days. The fundamentals transfer between languages; the
      syntax doesn&rsquo;t matter nearly as much as you think.
    </p>

    <h2>Code every day for at least 25 minutes</h2>
    <p>
      Daily practice beats weekend binges. A 25-minute{" "}
      <a href="/tools/pomodoro-timer">pomodoro session</a> per day keeps the material fresh and
      builds the habit of sitting down to code, which is half the battle. If you can do two
      sessions, great. If you can only do one, still show up. Streaks matter.
    </p>

    <h2>Weeks 1–3: The fundamentals</h2>
    <p>
      Learn variables, data types, conditionals, loops, functions, and basic data structures
      (arrays/lists and dictionaries/objects). Don&rsquo;t chase a full course — work through
      short lessons and type out the examples yourself. No copy-paste.
    </p>
    <h3>Daily structure</h3>
    <ul>
      <li>10 minutes reading or watching</li>
      <li>15 minutes typing examples and small variations</li>
      <li>End each session by rewriting today&rsquo;s concept from scratch without looking</li>
    </ul>

    <h2>Weeks 4–6: Build something small, now</h2>
    <p>
      The second you can write a function and a loop, start a tiny project. A to-do list. A
      calculator. A script that renames files in a folder. It will be ugly. Finish it anyway.
      You will learn more from shipping one bad project than from six weeks of tutorials.
    </p>

    <h2>Weeks 7–9: Version control, the ecosystem, and debugging</h2>
    <p>
      Now add the tools professionals use. Learn <code>git init</code>,{" "}
      <code>git commit</code>, and <code>git push</code>, and put your projects on GitHub. Learn
      how to read error messages and use a debugger. Learn how to search effectively — copying the
      error message and adding your language&rsquo;s name is 80% of the skill.
    </p>
    <p>
      At this point, bookmark the tools you&rsquo;ll use every day: a JSON formatter for API
      responses, a base64 encoder for auth headers, and a regex tester for log parsing. Browser
      developer tools (F12) become your second home.
    </p>

    <h2>Weeks 10–12: Build the portfolio project</h2>
    <p>
      Pick one project that solves a real problem in your life and finish it. Not a clone of
      someone else&rsquo;s Twitter — a personal utility, a small tool a friend asked for, a
      dashboard for a hobby. Ship it, put it on GitHub with a clear README, and write a short
      blog post about what you built and what you learned.
    </p>
    <p>
      This is the artifact that opens doors. Recruiters don&rsquo;t care about courses finished;
      they care about projects shipped. One finished project beats a dozen half-built ones.
    </p>

    <h2>How to practice deliberately</h2>
    <p>
      Don&rsquo;t just solve problems you already know how to solve. Spend a portion of each week
      on something slightly beyond your current ability. Read other people&rsquo;s code and try to
      figure out why they made certain choices. When you get stuck, give yourself 15 minutes to
      try on your own, then look up the answer — but retype it, don&rsquo;t paste.
    </p>

    <h2>Anti-patterns that waste months</h2>
    <h3>Tutorial hell</h3>
    <p>
      Watching course after course without writing your own code. Symptom: you understand every
      line while watching, then freeze in front of a blank editor. Fix: at any moment, you should
      have a project you&rsquo;re actively building.
    </p>
    <h3>Framework hopping</h3>
    <p>
      Starting with React, bouncing to Vue, then Svelte, then Next.js, then Astro. You don&rsquo;t
      need another framework — you need to ship one thing. Pick one and commit.
    </p>
    <h3>Premature optimization</h3>
    <p>
      Fussing over the &ldquo;best&rdquo; setup, the most elegant folder structure, the perfect
      linting config. These are displacement activities. Write messy code that works, then clean
      it up. You can&rsquo;t clean up code that doesn&rsquo;t exist.
    </p>

    <h2>What comes after 90 days</h2>
    <p>
      By day 90 you&rsquo;ll have: basic fluency in one language, comfort with git and the
      terminal, and at least one finished project. That&rsquo;s the foundation. The next step is
      depth in whichever direction you enjoy most — frontend, backend, data, automation. See our
      companion guide on{" "}
      <a href="/guides/how-to-stay-productive-daily">staying productive daily</a> to keep the
      momentum going, because the honest truth is the hard part isn&rsquo;t the code — it&rsquo;s
      showing up tomorrow.
    </p>

    <h2>Your first week, concretely</h2>
    <ol>
      <li>Pick Python or JavaScript today.</li>
      <li>Install the language and a code editor (VS Code is the safe default).</li>
      <li>Set a 25-minute daily window at the same time each day.</li>
      <li>Work through your first 5 lessons and type out every example.</li>
      <li>On day 7, write a 20-line program from scratch with no tutorial.</li>
    </ol>
    <p>
      That&rsquo;s it. You&rsquo;re a developer in training from day one — not when you finish a
      bootcamp, not when you get hired. The habit starts now.
    </p>
  </>
);
