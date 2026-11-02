import React, { useState } from 'react';
import { ArrowDown, ChevronRight, Terminal as TerminalIcon, Sparkles, Box, FileText, MapPin } from 'lucide-react';
import HeroTerminal from './HeroTerminal';
import EditorialSculpture from './visual/EditorialSculpture';

export default function HeroSection({ personal, heroTerminal }) {
  const [activeVisual, setActiveVisual] = useState('sculpture'); // 'sculpture' | 'terminal'

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Statement, Metadata & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Editorial Volume & Status Stamp */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#D8D5CD] text-[#171717] text-xs font-mono tracking-wide shadow-editorial-sm">
              <span className="w-2 h-2 rounded-full bg-[#304FFE] animate-pulse" />
              <span className="font-semibold text-[11px] sm:text-xs tracking-wider">
                {personal?.statusBadge || "ASPIRING SOFTWARE ENGINEER"}
              </span>
              <span className="text-[#D8D5CD]">/</span>
              <span className="text-[#66645F] font-sans flex items-center gap-1 text-[11px] sm:text-xs">
                <MapPin className="w-3 h-3 text-[#304FFE]" /> {personal?.location || "Vietnam"}
              </span>
            </div>

            {/* Main Editorial Headline with Serif Pairing */}
            <div className="space-y-3">
              <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#171717] leading-[1.08]">
                Designing and building things that make{' '}
                <span className="italic font-normal text-[#304FFE]">
                  technology
                </span>{' '}
                feel human.
              </h1>
            </div>

            {/* Short Introduction Paragraph */}
            <p className="font-sans text-base sm:text-lg text-[#66645F] max-w-2xl leading-relaxed">
              {personal?.shortBio || (
                "Tôi là một lập trình viên học tập và phát triển phần mềm với định hướng chuyên sâu vào cấu trúc dữ liệu, giải thuật tối ưu (DSA C++ / Competitive Programming), đồ họa tương tác 3D và thị giác máy tính."
              )}
            </p>

            {/* Monospace Editorial Tags */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-white border border-[#D8D5CD] text-[#171717] hover:border-[#304FFE] transition-colors">
                #01 C++ DSA / CP
              </span>
              <span className="px-2.5 py-1 rounded bg-white border border-[#D8D5CD] text-[#304FFE] hover:border-[#304FFE] transition-colors">
                #02 Interactive Web3D
              </span>
              <span className="px-2.5 py-1 rounded bg-white border border-[#D8D5CD] text-[#171717] hover:border-[#304FFE] transition-colors">
                #03 System Architecture
              </span>
              <span className="px-2.5 py-1 rounded bg-white border border-[#D8D5CD] text-[#66645F] hover:border-[#304FFE] transition-colors">
                #04 Engineering Journal
              </span>
            </div>

            {/* Call To Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#171717] hover:bg-[#304FFE] text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-editorial hover:-translate-y-0.5"
              >
                <span>Khám phá Dự án</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F0EEE8] text-[#171717] font-medium text-xs sm:text-sm border border-[#D8D5CD] transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Về bản thân</span>
              </a>

              {/* CV Button */}
              {personal?.cvAvailable ? (
                <a
                  href={personal.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white hover:bg-[#F0EEE8] text-[#66645F] hover:text-[#171717] text-xs font-mono border border-[#D8D5CD] transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#304FFE]" />
                  <span>Tải CV</span>
                </a>
              ) : (
                <div
                  className="inline-flex items-center gap-1.5 px-3.5 py-3.5 rounded-xl bg-white/70 border border-[#D8D5CD] text-[#8E8B83] text-xs font-mono cursor-not-allowed"
                  title="CV đang trong quá trình cập nhật hồ sơ năng lực"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>CV: Đang cập nhật</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Visual Centerpiece (Sculpture vs Terminal) (5 cols) */}
          <div className="lg:col-span-5 w-full flex flex-col items-center">
            {/* Visual View Switcher */}
            <div className="w-full max-w-xl mb-3 flex items-center justify-between p-1 rounded-xl bg-white border border-[#D8D5CD] shadow-editorial-sm">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveVisual('sculpture')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeVisual === 'sculpture'
                      ? 'bg-[#171717] text-white shadow-sm font-semibold'
                      : 'text-[#66645F] hover:text-[#171717]'
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-[#304FFE]" />
                  <span>3D Sculpture (FIG. 01)</span>
                </button>

                <button
                  onClick={() => setActiveVisual('terminal')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeVisual === 'terminal'
                      ? 'bg-[#171717] text-white shadow-sm font-semibold'
                      : 'text-[#66645F] hover:text-[#171717]'
                  }`}
                >
                  <TerminalIcon className="w-3.5 h-3.5 text-[#304FFE]" />
                  <span>Terminal (~/workspace)</span>
                </button>
              </div>

              <span className="text-[10px] font-mono text-[#8E8B83] pr-2 hidden sm:block">
                {activeVisual === 'sculpture' ? 'Interactive 3D Art' : 'Interactive CLI'}
              </span>
            </div>

            {/* Main Centerpiece Component */}
            <div className="w-full max-w-xl">
              {activeVisual === 'sculpture' ? (
                <EditorialSculpture className="w-full h-[460px] sm:h-[500px]" />
              ) : (
                <HeroTerminal terminalData={heroTerminal} />
              )}
            </div>
          </div>
        </div>

        {/* Editorial Scroll Indicator */}
        <div className="mt-14 sm:mt-18 flex justify-center">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-[#66645F] hover:text-[#304FFE] transition-colors group"
            aria-label="Cuộn xuống để xem thêm"
          >
            <span className="font-mono text-[11px] tracking-wider uppercase group-hover:text-[#171717]">
              Cuộn để khám phá
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#304FFE]" />
          </a>
        </div>
      </div>
    </section>
  );
}
