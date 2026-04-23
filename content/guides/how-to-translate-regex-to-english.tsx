import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Regex is write-only code in too many codebases. Someone wrote a pattern three years ago,
      it works, nobody dares touch it, and now you need to modify it. Translating a regex back
      into English sentences is the fastest way to audit what it&rsquo;s actually doing versus
      what someone thinks it&rsquo;s doing. This is a skill that pays off in code reviews, in
      documentation, and in spotting bugs before they ship. The translation follows
      predictable rules&mdash;anchors become &ldquo;at the start of,&rdquo; character classes
      become &ldquo;any character from,&rdquo; quantifiers become &ldquo;exactly N&rdquo; or
      &ldquo;one or more&rdquo;&mdash;and reading a regex becomes mechanical once you&rsquo;ve
      seen the constructs a few times. This guide covers how to translate patterns piece by
      piece, common constructs and their English equivalents, how to document a complex regex
      so future you understands it, and the common failures where the pattern says something
      different than the author intended.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Translate left to right, piece by piece</h2>
    <p>
      Regex executes left to right against input, so reading it the same way gives you an
      immediate English sentence. Break the pattern into atoms (a character, a class, a group,
      a quantifier) and translate each, joining with &ldquo;followed by.&rdquo;
    </p>
    <pre>{`Pattern: ^\d{3}-\d{4}$

^         at the start of the string
\d{3}     exactly three digits
-         a literal hyphen
\d{4}     exactly four digits
$         at the end of the string

English: "exactly three digits, a hyphen, exactly four digits, and nothing else"`}</pre>

    <h2>Anchors in English</h2>
    <p>
      <code>^</code> is &ldquo;at the start.&rdquo; <code>$</code> is &ldquo;at the end.&rdquo;
      Together they mean &ldquo;the entire string is&rdquo; whatever comes between. Without
      them, the regex is searching <em>within</em> a string, which is usually the source of
      over-matching bugs. <code>\b</code> is &ldquo;at a word boundary&rdquo;&mdash;useful for
      isolating whole words.
    </p>

    <h2>Quantifiers in English</h2>
    <p>
      <code>?</code> is &ldquo;optionally&rdquo; or &ldquo;zero or one.&rdquo; <code>*</code> is
      &ldquo;zero or more.&rdquo; <code>+</code> is &ldquo;one or more.&rdquo; <code>{`{n}`}</code>
      is &ldquo;exactly n.&rdquo; <code>{`{n,m}`}</code> is &ldquo;between n and m.&rdquo;{" "}
      <code>{`{n,}`}</code> is &ldquo;at least n.&rdquo;
    </p>
    <pre>{`\d?       an optional digit
\d*       zero or more digits
\d+       one or more digits
\d{3}     exactly 3 digits
\d{2,4}   between 2 and 4 digits
\d{5,}    at least 5 digits`}</pre>

    <h2>Character classes</h2>
    <p>
      <code>[abc]</code> is &ldquo;any one of a, b, or c.&rdquo; <code>[a-z]</code> is &ldquo;any
      lowercase letter.&rdquo; <code>[^0-9]</code> is &ldquo;anything that is not a digit.&rdquo;
      Shorthand classes: <code>\d</code> = digit, <code>\w</code> = word character (letter,
      digit, underscore), <code>\s</code> = whitespace. Uppercase forms are negations:{" "}
      <code>\D</code> = non-digit, <code>\W</code> = non-word, <code>\S</code> = non-whitespace.
    </p>

    <h2>Alternation</h2>
    <p>
      The pipe <code>|</code> translates as &ldquo;or.&rdquo; <code>cat|dog|bird</code> reads
      &ldquo;cat, dog, or bird.&rdquo; Alternation has low precedence&mdash;without parentheses,
      <code>cat|dog food</code> means &ldquo;cat&rdquo; or &ldquo;dog food,&rdquo; not &ldquo;cat
      food&rdquo; or &ldquo;dog food.&rdquo;
    </p>

    <h2>Groups</h2>
    <p>
      Plain parentheses <code>(...)</code> create a numbered capture group: &ldquo;captured as
      group N.&rdquo; <code>(?:...)</code> is a non-capturing group&mdash;used purely for
      grouping without remembering. Named groups <code>(?&lt;name&gt;...)</code> capture under
      a name. When translating, it helps to mention the group number or name so the reader
      knows they can refer to this fragment later.
    </p>
    <pre>{`(\d{4})-(\d{2})-(\d{2})
"four digits (group 1), hyphen, two digits (group 2), hyphen,
two digits (group 3)"

(?<year>\d{4})
"four digits, captured as 'year'"`}</pre>

    <h2>Lookarounds</h2>
    <p>
      <code>(?=...)</code> is &ldquo;followed by&rdquo; (without consuming). <code>(?!...)</code>
      is &ldquo;not followed by.&rdquo; <code>{`(?<=...)`}</code> is &ldquo;preceded by.&rdquo;
      <code>{`(?<!...)`}</code> is &ldquo;not preceded by.&rdquo; These are conditions, not
      matches, so the English should reflect that they&rsquo;re checks and not part of the
      captured text.
    </p>
    <pre>{`\d+(?=px)
"one or more digits, followed by 'px' (but 'px' is not captured)"

(?<!\$)\d+
"one or more digits, not preceded by a dollar sign"`}</pre>

    <h2>Example walkthroughs</h2>
    <pre>{`^https?:\/\/[^\s]+$

^         start of string
https     literal "https"
?         the 's' is optional (so also matches http)
:\/\/      literal "://"
[^\s]+    one or more non-whitespace characters
$         end of string

English: "a URL starting with http or https, followed by ://,
then one or more non-whitespace characters"`}</pre>
    <pre>{`\b[A-Z][a-z]+\b

\b         word boundary
[A-Z]      one uppercase letter
[a-z]+     one or more lowercase letters
\b         word boundary

English: "a word starting with an uppercase letter followed by
one or more lowercase letters"`}</pre>
    <pre>{`^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$

^                    start
(?=.*[A-Z])          ahead: must contain an uppercase somewhere
(?=.*\d)             ahead: must contain a digit somewhere
[A-Za-z\d]{8,}       then 8+ letters or digits
$                    end

English: "at least 8 letters or digits, containing at least one
uppercase letter and at least one digit" — a classic password rule`}</pre>

    <h2>Documenting a complex regex</h2>
    <p>
      When a pattern is more than 30 characters, add a comment that translates it to English
      on the line above. In languages that support the <code>x</code> flag (extended mode), you
      can embed the explanation in the pattern itself with whitespace and <code>#</code>
      comments. The point is that the next person&mdash;including you in six months&mdash;can
      understand the intent without mentally compiling the regex from scratch.
    </p>

    <h2>Spotting the author&rsquo;s intent mismatch</h2>
    <p>
      Translating a regex to English often reveals that the pattern doesn&rsquo;t say what
      the author thought. Classic examples: email validators that reject perfectly valid
      addresses, phone-number patterns that only accept US formats, URL checkers that allow
      &ldquo;http://.&rdquo;. When your English reading of the pattern sounds wrong against
      the commit message or variable name, you&rsquo;ve found a bug.
    </p>

    <h2>When the English gets long</h2>
    <p>
      If your translation runs more than three sentences, consider whether the regex should be
      split into smaller regexes or replaced by a parser. Some tasks genuinely are regular
      languages and fit in one pattern; others (email, URL, HTML) are specified by standards
      whose correct regex is measured in hundreds of characters. Use a library instead.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Reading escaped characters as special.</strong> <code>\.</code> is a literal dot,
      not &ldquo;any character.&rdquo; <code>\(</code> is a literal parenthesis, not a group.
      When translating, always check for backslashes and note they de-specialize the next
      character.
    </p>
    <p>
      <strong>Confusing greedy with correct.</strong> A greedy <code>.+</code> matches as much
      as possible; the English translation is still &ldquo;one or more of any character,&rdquo;
      but the practical behavior can surprise you when anchors aren&rsquo;t in place.
    </p>
    <p>
      <strong>Missing the mode flag context.</strong> <code>^</code> means &ldquo;start of
      string&rdquo; by default, but with the <code>m</code> flag it means &ldquo;start of any
      line.&rdquo; <code>.</code> doesn&rsquo;t match newlines by default, but with <code>s</code>
      (dotall) it does. Check flags before translating.
    </p>
    <p>
      <strong>Describing lookarounds as part of the match.</strong> Lookaheads and lookbehinds
      are assertions; they check conditions but don&rsquo;t consume characters. Translate them
      as &ldquo;followed by&rdquo; or &ldquo;preceded by,&rdquo; never as part of the matched
      string.
    </p>
    <p>
      <strong>Forgetting precedence.</strong> <code>cat|dog food</code> is not &ldquo;cat food
      or dog food.&rdquo; It&rsquo;s &ldquo;cat, or dog food.&rdquo; Alternation binds looser
      than concatenation.
    </p>
    <p>
      <strong>Overlooking capture group numbering.</strong> Groups are numbered by their
      opening parenthesis, left to right. Nested groups count too. If a back-reference{" "}
      <code>\2</code> appears, you need to count parens carefully.
    </p>
    <p>
      <strong>Assuming the flavor is standard.</strong> <code>\p{`{L}`}</code>,{" "}
      <code>{`(?<=...)`}</code>, and named groups are not available in every flavor.
      Translating from one flavor to another can produce patterns that don&rsquo;t compile.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Paste any regex into our{" "}
      <a href="/tools/regex-to-english">regex to English translator</a> to get a plain-language
      breakdown and highlighted atoms. Pair it with the{" "}
      <a href="/tools/regex-tester">regex tester</a> to confirm the English matches the actual
      matching behavior, and the <a href="/tools/regex-builder">regex builder</a> when
      you&rsquo;d rather describe what you want in English and get a pattern out.
    </p>
  </>
);
