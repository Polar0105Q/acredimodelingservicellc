import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface FooterProps {
  lang: 'en' | 'es';
}

const t = {
  en: {
    tagline: 'Transforming spaces into exceptional experiences.',
    services: 'Services',
    company: 'Company',
    kitchen: 'Kitchen Remodeling',
    bathroom: 'Bathroom Remodeling',
    home: 'Home Renovation',
    commercial: 'Commercial Remodeling',
    flooring: 'Flooring Installation',
    interior: 'Interior Design',
    about: 'About Us',
    projects: 'Projects',
    process: 'Our Process',
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms',
    copyright: '© 2026 Remodeling Service LLC®. All rights reserved.',
  },
  es: {
    tagline: 'Transformando espacios en experiencias excepcionales.',
    services: 'Servicios',
    company: 'Empresa',
    kitchen: 'Remodelación de Cocinas',
    bathroom: 'Remodelación de Baños',
    home: 'Renovación de Hogar',
    commercial: 'Remodelación Comercial',
    flooring: 'Instalación de Pisos',
    interior: 'Diseño de Interiores',
    about: 'Nosotros',
    projects: 'Proyectos',
    process: 'Nuestro Proceso',
    contact: 'Contacto',
    privacy: 'Privacidad',
    terms: 'Términos',
    copyright: '© 2026 Remodeling Service LLC®. Todos los derechos reservados.',
  },
};

export default function Footer({ lang }: FooterProps) {
  const tx = t[lang];

  return (
    <footer className="bg-foreground text-background border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <AppLogo size={36} />
              <span className="font-display font-semibold text-lg tracking-tight text-background">
                Remodeling Service
                <span className="text-accent font-bold"> LLC</span>
                <sup className="text-xs opacity-60">®</sup>
              </span>
            </div>
            <p className="text-sm text-background/50 leading-relaxed max-w-xs mb-6">{tx.tagline}</p>
            <div className="flex gap-3" aria-label="Social profiles coming soon">
              {(['instagram', 'facebook', 'twitter-x', 'youtube'] as const).map((social) => (
                <span
                  key={social}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-background/50 hover:text-background hover:bg-white/10 transition-all duration-200"
                  aria-label={social}
                >
                  <Icon name="GlobeAltIcon" size={16} variant="outline" />
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-widest text-background/30 font-semibold mb-5">
              {tx.services}
            </p>
            <ul className="space-y-3">
              {[tx.kitchen, tx.bathroom, tx.home, tx.commercial, tx.flooring, tx.interior].map(
                (s) => (
                  <li key={s}>
                    <a
                      href="#services"
                      className="text-sm text-background/60 hover:text-background transition-colors duration-200 font-medium"
                    >
                      {s}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-widest text-background/30 font-semibold mb-5">
              {tx.company}
            </p>
            <ul className="space-y-3">
              {[
                { label: tx.about, href: '#about' },
                { label: tx.projects, href: '#projects' },
                { label: tx.process, href: '#process' },
                { label: tx.contact, href: '#contact' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-background/60 hover:text-background transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-widest text-background/30 font-semibold mb-5">
              Contact
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-background/60">
                <Icon
                  name="PhoneIcon"
                  size={15}
                  variant="outline"
                  className="mt-0.5 shrink-0 text-accent"
                />
                <span>(305) 555-0192</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-background/60">
                <Icon
                  name="EnvelopeIcon"
                  size={15}
                  variant="outline"
                  className="mt-0.5 shrink-0 text-accent"
                />
                <span className="break-all">info@remodelingservicellc.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-background/60">
                <Icon
                  name="MapPinIcon"
                  size={15}
                  variant="outline"
                  className="mt-0.5 shrink-0 text-accent"
                />
                <span>
                  Miami, FL 33101
                  <br />
                  Serving all of South Florida
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/30">{tx.copyright}</p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-xs text-background/40 hover:text-background transition-colors font-medium"
            >
              {tx.privacy}
            </a>
            <a
              href="/terms"
              className="text-xs text-background/40 hover:text-background transition-colors font-medium"
            >
              {tx.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
