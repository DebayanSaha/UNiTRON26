import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gridTiles } from '../data/nfsData';

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

// ─── Single photo tile ────────────────────────────────────────────────────────
// PERFORMANCE: Using React.memo to prevent unnecessary re-renders
const NFSPhotoGridTile = React.memo(({ tile }: { tile: any }) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!tile.images || tile.images.length <= 1) return;

    // PERFORMANCE: Use a longer base interval so it doesn't crossfade constantly and lag the GPU
    const intervalTime = 4000 + Math.random() * 4000;
    const timer = setInterval(() => {
      setImgIndex(prev => (prev + 1) % tile.images.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [tile.images]);

  return (
    <div className={`relative overflow-hidden group border border-white/5 ${tile.cols} ${tile.rows} bg-[#050508] transition-all duration-500`}>
      {/* Dynamic Image Mapping */}
      {tile.images && tile.images.map((imgSrc: string, i: number) => {
        const isActive = i === imgIndex;
        const isPrev = i === (imgIndex - 1 + tile.images.length) % tile.images.length;

        // PERFORMANCE: Only render active and previous images. This massively reduces DOM nodes and prevents GPU memory leaks.
        if (!isActive && !isPrev && tile.images.length > 2) return null;

        return (
          <img
            key={i}
            src={imgSrc}
            alt={`${tile.label} memory ${i + 1}`}
            loading="lazy"
            decoding="async"
            // PERFORMANCE: added will-change for hardware acceleration during crossfade
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out mix-blend-luminosity will-change-[opacity,transform]
                       ${isActive ? 'opacity-40 group-hover:opacity-20 scale-100 z-10' : 'opacity-0 scale-105 z-0'}
                       group-hover:mix-blend-normal`}
          />
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50 pointer-events-none transition-opacity duration-300 group-hover:opacity-70" />

      <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-between pointer-events-none z-20">
        <div className="flex items-start justify-between w-full">
          <span className="font-heading text-[9px] md:text-[10px] text-white/50 tracking-[0.2em] uppercase break-words w-2/3 drop-shadow-md">
            {tile.label}
          </span>
          {tile.icon && (
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] scale-125 md:scale-150 origin-top-right grayscale">
              {tile.icon}
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-1.5 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
          <span className="font-heading font-bold text-2xl md:text-5xl text-white tracking-widest">{tile.value}</span>
          {tile.unit && <span className="font-heading text-[8px] md:text-[12px] text-white/40 tracking-widest">{tile.unit}</span>}
        </div>
      </div>

      <div className="absolute inset-0 opacity-10 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none mix-blend-screen z-10"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }} />
    </div>
  );
});

// ─── Main export ──────────────────────────────────────────────────────────────
export default function GlimpsesOfPast() {
  return (
    <div id="gallery" className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-20 relative w-full">
      <div className="max-w-[1800px] w-full mx-auto mb-24">
        <LaserReveal>
          <div className="mb-8 pl-2 lg:pl-0">
            <div className="mono text-xs text-white/40 tracking-[0.4em] mb-2 uppercase">My NFS System</div>
            <h2 className="racing-title text-4xl md:text-5xl text-white">
              Glimpses of<span className="neon-text-cyan"> Past</span>
            </h2>
          </div>
        </LaserReveal>

        <LaserReveal delay={0.1}>
          <div className="w-full mx-auto border-[2px] border-white/20 bg-black/60 backdrop-blur-xl p-[2px] relative shadow-[0_0_40px_rgba(0,0,0,0.6)]">
            <div className="absolute -inset-[1px] border border-cyan-400/30 pointer-events-none z-10" />
            <div className="grid grid-cols-4 md:grid-cols-6 auto-rows-[150px] md:auto-rows-[180px] lg:auto-rows-[200px] xl:auto-rows-[220px] 2xl:auto-rows-[260px] gap-1 relative z-20">
              {gridTiles.map(tile => <NFSPhotoGridTile key={tile.id} tile={tile} />)}
            </div>
          </div>
        </LaserReveal>
      </div>
    </div>
  );
}
