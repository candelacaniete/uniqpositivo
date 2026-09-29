import { motion } from 'framer-motion';

const ownedBrands = ['MUV', 'Alunadas'];
const thirdPartyBrands = ["L'Oréal Professionnel", 'Kleno', 'Hairssimme', 'Fidelité', 'Caviar', 'Ossono', 'y otras'];

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
          <p className="mb-4 text-sm uppercase tracking-widest text-ash">Shop</p>
          <h2 className="editorial-section-title">Rituales para continuar en casa</h2>
          <p className="mx-auto mt-6 max-w-3xl leading-8 text-ash">
            Todos los productos que vendemos son seleccionados y probados en distintas personas con resultados favorables. Si los
            ofrecemos es porque realmente confiamos en ellos, no porque estén de moda.
          </p>
          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2">
            {ownedBrands.map((brand) => (
              <span key={brand} className="border border-line px-3 py-2 text-xs font-bold uppercase tracking-widest text-ash">
                {brand}
              </span>
            ))}
          </div>
          <div className="mx-auto mt-5 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-widest text-ash">También trabajamos con:</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {thirdPartyBrands.map((brand) => (
                <span key={brand} className="text-xs uppercase tracking-widest text-ash/80">
                  {brand}
                </span>
              ))}
            </div>
          </div>
          <a href="/shop" className="editorial-button mt-8">
            Ver selección
          </a>
        </motion.div>
      </div>
    </section>
  );
}
