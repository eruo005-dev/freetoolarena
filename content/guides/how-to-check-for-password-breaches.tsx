import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      If your password showed up in a known breach, attackers already
      have it. Checking against breach databases is a 10-second habit
      that prevents credential-stuffing takeovers — the single most
      common account-compromise vector. This guide covers how breach
      checks actually work (k-anonymity, no plaintext sent), what
      services like HaveIBeenPwned do, when to check passwords vs
      emails, what to do when a breach is found, and why checking
      doesn&rsquo;t replace using a password manager.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What a breach database is</h2>
    <p>
      When a service gets hacked, attackers often publish (or sell)
      the stolen user data. Sites like HaveIBeenPwned (HIBP) collect
      these leaks and make them searchable by email or password
      hash.
    </p>
    <p>
      HIBP currently holds 10+ billion leaked records from thousands
      of breaches — LinkedIn, Adobe, Yahoo, Dropbox, and many more.
      If your password shows up there, it&rsquo;s available to
      anyone running credential-stuffing attacks.
    </p>

    <h2>K-anonymity — how checking stays safe</h2>
    <p>
      You might hesitate to paste a password into any website, even
      one that claims to check it. Good news: you don&rsquo;t have
      to send it.
    </p>
    <p>
      HIBP&rsquo;s Pwned Passwords API uses{" "}
      <strong>k-anonymity</strong>:
    </p>
    <p>
      1. Your browser computes SHA-1 of your password locally.
    </p>
    <p>
      2. Send only the first 5 hex characters of the hash.
    </p>
    <p>
      3. HIBP returns every hash that starts with those 5 characters
      (usually a few hundred).
    </p>
    <p>
      4. Your browser checks locally whether your full hash matches
      any of them.
    </p>
    <p>
      HIBP never sees your full hash, let alone your password. Even
      if the response is intercepted, an attacker sees only a prefix
      — not enough to identify you.
    </p>
    <p>
      Any tool that uses k-anonymity is safe to use with real
      passwords. Tools that claim to check but require you to paste
      the full password to a server should be avoided.
    </p>

    <h2>Password-level vs email-level checks</h2>
    <p>
      Two different questions, two different answers.
    </p>
    <p>
      <strong>Password check:</strong> has this specific password
      ever appeared in any breach? Done via the k-anonymity API.
      Answers &ldquo;yes, 1,234,567 times&rdquo; or &ldquo;no&rdquo;.
    </p>
    <p>
      <strong>Email check:</strong> has this email appeared in any
      breach? Lookup by email. Tells you <em>which</em> services you
      had accounts on that got breached, plus what data was exposed
      (passwords, phone, address, etc.).
    </p>
    <p>
      Run both. Password check tells you if a password is reused
      and exposed. Email check tells you which accounts need
      specific action.
    </p>

    <h2>What the password check tells you</h2>
    <p>
      A hit means the password has been seen in breaches, possibly
      used by other people on other services. It doesn&rsquo;t
      necessarily mean <em>your</em> account was breached — common
      passwords (<code>password123</code>, <code>qwerty</code>) get
      millions of hits just because they&rsquo;re common.
    </p>
    <p>
      <strong>Any hit = don&rsquo;t use that password.</strong>{" "}
      Credential-stuffing attacks try known-exposed passwords against
      millions of email/password combos. You don&rsquo;t want to be
      one of them.
    </p>
    <p>
      <strong>Zero hits</strong> means the password isn&rsquo;t in
      any known breach. Doesn&rsquo;t mean it&rsquo;s <em>strong</em>
      {" "}— just unexposed. Strength and breach exposure are
      separate concerns.
    </p>

    <h2>What to do if your password is breached</h2>
    <p>
      <strong>Change it immediately</strong> on the affected service.
    </p>
    <p>
      <strong>Change it on every service where you reused it</strong>
      {" "}— this is the mainline attack path.
    </p>
    <p>
      <strong>Enable 2FA / MFA</strong> on any service that supports
      it. Breached password alone won&rsquo;t grant access if you
      have a second factor.
    </p>
    <p>
      <strong>Check the email-breach list</strong> to understand
      what specific data was exposed (phone, DoB, security answers)
      — you may need to rotate more than the password.
    </p>

    <h2>When email shows up in a breach</h2>
    <p>
      Different exposure classes have different severities:
    </p>
    <p>
      <strong>Email + password (plaintext or weak hash):</strong>{" "}
      highest urgency. Change everywhere.
    </p>
    <p>
      <strong>Email + password hash (bcrypt/argon2):</strong> lower
      urgency. Strong hashes are hard to crack, but still rotate on
      the affected service.
    </p>
    <p>
      <strong>Email + metadata (name, address, phone):</strong>{" "}
      lower urgency for account security, higher for phishing risk.
      Attackers can craft tailored phishing emails using leaked info.
    </p>
    <p>
      <strong>Email only:</strong> low urgency. You might get spam,
      but account access isn&rsquo;t directly at risk.
    </p>

    <h2>Why a password manager makes this easier</h2>
    <p>
      Breach checking and password management solve overlapping
      problems. A password manager:
    </p>
    <p>
      Generates unique passwords per site → breach of one service
      can&rsquo;t cascade.
    </p>
    <p>
      Many (1Password, Bitwarden, Dashlane) integrate HIBP-style
      breach checks automatically. You get alerted when a stored
      password appears in a new leak.
    </p>
    <p>
      Stores them securely so you don&rsquo;t need to memorize or
      reuse.
    </p>
    <p>
      <strong>Breach checking alone isn&rsquo;t enough.</strong> It
      tells you when to rotate; a password manager tells you how to
      rotate without reusing.
    </p>

    <h2>Automating regular checks</h2>
    <p>
      One-time checks are a start. Ongoing monitoring is better.
    </p>
    <p>
      <strong>HIBP notifications:</strong> subscribe your email and
      get notified when new breaches appear involving that email.
    </p>
    <p>
      <strong>1Password Watchtower, Bitwarden Reports, Dashlane
      Dark Web Monitoring:</strong> run continuously against your
      stored credentials.
    </p>
    <p>
      <strong>Browser integrations:</strong> Chrome, Firefox, and
      Safari all have built-in breach warnings. Don&rsquo;t disable
      them.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Pasting passwords into a non-k-anonymity site.</strong>
      {" "}You just gave them your password. Check the tool&rsquo;s
      method first.
    </p>
    <p>
      <strong>Only checking once.</strong> New breaches happen
      monthly. Subscribe to notifications.
    </p>
    <p>
      <strong>Ignoring zero-hit results.</strong> Zero exposure
      doesn&rsquo;t mean the password is strong. Low entropy
      passwords get cracked even without a breach.
    </p>
    <p>
      <strong>Rotating only the breached service.</strong> If you
      reused the password, every site is at risk.
    </p>
    <p>
      <strong>Treating MFA as optional.</strong> MFA is the
      strongest control; turn it on for every account that supports
      it, especially email and banking.
    </p>
    <p>
      <strong>Forgetting security questions.</strong> &ldquo;Mother&rsquo;s
      maiden name&rdquo; is often leaked alongside the password.
      Treat answers as passwords — unique and unguessable.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Check whether a password is in known breaches with the{" "}
      <a href="/tools/password-breach-checker">password breach checker</a>.
      Pair with the{" "}
      <a href="/tools/password-strength-checker">password strength checker</a>
      {" "}to ensure the replacement is strong, and the{" "}
      <a href="/tools/password-generator">password generator</a> to
      create a unique replacement.
    </p>
  </>
);
