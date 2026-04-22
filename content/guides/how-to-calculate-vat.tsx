import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      VAT (Value Added Tax) is the dominant consumption tax across
      170+ countries — every EU member state, the UK, most of Asia,
      Africa, and Latin America. If you&rsquo;re selling to customers
      outside the US, you&rsquo;ll touch it. Get the math right and
      you stay compliant; get it wrong and you&rsquo;re personally
      liable for the uncollected tax. This guide walks through the
      add-VAT and remove-VAT formulas, rates by country, B2B reverse
      charge rules, registration thresholds, and the four errors that
      trigger the most audit headaches.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What VAT is — and how it differs from US sales tax</h2>
    <p>
      VAT is a multi-stage tax: collected at every step in the supply
      chain, with each business claiming back the VAT they paid on
      inputs. The end consumer bears the total tax; businesses are
      just collectors.
    </p>
    <p>
      Contrast with US sales tax: single-stage, collected only at
      final sale. US businesses don&rsquo;t claim back sales tax on
      their inputs.
    </p>
    <p>
      Practical implication: as a VAT-registered business, you charge
      VAT on sales (&ldquo;output VAT&rdquo;), claim back VAT on
      purchases (&ldquo;input VAT&rdquo;), and remit the difference
      to the tax authority. This is why VAT is called a
      &ldquo;value-added&rdquo; tax — you only remit tax on the value
      you added.
    </p>

    <h2>The two core formulas</h2>
    <p>
      <strong>Add VAT (you know net price, need to add VAT):</strong>
    </p>
    <p>
      VAT amount = Net × (rate / 100)
      <br />
      Gross = Net + VAT amount = Net × (1 + rate / 100)
    </p>
    <p>
      Example: £100 net at 20% UK VAT = £20 VAT = £120 gross.
    </p>
    <p>
      <strong>Remove VAT (you know gross price, need to find net):</strong>
    </p>
    <p>
      Net = Gross / (1 + rate / 100)
      <br />
      VAT amount = Gross − Net
    </p>
    <p>
      Example: £120 gross at 20% = £100 net + £20 VAT.
    </p>
    <p>
      Common error: people compute &ldquo;remove VAT&rdquo; as Gross ×
      0.80. That&rsquo;s wrong — you&rsquo;d get £96, not £100. The
      correct division is by 1.20.
    </p>

    <h2>Standard rates by country</h2>
    <p>
      <strong>UK:</strong> 20% standard, 5% reduced (domestic fuel,
      children&rsquo;s car seats), 0% zero-rated (most food,
      children&rsquo;s clothing, books).
    </p>
    <p>
      <strong>Germany:</strong> 19% standard, 7% reduced.
    </p>
    <p>
      <strong>France:</strong> 20% standard, 10% / 5.5% / 2.1%
      reduced tiers.
    </p>
    <p>
      <strong>Ireland:</strong> 23% standard, 13.5% / 9% / 4.8% / 0%
      reduced.
    </p>
    <p>
      <strong>Netherlands:</strong> 21% standard, 9% reduced.
    </p>
    <p>
      <strong>Spain:</strong> 21% standard, 10% / 4% reduced.
    </p>
    <p>
      <strong>Italy:</strong> 22% standard, 10% / 5% / 4% reduced.
    </p>
    <p>
      <strong>Sweden / Denmark:</strong> 25% standard (highest in
      Europe).
    </p>
    <p>
      <strong>Hungary:</strong> 27% standard (highest in the EU).
    </p>
    <p>
      <strong>Canada:</strong> GST 5% federal + PST/HST provincial
      (varies). Not technically VAT but same mechanism.
    </p>
    <p>
      <strong>Australia / New Zealand:</strong> GST 10% / 15% (VAT by
      another name).
    </p>

    <h2>Reduced and zero rates — what qualifies</h2>
    <p>
      Reduced rates typically apply to essentials: food, books,
      medicines, public transport, cultural goods. Each country sets
      its own list — never assume transferability.
    </p>
    <p>
      <strong>Zero-rated</strong> ≠ <strong>exempt</strong>. Zero-rated
      sales are still taxable (at 0%), so you can still reclaim input
      VAT on related costs. Exempt sales are outside the VAT system —
      you can&rsquo;t reclaim related input VAT. Big difference for
      cash flow.
    </p>

    <h2>B2B reverse charge — the cross-border rule</h2>
    <p>
      When a VAT-registered business in one EU country sells to a
      VAT-registered business in another EU country:
    </p>
    <p>
      The seller charges 0% VAT (not zero-rated, but reverse-charged).
    </p>
    <p>
      The buyer &ldquo;self-accounts&rdquo; — adds the VAT at their
      local rate on purchase, then reclaims it on the same return.
      Net VAT liability: zero. Just a paperwork entry.
    </p>
    <p>
      <strong>Conditions:</strong> both parties VAT-registered, valid
      VAT numbers displayed on invoice, goods/services actually
      crossing borders. Invoice must state &ldquo;Reverse charge
      applies — Article 196 of Council Directive 2006/112/EC&rdquo;
      or similar.
    </p>
    <p>
      Post-Brexit: UK → EU sales are no longer intra-EU. They&rsquo;re
      exports (zero-rated) and the EU buyer handles import VAT on
      arrival.
    </p>

    <h2>Registration thresholds</h2>
    <p>
      You must register for VAT once your taxable turnover crosses a
      threshold:
    </p>
    <p>
      <strong>UK:</strong> £90,000 (as of April 2024 — up from £85k).
    </p>
    <p>
      <strong>Germany:</strong> €22,000 (small business exemption if
      under).
    </p>
    <p>
      <strong>France:</strong> €85,800 (goods) / €34,400 (services).
    </p>
    <p>
      <strong>Ireland:</strong> €75,000 (goods) / €37,500 (services).
    </p>
    <p>
      <strong>Netherlands:</strong> €20,000 (optional small-business
      scheme).
    </p>
    <p>
      <strong>EU non-residents selling B2C to EU:</strong> €10,000
      combined across all EU countries triggers registration
      somewhere (usually OSS).
    </p>
    <p>
      Voluntary registration below threshold is often worth it if you
      sell B2B (clients reclaim your VAT, so your effective price is
      unchanged) and have reclaimable input VAT on business costs.
    </p>

    <h2>Digital services and OSS</h2>
    <p>
      Selling digital services (SaaS, ebooks, online courses) to EU
      consumers: VAT is charged at the <em>buyer&rsquo;s</em>
      country rate, not yours. A UK company selling SaaS to a German
      consumer charges 19% German VAT, not 20% UK.
    </p>
    <p>
      <strong>OSS (One Stop Shop):</strong> register in one EU
      country, file a single return covering all EU B2C digital
      sales. Replaces having to register in every country
      individually. Simplified in 2021; most SaaS businesses use it.
    </p>
    <p>
      <strong>IOSS</strong> (Import OSS): same idea for goods imports
      into EU under €150.
    </p>

    <h2>Invoice requirements</h2>
    <p>
      A valid VAT invoice must include:
    </p>
    <p>
      Your business name, address, VAT number.
    </p>
    <p>
      Customer name, address, VAT number (for B2B).
    </p>
    <p>
      Unique invoice number, issue date, tax point date.
    </p>
    <p>
      Description of goods/services, quantity, unit price.
    </p>
    <p>
      Net amount, VAT rate applied, VAT amount, gross total.
    </p>
    <p>
      For reverse charge: explicit statement citing the directive
      article.
    </p>
    <p>
      Missing any of these and your customer can&rsquo;t reclaim the
      input VAT — they&rsquo;ll chase you for a corrected invoice.
    </p>

    <h2>4 common VAT errors</h2>
    <p>
      <strong>Error 1: Wrong rate applied.</strong> Using 20% on a
      reduced-rate item, or 0% when you should have charged standard.
      HMRC/tax authority will reassess and you&rsquo;ll owe the
      difference out of pocket (plus penalties).
    </p>
    <p>
      <strong>Error 2: Rounding per-line instead of total.</strong>
      VAT should generally be calculated on the total, with a single
      rounding at the end. Rounding each line can create compounding
      errors that don&rsquo;t match customer calculations.
    </p>
    <p>
      <strong>Error 3: Missing the customer&rsquo;s VAT number on
      B2B invoices.</strong> No valid number = you should have
      charged VAT. Tax authority will reassess with VAT owed by you.
    </p>
    <p>
      <strong>Error 4: Treating reverse charge as &ldquo;no VAT
      involved.&rdquo;</strong> Reverse charge must still be reported
      on your return (as net sale with VAT indicator) — it just
      happens to net to zero. Skip the reporting and you&rsquo;re
      filing incomplete returns.
    </p>

    <h2>When to get an accountant vs DIY</h2>
    <p>
      DIY is fine when: single country, one VAT rate, B2C only, under
      threshold or just over, simple products.
    </p>
    <p>
      Get an accountant when: cross-border EU sales, mix of standard
      and reduced-rate products, OSS registration, partial-exemption
      businesses, VAT margin schemes (second-hand goods, tour
      operators), or when you&rsquo;re being audited. The cost of
      getting VAT wrong exceeds the accountant fee fast — personal
      liability for uncollected VAT is common.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Compute add-VAT or remove-VAT at any country&rsquo;s rate with
      the <a href="/tools/vat-calculator">VAT calculator</a>. Pair
      with the <a href="/tools/invoice-generator">invoice generator</a>
      {" "}to produce a compliant VAT invoice, and the{" "}
      <a href="/tools/profit-margin-calculator">profit margin
      calculator</a> to confirm margins on VAT-inclusive versus
      VAT-exclusive pricing.
    </p>
  </>
);
