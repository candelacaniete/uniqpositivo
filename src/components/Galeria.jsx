import { motion } from 'framer-motion';

export default function Galeria() {
  return (
    <section id="galeria-puente" className="section-shell bg-ink px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden border border-line lg:grid-cols-2">
        <motion.div
          className="bg-warm p-8 md:p-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75 }}
        >
          <p className="mb-5 text-sm uppercase tracking-widest text-night/70">Historia + galería</p>
          <h2 className="font-serif text-5xl font-semibold leading-none text-night md:text-7xl">
            Uniq nació como un refugio para transformar imagen y energía.
          </h2>
          <a
            href="/galeria"
            className="mt-10 inline-flex border border-night px-8 py-4 text-sm font-bold uppercase tracking-widest text-night transition hover:border-cream hover:text-cream"
          >
            Ingresar a la galería
          </a>
        </motion.div>

        <motion.div
          className="bg-night p-8 md:p-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <p className="leading-8 text-ash">
            En Rondeau 3352 conviven el oficio del cabello, la sensibilidad del arte y una mirada estética que no separa belleza
            de expresión. La galería abre otra capa del espacio: obras, texturas y recorridos que acompañan la experiencia de
            quienes llegan a Uniq.
          </p>
          <p className="mt-5 leading-8 text-ash">
            La entrada a la galería funciona como un cambio de escena: de la landing a una sala inmersiva, vista desde el ángulo de
            una persona visitante.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
