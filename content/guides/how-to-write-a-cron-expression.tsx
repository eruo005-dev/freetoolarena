export const intro = (
  <>
    <p>
      Cron expressions are the language scheduled jobs speak — a five-field string that tells a
      server when to run a task. They are compact, a little cryptic, and once you know how to
      read them, you can describe almost any schedule in a single line. They also have a
      reputation for being easy to get wrong, which is how people end up running hourly cleanup
      jobs every minute by accident.
    </p>
    <p>
      This guide covers the cron field order, the shortcuts, the operators, and the mistakes
      that cause real outages. At the end you should be able to read and write cron expressions
      at a glance — or at least sanity-check the one ChatGPT just gave you.
    </p>
  </>
);

export const body = (
  <>
    <h2>The five fields of standard cron</h2>
    <p>
      A standard cron expression has five space-separated fields, in this order:{" "}
      <strong>minute</strong> (0–59), <strong>hour</strong> (0–23), <strong>day of month</strong>{" "}
      (1–31), <strong>month</strong> (1–12 or JAN–DEC), <strong>day of week</strong> (0–6 where
      0 and 7 are Sunday, or SUN–SAT). Some systems (Quartz, systemd) add a seconds field at the
      start or a year field at the end — check your platform&rsquo;s docs before copy-pasting.
    </p>

    <h2>The four operators</h2>
    <p>
      <strong>*</strong> means &ldquo;every value.&rdquo; <strong>,</strong> lists specific values
      (<code>1,5,10</code>). <strong>-</strong> defines a range (<code>1-5</code> = 1,2,3,4,5).
      <strong>/</strong> defines an interval (<code>*/15</code> in the minute field = every
      15 minutes). Combine them freely: <code>0 9-17/2 * * MON-FRI</code> = every 2 hours from
      9am to 5pm on weekdays.
    </p>

    <h2>Classic patterns memorized once</h2>
    <p>
      Every minute: <code>* * * * *</code>. Every 15 minutes: <code>*/15 * * * *</code>. Every
      hour on the hour: <code>0 * * * *</code>. Daily at midnight: <code>0 0 * * *</code>.
      Daily at 9am: <code>0 9 * * *</code>. Every Monday at 9am: <code>0 9 * * MON</code>. First
      of the month at 3am: <code>0 3 1 * *</code>. These ten cover 80% of real schedules.
    </p>

    <h2>Build expressions visually, then copy</h2>
    <p>
      Writing cron expressions by hand is fine for the classic cases, but anything fancier
      (quarterly reports, alternating weeks, last-day-of-month) is error-prone. Use our{" "}
      <a href="/tools/cron-expression-builder">cron expression builder</a> to click your way to
      the pattern you want, then copy the string into your crontab. Sanity-check it with the{" "}
      <a href="/tools/cron-expression-explainer">cron expression explainer</a> which translates
      any expression back into plain English.
    </p>

    <h2>Watch the timezone</h2>
    <p>
      Cron runs in the server&rsquo;s timezone, not yours. A job set for <code>0 9 * * *</code>{" "}
      runs at 9am server-time. If your server is in UTC and you&rsquo;re in New York, that&rsquo;s
      4am local in summer, 5am in winter. Always check the system timezone before scheduling
      anything time-sensitive. Set it explicitly in the cron config (<code>CRON_TZ=America/New_York</code>)
      if your platform supports it.
    </p>

    <h2>The &ldquo;both weekday AND day of month&rdquo; gotcha</h2>
    <p>
      On most cron implementations, if both day-of-month and day-of-week are specified (not{" "}
      <code>*</code>), the job runs when <em>either</em> matches, not both. So{" "}
      <code>0 0 15 * MON</code> runs at midnight on the 15th <em>and</em> every Monday —
      probably not what you meant. If you need &ldquo;Monday the 15th,&rdquo; check your system&rsquo;s
      docs or handle it in application code.
    </p>

    <h2>Don&rsquo;t schedule jobs too close together</h2>
    <p>
      If job A takes 20 minutes and you schedule job B to run 5 minutes after A starts, you can
      get overlapping executions when A runs long. Use a lock file, a database flag, or a queue
      with concurrency set to 1. A classic outage is two instances of a nightly import job
      running simultaneously and corrupting the data.
    </p>

    <h2>Log everything — cron is silent by default</h2>
    <p>
      A failed cron job won&rsquo;t email you. It won&rsquo;t log to stderr in a place you check.
      It will just silently stop working. Redirect output to a log file:{" "}
      <code>* * * * * /path/to/job &gt;&gt; /var/log/job.log 2&gt;&amp;1</code>. Better: send
      errors to a monitoring service (Sentry, Datadog) and use a heartbeat service (Dead Man&rsquo;s
      Snitch, healthchecks.io) that alerts you when the job <em>stops</em> running.
    </p>

    <h2>Stagger high-concurrency jobs</h2>
    <p>
      If you have ten cron jobs all set to run at <code>0 0 * * *</code>, they all fire at
      midnight and spike your server load. Stagger them: one at 00:00, next at 00:05, next at
      00:12. No single busy minute, no thundering herd.
    </p>

    <h2>Shortcuts: @hourly, @daily, @reboot</h2>
    <p>
      Most cron systems support named shortcuts: <code>@yearly</code>, <code>@monthly</code>,{" "}
      <code>@weekly</code>, <code>@daily</code> (= <code>0 0 * * *</code>),{" "}
      <code>@hourly</code> (= <code>0 * * * *</code>), and <code>@reboot</code> (runs once when
      the system starts). Use them when they match — they&rsquo;re easier to read and less error-prone
      than the equivalent five-field expressions.
    </p>

    <h2>Test before you trust</h2>
    <p>
      Before putting a new cron job into production, run the command directly and confirm it
      works. Then schedule it for a few minutes from now and watch it fire. Then move it to
      the real schedule. Jobs that run once a week are the most dangerous — they have the most
      time to accumulate silent failure between runs.
    </p>

    <p>
      Related: <a href="/guides/how-to-use-regex-effectively">how to use regex effectively</a>,{" "}
      <a href="/guides/how-to-format-json-properly">how to format JSON properly</a>, and{" "}
      <a href="/guides/what-is-an-api">what is an API</a> for context on the systems you&rsquo;re
      scheduling.
    </p>
  </>
);
