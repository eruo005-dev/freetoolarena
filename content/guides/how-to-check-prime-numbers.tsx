import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A prime number is a natural number greater than 1 whose only divisors are 1 and itself.
      That definition takes three seconds to state and sits underneath most of modern
      cryptography, a large slice of number theory, hashing tricks, random-number seeding,
      and a handful of algorithms that would otherwise be unimplementable. Checking whether
      a number is prime sounds easy and is easy for small values&mdash;but as numbers grow into
      the dozens of digits, naive approaches become hopelessly slow. Modern primality testing
      uses probabilistic algorithms like Miller-Rabin to decide &ldquo;probably prime&rdquo; in
      milliseconds for 2,048-bit numbers, which is what makes RSA and related systems practical.
      This guide covers the definition, trial division, the Sieve of Eratosthenes, Fermat and
      Miller-Rabin tests, Mersenne primes, and where primes appear in everyday software.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The definition, with edge cases</h2>
    <p>
      A prime <em>p</em> is a natural number greater than 1 with exactly two distinct positive
      divisors: 1 and <em>p</em>. By this definition, 2 is prime (divisors 1 and 2), 3 is prime,
      4 is not (1, 2, 4), 5 is prime, and so on. <strong>1 is not prime.</strong> Neither are 0
      or negative numbers. The exclusion of 1 is a convention that makes the Fundamental
      Theorem of Arithmetic (unique prime factorization) work cleanly.
    </p>
    <pre>{`Primes under 30: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29

Note: 2 is the only even prime.
All other primes are odd.`}</pre>

    <h2>Trial division</h2>
    <p>
      The textbook check: to test whether <em>n</em> is prime, try dividing by every integer
      from 2 up to <code>&radic;n</code>. If none divide evenly, <em>n</em> is prime. You only
      need to go up to the square root because any divisor larger than <code>&radic;n</code>
      must pair with one smaller than <code>&radic;n</code>.
    </p>
    <pre>{`Is 97 prime?
  √97 ≈ 9.85, so test divisors 2, 3, 5, 7
  97 / 2 = 48.5    no
  97 / 3 = 32.33   no
  97 / 5 = 19.4    no
  97 / 7 = 13.86   no
  → 97 is prime ✓

Optimization: test only 2, then odd numbers 3, 5, 7, 9...`}</pre>
    <p>
      Trial division is O(&radic;n), which is fine for numbers up to maybe 10<sup>14</sup>. For
      20-digit numbers it&rsquo;s too slow. For cryptographic 600-digit numbers it&rsquo;s
      absurd&mdash;you&rsquo;d wait longer than the age of the universe.
    </p>

    <h2>The Sieve of Eratosthenes</h2>
    <p>
      When you want <em>all</em> primes below some limit <em>N</em>, trial-dividing each number
      separately wastes work. The sieve builds them all at once: write out 2 through <em>N</em>,
      circle 2, cross out every multiple of 2, circle the next unmarked number (3), cross out
      every multiple of 3, and so on. Whatever&rsquo;s circled at the end is prime.
    </p>
    <pre>{`Sieve up to 30:
  Start: 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
  After 2: cross 4,6,8,10,...
  After 3: cross 9,15,21,27
  After 5: cross 25
  Stop at √30 ≈ 5.5

  Primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29`}</pre>
    <p>
      The sieve runs in O(N log log N) time and O(N) memory. For N up to 10<sup>8</sup>
      it&rsquo;s the right algorithm; beyond that, segmented sieves or specialized tests are
      better.
    </p>

    <h2>Fermat&rsquo;s little theorem</h2>
    <p>
      If <em>p</em> is prime and <em>a</em> is not divisible by <em>p</em>, then
      <code> a<sup>p-1</sup> &equiv; 1 (mod p)</code>. You can flip this into a probabilistic
      test: pick a random <em>a</em>, compute <code>a<sup>n-1</sup> mod n</code>, and if the
      result isn&rsquo;t 1, <em>n</em> is definitely composite. Unfortunately, some composites
      (Carmichael numbers) pass the Fermat test for every <em>a</em>, so this alone
      isn&rsquo;t enough.
    </p>

    <h2>Miller-Rabin</h2>
    <p>
      Miller-Rabin is the workhorse primality test for large numbers. It refines the Fermat
      test by examining the square root structure of <code>a<sup>n-1</sup></code>. Each round
      with a random witness <em>a</em> either proves <em>n</em> composite or says &ldquo;probably
      prime.&rdquo; After <em>k</em> rounds, the probability of wrongly declaring a composite
      prime drops to at most <code>4<sup>-k</sup></code>. Forty rounds gives you a one-in-
      10<sup>24</sup> error rate, which is less than the chance of hardware failure.
    </p>

    <h2>Deterministic variants</h2>
    <p>
      For numbers below certain thresholds, specific small sets of witnesses turn Miller-Rabin
      into a deterministic test. For <em>n</em> &lt; 3,317,044,064,679,887,385,961,981,
      testing the first 13 primes as witnesses is provably correct. AKS (2002) was the first
      fully polynomial-time deterministic primality test, but it&rsquo;s much slower than
      Miller-Rabin in practice.
    </p>

    <h2>Mersenne primes</h2>
    <p>
      A <strong>Mersenne number</strong> is <code>M<sub>p</sub> = 2<sup>p</sup> &minus; 1</code>.
      When <em>p</em> itself is prime and <code>M<sub>p</sub></code> is also prime, it&rsquo;s
      a Mersenne prime. Examples: 3 (2<sup>2</sup>&minus;1), 7 (2<sup>3</sup>&minus;1), 31
      (2<sup>5</sup>&minus;1), 127 (2<sup>7</sup>&minus;1). The Great Internet Mersenne Prime
      Search (GIMPS) hunts for new ones and discovered the largest known prime as of recent
      years (over 24 million digits). Mersenne primes are tested with the Lucas-Lehmer test,
      which is specialized for this form.
    </p>

    <h2>Why primes matter for cryptography</h2>
    <p>
      RSA encryption relies on the fact that multiplying two large primes is cheap but factoring
      the product back into primes is hard. A 2,048-bit RSA key uses two primes of about 1,024
      bits each; finding them takes a few seconds with Miller-Rabin, but factoring their
      product takes centuries with known algorithms. Elliptic-curve cryptography uses primes
      to define field arithmetic. Diffie-Hellman uses them to define groups. If large
      primality testing were slow, modern HTTPS would be slow.
    </p>

    <h2>Primes in everyday software</h2>
    <p>
      Hash table sizes are often primes to minimize collision patterns. Linear congruential
      random number generators use primes as moduli. Cuckoo hashing and Bloom filters use
      multiple hash functions whose properties depend on prime parameters. Database
      partitioning functions sometimes mod by a prime. If you&rsquo;ve ever seen array sizes
      like 997, 10007, or 1000003 in library code, that&rsquo;s a prime chosen for hash
      distribution.
    </p>

    <h2>The prime counting function</h2>
    <p>
      <code>&pi;(N)</code> denotes the number of primes less than or equal to <em>N</em>. The
      Prime Number Theorem says <code>&pi;(N) ~ N / ln(N)</code>. For N = 1,000,000,{" "}
      <code>&pi;(N) = 78,498</code>, close to the prediction 72,382. Primes thin out as numbers
      grow, but they never stop&mdash;Euclid proved there are infinitely many.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Calling 1 prime.</strong> 1 is the multiplicative identity; it has only one
      divisor. Excluding it is a deliberate choice to make unique factorization work.
    </p>
    <p>
      <strong>Calling 2 composite because it&rsquo;s even.</strong> 2 is the only even prime.
      All other primes are odd, but 2 itself is prime.
    </p>
    <p>
      <strong>Stopping trial division at n/2 instead of &radic;n.</strong> Factors come in pairs
      around &radic;n. Testing past &radic;n is redundant work; stopping before it misses no
      factors.
    </p>
    <p>
      <strong>Assuming Fermat test alone is enough.</strong> Carmichael numbers (561, 1105,
      1729, ...) pass Fermat for every coprime witness. Miller-Rabin fixes this by checking
      square root structure, which Carmichael numbers cannot fake.
    </p>
    <p>
      <strong>Using a small number of Miller-Rabin rounds for crypto.</strong> For
      general-purpose checking, 20 rounds is overkill. For cryptographic prime generation, use
      40+ rounds or deterministic witness sets.
    </p>
    <p>
      <strong>Trusting naive trial division on huge numbers.</strong> A 20-digit number has
      &radic;n near 10<sup>10</sup>&mdash;roughly 10 billion trial divisions. Miller-Rabin does
      the same job in milliseconds.
    </p>
    <p>
      <strong>Confusing &ldquo;probably prime&rdquo; with &ldquo;prime.&rdquo;</strong>
      Probabilistic tests have a tiny but nonzero error rate. For cryptographic use, the error
      rate is negligible; for mathematical proofs, you need a deterministic test.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Stop doing trial division by hand; our{" "}
      <a href="/tools/prime-number-checker">prime number checker</a> handles both small numbers
      with trial division and large inputs with Miller-Rabin. Pair it with the{" "}
      <a href="/tools/average-calculator">average calculator</a> when you&rsquo;re analyzing
      the distribution of primes in a range, and the{" "}
      <a href="/tools/base64-encoder-decoder">Base64 encoder</a> for the cryptographic adjacent
      problem of moving large integer values through text protocols.
    </p>
  </>
);
