import React, { useState } from 'react';
import { Mail, Send, Check, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import CrystallineClosing from './visual/CrystallineClosing';

export default function ContactSection({ personal }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success
  const [copiedEmail, setCopiedEmail] = useState(false);

  const hasValidEmail = personal?.socialLinks?.email && !personal.socialLinks.email.includes('example.com') && !personal.socialLinks.email.includes('[ADD');
  const emailAddress = hasValidEmail ? personal.socialLinks.email : 'contact@portfolio.dev';
  const hasValidGithub = personal?.socialLinks?.github && personal.socialLinks.github !== 'https://github.com/' && !personal.socialLinks.github.includes('[ADD');
  const hasValidLinkedin = personal?.socialLinks?.linkedin && personal.socialLinks.linkedin !== 'https://linkedin.com/in/' && !personal.socialLinks.linkedin.includes('[ADD');

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Vui lòng điền đầy đủ các trường thông tin.");
      return;
    }

    setFormStatus('sending');

    setTimeout(() => {
      setFormStatus('success');
      const mailtoUrl = `mailto:${emailAddress}?subject=Liên hệ từ Portfolio - ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + "\n\nTừ email: " + formData.email)}`;
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-[#D8D5CD] bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="editorial-stamp">
            <span>08 / CORRESPONDENCE</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl text-[#171717] font-normal tracking-tight">
            Let's build something remarkable together.
          </h2>
          <p className="font-sans text-[#66645F] text-base max-w-xl leading-relaxed">
            Luôn cởi mở trao đổi về các bài toán giải thuật C++, dự án không gian Web3D, robotics và các cơ hội học thuật.
          </p>
        </div>

        {/* 2-Column Contact Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links & 3D Epilogue (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#D8D5CD] shadow-editorial space-y-6 text-left">
              <span className="font-mono text-xs text-[#8E8B83] uppercase tracking-wider block border-b border-[#F0EEE8] pb-2">
                Direct Channels
              </span>

              {/* Email Card with Copy Action */}
              <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#D8D5CD] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#D8D5CD] flex items-center justify-center text-[#304FFE] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="font-mono text-[10px] text-[#8E8B83] uppercase block">Email Address</span>
                    <span className="font-mono text-xs text-[#171717] font-semibold truncate block">
                      {emailAddress}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#F0EEE8] border border-[#D8D5CD] text-xs font-mono text-[#171717] transition-colors shrink-0"
                  title="Sao chép email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#304FFE]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Public Social Links */}
              <div className="grid grid-cols-2 gap-3">
                {hasValidGithub && (
                  <a
                    href={personal.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#F7F5F0] hover:bg-[#F0EEE8] border border-[#D8D5CD] flex items-center gap-2.5 text-xs font-mono text-[#171717] transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-[#171717]" />
                    <span>GitHub Profile</span>
                  </a>
                )}

                {hasValidLinkedin && (
                  <a
                    href={personal.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#F7F5F0] hover:bg-[#F0EEE8] border border-[#D8D5CD] flex items-center gap-2.5 text-xs font-mono text-[#171717] transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#304FFE]" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

            {/* 3D Epilogue Monolith */}
            <CrystallineClosing className="w-full h-[220px] sm:h-[260px]" />
          </div>

          {/* Right Column: Editorial Contact Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-2xl bg-white border border-[#D8D5CD] shadow-editorial text-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-[#F0EEE8] pb-4">
                <h3 className="font-editorial text-2xl font-bold text-[#171717]">
                  Send a Direct Message
                </h3>
                <p className="font-sans text-xs text-[#66645F] mt-1">
                  Tin nhắn sẽ mở trực tiếp ứng dụng email với nội dung đã được định dạng chuẩn.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs text-[#171717] uppercase tracking-wider block">
                    Tên của bạn *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F0] border border-[#D8D5CD] text-xs font-sans text-[#171717] placeholder:text-[#8E8B83] outline-none focus:border-[#304FFE] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs text-[#171717] uppercase tracking-wider block">
                    Email liên hệ *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F0] border border-[#D8D5CD] text-xs font-sans text-[#171717] placeholder:text-[#8E8B83] outline-none focus:border-[#304FFE] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs text-[#171717] uppercase tracking-wider block">
                  Nội dung trao đổi *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tôi muốn thảo luận về dự án thuật toán hoặc cơ hội hợp tác..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F0] border border-[#D8D5CD] text-xs font-sans text-[#171717] placeholder:text-[#8E8B83] outline-none focus:border-[#304FFE] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#171717] hover:bg-[#304FFE] text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-editorial hover:-translate-y-0.5"
              >
                <span>{formStatus === 'sending' ? 'Đang gửi...' : 'Gửi Thông điệp'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
