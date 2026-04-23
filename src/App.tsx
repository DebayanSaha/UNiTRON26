import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import AllEvents from "./components/allevents";
import Preloader from "./components/Preloader";
import ComingSoonEvents from "./components/ComingSoonEvents";
import { imagesToPreload } from "./data/imagesToPreload";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: true, // Enabled for mobile as requested
      touchMultiplier: 2,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP lag smoothing to prevent conflicts with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Cleanup on unmount
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <Preloader images={imagesToPreload}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-events" element={<AllEvents />} />
        <Route path="/coming-soon" element={<ComingSoonEvents />} />
      </Routes>
    </Preloader>
  );
}