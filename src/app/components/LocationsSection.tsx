'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface LocationsSectionProps {
  lang: 'en' | 'es';
}

const t = {
  en: {
    label: 'Where We Work',
    heading: 'Serving South Florida',
    sub: 'Licensed and operating across Miami-Dade, Broward, and Palm Beach counties.',
    areas: [
      'Miami / Brickell',
      'Coral Gables',
      'Miami Beach',
      'Coconut Grove',
      'Wynwood',
      'Key Biscayne',
      'Aventura',
      'Fort Lauderdale',
      'Doral',
      'Kendall',
      'Homestead',
      'Palm Beach',
    ],
    office: 'Main Office',
    address: '1200 Brickell Ave, Suite 400\nMiami, FL 33131',
    phone: '(305) 555-0192',
    email: 'info@remodelingservicellc.com',
    hours: 'Mon–Fri: 8AM–6PM\nSat: 9AM–3PM',
    hoursLabel: 'Business Hours',
  },
  es: {
    label: 'Dónde Trabajamos',
    heading: 'Sirviendo el Sur de Florida',
    sub: 'Licenciados y operando en los condados Miami-Dade, Broward y Palm Beach.',
    areas: [
      'Miami / Brickell',
      'Coral Gables',
      'Miami Beach',
      'Coconut Grove',
      'Wynwood',
      'Key Biscayne',
      'Aventura',
      'Fort Lauderdale',
      'Doral',
      'Kendall',
      'Homestead',
      'Palm Beach',
    ],
    office: 'Oficina Principal',
    address: '1200 Brickell Ave, Suite 400\nMiami, FL 33131',
    phone: '(305) 555-0192',
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
      id="locations"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
            {tx.label}
          </span>
          <h2 className="text-section font-display font-bold text-foreground mb-4">{tx.heading}</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">{tx.sub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map placeholder */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden min-h-[400px] reveal">
            <div className="absolute inset-0 map-gradient" />
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            {/* Service area dots */}
            {[
              { top: '30%', left: '45%', label: 'Miami' },
              { top: '20%', left: '55%', label: 'Miami Beach' },
              { top: '45%', left: '40%', label: 'Coral Gables' },
              { top: '15%', left: '48%', label: 'Aventura' },
              { top: '60%', left: '43%', label: 'Kendall' },
              { top: '10%', left: '52%', label: 'Fort Lauderdale' },
            ].map((dot) => (
              <div
                key={dot.label}
                className="absolute flex flex-col items-center gap-1"
                style={{ top: dot.top, left: dot.left, transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50 animate-pulse" />
                <span className="text-xs text-white/80 font-medium bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {dot.label}
                </span>
              </div>
            ))}
            {/* Main office marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white shadow-xl flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <span className="text-xs text-white font-bold bg-primary px-3 py-1 rounded-full">
                HQ
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 glass-card rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
                <Icon
                  name="MapPinIcon"
                  size={16}
                  variant="solid"
                  className="text-accent-foreground"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  South Florida Service Area
                </span>
                <span className="block text-xs text-white/60">
                  Miami-Dade · Broward · Palm Beach
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
                  href={`tel:${tx.phone}`}
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
