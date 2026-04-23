import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Password strength meters often lie. &ldquo;Tr0ub4dor&amp;3&rdquo;
      scores &ldquo;strong&rdquo; on most meters but takes hours to
      crack; &ldquo;correct horse battery staple&rdquo; scores weak
      but takes centuries. Strength is about entropy and resistance
      to known attacks, not about symbol mixing. This guide covers
      what password strength actually measures, the meters that get
      it right (zxcvbn) vs the ones that get it wrong (rule-based),
      how length beats complexity, why breach-checked matters more
      than &ldquo;strong,&rdquo; and practical guidance on building
      passwords that resist real-world attack patterns.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What strength meters try to measure</h2>
    <p>
      Password strength = how long it takes an attacker to crack it
      with current hardware and methods. Measured in{" "}
      <strong>guesses</strong> (before a crack is likely) or
      equivalent <strong>bits of entropy</strong>.
    </p>
    <p>
      Three common methods, in decreasing order of badness:
    </p>
    <p>
      <strong>Rule-based:</strong> &ldquo;must have uppercase, digit,
      symbol.&rdquo; Scores <code>Password1!</code> as strong.
      Terrible. This is what most corporate policies use.
    </p>
    <p>
      <strong>Shannon entropy on character classes:</strong>{" "}
      8-char password with 72 symbols ≈ 49 bits. Ignores dictionary
      words. Slightly better but still fooled by common patterns.
    </p>
    <p>
      <strong>Attack-simulation (zxcvbn):</strong> models actual
      cracking — dictionary attacks, leet substitutions, keyboard
      patterns, dates, common names. Scores log₁₀(guesses) 0-4.
      Realistic and widely used.
    </p>

    <h2>The rule-based meter problem</h2>
    <p>
      The rules &ldquo;uppercase + digit + symbol + 8 chars&rdquo;
      came from a 2003 NIST doc. NIST retracted that guidance in
      2017, but corporate IT kept it.
    </p>
    <p>
      <strong>The rules push users toward predictable patterns:</strong>
      {" "}capitalize first letter (<code>Password</code>), append a
      digit (<code>Password1</code>), add a symbol (<code>Password1!</code>).
      Attackers know. They try those permutations first.
    </p>
    <p>
      <strong>Modern NIST SP 800-63B guidance:</strong> length over
      complexity. Allow all ASCII and Unicode. Don&rsquo;t force
      periodic rotation. Check against breach lists. Check against
      dictionaries.
    </p>

    <h2>Length beats complexity</h2>
    <p>
      A 12-char password from a 26-letter alphabet has 26¹² ≈ 9.5 ×
      10¹⁶ combinations. A 16-char password from a 26-letter alphabet
      has 26¹⁶ ≈ 4.3 × 10²². Four extra lowercase characters add
      more entropy than adding uppercase and digits.
    </p>
    <p>
      Practical implication: passphrases of 4-6 random words beat
      &ldquo;strong&rdquo; 8-char passwords both in security and
      memorability.
    </p>
    <p>
      <strong>Example passphrases:</strong>{" "}
      &ldquo;correct horse battery staple&rdquo; (~44 bits);{" "}
      &ldquo;marine peach rocket helm panda&rdquo; (~55 bits).{" "}
      Both easier to remember than &ldquo;X#9qLmp4&rdquo; and
      vastly stronger.
    </p>

    <h2>zxcvbn — the right meter</h2>
    <p>
      <strong>Dropbox&rsquo;s zxcvbn</strong> simulates cracker
      logic:
    </p>
    <p>
      Checks 30,000+ most common passwords.
    </p>
    <p>
      Checks dictionary words (including inverted,{" "}
      <code>password</code> → <code>drowssap</code>).
    </p>
    <p>
      Leet substitutions: <code>p@ssw0rd</code> is scored like{" "}
      <code>password</code>.
    </p>
    <p>
      Keyboard patterns: <code>qwerty</code>, <code>asdfgh</code>,{" "}
      <code>1qaz2wsx</code>.
    </p>
    <p>
      Repeats/sequences: <code>aaaa</code>, <code>1234</code>,{" "}
      <code>abcde</code>.
    </p>
    <p>
      Dates: <code>1987</code>, <code>01011990</code>.
    </p>
    <p>
      Outputs a score 0-4 and an estimate of guesses needed. 4 ≈
      &ldquo;safe from offline slow-hash crack with 10 years
      effort&rdquo;. 3 ≈ &ldquo;safe from offline fast-hash&rdquo;.
      2 ≈ &ldquo;safe from online throttled&rdquo;. 0-1 ≈ crack
      within minutes.
    </p>

    <h2>Breach exposure &gt; theoretical strength</h2>
    <p>
      The strongest-looking password loses all value if it&rsquo;s
      in a breach. <code>Hg7$sKq3Mpx9</code> looks strong but if
      it&rsquo;s in a leaked dump, attackers try it first in
      credential stuffing.
    </p>
    <p>
      <strong>Strength check + breach check together:</strong>
    </p>
    <p>
      <strong>Strength check:</strong> theoretical difficulty for
      an attacker who doesn&rsquo;t have the password yet.
    </p>
    <p>
      <strong>Breach check:</strong> whether the password is already
      known to attackers.
    </p>
    <p>
      Use both. Breach-clean + zxcvbn 3+ is a reasonable bar.
    </p>

    <h2>Attack models matter</h2>
    <p>
      Strength depends on how an attacker can try passwords:
    </p>
    <p>
      <strong>Online throttled:</strong> login form with rate
      limits. ~10 guesses/second max. Even weak passwords survive
      short attacks.
    </p>
    <p>
      <strong>Online unthrottled:</strong> login form without
      limits. 100-1000 guesses/second. Weak passwords fall fast.
    </p>
    <p>
      <strong>Offline fast hash (MD5/SHA-1):</strong> password hash
      was leaked. Billion guesses/second on GPU. 8-char random
      passwords fall in hours.
    </p>
    <p>
      <strong>Offline slow hash (bcrypt/argon2):</strong> password
      hash was leaked but the hash algorithm is deliberately slow.
      Thousands of guesses/second. 12+ char random passwords hold.
    </p>
    <p>
      Design for the worst case: offline fast hash. If your password
      would crack there, it&rsquo;s too weak.
    </p>

    <h2>What strength doesn&rsquo;t protect against</h2>
    <p>
      <strong>Phishing:</strong> a strong password given to a fake
      site is a weak password. No strength helps here — MFA does.
    </p>
    <p>
      <strong>Keyloggers:</strong> strength irrelevant if the
      attacker captures keystrokes.
    </p>
    <p>
      <strong>Password manager breach:</strong> your vault contains
      all strong passwords. If the vault is cracked, every password
      leaks. Use a strong master + MFA.
    </p>
    <p>
      <strong>Session stealing:</strong> cookies grant access
      post-login. Strength doesn&rsquo;t help.
    </p>
    <p>
      Strong passwords matter. They&rsquo;re not the whole story.
    </p>

    <h2>Good passwords by use case</h2>
    <p>
      <strong>Master password for a password manager:</strong> 5+
      random words, memorable. Write it down somewhere physically
      safe. This is the one password you cannot forget.
    </p>
    <p>
      <strong>Per-service passwords:</strong> generated by your
      password manager, 16+ random characters. You don&rsquo;t
      memorize these.
    </p>
    <p>
      <strong>Offline / accounts without a manager:</strong> 4-word
      passphrase with a digit and symbol inserted — still
      memorable, still strong.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Trusting rule-based meters.</strong> &ldquo;Strong&rdquo;
      in the meter often means &ldquo;crackable in under an hour&rdquo;.
    </p>
    <p>
      <strong>Optimizing for theoretical entropy while reusing.</strong>
      {" "}Even the strongest password is weak if shared across
      services.
    </p>
    <p>
      <strong>Using personal info.</strong> Pet names, birthdays,
      addresses all in public data. Crackers know.
    </p>
    <p>
      <strong>Rotating passwords on a schedule.</strong> Without
      cause, rotation pushes users toward predictable variants.
      NIST now recommends rotating only after compromise.
    </p>
    <p>
      <strong>Ignoring length.</strong> An 8-char &ldquo;strong&rdquo;
      password is weaker than a 16-char all-lowercase phrase.
    </p>
    <p>
      <strong>Checking strength but not breach exposure.</strong>
      {" "}&ldquo;Strong&rdquo; in a breach is still compromised.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Measure the real strength of your password with the{" "}
      <a href="/tools/password-strength-checker">password strength checker</a>.
      Pair with the{" "}
      <a href="/tools/password-breach-checker">password breach checker</a>
      {" "}for exposure, and the{" "}
      <a href="/tools/password-generator">password generator</a> to
      create unique strong replacements.
    </p>
  </>
);
