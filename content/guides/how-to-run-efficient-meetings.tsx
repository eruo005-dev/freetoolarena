import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A meeting of 8 people for an hour isn&rsquo;t a 1-hour meeting
      — it&rsquo;s an 8-hour meeting, charged at the combined hourly
      rate of everyone in it. Most companies run meetings as if the
      cost is zero. This guide walks through the actual dollar cost
      of a meeting, the four meeting types worth holding, the
      single-question test for whether to hold one at all, and the
      tactical rules that make meetings actually end on time.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The real cost of a meeting</h2>
    <p>
      Cost = Σ (each attendee&rsquo;s fully-loaded hourly rate) ×
      meeting length in hours.
    </p>
    <p>
      Fully-loaded rate = salary × 1.3-1.4 (to include benefits,
      taxes, overhead). A $120k engineer costs the company ~$75/hour.
    </p>
    <p>
      <strong>Example:</strong> weekly 1-hour sync with 8 senior
      engineers at $120k each = $600/meeting = $31,200/year. Across
      a company of 200 people, meeting bloat at 20% of time at
      loaded-rate economics often runs into the millions.
    </p>
    <p>
      This cost is invisible in most budgets because it&rsquo;s
      already spent on salaries — but it&rsquo;s a real opportunity
      cost. Every hour in a meeting is an hour not writing code,
      talking to customers, or thinking.
    </p>

    <h2>The single-question test</h2>
    <p>
      Before scheduling: <strong>Could this be an async
      document?</strong>
    </p>
    <p>
      If yes → write the doc, share it, collect async comments.
    </p>
    <p>
      If no → meeting is justified, but keep it focused.
    </p>
    <p>
      Status updates, announcements, read-aloud decks, and
      FYI-style briefings almost always fail the test. Read time
      &lt;&lt; speaking time, and docs can be searched later.
    </p>

    <h2>The 4 meeting types that earn their cost</h2>
    <p>
      <strong>1. Decision meetings.</strong> A decision needs to be
      made, options have been pre-circulated, and the decider + 2-4
      informed voices are present. 30 minutes max. Output: decision
      + owner + deadline.
    </p>
    <p>
      <strong>2. Brainstorming / creative meetings.</strong>
      High-bandwidth idea generation where the back-and-forth itself
      produces the output. Small groups (3-6), clear prompt, timebox.
      Output: ranked list of ideas + followups.
    </p>
    <p>
      <strong>3. Status / sync meetings with action.</strong> Short,
      updates tied to blockers needing help. Works best daily with
      team &lt; 8 (standup), 15 minutes max.
    </p>
    <p>
      <strong>4. Relationship / 1:1 meetings.</strong> Building
      trust, coaching, career discussion. These are genuinely high
      bandwidth and hard to async. Weekly or biweekly, 30 minutes.
    </p>
    <p>
      Everything else is typically a doc in disguise.
    </p>

    <h2>The agenda rules</h2>
    <p>
      <strong>Written agenda circulated at least 24 hours in
      advance.</strong> No exceptions. If there&rsquo;s no agenda,
      cancel — you&rsquo;re not actually clear on what the meeting
      is about.
    </p>
    <p>
      <strong>Every agenda item has an owner and a desired outcome.</strong>
      Not just &ldquo;Discuss Q3 launch&rdquo; but &ldquo;Decide Q3
      launch date — owner: Sam — outcome: locked date.&rdquo;
    </p>
    <p>
      <strong>Time per item.</strong> Fifteen minutes, 10 minutes,
      whatever. Explicit timeboxes prevent any single item from
      swallowing the meeting.
    </p>
    <p>
      <strong>Pre-read linked.</strong> If understanding the topic
      requires background, attach it. Attendees without the pre-read
      can be disinvited — genuinely, this is a healthy norm.
    </p>

    <h2>The attendee rules</h2>
    <p>
      <strong>Invite only the people who need to be there.</strong>
      Default to fewer. If someone is included &ldquo;just to be
      informed,&rdquo; they can read the notes. Informing by meeting
      is expensive and disrespectful of their time.
    </p>
    <p>
      <strong>Amazon&rsquo;s &ldquo;two-pizza rule&rdquo;:</strong>
      if the meeting can&rsquo;t be fed by two pizzas, it&rsquo;s too
      big. Practical cap ~8 people; creative/decision meetings work
      best at 4-6.
    </p>
    <p>
      <strong>Explicit roles.</strong> For anything beyond a 1:1:
      who runs the meeting, who takes notes, who tracks time. Named
      in the invite.
    </p>

    <h2>The meeting itself — tactical rules</h2>
    <p>
      <strong>Start on time.</strong> Strict. If late-joiners can&rsquo;t
      catch up, that&rsquo;s a feedback signal. The cost of 8 people
      waiting 5 minutes is 40 person-minutes.
    </p>
    <p>
      <strong>First 2 minutes: state the outcome.</strong> &ldquo;By
      end of this hour, we&rsquo;ll have decided X.&rdquo; Anchors
      everyone.
    </p>
    <p>
      <strong>No laptops / phones unless needed for the meeting.</strong>
      If someone needs to multitask, they shouldn&rsquo;t be here.
      Exception: designated notetaker.
    </p>
    <p>
      <strong>Parking-lot off-topic items.</strong> Keep the meeting
      on the agenda; capture tangents in a &ldquo;parking lot&rdquo;
      for later.
    </p>
    <p>
      <strong>End 5 minutes early.</strong> Makes space for people to
      process and move to the next thing without running late. Also
      builds trust that meetings respect the clock.
    </p>

    <h2>Notes and follow-through</h2>
    <p>
      <strong>Live note-taking</strong> visible to attendees (shared
      doc projected or on screen). Forces alignment in real time.
    </p>
    <p>
      <strong>Every decision ← DRI (directly responsible
      individual) + date.</strong> &ldquo;Owner: Sam. Due: Fri. If
      blocked, surface by Thursday.&rdquo;
    </p>
    <p>
      <strong>Notes shared within 24 hours</strong>, including to
      people not present who need to know.
    </p>
    <p>
      Without clear followups, &ldquo;great meetings&rdquo; evaporate
      by Monday. The output of a decision meeting isn&rsquo;t the
      conversation — it&rsquo;s the decision + owner + deadline
      written down.
    </p>

    <h2>Meeting-free time blocks</h2>
    <p>
      <strong>Maker time.</strong> Engineers, writers, designers
      need multi-hour uninterrupted blocks. Protect Tues/Thurs
      mornings or Wed all-day as meeting-free if possible.
    </p>
    <p>
      <strong>No-meeting Wednesday.</strong> Popularized at Shopify
      and others. Whole company off-calendar. 1 day of deep work
      recovered per week.
    </p>
    <p>
      <strong>Default meeting length 25 / 50 minutes</strong> instead
      of 30 / 60. Parkinson&rsquo;s law ensures meetings fill the
      time; shorter slots end on time.
    </p>

    <h2>The meetings you should cancel</h2>
    <p>
      <strong>Status meetings that have become recurring rituals</strong>
      with no active blockers. Replace with async standup in Slack /
      Notion.
    </p>
    <p>
      <strong>&ldquo;Tell the team about X&rdquo; meetings.</strong>
      Write a doc. One-way information transfer does not need
      synchronous time.
    </p>
    <p>
      <strong>Quarterly / annual reviews turned into all-hands
      readouts of slides.</strong> Send the deck, hold Q&amp;A only.
    </p>
    <p>
      <strong>Meetings without a clear decider.</strong> If no one
      can call the decision, the meeting can&rsquo;t produce one.
      Cancel; fix ownership first.
    </p>

    <h2>The cancel-reduce-shorten framework</h2>
    <p>
      Once a quarter, audit your recurring meetings:
    </p>
    <p>
      <strong>Cancel:</strong> no longer solving a real problem.
    </p>
    <p>
      <strong>Reduce frequency:</strong> weekly → biweekly, daily →
      twice weekly.
    </p>
    <p>
      <strong>Shorten:</strong> 60 → 30, 30 → 15. 90% of 60-min
      meetings can be done in 30 once you remove the small talk and
      tangents.
    </p>
    <p>
      <strong>Reduce attendance:</strong> cut the list by 30%.
      Watch if anyone notices.
    </p>
    <p>
      A single quarter of disciplined auditing typically recovers
      5-10 hours/person/week.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Compute a meeting&rsquo;s real cost with the{" "}
      <a href="/tools/meeting-cost-calculator">meeting cost
      calculator</a>. Pair with the{" "}
      <a href="/tools/paycheck-calculator">paycheck calculator</a>
      {" "}if you&rsquo;re working from gross salaries to loaded
      hourly rates, and the{" "}
      <a href="/tools/hourly-rate-calculator">hourly rate calculator</a>
      {" "}for the inverse (salary from hourly).
    </p>
  </>
);
