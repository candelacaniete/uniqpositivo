import { motion } from 'framer-motion';

const products = [
  { name: 'Shampoo nutritivo', description: 'Para cuidado diario y brillo suave.' },
  { name: 'Máscara reparadora', description: 'Tratamiento intensivo para fibras sensibles.' },
  { name: 'Óleo finalizador', description: 'Control de frizz con acabado luminoso.' },
];

function productWhatsappLink(productName) {
  const text = `Hola! Quiero consultar por el producto ${productName}`;
  return `https://wa.me/541144045167?text=${encodeURIComponent(text)}`;
}

export default function Productos() {
  return (
    <section id="productos" className="section-shell bg-ink px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-ash">Productos</p>
          <h2 className="font-serif text-4xl font-bold text-cream md:text-6xl">Rituales para continuar en casa</h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {products.map((product, index) => (
            <motion.article
              key={product.name}
              className="accent-border rounded-3xl border border-line bg-night p-3 shadow-soft-card"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              {/* TODO: reemplazar por imagen real del producto */}
              <div className="image-placeholder h-64 rounded-2xl" />
              <div className="p-5">
                <h3 className="font-serif text-2xl text-cream">{product.name}</h3>
                <p className="mt-3 min-h-14 text-sm leading-7 text-ash">{product.description}</p>
                <a
                  href={productWhatsappLink(product.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex rounded-full border border-cream/60 px-5 py-3 text-xs font-bold uppercase tracking-widest text-cream transition hover:border-transparent hover:bg-accent hover:text-white"
                >
                  Consultar
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
