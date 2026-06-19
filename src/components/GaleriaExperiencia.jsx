import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const artworks = [
  {
    id: 'la-pintora',
    title: 'La pintora',
    artist: 'Vásquez',
    year: '2023',
    size: '70 x 60',
    technique: 'Óleo sobre tela',
    theme: 'Retrato y oficio',
    image: '/artworks/la-pintora.jpg',
    palette: ['#C94B36', '#F2C414', '#1D5F9E'],
    context:
      'Una figura sostiene el gesto de pintar como una escena íntima: color, mirada y naturaleza se cruzan para hablar del oficio creativo como forma de identidad.',
  },
  {
    id: 'la-chica-de-azul',
    title: 'La chica de azul',
    artist: 'Vásquez',
    year: '2023',
    size: null,
    technique: null,
    theme: 'Silencio azul',
    image: '/artworks/la-chica-de-azul.png',
    palette: ['#446B7B', '#C79237', '#E5C27C'],
    context:
      'Un retrato sereno donde el azul funciona como atmósfera. La obra invita a mirar la pausa, el perfil y la elegancia de un gesto contenido.',
  },
  {
    id: 'titulo-en-contraste',
    title: 'Título en contraste',
    artist: 'Vásquez',
    year: '2023',
    size: '45 x 60',
    technique: 'Óleo sobre tela',
    theme: 'Contraste y presencia',
    image: '/artworks/titulo-en-contraste.jpg',
    palette: ['#213F3A', '#E77E20', '#E7C9C1'],
    context:
      'Una pieza de perfil fuerte, con planos de color y una composición de alto contraste que une figura, materia y gesto contemporáneo.',
  },
];

function svgDataUri(markup) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(markup)}`;
}

function artworkImage(artwork, blur = false) {
  const [dark, mid, light] = artwork.palette;
  const size = blur ? 42 : 1200;
  const grain = blur ? '' : '<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values=".24"/><feBlend mode="soft-light" in2="SourceGraphic"/></filter>';

  return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${Math.round(size * 1.25)}" viewBox="0 0 1200 1500">
      <defs>
        ${grain}
        <radialGradient id="a" cx="34%" cy="22%" r="42%">
          <stop offset="0%" stop-color="${light}" stop-opacity=".86"/>
          <stop offset="45%" stop-color="${mid}" stop-opacity=".5"/>
          <stop offset="100%" stop-color="${dark}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="b" cx="72%" cy="62%" r="46%">
          <stop offset="0%" stop-color="${mid}" stop-opacity=".76"/>
          <stop offset="58%" stop-color="${dark}" stop-opacity=".32"/>
          <stop offset="100%" stop-color="${dark}" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="c" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${dark}"/>
          <stop offset="54%" stop-color="${mid}"/>
          <stop offset="100%" stop-color="${light}"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="1500" fill="${dark}"/>
      <rect width="1200" height="1500" fill="url(#c)" opacity=".44"/>
      <circle cx="390" cy="330" r="390" fill="url(#a)"/>
      <circle cx="830" cy="910" r="430" fill="url(#b)"/>
      <path d="M160 1170 C340 1010 500 1290 700 1080 C860 910 960 1110 1080 940 L1080 1500 L160 1500 Z" fill="${dark}" opacity=".55"/>
      <path d="M210 260 C420 120 480 520 740 360 C890 270 960 350 1040 450" fill="none" stroke="${light}" stroke-width="8" opacity=".22"/>
      <path d="M250 760 C420 650 570 790 720 710 C830 650 930 690 1010 760" fill="none" stroke="${light}" stroke-width="5" opacity=".18"/>
      <rect x="58" y="58" width="1084" height="1384" fill="none" stroke="${light}" stroke-width="2" opacity=".16"/>
      ${blur ? '' : '<rect width="1200" height="1500" filter="url(#grain)" opacity=".18"/>'}
    </svg>
  `);
}

function artworkWhatsappLink(artwork) {
  const details = [artwork.title, artwork.artist, artwork.year, artwork.size, artwork.technique].filter(Boolean).join(' · ');
  const text = `Hola! Quiero consultar por esta obra de la galería Uniq Positivo: ${details}.`;
  return `https://wa.me/541144045167?text=${encodeURIComponent(text)}`;
}

function BlurUpArtwork({ artwork, onZoom }) {
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageSrc = artwork.image && !imageError ? artwork.image : artworkImage(artwork);

  return (
    <button type="button" className="story-artwork-button" onClick={() => onZoom(artwork)} aria-label={`Ver detalle de ${artwork.title}`}>
      <img className="story-artwork-blur" src={artworkImage(artwork, true)} alt="" aria-hidden="true" />
      <img
        className={`story-artwork-image ${loaded ? 'loaded' : ''}`}
        src={imageSrc}
        alt={`${artwork.title}, obra de ${artwork.artist}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setImageError(true)}
      />
      <span className="story-zoom-hint">Tap para ver textura</span>
    </button>
  );
}

function ArtworkMoment({ artwork, index, onZoom }) {
  const [expanded, setExpanded] = useState(false);
  const artworkDetails = [artwork.size, artwork.technique].filter(Boolean).join(' · ');

  return (
    <motion.section
      className="story-moment"
      initial={{ opacity: 0.2 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.55 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <motion.div
        className="story-artwork-wrap"
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ amount: 0.45 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <BlurUpArtwork artwork={artwork} onZoom={onZoom} />
      </motion.div>

      <motion.aside
        className="story-copy"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.5 }}
        transition={{ duration: 0.75, delay: 0.08 }}
      >
        <p className="story-kicker">
          {String(index + 1).padStart(2, '0')} · {artwork.theme}
        </p>
        <h2>{artwork.title}</h2>
        <p className="story-meta">
          {artwork.artist} · {artwork.year}
        </p>
        {artworkDetails ? <p className="story-meta">{artworkDetails}</p> : null}
        <div className="story-actions">
          <button type="button" className="story-info-button" onClick={() => setExpanded((current) => !current)}>
            {expanded ? 'Cerrar info' : '+ info'}
          </button>
          <a className="story-info-button" href={artworkWhatsappLink(artwork)} target="_blank" rel="noreferrer">
            Consultar por esta obra
          </a>
        </div>
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.p
              className="story-context"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              {artwork.context}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </motion.aside>
    </motion.section>
  );
}

function ZoomModal({ artwork, onClose }) {
  if (!artwork) return null;
  const artworkDetails = [artwork.size, artwork.technique].filter(Boolean).join(' · ');

  return (
    <AnimatePresence>
      <motion.div
        className="story-zoom-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button type="button" className="story-zoom-close" onClick={onClose}>
          Cerrar
        </button>
        <motion.div
          className="story-zoom-content"
          initial={{ scale: 0.92, y: 24 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 12 }}
          transition={{ duration: 0.35 }}
          onClick={(event) => event.stopPropagation()}
        >
          <img
            src={artwork.image || artworkImage(artwork)}
            alt={`Detalle ampliado de ${artwork.title}`}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = artworkImage(artwork);
            }}
          />
          <div>
            <h2>{artwork.title}</h2>
            <p>
              {artwork.artist} · {artwork.year}
            </p>
            {artworkDetails ? <p>{artworkDetails}</p> : null}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function GaleriaExperiencia() {
  const [zoomedArtwork, setZoomedArtwork] = useState(null);

  return (
    <main className="story-gallery">
      <div className="fixed left-5 top-5 z-20 md:left-8 md:top-8">
        <a
          href="/"
          className="rounded-full border border-night/20 bg-night/80 px-5 py-3 text-xs font-bold uppercase tracking-widest text-earth shadow-soft-card backdrop-blur-md transition hover:bg-earth hover:text-night"
        >
          Volver
        </a>
      </div>

      <section className="story-intro">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <p>Galería Uniq Positivo</p>
          <h1>Recorrido curado.</h1>
          <span>
            Una obra por momento. Scroll suave, capas de información y zoom de detalle para observar textura y materia.
          </span>
        </motion.div>
      </section>

      <div className="story-timeline" aria-label="Recorrido de obras">
        {artworks.map((artwork, index) => (
          <ArtworkMoment key={artwork.id} artwork={artwork} index={index} onZoom={setZoomedArtwork} />
        ))}
      </div>

      <ZoomModal artwork={zoomedArtwork} onClose={() => setZoomedArtwork(null)} />
    </main>
  );
}
