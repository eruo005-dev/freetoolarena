import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      You&rsquo;re scheduling a raid at 8pm Eastern. Half your guild is in Europe, two
      people are in Australia, and someone in California keeps showing up an hour late
      because they did the math wrong. Discord solved this in 2021 with dynamic
      timestamps &mdash; a short bit of markup that renders in each viewer&rsquo;s local
      timezone automatically. Nobody converts anything. Nobody shows up at 3am. This
      guide covers the exact syntax, all seven format letters, the epoch math behind the
      tags, and the practical use cases (events, deadlines, countdowns, server boost
      expirations) that make them the single most underused feature in Discord.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The syntax</h2>
    <p>
      A Discord timestamp is a plain text tag with the form{" "}
      <code>&lt;t:EPOCH:FORMAT&gt;</code>. <code>EPOCH</code> is a unix timestamp in
      seconds (not milliseconds). <code>FORMAT</code> is a single letter that tells
      Discord how to render it. When another user reads your message, their client
      converts the epoch to their own timezone using the selected format.
    </p>
    <pre>{`<t:1713830400:F>
// Renders for viewer in New York as: Tuesday, April 23, 2024 8:00 AM
// Renders for viewer in Tokyo as:    Tuesday, April 23, 2024 9:00 PM
// Renders for viewer in London as:   Tuesday, April 23, 2024 1:00 PM`}</pre>
    <p>
      The epoch is the same number everywhere. Only the rendered output differs. This is
      exactly why unix time exists &mdash; it&rsquo;s the timezone-neutral instant.
    </p>

    <h2>The seven format letters</h2>
    <pre>{`<t:1713830400:t>  Short time       8:00 AM
<t:1713830400:T>  Long time        8:00:00 AM
<t:1713830400:d>  Short date       4/23/2024
<t:1713830400:D>  Long date        April 23, 2024
<t:1713830400:f>  Short date/time  April 23, 2024 8:00 AM    (default)
<t:1713830400:F>  Long date/time   Tuesday, April 23, 2024 8:00 AM
<t:1713830400:R>  Relative         in 2 hours / 3 days ago`}</pre>
    <p>
      If you omit the format letter entirely (<code>&lt;t:1713830400&gt;</code>), Discord
      defaults to <code>f</code>. The actual formatting respects the viewer&rsquo;s
      locale &mdash; US users see &ldquo;4/23/2024,&rdquo; European users see
      &ldquo;23/04/2024,&rdquo; and 24-hour-clock users see &ldquo;20:00&rdquo; instead
      of &ldquo;8:00 PM.&rdquo;
    </p>

    <h2>How to get the epoch</h2>
    <p>
      You need the unix timestamp (seconds since 1970-01-01 UTC) of your target moment.
      Three ways to get it. Use a timestamp generator tool and paste the result. Run it
      in a console: JavaScript <code>Math.floor(new Date(&apos;2024-04-23T12:00Z&apos;).getTime() / 1000)</code>.
      Use a shell: <code>date -d &apos;2024-04-23 12:00 UTC&apos; +%s</code> on Linux or{" "}
      <code>date -j -f &apos;%Y-%m-%d %H:%M&apos; &apos;2024-04-23 12:00&apos; +%s</code>{" "}
      on macOS.
    </p>

    <h2>The relative format is the killer feature</h2>
    <p>
      <code>&lt;t:EPOCH:R&gt;</code> renders as &ldquo;in 3 hours,&rdquo; &ldquo;in 2
      days,&rdquo; &ldquo;5 minutes ago,&rdquo; and updates live as time passes. It
      doesn&rsquo;t require a page refresh &mdash; Discord recalculates every few
      seconds. This makes it perfect for countdown timers, event reminders, and
      &ldquo;posted X ago&rdquo; labels.
    </p>
    <pre>{`Event starts <t:1713830400:R>!
RSVP by <t:1713744000:F>.

// Renders live as:
Event starts in 3 hours!
RSVP by Monday, April 22, 2024 8:00 AM.`}</pre>

    <h2>Combining formats in one message</h2>
    <p>
      Mix formats for maximum clarity. A classic event post pairs an absolute time (so
      people can put it on a calendar) with a relative time (so they know at a glance how
      soon it is).
    </p>
    <pre>{`**Raid Night**
When: <t:1713830400:F> (<t:1713830400:R>)
Please arrive 10 minutes early for buffs.`}</pre>

    <h2>Use case: event scheduling</h2>
    <p>
      The obvious one. Instead of &ldquo;8pm ET&rdquo; in your event post &mdash; which
      confuses everyone not in ET &mdash; paste a long-format timestamp. European members
      see it in CET, Asian members see it in JST, nobody asks &ldquo;wait what time is
      that for me.&rdquo; The Discord event feature uses the same logic under the hood,
      but standalone timestamps work in any channel, thread, or DM.
    </p>

    <h2>Use case: deadlines</h2>
    <p>
      For hackathons, bounties, contest submissions, and homework-group assignments,
      paste the deadline as <code>&lt;t:EPOCH:F&gt;</code> plus{" "}
      <code>&lt;t:EPOCH:R&gt;</code>. The relative tag creates automatic urgency as it
      ticks down from &ldquo;in 3 days&rdquo; to &ldquo;in 4 hours&rdquo; to &ldquo;2
      minutes ago.&rdquo;
    </p>

    <h2>Use case: server management</h2>
    <p>
      Moderation bots often post timestamps for mute durations, ban expirations, and
      boost renewals. A log message like &ldquo;user muted until{" "}
      <code>&lt;t:1713830400:R&gt;</code>&rdquo; tells every staff member in their own
      timezone when the mute lifts. Same for tournament brackets, giveaway end times,
      and scheduled maintenance windows.
    </p>

    <h2>Limitations to know</h2>
    <p>
      Discord timestamps render only in Discord clients &mdash; the desktop app, mobile
      apps, and the web client. They don&rsquo;t work in webhooks&rsquo; embed footer
      timestamps (that field is its own ISO string), and they don&rsquo;t work in screen
      reader exports or message copy-paste to external apps. The raw{" "}
      <code>&lt;t:...&gt;</code> text is what gets copied. They also don&rsquo;t support
      custom format strings &mdash; you get the seven letters and nothing else.
    </p>

    <h2>Bot integration tips</h2>
    <p>
      When building Discord bots, output timestamps using these tags rather than
      preformatted strings. Your bot doesn&rsquo;t know the user&rsquo;s timezone, but
      Discord does &mdash; let it do the work. For event-announcement bots, accept user
      input as ISO 8601 plus a timezone, convert to unix seconds, and emit{" "}
      <code>&lt;t:EPOCH:F&gt;</code> in the embed. Much more reliable than asking users
      &ldquo;what timezone are you in&rdquo; on every command.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using milliseconds instead of seconds.</strong> JavaScript&rsquo;s{" "}
      <code>Date.now()</code> returns ms. If you paste 1713830400000 into a Discord tag,
      you get a date in the year 56,304. Divide by 1000 first.
    </p>
    <p>
      <strong>Using the wrong format letter.</strong> <code>F</code> and <code>f</code>{" "}
      are different. Capital letters produce long forms, lowercase short forms.{" "}
      <code>R</code> is the only case-insensitive one, and it has no short form.
    </p>
    <p>
      <strong>Forgetting the leading t:.</strong> It&rsquo;s{" "}
      <code>&lt;t:EPOCH:F&gt;</code>, not <code>&lt;EPOCH:F&gt;</code>. The{" "}
      <code>t</code> tells Discord this is a timestamp tag.
    </p>
    <p>
      <strong>Posting a static time next to the tag.</strong> Writing &ldquo;Event at
      8pm ET (<code>&lt;t:...:F&gt;</code>)&rdquo; defeats the purpose &mdash; the
      non-ET viewer sees two different times and gets confused. Just use the tag.
    </p>
    <p>
      <strong>Assuming the tag works in replies to webhooks.</strong> Most webhook
      contexts render it; some older integrations strip it. Test in your target channel
      before you rely on it for a scheduled announcement.
    </p>
    <p>
      <strong>Using timestamps for recurring events.</strong> Each tag is one fixed
      moment. &ldquo;Every Tuesday at 8pm&rdquo; can&rsquo;t be encoded in a single tag
      &mdash; you need one tag per occurrence, or a bot that rewrites the tag weekly.
    </p>
    <p>
      <strong>Forgetting daylight saving transitions.</strong> If your event is &ldquo;8pm
      local time&rdquo; for the event organizer, the unix epoch you pick is set in
      stone. If DST flips before the event, your &ldquo;8pm&rdquo; becomes 7pm or 9pm
      local. Pick the epoch based on the wall-clock moment you actually want.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate <code>&lt;t:EPOCH:FORMAT&gt;</code> tags without touching a console using
      the <a href="/tools/discord-timestamp">Discord timestamp generator</a>. Pair with
      the <a href="/tools/unix-timestamp-converter">unix timestamp converter</a> to
      verify the epoch matches the moment you intended, and the{" "}
      <a href="/tools/time-zone-converter">time zone converter</a> to sanity-check how
      an event reads across your audience&rsquo;s regions before posting.
    </p>
  </>
);
