'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProcessSectionProps {
  lang: 'en' | 'es';
}

const t = {
  en: {
    label: 'How It Works',
    heading: 'Our Proven Process',
    sub: 'A disciplined, client-first approach that delivers exceptional results on every project.',
    steps: [
      {
        num: '01',
        icon: 'ChatBubbleLeftRightIcon',
        title: 'Free Consultation',
        desc: 'We meet at your property, listen to your vision, and assess the scope. No obligation, no pressure.',
        duration: '1–2 days',
      },
      {
        num: '02',
        icon: 'DocumentTextIcon',
        title: 'Planning & Estimate',
        desc: 'Detailed written proposal with itemized costs, materials, and project timeline. Fully transparent.',
        duration: '3–5 days',
      },
      {
        num: '03',
        icon: 'PencilSquareIcon',
        title: 'Design & Selection',
        desc: 'Work with our designers to finalize materials, finishes, and layouts. 3D renderings included.',
        duration: '1–2 weeks',
      },
      {
        num: '04',
        icon: 'WrenchScrewdriverIcon',
        title: 'Construction',
        desc: 'Our insured crews execute with precision. Daily progress updates and site cleanliness guaranteed.',
        duration: 'Per scope',
      },
      {
        num: '05',
        icon: 'CheckBadgeIcon',
        title: 'Final Walkthrough',
        desc: 'We walk every inch with you, address any concerns, and hand over your transformed space.',
        duration: '1 day',
      },
    ],
  },
  es: {
    label: 'Cómo Funciona',
    heading: 'Nuestro Proceso Probado',
    sub: 'Un enfoque disciplinado y centrado en el cliente que entrega resultados excepcionales.',
    steps: [
      {
        num: '01',
        icon: 'ChatBubbleLeftRightIcon',
        title: 'Consulta Gratuita',
        desc: 'Nos reunimos en tu propiedad, escuchamos tu visión y evaluamos el alcance. Sin obligación.',
        duration: '1–2 días',
      },
      {
        num: '02',
        icon: 'DocumentTextIcon',
        title: 'Planificación y Estimado',
        desc: 'Propuesta escrita detallada con costos, materiales y cronograma. Completamente transparente.',
        duration: '3–5 días',
      },
      {
        num: '03',
        icon: 'PencilSquareIcon',
        title: 'Diseño y Selección',
        desc: 'Trabaja con nuestros diseñadores para finalizar materiales y acabados. Renders 3D incluidos.',
        duration: '1–2 semanas',
      },
      {
        num: '04',
        icon: 'WrenchScrewdriverIcon',
        title: 'Construcción',
        desc: 'Nuestros equipos asegurados ejecutan con precisión. Actualizaciones diarias garantizadas.',
        duration: 'Por alcance',
      },
      {
        num: '05',
        icon: 'CheckBadgeIcon',
        title: 'Entrega Final',
        desc: 'Recorremos cada detalle contigo, atendemos cualquier inquietud y entregamos tu espacio.',
        duration: '1 día',
      },
    ],
  },
};

export default function ProcessSection({ lang }: ProcessSectionProps) {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-foreground text-background relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-0 w-96 h-96 blob-primary animate-blob pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-10 md:mb-16 reveal">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
            {tx.label}
          </span>
          <h2 className="text-section font-display font-bold text-background mb-4">{tx.heading}</h2>
          <p className="text-base md:text-lg text-background/60 leading-relaxed">{tx.sub}</p>
        </div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
          {tx.steps.map((step, i) => (
            <div key={step.num} className="relative group transition-all duration-300">
              {/* Connector line (desktop) */}
              {i < tx.steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary/40 to-transparent z-0 pointer-events-none" />
              )}

              <div
                className={`relative z-10 p-5 md:p-6 rounded-2xl border transition-all duration-300 ${
                  i === 0
                    ? 'bg-primary border-primary shadow-xl shadow-primary/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {/* Number */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-mono font-bold tracking-widest ${
                      i === 0 ? 'text-accent' : 'text-background/30'
                    }`}
                  >
                    {step.num}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      i === 0 ? 'bg-white/10' : 'bg-white/5'
                    }`}
                  >
                    <Icon
                      name={step.icon as 'ChatBubbleLeftRightIcon'}
                      size={20}
                      variant="outline"
                      className={i === 0 ? 'text-accent' : 'text-background/50'}
                    />
                  </div>
                </div>

                <h3
                  className={`text-base font-display font-bold mb-2 ${
                    i === 0 ? 'text-background' : 'text-background/80'
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed ${
                    i === 0 ? 'text-background/80' : 'text-background/40'
                  }`}
                >
                  {step.desc}
                </p>
                <div
                  className={`mt-4 flex items-center gap-1.5 text-xs font-medium ${
                    i === 0 ? 'text-accent' : 'text-background/30'
                  }`}
                >
                  <Icon name="ClockIcon" size={12} variant="outline" />
                  {step.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
