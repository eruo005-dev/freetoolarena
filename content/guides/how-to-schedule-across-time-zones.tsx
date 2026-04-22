import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Scheduling across time zones is a small problem that creates a
      large volume of missed meetings, 3 AM wake-up calls, and
      &ldquo;wait, was that your morning or ours?&rdquo; Slack threads.
      Most of the trouble traces to four predictable failure modes:
      Daylight Saving Time, ambiguous abbreviations, half-hour and 45-minute
      offsets, and the asymmetric fairness problem of always making one
      side take the painful slot. This guide walks through the math, the
      tools, and the team conventions that actually work.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Always use UTC-anchored times for async announcements</h2>
    <p>
      Instead of writing &ldquo;meeting at 3 PM,&rdquo; write{" "}
      <strong>&ldquo;meeting at 3 PM Pacific / 6 PM Eastern / 22:00 UTC
      / 11 PM London (next day 07:00 Tokyo)&rdquo;</strong>. Three lines
      cost you fifteen seconds and remove the single biggest cause of
      missed meetings. Better: link to a permanent world-clock URL
      (everytimezone.com, timeanddate.com) that shows the moment across
      all zones live.
    </p>

    <h2>Daylight Saving Time — the silent meeting killer</h2>
    <p>
      DST is the biggest issue in scheduling because different regions
      switch on different dates:
    </p>
    <p>
      <strong>US</strong> springs forward 2nd Sunday of March, falls back
      1st Sunday of November.
    </p>
    <p>
      <strong>Europe (most of it)</strong> changes on the last Sunday of
      March and last Sunday of October.
    </p>
    <p>
      <strong>Australia</strong> changes in October and April (opposite
      months, opposite direction from the Northern Hemisphere).
    </p>
    <p>
      <strong>Japan, most of Asia, most of Africa, most of South America,
      Arizona, Hawaii</strong> don&rsquo;t observe DST at all.
    </p>
    <p>
      The practical consequence: for 2–3 weeks each year in March/April
      and October/November, the normal offset between any two DST-observing
      regions is different than usual. A standing 9 AM ET / 2 PM UK
      meeting becomes 9 AM ET / 1 PM UK for the week the US has sprung
      forward and the UK hasn&rsquo;t yet. Your calendar tool usually
      handles this correctly <em>if</em> you scheduled the meeting with a
      location-aware time zone. If you used &ldquo;UTC+1&rdquo; manually,
      it breaks.
    </p>

    <h2>Time zone abbreviations — ambiguous, avoid them</h2>
    <p>
      &ldquo;CST&rdquo; means Central Standard Time (US, UTC-6) or China
      Standard Time (UTC+8). &ldquo;BST&rdquo; is British Summer Time or
      Bangladesh Standard Time. &ldquo;IST&rdquo; is India, Israel, or
      Ireland. Always disambiguate with a city name (&ldquo;Chicago
      time&rdquo;) or a numeric offset (&ldquo;UTC-6&rdquo;).
    </p>

    <h2>Half-hour and 45-minute offsets catch everyone</h2>
    <p>
      <strong>India</strong> is UTC+5:30. <strong>Iran</strong> is
      UTC+3:30 (and changes half the year). <strong>Newfoundland</strong>{" "}
      is UTC-3:30. <strong>Nepal</strong> is UTC+5:45. <strong>Myanmar</strong>{" "}
      is UTC+6:30. Three-quarters of people scheduling across any of
      these zones eyeball the nearest whole hour and get it wrong.
      Always use a calendar tool or explicit conversion, never mental
      math.
    </p>

    <h2>Fair-rotation for recurring meetings</h2>
    <p>
      When two teams span a 6+ hour gap, someone is always taking it on
      the chin. The &ldquo;fairness&rdquo; default is to rotate whose
      morning / evening it is:
    </p>
    <p>
      <strong>Rotation A:</strong> Odd-numbered weeks held in side-A&rsquo;s
      morning, even-numbered weeks in side-B&rsquo;s morning. Fair and
      predictable.
    </p>
    <p>
      <strong>Rotation B:</strong> Stagger the meeting — meet every two
      weeks at one time, alternate weeks at another. Both sides suffer
      equally; neither suffers every week.
    </p>
    <p>
      <strong>Async-default for most work:</strong> Reserve synchronous
      meetings for high-bandwidth discussions. Move status updates,
      reports, and decisions to written form so time zone becomes
      irrelevant. This is the biggest productivity unlock for
      globally-distributed teams.
    </p>

    <h2>The 6-hour rule for pain tolerance</h2>
    <p>
      Anything under a 6-hour offset can be scheduled in a civilized
      window for both parties (US East ↔ Europe is 5–6 hours, manageable).
      Over 8 hours (US West ↔ Europe at 9, US ↔ Asia at 12–15) means
      someone&rsquo;s always either pre-7AM or post-8PM. At that point
      async is almost always the better option; daily sync becomes
      expensive enough that it should be reserved for weekly updates or
      explicit crisis response.
    </p>

    <h2>The three most common scheduling bugs</h2>
    <p>
      <strong>(1) Setting a time zone that doesn&rsquo;t match your
      physical location.</strong> Digital nomad sets calendar to UTC, flies
      to Lisbon, invites a US team to a meeting. Everyone interprets &ldquo;10
      AM&rdquo; differently. Fix: keep your calendar time zone set to where
      you&rsquo;re physically sitting, update when you travel.
    </p>
    <p>
      <strong>(2) Inviting someone via copy-pasted time.</strong> Calendar
      apps store meetings as absolute moments (UTC internally) and
      translate to each participant&rsquo;s local time. Copy-pasting
      &ldquo;2 PM&rdquo; into an invite field for a person in another
      zone without the UI knowing what zone you meant is how you end up
      with meetings at 2 PM in the invitee&rsquo;s zone when you meant 2 PM
      in yours.
    </p>
    <p>
      <strong>(3) Not accounting for holidays in other regions.</strong>
      US Thanksgiving doesn&rsquo;t exist in Europe. Chinese New Year
      wipes out most of Asia for a week. Golden Week in Japan is early
      May. Carnaval in Brazil is late Feb/early March. A globally-aware
      team checks all relevant regions&rsquo; holidays before locking in
      a launch date.
    </p>

    <h2>The right tool for the job</h2>
    <p>
      For one-off conversions, use the{" "}
      <a href="/tools/time-zone-converter">time zone converter</a>. For
      recurring meetings, use your calendar&rsquo;s native time-zone
      support (Google Calendar, Outlook both handle DST correctly if you
      pick a city-named zone). For broad team scheduling, use
      everytimezone.com or worldtimebuddy.com to see the whole team&rsquo;s
      day at a glance.
    </p>
    <p>
      Pair with the{" "}
      <a href="/tools/meeting-cost-calculator">meeting cost calculator</a>{" "}
      to decide when a 10-person sync across four time zones is
      actually worth scheduling vs moving to async, and the{" "}
      <a href="/tools/meeting-agenda-builder">meeting agenda builder</a>{" "}
      to keep the rare synchronous window high-leverage.
    </p>
  </>
);
