import React, { useRef, useLayoutEffect, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Lightbox Component ────────────────────────────────────────────────────────
interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  // Track drag/swipe offset for live feedback
  const [dragX, setDragX] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const handlePrev = useCallback(() => {
    setCurrentIndex(i => Math.max(0, i - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(i => Math.min(images.length - 1, i + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handlePrev, handleNext, onClose]);

  // ── Touch handlers ──────────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
    setDragX(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || touchStartX.current === null) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    // Resist at edges so it feels bounded
    const atStart = currentIndex === 0 && delta > 0;
    const atEnd = currentIndex === images.length - 1 && delta < 0;
    setDragX(atStart || atEnd ? delta * 0.25 : delta);
  };

  const onTouchEnd = () => {
    const SWIPE_THRESHOLD = 50; // px needed to trigger navigation
    if (dragX < -SWIPE_THRESHOLD) handleNext();
    else if (dragX > SWIPE_THRESHOLD) handlePrev();
    setDragX(0);
    isDragging.current = false;
    touchStartX.current = null;
  };

  // ── Mouse drag handlers (desktop bonus) ────────────────────────────────────
  const mouseStartX = useRef<number | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isDragging.current = true;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || mouseStartX.current === null) return;
    const delta = e.clientX - mouseStartX.current;
    const atStart = currentIndex === 0 && delta > 0;
    const atEnd = currentIndex === images.length - 1 && delta < 0;
    setDragX(atStart || atEnd ? delta * 0.25 : delta);
  };

  const onMouseUp = () => {
    const SWIPE_THRESHOLD = 80;
    if (dragX < -SWIPE_THRESHOLD) handleNext();
    else if (dragX > SWIPE_THRESHOLD) handlePrev();
    setDragX(0);
    isDragging.current = false;
    mouseStartX.current = null;
  };

  const isAnimating = dragX !== 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 text-white/70 hover:text-cyan-400 transition-colors bg-black/50 rounded-full"
        aria-label="Close"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Desktop arrow buttons */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-8 z-50 p-4 text-white hover:text-cyan-400 bg-black/40 hover:bg-black/80 rounded-full transition-all"
          aria-label="Previous"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-8 z-50 p-4 text-white hover:text-cyan-400 bg-black/40 hover:bg-black/80 rounded-full transition-all"
          aria-label="Next"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Swipeable image area */}
      <div
        className="w-full h-full flex items-center justify-center p-4 touch-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
      >
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`View ${currentIndex + 1} of ${images.length}`}
          className="max-w-full max-h-[90vh] object-contain pointer-events-none"
          style={{
            transform: `translateX(${dragX}px)`,
            // Snap back smoothly when releasing; track finger live while dragging
            transition: isAnimating ? 'none' : 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform',
          }}
          draggable={false}
        />
      </div>

      {/* Mobile swipe hint — only shown on first open */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 md:hidden flex items-center gap-2 text-white/30 text-xs pointer-events-none">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>swipe</span>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-cyan-400 w-4' : 'bg-white/40 w-2'}`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Auto-Scrolling Carousel Component ────────────────────────────────────────
interface AutoCarouselProps {
  images: string[];
  onImageClick: (images: string[], index: number) => void;
  // FIX 4: Allow reversing direction for visual variety
  reverse?: boolean;
}

function AutoCarousel({ images, onImageClick, reverse = false }: AutoCarouselProps) {
  // FIX 5: More frames = smoother. Use a generous base multiplier.
  const duration = Math.max(images.length * 5, 30);

  return (
    <div className="relative overflow-hidden w-full">
      {/* Edge gradients */}
      <div className="absolute inset-y-0 left-0 w-8 md:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 md:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/*
        FIX 6: The marquee track uses translateX(-50%) to loop.
        - `will-change: transform` is on the track itself (not children), promoting the entire strip to its own GPU layer.
        - `transform: translateZ(0)` forces GPU compositing from the start, preventing the browser from deciding mid-animation.
        - `backface-visibility: hidden` prevents occasional flickering on Chrome.
        - Removed `group` hover state on the outer wrapper — it caused the parent to repaint.
      */}
      <div
        className="flex w-max"
        style={{
          animation: `${reverse ? 'infiniteScrollReverse' : 'infiniteScroll'} ${duration}s linear infinite`,
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Set 1 + Set 2 rendered together — avoids a nested flex wrapper causing extra layout pass */}
        {[...images, ...images].map((img, idx) => (
          <div
            key={idx}
            onClick={() => onImageClick(images, idx % images.length)}
            style={{
              flexShrink: 0,
            }}
            className="w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] h-[250px] md:h-[350px] mr-4 md:mr-6 cursor-pointer relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg carousel-card"
          >
            {/*
              FIX 8: Images get explicit width/height via CSS (not HTML attrs since we're responsive),
              but `object-cover` + `width: 100%; height: 100%` tells the browser the final size upfront.
              FIX 9: Remove loading="lazy" from carousel images — they're visible immediately
              and lazy loading causes pop-in which looks like lag.
            */}
            <img
              src={img}
              alt=""
              aria-hidden="true"
              width={400}
              height={350}
              className="w-full h-full object-cover carousel-img"
              style={{ display: 'block' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Gallery Component ────────────────────────────────────────────────────
export default function GlimpsesOfPast() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxData, setLightboxData] = useState<{ images: string[]; initialIndex: number } | null>(null);

  const yearlyGalleries = [
    {
      year: 'UNiTRON 25',
      description: '6th Edition | Theme: Spiderverse',
      images: [
        '/m25/m251.webp', '/m25/m252.webp', '/m25/m253.webp', '/m25/m254.webp',
        '/m25/m255.webp', '/m25/m256.webp', '/m25/m257.webp', '/m25/m258.webp',
        '/m25/m259.webp', '/m25/m2510.webp', '/m25/m2511.webp', '/m25/m2512.webp',
        '/m25/m2513.webp', '/m25/m2514.webp', '/m25/m2515.webp', '/m25/m2516.webp',
        '/m25/m2517.webp', '/m25/m2518.webp', '/m25/m2519.webp', '/m25/m2520.webp',
        '/m25/m2521.webp', '/m25/m2522.webp', '/m25/m2523.webp', '/m25/m2524.webp',
        '/m25/m2525.webp', '/m25/m2526.webp', '/m25/m2527.webp', '/m25/m2528.webp',
        '/m25/m2529.webp', '/m25/m2530.webp', '/m25/m2531.webp', '/m25/m2532.webp',
        '/m25/m2533.webp', '/m25/m2534.webp', '/m25/m2535.webp', '/m25/m2536.webp',
        '/m25/m2537.webp', '/m25/m2538.webp', '/m25/m2539.webp', '/m25/m2540.webp'
      ],
    },
    {
      year: 'UNiTRON 24',
      description: '5th Edition | Theme:Cyberpunk',
      images: [
        '/m24/m241.webp', '/m24/m242.webp', '/m24/m243.webp', '/m24/m244.webp',
        '/m24/m245.webp', '/m24/m246.webp', '/m24/m247.webp', '/m24/m248.webp',
        '/m24/m249.webp', '/m24/m2410.webp', '/m24/m2411.webp', '/m24/m2412.webp',
        '/m24/m2413.webp', '/m24/m2414.webp', '/m24/m2415.webp', '/m24/m2416.webp',
        '/m24/m2417.webp', '/m24/m2418.webp', '/m24/m2419.webp', '/m24/m2420.webp',
        '/m24/m2421.webp', '/m24/m2422.webp', '/m24/m2423.webp', '/m24/m2424.webp',
        '/m24/m2425.webp', '/m24/m2426.webp', '/m24/m2427.webp', '/m24/m2428.webp',
        '/m24/m2429.webp'
      ],
    },
    {
      year: 'UNiTRON 23',
      description: '4th Edition',
      images: [
        '/m23/m231.webp', '/m23/m232.webp', '/m23/m233.webp', '/m23/m234.webp',
        '/m23/m235.webp', '/m23/m236.webp', '/m23/m237.webp', '/m23/m238.webp',
        '/m23/m239.webp', '/m23/m2310.webp', '/m23/m2311.webp', '/m23/m2312.webp',
        '/m23/m2313.webp', '/m23/m2314.webp', '/m23/m2315.webp', '/m23/m2316.webp',
        '/m23/m2317.webp', '/m23/m2318.webp', '/m23/m2319.webp', '/m23/m2320.webp',
        '/m23/m2321.webp', '/m23/m2322.webp', '/m23/m2323.webp', '/m23/m2324.webp',
        '/m23/m2325.webp', '/m23/m2326.webp', '/m23/m2327.webp', '/m23/m2328.webp',
        '/m23/m2329.webp', '/m23/m2330.webp', '/m23/m2331.webp', '/m23/m2332.webp',
        '/m23/m2333.webp', '/m23/m2334.webp'
      ],
    },
    {
      year: 'UNiTRON 22',
      description: '3rd Edition',
      images: [
        '/Arc/arc1.webp', '/Arc/arc2.webp', '/Arc/arc3.webp', '/Arc/arc4.webp',
        '/Arc/arc5.webp', '/Arc/arc6.webp', '/Arc/arc7.webp', '/Arc/arc8.webp',
        '/Arc/arc9.webp', '/Arc/arc10.webp', '/Arc/arc11.webp', '/Arc/arc12.webp',
        '/Arc/arc13.webp', '/Arc/arc14.webp', '/Arc/arc15.webp', '/Arc/arc16.webp',
        '/Arc/arc17.webp', '/Arc/arc18.webp', '/Arc/arc19.webp', '/Arc/arc20.webp',
        '/Arc/arc21.webp', '/Arc/arc22.webp', '/Arc/arc23.webp', '/Arc/arc24.webp',
        '/Arc/arc25.webp', '/Arc/arc26.webp', '/Arc/arc27.webp', '/Arc/arc28.webp',
        '/Arc/arc29.webp', '/Arc/arc30.webp', '/Arc/arc31.webp', '/Arc/arc32.webp'
      ],
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.year-section');
      sections.forEach((section) => {
        // FIX 10: Use `fromTo` with `immediateRender: false` so GSAP doesn't
        // try to set initial state before the element is painted.
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              // FIX 11: `once: true` — don't re-run the animation on scroll back up.
              // Eliminates redundant ScrollTrigger checks on every scroll tick.
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = useCallback((images: string[], index: number) => {
    setLightboxData({ images, initialIndex: index });
  }, []);

  const closeLightbox = useCallback(() => setLightboxData(null), []);

  return (
    <div id="gallery" ref={containerRef} className="py-20 relative w-full bg-black text-white overflow-hidden">
      <div className="max-w-[1800px] w-full mx-auto mb-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">

        {/* HEADER */}
        <div className="mb-12 pl-2 lg:pl-0 text-center md:text-left">
          <div className="text-xs text-white/40 tracking-[0.4em] mb-2 uppercase font-mono">My NFS System</div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-white font-black uppercase tracking-tight leading-none mb-4">
            Glimpses of <span className="neon-text-cyan">Past</span>
          </h2>
          <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
            <span className="text-gray-500 text-xs tracking-[0.35em] uppercase font-mono">
              {yearlyGalleries.reduce((total, year) => total + year.images.length, 0)} captures
            </span>
            <div className="h-px w-[120px] bg-gradient-to-r from-[#FF00A8]/70 to-transparent" />
          </div>
        </div>

        {/* YEARLY GALLERIES */}
        {/*
          FIX 12: Remove `translate-y-8` utility class from initial state.
          That class creates a stacking context and can cause repaints.
          GSAP's `fromTo` handles both the start AND end state cleanly.
          The element renders at its natural position, then GSAP sets opacity:0/y:40
          just before the scroll trigger fires (immediateRender:false handles this).
          We use `opacity-0` only so the element is invisible before GSAP kicks in.
        */}
        <div className="flex flex-col gap-16 md:gap-24">
          {yearlyGalleries.map((gallery, index) => (
            <div key={`year-${index}`} className="year-section w-full opacity-0">
              <div className="mb-8 flex flex-col items-center text-center">
                {/* Added a small accent line above the title since we removed the left border */}

                <h3 className="font-rajdhani italic text-3xl md:text-4xl font-bold tracking-wider mb-3">
                  {gallery.year}
                </h3>

                {/* mx-auto centers the max-w container itself */}
                <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto px-4">
                  {gallery.description}
                </p>
              </div>

              <div style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: '100vw' }}>
                <AutoCarousel
                  images={gallery.images}
                  onImageClick={openLightbox}
                  reverse={index % 2 === 1}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxData && (
        <Lightbox
          images={lightboxData.images}
          initialIndex={lightboxData.initialIndex}
          onClose={closeLightbox}
        />
      )}

      <style>{`
        /* Hide scrollbar */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes infiniteScroll {
          from { transform: translateX(0) translateZ(0); }
          to   { transform: translateX(-50%) translateZ(0); }
        }

        @keyframes infiniteScrollReverse {
          from { transform: translateX(-50%) translateZ(0); }
          to   { transform: translateX(0) translateZ(0); }
        }

        /*
          Hover scale is done via CSS on .carousel-img, NOT on the card wrapper.
          Scaling the wrapper triggers a stacking context change and can cause siblings to repaint.
        */
        .carousel-card {
          /* Ensure overflow hidden works correctly during scale */
          isolation: isolate;
        }

        .carousel-card:hover .carousel-img {
          transform: scale(1.05);
        }

        .carousel-img {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Dark overlay on hover — opacity only, GPU composited */
        .carousel-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          transition: background 0.3s ease;
          pointer-events: none;
        }

        .carousel-card:hover::after {
          background: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}