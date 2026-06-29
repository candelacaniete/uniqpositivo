import { motion } from 'framer-motion';

export default function Galeria() {
  return (
    <section id="galeria-puente" className="section-shell bg-ink px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-6xl items-stretch overflow-hidden border border-line lg:grid-cols-2">
        <motion.div
          className="flex flex-col justify-center bg-warm p-8 text-center md:p-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75 }}
        >
          <p className="mb-5 text-sm uppercase tracking-widest text-night/70">Historia + galería</p>
          <h2 className="font-serif text-5xl font-semibold leading-none text-night md:text-7xl">
            Uniq nació como un refugio para transformar imagen y energía.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-night">
            Un lugar donde la belleza se convierte en experiencia artística y donde cada detalle, desde el color, las texturas, la
            música y las obras que nos rodean, invitan a conectar con lo más auténtico de uno mismo.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center bg-night p-8 text-center md:p-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <p className="leading-8 text-cream">
            En Rondeau 3352 conviven el oficio del cabello, la sensibilidad del arte y una mirada estética que no separa belleza
            de expresión. La galería abre otra capa del espacio: obras, texturas y recorridos que acompañan la experiencia de
            quienes llegan a Uniq.
          </p>
          <p className="mt-5 leading-8 text-cream">
            Hoy somos un centro de estética que late dentro de una galería de arte, dónde la creatividad y el cuidado se entrelazan
            para recordarnos que transformarse también es un acto de amor propio, de superación y de arte.
          </p>
          <a
            href="/galeria"
            className="mx-auto mt-10 inline-flex border border-cream px-8 py-4 text-sm font-bold uppercase tracking-widest text-cream transition hover:border-accent hover:text-accent"
          >
            Ingresar a la galería
          </a>
        </motion.div>
      </div>
    </section>
  );
}
