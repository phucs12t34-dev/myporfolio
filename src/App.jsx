import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Web3DBackground from './components/Web3DBackground';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import CurrentlyLearningSection from './components/CurrentlyLearningSection';
import AchievementsSection from './components/AchievementsSection';
import CertificationsSection from './components/CertificationsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import JournalModal from './components/JournalModal';

import { PORTFOLIO_DATA } from './data/portfolio';
import { ALL_PROJECTS, PROJECT_CATEGORIES } from './data/projects';

export default function App() {
  const [personal] = useState(PORTFOLIO_DATA.personal);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [selectedJournalProject, setSelectedJournalProject] = useState(null);

  const handleOpenDetail = (project) => {
    setSelectedDetail({ project });
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F4F8] selection:bg-[#9B5CFF]/30 selection:text-[#B994FF]">
      {/* Cybernetic Minimal Dark Background (Pure CSS & Dot Grid) */}
      <Web3DBackground />

      {/* Main UI Layer Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Floating Futuristic Navbar */}
        <Navbar personal={personal} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section with Asymmetric Bento & Interactive macOS Terminal */}
          <HeroSection
            personal={personal}
            heroTerminal={PORTFOLIO_DATA.heroTerminal}
          />

          {/* About Section */}
          <AboutSection
            personal={personal}
            facts={PORTFOLIO_DATA.facts}
            philosophy={PORTFOLIO_DATA.philosophy}
          />

          {/* Skills & Technologies Section */}
          <SkillsSection
            skills={PORTFOLIO_DATA.skills}
          />

          {/* Featured Projects with Bento Grid & Search Filter */}
          <ProjectsSection
            projects={ALL_PROJECTS}
            categories={PROJECT_CATEGORIES}
            onOpenDetail={handleOpenDetail}
            onOpenJournal={(proj) => setSelectedJournalProject(proj)}
          />

          {/* Currently Learning Section */}
          <CurrentlyLearningSection
            items={PORTFOLIO_DATA.currentlyLearning}
          />

          {/* Achievements & Milestones Section */}
          <AchievementsSection
            achievements={PORTFOLIO_DATA.achievements}
            placeholderText={PORTFOLIO_DATA.achievementsPlaceholder}
          />

          {/* Certifications Section */}
          <CertificationsSection
            certifications={PORTFOLIO_DATA.certifications}
          />

          {/* Education Section */}
          <EducationSection
            education={PORTFOLIO_DATA.education}
          />

          {/* Contact Section */}
          <ContactSection
            personal={personal}
          />
        </main>

        {/* Futuristic Minimal Footer */}
        <Footer personal={personal} />
      </div>

      {/* Project Detail Modal with Architecture & Specs */}
      {selectedDetail && (
        <ProjectModal
          project={selectedDetail.project}
          onClose={() => setSelectedDetail(null)}
          onOpenJournal={(proj) => {
            setSelectedDetail(null);
            setSelectedJournalProject(proj);
          }}
        />
      )}

      {/* Level 1 & Level 2 Two-Level Project Development Journal Modal */}
      {selectedJournalProject && (
        <JournalModal
          project={selectedJournalProject}
          onClose={() => setSelectedJournalProject(null)}
        />
      )}
    </div>
  );
}
