import React from 'react';
import { PROFILE_DATA } from '../data/profile';
import { Cpu, Binary, Layers, Network } from 'lucide-react';

/**
 * TECH & SKILL ARSENAL SECTION
 * Coding presented in balance with personal lifestyle, without bloated code boxes.
 * Features 4 compact, well-spaced skill cards highlighting logic and optimization mindset.
 */
export default function CppArsenalSection() {
  const { arsenal } = PROFILE_DATA;

  const cardIcons = [Cpu, Layers, Network, Binary];

  return (
    <section id="arsenal" className="relative py-20 px-4 sm:px-6 border-t border-[#00F0FF]/20 bg-[#0A0C14]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-white/10 pb-6">
          <div>
            <div className="font-mono text-xs font-bold text-[#00F0FF] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00F0FF] inline-block" />
              // SECTION 04: TECH & SKILLSET
            </div>
            <h2 className="font-bebas text-5xl sm:text-7xl text-white tracking-wide mt-1">
              KỸ NĂNG & <span className="text-[#CCFF00]">CÔNG NGHỆ</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-slate-400 max-w-sm">
            "Lập trình C++ và tư duy giải thuật là một nhánh đam mê giúp rèn luyện khả năng suy nghĩ logic và tính kỷ luật."
          </div>
        </div>

        {/* 4 Skill Cards Grid (Balanced, Compact, No Giant Code Boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {arsenal.map((item, idx) => {
            const colors = ["#00F0FF", "#CCFF00", "#FF0055", "#FF6B00"];
            const color = colors[idx % colors.length];
            const IconComponent = cardIcons[idx % cardIcons.length];

            return (
              <div 
                key={item.name}
                className="cyber-card p-6 flex flex-col justify-between group hover:border-[#00F0FF] transition-all min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="font-mono text-[10px] font-black px-2.5 py-0.5 border uppercase"
                      style={{ color: color, borderColor: `${color}40`, backgroundColor: `${color}10` }}
                    >
                      {item.level}
                    </span>
                    <IconComponent className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="font-syne text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors leading-snug">
                    {item.name}
                  </h3>

                  <p className="mt-3 font-sans text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 bg-[#07080F] border border-white/10 text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>EFFICIENCY</span>
                  <span className="text-[#CCFF00] font-bold">O(N log N)</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
