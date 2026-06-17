'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollTimeline from '@/components/ScrollTimeline';
import HeroSection from './components/HeroSection';
import TrustStats from './components/TrustStats';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import WhyUsSection from './components/WhyUsSection';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import LocationsSection from './components/LocationsSection';
import CTASection from './components/CTASection';
import ContactSection from './components/ContactSection';

export default function HomePage() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList?.add('dark');
    } else {
      root.classList?.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Global vertical grid lines */}
      <div className="grid-lines">
        <div className="grid-line" />
        <div className="grid-line hidden md:block" />
        <div className="grid-line hidden md:block" />
        <div className="grid-line" />
      </div>

      <Header lang={lang} theme={theme} onLangChange={setLang} onThemeChange={setTheme} />
      <ScrollTimeline lang={lang} />

      <main>
        <HeroSection lang={lang} />
        <TrustStats lang={lang} />
        <ServicesSection lang={lang} />
        <PortfolioSection lang={lang} />
        <WhyUsSection lang={lang} />
        <ProcessSection lang={lang} />
        <TestimonialsSection lang={lang} />
        <LocationsSection lang={lang} />
        <CTASection lang={lang} />
        <ContactSection lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
