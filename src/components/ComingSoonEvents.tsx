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

        {/* Futuristic Spinner */}
        <div className="relative w-24 h-24 mb-10">
          <div className="absolute inset-0 border-[3px] border-t-[#00F0FF] border-r-transparent border-b-[#FF00A8] border-l-transparent rounded-full animate-spin duration-1000"></div>
          <div className="absolute inset-2 border-[3px] border-t-transparent border-r-[#FF00A8] border-b-transparent border-l-[#00F0FF] rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_15px_white]"></div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-72 md:w-96 h-[2px] bg-white/10 overflow-hidden mb-8 relative">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#00F0FF] to-[#FF00A8] animate-[loading-bar_2s_ease-in-out_infinite]" />
        </div>

        {/* Status Text */}
        <p className="text-white/80 tracking-[0.4em] font-mono text-lg md:text-2xl uppercase animate-pulse mb-16">
          Coming Soon...
        </p>

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
