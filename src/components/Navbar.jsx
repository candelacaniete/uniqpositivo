import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import UniqLogo from './UniqLogo.jsx';

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Turnos', href: '#servicios' },
  { label: 'Galería', href: '#galeria-puente', special: true },
  { label: 'Reseñas', href: '#resenas' },
  { label: 'Productos', href: '#productos' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-40 w-full border-b border-transparent bg-ink/85 backdrop-blur-xl">
      <div className="h-px w-full bg-accent" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#hero" className="group flex items-center gap-3" aria-label="Ir al inicio">
          <UniqLogo compact className="brand-logo-glow h-11 w-11" />
          <span className="font-serif text-xl font-bold tracking-wide text-cream">Uniq Positivo</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-cream/78 transition hover:text-cream"
            >
              <span>{link.label}</span>
              {link.special ? (
                <span className="pointer-events-none absolute left-1/2 top-8 w-36 -translate-x-1/2 rounded-full border border-line bg-night px-3 py-2 text-center text-xs text-cream/80 opacity-0 shadow-soft-card transition group-hover:translate-y-1 group-hover:opacity-100">
                  cruzar al arte
                </span>
              ) : null}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex rounded-full border border-line bg-night p-2 text-cream md:hidden"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-line bg-ink/95 px-5 pb-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-line bg-night px-4 py-3 text-sm text-cream/86"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
