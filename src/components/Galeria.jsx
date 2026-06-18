import { motion } from 'framer-motion';

const artworks = [
  { title: 'Umbral de luz', artist: 'Artista invitada', year: '2026', height: 'h-80' },
  { title: 'Botánica interior', artist: 'Artista invitado', year: '2025', height: 'h-96' },
  { title: 'Ritual violeta', artist: 'Colectivo Uniq', year: '2026', height: 'h-72' },
  { title: 'Rondeau 3352', artist: 'Artista residente', year: '2024', height: 'h-96' },
  { title: 'Cuerpo de flor', artist: 'Artista invitada', year: '2025', height: 'h-80' },
  { title: 'Magia quieta', artist: 'Artista residente', year: '2026', height: 'h-72' },
];

export default function Galeria({ galleryRef, onEnterGallery }) {
  return (
    <>
      <section id="galeria-puente" className="section-shell bg-gradient-to-b from-ink to-warm px-5 py-28 md:px-8 md:py-36">
        <div className="decor-butterfly -left-12 bottom-12" />
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75 }}
        >
          <p className="mb-5 text-sm uppercase tracking-widest text-ash">Cambio de mundo</p>
          <h2 className="font-serif text-5xl font-bold leading-tight text-cream md:text-7xl">
            Un espacio donde el arte también habita
          </h2>
          <button
            type="button"
            className="mt-10 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-glow transition hover:-translate-y-0.5"
            onClick={onEnterGallery}
          >
            Entrar a la galería
          </button>
        </motion.div>
      </section>

      <section id="galeria" ref={galleryRef} className="section-shell bg-warm px-5 py-24 md:px-8">
        <div className="decor-flower -right-14 top-14" />
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-12 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-sm uppercase tracking-widest text-ash">Galería</p>
            <h2 className="font-serif text-4xl font-bold text-cream md:text-6xl">Obras que conviven con la belleza</h2>
          </motion.div>

          <div className="masonry">
            {artworks.map((artwork, index) => (
              <motion.article
                key={artwork.title}
                className="mb-5 break-inside-avoid rounded-3xl border border-line bg-night p-3 shadow-soft-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.06 }}
              >
                {/* TODO: cargar imágenes reales de las obras */}
                <div className={`image-placeholder ${artwork.height} rounded-2xl`} />
                <div className="p-4">
                  <h3 className="font-serif text-2xl text-cream">{artwork.title}</h3>
                  <p className="mt-2 text-sm text-ash">
                    {artwork.artist} · {artwork.year}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
