import React, { useState } from 'react';
import { X, ExternalLink, BookOpen, Layers, CheckCircle2, Box, Sparkles, Network } from 'lucide-react';
import { GithubIcon } from './Icons';
import JetBotViewer from './JetBotViewer';
import DsaGraphViewer from './DsaGraphViewer';

export default function ProjectModal({ project, onClose, onOpenJournal, initialTab = 'details' }) {
  if (!project) return null;
  const hasJetBot3D = project.id === 'jetbot-simulation';
  const hasDsa3D = project.id === 'dsa-cp-toolkit';
  const has3D = hasJetBot3D || hasDsa3D;

  const [activeTab, setActiveTab] = useState(initialTab === '3d' && has3D ? '3d' : 'details');

  const tab3DLabel = hasJetBot3D ? 'Mô phỏng 3D JetBot Digital Twin' : 'Mô phỏng 3D Cây & Đồ thị C++';
  const calloutTitle = hasJetBot3D ? 'Mô phỏng 3D Digital Twin Sẵn sàng' : 'Trực quan hóa 3D Cấu trúc Dữ liệu C++';
  const calloutDesc = hasJetBot3D
    ? 'Mô hình PBR robot JetBot, bánh vi sai, cảm biến RPLiDAR A1 360° và Telemetry HUD thời gian thực.'
    : 'Mô hình không gian 3D Segment Tree, Disjoint Set Union (DSU) và thuật toán Dijkstra với xung truyền năng lượng.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in text-left">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white border border-[#D8D5CD] shadow-editorial-lg overflow-hidden my-6 max-h-[92vh] flex flex-col text-left">
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#D8D5CD] bg-[#F7F5F0]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#304FFE] font-semibold">
                {project.category}
              </span>
              <span className="text-[#D8D5CD]">&bull;</span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                project.status === 'Completed'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-amber-50 text-amber-700 border border-amber-300'
              }`}>
                {project.status === 'Completed' ? 'Hoàn thành' : 'Đang phát triển'}
              </span>
              {has3D && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                  <Box className="w-3 h-3 text-[#304FFE]" />
                  <span>Interactive 3D</span>
                </span>
              )}
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171717]">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-[#F0EEE8] text-[#66645F] hover:text-[#171717] border border-[#D8D5CD] transition-colors"
            aria-label="Đóng chi tiết dự án"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher if 3D is available */}
        {has3D && (
          <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-[#F0EEE8] bg-[#FAF8F5]">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeTab === 'details'
                  ? 'bg-[#171717] text-white font-medium'
                  : 'text-[#66645F] hover:text-[#171717]'
              }`}
            >
              Hồ sơ &amp; Kiến trúc
            </button>
            <button
              onClick={() => setActiveTab('3d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                activeTab === '3d'
                  ? 'bg-[#304FFE] text-white font-medium'
                  : 'text-[#66645F] hover:text-[#171717]'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>{tab3DLabel}</span>
            </button>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white text-[#171717]">
          {activeTab === '3d' && has3D ? (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#D8D5CD] flex items-center justify-between text-xs font-mono text-[#66645F]">
                <span>Chế độ: Web3D Simulation Studio &bull; Three.js WebGL</span>
                <span className="text-[#304FFE] font-semibold">Tương tác trực tiếp</span>
              </div>
              {hasJetBot3D && <JetBotViewer />}
              {hasDsa3D && <DsaGraphViewer />}
            </div>
          ) : (
            <>
              {/* Interactive 3D Callout Banner */}
              {has3D && (
                <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#D8D5CD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#304FFE]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{calloutTitle}</span>
                    </div>
                    <p className="font-sans text-xs text-[#66645F]">
                      {calloutDesc}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('3d')}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#304FFE] hover:bg-[#1E40AF] text-white font-mono text-xs transition-colors shrink-0"
                  >
                    <Box className="w-4 h-4" />
                    <span>Mở Mô phỏng 3D</span>
                  </button>
                </div>
              )}

              {/* Subtitle / Tagline */}
              <p className="font-editorial text-xl text-[#171717] font-semibold leading-relaxed border-l-2 border-[#304FFE] pl-4">
                {project.subtitle || project.tagline}
              </p>

              {/* Long Description */}
              <div className="space-y-3 font-sans text-sm text-[#66645F] leading-relaxed">
                <p>{project.longDescription || project.description}</p>
                {project.problem && (
                  <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E7E4DC] space-y-1">
                    <span className="font-mono text-xs text-[#171717] font-bold uppercase block">
                      Vấn đề giải quyết:
                    </span>
                    <p className="text-xs text-[#66645F]">{project.problem}</p>
                  </div>
                )}
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs text-[#171717] uppercase tracking-wider font-semibold">
                  Công nghệ &amp; Thư viện sử dụng
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded bg-[#F7F5F0] border border-[#D8D5CD] text-xs font-mono text-[#171717]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs text-[#171717] uppercase tracking-wider font-semibold">
                    Tính năng nổi bật
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F5F0] border border-[#E7E4DC] text-xs font-sans text-[#66645F]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#304FFE] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-[#D8D5CD] bg-[#F7F5F0] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-[#F0EEE8] text-[#171717] text-xs font-mono border border-[#D8D5CD] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repo</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#171717] hover:bg-[#304FFE] text-white text-xs font-medium transition-colors"
              >
                <span>Mở Demo trực tiếp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={() => onOpenJournal(project)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#304FFE] hover:bg-[#1E40AF] text-white text-xs font-mono transition-colors shadow-editorial-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>Xem Toàn bộ Nhật ký Kỹ thuật</span>
          </button>
        </div>
      </div>
    </div>
  );
}
