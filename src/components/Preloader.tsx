import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  images: string[];
  children: React.ReactNode;
}

export default function Preloader({ images, children }: PreloaderProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!images || images.length === 0) {
      setIsLoaded(true);
      return;
    }

    let loaded = 0;
    let isCancelled = false;

    const incrementLoad = () => {
      if (isCancelled) return;
      loaded++;
      setLoadedCount(loaded);
      if (loaded === images.length) {
        // Small delay for smooth transition
        setTimeout(() => setIsLoaded(true), 500);
      }
    };

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = incrementLoad;
      img.onerror = incrementLoad; // We increment even on error so it doesn't get stuck
    });

    return () => {
      isCancelled = true;
    };
  }, [images]);

  if (isLoaded) {
    return <>{children}</>;
  }

  const progress = Math.round((loadedCount / (images.length || 1)) * 100);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050508] flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 mb-8 animate-pulse">
        <img 
          src="/Logo.png" 
          alt="Unitron Loading" 
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]"
        />
      </div>
      
      <div className="w-64 h-2 bg-[#12002B] rounded-full overflow-hidden border border-[#ff00ff]/30">
        <div 
          className="h-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p 
        className="mt-4 font-['Rajdhani'] text-[#00ffff] text-lg font-bold tracking-widest uppercase"
        style={{ textShadow: '0 0 10px rgba(0,255,255,0.5)' }}
      >
        Initializing... {progress}%
      </p>
    </div>
  );
}
