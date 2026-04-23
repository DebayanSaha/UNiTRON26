import { useNavigate } from 'react-router-dom';

export default function ComingSoonEvents() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#03030a] flex flex-col items-center justify-center relative overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.05) 0%, transparent 60%)',
      }} />

      <div className="relative z-10 flex flex-col items-center">
        {/* Title */}
        <h2 className="font-nfs text-5xl md:text-7xl uppercase tracking-widest text-center text-white mb-16 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          EVENTS
        </h2>

        {/* Professional Circular Loader */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-16">
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
            <span className="font-nfs text-sm md:text-base text-white/80 tracking-widest uppercase animate-pulse leading-tight">
              Coming
            </span>
            <span className="font-nfs text-sm md:text-base text-[#00F0FF] tracking-widest uppercase animate-pulse leading-tight">
              Soon
            </span>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="group relative px-8 py-3 bg-transparent border border-[#00F0FF]/30 text-[#00F0FF] font-orbitron tracking-widest text-xs uppercase hover:bg-[#00F0FF]/10 transition-all duration-300"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: 'inset 0 0 15px rgba(0, 240, 255, 0.3)' }}
          />
          Return Home
        </button>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { left: -33%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}
