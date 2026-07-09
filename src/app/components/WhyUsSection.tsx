'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface WhyUsSectionProps {
  lang: 'en' | 'es';
}

const t = {
  en: {
    label: 'Why Choose Us',
    heading: 'The Remodeling Service Difference',
    sub: "We've built our reputation on results that exceed expectations every time.",
    reasons: [
      {
        icon: 'StarIcon',
        title: 'Premium Materials Only',
        desc: 'We source from trusted suppliers. Every material is selected for durability, aesthetics, and longevity.',
      },
      {
        icon: 'ShieldCheckIcon',
        title: 'Fully Insured',
        desc: 'Fully insured project support with coverage-minded planning. Your investment is protected from day one.',
      },
      {
        icon: 'BanknotesIcon',
        title: 'Transparent Pricing',
        desc: "Detailed written estimates with no hidden fees. You know exactly what you're paying before work begins.",
      },
      {
        icon: 'ClockIcon',
        title: 'On-Time Delivery',
        desc: 'We honor our timelines and keep every phase organized with clear communication.',
      },
      {
        icon: 'UserGroupIcon',
        title: 'Dedicated Project Manager',
        desc: 'One point of contact from start to finish. Your project manager keeps you informed daily.',
      },
    ],
  },
  es: {
    label: 'Por Que Elegirnos',
    heading: 'La Diferencia de Remodeling Service',
    sub: 'Hemos construido nuestra reputacion con resultados que superan expectativas en cada proyecto.',
    reasons: [
      {
        icon: 'StarIcon',
        title: 'Materiales Premium',
        desc: 'Trabajamos con proveedores confiables. Cada material se selecciona por durabilidad, estetica y vida util.',
      },
      {
        icon: 'ShieldCheckIcon',
        title: 'Totalmente Asegurados',
        desc: 'Soporte de proyecto totalmente asegurado con planificacion enfocada en proteger tu inversion.',
      },
      {
        icon: 'BanknotesIcon',
        title: 'Precios Transparentes',
        desc: 'Estimados escritos detallados sin cargos ocultos. Sabes exactamente lo que pagas antes de comenzar.',
      },
      {
        icon: 'ClockIcon',
        title: 'Entrega Puntual',
        desc: 'Honramos los tiempos y mantenemos cada etapa organizada con comunicacion clara.',
      },
      {
        icon: 'UserGroupIcon',
        title: 'Gerente de Proyecto Dedicado',
        desc: 'Un punto de contacto de inicio a fin. Tu gerente te mantiene informado diariamente.',
      },
    ],
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
      className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 blob-primary animate-blob pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-8 md:mb-10 reveal max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
            {tx.label}
          </span>
          <h2 className="text-section font-display font-bold text-foreground mb-4">{tx.heading}</h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{tx.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
    </section>
  );
}
