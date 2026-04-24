import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Real estate crowdfunding promised to democratize property investing &mdash; the reality is more nuanced, and a lot less liquid, than the ads suggest.
  </p>
);

export const body: ReactElement = (
  <>
    <p>
      Platforms like Fundrise, RealtyMogul, Arrived, EquityMultiple, and CrowdStreet let retail investors pool money into commercial buildings, rental homes, or private REITs. It&rsquo;s a real asset class, but it behaves differently than the shiny marketing suggests &mdash; and understanding the structure matters more than picking the platform. Not financial advice. Consult a licensed advisor for decisions specific to your situation.
    </p>

    <h2>What it actually is</h2>
    <p>
      Two main flavors: (1) pooled non-traded REITs &mdash; you buy shares of a fund that owns dozens of properties (Fundrise&rsquo;s model); (2) fractional deals &mdash; you buy a slice of a specific building or house (Arrived, CrowdStreet). In both cases you&rsquo;re a limited partner or REIT shareholder, not a landlord. You don&rsquo;t fix toilets; you also don&rsquo;t get to pick tenants or sell when you want.
    </p>

    <h2>Accredited vs non-accredited</h2>
    <p>
      The SEC distinguishes accredited investors (income over $200k solo / $300k joint, or net worth over $1M excluding primary residence) from everyone else. Non-accredited investors can access public non-traded REITs on Fundrise, Arrived, RealtyMogul MogulREIT. Accredited investors unlock the juicier individual-deal menus on CrowdStreet, EquityMultiple, and similar.
    </p>

    <h2>Realistic returns</h2>
    <p>
      Marketing decks love to show 10&ndash;15% IRRs. Actual delivered net returns over multiple years have clustered around 5&ndash;9% for most platforms &mdash; decent, but below the S&amp;P 500&rsquo;s ~10% long-term average. The pitch isn&rsquo;t outperformance; it&rsquo;s diversification and lower correlation to public equities.
    </p>

    <h2>The liquidity trap</h2>
    <p>
      This is the part most investors learn the hard way. Funds often lock capital for 5+ years. Redemption programs exist but can be suspended (Fundrise and Blackstone&rsquo;s BREIT both gated redemptions during 2022&ndash;2023 stress). Early withdrawals typically carry penalties of 1&ndash;3% in the first few years. Treat every dollar here as money you don&rsquo;t need to touch.
    </p>

    <h2>Fees stack quickly</h2>
    <ul>
      <li>Platform management fee: typically 0.85&ndash;1.0% of assets.</li>
      <li>Underlying REIT or fund expenses: 0.25&ndash;1.5% more.</li>
      <li>Acquisition, disposition, and performance fees on deal-based platforms.</li>
      <li>Total drag often lands at 1.5&ndash;3% annually &mdash; compare that to VNQ (Vanguard Real Estate ETF) at 0.13%.</li>
    </ul>

    <h2>Tax treatment</h2>
    <p>
      Pooled REITs send you a 1099-DIV; non-qualified dividends are taxed as ordinary income, which is the bad news. The good news: up to 20% of the distribution may qualify for the QBI deduction through 2025. Fractional property deals often send a K-1, which can pass through depreciation and make distributions partly tax-sheltered &mdash; but K-1s arrive late (March&ndash;April) and can complicate your return. Holding these in a Roth IRA sidesteps most of the tax complexity.
    </p>

    <h2>Red flags to avoid</h2>
    <p>
      Platforms offering only promissory notes (you&rsquo;re a lender, not an owner &mdash; very different risk). Sponsors with no track record through a downturn &mdash; plenty of 2015&ndash;2021 funds have never been stress-tested. Headline IRRs based on projections, not realized returns. Anything guaranteeing returns. Opaque fee structures that require a calculator to decode.
    </p>

    <h2>Where it fits in a portfolio</h2>
    <p>
      As an alternatives bucket, 5&ndash;15% of a diversified portfolio is reasonable. If you mostly want real estate exposure with liquidity and low fees, a public REIT index fund like VNQ or SCHH will do 90% of the job for a fraction of the cost. Crowdfunding makes more sense when you specifically want private-market exposure, potential tax advantages from direct property depreciation, or access to deals you otherwise couldn&rsquo;t touch.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Putting emergency fund money into illiquid 5-year funds. Concentrating in one platform or one property type (office in 2020 was brutal). Ignoring fees. Chasing the highest advertised IRR without reading the PPM. Assuming past cycle returns will repeat.
    </p>

    <h2>Bottom line</h2>
    <p>
      Real estate crowdfunding is a legitimate tool, not a free lunch. Understand the lockups, count the fees, read the tax docs, and size it like the alternative investment it is &mdash; not like a savings account with a better yield.
    </p>
  </>
);
