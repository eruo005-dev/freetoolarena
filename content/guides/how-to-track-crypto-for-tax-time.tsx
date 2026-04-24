import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Every trade, swap, and sale is a taxable event &mdash; and the IRS is now very good at matching 1099s to your return.</p>);

export const body: ReactElement = (
  <>
    <p>Crypto tax tracking isn&rsquo;t hard conceptually &mdash; it&rsquo;s just a lot of transactions that need cost basis, date, proceeds, and gain/loss attached to each one. The pain comes from scale. A casual trader on two exchanges and a self-custody wallet can easily generate hundreds of taxable events in a year, and every swap on Uniswap or bridge transaction counts. Get your tracking in order before the December dust settles, not in April.</p>

    <h2>How the IRS treats crypto</h2>
    <p>In the US, the IRS treats crypto as property, not currency. That means capital gains rules apply: short-term (held under a year) is taxed at your ordinary income rate, long-term (held over a year) gets the preferential 0/15/20% brackets. A taxable event is anything that disposes of crypto &mdash; selling for USD, swapping one coin for another, spending crypto on goods, or paying a gas fee in a way that triggers a disposition. Moving coins between your own wallets is not taxable. Buying and holding is not taxable.</p>

    <h2>Tools that do the heavy lifting</h2>
    <ul>
      <li>Koinly &mdash; strong all-rounder, good DeFi coverage, clean UI.</li>
      <li>CoinTracker &mdash; tight TurboTax integration, solid for US filers.</li>
      <li>TokenTax &mdash; higher-touch, pricier, bundles CPA services.</li>
      <li>ZenLedger &mdash; IRS-focused, decent support for audits.</li>
    </ul>
    <p>All four import from major exchanges and chains, compute cost basis, and spit out Form 8949 + Schedule D. Pick one and stick with it &mdash; switching mid-year is painful because cost basis carries over.</p>

    <h2>Connecting exchanges the safe way</h2>
    <p>Always use read-only API keys when connecting an exchange to a tax tool. Never grant withdrawal permissions; the tool does not need them. For self-custody wallets, you just paste the public address &mdash; no keys, ever. If a tax tool asks for your seed phrase or private key, close the tab.</p>

    <h2>Cost basis methods</h2>
    <p>FIFO (first-in, first-out) is the IRS default and the safest choice if you didn&rsquo;t explicitly elect something else. LIFO (last-in, first-out) and HIFO (highest-in, first-out) can lower your bill in rising markets, but the IRS requires specific identification rules and adequate records. Most tax software lets you toggle methods and compare outcomes &mdash; just don&rsquo;t flip methods year to year without understanding the consistency rules.</p>

    <h2>DeFi and NFTs make it worse</h2>
    <p>Liquidity pool deposits, yield farming, lending protocols, bridging, and NFT mints all generate taxable events &mdash; often multiple per transaction. Staking rewards are income at fair market value when you gain control of them, then capital gains when you later sell. Airdrops are ordinary income at receipt. Lost keys and rug-pulled tokens are messy: the IRS has tightened guidance on what qualifies as an abandonment loss. This is where tax software breaks down and manual review starts.</p>

    <h2>The forms you&rsquo;ll actually file</h2>
    <p>Form 8949 lists every disposal: date acquired, date sold, proceeds, cost basis, gain or loss. Those totals roll up to Schedule D. If you received crypto as income (staking, mining, airdrops, payment for services), that goes on Schedule 1 or Schedule C depending on whether it&rsquo;s a trade or business. The &ldquo;digital asset&rdquo; question at the top of Form 1040 is not optional &mdash; answer it truthfully.</p>

    <h2>When to hire a CPA</h2>
    <p>If you have more than a few hundred transactions, meaningful DeFi activity, NFT flips, business income in crypto, or unresolved prior-year issues, pay a crypto-specialist CPA. Expect $500&ndash;$3,000 for a straightforward return, more for complex cases. That&rsquo;s cheap insurance against an audit you&rsquo;d otherwise face alone.</p>

    <h2>Common mistakes</h2>
    <p>Forgetting small wallets, ignoring gas fees, treating a swap as non-taxable, missing airdrops, not reconciling exchange CSV exports against API imports, and waiting until April to start. Also: assuming the exchange&rsquo;s 1099 is correct &mdash; it often isn&rsquo;t, especially for cost basis across wallets.</p>

    <h2>Bottom line</h2>
    <p>Pick a tax tool in January, connect read-only APIs, reconcile monthly, and hire a specialist CPA if the year got complicated. This is general information, not tax advice &mdash; talk to a qualified professional about your specific situation.</p>
  </>
);
