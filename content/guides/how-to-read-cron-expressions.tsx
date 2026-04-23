import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Cron expressions look like five or six inscrutable tokens separated by spaces, and most
      engineers learn them by copy-pasting examples until something breaks. That&rsquo;s fine
      until the schedule fires at the wrong hour, skips a daylight-saving transition, or runs
      twice on the last day of the month because day-of-month and day-of-week were both set.
      Understanding what each field means, what the special characters do, and how classic
      cron differs from the Quartz and Kubernetes variants turns cron from a guessing game
      into a precise scheduling language. This guide covers the five-field and six-field
      formats, the meaning of <code>*</code>, <code>/</code>, <code>,</code>, and <code>-</code>,
      the shortcuts like <code>@daily</code>, the day-of-month vs. day-of-week trap, time zone
      handling, and how to read an expression out loud in English.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The five fields</h2>
    <p>
      Classic Unix cron has five fields, left to right: minute, hour, day of month, month,
      day of week. Each field has a fixed value range.
    </p>
    <pre>{`┌───────────── minute        (0 - 59)
│ ┌─────────── hour          (0 - 23)
│ │ ┌───────── day of month  (1 - 31)
│ │ │ ┌─────── month         (1 - 12) or JAN-DEC
│ │ │ │ ┌───── day of week   (0 - 6)  or SUN-SAT
│ │ │ │ │
* * * * *   command to execute`}</pre>
    <p>
      Each field defaults to &ldquo;every&rdquo; (<code>*</code>). An expression like{" "}
      <code>* * * * *</code> runs every minute forever. <code>0 * * * *</code> runs at minute
      zero of every hour. <code>0 0 * * *</code> runs at midnight every day.
    </p>

    <h2>The six-field variant (Quartz)</h2>
    <p>
      Java&rsquo;s Quartz scheduler and some cloud schedulers add a seconds field at the front
      and sometimes a year field at the end. So <code>0 0 0 * * *</code> in Quartz runs daily
      at midnight, not every minute. Kubernetes CronJobs use classic five-field. Know which
      variant your system speaks before pasting examples.
    </p>
    <pre>{`5-field (Unix):   minute hour dom month dow
6-field (Quartz): second minute hour dom month dow
7-field (Quartz): second minute hour dom month dow year`}</pre>

    <h2>Special characters</h2>
    <p>
      <code>*</code> means &ldquo;every value in this field.&rdquo; <code>,</code> separates a
      list of specific values. <code>-</code> denotes an inclusive range. <code>/</code> means
      step, with <code>a/b</code> being &ldquo;starting at <em>a</em>, every <em>b</em>.&rdquo;
      These compose: <code>*/15</code> in the minute field means every 15 minutes (0, 15, 30,
      45). <code>0,30</code> means at 0 and 30 only. <code>9-17</code> means every value from
      9 through 17 inclusive.
    </p>
    <pre>{`*/15 * * * *      every 15 minutes
0 9-17 * * 1-5    on the hour, 9 AM to 5 PM, Mon-Fri
0 0 1,15 * *      at midnight on the 1st and 15th
30 6-22/2 * * *   at :30, every 2 hours from 6 AM to 10 PM`}</pre>

    <h2>Shortcut strings</h2>
    <p>
      Most cron implementations accept named shortcuts. <code>@yearly</code> (or
      <code>@annually</code>) = <code>0 0 1 1 *</code>, midnight January 1.{" "}
      <code>@monthly</code> = <code>0 0 1 * *</code>. <code>@weekly</code> = <code>0 0 * * 0</code>,
      Sunday midnight. <code>@daily</code> (or <code>@midnight</code>) = <code>0 0 * * *</code>.
      <code>@hourly</code> = <code>0 * * * *</code>. <code>@reboot</code> runs once at
      system start (not supported everywhere).
    </p>

    <h2>Day of month vs. day of week</h2>
    <p>
      Classic Unix cron treats these two fields with an OR relationship. If both are restricted,
      the job runs whenever <em>either</em> matches. This trips people up constantly.
    </p>
    <pre>{`0 0 15 * 1   runs at midnight on the 15th OR every Monday
             NOT "midnight on the 15th only if it's Monday"

If you want AND (only on the 15th when it's Monday), you must
check the day of week inside your script.`}</pre>
    <p>
      Quartz reverses this: one of the two fields must be <code>?</code> (meaning &ldquo;no
      specific value&rdquo;) and the other is the one used. Know your dialect.
    </p>

    <h2>Day of week numbering</h2>
    <p>
      Classic cron uses 0 = Sunday, 6 = Saturday, with 7 sometimes accepted as Sunday too.
      Quartz uses 1 = Sunday, 7 = Saturday. Some systems use 0 = Monday. Always verify
      against your scheduler&rsquo;s documentation before writing <code>* * * * 1</code> and
      discovering it ran on a Tuesday.
    </p>

    <h2>Time zones</h2>
    <p>
      Classic cron runs in the system time zone. If your server is UTC but you want the job to
      fire at 9 AM Eastern, you have to convert and deal with daylight saving time. Modern
      schedulers (Kubernetes CronJob <code>spec.timeZone</code>, AWS EventBridge,
      GitHub Actions, Vercel Cron) let you specify a time zone explicitly, which handles DST
      automatically. For critical schedules, either use UTC and accept a shifting local time,
      or use a scheduler that supports named zones.
    </p>

    <h2>Reading an expression aloud</h2>
    <p>
      Walk left to right and describe each field. <code>*/5 9-17 * * 1-5</code> reads as
      &ldquo;every 5 minutes, from 9 AM through 5 PM, every day of the month, every month,
      Monday through Friday.&rdquo; Collapse &ldquo;every&rdquo; clauses that don&rsquo;t add
      information: &ldquo;every 5 minutes between 9 AM and 5 PM, Monday through Friday.&rdquo;
    </p>

    <h2>Common real-world patterns</h2>
    <pre>{`0 0 * * *          daily at midnight
0 */6 * * *        every 6 hours
*/5 * * * *        every 5 minutes
0 9 * * 1-5        weekdays at 9 AM
0 0 1 * *          first of every month at midnight
0 0 1 1 *          New Year's at midnight
15 14 1 * *        2:15 PM on the 1st of every month
0 22 * * 5         Fridays at 10 PM
0 0 * * 0          Sunday midnight (weekly cleanup)`}</pre>

    <h2>Special extensions</h2>
    <p>
      Some cron implementations extend the syntax. <code>L</code> means &ldquo;last&rdquo;
      (last day of month, last Friday). <code>W</code> means &ldquo;weekday nearest to.&rdquo;
      <code>#</code> picks a specific occurrence in a month (<code>5#3</code> = third Friday).
      These are Quartz extensions and may not work in your scheduler.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Treating day-of-month and day-of-week as AND.</strong> In classic cron, setting
      both means OR. <code>0 0 15 * 1</code> runs on the 15th <em>and</em> every Monday, not
      &ldquo;Monday the 15th only.&rdquo;
    </p>
    <p>
      <strong>Using the wrong scheduler dialect.</strong> Quartz has six fields by default,
      classic cron has five. <code>0 0 0 * * *</code> means different things in each.
    </p>
    <p>
      <strong>Ignoring time zones.</strong> If your production server is UTC and your Monday
      9 AM report fires at 4 AM local time, you forgot to adjust. DST transitions will also
      shift schedules unless your runtime handles zones.
    </p>
    <p>
      <strong>Assuming <code>*/7</code> fires every 7 minutes.</strong> <code>*/7</code> in the
      minute field fires at 0, 7, 14, 21, 28, 35, 42, 49, 56, then jumps back to 0. The gap
      between :56 and :00 is only 4 minutes. Step notation restarts each hour.
    </p>
    <p>
      <strong>Running a long-lived job every minute and overlapping.</strong> Cron doesn&rsquo;t
      skip overlapping runs. If your 2-minute job is scheduled every minute, you&rsquo;ll have
      concurrent instances piling up. Add a lockfile or use a scheduler that enforces
      non-overlap.
    </p>
    <p>
      <strong>Forgetting <code>@reboot</code> isn&rsquo;t universal.</strong> Kubernetes
      CronJobs, many cloud schedulers, and non-Unix systems don&rsquo;t support it. Use a
      systemd unit or startup script instead.
    </p>
    <p>
      <strong>Writing <code>0 0 31 2 *</code> expecting monthly.</strong> February never has 31
      days, so this runs never. Cron doesn&rsquo;t warn you; the job just silently never fires.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Paste any cron expression into our{" "}
      <a href="/tools/cron-expression-explainer">cron expression explainer</a> to see the next
      run times and a plain-English description. Pair it with the{" "}
      <a href="/tools/cron-expression-builder">cron builder</a> when you&rsquo;re writing a new
      schedule, and the <a href="/tools/time-zone-converter">time zone converter</a> to sanity-
      check what your UTC cron schedule means in local time.
    </p>
  </>
);
