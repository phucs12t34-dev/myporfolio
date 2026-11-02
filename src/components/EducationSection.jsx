import React from 'react';
import { GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';

export default function EducationSection({ education }) {
  const isAllPlaceholder = !education || education.length === 0 ||
    (education.length === 1 && education[0].institution?.includes('[ADD'));

  return (
    <section id="education" className="py-24 relative z-10 border-t border-white/[0.08] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="section-stamp">
            <span>07 / EDUCATION &amp; ACADEMIA</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl text-[#F5F4F8] font-bold tracking-tight">
            Academic foundation and study.
          </h2>
          <p className="font-sans text-[#AAA7B2] text-base max-w-xl leading-relaxed">
            Lộ trình học tập chính quy kết hợp tinh thần tự nghiên cứu cấu trúc dữ liệu, giải thuật và hệ thống máy tính.
          </p>
        </div>

        {/* Education Timeline */}
        {isAllPlaceholder ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark text-center space-y-4 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-xl bg-[#121218] border border-white/[0.08] flex items-center justify-center mx-auto text-[#B994FF]">
              <GraduationCap className="w-6 h-6 text-[#9B5CFF]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-[#F5F4F8]">
                Academic Studies &amp; Foundations
              </h3>
              <p className="text-sm text-[#AAA7B2] leading-relaxed font-sans max-w-lg mx-auto">
                Hồ sơ học vấn chính quy kết hợp lộ trình nghiên cứu các bộ môn khoa học máy tính và toán rời rạc sẽ được cập nhật đồng bộ từ hồ sơ xác thực.
              </p>
            </div>
            <div className="text-xs font-mono text-[#AAA7B2] bg-[#121218] px-3.5 py-1.5 rounded-lg inline-block border border-white/[0.06]">
              Status: Verified academic history will populate from source data
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {education.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark hover:border-[#9B5CFF]/40 transition-all space-y-4 text-left group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#121218] border border-white/[0.08] flex items-center justify-center text-[#9B5CFF]">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-[#F5F4F8] group-hover:text-[#B994FF] transition-colors">
                        {item.institution}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-[#B994FF]">
                        {item.program}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#AAA7B2] bg-[#121218] border border-white/[0.08] px-3 py-1 rounded-full self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-[#9B5CFF]" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {item.highlights && item.highlights.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-mono text-[#706D79] uppercase tracking-wider block">
                      Academic Focus &amp; Highlights:
                    </span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-sans text-[#AAA7B2]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#9B5CFF] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
