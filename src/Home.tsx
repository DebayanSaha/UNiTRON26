import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Events from './components/Events';
import About from './components/About';
import GlimpsesOfPast from './components/GlimpsesOfPast';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import CoreTeam from './components/CoreTeam';
// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Global scroll-driven background parallax
    gsap.to('.hero-bg', {
      backgroundPositionY: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-bg',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Cleanup ScrollTrigger on unmount
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="bg-[#03030a] text-white min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <About />
        <Events />
        <CoreTeam />
        <Sponsors />
        <GlimpsesOfPast />
      </main>
      <Footer />
    </div>
  );
}
