import React, { useState } from 'react';
import { PROFILE_DATA } from '../data/profile';
import { Headphones, Shirt, Moon, Gamepad2, Terminal, Disc, Sparkles } from 'lucide-react';

/**
 * HOBBIES & LIFESTYLE SECTION
 * Emphasizes personal lifestyle, music, gaming, streetwear style, and night owl grind.
 * Balanced 5 pillars with interactive cassette tape player & clean text layouts.
 */
export default function HobbiesStreetCultureSection() {
  const { hobbies } = PROFILE_DATA;
  const [activeHobby, setActiveHobby] = useState(hobbies[0]?.id || "music");
  const [playingTrack, setPlayingTrack] = useState(0);

  const iconMap = {
    Headphones,
    Shirt,
    Moon,
    Gamepad2,
    Terminal
  };

  const selectedHobby = hobbies.find(h => h.id === activeHobby) || hobbies[0];

  return (
    <section id="hobbies" className="relative py-20 px-4 sm:px-6 border-t border-[#00F0FF]/20 bg-[#07080F]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-white/10 pb-6">
          <div>
            <div className="font-mono text-xs font-bold text-[#CCFF00] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[#CCFF00] inline-block" />
              // SECTION 03: LIFESTYLE & PASSION
            </div>
            <h2 className="font-bebas text-5xl sm:text-7xl text-white tracking-wide mt-1">
              SỞ THÍCH <span className="text-[#FF0055]">CÁ NHÂN</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-slate-400 max-w-sm">
            "Không chỉ có code. Cuộc sống là âm nhạc, game chiến thuật, thời trang và những đêm thức trắng theo đuổi đam mê."
          </div>
        </div>

        {/* Hobby Selector Tabs (Clean Responsive Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {hobbies.map(hobby => {
            const IconComponent = iconMap[hobby.icon] || Headphones;
            const isSelected = hobby.id === activeHobby;

            return (
              <button
                key={hobby.id}
                onClick={() => {
                  setActiveHobby(hobby.id);
                  setPlayingTrack(0);
                }}
                className={`p-4 border text-left transition-all relative overflow-hidden flex flex-col justify-between h-28 ${
                  isSelected 
                    ? 'bg-[#131624] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.3)]' 
                    : 'bg-[#0D0F18] border-white/10 hover:border-white/30 text-slate-400'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-8 h-8 bg-[#00F0FF]/10 flex items-center justify-center">
                    <span className="w-2 h-2 bg-[#00F0FF] rotate-45" />
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <IconComponent className={`w-5 h-5 ${isSelected ? 'text-[#00F0FF]' : 'text-slate-400'}`} />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
                    {hobby.category}
                  </span>
                </div>

                <div>
                  <div className={`font-bebas text-lg leading-tight truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {hobby.title}
                  </div>
                  <div className="font-mono text-[10px] text-[#CCFF00] mt-0.5 truncate">
                    {hobby.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Hobby Showcase Detail Card */}
        {selectedHobby && (
          <div className="cyber-card p-6 sm:p-10 border-2 border-white/15 relative">
            
            {/* Top Bar Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10 mb-8 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse" />
                <span className="text-[#CCFF00] font-bold uppercase">{selectedHobby.category}</span>
                <span className="text-slate-500">/</span>
                <span className="text-white font-bold">{selectedHobby.badge}</span>
              </div>
              <span className="text-slate-500 text-[10px]">VERIFIED // VIBE 2026</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: Info & Story (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">
                    {selectedHobby.title}
                  </h3>
                  <p className="mt-2 text-base text-[#00F0FF] font-mono font-medium">
                    "{selectedHobby.highlight}"
                  </p>
                </div>

                <div className="space-y-3 font-sans text-sm sm:text-base text-slate-300 leading-relaxed bg-[#0A0C16] p-5 border-l-2 border-[#FF0055]">
                  {selectedHobby.details.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#CCFF00] font-mono font-bold mt-0.5">▸</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Interactive Cassette Object (5 cols) */}
              <div className="lg:col-span-5">
                <div className="bg-[#090B12] border-2 border-white/20 p-5 relative shadow-[4px_6px_0px_#000]">
                  
                  {/* Cassette Tape Object Visual */}
                  <div className="bg-[#151928] border border-white/10 p-4 rounded relative">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                      <span className="text-[#CCFF00] font-bold">MIXTAPE CASSETTE</span>
                      <span>SIDE A // 45 MIN</span>
                    </div>

                    {/* Cassette Center Window with Spinning Spools */}
                    <div className="bg-[#07080F] border border-white/20 h-20 rounded flex items-center justify-around px-4 my-3 relative overflow-hidden">
                      {/* Left Spool */}
                      <div className="w-12 h-12 rounded-full border-2 border-[#00F0FF] flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
                        <div className="w-4 h-4 rounded-full bg-[#00F0FF]" />
                      </div>

                      {/* Center Tape Level */}
                      <div className="w-16 h-4 bg-[#1E2338] rounded-full border border-white/10 flex items-center justify-center text-[9px] font-mono text-[#FF0055]">
                        LO-FI 808
                      </div>

                      {/* Right Spool */}
                      <div className="w-12 h-12 rounded-full border-2 border-[#FF0055] flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
                        <div className="w-4 h-4 rounded-full bg-[#FF0055]" />
                      </div>
                    </div>

                    {/* Tracklist on Tape */}
                    {selectedHobby.playlist && selectedHobby.playlist.length > 0 ? (
                      <div className="mt-3 space-y-1.5 font-mono text-xs">
                        <div className="text-[10px] text-slate-500 font-bold uppercase">FAVORITE TRACKS:</div>
                        {selectedHobby.playlist.map((track, i) => (
                          <div 
                            key={i}
                            onClick={() => setPlayingTrack(i)}
                            className={`p-1.5 flex items-center justify-between cursor-pointer transition-colors ${
                              playingTrack === i 
                                ? 'bg-[#00F0FF]/15 text-[#00F0FF] border-l-2 border-[#00F0FF]' 
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            <span className="truncate">{i + 1}. {track.track}</span>
                            <span className="text-[10px] text-slate-500 shrink-0 ml-2">{track.artist}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-3 p-3 bg-[#07080F] border border-white/10 text-xs font-mono text-slate-400">
                        <span className="text-[#CCFF00] font-bold block mb-1">// LIFESTYLE NOTE:</span>
                        "Tập trung vào hiện tại, giữ cho đầu óc minh mẫn và luôn tin vào chính mình."
                      </div>
                    )}

                    {/* Cassette Screw Accents */}
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5 text-[9px] font-mono text-slate-500">
                      <span>TYPE II // CHROME</span>
                      <span>STEREO EQ READY</span>
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
