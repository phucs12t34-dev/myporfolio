import React, { useState, useEffect, useRef } from 'react';
import { PROFILE_DATA } from '../data/profile';
import { Volume2, VolumeX, Menu, X, Terminal, Radio } from 'lucide-react';

/**
 * CYBER NAVBAR
 * Featuring: Live night clock, interactive Lo-Fi synthesizer boombox player
 * using pure Web Audio API (zero audio file dependencies), and smooth section navigation.
 */
export default function CyberNavbar() {
  const { identity } = PROFILE_DATA;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clock, setClock] = useState('');
  
  // Web Audio API Synthesizer Refs
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  // Digital Cyber Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      setClock(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Web Audio Synth Lo-Fi Beat Engine
  const startLoFiBeat = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Chill 808-style Lo-Fi Bass & High-hat loop
      let step = 0;
      const notes = [65.41, 65.41, 77.78, 87.31, 58.27, 58.27, 65.41, 73.42]; // C2, Eb2, F2, Bb1...

      const interval = setInterval(() => {
        if (!ctx || ctx.state === 'closed') return;
        const now = ctx.currentTime;

        // 1. Kick / Sub 808 Bass
        if (step % 2 === 0) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const freq = notes[Math.floor(step / 2) % notes.length];
          osc.frequency.setValueAtTime(freq * 1.5, now);
          osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.35);

          gain.gain.setValueAtTime(0.22, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.36);
        }

        // 2. Crisp Hi-hat tick
        const bufferSize = ctx.sampleRate * 0.04;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 7500;

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(step % 4 === 2 ? 0.08 : 0.03, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        noise.start(now);

        step = (step + 1) % 16;
      }, 240); // ~125 BPM 8th notes

      timerRef.current = interval;
      setIsPlaying(true);
    } catch (e) {
      console.warn("Web Audio not supported or blocked by user gesture:", e);
    }
  };

  const stopLoFiBeat = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleBeat = () => {
    if (isPlaying) {
      stopLoFiBeat();
    } else {
      startLoFiBeat();
    }
  };

  useEffect(() => {
    return () => stopLoFiBeat();
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#07080F]/90 backdrop-blur-md border-b border-[#00F0FF]/25">
      {/* Top Status Barcode Line */}
      <div className="hidden sm:flex items-center justify-between px-6 py-1 bg-[#0B0D18] border-b border-white/5 font-mono text-[11px] text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#CCFF00]">
            <Radio className="w-3 h-3 animate-pulse" />
            NIGHT RADAR
          </span>
          <span>SYS_CLOCK: <strong className="text-white">{clock || "00:00:00"}</strong></span>
          <span className="text-slate-500">|</span>
          <span className="text-[#00F0FF]">FAST_IO // O(N LOG N) READY</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="tracking-widest opacity-60">||| || | ||| |||| | ||</span>
          <span className="text-[#FF0055] font-bold">VN_ZONE 0x7F</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* Brand / Name Tag */}
        <a href="#about" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#121524] border-2 border-[#00F0FF] group-hover:border-[#FF0055] transition-colors flex items-center justify-center relative overflow-hidden">
            <span className="font-bebas text-lg text-white">P</span>
            <span className="text-[10px] font-mono font-bold text-[#CCFF00]">28</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bebas text-xl sm:text-2xl tracking-wider text-white">
                {identity.nickname || "PHÚC"}<span className="text-[#00F0FF]">.DEV</span>
              </span>
              <span className="text-[9px] bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 px-1.5 py-0.5 font-mono font-bold uppercase">
                CYBER
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 tracking-tight -mt-1 hidden sm:block">
              {identity.tagline}
            </div>
          </div>
        </a>

        {/* Navigation Anchors */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#10121C] border border-white/10 p-1">
          <a href="#about" className="px-3 py-1.5 text-xs font-mono font-bold text-slate-300 hover:text-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors">
            // BẢN THÂN
          </a>
          <a href="#manifesto" className="px-3 py-1.5 text-xs font-mono font-bold text-slate-300 hover:text-[#FF0055] hover:bg-[#FF0055]/10 transition-colors">
            // CÁ TÍNH
          </a>
          <a href="#hobbies" className="px-3 py-1.5 text-xs font-mono font-bold text-slate-300 hover:text-[#CCFF00] hover:bg-[#CCFF00]/10 transition-colors">
            // SỞ THÍCH
          </a>
          <a href="#arsenal" className="px-3 py-1.5 text-xs font-mono font-bold text-slate-300 hover:text-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors">
            // KỸ NĂNG
          </a>
          <a href="#contact" className="px-3 py-1.5 text-xs font-mono font-bold text-slate-300 hover:text-[#FF0055] hover:bg-[#FF0055]/10 transition-colors">
            // KẾT NỐI
          </a>
        </nav>

        {/* Boombox Audio Synthesizer Button */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleBeat}
            title={isPlaying ? "Tắt beat Synthesizer" : "Bật beat Lo-Fi 808"}
            className={`flex items-center gap-2.5 px-3 py-2 border transition-all ${
              isPlaying 
                ? 'bg-[#FF0055]/20 border-[#FF0055] text-[#FF0055] shadow-[0_0_15px_rgba(255,0,85,0.4)]' 
                : 'bg-[#131624] border-[#00F0FF]/40 text-[#00F0FF] hover:border-[#00F0FF] hover:bg-[#00F0FF]/10'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 animate-bounce" />
                <div className="flex items-end gap-0.5 h-3.5">
                  <span className="w-1 bg-[#FF0055] h-full animate-[pulse_0.4s_infinite]" />
                  <span className="w-1 bg-[#CCFF00] h-2/3 animate-[pulse_0.6s_infinite]" />
                  <span className="w-1 bg-[#00F0FF] h-full animate-[pulse_0.5s_infinite]" />
                </div>
                <span className="font-mono text-xs font-black tracking-wider hidden sm:inline">
                  LO-FI PLAYING
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="font-mono text-xs font-black tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                  BOOMBOX BEAT
                </span>
              </>
            )}
          </button>

          <a 
            href="#contact"
            className="px-4 py-2 bg-[#CCFF00] hover:bg-white text-[#07080F] font-bebas text-lg tracking-wider transition-all font-black shadow-[0_0_15px_rgba(204,255,0,0.4)] hidden sm:block"
          >
            HIT ME UP
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 bg-[#121524] border border-white/20 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0C16] border-b border-[#00F0FF]/30 px-6 py-4 space-y-3 font-mono text-sm">
          <a 
            href="#about" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-slate-300 hover:text-[#00F0FF]"
          >
            // BẢN THÂN
          </a>
          <a 
            href="#manifesto" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-slate-300 hover:text-[#FF0055]"
          >
            // CÁ TÍNH
          </a>
          <a 
            href="#hobbies" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-slate-300 hover:text-[#CCFF00]"
          >
            // SỞ THÍCH
          </a>
          <a 
            href="#arsenal" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-slate-300 hover:text-[#00F0FF]"
          >
            // KỸ NĂNG
          </a>
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-slate-300 hover:text-[#FF0055]"
          >
            // KẾT NỐI
          </a>
        </div>
      )}
    </header>
  );
}
