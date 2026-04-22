import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Target date: 21 days from now
const TARGET_DATE = new Date('2026-05-08T08:00:00');

function getTimeLeft() {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function TimeBlock({ value, label, isMobile }: { value: number; label: string; isMobile?: boolean }) {
  const numRef = useRef<HTMLDivElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value && numRef.current) {
      gsap.fromTo(
        numRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
      prevValue.current = value;
    }
  }, [value]);

  return (
    <div className={`text-center ${isMobile ? 'flex-1' : ''}`}>
      <div ref={numRef} className={`${isMobile ? 'text-2xl sm:text-3xl' : 'text-4xl md:text-5xl'} font-heading font-bold tabular-nums`}>
        {String(value).padStart(2, '0')}
      </div>
      <div className={`${isMobile ? 'text-[8px] sm:text-[9px] mt-1' : 'text-[10px] mt-1'} font-heading text-gray-500 tracking-widest`}>
        {label}
      </div>
    </div>
  );
}

export default function Countdown() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Desktop animation
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
          },
        }
      );
    }

    // Mobile animation
    if (mobileRef.current) {
      gsap.fromTo(
        mobileRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mobileRef.current,
            start: 'top 95%',
          },
        }
      );
    }
  }, []);

  return (
    <>
      {/* ── DESKTOP VIEW (EXACT USER CODE) ── */}
      <section className="relative hidden md:block -mt-[280px] lg:-mt-[340px] z-20 px-10 mb-10 pointer-events-none">
        <div
          ref={sectionRef}
          /* Removed rounded-xl to let the sharp polygon take over */
          className="max-w-7xl mx-auto p-30 flex flex-wrap items-center justify-center gap-15 pointer-events-auto"
          style={{
            backgroundImage: 'url("/countdown.png")', // 👈 add your image here
            backgroundSize: '100% 100%',
            backgroundPosition: 'center -10px',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Label */}
          <div className="flex-1 min-w-[200px]">
            <h3
              className="font-heading font-black text-md tracking-wider mb-1"
              style={{ color: '#FF22C2' }}
            >
              EVENT STARTS IN
            </h3>
          </div>

          {/* Timer blocks */}
          <div className="flex items-center gap-6 md:gap-12 flex-grow justify-center flex-wrap">
            <TimeBlock value={time.days} label="DAYS" />
            <div className="text-2xl text-gray-700 hidden sm:block">|</div>
            <TimeBlock value={time.hours} label="HOURS" />
            <div className="text-2xl text-gray-700 hidden sm:block">|</div>
            <TimeBlock value={time.minutes} label="MINUTES" />
            <div className="text-2xl text-gray-700 hidden sm:block">|</div>
            <TimeBlock value={time.seconds} label="SECONDS" />
          </div>
        </div>
      </section>

      {/* ── MOBILE VIEW (INSPIRED BY SCREENSHOT) ── */}
      <section className="relative md:hidden -mt-[220px] sm:-mt-[260px] z-20 px-4 mb-10 pointer-events-none">
        <div
          ref={mobileRef}
          className="max-w-7xl mx-auto flex flex-col items-center justify-center pointer-events-auto p-5 sm:p-6 rounded-2xl bg-[#030514]/60 backdrop-blur-xl border border-white/5 shadow-[0_0_30px_rgba(0,240,255,0.05)]"
        >
          {/* Label (Top Centered) */}
          <div className="text-center mb-5 w-full">
            <h3
              className="font-heading font-black text-[11px] sm:text-[13px] tracking-[0.25em] sm:tracking-[0.3em] uppercase"
              style={{ color: '#00F0FF' }}
            >
              EVENT STARTS IN
            </h3>
          </div>

          {/* Timer blocks with colon separators */}
          <div className="flex items-start justify-center gap-2 sm:gap-3 w-full px-1 mb-6">
            <TimeBlock value={time.days} label="DAYS" isMobile />

            <div className="text-xl sm:text-2xl font-bold font-heading text-cyan-500/70 pt-2 sm:pt-3 animate-pulse">:</div>

            <TimeBlock value={time.hours} label="HOURS" isMobile />

            <div className="text-xl sm:text-2xl font-bold font-heading text-cyan-500/70 pt-2 sm:pt-3 animate-pulse">:</div>

            <TimeBlock value={time.minutes} label="MINUTES" isMobile />

            <div className="text-xl sm:text-2xl font-bold font-heading text-cyan-500/70 pt-2 sm:pt-3 animate-pulse">:</div>

            <TimeBlock value={time.seconds} label="SECONDS" isMobile />
          </div>

          {/* Date Container (Bottom Pill) */}
          <div className="w-full max-w-[280px] border border-white/10 bg-white/5 rounded-md py-3 px-4 text-center">
            <p className="font-heading font-bold text-[11px] sm:text-xs tracking-widest text-white/90">
              MAY 8TH, 9TH & 10TH, 2026
            </p>
          </div>
        </div>
      </section>
    </>
  );
}