'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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
    after: 'Current',
    compareHint: 'Tap to switch before/current',
    preview: 'Preview',
    closePreview: 'Close preview',
    viewAll: 'Start Your Project',
    homeLabel: 'Featured Home Project',
    homeHeading: 'Tongue & Groove Ceiling & Home Refresh',
    homeSub:
      'A beautiful residential transformation featuring stunning tongue & groove ceilings, custom stairs and elegant railing details.',
  },
  es: {
    label: 'Nuestro Trabajo',
    heading: 'Transformaciones Reales',
    sub: 'Antes y actual de trabajos recientes de pintura, carpinteria, pisos, drywall y exterior.',
    filters: ['Todo', 'Carpinteria', 'Pintura', 'Cocina', 'Bano', 'Exterior'],
    before: 'Antes',
    after: 'Actual',
    compareHint: 'Toca para alternar antes/actual',
    preview: 'Ampliar',
    closePreview: 'Cerrar preview',
    viewAll: 'Iniciar Proyecto',
    homeLabel: 'Proyecto Casa',
    homeHeading: 'Tongue & Groove Ceiling & Home Refresh',
    homeSub:
      'Una hermosa transformacion residencial con impresionantes cielos tongue & groove, escaleras personalizadas y elegantes detalles de baranda.',
  },
};

const projects = [
  {
    id: 1,
    category: 'Painting',
    title: 'Built-In Cabinet Painting',
    titleEs: 'Pintura de Gabinete Empotrado',
    detail: 'Interior Painting',
    detailEs: 'Pintura Interior',
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
    titleEs: 'Renovacion de Mueble de Pared',
    detail: 'Finish Carpentry',
    detailEs: 'Carpinteria de Acabado',
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
    titleEs: 'Actualizacion de Barandal Interior',
    detail: 'Interior Painting',
    detailEs: 'Pintura Interior',
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
    titleEs: 'Acabado de Gabinetes de Cocina',
    detail: 'Cabinet Painting',
    detailEs: 'Pintura de Gabinetes',
    before: '/assets/images/projects/kitchen-cabinet-before.webp',
    after: '/assets/images/projects/kitchen-cabinet-after.webp',
    beforeAlt: 'Kitchen cabinets before painting',
    afterAlt: 'Green kitchen cabinets after painting and finish work',
    featured: false,
  },
  {
    id: 5,
    category: 'Bathroom',
    title: 'Custom Shower Renovation',
    titleEs: 'Renovacion de Ducha Personalizada',
    detail: 'Drywall & Finishing',
    detailEs: 'Drywall y Acabados',
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
    titleEs: 'Instalacion de Puerta Exterior',
    detail: 'Exterior Finish Work',
    detailEs: 'Acabados Exteriores',
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
    alt: 'Residential interior hallway with Tongue and Groove ceiling detail and flooring',
  },
  {
    src: '/assets/images/projects/home-project-2.webp',
    alt: 'Wood staircase and interior finish details',
  },
  {
    src: '/assets/images/projects/home-project-3.webp',
    alt: 'Open residential interior with T&G ceiling and staircase',
  },
  {
    src: '/assets/images/projects/home-project-4.webp',
    alt: 'Finished wooden stairs with wall handrail',
  },
  {
    src: '/assets/images/projects/home-project-5.webp',
    alt: 'Bright living space with Tongue and Groove ceiling and tall windows',
  },
  {
    src: '/assets/images/projects/home-project-6.webp',
    alt: 'Residential interior view with staircase and wood finishes',
  },
  {
    src: '/assets/images/projects/home-project-7.webp',
    alt: 'T&G ceiling living room with large windows and natural light',
  },
  {
    src: '/assets/images/projects/home-project-8.webp',
    alt: 'Upper railing and Tongue and Groove ceiling detail in finished home project',
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

const categoryLabels: Record<'en' | 'es', Record<string, string>> = {
  en: {
    Painting: 'Painting',
    Carpentry: 'Carpentry',
    Kitchen: 'Kitchen',
    Bathroom: 'Bathroom',
    Exterior: 'Exterior',
  },
  es: {
    Painting: 'Pintura',
    Carpentry: 'Carpinteria',
    Kitchen: 'Cocina',
    Bathroom: 'Bano',
    Exterior: 'Exterior',
  },
};

type PreviewImage = {
  src: string;
  alt: string;
  title: string;
  label?: string;
};

export default function PortfolioSection({ lang }: PortfolioSectionProps) {
  const tx = t[lang];
  const [activeFilter, setActiveFilter] = useState(tx.filters[0]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeCompareId, setActiveCompareId] = useState<number | null>(null);
  const [preview, setPreview] = useState<PreviewImage | null>(null);
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
                el.classList.add('visible');
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
  }, [lang]);

  const normalizedFilter = filterMap[activeFilter] || 'All';
  const filtered =
    normalizedFilter === 'All' ? projects : projects.filter((p) => p.category === normalizedFilter);

  useEffect(() => {
    setHoveredId(null);
    setActiveCompareId(null);
  }, [activeFilter]);

  useEffect(() => {
    if (!preview) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreview(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [preview]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-secondary relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-96 h-96 blob-accent animate-blob pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
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

        <div className="-mx-5 sm:-mx-6 px-5 sm:px-6 mb-10 overflow-x-auto hide-scrollbar reveal">
          <div className="flex w-max min-w-full gap-2.5 pr-5">
            {tx.filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`min-w-[6.25rem] whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 sm:min-w-[6.75rem] ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((project, idx) => {
            const isFeatured = project.featured && filtered.length > 2;
            const showAfter = hoveredId === project.id || activeCompareId === project.id;
            const title = lang === 'es' ? project.titleEs : project.title;
            const detail = lang === 'es' ? project.detailEs : project.detail;
            const category = categoryLabels[lang][project.category] || project.category;
            const previewImage = showAfter
              ? { src: project.after, alt: project.afterAlt, title, label: tx.after }
              : { src: project.before, alt: project.beforeAlt, title, label: tx.before };

            return (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                aria-label={`${title}: ${tx.compareHint}`}
                aria-pressed={showAfter}
                className={`portfolio-card group relative rounded-3xl overflow-hidden bg-card border border-border cursor-pointer ${
                  isFeatured
                    ? 'min-h-[430px] lg:min-h-[480px] lg:col-span-2 lg:row-span-2'
                    : 'min-h-[390px] lg:min-h-[280px]'
                }`}
                style={{ transitionDelay: `${idx * 80}ms` }}
                onPointerEnter={(event) => {
                  if (event.pointerType === 'mouse') {
                    setHoveredId(project.id);
                  }
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === 'mouse') {
                    setHoveredId(null);
                  }
                }}
                onClick={() =>
                  setActiveCompareId((current) => (current === project.id ? null : project.id))
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveCompareId((current) => (current === project.id ? null : project.id));
                  }
                }}
              >
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={project.before}
                    alt={project.beforeAlt}
                    fill
                    className={`absolute inset-0 card-img object-cover transition-all duration-700 ${
                      showAfter ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                  />

                  <Image
                    src={project.after}
                    alt={project.afterAlt}
                    fill
                    className={`absolute inset-0 card-img object-cover transition-all duration-700 ${
                      showAfter ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                  />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider transition-all duration-300 ${
                        showAfter
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-black/55 text-white backdrop-blur-sm'
                      }`}
                    >
                      {showAfter ? tx.after : tx.before}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
                </div>

                <button
                  type="button"
                  aria-label={`${tx.preview}: ${title}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setPreview(previewImage);
                  }}
                  className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white shadow-xl backdrop-blur-md transition-all hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  <Icon name="ArrowsPointingOutIcon" size={18} variant="outline" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-5 pr-16 sm:p-6 sm:pr-16">
                  <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                    {category}
                  </span>
                  <h3 className="text-[1.05rem] font-display font-bold text-white mt-1 leading-tight sm:text-lg">
                    {title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-sm text-white/65">
                    <Icon name="TagIcon" size={12} variant="outline" />
                    <span>{detail}</span>
                  </div>
                  <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-wider text-white/55">
                    {tx.compareHint}
                  </p>
                </div>
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
              <button
                key={image.src}
                type="button"
                onClick={() =>
                  setPreview({
                    src: image.src,
                    alt: image.alt,
                    title: tx.homeHeading,
                    label: `${i + 1} / ${homeProjectImages.length}`,
                  })
                }
                className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card border border-border reveal group"
                style={{ transitionDelay: `${i * 60}ms` }}
                aria-label={`${tx.preview}: ${tx.homeHeading}`}
              >
                <AppImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={75}
                />
                <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white opacity-100 shadow-xl backdrop-blur-md transition-all group-hover:bg-black/70 md:opacity-0 md:group-hover:opacity-100">
                  <Icon name="ArrowsPointingOutIcon" size={17} variant="outline" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 px-4 py-5"
          role="dialog"
          aria-modal="true"
          aria-label={preview.title}
          onClick={() => setPreview(null)}
        >
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70"
            aria-label={tx.closePreview}
          >
            <Icon name="XMarkIcon" size={22} variant="outline" />
          </button>

          <div
            className="relative flex h-full w-full max-w-6xl flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4 text-white">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{preview.title}</p>
                {preview.label && (
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-white/60">
                    {preview.label}
                  </p>
                )}
              </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-black">
              <Image
                src={preview.src}
                alt={preview.alt}
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
