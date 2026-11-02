import React, { useState } from 'react';
import { ExternalLink, BookOpen, ArrowUpRight, Box, CheckCircle2, Terminal } from 'lucide-react';
import ProjectPortal from './visual/ProjectPortal';

export default function ProjectsSection({ projects, categories, onOpenDetail, onOpenJournal }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const getBentoColSpan = (index, totalFiltered) => {
    if (activeCategory !== 'All' || totalFiltered <= 2) {
      return 'lg:col-span-6';
    }
    if (index === 0) return 'lg:col-span-8'; // Featured Project
    if (index === 1) return 'lg:col-span-4'; // Companion Project
    return 'lg:col-span-6';
  };

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-[#D8D5CD] bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D8D5CD] pb-8 text-left">
          <div className="space-y-3">
            <div className="editorial-stamp">
              <span>03 / SELECTED WORK</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl text-[#171717] font-normal tracking-tight">
              Engineering artifacts &amp; research journals.
            </h2>
            <p className="font-sans text-[#66645F] text-base max-w-xl leading-relaxed">
              Mỗi dự án đều tích hợp một hệ thống Nhật ký Phát triển (Development Journal) ghi lại quyết định kiến trúc (ADR), mã giải thuật và kết quả thực nghiệm.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white border border-[#D8D5CD] shadow-editorial-sm self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#171717] text-white shadow-sm font-semibold'
                    : 'text-[#66645F] hover:text-[#171717] hover:bg-[#F0EEE8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {filteredProjects.map((project, idx) => {
            const colSpan = getBentoColSpan(idx, filteredProjects.length);
            const isFeatured = idx === 0 && activeCategory === 'All';

            return (
              <div
                key={project.id}
                className={`${colSpan} p-6 sm:p-8 rounded-2xl bg-white border border-[#D8D5CD] shadow-editorial hover:border-[#171717] transition-all duration-300 flex flex-col justify-between space-y-6 text-left group`}
              >
                <div className="space-y-4">
                  {/* Card Meta Bar */}
                  <div className="flex items-center justify-between border-b border-[#F0EEE8] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#171717]">
                        NO. 0{idx + 1}
                      </span>
                      <span className="text-[#D8D5CD]">&bull;</span>
                      <span className="badge-editorial">{project.category}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#304FFE]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#304FFE]" />
                      <span>{project.status || 'Active'}</span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171717] group-hover:text-[#304FFE] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-[#8E8B83]">
                      {project.subtitle || project.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-sm text-[#66645F] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Companion 3D Visual Accent for Project 1 */}
                  {idx === 1 && (
                    <div className="py-2">
                      <ProjectPortal className="w-full h-[180px]" />
                    </div>
                  )}

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies?.slice(0, 5).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded bg-[#F7F5F0] border border-[#D8D5CD] text-[11px] font-mono text-[#171717]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-[#F0EEE8] flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => onOpenDetail(project)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#171717] hover:bg-[#304FFE] text-white text-xs font-medium transition-colors shadow-editorial-sm"
                  >
                    <span>Xem Chi tiết</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenJournal(project)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F7F5F0] hover:bg-[#F0EEE8] border border-[#D8D5CD] text-[#171717] text-xs font-mono transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#304FFE]" />
                    <span>Nhật ký ({project.journalEntries?.length || 4} Sessions)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
