import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const navLinks = ['HOME', 'ABOUT', 'EVENTS', 'TEAM', 'SPONSORS', 'GALLERY', 'CONTACT'];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const isClickScrolling = useRef(false);
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    tl.fromTo(logoRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, '-=0.4');
    tl.fromTo(
      linksRef.current?.querySelectorAll('a') ?? [],
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
      '-=0.3'
    );
    tl.fromTo(btnRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 }, '-=0.2');
  }, []);

  // Sliding pill indicator (desktop only)
  useEffect(() => {
    const links = linksRef.current?.querySelectorAll('a');
    const indicator = indicatorRef.current;
    if (!links || !indicator) return;
    const activeLink = links[activeIndex] as HTMLElement;
    gsap.to(indicator, {
      x: activeLink.offsetLeft,
      width: activeLink.offsetWidth,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, [activeIndex]);

  // Mobile menu animation
  useEffect(() => {
    const el = mobileMenuRef.current;
    if (!el) return;
    if (menuOpen) {
      el.style.display = 'block';
      gsap.fromTo(
        el,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }
      );
      gsap.fromTo(
        el.querySelectorAll('.mobile-link'),
        { x: -16, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.25, stagger: 0.05, delay: 0.06, ease: 'power2.out' }
      );
    } else {
      gsap.to(el, {
        opacity: 0, y: -8, duration: 0.2, ease: 'power3.in',
        onComplete: () => { el.style.display = 'none'; },
      });
    }
  }, [menuOpen]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;
      // Check if we reached the bottom of the page
      if (window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 50) {
        for (let i = navLinks.length - 1; i >= 0; i--) {
          if (document.getElementById(navLinks[i].toLowerCase())) {
            setActiveIndex(i);
            return;
          }
        }
      }

      let newActiveIndex = 0;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const id = navLinks[i].toLowerCase();
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is scrolled past the top 40% of the screen
          if (rect.top <= window.innerHeight * 0.4) {
            newActiveIndex = i;
            break;
          }
        }
      }
      setActiveIndex(newActiveIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Dark backdrop behind dropdown, above hero */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav
        ref={navRef}
        className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[96%] max-w-7xl z-50"
      >
        {/* ── Main pill bar ── */}
        <div className="rounded-2xl lg:rounded-full backdrop-blur-xl bg-black/50 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.7)] relative overflow-hidden">
          {/* Glow strip */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, rgba(255,0,150,0.10), rgba(0,240,255,0.07))' }}
          />

          <div className="px-4 sm:px-6 relative">
            <div className="flex justify-between items-center h-14 sm:h-16">

              {/* Logo */}
              <img
                src="/logo.jpeg"
                alt="UNITRON 2K26"
                className="h-14 sm:h-18 object-contain"
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(255,0,168,0.6))'
                }}
              />

              {/* Desktop nav links */}
              <div ref={linksRef} className="hidden lg:block relative z-10">
                <div className="flex items-center text-[11px] xl:text-xs font-heading tracking-widest relative">
                  <div
                    ref={indicatorRef}
                    className="absolute top-0 left-0 h-full rounded-full bg-white/10 border border-white/15 pointer-events-none"
                    style={{ width: '0px' }}
                  />
                  {navLinks.map((link, i) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveIndex(i);
                        const targetId = link.toLowerCase();
                        const element = document.getElementById(targetId);
                        if (element) {
                          isClickScrolling.current = true;
                          element.scrollIntoView({ behavior: 'smooth' });
                          if (clickTimeout.current) clearTimeout(clickTimeout.current);
                          clickTimeout.current = setTimeout(() => {
                            isClickScrolling.current = false;
                          }, 1000);
                        }
                        window.history.pushState(null, '', `#${targetId}`);
                      }}
                      className={`relative z-10 px-3 xl:px-4 py-2 transition-colors duration-200 whitespace-nowrap ${activeIndex === i ? 'text-white' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right: CTA + hamburger */}
              <div className="flex items-center gap-2 sm:gap-3 z-10">
                <button
                  ref={btnRef}
                  className="hidden md:block rounded-full px-4 xl:px-5 py-2 text-xs font-heading font-bold text-white border border-pink-500 hover:bg-pink-500/20 transition whitespace-nowrap"
                >
                  REGISTER NOW
                </button>

                <button
                  className="lg:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition"
                  aria-label="Toggle menu"
                  onClick={() => setMenuOpen(prev => !prev)}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect
                      x="3" y="6" width="16" height="1.5" rx="0.75" fill="white"
                      style={{
                        transformOrigin: '11px 6.75px',
                        transform: menuOpen ? 'rotate(45deg) translateY(4.25px)' : 'none',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                    <rect
                      x="3" y="10.25" width="16" height="1.5" rx="0.75" fill="white"
                      style={{
                        opacity: menuOpen ? 0 : 1,
                        transition: 'opacity 0.2s ease',
                      }}
                    />
                    <rect
                      x="3" y="14.5" width="16" height="1.5" rx="0.75" fill="white"
                      style={{
                        transformOrigin: '11px 15.25px',
                        transform: menuOpen ? 'rotate(-45deg) translateY(-4.25px)' : 'none',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile dropdown — detached below the bar ── */}
        <div
          ref={mobileMenuRef}
          className="lg:hidden mt-2 rounded-2xl backdrop-blur-2xl bg-black/85 border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.85)]"
          style={{ display: 'none' }}
        >
          {/* Glow tint */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(255,0,150,0.07), rgba(0,240,255,0.05))' }}
          />

          <div className="relative flex flex-col p-3 gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(i);
                  setMenuOpen(false);
                  const targetId = link.toLowerCase();
                  const element = document.getElementById(targetId);
                  if (element) {
                    isClickScrolling.current = true;
                    element.scrollIntoView({ behavior: 'smooth' });
                    if (clickTimeout.current) clearTimeout(clickTimeout.current);
                    clickTimeout.current = setTimeout(() => {
                      isClickScrolling.current = false;
                    }, 1000);
                  }
                  window.history.pushState(null, '', `#${targetId}`);
                }}
                className={`mobile-link font-heading text-sm tracking-widest px-4 py-3 rounded-xl transition-all duration-150 flex items-center justify-between ${activeIndex === i
                  ? 'text-white bg-white/10 border border-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
              >
                <span>{link}</span>
                {activeIndex === i && (
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FF00A8' }} />
                )}
              </a>
            ))}

            <div className="mt-2 pt-3 border-t border-white/10">
              <button
                className="mobile-link w-full rounded-full py-3 text-sm font-heading font-bold text-white transition-opacity hover:opacity-90"
                style={{
                  background: 'linear-gradient(90deg, #FF00A8, #cc0088)',
                  boxShadow: '0 0 24px rgba(255,0,168,0.4)',
                }}
                onClick={() => setMenuOpen(false)}
              >
                REGISTER NOW →
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}