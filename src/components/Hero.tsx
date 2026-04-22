import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(taglineRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
    tl.fromTo(logoRef.current, { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3');
    tl.fromTo(subheadRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4');
    tl.fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    tl.fromTo(
      btnsRef.current?.querySelectorAll('button') ?? [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.7)' },
      '-=0.2'
    );
    tl.fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.1');

    gsap.to(scrollIndicatorRef.current, {
      opacity: 0.4,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden"
      style={{ height: '100vh', minHeight: 560, display: 'flex', alignItems: 'center' }}
    >
      {/* ── VIDEO BACKGROUND ── */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-110 contrast-125 saturate-150 scale-105"
      >
        <source src="/BG.mp4" type="video/mp4" />
        <source src="/hero-bg.webm" type="video/webm" />
      </video>

      {/* ── OVERLAY LAYERS ── */}

      {/* ── OVERLAY LAYERS ── */}

      {/*
        Layer 1 — LEFT content shield only.
        Strong dark on far left, gone by ~58% so the car is completely untouched.
      */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(3,5,20,0.95) 0%, rgba(3,5,20,0.85) 15%, rgba(3,5,20,0.65) 28%, rgba(3,5,20,0.32) 42%, rgba(3,5,20,0.10) 54%, transparent 62%)',
        }}
      />

      {/*
        Layer 2 — tall ellipse anchored hard left for extra depth behind text.
        Fades to fully transparent by 50% width — car side zero impact.
      */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 48% 110% at -2% 52%, rgba(3,5,20,0.60) 0%, rgba(3,5,20,0.30) 38%, transparent 65%)',
        }}
      />

      {/*
        Layer 3 — Bottom fade for countdown bar blend. Starts late so the
        car's lower half stays vivid; only the very bottom darkens.
      */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: '50%',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(18,0,43,0.10) 40%, rgba(18,0,43,0.55) 65%, rgba(18,0,43,0.88) 82%, #12002B 100%)',
        }}
      />

      {/*
        Layer 4 — Thin top vignette for nav legibility only.
      */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: '120px',
          background: 'linear-gradient(to bottom, rgba(3,5,20,0.40) 0%, transparent 100%)',
        }}
      />


      {/* ── GRID OVERLAY ── */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-30 mb-16 md:mb-24">
        {/*
          Desktop  : pushed left with negative margin, max-width 3xl
          Tablet   : normal left-aligned, no negative margin
          Mobile   : full width, centred text
        */}
        <div
          className="
            w-full
            text-center
            sm:text-left sm:max-w-xl
            lg:max-w-2xl
            xl:max-w-3xl
            flex flex-col items-center sm:items-start
          "
        >

          {/* Mobile blur backdrop — keeps text readable on small screens */}
          <div
            className="absolute inset-0 pointer-events-none sm:hidden"
            style={{
              background: 'radial-gradient(ellipse at 50% 40%, rgba(3,5,20,0.65) 0%, transparent 80%)',
              backdropFilter: 'blur(1px)',
              WebkitBackdropFilter: 'blur(1px)',
              zIndex: 0,
            }}
          />

          {/* TAGLINE */}
          <p
            ref={taglineRef}
            className="font-heading tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-5 uppercase text-cyan-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] relative z-10"
          >
            The Ultimate Tech Fest
          </p>

          <img
            ref={logoRef}
            src="/unitron.png"
            alt="UNITRON 2026"
            className="drop-shadow-2xl mb-3 relative z-10 sm:-ml-5 lg:-ml-8"
            style={{ width: 'min(680px, 90vw)' }}
          />

          {/* SUBHEAD */}
          <p
            ref={subheadRef}
            className="font-heading font-black italic tracking-widest mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] relative z-10"
            style={{ fontSize: 'clamp(1rem, 4vw, 2rem)' }}
          >
            CODE. CREATE. COMPETE.
          </p>

          {/* DESCRIPTION */}
          <p
            ref={descRef}
            className="text-gray-100 font-medium leading-relaxed mb-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] relative z-10 mx-auto sm:mx-0"
            style={{ fontSize: 'clamp(0.8rem, 1.8vw, 1rem)', maxWidth: 480 }}
          >
            A NATIONAL LEVEL TECHNICAL SYMPOSIUM
            <br />
            WHERE INNOVATION MEETS PASSION.
          </p>

          {/* BUTTONS */}
          <div
            ref={btnsRef}
            className="flex flex-wrap gap-4 md:gap-6 relative z-10 justify-center sm:justify-start w-full"
          >
            <button className="btn-neon-pink bg-white/5 backdrop-blur-md font-heading flex items-center justify-center">
              <span>REGISTER NOW</span>
            </button>
            <button className="btn-neon-blue bg-white/5 backdrop-blur-md font-heading flex items-center justify-center">
              <span>EXPLORE EVENTS</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute right-8 bottom-36 rotate-90 origin-right hidden lg:block z-30"
      >
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-heading tracking-widest uppercase text-cyan-300">
            Scroll Down
          </span>
          <div className="w-12 h-[1px] bg-cyan-300" />
        </div>
      </div>
    </section>
  );
}