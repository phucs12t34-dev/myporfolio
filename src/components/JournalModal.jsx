import React, { useState } from 'react';
import {
  X, BookOpen, GitCommit, FileCode, Bug, CheckCircle2,
  Calendar, ArrowRight, Layers, HelpCircle, ShieldAlert,
  ChevronDown, ChevronUp, Search, Download, Copy, Check, Terminal, Activity
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
    md += `## TỔNG QUAN KIẾN TRÚC\n${project.summary || project.description}\n\n`;
    md += `## CÁC PHIÊN PHÁT TRIỂN & THỰC NGHIỆM\n`;
    project.journal?.forEach(s => {
      md += `### Phiên ${s.session}: ${s.title} (${s.date || '[DATE]'})\n`;
      md += `- **Mục tiêu:** ${s.objectives}\n`;
      md += `- **Chi tiết kỹ thuật:** ${s.technicalDetails}\n`;
      if (s.codeSnippet) {
        md += `\`\`\`cpp\n${s.codeSnippet}\n\`\`\`\n`;
      }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in text-left">
      <div className="relative w-full max-w-5xl rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.9)] overflow-hidden my-6 max-h-[92vh] flex flex-col text-left">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-white/[0.08] bg-[#0E0E14] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-[#B994FF] uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#9B5CFF]" />
                <span>ENGINEERING NOTEBOOK &bull; TWO-LEVEL JOURNAL</span>
              </span>
              <span className="text-[#3A3845]">&bull;</span>
              <span className="text-xs font-mono text-[#706D79]">{project.id}</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#F5F4F8]">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdownSummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121218] hover:bg-[#1A1A24] text-[#F5F4F8] text-xs font-mono border border-white/[0.08] hover:border-[#9B5CFF]/40 transition-colors"
              title="Sao chép toàn bộ nhật ký dạng Markdown"
            >
              {copiedDoc ? <Check className="w-3.5 h-3.5 text-[#9B5CFF]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedDoc ? "Copied" : "Copy Markdown"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#121218] hover:bg-[#1A1A24] text-[#AAA7B2] hover:text-[#F5F4F8] border border-white/[0.08] transition-colors"
              aria-label="Đóng nhật ký"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Search Filter */}
        <div className="px-6 py-3 border-b border-white/[0.08] bg-[#0E0E14]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTab('journal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                activeTab === 'journal'
                  ? 'bg-[#9B5CFF] text-white font-medium shadow-glow-purple'
                  : 'text-[#AAA7B2] hover:text-[#F5F4F8]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Phiên thực nghiệm ({project.journal?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('decisions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                activeTab === 'decisions'
                  ? 'bg-[#9B5CFF] text-white font-medium shadow-glow-purple'
                  : 'text-[#AAA7B2] hover:text-[#F5F4F8]'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Quyết định ADR ({project.decisions?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('issues')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                activeTab === 'issues'
                  ? 'bg-[#9B5CFF] text-white font-medium shadow-glow-purple'
                  : 'text-[#AAA7B2] hover:text-[#F5F4F8]'
              }`}
            >
              <Bug className="w-3.5 h-3.5" />
              <span>Bug Triage ({project.issues?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('tests')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                activeTab === 'tests'
                  ? 'bg-[#9B5CFF] text-white font-medium shadow-glow-purple'
                  : 'text-[#AAA7B2] hover:text-[#F5F4F8]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Kiểm thử &amp; Benchmarks</span>
            </button>
          </div>

          {activeTab === 'journal' && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#706D79] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm phiên..."
                className="pl-8 pr-3 py-1 rounded-lg bg-[#121218] border border-white/[0.08] text-xs font-mono text-[#F5F4F8] placeholder:text-[#706D79] outline-none focus:border-[#9B5CFF]/60 w-44"
              />
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#0B0B0F] text-[#F5F4F8]">
          {/* TAB 1: SESSIONS TIMELINE */}
          {activeTab === 'journal' && (
            <div className="space-y-6">
              {filteredJournal.map((session, sIdx) => {
                const isExpanded = expandedSessions[sIdx];
                return (
                  <div
                    key={sIdx}
                    className="rounded-xl border border-white/[0.08] bg-[#0E0E14] overflow-hidden transition-all duration-200"
                  >
                    {/* Session Header Clickable Accordion */}
                    <button
                      onClick={() => toggleSession(sIdx)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-[#121218] transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#B994FF]">
                            SESSION #{session.session}
                          </span>
                          <span className="text-[#3A3845]">&bull;</span>
                          <span className="font-mono text-xs text-[#AAA7B2]">
                            {session.date || '[Ngày đang cập nhật]'}
                          </span>
                        </div>
                        <h4 className="font-heading text-lg sm:text-xl font-bold text-[#F5F4F8]">
                          {session.title}
                        </h4>
                      </div>

                      <div className="p-1.5 rounded-lg bg-[#121218] border border-white/[0.08] text-[#AAA7B2]">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Session Detail Drawer */}
                    {isExpanded && (
                      <div className="p-5 border-t border-white/[0.08] bg-[#08080C] space-y-4 font-sans text-xs sm:text-sm text-[#AAA7B2] leading-relaxed">
                        <div>
                          <strong className="font-mono text-xs text-[#B994FF] uppercase tracking-wider block mb-1">
                            Mục tiêu phiên:
                          </strong>
                          <p>{session.objectives}</p>
                        </div>

                        <div>
                          <strong className="font-mono text-xs text-[#B994FF] uppercase tracking-wider block mb-1">
                            Chi tiết kỹ thuật &amp; Triển khai:
                          </strong>
                          <p className="whitespace-pre-wrap font-sans">{session.technicalDetails}</p>
                        </div>

                        {session.codeSnippet && (
                          <div>
                            <strong className="font-mono text-xs text-[#B994FF] uppercase tracking-wider block mb-1">
                              Mã nguồn tiêu biểu:
                            </strong>
                            <pre className="p-4 rounded-xl bg-[#030305] text-[#B994FF] font-mono text-xs overflow-x-auto border border-white/[0.08]">
                              <code>{session.codeSnippet}</code>
                            </pre>
                          </div>
                        )}

                        <div>
                          <strong className="font-mono text-xs text-[#B994FF] uppercase tracking-wider block mb-1">
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
                <div key={dIdx} className="p-5 rounded-xl border border-white/[0.08] bg-[#0E0E14] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#B994FF]">
                      ADR #{dec.id || dIdx + 1}
                    </span>
                    <span className="badge-purple">{dec.status || 'Accepted'}</span>
                  </div>
                  <h4 className="font-heading text-xl font-bold text-[#F5F4F8]">
                    {dec.title}
                  </h4>
                  <p className="font-sans text-xs text-[#AAA7B2]">{dec.context}</p>
                  <div className="pt-2 border-t border-white/[0.06] font-sans text-xs text-[#F5F4F8]">
                    <strong className="text-[#B994FF]">Quyết định:</strong> {dec.decision}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ISSUES & BUGFIX */}
          {activeTab === 'issues' && (
            <div className="space-y-4">
              {project.issues?.map((iss, iIdx) => (
                <div key={iIdx} className="p-5 rounded-xl border border-white/[0.08] bg-[#0E0E14] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#FF5F56]">
                      ISSUE #{iss.id || iIdx + 1}
                    </span>
                    <span className="badge-cobalt">{iss.status || 'Resolved'}</span>
                  </div>
                  <h4 className="font-heading text-xl font-bold text-[#F5F4F8]">
                    {iss.title}
                  </h4>
                  <p className="font-sans text-xs text-[#AAA7B2]">{iss.description}</p>
                  <div className="pt-2 border-t border-white/[0.06] font-sans text-xs text-[#F5F4F8]">
                    <strong className="text-[#27C93F]">Khắc phục:</strong> {iss.resolution}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: TESTS & BENCHMARKS */}
          {activeTab === 'tests' && (
            <div className="space-y-4">
              {project.tests ? (
                <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0E0E14] space-y-3">
                  <h4 className="font-heading text-lg font-bold text-[#F5F4F8]">
                    Ma trận Kiểm thử &amp; Ràng buộc hiệu năng
                  </h4>
                  <p className="font-sans text-xs text-[#AAA7B2]">
                    {project.tests.description || "Tuân thủ nghiêm ngặt ràng buộc Stanford CS97SI (10^8 operations/giây) và kiểm thử các corner cases cực đại."}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-[#08080C] border border-white/[0.06]">
                      <span className="text-[#706D79] block text-[10px]">CORNER CASE AUDIT</span>
                      <span className="text-[#B994FF] font-semibold">N = 0, 1, 10^5 Max Bounds</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#08080C] border border-white/[0.06]">
                      <span className="text-[#706D79] block text-[10px]">INTEGER OVERFLOW</span>
                      <span className="text-[#27C93F] font-semibold">Checked: long long 64-bit</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl border border-white/[0.08] bg-[#0E0E14] text-center text-xs font-mono text-[#AAA7B2]">
                  Dữ liệu ma trận kiểm thử đang đồng bộ từ hệ thống CI/CD.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-[#0E0E14] flex items-center justify-between text-xs font-mono text-[#AAA7B2]">
          <span>DOCUMENT ID: DOC-{project.id?.toUpperCase()}-2026</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#9B5CFF] hover:bg-[#8545EA] text-white transition-colors shadow-glow-purple"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
