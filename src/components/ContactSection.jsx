import React, { useState } from 'react';
import { Mail, Send, Check, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

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
    <section id="contact" className="py-24 relative z-10 border-t border-white/[0.08] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="section-stamp">
            <span>08 / CORRESPONDENCE</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl text-[#F5F4F8] font-bold tracking-tight">
            Let's build something remarkable together.
          </h2>
          <p className="font-sans text-[#AAA7B2] text-base max-w-xl leading-relaxed">
            Luôn cởi mở trao đổi về các bài toán giải thuật C++, mô phỏng số, đồ họa Web3D và các cơ hội học thuật.
          </p>
        </div>

        {/* 2-Column Contact Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links & 3D Epilogue (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark space-y-6 text-left">
              <span className="font-mono text-xs text-[#706D79] uppercase tracking-wider block border-b border-white/[0.06] pb-2">
                Direct Channels
              </span>

              {/* Email Card with Copy Action */}
              <div className="p-4 rounded-xl bg-[#121218] border border-white/[0.08] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-[#181824] border border-white/[0.08] flex items-center justify-center text-[#9B5CFF] shrink-0 shadow-glow-purple">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="font-mono text-[10px] text-[#706D79] uppercase block">Email Address</span>
                    <span className="font-mono text-xs text-[#F5F4F8] font-semibold truncate block">
                      {emailAddress}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded-lg bg-[#181824] hover:bg-[#222230] border border-white/[0.08] text-xs font-mono text-[#F5F4F8] transition-colors shrink-0"
                  title="Sao chép email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#9B5CFF]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Public Social Links */}
              <div className="grid grid-cols-2 gap-3">
                {hasValidGithub && (
                  <a
                    href={personal.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#121218] hover:bg-[#1A1A24] border border-white/[0.08] flex items-center gap-2.5 text-xs font-mono text-[#F5F4F8] hover:border-[#9B5CFF]/40 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-[#F5F4F8]" />
                    <span>GitHub Profile</span>
                  </a>
                )}

                {hasValidLinkedin && (
                  <a
                    href={personal.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#121218] hover:bg-[#1A1A24] border border-white/[0.08] flex items-center gap-2.5 text-xs font-mono text-[#F5F4F8] hover:border-[#9B5CFF]/40 transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#9B5CFF]" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

            {/* Availability & Protocol Matrix Bento Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark space-y-4 text-left">
              <span className="font-mono text-xs text-[#706D79] uppercase tracking-wider block border-b border-white/[0.06] pb-2">
                Availability &amp; Protocol
              </span>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-[#AAA7B2]">Phản hồi trung bình:</span>
                  <span className="text-[#F5F4F8] font-semibold">&lt; 24 giờ làm việc</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-[#AAA7B2]">Múi giờ hoạt động:</span>
                  <span className="text-[#F5F4F8] font-semibold">UTC+7 (Indochina)</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#AAA7B2]">Định dạng trao đổi:</span>
                  <span className="text-[#B994FF] font-semibold">Email / GitHub Issues</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark text-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-white/[0.06] pb-4">
                <h3 className="font-heading text-2xl font-bold text-[#F5F4F8]">
                  Send a Direct Message
                </h3>
                <p className="font-sans text-xs text-[#AAA7B2] mt-1">
                  Tin nhắn sẽ mở trực tiếp ứng dụng email với nội dung đã được định dạng chuẩn.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs text-[#AAA7B2] uppercase tracking-wider block">
                    Tên của bạn *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121218] border border-white/[0.08] text-xs font-sans text-[#F5F4F8] placeholder:text-[#706D79] outline-none focus:border-[#9B5CFF]/60 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs text-[#AAA7B2] uppercase tracking-wider block">
                    Email liên hệ *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121218] border border-white/[0.08] text-xs font-sans text-[#F5F4F8] placeholder:text-[#706D79] outline-none focus:border-[#9B5CFF]/60 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs text-[#AAA7B2] uppercase tracking-wider block">
                  Nội dung trao đổi *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tôi muốn thảo luận về dự án thuật toán hoặc cơ hội hợp tác..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121218] border border-white/[0.08] text-xs font-sans text-[#F5F4F8] placeholder:text-[#706D79] outline-none focus:border-[#9B5CFF]/60 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#9B5CFF] hover:bg-[#8545EA] text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-glow-purple hover:-translate-y-0.5"
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
