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
      <div className="sponsors-loader flex flex-col items-center justify-center mt-8">
        
        {/* Professional Circular Loader */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Subtle background ring */}
          <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
          
          {/* Spinning sleek single-color ring */}
          <div 
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#00F0FF] border-l-[#00F0FF] animate-spin shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            style={{ animationDuration: '1.5s' }}
          ></div>

          {/* Inner pulsating glow */}
          <div className="absolute inset-4 rounded-full bg-[#00F0FF]/5 animate-pulse"></div>
          
          {/* Text inside the circle */}
          <div className="flex flex-col items-center justify-center text-center z-10">
            <span className="font-nfs text-xs text-white/80 tracking-widest uppercase animate-pulse leading-tight">
              Coming
            </span>
            <span className="font-nfs text-xs text-[#00F0FF] tracking-widest uppercase animate-pulse leading-tight">
              Soon
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}