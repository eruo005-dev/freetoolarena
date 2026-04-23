import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Lorem ipsum is the universal placeholder text of the web —
      scrambled Latin that lets designers sketch layout without
      readers getting distracted by the content. Used badly, it
      ships to production, confuses stakeholders, and makes mockups
      misleading. Used well, it accelerates design iteration and
      keeps critique focused on structure. This guide covers why
      lorem ipsum exists (dating back to the 1500s), when to use it
      versus real content, modern alternatives (realistic fake
      content, domain-specific placeholder, AI-generated), and the
      edge cases where placeholder text can burn you.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Why placeholder text exists</h2>
    <p>
      A mockup with real content invites critique of the content,
      not the layout. &ldquo;Do we say &lsquo;our mission&rsquo; or
      &lsquo;our purpose&rsquo;?&rdquo; takes over the meeting when
      you meant to discuss whether the hero button should be bigger.
    </p>
    <p>
      Scrambled text (lorem ipsum) looks plausibly like prose — same
      rough word lengths, sentence rhythm, paragraph density — but
      is unreadable. This lets viewers evaluate typography,
      hierarchy, and whitespace without getting distracted by meaning.
    </p>
    <p>
      The canonical text comes from a scrambled version of Cicero&rsquo;s
      &ldquo;de Finibus Bonorum et Malorum&rdquo; (45 BC). The
      scramble started in the 1500s when a typesetter jumbled the
      text to make a sample page. It stuck.
    </p>

    <h2>When lorem ipsum is the right choice</h2>
    <p>
      <strong>Early-stage wireframes and mockups.</strong> Block-out
      layouts where the content isn&rsquo;t yet written. The goal is
      to evaluate shape, rhythm, flow.
    </p>
    <p>
      <strong>Typography tests.</strong> Font pairings, size scales,
      line length, leading. Real content can over-emphasize or
      distract.
    </p>
    <p>
      <strong>Density studies.</strong> Long-form article templates,
      documentation layouts, marketing pages with varying content
      block sizes.
    </p>
    <p>
      <strong>Demo templates.</strong> Theme authors shipping
      themes for WordPress, Ghost, or Framer need plausible-looking
      placeholder for screenshots and demos.
    </p>

    <h2>When real content (or realistic fake content) is better</h2>
    <p>
      <strong>Validating content length assumptions.</strong> Lorem
      ipsum lets you pretend headlines are always 6 words. Real
      content reveals they&rsquo;re 3-18. Design with the range, not
      the ideal.
    </p>
    <p>
      <strong>Stakeholder reviews past early-stage.</strong> Execs
      who see lorem ipsum may not trust the design, or may argue
      about decisions that depend on copy. Realistic content avoids
      this.
    </p>
    <p>
      <strong>User testing.</strong> Participants can&rsquo;t judge
      the product with placeholder copy. Always use realistic
      content.
    </p>
    <p>
      <strong>Component libraries and design systems.</strong>
      Realistic samples make the library actually usable (real
      button labels, real nav items).
    </p>
    <p>
      <strong>Form designs.</strong> Field placeholders should be
      real hints (&ldquo;name@company.com&rdquo;), not lorem ipsum.
      Lorem ipsum in a real input field is a UX bug waiting to ship.
    </p>

    <h2>Lorem ipsum variants</h2>
    <p>
      Beyond the classic Latin:
    </p>
    <p>
      <strong>Bacon ipsum:</strong> butcher jargon (brisket, pork
      belly, short ribs). Humorous placeholder for food-adjacent
      sites.
    </p>
    <p>
      <strong>Hipster ipsum:</strong> vinyl, artisanal, mustache.
      Lifestyle brands sometimes use it.
    </p>
    <p>
      <strong>Corporate ipsum:</strong> synergize, leverage,
      value-add. Startup / B2B satire.
    </p>
    <p>
      <strong>Cupcake ipsum, pirate ipsum, Trump ipsum, etc:</strong>
      endless variants for humor. Use with caution — clients may not
      share the joke, and leftover pirate ipsum on a corporate site
      is embarrassing.
    </p>
    <p>
      <strong>Rule:</strong> novelty ipsum works for internal
      concepts; stick to classic lorem ipsum or realistic placeholder
      for anything shared outside the design team.
    </p>

    <h2>Modern alternative: realistic fake content</h2>
    <p>
      <strong>Faker.js / faker-js:</strong> JavaScript library that
      generates realistic fake names, addresses, companies, product
      descriptions. Drop-in for mockups and prototypes.
    </p>
    <p>
      <strong>JSON Placeholder:</strong> API returning fake posts,
      users, comments — like lorem ipsum but shaped like real data.
      Good for API wiring before the real backend exists.
    </p>
    <p>
      <strong>Unsplash / Pexels:</strong> real images in placeholder
      slots. Shift mockups from &ldquo;obviously fake&rdquo; to
      &ldquo;plausibly real.&rdquo;
    </p>
    <p>
      <strong>AI-generated sample content:</strong> Claude, ChatGPT,
      or similar produce realistic placeholder that fits your
      domain. &ldquo;Write five fake SaaS product descriptions, 2-3
      sentences each&rdquo; is faster than scripting Faker rules.
    </p>

    <h2>Placeholder in different contexts</h2>
    <p>
      <strong>Figma / Sketch / design tools:</strong> built-in lorem
      ipsum plugins. Generate paragraphs, headlines, variable
      lengths. Use during wireframing.
    </p>
    <p>
      <strong>Code / HTML prototypes:</strong> keep placeholder
      identifiable as placeholder. Use <code>&lt;!-- LOREM --&gt;</code>
      comments or a marker string. Scan for these before shipping.
    </p>
    <p>
      <strong>CMS templates:</strong> consider whether lorem ipsum
      would ship if the client doesn&rsquo;t fill a field. Default
      to &ldquo;coming soon&rdquo; or hide empty content blocks.
    </p>
    <p>
      <strong>Email templates:</strong> lorem ipsum often escapes
      into production emails. Scan sent folders for &ldquo;lorem&rdquo;
      regularly.
    </p>

    <h2>Placeholder-as-feature: skeleton screens</h2>
    <p>
      Modern apps replace lorem ipsum loading states with skeleton
      screens — gray blocks in the shape of the eventual content.
      Visual placeholder without the &ldquo;fake text&rdquo; problem.
    </p>
    <p>
      Skeleton screens reduce perceived loading time by 10-20% in
      user studies. They communicate &ldquo;the UI is loading&rdquo;
      without the weirdness of lorem ipsum.
    </p>

    <h2>Accessibility and lorem ipsum</h2>
    <p>
      Screen readers read lorem ipsum out as if it were real text.
      Demos and prototypes shared with users who rely on assistive
      tech need realistic content, not lorem ipsum.
    </p>
    <p>
      Alt text on placeholder images should be real alt text (or
      <code> alt=&quot;&quot;</code> for decorative), not &ldquo;Lorem
      ipsum image.&rdquo;
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Shipping lorem ipsum to production.</strong> The
      classic. Happens constantly. Add &ldquo;lorem ipsum&rdquo; to
      your pre-launch checklist.
    </p>
    <p>
      <strong>Using lorem ipsum in SEO content.</strong> Google
      won&rsquo;t rank pages with lorem ipsum, and the page
      quality signals take a hit.
    </p>
    <p>
      <strong>Unrealistic text lengths.</strong> Using 1,500 words
      of lorem ipsum in a field that will hold a 50-word bio leads
      to layout decisions that break with real content.
    </p>
    <p>
      <strong>Placeholder in form labels instead of hints.</strong>
      Form <code>placeholder</code> should show format (&ldquo;
      MM/DD/YYYY&rdquo;) or an example (&ldquo;name@company.com&rdquo;),
      not lorem ipsum.
    </p>
    <p>
      <strong>Forgetting to translate placeholder.</strong>
      International sites sometimes ship with English lorem ipsum in
      non-English layouts — looks especially wrong.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate placeholder text instantly with the{" "}
      <a href="/tools/lorem-ipsum-generator">lorem ipsum generator</a>.
      Pair with the{" "}
      <a href="/tools/word-counter">word counter</a> to size your
      placeholder to realistic content length, and the{" "}
      <a href="/tools/reading-time-estimator">reading time
      estimator</a> to check whether the placeholder length matches
      the final article&rsquo;s expected reading time.
    </p>
  </>
);
