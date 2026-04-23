import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A unix timestamp looks like <code>1713830400</code> and means nothing until you
      decode it. Once you do, it&rsquo;s the most reliable way computers share time
      &mdash; no timezones, no daylight saving, no ambiguous date formats, just seconds
      since a fixed moment in 1970. But the moment you need to display that timestamp to
      a human, store it in a database, compare two values that came from different
      systems, or handle dates past 2038, the simple idea gets complicated fast. This
      guide covers what the epoch actually is, the critical seconds-versus-milliseconds
      distinction that breaks APIs daily, the Year 2038 problem, signed versus unsigned
      representations, timezone handling, and the edge cases (leap seconds, pre-1970
      dates) that bite when you least expect.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What the unix epoch is</h2>
    <p>
      The <strong>unix epoch</strong> is 00:00:00 UTC on January 1, 1970. A unix timestamp
      is the number of seconds that have elapsed since that instant, ignoring leap
      seconds. It&rsquo;s sometimes called &ldquo;epoch time&rdquo; or &ldquo;POSIX
      time.&rdquo; The choice of 1970 is historical &mdash; it was convenient for the
      early Unix designers at Bell Labs and became a de-facto standard.
    </p>
    <p>
      The critical property: unix timestamps are always in <strong>UTC</strong>. They
      have no timezone. When you convert <code>1713830400</code> into &ldquo;April 23,
      2024 12:00 PM,&rdquo; you&rsquo;re choosing a timezone to display it in. The
      timestamp itself doesn&rsquo;t know what timezone you&rsquo;re in.
    </p>

    <h2>Seconds vs milliseconds</h2>
    <p>
      This is the single most common bug when working with timestamps. Unix time in its
      original form is measured in <strong>seconds</strong>. JavaScript&rsquo;s{" "}
      <code>Date.now()</code> returns <strong>milliseconds</strong>. Python&rsquo;s{" "}
      <code>time.time()</code> returns seconds (as a float). Java&rsquo;s{" "}
      <code>System.currentTimeMillis()</code> returns milliseconds. If you mix these, you
      get dates in 1970 (seconds treated as milliseconds) or in the year 55000 (milliseconds
      treated as seconds).
    </p>
    <pre>{`// The same instant, different units:
seconds:      1713830400
milliseconds: 1713830400000
microseconds: 1713830400000000
nanoseconds:  1713830400000000000

// Heuristic: a 10-digit number is seconds.
// A 13-digit number is milliseconds.
// As of 2024, a seconds-timestamp has 10 digits
// until the year 2286 when it rolls to 11.`}</pre>

    <h2>The Year 2038 problem</h2>
    <p>
      On January 19, 2038 at 03:14:07 UTC, the unix timestamp reaches 2,147,483,647
      &mdash; the maximum value of a signed 32-bit integer. One second later, a 32-bit
      signed timestamp overflows to &minus;2,147,483,648, which represents December 13,
      1901. Any system still using 32-bit signed time will read the date as 1901.
    </p>
    <p>
      This is not hypothetical. Embedded devices, old databases, legacy file formats,
      and SQL columns declared as <code>INT</code> instead of <code>BIGINT</code> are all
      vulnerable. Modern systems use 64-bit signed integers, which push the overflow to
      the year 292,277,026,596 &mdash; effectively infinite. If you&rsquo;re designing a
      schema today, use a 64-bit type and never look back.
    </p>

    <h2>Signed vs unsigned</h2>
    <p>
      A signed 32-bit integer can represent dates from 1901-12-13 to 2038-01-19. An
      unsigned 32-bit integer can represent 1970-01-01 to 2106-02-07 but cannot represent
      any pre-1970 date. Most languages default to signed, which is why you see
      2038 mentioned more than 2106. Some older systems (certain C APIs, some
      databases) use unsigned &mdash; meaning a historical date like a birth date in 1955
      simply cannot be stored.
    </p>

    <h2>Timezones and offsets</h2>
    <p>
      To display a unix timestamp to a human, apply a timezone offset. UTC has offset
      +00:00. New York in winter is &minus;05:00, in summer &minus;04:00 (daylight
      saving). Tokyo is +09:00 year-round. Converting from timestamp to local time:
    </p>
    <pre>{`timestamp = 1713830400        // 2024-04-23 00:00:00 UTC
offsetHours = -5              // New York EST
localHour = (timestamp / 3600 + offsetHours) % 24

// Or in Python:
from datetime import datetime, timezone, timedelta
utc = datetime.fromtimestamp(1713830400, tz=timezone.utc)
ny = utc.astimezone(timezone(timedelta(hours=-5)))
print(ny.isoformat())  # 2024-04-22T19:00:00-05:00`}</pre>
    <p>
      Critical rule: <strong>store timestamps in UTC, display in local time</strong>.
      Never store &ldquo;2024-04-23 12:00 PM Eastern&rdquo; in a database &mdash; you
      lose the ability to compare, sort, or handle users from other zones.
    </p>

    <h2>Leap seconds</h2>
    <p>
      Earth&rsquo;s rotation is slightly irregular, so international timekeeping
      occasionally inserts a <strong>leap second</strong> &mdash; a 23:59:60 UTC before
      the next day begins. Unix time ignores leap seconds; it pretends they don&rsquo;t
      exist. This means unix time is not strictly continuous with atomic time. For most
      applications this doesn&rsquo;t matter. For financial trading, satellite tracking,
      or anything requiring sub-second accuracy across years, it does &mdash; which is
      why those systems use TAI (International Atomic Time) instead.
    </p>
    <p>
      Between 1972 and 2024, 27 leap seconds have been added. The General Conference on
      Weights and Measures voted in 2022 to effectively abandon leap seconds by 2035.
    </p>

    <h2>Pre-1970 dates</h2>
    <p>
      Unix timestamps can be negative. <code>-1</code> means December 31, 1969
      23:59:59 UTC. <code>-31536000</code> is roughly January 1, 1969. Many libraries
      handle negative timestamps correctly; some don&rsquo;t. JavaScript&rsquo;s{" "}
      <code>new Date(-1000)</code> works. Older C <code>time_t</code> on unsigned
      platforms does not. Test before you trust.
    </p>

    <h2>Common formats and their timestamps</h2>
    <pre>{`ISO 8601:       2024-04-23T00:00:00Z
RFC 2822:       Tue, 23 Apr 2024 00:00:00 +0000
Unix seconds:   1713830400
Unix ms:        1713830400000
Windows FILETIME: 133584672000000000  (100ns since 1601)
.NET Ticks:     638493696000000000    (100ns since year 1)
Excel date:     45405                 (days since 1900-01-01)`}</pre>
    <p>
      Excel&rsquo;s date serial has a famous bug: it incorrectly treats 1900 as a leap
      year, so dates before March 1900 are off by one. This was preserved for Lotus 1-2-3
      compatibility and can never be fixed.
    </p>

    <h2>Database storage</h2>
    <p>
      PostgreSQL&rsquo;s <code>timestamptz</code> stores a UTC instant and returns it in
      the session timezone &mdash; use this. MySQL&rsquo;s <code>TIMESTAMP</code> is UTC
      stored, 4 bytes, but it&rsquo;s limited to 1970&ndash;2038 on 32-bit builds &mdash;
      use <code>DATETIME</code> for dates outside that range. SQLite has no native type
      &mdash; store as integer (unix seconds) or ISO text. MongoDB uses BSON Date
      (milliseconds, 64-bit signed).
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Mixing seconds and milliseconds.</strong> An off-by-1000 error produces
      dates in 1970 or 55000. Always confirm the unit before passing timestamps between
      systems.
    </p>
    <p>
      <strong>Storing local time without offset.</strong> &ldquo;2024-04-23 12:00&rdquo;
      is ambiguous &mdash; you can&rsquo;t recover UTC from it. Store UTC plus optional
      display timezone.
    </p>
    <p>
      <strong>Using 32-bit integers for new schemas.</strong> The 2038 problem is close
      enough that any long-lived system needs 64-bit time columns.
    </p>
    <p>
      <strong>Assuming a day is 86,400 seconds.</strong> On leap-second days it&rsquo;s
      86,401. On DST transition days in local time it&rsquo;s 23 or 25 hours. Use
      calendar-aware date math for day arithmetic.
    </p>
    <p>
      <strong>Trusting client clocks.</strong> User devices are routinely 30 seconds to
      hours off. For auth tokens, signatures, and any security-sensitive comparison, use
      server time and allow a clock-skew tolerance.
    </p>
    <p>
      <strong>Parsing &ldquo;2024-04-23&rdquo; as midnight UTC.</strong> Depending on the
      library, a date-only string parses as midnight UTC, midnight local, or throws.
      Always pass explicit timezone.
    </p>
    <p>
      <strong>Ignoring daylight saving when scheduling.</strong> &ldquo;Every day at
      9am&rdquo; in a fixed UTC timestamp shifts by an hour twice a year in DST
      countries. Store the local intent and recompute the UTC trigger per-run.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert between unix timestamps and human-readable dates with the{" "}
      <a href="/tools/unix-timestamp-converter">unix timestamp converter</a>. Pair with
      the <a href="/tools/time-zone-converter">time zone converter</a> to translate a UTC
      instant across regions, and the{" "}
      <a href="/tools/discord-timestamp">discord timestamp generator</a> to embed those
      timestamps in messages that render correctly for every viewer&rsquo;s local zone.
    </p>
  </>
);
