import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Most compromised accounts aren&rsquo;t the result of a
      sophisticated hack — they&rsquo;re the result of weak passwords
      reused across sites. When one site leaks credentials (and
      several leak every year), those credentials get tried against
      every major service. This guide walks through what makes a
      password actually strong in 2026, where password managers fit,
      how passkeys are changing the landscape, and the five password
      mistakes still costing people their accounts.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What makes a password strong — the math</h2>
    <p>
      Password strength is measured in entropy (bits). The higher the
      entropy, the longer a brute-force attack takes.
    </p>
    <p>
      <strong>8 characters, lowercase only (26^8):</strong> ~5 hours
      to crack on modern GPU cluster.
    </p>
    <p>
      <strong>8 characters, mixed case + digits + symbols (~95^8):</strong>
      ~2 months.
    </p>
    <p>
      <strong>12 characters, mixed case + digits + symbols:</strong>
      ~34,000 years.
    </p>
    <p>
      <strong>16 characters, mixed case + digits + symbols:</strong>
      effectively unbreakable by brute force.
    </p>
    <p>
      Lesson: length beats complexity. 16 random characters is better
      than 10 complex characters with mixed case/symbols.
    </p>

    <h2>The 2026 password rules (NIST-aligned)</h2>
    <p>
      Modern guidance from NIST SP 800-63B:
    </p>
    <p>
      <strong>Minimum 12 characters</strong> for sensitive accounts
      (banking, email, primary identity). 15+ for accounts protecting
      high-value assets.
    </p>
    <p>
      <strong>No mandatory complexity rules.</strong> NIST explicitly
      removed the old &ldquo;must have an uppercase, a digit, and a
      symbol&rdquo; rule because it produced predictable patterns
      like &ldquo;Password1!&rdquo; without real entropy gains.
    </p>
    <p>
      <strong>No mandatory periodic changes.</strong> The old
      &ldquo;change every 90 days&rdquo; rule pushed users toward
      tiny increments (Password1 → Password2). Now guidance is
      change only on compromise.
    </p>
    <p>
      <strong>Check against breach lists.</strong> Before accepting,
      validate the password hasn&rsquo;t appeared in known data
      breaches (HaveIBeenPwned API or similar).
    </p>
    <p>
      <strong>Allow long passwords and paste.</strong> Blocking paste
      prevents password-manager usage, which is worse for security.
    </p>

    <h2>Passphrases vs passwords</h2>
    <p>
      A passphrase is 4-6 random words: &ldquo;correct horse battery
      staple&rdquo; (xkcd-famous example). Advantages:
    </p>
    <p>
      <strong>Memorable.</strong> Humans remember words better than
      characters.
    </p>
    <p>
      <strong>High entropy.</strong> 5 random words from a 7,776-word
      list (EFF wordlist) = 64 bits of entropy. Equivalent to a
      ~11-character random password.
    </p>
    <p>
      <strong>Typeable on mobile.</strong> Much faster than complex
      symbol-heavy passwords.
    </p>
    <p>
      Critical requirement: words must be <em>truly</em> random. A
      phrase that&rsquo;s meaningful to you (&ldquo;mycatsnamedwhiskers&rdquo;)
      is weak — meaningful strings appear in cracking dictionaries.
    </p>

    <h2>Password manager — yes, use one</h2>
    <p>
      Password managers solve the fundamental impossibility of
      remembering 100+ unique strong passwords. Let the manager
      generate random 16-20 character passwords per site and store
      them.
    </p>
    <p>
      <strong>Reputable options (2026):</strong> 1Password, Bitwarden
      (free tier is solid), Dashlane. Avoid Last Pass for now —
      multiple 2022-2023 incidents have dented trust.
    </p>
    <p>
      <strong>Browser-built-in managers</strong> (Chrome, Safari,
      Firefox) are OK for casual use but weaker on cross-device sync,
      breach alerts, and sharing features.
    </p>
    <p>
      <strong>Your master password</strong> is now the most important
      password you have. Make it a long passphrase, unique, never
      used anywhere else, never written in plaintext. The manager
      can&rsquo;t recover it for you — if you forget, your vault is
      unreadable.
    </p>

    <h2>Two-factor / multi-factor authentication (MFA)</h2>
    <p>
      Even the strongest password is compromised if the site is
      breached. MFA requires a second factor — something you have
      (phone, hardware key) in addition to something you know
      (password).
    </p>
    <p>
      <strong>SMS codes:</strong> better than nothing, but
      SIM-swapping attacks make them insecure for high-value
      accounts. Don&rsquo;t rely on SMS for email, banking, or
      crypto.
    </p>
    <p>
      <strong>TOTP apps</strong> (Authy, Google Authenticator, 1Password
      has built-in): 6-digit codes rotating every 30 seconds. Good
      baseline.
    </p>
    <p>
      <strong>Hardware keys (YubiKey, Titan):</strong> strongest
      form. Phishing-resistant because the key cryptographically
      verifies the domain. Worth owning two (one primary, one
      backup) for critical accounts.
    </p>

    <h2>Passkeys — where things are heading</h2>
    <p>
      Passkeys replace passwords entirely with cryptographic key pairs
      stored on your device (phone, laptop, hardware key). You
      authenticate with biometrics; the device signs a challenge.
    </p>
    <p>
      <strong>Advantages:</strong> unphishable (tied to domain),
      nothing for a breach to leak, no typing, no remembering.
    </p>
    <p>
      <strong>Adoption in 2026:</strong> Google, Apple, Microsoft all
      support them. Major sites (Amazon, PayPal, GitHub, 1Password)
      offer passkey login. Still optional on most sites; password
      fallback remains.
    </p>
    <p>
      When a site offers passkey as an option, adopt it. It&rsquo;s
      strictly more secure and more convenient than a password.
    </p>

    <h2>5 password mistakes still costing people accounts</h2>
    <p>
      <strong>1. Password reuse.</strong> The single biggest cause
      of account compromise. One breached site = every account using
      the same password exposed via credential stuffing. Check
      yourself at haveibeenpwned.com.
    </p>
    <p>
      <strong>2. Using personal info.</strong> Pets, birthdays,
      addresses are in your public profile and tried early in
      attacks.
    </p>
    <p>
      <strong>3. Substitutions (@ for a, 3 for e).</strong> Common
      substitutions are baked into cracking tools. &ldquo;P@ssw0rd&rdquo;
      offers essentially zero extra protection over
      &ldquo;password.&rdquo;
    </p>
    <p>
      <strong>4. Writing passwords in notes apps / emails / docs.</strong>
      Searchable, syncable, and often accessed from many devices
      including untrusted ones. Use a password manager.
    </p>
    <p>
      <strong>5. Weak security questions.</strong> &ldquo;Mother&rsquo;s
      maiden name&rdquo; is often public record or a social-media
      share. Answer security questions with random strings stored in
      your manager, not the truthful answer.
    </p>

    <h2>Password recovery plan</h2>
    <p>
      Lock yourself out of the password manager and you&rsquo;re
      locked out of everything. Plan:
    </p>
    <p>
      <strong>Backup codes</strong> for MFA, printed and stored
      physically (safe, safe deposit box).
    </p>
    <p>
      <strong>Second hardware key</strong> registered on critical
      accounts in case the primary is lost.
    </p>
    <p>
      <strong>Emergency access feature</strong> (1Password, Bitwarden
      offer this) granting a trusted person access after a delay.
    </p>
    <p>
      <strong>Recovery kit</strong> for the password manager itself,
      stored offline.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate strong random passwords with the{" "}
      <a href="/tools/password-generator">password generator</a>.
      Pair with the{" "}
      <a href="/tools/password-breach-checker">password breach
      checker</a> to confirm your passwords haven&rsquo;t appeared in
      known leaks, and the{" "}
      <a href="/tools/password-strength-checker">password strength
      checker</a> to gauge entropy before adopting a password.
    </p>
  </>
);
