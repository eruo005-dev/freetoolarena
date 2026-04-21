export const intro = (
  <>
    <p>
      Coding interviews are their own skill. Strong engineers who don&rsquo;t prepare routinely
      bomb them, and mediocre engineers who prepare well get offers. The good news: the skill is
      narrow, trainable, and the return on preparation is enormous — an offer from a top
      employer can change your income by six figures annually.
    </p>
    <p>
      This guide is the efficient-prep version, not the 500-hour LeetCode version. Most
      candidates can get where they need to be with 40–100 focused hours, spread over 8–12 weeks.
    </p>
  </>
);

export const body = (
  <>
    <h2>1. Pick the target company level first</h2>
    <p>
      Prep depth varies with target. FAANG L4/L5 roles need systems design <em>and</em>{" "}
      algorithms under time pressure. Series-B startup might be a take-home and a real-world
      coding pairing. Know what you&rsquo;re walking into before you spend a month on
      dynamic-programming drills you&rsquo;ll never use.
    </p>

    <h2>2. Know the patterns, not the problems</h2>
    <p>
      There are about 15 core problem patterns: two pointers, sliding window, BFS/DFS on
      graphs, binary search variations, dynamic programming (1D and 2D), intervals, heaps,
      tries, topological sort, union-find, monotonic stack. Learning the patterns lets you
      recognize a new problem as a known shape. Memorizing specific solutions doesn&rsquo;t
      scale.
    </p>

    <h2>3. Start with easy problems, finish each one</h2>
    <p>
      Early prep trap: jumping to hard problems, getting stuck, looking at solutions. That
      builds nothing. Do easy problems until you can solve them comfortably, then move to
      medium. Stop trying to get better by doing things beyond your current level.
    </p>

    <h2>4. Solve a problem three times</h2>
    <p>
      Attempt it fresh → read the solution → implement it from scratch, closed book, the next
      day. This three-pass approach turns exposure into retention. Just reading a solution
      teaches almost nothing.
    </p>

    <h2>5. Practice talking through the solution</h2>
    <p>
      Interviews score communication as much as correctness. Narrate your thinking: &ldquo;My
      first thought is BFS because we need the shortest path. Let me consider edge cases
      first…&rdquo; If you practice silent, you&rsquo;ll interview silent, which reads as panic
      even when you&rsquo;re not.
    </p>

    <h2>6. Use a timer, always</h2>
    <p>
      Real interviews are 45 minutes. Practice with a 35-minute timer using our{" "}
      <a href="/tools/countdown-timer">countdown timer</a>. Pressure changes everything —
      problems you can solve in an hour unstructured are very different from problems you can
      solve in 35 minutes with someone watching.
    </p>

    <h2>7. Do mock interviews, not just solo prep</h2>
    <p>
      Solo prep misses 40% of what makes interviews hard: the person on the other side, the
      pacing, the pressure. Pramp, interviewing.io, or a friend. Even 5 mock interviews add
      more than another 30 solo problems.
    </p>

    <h2>8. Study systems design proportional to target seniority</h2>
    <p>
      For senior+ roles, systems design is half the loop. Pick 2–3 canonical systems (URL
      shortener, Twitter feed, chat system, ride-sharing) and practice designing them in 45
      minutes — capacity estimates, APIs, data models, scaling bottlenecks. &ldquo;Designing Data
      Intensive Applications&rdquo; is the one book worth reading for this.
    </p>

    <h2>9. Behavioral prep is not optional</h2>
    <p>
      Most engineers think behavioral rounds are easy and then tank them. Have 5–7 specific
      stories that cover: conflict, leadership, technical trade-offs, failure, and ambiguity.
      Use STAR structure (Situation, Task, Action, Result) and practice out loud. One great
      story covers three questions.
    </p>

    <h2>10. Review your own code under pressure</h2>
    <p>
      After each problem, re-read what you wrote. What was messy? Where did you hesitate? What
      edge cases did you miss? This self-review is where growth happens. Pair with our{" "}
      <a href="/guides/how-to-write-clean-code">clean code guide</a> for the style and structure
      side.
    </p>

    <h2>11. Sleep, exercise, and don&rsquo;t grind the day before</h2>
    <p>
      The day before the interview, do one warmup problem and rest. Grinding hard problems 24
      hours out makes you tired and shaky, not sharper. Cognitive performance is dominated by
      sleep and energy far more than by the marginal problem you did the night before.
    </p>

    <h2>12. Build a structured weekly plan</h2>
    <p>
      8–12 weeks of prep, 4–6 hours a week, is enough for most people with some background. Use
      our <a href="/guides/how-to-plan-your-week">weekly planning guide</a> to keep consistent
      progress. Skipping weeks is the #1 reason prep stalls.
    </p>

    <h2>Your first week of prep</h2>
    <p>
      Pick a target company. Identify the likely rounds. Spend one hour mapping the 15 patterns
      to example problems. Start with 3 easy problems, each done three times. Do one mock
      interview at the end of week two. Run that rhythm for 8 weeks. That&rsquo;s the whole
      playbook.
    </p>
  </>
);
