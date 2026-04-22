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
  image?: string; // set to '/team/filename.jpg' when photos are ready
}

interface RoleGroup {
  role: string;
  accent: string;
  icon: string;
  members: Member[];
}

/* ─────────────────────────────────────────
   TEAM DATA — replace names/images as needed
───────────────────────────────────────── */
const TEAM: RoleGroup[] = [
  {
    role: 'FACULTY MENTOR',
    accent: '#FFD700',
    icon: '',
    members: [
      { name: 'Dr. A. Krishnamurthy', designation: 'Faculty Mentor & HOD, CSE' },
    ],
  },
  {
    role: 'MENTORS',
    accent: '#00F0FF',
    icon: '',
    members: [
      { name: 'Arjun Venkatesh', designation: 'Senior Mentor' },
      { name: 'Priya Radhakrishnan', designation: 'Senior Mentor' },
      { name: 'Karthik Subramaniam', designation: 'Technical Mentor' },
      { name: 'Divya Nair', designation: 'Technical Mentor' },
      { name: 'Rohan Pillai', designation: 'Events Mentor' },
      { name: 'Sneha Balaji', designation: 'Events Mentor' },
      { name: 'Aditya Kumar', designation: 'Outreach Mentor' },
    ],
  },
  {
    role: 'ADMIN PANEL',
    accent: '#FF00A8',
    icon: '',
    members: [
      { name: 'Meera Chandran', designation: 'General Secretary' },
      { name: 'Vikram Anand', designation: 'Joint Secretary' },
      { name: 'Pooja Srinivasan', designation: 'Treasurer' },
      { name: 'Rahul Menon', designation: 'Executive Member' },
    ],
  },
  {
    role: 'DESIGN HEADS',
    accent: '#BF5FFF',
    icon: '',
    members: [
      { name: 'Lakshmi Priya', designation: 'Design Head' },
      { name: 'Arun Selvam', designation: 'Design Head' },
      { name: 'Nithya Devi', designation: 'Design Head' },
    ],
  },
  {
    role: 'CODING HEADS',
    accent: '#00FF99',
    icon: '',
    members: [
      { name: 'Siddharth Rajan', designation: 'Coding Head' },
      { name: 'Kavitha Murthy', designation: 'Coding Head' },
    ],
  },
  {
    role: 'SPONSOR HEAD',
    accent: '#FF8C00',
    icon: '',
    members: [
      { name: 'Deepak Narayanan', designation: 'Sponsorship Head' },
    ],
  },
  {
    role: 'NON-TECH HEADS',
    accent: '#FF4D6D',
    icon: '',
    members: [
      { name: 'Anjali Kumari', designation: 'Non-Tech Head' },
      { name: 'Praveen Raj', designation: 'Non-Tech Head' },
      { name: 'Shreya Iyer', designation: 'Non-Tech Head' },
    ],
  },
  {
    role: 'TECH HEADS',
    accent: '#00BFFF',
    icon: '',
    members: [
      { name: 'Harish Babu', designation: 'Tech Head' },
      { name: 'Geetha Lakshmi', designation: 'Tech Head' },
      { name: 'Surya Prakash', designation: 'Tech Head' },
      { name: 'Ananya Krishnan', designation: 'Tech Head' },
    ],
  },
  {
    role: 'GAMING HEADS',
    accent: '#7FFF00',
    icon: '',
    members: [
      { name: 'Nikhil Varma', designation: 'Gaming Head' },
      { name: 'Ranjith Kumar', designation: 'Gaming Head' },
      { name: 'Preethi Sundaram', designation: 'Gaming Head' },
    ],
  },
];

/* ─────────────────────────────────────────
   CLIP PATHS
   OUTER: 12px cut  →  the gradient border colour
   INNER: 10px cut + margin 1.5px  →  dark body
   Slightly smaller inner cut prevents corner bleed.
───────────────────────────────────────── */
const OUTER_CLIP = 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))';
const INNER_CLIP = 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))';

/* ─────────────────────────────────────────
   PLACEHOLDER AVATAR SVG
   Cyberpunk silhouette — used when no image provided
───────────────────────────────────────── */
function PlaceholderSVG({ accent, size }: { accent: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Background radial */}
      <defs>
        <radialGradient id={`rg-${accent.replace('#', '')}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor="#07071a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill={`url(#rg-${accent.replace('#', '')})`} />

      {/* Scan lines */}
      {[16, 22, 28, 34, 40, 46].map((y) => (
        <line key={y} x1="8" y1={y} x2="56" y2={y} stroke={accent} strokeOpacity="0.06" strokeWidth="0.8" />
      ))}

      {/* Head */}
      <ellipse cx="32" cy="22" rx="10" ry="11" fill="#0a0a1e" stroke={accent} strokeOpacity="0.7" strokeWidth="1.2" />
      {/* Visor line */}
      <line x1="22" y1="21" x2="42" y2="21" stroke={accent} strokeOpacity="0.5" strokeWidth="1" />
      {/* Eyes */}
      <rect x="25" y="19" width="5" height="3" rx="1" fill={accent} fillOpacity="0.9" />
      <rect x="34" y="19" width="5" height="3" rx="1" fill={accent} fillOpacity="0.9" />

      {/* Shoulders / body */}
      <path
        d="M14 54 C14 40 20 36 32 34 C44 36 50 40 50 54"
        fill="#0a0a1e"
        stroke={accent}
        strokeOpacity="0.6"
        strokeWidth="1.2"
      />
      {/* Chest detail */}
      <rect x="27" y="38" width="10" height="6" rx="1" fill={accent} fillOpacity="0.15" stroke={accent} strokeOpacity="0.4" strokeWidth="0.8" />
      <line x1="32" y1="38" x2="32" y2="44" stroke={accent} strokeOpacity="0.5" strokeWidth="0.8" />

      {/* Corner circuit accents */}
      <path d="M8 8 L8 14 M8 8 L14 8" stroke={accent} strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
      <path d="M56 8 L56 14 M56 8 L50 8" stroke={accent} strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
      <path d="M8 56 L8 50 M8 56 L14 56" stroke={accent} strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
      <path d="M56 56 L56 50 M56 56 L50 56" stroke={accent} strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   AVATAR PHOTO
───────────────────────────────────────── */
function AvatarPhoto({
  image, name, accent
}: {
  image?: string; name: string; accent: string;
}) {
  return (
    <div style={{ width: '100%', height: '70%', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
      {image ? (
        <img
          src={image}
          alt={name}
          className="group-hover/card:scale-110 transition-transform duration-500"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: 'center top' }}
        />
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a1e' }}>
          <PlaceholderSVG accent={accent} size={64} />
        </div>
      )}
      {/* Accent border line right under image */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: accent }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   MEMBER CARD
───────────────────────────────────────── */
function MemberCard({ member, accent }: { member: Member; accent: string }) {
  return (
    <div className="relative group/card shrink-0 mx-auto w-32 sm:w-40 md:w-48 lg:w-56 cursor-pointer" style={{ aspectRatio: '3/4' }}>

      {/* 3D Base/Shadow Layer */}
      <div
        className="absolute inset-0 transition-transform duration-300 group-hover/card:translate-x-2 group-hover/card:translate-y-2 pointer-events-none"
        style={{ clipPath: OUTER_CLIP, background: accent, opacity: 0.4 }}
      />

      {/* Front Layer */}
      <div
        className="absolute inset-0 flex flex-col transition-transform duration-300 group-hover/card:-translate-x-1 group-hover/card:-translate-y-1"
        style={{ clipPath: OUTER_CLIP, background: accent }}
      >
        {/* Inner body — uses INNER_CLIP (slightly smaller cut) to avoid corner bleed */}
        <div
          className="flex-1 flex flex-col"
          style={{
            margin: '1.5px',
            clipPath: INNER_CLIP,
            background: 'linear-gradient(160deg, #0e0e26 0%, #07071a 100%)',
          }}
        >
          <AvatarPhoto name={member.name} image={member.image} accent={accent} />

          <div className="flex flex-col items-center justify-center flex-1 p-2 sm:p-3 text-center gap-1 sm:gap-2">
            <div style={{ width: '100%' }}>
              <p
                className="text-[10px] sm:text-xs lg:text-sm font-bold leading-tight"
                style={{
                  fontFamily: "'Rajdhani', 'Orbitron', sans-serif",
                  color: '#ffffff',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                  textShadow: '0 0 8px rgba(255,255,255,0.15)',
                }}
              >
                {member.name}
              </p>
              <p
                className="text-[8px] sm:text-[9px] font-semibold"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: accent,
                  textShadow: `0 0 6px ${accent}99`,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                {member.designation}
              </p>
            </div>

            {/* Accent bottom line */}
            <div
              style={{
                width: '55%', height: 1,
                background: `linear-gradient(90deg, transparent, ${accent}cc, transparent)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   FACULTY CARD (large hero card)
───────────────────────────────────────── */
const FAC_OUTER = 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))';
const FAC_INNER = 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))';

function FacultyCard({ member, accent }: { member: Member; accent: string }) {
  return (
    <div className="relative group/card shrink-0 mx-auto w-36 sm:w-48 md:w-56 lg:w-64 cursor-pointer" style={{ aspectRatio: '3/4' }}>

      {/* 3D Base/Shadow Layer */}
      <div
        className="absolute inset-0 transition-transform duration-300 group-hover/card:translate-x-2 group-hover/card:translate-y-2 pointer-events-none"
        style={{ clipPath: FAC_OUTER, background: accent, opacity: 0.4 }}
      />

      {/* Front Layer */}
      <div
        className="absolute inset-0 flex flex-col transition-transform duration-300 group-hover/card:-translate-x-1 group-hover/card:-translate-y-1"
        style={{
          clipPath: FAC_OUTER,
          background: `linear-gradient(135deg, ${accent} 0%, #FF00A8 50%, #00F0FF 100%)`,
        }}
      >
        <div
          className="flex-1 flex flex-col"
          style={{
            margin: '2px',
            clipPath: FAC_INNER,
            background: 'linear-gradient(160deg, #141436, #07071a)',
          }}
        >
          <AvatarPhoto name={member.name} image={member.image} accent={accent} />

          <div className="flex flex-col items-center justify-center flex-1 p-2 sm:p-4 text-center gap-1 sm:gap-2 lg:gap-3">
            {/* Crown SVG */}


            <div style={{ width: '100%' }}>
              <p
                className="text-[12px] sm:text-sm lg:text-base font-bold leading-tight"
                style={{
                  fontFamily: "'Rajdhani', 'Orbitron', sans-serif",
                  color: '#ffffff',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                  textShadow: `0 0 14px ${accent}88`,
                }}
              >
                {member.name}
              </p>
              <p
                className="text-[9px] sm:text-[10px] font-semibold"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: accent,
                  textShadow: `0 0 8px ${accent}`,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                }}
              >
                {member.designation}
              </p>
            </div>

            <div
              style={{
                width: '65%', height: 1,
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ROLE SECTION HEADER
───────────────────────────────────────── */
function RoleHeader({ role, accent, icon, count }: {
  role: string; accent: string; icon: string; count: number;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      {/* Left accent bar */}
      <div
        style={{
          width: 3, height: 28, borderRadius: 2, flexShrink: 0,
          background: accent,
          boxShadow: `0 0 10px ${accent}cc`,
        }}
      />
      <span style={{ fontSize: 15, lineHeight: 1 }}>{icon}</span>
      <h3
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          color: accent,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          textShadow: `0 0 10px ${accent}88`,
          whiteSpace: 'nowrap',
        }}
      >
        {role}
      </h3>
      {/* Count pill */}
      <span
        style={{
          fontSize: 9,
          fontFamily: 'monospace',
          color: accent,
          border: `1px solid ${accent}44`,
          padding: '1px 8px',
          borderRadius: 20,
          background: `${accent}11`,
          letterSpacing: '0.1em',
          flexShrink: 0,
        }}
      >
        {count}
      </span>
      {/* Right fade line */}
      <div
        className="flex-1"
        style={{ height: 1, background: `linear-gradient(to right, ${accent}44, transparent)` }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   ROLE GROUP SECTION
───────────────────────────────────────── */
function RoleSection({ group, index }: { group: RoleGroup; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 36, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.65, ease: 'power3.out',
        delay: (index % 3) * 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 90%' },
      }
    );
  }, [index]);

  const isFaculty = group.role === 'FACULTY MENTOR';

  return (
    <div ref={ref}>
      <RoleHeader
        role={group.role}
        accent={group.accent}
        icon={group.icon}
        count={group.members.length}
      />
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {group.members.map((m) =>
          isFaculty ? (
            <FacultyCard key={m.name} member={m} accent={group.accent} />
          ) : (
            <MemberCard key={m.name} member={m} accent={group.accent} />
          )
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION DIVIDER
───────────────────────────────────────── */
function Divider() {
  return (
    <div
      className="w-full h-px my-14"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
      }}
    />
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
      { y: -24, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      }
    );
  }, []);

  const totalMembers = TEAM.reduce((s, g) => s + g.members.length, 0);

  return (
    <section id="team" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 55% 35% at 8% 25%, rgba(0,240,255,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 45% 35% at 92% 75%, rgba(255,0,168,0.04) 0%, transparent 60%)
          `,
        }}
      />

      <div className="w-full max-w-[1600px] mx-auto relative z-10 px-4 sm:px-6 lg:px-8">

        {/* ── HEADER ── */}
        <div
          ref={titleRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p
              className="font-heading text-xs tracking-[0.35em] uppercase mb-2"
              style={{ color: '#00F0FF' }}
            >
              THE PEOPLE BEHIND UNITRON 2K26
            </p>
            <h2 className="font-nfs text-4xl sm:text-5xl tracking-wide uppercase">
              CORE TEAM
            </h2>
            <div className="mt-3 flex items-center gap-2">
              <div style={{ height: 2, width: 48, background: 'linear-gradient(90deg, #FF00A8, #00F0FF)', boxShadow: '0 0 8px #FF00A8' }} />
              <div style={{ height: 2, width: 16, background: 'rgba(255,255,255,0.15)' }} />
              <div style={{ height: 2, width: 6, background: 'rgba(255,255,255,0.08)' }} />
            </div>
          </div>

          {/* Total count badge */}
          <div
            className="font-heading text-xs tracking-widest px-5 py-3 self-start sm:self-auto"
            style={{
              clipPath: OUTER_CLIP,
              background: 'rgba(0,240,255,0.06)',
              border: '1px solid rgba(0,240,255,0.2)',
              color: '#00F0FF',
            }}
          >
            {totalMembers} MEMBERS
          </div>
        </div>

        {/* ── FACULTY ── */}
        <RoleSection group={TEAM[0]} index={0} />

        <Divider />

        {/* ── MENTORS ── */}
        <RoleSection group={TEAM[1]} index={1} />

        <Divider />

        {/* ── ADMIN + SPONSOR ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <RoleSection group={TEAM[2]} index={2} />
          <RoleSection group={TEAM[5]} index={5} />
        </div>

        <Divider />

        {/* ── DESIGN + CODING ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <RoleSection group={TEAM[3]} index={3} />
          <RoleSection group={TEAM[4]} index={4} />
        </div>

        <Divider />

        {/* ── NON-TECH + TECH + GAMING ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          <RoleSection group={TEAM[6]} index={6} />
          <RoleSection group={TEAM[7]} index={7} />
          <RoleSection group={TEAM[8]} index={8} />
        </div>

      </div>
    </section>
  );
}