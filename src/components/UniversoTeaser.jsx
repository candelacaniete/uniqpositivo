import { motion } from 'framer-motion';

export default function UniversoTeaser() {
  return (
    <section className="section-shell bg-ink px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl border border-line bg-night p-8 text-center md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-ash">Universo Uniq</p>
          <h2 className="font-serif text-5xl font-semibold leading-none text-cream md:text-7xl">
            Un mundo alrededor de la belleza.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-8 text-ash">
            Una selección de marcas, objetos, indumentaria y proyectos que conviven con nuestra forma de ver la belleza.
          </p>
          <a href="/universo" className="editorial-button mt-8">
            Explorar universo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
