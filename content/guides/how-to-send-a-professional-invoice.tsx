import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      An invoice is a legal document that asks for money, triggers
      accounting entries, and records the terms of a sale. A sloppy
      invoice takes longer to get paid, creates tax problems, and
      occasionally ends up disputed. This guide walks through every
      field that should be on a proper invoice, the formatting that
      gets paid fastest, and the payment-terms tactics that move DSO
      from 45 days to 18.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The 10 fields every invoice needs</h2>
    <p>
      <strong>(1) The word &ldquo;Invoice.&rdquo;</strong> Seems
      obvious. A document titled &ldquo;Statement&rdquo; or
      &ldquo;Receipt&rdquo; may get routed differently by the
      customer&rsquo;s AP system. &ldquo;Invoice&rdquo; is the magic
      word.
    </p>
    <p>
      <strong>(2) Invoice number.</strong> Sequential, unique. INV-
      2026-0142 format works. Required for your own accounting and
      for any client using a PO-matched AP system.
    </p>
    <p>
      <strong>(3) Issue date and due date.</strong> Both explicit. Not
      &ldquo;Net 30&rdquo; — an actual due date (&ldquo;Due: June 15,
      2026&rdquo;). Clients process faster when they don&rsquo;t
      have to calculate.
    </p>
    <p>
      <strong>(4) Your business details.</strong> Legal business name,
      address, tax ID (EIN in US, VAT number in EU/UK), phone, email.
      If you operate under a DBA, include both.
    </p>
    <p>
      <strong>(5) Client details.</strong> Legal entity (not just
      &ldquo;John&rdquo; — &ldquo;Acme Corp Inc.&rdquo;), billing
      address, AP contact name, AP email. Wrong billing address is
      a top-3 cause of invoice delays.
    </p>
    <p>
      <strong>(6) Line items.</strong> Each item: description,
      quantity, unit price, extended amount. Specific descriptions
      (&ldquo;Web design services — April 2026&rdquo;) beat vague
      ones (&ldquo;services rendered&rdquo;) because AP teams need
      context to approve quickly.
    </p>
    <p>
      <strong>(7) Subtotal, tax, total.</strong> Show each separately.
      Total should be in a larger font — the AP team scans for it.
    </p>
    <p>
      <strong>(8) Payment terms.</strong> Net 15 / 30 / 60, early-pay
      discount if offered (&ldquo;2/10 net 30&rdquo; = 2% off if paid
      within 10 days, else full amount due in 30).
    </p>
    <p>
      <strong>(9) Payment methods and instructions.</strong> ACH
      details, wire instructions, check mailing address, Stripe or
      PayPal link. Make it easy — an invoice with only &ldquo;check
      payable to...&rdquo; gets paid slower than one with
      ACH + credit-card options.
    </p>
    <p>
      <strong>(10) PO number (if applicable).</strong> If the client
      issued a PO, it must match. No PO on the invoice = no payment
      from a big-company AP system.
    </p>

    <h2>Professional formatting rules</h2>
    <p>
      PDF, not Word or Google Doc. Lockable, non-editable, consistent
      rendering.
    </p>
    <p>
      One page. If you need more, summarize line items and attach a
      detail sheet. Many AP systems cap at one page for auto-routing.
    </p>
    <p>
      Your logo at the top, small. Professional appearance matters
      more than you&rsquo;d think — a logo-less Word doc looks like
      an individual; a branded PDF looks like a real business that
      will follow up.
    </p>
    <p>
      Clear font. Arial or a similar sans-serif at 10–11pt for body,
      14pt+ for the invoice total. Decorative fonts signal amateur.
    </p>

    <h2>Payment terms — what to ask for, and what you&rsquo;ll get</h2>
    <p>
      <strong>Net 15</strong> — aggressive. Some small clients will
      pay this; most enterprise won&rsquo;t, because their AP cycles
      are monthly.
    </p>
    <p>
      <strong>Net 30</strong> — industry standard. Default unless
      you know otherwise.
    </p>
    <p>
      <strong>Net 60, Net 90</strong> — imposed by large enterprises.
      You can sometimes negotiate down but rarely fully.
    </p>
    <p>
      <strong>Deposit + milestone payments</strong> — for project
      work &gt;$10k. Typical: 30% on contract signing, 30% at
      milestone, 40% on delivery. Reduces your risk of working
      uncompensated if the engagement sours.
    </p>
    <p>
      <strong>Retainer</strong> — fixed monthly, paid at the start of
      each period. Best cash flow structure if you can get it.
    </p>

    <h2>Early-pay discount math (2/10 net 30)</h2>
    <p>
      Offering 2% off for payment within 10 days (instead of the full
      30-day window) is equivalent to a ~36% annualized discount
      rate. Steep but it works: many AP teams are incentivized to
      capture early-pay discounts, and you get paid 20 days sooner.
    </p>
    <p>
      Good tactic when: you need faster cash, you&rsquo;re billing
      larger amounts, or your cost of capital (or your line of
      credit rate) is high.
    </p>
    <p>
      Bad tactic when: most of your invoices are small, the 2% is
      meaningful to your margin, or your clients usually pay on
      time anyway.
    </p>

    <h2>Send-day tactics to get paid faster</h2>
    <p>
      <strong>Send Tuesday or Wednesday morning.</strong> Monday
      gets buried in weekend email; Friday afternoon sits over the
      weekend. Mid-week invoices get reviewed same day.
    </p>
    <p>
      <strong>Email subject: &ldquo;Invoice INV-2026-0142 — Due June
      15, Acme Corp.&rdquo;</strong> Include the invoice number and
      client name; AP teams track by exact subject.
    </p>
    <p>
      <strong>Body: 2-3 sentences.</strong> &ldquo;Attached is invoice
      INV-2026-0142 for the April engagement, $8,400 total, due June
      15. Payment methods listed on the invoice. Happy to answer any
      questions.&rdquo; Short, professional, payment-oriented.
    </p>
    <p>
      <strong>Send a second reminder at day 28.</strong> Short, polite
      nudge. Non-defensive. &ldquo;Hi — just a heads up, invoice
      0142 is due on the 15th. Let me know if you need anything.&rdquo;
      60% of &ldquo;forgotten&rdquo; invoices are paid within a week
      of this reminder.
    </p>

    <h2>What to do when an invoice is overdue</h2>
    <p>
      <strong>Day 31 (1 day late):</strong> friendly ping asking
      whether everything is in order.
    </p>
    <p>
      <strong>Day 37 (1 week late):</strong> more direct. Reference
      the due date explicitly and ask for an update.
    </p>
    <p>
      <strong>Day 45 (2 weeks late):</strong> escalate to a manager
      or procurement contact. Include a copy of the invoice and all
      prior emails.
    </p>
    <p>
      <strong>Day 60+:</strong> formal past-due notice with mention
      of late fees (if your contract allows them — typical is 1.5%
      per month on unpaid balance). Consider halting new work on
      other engagements for that client until paid.
    </p>
    <p>
      <strong>Day 90+:</strong> collections or small claims. Usually
      a last-resort option after you&rsquo;ve exhausted direct
      follow-up.
    </p>

    <h2>Late fees — should you include them?</h2>
    <p>
      Contract language allowing 1–2% per month late fee on overdue
      invoices is standard and enforceable. Advantages:
    </p>
    <p>
      Most clients will move your invoice up in the queue rather
      than pay the fee.
    </p>
    <p>
      If it comes to small claims, the fee is collectible and
      covers some of your time cost.
    </p>
    <p>
      Disadvantages: small-business clients may push back or resent
      the clause. Judgment call based on the clients you typically
      work with.
    </p>

    <h2>Tax handling — jurisdictional basics</h2>
    <p>
      <strong>US:</strong> sales tax only on physical products
      (generally) or certain services (varies by state). Most B2B
      services aren&rsquo;t sales-taxable.
    </p>
    <p>
      <strong>EU / UK:</strong> VAT on most sales. Rate varies (UK
      20%, Germany 19%, France 20%, etc). Reverse charge applies for
      B2B cross-border within EU.
    </p>
    <p>
      <strong>Canada:</strong> GST/HST/PST depending on province and
      product type.
    </p>
    <p>
      When in doubt, consult an accountant — collection and remittance
      rules are strict and getting it wrong creates tax liability for
      you, not the customer.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate a print-ready invoice with the{" "}
      <a href="/tools/invoice-generator">invoice generator</a> —
      line items, tax, payment instructions, PDF export. Pair with
      the <a href="/tools/hourly-rate-calculator">hourly rate
      calculator</a> to make sure your bill rate matches the margin
      you want, and the{" "}
      <a href="/tools/vat-calculator">VAT calculator</a> if you&rsquo;re
      billing EU/UK clients.
    </p>
  </>
);
