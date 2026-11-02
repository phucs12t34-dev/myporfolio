import React, { useState } from 'react';
import { X, Sliders, Palette, RefreshCw, Check, Copy } from 'lucide-react';

export default function CustomizationDrawer({ isOpen, onClose, currentPersonal, onUpdatePersonal }) {
  if (!isOpen) return null;

  const [tempName, setTempName] = useState(currentPersonal?.name || '');
  const [tempInitials, setTempInitials] = useState(currentPersonal?.initials || '');
  const [tempRole, setTempRole] = useState(currentPersonal?.role || '');
  const [tempBio, setTempBio] = useState(currentPersonal?.shortBio || '');
  const [copiedConfig, setCopiedConfig] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    onUpdatePersonal({
      name: tempName,
      initials: tempInitials,
      role: tempRole,
      shortBio: tempBio,
    });
  };

  const handleCopyConfigSnippet = () => {
    const snippet = `personal: {
  name: "${tempName}",
  initials: "${tempInitials}",
  role: "${tempRole}",
  shortBio: "${tempBio.replace(/"/g, '\\"')}",
}`;
    navigator.clipboard?.writeText(snippet);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="w-full max-w-md h-full bg-[#0d0d14] border-l border-white/10 shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <h3 className="font-bold text-white text-base">
                Bảng Tùy chỉnh Nhanh (Dev Preview)
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/30 text-xs text-purple-300 font-mono">
            ℹ️ Thay đổi tại đây áp dụng ngay lập tức trên giao diện để xem trước. Để lưu vĩnh viễn, hãy cập nhật file <span className="text-white font-bold">src/data/portfolio.js</span>.
          </div>

          {/* Form */}
          <form onSubmit={handleApply} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-mono text-zinc-400 block">Họ & Tên hiển thị:</label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-sans focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-zinc-400 block">Monogram Initials (2-3 ký tự):</label>
              <input
                type="text"
                maxLength={4}
                value={tempInitials}
                onChange={(e) => setTempInitials(e.target.value.toUpperCase())}
                placeholder="NVA"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-zinc-400 block">Chức danh / Định hướng:</label>
              <input
                type="text"
                value={tempRole}
                onChange={(e) => setTempRole(e.target.value)}
                placeholder="Student Developer & C++ Algorithm Learner"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-sans focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-zinc-400 block">Giới thiệu ngắn (Short Bio):</label>
              <textarea
                rows={4}
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-sans focus:outline-none focus:border-purple-500 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-md"
            >
              Xem trước thay đổi ngay
            </button>
          </form>
        </div>

        {/* Bottom Helper Actions */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <button
            onClick={handleCopyConfigSnippet}
            className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
          >
            {copiedConfig ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Sao chép đoạn code cấu hình</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-center text-xs text-zinc-500 hover:text-zinc-300 font-mono"
          >
            Đóng bảng tùy biến
          </button>
        </div>
      </div>
    </div>
  );
}
