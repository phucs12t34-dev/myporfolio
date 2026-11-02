import React from 'react';
import { GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';

export default function EducationSection({ education }) {
  const isAllPlaceholder = !education || education.length === 0 ||
    (education.length === 1 && education[0].institution?.includes('[ADD'));

  return (
    <section id="education" className="py-24 relative z-10 border-t border-[#D8D5CD] bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="editorial-stamp">
            <span>07 / EDUCATION &amp; ACADEMIA</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#171717] font-normal tracking-tight">
            Academic foundation and study.
          </h2>
          <p className="font-sans text-[#66645F] text-base max-w-xl leading-relaxed">
            Lộ trình học tập chính quy kết hợp tinh thần tự nghiên cứu cấu trúc dữ liệu, giải thuật và hệ thống máy tính.
          </p>
        </div>

        {/* Education Timeline or Dignified Placeholder */}
        {isAllPlaceholder ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#D8D5CD] shadow-editorial text-center space-y-4 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-xl bg-[#F0EEE8] border border-[#D8D5CD] flex items-center justify-center mx-auto text-[#171717]">
              <GraduationCap className="w-6 h-6 text-[#304FFE]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-editorial text-2xl font-bold text-[#171717]">
                Academic Studies &amp; Foundations
              </h3>
              <p className="text-sm text-[#66645F] leading-relaxed font-sans max-w-lg mx-auto">
                Hồ sơ học vấn chính quy kết hợp lộ trình nghiên cứu các bộ môn khoa học máy tính và toán rời rạc sẽ được cập nhật đồng bộ từ hồ sơ xác thực.
              </p>
            </div>
            <div className="text-xs font-mono text-[#66645F] bg-[#F7F5F0] px-3.5 py-1.5 rounded-lg inline-block border border-[#D8D5CD]">
              Status: Verified academic history will populate from source data
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {education.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#D8D5CD] shadow-editorial hover:border-[#171717] transition-all space-y-4 text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0EEE8] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#D8D5CD] flex items-center justify-center text-[#304FFE]">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-editorial text-2xl font-bold text-[#171717]">
                        {item.institution}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-[#304FFE]">
                        {item.program}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#66645F] bg-[#F7F5F0] border border-[#D8D5CD] px-3 py-1 rounded-full self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-[#304FFE]" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {item.highlights && item.highlights.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-mono text-[#8E8B83] uppercase tracking-wider block">
                      Academic Focus &amp; Highlights:
                    </span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-sans text-[#66645F]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#304FFE] shrink-0 mt-0.5" />
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
