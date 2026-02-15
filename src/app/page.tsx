'use client';

import React from 'react';
import HeroSection from '@/components/hero/HeroSection';
import ParticleBackground from '@/components/hero/ParticleBackground';
import NationalQualitySection from '@/components/features/NationalQualitySection';
import ServiceCatalog from '@/components/services/ServiceCatalog';
import ProcessSection from '@/components/process/ProcessSection';
import PortfolioSection from '@/components/portfolio/PortfolioSection';
import ContactSection from '@/components/contact/ContactSection';
import TeamSection from '@/components/team/TeamSection';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col bg-transparent text-white selection:bg-electric-blue selection:text-black text-rendering-optimizeLegibility subpixel-antialiased" style={{ zIndex: 2 }}>
      <ParticleBackground />
      <HeroSection />
      <PortfolioSection />
      <NationalQualitySection />
      <ServiceCatalog />
      <ProcessSection />
      <TeamSection />
      <ContactSection />
    </main>
  );
}
