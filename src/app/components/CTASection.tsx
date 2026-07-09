'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface CTASectionProps {
  lang: 'en' | 'es';
}

const t = {
  en: {
    heading: 'Ready to Transform Your Space?',
    sub: 'Join 1,200+ homeowners and businesses who chose AC Remodeling Service LLC for their most important projects.',
    cta: 'Request Your Free Estimate Today',
    call: 'Or call us directly',
    phone: '828-292-4453 / 828-292-3566',
    guarantee: 'Free consultation · No obligation · Fully insured',
  },
  es: {
    heading: '¿Listo para Transformar Tu Espacio?',
    sub: 'Únete a más de 1,200 propietarios y negocios que eligieron AC Remodeling Service LLC.',
    cta: 'Solicita Tu Estimado Gratis Hoy',
    call: 'O llámanos directamente',
    phone: '828-292-4453 / 828-292-3566',
    guarantee: 'Consulta gratis · Sin obligación · Totalmente asegurados',
  },
};

export default function CTASection({ lang }: CTASectionProps) {
  const tx = t[lang];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('animate-in-scroll');
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 px-5 md:px-6 bg-background relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative">
        {/* Background card */}
        <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden min-h-[360px] md:min-h-[400px] flex items-center">
          {/* Background image */}
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_12253e59e-1772950411886.png"
            alt="Beautifully renovated living room with warm lighting, high ceilings, and modern furniture in a luxury home"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 80rem"
            quality={75}
          />

          {/* Strong dark scrim for white text */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
          {/* Blue tint overlay */}
          <div className="absolute inset-0 bg-primary/20" />

          {/* Decorative blob */}
          <div className="absolute top-0 right-0 w-96 h-96 blob-accent animate-blob opacity-20 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 w-full px-6 md:px-16 py-12 md:py-16">
            <div className="max-w-2xl reveal">
              <h2 className="text-display font-display font-bold text-white mb-5 md:mb-6">
                {tx.heading}
              </h2>
              <p className="text-base md:text-lg text-white/70 mb-7 md:mb-8 leading-relaxed">
                {tx.sub}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 px-5 sm:px-8 py-4 bg-accent text-accent-foreground rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-2xl shadow-accent/30 hover:shadow-accent/50"
                >
                  {tx.cta}
                  <Icon name="ArrowRightIcon" size={18} variant="outline" />
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-4">
                <span className="text-sm text-white/50">{tx.call}</span>
                <a
                  href="tel:8282924453"
                  className="text-accent font-bold text-sm hover:opacity-80 transition-opacity"
                >
                  {tx.phone}
                </a>
              </div>

              <p className="text-xs text-white/40 flex items-start sm:items-center gap-2">
                <Icon name="CheckCircleIcon" size={14} variant="outline" className="text-accent" />
                {tx.guarantee}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
