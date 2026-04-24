import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Remote work shifts the security perimeter from the office firewall to your kitchen table &mdash; and that means the basics suddenly matter a lot more.</p>);

export const body: ReactElement = (
  <>
    <p>The good news: you don&rsquo;t need to be a security engineer to protect yourself. A small stack of habits &mdash; unique passwords, MFA, encryption, skepticism &mdash; blocks the vast majority of real-world attacks aimed at remote workers. The bad news: skipping any one of them leaves a gap that attackers actively look for. Below is a practical checklist, ordered roughly by impact per hour of effort. Do the top items first; the rest can wait a week.</p>

    <h2>Passwords and MFA, done right</h2>
    <p>Use a unique password for every account, generated and stored in a password manager like 1Password or Bitwarden. Reused passwords are the single biggest source of account takeovers, because one breach anywhere leaks credentials everywhere. Layer MFA on top &mdash; and prefer phishing-resistant hardware keys (YubiKey, Titan) on email, banking, and work SSO. App-based TOTP codes (Authy, 1Password) are fine for everything else. SMS codes are the weakest option because SIM-swap attacks exist, but they still beat no MFA at all.</p>

    <h2>VPN: only when you actually need it</h2>
    <p>A VPN protects you on untrusted networks &mdash; hotel WiFi, airports, coffee shops. It is not a magic privacy blanket for everyday home use, and most modern sites already run HTTPS end-to-end. Turn the VPN on for public WiFi or when your employer requires it for internal resources. Leave it off otherwise; routing all your traffic through a third party has its own trade-offs.</p>

    <h2>Encrypt the laptop, back up the data</h2>
    <ul>
      <li>Turn on FileVault (macOS) or BitLocker (Windows). A lost laptop without disk encryption is a lost data breach.</li>
      <li>Follow the 3-2-1 backup rule: 3 copies of your data, on 2 different media, with 1 off-site (a cloud backup like Backblaze counts).</li>
      <li>Test a restore once a quarter. An untested backup is a hope, not a backup.</li>
    </ul>

    <h2>Phishing red flags</h2>
    <p>Phishing still works because it pressures you to act fast. Slow down whenever a message creates urgency (&ldquo;your account will be closed&rdquo;), asks for credentials, or comes from a slightly-off domain (&ldquo;paypa1.com&rdquo;). Hover over links before clicking, confirm unusual requests through a second channel, and never approve an MFA push you didn&rsquo;t initiate. If a &ldquo;CEO&rdquo; texts you asking for gift cards, it isn&rsquo;t the CEO.</p>

    <h2>Physical and device hygiene</h2>
    <p>Never plug in a USB drive you found in a parking lot or received unsolicited &mdash; malicious USB payloads are a real attack, not just a movie trope. Lock your screen when you step away. Keep your OS, browser, and password manager on auto-update; most exploited vulnerabilities have had patches available for months.</p>

    <h2>What your employer can see on the work laptop</h2>
    <p>On a managed work device, assume your employer can see installed apps, visited domains, screenshots, clipboard contents, and sometimes keystrokes &mdash; depending on the MDM and endpoint tools deployed. They generally cannot read your personal iCloud, Gmail, or encrypted iMessage content, but anything typed into the work browser or work apps is fair game. If you&rsquo;d be embarrassed for IT to read it, use a personal device on a personal network.</p>

    <h2>BYOD: personal devices for work</h2>
    <p>Using your own laptop or phone for work sounds convenient until the company enrolls it in MDM and gains the ability to remote-wipe it, enforce policies, or audit data. If BYOD is required, set up a separate work profile (iOS Work Profile, Android Work Profile, a dedicated macOS user) so a remote wipe doesn&rsquo;t also take your family photos.</p>

    <h2>Common mistakes</h2>
    <p>Sharing passwords over Slack or email, disabling MFA because it&rsquo;s &ldquo;annoying,&rdquo; ignoring OS updates for months, storing recovery codes in the same password manager you&rsquo;re trying to recover, and treating the home router as set-and-forget (change the default admin password, update firmware).</p>

    <h2>Bottom line</h2>
    <p>You don&rsquo;t need perfect security &mdash; you need enough friction that attackers move on. Password manager, MFA everywhere, disk encryption, backups, and healthy skepticism cover 90% of the real threat.</p>
  </>
);
