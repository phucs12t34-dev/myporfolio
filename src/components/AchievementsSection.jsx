import React from 'react';
import { Trophy, Milestone, ExternalLink } from 'lucide-react';

export default function AchievementsSection({ achievements, placeholderText }) {
  const isAllPlaceholder = !achievements || achievements.length === 0 ||
    (achievements.length === 1 && achievements[0].title?.includes('[ADD'));

  return (
    <section id="achievements" className="py-24 relative z-10 border-t border-white/[0.08] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="section-stamp">
            <span>05 / MILESTONES &amp; RECOGNITION</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl text-[#F5F4F8] font-bold tracking-tight">
            Academic milestones &amp; challenges.
          </h2>
          <p className="font-sans text-[#AAA7B2] text-base max-w-xl leading-relaxed">
            Ghi nhận kết quả từ các kỳ thi thuật toán, lập trình thi đấu và triển lãm kỹ thuật thực tế.
          </p>
        </div>

        {/* Content Area */}
        {isAllPlaceholder ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark text-center space-y-4 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-xl bg-[#121218] border border-white/[0.08] flex items-center justify-center mx-auto text-[#B994FF]">
              <Milestone className="w-6 h-6 text-[#9B5CFF]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-[#F5F4F8]">
                Milestones in Progress
              </h3>
              <p className="text-sm text-[#AAA7B2] leading-relaxed font-sans max-w-lg mx-auto">
                {placeholderText || "Mỗi giải thuật tối ưu thành công và mỗi hệ thống hoạt động ổn định là một cột mốc kỹ thuật vững chắc. Danh mục sẽ cập nhật kết quả thi đấu chính thức."}
              </p>
            </div>
            <div className="text-xs font-mono text-[#AAA7B2] bg-[#121218] px-3.5 py-1.5 rounded-lg inline-block border border-white/[0.06]">
              Status: Verified records will populate from source data
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark hover:border-[#9B5CFF]/40 transition-all space-y-3 text-left group"
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div className="p-2 rounded-xl bg-[#121218] text-[#9B5CFF] border border-white/[0.08]">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs text-[#706D79]">
                    {item.date}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading text-xl font-bold text-[#F5F4F8] group-hover:text-[#B994FF] transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-[#B994FF]">
                    {item.organization}
                  </div>
                </div>

                <p className="text-xs font-sans text-[#AAA7B2] leading-relaxed">
                  {item.description}
                </p>

                {item.credentialUrl && (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#B994FF] hover:underline font-mono pt-2"
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
