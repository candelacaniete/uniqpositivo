import { useState } from 'react';
import { motion } from 'framer-motion';

const imageExtensions = ['jpg', 'png', 'webp'];

const shopSections = [
  {
    title: 'Productos',
    description: 'Seleccionados y probados, para que el ritual continúe en casa.',
    items: Array.from({ length: 15 }, (_, index) => `productos-${index + 1}`),
  },
  {
    title: 'MUV',
    description: 'Carteras y accesorios pensados para acompañar, con carácter propio.',
    items: Array.from({ length: 6 }, (_, index) => `muv-${index + 1}`),
  },
  {
    title: 'Alunadas',
    description: 'Indumentaria para volver a habitar el cuerpo desde la comodidad.',
    items: ['alunadas-1', 'alunadas-2', 'alunadas-3', 'alunadas-4', 'aluhnadas-5', 'alunadas-6'],
  },
  {
    title: 'Accesorios',
    description: 'Los detalles que completan cada look.',
    items: Array.from({ length: 10 }, (_, index) => `accesorios-${index + 1}`),
  },
];

function ShopPreviewImage({ name, sectionTitle }) {
  const [extensionIndex, setExtensionIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="shop-preview-placeholder">
        <span>{name}</span>
      </div>
    );
  }

  return (
    <img
      className="shop-preview-image"
      src={`/shop/${name}.${imageExtensions[extensionIndex]}`}
      alt={`${sectionTitle} ${name}`}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (extensionIndex < imageExtensions.length - 1) {
          setExtensionIndex((current) => current + 1);
          return;
        }
        setHasError(true);
      }}
    />
  );
}

export default function ShopPreview() {
  return (
    <main className="shop-preview-page bg-ink text-cream">
      <section className="shop-preview-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <p>Shop preview</p>
          <h1>Una selección para descubrir en Uniq.</h1>
          <span>
            Productos, accesorios, indumentaria y objetos elegidos para acompañar la experiencia del local. Sin venta online:
            todo se conoce, se prueba y se consulta en persona.
          </span>
        </motion.div>
      </section>

      <div className="shop-preview-sections">
        {shopSections.map((section) => (
          <section key={section.title} className="shop-preview-block">
            <div className="shop-preview-heading">
              <p>{section.title}</p>
              <h2>{section.description}</h2>
            </div>
            <div className={`shop-preview-grid items-${section.items.length}`}>
              {section.items.map((item) => (
                <figure key={item} className="shop-preview-card" aria-label={`${section.title} ${item}`}>
                  <ShopPreviewImage name={item} sectionTitle={section.title} />
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
