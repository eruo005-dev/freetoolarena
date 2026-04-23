import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Regex is a superpower until it isn&rsquo;t. A pattern that looks right can match too
      much, too little, or nothing at all, and the error messages your language&rsquo;s regex
      engine gives are usually either silence (zero matches) or catastrophic backtracking that
      hangs your process. The only reliable way to get regex right is to test it against a
      deliberate set of inputs: strings that should match, strings that should not, and the
      tricky edge cases at the boundaries. Then you examine the capture groups and verify
      they&rsquo;re grabbing what you actually want. This guide covers how to build a test
      matrix, the difference between greedy and lazy quantifiers, anchors and word boundaries,
      capture groups, the most useful flags, and how to spot catastrophic backtracking before
      it reaches production.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Start with test cases, not the pattern</h2>
    <p>
      Before writing a regex, write down the inputs it must match, the inputs it must reject,
      and the edge cases. For an email validator, that&rsquo;s obvious emails, emails with
      plus-addressing, international domains, leading/trailing whitespace, empty strings, and
      the classic &ldquo;a@b.c&rdquo; that RFC says is valid but intuition rejects. Build the
      pattern against these cases iteratively; don&rsquo;t try to write it in one shot from
      memory.
    </p>
    <pre>{`Should match:       alice@example.com
                    bob+tag@sub.example.co.uk
                    c@d.ef
Should NOT match:   @example.com
                    alice@
                    alice@@example.com
                    alice example.com
                    (empty)`}</pre>

    <h2>Anchors: start, end, word boundary</h2>
    <p>
      <code>^</code> anchors to the start of the string (or line, with the <code>m</code> flag).
      <code>$</code> anchors to the end. Without anchors, <code>\d+</code> matches digits
      anywhere inside the string, not the whole string. <code>\b</code> is a word boundary: it
      matches the transition between a word character and a non-word character.{" "}
      <code>\bcat\b</code> matches the word &ldquo;cat&rdquo; but not &ldquo;catalog.&rdquo;
    </p>
    <pre>{`^\d+$      entire string is digits
\d+        contains digits somewhere
\bcat\b    the standalone word "cat"
\bcat      "cat" at the start of a word (matches "catalog" too)`}</pre>

    <h2>Greedy versus lazy quantifiers</h2>
    <p>
      By default, quantifiers are <strong>greedy</strong>&mdash;they match as much as possible.{" "}
      <code>&lt;.+&gt;</code> against <code>&lt;a&gt;text&lt;/a&gt;</code> matches the entire
      string because <code>.+</code> eats everything then backtracks. The lazy form{" "}
      <code>&lt;.+?&gt;</code> stops at the first <code>&gt;</code>. Quantifiers with <code>?</code>
      appended become lazy: <code>*?</code>, <code>+?</code>, <code>{`{2,5}?`}</code>.
    </p>
    <pre>{`Input: <a>text</a>
<.+>     matches  <a>text</a>          (greedy, whole string)
<.+?>    matches  <a>                  (lazy, stops at first >)
<[^>]+>  matches  <a>                  (character class, no backtrack)`}</pre>

    <h2>Character classes</h2>
    <p>
      Square brackets define a set of acceptable characters. <code>[abc]</code> matches a, b,
      or c. <code>[a-z]</code> matches any lowercase letter. <code>[^abc]</code> (with caret
      inside) means &ldquo;anything except a, b, c.&rdquo; Common shorthand: <code>\d</code>
      is <code>[0-9]</code>, <code>\w</code> is <code>[A-Za-z0-9_]</code>, <code>\s</code> is
      whitespace, and capital versions (<code>\D</code>, <code>\W</code>, <code>\S</code>) are
      their complements.
    </p>

    <h2>Capture groups and back-references</h2>
    <p>
      Parentheses create numbered capture groups. <code>(\d+)-(\d+)</code> against{" "}
      <code>123-456</code> captures &ldquo;123&rdquo; in group 1 and &ldquo;456&rdquo; in
      group 2. Back-references reuse a captured value: <code>(\w+)\s+\1</code> matches a
      duplicated word like &ldquo;the the.&rdquo; Named groups <code>{`(?<year>\\d{4})`}</code>
      make complex patterns readable. Non-capturing groups <code>(?:...)</code> let you use
      grouping for quantifiers without creating a numbered group you&rsquo;ll never reference.
    </p>
    <pre>{`(\d{4})-(\d{2})-(\d{2})   date with three groups
(?:foo|bar)+              non-capturing alternation
(?<y>\d{4})-(?<m>\d{2})   named groups
(\w+)\s+\\1                repeated word`}</pre>

    <h2>Flags</h2>
    <p>
      <code>g</code> finds all matches (not just the first). <code>i</code> is case-insensitive.
      <code>m</code> makes <code>^</code> and <code>$</code> match line boundaries as well as
      string boundaries. <code>s</code> (dotall) makes <code>.</code> match newlines. <code>u</code>
      enables full Unicode matching in JavaScript. <code>x</code> (extended) lets you add
      whitespace and comments to the pattern for readability.
    </p>
    <pre>{`/hello/i      matches HELLO, Hello, hello
/^abc/gm      matches "abc" at start of each line
/a.b/s        the . matches newlines too`}</pre>

    <h2>Lookahead and lookbehind</h2>
    <p>
      Lookaheads and lookbehinds are zero-width assertions&mdash;they check a condition without
      consuming characters. <code>{`\\d+(?=px)`}</code> matches digits followed by &ldquo;px&rdquo;
      without including &ldquo;px&rdquo; in the match. <code>{`(?<=\\$)\\d+`}</code> matches
      digits preceded by a dollar sign, without including the dollar sign. Negative versions
      <code>(?!...)</code> and <code>{`(?<!...)`}</code> assert absence.
    </p>

    <h2>The catastrophic backtracking trap</h2>
    <p>
      Some patterns, when faced with non-matching input, explore exponentially many paths.{" "}
      <code>(a+)+b</code> against <code>aaaaaaaaaaaaaaaaX</code> takes billions of steps before
      failing. The culprit is nested quantifiers matching the same thing. Warning signs: a
      group with a quantifier, where the group itself contains a quantifier that could match
      the same characters. Defensive rewrites include possessive quantifiers where available,
      atomic groups, or replacing <code>.+</code> inside repeated groups with a restrictive
      character class like <code>[^&quot;]+</code>.
    </p>
    <pre>{`Dangerous:  ^(\w+)+$         nested quantifier
            ^(a|a)*$          ambiguous alternation
            ^(a|aa)*$         overlapping branches

Safer:      ^\w+$             single quantifier
            ^[^"]*$           specific character class`}</pre>

    <h2>Testing strategy</h2>
    <p>
      Keep a file with should-match and should-not-match lines for every regex you deploy. Run
      it every time you change the pattern. When a bug report comes in (&ldquo;this string
      matched when it shouldn&rsquo;t&rdquo;), add the failing string to the test file first,
      verify the regex fails, then fix and re-run. This is unit testing for patterns.
    </p>

    <h2>Flavor differences</h2>
    <p>
      JavaScript, Python, PCRE (PHP, Perl), .NET, Go (RE2), and grep-style all have different
      capabilities. RE2 (Go, Rust&rsquo;s <code>regex</code> crate) guarantees linear time but
      drops back-references and lookbehinds. JavaScript&rsquo;s dotall flag is relatively
      recent. Test in the actual engine you&rsquo;ll deploy against&mdash;a pattern that works
      on regex101 might behave differently in your language.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Forgetting anchors.</strong> <code>\d+</code> matches any digits anywhere.{" "}
      <code>^\d+$</code> requires the whole string to be digits. Choose deliberately; the
      wrong one causes false positives.
    </p>
    <p>
      <strong>Using <code>.*</code> inside a larger pattern.</strong> The dot-star matches
      everything including too much, because it&rsquo;s greedy. Use a specific character class
      like <code>[^&quot;]*</code> for &ldquo;anything but a quote&rdquo; when parsing
      structured text.
    </p>
    <p>
      <strong>Not escaping metacharacters.</strong> Dots in literal strings must be{" "}
      <code>\.</code>. Parentheses in literal phone numbers must be <code>\(</code> and{" "}
      <code>\)</code>. <code>example.com</code> without escaping the dot matches
      &ldquo;exampleXcom&rdquo; too.
    </p>
    <p>
      <strong>Using regex to parse HTML or JSON.</strong> HTML is not a regular language. Use
      a parser. Regex works for surgical extraction of simple patterns inside known structure,
      not for full parsing.
    </p>
    <p>
      <strong>Ignoring Unicode.</strong> <code>\w</code> in JavaScript is ASCII-only by default,
      so <code>caf&eacute;</code> doesn&rsquo;t match. Use the <code>u</code> flag plus
      <code>\p{`{L}`}</code> character classes for Unicode-aware matching.
    </p>
    <p>
      <strong>Catastrophic backtracking in production.</strong> Nested quantifiers against
      adversarial input can freeze your service. Use linear-time engines (RE2, Rust regex) for
      anything that takes untrusted input, or add a timeout.
    </p>
    <p>
      <strong>Not testing the negative cases.</strong> A regex that matches everything you
      want is useless if it also matches things you don&rsquo;t. Always include should-not-match
      inputs in your test set.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Paste your pattern and sample strings into our{" "}
      <a href="/tools/regex-tester">regex tester</a> to see matches, captures, and flag behavior
      in real time. Pair it with the <a href="/tools/regex-builder">regex builder</a> when
      you&rsquo;re constructing a pattern from scratch, and the{" "}
      <a href="/tools/regex-to-english">regex to English translator</a> to verify you&rsquo;re
      reading someone else&rsquo;s pattern the way they intended.
    </p>
  </>
);
