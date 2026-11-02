import React from 'react';
import { BookOpen, TrendingUp } from 'lucide-react';

export default function CurrentlyLearningSection({ items }) {
  return (
    <section id="learning" className="py-24 relative z-10 border-t border-[#D8D5CD] bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="editorial-stamp">
            <span>04 / CONTINUOUS INQUIRY</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#171717] font-normal tracking-tight">
            Topics currently under investigation.
          </h2>
          <p className="font-sans text-[#66645F] text-base max-w-xl leading-relaxed">
            Một bức tranh chân thực về những gì tôi đang chủ động nghiên cứu mỗi ngày, từ lý thuyết thuật toán đến mô phỏng hệ thống.
          </p>
        </div>

        {/* Grid of Learning Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items?.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#D8D5CD] shadow-editorial hover:border-[#171717] transition-all flex flex-col justify-between space-y-4 text-left"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#F0EEE8] pb-2">
                  <span className="badge-editorial">
                    {item.status}
                  </span>
                  <span className="font-mono text-xs text-[#8E8B83]">
                    {item.focus}
                  </span>
                </div>

                <h3 className="font-editorial text-xl font-bold text-[#171717]">
                  {item.topic}
                </h3>

                <p className="font-sans text-xs text-[#66645F] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0EEE8] flex items-center gap-1.5 text-xs font-mono text-[#304FFE]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Active Research Phase</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
