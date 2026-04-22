import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface Member {
  name: string;
  designation: string;
  image?: string;
}

interface RoleGroup {
  role: string;
  accent: string;
  icon: string;
  members: Member[];
}

/* ─────────────────────────────────────────
   TEAM DATA
───────────────────────────────────────── */
const TEAM: RoleGroup[] = [
  {
    role: 'FACULTY MENTOR',
    accent: '#FFD700',
    icon: '',
    members: [
      { name: 'Dr Amit Kumar Majumdar', designation: 'Faculty Mentor & HOD, ECE', image: "/TEAM/Amit.jpeg" },
    ],
  },
  {
    role: 'MENTORS',
    accent: '#00F0FF',
    icon: '',
    members: [
      { name: 'Bishal Maity', designation: 'Mentor', image: '/TEAM/Bishal.jpg' },
      { name: 'Arpita Singh', designation: 'Mentor', image: '/TEAM/Arpita.jpg' },
      { name: 'Debayan Das', designation: 'Mentor', image: '/TEAM/Debayan.webp' },
      { name: 'Sayan Maity', designation: 'Mentor', image: '/TEAM/Sayan.jpg' },
      { name: 'Sudipta Sanyal', designation: 'Mentor', image: '/TEAM/Sudipta.jpg' },
      { name: 'Snehasish Das', designation: 'Mentor', image: '/TEAM/Snehasish.jpg' },
      { name: 'Diganta Debsharma', designation: 'Mentor', image: '/TEAM/Debu.jpg' },
    ],
  },
  {
    role: 'ADMIN PANEL',
    accent: '#FF00A8',
    icon: '',
    members: [
      { name: 'Ariyan Roy', designation: 'President', image: '/TEAM/Ariyan.jpg' },
      { name: 'Asmita Guha', designation: 'Secretary', image: '/TEAM/Asmita.jpeg' },
      { name: 'Soumadeep Barui', designation: 'Treasurer', image: '/TEAM/Barui.jpg' },
      { name: 'Rupsa Pal', designation: 'Adminstrator', image: '/TEAM/Rupsa.jpeg' },
    ],
  },
  {
    role: 'DESIGN HEADS',
    accent: '#BF5FFF',
    icon: '',
    members: [
      { name: 'Soham Pandit', designation: 'Design Head', image: '/TEAM/Soham.jpg' },
      { name: 'Debopriya Saha', designation: 'Design Head', image: '/TEAM/Debopriya.jpg' },
      { name: 'Soumita Banik', designation: 'Design Head', image: '/TEAM/Soumita.jpeg' },
    ],
  },
  {
    role: 'CODING HEADS',
    accent: '#00FF99',
    icon: '',
    members: [
      { name: 'Snehashish Banerjee', designation: 'Coding Head', image: '/TEAM/Snehashish.jpg' },
      { name: 'Swapnil Chaki', designation: 'Coding Head', image: '/TEAM/Swapnil.jpeg' },
    ],
  },
  {
    role: 'SPONSOR HEAD',
    accent: '#FF8C00',
    icon: '',
    members: [
      { name: 'Ayan Roy', designation: 'Sponsorship Head', image: '/TEAM/Ayan.png' },
    ],
  },
  {
    role: 'NON-TECH HEADS',
    accent: '#FF4D6D',
    icon: '',
    members: [
      { name: 'Arijit Ghosh', designation: 'Non-Tech Head', image: '/TEAM/Arijit.jpg' },
      { name: 'Adrija Ghosh', designation: 'Non-Tech Head', image: '/TEAM/Adrija.jpeg' },
      { name: 'Trishit Maity', designation: 'Non-Tech Head', image: '/TEAM/Trishit.jpg' },
    ],
  },
  {
    role: 'TECH HEADS',
    accent: '#00BFFF',
    icon: '',
    members: [
      { name: 'Annixiki Biswas', designation: 'Tech Head', image: '/TEAM/Annixiki.jpg' },
      { name: 'Anirban Roy', designation: 'Tech Head', image: '/TEAM/Anirban.jpg' },
      { name: 'Aishee Majumdar', designation: 'Tech Head', image: '/TEAM/Aishee.jpg' },
      { name: 'Himangshu Singh', designation: 'Tech Head', image: '/TEAM/HIMANGSHU.jpg' },
    ],
  },
  {
    role: 'GAMING HEADS',
    accent: '#7FFF00',
    icon: '',
    members: [
      { name: 'Subhajit Rudra', designation: 'Gaming Head', image: '/TEAM/Subhajit.jpg' },
      { name: 'Suman Jana', designation: 'Gaming Head', image: '/TEAM/Suman.jpg' },
      { name: 'Debadri Das', designation: 'Gaming Head', image: '/TEAM/Debadri.jpeg' },
    ],
  },
];

/* ─────────────────────────────────────────
   PLACEHOLDER AVATAR SVG
───────────────────────────────────────── */
function PlaceholderSVG({ accent, size }: { accent: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', opacity: 0.8 }}
    >
      <defs>
        <radialGradient id={`rg-${accent.replace('#', '')}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
          <stop offset="100%" stopColor="#07071a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill={`url(#rg-${accent.replace('#', '')})`} />
      {[16, 22, 28, 34, 40, 46].map((y) => (
        <line key={y} x1="8" y1={y} x2="56" y2={y} stroke={accent} strokeOpacity="0.1" strokeWidth="0.8" />
      ))}
      <ellipse cx="32" cy="22" rx="10" ry="11" fill="#0a0a1e" stroke={accent} strokeOpacity="0.7" strokeWidth="1.2" />
      <line x1="22" y1="21" x2="42" y2="21" stroke={accent} strokeOpacity="0.5" strokeWidth="1" />
      <rect x="25" y="19" width="5" height="3" rx="1" fill={accent} fillOpacity="0.9" />
      <rect x="34" y="19" width="5" height="3" rx="1" fill={accent} fillOpacity="0.9" />
      <path
        d="M14 54 C14 40 20 36 32 34 C44 36 50 40 50 54"
        fill="#0a0a1e"
        stroke={accent}
        strokeOpacity="0.6"
        strokeWidth="1.2"
      />
      <rect x="27" y="38" width="10" height="6" rx="1" fill={accent} fillOpacity="0.15" stroke={accent} strokeOpacity="0.4" strokeWidth="0.8" />
      <line x1="32" y1="38" x2="32" y2="44" stroke={accent} strokeOpacity="0.5" strokeWidth="0.8" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   SLANTED CARD (Premium Editorial Layout)
───────────────────────────────────────── */
function SlantedCard({ member, accent }: { member: Member; accent: string }) {
  // Use a slight skew for the premium magazine look
  return (
    <div
      className="relative group overflow-hidden md:transform md:-skew-x-12 transition-all duration-700 ease-out shrink-0 w-full sm:w-[320px] md:w-[280px] lg:w-[300px] xl:w-[320px] h-[400px] md:h-[500px] lg:h-[550px] border-l border-r border-white/10 md:hover:w-[320px] lg:hover:w-[340px] xl:hover:w-[380px] md:hover:z-20 cursor-pointer"
      style={{
        backgroundColor: '#05050f',
        boxShadow: `0 10px 30px -10px ${accent}30`,
      }}
    >
      {/* Container with counter-skew for desktop */}
      <div className="absolute inset-0 w-full h-full md:w-[130%] md:-left-[15%] md:transform md:skew-x-12 flex flex-col justify-end">

        {/* Image / Avatar */}
        <div className="absolute inset-0 w-full h-full bg-[#0a0a1a]">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
              style={{ objectPosition: 'center top' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
              <PlaceholderSVG accent={accent} size={140} />
            </div>
          )}
        </div>

        {/* Diagonal Light Sweep effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none"
          style={{ background: `linear-gradient(105deg, transparent 20%, ${accent} 40%, transparent 60%)`, backgroundSize: '200% 100%', backgroundPosition: '100% 0' }} />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/80 transition-all duration-500" />

        {/* Text Details */}
        <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full transform md:translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
          <div className="w-8 h-[2px] mb-4 transition-all duration-500 group-hover:w-16" style={{ backgroundColor: accent, boxShadow: `0 0 15px ${accent}` }} />
          <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-white leading-[1.1] font-nfs drop-shadow-lg uppercase" style={{ textShadow: `0 0 20px ${accent}60` }}>
            {member.name.split(' ').map((part, i) => (
              <span key={i} className="block">{part}</span>
            ))}
          </h4>
          <p className="text-[10px] md:text-xs lg:text-sm font-semibold tracking-[0.3em] mt-4 uppercase text-gray-400 group-hover:text-white transition-colors duration-300">
            {member.designation}
          </p>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ROLE GROUP SECTION
───────────────────────────────────────── */
function RoleSection({ group }: { group: RoleGroup }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      }
    );
  }, []);

  // Smart chunking: guarantees centered aesthetic
  // If 5 or 6 members, split evenly into max 3 per row (e.g. 6 -> 3 & 3)
  // Otherwise, split into max 4 per row (e.g. 7 -> 4 & 3, 4 -> 4)
  const len = group.members.length;
  let chunkSize = 4;
  if (len === 5 || len === 6) {
    chunkSize = 3;
  }

  const memberChunks = [];
  for (let i = 0; i < len; i += chunkSize) {
    memberChunks.push(group.members.slice(i, i + chunkSize));
  }

  return (
    <div ref={ref} className="mb-24 md:mb-32 last:mb-0 relative z-10">
      {/* Category Title */}
      <div className="mb-12 flex flex-col items-center text-center px-4">
        <h3
          className="text-3xl md:text-5xl font-nfs uppercase tracking-widest relative inline-block"
          style={{
            color: '#fff',
            textShadow: `0 0 20px ${group.accent}60`,
          }}
        >
          {group.role}
          <span
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-[2px] w-3/4"
            style={{ background: `linear-gradient(90deg, transparent, ${group.accent}, transparent)`, boxShadow: `0 0 15px ${group.accent}` }}
          />
        </h3>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col gap-y-6 md:gap-y-12 px-4 max-w-[1600px] mx-auto">
        {memberChunks.map((chunk, idx) => (
          <div key={idx} className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-y-6 md:gap-x-4 lg:gap-x-6">
            {chunk.map((member) => (
              <SlantedCard key={member.name} member={member} accent={group.accent} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function CoreTeam() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: -30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      }
    );
  }, []);

  return (
    <section id="team" className="relative py-24 bg-[#03030a] overflow-hidden min-h-screen">

      {/* Ambient glowing background patterns */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 15% 30%, rgba(0, 240, 255, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 85% 70%, rgba(255, 0, 168, 0.04) 0%, transparent 50%)
          `,
        }}
      />

      {/* Diagonal background slants */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute w-[200%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent top-[20%] -left-[50%] transform rotate-12" />
        <div className="absolute w-[200%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent top-[60%] -left-[50%] transform -rotate-12" />
        <div className="absolute w-[200%] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent top-[80%] -left-[50%] transform rotate-6" />
      </div>

      <div className="w-full relative z-10">

        {/* ── MAIN HEADER ── */}
        <div ref={titleRef} className="flex flex-col items-center justify-center mb-32 px-4 text-center">
          <p className="font-heading text-sm md:text-base tracking-[0.5em] uppercase mb-6 text-[#00F0FF] drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">
            The Minds Behind UNiTRON 2K26
          </p>
          <h2 className="font-nfs text-5xl md:text-7xl lg:text-8xl tracking-widest uppercase text-white mb-8" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>
            MEET THE TEAM
          </h2>
          <div className="flex items-center justify-center gap-4 w-full max-w-lg">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-[#FF00A8]" />
            <div className="w-3 h-3 rounded-full bg-[#FF00A8] shadow-[0_0_15px_#FF00A8]" />
            <div className="w-3 h-3 rounded-full bg-[#00F0FF] shadow-[0_0_15px_#00F0FF]" />
            <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-[#00F0FF]" />
          </div>
        </div>

        {/* ── LEVEL 1: FACULTY MENTOR ── */}
        <RoleSection group={TEAM[0]} />

        {/* ── LEVEL 2: MENTORS ── */}
        <RoleSection group={TEAM[1]} />

        {/* ── LEVEL 3: CORE TEAM (Grouped) ── */}
        <div className="mt-48 relative">

          {/* Core Team Section Header */}
          <div className="text-center mb-24 relative z-10 px-4">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-nfs text-white uppercase tracking-widest" style={{ textShadow: '0 0 40px rgba(255,255,255,0.2)' }}>
              CORE TEAM
            </h2>
            <p className="mt-6 text-gray-400 tracking-[0.3em] uppercase text-sm md:text-base">The Pillars of our Event</p>
            <div className="w-40 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-8 opacity-40" />
          </div>

          {/* Sub-Categories */}
          <RoleSection group={TEAM[2]} /> {/* ADMIN PANEL */}
          <RoleSection group={TEAM[7]} /> {/* TECH HEADS */}
          <RoleSection group={TEAM[8]} /> {/* GAMING HEADS */}
          <RoleSection group={TEAM[3]} /> {/* DESIGN HEADS */}
          <RoleSection group={TEAM[6]} /> {/* NON-TECH HEADS */}
          <RoleSection group={TEAM[4]} /> {/* CODING HEADS */}
          <RoleSection group={TEAM[5]} /> {/* SPONSOR HEAD */}

        </div>

      </div>
    </section>
  );
}