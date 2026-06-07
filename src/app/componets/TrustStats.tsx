'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TrustStatsProps {
    lang: 'en' | 'es';
}

const t = {
    en: {
        stats: [
            { end: 18, suffix: '+', label: 'Years of Experience' },
            { end: 1200, suffix: '+', label: 'Projects Completed' },
            { end: 850, suffix: '+', label: 'Happy Clients' },
            { end: 98, suffix: '%', label: 'Satisfaction Rate' },
        ],
    },
    es: {
        stats: [
            { end: 18, suffix: '+', label: 'Años de Experiencia' },
            { end: 1200, suffix: '+', label: 'Proyectos Completados' },
            { end: 850, suffix: '+', label: 'Clientes Satisfechos' },
            { end: 98, suffix: '%', label: 'Tasa de Satisfacción' },
        ],
    },
};

function useCounter(end: number, duration: number, started: boolean) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!started) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [end, duration, started]);
    return count;
}

function StatItem({ end, suffix, label, index, started }: { end: number; suffix: string; label: string; index: number; started: boolean }) {
    const count = useCounter(end, 1800, started);
    return (
        <div
            className="flex flex-col items-center text-center px-6 py-8 reveal"
            style={{ transitionDelay: `${index * 120}ms` }}
        >
            <span className="font-display text-5xl md:text-6xl font-bold text-primary leading-none">
                {end >= 1000 ? count.toLocaleString() : count}{suffix}
            </span>
            <span className="mt-3 text-sm uppercase tracking-widest text-muted-foreground font-medium">{label}</span>
        </div>
    );
}

export default function TrustStats({ lang }: TrustStatsProps) {
    const tx = t[lang];
    const ref = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setStarted(true);
                        setVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="relative bg-secondary border-y border-border overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 blob-primary animate-blob opacity-50" />
                <div className="absolute bottom-0 right-1/4 w-48 h-48 blob-accent animate-blob opacity-40" style={{ animationDelay: '4s' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div
                    className={`grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
                >
                    {tx.stats.map((stat, i) => (
                        <StatItem key={stat.label} {...stat} index={i} started={started} />
                    ))}
                </div>
            </div>
        </section>
    );
}