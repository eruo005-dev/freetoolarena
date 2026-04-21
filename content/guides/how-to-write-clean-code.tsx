export const intro = (
  <>
    <p>
      Clean code is code that reads like prose — a new developer can follow it without a map,
      and a future you can modify it without fear. Clean code isn&rsquo;t about elegance contests
      or following every rule in a book; it&rsquo;s about reducing the cognitive load for the next
      person to touch it, which is almost always yourself in six months.
    </p>
    <p>
      This guide covers practical, language-agnostic principles that separate code that lasts
      from code that has to be rewritten. Not theory; the stuff that moves the needle in real
      reviews.
    </p>
  </>
);

export const body = (
  <>
    <h2>1. Name things precisely</h2>
    <p>
      Naming is the single biggest lever in readability. <code>getUserData()</code> is vague;{" "}
      <code>fetchActiveUserProfile()</code> is clear. Avoid abbreviations unless they&rsquo;re
      standard in your domain. Names should reveal intent; if you need a comment to explain
      what a variable holds, the name is wrong.
    </p>

    <h2>2. Functions do one thing</h2>
    <p>
      Single Responsibility Principle, condensed: a function should have one reason to change. If
      you can&rsquo;t describe a function in one short sentence without &ldquo;and,&rdquo; it&rsquo;s
      doing too much. Break it up — small focused functions are easier to test, reuse, and
      understand.
    </p>

    <h2>3. Keep functions short</h2>
    <p>
      A function that doesn&rsquo;t fit on a screen is usually hiding multiple functions. Aim for
      20 lines as a rough ceiling. Exceptions exist (big switch tables, specialized algorithms),
      but they should feel like exceptions — not the norm.
    </p>

    <h2>4. Prefer clarity to cleverness</h2>
    <p>
      A one-line ternary that&rsquo;s hard to read is worse than an 8-line if/else that&rsquo;s
      obvious. Future-you will thank present-you for the obvious version. The industry&rsquo;s
      best engineers write boringly clear code; it&rsquo;s juniors trying to show off who write
      clever code.
    </p>

    <h2>5. Handle errors explicitly</h2>
    <p>
      Don&rsquo;t swallow exceptions. Don&rsquo;t return null to signal &ldquo;something went
      wrong.&rdquo; Either handle the error at the right level or propagate it with context. Every
      silent failure is a future debugging session.
    </p>

    <h2>6. Don&rsquo;t comment what you should have named</h2>
    <p>
      <code>// Loop through users and send emails</code> above a loop that does exactly that is
      noise. A comment should explain <em>why</em>, not <em>what</em>. If the code needs a
      comment to explain what it does, extract a function with a descriptive name instead.
    </p>

    <h2>7. Delete dead code</h2>
    <p>
      Commented-out code, unused imports, abandoned helpers. Your version control already
      remembers the old version. Carrying dead code forever bloats files and introduces
      &ldquo;wait, is this used?&rdquo; friction during reviews. Delete it.
    </p>

    <h2>8. Keep the call site simple</h2>
    <p>
      A function taking 7 positional arguments signals a design problem. Prefer named parameter
      objects, sensible defaults, and splitting into smaller functions. The caller should be
      able to read the call and know what it&rsquo;s doing without jumping to the definition.
    </p>

    <h2>9. Test the hard parts</h2>
    <p>
      You don&rsquo;t need 100% coverage; you need coverage where mistakes are costly and
      non-obvious. Complex business logic, edge cases, parsing, anything with money. Simple
      glue code and trivial getters often don&rsquo;t need tests — but the tricky bits absolutely
      do.
    </p>

    <h2>10. Separate pure logic from side effects</h2>
    <p>
      Functions that do a calculation should not also write to disk, call APIs, or mutate global
      state. Keep pure logic pure — it&rsquo;s trivially testable. Isolate side effects at the
      edges of your program. This single pattern dramatically reduces bug rates.
    </p>

    <h2>11. Make impossible states impossible</h2>
    <p>
      If two flags in your state can never both be true, make that impossible in the type
      system rather than managing it in code. &ldquo;User is logged in but has no ID&rdquo; should
      be unrepresentable, not guarded against. Rich types prevent whole categories of bugs.
    </p>

    <h2>12. Write for the reader, not the compiler</h2>
    <p>
      Any code you write will be read 100 times for every time it&rsquo;s written. Optimize for
      reading. Consistent formatting (use a formatter), consistent naming, consistent patterns.
      Predictability is worth a lot more than personal style.
    </p>

    <h2>Your code review checklist</h2>
    <p>
      Before opening a PR, review your own diff with these questions: Are the names clear? Does
      each function do one thing? Are errors handled? Is there dead code? Are the tests there
      for the hard parts? This 5-minute self-review catches most of what would otherwise come
      back in comments. Pair with our{" "}
      <a href="/guides/how-to-prepare-for-coding-interviews">interview prep guide</a> for the
      adjacent skill of explaining code under pressure.
    </p>
  </>
);
