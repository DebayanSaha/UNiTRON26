import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────── */
interface EventData {
  title: string;
  tagline: string;
  image: string;
  date: string;
  venue: string;
  team: string;
  icon: string;
  featured?: boolean;
  description: string;
  rulebook: string;
}

const ALL_EVENTS: EventData[] = [
  {
    title: 'RACE',
    tagline: 'Speed. Precision. Cross the finish line first!',
    image: '/event-race.png',
    date: '24 - 25 AUG 2K26',
    venue: 'UNITRON ARENA',
    team: '2 - 5 PLAYERS',
    icon: '🏁',
    featured: true,
    description:
      'Push your limits in the most adrenaline-fuelled racing challenge of UNITRON 2K26. Teams must complete obstacle-laden courses with speed and precision. Strategy, reflexes, and raw speed are all that stand between you and the podium. Multiple rounds, eliminations, and a heart-stopping final sprint.',
    rulebook: '/rulebooks/race-rulebook.pdf',
  },
  {
    title: 'HACKATHON',
    tagline: 'Code. Build. Innovate under pressure!',
    image: '/event-hackathon.png',
    date: '24 - 25 AUG 2K26',
    venue: 'CYBER LAB',
    team: '3 - 4 PLAYERS',
    icon: '💻',
    featured: true,
    description:
      '24 hours. One problem. Infinite solutions. The UNITRON Hackathon challenges you to build a working product from scratch under time pressure. From ideation to deployment, teams will be judged on innovation, functionality, design, and pitch quality. The best ideas change the world — start here.',
    rulebook: '/rulebooks/hackathon-rulebook.pdf',
  },
  {
    title: 'GAMING',
    tagline: 'Compete. Dominate. Claim your glory!',
    image: '/event-gaming.png',
    date: '24 - 25 AUG 2K26',
    venue: 'ESPORTS ZONE',
    team: '1 - 2 PLAYERS',
    icon: '🎮',
    featured: false,
    description:
      'The UNITRON Esports Zone brings together elite gamers for intense 1v1 and team battles across multiple titles. Prove your reflexes, strategy, and clutch factor in front of a live crowd. Bracket-style elimination with grand finals streamed live across all UNITRON platforms.',
    rulebook: '/rulebooks/gaming-rulebook.pdf',
  },
  {
    title: 'ROBOWAR',
    tagline: 'Design. Destroy. Let machines battle!',
    image: '/event-robowar.png',
    date: '24 - 25 AUG 2K26',
    venue: 'BATTLE DOME',
    team: '3 - 5 PLAYERS',
    icon: '🤖',
    featured: false,
    description:
      'Engineer a combat robot and throw it into the arena. ROBOWAR is the ultimate test of mechanical design, electronics, and battle strategy. Your machine must survive hits, deliver blows, and outlast every opponent in the dome. Strict weight and size regulations apply — build smart, fight hard.',
    rulebook: '/rulebooks/robowar-rulebook.pdf',
  },
  {
    title: 'AI CHALLENGE',
    tagline: 'Train. Predict. Outsmart the machine!',
    image: '/event-ai.png',
    date: '24 - 25 AUG 2K26',
    venue: 'NEURAL HUB',
    team: '2 - 3 PLAYERS',
    icon: '🧠',
    featured: true,
    description:
      'Tackle real-world datasets and build models that outperform the benchmark. The AI Challenge tests your knowledge of machine learning, data preprocessing, and model evaluation. Leaderboard-based scoring with live updates — climb the ranks in real time and claim the Neural Crown.',
    rulebook: '/rulebooks/ai-rulebook.pdf',
  },
  {
    title: 'CIRCUIT CLASH',
    tagline: 'Wire. Spark. Build the impossible circuit!',
    image: '/event-circuit.png',
    date: '24 - 25 AUG 2K26',
    venue: 'VOLT ARENA',
    team: '2 - 4 PLAYERS',
    icon: '⚡',
    featured: false,
    description:
      'Given a problem statement and a bag of components, build a working circuit that solves it. Circuit Clash rewards deep hardware knowledge, fast hands, and creative thinking. Judges evaluate correctness, efficiency, and the elegance of your solution. No simulation — real boards, real stakes.',
    rulebook: '/rulebooks/circuit-rulebook.pdf',
  },
  {
    title: 'DRONE RACE',
    tagline: 'Fly fast. Dodge hard. Win the sky!',
    image: '/event-drone.png',
    date: '24 - 25 AUG 2K26',
    venue: 'SKY DOME',
    team: '1 - 2 PLAYERS',
    icon: '🚁',
    featured: false,
    description:
      'Navigate your drone through a high-speed aerial obstacle course inside the Sky Dome. Fastest clean lap wins. Pilots must demonstrate precision control, spatial awareness, and split-second decision making. FPV goggles provided; bring your own controller or borrow one on-site.',
    rulebook: '/rulebooks/drone-rulebook.pdf',
  },
  {
    title: 'QUIZ MASTER',
    tagline: 'Think fast. Answer faster. Own the stage!',
    image: '/event-quiz.png',
    date: '24 - 25 AUG 2K26',
    venue: 'MAIN HALL',
    team: '2 PLAYERS',
    icon: '🧩',
    featured: false,
    description:
      'A high-octane tech quiz spanning computer science, current affairs, science, and pop culture. Multiple rounds including rapid fire, visuals, and buzzer rounds. The questions get harder, the crowd gets louder, and only the sharpest minds survive to the finale.',
    rulebook: '/rulebooks/quiz-rulebook.pdf',
  },
];

/* ─────────────────────────────────────────
   UTILS
───────────────────────────────────────── */
const CLIP = 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))';
const INNER_CLIP = 'polygon(0 0, calc(100% - 12.5px) 0, 100% 12.5px, 100% 100%, 12.5px 100%, 0 calc(100% - 12.5px))';
const HEX_CLIP = 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)';

/** Fisher-Yates shuffle, returns first `n` items */
function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/* ─────────────────────────────────────────
   SHARED ICON COMPONENTS
───────────────────────────────────────── */
function HexIcon({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, clipPath: HEX_CLIP, background: 'rgba(255,0,168,0.8)', boxShadow: '0 0 12px rgba(255,0,168,0.5)' }} />
      <div style={{ position: 'absolute', inset: '2.5px', clipPath: HEX_CLIP, background: 'rgba(10,10,24,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
        {children}
      </div>
    </div>
  );
}

function TrophyHex() {
  return (
    <div style={{ position: 'relative', width: 52, height: 52, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, clipPath: HEX_CLIP, background: 'rgba(255,255,255,0.55)', boxShadow: '0 0 12px rgba(255,255,255,0.4)' }} />
      <div style={{ position: 'absolute', inset: '2.5px', clipPath: HEX_CLIP, background: 'rgba(10,10,28,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF00A8" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF00A8" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF00A8" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   SWIPE REGISTER BUTTON
───────────────────────────────────────── */
function RegisterButton({ onClick }: { onClick: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (!shineRef.current) return;
    gsap.fromTo(
      shineRef.current,
      { x: '-100%', opacity: 0.7 },
      { x: '200%', opacity: 0, duration: 0.55, ease: 'power2.out' }
    );
    if (btnRef.current) {
      btnRef.current.style.background = 'rgba(255,0,168,0.18)';
      btnRef.current.style.boxShadow = '0 0 22px rgba(255,0,168,0.35), inset 0 0 16px rgba(255,0,168,0.08)';
    }
  };

  const handleMouseLeave = () => {
    if (btnRef.current) {
      btnRef.current.style.background = 'rgba(255,0,168,0.06)';
      btnRef.current.style.boxShadow = 'none';
    }
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full py-3 text-xs font-heading tracking-[0.25em] uppercase relative overflow-hidden"
      style={{
        clipPath: CLIP,
        background: 'rgba(255,0,168,0.06)',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Neon border (layered) */}
      <span className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, #FF00A8, #00F0FF)', clipPath: CLIP, opacity: 0.5 }} />
      <span className="absolute pointer-events-none" style={{ inset: '1.5px', background: 'rgba(7,7,26,0.88)', clipPath: INNER_CLIP }} />

      {/* Swipe shine */}
      <span
        ref={shineRef}
        className="absolute pointer-events-none"
        style={{
          top: 0, bottom: 0, left: 0,
          width: '45%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
          transform: 'translateX(-100%)',
          zIndex: 5,
        }}
      />

      {/* Label */}
      <span
        className="relative z-10"
        style={{ background: 'linear-gradient(90deg, #FF00A8, #cc66ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        REGISTER NOW →
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────
   EVENT DETAIL POPUP
───────────────────────────────────────── */
function EventPopup({ event, onClose }: { event: EventData; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    gsap.fromTo(panelRef.current, { y: 40, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' });

    // Close on Escape
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={{ background: 'rgba(3,3,15,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={handleOverlayClick}
    >
      <div
        ref={panelRef}
        className="relative w-full sm:max-w-5xl"
        style={{ clipPath: CLIP, maxHeight: '92dvh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Panel border */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, #FF00A8, #00F0FF, #FF00A8)', clipPath: CLIP }} />

        {/* Panel body — scrollable on mobile */}
        <div
          className="relative flex flex-col md:flex-row overflow-y-auto"
          style={{ margin: '1.5px', background: '#07071a', clipPath: INNER_CLIP, maxHeight: 'calc(92dvh - 3px)' }}
        >
          {/* LEFT (desktop) / TOP (mobile) — image */}
          <div className="relative flex-shrink-0 md:w-2/5" style={{ height: 200, minHeight: 200 }}>
            <style>{`@media (min-width: 768px) { .popup-img-wrap { height: 100% !important; min-height: 380px !important; } }`}</style>
            <div className="popup-img-wrap w-full h-full">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 55%, #07071a 100%), linear-gradient(to top, rgba(7,7,26,0.85) 0%, rgba(7,7,26,0.3) 25%, transparent 50%)' }} />
            {event.featured && (
              <div
                className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-heading tracking-[0.2em] uppercase"
                style={{ border: '2px solid #FF00A8', color: '#FF00A8', borderRadius: 4, background: 'rgba(255,0,168,0.18)', boxShadow: '0 0 14px rgba(255,0,168,0.7)', textShadow: '0 0 8px rgba(255,0,168,0.8)' }}
              >
                FEATURED
              </div>
            )}
            <div className="absolute bottom-3 left-3 flex items-center gap-3">
              <HexIcon>{event.icon}</HexIcon>
            </div>
          </div>

          {/* RIGHT (desktop) / BOTTOM (mobile) — details */}
          <div className="flex flex-col flex-1 px-5 sm:px-6 py-5 sm:py-6 gap-3 sm:gap-4">
            {/* Close btn */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-60"
              style={{ color: 'rgba(255,255,255,0.6)', background: 'rgba(7,7,26,0.7)', border: 'none', cursor: 'pointer', zIndex: 10, borderRadius: 4 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Title */}
            <div>
              <p className="text-[9px] sm:text-[10px] font-heading tracking-[0.3em] uppercase mb-1" style={{ color: '#00F0FF' }}>EVENT DETAILS</p>
              <h2
                className="font-nfs text-2xl sm:text-3xl tracking-wider uppercase"
                style={{ background: 'linear-gradient(90deg,#fff,#aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {event.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 italic mt-1">{event.tagline}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />

            {/* Info row */}
            <div className="flex gap-3 sm:gap-4 flex-wrap text-xs font-heading tracking-wider">
              <div className="flex items-center gap-1.5">
                <CalendarIcon />
                <div>
                  <div style={{ color: '#FF00A8', fontSize: 9, letterSpacing: '0.25em' }}>DATE</div>
                  <div className="text-gray-200">{event.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <PinIcon />
                <div>
                  <div style={{ color: '#FF00A8', fontSize: 9, letterSpacing: '0.25em' }}>VENUE</div>
                  <div className="text-gray-200">{event.venue}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TeamIcon />
                <div>
                  <div style={{ color: '#FF00A8', fontSize: 9, letterSpacing: '0.25em' }}>TEAM</div>
                  <div className="text-gray-200">{event.team}</div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed" style={{ lineHeight: 1.75 }}>
              {event.description}
            </p>

            {/* Action buttons — stack on mobile, side by side on sm+ */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
              <RegisterButton onClick={() => { }} />
              <a
                href={event.rulebook}
                download
                className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-heading tracking-[0.18em] uppercase relative overflow-hidden no-underline sm:flex-shrink-0"
                style={{ clipPath: CLIP, color: '#00F0FF', textDecoration: 'none', transition: 'background 0.3s ease' }}
                onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,240,255,0.1)'; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
              >
                <span className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, #00F0FF, #0066FF)', clipPath: CLIP, opacity: 0.5 }} />
                <span className="absolute pointer-events-none" style={{ inset: '1.5px', background: 'rgba(7,7,26,0.88)', clipPath: INNER_CLIP }} />
                <span className="relative z-10 flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  RULEBOOK
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   EVENT CARD
───────────────────────────────────────── */
function EventCard({ event, index, onOpen }: { event: EventData; index: number; onOpen: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animation = gsap.fromTo(
      cardRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 100%' },
      }
    );
    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [index]);

  return (
    <div ref={cardRef} className="group relative" style={{ clipPath: CLIP }}>
      {/* Border */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'linear-gradient(135deg, #FF00A8 0%, #00F0FF 50%, #FF00A8 100%)', clipPath: CLIP }} />

      {/* Body */}
      <div className="relative z-10 flex flex-col" style={{ margin: '1.5px', background: '#07071a', clipPath: INNER_CLIP }}>

        {/* IMAGE */}
        <div
          className="relative overflow-hidden"
          style={{ height: 280, cursor: 'pointer' }}
          onClick={onOpen}
        >
          <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,7,26,1) 0%, rgba(7,7,26,0.75) 30%, rgba(7,7,26,0.15) 60%, transparent 100%)' }} />

          {/* FEATURED badge */}
          {event.featured && (
            <div
              className="absolute top-4 left-4 px-3 py-1 text-[10px] font-heading tracking-[0.2em] uppercase"
              style={{ border: '2px solid #FF00A8', color: '#FF00A8', borderRadius: 4, background: 'rgba(255,0,168,0.18)', boxShadow: '0 0 14px rgba(255,0,168,0.7), inset 0 0 10px rgba(255,0,168,0.15)', textShadow: '0 0 8px rgba(255,0,168,0.8)' }}
            >
              FEATURED
            </div>
          )}

          {/* Trophy hex */}
          <div className="absolute top-3 right-3"><TrophyHex /></div>

          {/* Title — truncate to one line, right edge cleared for trophy */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 min-w-0">
            <HexIcon>{event.icon}</HexIcon>
            <h3
              className="font-nfs text-2xl tracking-wider uppercase truncate min-w-0"
              style={{
                background: 'linear-gradient(90deg, #ffffff 60%, #cccccc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                flexShrink: 1,
              }}
            >
              {event.title}
            </h3>
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col px-4 pt-4 pb-5 gap-3">

          {/* Tagline */}
          <p className="text-xs text-gray-400 font-sans italic leading-snug line-clamp-2">{event.tagline}</p>

          {/* Divider */}
          <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />

          {/* DATE | VENUE | TEAM — fixed proportions, no overflow */}
          <div className="flex items-start justify-between gap-1 text-[9px] font-heading tracking-wider">

            <div className="flex items-start gap-1 min-w-0" style={{ flex: '0 0 auto', maxWidth: '36%' }}>
              <CalendarIcon />
              <div className="min-w-0">
                <div className="uppercase mb-0.5" style={{ color: '#FF00A8', fontSize: 8, letterSpacing: '0.2em' }}>DATE</div>
                <div className="text-gray-200 leading-tight">{event.date}</div>
              </div>
            </div>

            <div className="w-px self-stretch flex-shrink-0" style={{ background: 'rgba(255,255,255,0.12)' }} />

            <div className="flex items-start gap-1 min-w-0" style={{ flex: '0 0 auto', maxWidth: '30%' }}>
              <PinIcon />
              <div className="min-w-0">
                <div className="uppercase mb-0.5" style={{ color: '#FF00A8', fontSize: 8, letterSpacing: '0.2em' }}>VENUE</div>
                <div className="text-gray-200 leading-tight truncate">{event.venue}</div>
              </div>
            </div>

            <div className="w-px self-stretch flex-shrink-0" style={{ background: 'rgba(255,255,255,0.12)' }} />

            <div className="flex items-start gap-1 min-w-0" style={{ flex: '0 0 auto', maxWidth: '28%' }}>
              <TeamIcon />
              <div className="min-w-0">
                <div className="uppercase mb-0.5" style={{ color: '#FF00A8', fontSize: 8, letterSpacing: '0.2em' }}>TEAM</div>
                <div className="text-gray-200 leading-tight">{event.team}</div>
              </div>
            </div>

          </div>

          {/* Register button with swipe effect */}
          <RegisterButton onClick={onOpen} />

        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function Events() {
  const titleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const selectedEventRef = useRef<EventData | null>(null);
  selectedEventRef.current = selectedEvent;

  const [displayedEvents, setDisplayedEvents] = useState<EventData[]>([]);
  const [tick, setTick] = useState(0);

  const handleReload = () => {
    setDisplayedEvents(pickRandom(ALL_EVENTS, 6));
    setTick((t) => t + 1);
  };

  useEffect(() => {
    // Initial load
    handleReload();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      }
    );
  }, []);

  return (
    <>
      <section id="events" className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <div ref={titleRef} className="flex justify-between items-end mb-12 flex-wrap gap-4">
          <div>
            <p className="font-heading text-xs tracking-widest mb-2 uppercase" style={{ color: '#00F0FF' }}>
              WHAT'S WAITING FOR YOU
            </p>
            <h2 className="font-nfs text-5xl tracking-wide uppercase">EVENTS</h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={handleReload}
              className="group flex items-center gap-2 px-3 py-2 text-[10px] sm:text-xs font-heading tracking-widest text-[#00F0FF] hover:text-[#FF00A8] transition-colors"
            >
              <svg 
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              RELOAD
            </button>
            <button
              onClick={() => navigate('/all-events')}
              className="neon-border-blue px-4 sm:px-6 py-2 text-[10px] sm:text-xs font-heading tracking-widest hover:bg-[#00F0FF]/10 transition"
            >
              VIEW ALL EVENTS →
            </button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {displayedEvents.map((event, index) => (
            <EventCard
              key={`${event.title}-${tick}`}
              event={event}
              index={index}
              onOpen={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      </section>

      {/* Popup portal */}
      {selectedEvent && (
        <EventPopup event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
}

export { EventCard };