'use client';

import React, { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ContactSectionProps {
  lang: 'en' | 'es';
}

const t = {
  en: {
    label: 'Get In Touch',
    heading: 'Start Your Project',
    sub: "Fill out the form below and we'll get back to you within 24 hours with a personalized consultation.",
    fields: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      service: 'Service Needed',
      message: 'Tell us about your project...',
      submit: 'Send Message',
    },
    services: [
      'Painting & Drywall',
      'Finish Carpentry',
      'Flooring - LVP Installation',
      'Exterior Services - Pressure Washing',
      'Residential Project Support',
      'Other',
    ],
    success: "Message sent! We'll contact you within 24 hours.",
    error: 'Please complete the required fields before sending.',
    submitError: 'We could not send your message right now. Please call or email us directly.',
    info: {
      phone: '(305) 555-0192',
      email: 'info@remodelingservicellc.com',
      address: 'Sugar Mountain · Blowing Rock · Boone\nHickory · Morganton · Lenoir',
      hours: 'Mon–Fri: 8AM–6PM · Sat: 9AM–3PM',
    },
  },
  es: {
    label: 'Contáctanos',
    heading: 'Inicia Tu Proyecto',
    sub: 'Completa el formulario y te contactaremos dentro de 24 horas con una consulta personalizada.',
    fields: {
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      service: 'Servicio Requerido',
      message: 'Cuéntanos sobre tu proyecto...',
      submit: 'Enviar Mensaje',
    },
    services: [
      'Remodelación de Cocinas',
      'Remodelación de Baños',
      'Renovación de Hogar',
      'Remodelación Comercial',
      'Instalación de Pisos',
      'Diseño de Interiores',
      'Otro',
    ],
    success: '¡Mensaje enviado! Te contactaremos dentro de 24 horas.',
    error: 'Completa los campos requeridos antes de enviar.',
    submitError:
      'No pudimos enviar tu mensaje en este momento. Llámanos o escríbenos directamente.',
    info: {
      phone: '(305) 555-0192',
      email: 'info@remodelingservicellc.com',
      address: 'Sugar Mountain · Blowing Rock · Boone\nHickory · Morganton · Lenoir',
      hours: 'Lun–Vie: 8AM–6PM · Sáb: 9AM–3PM',
    },
  },
};

const contactServices = {
  en: [
    'Painting & Drywall',
    'Finish Carpentry',
    'Flooring - LVP Installation',
    'Exterior Services - Pressure Washing',
    'Residential Project Support',
    'Other',
  ],
  es: [
    'Pintura y Drywall',
    'Carpinteria de Acabado',
    'Pisos - Instalacion LVP',
    'Servicios Exteriores - Lavado a Presion',
    'Apoyo para Proyectos Residenciales',
    'Otro',
  ],
};

export default function ContactSection({ lang }: ContactSectionProps) {
  const tx = t[lang];
  const serviceOptions = contactServices[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.service || !form.message.trim()) {
      setError(tx.error);
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error('Contact request failed');
      }
      setSubmitted(true);
    } catch {
      setError(tx.submitError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-secondary relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 blob-primary animate-blob pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16 reveal">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
            {tx.label}
          </span>
          <h2 className="text-section font-display font-bold text-foreground mb-4">{tx.heading}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">{tx.sub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Contact info */}
          <div className="flex flex-col gap-5 reveal">
            {[
              {
                icon: 'PhoneIcon',
                label: 'Phone',
                value: tx.info.phone,
                href: `tel:${tx.info.phone}`,
              },
              {
                icon: 'EnvelopeIcon',
                label: 'Email',
                value: tx.info.email,
                href: `mailto:${tx.info.email}`,
              },
              {
                icon: 'MapPinIcon',
                label: lang === 'en' ? 'Service Area' : 'Area de Servicio',
                value: tx.info.address,
                href: 'https://www.google.com/maps/search/?api=1&query=Boone%20NC%20Blowing%20Rock%20NC%20Sugar%20Mountain%20NC',
              },
              { icon: 'ClockIcon', label: 'Hours', value: tx.info.hours },
            ].map((item, i) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300 group reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-300">
                  <Icon
                    name={item.icon as 'PhoneIcon'}
                    size={20}
                    variant="outline"
                    className="text-primary group-hover:text-primary-foreground transition-colors duration-300"
                  />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    {item.label}
                  </span>
                  <span className="block text-sm font-medium text-foreground leading-relaxed whitespace-pre-line">
                    {'href' in item && item.href ? (
                      <a href={item.href} className="hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 reveal">
            {submitted ? (
              <div className="bg-card border border-border rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[320px] md:min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                  <Icon
                    name="CheckCircleIcon"
                    size={32}
                    variant="outline"
                    className="text-green-500"
                  />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {tx.success}
                </h3>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setError('');
                    setForm({ name: '', email: '', phone: '', service: '', message: '' });
                  }}
                  className="mt-4 text-sm text-primary hover:underline"
                >
                  {lang === 'en' ? 'Send another message' : 'Enviar otro mensaje'}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-3xl p-5 sm:p-8 md:p-10 space-y-5"
                noValidate
              >
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-300"
                  >
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="floating-label-group">
                    <input
                      id="contact-name"
                      type="text"
                      placeholder=" "
                      value={form.name}
                      onChange={(e) => {
                        setError('');
                        setForm({ ...form, name: e.target.value });
                      }}
                      autoComplete="name"
                      aria-invalid={Boolean(error && !form.name.trim())}
                      required
                    />
                    <label htmlFor="contact-name">{tx.fields.name}</label>
                  </div>
                  {/* Email */}
                  <div className="floating-label-group">
                    <input
                      id="contact-email"
                      type="email"
                      placeholder=" "
                      value={form.email}
                      onChange={(e) => {
                        setError('');
                        setForm({ ...form, email: e.target.value });
                      }}
                      autoComplete="email"
                      aria-invalid={Boolean(error && !form.email.trim())}
                      required
                    />
                    <label htmlFor="contact-email">{tx.fields.email}</label>
                  </div>
                  {/* Phone */}
                  <div className="floating-label-group">
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder=" "
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      autoComplete="tel"
                      inputMode="tel"
                    />
                    <label htmlFor="contact-phone">{tx.fields.phone}</label>
                  </div>
                  {/* Service */}
                  <div className="floating-label-group">
                    <select
                      id="contact-service"
                      value={form.service}
                      onChange={(e) => {
                        setError('');
                        setForm({ ...form, service: e.target.value });
                      }}
                      aria-invalid={Boolean(error && !form.service)}
                      required
                    >
                      <option value=""></option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="contact-service">{tx.fields.service}</label>
                  </div>
                </div>

                {/* Message */}
                <div className="floating-label-group">
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder=" "
                    value={form.message}
                    onChange={(e) => {
                      setError('');
                      setForm({ ...form, message: e.target.value });
                    }}
                    aria-invalid={Boolean(error && !form.message.trim())}
                    style={{ paddingTop: '1.5rem', paddingBottom: '0.75rem' }}
                    required
                  />
                  <label htmlFor="contact-message">{tx.fields.message}</label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/25 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      {lang === 'en' ? 'Sending...' : 'Enviando...'}
                    </>
                  ) : (
                    <>
                      {tx.fields.submit}
                      <Icon name="PaperAirplaneIcon" size={18} variant="outline" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
