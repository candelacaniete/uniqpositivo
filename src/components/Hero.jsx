import { motion } from 'framer-motion';

const heroImageUrl = '/hero/herouniq.png';

export default function Hero({ onGalleryClick }) {
  return (
    <section id="hero" className="editorial-hero bg-ink">
      <div className="editorial-hero-grid">
        <motion.div
          className="editorial-hero-image"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img className="editorial-model-photo" src={heroImageUrl} alt="Retrato editorial de mujer con cabello largo" />
        </motion.div>

        <motion.div
          className="editorial-hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
        >
          <p className="editorial-eyebrow">Centro de belleza y arte</p>
          <h1>
            Sanamos tu cabello.
            <span>Elevamos tu imagen.</span>
          </h1>
          <p className="editorial-script">the Art of Hair</p>
          <div className="editorial-actions">
            <a href="#servicios" className="editorial-button">
              Reservar turno
            </a>
            <button type="button" onClick={onGalleryClick} className="editorial-button">
              Ver galería
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
