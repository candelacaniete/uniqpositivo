import { motion } from 'framer-motion';

export default function Galeria() {
  return (
    <section id="galeria-puente" className="section-shell bg-warm px-5 py-28 md:px-8 md:py-36">
      <div className="decor-butterfly -left-12 bottom-12" />
      <div className="decor-flower -right-14 top-14" />
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75 }}
        >
          <p className="mb-5 text-sm uppercase tracking-widest text-ash">Historia + galería</p>
          <h2 className="font-serif text-5xl font-semibold leading-none text-cream md:text-7xl">
            Uniq nació como un refugio para transformar imagen y energía.
          </h2>
        </motion.div>

        <motion.div
          className="rounded-3xl border border-line bg-night/85 p-6 shadow-soft-card md:p-8"
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
          <a
            href="/galeria"
            className="mt-8 inline-flex rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-night shadow-glow transition hover:-translate-y-0.5"
          >
            Ingresar a la galería
          </a>
          <div className="mt-8 grid grid-cols-3 gap-3" aria-hidden="true">
            <div className="image-placeholder h-28 rounded-2xl" />
            <div className="image-placeholder h-36 rounded-2xl" />
            <div className="image-placeholder h-28 rounded-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
