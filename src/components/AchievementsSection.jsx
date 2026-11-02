import React from 'react';
import { Trophy, Milestone, ExternalLink } from 'lucide-react';

export default function AchievementsSection({ achievements, placeholderText }) {
  const isAllPlaceholder = !achievements || achievements.length === 0 ||
    (achievements.length === 1 && achievements[0].title?.includes('[ADD'));

  return (
    <section id="achievements" className="py-24 relative z-10 border-t border-[#D8D5CD] bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="editorial-stamp">
            <span>05 / MILESTONES &amp; RECOGNITION</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#171717] font-normal tracking-tight">
            Academic milestones &amp; challenges.
          </h2>
          <p className="font-sans text-[#66645F] text-base max-w-xl leading-relaxed">
            Ghi nhận kết quả từ các kỳ thi thuật toán, lập trình thi đấu và triển lãm kỹ thuật thực tế.
          </p>
        </div>

        {/* Content Area */}
        {isAllPlaceholder ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#D8D5CD] shadow-editorial text-center space-y-4 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-xl bg-[#F0EEE8] border border-[#D8D5CD] flex items-center justify-center mx-auto text-[#171717]">
              <Milestone className="w-6 h-6 text-[#304FFE]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-editorial text-2xl font-bold text-[#171717]">
                Milestones in Progress
              </h3>
              <p className="text-sm text-[#66645F] leading-relaxed font-sans max-w-lg mx-auto">
                {placeholderText || "Mỗi giải thuật tối ưu thành công và mỗi hệ thống hoạt động ổn định là một cột mốc kỹ thuật vững chắc. Danh mục sẽ cập nhật kết quả thi đấu chính thức."}
              </p>
            </div>
            <div className="text-xs font-mono text-[#66645F] bg-[#F7F5F0] px-3.5 py-1.5 rounded-lg inline-block border border-[#D8D5CD]">
              Status: Verified records will populate from source data
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#D8D5CD] shadow-editorial hover:border-[#171717] transition-all space-y-3 text-left"
              >
                <div className="flex items-center justify-between border-b border-[#F0EEE8] pb-3">
                  <div className="p-2 rounded-lg bg-[#F7F5F0] text-[#304FFE] border border-[#D8D5CD]">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs text-[#8E8B83]">
                    {item.date}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-editorial text-xl font-bold text-[#171717]">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-[#304FFE]">
                    {item.organization}
                  </div>
                </div>

                <p className="text-xs font-sans text-[#66645F] leading-relaxed">
                  {item.description}
                </p>

                {item.credentialUrl && (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#304FFE] hover:underline font-mono pt-2"
                  >
                    <span>Xem chứng thực</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
