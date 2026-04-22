import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   UTILS — exact same clip paths as Events.tsx
───────────────────────────────────────── */
const CLIP       = 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))';
const INNER_CLIP = 'polygon(0 0, calc(100% - 12.5px) 0, 100% 12.5px, 100% 100%, 12.5px 100%, 0 calc(100% - 12.5px))';

/* ─────────────────────────────────────────
   CSS injected once — shimmer keyframe + spinner
───────────────────────────────────────── */
const STYLES = `
@keyframes cs-shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
}
@keyframes cs-spin {
  to { transform: rotate(360deg); }
}
@keyframes cs-pulse-glow {
  0%, 100% { opacity: 0.6; text-shadow: 0 0 18px rgba(255,0,168,0.5); }
  50%       { opacity: 1;   text-shadow: 0 0 40px rgba(255,0,168,0.9), 0 0 80px rgba(0,240,255,0.4); }
}
@keyframes cs-scanline {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
.cs-shimmer {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.03) 0%,
    rgba(255,255,255,0.09) 40%,
    rgba(255,255,255,0.03) 80%
  );
  background-size: 600px 100%;
  animation: cs-shimmer 1.6s infinite linear;
}
`;

function injectStyles() {
  if (document.getElementById('cs-styles')) return;
  const el = document.createElement('style');
  el.id = 'cs-styles';
  el.textContent = STYLES;
  document.head.appendChild(el);
}

/* ─────────────────────────────────────────
   SKELETON CARD — matches EventCard shape
───────────────────────────────────────── */
function SkeletonCard({ index }: { index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = gsap.fromTo(
      cardRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 100%' },
      }
    );
    return () => { anim.scrollTrigger?.kill(); anim.kill(); };
  }, [index]);

  return (
    <div ref={cardRef} className="group relative" style={{ clipPath: CLIP }}>
      {/* Neon border */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(135deg, #FF00A8 0%, #00F0FF 50%, #FF00A8 100%)',
          clipPath: CLIP,
          opacity: 0.4,
        }}
      />

      {/* Body */}
      <div
        className="relative z-10 flex flex-col"
        style={{ margin: '1.5px', background: '#07071a', clipPath: INNER_CLIP }}
      >
        {/* Skeleton image area */}
        <div
          className="cs-shimmer relative"
          style={{ height: 280, background: 'rgba(255,255,255,0.04)' }}
        >
          {/* Fake trophy hex badge */}
          <div
            className="absolute top-3 right-3"
            style={{ width: 52, height: 52, opacity: 0.2, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}
          />
          {/* Fake icon + title bar at bottom */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
            <div style={{ width: 48, height: 48, borderRadius: 2, background: 'rgba(255,0,168,0.12)' }} />
            <div style={{ flex: 1, height: 20, borderRadius: 2, background: 'rgba(255,255,255,0.07)' }} />
          </div>
          {/* Gradient overlay — same as real card */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(7,7,26,1) 0%, rgba(7,7,26,0.6) 25%, transparent 60%)' }}
          />
        </div>

        {/* Skeleton info area */}
        <div className="flex flex-col px-4 pt-4 pb-5 gap-3">
          {/* Tagline skeleton */}
          <div className="cs-shimmer" style={{ height: 12, width: '80%', borderRadius: 2, background: 'rgba(255,255,255,0.05)' }} />
          <div className="cs-shimmer" style={{ height: 10, width: '55%', borderRadius: 2, background: 'rgba(255,255,255,0.04)' }} />

          {/* Divider */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

          {/* Date / Venue / Team skeleton */}
          <div className="flex items-center justify-between gap-1">
            <div className="cs-shimmer" style={{ height: 28, flex: 1, borderRadius: 2, background: 'rgba(255,255,255,0.04)' }} />
            <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.08)' }} />
            <div className="cs-shimmer" style={{ height: 28, flex: 1, borderRadius: 2, background: 'rgba(255,255,255,0.04)' }} />
            <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.08)' }} />
            <div className="cs-shimmer" style={{ height: 28, flex: 1, borderRadius: 2, background: 'rgba(255,255,255,0.04)' }} />
          </div>

          {/* Register button skeleton */}
          <div
            className="cs-shimmer"
            style={{
              clipPath: CLIP,
              height: 44,
              background: 'rgba(255,0,168,0.07)',
              borderRadius: 2,
            }}
          >
            {/* Border ring */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(255,0,168,0.3), rgba(0,240,255,0.3))', clipPath: CLIP, opacity: 0.4 }} />
            <div className="absolute pointer-events-none" style={{ inset: '1.5px', background: 'rgba(7,7,26,0.88)', clipPath: INNER_CLIP }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   NEON SPINNER
───────────────────────────────────────── */
function NeonSpinner() {
  return (
    <div style={{ position: 'relative', width: 72, height: 72 }}>
      {/* Outer ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: '#FF00A8',
          borderRightColor: '#00F0FF',
          animation: 'cs-spin 1.1s linear infinite',
        }}
      />
      {/* Inner ring — counter-spin */}
      <div
        style={{
          position: 'absolute',
          inset: 10,
          borderRadius: '50%',
          border: '1.5px solid transparent',
          borderTopColor: '#00F0FF',
          borderLeftColor: '#FF00A8',
          animation: 'cs-spin 0.75s linear infinite reverse',
        }}
      />
      {/* Core dot */}
      <div
        style={{
          position: 'absolute',
          inset: 22,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,0,168,0.7) 0%, rgba(0,240,255,0.4) 100%)',
          boxShadow: '0 0 20px rgba(255,0,168,0.6), 0 0 40px rgba(0,240,255,0.3)',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function EventsComingSoon() {
  const titleRef  = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectStyles();

    gsap.fromTo(
      titleRef.current,
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      }
    );

    // Subtle entrance for overlay
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.4,
        scrollTrigger: { trigger: overlayRef.current, start: 'top 90%' },
      }
    );
  }, []);

  return (
    <section id="events" className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">

      {/* ── Header — same as Events.tsx ── */}
      <div ref={titleRef} className="flex justify-between items-end mb-12 flex-wrap gap-4">
        <div>
          <p
            className="font-heading text-xs tracking-widest mb-2 uppercase"
            style={{ color: '#00F0FF' }}
          >
            WHAT'S WAITING FOR YOU
          </p>
          <h2 className="font-nfs text-5xl tracking-wide uppercase">EVENTS</h2>
        </div>

        {/* Buttons — disabled / ghost state */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            disabled
            className="group flex items-center gap-2 px-3 py-2 text-[10px] sm:text-xs font-heading tracking-widest transition-colors cursor-not-allowed"
            style={{ color: 'rgba(0,240,255,0.25)' }}
          >
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            RELOAD
          </button>
          <button
            disabled
            className="neon-border-blue px-4 sm:px-6 py-2 text-[10px] sm:text-xs font-heading tracking-widest cursor-not-allowed"
            style={{ opacity: 0.3 }}
          >
            VIEW ALL EVENTS →
          </button>
        </div>
      </div>

      {/* ── Skeleton grid + COMING SOON overlay ── */}
      <div className="relative">

        {/* 6 skeleton cards — same grid as Events.tsx */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
          style={{ filter: 'blur(1.5px)', pointerEvents: 'none', userSelect: 'none' }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} index={i} />
          ))}
        </div>

        {/* ── COMING SOON overlay ── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-6"
          style={{ zIndex: 10 }}
        >
          {/* Scanline sweep */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0, right: 0,
                height: 80,
                background: 'linear-gradient(to bottom, transparent, rgba(0,240,255,0.04), transparent)',
                animation: 'cs-scanline 3.5s ease-in-out infinite',
              }}
            />
          </div>

          {/* Glass panel */}
          <div
            style={{
              clipPath: CLIP,
              background: 'linear-gradient(135deg, rgba(255,0,168,0.7), rgba(0,240,255,0.7))',
              padding: 2,
            }}
          >
            <div
              className="flex flex-col items-center gap-6 px-10 sm:px-16 py-10"
              style={{
                clipPath: INNER_CLIP,
                background: 'rgba(5,5,18,0.93)',
                backdropFilter: 'blur(18px)',
              }}
            >
              <NeonSpinner />

              <div className="flex flex-col items-center gap-2 text-center">
                <p
                  className="font-heading text-[10px] tracking-[0.4em] uppercase"
                  style={{ color: '#00F0FF' }}
                >
                  UNiTRON 2K26
                </p>
                <h3
                  className="font-nfs text-3xl sm:text-4xl tracking-widest uppercase"
                  style={{
                    background: 'linear-gradient(90deg, #FF00A8, #ffffff, #00F0FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'cs-pulse-glow 2.4s ease-in-out infinite',
                    paddingRight: '0.2em',
                  }}
                >
                  COMING SOON
                </h3>
                <p
                  className="font-heading text-[10px] sm:text-xs tracking-[0.25em] uppercase mt-1"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  Events are being loaded into the system
                </p>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', maxWidth: 260 }}>
                <div
                  style={{
                    height: 3,
                    borderRadius: 2,
                    background: 'rgba(255,255,255,0.08)',
                    overflow: 'hidden',
                    clipPath: CLIP,
                  }}
                >
                  <div
                    className="cs-shimmer"
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #FF00A8, #00F0FF, #FF00A8)',
                      backgroundSize: '200% 100%',
                      animation: 'cs-shimmer 1.4s linear infinite',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sub-label below panel */}
          <p
            className="font-heading text-[9px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(255,255,255,0.2)', marginTop: -8 }}
          >
            Stay tuned — announcements dropping soon
          </p>
        </div>
      </div>
    </section>
  );
}
