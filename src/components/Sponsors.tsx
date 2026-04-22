import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- CURRENT SPONSORS ---
const sponsors = [
  {
    name: 'TECHNOX',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: 'CODECRAFT',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    name: 'INNOVATEK',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'DEVCONNECT',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    name: 'NEXTGEN TECHNOLOGIES',
    icon: null,
  },
];

// --- PAST SPONSORS ---
const pastSponsors = [
  { name: 'QUANTUM SYS' },
  { name: 'NEURO-NET' },
  { name: 'DATAFLOW' },
  { name: 'CYBERDYNE' },
  { name: 'AERO-SPACE' },
  { name: 'SYNTHETIX' },
];

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const pastSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Main Title Animation
    const titleEl = sectionRef.current?.querySelector('.sponsors-title-group');
    if (titleEl) {
      gsap.fromTo(
        titleEl,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      );
    }

    // 2. Current Sponsors Marquee Entry
    const cards = marqueeRef.current?.querySelectorAll('.sponsor-card') ?? [];
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: marqueeRef.current, start: 'top 85%' },
      }
    );

    // 3. Infinite horizontal slideshow
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 15,
      repeat: -1,
    });

    // 4. Past Sponsors Grid Animation
    const pastTitle = pastSectionRef.current?.querySelector('.past-sponsors-title');
    const pastCards = pastSectionRef.current?.querySelectorAll('.past-sponsor-card') ?? [];
    
    if (pastTitle) {
      gsap.fromTo(
        pastTitle,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: { trigger: pastSectionRef.current, start: 'top 85%' }
        }
      );
    }

    if (pastCards.length > 0) {
      gsap.fromTo(
        pastCards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: { trigger: pastSectionRef.current, start: 'top 85%' },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="sponsors" className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-0">
      
      {/* --- CURRENT SPONSORS HEADER --- */}
      <div className="sponsors-title-group mb-10">
        <p
          className="font-nfs text-xs tracking-widest mb-2 uppercase"
          style={{ color: '#FF00A8' }}
        >
          OUR SPONSORS
        </p>
        <h2 className="font-nfs text-4xl tracking-wide text-white">POWERING THE FUTURE</h2>
      </div>

      {/* --- CURRENT SPONSORS MARQUEE --- */}
      <div className="overflow-hidden mb-24">
        <div ref={marqueeRef} className="flex gap-4 w-max">
          {[...sponsors, ...sponsors].map((s, i) => (
            <div
              key={i}
              className="sponsor-card glass-panel border border-white/10 rounded p-4 flex items-center justify-center grayscale hover:grayscale-0 hover:border-[#FF00A8]/40 transition-all duration-300 cursor-pointer group min-w-[160px]"
            >
              <div className="flex items-center space-x-2">
                {s.icon && <span className="group-hover:text-[#00F0FF] transition">{s.icon}</span>}
                {s.icon ? (
                  <span className="font-heading text-[10px] font-bold text-white">{s.name}</span>
                ) : (
                  <span className="font-heading text-[10px] font-black tracking-tighter text-white">
                    NEXTGEN
                    <br />
                    <span className="text-[8px] font-normal tracking-widest text-gray-400">
                      TECHNOLOGIES
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PAST SPONSORS SECTION --- */}
      <div ref={pastSectionRef} className="pt-10 border-t border-white/5">
        <h3 className="past-sponsors-title font-nfs text-xl text-gray-400 mb-8 tracking-wider">
          THE LEGACY ARCHIVE <span className="text-xs text-gray-600 ml-2">// PAST PARTNERS</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {pastSponsors.map((s, i) => (
            <div
              key={i}
              className="past-sponsor-card border border-white/5 bg-white/5 rounded p-3 flex items-center justify-center opacity-60 hover:opacity-100 hover:border-[#00F0FF]/30 transition-all duration-300 cursor-default"
            >
              <span className="font-heading text-[9px] font-bold tracking-wider text-gray-300">
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}