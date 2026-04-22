import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

/* ═══════════════════════════════════════════════
   TYPES & CONSTANTS
═══════════════════════════════════════════════ */
type Tier   = "B" | "A" | "A+" | "S" | "S+";
type Domain = "ALL" | "CODING" | "TECH" | "GAMING" | "NON-TECH";

interface EventData {
  id           : number;
  title        : string;
  image        : string;
  domain       : Exclude<Domain, "ALL">;
  description  : string;
  rulebook     : string;
  registerLink : string;
  tier         : Tier;
  rating       : number;
  handling     : number;
  traction     : string;
  topSpeed     : number;
  regTime      : string;
  owned        : boolean;
  badge        : string;
}

const TIER_COLORS: Record<Tier, string> = {
  B   : "#7ec8e3",
  A   : "#a3d977",
  "A+": "#f0c040",
  S   : "#f07840",
  "S+": "#40c8a0",
};

const DOMAIN_COLORS: Record<Exclude<Domain, "ALL">, string> = {
  CODING     : "#FF00A8",
  TECH       : "#00F0FF",
  GAMING     : "#a855f7",
  "NON-TECH" : "#f0c040",
};

const ALL_TIERS: Tier[] = ["B", "A", "A+", "S", "S+"];
const DOMAINS: Domain[] = ["ALL", "CODING", "TECH", "GAMING", "NON-TECH"];

const ALL_EVENTS: EventData[] = [
  {
    id: 1, title: "AI CHALLENGE", image: "/event1.png", domain: "CODING",
    description: "Build ML models, crush the leaderboard, and prove your algorithmic supremacy in a timed hackathon.",
    rulebook: "#", registerLink: "#", tier: "A+", rating: 264, handling: 72,
    traction: "RWD", topSpeed: 190, regTime: "2.5", owned: true, badge: "A⁺ 264",
  },
  {
    id: 2, title: "DRONE RACE", image: "/event2.png", domain: "TECH",
    description: "High-speed FPV drone racing through a precision obstacle course. Fastest lap wins.",
    rulebook: "#", registerLink: "#", tier: "S", rating: 309, handling: 88,
    traction: "AWD", topSpeed: 210, regTime: "1.8", owned: true, badge: "S 309",
  },
  {
    id: 3, title: "WEB SPRINT", image: "/event3.png", domain: "CODING",
    description: "60 minutes. One prompt. Build the fastest, cleanest web app and deploy it live.",
    rulebook: "#", registerLink: "#", tier: "A", rating: 273, handling: 60,
    traction: "FWD", topSpeed: 175, regTime: "3.0", owned: true, badge: "A 273",
  },
  {
    id: 4, title: "CIRCUIT KING", image: "/event1.png", domain: "GAMING",
    description: "Esports tournament across multiple titles. Prove your reaction speed and game sense.",
    rulebook: "#", registerLink: "#", tier: "S+", rating: 329, handling: 95,
    traction: "AWD", topSpeed: 225, regTime: "1.2", owned: true, badge: "S⁺ 329",
  },
  {
    id: 5, title: "DEBATE RACE", image: "/event2.png", domain: "NON-TECH",
    description: "Lightning-round debate battles. Sharp mind, sharper tongue. Two minutes to dominate.",
    rulebook: "#", registerLink: "#", tier: "B", rating: 199, handling: 45,
    traction: "FWD", topSpeed: 155, regTime: "4.0", owned: true, badge: "B 199",
  },
  {
    id: 6, title: "ROBO WARS", image: "/event3.png", domain: "TECH",
    description: "Remote-controlled combat bots battle in an arena. Last bot rolling wins the crown.",
    rulebook: "#", registerLink: "#", tier: "S+", rating: 399, handling: 92,
    traction: "AWD", topSpeed: 240, regTime: "1.0", owned: true, badge: "S⁺ 399",
  },
  {
    id: 7, title: "CTF BLITZ", image: "/event1.png", domain: "CODING",
    description: "Capture-the-flag cybersecurity challenge. Exploit, crack, and pwn your way to 1st.",
    rulebook: "#", registerLink: "#", tier: "S", rating: 312, handling: 80,
    traction: "RWD", topSpeed: 198, regTime: "2.0", owned: true, badge: "S 312",
  },
  {
    id: 8, title: "PIXEL CRAFT", image: "/event2.png", domain: "GAMING",
    description: "24-hour game jam. Design, code, and ship a playable game from scratch. Judges rate creativity.",
    rulebook: "#", registerLink: "#", tier: "A+", rating: 278, handling: 68,
    traction: "FWD", topSpeed: 182, regTime: "3.5", owned: true, badge: "A⁺ 278",
  },
  {
    id: 9, title: "QUIZ BLITZ", image: "/event3.png", domain: "NON-TECH",
    description: "General knowledge speed quiz. Buzzers, sudden death rounds, and winner-takes-all final.",
    rulebook: "#", registerLink: "#", tier: "A", rating: 241, handling: 55,
    traction: "FWD", topSpeed: 165, regTime: "2.0", owned: true, badge: "A 241",
  },
  {
    id: 10, title: "CIRCUIT DASH", image: "/event1.png", domain: "TECH",
    description: "Arduino-powered line-following robot race. Fastest auto-navigation wins the cup.",
    rulebook: "#", registerLink: "#", tier: "A+", rating: 287, handling: 76,
    traction: "AWD", topSpeed: 195, regTime: "2.2", owned: true, badge: "A⁺ 287",
  },
];

/* ═══════════════════════════════════════════════
   HOOK — detect mobile
═══════════════════════════════════════════════ */
function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return mobile;
}

/* ═══════════════════════════════════════════════
   ROOT EXPORT — picks layout
═══════════════════════════════════════════════ */
export default function AAAEvents() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}

/* ═══════════════════════════════════════════════
   DESKTOP LAYOUT  (unchanged)
═══════════════════════════════════════════════ */
function DesktopLayout() {
  const [activeDomain, setActiveDomain] = useState<Domain>("ALL");
  const [activeIndex, setActiveIndex]   = useState(0);
  const glowRef   = useRef<HTMLDivElement>(null);
  const mainImgRef= useRef<HTMLDivElement>(null);
  const panelRef  = useRef<HTMLDivElement>(null);
  const stripRef  = useRef<HTMLDivElement>(null);

  const filtered    = activeDomain === "ALL" ? ALL_EVENTS : ALL_EVENTS.filter(e => e.domain === activeDomain);
  const safeIndex   = Math.min(activeIndex, filtered.length - 1);
  const active      = filtered[safeIndex];
  const domColor    = DOMAIN_COLORS[active.domain];

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (glowRef.current) gsap.to(glowRef.current, { x: e.clientX-120, y: e.clientY-120, duration: 0.25, ease: "power2.out" });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    if (mainImgRef.current) gsap.fromTo(mainImgRef.current, { opacity:0, scale:0.94, x:-24 }, { opacity:1, scale:1, x:0, duration:0.5, ease:"power3.out" });
    if (panelRef.current)   gsap.fromTo(panelRef.current,   { opacity:0, x:24 },             { opacity:1, x:0,    duration:0.5, ease:"power3.out" });
  }, [safeIndex, activeDomain]);

  useEffect(() => {
    if (!stripRef.current) return;
    (stripRef.current.children[safeIndex] as HTMLElement|null)?.scrollIntoView({ behavior:"smooth", block:"nearest", inline:"center" });
  }, [safeIndex]);

  const handleDomainChange = (d: Domain) => { setActiveDomain(d); setActiveIndex(0); };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none" style={{ background:"#0d0d14", fontFamily:"'Orbitron',sans-serif" }}>
      {/* cursor glow */}
      <div ref={glowRef} className="fixed pointer-events-none w-[240px] h-[240px] rounded-full opacity-20 blur-3xl z-50"
        style={{ background:`radial-gradient(circle,${domColor},transparent 70%)` }} />
      {/* scanlines */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundImage:"repeating-linear-gradient(0deg,rgba(0,0,0,.10) 0px,rgba(0,0,0,.10) 1px,transparent 1px,transparent 3px)" }} />
      {/* vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background:"radial-gradient(ellipse at center,transparent 35%,rgba(0,0,0,.80) 100%)" }} />

      {/* ── TOP BAR ── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-3"
        style={{ background:"linear-gradient(to bottom,rgba(0,0,0,.92),transparent)", borderBottom:"1px solid rgba(255,255,255,.05)" }}>
        <div className="flex items-center gap-2 text-[11px] tracking-[.25em] uppercase">
          <span style={{ color:"rgba(255,255,255,.4)" }}>EVENTS</span>
          <span style={{ color:"rgba(255,255,255,.25)" }}>/</span>
          <span style={{ color:"rgba(255,255,255,.9)", fontWeight:700 }}>ALL EVENTS</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 text-[12px] font-bold"
          style={{ background:"rgba(0,0,0,.5)", border:"1px solid rgba(255,255,255,.1)", color:"#40c8a0", letterSpacing:".1em" }}>
          <span style={{ color:"rgba(255,255,255,.4)", fontSize:10 }}>XP</span>1,084,260
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="absolute inset-0 flex" style={{ paddingTop:44, paddingBottom:156 }}>

        {/* LEFT BIG IMAGE */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          <div className="absolute w-[700px] h-[460px] rounded-full blur-[130px] opacity-20 pointer-events-none"
            style={{ background:`radial-gradient(circle,${domColor},transparent 70%)`, transition:"background .5s" }} />
          <div ref={mainImgRef} className="relative" style={{ width:"92%", maxWidth:860, height:"82%", zIndex:20 }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background:`linear-gradient(135deg,${domColor}28,transparent 60%)`, border:`1.5px solid ${domColor}50`, clipPath:clip, transition:"border-color .4s" }} />
            <img src={active.image} alt={active.title} className="w-full h-full object-cover" style={{ clipPath:clip }}
              onError={e => { (e.target as HTMLImageElement).src = ph(active.title, domColor); }} />
            {active.owned && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ clipPath:clip }}>
                <span style={{ fontFamily:"'NFS','Orbitron',sans-serif", fontSize:"clamp(90px,15vw,180px)", color:"rgba(255,255,255,.055)",
                  letterSpacing:".08em", textTransform:"uppercase", textShadow:`0 0 100px ${domColor}33`, userSelect:"none" }}>OWNED</span>
              </div>
            )}
            <CornerAccents color={domColor} />
            <div className="absolute top-5 left-5 px-3 py-1 text-[9px] font-bold tracking-[.3em]"
              style={{ background:`${domColor}1a`, border:`1px solid ${domColor}77`, color:domColor }}>{active.domain}</div>
            <div className="absolute top-5 right-5 flex items-center gap-1 px-2 py-1"
              style={{ background:"rgba(0,0,0,.65)", border:`1px solid ${TIER_COLORS[active.tier]}88` }}>
              <TierBadge tier={active.tier} />
              <span className="text-[11px] font-bold font-mono" style={{ color:"rgba(255,255,255,.75)" }}>{active.rating}</span>
            </div>
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center" style={{ zIndex:25 }}>
            <h2 className="text-[clamp(20px,2.8vw,32px)] font-black tracking-widest uppercase"
              style={{ fontFamily:"'Orbitron',sans-serif", textShadow:`0 0 24px ${domColor}99`, transition:"text-shadow .4s" }}>{active.title}</h2>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div ref={panelRef} className="flex flex-col gap-2 py-4 pr-4 pl-1" style={{ width:290, zIndex:30, overflowY:"auto" }}>
          <SBox>
            <div className="text-[9px] tracking-[.3em] text-white/35 uppercase mb-1">UNITRON 2K25</div>
            <div className="text-[13px] font-bold tracking-widest uppercase text-white">{active.title}</div>
            <div className="flex items-center gap-2 mt-2"><TierBadge tier={active.tier}/><span className="text-white/55 text-[11px] font-mono">{active.rating}</span></div>
          </SBox>

          <SBox label="TARGET TIER">
            <div className="flex gap-1 mt-1">
              {ALL_TIERS.map(t => (
                <div key={t} className="flex-1 py-1 text-center text-[9px] font-bold" style={{
                  background: t===active.tier ? TIER_COLORS[t] : "rgba(255,255,255,.06)",
                  color: t===active.tier ? "#000" : "rgba(255,255,255,.35)",
                  border: t===active.tier ? `1px solid ${TIER_COLORS[t]}` : "1px solid rgba(255,255,255,.07)",
                  transition:"all .3s" }}>{t}</div>
              ))}
            </div>
          </SBox>

          <SBox>
            <div className="flex justify-between text-[9px] uppercase tracking-widest text-white/35 mb-1">
              <span>DIFFICULTY</span><span style={{ color:"#f0c040" }}>{active.handling}%</span>
            </div>
            <div className="flex items-center gap-2 text-[8px] text-white/25">
              <span>EASY</span>
              <div className="flex-1 h-[3px] rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width:`${active.handling}%`, background:`linear-gradient(to right,#f0c040,${domColor})` }} />
              </div>
              <span>HARD</span>
            </div>
          </SBox>

          <SBox label="INTENSITY">
            <div className="flex items-center justify-between mt-1">
              <div className="flex gap-[3px] items-center">
                {[0,1,2,3,4].map(n => (
                  <div key={n} className="w-5 h-[3px] rounded-sm transition-all duration-500"
                    style={{ background: n < Math.floor(active.handling/20) ? domColor : "rgba(255,255,255,.12)" }} />
                ))}
              </div>
              <span className="text-[11px] font-bold" style={{ color:"rgba(255,255,255,.65)" }}>{active.traction}</span>
            </div>
          </SBox>

          <SBox>
            <SRow label="ROAD"          value="ON-SITE"              />
            <SRow label="SCORE LIMIT"   value={String(active.topSpeed)} />
            <SRow label="DURATION [hrs]" value={active.regTime}       />
          </SBox>

          <SBox label="ABOUT">
            <p className="text-[11px] text-white/45 leading-relaxed mt-1">{active.description}</p>
          </SBox>

          <div className="flex flex-col gap-2 mt-1">
            <a href={active.registerLink}
              className="flex items-center justify-center gap-2 py-[10px] font-bold text-[11px] tracking-[.2em] uppercase transition-all duration-200 hover:brightness-110 active:scale-[.97]"
              style={{ background:`linear-gradient(90deg,${domColor}cc,${domColor}88)`, border:`1px solid ${domColor}`,
                boxShadow:`0 0 16px ${domColor}55,0 0 4px ${domColor}66 inset`, color:"#fff", letterSpacing:".2em" }}>
              ✦ REGISTER
            </a>
            <a href={active.rulebook}
              className="flex items-center justify-center gap-2 py-[9px] font-bold text-[11px] tracking-[.2em] uppercase transition-all duration-200 hover:bg-white/10 active:scale-[.97]"
              style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.18)", color:"rgba(255,255,255,.75)" }}>
              ↓ DOWNLOAD RULEBOOK
            </a>
          </div>
        </div>
      </div>

      {/* ── THUMBNAIL STRIP ── */}
      <div ref={stripRef} className="absolute left-0 right-0 z-30 flex items-stretch px-3 gap-[6px] overflow-x-auto"
        style={{ bottom:48, height:108, background:"linear-gradient(to top,rgba(0,0,0,.97),rgba(0,0,0,.55))",
          borderTop:"1px solid rgba(255,255,255,.07)", scrollbarWidth:"none" }}>
        {filtered.map((ev, i) => {
          const isActive = i === safeIndex;
          const dc = DOMAIN_COLORS[ev.domain];
          return (
            <button key={ev.id} onClick={() => { if(i!==safeIndex) setActiveIndex(i); }}
              className="relative flex-shrink-0 flex flex-col overflow-hidden transition-all duration-300"
              style={{ width:isActive?155:125, border:isActive?`1.5px solid ${dc}`:"1px solid rgba(255,255,255,.09)",
                boxShadow:isActive?`0 0 18px ${dc}55`:"none", background:"rgba(0,0,0,.5)",
                transform:isActive?"scaleY(1.04)":"none", transformOrigin:"bottom center" }}>
              <img src={ev.image} alt={ev.title} className="w-full object-cover"
                style={{ flex:1, minHeight:0, opacity:isActive?1:.5 }}
                onError={e => { (e.target as HTMLImageElement).src = ph(ev.title, dc, "130x80"); }} />
              <div className="flex items-center justify-between px-2 py-[5px]"
                style={{ background:isActive?`${dc}1a`:"rgba(0,0,0,.7)", borderTop:`1px solid ${isActive?dc+"55":"rgba(255,255,255,.06)"}` }}>
                <span className="text-[8px] font-bold tracking-widest" style={{ color:isActive?dc:"rgba(255,255,255,.38)" }}>{ev.badge}</span>
                {ev.owned && <span className="text-[7px] tracking-widest text-white/30">OWNED</span>}
              </div>
            </button>
          );
        })}
        <div className="ml-auto flex items-end pb-[10px] pr-1 text-[9px] text-white/22 tracking-widest flex-shrink-0">
          {safeIndex+1} / {filtered.length}
        </div>
      </div>

      {/* ── DOMAIN NAV ── */}
      <div className="absolute bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-2 px-6"
        style={{ height:48, background:"rgba(4,4,12,.98)", borderTop:"1px solid rgba(255,255,255,.09)" }}>
        {DOMAINS.map(d => {
          const isAct = d === activeDomain;
          const col = d==="ALL" ? "#ffffff" : DOMAIN_COLORS[d as Exclude<Domain,"ALL">];
          return (
            <button key={d} onClick={() => handleDomainChange(d)}
              className="relative px-5 py-1.5 text-[9px] font-bold tracking-[.25em] uppercase transition-all duration-200"
              style={{ background:isAct?`${col}18`:"transparent", border:isAct?`1px solid ${col}88`:"1px solid transparent",
                color:isAct?col:"rgba(255,255,255,.35)", boxShadow:isAct?`0 0 12px ${col}44`:"none" }}>
              {d}
              {isAct && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-3/4"
                style={{ background:col, boxShadow:`0 0 6px ${col}` }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MOBILE LAYOUT
═══════════════════════════════════════════════ */
function MobileLayout() {
  const [activeDomain, setActiveDomain] = useState<Domain>("ALL");
  const [activeIndex,  setActiveIndex]  = useState(0);
  const [drawerOpen,   setDrawerOpen]   = useState(false);

  const filtered  = activeDomain === "ALL" ? ALL_EVENTS : ALL_EVENTS.filter(e => e.domain === activeDomain);
  const safeIndex = Math.min(activeIndex, filtered.length - 1);
  const active    = filtered[safeIndex];
  const domColor  = DOMAIN_COLORS[active.domain];

  /* swipe gesture */
  const touchStartX = useRef(0);
  const onTouchStart = useCallback((e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; }, []);
  const onTouchEnd   = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 50) return;
    setActiveIndex(i => {
      const ni = dx < 0 ? Math.min(i+1, filtered.length-1) : Math.max(i-1, 0);
      return ni;
    });
  }, [filtered.length]);

  /* animate card on change */
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current, { opacity:0, y:30, scale:.96 }, { opacity:1, y:0, scale:1, duration:.45, ease:"power3.out" });
  }, [safeIndex, activeDomain]);

  /* close drawer when event changes */
  useEffect(() => { setDrawerOpen(false); }, [safeIndex, activeDomain]);

  const handleDomainChange = (d: Domain) => { setActiveDomain(d); setActiveIndex(0); setDrawerOpen(false); };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none flex flex-col"
      style={{ background:"#0a0a12", fontFamily:"'Orbitron',sans-serif" }}>

      {/* ── SCANLINES ── */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ backgroundImage:"repeating-linear-gradient(0deg,rgba(0,0,0,.1) 0px,rgba(0,0,0,.1) 1px,transparent 1px,transparent 3px)" }} />

      {/* ── COLOUR BLOB ── */}
      <div className="absolute w-full h-64 top-0 pointer-events-none z-0 transition-all duration-700"
        style={{ background:`radial-gradient(ellipse at 50% 0%,${domColor}33,transparent 70%)` }} />

      {/* ── TOP BAR ── */}
      <div className="relative z-20 flex items-center justify-between px-4 pt-safe pt-3 pb-3"
        style={{ borderBottom:"1px solid rgba(255,255,255,.07)" }}>
        <div className="flex items-center gap-1.5 text-[9px] tracking-[.2em] uppercase">
          <span style={{ color:"rgba(255,255,255,.35)" }}>EVENTS</span>
          <span style={{ color:"rgba(255,255,255,.2)" }}>/</span>
          <span style={{ color:"rgba(255,255,255,.85)", fontWeight:700 }}>ALL EVENTS</span>
        </div>
        <div className="text-[10px] font-bold" style={{ color:"#40c8a0" }}>
          <span style={{ color:"rgba(255,255,255,.35)", fontSize:8, marginRight:4 }}>XP</span>1,084,260
        </div>
      </div>

      {/* ── MAIN CARD (swipeable) ── */}
      <div className="flex-1 relative flex flex-col items-center justify-center px-4 py-3 z-20 overflow-hidden"
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

        <div ref={cardRef} className="w-full flex flex-col" style={{ maxWidth:420 }}>

          {/* Event image */}
          <div className="relative w-full overflow-hidden" style={{
            height: "44vw", maxHeight: 240,
            clipPath: clipMobile,
            border: `1.5px solid ${domColor}55`,
          }}>
            <img src={active.image} alt={active.title} className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).src = ph(active.title, domColor, "420x240"); }} />

            {/* OWNED watermark */}
            {active.owned && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span style={{ fontFamily:"'NFS','Orbitron',sans-serif", fontSize:"clamp(48px,14vw,90px)",
                  color:"rgba(255,255,255,.07)", letterSpacing:".06em", userSelect:"none" }}>OWNED</span>
              </div>
            )}
            {/* domain badge */}
            <div className="absolute top-2 left-2 px-2 py-0.5 text-[8px] font-bold tracking-[.25em]"
              style={{ background:`${domColor}22`, border:`1px solid ${domColor}88`, color:domColor }}>{active.domain}</div>
            {/* tier badge */}
            <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5"
              style={{ background:"rgba(0,0,0,.7)", border:`1px solid ${TIER_COLORS[active.tier]}88` }}>
              <TierBadge tier={active.tier}/><span className="text-[9px] font-mono" style={{ color:"rgba(255,255,255,.7)" }}>{active.rating}</span>
            </div>
            {/* Swipe hint arrows */}
            {safeIndex > 0 && (
              <button onClick={() => setActiveIndex(i => i-1)}
                className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
                style={{ background:"rgba(0,0,0,.5)", border:"1px solid rgba(255,255,255,.15)", color:"rgba(255,255,255,.6)", fontSize:14 }}>‹</button>
            )}
            {safeIndex < filtered.length-1 && (
              <button onClick={() => setActiveIndex(i => i+1)}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
                style={{ background:"rgba(0,0,0,.5)", border:"1px solid rgba(255,255,255,.15)", color:"rgba(255,255,255,.6)", fontSize:14 }}>›</button>
            )}
          </div>

          {/* Title row */}
          <div className="flex items-center justify-between mt-3 px-1">
            <div>
              <h1 className="text-[18px] font-black tracking-widest uppercase leading-none"
                style={{ textShadow:`0 0 20px ${domColor}88` }}>{active.title}</h1>
              <p className="text-[10px] mt-0.5" style={{ color:"rgba(255,255,255,.35)" }}>{active.description.slice(0,60)}…</p>
            </div>
            {/* Info toggle */}
            <button onClick={() => setDrawerOpen(v => !v)}
              className="flex-shrink-0 ml-3 w-9 h-9 flex items-center justify-center transition-all"
              style={{ background: drawerOpen ? `${domColor}33` : "rgba(255,255,255,.06)",
                border: `1px solid ${drawerOpen ? domColor : "rgba(255,255,255,.12)"}`,
                color: drawerOpen ? domColor : "rgba(255,255,255,.5)", fontSize:16, borderRadius:4 }}>
              {drawerOpen ? "×" : "≡"}
            </button>
          </div>

          {/* Difficulty bar */}
          <div className="flex items-center gap-2 mt-3 px-1">
            <span className="text-[8px] tracking-widest text-white/30 uppercase">DIFFICULTY</span>
            <div className="flex-1 h-[3px] rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width:`${active.handling}%`, background:`linear-gradient(to right,#f0c040,${domColor})` }} />
            </div>
            <span className="text-[8px] font-bold" style={{ color:"#f0c040" }}>{active.handling}%</span>
          </div>

          {/* Tier strip */}
          <div className="flex gap-1 mt-3 px-1">
            {ALL_TIERS.map(t => (
              <div key={t} className="flex-1 py-1 text-center text-[8px] font-bold transition-all"
                style={{ background:t===active.tier?TIER_COLORS[t]:"rgba(255,255,255,.05)",
                  color:t===active.tier?"#000":"rgba(255,255,255,.3)",
                  border:t===active.tier?`1px solid ${TIER_COLORS[t]}`:"1px solid rgba(255,255,255,.07)" }}>{t}</div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-2 mt-3 px-1">
            <a href={active.registerLink}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 font-bold text-[10px] tracking-[.18em] uppercase transition-all active:scale-[.97]"
              style={{ background:`linear-gradient(90deg,${domColor}cc,${domColor}77)`,
                border:`1px solid ${domColor}`, boxShadow:`0 0 14px ${domColor}44`, color:"#fff" }}>
              ✦ REGISTER
            </a>
            <a href={active.rulebook}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 font-bold text-[10px] tracking-[.15em] uppercase transition-all active:scale-[.97]"
              style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.18)", color:"rgba(255,255,255,.7)" }}>
              ↓ RULEBOOK
            </a>
          </div>

          {/* Page dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {filtered.map((_, i) => (
              <button key={i} onClick={() => setActiveIndex(i)}
                className="rounded-full transition-all"
                style={{ width: i===safeIndex?20:6, height:6,
                  background: i===safeIndex ? domColor : "rgba(255,255,255,.2)" }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS DRAWER (slide up) ── */}
      <div className="absolute left-0 right-0 z-30 transition-all duration-400 ease-in-out"
        style={{
          bottom: 48,
          transform: drawerOpen ? "translateY(0)" : "translateY(100%)",
          maxHeight: "60vh",
          background: "rgba(8,8,18,.97)",
          border: "1px solid rgba(255,255,255,.09)",
          borderBottom: "none",
          overflowY: "auto",
        }}>
        {/* Handle */}
        <div className="flex justify-center py-2 cursor-pointer" onClick={() => setDrawerOpen(false)}>
          <div className="w-10 h-1 rounded-full" style={{ background:"rgba(255,255,255,.2)" }} />
        </div>

        <div className="px-4 pb-4 flex flex-col gap-2">
          <div className="text-[9px] tracking-[.3em] text-white/35 uppercase">UNITRON 2K25 — {active.title}</div>

          {/* Stat grid */}
          <div className="grid grid-cols-2 gap-2">
            <StatCell label="SCORE LIMIT"    value={String(active.topSpeed)} color={domColor} />
            <StatCell label="DURATION [hrs]" value={active.regTime}          color={domColor} />
            <StatCell label="TRACTION"       value={active.traction}         color={domColor} />
            <StatCell label="ROAD"           value="ON-SITE"                 color={domColor} />
          </div>

          {/* Intensity bars */}
          <div className="mt-1">
            <div className="text-[8px] tracking-[.3em] text-white/28 uppercase mb-1">INTENSITY</div>
            <div className="flex gap-1">
              {[0,1,2,3,4].map(n => (
                <div key={n} className="flex-1 h-[4px] rounded-sm transition-all"
                  style={{ background: n < Math.floor(active.handling/20) ? domColor : "rgba(255,255,255,.1)" }} />
              ))}
            </div>
          </div>

          {/* About */}
          <div className="mt-1">
            <div className="text-[8px] tracking-[.3em] text-white/28 uppercase mb-1">ABOUT</div>
            <p className="text-[12px] text-white/50 leading-relaxed">{active.description}</p>
          </div>
        </div>
      </div>

      {/* ── DOMAIN NAV ── */}
      <div className="relative z-40 flex items-center justify-around"
        style={{ height:48, background:"rgba(4,4,12,.98)", borderTop:"1px solid rgba(255,255,255,.09)", flexShrink:0 }}>
        {DOMAINS.map(d => {
          const isAct = d === activeDomain;
          const col   = d==="ALL" ? "#ffffff" : DOMAIN_COLORS[d as Exclude<Domain,"ALL">];
          return (
            <button key={d} onClick={() => handleDomainChange(d)}
              className="relative flex-1 h-full flex items-center justify-center text-[8px] font-bold tracking-[.15em] uppercase transition-all"
              style={{ color: isAct ? col : "rgba(255,255,255,.3)", background: isAct ? `${col}0d` : "transparent" }}>
              {d}
              {isAct && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4/5"
                style={{ background:col, boxShadow:`0 0 6px ${col}` }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SHARED HELPERS
═══════════════════════════════════════════════ */
const clip =
  "polygon(18px 0%,calc(100% - 18px) 0%,100% 18px,100% calc(100% - 18px),calc(100% - 18px) 100%,18px 100%,0% calc(100% - 18px),0% 18px)";
const clipMobile =
  "polygon(12px 0%,calc(100% - 12px) 0%,100% 12px,100% calc(100% - 12px),calc(100% - 12px) 100%,12px 100%,0% calc(100% - 12px),0% 12px)";

function ph(title: string, color: string, size = "860x480") {
  return `https://placehold.co/${size}/0d0d14/${color.replace("#","")}?text=${encodeURIComponent(title)}&font=orbitron`;
}

/* ── Shared Desktop sub-components ── */
function SBox({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div style={{ background:"rgba(255,255,255,.025)", border:"1px solid rgba(255,255,255,.07)", padding:"8px 10px" }}>
      {label && <div className="text-[8px] tracking-[.3em] text-white/28 uppercase mb-[5px]">{label}</div>}
      {children}
    </div>
  );
}
function SRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-[3px]">
      <span className="text-[9px] tracking-widest text-white/35 uppercase">{label}</span>
      <span className="text-[11px] font-bold font-mono px-2 py-[2px]"
        style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.09)", color:"rgba(255,255,255,.85)" }}>{value}</span>
    </div>
  );
}
function TierBadge({ tier }: { tier: Tier }) {
  return <div className="px-2 py-[2px] text-[9px] font-black"
    style={{ background:TIER_COLORS[tier], color:"#000", letterSpacing:".1em" }}>{tier}</div>;
}
function CornerAccents({ color }: { color: string }) {
  const s=22, t=2;
  const corner = (top: boolean, left: boolean): React.CSSProperties => ({
    position:"absolute", width:s, height:s,
    ...(top?{top:0}:{bottom:0}), ...(left?{left:0}:{right:0}),
    borderTop:    top  ? `${t}px solid ${color}` : "none",
    borderBottom: !top ? `${t}px solid ${color}` : "none",
    borderLeft:   left ? `${t}px solid ${color}` : "none",
    borderRight: !left ? `${t}px solid ${color}` : "none",
  });
  return <><div style={corner(true,true)}/><div style={corner(true,false)}/><div style={corner(false,true)}/><div style={corner(false,false)}/></>;
}

/* ── Mobile-only sub-component ── */
function StatCell({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", padding:"6px 8px" }}>
      <div className="text-[8px] tracking-[.25em] uppercase mb-1" style={{ color:"rgba(255,255,255,.3)" }}>{label}</div>
      <div className="text-[14px] font-bold font-mono" style={{ color }}>{value}</div>
    </div>
  );
}