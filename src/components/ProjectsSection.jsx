import React, { useState, useMemo } from 'react';
import { ExternalLink, BookOpen, ArrowUpRight, Box, CheckCircle2, Search, X } from 'lucide-react';
import ProjectPortal from './visual/ProjectPortal';

export default function ProjectsSection({ projects, categories, onOpenDetail, onOpenJournal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchCat;

      const matchText =
        p.title?.toLowerCase().includes(query) ||
        p.subtitle?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.technologies?.some(t => t.toLowerCase().includes(query));

      return matchCat && matchText;
    });
  }, [projects, activeCategory, searchQuery]);

  const getBentoColSpan = (index, totalFiltered) => {
    if (activeCategory !== 'All' || searchQuery.trim() || totalFiltered <= 2) {
      return 'lg:col-span-6';
    }
    if (index === 0) return 'lg:col-span-8'; // Featured Project
    if (index === 1) return 'lg:col-span-4'; // Companion Project
    return 'lg:col-span-6';
  };

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-white/[0.08] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8 text-left">
          <div className="space-y-3">
            <div className="section-stamp">
              <span>03 / SELECTED WORK</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl text-[#F5F4F8] font-bold tracking-tight">
              Engineering artifacts &amp; research journals.
            </h2>
            <p className="font-sans text-[#AAA7B2] text-base max-w-xl leading-relaxed">
              Mỗi dự án tích hợp một hệ thống Nhật ký Phát triển (Two-Level Engineering Journal) ghi lại quyết định kiến trúc (ADR), mã giải thuật, ma trận kiểm thử và phân tích thực nghiệm.
            </p>
          </div>

          {/* Search Bar + Clear Button */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#706D79] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm dự án, công nghệ..."
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-[#0B0B0F] border border-white/[0.08] text-xs font-mono text-[#F5F4F8] placeholder:text-[#706D79] outline-none focus:border-[#9B5CFF]/60 transition-colors shadow-card-dark"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#706D79] hover:text-[#F5F4F8]"
                aria-label="Xóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-[#9B5CFF] text-white border-[#9B5CFF] shadow-glow-purple font-semibold'
                  : 'bg-[#0B0B0F] text-[#AAA7B2] border-white/[0.08] hover:text-[#F5F4F8] hover:border-white/[0.2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] text-center space-y-3">
            <p className="font-mono text-sm text-[#AAA7B2]">
              Không tìm thấy dự án nào khớp với từ khóa "{searchQuery}".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="px-4 py-2 rounded-lg bg-[#121218] border border-white/[0.08] text-xs font-mono text-[#9B5CFF] hover:bg-[#1A1A24]"
            >
              Xóa bộ lọc &amp; xem tất cả
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {filteredProjects.map((project, idx) => {
              const colSpan = getBentoColSpan(idx, filteredProjects.length);
              const isFirstFeatured = idx === 0 && activeCategory === 'All' && !searchQuery.trim();

              return (
                <div
                  key={project.id}
                  className={`${colSpan} p-6 sm:p-8 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark hover:border-[#9B5CFF]/40 transition-all duration-300 flex flex-col justify-between space-y-6 text-left group`}
                >
                  <div className="space-y-4">
                    {/* Card Meta Bar */}
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-[#F5F4F8]">
                          NO. 0{idx + 1}
                        </span>
                        <span className="text-[#3A3845]">&bull;</span>
                        <span className="badge-dark">{project.category}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#B994FF]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9B5CFF] animate-pulse" />
                        <span>{project.status || 'Active'}</span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div className="space-y-1">
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F5F4F8] group-hover:text-[#B994FF] transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs text-[#706D79]">
                        {project.subtitle || project.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-sm text-[#AAA7B2] leading-relaxed line-clamp-3">
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
                          className="px-2.5 py-0.5 rounded-md bg-[#121218] border border-white/[0.06] text-[11px] font-mono text-[#AAA7B2]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => onOpenDetail(project)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9B5CFF] hover:bg-[#8545EA] text-white text-xs font-medium transition-colors shadow-glow-purple"
                    >
                      <span>Xem Chi tiết</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenJournal(project)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#121218] hover:bg-[#1A1A24] border border-white/[0.08] text-[#F5F4F8] text-xs font-mono transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#9B5CFF]" />
                      <span>Nhật ký ({project.journal?.length || 4} Sessions)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
