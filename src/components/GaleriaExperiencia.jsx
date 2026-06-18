import { motion } from 'framer-motion';

const artworks = [
  { title: 'Umbral de luz', artist: 'Artista invitada', year: '2026', side: 'left', size: 'large' },
  { title: 'Botánica interior', artist: 'Artista invitado', year: '2025', side: 'right', size: 'medium' },
  { title: 'Ritual de luz', artist: 'Colectivo Uniq', year: '2026', side: 'left', size: 'small' },
  { title: 'Rondeau 3352', artist: 'Artista residente', year: '2024', side: 'right', size: 'large' },
  { title: 'Cuerpo de flor', artist: 'Artista invitada', year: '2025', side: 'back', size: 'medium' },
];

export default function GaleriaExperiencia() {
  return (
    <main className="immersive-gallery min-h-screen overflow-hidden bg-earth text-night">
      <div className="absolute left-5 top-5 z-20 md:left-8 md:top-8">
        <a
          href="/"
          className="rounded-full border border-night/30 bg-night/10 px-5 py-3 text-xs font-bold uppercase tracking-widest text-night backdrop-blur-md transition hover:bg-night hover:text-earth"
        >
          Volver
        </a>
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-24 md:px-8">
        <motion.div
          className="mb-8 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-night/70">Galería Uniq Positivo</p>
          <h1 className="font-serif text-5xl font-semibold leading-none md:text-7xl">Entrá como visitante.</h1>
        </motion.div>

        <motion.div
          className="gallery-perspective"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <div className="gallery-room">
            <div className="gallery-wall gallery-wall-left">
              {artworks
                .filter((artwork) => artwork.side === 'left')
                .map((artwork) => (
                  <article key={artwork.title} className={`gallery-painting ${artwork.size}`}>
                    {/* TODO: cargar imagen real del cuadro expuesto */}
                    <div className="gallery-art-surface" />
                    <div>
                      <h2>{artwork.title}</h2>
                      <p>
                        {artwork.artist} · {artwork.year}
                      </p>
                    </div>
                  </article>
                ))}
            </div>

            <div className="gallery-wall gallery-wall-back">
              {artworks
                .filter((artwork) => artwork.side === 'back')
                .map((artwork) => (
                  <article key={artwork.title} className={`gallery-painting ${artwork.size}`}>
                    {/* TODO: cargar imagen real del cuadro expuesto */}
                    <div className="gallery-art-surface" />
                    <div>
                      <h2>{artwork.title}</h2>
                      <p>
                        {artwork.artist} · {artwork.year}
                      </p>
                    </div>
                  </article>
                ))}
            </div>

            <div className="gallery-wall gallery-wall-right">
              {artworks
                .filter((artwork) => artwork.side === 'right')
                .map((artwork) => (
                  <article key={artwork.title} className={`gallery-painting ${artwork.size}`}>
                    {/* TODO: cargar imagen real del cuadro expuesto */}
                    <div className="gallery-art-surface" />
                    <div>
                      <h2>{artwork.title}</h2>
                      <p>
                        {artwork.artist} · {artwork.year}
                      </p>
                    </div>
                  </article>
                ))}
            </div>

            <div className="gallery-floor" />
            <div className="gallery-ceiling" />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
