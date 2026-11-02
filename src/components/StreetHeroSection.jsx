import React, { useState } from 'react';
import { PROFILE_DATA } from '../data/profile';
import { Sparkles, ArrowDown, ShieldCheck, Flame, Cpu } from 'lucide-react';

/**
 * CYBER HERO & PHOTO MUGSHOT SECTION
 * Clean typography layout, well-proportioned spacing without text clipping or collisions.
 * Features: Cyber ID photo card with original "So stress" badge & "i alway beleave in myself" slogan sticker,
 * duct tape corners, barcode, and interactive spray paint tags.
 */
export default function StreetHeroSection() {
  const { identity } = PROFILE_DATA;
  const [sprays, setSprays] = useState([
    { id: 1, text: "cin.tie(NULL);", color: "#00F0FF", x: 62, y: 14, rot: 8 },
    { id: 2, text: "0ms TLE", color: "#FF0055", x: 74, y: 88, rot: -6 },
  ]);

  const sprayTags = [
    "AC 100",
    "FAST_IO",
    "O(N log N)",
    "HOODIE",
    "BELIEVE",
    "STING ĐỎ",
    "2AM GRIND"
  ];

  const handleSprayCanClick = () => {
    const randomTag = sprayTags[Math.floor(Math.random() * sprayTags.length)];
    const colors = ["#00F0FF", "#FF0055", "#CCFF00"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    // Confine spray tags away from buttons (upper right or outer edges)
    const newSpray = {
      id: Date.now(),
      text: randomTag,
      color: randomColor,
      x: Math.floor(Math.random() * 40) + 55, // 55% to 95%
      y: Math.floor(Math.random() * 50) + 10, // 10% to 60%
      rot: Math.floor(Math.random() * 24) - 12
    };
    setSprays(prev => [...prev.slice(-4), newSpray]);
  };

  return (
    <section id="about" className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 flex items-center overflow-hidden">
      
      {/* Dynamic Spray Tags (Interactive Object - pointer-events-none so never blocks CTA buttons) */}
      {sprays.map(spray => (
        <div
          key={spray.id}
          className="absolute z-20 font-marker text-sm sm:text-base px-2.5 py-1 border border-current shadow-lg pointer-events-none select-none transition-all duration-300 animate-[bounce_0.6s_ease-out]"
          style={{
            left: `${spray.x}%`,
            top: `${spray.y}%`,
            color: spray.color,
            borderColor: spray.color,
            backgroundColor: 'rgba(7, 8, 15, 0.88)',
            transform: `rotate(${spray.rot}deg)`,
            boxShadow: `0 0 16px ${spray.color}50`
          }}
        >
          {spray.text}
        </div>
      ))}

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Main Typography & Bio (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tag Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-[#CCFF00] bg-[#CCFF00]/10 border border-[#CCFF00]/40 px-3 py-1 flex items-center gap-1.5 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-[#CCFF00]" />
                {identity.school}
              </span>
              <span className="font-mono text-xs font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/40 px-3 py-1 flex items-center gap-1.5 uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />
                C++ & THUẬT TOÁN
              </span>
            </div>

            {/* Giant Name Heading (Clean, Well-spaced, No Overflow) */}
            <div>
              <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-wide text-white leading-tight select-none">
                NGUYỄN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#FF0055] to-[#CCFF00]">
                  THANH PHÚC
                </span>
              </h1>
              <p className="mt-3 font-mono text-xs sm:text-sm text-slate-300 max-w-xl font-medium tracking-wide">
                {identity.tagline} · <span className="text-[#CCFF00]">{identity.status}</span>
              </p>
            </div>

            {/* Bio Card (Comfortable Line-Height, Spacious Layout) */}
            <div className="space-y-3 font-sans text-sm sm:text-base text-slate-300 leading-relaxed bg-[#0D0F1A]/85 border-l-4 border-[#00F0FF] p-5 shadow-lg">
              {identity.bio.map((paragraph, idx) => (
                <p key={idx} className="font-normal text-slate-300">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#hobbies"
                className="px-6 py-3.5 bg-[#00F0FF] text-[#07080F] font-bebas text-xl tracking-wider font-black hover:bg-white hover:shadow-[0_0_25px_#00F0FF] transition-all flex items-center gap-2"
              >
                KHÁM PHÁ CÁ TÍNH & SỞ THÍCH
                <ArrowDown className="w-5 h-5" />
              </a>

              {/* Spray Can Interactive Object Button */}
              <button
                onClick={handleSprayCanClick}
                className="px-4 py-3 bg-[#131624] border border-[#FF0055] text-white font-mono text-xs font-bold flex items-center gap-2 hover:bg-[#FF0055]/20 hover:border-[#FF0055] transition-all shadow-md active:scale-95"
                title="Bấm để xịt tag graffiti"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF0055] animate-ping" />
                <span>SPRAY TAG ({sprays.length})</span>
              </button>
            </div>

            {/* Micro Stats Bar */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 font-mono text-xs text-slate-400">
              <div className="p-3 bg-[#0D0F18] border border-white/5">
                <span className="text-slate-500 block text-[10px]">TIME COMPLEXITY</span>
                <span className="text-[#00F0FF] font-bold text-sm">O(N log N)</span>
              </div>
              <div className="p-3 bg-[#0D0F18] border border-white/5">
                <span className="text-slate-500 block text-[10px]">FAST IO STATUS</span>
                <span className="text-[#CCFF00] font-bold text-sm">0ms LATENCY</span>
              </div>
              <div className="p-3 bg-[#0D0F18] border border-white/5">
                <span className="text-slate-500 block text-[10px]">MINDSET</span>
                <span className="text-[#FF0055] font-bold text-sm">NEVER GIVE UP</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Cyber ID Card Object with Slogan Badge (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            
            <div className="relative w-full max-w-[360px] sm:max-w-[400px]">
              
              {/* Duct Tape Top-Left Accent */}
              <div className="absolute -top-3 -left-4 z-30 px-4 py-1 duct-tape font-mono text-[10px] text-slate-200 transform -rotate-12 uppercase font-black">
                // DEV PROFILE
              </div>

              {/* Main Photo Card */}
              <div className="cyber-card p-4 sm:p-5 border-2 border-[#00F0FF] relative overflow-hidden shadow-[0_0_35px_rgba(0,240,255,0.2)]">
                
                {/* ID Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 font-mono text-xs">
                  <div className="flex items-center gap-1.5 text-[#00F0FF]">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="font-bold">CYBER_ID // 0x7F</span>
                  </div>
                  <span className="text-[10px] text-slate-400">ID: DEV-PHUC-2026</span>
                </div>

                {/* User Photo Frame with Original "So stress" Badge */}
                <div className="relative overflow-hidden border border-white/20 bg-[#07080F] group">
                  <img 
                    src="./avatar.png" 
                    alt="Nguyễn Thanh Phúc" 
                    className="w-full h-auto object-cover grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />

                  {/* Corner Target Markers */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00F0FF]" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00F0FF]" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00F0FF]" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00F0FF]" />

                  {/* Top-Right AC Hunter Badge */}
                  <div className="absolute top-3 right-3 bg-[#00F0FF] text-[#07080F] text-[9px] font-mono font-black px-2 py-0.5">
                    AC HUNTER
                  </div>

                  {/* PROMINENT SLOGAN BADGE ON PHOTO (Requested by user) */}
                  <div className="absolute bottom-3 inset-x-3 bg-[#07080F]/90 backdrop-blur-sm border border-[#CCFF00] p-2.5 text-center shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                    <div className="font-marker text-lg sm:text-xl text-[#CCFF00] tracking-wider text-neon-yellow">
                      "{identity.slogan}"
                    </div>
                  </div>
                </div>

                {/* Card Bottom Meta */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div>
                      <div className="font-bold text-white text-sm">{identity.name}</div>
                      <div className="text-[10px] text-[#00F0FF]">@{identity.handle}</div>
                    </div>
                    {/* Barcode SVG Visual */}
                    <div className="text-right">
                      <div className="font-mono text-xs tracking-widest text-slate-400 opacity-80">
                        ||||| ||| || ||||| | ||
                      </div>
                      <span className="text-[9px] text-slate-500 font-mono">FSCHOOL HẬU GIANG</span>
                    </div>
                  </div>

                  {/* Hazard Caution Tape Accent */}
                  <div className="mt-3 py-1 hazard-tape text-center text-[10px]">
                    /// C++ VERIFIED /// O(N LOG N) ///
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
