import { motion } from 'framer-motion';
import { Crown, Droplets, Scissors, Sparkles, Waves } from 'lucide-react';

const services = [
  {
    name: 'Corte',
    description: 'Diseño personalizado para realzar textura, movimiento y proporción.',
    price: 'Desde $18.000',
    Icon: Scissors,
  },
  {
    name: 'Coloración',
    description: 'Color con diagnóstico previo, cuidado de fibra y acabado luminoso.',
    price: 'Desde $38.000',
    Icon: Sparkles,
  },
  {
    name: 'Tratamientos capilares',
    description: 'Rituales de reparación, nutrición y brillo para sanar el cabello.',
    price: 'Desde $28.000',
    Icon: Droplets,
  },
  {
    name: 'Peinados',
    description: 'Looks para eventos, producciones y momentos especiales.',
    price: 'Desde $24.000',
    Icon: Crown,
  },
  {
    name: 'Extensiones',
    description: 'Volumen y largo con integración natural y mantenimiento experto.',
    price: 'Consultar',
    Icon: Waves,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.55, ease: 'easeOut' },
  }),
};

export default function Servicios() {
  return (
    <section id="servicios" className="section-shell bg-ink px-5 py-24 md:px-8">
      <div className="decor-flower -left-16 top-12" />
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-ash">Servicios</p>
          <h2 className="font-serif text-4xl font-bold text-cream md:text-6xl">Belleza con intención y técnica</h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map(({ name, description, price, Icon }, index) => (
            <motion.article
              key={name}
              className="accent-border rounded-3xl border border-line bg-night p-6 shadow-soft-card transition hover:-translate-y-1 md:p-8"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-ink text-magenta">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-serif text-3xl font-semibold text-cream">{name}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-ash">{description}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold uppercase tracking-widest text-cream">{price}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
