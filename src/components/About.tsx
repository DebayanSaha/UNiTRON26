import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── static data ─────────────────────────────────────────── */

const features = [
  {
    color: '#FF00A8',
    bg: 'rgba(255,0,168,0.08)',
    border: 'rgba(255,0,168,0.25)',
    label: 'National Level Platform',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    color: '#00F0FF',
    bg: 'rgba(0,240,255,0.08)',
    border: 'rgba(0,240,255,0.25)',
    label: 'Exciting Events & Competitions',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4v3H3V7z" />
      </svg>
    ),
  },
  {
    color: '#FF00A8',
    bg: 'rgba(255,0,168,0.08)',
    border: 'rgba(255,0,168,0.25)',
    label: 'Amazing Prizes & Recognition',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
];

const clubStats = [
  { value: '500+', label: 'Active Members' },
  { value: '8+', label: 'Years of Legacy' },
  { value: '30+', label: 'Annual Events' },
  { value: '12+', label: 'Partner Colleges' },
];

/* ─── photo tile (shared style with video tile) ────────────── */

function PhotoTile({ src, label, accent }: { src: string; label: string; accent: string }) {
  return (
    <>
      <img
        src={src}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accent}1a 0%, transparent 60%)` }} />
      {/* placeholder icon shown when image is missing */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pointer-events-none">
        <svg className="w-5 h-5 opacity-15" fill="none" stroke={accent} strokeWidth={1.5} viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <span className="font-rajdhani text-[7px] uppercase tracking-widest opacity-25" style={{ color: accent }}>
          {label}
        </span>
      </div>
    </>
  );
}

/* ─── main component ───────────────────────────────────────── */

export default function About() {
  /* gsap refs */
  const sectionRef = useRef<HTMLElement>(null);
  const colMidRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  /* video state */
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  const togglePlay = () => {
    const v = videoRef.current; if (!v) return;
    if (v.paused) { v.play(); setIsPlaying(true); }
    else { v.pause(); setIsPlaying(false); }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current; if (!v) return;
    setCurrentTime(v.currentTime);
    setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current; if (!v) return;
    const val = Number(e.target.value);
    v.currentTime = (val / 100) * v.duration;
    setProgress(val);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current; if (!v) return;
    const val = Number(e.target.value);
    v.volume = val; v.muted = val === 0;
    setVolume(val); setIsMuted(val === 0);
  };

  const toggleMute = () => {
    const v = videoRef.current; if (!v) return;
    if (isMuted) { v.muted = false; v.volume = volume || 0.5; setIsMuted(false); setVolume(v.volume); }
    else { v.muted = true; setIsMuted(true); }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else videoRef.current?.requestFullscreen();
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    if (isPlaying) controlsTimerRef.current = setTimeout(() => setShowControls(false), 2500);
  };

  /* GSAP */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(colMidRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: colMidRef.current, start: 'top 80%' },
      });
      gsap.fromTo(colRightRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: colRightRef.current, start: 'top 80%' },
      });
      gsap.fromTo(mosaicRef.current, { x: 60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: mosaicRef.current, start: 'top 80%' },
      });

      const pills = colMidRef.current?.querySelectorAll('.feature-pill') ?? [];
      gsap.fromTo(pills, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: colMidRef.current, start: 'top 75%' },
      });

      const statItems = statsRef.current?.querySelectorAll('.stat-item') ?? [];
      gsap.fromTo(statItems, { scale: 0.85, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* shared tile style — every cell in the mosaic uses this */
  const tileBase: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
  };

  /* ── JSX ──────────────────────────────────────────────────── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,400;0,700;0,900;1,700;1,900&family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@700;900&display=swap');

        .font-orbitron  { font-family: 'Orbitron', sans-serif; }
        .font-exo2      { font-family: 'Exo 2', sans-serif; }
        .font-rajdhani  { font-family: 'Rajdhani', sans-serif; }

        /* gradient-border card */
        .club-card-glow { position: relative; }
        .club-card-glow::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 14px; padding: 1px;
          background: linear-gradient(135deg, #FF00A8, #00F0FF, #FF00A8);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .stat-value-glow { text-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }

        /*
          Mosaic grid — 2 columns, 4 rows:

            [ video  ] [ photo-a ]   row 1  \
            [ video  ] [ photo-b ]   row 2   > video spans rows 1-3
            [ video  ] [ photo-c ]   row 3  /
            [ photo-d (wide)     ]   row 4

          All row heights are fluid via clamp so the mosaic
          scales naturally from mobile → desktop.
        */
        .mosaic-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-template-rows:
            clamp(72px, 9vw, 130px)
            clamp(60px, 7.5vw, 108px)
            clamp(60px, 7.5vw, 108px)
            clamp(68px, 8.5vw, 120px);
          gap: 5px;
        }
        /* video spans rows 1–3, column 1 */
        .mosaic-video {
          grid-column: 1;
          grid-row: 1 / 4;
        }
        /* wide photo spans both columns on row 4 */
        .mosaic-wide {
          grid-column: 1 / -1;
          grid-row: 4;
        }

        /* feature pill */
        .feature-pill {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; border-radius: 8px;
        }

        /* video range inputs */
        .vid-range {
          -webkit-appearance: none; appearance: none;
          height: 3px; border-radius: 2px;
          background: rgba(255,255,255,0.2);
          cursor: pointer; outline: none; width: 100%;
        }
        .vid-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 10px; height: 10px; border-radius: 50%;
          background: #FF00A8; box-shadow: 0 0 5px rgba(255,0,168,0.8);
          cursor: pointer;
        }
        .vid-range::-moz-range-thumb {
          width: 10px; height: 10px; border-radius: 50%;
          background: #FF00A8; border: none; cursor: pointer;
        }
        .vol-range {
          -webkit-appearance: none; appearance: none;
          height: 2px; border-radius: 2px; width: 44px;
          background: rgba(255,255,255,0.2);
          cursor: pointer; outline: none;
        }
        .vol-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 8px; height: 8px; border-radius: 50%;
          background: #00F0FF; cursor: pointer;
        }
        .vol-range::-moz-range-thumb {
          width: 8px; height: 8px; border-radius: 50%;
          background: #00F0FF; border: none; cursor: pointer;
        }

        /* hover: video tile glows same as a photo tile */
        .mosaic-video-tile:hover {
          border-color: rgba(255,0,168,0.35) !important;
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden"
      >
        {/* bg grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,240,255,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,240,255,0.6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* orbs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,0,168,0.1) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        {/* ── Section Header ── */}
        <div className="relative text-center mb-12 sm:mb-20 z-10">
          <p className="font-rajdhani text-xs tracking-[0.35em] uppercase mb-3" style={{ color: '#00F0FF' }}>
            — About —
          </p>
          <h2 className="font-nfs text-3xl sm:text-4xl lg:text-6xl font-black leading-tight">
            WHO{' '}
            <span className="relative inline-block" style={{ color: '#FF00A8' }}>
              ARE WE
              <span className="absolute -bottom-1 left-0 w-full h-[2px]"
                style={{ background: 'linear-gradient(90deg, #FF00A8, #00F0FF)' }} />
            </span>
          </h2>
        </div>

        {/* ── Main 3-col grid ── */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-start">

          {/* ── COL 1: About UNiTRON ── */}
          <div ref={colMidRef} className="flex flex-col">
            <p className="font-rajdhani text-[10px] tracking-widest uppercase mb-4" style={{ color: '#00F0FF' }}>
              ABOUT UNiTRON 2K26
            </p>
            <h3 className="font-orbitron text-xl sm:text-2xl lg:text-[1.55rem] font-black italic leading-tight mb-5">
              UNITING INNOVATORS,
              <br />
              <span style={{ color: '#FF00A8' }}>IGNITING THE FUTURE.</span>
            </h3>
            <p className="font-rajdhani text-gray-400 text-sm sm:text-base lg:text-[0.95rem] leading-relaxed mb-4">
              UNiTRON is the annual technical and gaming symposium hosted by Club Tic Tech Toe. It serves as a
              high-octane convergence point for visionary developers, creative designers, hardware enthusiasts,
              and elite esports athletes.
            </p>
            <p className="font-rajdhani text-gray-400 text-sm sm:text-base lg:text-[0.95rem] leading-relaxed mb-8">
              Step into the arena where innovation meets intense competition. Through strategic coding battles,
              robotics clashes, and adrenaline-pumping gaming tournaments, UNiTRON is the ultimate proving
              ground for the next generation of tech leaders.
            </p>

            {/* Feature pills */}
            <div className="flex flex-col gap-3">
              {features.map((f) => (
                <div key={f.label} className="feature-pill"
                  style={{ background: f.bg, border: `1px solid ${f.border}`, color: f.color }}>
                  <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: f.bg, color: f.color }}>
                    {f.icon}
                  </div>
                  <span className="font-rajdhani text-xs font-bold uppercase tracking-wider">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── COL 2: About the Club ── */}
          <div ref={colRightRef} className="flex flex-col">
            <p className="font-rajdhani text-[10px] tracking-widest uppercase mb-4 lg:text-right" style={{ color: '#00F0FF' }}>
              About the Club
            </p>
            <h3 className="font-orbitron text-xl sm:text-2xl lg:text-[1.55rem] font-black italic leading-tight mb-5 lg:text-right">
              TIC-TECH-TOE
              <br />
              <span style={{ color: '#00F0FF' }}>BUILD. HACK. INNOVATE.</span>
            </h3>

            {/* Club card */}
            <div className="club-card-glow rounded-2xl p-5 sm:p-6 mb-5"
              style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(12px)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-[3px] h-7 rounded-full flex-shrink-0"
                  style={{ background: 'linear-gradient(180deg, #FF00A8, #00F0FF)' }} />
                <h4 className="font-exo2 text-sm sm:text-base font-bold tracking-wide">The Technology Club</h4>
              </div>
              <p className="font-rajdhani text-gray-400 text-sm leading-relaxed mb-3">
                Tic-Tech-Toe is the official technical club of Future Institute of Technology, driving innovation
                through hands-on learning and competitive tech events. Focused on hackathons, coding challenges,
                and robotics.
              </p>
              <p className="font-rajdhani text-gray-400 text-sm leading-relaxed mb-4">
                Founded in 2018 with a simple mission: learn by building. Our flagship fest UNiTRON brings
                developers, innovators, and creators together for intense tech battles and problem-solving
                experiences.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Hackathons', 'Workshops', 'Robotics', 'AI/ML', 'Web Dev', 'IoT', 'Design'].map((tag) => (
                  <span key={tag} className="font-rajdhani text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{ border: '1px solid rgba(0,240,255,0.3)', color: '#00F0FF', background: 'rgba(0,240,255,0.06)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-3 mb-4">
              {clubStats.map((s, i) => (
                <div key={s.label} className="stat-item text-center rounded-xl py-4 sm:py-5 px-2"
                  style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${i % 2 === 0 ? 'rgba(255,0,168,0.2)' : 'rgba(0,240,255,0.2)'}` }}>
                  <p className="font-orbitron text-xl sm:text-2xl font-black mb-1 stat-value-glow"
                    style={{ color: i % 2 === 0 ? '#FF00A8' : '#00F0FF' }}>
                    {s.value}
                  </p>
                  <p className="font-rajdhani text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Accent words */}
            <div className="grid grid-cols-3 gap-2">
              {['INNOVATE', 'CREATE', 'COMPETE'].map((word, i) => (
                <div key={word}
                  className="font-orbitron text-[8px] sm:text-[9px] font-black tracking-[0.2em] text-center py-2.5 rounded-lg"
                  style={{
                    color: i % 2 === 0 ? '#FF00A8' : '#00F0FF',
                    border: `1px solid ${i % 2 === 0 ? 'rgba(255,0,168,0.2)' : 'rgba(0,240,255,0.2)'}`,
                    background: i % 2 === 0 ? 'rgba(255,0,168,0.05)' : 'rgba(0,240,255,0.05)',
                  }}>
                  {word}
                </div>
              ))}
            </div>
          </div>

          {/* ── COL 3: Unified Mosaic (video + photos as one panel) ── */}
          <div ref={mosaicRef} className="relative md:col-span-2 lg:col-span-1">

            {/* UNiTRON badge — sits over the whole mosaic */}
            <div className="absolute top-2 left-2 z-30 font-orbitron text-[8px] font-black tracking-[0.2em] uppercase px-2 py-[3px] rounded"
              style={{ background: '#FF00A8', boxShadow: '0 0 10px rgba(255,0,168,0.7)', zIndex: 30 }}>
              UNiTRON
            </div>

            <div className="mosaic-grid">

              {/* ── VIDEO TILE (col 1, rows 1-3) ── */}
              <div
                className="mosaic-video mosaic-video-tile transition-colors duration-300"
                style={{ ...tileBase, cursor: isPlaying && !showControls ? 'none' : 'default' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { if (isPlaying) setShowControls(false); }}
              >
                {/* video element */}
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/teaser.webm"
                  loop playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={() => { if (videoRef.current) setDuration(videoRef.current.duration); }}
                  onEnded={() => setIsPlaying(false)}
                  onClick={togglePlay}
                  style={{ opacity: isPlaying ? 1 : 0.55, transition: 'opacity 0.3s' }}
                />

                {/* subtle pink tint overlay matching photo tiles */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(255,0,168,0.12) 0%, transparent 55%)' }} />

                {/* pre-play overlay */}
                {!isPlaying && (
                  <div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2"
                    style={{ background: 'rgba(0,0,0,0.32)' }}
                    onClick={togglePlay}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: '#FF00A8', boxShadow: '0 0 20px rgba(255,0,168,0.7)' }}
                    >
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="font-orbitron text-[9px] font-black tracking-[0.2em] text-white/80 uppercase">
                      2026 Teaser
                    </p>
                  </div>
                )}

                {/* control bar — compact to fit the tile */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-20 px-2 pb-1.5 pt-5 transition-opacity duration-300"
                  style={{
                    opacity: showControls ? 1 : 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                    pointerEvents: showControls ? 'auto' : 'none',
                  }}
                >
                  {/* progress */}
                  <input
                    ref={progressRef}
                    type="range" min={0} max={100} step={0.1} value={progress}
                    onChange={handleSeek}
                    className="vid-range mb-1.5 block"
                    style={{ background: `linear-gradient(to right, #FF00A8 ${progress}%, rgba(255,255,255,0.18) ${progress}%)` }}
                  />
                  {/* controls row */}
                  <div className="flex items-center gap-1.5">
                    {/* play/pause */}
                    <button onClick={togglePlay} className="text-white hover:text-pink-400 transition-colors flex-shrink-0">
                      {isPlaying
                        ? <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                        : <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>}
                    </button>

                    {/* mute */}
                    <button onClick={toggleMute} className="text-white hover:text-cyan-400 transition-colors flex-shrink-0">
                      {isMuted || volume === 0
                        ? <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
                        : <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>}
                    </button>

                    {/* volume */}
                    <input type="range" min={0} max={1} step={0.02} value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange} className="vol-range"
                      style={{ background: `linear-gradient(to right, #00F0FF ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.18) ${(isMuted ? 0 : volume) * 100}%)` }} />

                    {/* time */}
                    <span className="font-rajdhani text-white/70 text-[8px] ml-auto flex-shrink-0">
                      {fmt(currentTime)}/{fmt(duration)}
                    </span>

                    {/* fullscreen */}
                    <button onClick={toggleFullscreen} className="text-white hover:text-cyan-400 transition-colors flex-shrink-0">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* ── PHOTO TILES (col 2, rows 1–3) ── */}
              <div style={tileBase}>
                <PhotoTile src="/photos/event1.jpg" label="Highlights" accent="#00F0FF" />
              </div>
              <div style={tileBase}>
                <PhotoTile src="/photos/event2.jpg" label="Hackathon" accent="#FF00A8" />
              </div>
              <div style={tileBase}>
                <PhotoTile src="/photos/event3.jpg" label="Robotics" accent="#00F0FF" />
              </div>

              {/* ── WIDE PHOTO (row 4, both cols) ── */}
              <div className="mosaic-wide" style={tileBase}>
                <PhotoTile src="/photos/team.jpg" label="Team Photo" accent="#FF00A8" />
              </div>

            </div>{/* end mosaic-grid */}
          </div>{/* end col 3 */}

        </div>{/* end main grid */}
      </section>
    </>
  );
}