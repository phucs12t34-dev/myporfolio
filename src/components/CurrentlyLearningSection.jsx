import React from 'react';
import { BookOpen, TrendingUp } from 'lucide-react';

export default function CurrentlyLearningSection({ items }) {
  return (
    <section id="learning" className="py-24 relative z-10 border-t border-white/[0.08] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="section-stamp">
            <span>04 / CONTINUOUS INQUIRY</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl text-[#F5F4F8] font-bold tracking-tight">
            Topics currently under investigation.
          </h2>
          <p className="font-sans text-[#AAA7B2] text-base max-w-xl leading-relaxed">
            Một bức tranh chân thực về những gì đang chủ động nghiên cứu mỗi ngày, từ lý thuyết thuật toán đến mô phỏng số.
          </p>
        </div>

        {/* Grid of Learning Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items?.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark hover:border-[#9B5CFF]/40 transition-all flex flex-col justify-between space-y-4 text-left group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                  <span className="badge-purple">
                    {item.status}
                  </span>
                  <span className="font-mono text-xs text-[#706D79]">
                    {item.focus}
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F5F4F8] group-hover:text-[#B994FF] transition-colors">
                  {item.topic}
                </h3>

                <p className="font-sans text-xs text-[#AAA7B2] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center gap-1.5 text-xs font-mono text-[#B994FF]">
                <TrendingUp className="w-3.5 h-3.5 text-[#9B5CFF]" />
                <span>Active Research Phase</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
