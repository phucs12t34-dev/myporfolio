import React from 'react';
import { Flame, ArrowUp } from 'lucide-react';

export default function CyberFooter({ identity }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05060A] border-t-2 border-[#00F0FF]/30 text-slate-400 font-mono text-xs">
      
      {/* Top Hazard Caution Tape Strip */}
      <div className="h-2 w-full hazard-tape" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-white font-bebas text-2xl tracking-wider">
            {identity.name} <span className="text-[#00F0FF]">· {identity.handle}</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Built with C++ passion, Hip-Hop vibes & Cyberpunk street energy. No heavy 3D bloat.
          </div>
          <div className="mt-2 text-[#CCFF00] font-marker text-sm">
            "{identity.slogan}"
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={scrollToTop}
            className="px-4 py-2 bg-[#131624] border border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#07080F] transition-all flex items-center gap-2 font-bold"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="border-t border-white/5 py-3 text-center text-[10px] text-slate-600">
        © 2026 {identity.name}. ALL RIGHTS RESERVED // O(N LOG N) CERTIFIED
      </div>
    </footer>
  );
}
