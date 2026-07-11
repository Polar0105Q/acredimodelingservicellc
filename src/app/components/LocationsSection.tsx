'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface LocationsSectionProps {
  lang: 'en' | 'es';
}

const t = {
  en: {
    label: 'Where We Work',
    heading: 'Serving the High Country & Foothills',
    sub: 'Established in 2019 and fully insured for residential finish work across our local service area.',
    areas: ['Sugar Mountain', 'Blowing Rock', 'Boone', 'Hickory', 'Morganton', 'Lenoir'],
    office: 'Service Area',
    address: 'Sugar Mountain · Blowing Rock · Boone\nHickory · Morganton · Lenoir',
    phone: '828-292-4453 / 828-292-3566',
    email: 'info@remodelingservicellc.com',
    hours: 'Mon–Fri: 8AM–6PM\nSat: 9AM–3PM',
    hoursLabel: 'Business Hours',
  },
  es: {
    label: 'Dónde Trabajamos',
    heading: 'Sirviendo High Country y Foothills',
    sub: 'Establecidos desde 2019 y totalmente asegurados para trabajos residenciales de acabado.',
    areas: ['Sugar Mountain', 'Blowing Rock', 'Boone', 'Hickory', 'Morganton', 'Lenoir'],
    office: 'Area de Servicio',
    address: 'Sugar Mountain · Blowing Rock · Boone\nHickory · Morganton · Lenoir',
    phone: '828-292-4453 / 828-292-3566',
    email: 'info@remodelingservicellc.com',
    hours: 'Lun–Vie: 8AM–6PM\nSáb: 9AM–3PM',
    hoursLabel: 'Horario de Atención',
  },
};

export default function LocationsSection({ lang }: LocationsSectionProps) {
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

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16 reveal">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
            {tx.label}
          </span>
          <h2 className="text-section font-display font-bold text-foreground mb-4">{tx.heading}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">{tx.sub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service area map */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[400px] reveal">
            <div className="absolute inset-0 map-gradient" />
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 30%, rgba(255,190,0,0.18), transparent 24%), radial-gradient(circle at 80% 70%, rgba(17,17,17,0.18), transparent 28%), linear-gradient(rgba(17,17,17,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.08) 1px, transparent 1px)',
                backgroundSize: '100% 100%, 100% 100%, 42px 42px, 42px 42px',
              }}
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'repeating-radial-gradient(ellipse at 35% 45%, transparent 0 28px, rgba(17,17,17,0.12) 29px 30px)',
              }}
            />
            {/* Service area dots */}
            {[
              { top: '22%', left: '36%', label: 'Sugar Mountain' },
              { top: '34%', left: '48%', label: 'Boone' },
              { top: '40%', left: '58%', label: 'Blowing Rock' },
              { top: '58%', left: '70%', label: 'Lenoir' },
              { top: '70%', left: '54%', label: 'Hickory' },
              { top: '78%', left: '38%', label: 'Morganton' },
            ].map((dot) => (
              <div
                key={dot.label}
                className="absolute flex flex-col items-center gap-1"
                style={{ top: dot.top, left: dot.left, transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50 animate-pulse" />
                <span className="text-xs text-foreground font-semibold bg-white/75 border border-black/10 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                  {dot.label}
                </span>
              </div>
            ))}
            {/* Main service marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[var(--brand-ink)] shadow-xl flex items-center justify-center ring-4 ring-white/50">
                <div className="w-3 h-3 rounded-full bg-accent" />
              </div>
              <span className="text-xs text-white font-bold bg-[var(--brand-ink)] px-3 py-1 rounded-full">
                EST. 2019
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 glass-card rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shadow-sm">
                <Icon
                  name="MapPinIcon"
                  size={16}
                  variant="solid"
                  className="text-accent-foreground"
                />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Service Area
                </span>
                <span className="block text-xs text-white/60 truncate sm:whitespace-normal">
                  Sugar Mountain · Blowing Rock · Boone · Hickory · Morganton · Lenoir
                </span>
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div className="flex flex-col gap-5 reveal">
            {/* Office info */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon
                    name="BuildingOffice2Icon"
                    size={20}
                    variant="outline"
                    className="text-primary"
                  />
                </div>
                <span className="font-semibold text-foreground">{tx.office}</span>
              </div>
              <address className="not-italic text-sm text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
                {tx.address}
              </address>
              <div className="space-y-2">
                <a
                  href="tel:8282924453"
                  className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                  <Icon name="PhoneIcon" size={14} variant="outline" className="text-accent" />
                  {tx.phone}
                </a>
                <a
                  href={`mailto:${tx.email}`}
                  className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                  <Icon name="EnvelopeIcon" size={14} variant="outline" className="text-accent" />
                  {tx.email}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Icon
                    name="ClockIcon"
                    size={20}
                    variant="outline"
                    className="text-accent-foreground"
                  />
                </div>
                <span className="font-semibold text-foreground">{tx.hoursLabel}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {tx.hours}
              </p>
            </div>

            {/* Service areas */}
            <div className="bg-secondary border border-border rounded-2xl p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">
                Service Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {tx.areas.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 rounded-full bg-background border border-border text-xs font-medium text-muted-foreground"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
