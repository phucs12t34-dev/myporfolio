import React from 'react';

/**
 * CYBERPUNK CITY ENVIRONMENT (100% Vector SVG & CSS — ZERO 3D Model Overhead)
 * Multi-layer dense city skyline, glowing neon window clusters,
 * rooftop telecom antennas with blinking obstacle beacons,
 * drooping industrial overhead cables, high-speed flying skyway light trails,
 * and ambient cyber haze.
 */
export default function CyberCityBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#06070D]">
      
      {/* 1. Deep Neon Atmospheric Glow Gradients */}
      <div 
        className="absolute -top-[10%] left-[15%] w-[650px] h-[550px] rounded-full blur-[140px] opacity-25"
        style={{ background: 'radial-gradient(circle, #00F0FF 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-[25%] -right-[5%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-25"
        style={{ background: 'radial-gradient(circle, #FF0055 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-[50%] left-[5%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-20"
        style={{ background: 'radial-gradient(circle, #CCFF00 0%, transparent 75%)' }}
      />
      <div 
        className="absolute bottom-0 inset-x-0 h-[350px] blur-[120px] opacity-30"
        style={{ background: 'linear-gradient(to top, rgba(0,240,255,0.15), rgba(255,0,85,0.08), transparent)' }}
      />

      {/* 2. Overhead Cyber Industrial Cables (Neo-Tokyo / Blade Runner Street Style) */}
      <svg 
        className="absolute top-0 inset-x-0 w-full h-48 opacity-35" 
        viewBox="0 0 1440 200" 
        fill="none" 
        preserveAspectRatio="none"
      >
        {/* Main heavy sagging cables */}
        <path d="M-50,20 Q360,110 720,40 T1500,60" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.4" />
        <path d="M-50,60 Q400,160 850,70 T1500,110" stroke="#1E2438" strokeWidth="2.5" />
        <path d="M-50,90 Q500,190 1000,90 T1500,140" stroke="#111524" strokeWidth="3" />
        <path d="M0,0 Q300,90 600,30" stroke="#FF0055" strokeWidth="1" opacity="0.3" />
        
        {/* Wire junction nodes */}
        <circle cx="360" cy="110" r="3" fill="#00F0FF" opacity="0.6" />
        <circle cx="850" cy="70" r="3" fill="#FF0055" opacity="0.6" />
      </svg>

      {/* 3. Flying Skyway Vehicle Light Trails (Fast Horizontal Laser Streaks) */}
      <div className="absolute top-[28%] inset-x-0 h-1 overflow-hidden opacity-30">
        <div 
          className="w-48 h-full bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent"
          style={{ animation: 'skywayTraffic 7s linear infinite' }}
        />
      </div>
      <div className="absolute top-[38%] inset-x-0 h-1 overflow-hidden opacity-25">
        <div 
          className="w-64 h-full bg-gradient-to-r from-transparent via-[#FF0055] to-transparent"
          style={{ animation: 'skywayTrafficRev 10s linear infinite' }}
        />
      </div>
      <div className="absolute top-[52%] inset-x-0 h-1 overflow-hidden opacity-20">
        <div 
          className="w-36 h-full bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent"
          style={{ animation: 'skywayTraffic 9s linear infinite', animationDelay: '3s' }}
        />
      </div>

      {/* 4. Full Cyber City Skyline Silhouette (Spanning 75% Viewport Height) */}
      <div className="absolute inset-x-0 bottom-0 h-[680px] sm:h-[760px] opacity-45 overflow-hidden">
        <svg 
          className="w-full h-full object-cover" 
          viewBox="0 0 1440 760" 
          fill="none" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEFINITIONS & PATTERNS */}
          <defs>
            {/* Window Grid Pattern (Cyan) */}
            <pattern id="cyanGrid" width="8" height="12" patternUnits="userSpaceOnUse">
              <rect x="2" y="2" width="2" height="4" fill="#00F0FF" fillOpacity="0.4" />
            </pattern>
            {/* Window Grid Pattern (Pink/Orange) */}
            <pattern id="pinkGrid" width="10" height="14" patternUnits="userSpaceOnUse">
              <rect x="2" y="2" width="3" height="5" fill="#FF0055" fillOpacity="0.35" />
            </pattern>
            {/* Window Grid Pattern (Amber Yellow) */}
            <pattern id="yellowGrid" width="8" height="10" patternUnits="userSpaceOnUse">
              <rect x="1" y="2" width="2" height="3" fill="#CCFF00" fillOpacity="0.3" />
            </pattern>
          </defs>

          {/* LAYER 1: Deep Distant Megatowers (Tallest, up to y=60) */}
          <g fill="#0A0C16">
            <rect x="80" y="80" width="70" height="680" />
            <rect x="200" y="140" width="90" height="620" />
            <rect x="360" y="60" width="85" height="700" />
            <rect x="520" y="120" width="100" height="640" />
            <rect x="680" y="40" width="75" height="720" />
            <rect x="820" y="100" width="90" height="660" />
            <rect x="990" y="50" width="80" height="710" />
            <rect x="1140" y="130" width="95" height="630" />
            <rect x="1300" y="90" width="70" height="670" />
          </g>

          {/* Skybridges between megatowers */}
          <line x1="150" y1="220" x2="200" y2="220" stroke="#00F0FF" strokeWidth="2" opacity="0.4" />
          <line x1="445" y1="180" x2="520" y2="180" stroke="#FF0055" strokeWidth="2" opacity="0.4" />
          <line x1="755" y1="160" x2="820" y2="160" stroke="#CCFF00" strokeWidth="2" opacity="0.4" />
          <line x1="1070" y1="200" x2="1140" y2="200" stroke="#00F0FF" strokeWidth="2" opacity="0.4" />

          {/* Distant Window Clusters */}
          <rect x="95" y="120" width="40" height="200" fill="url(#cyanGrid)" />
          <rect x="380" y="90" width="45" height="240" fill="url(#pinkGrid)" />
          <rect x="700" y="80" width="35" height="260" fill="url(#yellowGrid)" />
          <rect x="1010" y="90" width="40" height="230" fill="url(#cyanGrid)" />

          {/* LAYER 2: Midground Urban Skyline (Stepped roofs, industrial geometry) */}
          <path 
            d="M0 760V420H50V340H110V460H170V290H210V220H240V330H300V450H370V260H410V200H450V310H500V440H570V350H630V240H670V170H710V330H770V440H840V300H900V210H940V340H1010V460H1080V270H1130V190H1170V320H1240V430H1310V310H1370V250H1400V380H1440V760H0Z" 
            fill="#101426" 
          />

          {/* Window Clusters on Midground Buildings */}
          <rect x="175" y="300" width="30" height="140" fill="url(#cyanGrid)" />
          <rect x="375" y="270" width="30" height="160" fill="url(#yellowGrid)" />
          <rect x="635" y="250" width="30" height="170" fill="url(#pinkGrid)" />
          <rect x="905" y="230" width="30" height="190" fill="url(#cyanGrid)" />
          <rect x="1135" y="210" width="30" height="190" fill="url(#yellowGrid)" />

          {/* LAYER 3: Rooftop Spires, Antennas & Blinking Beacon Warning Lights */}
          {/* Spire 1 */}
          <line x1="225" y1="220" x2="225" y2="120" stroke="#00F0FF" strokeWidth="2" opacity="0.8" />
          <circle cx="225" cy="115" r="4" fill="#00F0FF" className="animate-ping" style={{ animationDuration: '2.5s' }} />
          <circle cx="225" cy="115" r="3" fill="#FFFFFF" />

          {/* Spire 2 */}
          <line x1="430" y1="200" x2="430" y2="90" stroke="#FF0055" strokeWidth="2.5" opacity="0.8" />
          <circle cx="430" cy="85" r="4" fill="#FF0055" className="animate-ping" style={{ animationDuration: '2s' }} />
          <circle cx="430" cy="85" r="3" fill="#FFFFFF" />

          {/* Spire 3 (Tall Central Transmitter) */}
          <line x1="690" y1="170" x2="690" y2="50" stroke="#CCFF00" strokeWidth="2" opacity="0.9" />
          <circle cx="690" cy="45" r="4" fill="#CCFF00" className="animate-ping" style={{ animationDuration: '1.8s' }} />
          <circle cx="690" cy="45" r="3" fill="#FFFFFF" />

          {/* Spire 4 */}
          <line x1="920" y1="210" x2="920" y2="105" stroke="#00F0FF" strokeWidth="2" opacity="0.8" />
          <circle cx="920" cy="100" r="4" fill="#00F0FF" className="animate-ping" style={{ animationDuration: '2.2s' }} />
          <circle cx="920" cy="100" r="3" fill="#FFFFFF" />

          {/* Spire 5 */}
          <line x1="1150" y1="190" x2="1150" y2="80" stroke="#FF0055" strokeWidth="2" opacity="0.8" />
          <circle cx="1150" cy="75" r="4" fill="#FF0055" className="animate-ping" style={{ animationDuration: '2.7s' }} />
          <circle cx="1150" cy="75" r="3" fill="#FFFFFF" />

          {/* LAYER 4: Glowing Neon Cyber Signs on Building Facades */}
          {/* Billboard 1: CYBER_CITY */}
          <g transform="translate(180, 360)">
            <rect x="0" y="0" width="70" height="22" fill="#070912" stroke="#00F0FF" strokeWidth="1.5" />
            <text x="7" y="15" fill="#00F0FF" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="1">CYBER_26</text>
          </g>

          {/* Billboard 2: C++20 */}
          <g transform="translate(470, 320)">
            <rect x="0" y="0" width="60" height="24" fill="#070912" stroke="#FF0055" strokeWidth="1.5" />
            <text x="8" y="16" fill="#FF0055" fontSize="11" fontFamily="monospace" fontWeight="bold">C++ 20</text>
          </g>

          {/* Billboard 3: FSCHOOL */}
          <g transform="translate(730, 260)">
            <rect x="0" y="0" width="75" height="24" fill="#070912" stroke="#CCFF00" strokeWidth="1.5" />
            <text x="8" y="16" fill="#CCFF00" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="1">FSCHOOL</text>
          </g>

          {/* Billboard 4: FAST_IO */}
          <g transform="translate(960, 340)">
            <rect x="0" y="0" width="65" height="22" fill="#070912" stroke="#00F0FF" strokeWidth="1.5" />
            <text x="8" y="15" fill="#00F0FF" fontSize="10" fontFamily="monospace" fontWeight="bold">FAST_IO</text>
          </g>

          {/* Billboard 5: O(N log N) */}
          <g transform="translate(1200, 310)">
            <rect x="0" y="0" width="80" height="22" fill="#070912" stroke="#FF0055" strokeWidth="1.5" />
            <text x="6" y="15" fill="#FF0055" fontSize="10" fontFamily="monospace" fontWeight="bold">O(N log N)</text>
          </g>

          {/* LAYER 5: Foreground Industrial Silhouette & Highway Deck */}
          <path 
            d="M0 760V560H90V500H180V600H300V520H420V620H550V480H680V580H800V490H930V590H1060V510H1180V610H1310V530H1440V760H0Z" 
            fill="#151A30" 
          />
          {/* Ground Horizon Neon Rim Line */}
          <line x1="0" y1="560" x2="1440" y2="560" stroke="#00F0FF" strokeWidth="1" opacity="0.35" />
        </svg>
      </div>

      {/* 5. Cyber Laser Scanning Sweep */}
      <div 
        className="absolute inset-x-0 h-[2px] opacity-35"
        style={{
          background: 'linear-gradient(90deg, transparent, #00F0FF, #FF0055, #CCFF00, transparent)',
          animation: 'laserScan 9s linear infinite',
          boxShadow: '0 0 16px #00F0FF'
        }}
      />

      {/* 6. Subtle Cyber Matrix Perspective Ground Grid */}
      <div className="absolute inset-0 opacity-[0.07] cyber-grid pointer-events-none" />

      {/* 7. CRT Vintage / Cyber Scanline Texture */}
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      <style>{`
        @keyframes laserScan {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 0.5; }
          85% { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes skywayTraffic {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        @keyframes skywayTrafficRev {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
