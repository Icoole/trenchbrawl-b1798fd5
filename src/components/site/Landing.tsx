import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Copy, Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
const SOCIALS = [
  { name: "X / Twitter", url: "https://x.com/Trench_brawl" },
  { name: "Telegram", url: "https://t.me/Trench_brawl" },
  { name: "YouTube", url: "https://www.youtube.com/@Trench_brawl" },
];
const DISCORD_HANDLE = "Trench_brawl";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Fighters", to: "/fighters" },
  { label: "Rewards", to: "/rewards" },
  { label: "Roadmap & FAQ", to: "/roadmap" },
] as const;

const STATS = [
  { value: "100 XP", label: "Per verified CPU win" },
  { value: "1,000", label: "Qualifying XP per proposed activation block" },
  { value: "500K", label: "Planned Season 1 fighter pool" },
  { value: "100K", label: "Planned Season 1 referral pool" },
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
  { q: "Does referral XP count toward fighting XP or the Battle Board?", a: "No. Referral XP is tracked separately, does not count toward activated fighting XP or the 1,000,000 fighting-XP cap, and never silently changes the official Battle Board rank." },
  { q: "Can a Top 50 referrer use Top 100 combat powers?", a: "No. Referral rank alone does not grant FUD CALL, FUD ESCAPE or fighter special moves; those are tied to official Top 100 fighter rank." },
  { q: "Are token pools funded or held in escrow?", a: "The documents do not claim that the combined 600,000 $SAVIOUR Season 1 pools are funded, escrowed, liquid or distributed. Funding and custody must be approved and verified first." },
  { q: "Is the token address independently verified?", a: "The address is confirmed by the project owner for documentation, but independent on-chain mint, authority, balance and treasury verification is still required before public distributions." },
  { q: "Can I earn XP as a guest?", a: "Guests can practice against the CPU, but guest fights do not save rewards or create rank-based entitlements." },
  { q: "Is the X handle on a player profile verified?", a: "No. A profile handle is self-declared; entering it does not prove ownership of the X account." },
  { q: "When do FUD CALL, FUD ESCAPE and special moves launch?", a: "They are planned rank-based powers, not claimed as live. Their charges, cooldowns, timing and fair-play rules still need approval and verified implementation." },
  { q: "What is planned for V2?", a: "Human-versus-human play and proposed $SAVIOUR wagering are future plans only; they require separate technical, legal and operational approval." },
  { q: "Does XP guarantee a token balance or return?", a: "No. XP records game progression and does not promise tokens, liquidity, exchange listings, price increases or investment returns." },
];

const OPEN_DECISIONS = [
  { decision: "Approve the final 14-fighter roster and verify every move and hitbox.", before: "V1 fighter sign-off" },
  { decision: "Approve the replacement interface and map every screen and feature.", before: "UI migration" },
  { decision: "Confirm the source, ownership and custody of both Season 1 pools.", before: "Prize announcement or payout" },
  { decision: "Publish both pool formulas, dates, snapshots, tie-breaks, rounding and unallocated-token treatment.", before: "Reward distribution" },
  { decision: "Set when Top 100 powers begin and how rank changes affect an active fight.", before: "Powers release" },
  { decision: "Approve the FUD list, charges, cooldowns, overlapping effects and target rules.", before: "FUD launch" },
  { decision: "Publish the activation-proceeds split, burn reporting and Season 2 allocation.", before: "Activation launch" },
  { decision: "Confirm the status of earlier Dominant Fighter community-token airdrops.", before: "Official public docs" },
  { decision: "Reconfirm the earlier 400M referral-XP and 1B fighting-XP accounting ceilings.", before: "Season rules" },
  { decision: "Set the V2 platform fee and rules for combat-power fairness in PvP.", before: "V2" },
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
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-border bg-abyss/85 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5 lg:flex lg:justify-between">
        <Link to="/" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-3">
          <img src={LOGO_URL} alt="Trench Brawl logo" className="h-11 w-11 rounded-lg object-cover" />
          <span className="font-display truncate text-xl uppercase text-foreground">Trench <span className="text-primary">Brawl</span></span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} activeProps={{ className: "text-primary bg-secondary" }} className="rounded-lg px-3 py-2 text-sm font-black uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-primary">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/fighters" className="btn-game font-display hidden rounded-xl px-5 py-2 text-lg uppercase sm:inline-flex">Play</Link>
          <Button type="button" variant="outline" size="icon" className="lg:hidden" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t-2 border-border bg-abyss px-4 py-3 shadow-xl lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} activeProps={{ className: "bg-secondary text-primary" }} className="rounded-lg px-4 py-3 text-sm font-black uppercase text-muted-foreground hover:bg-secondary hover:text-primary">
                {l.label}
              </Link>
            ))}
            <Link to="/fighters" onClick={() => setOpen(false)} className="btn-game mt-2 rounded-lg px-4 py-3 text-center font-display text-lg uppercase sm:hidden">Choose a fighter</Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_40%,color-mix(in_oklab,var(--color-ember)_30%,transparent),transparent_70%)]" />
      <div className="relative mx-auto grid min-h-[92svh] max-w-7xl items-center gap-6 px-4 lg:grid-cols-[1fr_1.15fr]">
        <div className="relative z-10 py-12 text-center lg:text-left">
          <p className="inline-flex -rotate-2 items-center gap-2 rounded-lg border-2 border-primary bg-primary px-3 py-2 text-xs font-black uppercase text-primary-foreground shadow-lg">
            <Sparkles aria-hidden="true" className="size-4" /> Arcade mode: on
          </p>
          <h1 className="text-fire mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">Pick a fight.<br />Make a legend.</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            A meme-inspired, Solana-connected fighting game. In V1, pick a fighter and take on the CPU in a
            non-wagered, single-round match. Verified wins earn fighting XP; seasonal rewards and rank powers
            remain subject to their published launch conditions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link to="/fighters" className="btn-game font-display rounded-xl px-8 py-3 text-xl uppercase">Choose fighter</Link>
            <Link to="/rewards" className="font-display rounded-xl border-2 border-border bg-card px-8 py-3 text-xl uppercase text-foreground transition-colors hover:border-primary">Rewards</Link>
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
    ["V1 format", "Single-round CPU · no wagers"], ["Launch roster target", "14 fighters · final audit pending"],
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
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Notice label="Wallet & profile">V1 wallet sign-in uses a Solana wallet signature, not email or password. Profiles include a self-declared X handle and Dominant Fighter; the handle is not verified for account ownership.</Notice>
            <Notice label="Practice access">Guests may practice CPU fights without saving rewards or receiving rank-based entitlements. Token ownership is not required to play V1.</Notice>
          </div>
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

function EarlierBuildSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24">
      <div className="grid gap-6 border-y-2 border-border py-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div>
          <p className="text-xs font-black uppercase text-ember">From the earlier build · archive</p>
          <h2 className="font-display mt-2 text-3xl uppercase text-foreground">The brawl has levelled up</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The first version introduced the XP-and-claim idea. Its reward figures and token references were proposals, not current rules.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="font-display text-xl uppercase text-primary">Old draft flow</p>
            <p className="mt-2 text-sm font-bold text-foreground">100 wins → 1,000 XP → 0.1 SOL → 500 $TRENCH</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Superseded. The current version uses $SAVIOUR season pools and does not promise a fixed token conversion.</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="font-display text-xl uppercase text-primary">Old 24-hour claim states</p>
            <p className="mt-2 text-sm font-bold text-foreground">Accumulating · Ready · Claimed · Expired</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Shown as a previous-version feature; current eligibility and activation follow the latest published rules.</p>
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
          <Notice label="Roster control">The launch target is 14 fighters; nine are reported playable. This gallery is not a final roster approval: earlier lists conflict (including WikiCat versus MOG and TURBO). Fighter identities, moves, animations and hitboxes still require sign-off.</Notice>
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
          <Notice label="Activation safeguards">Activation is proposed at 0.1 SOL per completed 1,000-XP block, with a 24-hour claim window after it becomes claimable. Wallet-linked payment verification, server-side expiry and fraud checks are required. Refund, cancellation and support rules still need to be made clear before activation opens.</Notice>
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Notice label="Battle Board rules">The official Board ranks qualified players by activated fighting XP. Before activation opens, any Board must be labelled provisional and may use verified earned XP; it must not be presented as the activated-XP Top 100. Referral XP never silently counts toward this ranking.</Notice>
        <Notice label="Accounting boundaries">Earned XP, activated fighting XP, referral XP, expired XP and reversals are separate categories. The existing 1,000,000 XP per-player cap and 1,000,000,000 XP programme ceiling are accounting assumptions, not a fixed token conversion; both remain subject to season-rule confirmation.</Notice>
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

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Notice label="FUD CALL rules">A call targets an opponent with an approved FUD move (for example, an FTX-style hammer) without harming the caller. Every event should record its ID, initiator, target, activation tick and effects in deterministic replay.</Notice>
          <Notice label="FUD ESCAPE rules">Escape the protected FUD without losing health. Charges, cooldowns and treatment of non-health debuffs still need a defined rule enforced by the combat simulation.</Notice>
          <Notice label="Special move rules">Fighter-specific attacks need approved animations, hitboxes, balance, availability rules and verified replay support before release.</Notice>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Power access should use an authoritative published rank check at an approved match or action boundary, not browser-editable state. The client and trusted replay verifier must agree on FUD rules, CPU responses, seeds, cooldowns and per-tick inputs; otherwise fair fights may fail verification or invalid play may pass.</p>

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
        <Notice label="Referral integrity">Referral XP is 20% of a referred player's successfully activated fighting XP—not raw wins or wallet registration. It is tracked separately, with anti-self-referral controls, no recursive earnings and audited reversals. A previous 400,000,000 referral-XP ceiling is only an older assumption pending confirmation.</Notice>
        <Notice label="V2 fee proposal">A previous proposal discussed a 5% fee on the combined PvP wager pool; it must be reconfirmed before V2. If approved, the current proposal directs 50% of future PvP platform fees to buyback-and-burn and 50% to development and marketing. No V1 CPU wager or battle-fee distribution exists.</Notice>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Notice label="Activation SOL use">50% of collected activation payments is designated collectively for Season 2 XP activation rewards and $SAVIOUR buyback-and-burn; 50% supports development and marketing. The split within the first half and public reporting are not yet specified.</Notice>
        <Notice label="Treasury disclosure">The combined 600,000-token Season 1 pools require explicit funding, custody, eligibility and distribution approvals. They are not represented as escrowed or distributed.</Notice>
      </div>
      <div className="mt-4">
        <Notice label="Superseded economics">This release replaces earlier $TRENCH allocations, fixed token-per-XP equations, NFT rewards, Top 100 PvP fee-sharing and token-holder-threshold special powers. Earlier Dominant Fighter community-token airdrop status remains to be confirmed.</Notice>
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
          <Notice label="Fair play & integrity">Use a server-authorised deterministic CPU replay and atomic settlement model, with production deployment separately approved. Disable legacy browser-authorised XP award paths in production; preserve idempotency, rate limits, rejection audit trails and account isolation. Protect against bot farming, replay/seed reuse, scripted submissions, multi-wallet abuse and self-referrals—replay consistency alone does not prove a human played. The official rank snapshot must control powers and pool eligibility, including rank corrections and entry/exit timing. Changes to hitboxes, FUD, AI, fighters or attacks require regenerated replay assets and hash regression tests.</Notice>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Notice label="Player protections">Use only project-owned or properly licensed music and sound effects; provide mute and volume controls and readable FUD indicators. Preserve guest practice, wallet-signature sign-in, data minimization and separation between staging and live systems. Prepare privacy, terms, support and incident-response information.</Notice>
          <Notice label="Wagering review">Any future wagered PvP needs jurisdiction-specific legal advice and reviews covering custody, contest and gambling rules, fairness, payouts and settlement. V2 wagering is not part of V1 and is not claimed to be live.</Notice>
        </div>
        <div className="mt-12">
          <Heading num="08" kicker="Before launch" title="Open decisions" />
          <div className="slab overflow-hidden rounded-xl">
            {OPEN_DECISIONS.map((item) => (
              <div key={item.decision} className="grid gap-2 border-b border-border px-5 py-4 last:border-0 sm:grid-cols-[1fr_auto] sm:items-center">
                <span className="text-sm leading-relaxed text-foreground">{item.decision}</span>
                <span className="text-xs font-black uppercase text-primary">Before: {item.before}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <Notice label="Reported status at publication">The team reports a working staging build with CPU replay verification and XP settlement. The token programme, public activated-XP competition, Top 100 FUD powers, $SAVIOUR distributions and V2 wagers are not claimed to be live. A non-rewarded landing page or clearly labelled beta can precede reward-programme launch.</Notice>
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
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3" aria-label="Trench Brawl social accounts">
          {SOCIALS.map((social) => (
            <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="text-sm font-black uppercase text-foreground underline decoration-primary underline-offset-4 transition-colors hover:text-primary">{social.name}<span className="sr-only"> (opens in a new tab)</span></a>
          ))}
          <span className="text-sm font-black uppercase text-foreground">Discord: {DISCORD_HANDLE}</span>
        </div>
        <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
          XP is a game progression record, not a present or guaranteed token balance or investment return. Ranking and
          eligibility may change. Planned prizes require independently verified treasury funding and published rules.
          No liquidity, exchange listing, price increase or return is promised. Future PvP wagers require separate legal
          and operational approval. The token programme, activated-XP competition, Top 100 FUD powers, $SAVIOUR
          distribution and V2 wagers are not claimed to be live.
        </p>
        <p className="font-display text-lg uppercase text-ember">GGs only · Rematch whenever · trenchbrawl.xyz</p>
        <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">The token address is owner-confirmed for documentation; independent mint, authority, balance and treasury verification is required before distributions. XP is progression—not a token balance, investment return or promise of liquidity, listing or price movement. Activation must disclose its fee, expiry, cancellation/refund and support rules.</p>
      </div>
    </footer>
  );
}

export type LandingPage = "home" | "fighters" | "rewards" | "roadmap";

export default function Landing({ page = "home" }: { page?: LandingPage }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        {page === "home" ? <><Hero /><StatsStrip /><OverviewSection /><EarlierBuildSection /></> : null}
        {page === "fighters" ? <FightersSection /> : null}
        {page === "rewards" ? <><XpSection /><PowersSection /><SaviourSection /></> : null}
        {page === "roadmap" ? <><RoadmapSection /><FaqSection /></> : null}
      </main>
      <Footer />
    </div>
  );
}
