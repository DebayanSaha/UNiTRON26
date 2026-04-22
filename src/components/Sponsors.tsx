import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Main Title Animation
    const titleEl = sectionRef.current?.querySelector('.sponsors-title-group');
    const loaderEl = sectionRef.current?.querySelector('.sponsors-loader');

    if (titleEl && loaderEl) {
      gsap.fromTo(
        [titleEl, loaderEl],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="sponsors" className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center min-h-[50vh]">

      {/* --- HEADER --- */}
      <div className="sponsors-title-group mb-16 text-center">
        <p
          className="font-nfs text-xs tracking-widest mb-3 uppercase"
          style={{ color: '#FF00A8' }}
        >
          OUR SPONSORS
        </p>
        <h2 className="font-nfs text-4xl md:text-5xl tracking-wide text-white">POWERING THE FUTURE</h2>
      </div>

      {/* --- COMING SOON LOADER --- */}
      <div className="sponsors-loader flex flex-col items-center">

        {/* Futuristic Spinner */}
        <div className="relative w-20 h-20 mb-8">
          <div className="absolute inset-0 border-[3px] border-t-[#00F0FF] border-r-transparent border-b-[#FF00A8] border-l-transparent rounded-full animate-spin duration-1000"></div>
          <div className="absolute inset-2 border-[3px] border-t-transparent border-r-[#FF00A8] border-b-transparent border-l-[#00F0FF] rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 md:w-80 h-[2px] bg-white/10 overflow-hidden mb-6 relative">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#00F0FF] to-[#FF00A8] animate-[loading-bar_2s_ease-in-out_infinite]" />
        </div>

        <p className="text-white/60 tracking-[0.4em] font-mono text-xs md:text-sm uppercase animate-pulse">
          Coming Soon...
        </p>

      </div>

      <style>{`
        @keyframes loading-bar {
          0% { left: -33%; }
          100% { left: 100%; }
        }
      `}</style>

    </section>
  );
}