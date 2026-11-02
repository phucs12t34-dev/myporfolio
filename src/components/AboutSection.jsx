import React from 'react';
import { User, Quote, CheckCircle2, Compass, Sparkles } from 'lucide-react';
import NeuralCore from './visual/NeuralCore';

export default function AboutSection({ personal, facts, philosophy }) {
  return (
    <section id="about" className="py-24 relative z-10 border-t border-white/[0.08] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 text-left">
          <div className="section-stamp">
            <span>01 / ABOUT &amp; PHILOSOPHY</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl text-[#F5F4F8] font-bold tracking-tight">
            Rigour in logic, soul in craft.
          </h2>
          <p className="font-sans text-[#AAA7B2] text-base max-w-2xl leading-relaxed">
            Hành trình học tập và khám phá có hệ thống: kết hợp giữa nền tảng cấu trúc dữ liệu giải thuật chuẩn mực và tư duy kỹ nghệ phần mềm hiện đại.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Main Biography Spread (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-10 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark flex flex-col justify-between space-y-8 text-left">
            <div className="space-y-6">
              {/* Identity Badge */}
              <div className="flex items-center gap-4 border-b border-white/[0.06] pb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#121218] border border-white/[0.08] text-[#F5F4F8] flex items-center justify-center font-mono font-bold text-lg shadow-glow-purple">
                  {personal?.initials && !personal.initials.includes('[ADD') ? personal.initials : 'DEV'}
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-[#F5F4F8]">
                    {personal?.name && !personal.name.includes('[ADD') ? personal.name : "Student Developer"}
                  </h3>
                  <p className="text-xs font-mono text-[#B994FF] tracking-wider uppercase">
                    {personal?.role || "Software Engineering & Algorithm Learner"}
                  </p>
                </div>
              </div>

              {/* Biography Body */}
              <div className="space-y-4 font-sans text-[#AAA7B2] text-sm sm:text-base leading-relaxed">
                <p>
                  {personal?.longBio || (
                    "Tôi là một người học tập và phát triển phần mềm với định hướng chuyên sâu vào cấu trúc dữ liệu, giải thuật tối ưu (DSA C++ / Competitive Programming), các mô hình thị giác máy tính và ứng dụng IoT/Robotics thực tế."
                  )}
                </p>
                <p>
                  Tập trung vào tính chuẩn mực, khả năng kiểm thử chặt chẽ, tối ưu thời gian thực thi (O-notation) và tư duy kiến trúc hệ thống bền vững thay vì chỉ chạy theo công nghệ ngắn hạn.
                </p>
              </div>

              {/* Philosophy Quote */}
              <div className="p-4 rounded-xl bg-[#121218] border-l-2 border-[#9B5CFF] text-left">
                <p className="font-sans text-base italic text-[#F5F4F8]">
                  "{philosophy?.quote || "Viết code không chỉ để máy tính hiểu, mà để con người có thể đồng cảm và duy trì."}"
                </p>
                <span className="block mt-1 font-mono text-xs text-[#706D79]">
                  &mdash; Core Engineering Principle
                </span>
              </div>
            </div>

            {/* Core Values Stamp List */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#F5F4F8]">
                <CheckCircle2 className="w-4 h-4 text-[#9B5CFF]" />
                <span>Deterministic Rigour</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#F5F4F8]">
                <CheckCircle2 className="w-4 h-4 text-[#9B5CFF]" />
                <span>Futuristic Craft</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#F5F4F8]">
                <CheckCircle2 className="w-4 h-4 text-[#9B5CFF]" />
                <span>Empirical Verification</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#F5F4F8]">
                <CheckCircle2 className="w-4 h-4 text-[#9B5CFF]" />
                <span>Open Documentation</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Sculpture & Quick Facts (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between gap-6">
            {/* 3D Minimal Sculpture */}
            <NeuralCore className="w-full h-[280px] sm:h-[320px]" />

            {/* Compact Fact Matrix */}
            <div className="p-6 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="font-mono text-xs text-[#AAA7B2] uppercase tracking-wider">Fact Sheet</span>
                <span className="font-mono text-[10px] text-[#B994FF]">VERIFIED METADATA</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <span className="text-[#706D79]">Primary Language:</span>
                  <span className="text-[#F5F4F8] font-semibold">C++20 &amp; Python 3</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <span className="text-[#706D79]">Graphics Engine:</span>
                  <span className="text-[#F5F4F8] font-semibold">Three.js WebGL</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <span className="text-[#706D79]">Methodology:</span>
                  <span className="text-[#F5F4F8] font-semibold">CS97SI &amp; Clean Code</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#706D79]">Current Status:</span>
                  <span className="text-[#B994FF] font-semibold">Active Research</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
