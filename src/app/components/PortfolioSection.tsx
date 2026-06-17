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
    heading: 'Transformations That Speak',
    sub: 'Every project tells a story of craft, precision, and elevated living.',
    filters: ['All', 'Kitchen', 'Bathroom', 'Living Spaces', 'Commercial'],
    before: 'Before',
    after: 'After',
    viewAll: 'View All Projects',
  },
  es: {
    label: 'Nuestro Trabajo',
    heading: 'Transformaciones que Hablan',
    sub: 'Cada proyecto cuenta una historia de artesanía, precisión y vida elevada.',
    filters: ['Todo', 'Cocinas', 'Baños', 'Salas', 'Comercial'],
    before: 'Antes',
    after: 'Después',
    viewAll: 'Ver Todos los Proyectos',
  },
};

const projects = [
  {
    id: 1,
    category: 'Kitchen',
    title: "Modern Chef's Kitchen",
    location: 'Coral Gables, FL',
    value: '$85,000',
    before: 'https://img.rocket.new/generatedImages/rocket_gen_img_18ded5bf4-1764766015972.png',
    after: 'https://img.rocket.new/generatedImages/rocket_gen_img_18ded5bf4-1764766015972.png',
    beforeAlt:
      'Outdated kitchen with worn cabinets, old appliances, and poor lighting before renovation',
    afterAlt:
      'Stunning modern kitchen with white marble countertops, custom navy cabinetry, and gold fixtures after renovation',
    span: 'lg:col-span-2 lg:row-span-2',
    featured: true,
  },
  {
    id: 2,
    category: 'Bathroom',
    title: 'Spa Master Bath',
    location: 'Brickell, FL',
    value: '$42,000',
    before: 'https://img.rocket.new/generatedImages/rocket_gen_img_10d1c45f5-1769307617185.png',
    after: 'https://img.rocket.new/generatedImages/rocket_gen_img_10d1c45f5-1769307617185.png',
    beforeAlt: 'Small dated bathroom with old tiles and cramped layout before renovation',
    afterAlt:
      'Luxurious spa-inspired master bathroom with rainfall shower and marble tiles after renovation',
    span: '',
    featured: false,
  },
  {
    id: 3,
    category: 'Living Spaces',
    title: 'Open-Concept Living',
    location: 'Miami Beach, FL',
    value: '$120,000',
    before: 'https://img.rocket.new/generatedImages/rocket_gen_img_19b5be177-1772213829137.png',
    after: 'https://img.rocket.new/generatedImages/rocket_gen_img_19b5be177-1772213829137.png',
    beforeAlt: 'Closed-off living room with dark walls and separated spaces before renovation',
    afterAlt:
      'Bright open-concept living area with white walls, modern furniture, and abundant natural light after renovation',
    span: '',
    featured: false,
  },
  {
    id: 4,
    category: 'Commercial',
    title: 'Boutique Office Suite',
    location: 'Wynwood, FL',
    value: '$200,000',
    before: 'https://img.rocket.new/generatedImages/rocket_gen_img_100e3645c-1777460012009.png',
    after: 'https://img.rocket.new/generatedImages/rocket_gen_img_100e3645c-1777460012009.png',
    beforeAlt: 'Empty commercial office space with bare walls and old flooring before renovation',
    afterAlt:
      'Modern boutique office with glass partitions, custom millwork, and designer lighting after renovation',
    span: '',
    featured: false,
  },
  {
    id: 5,
    category: 'Kitchen',
    title: 'Coastal Kitchen Refresh',
    location: 'Key Biscayne, FL',
    value: '$55,000',
    before: 'https://img.rocket.new/generatedImages/rocket_gen_img_199ccac9a-1772118176011.png',
    after: 'https://img.rocket.new/generatedImages/rocket_gen_img_199ccac9a-1772118176011.png',
    beforeAlt: 'Old kitchen with dark wood and limited counter space before renovation',
    afterAlt:
      'Coastal-inspired kitchen with white shaker cabinets, quartz counters, and subway tile after renovation',
    span: '',
    featured: false,
  },
];

const filterMap: Record<string, string> = {
  All: 'All',
  Todo: 'All',
  Kitchen: 'Kitchen',
  Cocinas: 'Kitchen',
  Bathroom: 'Bathroom',
  Baños: 'Bathroom',
  'Living Spaces': 'Living Spaces',
  Salas: 'Living Spaces',
  Commercial: 'Commercial',
  Comercial: 'Commercial',
};

export default function PortfolioSection({ lang }: PortfolioSectionProps) {
  const tx = t[lang];
  const [activeFilter, setActiveFilter] = useState(tx.filters[0]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
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
        {/* Header */}
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

        {/* Filter tabs */}
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

        {/* Portfolio grid */}
        {/* BENTO AUDIT (filtered=All, 5 cards):
           Row 1: [col-1-2: Kitchen cs-2 rs-2 (featured)] [col-3: Bathroom cs-1] [col-4: Living cs-1]
           Row 2: [col-1-2: Kitchen CONTINUED]             [col-3: Commercial cs-1] [col-4: CoastalKitchen cs-1]
           Placed 5/5 cards ✓
          */}
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
                style={{
                  transitionDelay: `${idx * 80}ms`,
                }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Before/After toggle */}
                <div className="absolute inset-0 w-full h-full">
                  <AppImage
                    src={hoveredId === project.id ? project.after : project.before}
                    alt={hoveredId === project.id ? project.afterAlt : project.beforeAlt}
                    fill
                    className="card-img object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                {/* Before/After badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      hoveredId !== project.id
                        ? 'bg-black/50 text-white backdrop-blur-sm'
                        : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    {hoveredId === project.id ? tx.after : tx.before}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-display font-bold text-white mt-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="min-w-0 text-sm text-white/60 flex items-center gap-1">
                      <Icon name="MapPinIcon" size={12} variant="outline" />
                      <span className="truncate">{project.location}</span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-accent">
                      {project.value}
                    </span>
                  </div>
                </div>

                {/* Hover hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-col items-center gap-2 text-white">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <Icon name="ArrowsRightLeftIcon" size={20} variant="outline" />
                    </div>
                    <span className="text-xs font-medium">
                      {tx.before} → {tx.after}
                    </span>
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
