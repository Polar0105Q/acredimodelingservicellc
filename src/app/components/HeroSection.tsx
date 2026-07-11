'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  lang: 'en' | 'es';
}

const t = {
  en: {
    badge: 'Est. 2019 - Fully Insured',
    headline1: 'TRANSFORM',
    headline2: 'SPACES',
    sub: 'Premium remodeling solutions for homes and businesses with craftsmanship, innovation, and attention to detail.',
    cta1: 'Get Free Estimate',
    cta2: 'View Projects',
    stat1: '18+',
    stat1l: 'Years Experience',
    stat2: '1,200+',
    stat2l: 'Projects Done',
    stat3: '98%',
    stat3l: 'Satisfaction Rate',
    scroll: 'Scroll',
  },
  es: {
    badge: 'Est. 2019 - Totalmente Asegurados',
    headline1: 'TRANSFORMA',
    headline2: 'ESPACIOS',
    sub: 'Soluciones premium de remodelación para hogares y negocios con artesanía, innovación y atención al detalle.',
    cta1: 'Estimado Gratis',
    cta2: 'Ver Proyectos',
    stat1: '18+',
    stat1l: 'Años de Experiencia',
    stat2: '1,200+',
    stat2l: 'Proyectos Realizados',
    stat3: '98%',
    stat3l: 'Satisfacción',
    scroll: 'Desplazar',
  },
};

export default function HeroSection({ lang }: HeroSectionProps) {
  const tx = t[lang];
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { innerWidth, innerHeight } = window;
      const mx = (e.clientX / innerWidth - 0.5) * 2;
      const my = (e.clientY / innerHeight - 0.5) * 2;
      const blobs = heroRef.current.querySelectorAll<HTMLElement>('[data-parallax]');
      blobs.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '1');
        el.style.transform = `translate(${mx * speed * 30}px, ${my * speed * 20}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-[100svh] overflow-hidden flex flex-col justify-end pt-28 pb-16 md:pb-16 lg:pb-20 noise-overlay"
    >
      {/* Background Image — cinematic entrance */}
      <div className="absolute inset-0 z-0 bg-foreground">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1f651b492-1772835299818.png"
          alt="Luxury kitchen remodel with dark cabinetry, marble countertops, and dramatic pendant lighting in a modern open-plan space"
          fill
          priority
          className="object-cover animate-cinematic opacity-0"
          sizes="100vw"
        />

        {/* Dark scrim — strong for white text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      {/* Atmospheric depth blobs */}
      <div
        data-parallax="0.4"
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blob-primary animate-blob pointer-events-none z-1"
        style={{ transition: 'transform 0.3s ease-out' }}
      />

      <div
        data-parallax="0.7"
        className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full blob-accent animate-blob pointer-events-none z-1"
        style={{ animationDelay: '3s', transition: 'transform 0.3s ease-out' }}
      />

      {/* Main content grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-10 xl:px-12 grid grid-cols-1 xl:grid-cols-12 gap-7 xl:gap-8 items-end">
        {/* Left: Headline */}
        <div className="xl:col-span-6 min-w-0">
          {/* Badge */}
          <div
            className="flex items-center gap-3 mb-6 animate-slide-up opacity-0"
            style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
          >
            <span className="h-px w-8 bg-accent" />
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              {tx.badge}
            </span>
          </div>

          <h1 className="max-w-[42rem] font-display font-bold text-white tracking-tight">
            <span
              className="block text-hero animate-slide-up opacity-0"
              style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
            >
              {tx.headline1}
            </span>
            <span
              className="block text-hero text-gradient-gold animate-slide-up opacity-0"
              style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}
            >
              {tx.headline2}
            </span>
          </h1>
        </div>

        {/* Right: Glassmorphism card */}
        <div
          className="max-w-xl xl:max-w-md 2xl:max-w-lg xl:col-span-5 xl:col-start-8 xl:justify-self-end animate-slide-up opacity-0"
          style={{ animationDelay: '1.6s', animationFillMode: 'forwards' }}
        >
          <div className="relative overflow-hidden glass-card rounded-3xl p-5 sm:p-6 md:p-7 shadow-2xl">
            {/* Shimmer */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none animate-shimmer z-0" />

            <div className="relative z-10">
              <p className="text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed mb-6 md:mb-8">
                {tx.sub}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 border-t border-white/15 pt-5 md:pt-6 mb-6 md:mb-8">
                {[
                  { val: tx.stat1, label: tx.stat1l },
                  { val: tx.stat2, label: tx.stat2l },
                  { val: tx.stat3, label: tx.stat3l },
                ].map((stat) => (
                  <div key={stat.label}>
                    <span className="block text-xl md:text-2xl font-display font-bold text-accent">
                      {stat.val}
                    </span>
                    <span className="block text-[0.62rem] sm:text-xs uppercase tracking-wider text-white/40 mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/30"
                >
                  {tx.cta1}
                  <Icon name="ArrowRightIcon" size={16} variant="outline" />
                </a>
                <a
                  href="#projects"
                  className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 border border-white/20 text-white rounded-xl text-sm font-semibold hover:bg-white/10 transition-all"
                >
                  {tx.cta2}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 hidden flex-col items-center gap-2 z-10 animate-slide-up opacity-0 sm:flex"
        style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}
      >
        <span className="text-xs uppercase tracking-widest text-white/30">{tx.scroll}</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-scroll-bounce" />
      </div>
    </section>
  );
}
