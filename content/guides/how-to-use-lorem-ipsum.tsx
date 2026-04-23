import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Lorem ipsum is the placeholder text you have probably seen a thousand times in design mockups,
      CMS templates, and untouched WordPress pages. It looks like nonsense Latin because it mostly
      is&mdash;scrambled fragments of Cicero&rsquo;s <em>De Finibus Bonorum et Malorum</em> from 45
      BC, rearranged by an unknown typesetter in the 1500s to demonstrate typefaces without
      tempting readers to read the words. Used correctly, it lets designers and developers show
      layout and typography without being distracted by content. Used incorrectly, it ships to
      production and embarrasses the team. This guide covers the history, why fake Latin beats
      real content for mockups, when to stop using it and switch to real copy, paragraph and word
      length targets, and alternatives like Bacon Ipsum and Hipster Ipsum that fit specific
      contexts.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Where it came from</h2>
    <p>
      The canonical lorem ipsum passage begins
      <em> Lorem ipsum dolor sit amet, consectetur adipiscing elit</em>. Richard McClintock, a
      Latin scholar at Hampden-Sydney College, traced the phrase in 1982 back to sections 1.10.32
      and 1.10.33 of Cicero&rsquo;s ethics treatise, written in 45 BC. The typesetter who first
      scrambled it is unknown, but the text shows up in Letraset dry-transfer lettering sheets in
      the 1960s and then in Aldus PageMaker bundled templates in the 1980s, which is how it
      entered the digital design vocabulary. Today it is the default placeholder in everything
      from Figma to Microsoft Word.
    </p>

    <h2>Why fake Latin beats real content</h2>
    <p>
      The whole point of placeholder text is that it looks like text without being text. Real
      English copy pulls a reviewer&rsquo;s attention to meaning&mdash;they read the words, argue
      about the wording, and miss the layout problems you wanted them to catch. Lorem ipsum has
      roughly the same letter distribution as English, enough that line lengths, paragraph weight,
      and rag shape look natural, but the reader&rsquo;s eye bounces off it without engaging. That
      is the sweet spot for mockups, wireframes, and component libraries where typography and
      spacing are the actual subject of review.
    </p>

    <h2>Length targets by use case</h2>
    <p>
      Pick a length that matches what real content will be. Hero headlines are 4 to 10 words,
      subheadings 8 to 15, body paragraphs 40 to 80 words, intro paragraphs 50 to 100, long-form
      article paragraphs 80 to 150. A blog template populated with four identical 200-word blocks
      will mislead everyone about how the real layout will breathe&mdash;put short paragraphs
      next to long ones, mix single-sentence paragraphs with multi-sentence ones, and make sure
      the placeholder reflects the rhythm of real writing.
    </p>
    <pre>{`Headline:    3-8 words
Subheadline: 8-15 words
Lead:        30-60 words
Body:        50-120 words per paragraph
Caption:     5-15 words
List item:   3-10 words`}</pre>

    <h2>Paragraphs versus words versus characters</h2>
    <p>
      Lorem ipsum generators accept requests by paragraph count, word count, sentence count, or
      character count. Paragraph count is the most common for copy blocks. Word count is better
      when you need to fit a specific width like a headline or meta description. Character count
      matters for tight UI like button labels, tab titles, and tooltips where a 20-character
      string lays out very differently from a 40-character one. Use character-level generation
      any time you are testing truncation or ellipsis behavior.
    </p>

    <h2>When to switch to real content</h2>
    <p>
      Lorem ipsum is appropriate during wireframing, component-library work, and early layout
      review. Switch to real content the moment you are reviewing copy hierarchy, tone, voice, or
      readability. Stakeholders reviewing lorem ipsum cannot tell you whether the intro paragraph
      is too long or whether the call to action reads as pushy&mdash;they are reviewing
      typography. The latest safe point to swap is before any user testing, because test
      participants will fixate on the fake Latin and produce unusable feedback. A good rule is
      &ldquo;no lorem ipsum past the first round of internal review.&rdquo;
    </p>

    <h2>Themed alternatives</h2>
    <p>
      Several themed placeholder generators exist for contexts where lorem ipsum feels wrong or
      where a bit of humor helps reviewers stay engaged. Bacon Ipsum produces meat-themed nonsense
      (&ldquo;Bacon ipsum dolor amet short ribs spare ribs brisket&rdquo;), Hipster Ipsum leans
      into Brooklyn stereotypes, Cupcake Ipsum uses dessert words, and Corporate Ipsum strings
      together jargon like &ldquo;synergize vertical workflows.&rdquo; These are fine for internal
      mockups and client-facing designs where the theme matches the brand, but they draw more
      attention than standard lorem ipsum and can derail reviews if the reader starts laughing at
      the placeholder instead of looking at the design.
    </p>

    <h2>Handling special characters and formatting</h2>
    <p>
      Real content includes punctuation beyond periods and commas: em dashes, ellipses, smart
      quotes, apostrophes, parentheses, occasional numbers. Standard lorem ipsum has almost none
      of these, which means your design looks cleaner than it will in production. A good generator
      lets you turn on punctuation variety or inject numbers and URLs so the placeholder exercises
      the typography the way real content will. If your design depends on line-height for
      descenders or ascenders, make sure the placeholder includes letters like g, j, p, q, y, and
      capitals with diacriticals.
    </p>

    <h2>Accessibility and localization</h2>
    <p>
      Lorem ipsum is untranslated Latin. Screen readers will read it literally and the audio
      output is unpleasant, so never leave lorem ipsum in production code even behind
      <code>aria-hidden</code>. For designs meant for non-Latin-script languages (Arabic, Chinese,
      Japanese, Thai), use a matching placeholder in that script because line-break behavior, text
      height, and glyph density vary enormously between scripts. A site that looks balanced in
      Latin lorem ipsum can look cramped or loose when real Chinese or Arabic content ships.
    </p>

    <h2>Protecting against ship-it bugs</h2>
    <p>
      The classic failure mode is that placeholder text makes it to production. Add a lint step
      that greps your codebase and CMS output for the string &ldquo;lorem ipsum&rdquo; and fails
      the build if it finds any. Many teams do this for <code>TODO</code> comments too. Add a
      pre-launch check that loads every template and scans for the word &ldquo;consectetur&rdquo;
      in rendered HTML. These two checks catch nearly every placeholder-in-production incident.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Shipping it to production.</strong> The number one failure. A surprising volume of
      public websites have lorem ipsum in an alt tag, a footer, or a page buried three levels
      deep. Lint for it.
    </p>
    <p>
      <strong>Using the same block everywhere.</strong> Identical paragraphs make the layout look
      more regular than real content will. Generate fresh paragraphs of varying lengths so the
      mockup reflects realistic rhythm.
    </p>
    <p>
      <strong>Reviewing copy with lorem ipsum.</strong> Stakeholders reviewing placeholder cannot
      give feedback on tone or clarity. Swap to real content before asking the question.
    </p>
    <p>
      <strong>Picking a themed generator for client work.</strong> Bacon Ipsum is funny until your
      client finds it in their Figma file and wonders if it was intentional. Stick with standard
      lorem ipsum for external-facing mockups.
    </p>
    <p>
      <strong>Ignoring non-Latin scripts.</strong> Latin placeholder in a Japanese layout
      misrepresents line heights, breaks, and character density. Use a script-matched placeholder
      when designing for non-Latin languages.
    </p>
    <p>
      <strong>Too much punctuation variety, or too little.</strong> If the generator gives you
      plain periods only, your layout looks cleaner than reality. If it floods the text with
      exotic punctuation, your layout looks messier than reality. Aim for moderate variety.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate placeholder text by word, sentence, or paragraph count with the{" "}
      <a href="/tools/lorem-ipsum-generator">lorem ipsum generator</a>. Pair with the{" "}
      <a href="/tools/readability-score-checker">readability score checker</a> when you later swap
      in real copy so you can verify the real content actually fits the design rhythm, and the{" "}
      <a href="/tools/case-converter">case converter</a> when you need variations like all-caps
      headlines or title-case subheadings for different template slots.
    </p>
  </>
);
