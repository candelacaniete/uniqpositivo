import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, WandSparkles } from 'lucide-react';

const services = [
  {
    name: 'Combo Renovación',
    description: 'Color en raíces + nutrición post color de colágeno y vitaminas.',
    price: '$77.000',
    deposit: '$10.000',
    duration: '120 min aprox.',
    Icon: WandSparkles,
  },
  {
    name: 'Combo Brillo',
    description: "Corte de cabello + lavado L'Oreal Professionel + nutrición de colágeno y karité.",
    price: '$47.000',
    duration: '90 min aprox.',
    Icon: Sparkles,
  },
  {
    name: 'Combo Estrella',
    description: 'Corte + lavado + tratamiento personalizado para nutrición, hidratación y restauración capilar.',
    price: '$97.000',
    duration: '120 min aprox.',
    Icon: Star,
  },
  {
    name: 'Combo Amor Propio',
    description:
      'Color raíz hasta 3 cm de crecimiento + corte + tratamiento personalizado de nutrición, hidratación y reparación.',
    price: '$159.000',
    duration: '180 min aprox.',
    Icon: Heart,
  },
];

const availableTimes = ['10:00', '11:30', '13:00', '15:00', '16:30', '18:00'];

function getToday() {
  return new Date().toISOString().split('T')[0];
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.55, ease: 'easeOut' },
  }),
};

export default function Servicios() {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const isComplete = Boolean(selectedService && date && time);
  const whatsappHref = useMemo(() => {
    const depositText = selectedService.deposit ? ` Seña: ${selectedService.deposit}.` : '';
    const text = `Hola! Quiero reservar un turno para ${selectedService.name} el ${date} a las ${time}. Valor: ${selectedService.price}.${depositText} Duración aproximada: ${selectedService.duration}.`;
    return `https://wa.me/541144045167?text=${encodeURIComponent(text)}`;
  }, [date, selectedService, time]);

  const SelectedIcon = selectedService.Icon;

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
          <h2 className="font-serif text-5xl font-semibold leading-none text-cream md:text-7xl">Elegí tu combo y reservá</h2>
          <p className="mt-6 max-w-2xl leading-8 text-ash">
            Cada combo abre su propia ficha de turno con descripción, valor, duración estimada y confirmación directa por WhatsApp.
          </p>
        </motion.div>

        <div className="services-booking-grid">
          <div className="grid gap-4">
          {services.map(({ name, description, price, Icon }, index) => (
            <motion.article
              key={name}
              className={`accent-border cursor-pointer rounded-3xl border p-5 shadow-soft-card transition hover:-translate-y-1 md:p-6 ${
                selectedService.name === name ? 'border-terracotta bg-warm/80' : 'border-line bg-night'
              }`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              onClick={() => {
                setSelectedService(services[index]);
                setTime('');
              }}
            >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-ink text-moss">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-3xl font-semibold text-cream">{name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-ash">{description}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-widest text-cream">
                      <span>{price}</span>
                      {services[index].deposit ? (
                        <>
                          <span className="text-ash">·</span>
                          <span>Seña {services[index].deposit}</span>
                        </>
                      ) : null}
                      <span className="text-ash">·</span>
                      <span>{services[index].duration}</span>
                    </div>
                  </div>
                </div>
            </motion.article>
          ))}
          </div>

          <motion.form
            className="rounded-3xl border border-line bg-night/90 p-6 shadow-soft-card md:p-8"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-moss text-night">
                <SelectedIcon size={28} strokeWidth={1.4} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-ash">Turno para</p>
                <h3 className="mt-1 font-serif text-4xl font-semibold text-cream">{selectedService.name}</h3>
              </div>
            </div>

            <p className="leading-8 text-ash">{selectedService.description}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-line bg-ink/70 p-4">
                <p className="text-xs uppercase tracking-widest text-ash">Valor</p>
                <p className="mt-2 font-serif text-2xl font-semibold text-cream">{selectedService.price}</p>
              </div>
              <div className="rounded-3xl border border-line bg-ink/70 p-4">
                <p className="text-xs uppercase tracking-widest text-ash">Duración aprox.</p>
                <p className="mt-2 font-serif text-2xl font-semibold text-cream">{selectedService.duration}</p>
              </div>
              {selectedService.deposit ? (
                <div className="rounded-3xl border border-line bg-ink/70 p-4 sm:col-span-2">
                  <p className="text-xs uppercase tracking-widest text-ash">Seña</p>
                  <p className="mt-2 font-serif text-2xl font-semibold text-cream">{selectedService.deposit}</p>
                </div>
              ) : null}
            </div>

            <label className="mt-6 block">
              <span className="mb-3 block text-sm font-semibold text-cream">Día</span>
              <span className="accent-border block rounded-2xl">
                <input
                  type="date"
                  min={getToday()}
                  className="w-full rounded-2xl border border-line bg-ink/80 px-4 py-4 text-cream outline-none transition focus:border-transparent"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </span>
            </label>

            <fieldset className="mt-6">
              <legend className="mb-3 text-sm font-semibold text-cream">Horario</legend>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {availableTimes.map((slot) => {
                  const active = slot === time;

                  return (
                    <button
                      key={slot}
                      type="button"
                      className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                        active
                          ? 'border-transparent bg-moss text-night shadow-glow'
                          : 'border-line bg-ink/70 text-cream hover:border-moss hover:text-moss'
                      }`}
                      onClick={() => setTime(slot)}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <a
              href={isComplete ? whatsappHref : '#servicios'}
              aria-disabled={!isComplete}
              className={`mt-8 flex w-full justify-center rounded-full px-6 py-4 text-sm font-bold uppercase tracking-widest transition ${
                isComplete
                  ? 'bg-accent text-night shadow-glow hover:-translate-y-0.5'
                  : 'cursor-not-allowed border border-line bg-ink/60 text-ash'
              }`}
              onClick={(event) => {
                if (!isComplete) event.preventDefault();
              }}
              target={isComplete ? '_blank' : undefined}
              rel={isComplete ? 'noreferrer' : undefined}
            >
              Enviar por WhatsApp
            </a>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
