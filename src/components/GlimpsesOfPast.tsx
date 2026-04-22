import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Laser wipe text reveal ───────────────────────────────────────────────────
interface LaserRevealProps {
  children: React.ReactNode;
  delay?: number;
}

function LaserReveal({ children, delay = 0 }: LaserRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        delay,
      });

      gsap.set(contentRef.current, { clipPath: 'inset(0 100% 0 0)' });

      tl.fromTo(
        laserRef.current,
        { left: '0%', opacity: 1 },
        { left: '100%', duration: 0.7, ease: 'power2.inOut' }
      );
      tl.to(
        contentRef.current,
        { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power2.inOut' },
        '<'
      );
      tl.to(laserRef.current, { opacity: 0, duration: 0.2 }, '-=0.1');
    }, wrapRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={wrapRef} className="relative overflow-hidden w-full">
      <div
        ref={laserRef}
        className="absolute top-0 bottom-0 w-0.5 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #00F0FF, #FF00A8, #00F0FF, transparent)',
          boxShadow: '0 0 12px rgba(0,240,255,0.9), 0 0 30px rgba(0,240,255,0.4)',
          opacity: 0,
        }}
      />
      <div ref={contentRef} className="w-full">{children}</div>
    </div>
  );
}

export default function GlimpsesOfPast() {
  const containerRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<HTMLDivElement>(null);

  // Extract all unique images
  const allImages = [
    '/memories/Coding1.webp',
    '/memories/Coding2.webp',
    '/memories/Coding3.webp',
    '/memories/Gaming1.webp',
    '/memories/Gaming3.webp',
    '/memories/NT1.webp',
    '/memories/NT2.webp',
    '/memories/NT3.webp',
    '/memories/Team1.JPG',
    '/memories/Team2.webp',
    '/memories/Team3.webp',
    '/memories/Team4.webp',
    '/memories/Tech1.webp',
    '/memories/Tech2.JPG',
    '/memories/Tech3.JPG',
    '/memories/Tech4.webp',
    '/memories/Tech5.webp',
    '/memories/WhatsApp Image 2026-04-23 at 12.47.58 AM (1).jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.47.58 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.47.59 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.48.01 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.48.02 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.48.27 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.48.29 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.48.35 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.48.36 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.48.39 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.48.40 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.48.41 AM (1).jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.48.41 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.48.42 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.48.43 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.48.44 AM (1).jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.48.44 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.48.45 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.50.23 AM (1).jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.50.23 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.50.24 AM (1).jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.50.24 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.50.25 AM.jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.50.26 AM (1).jpeg',
    '/memories/WhatsApp Image 2026-04-23 at 12.50.26 AM.jpeg',
    '/memories/m1.jpeg',
    '/memories/m2.jpeg'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth fade in animation for masonry items
      gsap.fromTo('.masonry-item',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: masonryRef.current, start: 'top 85%' }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="gallery" ref={containerRef} className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-20 relative w-full bg-black text-white font-body">
      <div className="max-w-[1800px] w-full mx-auto mb-24">

        {/* HEADER SECTION */}
        <LaserReveal>
          <div className="mb-8 pl-2 lg:pl-0 text-center md:text-left">
            <div className="mono text-xs text-white/40 tracking-[0.4em] mb-2 uppercase">My NFS System</div>
            <h2 className="racing-title text-4xl md:text-5xl lg:text-7xl text-white font-black uppercase tracking-tight leading-none mb-4">
              Glimpses of <span className="neon-text-cyan">Past</span>
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
              <span className="text-gray-500 text-xs tracking-[0.35em] uppercase font-mono">
                {allImages.length} captures
              </span>
              <div className="h-px w-[120px] bg-gradient-to-r from-[#FF00A8]/70 to-transparent"></div>
            </div>
          </div>
        </LaserReveal>

        {/* CLEAN MASONRY GRID SECTION */}
        <div ref={masonryRef} className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 relative z-20 mt-12">
          {allImages.map((img, idx) => (
            <div
              key={`mas-${idx}`}
              className="masonry-item break-inside-avoid mb-4 md:mb-6 cursor-pointer group relative overflow-hidden rounded-xl md:rounded-2xl transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20"
            >
              <img
                src={img}
                alt={`Gallery capture ${idx + 1}`}
                loading="lazy"
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
              />

              {/* Subtle dark gradient overlay for depth, just on hover or always subtle */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}