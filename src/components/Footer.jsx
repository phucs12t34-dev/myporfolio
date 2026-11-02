import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ personal }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-[#D8D5CD] relative z-10 bg-[#F0EEE8] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#171717] text-[#F7F5F0] flex items-center justify-center font-mono font-bold text-xs shadow-editorial-sm">
              {personal?.initials && !personal.initials.includes('[ADD') ? personal.initials : 'DEV'}
            </div>
            <div>
              <span className="font-editorial font-bold text-base text-[#171717] block">
                {personal?.name && !personal.name.includes('[ADD') ? personal.name : "Developer Portfolio"}
              </span>
              <span className="text-[11px] font-mono text-[#66645F]">
                {personal?.tagline || "Designing and building things that make technology feel human."}
              </span>
            </div>
          </div>

          {/* Center Info */}
          <div className="text-xs font-mono text-[#66645F] text-center">
            Vintage Editorial &times; Modern Digital Craft &times; Three.js Web3D.
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F7F5F0] text-[#171717] border border-[#D8D5CD] transition-all flex items-center gap-2 text-xs font-mono shadow-editorial-sm hover:-translate-y-0.5"
            aria-label="Cuộn lên đầu trang"
          >
            <span>Lên đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-[#D8D5CD] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#66645F] font-mono">
          <div>
            &copy; {currentYear} {personal?.name && !personal.name.includes('[ADD') ? personal.name : "Developer"}. All rights reserved.
          </div>
          <div>
            VOL. 26 &bull; Swiss Modernist Layout &bull; C++20 DSA &bull; Web3D
          </div>
        </div>
      </div>
    </footer>
  );
}
