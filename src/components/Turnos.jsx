import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const serviceOptions = ['Corte', 'Coloración', 'Tratamientos capilares', 'Peinados', 'Extensiones'];
const availableTimes = ['10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];

function getToday() {
  return new Date().toISOString().split('T')[0];
}

export default function Turnos() {
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const isComplete = Boolean(service && date && time);
  const whatsappHref = useMemo(() => {
    const text = `Hola! Quiero reservar un turno para ${service} el ${date} a las ${time}`;
    return `https://wa.me/541144045167?text=${encodeURIComponent(text)}`;
  }, [date, service, time]);

  return (
    <section id="turnos" className="section-shell bg-ink px-5 py-24 md:px-8">
      <div className="decor-butterfly -right-12 top-16" />
      <div className="turnos-grid mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-ash">Turnos</p>
          <h2 className="font-serif text-4xl font-bold text-cream md:text-6xl">Reservá tu turno</h2>
          <p className="mt-6 max-w-xl leading-8 text-ash">
            Elegí el servicio, la fecha y un horario disponible. La confirmación se abre directo en WhatsApp con tu mensaje listo.
          </p>
        </motion.div>

        <motion.form
          className="rounded-3xl border border-line bg-night p-5 shadow-soft-card md:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="block">
            <span className="mb-3 block text-sm font-semibold text-cream">Servicio</span>
            <span className="accent-border block rounded-2xl">
              <select
                className="w-full rounded-2xl border border-line bg-ink px-4 py-4 text-cream outline-none transition focus:border-transparent"
                value={service}
                onChange={(event) => setService(event.target.value)}
              >
                <option value="">Seleccioná un servicio</option>
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </span>
          </label>

          <label className="mt-6 block">
            <span className="mb-3 block text-sm font-semibold text-cream">Fecha</span>
            <span className="accent-border block rounded-2xl">
              <input
                type="date"
                min={getToday()}
                className="w-full rounded-2xl border border-line bg-ink px-4 py-4 text-cream outline-none transition focus:border-transparent"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </span>
          </label>

          <fieldset className="mt-6">
            <legend className="mb-3 text-sm font-semibold text-cream">Hora</legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {availableTimes.map((slot) => {
                const active = slot === time;

                return (
                  <button
                    key={slot}
                    type="button"
                    className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? 'border-transparent bg-accent text-white shadow-glow'
                        : 'border-line bg-ink text-cream/80 hover:border-cream/60 hover:text-cream'
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
            href={isComplete ? whatsappHref : '#turnos'}
            aria-disabled={!isComplete}
            className={`mt-8 flex w-full justify-center rounded-full px-6 py-4 text-sm font-bold uppercase tracking-widest transition ${
              isComplete
                ? 'bg-accent text-white shadow-glow hover:-translate-y-0.5'
                : 'cursor-not-allowed border border-line bg-ink text-ash'
            }`}
            onClick={(event) => {
              if (!isComplete) event.preventDefault();
            }}
            target={isComplete ? '_blank' : undefined}
            rel={isComplete ? 'noreferrer' : undefined}
          >
            Confirmar por WhatsApp
          </a>
        </motion.form>
      </div>
    </section>
  );
}
