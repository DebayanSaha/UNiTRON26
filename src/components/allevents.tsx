import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   DATA  (description + rulebook added)
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
  domain: 'tech' | 'gaming' | 'coding' | 'non-tech';
  description: string;
  rulebook: string;
}

const eventsData: EventData[] = [
  {
    title: 'RACE',
    tagline: 'Speed. Precision. Cross the finish line first!',
    image: '/event-race.png',
    date: '24 - 25 AUG 2K26',
    venue: 'UNITRON ARENA',
    team: '2 - 5 PLAYERS',
    icon: '🏁',
    featured: true,
    domain: 'gaming',
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
    domain: 'coding',
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
    domain: 'gaming',
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
    domain: 'tech',
    description:
      'Engineer a combat robot and throw it into the arena. ROBOWAR is the ultimate test of mechanical design, electronics, and battle strategy. Your machine must survive hits, deliver blows, and outlast every opponent in the dome. Strict weight and size regulations apply — build smart, fight hard.',
    rulebook: '/rulebooks/robowar-rulebook.pdf',
  },
  {
    title: 'AI CHALLENGE',
    tagline: 'Train. Predict. Outsmart the machine!',
    image: '/event-gaming.png',
    date: '24 - 25 AUG 2K26',
    venue: 'NEURAL HUB',
    team: '2 - 3 PLAYERS',
    icon: '🧠',
    featured: true,
    domain: 'coding',
    description:
      'Tackle real-world datasets and build models that outperform the benchmark. The AI Challenge tests your knowledge of machine learning, data preprocessing, and model evaluation. Leaderboard-based scoring with live updates — climb the ranks in real time and claim the Neural Crown.',
    rulebook: '/rulebooks/ai-rulebook.pdf',
  },
  {
    title: 'CIRCUIT CLASH',
    tagline: 'Wire. Spark. Build the impossible circuit!',
    image: '/event-gaming.png',
    date: '24 - 25 AUG 2K26',
    venue: 'VOLT ARENA',
    team: '2 - 4 PLAYERS',
    icon: '⚡',
    domain: 'tech',
    description:
      'Given a problem statement and a bag of components, build a working circuit that solves it. Circuit Clash rewards deep hardware knowledge, fast hands, and creative thinking. Judges evaluate correctness, efficiency, and the elegance of your solution. No simulation — real boards, real stakes.',
    rulebook: '/rulebooks/circuit-rulebook.pdf',
  },
  {
    title: 'DRONE RACE',
    tagline: 'Fly fast. Dodge hard. Win the sky!',
    image: '/event-gaming.png',
    date: '24 - 25 AUG 2K26',
    venue: 'SKY DOME',
    team: '1 - 2 PLAYERS',
    icon: '🚁',
    domain: 'tech',
    description:
      'Navigate your drone through a high-speed aerial obstacle course inside the Sky Dome. Fastest clean lap wins. Pilots must demonstrate precision control, spatial awareness, and split-second decision making. FPV goggles provided; bring your own controller or borrow one on-site.',
    rulebook: '/rulebooks/drone-rulebook.pdf',
  },
  {
    title: 'QUIZ MASTER',
    tagline: 'Think fast. Answer faster. Own the stage!',
    image: '/event-gaming.png',
    date: '24 - 25 AUG 2K26',
    venue: 'MAIN HALL',
    team: '2 PLAYERS',
    icon: '🧩',
    domain: 'non-tech',
    description:
      'A high-octane tech quiz spanning computer science, current affairs, science, and pop culture. Multiple rounds including rapid fire, visuals, and buzzer rounds. The questions get harder, the crowd gets louder, and only the sharpest minds survive to the finale.',
    rulebook: '/rulebooks/quiz-rulebook.pdf',
  },
  {
    title: 'PAPER PRESENT',
    tagline: 'Research. Present. Inspire the crowd!',
    image: '/event-gaming.png',
    date: '24 - 25 AUG 2K26',
    venue: 'SEMINAR HALL',
    team: '1 - 2 PLAYERS',
    icon: '📄',
    domain: 'non-tech',
    description:
      'Present your original research to a panel of expert judges. Topics span all domains of engineering and technology. Papers are evaluated on novelty, depth, presentation clarity, and Q&A performance. Published proceedings available for top-ranked submissions.',
    rulebook: '/rulebooks/paper-rulebook.pdf',
  },
  {
    title: 'CYBER ESCAPE',
    tagline: 'Decrypt. Solve. Break out before time runs out!',
    image: '/event-gaming.png',
    date: '24 - 25 AUG 2K26',
    venue: 'MATRIX ROOM',
    team: '3 - 5 PLAYERS',
    icon: '🔐',
    domain: 'coding',
    description:
      'A digital escape room where puzzles are coded riddles, cipher challenges, and logic traps. Teams race the clock to decrypt clues, navigate terminals, and break out before time runs out. Fastest escape wins — but every wrong move costs precious seconds.',
    rulebook: '/rulebooks/escape-rulebook.pdf',
  },
  {
    title: 'WEB SPRINT',
    tagline: 'Design. Deploy. Deliver in 60 minutes!',
    image: '/event-gaming.png',
    date: '24 - 25 AUG 2K26',
    venue: 'PIXEL LAB',
    team: '1 - 2 PLAYERS',
    icon: '🌐',
    domain: 'coding',
    description:
      'Build a fully functional, visually polished website in 60 minutes flat. A prompt is revealed at the start — the rest is up to you. Judged on design quality, responsiveness, functionality, and creativity. Bring your stack, bring your speed.',
    rulebook: '/rulebooks/web-rulebook.pdf',
  },
  {
    title: 'TECH DEBATE',
    tagline: 'Argue. Convince. Win the tech war of words!',
    image: '/event-gaming.png',
    date: '24 - 25 AUG 2K26',
    venue: 'AUDITORIUM',
    team: '2 PLAYERS',
    icon: '🎤',
    domain: 'non-tech',
    description:
      'Two teams. One controversial tech topic. Fight it out with facts, wit, and rhetoric. Topics are drawn at random — teams get 10 minutes to prepare, then it\'s live on stage. Judged on argument strength, rebuttals, and audience impact. The best debater wins hearts and minds.',
    rulebook: '/rulebooks/debate-rulebook.pdf',
  },
];

/* ─────────────────────────────────────────
   SHARED HELPERS
───────────────────────────────────────── */
const CLIP = 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))';
const INNER_CLIP = 'polygon(0 0, calc(100% - 12.5px) 0, 100% 12.5px, 100% 100%, 12.5px 100%, 0 calc(100% - 12.5px))';
const HEX_CLIP = 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)';

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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF00A8" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF00A8" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF00A8" strokeWidth="2">
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
    if (shineRef.current) {
      gsap.fromTo(
        shineRef.current,
        { x: '-100%', opacity: 0.7 },
        { x: '200%', opacity: 0, duration: 0.55, ease: 'power2.out' }
      );
    }
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
      {/* Neon border */}
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
      <span className="relative z-10" style={{ background: 'linear-gradient(90deg, #FF00A8, #cc66ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    gsap.fromTo(panelRef.current, { y: 40, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' });
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={{ background: 'rgba(3,3,15,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/*
        Mobile  : slides up from bottom, full width, rounded top corners, scrollable
        Desktop : centred panel, max-w-3xl, no scroll needed (same as before)
      */}
      <div
        ref={panelRef}
        className="relative w-full sm:max-w-5xl"
        style={{
          clipPath: CLIP,
          /* On mobile let it be taller but still scrollable */
          maxHeight: '92dvh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Border */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, #FF00A8, #00F0FF, #FF00A8)', clipPath: CLIP }} />

        {/* Panel body — flex-col on mobile, flex-row on md+ */}
        <div
          className="relative flex flex-col md:flex-row overflow-y-auto"
          style={{ margin: '1.5px', background: '#07071a', clipPath: INNER_CLIP, maxHeight: 'calc(92dvh - 3px)' }}
        >
          {/*
            LEFT (desktop) / TOP (mobile) — image
            Mobile: shorter fixed height banner
            Desktop: 40% width, min-height 280 (unchanged)
          */}
          <div
            className="relative flex-shrink-0 md:w-2/5"
            style={{ height: 200, minHeight: 200 }}
          >
            {/* On md+ override to fill full height of panel */}
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
            {/* Close */}
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

            {/* Info row — wraps naturally on mobile */}
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
   EVENT CARD  — unchanged layout, register
   button replaced with RegisterButton,
   image click opens popup
───────────────────────────────────────── */
function EventCard({ event, onOpen }: { event: EventData; onOpen: () => void }) {
  return (
    /*
      BORDER TECHNIQUE:
      Outer div  → clipped to CLIP shape, gradient background = the neon border colour
      Inner div  → same CLIP shape, dark bg, margin 1.5px → exposes 1.5px of gradient as border
      Both divs share the SAME clipPath so nothing bleeds outside the shape.
    */
    <div
      className="group"
      style={{
        clipPath: CLIP,
        background: 'linear-gradient(135deg, #FF00A8 0%, #00F0FF 50%, #FF00A8 100%)',
        padding: 0,
      }}
    >
      <div
        className="flex flex-col"
        style={{
          margin: '1.5px',
          clipPath: INNER_CLIP,
          background: '#07071a',
        }}
      >

        {/* IMAGE — overflow-hidden clips the image to the card shape */}
        <div
          className="relative overflow-hidden group-hover:[&>img]:scale-105 h-64 lg:h-80"
          style={{ cursor: 'pointer', flexShrink: 0 }}
          onClick={onOpen}
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ display: 'block', background: '#0d0d22' }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(7,7,26,1) 0%, rgba(7,7,26,0.75) 30%, rgba(7,7,26,0.15) 60%, transparent 100%)' }}
          />

          {event.featured && (
            <div
              className="absolute top-4 left-4 px-3 py-1 text-[10px] font-heading tracking-[0.2em] uppercase"
              style={{ border: '2px solid #FF00A8', color: '#FF00A8', borderRadius: 4, background: 'rgba(255,0,168,0.18)', boxShadow: '0 0 14px rgba(255,0,168,0.7), inset 0 0 10px rgba(255,0,168,0.15)', textShadow: '0 0 8px rgba(255,0,168,0.8)' }}
            >
              FEATURED
            </div>
          )}

          <div className="absolute top-3 right-3"><TrophyHex /></div>

          {/* Title — right-16 clears the trophy */}
          <div className="absolute bottom-4 left-4 right-16 flex items-center gap-2 min-w-0">
            <HexIcon>{event.icon}</HexIcon>
            <h3
              className="font-nfs text-xl tracking-wider uppercase truncate"
              style={{
                background: 'linear-gradient(90deg, #ffffff 60%, #cccccc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                minWidth: 0,
                flexShrink: 1,
              }}
            >
              {event.title}
            </h3>
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col px-4 pt-4 pb-5 gap-3">

          <p className="text-xs text-gray-400 font-sans italic leading-snug line-clamp-2">{event.tagline}</p>

          <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />

          <div className="flex items-start justify-between gap-1 text-[9px] font-heading tracking-wider">
            <div className="flex items-start gap-1" style={{ flex: '0 0 auto', maxWidth: '36%' }}>
              <CalendarIcon />
              <div>
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
            <div className="flex items-start gap-1" style={{ flex: '0 0 auto', maxWidth: '28%' }}>
              <TeamIcon />
              <div>
                <div className="uppercase mb-0.5" style={{ color: '#FF00A8', fontSize: 8, letterSpacing: '0.2em' }}>TEAM</div>
                <div className="text-gray-200 leading-tight">{event.team}</div>
              </div>
            </div>
          </div>

          <RegisterButton onClick={onOpen} />
        </div>
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────
   SEARCH INPUT — unchanged
───────────────────────────────────────── */
function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(255,0,168,0.5), rgba(0,240,255,0.5))', clipPath: CLIP }} />
      <div className="relative" style={{ margin: '1px', clipPath: INNER_CLIP, background: 'rgba(10,10,28,0.9)' }}>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <input
          placeholder="Search events, venues..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-600 font-heading tracking-wider"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   FILTER TABS — unchanged
───────────────────────────────────────── */
type Domain = 'all' | 'tech' | 'gaming' | 'coding' | 'non-tech';

const TAB_LABELS: { key: Domain; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'tech', label: 'TECH' },
  { key: 'gaming', label: 'GAMING' },
  { key: 'coding', label: 'CODING' },
  { key: 'non-tech', label: 'NON-TECH' },
];

function FilterTabs({ active, onSelect }: { active: Domain; onSelect: (d: Domain) => void }) {
  return (
    <div className="flex flex-row lg:flex-col flex-nowrap sm:flex-wrap gap-3 w-fit lg:w-full">
      {TAB_LABELS.map(({ key, label }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="relative px-5 py-2 lg:py-4 lg:text-sm lg:w-full text-xs font-heading tracking-[0.2em] uppercase transition-all duration-200"
            style={{
              clipPath: CLIP,
              background: isActive ? 'rgba(255,0,168,0.18)' : 'rgba(255,255,255,0.04)',
              color: isActive ? '#FF00A8' : 'rgba(255,255,255,0.45)',
              boxShadow: isActive ? '0 0 16px rgba(255,0,168,0.3)' : 'none',
              textShadow: isActive ? '0 0 8px rgba(255,0,168,0.6)' : 'none',
              border: 'none', outline: 'none', cursor: 'pointer',
            }}
          >
            <span className="absolute inset-0 pointer-events-none" style={{ clipPath: CLIP, background: isActive ? 'linear-gradient(90deg, #FF00A8, #00F0FF)' : 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1))', opacity: isActive ? 0.7 : 1 }} />
            <span className="absolute pointer-events-none" style={{ inset: '1px', clipPath: INNER_CLIP, background: isActive ? 'rgba(10,5,28,0.9)' : 'rgba(10,10,24,0.85)' }} />
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE — unchanged except selectedEvent state + popup
───────────────────────────────────────── */
export default function AllEvents() {
  const [active, setActive] = useState<Domain>('all');
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return eventsData.filter((e) => {
      const matchesDomain = active === 'all' || e.domain === active;
      const matchesSearch = !q || e.title.toLowerCase().includes(q) || e.tagline.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q);
      return matchesDomain && matchesSearch;
    });
  }, [active, search]);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children) as HTMLElement[];
    gsap.fromTo(cards, { opacity: 0, y: 36 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out' });
  }, [filtered]);

  useEffect(() => {
    gsap.fromTo(headerRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
  }, []);

  return (
    <>
      <div className="min-h-screen text-white relative overflow-hidden">

        {/* ── Frosted Background Image ── */}
        <div className="fixed inset-0 z-0" style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(10px) brightness(0.75)', transform: 'scale(1.1)' }} />

        {/* ── Dark glass overlay ── */}
        <div className="fixed inset-0 z-0" style={{ background: 'rgba(5,5,18,0.35)', backdropFilter: 'blur(12px)' }} />

        {/* ── ICY OVERLAY LAYERS ── */}
        <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 60% at 10% 20%, rgba(160,220,255,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 10%, rgba(180,240,255,0.06) 0%, transparent 55%), radial-gradient(ellipse 70% 40% at 50% 90%, rgba(140,210,255,0.05) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 80% 70%, rgba(200,240,255,0.04) 0%, transparent 50%)` }} />
        <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cg stroke='rgba(180,230,255,0.04)' stroke-width='0.8' fill='none'%3E%3Cpath d='M120 0 L180 80 L240 40 L300 120 L260 200 L320 260 L280 340 L360 380 L300 460 L380 520 L340 600'/%3E%3Cpath d='M0 150 L80 190 L60 270 L140 310 L100 390 L180 420 L160 500 L240 540'/%3E%3Cpath d='M400 0 L440 90 L500 70 L520 160 L580 140 L600 220'/%3E%3Cpath d='M180 80 L140 160 L200 180 L170 260'/%3E%3Cpath d='M300 120 L350 100 L380 170 L440 160'/%3E%3Cpath d='M260 200 L220 240 L260 300 L220 340'/%3E%3Cpath d='M80 190 L120 230 L100 280 L140 310'/%3E%3Cpath d='M440 90 L480 130 L460 200 L520 230 L500 300 L560 330'/%3E%3Cpath d='M0 350 L60 370 L40 440 L100 460 L80 540'/%3E%3Cpath d='M500 300 L540 360 L520 430 L580 460 L560 540 L600 580'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '600px 600px', backgroundRepeat: 'repeat', opacity: 1 }} />
        <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(118deg, transparent 0px, transparent 60px, rgba(180,235,255,0.018) 60px, rgba(180,235,255,0.018) 61px), repeating-linear-gradient(28deg, transparent 0px, transparent 80px, rgba(160,220,255,0.015) 80px, rgba(160,220,255,0.015) 81px)` }} />
        <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(2,4,20,0.55) 100%)' }} />
        <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(0,240,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* ── TOP BAR ── */}
        <div
          ref={headerRef}
          className="relative z-10 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(5,5,18,0.85)', backdropFilter: 'blur(12px)' }}
        >
          {/* Mobile: two rows. Desktop (md+): single row unchanged */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 sm:px-6 md:px-10 py-4 md:py-6 gap-3 md:gap-0">

            {/* Row 1 on mobile: back + badge side by side */}
            <div className="flex items-center justify-between md:contents">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-xs font-heading tracking-[0.2em] uppercase transition-all duration-200 group"
                style={{ color: 'rgba(255,255,255,0.5)', border: 'none', background: 'none', cursor: 'pointer' }}
                onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#00F0FF'; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-200 group-hover:-translate-x-1">
                  <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                </svg>
                <span>BACK</span>
              </button>

              {/* Badge — visible inline on mobile, hidden on md (re-shown below) */}
              <div
                className="md:hidden text-[10px] font-heading tracking-widest px-3 py-1.5"
                style={{ clipPath: CLIP, background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.25)', color: '#00F0FF' }}
              >
                {filtered.length} / {eventsData.length}
              </div>
            </div>

            {/* Title — centred on both breakpoints */}
            <div className="flex flex-col items-center md:absolute md:left-1/2 md:-translate-x-1/2">
              <p className="text-[10px] font-heading tracking-[0.3em] uppercase mb-0.5" style={{ color: '#00F0FF' }}>UNITRON 2K26</p>
              <h1
                className="font-nfs text-2xl sm:text-3xl md:text-4xl tracking-widest uppercase"
                style={{ background: 'linear-gradient(90deg, #ffffff, #aaaaaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                ALL EVENTS
              </h1>
            </div>

            {/* Badge — desktop only (hidden on mobile, shown here on md+) */}
            <div
              className="hidden md:block text-xs font-heading tracking-widest px-4 py-2"
              style={{ clipPath: CLIP, background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.25)', color: '#00F0FF' }}
            >
              {filtered.length} / {eventsData.length} EVENTS
            </div>
          </div>
        </div>

        {/* ── CONTENT WRAPPER ── */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col lg:flex-row gap-8 lg:gap-12 pb-24">
          
          {/* ── SIDEBAR (Mobile Controls + Desktop Sidebar) ── */}
          <div className="flex flex-col gap-5 lg:w-72 flex-shrink-0">
            {/* Search */}
            <div className="w-full">
              <SearchInput value={search} onChange={setSearch} />
            </div>

            {/* Filter tabs */}
            <div
              className="overflow-x-auto pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <FilterTabs active={active} onSelect={setActive} />
            </div>

            <div className="w-full h-px lg:hidden" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.3) 30%, rgba(255,0,168,0.3) 70%, transparent)' }} />
          </div>

          {/* ── MAIN GRID ── */}
          <div className="flex-1 w-full">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="text-5xl">🔍</div>
                <p className="font-heading tracking-widest text-gray-500 uppercase text-sm">No events found</p>
                <button onClick={() => { setSearch(''); setActive('all'); }} className="text-xs font-heading tracking-widest uppercase text-cyan-400 underline mt-2">
                  CLEAR FILTERS
                </button>
              </div>
            ) : (
              <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filtered.map((event) => (
                  <EventCard key={event.title} event={event} onOpen={() => setSelectedEvent(event)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup — rendered outside so it floats above everything */}
      {selectedEvent && (
        <EventPopup event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
}