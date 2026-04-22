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

function TimeBlock({ value, label }: { value: number; label: string }) {
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
    <div className="text-center">
      <div ref={numRef} className="text-4xl md:text-5xl font-heading font-bold tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-[10px] font-heading text-gray-500 tracking-widest mt-1">{label}</div>
    </div>
  );
}

export default function Countdown() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
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
  }, []);

  const arcPercent = Math.min(time.days / 30, 1);
  const arcAngle = arcPercent * 180;
  const r = 40;
  const cx = 50;
  const cy = 45;
  const startX = cx - r;
  const startY = cy;
  const radians = ((arcAngle - 180) * Math.PI) / 180;
  const endX = cx + r * Math.cos(radians);
  const endY = cy + r * Math.sin(radians);
  const largeArc = arcAngle > 180 ? 1 : 0;

  return (
    <section className="relative -mt-70 z-20 px-10 mb-10 pointer-events-none">
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
  );
}