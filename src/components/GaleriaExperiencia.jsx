import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const artworks = [
  {
    id: 'la-pintora',
    title: 'La pintora',
    artist: 'Vásquez',
    year: '2023',
    size: '60 x 70',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Retrato y oficio',
    image: '/artworks/la-pintora.png',
    palette: ['#C94B36', '#F2C414', '#1D5F9E'],
    context:
      'Una figura sostiene el gesto de pintar como una escena íntima: color, mirada y naturaleza se cruzan para hablar del oficio creativo como forma de identidad.',
  },
  {
    id: 'la-chica-de-azul',
    title: 'La chica de azul',
    artist: 'Vásquez',
    year: '2023',
    size: '50 x 70',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Silencio azul',
    image: '/artworks/la-chica-de-azul.png',
    palette: ['#446B7B', '#C79237', '#E5C27C'],
    context:
      'Un retrato sereno donde el azul funciona como atmósfera. La obra invita a mirar la pausa, el perfil y la elegancia de un gesto contenido.',
  },
  {
    id: 'la-artista',
    title: 'La artista',
    artist: 'Vásquez',
    year: '2023',
    size: '60 x 70',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Oficio y creación',
    image: '/artworks/drive/la-artista-jime.png',
    palette: ['#7E3C2E', '#E4A13C', '#20251F'],
    context:
      'Una figura creadora sostiene el pulso de la composición: la obra habla del oficio, la presencia y el gesto artístico como identidad.',
  },
  {
    id: 'sentir',
    title: 'Sentir',
    artist: 'Vásquez',
    year: '2023',
    size: '100 x 80',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Materia sensible',
    image: '/artworks/drive/sentir-jime.png',
    palette: ['#4D4B41', '#C77D59', '#D8C6AF'],
    context:
      'Una obra de gran formato donde color, cuerpo y gesto construyen una escena emocional abierta a múltiples lecturas.',
  },
  {
    id: 'la-busqueda',
    title: 'La búsqueda',
    artist: 'Vásquez',
    year: '2023',
    size: '45 x 60',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Camino interior',
    image: '/artworks/drive/la-busqueda-jime.png',
    palette: ['#C56E3D', '#214D5A', '#E4C49E'],
    context:
      'La búsqueda aparece como recorrido visual: capas, contrastes y símbolos que sugieren movimiento interno.',
  },
  {
    id: 'a-corazon-abierto',
    title: 'A corazón abierto',
    artist: 'Vásquez',
    year: '2023',
    size: '45 x 50',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Vulnerabilidad',
    image: '/artworks/drive/corazon-jime.png',
    palette: ['#5C3A2E', '#B34735', '#E1C095'],
    context:
      'Una pieza que expone emoción y fragilidad desde una paleta cálida, con el corazón como símbolo de apertura.',
  },
  {
    id: 'viaje-al-interior',
    title: 'Viaje al interior',
    artist: 'Vásquez',
    year: '2023',
    size: '30 x 40',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Introspección',
    image: '/artworks/drive/interior-jime.png',
    palette: ['#6E4A3B', '#3D6671', '#DDB887'],
    context:
      'Un viaje simbólico hacia adentro, construido con planos de color, memoria y pequeños indicios narrativos.',
  },
  {
    id: 'florecimiento',
    title: 'Florecimiento',
    artist: 'Vásquez',
    year: '2023',
    size: '45 x 70',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Renacer',
    image: '/artworks/drive/florecimiento-jime.png',
    palette: ['#3F5A46', '#D78353', '#E7C8B2'],
    context:
      'La obra trabaja la idea de florecer como transformación: una escena donde color y forma sugieren expansión.',
  },
  {
    id: 'bocana-de-agua',
    title: 'Bocana de agua',
    artist: 'Vásquez',
    year: '2023',
    size: '30 x 40',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Flujo',
    image: '/artworks/drive/agua-jime.png',
    palette: ['#294B60', '#7FA3A6', '#D6A766'],
    context:
      'Un trabajo donde el agua aparece como apertura, movimiento y borde entre mundo interior y exterior.',
  },
  {
    id: 'el-rimel-es-mi-reloj-de-arena',
    title: 'El Rímel es mi reloj de arena',
    artist: 'Vásquez',
    year: '2023',
    size: '30 x 40',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Tiempo y gesto',
    image: '/artworks/drive/rimel-jime.jpg',
    palette: ['#3A2C26', '#A16B4C', '#D4B78E'],
    context:
      'Una obra que asocia tiempo, belleza y ritual cotidiano desde una imagen íntima y poética.',
  },
  {
    id: 'selenografia-del-susurro',
    title: 'La Selenografía del Susurro',
    artist: 'Vásquez',
    year: '2023',
    size: '30 x 40',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Susurro lunar',
    image: '/artworks/drive/selenografia-jime.jpg',
    palette: ['#30364A', '#C7A06B', '#E4D2B6'],
    context:
      'Una escena de resonancia nocturna, donde lo lunar y lo íntimo se traducen en composición y textura.',
  },
  {
    id: 'la-cofradia-culinaria',
    title: 'La Cofradía Culinaria',
    artist: 'Vásquez',
    year: '2023',
    size: '80 x 100',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Encuentro',
    image: '/artworks/drive/la-cofradia.jpg',
    palette: ['#4A3026', '#C68E4C', '#D9C6A2'],
    context:
      'Una pieza de gran formato que cruza mesa, ritual y pertenencia, con una escena colectiva cargada de símbolos.',
  },
  {
    id: 'estancia-fragmentada-grifo-onirico',
    title: 'La Estancia Fragmentada y el Grifo Onírico',
    artist: 'Vásquez',
    year: '2023',
    size: '80 x 100',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Sueño y espacio',
    image: '/artworks/drive/estancia-jime.jpg',
    palette: ['#2A241D', '#8F6E55', '#D8C1A2'],
    context:
      'Una obra donde el espacio se fragmenta en claves oníricas, combinando objetos, arquitectura y memoria.',
  },
  {
    id: 'la-caida-colectiva',
    title: 'La Caída Colectiva',
    artist: 'Vásquez',
    year: '2023',
    size: '80 x 100',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Cuerpo colectivo',
    image: '/artworks/drive/caida-jime.jpg',
    palette: ['#56362F', '#A66A4D', '#D6B58E'],
    context:
      'Una escena de movimiento y tensión donde lo colectivo se vuelve imagen, caída y composición.',
  },
  {
    id: 'coreografia-de-los-sentidos',
    title: 'Coreografía de los Sentidos',
    artist: 'Vásquez',
    year: '2023',
    size: '80 x 100',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Movimiento sensorial',
    image: '/artworks/drive/coreografia-jime.jpg',
    palette: ['#2D2B23', '#B46A3C', '#DEC192'],
    context:
      'Un trabajo donde la composición funciona como danza: formas, colores y ritmos visuales se encuentran en escena.',
  },
  {
    id: 'intersecciones-de-la-memoria',
    title: 'Intersecciones de la Memoria',
    artist: 'Vásquez',
    year: '2023',
    size: '45 x 60',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Memoria',
    image: '/artworks/drive/memoria-jime.png',
    palette: ['#273A35', '#D27A5F', '#E4C5A4'],
    context:
      'Una obra que superpone rostros, signos y colores como fragmentos de una memoria que no aparece de forma lineal.',
  },
  {
    id: 'perfil-en-silencio-cromatico',
    title: 'Perfil en Silencio Cromático',
    artist: 'Vásquez',
    year: '2023',
    size: '45 x 60',
    technique: 'Óleo sobre tela',
    price: 'Consultar',
    theme: 'Perfil y contraste',
    image: '/artworks/titulo-en-contraste.png',
    palette: ['#213F3A', '#E77E20', '#E7C9C1'],
    context:
      'Un perfil de presencia serena, atravesado por planos cromáticos que construyen contraste, silencio y fuerza visual.',
  },
];

const featuredArtworks = artworks.slice(0, 3);

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
  const details = [artwork.title, artwork.artist, artwork.year, artwork.size, artwork.technique, artwork.price].filter(Boolean).join(' · ');
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
  const artworkDetails = [artwork.size, artwork.technique, artwork.price].filter(Boolean).join(' · ');

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

function CatalogueArtworkCard({ artwork, onZoom }) {
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageSrc = artwork.image && !imageError ? artwork.image : artworkImage(artwork);
  const artworkDetails = [artwork.size, artwork.technique, artwork.price].filter(Boolean).join(' · ');

  return (
    <article className="catalogue-card">
      <button type="button" className="catalogue-image-button" onClick={() => onZoom(artwork)} aria-label={`Ver detalle de ${artwork.title}`}>
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
      </button>
      <div className="catalogue-copy">
        <p className="story-kicker">{artwork.theme}</p>
        <h2>{artwork.title}</h2>
        <p>{artwork.artist} · {artwork.year}</p>
        <p>{artworkDetails}</p>
        <div className="story-actions">
          <button type="button" className="story-info-button" onClick={() => onZoom(artwork)}>
            Ver detalle
          </button>
          <a className="story-info-button" href={artworkWhatsappLink(artwork)} target="_blank" rel="noreferrer">
            Consultar
          </a>
        </div>
      </div>
    </article>
  );
}

function ZoomModal({ artwork, onClose }) {
  if (!artwork) return null;
  const artworkDetails = [artwork.size, artwork.technique, artwork.price].filter(Boolean).join(' · ');

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
            Una obra por momento, catálogo completo para consultar disponibilidad y zoom de detalle para observar textura y materia.
          </span>
        </motion.div>
      </section>

      <div className="story-timeline" aria-label="Recorrido de obras">
        {featuredArtworks.map((artwork, index) => (
          <ArtworkMoment key={artwork.id} artwork={artwork} index={index} onZoom={setZoomedArtwork} />
        ))}
      </div>

      <section className="catalogue-section" aria-label="Catálogo completo de obras">
        <div className="catalogue-heading">
          <p>Catálogo vendible</p>
          <h2>Todas las obras</h2>
          <span>Consultá por WhatsApp la disponibilidad, precio final y coordinación de compra de cada pieza.</span>
        </div>
        <div className="catalogue-grid">
          {artworks.map((artwork) => (
            <CatalogueArtworkCard key={artwork.id} artwork={artwork} onZoom={setZoomedArtwork} />
          ))}
        </div>
      </section>

      <ZoomModal artwork={zoomedArtwork} onClose={() => setZoomedArtwork(null)} />
    </main>
  );
}
