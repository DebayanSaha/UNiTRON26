import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  images: string[];
  children: React.ReactNode;
}

export default function Preloader({ images, children }: PreloaderProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isReadyToUnmount, setIsReadyToUnmount] = useState(false);

  useEffect(() => {
    if (!images || images.length === 0) {
      setLoadedCount(1);
      return;
    }
    let loaded = 0;
    let isCancelled = false;
    const incrementLoad = () => {
      if (isCancelled) return;
      loaded++;
      setLoadedCount(loaded);
    };
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = incrementLoad;
      img.onerror = incrementLoad;
    });
    return () => {
      isCancelled = true;
    };
  }, [images]);

  useEffect(() => {
    const targetProgress =
      !images || images.length === 0
        ? 100
        : Math.round((loadedCount / images.length) * 100);

    const intervalId = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < targetProgress) return prev + 1;
        return prev;
      });
    }, 15);

    return () => clearInterval(intervalId);
  }, [loadedCount, images]);

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
      {/* Outer Rounded Frame */}
      <div className="relative w-full h-full border border-white/20 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden">

        {/* Center Logo with Jitter Effect */}
        <div className="relative w-[350px] sm:w-[500px] md:w-[700px] animate-jitter">
          <img
            src="/unitron.png"
            alt="Unitron Loading"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Progress Bar Area */}
        <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 w-[92%] max-w-[1400px] flex flex-col gap-2">

          {/* Percentage label */}
          <div className="flex justify-end w-full">
            <span className="font-nfs text-2xl sm:text-3xl text-white/80 tracking-widest">
              {displayProgress}%
            </span>
          </div>

          {/*
            Pill-shaped loading bar — matches the reference image:
            - Black background
            - White stroke border
            - White fill grows from left, with fully rounded left cap
            - Right side stays dark/empty
          */}
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
                /* Slightly inset so the fill doesn't bleed into the border */
                margin: '2px',
                height: 'calc(100% - 4px)',
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}