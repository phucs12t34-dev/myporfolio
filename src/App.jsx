import React from 'react';
import CyberCityBackground from './components/CyberCityBackground';
import CyberNavbar from './components/CyberNavbar';
import StreetHeroSection from './components/StreetHeroSection';
import AttitudeManifestoSection from './components/AttitudeManifestoSection';
import HobbiesStreetCultureSection from './components/HobbiesStreetCultureSection';
import CppArsenalSection from './components/CppArsenalSection';
import StreetConnectSection from './components/StreetConnectSection';
import CyberFooter from './components/CyberFooter';

import { PROFILE_DATA } from './data/profile';

/**
 * CYBER STREET IDENTITY // MAIN APPLICATION
 * A pure object-oriented, 0% 3D model, ultra-smooth,
 * Hip-Hop & Street Cyberpunk personal portfolio for C++ DSA.
 */
export default function App() {
  const { identity, manifesto, hobbies, arsenal, socials } = PROFILE_DATA;

  return (
    <div id="top" className="relative min-h-screen bg-[#07080F] text-[#F1F5F9] selection:bg-[#00F0FF]/30 selection:text-[#00F0FF] overflow-x-hidden font-sans">
      
      {/* Cyberpunk City Skyline Environment (Vector & Pure CSS - Zero 3D Overhead) */}
      <CyberCityBackground />

      {/* Main UI Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Sticky Cyberpunk Header & Interactive Boombox Beat Player */}
        <CyberNavbar identity={identity} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section: Photo Object with 'So stress' Badge, Graffiti Slogan, Spray Can */}
          <StreetHeroSection identity={identity} />

          {/* Attitude & Manifesto: Why C++ & DSA, Raw Metal Mindset, Street Rules */}
          <AttitudeManifestoSection manifesto={manifesto} identity={identity} />

          {/* Hobbies & Street Lifestyle: Hip-hop, Streetwear, Night Owl, Mixtape Cassette */}
          <HobbiesStreetCultureSection hobbies={hobbies} />

          {/* C++ Algorithmic Arsenal: Segment Tree Lazy, DSU, Fast I/O, Code Snippet */}
          <CppArsenalSection arsenal={arsenal} />

          {/* Street Drop / Connect & Social Links */}
          <StreetConnectSection socials={socials} identity={identity} />
        </main>

        {/* Street Footer with Caution Tape & Slogan */}
        <CyberFooter identity={identity} />
      </div>

    </div>
  );
}
