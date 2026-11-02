import React from 'react';
import { Code2, Cpu, Wrench, Layers, Terminal, Sparkles, Binary, Gauge, Zap } from 'lucide-react';

export default function SkillsSection({ skills }) {
  const categories = [
    {
      title: "01 / Languages & Algorithmic Rigour",
      desc: "Nền tảng tư duy cấu trúc, giải thuật tối ưu và lập trình thi đấu (Competitive Programming).",
      items: [
        { name: "C++20 / STL", category: "Core Language", detail: "Segment Tree, Fenwick, DSU, Dijkstra, Dinic Max Flow, CS97SI constraints" },
        { name: "Python 3.12", category: "Scripting & AI", detail: "Data analysis, NumPy, OpenCV, automation scripts" },
        { name: "C / Embedded", category: "Systems", detail: "Memory management, pointers, registers, low-level I/O" },
      ]
    },
    {
      title: "02 / Systems, Fullstack & Interface",
      desc: "Kiến trúc hệ thống, giao diện hiện đại và các luồng tích hợp dữ liệu thời gian thực.",
      items: [
        { name: "React 18 & Vite", category: "Frontend Core", detail: "Component lifecycles, state management, modular architecture" },
        { name: "Tailwind CSS", category: "Design System", detail: "Futuristic dark aesthetic, typography scales, responsive bento grids" },
        { name: "Node.js / REST APIs", category: "Networking", detail: "Asynchronous I/O, IPC protocols, real-time telemetry streaming" },
      ]
    },
    {
      title: "03 / Engineering & Methodology",
      desc: "Phương pháp kiểm thử, quản lý phiên bản và tư duy nghiên cứu thực nghiệm.",
      items: [
        { name: "Git & GitHub", category: "VCS", detail: "Branching strategies, semantic commits, PR review workflows" },
        { name: "Linux / POSIX", category: "Environment", detail: "Shell scripting, GCC/Clang tooling, CMake builds" },
        { name: "Empirical Testing", category: "Quality", detail: "Time & space complexity verification, corner-case auditing" },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 relative z-10 border-t border-white/[0.08] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8 text-left">
          <div className="space-y-3">
            <div className="section-stamp">
              <span>02 / TECHNICAL INDEX</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl text-[#F5F4F8] font-bold tracking-tight">
              Tools, paradigms, and foundations.
            </h2>
            <p className="font-sans text-[#AAA7B2] text-base max-w-xl leading-relaxed">
              Danh mục công nghệ và nền tảng kỹ thuật được rèn luyện thông qua các bài toán thực nghiệm và dự án thực tế.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="badge-dark">HONEST ASSESSMENT</span>
            <span className="badge-purple">NO FABRICATED %</span>
          </div>
        </div>

        {/* 3-Column Grid + Complexity Benchmark Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main 3 Categories (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F4F8]">
                    {cat.title}
                  </h3>
                  <span className="font-mono text-xs text-[#706D79]">INDEX {idx + 1}.0</span>
                </div>
                <p className="font-sans text-xs text-[#AAA7B2]">{cat.desc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {cat.items.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-4 rounded-xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark hover:border-[#9B5CFF]/40 transition-all duration-200 text-left flex flex-col justify-between space-y-2 group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[10px] text-[#B994FF] uppercase font-semibold">
                            {skill.category}
                          </span>
                        </div>
                        <h4 className="font-heading text-base sm:text-lg font-bold text-[#F5F4F8] group-hover:text-[#B994FF] transition-colors">
                          {skill.name}
                        </h4>
                      </div>
                      <p className="font-sans text-xs text-[#AAA7B2] leading-relaxed">
                        {skill.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Algorithmic Complexity Card & Standard (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Complexity Benchmark Card */}
            <div className="p-6 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark space-y-5 text-left">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-[#9B5CFF]" />
                  <span className="font-mono text-xs text-[#F5F4F8] font-bold uppercase tracking-wider">
                    Complexity Index
                  </span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#121218] text-[#B994FF] border border-white/[0.06]">
                  BENCHMARK
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center p-2 rounded-lg bg-[#121218] border border-white/[0.04]">
                  <span className="text-[#AAA7B2]">Segment Tree / BIT:</span>
                  <span className="text-[#B994FF] font-semibold">O(log N) Query</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-[#121218] border border-white/[0.04]">
                  <span className="text-[#AAA7B2]">Dijkstra + Priority Queue:</span>
                  <span className="text-[#B994FF] font-semibold">O(E log V)</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-[#121218] border border-white/[0.04]">
                  <span className="text-[#AAA7B2]">Disjoint Set Union (DSU):</span>
                  <span className="text-[#B994FF] font-semibold">O(α(N)) ≈ O(1)</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-[#121218] border border-white/[0.04]">
                  <span className="text-[#AAA7B2]">Fast I/O Buffer:</span>
                  <span className="text-[#B994FF] font-semibold">&gt; 3x Speedup</span>
                </div>
              </div>
            </div>

            {/* Standard Checklist */}
            <div className="p-6 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark space-y-4 text-left">
              <span className="font-mono text-xs text-[#AAA7B2] uppercase tracking-wider block border-b border-white/[0.06] pb-2">
                Engineering Standard
              </span>
              <ul className="space-y-2.5 font-mono text-xs text-[#F5F4F8]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B5CFF]" />
                  <span>Stanford CS97SI Time Limits</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B5CFF]" />
                  <span>C++ Modern STL Mastery</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B5CFF]" />
                  <span>Zero Memory Leak Discipline</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B5CFF]" />
                  <span>Deterministic Unit Testing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
