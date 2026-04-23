import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      JSON Web Tokens are everywhere — OAuth flows, API auth, session
      management, service-to-service calls. They&rsquo;re also one of
      the most-misused pieces of auth infrastructure. The spec is
      small; the mistakes are many: storing secrets in the payload,
      trusting the &ldquo;alg&rdquo; header, leaving tokens alive too
      long, shipping them to localStorage where any XSS can steal them.
      This guide walks through what a JWT actually is, how to verify
      one properly, the security pitfalls with real-world consequences,
      and when to use JWTs vs. a plain session.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The anatomy — three parts, dot-separated</h2>
    <p>
      A JWT looks like <code>xxxxx.yyyyy.zzzzz</code>. Each segment is
      Base64URL-encoded.
    </p>
    <p>
      <strong>Header</strong> (first segment): JSON describing the
      signing algorithm (alg) and token type (typ). Example:
      {` {"alg":"HS256","typ":"JWT"}`}.
    </p>
    <p>
      <strong>Payload</strong> (second segment): JSON with claims — the
      actual data the token carries. Standard claims: iss (issuer),
      sub (subject), aud (audience), exp (expiration), iat (issued at),
      nbf (not before), jti (JWT ID).
    </p>
    <p>
      <strong>Signature</strong> (third segment): cryptographic proof
      that the token hasn&rsquo;t been tampered with. Computed over
      header + payload using a secret (HMAC) or private key (RSA/
      ECDSA).
    </p>
    <p>
      Crucial: <strong>the payload is not encrypted.</strong> It&rsquo;s
      just Base64-encoded. Anyone with the token can read the claims.
      Never put secrets, passwords, or PII you don&rsquo;t want
      exposed in a JWT payload.
    </p>

    <h2>How signing works — HS256 vs RS256</h2>
    <p>
      <strong>HS256 (HMAC with SHA-256):</strong> symmetric — the same
      secret signs and verifies. Fast, simple. Problem: every service
      that verifies needs the secret, and anyone with the secret can
      mint tokens. Use for simple setups where one party signs and
      verifies.
    </p>
    <p>
      <strong>RS256 (RSA with SHA-256) / ES256 (ECDSA):</strong>
      asymmetric — private key signs, public key verifies. Issuer holds
      private key; consumers only need the public key. The choice for
      multi-service or third-party consumption.
    </p>
    <p>
      <strong>Rule:</strong> if more than one service needs to verify
      tokens, use RS256 and distribute the public key (typically via a
      JWKS endpoint). Don&rsquo;t share HS256 secrets across teams or
      services.
    </p>

    <h2>The &ldquo;alg: none&rdquo; attack</h2>
    <p>
      Historic vulnerability: some JWT libraries accepted tokens with
      <code> alg: &quot;none&quot;</code> and skipped signature
      verification. An attacker crafts a token with arbitrary claims
      and no signature; a vulnerable server accepts it.
    </p>
    <p>
      <strong>Defense:</strong> always specify the expected algorithm
      in your verify call. <code>jwt.verify(token, secret,
      {` { algorithms: ['RS256'] }`})</code>. Never let the server
      trust the alg header from the token itself.
    </p>
    <p>
      Related: the &ldquo;HMAC with public key as secret&rdquo; attack.
      Server expects RS256 (public key verifies); attacker sends HS256
      token signed with the server&rsquo;s public key as the secret;
      vulnerable libraries use the public key as an HMAC secret and
      verify. Fix: lock algorithms explicitly.
    </p>

    <h2>Expiration — the most-overlooked field</h2>
    <p>
      A JWT without <strong>exp</strong> is a bearer credential that
      never dies. Set an expiration on every token.
    </p>
    <p>
      <strong>Access tokens:</strong> short-lived. 5-15 minutes. If
      leaked, the damage window is small.
    </p>
    <p>
      <strong>Refresh tokens:</strong> longer (hours to days). Used
      only to get new access tokens. Stored more carefully (httpOnly
      cookie, not localStorage). Revokable.
    </p>
    <p>
      <strong>Clock skew:</strong> accept tokens issued up to ~60
      seconds in the future to tolerate clock differences between
      issuer and verifier. Most libraries have a clock-tolerance
      option.
    </p>

    <h2>Storage — the front-end question</h2>
    <p>
      <strong>localStorage:</strong> easy, but any XSS vulnerability
      steals the token instantly. Avoid for anything sensitive.
    </p>
    <p>
      <strong>sessionStorage:</strong> cleared on tab close. Same XSS
      risk as localStorage.
    </p>
    <p>
      <strong>httpOnly, Secure, SameSite=Lax cookie:</strong> not
      accessible from JavaScript, survives tab close, automatically
      sent on same-site requests. Best default for web apps.
    </p>
    <p>
      <strong>In-memory (JavaScript variable):</strong> lost on page
      reload but safest from XSS. Often paired with a refresh-token
      cookie to silently restore auth.
    </p>
    <p>
      For mobile apps: secure enclave (iOS Keychain, Android Keystore).
      Never plain SharedPreferences or UserDefaults for tokens.
    </p>

    <h2>JWT vs server-side sessions — when to pick which</h2>
    <p>
      <strong>Server-side sessions</strong> (session ID cookie + server
      store): revocable instantly, invisible to client, simple. Use
      for most monoliths and same-origin web apps.
    </p>
    <p>
      <strong>JWT:</strong> stateless verification, distributable,
      scales horizontally without a session store. Use when you need
      multiple services to verify auth without talking to a central
      store, or when issuing tokens to third-party consumers (APIs,
      OAuth integrations).
    </p>
    <p>
      A classic mistake: using JWT for an app with a single backend
      and no cross-service needs. You get all the downsides (hard to
      revoke, token-bloat claims) with none of the benefits.
    </p>

    <h2>Revocation — the hard problem</h2>
    <p>
      Stateless tokens can&rsquo;t easily be revoked. If a token
      leaks, short expirations are your main defense.
    </p>
    <p>
      For true revocation, options:
    </p>
    <p>
      <strong>Denylist:</strong> maintain a list of revoked jti values
      in Redis until they naturally expire. Gives revocation but adds
      a network call per verify.
    </p>
    <p>
      <strong>Short expiration + refresh token:</strong> access tokens
      expire quickly (5-15 min); refresh tokens can be revoked on
      logout. Revocation propagates within the access-token lifetime.
    </p>
    <p>
      <strong>User-level version counter:</strong> include a
      &ldquo;session version&rdquo; in the JWT; server bumps the
      version on logout/password-change; tokens with old versions
      rejected. Still requires a lookup but minimal.
    </p>

    <h2>Claim validation — don&rsquo;t trust the decode</h2>
    <p>
      Verifying the signature is only step one. After signature
      passes, validate:
    </p>
    <p>
      <strong>exp:</strong> token not expired.
    </p>
    <p>
      <strong>nbf:</strong> token already usable.
    </p>
    <p>
      <strong>iss:</strong> issued by the expected party.
    </p>
    <p>
      <strong>aud:</strong> intended for your service. Critical for
      multi-service setups — a token issued for service A should not
      authenticate to service B.
    </p>
    <p>
      <strong>sub:</strong> identifies the user, but verify the user
      still exists and is active (banned, deleted, password-changed
      accounts).
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>1. Putting secrets in the payload.</strong> Passwords,
      API keys, private data. The payload is readable by anyone.
    </p>
    <p>
      <strong>2. Using weak HS256 secrets.</strong> &ldquo;secret&rdquo;
      or &ldquo;changeme&rdquo; are brute-forceable. Use a 256+ bit
      random secret.
    </p>
    <p>
      <strong>3. Not rotating keys.</strong> Keys leak over time.
      Rotate periodically; use a kid (key ID) in the header to support
      multiple active keys during rotation.
    </p>
    <p>
      <strong>4. Logging tokens.</strong> Tokens in access logs,
      Sentry breadcrumbs, or error reports are a data leak. Scrub
      Authorization headers and JWT-looking strings from telemetry.
    </p>
    <p>
      <strong>5. Treating unsigned tokens as valid.</strong> Parse-
      without-verify code paths (for &ldquo;just reading the
      claims&rdquo;) accidentally get used for authorization decisions.
      Separate decode-only vs. verify-and-trust code paths.
    </p>
    <p>
      <strong>6. Accepting tokens in URL parameters.</strong> URLs end
      up in browser history, server logs, referrers. Always send in
      Authorization header or cookie.
    </p>

    <h2>The quick &ldquo;is my JWT OK&rdquo; checklist</h2>
    <p>
      Signed with RS256 or HS256 (not &ldquo;none&rdquo;).
    </p>
    <p>
      Has exp. Ideally short (minutes for access tokens).
    </p>
    <p>
      Payload has no secrets.
    </p>
    <p>
      Verifier explicitly specifies expected algorithm.
    </p>
    <p>
      aud / iss validated.
    </p>
    <p>
      Transported via Authorization header or secure cookie.
    </p>
    <p>
      Refresh-token revocation path exists.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Inspect the claims inside any JWT with the{" "}
      <a href="/tools/jwt-decoder">JWT decoder</a>. Pair with the{" "}
      <a href="/tools/base64-encoder-decoder">Base64 encoder/decoder</a>
      {" "}for manual segment decoding, and the{" "}
      <a href="/tools/hash-generator">hash generator</a> when generating
      or comparing HMAC signatures for HS256 tokens.
    </p>
  </>
);
