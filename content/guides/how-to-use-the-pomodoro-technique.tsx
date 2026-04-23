import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      The Pomodoro Technique is a productivity system where you work in
      fixed 25-minute blocks separated by 5-minute breaks, with a longer
      break every four blocks. Invented by Francesco Cirillo in the late
      1980s using a tomato-shaped kitchen timer (hence <em>pomodoro</em>,
      Italian for tomato). It works because it externalizes time
      management, reduces the friction of getting started, and builds in
      recovery before you notice you&rsquo;re tired. This guide covers the
      25/5 cycle, the four-and-long-break pattern, how to batch tasks,
      what to do about context switches and interruptions, and the
      popular variants (50/10, 90-minute deep work) when the classic
      25/5 doesn&rsquo;t fit your work.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The classic 25/5 cycle</h2>
    <p>
      One &ldquo;pomodoro&rdquo; = 25 minutes of focused work followed by
      a 5-minute break. After four pomodoros, take a longer break of
      15&ndash;30 minutes.
    </p>
    <pre>{`25 min work  |  5 min break
25 min work  |  5 min break
25 min work  |  5 min break
25 min work  |  20 min break   <-- long break
(repeat)`}</pre>
    <p>
      Four pomodoros = 2 hours of elapsed time, ~1h 40m of work. Most
      people hit their wall around pomodoro 8&ndash;12 (four hours of
      focused work). That&rsquo;s more focused work than most people
      actually do in a normal 8-hour day.
    </p>

    <h2>Why 25 minutes</h2>
    <p>
      Short enough that anyone can commit to &ldquo;just do one
      pomodoro.&rdquo; Long enough to get past the friction of starting and
      drop into flow. Crucially, it ends before mental fatigue
      accumulates, so you come back to the next block with full
      capacity.
    </p>
    <p>
      Shorter intervals (15 min) tend to feel rushed; longer ones (60+
      min) defeat the recovery purpose and are functionally just plain
      work sessions. Twenty-five is a well-calibrated default.
    </p>

    <h2>How to start</h2>
    <ol>
      <li>Write down one task to work on.</li>
      <li>Start a 25-minute timer.</li>
      <li>
        Work on only that task. If another idea hits, jot it on a
        &ldquo;capture&rdquo; pad to handle later.
      </li>
      <li>
        When the timer rings, stop &mdash; even mid-sentence. Mark one
        tally.
      </li>
      <li>Take a 5-minute break. Stand up, look away from the screen.</li>
      <li>Repeat.</li>
    </ol>
    <p>
      The hard part is actually stopping when the timer rings. If
      you&rsquo;re in flow the urge is to keep going. The technique
      requires the break, because the break is what makes the next
      block productive.
    </p>

    <h2>What counts as &ldquo;work&rdquo;</h2>
    <p>
      One task, or a set of closely related small tasks. Email triage
      can be one pomodoro; a code review can be one pomodoro; writing a
      section of a document is one pomodoro (or several).
    </p>
    <p>
      Big tasks get split. A blog post might be: pomodoro 1 outline,
      pomodoro 2 draft intro, pomodoro 3 draft body, pomodoro 4 edit.
      Knowing you only need 25 minutes on one piece is what gets you
      past the activation energy.
    </p>

    <h2>The break actually matters</h2>
    <p>
      The break is not optional. It is part of the technique. Five
      minutes to:
    </p>
    <ul>
      <li>Stand up, walk, stretch</li>
      <li>Get water</li>
      <li>Look out a window (long-distance vision rests eye strain)</li>
      <li>Not scroll the news or Twitter</li>
    </ul>
    <p>
      Breaks filled with other screens don&rsquo;t restore attention.
      Physical movement and visual rest do.
    </p>

    <h2>Four and a long break</h2>
    <p>
      After four pomodoros (~2 hours elapsed), take 15&ndash;30 minutes
      of longer rest. Walk outside, eat, call someone. This longer
      break lets attention and willpower refill rather than trickle.
    </p>
    <p>
      Ignore this and your 5th&ndash;8th pomodoros are lower quality
      than the first four. You&rsquo;ll still be &ldquo;working&rdquo;
      but the output degrades.
    </p>

    <h2>Handling interruptions</h2>
    <p>
      Cirillo&rsquo;s framework:
    </p>
    <p>
      <strong>Internal interruptions</strong> (you want to check
      something, you remember an errand): capture on paper, return to
      task, handle after the pomodoro.
    </p>
    <p>
      <strong>External interruptions</strong> (colleague, call, Slack):
      inform, negotiate, schedule, call back. If it&rsquo;s truly
      urgent, you abort the pomodoro &mdash; it doesn&rsquo;t count.
      You can&rsquo;t resume a pomodoro; start a new one.
    </p>
    <p>
      The discipline of &ldquo;I&rsquo;ll get back to you in 15
      minutes&rdquo; is social sometimes; for most interruptions
      it&rsquo;s both possible and appreciated.
    </p>

    <h2>Task batching</h2>
    <p>
      A single pomodoro works best for one type of work. Mixing email,
      meetings, and code in one 25-minute block wastes the block. Batch
      like with like:
    </p>
    <ul>
      <li>1 pomodoro = all your email for the morning</li>
      <li>1 pomodoro = all your code reviews</li>
      <li>2&ndash;4 pomodoros = deep-focus feature work</li>
      <li>1 pomodoro = admin / invoicing / planning</li>
    </ul>
    <p>
      You switch less, and each block builds momentum within its
      category.
    </p>

    <h2>Context switch cost</h2>
    <p>
      Every switch between tasks costs cognitive setup time &mdash; a
      few minutes of &ldquo;where was I&rdquo; at minimum, longer for
      complex work. Pomodoros enforce commitment to one thing for 25
      minutes, which drastically reduces switch cost across a day. The
      structure is less about the timer and more about the constraint.
    </p>

    <h2>Variants</h2>
    <p>
      The 25/5 default doesn&rsquo;t suit every kind of work.
    </p>
    <p>
      <strong>50/10.</strong> Fifty minutes on, ten off. Better for
      deep technical work where it takes 10&ndash;15 minutes to fully
      load context. Two 50/10 blocks fit in a classic 2-hour chunk.
    </p>
    <p>
      <strong>52/17.</strong> DeskTime&rsquo;s data on high performers
      suggested this ratio. Works for knowledge work that benefits
      from longer recovery.
    </p>
    <p>
      <strong>90-minute ultradian.</strong> Align with the body&rsquo;s
      natural 90-minute cognitive cycle. One 90-minute deep-work block
      followed by a 20&ndash;30 minute rest. Closest to Cal
      Newport&rsquo;s &ldquo;deep work&rdquo; protocol.
    </p>
    <pre>{`25/5    default, good for most tasks
50/10   long-context work (code, writing, analysis)
90/20   one or two max per day, heavy deep focus
15/5    very reluctant starts, rehab after burnout`}</pre>

    <h2>Pomodoros in meetings and collaboration</h2>
    <p>
      Solo pomodoros translate cleanly; team pomodoros less so.
      Meetings run on their own clocks. Use pomodoros around your
      meetings &mdash; one before and one after &mdash; rather than
      trying to pomodoro the meeting itself.
    </p>
    <p>
      Pair programming can pomodoro well: switch roles at the 25-minute
      mark, take breaks together. Keeps both people fresh and makes
      handoffs natural.
    </p>

    <h2>Tracking pomodoros</h2>
    <p>
      A simple tally on paper (or a pomodoro app) gives you data. Most
      people count 8&ndash;12 pomodoros on a good day. The number helps
      you plan realistically &mdash; if a task takes 4 pomodoros and
      you have 8 today, you know what&rsquo;s possible.
    </p>
    <p>
      Don&rsquo;t optimize for maximum daily pomodoro count. Quality
      of work beats quantity of timers.
    </p>

    <h2>When Pomodoro doesn&rsquo;t work</h2>
    <ul>
      <li>
        Deep mathematical / design work that takes 30+ minutes to load
        context &mdash; try 50/10 or 90-minute blocks instead.
      </li>
      <li>
        Collaborative meetings &mdash; can&rsquo;t pause them on the
        quarter-hour.
      </li>
      <li>
        Creative flow sessions where interruption breaks momentum more
        than the work needs rest.
      </li>
      <li>
        ADHD hyperfocus where stopping is harder than starting; the
        rigid timer can feel distressing.
      </li>
    </ul>

    <h2>Common mistakes</h2>
    <p>
      <strong>Working through the break.</strong> Defeats the whole
      point. The break is what makes the next pomodoro productive.
    </p>
    <p>
      <strong>Cramming multiple tasks into one pomodoro.</strong> The
      switch cost ruins the block. Batch similar tasks across a
      pomodoro, not across a minute.
    </p>
    <p>
      <strong>Not writing down what to work on.</strong> You waste the
      first few minutes deciding. Pick the task before starting the
      timer.
    </p>
    <p>
      <strong>Using the 5-minute break for more screens.</strong>{" "}
      Twitter doesn&rsquo;t restore attention. Stand up instead.
    </p>
    <p>
      <strong>Resuming &ldquo;paused&rdquo; pomodoros.</strong> The
      rule is: interrupted pomodoros are voided. Start a new one.
    </p>
    <p>
      <strong>Forcing 25/5 on work that wants 50/10.</strong> Match the
      block length to the task, not vice versa.
    </p>
    <p>
      <strong>Optimizing tally over output.</strong> Counting pomodoros
      is a planning aid, not a performance metric.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Start a block with the{" "}
      <a href="/tools/pomodoro-timer">pomodoro timer</a>. If you prefer
      manual control, the{" "}
      <a href="/tools/stopwatch">stopwatch</a> tracks elapsed work
      without the break automation, and the{" "}
      <a href="/tools/countdown-timer">countdown timer</a> handles
      arbitrary block lengths when you&rsquo;re running 50/10 or
      90-minute deep-work variants.
    </p>
  </>
);
