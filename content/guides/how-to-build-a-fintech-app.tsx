import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Building a fintech app is not building a SaaS app with a Stripe integration. It&rsquo;s building a
    regulated financial institution disguised as software &mdash; with bank partners, compliance auditors,
    fraud analysts, and lawyers who all have veto power over your roadmap. Get the stack right and you can
    launch in 6&ndash;9 months. Get it wrong and you&rsquo;ll burn 18 months before writing a line of
    differentiated code.
  </p>
);

export const body: ReactElement = (
  <>
    <p>
      Not financial advice. Consult a licensed advisor. Fintech touches banking law, securities regulation,
      tax, and consumer protection simultaneously &mdash; founders need fintech counsel from day one, not
      day 300.
    </p>

    <h2>Regulations come first, not last</h2>
    <p>
      In the US, moving money across state lines requires a money transmitter license &mdash; 50 states,
      50 applications, roughly $1&ndash;5M in surety bonds and legal fees to cover them all. Holding
      customer deposits requires a bank partner because you almost certainly won&rsquo;t charter your own
      bank. Lending requires state-by-state lender licenses plus Truth in Lending Act disclosures.
      Investments pull in SEC and FINRA. Map your product to the regulatory surface before writing code,
      because the legal path dictates the technical architecture.
    </p>

    <h2>Bank-as-a-service partners</h2>
    <ul>
      <li>Unit &mdash; full banking stack, strong for neobanks and embedded accounts.</li>
      <li>Synctera &mdash; bank sponsorship marketplace for specific use cases.</li>
      <li>Treasury Prime &mdash; multi-bank platform, good for redundancy.</li>
      <li>Column &mdash; developer-focused, direct bank (not middleware).</li>
      <li>Bond (now part of FIS) and Mercury for treasury-style accounts.</li>
      <li>Plaid, Finicity, and MX for account linking and data aggregation (not deposits).</li>
    </ul>

    <h2>Money movement is genuinely hard</h2>
    <p>
      ACH is cheap but takes 1&ndash;3 business days and reverses easily. RTP and FedNow are instant but
      adoption is partial. Wires are fast and final but expensive. Card rails (Visa, Mastercard) have
      chargeback exposure for up to 120 days and interchange fees of 1.5&ndash;3%. Each rail has its own
      failure modes, reconciliation patterns, and fraud profile. Building a payments product means picking
      the rail that matches your use case &mdash; not the one with the best API docs.
    </p>

    <h2>KYC, AML, and PCI</h2>
    <p>
      Know Your Customer and anti-money-laundering checks are not optional. Onfido, Persona, Socure, and
      Alloy handle identity verification and sanctions screening. You&rsquo;ll file Suspicious Activity
      Reports, maintain a BSA officer, and keep a five-year audit trail on every transaction. If you touch
      card data directly, PCI-DSS compliance kicks in &mdash; most startups avoid this by tokenizing with
      Stripe, Marqeta, or Lithic so card numbers never hit your infrastructure.
    </p>

    <h2>Fraud and liability</h2>
    <p>
      Fraud is relentless and adversarial. Expect account-takeover attempts, synthetic identity fraud, and
      transaction laundering from week one. Defensive layers: 3D Secure for card-not-present, device
      fingerprinting (Sift, Fingerprint), velocity limits, and real-time ML scoring. Chargebacks on card
      transactions eat 0.5&ndash;2% of revenue in consumer fintech and can push you into high-risk merchant
      categories if your ratio exceeds 1%. Liability for unauthorized transactions usually falls on you,
      not the customer, under Regulation E.
    </p>

    <h2>Bootstrapping paths</h2>
    <p>
      Two proven entry points for small teams: the vertical neobank (pick an underserved niche &mdash;
      truckers, creators, immigrants &mdash; and build the full stack for them) or the vertical SaaS with
      embedded payments (sell software to a specific industry and layer payments on top, which gives you
      distribution without needing to own the full banking stack). The second path is lower-regulation,
      faster to revenue, and increasingly preferred by investors.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Underestimating compliance cost &mdash; expect $200k&ndash;$500k in year one for licenses, audits, and
      counsel. Launching without a bank partner in place, then scrambling when the first transaction needs
      to settle. Skipping the audit trail &mdash; regulators will ask for a specific transaction from 2019
      and you&rsquo;d better have it. Over-indexing on product velocity and treating compliance as a
      blocker rather than a product requirement.
    </p>

    <h2>Bottom line</h2>
    <p>
      Fintech is a regulated-business-first discipline with a software layer on top. Pick your bank partner,
      hire or contract fintech counsel, scope KYC/AML from the first wireframe, and design for fraud before
      launch. The companies that win in this space aren&rsquo;t the fastest shippers &mdash; they&rsquo;re
      the ones who treat compliance as a competitive moat.
    </p>
  </>
);
