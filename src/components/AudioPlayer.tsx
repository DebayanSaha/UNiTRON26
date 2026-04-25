import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
  audioRef.current = new Audio('/BGM.mpeg');
  audioRef.current.loop = true;
  audioRef.current.volume = 0.7;

  // Try autoplay after loading
  const tryAutoPlay = async () => {
    try {
      await audioRef.current?.play();
      setIsPlaying(true);
    } catch (err) {
      console.log("Autoplay blocked");
    }
  };

  setTimeout(() => {
    tryAutoPlay();
  }, 1500); // adjust to match your loading screen duration

  // Fallback: play on first user interaction
  const handleFirstInteraction = () => {
    audioRef.current?.play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
    window.removeEventListener('click', handleFirstInteraction);
  };

  window.addEventListener('click', handleFirstInteraction);

  return () => {
    window.removeEventListener('click', handleFirstInteraction);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };
}, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Play method returns a promise, so we handle potential autoplay blocks gracefully
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed. The user needs to interact with the document first.", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-24 right-6 w-12 h-12 bg-[#0a0a0a] border border-[#00F0FF]/40 text-[#00F0FF] rounded-full flex items-center justify-center hover:bg-[#00F0FF]/10 hover:border-[#00F0FF] hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all z-50 group shadow-lg"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]" />
      ) : (
        <VolumeX className="w-5 h-5 group-hover:scale-110 transition-transform opacity-70" />
      )}
    </button>
  );
}
