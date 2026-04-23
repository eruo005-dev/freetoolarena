import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Acronyms are how technical fields and product teams compress
      meaning into something memorable. Done right, an acronym makes
      a concept stick (LASER, SCUBA, NASA). Done wrong, it&rsquo;s a
      meaningless soup of initials that forces the reader to look up
      a glossary (MPVSXD, SAMPL). This guide covers how good acronyms
      get made, the difference between acronyms and initialisms, the
      rules for pronounceability, how product teams name features
      without creating internal-only jargon, pattern techniques used
      by naming consultants, and when an acronym is actually worse
      than the phrase it replaces.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Acronym vs initialism vs abbreviation</h2>
    <p>
      <strong>Acronym:</strong> pronounced as a word. NASA, NATO,
      LASER, SCUBA, RADAR.
    </p>
    <p>
      <strong>Initialism:</strong> pronounced letter by letter. FBI,
      IBM, HTML, CSS, SQL.
    </p>
    <p>
      <strong>Abbreviation:</strong> any shortened form. etc., Dr.,
      approx. Includes acronyms and initialisms as subsets.
    </p>
    <p>
      Casual usage blurs the line, but the distinction matters when
      you&rsquo;re designing one. Pronounceable acronyms stick in
      memory far better than initialisms.
    </p>

    <h2>What makes a good acronym</h2>
    <p>
      <strong>Pronounceable.</strong> Alternating consonants and
      vowels, avoiding awkward clusters. NASA vs NSDUH.
    </p>
    <p>
      <strong>Memorable / meaningful word.</strong> If it spells an
      existing English word that relates to the concept, it sticks.
      SCUBA (Self-Contained Underwater Breathing Apparatus) is
      brilliant because &ldquo;scuba&rdquo; already evokes the
      context.
    </p>
    <p>
      <strong>Short.</strong> 3-5 letters. Six is the upper limit.
      Beyond that, people stop treating it as a word.
    </p>
    <p>
      <strong>Derived, not forced.</strong> If you had to pick 2/5
      letters from &ldquo;Artificial&rdquo; just to get the right
      word, readers will squint. Best acronyms feel natural
      unpacking.
    </p>
    <p>
      <strong>No clash with existing acronyms.</strong> Your
      &ldquo;SCRUM&rdquo; conflicts with Agile&rsquo;s Scrum; your
      &ldquo;AAA&rdquo; conflicts with authentication, insurance,
      batteries. Check first.
    </p>

    <h2>Pronounceability rules of thumb</h2>
    <p>
      Consonant-vowel-consonant (CVC) pattern is easiest:{" "}
      <strong>N</strong>A<strong>S</strong>A, <strong>L</strong>
      ASE<strong>R</strong>. Your brain parses them as real words.
    </p>
    <p>
      Avoid three consonants in a row. &ldquo;STLN&rdquo; doesn&rsquo;t
      pronounce. &ldquo;FRSC&rdquo; forces an awkward vowel insertion.
    </p>
    <p>
      Vowels in the middle help. &ldquo;CIPHER&rdquo; works; &ldquo;CPHR&rdquo;
      doesn&rsquo;t.
    </p>
    <p>
      English preserves about 21 consonants and 5 vowels. Random
      4-letter strings have maybe a 1-in-5 chance of being
      pronounceable. Don&rsquo;t brute-force; start with your
      expansion and see what vowels fall out.
    </p>

    <h2>Pattern techniques</h2>
    <p>
      <strong>Backronym:</strong> pick the target word first, then
      reverse-engineer an expansion. USA PATRIOT Act
      (&ldquo;Uniting and Strengthening America by Providing
      Appropriate Tools Required to Intercept and Obstruct
      Terrorism&rdquo;) is a backronym — tortured expansion, snappy
      name.
    </p>
    <p>
      <strong>Partial letters:</strong> AIDS (Acquired Immune
      Deficiency Syndrome) takes A, I, D, S — the &ldquo;Syndrome&rdquo;
      letter alone contributes the final consonant. You&rsquo;re not
      forced to take the first letter of every word.
    </p>
    <p>
      <strong>Phonetic substitution:</strong> drop articles and
      connectors, use only the meaningful nouns and verbs. &ldquo;SCUBA&rdquo;
      ignores the &ldquo;for&rdquo;.
    </p>
    <p>
      <strong>Portmanteau + acronym:</strong> hybrid names like{" "}
      <strong>GIF</strong> (Graphics Interchange Format) that lean on
      the sound more than the strict letter rule.
    </p>

    <h2>When naming features or products</h2>
    <p>
      Naming a feature with an acronym is usually a mistake. Users
      don&rsquo;t know your internal terminology. &ldquo;Enable MFA&rdquo;
      reads fine to engineers and gibberish to everyone else.
    </p>
    <p>
      <strong>Use the full phrase for UX copy, acronyms for
      documentation and internal terms.</strong> Users see
      &ldquo;Multi-factor authentication&rdquo;; docs can say
      &ldquo;(MFA)&rdquo; on second reference.
    </p>
    <p>
      Exception: well-established consumer acronyms (PIN, SMS, PDF,
      GPS). These have crossed into common usage and don&rsquo;t
      need expansion.
    </p>

    <h2>Acronyms in regulated industries</h2>
    <p>
      Medicine, law, and government love acronyms — and misuse
      them. A PDF guide for patients with &ldquo;CBC, BMP, LFTs, A1C&rdquo;
      is not helpful. Patient-facing content should expand every
      acronym on first use.
    </p>
    <p>
      Plain-language mandates (US Plain Writing Act 2010, EU
      regulations) often require spelling out acronyms. When
      writing for a broad audience, expand on first use and avoid
      assuming familiarity.
    </p>

    <h2>Testing an acronym before adopting it</h2>
    <p>
      <strong>Say it aloud.</strong> If it makes you hesitate or
      sounds awkward, iterate.
    </p>
    <p>
      <strong>Google it.</strong> Does it already mean something?
      Does it have crude or offensive meanings in other languages?
      Global teams have shipped embarrassing names by skipping this
      step.
    </p>
    <p>
      <strong>Look at trademark databases.</strong> USPTO and EUIPO
      are free to search. Short acronyms are often taken.
    </p>
    <p>
      <strong>Test on fresh readers.</strong> If 3 out of 5 can&rsquo;t
      recall what it stands for a day later, it&rsquo;s not
      memorable enough.
    </p>

    <h2>When not to use an acronym</h2>
    <p>
      <strong>Expansion is only used once.</strong> If you&rsquo;re
      writing a 400-word blog post and need to mention &ldquo;Customer
      Acquisition Cost&rdquo; three times, just use the phrase.
      Making it CAC for three uses saves almost nothing and risks
      confusion.
    </p>
    <p>
      <strong>Audience doesn&rsquo;t know the term.</strong> &ldquo;API&rdquo;
      in a dev doc is fine; &ldquo;API&rdquo; in a marketing page for
      non-technical SMBs is not.
    </p>
    <p>
      <strong>The phrase is already short.</strong> &ldquo;Quick Response&rdquo;
      → &ldquo;QR&rdquo; works because the expansion is rarely used.
      But shortening &ldquo;email&rdquo; would be silly.
    </p>

    <h2>Capitalization and style</h2>
    <p>
      <strong>Acronym case:</strong> conventionally all caps (NASA,
      SCUBA), though extremely common ones are often lowercased over
      time (laser, radar, scuba, pdf). Follow your style guide.
    </p>
    <p>
      <strong>Initialisms:</strong> all caps usually. Exception: id,
      url, json in file paths (visual style choice).
    </p>
    <p>
      <strong>Plurals:</strong> add lowercase s, no apostrophe.
      &ldquo;PDFs&rdquo; not &ldquo;PDF&rsquo;s&rdquo;.
    </p>
    <p>
      <strong>Indefinite articles:</strong> &ldquo;a&rdquo; vs &ldquo;an&rdquo;
      based on pronunciation, not letter. &ldquo;An HTML page&rdquo;
      (pronounced aitch) vs &ldquo;a URL&rdquo; (pronounced you).
    </p>

    <h2>Generating candidates</h2>
    <p>
      To brainstorm acronyms for a concept:
    </p>
    <p>
      1. List every meaningful word in the full phrase.
    </p>
    <p>
      2. For each word, note first letters <em>and</em> strong
      phonetic letters (the &ldquo;X&rdquo; in &ldquo;Extract&rdquo;).
    </p>
    <p>
      3. Try combinations in different orders. Grammar isn&rsquo;t
      mandatory in the expansion.
    </p>
    <p>
      4. Cross-reference against real words. A good match makes
      itself known.
    </p>
    <p>
      5. Check for clashes and unintended meanings.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Coining an acronym for every feature.</strong> Internal
      team in-joke accumulates into impossible onboarding. Spell things
      out.
    </p>
    <p>
      <strong>Acronyms that collide with existing ones.</strong> ACL
      = access control list, or Anterior Cruciate Ligament, or
      American Cornhole League. Context matters, but pick a unique
      one if you can.
    </p>
    <p>
      <strong>Tortured backronyms.</strong> If reading the expansion
      makes you wince, readers will too.
    </p>
    <p>
      <strong>Skipping the global-meaning check.</strong> Your clever
      acronym means something embarrassing in another language or
      cultural context. Always search.
    </p>
    <p>
      <strong>Using acronyms in customer-facing UI.</strong> Power
      users love brevity; new users read them as gibberish. Default
      to spelling it out.
    </p>
    <p>
      <strong>Ignoring the memorability test.</strong> If people
      forget what it stands for within a week, it&rsquo;s not doing
      its job.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate candidate acronyms from a phrase with the{" "}
      <a href="/tools/acronym-generator">acronym generator</a>.
      Pair with the{" "}
      <a href="/tools/slug-generator">slug generator</a> for
      URL-safe shortenings, and the{" "}
      <a href="/tools/case-converter">case converter</a> to
      normalize casing across usages.
    </p>
  </>
);
