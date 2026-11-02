import React from 'react';
import { PROFILE_DATA } from '../data/profile';
import { Terminal, Shield, Zap, Target } from 'lucide-react';

/**
 * ATTITUDE & MANIFESTO SECTION
 * Shows: Why C++ & DSA? Raw mindset, core principles of persistence and grit.
 */
export default function AttitudeManifestoSection() {
  const { manifesto } = PROFILE_DATA;

  const ruleIcons = {
    RULE_01: Terminal,
    RULE_02: Shield,
    RULE_03: Zap,
    RULE_04: Target,
  };

  return (
    <section id="manifesto" className="relative py-20 px-4 sm:px-6 border-t border-[#00F0FF]/20 bg-[#090B14]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-white/10 pb-6">
          <div>
            <div className="font-mono text-xs font-bold text-[#FF0055] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF0055] inline-block" />
              // SECTION 02: ATTITUDE & MINDSET
            </div>
            <h2 className="font-bebas text-5xl sm:text-7xl text-white tracking-wide mt-1">
              CÁ TÍNH & <span className="text-[#00F0FF]">BẢN LĨNH</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-slate-400 max-w-sm">
            "Không thỏa hiệp với sự chậm chạp. Viết code như cách sống: thẳng thắn, trực diện và luôn giữ vững niềm tin."
          </div>
        </div>

        {/* Why C++ DSA Banner */}
        <div className="mb-12 p-6 sm:p-8 bg-[#0D0F1B] border-l-4 border-l-[#CCFF00] border-t border-r border-b border-white/10">
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-[#CCFF00] font-bold uppercase tracking-widest">
              TẠI SAO LẠI LÀ C++ VÀ GIẢI THUẬT?
            </span>
            <p className="mt-3 font-sans text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Bởi vì C++ không bao giờ nói dối. Nó không giấu giếm bất cứ thứ gì sau những lớp vỏ bọc hào nhoáng.
              Mỗi byte bộ nhớ, mỗi con trỏ, mỗi vòng lặp đều do chính mình kiểm soát. Trong thế giới thuật toán,
              mọi người đều bình đẳng trước độ phức tạp <span className="text-[#00F0FF] font-mono font-bold">O(N log N)</span>.
              Bạn chỉ có thể vượt qua bài toán hóc búa bằng sự sắc bén và lòng kiên trì.
            </p>
          </div>
        </div>

        {/* 4 Core Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {manifesto.map((rule, idx) => {
            const Icon = ruleIcons[rule.code] || Zap;
            const borderColors = [
              "hover:border-[#00F0FF]",
              "hover:border-[#FF0055]",
              "hover:border-[#CCFF00]",
              "hover:border-[#FF6B00]"
            ];
            const tagColors = [
              "text-[#00F0FF] bg-[#00F0FF]/10",
              "text-[#FF0055] bg-[#FF0055]/10",
              "text-[#CCFF00] bg-[#CCFF00]/10",
              "text-[#FF6B00] bg-[#FF6B00]/10"
            ];

            return (
              <div 
                key={rule.code} 
                className={`cyber-card p-6 sm:p-7 border border-white/15 transition-all group ${borderColors[idx % 4]}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-mono text-xs font-black px-2.5 py-1 border border-current ${tagColors[idx % 4]}`}>
                    {rule.code}
                  </span>
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </div>

                <h3 className="font-bebas text-2xl sm:text-3xl tracking-wide text-white group-hover:text-[#00F0FF] transition-colors">
                  {rule.title}
                </h3>

                <p className="mt-3 font-sans text-sm text-slate-300 leading-relaxed">
                  {rule.desc}
                </p>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>STATUS: ACTIVE</span>
                  <span className="text-[#CCFF00]">✓ VERIFIED MINDSET</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
