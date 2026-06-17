'use client';

import React, { useEffect, useMemo, useState } from 'react';

interface ScrollTimelineProps {
  lang: 'en' | 'es';
}

const labels = {
  en: [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'why-us', label: 'About' },
    { id: 'process', label: 'Process' },
    { id: 'locations', label: 'Locations' },
    { id: 'contact', label: 'Contact' },
  ],
  es: [
    { id: 'hero', label: 'Inicio' },
    { id: 'services', label: 'Servicios' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'why-us', label: 'Nosotros' },
    { id: 'process', label: 'Proceso' },
    { id: 'locations', label: 'Ubicaciones' },
    { id: 'contact', label: 'Contacto' },
  ],
};

export default function ScrollTimeline({ lang }: ScrollTimelineProps) {
  const items = useMemo(() => labels[lang], [lang]);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(items[0].id);

  useEffect(() => {
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setProgress(Math.min(1, Math.max(0, nextProgress)));

      const midpoint = window.scrollY + window.innerHeight * 0.42;
      const active = items
        .map((item) => {
          const section = document.getElementById(item.id);
          return section ? { id: item.id, top: section.offsetTop } : null;
        })
        .filter(Boolean)
        .reverse()
        .find((item) => item && item.top <= midpoint);

      if (active) setActiveId(active.id);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items]);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[70] h-0.5 bg-transparent md:hidden">
        <div
          className="h-full bg-primary transition-transform duration-150 origin-left"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <nav
        aria-label={lang === 'en' ? 'Page progress' : 'Progreso de pagina'}
        className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3"
      >
        <div className="relative flex flex-col items-center gap-3 rounded-full border border-border bg-background/70 px-2.5 py-3 shadow-lg shadow-black/5 backdrop-blur-xl">
          <div className="absolute top-4 bottom-4 left-1/2 w-px -translate-x-1/2 bg-border" />
          <div
            className="absolute top-4 left-1/2 w-px -translate-x-1/2 bg-primary transition-all duration-150"
            style={{ height: `calc((100% - 2rem) * ${progress})` }}
          />

          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-label={item.label}
                className="group relative z-10 flex h-4 w-4 items-center justify-center"
              >
                <span
                  className={`block rounded-full border transition-all duration-300 ${
                    isActive
                      ? 'h-3.5 w-3.5 border-primary bg-primary shadow-lg shadow-primary/30'
                      : 'h-2.5 w-2.5 border-border bg-background group-hover:border-primary group-hover:bg-primary/20'
                  }`}
                />
                <span className="pointer-events-none absolute right-7 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
