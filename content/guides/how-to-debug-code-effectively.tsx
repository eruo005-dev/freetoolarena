export const intro = (
  <>
    <p>
      Most junior devs debug by guessing — add a console.log, change a line, rerun.
      Senior devs debug by forming hypotheses and testing them. It&rsquo;s a skill you
      can learn. This guide walks through a repeatable debugging process.
    </p>
    <p>
      Debugging is 50% of real engineering work. Getting good at it is the highest-
      leverage skill you can build after learning to code.
    </p>
  </>
);

export const body = (
  <>
    <h2>1. Reproduce the bug first</h2>
    <p>
      If you can&rsquo;t reproduce it, you can&rsquo;t fix it. Get a reliable set of
      steps that triggers the bug every time. Without reproduction, every &ldquo;fix&rdquo;
      is a guess. Spend extra time here — it saves hours later.
    </p>

    <h2>2. Form a hypothesis</h2>
    <p>
      Based on the symptoms, what do you think is happening? Write it down. A hypothesis
      is falsifiable (&ldquo;this variable is null at line 42&rdquo;). &ldquo;Something
      weird is going on&rdquo; is not a hypothesis.
    </p>

    <h2>3. Test the hypothesis</h2>
    <p>
      Add a log, set a breakpoint, or write an assertion that confirms or rules out
      your theory. One experiment at a time. Don&rsquo;t change five things then
      rerun — you learn nothing.
    </p>

    <h2>4. Read the error message carefully</h2>
    <p>
      Most bugs announce themselves. Stack traces show you the exact file and line.
      Read every word. Don&rsquo;t paste it into Google until you&rsquo;ve read it twice.
      Half the time the answer is right there.
    </p>

    <h2>5. Use a real debugger</h2>
    <p>
      Chrome DevTools, VS Code debugger, pdb. Breakpoints let you pause execution and
      inspect state. Much faster than console.log when the bug is anything complex.
      Worth 30 minutes of learning.
    </p>

    <h2>6. Binary search the code</h2>
    <p>
      Bug appeared recently? git bisect finds the commit that caused it in log-2-N steps.
      Bug in a big function? Comment out half, find which half has it, repeat. Halving
      the search space beats scanning linearly.
    </p>

    <h2>7. Check the obvious things first</h2>
    <p>
      Is the service running? Are you on the right branch? Did you save the file? Is the
      env var set? Seniors embarrass themselves less often because they check these
      before debugging for 2 hours.
    </p>

    <h2>8. Rubber duck debugging</h2>
    <p>
      Explain the bug out loud, line by line, to an inanimate object (or a colleague who
      didn&rsquo;t ask). Half the time you spot the bug mid-sentence. Forcing verbal
      articulation works.
    </p>

    <h2>9. Take breaks</h2>
    <p>
      Stuck for 30 minutes? Walk away for 10. Your brain keeps processing while you
      don&rsquo;t look at the screen. The answer often shows up on the way back from the
      kitchen. Tunneling makes you slower, not faster.
    </p>

    <h2>10. Write a test once you fix it</h2>
    <p>
      Every bug is a missing test. Write the test that would have caught it. Prevents
      regression, documents the fix, and builds a stronger suite over time. See{" "}
      <a href="/guides/how-to-write-clean-code">clean code guide</a> for broader habits.
    </p>

    <h2>11. Keep a debugging log</h2>
    <p>
      For tricky bugs, write down what you&rsquo;ve tried and what you learned. Future
      you (or your teammate) will thank you. Makes handoffs trivial and prevents
      repeating dead ends.
    </p>

    <h2>12. When all else fails, simplify</h2>
    <p>
      Strip the code down to a minimal reproduction. Remove everything until the bug
      disappears, then add back until it reappears. The last thing you added is almost
      always the cause. See <a href="/guides/how-to-learn-coding-fast">how to learn
      coding fast</a> for the broader skill context.
    </p>
  </>
);
