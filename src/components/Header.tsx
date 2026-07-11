'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface HeaderProps {
  lang: 'en' | 'es';
  theme: 'light' | 'dark';
  onLangChange: (lang: 'en' | 'es') => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const t = {
  en: {
    home: 'Home',
    services: 'Services',
    projects: 'Projects',
    about: 'About Us',
    locations: 'Locations',
    contact: 'Contact',
    cta: 'Get Free Estimate',
    language: 'Language',
  },
  es: {
    home: 'Inicio',
    services: 'Servicios',
    projects: 'Proyectos',
    about: 'Nosotros',
    locations: 'Ubicaciones',
    contact: 'Contacto',
    cta: 'Estimado Gratis',
    language: 'Idioma',
  },
};

export default function Header({ lang, theme, onLangChange, onThemeChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const tx = t[lang];

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navLinks = [
    { label: tx.home, href: '#hero' },
    { label: tx.services, href: '#services' },
    { label: tx.projects, href: '#projects' },
    { label: tx.about, href: '#why-us' },
    { label: tx.locations, href: '#locations' },
    { label: tx.contact, href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`w-full max-w-7xl flex items-center justify-between px-4 py-2.5 rounded-2xl transition-all duration-500 ${
          scrolled ? 'glass-light shadow-lg shadow-black/5' : 'glass-light shadow-md shadow-black/5'
        }`}
      >
        {/* Logo */}
        <Link href="#hero" className="flex min-w-0 items-center gap-2">
          <span className="rounded-xl bg-accent/90 p-1 shadow-sm ring-1 ring-black/10">
            <AppLogo src="/assets/images/ac-remodeling-logo.png" size={34} />
          </span>
          <span className="block max-w-[11.5rem] font-display text-[0.82rem] font-semibold leading-tight tracking-tight text-foreground sm:max-w-none sm:text-lg">
            AC Remodeling Service
            <span className="text-accent font-bold"> LLC</span>
            <sup className="text-[0.6rem] text-muted-foreground">®</sup>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Language Switcher */}
          <div className="hidden items-center bg-muted rounded-xl overflow-hidden border border-border sm:flex">
            <button
              onClick={() => onLangChange('en')}
              className={`px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                lang === 'en'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLangChange('es')}
              className={`px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                lang === 'es'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              ES
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-muted border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Icon name="MoonIcon" size={18} variant="outline" />
            ) : (
              <Icon name="SunIcon" size={18} variant="outline" />
            )}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-all duration-200 shadow-lg shadow-primary/25"
          >
            {tx.cta}
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-muted border border-border text-foreground"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <Icon name="XMarkIcon" size={20} variant="outline" />
            ) : (
              <Icon name="Bars3Icon" size={20} variant="outline" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 glass-light rounded-2xl shadow-xl border border-border p-6 flex flex-col gap-4 lg:hidden">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <span className="text-sm font-semibold text-foreground">{tx.language}</span>
            <div className="flex items-center bg-muted rounded-xl overflow-hidden border border-border">
              <button
                onClick={() => onLangChange('en')}
                className={`px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                  lang === 'en'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLangChange('es')}
                className={`px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                  lang === 'es'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                ES
              </button>
            </div>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-foreground hover:text-primary transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold"
          >
            {tx.cta}
          </a>
        </div>
      )}
    </header>
  );
}
