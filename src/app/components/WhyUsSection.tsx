'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface WhyUsSectionProps {
  lang: 'en' | 'es';
}

const t = {
  en: {
    label: 'Why Choose Us',
    heading: 'The Remodeling Service Difference',
    sub: "We've built our reputation on results that exceed expectations — every time.",
    reasons: [
      {
        icon: 'StarIcon',
        title: 'Premium Materials Only',
        desc: 'We source exclusively from top-tier suppliers. Every material is vetted for durability, aesthetics, and longevity.',
      },
      {
        icon: 'ShieldCheckIcon',
        title: 'Licensed & Insured',
        desc: 'Fully licensed contractors with $5M liability coverage. Your investment is protected from day one.',
      },
      {
        icon: 'BanknotesIcon',
        title: 'Transparent Pricing',
        desc: "Detailed written estimates with no hidden fees. You know exactly what you're paying before work begins.",
      },
      {
        icon: 'ClockIcon',
        title: 'On-Time Delivery',
        desc: 'We honor our timelines. 94% of our projects are completed on or before the promised date.',
      },
      {
        icon: 'WrenchScrewdriverIcon',
        title: '5-Year Warranty',
        desc: 'Industry-leading 5-year craftsmanship warranty on all completed projects.',
      },
      {
        icon: 'UserGroupIcon',
        title: 'Dedicated Project Manager',
        desc: 'One point of contact from start to finish. Your project manager keeps you informed daily.',
      },
    ],
    imageAlt:
      'Professional remodeling team reviewing blueprints in a bright modern kitchen under construction',
    stat1: '5-Year',
    stat1l: 'Craftsmanship Warranty',
    stat2: '94%',
    stat2l: 'On-Time Completion',
  },
  es: {
    label: 'Por Qué Elegirnos',
    heading: 'La Diferencia de Remodeling Service',
    sub: 'Hemos construido nuestra reputación en resultados que superan las expectativas.',
    reasons: [
      {
        icon: 'StarIcon',
        title: 'Solo Materiales Premium',
        desc: 'Sourcing exclusivo de proveedores de primera línea. Cada material es evaluado por durabilidad y estética.',
      },
      {
        icon: 'ShieldCheckIcon',
        title: 'Licenciado y Asegurado',
        desc: 'Contratistas completamente licenciados con $5M de cobertura de responsabilidad.',
      },
      {
        icon: 'BanknotesIcon',
        title: 'Precios Transparentes',
        desc: 'Estimados escritos detallados sin cargos ocultos. Sabes exactamente lo que pagas.',
      },
      {
        icon: 'ClockIcon',
        title: 'Entrega Puntual',
        desc: 'Honramos nuestros plazos. El 94% de nuestros proyectos se completan a tiempo.',
      },
      {
        icon: 'WrenchScrewdriverIcon',
        title: 'Garantía de 5 Años',
        desc: 'Garantía de artesanía líder en la industria en todos los proyectos completados.',
      },
      {
        icon: 'UserGroupIcon',
        title: 'Gerente de Proyecto Dedicado',
        desc: 'Un punto de contacto de inicio a fin. Tu gerente te mantiene informado diariamente.',
      },
    ],
    imageAlt:
      'Equipo profesional de remodelación revisando planos en una moderna cocina en construcción',
    stat1: '5 Años',
    stat1l: 'Garantía de Artesanía',
    stat2: '94%',
    stat2l: 'Completado a Tiempo',
  },
};

export default function WhyUsSection({ lang }: WhyUsSectionProps) {
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
              }, i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 blob-primary animate-blob pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Image + stats sticky companion */}
          <div className="relative reveal">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <AppImage
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1976&auto=format&fit=crop"
                alt={tx.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-6 -right-4 flex flex-col gap-3">
              <div className="glass-light rounded-2xl px-5 py-4 shadow-xl">
                <span className="block text-2xl font-display font-bold text-primary">
                  {tx.stat1}
                </span>
                <span className="block text-xs uppercase tracking-wider text-muted-foreground mt-0.5">
                  {tx.stat1l}
                </span>
              </div>
              <div className="glass-light rounded-2xl px-5 py-4 shadow-xl">
                <span className="block text-2xl font-display font-bold text-accent-foreground">
                  {tx.stat2}
                </span>
                <span className="block text-xs uppercase tracking-wider text-muted-foreground mt-0.5">
                  {tx.stat2l}
                </span>
              </div>
            </div>

            {/* Accent blob */}
            <div className="absolute -top-8 -left-8 w-32 h-32 blob-accent animate-blob opacity-50" />
          </div>

          {/* Right: Reasons */}
          <div className="flex flex-col justify-between h-full">
            <div className="mb-10 reveal">
              <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
                {tx.label}
              </span>
              <h2 className="text-section font-display font-bold text-foreground mb-4">
                {tx.heading}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{tx.sub}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {tx.reasons.map((reason, i) => (
                <div
                  key={reason.title}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-secondary border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-300">
                    <Icon
                      name={reason.icon as 'StarIcon'}
                      size={20}
                      variant="outline"
                      className="text-primary group-hover:text-primary-foreground transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{reason.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
