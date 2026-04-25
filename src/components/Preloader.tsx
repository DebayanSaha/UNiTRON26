import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  images?: string[];
  videos?: string[]; // Added videos prop
  children: React.ReactNode;
}

export default function Preloader({ images = [], videos = [], children }: PreloaderProps) {
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isReadyToUnmount, setIsReadyToUnmount] = useState(false);

  useEffect(() => {
    const totalAssets = images.length + videos.length;
    
    if (totalAssets === 0) {
      setLoadedAssets(1); // Bypass if nothing to load
      return;
    }

    let loaded = 0;
    let isCancelled = false;

    const incrementLoad = () => {
      if (isCancelled) return;
      loaded++;
      setLoadedAssets(loaded);
    };

    // 1. Preload Images (Waiting for 'onload')
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = incrementLoad;
      img.onerror = incrementLoad; // Move forward even if one fails
    });

    // 2. Preload Videos (Waiting for 'canplaythrough')
    videos.forEach((src) => {
      const vid = document.createElement('video');
      vid.src = src;
      vid.preload = 'auto'; // Force browser to start downloading
      vid.addEventListener('canplaythrough', incrementLoad, { once: true });
      vid.addEventListener('error', incrementLoad, { once: true });
      vid.load();
    });

    return () => {
      isCancelled = true;
    };
  }, [images, videos]);

  // Calculate Progress
  useEffect(() => {
    const totalAssets = images.length + videos.length;
    const targetProgress = totalAssets === 0 
      ? 100 
      : Math.round((loadedAssets / totalAssets) * 100);

    const intervalId = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < targetProgress) return prev + 1;
        return prev;
      });
    }, 15);

    return () => clearInterval(intervalId);
  }, [loadedAssets, images.length, videos.length]);

  // Unmount logic
  useEffect(() => {
    if (displayProgress >= 100) {
      setTimeout(() => setIsReadyToUnmount(true), 600);
    }
  }, [displayProgress]);

  if (isReadyToUnmount) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="relative w-[350px] sm:w-[500px] md:w-[700px] animate-jitter">
        <img
          src="/unitron.png"
          alt="Unitron Loading"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 w-[92%] max-w-[1400px] flex flex-col gap-2">
        <div className="flex justify-end w-full">
          <span className="font-nfs text-2xl sm:text-3xl text-white/80 tracking-widest">
            {displayProgress}%
          </span>
        </div>

        <div
          className="relative w-full overflow-hidden"
          style={{
            height: '16px',
            borderRadius: '9999px',
            border: '2px solid rgba(255,255,255,0.85)',
            backgroundColor: 'transparent',
          }}
        >
          <div
            className="absolute top-0 left-0 h-full transition-all duration-300 ease-out"
            style={{
              width: `${displayProgress}%`,
              borderRadius: '9999px',
              backgroundColor: 'rgba(255,255,255,0.90)',
              margin: '2px',
              height: 'calc(100% - 4px)',
            }}
          />
        </div>
      </div>
    </div>
  );
}