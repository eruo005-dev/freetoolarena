import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    The 2021 NFT boom is over. Most JPEGs that sold for six figures are now worth zero or near-zero, and
    the floor prices of once-iconic collections have collapsed 80&ndash;95%. That does not mean NFTs are dead,
    but it does mean that any honest evaluation has to start with the brutal truth: you are speculating on
    an illiquid digital asset, not investing in the traditional sense. This guide walks through real due
    diligence for the NFTs that still matter.
  </p>
);

export const body: ReactElement = (
  <>
    <p>
      Not financial advice. Consult a licensed advisor. NFT investing is high-risk speculation, and the
      expected return for the average buyer is negative once you include gas fees, platform fees, and the
      reality that most collections trend toward zero. Treat anything below as a framework for evaluating
      risk, not a strategy for reliably making money.
    </p>

    <h2>Where real use cases still exist</h2>
    <p>
      Despite the collapse, a handful of categories have survived with genuine utility. Membership-access
      NFTs (think Flyfish Club, Friends With Benefits) function as transferable club passes. Creator royalty
      NFTs let musicians and artists sell direct to fans and retain a cut of secondary sales, at least on
      marketplaces that enforce royalties. Gaming assets with in-game function &mdash; skins, land parcels,
      breeding rights &mdash; still trade actively where the underlying game has players. Domain names
      (ENS, Unstoppable Domains) remain a small but steady category.
    </p>

    <h2>What to check before buying</h2>
    <ul>
      <li>Trading volume over the last 30 and 90 days &mdash; not the all-time total, which flatters dead collections.</li>
      <li>Floor price trend on a 6-month chart. A steady decline is usually terminal.</li>
      <li>Holder concentration. If the top 10 wallets hold 40%+ of supply, one whale can crash the floor.</li>
      <li>Whether the team is doxxed (real names, real track record) or anonymous.</li>
      <li>Roadmap execution &mdash; did they actually ship what they promised, or is it all &ldquo;coming soon&rdquo;?</li>
      <li>Unique holder count vs total supply. Low unique holders mean wash trading is likely.</li>
    </ul>

    <h2>Due-diligence tools</h2>
    <p>
      DappRadar gives you collection-level volume and holder stats. NFTPriceFloor tracks floor history and
      flags rug pulls. OpenSea analytics shows top holders and listing pressure. For deeper wallet analysis,
      Nansen labels smart-money wallets so you can see who&rsquo;s buying and who&rsquo;s exiting. Etherscan
      lets you verify contract ownership, mint authority, and whether royalties are enforceable on-chain.
    </p>

    <h2>Red flags</h2>
    <p>
      A celebrity mint almost always ends badly &mdash; the celebrity gets paid, the fans get rugged. Watch
      for &ldquo;utility&rdquo; that doesn&rsquo;t actually exist yet (promised airdrops, staking, games
      that are perpetually in development). Floor-sweeping bots that pump volume in coordinated bursts are
      a manipulation signal, not demand. Beware collections with hidden team wallets holding large chunks
      of supply that can be dumped on retail. If the Discord is all price chatter and no actual community,
      you are the exit liquidity.
    </p>

    <h2>Gas, fees, and taxes</h2>
    <p>
      Gas fees on Ethereum can easily eat 2&ndash;10% of a small trade, and marketplace fees add another
      2&ndash;2.5%. Round-tripping an NFT often costs more than the potential upside for sub-$1,000 positions.
      Worse, the IRS treats NFTs as property: every sale, trade, or even swap into another token is a
      taxable event, and if the NFT is classified as a collectible you may face up to 28% long-term capital
      gains instead of the usual 15&ndash;20%. Keep meticulous cost-basis records.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Buying the floor of a trending collection at peak hype and watching it bleed for six months. Ignoring
      royalty-bypass marketplaces that silently kill the creator economics you bought into. Treating an
      illiquid asset as if you can exit at &ldquo;floor&rdquo; &mdash; the real exit price is the highest
      bid, which is often 20&ndash;40% below floor. Using leverage or NFT-collateralized loans &mdash; forced
      liquidations in a thin market are devastating.
    </p>

    <h2>Bottom line</h2>
    <p>
      NFT investing is high-risk speculation dressed up as art collecting. A small position in something you
      genuinely value &mdash; a membership, a game you play, a creator you support &mdash; can make sense.
      Treating NFTs as a portfolio allocation alongside stocks and bonds does not. Size the bet accordingly,
      expect it to go to zero, and consult a licensed advisor before any purchase large enough to matter.
    </p>
  </>
);
