'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ServicesSectionProps {
  lang: 'en' | 'es';
}

const t = {
  en: {
    label: 'What We Do',
    heading: 'Professional Remodeling Services',
    sub: 'Focused trade services for clean finishes, durable surfaces, and reliable exterior care.',
    learn: 'Learn More',
    services: [
      {
        icon: 'PaintBrushIcon',
        title: 'Painting & Drywall',
        desc: 'Interior and exterior painting, drywall installation, drywall finishing, and popcorn ceiling removal.',
        tag: 'Core Service',
      },
      {
        icon: 'WrenchScrewdriverIcon',
        title: 'Finish Carpentry',
        desc: 'Doors, baseboards, window trim, and wooden stairs installed with clean detail and careful finishing.',
        tag: '',
      },
      {
        icon: 'Squares2X2Icon',
        title: 'Flooring',
        desc: 'LVP flooring installation with proper preparation, alignment, transitions, and finish details.',
        tag: '',
      },
      {
        icon: 'SparklesIcon',
        title: 'Exterior Services',
        desc: 'Pressure washing for exterior surfaces to restore curb appeal and prepare areas for maintenance.',
        tag: '',
      },
      {
        icon: 'HomeModernIcon',
        title: 'Residential Project Support',
        desc: 'Coordinated finish work that helps homes and small properties look polished, practical, and ready to use.',
        tag: '',
      },
    ],
  },
  es: {
    label: 'Lo Que Hacemos',
    heading: 'Servicios Profesionales de Remodelacion',
    sub: 'Servicios especializados para acabados limpios, superficies duraderas y mantenimiento exterior confiable.',
    learn: 'Saber Mas',
    services: [
      {
        icon: 'PaintBrushIcon',
        title: 'Pintura y Drywall',
        desc: 'Pintura interior y exterior, instalacion de drywall, acabado de drywall y remocion de techo popcorn.',
        tag: 'Servicio Principal',
      },
      {
        icon: 'WrenchScrewdriverIcon',
        title: 'Carpinteria de Acabado',
        desc: 'Puertas, zocalos, molduras de ventanas y escaleras de madera con detalle limpio y buen acabado.',
        tag: '',
      },
      {
        icon: 'Squares2X2Icon',
        title: 'Pisos',
        desc: 'Instalacion de pisos LVP con preparacion correcta, alineacion, transiciones y detalles finales.',
        tag: '',
      },
      {
        icon: 'SparklesIcon',
        title: 'Servicios Exteriores',
        desc: 'Lavado a presion para superficies exteriores, ideal para mejorar la apariencia y preparar mantenimiento.',
        tag: '',
      },
      {
        icon: 'HomeModernIcon',
        title: 'Apoyo para Proyectos Residenciales',
        desc: 'Trabajo coordinado de acabados para que casas y propiedades pequenas luzcan pulidas y funcionales.',
        tag: '',
      },
    ],
  },
};

export default function ServicesSection({ lang }: ServicesSectionProps) {
  const tx = t[lang];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('visible');
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
      id="services"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 blob-primary animate-blob pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-10 md:mb-16 reveal">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
            {tx.label}
          </span>
          <h2 className="text-section font-display font-bold text-foreground mb-4">{tx.heading}</h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{tx.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tx.services.map((service, i) => {
            const featured = i === 0;
            const dark = i === tx.services.length - 1;
            const accent = i === 2;

            return (
              <div
                key={service.title}
                className={`service-card group rounded-3xl p-6 md:p-7 flex flex-col justify-between relative overflow-hidden cursor-pointer reveal transition-all duration-300 ${
                  featured
                    ? 'lg:col-span-2 bg-primary text-primary-foreground min-h-[260px] md:min-h-[320px]'
                    : dark
                      ? 'lg:col-span-2 bg-foreground text-background min-h-[240px] md:min-h-[280px]'
                      : accent
                        ? 'bg-accent/5 border border-accent/20 min-h-[240px] md:min-h-[280px] hover:bg-accent/10 hover:shadow-xl'
                        : 'bg-card border border-border min-h-[240px] md:min-h-[280px] hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {featured && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-blue-800 opacity-90" />
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
                  </>
                )}

                {dark && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground to-gray-800" />
                    <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
                  </>
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div
                      className={`rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        featured
                          ? 'w-14 h-14 bg-white/10'
                          : dark
                            ? 'w-12 h-12 bg-white/10'
                            : accent
                              ? 'w-12 h-12 bg-accent/20'
                              : 'w-12 h-12 bg-primary/10 group-hover:bg-primary'
                      }`}
                    >
                      <Icon
                        name={service.icon}
                        size={featured ? 28 : 24}
                        variant="outline"
                        className={
                          featured || dark
                            ? 'text-accent'
                            : accent
                              ? 'text-accent-foreground'
                              : 'text-primary group-hover:text-primary-foreground'
                        }
                      />
                    </div>

                    {service.tag && (
                      <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider">
                        {service.tag}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3
                      className={`font-display font-bold mb-3 ${
                        featured ? 'text-2xl' : dark ? 'text-xl' : 'text-lg text-card-foreground'
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        featured
                          ? 'text-primary-foreground/70'
                          : dark
                            ? 'text-background/60'
                            : 'text-muted-foreground'
                      }`}
                    >
                      {service.desc}
                    </p>
                  </div>

                  <div
                    className={`mt-6 flex items-center gap-2 font-semibold transition-all duration-300 ${
                      featured || dark
                        ? 'text-sm text-accent group-hover:gap-4'
                        : accent
                          ? 'text-xs text-foreground group-hover:gap-3'
                          : 'text-xs text-primary group-hover:gap-3'
                    }`}
                  >
                    {tx.learn}
                    <Icon
                      name="ArrowRightIcon"
                      size={featured || dark ? 16 : 14}
                      variant="outline"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
