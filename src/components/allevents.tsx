import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
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
  cover?: string;
  date: string;
  venue: string;
  team: string;
  icon: string;
  featured?: boolean;
  domain: 'tech' | 'gaming' | 'coding' | 'non-tech';
  description: string;
  rulebook: string;
  registerLink?: string;
  prizePool?: string;
  entryFee?: string;
  coordinator?: string;
}

const eventsData: EventData[] = [
  {
    title: 'DEATH RACE',
    tagline: 'Speed. Avoid. Survive the deadly track!',
    image: '/EP/DeathRace.jpeg',
    cover: '/EP/DeathRaceC.jpeg',
    date: '08-10 MAY 2K26',
    venue: 'FIT Ground',
    team: ' 2 - 4 PLAYERS',
    icon: '💀',
    domain: 'tech',
    description: 'Build a bot that can survive a brutal, trap-filled obstacle course. Speed is important, but durability and maneuvering are key to finishing the death race.',
    rulebook: '/Rulebook/DEATHRACE_RULEBOOK_26.pdf',
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSeB8GCU9Pc6yXz9VlrJJtrjTkcTq03D8UAngUy12MwwOseu8Q/viewform",
    prizePool: 'Rs 10,000',
    entryFee: 'Rs 400/-',
    coordinator: 'HIMANGSHU SINGH (8100639881)'
  },
  {
    title: 'ROBO SOCCER',
    tagline: 'Kick. Score. Dominate the pitch!',
    image: '/EP/RoboSoccer.jpeg',
    cover: '/EP/RoboSoccerC.jpeg',
    date: '08-10 MAY 2K26',
    venue: 'FIT Ground',
    team: ' 2 - 4 PLAYERS',
    icon: '⚽',
    domain: 'tech',
    description: 'Take the field with your custom-built remote-controlled bots. Pass, tackle, and score goals against the opposing team in an action-packed robotic soccer tournament.',
    rulebook: '/Rulebook/ROBOSOCCER_RULEBOOK.pdf',
    registerLink: "https://forms.gle/wY5iFZGpwv8J4PU59",
    prizePool: 'Rs 10,000',
    entryFee: 'Rs 400/-',
    coordinator: 'Aishee Majumder (9775966205)'
  },
  {
    title: 'ROBO WAR',
    tagline: 'Design. Destroy. Let machines battle!',
    image: '/EP/RoboWar.webp',
    cover: '/EP/RoboWarC.jpeg',
    date: '08-10 MAY 2K26',
    venue: 'FIT Ground',
    team: '2 - 4 PLAYERS',
    icon: '🤖',
    domain: 'tech',
    description: 'Engineer a combat bot and throw it into the arena. ROBO WAR is the ultimate test of mechanical design, electronics, and battle strategy. Your machine must survive hits and outlast every opponent.',
    rulebook: '/Rulebook/ROBOWAR_RULEBOOK.pdf',
    registerLink: "https://forms.gle/gjh8zM7pp1c8tvaM8",
    prizePool: 'Rs 25,000',
    entryFee: 'Rs 700/-',
    coordinator: 'Anirban Roy (7449692809)'
  },
  {
    title: 'WATER ROCKET',
    tagline: 'Pressurize. Launch. Touch the sky!',
    image: '/EP/WaterRocket.jpeg',
    cover: '/EP/WaterRocketC.jpeg',
    date: '08-10 MAY 2K26',
    venue: 'FIT GROUND',
    team: '1 - 4 PLAYERS',
    icon: '🚀',
    domain: 'tech',
    description: 'Design and build aerodynamic water rockets using plastic bottles. Competitors will be judged on maximum flight time, altitude.',
    rulebook: '/Rulebook/SKYROCKET_RULEBOOK.pdf',
    registerLink: "https://forms.gle/yQtM8Lt7QCKXWoH6A",
    prizePool: 'Rs 2000',
    entryFee: 'Rs 150/-',
    coordinator: 'Annixiki Biswas(9051608992)'
  },
  {
    title: 'ROBO RACE',
    tagline: 'Double the speed, double the thrill!',
    image: '/EP/RoboRace.jpeg',
    cover: '/EP/RoboRaceC.jpeg',
    date: '08-10 MAY 2K26',
    venue: 'FIT Ground',
    team: '1 - 4 PLAYERS',
    icon: '🤖',
    domain: 'tech',
    description: 'Bring your custom-built bots and navigate a high-speed racing track. Race against the clock and other competitors to claim the championship trophy.',
    rulebook: '/Rulebook/ROBORACE_RULEBOOK.pdf',
    registerLink: "https://forms.gle/tjj3WG6jgYaJohsT6",
    prizePool: '',
    entryFee: 'Rs 100/-',
    coordinator: 'Annixiki Biswas (9051608992)'
  },
  {
    title: 'ROBO SUMO',
    tagline: 'Engineer. Grab. Push!',
    image: '/EP/RoboSumo.jpeg',
    cover: '/EP/RoboSumoC.jpeg',
    date: '08-10 MAY 2K26',
    venue: 'FIT Ground',
    team: '1 - 4 PLAYERS',
    icon: '🤖',
    domain: 'tech',
    description: 'Forge a heavyweight brawler and step into the ring. ROBO SUMO demands flawless balance, relentless grip, and pure pushing power. Stand your ground and shove every rival over the edge.',
    rulebook: '/Rulebook/ROBOSUMO_RULEBOOK.pdf',
    registerLink: "https://forms.gle/67aVS9AY9LPNVB4T8",
    prizePool: 'Rs 2,000',
    entryFee: 'Rs 100/-',
    coordinator: 'Anirban Roy (7449692809)'
  },
  {
    title: 'EFOOTBALL',
    tagline: 'Virtual Pitch Glory',
    image: '/EP/EFOOTBALL.jpeg',
    cover: '/EP/EFOOTBALLC.jpeg',
    date: '08-10 MAY 2K26',
    venue: 'FIT LAB',
    team: '1 PLAYER',
    icon: '⚽',
    domain: 'gaming',
    description: 'Take control of your favorite football clubs and outplay your opponents on the virtual pitch in intense EFOOTBALL matches.',
    rulebook: '/Rulebook/PES_RULEBOOK.pdf',
    registerLink: "https://forms.gle/eSjK5YptJHiFivZY9",
    prizePool: 'Rs 9,000',
    entryFee: 'Rs 250/-',
    coordinator: 'Subhajit Rudra (8515019384)'
  },
  // {
  //   title: 'BGMI',
  //   tagline: 'Chicken Dinner Awaits',
  //   image: '/event-gaming.png',
  //   date: '24 - 25 AUG 2K26',
  //   venue: 'ESPORTS ZONE',
  //   team: '4 PLAYERS',
  //   icon: '🔫',
  //   domain: 'gaming',
  //   description: 'The ultimate battle royale experience. Coordinate with your squad, survive the zone, and secure the Winner Winner Chicken Dinner.',
  //   rulebook: '#',
  // }
];

/* ─────────────────────────────────────────
   SHARED HELPERS
───────────────────────────────────────── */
const CLIP = 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))';
const INNER_CLIP = 'polygon(0 0, calc(100% - 12.5px) 0, 100% 12.5px, 100% 100%, 12.5px 100%, 0 calc(100% - 12.5px))';


function CalendarIcon({ color = '#FF00A8' }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PinIcon({ color = '#FF00A8' }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function TeamIcon({ color = '#FF00A8' }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export const DOMAIN_COLORS: Record<string, string> = {
  tech: '#00F0FF',
  gaming: '#7FFF00',
  coding: '#00FF99',
  'non-tech': '#FF00A8',
};

const getDomainColor = (domain: string) => DOMAIN_COLORS[domain] || '#00F0FF';

const hexToRgb = (hex: string) => {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16) || 0;
  const g = parseInt(h.substring(2, 4), 16) || 0;
  const b = parseInt(h.substring(4, 6), 16) || 0;
  return `${r},${g},${b}`;
};

/* ─────────────────────────────────────────
   SWIPE REGISTER BUTTON
───────────────────────────────────────── */
function RegisterButton({ onClick, href, accent = '#FF00A8' }: { onClick?: () => void; href?: string; accent?: string }) {
  const shineRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (shineRef.current) {
      gsap.fromTo(
        shineRef.current,
        { x: '-100%', opacity: 0.7 },
        { x: '200%', opacity: 0, duration: 0.55, ease: 'power2.out' }
      );
    }
    e.currentTarget.style.background = `${accent}30`;
    e.currentTarget.style.boxShadow = `0 0 22px ${accent}60, inset 0 0 16px ${accent}20`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = `${accent}10`;
    e.currentTarget.style.boxShadow = 'none';
  };

  const innerContent = (
    <>
      {/* Neon border */}
      <span className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(90deg, ${accent}, transparent)`, clipPath: CLIP, opacity: 0.5 }} />
      <span className="absolute pointer-events-none" style={{ inset: '1.5px', background: 'rgba(5,5,15,0.88)', clipPath: INNER_CLIP }} />
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
      <span className="relative z-10" style={{ color: accent, textShadow: `0 0 8px ${accent}80` }}>
        REGISTER NOW →
      </span>
    </>
  );

  const commonClasses = "w-full py-3 text-xs font-heading tracking-[0.25em] uppercase relative overflow-hidden block text-center";
  const commonStyles = {
    clipPath: CLIP,
    background: `${accent}10`,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background 0.3s ease, box-shadow 0.3s ease',
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={commonClasses} style={commonStyles}>
        {innerContent}
      </a>
    );
  }

  return (
    <button onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={commonClasses} style={commonStyles}>
      {innerContent}
    </button>
  );
}

/* ─────────────────────────────────────────
   EVENT DETAIL POPUP
───────────────────────────────────────── */
function EventPopup({ event, onClose }: { event: EventData; onClose: () => void }) {
  const accent = DOMAIN_COLORS[event.domain] || '#FF00A8';
  const rgb = hexToRgb(accent);
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
      style={{ background: 'rgba(3,3,10,0.85)', backdropFilter: 'blur(8px)' }}
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
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(135deg, ${accent}, transparent, ${accent})`, clipPath: CLIP }} />

        {/* Panel body — flex-col on mobile, flex-row on md+ */}
        <div
          data-lenis-prevent="true"
          className="relative flex flex-col md:flex-row overflow-y-auto"
          style={{ margin: '1.5px', background: '#05050f', clipPath: INNER_CLIP, maxHeight: 'calc(92dvh - 3px)' }}
        >
          {/*
            LEFT (desktop) / TOP (mobile) — image
            Mobile: shorter fixed height banner with object-cover
            Desktop: width fits image aspect ratio to avoid left/right gaps
          */}
          <div
            className="relative flex-shrink-0 w-full md:w-fit md:max-w-[45%]"
          >
            <style>{`
              .popup-img-wrap { width: 100%; display: flex; justify-content: center; align-items: center; background: #0a0a1a; }
              @media (min-width: 768px) { 
                .popup-img-wrap { 
                  height: 100%; 
                  min-height: 380px;
                  width: fit-content; 
                } 
              }
            `}</style>
            <div className="popup-img-wrap">
              {event.cover ? (
                <>
                  <img src={event.cover} alt={event.title} className="w-full h-auto object-contain md:hidden" />
                  <img src={event.image} alt={event.title} className="hidden md:block w-full h-full md:w-auto md:max-w-full md:object-contain" />
                </>
              ) : (
                <>
                  <img src={event.image} alt={event.title} className="w-full h-[250px] object-contain md:hidden" />
                  <img src={event.image} alt={event.title} className="hidden md:block w-full h-full md:w-auto md:max-w-full md:object-contain" />
                </>
              )}
            </div>
          </div>

          {/* RIGHT (desktop) / BOTTOM (mobile) — details */}
          <div className="flex flex-col flex-1 px-5 sm:px-6 py-5 sm:py-6 gap-3 sm:gap-4">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-60"
              style={{ color: 'rgba(255,255,255,0.6)', background: 'rgba(5,5,15,0.7)', border: 'none', cursor: 'pointer', zIndex: 10, borderRadius: 4 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Title */}
            <div>
              <p className="text-[9px] sm:text-[10px] font-heading tracking-[0.3em] uppercase mb-1" style={{ color: accent }}>EVENT DETAILS</p>
              <h2
                className="font-nfs text-2xl sm:text-3xl tracking-wider uppercase pr-2"
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
                <CalendarIcon color={accent} />
                <div>
                  <div style={{ color: accent, fontSize: 9, letterSpacing: '0.25em' }}>DATE</div>
                  <div className="text-gray-200">{event.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <PinIcon color={accent} />
                <div>
                  <div style={{ color: accent, fontSize: 9, letterSpacing: '0.25em' }}>VENUE</div>
                  <div className="text-gray-200">{event.venue}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TeamIcon color={accent} />
                <div>
                  <div style={{ color: accent, fontSize: 9, letterSpacing: '0.25em' }}>TEAM</div>
                  <div className="text-gray-200">{event.team}</div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed" style={{ lineHeight: 1.75 }}>
              {event.description}
            </p>

            {/* Highlights */}
            {(event.prizePool || event.entryFee || event.coordinator) && (
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-2 mb-2">
                {event.prizePool && (
                  <div className="flex-1 min-w-[140px] px-4 py-3 rounded-md" style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)' }}>
                    <div className="text-[10px] font-heading tracking-widest text-[#00F0FF] mb-1 uppercase">PRIZE POOL</div>
                    <div className="text-lg sm:text-xl font-bold text-white tracking-wide">{event.prizePool}</div>
                  </div>
                )}
                {event.entryFee && (
                  <div className="flex-1 min-w-[140px] px-4 py-3 rounded-md" style={{ background: 'rgba(255,0,168,0.08)', border: '1px solid rgba(255,0,168,0.2)' }}>
                    <div className="text-[10px] font-heading tracking-widest text-[#FF00A8] mb-1 uppercase">ENTRY FEE</div>
                    <div className="text-lg sm:text-xl font-bold text-white tracking-wide">{event.entryFee}</div>
                  </div>
                )}
                {event.coordinator && (
                  <div className="w-full px-4 py-3 rounded-md" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="text-[10px] font-heading tracking-widest text-gray-400 mb-1 uppercase">COORDINATOR</div>
                    <div className="text-sm sm:text-base text-gray-200">{event.coordinator}</div>
                  </div>
                )}
              </div>
            )}

            {/* Action buttons — stack row-wise and make them more visible */}
            <div className="flex flex-col w-full gap-4 mt-auto pt-0">
              <div className="flex-1">
                <RegisterButton href={event.registerLink || '#'} accent={accent} />
              </div>
              <a
                href={event.rulebook}
                download={`${event.title.replace(/\s+/g, '_')}_Rulebook.pdf`}
                className="flex-1 flex items-center justify-center gap-2 px-2 sm:px-4 py-4 text-[10px] sm:text-xs md:text-md font-heading tracking-[0.18em] uppercase relative overflow-hidden no-underline"
                style={{ clipPath: CLIP, color: '#fff', textDecoration: 'none', transition: 'all 0.3s ease', background: `rgba(${rgb}, 0.25)`, border: `1px solid rgba(${rgb}, 0.5)` }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = `rgba(${rgb}, 0.4)`;
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 15px rgba(${rgb}, 0.4), inset 0 0 10px rgba(${rgb}, 0.2)`;
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = `rgba(${rgb}, 0.25)`;
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                }}
              >
                <span className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(90deg, ${accent}, transparent)`, clipPath: CLIP, opacity: 0.6 }} />
                <span className="absolute pointer-events-none" style={{ inset: '1.5px', background: 'rgba(5,5,15,0.7)', clipPath: INNER_CLIP }} />
                <span className="relative z-10 flex items-center gap-2 font-bold drop-shadow-md md:text-md">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" className="hidden sm:block">
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
  const accent = DOMAIN_COLORS[event.domain] || '#FF00A8';
  return (
    /*
      BORDER TECHNIQUE:
      Outer div  → clipped to CLIP shape, gradient background = the neon border colour
      Inner div  → same CLIP shape, dark bg, margin 1.5px → exposes 1.5px of gradient as border
      Both divs share the SAME clipPath so nothing bleeds outside the shape.
    */
    <div
      className="group flex flex-col h-full"
      style={{
        clipPath: CLIP,
        background: `linear-gradient(135deg, ${accent} 0%, transparent 50%, ${accent} 100%)`,
        padding: 0,
      }}
    >
      <div
        className="flex flex-col flex-1"
        style={{
          margin: '1.5px',
          clipPath: INNER_CLIP,
          background: '#05050f',
        }}
      >

        {/* IMAGE — overflow-hidden clips the image to the card shape */}
        <div
          className="relative overflow-hidden group-hover:[&>img]:scale-105 h-64 lg:h-80"
          style={{ cursor: 'pointer', flexShrink: 0 }}
          onClick={onOpen}
        >
          {event.cover ? (
            <img
              src={event.cover}
              alt={event.title}
              className="w-full h-full object-contain md:object-cover transition-transform duration-500"
              style={{ background: '#000000ff' }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
            />
          ) : (
            <img
              src={event.image}
              alt={event.title}
              className="block w-full h-full object-cover transition-transform duration-500"
              style={{ background: '#0a0a1a' }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(5,5,15,1) 0%, rgba(5,5,15,0.75) 30%, rgba(5,5,15,0.15) 60%, transparent 100%)' }}
          />

          {/* Title */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
            <h3
              className="font-nfs text-xl tracking-wider uppercase leading-tight drop-shadow-md pr-2"
              style={{
                background: 'linear-gradient(90deg, #ffffff 60%, #cccccc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {event.title}
            </h3>
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col px-4 pt-4 pb-5 gap-3 flex-1">

          <p className="text-xs text-gray-400 font-sans italic leading-snug line-clamp-2">{event.tagline}</p>

          <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />

          <div className="flex items-start justify-between gap-1 text-[9px] font-heading tracking-wider">
            <div className="flex items-start gap-1" style={{ flex: '0 0 auto', maxWidth: '36%' }}>
              <CalendarIcon color={accent} />
              <div>
                <div className="uppercase mb-0.5" style={{ color: accent, fontSize: 8, letterSpacing: '0.2em' }}>DATE</div>
                <div className="text-gray-200 leading-tight">{event.date}</div>
              </div>
            </div>
            <div className="w-px self-stretch flex-shrink-0" style={{ background: 'rgba(255,255,255,0.12)' }} />
            <div className="flex items-start gap-1 min-w-0" style={{ flex: '0 0 auto', maxWidth: '30%' }}>
              <PinIcon color={accent} />
              <div className="min-w-0">
                <div className="uppercase mb-0.5" style={{ color: accent, fontSize: 8, letterSpacing: '0.2em' }}>VENUE</div>
                <div className="text-gray-200 leading-tight truncate">{event.venue}</div>
              </div>
            </div>
            <div className="w-px self-stretch flex-shrink-0" style={{ background: 'rgba(255,255,255,0.12)' }} />
            <div className="flex items-start gap-1" style={{ flex: '0 0 auto', maxWidth: '28%' }}>
              <TeamIcon color={accent} />
              <div>
                <div className="uppercase mb-0.5" style={{ color: accent, fontSize: 8, letterSpacing: '0.2em' }}>TEAM</div>
                <div className="text-gray-200 leading-tight">{event.team}</div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-5">
            <RegisterButton onClick={onOpen} accent={accent} />
          </div>
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
      <div className="relative" style={{ margin: '1px', clipPath: INNER_CLIP, background: 'rgba(5,5,15,0.9)' }}>
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
type Domain = 'tech' | 'gaming' | 'coding' | 'non-tech';

const TAB_LABELS: { key: Domain; label: string }[] = [
  { key: 'tech', label: 'ROBOTICS' },
  { key: 'gaming', label: 'GAMING' },
  { key: 'coding', label: 'CODING' },
  { key: 'non-tech', label: 'FUN' },
];

function FilterTabs({ active, onSelect }: { active: Domain; onSelect: (d: Domain) => void }) {
  return (
    <div className="flex flex-row lg:flex-col flex-nowrap sm:flex-wrap gap-3 w-fit lg:w-full">
      {TAB_LABELS.map(({ key, label }) => {
        const isActive = active === key;
        const accent = DOMAIN_COLORS[key] || '#FF00A8';
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="relative px-5 py-2 lg:py-4 lg:text-sm lg:w-full text-xs font-heading tracking-[0.2em] uppercase transition-all duration-200"
            style={{
              clipPath: CLIP,
              background: isActive ? `${accent}30` : 'rgba(255,255,255,0.04)',
              color: isActive ? accent : 'rgba(255,255,255,0.45)',
              boxShadow: isActive ? `0 0 16px ${accent}60` : 'none',
              textShadow: isActive ? `0 0 8px ${accent}` : 'none',
              border: 'none', outline: 'none', cursor: 'pointer',
            }}
          >
            <span className="absolute inset-0 pointer-events-none" style={{ clipPath: CLIP, background: isActive ? `linear-gradient(90deg, ${accent}, transparent)` : 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1))', opacity: isActive ? 0.7 : 1 }} />
            <span className="absolute pointer-events-none" style={{ inset: '1px', clipPath: INNER_CLIP, background: isActive ? 'rgba(5,5,15,0.9)' : 'rgba(5,5,15,0.85)' }} />
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
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Check the URL for an existing filter on initial load
  const getInitialFilter = () => {
    const params = new URLSearchParams(window.location.search);
    const filterFromUrl = params.get('section');
    return (filterFromUrl as Domain) || location.state?.filter || 'all';
  };

  const [active, setActive] = useState<Domain | 'all'>(getInitialFilter);
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // 2. Silently update the URL whenever the 'active' tab changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (active === 'all') {
      url.searchParams.delete('section');
    } else {
      url.searchParams.set('section', active);
    }
    // replaceState updates the URL without adding a new entry to browser history.
    // (Use window.history.pushState({}, '', url) instead if you want the back button to navigate between tabs)
    window.history.replaceState({}, '', url);
  }, [active]);

  // Fuse.js instance — rebuilt only when dataset changes
  const fuse = useMemo(
    () =>
      new Fuse(eventsData, {
        keys: ['title', 'tagline', 'venue', 'domain'],
        threshold: 0.3,   // 0 = exact, 1 = match anything; 0.3 = typo-tolerant but precise
        minMatchCharLength: 2,
      }),
    []
  );

  const filtered = useMemo(() => {
    // First apply domain filter
    const domainPool = active === 'all'
      ? eventsData
      : eventsData.filter((e) => e.domain === active);

    if (!search.trim()) return domainPool;

    // Run fuzzy search over the full dataset, then intersect with domain
    const fuseResults = fuse.search(search).map((r) => r.item);
    return active === 'all'
      ? fuseResults
      : fuseResults.filter((e) => e.domain === active);
  }, [active, search, fuse]);

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
      <div className="min-h-screen bg-[#03030a] text-white relative overflow-hidden">
        <div
          ref={headerRef}
          className="relative z-10 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(3,3,10,0.85)', backdropFilter: 'blur(12px)' }}
        >
          {/* Mobile: two rows. Desktop (md+): single row unchanged */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 sm:px-6 md:px-10 py-4 md:py-6 gap-3 md:gap-0">

            {/* Row 1 on mobile: back + badge side by side */}
            <div className="flex items-center justify-between md:contents">
              <button
                onClick={() => navigate('/')}
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

        {/* ── CONTENT WRAPPER — fills remaining viewport height; only right panel scrolls ── */}
        <div
          className="relative z-10 flex flex-col lg:flex-row"
          style={{ height: 'calc(100vh - 73px)', overflow: 'hidden' }}
        >
          {/* ── SIDEBAR (left panel — fixed, no scroll) ── */}
          <div
            className="flex-shrink-0 lg:w-72 flex flex-col gap-5 px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
            style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Search */}
            <div className="w-full">
              <SearchInput value={search} onChange={setSearch} />
            </div>

            {/* Filter tabs */}
            <div
              data-lenis-prevent="true"
              className="overflow-x-auto pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <FilterTabs active={active as Domain} onSelect={setActive} />
            </div>

            <div className="w-full h-px lg:hidden" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.3) 30%, rgba(255,0,168,0.3) 70%, transparent)' }} />
          </div>

          {/* ── MAIN GRID (right panel — scrollable) ── */}
          <div
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,0,168,0.3) transparent' }}
          >
            {filtered.length === 0 ? (
              search.trim() !== '' ? (
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                  <div className="text-5xl">🔍</div>
                  <p className="font-heading tracking-widest text-gray-500 uppercase text-sm">No events found</p>
                  <button onClick={() => { setSearch(''); }} className="text-xs font-heading tracking-widest uppercase text-cyan-400 underline mt-2">
                    CLEAR FILTERS
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full min-h-[50vh]">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                    <div
                      className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
                      style={{
                        animationDuration: '1.5s',
                        borderTopColor: getDomainColor(active),
                        borderLeftColor: getDomainColor(active),
                        boxShadow: `0 0 15px rgba(${hexToRgb(getDomainColor(active))}, 0.2)`
                      }}
                    ></div>
                    <div
                      className="absolute inset-4 rounded-full animate-pulse"
                      style={{ backgroundColor: `rgba(${hexToRgb(getDomainColor(active))}, 0.05)` }}
                    ></div>
                    <div className="flex flex-col items-center justify-center text-center z-10">
                      <span className="font-nfs text-xs text-white/80 tracking-widest uppercase animate-pulse leading-tight">
                        Coming
                      </span>
                      <span
                        className="font-nfs text-xs tracking-widest uppercase animate-pulse leading-tight"
                        style={{ color: getDomainColor(active) }}
                      >
                        Soon
                      </span>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div
                ref={gridRef}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                style={{ maxWidth: 1400 }}
              >
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