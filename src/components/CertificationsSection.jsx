import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

export default function CertificationsSection({ certifications }) {
  const validCerts = certifications?.filter(c => !c.name?.includes('[ADD'));

  return (
    <section id="certifications" className="py-24 relative z-10 border-t border-[#D8D5CD] bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="editorial-stamp">
            <span>06 / CERTIFICATIONS</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#171717] font-normal tracking-tight">
            Credentials and verified courses.
          </h2>
          <p className="font-sans text-[#66645F] text-base max-w-xl leading-relaxed">
            Các chứng nhận năng lực lập trình, giải thuật và các khóa đào tạo công nghệ hoàn thành.
          </p>
        </div>

        {validCerts && validCerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {validCerts.map((cert, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#D8D5CD] shadow-editorial hover:border-[#171717] transition-all flex flex-col justify-between space-y-4 text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#F0EEE8] pb-3">
                    <div className="p-2 rounded-lg bg-[#F7F5F0] text-[#304FFE] border border-[#D8D5CD]">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-[#8E8B83]">
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-[#171717]">
                    {cert.name}
                  </h3>

                  <div className="text-xs font-mono text-[#304FFE]">
                    Issuer: {cert.issuer}
                  </div>

                  <p className="font-sans text-xs text-[#66645F] leading-relaxed">
                    {cert.note}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EEE8] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8E8B83]">ID: {cert.credentialId}</span>
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#304FFE] hover:underline flex items-center gap-1"
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
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#D8D5CD] shadow-editorial text-center max-w-xl mx-auto space-y-2">
            <p className="text-sm text-[#66645F] font-sans">
              Các chứng chỉ chuyên môn đang được chuẩn bị để hiển thị theo hồ sơ thẩm định.
            </p>
            <span className="font-mono text-xs text-[#8E8B83]">
              Status: Verified credentials will appear once provided
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
