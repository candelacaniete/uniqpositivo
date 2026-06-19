import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const artworks = [
  { id: 'umbral', title: 'Umbral de luz', artist: 'Artista invitada', year: '2026', side: 'left', size: 'large', slot: 'upper' },
  { id: 'botanica', title: 'Botánica interior', artist: 'Artista invitado', year: '2025', side: 'right', size: 'medium', slot: 'upper' },
  { id: 'ritual', title: 'Ritual de luz', artist: 'Colectivo Uniq', year: '2026', side: 'left', size: 'small', slot: 'lower' },
  { id: 'rondeau', title: 'Rondeau 3352', artist: 'Artista residente', year: '2024', side: 'right', size: 'large', slot: 'lower' },
  { id: 'cuerpo', title: 'Cuerpo de flor', artist: 'Artista invitada', year: '2025', side: 'back', size: 'medium', slot: 'center' },
];

function ArtworkButton({ artwork, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={`gallery-painting ${artwork.size} ${artwork.slot} ${isSelected ? 'selected' : ''}`}
      aria-pressed={isSelected}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(artwork);
      }}
    >
      <span className="gallery-art-light" />
      {/* TODO: cargar imagen real del cuadro expuesto */}
      <span className="gallery-art-surface" />
      <span className="gallery-art-caption">
        <span className="gallery-art-title">{artwork.title}</span>
        <span className="gallery-art-meta">
          {artwork.artist} · {artwork.year}
        </span>
      </span>
    </button>
  );
}

export default function GaleriaExperiencia() {
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const roomTransform = useMemo(() => {
    const focusYaw = selectedArtwork?.side === 'left' ? -34 : selectedArtwork?.side === 'right' ? 34 : 0;
    const focusLift = selectedArtwork?.slot === 'upper' ? 0.4 : selectedArtwork?.slot === 'lower' ? -0.8 : -0.25;
    const focusZoom = selectedArtwork ? 7.2 : -2.2;
    const rotateX = 4 - look.y * 4.5;
    const rotateY = look.x * -8 + focusYaw;

    return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${focusZoom}rem) translateY(${focusLift}rem)`;
  }, [look, selectedArtwork]);

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    setLook({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    });
  };

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
          <p className="mt-4 max-w-2xl text-sm leading-7 text-night/72">
            Mové el cursor o arrastrá con el dedo para cambiar la mirada. Tocá un cuadro para acercarte.
          </p>
        </motion.div>

        <motion.div
          className="gallery-perspective"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setLook({ x: 0, y: 0 })}
          onClick={() => setSelectedArtwork(null)}
        >
          <div className={`gallery-room ${selectedArtwork ? 'is-focused' : ''}`} style={{ transform: roomTransform }}>
            <div className="gallery-wall gallery-wall-left">
              <span className="gallery-corner-shadow" />
              {artworks
                .filter((artwork) => artwork.side === 'left')
                .map((artwork) => (
                  <ArtworkButton
                    key={artwork.id}
                    artwork={artwork}
                    isSelected={selectedArtwork?.id === artwork.id}
                    onSelect={setSelectedArtwork}
                  />
                ))}
            </div>

            <div className="gallery-wall gallery-wall-back">
              <span className="gallery-corner-shadow" />
              {artworks
                .filter((artwork) => artwork.side === 'back')
                .map((artwork) => (
                  <ArtworkButton
                    key={artwork.id}
                    artwork={artwork}
                    isSelected={selectedArtwork?.id === artwork.id}
                    onSelect={setSelectedArtwork}
                  />
                ))}
            </div>

            <div className="gallery-wall gallery-wall-right">
              <span className="gallery-corner-shadow" />
              {artworks
                .filter((artwork) => artwork.side === 'right')
                .map((artwork) => (
                  <ArtworkButton
                    key={artwork.id}
                    artwork={artwork}
                    isSelected={selectedArtwork?.id === artwork.id}
                    onSelect={setSelectedArtwork}
                  />
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
