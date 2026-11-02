import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Code2 } from 'lucide-react';

export default function Navbar({ personal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '01. About', href: '#about', id: 'about' },
    { label: '02. Skills', href: '#skills', id: 'skills' },
    { label: '03. Projects', href: '#projects', id: 'projects' },
    { label: '04. Contact', href: '#contact', id: 'contact' },
  ];

  const displayName = personal?.name && !personal.name.includes('[ADD') ? personal.name : 'Portfolio';
  const initials = personal?.initials && !personal.initials.includes('[ADD') ? personal.initials : 'DEV';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/[0.08] py-3 shadow-[0_4px_24px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Futuristic Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-3 group"
            aria-label="Về trang chủ"
          >
            <div className="w-9 h-9 rounded-xl bg-[#121218] border border-white/[0.08] text-[#F5F4F8] flex items-center justify-center font-mono font-bold text-xs tracking-wider group-hover:border-[#9B5CFF]/60 group-hover:shadow-glow-purple transition-all duration-200">
              {initials}
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading text-lg text-[#F5F4F8] font-bold leading-tight group-hover:text-[#B994FF] transition-colors">
                {displayName}
              </span>
              <span className="font-mono text-[10px] text-[#706D79] tracking-widest uppercase">
                ENGINEERING WORKSPACE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-xs font-mono uppercase tracking-wider transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#B994FF] font-semibold'
                      : 'text-[#AAA7B2] hover:text-[#F5F4F8]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9B5CFF] rounded-full shadow-glow-purple" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Status & Contact Link */}
          <div className="hidden md:flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0B0F] border border-white/[0.08] text-[10px] font-mono text-[#AAA7B2]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9B5CFF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9B5CFF]" />
              </span>
              <span>AVAILABLE FOR COLLABORATION</span>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9B5CFF] hover:bg-[#8545EA] text-white text-xs font-medium tracking-wide transition-all duration-200 shadow-glow-purple hover:-translate-y-0.5"
            >
              <span>Liên hệ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#0B0B0F] border border-white/[0.08] text-[#F5F4F8] hover:text-[#9B5CFF]"
              aria-label="Mở menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09090C] border-b border-white/[0.08] px-6 py-6 shadow-[0_16px_48px_rgba(0,0,0,0.9)] animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-heading text-xl text-[#F5F4F8] hover:text-[#B994FF] transition-colors border-b border-white/[0.06] pb-2 text-left"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex justify-center items-center gap-2 py-3 rounded-xl bg-[#9B5CFF] text-white font-medium text-sm shadow-glow-purple"
              >
                <span>Liên hệ</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
