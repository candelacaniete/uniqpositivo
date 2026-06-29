import { motion } from 'framer-motion';

const products = [
  { name: 'Shampoo nutritivo', description: 'Para cuidado diario y brillo suave.' },
  { name: 'Máscara reparadora', description: 'Tratamiento intensivo para fibras sensibles.' },
  { name: 'Óleo finalizador', description: 'Control de frizz con acabado luminoso.' },
];

const brands = ["L'Oréal Professionnel", 'Kleno', 'Hairssimme', 'Fidelité', 'Caviar', 'Ossono', 'y otras'];

function productWhatsappLink(productName) {
  const text = `Hola! Quiero consultar por el producto ${productName}`;
  return `https://wa.me/541144045167?text=${encodeURIComponent(text)}`;
}

export default function Productos() {
  return (
    <section id="productos" className="section-shell bg-night px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-ash">Productos</p>
          <h2 className="editorial-section-title">Rituales para continuar en casa</h2>
          <p className="mx-auto mt-6 max-w-3xl leading-8 text-ash">
            Todos los productos que vendemos son seleccionados y probados en distintas personas con resultados favorables. Si los
            ofrecemos es porque realmente confiamos en ellos, no porque estén de moda.
          </p>
          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2">
            {brands.map((brand) => (
              <span key={brand} className="border border-line px-3 py-2 text-xs font-bold uppercase tracking-widest text-ash">
                {brand}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-ash">
            Te invitamos a visitar el local para conocer la selección completa y elegir el ritual ideal para tu cabello.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {products.map((product, index) => (
            <motion.article
              key={product.name}
              className="border border-line bg-night p-3"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              {/* TODO: reemplazar por imagen real del producto */}
              <div className="image-placeholder h-72" />
              <div className="p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-cream">{product.name}</h3>
                <p className="mt-3 min-h-14 text-sm leading-7 text-ash">{product.description}</p>
                <a
                  href={productWhatsappLink(product.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="editorial-button mt-6 px-5 py-3"
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
