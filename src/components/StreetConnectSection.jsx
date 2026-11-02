import React, { useState } from 'react';
import { PROFILE_DATA } from '../data/profile';
import { Send, Check, Mail, MessageSquare, Terminal } from 'lucide-react';
import { GithubIcon, CodeforcesIcon, FacebookIcon, DiscordIcon } from './Icons';

/**
 * CONNECT & SOCIAL SECTION
 * Clean mailbox form, social links, and comfortable text spacing.
 */
export default function StreetConnectSection() {
  const { identity, socials } = PROFILE_DATA;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSent(false);
    }, 4500);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 border-t border-[#00F0FF]/20 bg-[#07080F]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-white/10 pb-6">
          <div>
            <div className="font-mono text-xs font-bold text-[#00F0FF] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00F0FF] inline-block" />
              // SECTION 05: CONNECT & TRANSMISSION
            </div>
            <h2 className="font-bebas text-5xl sm:text-7xl text-white tracking-wide mt-1">
              KẾT NỐI & <span className="text-[#00F0FF]">GIAO LƯU</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-slate-400 max-w-sm">
            "Có bài tập khó, muốn rủ leo rank game, hay cùng gu nghe nhạc? Cứ drop tin nhắn lại đây."
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Direct Social Links & Info Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="cyber-card p-6 border-l-4 border-l-[#CCFF00]">
              <span className="font-mono text-xs text-[#CCFF00] font-bold uppercase block mb-1">
                // PROFILE INFO
              </span>
              <h3 className="font-bebas text-3xl text-white">
                {identity.name}
              </h3>
              <p className="font-mono text-xs text-slate-400 mt-1">
                {identity.school} · {identity.location}
              </p>

              {/* Slogan Reminder */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <span className="font-marker text-lg text-[#00F0FF] block">
                  "{identity.slogan}"
                </span>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a 
                href={socials.github} 
                target="_blank" 
                rel="noreferrer"
                className="p-4 bg-[#10121C] border border-white/10 hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 text-slate-300 hover:text-white transition-all flex items-center gap-3 group"
              >
                <GithubIcon className="w-5 h-5 text-[#00F0FF] group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bebas text-lg leading-none">GITHUB</div>
                  <div className="font-mono text-[10px] text-slate-500">@{identity.handle}</div>
                </div>
              </a>

              <a 
                href={socials.codeforces} 
                target="_blank" 
                rel="noreferrer"
                className="p-4 bg-[#10121C] border border-white/10 hover:border-[#FF0055] hover:bg-[#FF0055]/10 text-slate-300 hover:text-white transition-all flex items-center gap-3 group"
              >
                <CodeforcesIcon className="w-5 h-5 text-[#FF0055] group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bebas text-lg leading-none">CODEFORCES</div>
                  <div className="font-mono text-[10px] text-slate-500">Competitive CP</div>
                </div>
              </a>

              <a 
                href={socials.facebook} 
                target="_blank" 
                rel="noreferrer"
                className="p-4 bg-[#10121C] border border-white/10 hover:border-[#CCFF00] hover:bg-[#CCFF00]/10 text-slate-300 hover:text-white transition-all flex items-center gap-3 group"
              >
                <FacebookIcon className="w-5 h-5 text-[#CCFF00] group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bebas text-lg leading-none">FACEBOOK</div>
                  <div className="font-mono text-[10px] text-slate-500">Social Contact</div>
                </div>
              </a>

              <a 
                href={socials.discord} 
                target="_blank" 
                rel="noreferrer"
                className="p-4 bg-[#10121C] border border-white/10 hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 text-slate-300 hover:text-white transition-all flex items-center gap-3 group"
              >
                <DiscordIcon className="w-5 h-5 text-[#00F0FF] group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bebas text-lg leading-none">DISCORD</div>
                  <div className="font-mono text-[10px] text-slate-500">Gaming & Chat</div>
                </div>
              </a>
            </div>

            {/* Email Direct Box */}
            <div className="p-4 bg-[#0A0C16] border border-white/10 flex items-center gap-3 text-slate-300 text-xs font-mono">
              <Mail className="w-4 h-4 text-[#FF0055]" />
              <span>EMAIL: <strong className="text-white">{socials.email}</strong></span>
            </div>

          </div>

          {/* Right: Transmission Mailbox Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="cyber-card p-6 sm:p-8 border-2 border-white/10 relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
                <span className="text-[#00F0FF] font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                  TERMINAL TRANSMISSION // DROP A MESSAGE
                </span>
                <span className="text-slate-500 text-[10px]">ENCRYPTED 256-BIT</span>
              </div>

              {formSent ? (
                <div className="p-8 text-center bg-[#131624] border border-[#CCFF00]">
                  <Check className="w-10 h-10 text-[#CCFF00] mx-auto mb-2 animate-bounce" />
                  <div className="font-bebas text-2xl text-white">TIN NHẮN ĐÃ GỬI THÀNH CÔNG!</div>
                  <div className="font-mono text-xs text-slate-400 mt-1">
                    Cảm ơn mày đã kết nối. Tao sẽ check và reply sớm nhất nhé!
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-slate-400 mb-1">TÊN CỦA BẠN // HANDLE</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ví dụ: Hoàng_Nam" 
                        className="w-full bg-[#07080F] border border-white/15 px-3.5 py-2.5 text-xs font-mono text-white focus:border-[#00F0FF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-slate-400 mb-1">EMAIL HOẶC LINK LIÊN HỆ</label>
                      <input 
                        type="text" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@example.com / fb.com/..." 
                        className="w-full bg-[#07080F] border border-white/15 px-3.5 py-2.5 text-xs font-mono text-white focus:border-[#00F0FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-400 mb-1">LỜI NHẮN // MESSAGE</label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Muốn solo contest, trao đổi về giải thuật, rủ bắn game hay nghe nhạc chill..."
                      className="w-full bg-[#07080F] border border-white/15 px-3.5 py-2.5 text-xs font-mono text-white focus:border-[#FF0055] focus:outline-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-[#FF0055] text-white font-bebas text-xl tracking-wider hover:bg-white hover:text-[#07080F] transition-all flex items-center justify-center gap-2 font-bold shadow-[0_0_15px_rgba(255,0,85,0.4)]"
                  >
                    GỬI TIN NHẮN
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
