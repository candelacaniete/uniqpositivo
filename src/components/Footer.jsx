export default function Footer() {
  return (
    <footer id="contacto" className="bg-night px-5 py-10 text-sm text-ash md:px-8">
      <div className="mx-auto mb-8 h-px max-w-6xl bg-accent" />
      <div className="footer-grid mx-auto max-w-6xl">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <img src="/brand/tulipan.png" alt="" className="h-8 w-auto opacity-80" />
            <span className="font-script text-4xl leading-none text-cream">Uniq Positivo</span>
          </div>
          <p>Centro de belleza y galería de arte.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <p className="font-serif text-2xl font-semibold text-cream">Rondeau 3352, CABA</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-ash">Dirección</p>
          </div>
          <div>
            <a className="transition hover:text-cream" href="https://wa.me/541144045167" target="_blank" rel="noreferrer">
              +54 11 4404 5167
            </a>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-ash">WhatsApp</p>
          </div>
          <div>
            <a
              className="transition hover:text-cream"
              href="https://www.instagram.com/uniqpositivo"
              target="_blank"
              rel="noreferrer"
            >
              @uniqpositivo
            </a>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-ash">Instagram</p>
          </div>
          <div>
            <p className="font-serif text-2xl font-semibold text-cream">Mar a sáb · 10:00 a 19:00</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-ash">Horarios</p>
          </div>
          <div>
            <a className="transition hover:text-cream" href="/admin-turnos">
              Acceso admin
            </a>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-ash">Interno</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-line pt-5 text-center text-xs uppercase tracking-widest text-ash md:text-right">
        <a className="transition hover:text-cream" href="https://www.katem.com.ar" target="_blank" rel="noreferrer">
          Created by Katem Studio
        </a>
      </div>
    </footer>
  );
}
