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
    contactTitle: 'Contact',
    serviceItems: [
      'Painting & Drywall',
      'Finish Carpentry',
      'LVP Flooring Installation',
      'Pressure Washing',
      'Residential Project Support',
    ],
    about: 'About Us',
    projects: 'Projects',
    process: 'Our Process',
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms',
    copyright: '© 2026 AC Remodeling Service LLC®. All rights reserved.',
    serviceArea: 'Serving Sugar Mountain, Blowing Rock, Boone, Hickory, Morganton, and Lenoir',
  },
  es: {
    tagline: 'Transformando espacios en experiencias excepcionales.',
    services: 'Servicios',
    company: 'Empresa',
    contactTitle: 'Contacto',
    serviceItems: [
      'Pintura y Drywall',
      'Carpinteria de Acabado',
      'Instalacion de Pisos LVP',
      'Lavado a Presion',
      'Apoyo Residencial',
    ],
    about: 'Nosotros',
    projects: 'Proyectos',
    process: 'Nuestro Proceso',
    contact: 'Contacto',
    privacy: 'Privacidad',
    terms: 'Terminos',
    copyright: '© 2026 AC Remodeling Service LLC®. Todos los derechos reservados.',
    serviceArea: 'Servicio en Sugar Mountain, Blowing Rock, Boone, Hickory, Morganton y Lenoir',
  },
};

const socialLinks = ['instagram', 'facebook', 'x', 'youtube'];

export default function Footer({ lang }: FooterProps) {
  const tx = t[lang];

  const companyLinks = [
    { label: tx.about, href: '#why-us' },
    { label: tx.projects, href: '#projects' },
    { label: tx.process, href: '#process' },
    { label: tx.contact, href: '#contact' },
  ];

  return (
    <footer className="bg-foreground text-background border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-4">
            <a
              href="#hero"
              className="group inline-flex items-center gap-2.5 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/60"
            >
              <span className="rounded-xl bg-accent/95 p-1 shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                <AppLogo src="/assets/images/ac-remodeling-logo.png" size={36} />
              </span>
              <span className="font-display font-semibold text-lg tracking-tight text-background transition-colors duration-300 group-hover:text-white">
                AC Remodeling
                <span className="text-accent font-bold"> LLC</span>
                <sup className="text-xs opacity-60">®</sup>
              </span>
            </a>
            <p className="text-sm text-background/50 leading-relaxed max-w-xs mb-6">{tx.tagline}</p>
            <div className="flex gap-3" aria-label="Social profiles coming soon">
              {socialLinks.map((social) => (
                <span
                  key={social}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-background/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25"
                  aria-label={social}
                >
                  <Icon name="GlobeAltIcon" size={16} variant="outline" />
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-widest text-background/30 font-semibold mb-5">
              {tx.services}
            </p>
            <ul className="space-y-3">
              {tx.serviceItems.map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="group inline-flex items-center gap-2 text-sm text-background/60 transition-all duration-300 hover:translate-x-1 hover:text-background font-medium"
                  >
                    <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-4" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-widest text-background/30 font-semibold mb-5">
              {tx.company}
            </p>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-background/60 transition-all duration-300 hover:translate-x-1 hover:text-background font-medium"
                  >
                    <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-4" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-widest text-background/30 font-semibold mb-5">
              {tx.contactTitle}
            </p>
            <ul className="space-y-3">
              <li className="group flex items-start gap-2 text-sm text-background/60 transition-colors duration-300 hover:text-background">
                <Icon
                  name="PhoneIcon"
                  size={15}
                  variant="outline"
                  className="mt-0.5 shrink-0 text-accent transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                />
                <span>(305) 555-0192</span>
              </li>
              <li className="group flex items-start gap-2 text-sm text-background/60 transition-colors duration-300 hover:text-background">
                <Icon
                  name="EnvelopeIcon"
                  size={15}
                  variant="outline"
                  className="mt-0.5 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                />
                <span className="break-all">info@remodelingservicellc.com</span>
              </li>
              <li className="group flex items-start gap-2 text-sm text-background/60 transition-colors duration-300 hover:text-background">
                <Icon
                  name="MapPinIcon"
                  size={15}
                  variant="outline"
                  className="mt-0.5 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                />
                <span>
                  High Country & Foothills
                  <br />
                  {tx.serviceArea}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/30">{tx.copyright}</p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="relative text-xs text-background/40 transition-colors font-medium hover:text-background after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {tx.privacy}
            </a>
            <a
              href="/terms"
              className="relative text-xs text-background/40 transition-colors font-medium hover:text-background after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {tx.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
