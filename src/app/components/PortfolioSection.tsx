'use client';

import React, { useState, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface PortfolioSectionProps {
  lang: 'en' | 'es';
}

const t = {
  en: {
    label: 'Our Work',
    heading: 'Real Project Transformations',
    sub: 'Before-and-after work from recent painting, carpentry, flooring, drywall, and exterior projects.',
    filters: ['All', 'Carpentry', 'Painting', 'Kitchen', 'Bathroom', 'Exterior'],
    before: 'Before',
    after: 'After',
    viewAll: 'Start Your Project',
    homeLabel: 'Featured Home Project',
    homeHeading: 'Wood Interior Home Refresh',
    homeSub:
      'A warm residential project featuring wood ceilings, stairs, railing details, flooring, and bright interior finishes.',
  },
  es: {
    label: 'Nuestro Trabajo',
    heading: 'Transformaciones Reales',
    sub: 'Antes y despues de trabajos recientes de pintura, carpinteria, pisos, drywall y exterior.',
    filters: ['Todo', 'Carpinteria', 'Pintura', 'Cocina', 'Bano', 'Exterior'],
    before: 'Antes',
    after: 'Despues',
    viewAll: 'Iniciar Proyecto',
    homeLabel: 'Proyecto Casa',
    homeHeading: 'Renovacion Interior en Madera',
    homeSub:
      'Proyecto residencial con cielos en madera, escaleras, barandas, pisos y acabados interiores luminosos.',
  },
};

const projects = [
  {
    id: 1,
    category: 'Painting',
    title: 'Built-In Cabinet Painting',
    detail: 'Interior Painting',
    before: '/assets/images/projects/built-in-cabinet-before.webp',
    after: '/assets/images/projects/built-in-cabinet-after.webp',
    beforeAlt: 'Dark built-in cabinet before interior painting',
    afterAlt: 'Blue painted built-in cabinet after interior painting',
    featured: true,
  },
  {
    id: 2,
    category: 'Carpentry',
    title: 'Wall Unit Finish Refresh',
    detail: 'Finish Carpentry',
    before: '/assets/images/projects/wall-unit-before.webp',
    after: '/assets/images/projects/wall-unit-after.webp',
    beforeAlt: 'Dark wood wall unit before finish update',
    afterAlt: 'White wall unit after finish carpentry and painting',
    featured: false,
  },
  {
    id: 3,
    category: 'Painting',
    title: 'Interior Railing Update',
    detail: 'Interior Painting',
    before: '/assets/images/projects/railing-before.webp',
    after: '/assets/images/projects/railing-after.webp',
    beforeAlt: 'Dark interior railing before painting',
    afterAlt: 'Freshly painted interior railing after update',
    featured: false,
  },
  {
    id: 4,
    category: 'Kitchen',
    title: 'Kitchen Cabinet Finish',
    detail: 'Cabinet Painting',
    before: '/assets/images/projects/kitchen-cabinet-before.webp',
    after: '/assets/images/projects/kitchen-cabinet-after.webp',
    beforeAlt: 'Kitchen cabinets before painting',
    afterAlt: 'Green kitchen cabinets after painting and finish work',
    featured: false,
  },
  {
    id: 5,
    category: 'Bathroom',
    title: 'Shower Wall Upgrade',
    detail: 'Drywall & Finishing',
    before: '/assets/images/projects/shower-before.webp',
    after: '/assets/images/projects/shower-after.webp',
    beforeAlt: 'Shower area before wall finish installation',
    afterAlt: 'Finished shower wall after installation and finishing',
    featured: false,
  },
  {
    id: 6,
    category: 'Exterior',
    title: 'Exterior Door Installation',
    detail: 'Exterior Finish Work',
    before: '/assets/images/projects/exterior-door-before.webp',
    after: '/assets/images/projects/exterior-door-after.webp',
    beforeAlt: 'Exterior wall opening before door installation',
    afterAlt: 'Exterior double door after installation and trim work',
    featured: false,
  },
];

const homeProjectImages = [
  {
    src: '/assets/images/projects/home-project-1.webp',
    alt: 'Residential wood interior hallway with windows and flooring',
  },
  {
    src: '/assets/images/projects/home-project-2.webp',
    alt: 'Wood staircase and interior finish details',
  },
  {
    src: '/assets/images/projects/home-project-3.webp',
    alt: 'Open residential interior with wood ceiling and staircase',
  },
  {
    src: '/assets/images/projects/home-project-4.webp',
    alt: 'Finished wooden stairs with wall handrail',
  },
  {
    src: '/assets/images/projects/home-project-5.webp',
    alt: 'Bright living space with wood ceiling and tall windows',
  },
  {
    src: '/assets/images/projects/home-project-6.webp',
    alt: 'Residential interior view with staircase and wood finishes',
  },
  {
    src: '/assets/images/projects/home-project-7.webp',
    alt: 'Wood ceiling living room with large windows and natural light',
  },
  {
    src: '/assets/images/projects/home-project-8.webp',
    alt: 'Upper railing and wood ceiling detail in finished home project',
  },
];

const filterMap: Record<string, string> = {
  All: 'All',
  Todo: 'All',
  Carpentry: 'Carpentry',
  Carpinteria: 'Carpentry',
  Painting: 'Painting',
  Pintura: 'Painting',
  Kitchen: 'Kitchen',
  Cocina: 'Kitchen',
  Bathroom: 'Bathroom',
  Bano: 'Bathroom',
  Exterior: 'Exterior',
};

export default function PortfolioSection({ lang }: PortfolioSectionProps) {
  const tx = t[lang];
  const [activeFilter, setActiveFilter] = useState(tx.filters[0]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setActiveFilter(tx.filters[0]);
  }, [lang, tx.filters]);

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

  const normalizedFilter = filterMap[activeFilter] || 'All';
  const filtered =
    normalizedFilter === 'All' ? projects : projects.filter((p) => p.category === normalizedFilter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-secondary relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-96 h-96 blob-accent animate-blob pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6 reveal">
          <div>
            <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
              {tx.label}
            </span>
            <h2 className="text-section font-display font-bold text-foreground">{tx.heading}</h2>
            <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-lg">{tx.sub}</p>
          </div>
          <a
            href="#contact"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:gap-4 transition-all duration-300"
          >
            {tx.viewAll} <Icon name="ArrowRightIcon" size={16} variant="outline" />
          </a>
        </div>

        <div className="flex flex-wrap gap-2 mb-10 reveal">
          {tx.filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((project, idx) => {
            const isFeatured = project.featured && filtered.length > 2;

            return (
              <div
                key={project.id}
                className={`portfolio-card group relative rounded-3xl overflow-hidden bg-card border border-border cursor-pointer reveal ${
                  isFeatured
                    ? 'min-h-[360px] lg:min-h-[480px] lg:col-span-2 lg:row-span-2'
                    : 'min-h-[260px] lg:min-h-[280px]'
                }`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="absolute inset-0 w-full h-full">
                  <div className="grid grid-cols-2 h-full">
                    <div className="relative overflow-hidden border-r border-white/20">
                      <AppImage
                        src={project.before}
                        alt={project.beforeAlt}
                        fill
                        className="card-img object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        quality={75}
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider bg-black/55 text-white backdrop-blur-sm">
                        {tx.before}
                      </span>
                    </div>

                    <div className="relative overflow-hidden">
                      <AppImage
                        src={project.after}
                        alt={project.afterAlt}
                        fill
                        className="card-img object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        quality={75}
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider bg-accent text-accent-foreground">
                        {tx.after}
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-display font-bold text-white mt-1">
                    {project.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-sm text-white/65">
                    <Icon name="TagIcon" size={12} variant="outline" />
                    <span>{project.detail}</span>
                  </div>
                </div>
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/30 pointer-events-none" />
              </div>
            );
          })}
        </div>

        <div className="mt-16 md:mt-20 reveal">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
                {tx.homeLabel}
              </span>
              <h3 className="text-section font-display font-bold text-foreground">
                {tx.homeHeading}
              </h3>
              <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-2xl">
                {tx.homeSub}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {homeProjectImages.map((image, i) => (
              <div
                key={image.src}
                className={`relative overflow-hidden rounded-2xl bg-card border border-border reveal ${
                  i === 0 || i === 4 ? 'aspect-[3/4]' : 'aspect-[4/5]'
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <AppImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={75}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
