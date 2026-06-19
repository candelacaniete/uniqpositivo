import { useState } from 'react';
import { Menu, Search, UserRound, X } from 'lucide-react';

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Turnos', href: '#servicios' },
  { label: 'Galería', href: '#galeria-puente', special: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-40 w-full border-b border-line bg-night/92 backdrop-blur-md">
      <div className="bg-warm px-5 py-2 text-center text-[0.68rem] font-bold uppercase tracking-[0.22em] text-night">
        Reservá tu experiencia premium en Rondeau 3352, CABA
      </div>
      <nav className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 py-5 md:px-8">
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-[0.72rem] font-bold uppercase tracking-[0.22em] text-ash transition hover:text-cream"
            >
              <span>{link.label}</span>
              {link.special ? (
                <span className="pointer-events-none absolute left-1/2 top-8 w-36 -translate-x-1/2 border border-line bg-night px-3 py-2 text-center text-xs normal-case tracking-normal text-ash opacity-0 transition group-hover:translate-y-1 group-hover:opacity-100">
                  cruzar al arte
                </span>
              ) : null}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a href="#hero" className="text-center font-script text-4xl leading-none text-cream md:text-5xl" aria-label="Ir al inicio">
          Uniq Positivo
        </a>

        <div className="hidden items-center justify-end gap-5 md:flex">
          <a href="#productos" className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-ash transition hover:text-cream">
            Productos
          </a>
          <a href="#contacto" className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-ash transition hover:text-cream">
            Contacto
          </a>
          <Search size={18} strokeWidth={1.4} className="text-ash" />
          <a href="/admin-turnos" aria-label="Acceso admin">
            <UserRound size={18} strokeWidth={1.4} className="text-ash transition hover:text-cream" />
          </a>
        </div>

        <button
          type="button"
          className="col-start-3 ml-auto inline-flex border border-line bg-night p-2 text-cream md:hidden"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-line bg-night px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-3 pt-4">
            {[...navLinks, { label: 'Productos', href: '#productos' }, { label: 'Contacto', href: '#contacto' }].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border border-line bg-ink px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-cream"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/admin-turnos"
              className="border border-line bg-ink px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-cream"
              onClick={() => setIsOpen(false)}
            >
              Acceso admin
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
