'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ServicesSectionProps {
    lang: 'en' | 'es';
}

const t = {
    en: {
        label: 'What We Do',
        heading: 'Premium Remodeling Services',
        sub: 'From concept to completion, we deliver exceptional craftsmanship across every project.',
        learn: 'Learn More',
        services: [
            {
                icon: 'HomeModernIcon',
                title: 'Kitchen Remodeling',
                desc: 'Custom cabinetry, quartz countertops, premium appliances, and intelligent layouts that transform your kitchen into the heart of your home.',
                tag: 'Most Popular',
                accent: true,
            },
            {
                icon: 'BuildingOfficeIcon',
                title: 'Bathroom Remodeling',
                desc: 'Spa-inspired designs with luxury tile work, frameless glass, heated floors, and premium fixtures for your personal sanctuary.',
                tag: '',
                accent: false,
            },
            {
                icon: 'HomeIcon',
                title: 'Home Renovation',
                desc: 'Full-scale home transformations including open-concept conversions, additions, and complete interior overhauls.',
                tag: '',
                accent: false,
            },
            {
                icon: 'BuildingStorefrontIcon',
                title: 'Commercial Remodeling',
                desc: 'Office buildouts, retail spaces, and restaurant renovations that balance aesthetics with functional efficiency.',
                tag: '',
                accent: false,
            },
            {
                icon: 'Squares2X2Icon',
                title: 'Flooring Installation',
                desc: 'Hardwood, luxury vinyl, porcelain tile, and custom stone installations with precision craftsmanship.',
                tag: '',
                accent: false,
            },
            {
                icon: 'PaintBrushIcon',
                title: 'Interior Design',
                desc: 'Full-service interior design consultation, space planning, material selection, and project coordination.',
                tag: '',
                accent: false,
            },
        ],
    },
    es: {
        label: 'Lo Que Hacemos',
        heading: 'Servicios Premium de Remodelación',
        sub: 'Del concepto a la realidad, entregamos artesanía excepcional en cada proyecto.',
        learn: 'Saber Más',
        services: [
            {
                icon: 'HomeModernIcon',
                title: 'Remodelación de Cocinas',
                desc: 'Gabinetes personalizados, encimeras de cuarzo y diseños inteligentes que transforman tu cocina.',
                tag: 'Más Popular',
                accent: true,
            },
            {
                icon: 'BuildingOfficeIcon',
                title: 'Remodelación de Baños',
                desc: 'Diseños inspirados en spas con azulejos de lujo, vidrio sin marco y accesorios premium.',
                tag: '',
                accent: false,
            },
            {
                icon: 'HomeIcon',
                title: 'Renovación de Hogar',
                desc: 'Transformaciones de hogar a gran escala, incluyendo conversiones de concepto abierto.',
                tag: '',
                accent: false,
            },
            {
                icon: 'BuildingStorefrontIcon',
                title: 'Remodelación Comercial',
                desc: 'Oficinas, espacios de venta y restaurantes que equilibran estética y eficiencia funcional.',
                tag: '',
                accent: false,
            },
            {
                icon: 'Squares2X2Icon',
                title: 'Instalación de Pisos',
                desc: 'Madera, vinilo de lujo, porcelana y piedra personalizada con artesanía de precisión.',
                tag: '',
                accent: false,
            },
            {
                icon: 'PaintBrushIcon',
                title: 'Diseño de Interiores',
                desc: 'Consultoría de diseño, planificación de espacios y selección de materiales.',
                tag: '',
                accent: false,
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
        <section id="services" ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
            {/* Decorative bg */}
            <div className="absolute top-0 right-0 w-96 h-96 blob-primary animate-blob pointer-events-none opacity-40" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="max-w-2xl mb-16 reveal">
                    <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">{tx.label}</span>
                    <h2 className="text-section font-display font-bold text-foreground mb-4">{tx.heading}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">{tx.sub}</p>
                </div>

                {/* Bento-style services grid */}
                {/* BENTO AUDIT:
          Array has 6 cards: Kitchen, Bathroom, Home, Commercial, Flooring, Interior
          Row 1: [col-1: Kitchen cs-2 (featured)] [col-3: Bathroom cs-1] [col-4: Home cs-1]
          Row 2: [col-1: Commercial cs-1] [col-2: Flooring cs-1] [col-3: Interior cs-2]
          Placed 6/6 cards ✓
        */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Kitchen — featured large card */}
                    <div className="lg:col-span-2 service-card group bg-primary text-primary-foreground rounded-3xl p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden cursor-pointer reveal">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-blue-800 opacity-90" />
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                                    <Icon name="HomeModernIcon" size={28} variant="outline" className="text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider">
                                    {tx.services[0].tag}
                                </span>
                            </div>
                            <h3 className="text-2xl font-display font-bold mb-3">{tx.services[0].title}</h3>
                            <p className="text-primary-foreground/70 text-sm leading-relaxed flex-1">{tx.services[0].desc}</p>
                            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-4 transition-all duration-300">
                                {tx.learn} <Icon name="ArrowRightIcon" size={16} variant="outline" />
                            </div>
                        </div>
                    </div>

                    {/* Bathroom */}
                    <div className="service-card group bg-card border border-border rounded-3xl p-7 flex flex-col justify-between min-h-[280px] cursor-pointer hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 reveal" style={{ transitionDelay: '100ms' }}>
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            <Icon name="BuildingOfficeIcon" size={24} variant="outline" className="text-primary group-hover:text-primary-foreground" />
                        </div>
                        <div>
                            <h3 className="text-lg font-display font-bold text-card-foreground mb-2">{tx.services[1].title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{tx.services[1].desc}</p>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                            {tx.learn} <Icon name="ArrowRightIcon" size={14} variant="outline" />
                        </div>
                    </div>

                    {/* Home Renovation */}
                    <div className="service-card group bg-accent/5 border border-accent/20 rounded-3xl p-7 flex flex-col justify-between min-h-[280px] cursor-pointer hover:bg-accent/10 hover:shadow-xl transition-all duration-300 reveal" style={{ transitionDelay: '150ms' }}>
                        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center mb-4">
                            <Icon name="HomeIcon" size={24} variant="outline" className="text-accent-foreground" />
                        </div>
                        <div>
                            <h3 className="text-lg font-display font-bold text-card-foreground mb-2">{tx.services[2].title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{tx.services[2].desc}</p>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-foreground group-hover:gap-3 transition-all duration-300">
                            {tx.learn} <Icon name="ArrowRightIcon" size={14} variant="outline" />
                        </div>
                    </div>

                    {/* Commercial */}
                    <div className="service-card group bg-card border border-border rounded-3xl p-7 flex flex-col justify-between min-h-[280px] cursor-pointer hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 reveal" style={{ transitionDelay: '200ms' }}>
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-300">
                            <Icon name="BuildingStorefrontIcon" size={24} variant="outline" className="text-primary group-hover:text-primary-foreground" />
                        </div>
                        <div>
                            <h3 className="text-lg font-display font-bold text-card-foreground mb-2">{tx.services[3].title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{tx.services[3].desc}</p>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                            {tx.learn} <Icon name="ArrowRightIcon" size={14} variant="outline" />
                        </div>
                    </div>

                    {/* Flooring */}
                    <div className="service-card group bg-card border border-border rounded-3xl p-7 flex flex-col justify-between min-h-[280px] cursor-pointer hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 reveal" style={{ transitionDelay: '250ms' }}>
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-300">
                            <Icon name="Squares2X2Icon" size={24} variant="outline" className="text-primary group-hover:text-primary-foreground" />
                        </div>
                        <div>
                            <h3 className="text-lg font-display font-bold text-card-foreground mb-2">{tx.services[4].title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{tx.services[4].desc}</p>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                            {tx.learn} <Icon name="ArrowRightIcon" size={14} variant="outline" />
                        </div>
                    </div>

                    {/* Interior Design — large card */}
                    <div className="lg:col-span-2 service-card group bg-foreground text-background rounded-3xl p-8 flex flex-col justify-between min-h-[280px] relative overflow-hidden cursor-pointer reveal" style={{ transitionDelay: '300ms' }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-foreground to-gray-800" />
                        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                                <Icon name="PaintBrushIcon" size={24} variant="outline" className="text-accent" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-display font-bold mb-2">{tx.services[5].title}</h3>
                                <p className="text-background/60 text-sm leading-relaxed">{tx.services[5].desc}</p>
                            </div>
                            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-4 transition-all duration-300">
                                {tx.learn} <Icon name="ArrowRightIcon" size={16} variant="outline" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}