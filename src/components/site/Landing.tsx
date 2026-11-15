import { useState } from "react";
import ArenaScene from "@/components/ArenaScene";
import logoAsset from "@/assets/trench-brawl-logo-v2.jpg.asset.json";
import dogeImg from "@/assets/fighter-doge.png.asset.json";
import pepeImg from "@/assets/fighter-pepe.png.asset.json";
import bonkImg from "@/assets/fighter-bonk.png.asset.json";
import flokiImg from "@/assets/fighter-floki.png.asset.json";
import wifImg from "@/assets/fighter-wif.png.asset.json";
import penguImg from "@/assets/fighter-pengu.png.asset.json";
import cashcatImg from "@/assets/fighter-cashcat.png.asset.json";
import zcatImg from "@/assets/fighter-zcat.png.asset.json";
import pnutImg from "@/assets/fighter-pnut.png.asset.json";
import shibaImg from "@/assets/fighter-shiba.png.asset.json";
import superinuImg from "@/assets/fighter-superinu.png.asset.json";
import purrImg from "@/assets/fighter-purr.png.asset.json";
import mogImg from "@/assets/fighter-mog.png.asset.json";
import turboImg from "@/assets/fighter-turbo.png.asset.json";

const LOGO_URL = logoAsset.url;
const TOKEN_ADDRESS = "5Htub56zFC6gyp4UKKjEb21JTSrWheHbNwbxmXedbonk";

const NAV_LINKS = [
  { label: "Fighters", href: "#fighters" },
  { label: "XP", href: "#xp" },
  { label: "Powers", href: "#powers" },
  { label: "$SAVIOUR", href: "#saviour" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
];

const STATS = [
  { value: "100 XP", label: "Per verified CPU win" },
  { value: "1,000", label: "XP per activation block" },
  { value: "500K", label: "$SAVIOUR fighter pool" },
  { value: "100K", label: "$SAVIOUR referral pool" },
];

const LOOP = [
  "Guest practice or connect a Solana wallet",
  "Set X handle & Dominant Fighter",
  "Choose a fighter and arena",
  "Fight the CPU — one round",
  "Server verifies the result",
  "Win = 100 XP · Loss = 0 XP",
  "Activate qualifying XP",
  "Compete for the Top 100",
];

const FIGHTERS: { name: string; note: string; tag: string; img: string }[] = [
  { name: "DOGE", note: "Boxer-inspired doge", tag: "Alpha Howl", img: dogeImg.url },
  { name: "PEPE", note: "Frog, agile ninja-inspired", tag: "Pond Pounce", img: pepeImg.url },
  { name: "BONK", note: "Dog-themed brawler with bat", tag: "Fetch & Rekt", img: bonkImg.url },
  { name: "FLOKI", note: "Viking-themed warrior", tag: "Pack Fury", img: flokiImg.url },
  { name: "WIF", note: "Pink beanie, streetwear", tag: "Hat Trick", img: wifImg.url },
  { name: "PENGU", note: "Penguin fighter", tag: "Deep Freeze", img: penguImg.url },
  { name: "CASHCAT", note: "Pale-fur, watery-eye features", tag: "Cash Flow", img: cashcatImg.url },
  { name: "ZCAT", note: "Cat fighter with paper-bag mask", tag: "Bag Guard", img: zcatImg.url },
  { name: "PNUT", note: "Squirrel with adventurer hat", tag: "Nut Storm", img: pnutImg.url },
  { name: "SHIBA", note: "Shiba Inu-inspired fighter", tag: "Shib Flash", img: shibaImg.url },
  { name: "SUPER INU", note: "Superhero-inspired inu", tag: "Cyber Hunt", img: superinuImg.url },
  { name: "PURR", note: "Cat fighter", tag: "Silent Strike", img: purrImg.url },
  { name: "MOG", note: "Black-and-gold streetwear cat", tag: "Nine Lives", img: mogImg.url },
  { name: "TURBO", note: "Frog racing-inspired fighter", tag: "Toad Overdrive", img: turboImg.url },
];

const XP_TABLE = [
  { action: "Verified CPU victory", amount: "100 fighting XP" },
  { action: "Verified CPU defeat", amount: "0 XP (fight & loss saved)" },
  { action: "XP activation block", amount: "1,000 qualifying XP" },
  { action: "Activation fee", amount: "Proposed 0.1 SOL / block" },
  { action: "Activation window", amount: "24 hours" },
  { action: "Per-player cap", amount: "1,000,000 XP" },
  { action: "Programme ceiling", amount: "1,000,000,000 XP" },
];

const POWERS = [
  { name: "FUD CALL", desc: "Summon an approved FUD move against an opponent — like an FTX-style hammer — without damaging yourself." },
  { name: "FUD ESCAPE", desc: "Escape any FUD unhurt. The protected FUD can't reduce your health bar." },
  { name: "SPECIAL MOVE", desc: "Unleash fighter-specific signature attacks and effects." },
];

const BOARD_ROWS = [
  { who: "Player A", rank: "42", xp: "75,000", powers: true, pool: false },
  { who: "Player B", rank: "42", xp: "120,000", powers: true, pool: true },
  { who: "Player C", rank: "101", xp: "150,000", powers: false, pool: false },
];

const UTILITIES = [
  { t: "Top 100 competitive prizes", d: "500,000 $SAVIOUR Season 1 pool — 100,000 activated XP minimum." },
  { t: "Top 50 referral prizes", d: "100,000 $SAVIOUR Season 1 referral pool." },
  { t: "Top 100 gameplay privilege", d: "Rank-linked FUD CALL, FUD ESCAPE and special moves — no holding required." },
  { t: "Human PvP wager asset", d: "$SAVIOUR proposed for V2 human-vs-human wagers. CPU matches are never wagered." },
  { t: "Buyback & burn", d: "50% of future PvP platform fees plus part of the activation-SOL ecosystem bucket." },
  { t: "Season 2 funding", d: "Part of 50% of SOL activation proceeds reserved for future rewards and buyback/burn." },
];

const ROADMAP = [
  { gate: "A", title: "Public landing page", cond: "New branding, accurate claims, DNS/HTTPS, support, links, terms/privacy." },
  { gate: "B", title: "Closed playable beta", cond: "CPU game, selected fighters, improved hitboxes, audio, stability, honest no-reward messaging." },
  { gate: "C", title: "Public XP progression", cond: "Production trusted verifier, legacy XP path revoked, abuse controls and monitoring." },
  { gate: "D", title: "Activated-XP competition", cond: "Secure activation payments, 24h expiry, ranking, Top 100 eligibility, deterministic powers." },
  { gate: "E", title: "$SAVIOUR prize distribution", cond: "Funding, final pro-rata formulas, snapshots, audit/treasury controls, terms and approval." },
  { gate: "V2", title: "Human PvP & wagering", cond: "Separate architecture, settlement integrity, legal clearance and published fee/wager terms." },
];

const FAQS = [
  { q: "Does one CPU win pay me $SAVIOUR?", a: "No. A verified CPU win awards 100 fighting XP. $SAVIOUR is distributed only under the separate season pool rules after eligibility and funding conditions are met." },
  { q: "Who gets Top 100 powers?", a: "Every eligible official Top 100 player — no minimum of 100,000 activated XP is required for the powers themselves." },
  { q: "Who qualifies for the 500,000 $SAVIOUR pool?", a: "Only official Top 100 players who also have at least 100,000 activated fighting XP at the published qualification snapshot." },
  { q: "Do I keep powers after dropping to rank 101?", a: "No. Powers cease when eligibility ends, according to the published rank-update and match-timing rules." },
  { q: "How do referral rewards work?", a: "A qualifying referrer earns referral XP equal to 20% of a referred player's successfully activated fighting XP. Only qualified Top 50 referrers share the separate 100,000 $SAVIOUR pool." },
  { q: "Are the season pools equally divided?", a: "No formula has been approved. Both distribution formulas and the treatment of unallocated tokens must be published before payouts." },
  { q: "Do I need $SAVIOUR to play V1?", a: "No. V1 CPU practice does not require token ownership or wagers. Official reward eligibility has separate conditions." },
  { q: "Are NFTs or CPU wagers included?", a: "No. NFTs were removed, and V1 CPU battles are not wagered." },
];

function Heading({ num, kicker, title, children }: { num: string; kicker: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="mb-12 max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="font-display rounded-lg bg-ember px-3 py-1 text-lg text-foreground">{num}</span>
        <p className="text-sm font-black uppercase tracking-[0.3em] text-primary">{kicker}</p>
      </div>
      <h2 className="mt-4 text-5xl uppercase leading-[0.95] text-foreground sm:text-6xl">{title}</h2>
      {children ? <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{children}</p> : null}
    </div>
  );
}

function Notice({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="stripes rounded-xl border-2 border-dashed border-primary/50 p-5">
      <p className="text-xs font-black uppercase tracking-widest text-primary">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

function FighterCard({ f }: { f: (typeof FIGHTERS)[number] }) {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const flipped = hovered || tapped;

  return (
    <div
      className="group h-80 [perspective:1200px] sm:h-96"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        aria-pressed={flipped}
        onClick={() => setTapped((v) => !v)}
        className="relative block h-full w-full text-left transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front — fighter portrait */}
        <div className="backface-hidden absolute inset-0 overflow-hidden slab rounded-2xl transition-colors duration-300 group-hover:border-primary/60">
          <img src={f.img} alt={`${f.name} fighter art`} loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss via-abyss/85 to-transparent px-4 pb-3 pt-10">
            <p className="font-display text-2xl uppercase tracking-wide text-foreground">{f.name}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-ember">{f.tag}</p>
          </div>
        </div>
        {/* Back — fighter profile */}
        <div
          className="backface-hidden absolute inset-0 flex flex-col justify-end overflow-hidden rounded-2xl border border-primary/50 bg-card p-5"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,color-mix(in_oklab,var(--color-primary)_22%,transparent),transparent_60%)]" />
          <p className="text-xs font-bold uppercase tracking-widest text-primary">{f.name}</p>
          <p className="mt-1 font-display text-2xl uppercase text-ember">{f.tag}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.note}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            100 XP per verified CPU win
          </p>
        </div>
      </button>
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-border bg-abyss/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5">
        <a href="#top" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Trench Brawl logo" className="h-11 w-11 rounded-lg object-cover" />
          <span className="font-display hidden text-xl uppercase text-foreground sm:inline">Trench <span className="text-primary">Brawl</span></span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm font-black uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-primary">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#fighters" className="btn-game font-display rounded-xl px-5 py-2 text-lg uppercase">Play</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_40%,color-mix(in_oklab,var(--color-ember)_30%,transparent),transparent_70%)]" />
      <div className="relative mx-auto grid min-h-[92svh] max-w-7xl items-center gap-6 px-4 lg:grid-cols-[1fr_1.15fr]">
        <div className="relative z-10 py-12 text-center lg:text-left">
          <p className="inline-block rounded-lg border-2 border-primary/60 bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-primary">
            Saviour Edition · V1.4
          </p>
          <img src={LOGO_URL} alt="Trench Brawl" className="mx-auto mt-6 w-64 rounded-3xl border-4 border-primary/40 shadow-2xl sm:w-80 lg:mx-0" />
          <h1 className="text-fire mt-6 text-4xl uppercase leading-none sm:text-6xl">Fight · Outplay · Dominate</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            A meme-inspired, Solana-connected fighting game built around fast combat, fighter identities and
            competitive progression. Earn verified XP, climb the Battle Board and unlock Top 100 powers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <a href="#fighters" className="btn-game font-display rounded-xl px-8 py-3 text-xl uppercase">Choose fighter</a>
            <a href="#saviour" className="font-display rounded-xl border-2 border-border bg-card px-8 py-3 text-xl uppercase text-foreground transition-colors hover:border-primary">$SAVIOUR</a>
          </div>
        </div>
        <div className="relative h-[52svh] min-h-[340px] lg:h-[80svh]">
          <ArenaScene className="absolute inset-0" />
          <div className="font-display pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-lg bg-ember px-4 py-1 text-xl uppercase text-foreground shadow-lg">VS</div>
        </div>
      </div>
      <Marquee />
    </section>
  );
}

function Marquee() {
  const items = [...FIGHTERS, ...FIGHTERS];
  return (
    <div className="relative -rotate-1 overflow-hidden border-y-4 border-abyss bg-primary py-3">
      <div className="animate-marquee flex w-max gap-8">
        {items.map((f, i) => (
          <span key={i} className="font-display flex items-center gap-3 text-2xl uppercase text-primary-foreground">
            <img src={f.img} alt="" className="h-9 w-9 rounded-full border-2 border-abyss object-cover" />
            {f.name} <span className="text-ember">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function StatsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="slab rounded-2xl p-6 text-center">
            <p className="font-display text-fire text-4xl sm:text-5xl">{s.value}</p>
            <p className="mt-2 text-xs font-black uppercase tracking-widest text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function OverviewSection() {
  const [copied, setCopied] = useState(false);
  const rows = [
    ["Game", "Trench Brawl"], ["Network", "Solana"], ["Website", "trenchbrawl.xyz"],
    ["Ecosystem token", "$SAVIOUR"], ["Tagline", "Fight · Outplay · Dominate"],
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <Heading num="01" kicker="Overview" title={<>The <span className="text-primary">Trench</span> awaits</>}>
            V1 centres on single-round, non-wagered fights against CPU opponents. Wallet-connected players earn
            verified fighting XP, activate qualifying XP, compete on the Battle Board and gain rank-based powers.
            V2 introduces human-versus-human competition and proposed $SAVIOUR wagering.
          </Heading>
          <Notice label="Token update">$SAVIOUR replaces the former $TRENCH token in all product economics, rewards and token references.</Notice>
        </div>
        <div className="slab rounded-2xl p-6">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-border py-3 last:border-0">
              <span className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{k}</span>
              <span className="font-display text-lg text-foreground">{v}</span>
            </div>
          ))}
          <div className="mt-4 rounded-xl bg-abyss p-4">
            <p className="text-xs font-black uppercase tracking-widest text-primary">Token address</p>
            <div className="mt-2 flex items-center gap-3">
              <code className="min-w-0 flex-1 break-all text-sm text-foreground">{TOKEN_ADDRESS}</code>
              <button
                type="button"
                onClick={() => { navigator.clipboard?.writeText(TOKEN_ADDRESS); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
                className="btn-game shrink-0 rounded-lg px-3 py-1.5 text-xs font-black uppercase"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Confirmed by the project owner; independent on-chain verification must be completed before public distributions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FightersSection() {
  return (
    <section id="fighters" className="stripes scroll-mt-20 border-y-2 border-border bg-abyss py-24">
      <div className="mx-auto max-w-7xl px-4">
        <Heading num="02" kicker="Gameplay & fighters" title="Choose your fighter">
          Pick a different fighter every match; your Dominant Fighter tracks community preference separately.
          Hover or tap a card to see the fighter's move.
        </Heading>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {FIGHTERS.map((f) => <FighterCard key={f.name} f={f} />)}
        </div>
        <div className="mt-14">
          <p className="font-display mb-5 text-2xl uppercase text-foreground">The core loop</p>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LOOP.map((step, i) => (
              <li key={step} className="slab flex items-center gap-3 rounded-xl p-4">
                <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-lg text-primary-foreground">{i + 1}</span>
                <span className="text-sm font-bold text-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Notice label="Guests & wallets">Guests can play practice CPU fights without saving rewards. Sign in with a Solana wallet signature — Phantom, Solflare, Backpack and compatible providers.</Notice>
          <Notice label="Roster control">The launch target is 14 fighters; nine are reported playable. Final roster, moves, animations and hitboxes still require sign-off.</Notice>
        </div>
      </div>
    </section>
  );
}

function XpSection() {
  return (
    <section id="xp" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24">
      <Heading num="03" kicker="XP earning & activation" title={<>Win. Stack. <span className="text-ember">Activate.</span></>}>
        There is no fixed amount of $SAVIOUR per XP, fight, activation or wallet. Any $SAVIOUR distribution comes
        exclusively from a defined season pool and its published rules.
      </Heading>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="slab overflow-hidden rounded-2xl">
          {XP_TABLE.map((r) => (
            <div key={r.action} className="flex items-center justify-between gap-4 border-b border-border px-6 py-4 last:border-0">
              <span className="text-sm font-bold text-muted-foreground">{r.action}</span>
              <span className="font-display text-right text-lg text-primary">{r.amount}</span>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="slab rounded-2xl p-6">
            <p className="font-display text-2xl uppercase text-foreground">Separate accounts</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Earned XP, activated fighting XP, referral XP, expired XP and reversals are tracked separately.
              Unactivated and expired XP don't count as activated fighting XP.
            </p>
          </div>
          <Notice label="No fixed conversion">The earlier XP-to-token conversion was superseded. The 1,000,000,000-XP ceiling is not a promise of any total token emission.</Notice>
        </div>
      </div>
    </section>
  );
}

function PowersSection() {
  return (
    <section id="powers" className="scroll-mt-20 border-y-2 border-border bg-abyss py-24">
      <div className="mx-auto max-w-7xl px-4">
        <Heading num="04" kicker="Battle Board & FUD Arsenal" title={<>Top 100 <span className="text-primary">powers</span></>}>
          The official Battle Board orders players by activated fighting XP. Every player in the official Top 100
          unlocks combat powers — drop to rank 101 and they're gone until you qualify again.
        </Heading>
        <div className="grid gap-4 md:grid-cols-3">
          {POWERS.map((p, i) => (
            <div key={p.name} className="slab group relative overflow-hidden rounded-2xl p-7 transition-transform hover:-translate-y-1">
              <span className="font-display pointer-events-none absolute -right-2 -top-6 text-9xl text-primary/10">{i + 1}</span>
              <p className="font-display text-fire text-3xl uppercase">{p.name}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          The FUD Arsenal carries three categories: collectible weapons, traps/debuffs and arena disasters. Baseline FUD
          events may stay random; Top 100 powers are a separate, deliberate action.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="slab overflow-hidden rounded-2xl">
            <div className="bg-secondary px-6 py-3"><p className="font-display text-lg uppercase text-foreground">Who qualifies — illustration</p></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[440px] text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-widest text-muted-foreground">
                    <th className="px-5 py-3">Player</th><th className="px-5 py-3">Rank</th><th className="px-5 py-3 text-right">Activated XP</th><th className="px-5 py-3 text-center">Powers</th><th className="px-5 py-3 text-center">500K pool</th>
                  </tr>
                </thead>
                <tbody>
                  {BOARD_ROWS.map((r) => (
                    <tr key={r.who} className="border-t border-border">
                      <td className="px-5 py-3 font-bold text-foreground">{r.who}</td>
                      <td className="font-display px-5 py-3 text-lg text-ember">#{r.rank}</td>
                      <td className="px-5 py-3 text-right font-bold text-foreground">{r.xp}</td>
                      <td className="px-5 py-3 text-center font-black">{r.powers ? <span className="text-primary">YES</span> : <span className="text-muted-foreground">NO</span>}</td>
                      <td className="px-5 py-3 text-center font-black">{r.pool ? <span className="text-primary">YES</span> : <span className="text-muted-foreground">NO</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-4">
            <div className="slab rounded-2xl p-6">
              <p className="text-xs font-black uppercase tracking-widest text-primary">Season 1 fighter prize pool</p>
              <p className="font-display text-fire mt-1 text-5xl">500,000 $SAVIOUR</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Eligible: official Top 100 <b className="text-foreground">and</b> at least 100,000 activated fighting XP at the published snapshot.
                The pro-rata formula isn't final — no equal shares or automatic payments are implied.
              </p>
            </div>
            <Notice label="Fairness rule pending">Whether rank-gated advantages can affect XP earned against the CPU, and whether asymmetric powers are allowed in wagered PvP, is still being defined.</Notice>
          </div>
        </div>
      </div>
    </section>
  );
}

function SaviourSection() {
  return (
    <section id="saviour" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24">
      <Heading num="05" kicker="Referrals & token utility" title={<>Powered by <span className="text-fire">$SAVIOUR</span></>} />
      <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="slab rounded-2xl p-7">
          <p className="text-xs font-black uppercase tracking-widest text-primary">Referral system</p>
          <p className="font-display mt-2 text-6xl text-foreground">20%</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Earn referral XP equal to 20% of a referred player's successfully activated fighting XP — not raw fight XP
            or mere registration. Example: 10,000 activated XP → 2,000 referral XP.
          </p>
        </div>
        <div className="slab rounded-2xl p-7">
          <p className="text-xs font-black uppercase tracking-widest text-primary">Season 1 referral pool</p>
          <p className="font-display text-fire mt-2 text-5xl">100,000 $SAVIOUR</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Shared among the Top 50 qualified referrers on a separate Referral Leaderboard. Referral XP has no fixed
            $SAVIOUR value, doesn't count toward the 1,000,000 fighting-XP cap, and Top 50 referral rank alone doesn't
            unlock Top 100 powers.
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {UTILITIES.map((u) => (
          <div key={u.t} className="slab rounded-2xl p-6">
            <p className="font-display text-xl uppercase text-primary">{u.t}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Notice label="Activation SOL use">50% of activation payments goes to Season 2 XP activation rewards and $SAVIOUR buyback-and-burn; 50% supports development and marketing.</Notice>
        <Notice label="Treasury disclosure">The combined 600,000-token Season 1 pools require explicit funding, custody, eligibility and distribution approvals. They are not represented as escrowed or distributed.</Notice>
      </div>
    </section>
  );
}

function RoadmapSection() {
  return (
    <section id="roadmap" className="scroll-mt-20 border-y-2 border-border bg-abyss py-24">
      <div className="mx-auto max-w-7xl px-4">
        <Heading num="06" kicker="V1 release roadmap" title="Launch gates">
          A landing page or clearly labelled non-rewarded beta may launch before the token-reward programme. Reward
          claims come only after the relevant gates pass.
        </Heading>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ROADMAP.map((g, i) => (
            <div key={g.gate} className="slab relative rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className={`font-display flex h-12 w-12 items-center justify-center rounded-xl text-xl ${i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>{g.gate}</span>
                <p className="font-display text-xl uppercase text-foreground">{g.title}</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{g.cond}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Notice label="Fair play">Server-authorised deterministic CPU replays, protection against bot farming, multi-wallet abuse and self-referral, and the official rank snapshot as the single source of truth for powers and pool eligibility.</Notice>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-4 py-24">
      <Heading num="07" kicker="Answers" title="FAQ" />
      <div className="space-y-3">
        {FAQS.map((f) => (
          <details key={f.q} className="slab group rounded-xl px-6 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-foreground">
              {f.q}
              <span className="font-display text-3xl text-primary transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-4 border-primary bg-abyss py-14">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 text-center">
        <img src={LOGO_URL} alt="Trench Brawl logo" className="h-20 w-20 rounded-2xl object-cover" />
        <p className="font-display text-2xl uppercase tracking-wide text-primary">Fight · Outplay · Dominate</p>
        <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
          XP is a game progression record, not a present or guaranteed token balance or investment return. Ranking and
          eligibility may change. Planned prizes require independently verified treasury funding and published rules.
          No liquidity, exchange listing, price increase or return is promised. Future PvP wagers require separate legal
          and operational approval. The token programme, activated-XP competition, Top 100 FUD powers, $SAVIOUR
          distribution and V2 wagers are not claimed to be live.
        </p>
        <p className="text-xs text-muted-foreground">Saviour Edition · Version 1.4 · 11 November 2026 · trenchbrawl.xyz</p>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <StatsStrip />
        <OverviewSection />
        <FightersSection />
        <XpSection />
        <PowersSection />
        <SaviourSection />
        <RoadmapSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
