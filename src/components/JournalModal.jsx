import React, { useState } from 'react';
import {
  X, BookOpen, GitCommit, FileCode, Bug, CheckCircle2,
  Calendar, ArrowRight, Layers, HelpCircle, ShieldAlert,
  ChevronDown, ChevronUp, Search, Download, Copy, Check
} from 'lucide-react';

export default function JournalModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('journal');
  const [expandedSessions, setExpandedSessions] = useState({ 0: true });
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedDoc, setCopiedDoc] = useState(false);

  if (!project) return null;

  const toggleSession = (idx) => {
    setExpandedSessions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleCopyMarkdownSummary = () => {
    let md = `# NHẬT KÝ PHÁT TRIỂN KỸ THUẬT: ${project.title}\n\n`;
    md += `**Mã dự án:** ${project.id} | **Trạng thái:** ${project.status}\n`;
    md += `**Công nghệ:** ${project.technologies?.join(', ')}\n\n`;
    md += `## TỔNG QUAN\n${project.summary || project.description}\n\n`;
    md += `## CÁC PHIÊN PHÁT TRIỂN\n`;
    project.journal?.forEach(s => {
      md += `### Phiên ${s.session}: ${s.title} (${s.date || '[DATE]'});\n`;
      md += `- **Mục tiêu:** ${s.objectives}\n`;
      md += `- **Chi tiết:** ${s.technicalDetails}\n`;
      md += `- **Kết quả:** ${s.results}\n\n`;
    });
    navigator.clipboard?.writeText(md);
    setCopiedDoc(true);
    setTimeout(() => setCopiedDoc(false), 2000);
  };

  const filteredJournal = project.journal?.filter(s =>
    s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.technicalDetails?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.session?.toString().includes(searchQuery)
  ) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in text-left">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white border border-[#D8D5CD] shadow-editorial-lg overflow-hidden my-6 max-h-[92vh] flex flex-col text-left">
        {/* Editorial Journal Header Bar */}
        <div className="p-5 sm:p-6 border-b border-[#D8D5CD] bg-[#F7F5F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-[#304FFE] uppercase tracking-wider">
                ENGINEERING JOURNAL &bull; LEVEL 1 PUBLIC RECORD
              </span>
              <span className="text-[#D8D5CD]">&bull;</span>
              <span className="text-xs font-mono text-[#66645F]">{project.id}</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171717]">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdownSummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F0EEE8] text-[#171717] text-xs font-mono border border-[#D8D5CD] transition-colors"
              title="Sao chép toàn bộ nhật ký dạng Markdown"
            >
              {copiedDoc ? <Check className="w-3.5 h-3.5 text-[#304FFE]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedDoc ? "Copied" : "Copy Markdown"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-[#F0EEE8] text-[#66645F] hover:text-[#171717] border border-[#D8D5CD] transition-colors"
              aria-label="Đóng nhật ký"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Search Filter */}
        <div className="px-6 py-3 border-b border-[#D8D5CD] bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTab('journal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                activeTab === 'journal'
                  ? 'bg-[#171717] text-white font-medium'
                  : 'text-[#66645F] hover:text-[#171717]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Phiên thực nghiệm ({project.journal?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('decisions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                activeTab === 'decisions'
                  ? 'bg-[#171717] text-white font-medium'
                  : 'text-[#66645F] hover:text-[#171717]'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Quyết định ADR ({project.decisions?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('issues')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                activeTab === 'issues'
                  ? 'bg-[#171717] text-white font-medium'
                  : 'text-[#66645F] hover:text-[#171717]'
              }`}
            >
              <Bug className="w-3.5 h-3.5" />
              <span>Vấn đề &amp; Bugfix ({project.issues?.length || 0})</span>
            </button>
          </div>

          {activeTab === 'journal' && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8E8B83] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm phiên..."
                className="pl-8 pr-3 py-1 rounded-lg bg-white border border-[#D8D5CD] text-xs font-mono text-[#171717] placeholder:text-[#8E8B83] outline-none focus:border-[#304FFE] w-48"
              />
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white text-[#171717]">
          {/* TAB 1: SESSIONS TIMELINE */}
          {activeTab === 'journal' && (
            <div className="space-y-6">
              {filteredJournal.map((session, sIdx) => {
                const isExpanded = expandedSessions[sIdx];
                return (
                  <div
                    key={sIdx}
                    className="rounded-xl border border-[#D8D5CD] bg-[#F7F5F0] overflow-hidden transition-all duration-200"
                  >
                    {/* Session Header Clickable Accordion */}
                    <button
                      onClick={() => toggleSession(sIdx)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F0EEE8] transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#304FFE]">
                            SESSION #{session.session}
                          </span>
                          <span className="text-[#D8D5CD]">&bull;</span>
                          <span className="font-mono text-xs text-[#66645F]">
                            {session.date || '[Ngày đang cập nhật]'}
                          </span>
                        </div>
                        <h4 className="font-editorial text-xl font-bold text-[#171717]">
                          {session.title}
                        </h4>
                      </div>

                      <div className="p-1.5 rounded-lg bg-white border border-[#D8D5CD] text-[#66645F]">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Session Detail Drawer */}
                    {isExpanded && (
                      <div className="p-5 border-t border-[#D8D5CD] bg-white space-y-4 font-sans text-xs sm:text-sm text-[#66645F] leading-relaxed">
                        <div>
                          <strong className="font-mono text-xs text-[#171717] uppercase tracking-wider block mb-1">
                            Mục tiêu phiên:
                          </strong>
                          <p>{session.objectives}</p>
                        </div>

                        <div>
                          <strong className="font-mono text-xs text-[#171717] uppercase tracking-wider block mb-1">
                            Chi tiết kỹ thuật &amp; Triển khai:
                          </strong>
                          <p className="whitespace-pre-wrap font-sans">{session.technicalDetails}</p>
                        </div>

                        {session.codeSnippet && (
                          <div>
                            <strong className="font-mono text-xs text-[#171717] uppercase tracking-wider block mb-1">
                              Mã nguồn tiêu biểu:
                            </strong>
                            <pre className="p-4 rounded-xl bg-[#171717] text-[#F7F5F0] font-mono text-xs overflow-x-auto">
                              <code>{session.codeSnippet}</code>
                            </pre>
                          </div>
                        )}

                        <div>
                          <strong className="font-mono text-xs text-[#171717] uppercase tracking-wider block mb-1">
                            Kết quả &amp; Thực nghiệm:
                          </strong>
                          <p>{session.results}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: ADR DECISIONS */}
          {activeTab === 'decisions' && (
            <div className="space-y-4">
              {project.decisions?.map((dec, dIdx) => (
                <div key={dIdx} className="p-5 rounded-xl border border-[#D8D5CD] bg-[#F7F5F0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#304FFE]">
                      ADR #{dec.id || dIdx + 1}
                    </span>
                    <span className="badge-editorial">{dec.status || 'Accepted'}</span>
                  </div>
                  <h4 className="font-editorial text-xl font-bold text-[#171717]">
                    {dec.title}
                  </h4>
                  <p className="font-sans text-xs text-[#66645F]">{dec.context}</p>
                  <div className="pt-2 border-t border-[#E7E4DC] font-sans text-xs text-[#171717]">
                    <strong>Quyết định:</strong> {dec.decision}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ISSUES & BUGFIX */}
          {activeTab === 'issues' && (
            <div className="space-y-4">
              {project.issues?.map((iss, iIdx) => (
                <div key={iIdx} className="p-5 rounded-xl border border-[#D8D5CD] bg-[#F7F5F0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#E85D3F]">
                      ISSUE #{iss.id || iIdx + 1}
                    </span>
                    <span className="badge-cobalt">{iss.status || 'Resolved'}</span>
                  </div>
                  <h4 className="font-editorial text-xl font-bold text-[#171717]">
                    {iss.title}
                  </h4>
                  <p className="font-sans text-xs text-[#66645F]">{iss.description}</p>
                  <div className="pt-2 border-t border-[#E7E4DC] font-sans text-xs text-[#171717]">
                    <strong>Khắc phục:</strong> {iss.resolution}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#D8D5CD] bg-[#F7F5F0] flex items-center justify-between text-xs font-mono text-[#66645F]">
          <span>Mã tài liệu: DOC-{project.id?.toUpperCase()}-2026</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#171717] hover:bg-[#304FFE] text-white transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
