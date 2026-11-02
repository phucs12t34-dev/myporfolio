import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ personal }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-white/[0.08] relative z-10 bg-[#09090C] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#121218] border border-white/[0.08] text-[#F5F4F8] flex items-center justify-center font-mono font-bold text-xs shadow-card-dark">
              {personal?.initials && !personal.initials.includes('[ADD') ? personal.initials : 'DEV'}
            </div>
            <div>
              <span className="font-heading font-bold text-base text-[#F5F4F8] block">
                {personal?.name && !personal.name.includes('[ADD') ? personal.name : "Developer Portfolio"}
              </span>
              <span className="text-[11px] font-mono text-[#AAA7B2]">
                {personal?.tagline || "Building ideas into meaningful digital experiences."}
              </span>
            </div>
          </div>

          {/* Center Info */}
          <div className="text-xs font-mono text-[#706D79] text-center">
            Deep Black Futuristic Bento &times; Dark Terminal &times; Three.js Web3D.
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="px-3.5 py-2 rounded-xl bg-[#121218] hover:bg-[#1A1A24] text-[#F5F4F8] border border-white/[0.08] hover:border-[#9B5CFF]/40 transition-all flex items-center gap-2 text-xs font-mono shadow-card-dark hover:-translate-y-0.5"
            aria-label="Cuộn lên đầu trang"
          >
            <span>Lên đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#9B5CFF]" />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#706D79] font-mono">
          <div>
            &copy; {currentYear} {personal?.name && !personal.name.includes('[ADD') ? personal.name : "Developer"}. All rights reserved.
          </div>
          <div>
            Space Grotesk &bull; C++20 DSA &bull; Three.js Simulation Studio
          </div>
        </div>
      </div>
    </footer>
  );
}
