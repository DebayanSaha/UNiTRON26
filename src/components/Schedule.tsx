import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const days = ['DAY 1', 'DAY 2', 'DAY 3'];

const schedule: Record<string, { time: string; title: string; location: string; color: string }[]> = {
  'DAY 1': [
    { time: '09:00 AM', title: 'Inauguration Ceremony', location: 'Main Auditorium', color: '#FF00A8' },
    { time: '10:30 AM', title: 'Code & Debug — Round 1', location: 'CS Lab 1 & 2', color: '#00F0FF' },
    { time: '12:00 PM', title: 'Robowar — Qualifier Bouts', location: 'Open Arena', color: '#FF00A8' },
    { time: '02:00 PM', title: 'Valorant — Group Stage', location: 'E-Sports Zone', color: '#00F0FF' },
    { time: '04:00 PM', title: 'Technical Talk — AI & ML', location: 'Seminar Hall', color: '#FF00A8' },
    { time: '06:00 PM', title: 'Cultural Night & DJ', location: 'Main Ground', color: '#00F0FF' },
  ],
  'DAY 2': [
    { time: '09:00 AM', title: 'Code & Debug — Finals', location: 'CS Lab 1', color: '#00F0FF' },
    { time: '10:30 AM', title: 'Race — Track Events', location: 'Race Track', color: '#FF00A8' },
    { time: '12:00 PM', title: 'Robowar — Semi Finals', location: 'Open Arena', color: '#00F0FF' },
    { time: '02:00 PM', title: 'Soccer — Finals', location: 'Sports Ground', color: '#FF00A8' },
    { time: '04:00 PM', title: 'Valorant — Grand Finals', location: 'E-Sports Zone', color: '#00F0FF' },
    { time: '06:00 PM', title: 'Prize Distribution & Closing', location: 'Main Auditorium', color: '#FF00A8' },
  ],
  'DAY 3': [
    { time: '09:00 AM', title: 'Code & Debug — Finals', location: 'CS Lab 1', color: '#00F0FF' },
    { time: '10:30 AM', title: 'Race — Track Events', location: 'Race Track', color: '#FF00A8' },
    { time: '12:00 PM', title: 'Robowar — Semi Finals', location: 'Open Arena', color: '#00F0FF' },
    { time: '02:00 PM', title: 'Soccer — Finals', location: 'Sports Ground', color: '#FF00A8' },
    { time: '04:00 PM', title: 'Valorant — Grand Finals', location: 'E-Sports Zone', color: '#00F0FF' },
    { time: '06:00 PM', title: 'Prize Distribution & Closing', location: 'Main Auditorium', color: '#FF00A8' },
  ],
};

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeDay, setActiveDay] = useState('DAY 1');

  useEffect(() => {
    const titleEl = sectionRef.current?.querySelector('.schedule-title');
    if (titleEl) {
      gsap.fromTo(
        titleEl,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      );
    }
  }, []);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll('.schedule-item') ?? [];
    gsap.fromTo(
      items,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.07,
        ease: 'power2.out',
      }
    );
  }, [activeDay]);

  return (
    <section ref={sectionRef} id="schedule" className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-12">
        <p className="schedule-title font-heading text-xs tracking-widest mb-2 uppercase" style={{ color: '#00F0FF' }}>
          PLAN YOUR DAY
        </p>
        <h2 className="schedule-title font-nfs text-5xl tracking-wide uppercase">SCHEDULE</h2>
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-10 flex-wrap">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`font-heading text-sm px-8 py-3 rounded-md tracking-widest transition-all duration-300 ${activeDay === day
              ? 'text-white'
              : 'text-gray-400 glass-panel hover:text-white'
              }`}
            style={
              activeDay === day
                ? { backgroundColor: '#FF00A8', boxShadow: '0 0 20px rgba(255,0,168,0.4)' }
                : {}
            }
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Items */}
      <div ref={listRef} className="space-y-4">
        {schedule[activeDay].map((item, i) => (
          <div
            key={i}
            className="schedule-item glass-panel rounded-lg px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 group hover:border-[#FF00A8]/30 transition-all duration-300"
          >
            {/* Time */}
            <div className="flex-shrink-0 w-28">
              <span className="font-heading text-xs tracking-widest" style={{ color: item.color }}>
                {item.time}
              </span>
            </div>

            {/* Divider dot */}
            <div
              className="hidden sm:block w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
            />

            {/* Event info */}
            <div className="flex-1">
              <h4 className="font-heading font-bold text-sm tracking-wide">{item.title}</h4>
              <p className="text-gray-500 text-xs font-heading mt-0.5">{item.location}</p>
            </div>

            {/* Arrow */}
            <div
              className="text-gray-700 group-hover:translate-x-1 transition-transform font-heading text-xs"
              style={{ color: item.color }}
            >
              →
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
