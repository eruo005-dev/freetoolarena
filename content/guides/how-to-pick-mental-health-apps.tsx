import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Mental health apps range from legitimate therapy platforms to
    data-harvesting mood journals. Knowing the difference matters &mdash;
    because the wrong choice costs you money, privacy, or worse, real care.
  </p>
);

export const body: ReactElement = (
  <>
    <p>
      There are thousands of mental health apps in the stores. A small slice
      are genuinely useful; most are glossy wrappers on questionnaires; some
      are actively harmful. Here&rsquo;s how to evaluate one before you hand
      over your credit card and your most sensitive data.
    </p>

    <h2>Evidence-based first</h2>
    <p>
      Start by asking what the app is actually doing. Therapy-backed
      platforms like BetterHelp and Talkspace connect you to licensed
      clinicians &mdash; that&rsquo;s real therapy over video or text.
      CBT-based self-help like Moodfit, Woebot, or structured courses inside
      Calm and Headspace can help with mild to moderate symptoms, but
      they&rsquo;re tools, not clinicians. If an app can&rsquo;t describe the
      clinical framework it&rsquo;s built on, that&rsquo;s a red flag.
    </p>

    <h2>Trackers vs structured programs</h2>
    <p>
      Mood trackers (Daylio, eMoods) are journaling tools &mdash; great for
      noticing patterns, useless on their own for acute symptoms. Structured
      programs guide you through exercises over weeks, modeled on protocols
      like CBT or ACT. Meditation apps are their own category and work best
      for stress and sleep, not for depression or PTSD alone.
    </p>

    <h2>The privacy nightmare</h2>
    <ul>
      <li>Mental health apps have repeatedly been caught sending data to Facebook, Google, and ad networks.</li>
      <li>Check whether the service is HIPAA-covered. Most consumer &ldquo;wellness&rdquo; apps are not.</li>
      <li>Read the data-sharing section of the privacy policy, not just the top.</li>
      <li>Assume anything you type into a non-HIPAA app could become training data or be sold.</li>
    </ul>

    <h2>Pricing traps</h2>
    <p>
      The free trial that auto-renews at $89 is the oldest trick in the app
      store. Set a calendar reminder two days before any trial ends. Watch
      for &ldquo;lifetime&rdquo; deals that quietly become annual. Therapy
      platforms often charge weekly &mdash; do the math: $80/week is
      $4,160/year, more than most in-network therapy copays.
    </p>

    <h2>When an app is not enough</h2>
    <p>
      Apps are not sufficient for suicidal ideation, active self-harm,
      psychosis, bipolar episodes, severe eating disorders, or trauma that
      keeps resurfacing. These need a clinician, often medication, sometimes
      inpatient care. If you&rsquo;re in crisis in the US, call or text 988.
      In the UK, call 111 or Samaritans at 116 123. Other countries have
      their own lines &mdash; look yours up now, before you need it.
    </p>

    <h2>Common mistakes</h2>
    <p>
      The two biggest errors: using an app as a therapy substitute when you
      actually need a clinician, and not reaching out in a real crisis
      because the app felt like &ldquo;doing something.&rdquo; Also common:
      chasing streaks instead of insight, downloading five apps and using
      none, and ignoring the privacy policy because the UI is pretty. An app
      that profits from your anxiety is not your friend.
    </p>

    <h2>Bottom line</h2>
    <p>
      Pick tools that name their clinical basis, respect your data, and
      don&rsquo;t pretend to replace a human clinician. Use mood trackers
      for patterns, structured programs for skills, and licensed therapy for
      treatment. If you&rsquo;re in crisis, stop reading and call 988 or your
      local line. Not medical advice. Talk to your healthcare provider.
    </p>
  </>
);
