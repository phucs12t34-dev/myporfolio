import React from 'react';

/**
 * Minimal Cybernetic Background
 * Deep Black (#050505) with fine technical grid, subtle noise & soft purple glow.
 * Pure CSS/SVG - 0% WebGL/3D overhead, instant render, ultra performant.
 */
export default function Web3DBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#050505]">
      {/* Ambient Radial Lighting Gradients */}
      <div 
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[140px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(155,92,255,0.4) 0%, rgba(65,105,255,0.2) 50%, transparent 80%)'
        }}
      />
      <div 
        className="absolute top-[45%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(155,92,255,0.3) 0%, transparent 70%)'
        }}
      />
      <div 
        className="absolute bottom-[5%] -right-[5%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(65,105,255,0.35) 0%, transparent 70%)'
        }}
      />

      {/* Cybernetic Tech Dot Matrix Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Technical Fine Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 1px, transparent 1px)',
          backgroundSize: '96px 96px'
        }}
      />
    </div>
  );
}
