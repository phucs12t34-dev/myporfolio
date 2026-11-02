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
          ? 'bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#D8D5CD] py-3 shadow-editorial-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Editorial Logo / Swiss Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-3 group"
            aria-label="Về trang chủ"
          >
            <div className="w-9 h-9 rounded-lg bg-[#171717] text-[#F7F5F0] flex items-center justify-center font-mono font-bold text-xs tracking-wider group-hover:bg-[#304FFE] transition-colors shadow-editorial-sm">
              {initials}
            </div>
            <div className="flex flex-col text-left">
              <span className="font-editorial text-lg text-[#171717] font-semibold leading-tight group-hover:text-[#304FFE] transition-colors">
                {displayName}
              </span>
              <span className="font-mono text-[10px] text-[#66645F] tracking-widest uppercase">
                VOL. 26 &bull; EDITORIAL
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
                      ? 'text-[#304FFE] font-semibold'
                      : 'text-[#66645F] hover:text-[#171717]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#304FFE] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Status & Contact Link */}
          <div className="hidden md:flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0EEE8] border border-[#D8D5CD] text-[10px] font-mono text-[#66645F]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#304FFE] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#304FFE]" />
              </span>
              <span>OPEN TO COLLABORATION</span>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#171717] hover:bg-[#304FFE] text-white text-xs font-medium tracking-wide transition-all duration-200 shadow-editorial-sm hover:-translate-y-0.5"
            >
              <span>Liên hệ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#F0EEE8] border border-[#D8D5CD] text-[#171717] hover:text-[#304FFE]"
              aria-label="Mở menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F5F0] border-b border-[#D8D5CD] px-6 py-6 shadow-editorial-lg animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-editorial text-2xl text-[#171717] hover:text-[#304FFE] transition-colors border-b border-[#E7E4DC] pb-2 text-left"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex justify-center items-center gap-2 py-3 rounded-lg bg-[#171717] text-white font-medium text-sm"
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
