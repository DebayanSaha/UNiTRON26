import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(row1Ref.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: row1Ref.current, start: 'top 85%' },
      });
      gsap.fromTo(row2Ref.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: row2Ref.current, start: 'top 85%' },
      });
      gsap.fromTo(row3Ref.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: row3Ref.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,400;0,700;0,900;1,700;1,900&family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@700;900&display=swap');

        .font-orbitron  { font-family: 'Orbitron', sans-serif; }
        .font-exo2      { font-family: 'Exo 2', sans-serif; }
        .font-rajdhani  { font-family: 'Rajdhani', sans-serif; }
      `}</style>

      <section id="about" ref={sectionRef} className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 overflow-hidden bg-[#03030a] min-h-screen">

        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            radial-gradient(circle at 15% 30%, rgba(0, 240, 255, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 85% 70%, rgba(255, 0, 168, 0.04) 0%, transparent 50%)
          `,
        }} />

        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        {/* Row 1: About UNiTRON */}
        <div ref={row1Ref} className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mb-28 md:mb-36">
          <h2 className="font-nfs text-5xl sm:text-6xl md:text-7xl uppercase tracking-widest text-white mb-4" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>
            ABOUT <br className="sm:hidden" /> UN<span className='font-orbitron font-bold lowercase italic inline-block scale-x-[1.18] -skew-x-10 relative top-[1px] mx-[-1px] opacity-95'>i</span><span className="text-[#FF00A8] drop-shadow-[0_0_15px_rgba(255,0,168,0.8)]">T</span>RON
          </h2>
          <p className="font-orbitron text-[#FF00A8] text-sm md:text-base tracking-[0.2em] uppercase mb-8 drop-shadow-[0_0_8px_rgba(255,0,168,0.6)]">
            Event Dates: 08 - 10 MAY 2K26
          </p>
          <p className="font-rajdhani text-gray-300 text-lg sm:text-xl leading-relaxed">
            Welcome to UNiTRON 2026– the fusion of innovation and progress! Founded with the goal of nurturing creativity and technological excellence, UNiTRON has grown into a hub of groundbreaking ideas and cutting-edge advancements.

            UNiTRON’26 is more than just an event— it’s a gathering of brilliant minds, a tribute to progress, and a showcase of
            technology’s transformative impact.
          </p>
        </div>

        {/* Row 2: HOST */}
        <div ref={row2Ref} className="relative z-10 mb-28 md:mb-36">
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-nfs text-4xl sm:text-5xl uppercase tracking-widest text-gray-300">HOST</h2>
            <div className="w-24 h-[3px] bg-gradient-to-r from-transparent via-[#FF00A8] to-transparent mt-4 shadow-[0_0_15px_#FF00A8]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Card 1: FIT */}
            <div className="relative group bg-[#0a0a1a] rounded-2xl overflow-hidden border border-white/5 hover:border-[#00F0FF]/40 transition-all duration-500" style={{ boxShadow: '0 10px 30px -10px rgba(0,240,255,0.05)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="p-8 sm:p-10 h-full flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center font-orbitron font-black text-[#00F0FF] text-2xl shrink-0 overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    <img src="/FE.png" alt="FIT Logo" className="w-full h-full object-contain p-2" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; e.currentTarget.parentElement!.innerHTML = 'FIT'; }} />
                  </div>
                  <h3 className="font-nfs text-2xl sm:text-3xl uppercase tracking-wider text-white">FUTURE INSTITUTE OF TECHNOLOGY</h3>
                </div>
                <p className="font-rajdhani text-gray-400 text-sm sm:text-base leading-relaxed uppercase tracking-wider flex-1 mb-8">
                  Future Institute of Technology (FIT) is a private engineering college located in Garia, Kolkata, West Bengal, India. Established in 2014 and approved by AICTE and affiliated to Maulana Abul Kalam Azad University of Technology (MAKAUT). The institute fosters a strong academic foundation supported by experienced faculty, modern infrastructure, and industry-oriented learning.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/school/futureinstitute-fit/about/" className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF] cursor-pointer transition-all">in</a>
                  <a href="https://www.facebook.com/share/189aSkJRRS/" className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF] cursor-pointer transition-all">fb</a>
                  <a href="https://futureeducation.in/fit/" className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF] cursor-pointer transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: Tic-Tech-Toe */}
            <div className="relative group bg-[#0a0a1a] rounded-2xl overflow-hidden border border-white/5 hover:border-[#FF00A8]/40 transition-all duration-500" style={{ boxShadow: '0 10px 30px -10px rgba(255,0,168,0.05)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF00A8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="p-8 sm:p-10 h-full flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-xl bg-[#0a0a1e] border border-[#FF00A8]/30 flex items-center justify-center shrink-0 overflow-hidden shadow-[0_0_15px_rgba(255,0,168,0.2)]">
                    <img src="/TTT.png" alt="TicTechToe Logo" className="w-full h-full object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="font-orbitron text-[#FF00A8] text-xl font-black">TTT</span>'; }} />
                  </div>
                  <h3 className="font-nfs text-2xl sm:text-3xl uppercase tracking-wider text-white">TIC-TECH-TOE</h3>
                </div>
                <p className="font-rajdhani text-gray-400 text-sm sm:text-base leading-relaxed uppercase tracking-wider flex-1 mb-8">
                  Tic-Tech-Toe is the official technical club of Future Institute of Technology, driving innovation through hands-on learning and competitive tech events. We focus on hackathons, coding challenges, and robotics competitions. Our flagship fest, UNiTRON, brings together developers, innovators, and creators for intense hackathons, tech battles, and problem-solving experiences.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/company/tic-tech-toe-technical-club/" className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#FF00A8] hover:border-[#FF00A8] cursor-pointer transition-all">in</a>
                  <a href="https://www.facebook.com/share/16VXCj8R97/" className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#FF00A8] hover:border-[#FF00A8] cursor-pointer transition-all">fb</a>
                  <a href="https://www.instagram.com/tictechtoe.fit?igsh=MTdrN3NtbjE1ZHpsMQ==" className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#FF00A8] hover:border-[#FF00A8] cursor-pointer transition-all">ig</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Stats */}
        <div ref={row3Ref} className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Stat 1 */}
          <div className="bg-[#0a0a1a] border border-[#FF00A8]/30 rounded-xl p-8 sm:p-10 flex flex-col items-center justify-center text-center group hover:border-[#FF00A8]/60 transition-colors duration-300">
            <div className="font-orbitron font-black text-4xl sm:text-5xl text-[#FF00A8] mb-3 group-hover:scale-110 transition-transform duration-300" style={{ textShadow: '0 0 20px rgba(255,0,168,0.6)' }}>
              7th
            </div>
            <p className="font-rajdhani text-gray-400 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold">EDITION</p>
          </div>
          {/* Stat 2 */}
          <div className="bg-[#0a0a1a] border border-[#FF00A8]/30 rounded-xl p-8 sm:p-10 flex flex-col items-center justify-center text-center group hover:border-[#FF00A8]/60 transition-colors duration-300">
            <div className="font-orbitron font-black text-4xl sm:text-5xl text-[#FF00A8] mb-3 group-hover:scale-110 transition-transform duration-300" style={{ textShadow: '0 0 20px rgba(255,0,168,0.6)' }}>
              2,000+
            </div>
            <p className="font-rajdhani text-gray-400 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold">ATTENDEES PER EDITION</p>
          </div>
          {/* Stat 3 */}
          <div className="bg-[#0a0a1a] border border-[#FF00A8]/30 rounded-xl p-8 sm:p-10 flex flex-col items-center justify-center text-center group hover:border-[#FF00A8]/60 transition-colors duration-300">
            <div className="font-orbitron font-black text-4xl sm:text-5xl text-[#FF00A8] mb-3 group-hover:scale-110 transition-transform duration-300" style={{ textShadow: '0 0 20px rgba(255,0,168,0.6)' }}>
              30+
            </div>
            <p className="font-rajdhani text-gray-400 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold">COLLEGES PARTICIPATED</p>
          </div>
          {/* Stat 4 */}
          <div className="bg-[#0a0a1a] border border-[#FF00A8]/30 rounded-xl p-8 sm:p-10 flex flex-col items-center justify-center text-center group hover:border-[#FF00A8]/60 transition-colors duration-300">
            <div className="font-orbitron font-black text-4xl sm:text-5xl text-[#FF00A8] mb-3 group-hover:scale-110 transition-transform duration-300" style={{ textShadow: '0 0 20px rgba(255,0,168,0.6)' }}>
              20+
            </div>
            <p className="font-rajdhani text-gray-400 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold">EVENTS & COMPETITIONS</p>
          </div>
        </div>

      </section>
    </>
  );
}