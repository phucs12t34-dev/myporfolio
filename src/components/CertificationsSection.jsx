import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

export default function CertificationsSection({ certifications }) {
  const validCerts = certifications?.filter(c => !c.name?.includes('[ADD'));

  return (
    <section id="certifications" className="py-24 relative z-10 border-t border-white/[0.08] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="section-stamp">
            <span>06 / CERTIFICATIONS</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl text-[#F5F4F8] font-bold tracking-tight">
            Credentials and verified courses.
          </h2>
          <p className="font-sans text-[#AAA7B2] text-base max-w-xl leading-relaxed">
            Các chứng nhận năng lực lập trình, giải thuật và các khóa đào tạo công nghệ hoàn thành.
          </p>
        </div>

        {validCerts && validCerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {validCerts.map((cert, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark hover:border-[#9B5CFF]/40 transition-all flex flex-col justify-between space-y-4 text-left group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <div className="p-2 rounded-xl bg-[#121218] text-[#9B5CFF] border border-white/[0.08]">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-[#706D79]">
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-[#F5F4F8] group-hover:text-[#B994FF] transition-colors">
                    {cert.name}
                  </h3>

                  <div className="text-xs font-mono text-[#B994FF]">
                    Issuer: {cert.issuer}
                  </div>

                  <p className="font-sans text-xs text-[#AAA7B2] leading-relaxed">
                    {cert.note}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#706D79]">ID: {cert.credentialId}</span>
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B994FF] hover:underline flex items-center gap-1"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-card-dark text-center max-w-xl mx-auto space-y-2">
            <p className="text-sm text-[#AAA7B2] font-sans">
              Các chứng chỉ chuyên môn đang được chuẩn bị để hiển thị theo hồ sơ thẩm định.
            </p>
            <span className="font-mono text-xs text-[#706D79]">
              Status: Verified credentials will appear once provided
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
