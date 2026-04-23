import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const CLIP = 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))';
const INNER_CLIP = 'polygon(0 0, calc(100% - 12.5px) 0, 100% 12.5px, 100% 100%, 12.5px 100%, 0 calc(100% - 12.5px))';

const DOMAINS = [
  { id: 'tech', label: 'ROBOTICS', description: 'Robotics, hardware, and engineering battles', image: '/D1.jpeg', accent: '#00F0FF' },
  { id: 'gaming', label: 'GAMING', description: 'Esports, casual, and competitive gaming', image: '/D4.jpeg', accent: '#7FFF00' },
  { id: 'coding', label: 'CODING', description: 'Hackathons, algorithm design, and logic', image: '/D2.jpeg', accent: '#00FF99' },
  { id: 'non-tech', label: 'FUN', description: 'Debates, quizzes, and creative events', image: '/D3.jpeg', accent: '#FF00A8' },
];

function DomainCard({ domain, index, onClick }: { domain: typeof DOMAINS[0]; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const accent = domain.accent;

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 95%' },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative group overflow-hidden md:transform md:-skew-x-12 transition-all duration-700 ease-out shrink-0 w-full sm:w-[320px] md:w-[280px] lg:w-[300px] xl:w-[320px] h-[400px] md:h-[500px] lg:h-[550px] border-l border-r border-white/10 md:hover:z-20 cursor-pointer md:flex-1"
      style={{
        backgroundColor: '#05050f',
        boxShadow: `0 10px 30px -10px ${accent}30`,
      }}
      onClick={onClick}
    >
      {/* Container with counter-skew for desktop */}
      <div className="absolute inset-0 w-full h-full md:w-[130%] md:-left-[15%] md:transform md:skew-x-12 flex flex-col justify-end">

        {/* Image */}
        <div className="absolute inset-0 w-full h-full bg-[#0a0a1a]">
          <img
            src={domain.image}
            alt={domain.label}
            className="w-full h-full object-cover md:grayscale opacity-90 md:opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
            style={{ objectPosition: 'center top' }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
          />
        </div>

        {/* Diagonal Light Sweep effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none"
          style={{ background: `linear-gradient(105deg, transparent 20%, ${accent} 40%, transparent 60%)`, backgroundSize: '200% 100%', backgroundPosition: '100% 0' }} />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/80 transition-all duration-500" />

        {/* Text Details */}
        <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end items-start text-left h-full transform md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500">

          {/* Accent Line */}
          <div className="w-8 h-[2px] mb-3 transition-all duration-500 group-hover:w-16" style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }} />

          {/* Title */}
          <h4 className="text-3xl md:text-4xl lg:text-5xl font-nfs tracking-wider text-white uppercase drop-shadow-md mb-2" style={{ textShadow: `0 0 15px ${accent}40` }}>
            {domain.label}
          </h4>

          {/* Description */}
          <p className="font-rajdhani text-gray-300 md:text-gray-400 text-xs sm:text-sm md:text-xs lg:text-sm font-semibold tracking-wider uppercase leading-snug group-hover:text-white transition-colors duration-300 line-clamp-3">
            {domain.description}
          </p>

          {/* Explore Link */}
          <div className="mt-5 flex items-center gap-2 opacity-100 md:opacity-60 group-hover:opacity-100 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300 font-orbitron text-[10px] md:text-xs tracking-[0.15em] uppercase font-bold" style={{ color: accent }}>
            <span>Explore Events</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Events() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleDomainClick = (domainId: string) => {
    // navigate('/all-events', { state: { filter: domainId } });
    navigate('/coming-soon');
    window.scrollTo(0, 0); // scroll to top when navigating
  };

  return (
    <section id="events" ref={sectionRef} className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-[#03030a] overflow-hidden min-h-screen">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 0, 168, 0.03) 0%, transparent 60%)',
      }} />

      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-16 relative z-10">
        <h2 ref={titleRef} className="font-nfs text-5xl sm:text-6xl uppercase tracking-widest text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          EVENTS
        </h2>
        <div className="w-24 h-[3px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent mt-6 opacity-80 shadow-[0_0_15px_#00F0FF]" />
      </div>

      {/* Container for Domains layout */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-y-6 md:gap-x-4 lg:gap-x-6 max-w-[1600px] mx-auto relative z-10 px-4">
        {DOMAINS.map((domain, index) => (
          <DomainCard
            key={domain.id}
            domain={domain}
            index={index}
            onClick={() => handleDomainClick(domain.id)}
          />
        ))}
      </div>

    </section>
  );
}