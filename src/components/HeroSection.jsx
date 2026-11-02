import React from 'react';
import { ArrowDown, ChevronRight, Terminal as TerminalIcon, Sparkles, FileText, MapPin } from 'lucide-react';
import HeroTerminal from './HeroTerminal';

export default function HeroSection({ personal, heroTerminal }) {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Asymmetric Bento Identity & Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0B0B0F] border border-white/[0.08] text-[#F5F4F8] text-xs font-mono tracking-wide shadow-card-dark">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9B5CFF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9B5CFF]" />
              </span>
              <span className="font-semibold text-[11px] sm:text-xs tracking-wider text-[#B994FF]">
                {personal?.statusBadge || "AVAILABLE FOR RESEARCH & ENGINEERING"}
              </span>
              <span className="text-[#3A3845]">/</span>
              <span className="text-[#AAA7B2] font-sans flex items-center gap-1 text-[11px] sm:text-xs">
                <MapPin className="w-3 h-3 text-[#9B5CFF]" /> {personal?.location || "Vietnam"}
              </span>
            </div>

            {/* Main Heading with Space Grotesk */}
            <div className="space-y-3">
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F4F8] leading-[1.08]">
                Building ideas into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B5CFF] via-[#B994FF] to-[#4169FF]">
                  meaningful digital
                </span>{' '}
                experiences.
              </h1>
            </div>

            {/* Supporting Bio */}
            <p className="font-sans text-base sm:text-lg text-[#AAA7B2] max-w-2xl leading-relaxed">
              {personal?.shortBio || (
                "Tôi là một lập trình viên học tập và phát triển phần mềm với định hướng chuyên sâu vào cấu trúc dữ liệu, giải thuật tối ưu (DSA C++ / Competitive Programming), kiến trúc phần mềm và các hệ thống nhúng thông minh."
              )}
            </p>

            {/* Technical Tags */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-[#121218] border border-white/[0.08] text-[#AAA7B2] hover:border-[#9B5CFF]/40 hover:text-[#F5F4F8] transition-colors">
                #01 C++20 DSA / CP
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#121218] border border-white/[0.08] text-[#B994FF] hover:border-[#9B5CFF]/40 transition-colors">
                #02 Robotics &amp; Embedded
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#121218] border border-white/[0.08] text-[#AAA7B2] hover:border-[#9B5CFF]/40 hover:text-[#F5F4F8] transition-colors">
                #03 Software Architecture
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#121218] border border-white/[0.08] text-[#706D79] hover:border-[#9B5CFF]/40 hover:text-[#AAA7B2] transition-colors">
                #04 Engineering Journal
              </span>
            </div>

            {/* Call To Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#9B5CFF] hover:bg-[#8545EA] text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-glow-purple hover:-translate-y-0.5"
              >
                <span>Khám phá Dự án</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#121218] hover:bg-[#1A1A24] text-[#F5F4F8] font-medium text-xs sm:text-sm border border-white/[0.08] hover:border-[#9B5CFF]/40 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Về bản thân</span>
              </a>

              {/* CV Button */}
              {personal?.cvAvailable ? (
                <a
                  href={personal.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-[#121218] hover:bg-[#1A1A24] text-[#AAA7B2] hover:text-[#F5F4F8] text-xs font-mono border border-white/[0.08] hover:border-[#9B5CFF]/40 transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#9B5CFF]" />
                  <span>Tải CV</span>
                </a>
              ) : (
                <div
                  className="inline-flex items-center gap-1.5 px-3.5 py-3.5 rounded-xl bg-[#0B0B0F]/70 border border-white/[0.06] text-[#706D79] text-xs font-mono cursor-not-allowed"
                  title="CV đang trong quá trình cập nhật hồ sơ năng lực"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>CV: Đang cập nhật</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Terminal Centerpiece (5 cols) */}
          <div className="lg:col-span-5 w-full flex flex-col items-center">
            {/* Terminal Top Info Header */}
            <div className="w-full max-w-xl mb-3 flex items-center justify-between px-3 py-2 rounded-xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark">
              <div className="flex items-center gap-2 font-mono text-xs text-[#AAA7B2]">
                <TerminalIcon className="w-3.5 h-3.5 text-[#9B5CFF]" />
                <span className="text-[#F5F4F8] font-semibold">Interactive Shell</span>
                <span className="text-[#3A3845]">/</span>
                <span className="text-[#706D79] text-[11px]">zsh - 80x24</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#121218] text-[#B994FF] border border-white/[0.06]">
                LIVE CLI
              </span>
            </div>

            {/* Main Terminal Window */}
            <div className="w-full max-w-xl">
              <HeroTerminal terminalData={heroTerminal} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-16 flex justify-center">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-[#706D79] hover:text-[#B994FF] transition-colors"
            aria-label="Cuộn xuống phần Giới thiệu"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase">Cuộn để khám phá</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
