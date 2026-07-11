'use client';

import React, { useState, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TestimonialsSectionProps {
  lang: 'en' | 'es';
}

const t = {
  en: {
    label: 'Client Stories',
    heading: 'What Our Clients Say',
    sub: 'Thousands of families and businesses trust us with their most important spaces.',
  },
  es: {
    label: 'Historias de Clientes',
    heading: 'Lo Que Dicen Nuestros Clientes',
    sub: 'Miles de familias y negocios confían en nosotros para sus espacios más importantes.',
  },
};

const testimonials = [
  {
    name: 'Jennifer Castillo',
    role: 'Homeowner',
    roleEs: 'Propietaria',
    location: 'Boone, NC',
    rating: 5,
    quote:
      'Our kitchen went from a 1980s eyesore to the most beautiful room in the house. The team was professional, clean, and finished 3 days early. The quality is exceptional — every detail was considered.',
    quoteEs:
      'Nuestra cocina pasó de ser un desastre de los 80 a la habitación más hermosa de la casa. El equipo fue profesional, limpio y terminó 3 días antes. La calidad es excepcional.',
    img: 'https://img.rocket.new/generatedImages/rocket_gen_img_12c225ba7-1772167478205.png',
    imgAlt: 'Jennifer Castillo, a smiling woman in her 40s with dark hair, homeowner in Boone',
    project: 'Full Kitchen Remodel',
    value: 'Residential',
  },
  {
    name: 'Marcus Thompson',
    role: 'Business Owner',
    roleEs: 'Empresario',
    location: 'Hickory, NC',
    rating: 5,
    quote:
      'They transformed our 4,000 sq ft office into a modern workspace that our team loves. Stayed on budget, on time, and the communication was outstanding throughout the entire project.',
    quoteEs:
      'Transformaron nuestra oficina de 4,000 sq ft en un espacio moderno que nuestro equipo ama. Cumplieron con el presupuesto, el tiempo y la comunicación fue excelente.',
    img: 'https://img.rocket.new/generatedImages/rocket_gen_img_16d40406a-1763299635779.png',
    imgAlt: 'Marcus Thompson, a professional man in his 50s in a suit, business owner in Hickory',
    project: 'Commercial Office Buildout',
    value: 'Commercial',
  },
  {
    name: 'Sofia Reyes',
    role: 'Interior Designer',
    roleEs: 'Diseñadora de Interiores',
    location: 'Blowing Rock, NC',
    rating: 5,
    quote:
      'I recommend Remodeling Service to all my clients. Their craftsmanship is flawless and they execute my designs exactly as intended. My clients appreciate their clear communication and careful finish work.',
    quoteEs:
      'Recomiendo Remodeling Service a todos mis clientes. Su artesania es impecable y ejecutan mis disenos exactamente como se pretende. Mis clientes valoran su comunicacion clara y acabados cuidadosos.',
    img: 'https://img.rocket.new/generatedImages/rocket_gen_img_10bbbf135-1763294543564.png',
    imgAlt:
      'Sofia Reyes, a young Latina woman with a warm smile, interior designer in Blowing Rock',
    project: 'Master Bath + Living Room',
    value: 'Interior Finish',
  },
];

export default function TestimonialsSection({ lang }: TestimonialsSectionProps) {
  const tx = t[lang];
  const [active, setActive] = useState(0);
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
  }, [lang]);

  const current = testimonials[active];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-secondary relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 blob-accent animate-blob opacity-20" />
        <div
          className="absolute bottom-0 left-1/4 w-64 h-64 blob-primary animate-blob opacity-15"
          style={{ animationDelay: '5s' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16 reveal">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
            {tx.label}
          </span>
          <h2 className="text-section font-display font-bold text-foreground mb-4">{tx.heading}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">{tx.sub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Main testimonial */}
          <div className="hidden lg:block reveal">
            <div className="bg-card border border-border rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-48 h-48 blob-primary opacity-5 pointer-events-none" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Icon key={i} name="StarIcon" size={20} variant="solid" className="text-accent" />
                ))}
              </div>

              <blockquote className="text-lg md:text-xl font-display text-foreground leading-relaxed mb-8 italic">
                &ldquo;{lang === 'es' ? current.quoteEs : current.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 border-t border-border pt-6">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0">
                  <AppImage
                    src={current.img}
                    alt={current.imgAlt}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="block font-semibold text-foreground">{current.name}</span>
                  <span className="block text-sm text-muted-foreground">
                    {lang === 'es' ? current.roleEs : current.role} · {current.location}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-muted-foreground">{current.project}</span>
                  <span className="block text-sm font-bold text-primary">{current.value}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-6">
              <button
                aria-label={lang === 'es' ? 'Testimonio anterior' : 'Previous testimonial'}
                onClick={() =>
                  setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
                }
                className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-200"
              >
                <Icon name="ChevronLeftIcon" size={20} variant="outline" />
              </button>
              <button
                aria-label={lang === 'es' ? 'Siguiente testimonio' : 'Next testimonial'}
                onClick={() => setActive((a) => (a + 1) % testimonials.length)}
                className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-200"
              >
                <Icon name="ChevronRightIcon" size={20} variant="outline" />
              </button>
              <div className="flex gap-2 ml-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`${lang === 'es' ? 'Ver testimonio' : 'View testimonial'} ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? 'w-8 bg-primary' : 'w-2 bg-border'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial thumbnails */}
          <div className="flex flex-col gap-4 reveal">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                className={`flex items-start gap-4 p-5 rounded-2xl border bg-card text-left transition-all duration-300 pointer-events-none lg:pointer-events-auto ${
                  active === i
                    ? 'border-border lg:border-primary lg:bg-primary/5 lg:shadow-lg lg:shadow-primary/10'
                    : 'border-border lg:hover:border-primary/30 lg:hover:bg-primary/3'
                }`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <AppImage
                    src={t.img}
                    alt={t.imgAlt}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-foreground">{t.name}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Icon
                          key={s}
                          name="StarIcon"
                          size={12}
                          variant="solid"
                          className="text-accent"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {lang === 'es' ? t.quoteEs : t.quote}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
