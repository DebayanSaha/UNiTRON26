import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
      }
    );
  }, []);

  return (
    <footer ref={footerRef} id="contact" className="relative bg-[#050508] font-sans">
      {/* Top Section */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

          {/* Column 1 */}
          <div className="flex flex-col gap-6 md:col-span-3">
            <h3 className="text-xl font-bold text-white mb-2">UNiTRON 26</h3>
            <div className="flex flex-col gap-4 text-sm text-gray-400 font-medium">
              <a href="#home" className="hover:text-white transition-colors w-fit">Home</a>
              <a href="#about" className="hover:text-white transition-colors w-fit">About Us</a>
              <a href="#team" className="hover:text-white transition-colors w-fit">Team</a>
              <a href="#sponsors" className="hover:text-white transition-colors w-fit">Sponsors</a>
              <a href="#gallery" className="hover:text-white transition-colors w-fit">Gallery</a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6 md:col-span-3">
            <h3 className="text-xl font-bold text-white mb-2">Events</h3>
            <div className="flex flex-col gap-4 text-sm text-gray-400 font-medium">
              <a href="#events" className="hover:text-white transition-colors w-fit">Robotics</a>
              <a href="#events" className="hover:text-white transition-colors w-fit">Gaming</a>
              <a href="#events" className="hover:text-white transition-colors w-fit">Coding</a>
              <a href="#events" className="hover:text-white transition-colors w-fit">Fun Events</a>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-2">Social Media</h3>
            <div className="flex flex-col gap-4 text-sm text-gray-400 font-medium">
              <a href="https://www.instagram.com/unitron.fit/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors w-fit">Instagram</a>
              <a href="https://www.linkedin.com/company/tic-tech-toe-technical-club/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors w-fit">LinkedIn</a>

              <a href="https://www.facebook.com/search/top?q=unitron" target="_blank" rel="noreferrer" className="hover:text-white transition-colors w-fit">Facebook</a>
            </div>
          </div>

          {/* Column 4 - Call to Action */}
          <div className="flex flex-col justify-center items-start md:items-end text-left md:text-right md:col-span-4 w-full mt-8 md:mt-0">
            <div className="mb-8">
              <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-400 tracking-tight leading-[1.1] mb-1">
                Not Just Tech.<br /><span className="text-white">It’s Everything</span>
              </h2>
              <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#b58df8] tracking-tight leading-none" style={{ background: 'linear-gradient(to right, #b58df8, #FF00A8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                UNiTRON26.
              </h2>
            </div>
            <a href="#register" className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
              Registration will open soon....
            </a>
          </div>
        </div>
      </div>

      {/* Middle Divider Section */}
      <div className="border-y border-white/10 w-full">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-white/10 text-[10px] xl:text-xs font-bold tracking-widest uppercase text-white">
          {/* Email */}
          <a href="mailto:tictechtoe.fit@teamfuture.in" className="flex items-center justify-between px-6 py-6 hover:bg-white/5 transition-colors group border-b md:border-b-0 border-white/10">
            <span className="truncate mr-4">tictechtoe.fit@teamfuture.in</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
              <Mail className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </div>
          </a>
          {/* Phone */}
          <a href="tel:+917980006097" className="flex items-center justify-between px-6 py-6 hover:bg-white/5 transition-colors group border-b md:border-b-0 border-white/10">
            <span className="truncate mr-4">+91 7980006097</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
              <Phone className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </div>
          </a>
          <a href="tel:+919836169296" className="flex items-center justify-between px-6 py-6 hover:bg-white/5 transition-colors group border-b md:border-b-0 border-white/10">
            <span className="truncate mr-4">+91 9836169296</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
              <Phone className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </div>
          </a>
          {/* Instagram */}
          <a href="https://www.instagram.com/unitron.fit/" target="_blank" rel="noreferrer" className="flex items-center justify-between px-6 py-6 hover:bg-white/5 transition-colors group border-b md:border-b-0 border-white/10">
            <span className="mr-2">Instagram</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
              <InstagramIcon className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </div>
          </a>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/company/tic-tech-toe-technical-club/" target="_blank" rel="noreferrer" className="flex items-center justify-between px-6 py-6 hover:bg-white/5 transition-colors group border-b md:border-b-0 border-white/10">
            <span className="mr-2">LinkedIn</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
              <LinkedinIcon className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </div>
          </a>
          {/* Facebook */}
          <a href="https://www.facebook.com/search/top?q=unitron" target="_blank" rel="noreferrer" className="flex items-center justify-between px-6 py-6 hover:bg-white/5 transition-colors group">
            <span className="mr-2">Facebook</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
              <FacebookIcon className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </div>
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
        <p>© 2026 UNiTRON. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/917980006097" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 w-12 h-12 bg-[#000000] border border-white/10 text-[#25D366] rounded-full flex items-center justify-center hover:bg-[#25D366]/10 hover:border-[#25D366] transition-all z-50 shadow-lg">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>
  );
}
