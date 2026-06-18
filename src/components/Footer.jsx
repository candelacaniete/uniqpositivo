import UniqLogo from './UniqLogo.jsx';

export default function Footer() {
  return (
    <footer id="contacto" className="bg-night px-5 py-10 text-sm text-ash md:px-8">
      <div className="mx-auto mb-8 h-px max-w-6xl bg-accent" />
      <div className="footer-grid mx-auto max-w-6xl">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <UniqLogo compact className="h-12 w-12" />
            <span className="font-serif text-2xl font-bold text-cream">Uniq Positivo</span>
          </div>
          <p>Centro de belleza y galería de arte.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-2 font-semibold uppercase tracking-widest text-cream">Dirección</p>
            <p>Rondeau 3352, CABA</p>
          </div>
          <div>
            <p className="mb-2 font-semibold uppercase tracking-widest text-cream">WhatsApp</p>
            <a className="transition hover:text-cream" href="https://wa.me/541144045167" target="_blank" rel="noreferrer">
              +54 11 4404 5167
            </a>
          </div>
          <div>
            <p className="mb-2 font-semibold uppercase tracking-widest text-cream">Instagram</p>
            <a
              className="transition hover:text-cream"
              href="https://www.instagram.com/uniqpositivo"
              target="_blank"
              rel="noreferrer"
            >
              @uniqpositivo
            </a>
          </div>
          <div>
            <p className="mb-2 font-semibold uppercase tracking-widest text-cream">Horarios</p>
            <p>Mar a sáb · 10:00 a 19:00</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
