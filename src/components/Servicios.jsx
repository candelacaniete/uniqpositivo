import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { serviceCategories, services } from '../data/services.js';
import { createReservation, getBookedTimes } from '../lib/reservations.js';
import { defaultBusinessSettings, getBusinessSettings, isWorkingDay } from '../lib/settings.js';

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
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientInstagram, setClientInstagram] = useState('');
  const [bookedTimes, setBookedTimes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [reservation, setReservation] = useState(null);
  const [settings, setSettings] = useState(defaultBusinessSettings);

  const selectedDateIsWorkingDay = isWorkingDay(date, settings.workingDays);
  const isComplete = Boolean(selectedService && date && time && clientName && clientPhone && selectedDateIsWorkingDay);
  const whatsappHref = useMemo(() => {
    const depositText = selectedService.deposit ? ` Seña: ${selectedService.deposit}.` : '';
    const aliasText = selectedService.depositAmount ? ` Alias para seña: ${settings.depositAlias}.` : '';
    const text = `Hola! Reservé ${selectedService.name} el ${date} a las ${time}. Valor: ${selectedService.price}.${depositText}${aliasText} Duración aproximada: ${selectedService.duration}. Mi nombre es ${clientName}.`;
    return `https://wa.me/541144045167?text=${encodeURIComponent(text)}`;
  }, [clientName, date, selectedService, settings.depositAlias, time]);

  const SelectedIcon = selectedService.Icon;
  const filteredServices = useMemo(
    () => (activeCategory === 'Todos' ? services : services.filter((service) => service.category === activeCategory)),
    [activeCategory],
  );

  useEffect(() => {
    let ignore = false;
    getBusinessSettings().then((nextSettings) => {
      if (!ignore) setSettings(nextSettings);
    });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!date) {
      setBookedTimes([]);
      return undefined;
    }

    let ignore = false;
    getBookedTimes(date)
      .then((times) => {
        if (!ignore) setBookedTimes(times);
      })
      .catch(() => {
        if (!ignore) setFormMessage('No pudimos consultar disponibilidad. Intentá de nuevo.');
      });

    return () => {
      ignore = true;
    };
  }, [date]);

  const handleReservationSubmit = async (event) => {
    event.preventDefault();
    if (!isComplete || isSubmitting) return;

    setIsSubmitting(true);
    setFormMessage('');

    try {
      const createdReservation = await createReservation({
        service: selectedService,
        date,
        time,
        clientName,
        clientPhone,
        clientInstagram,
      });

      setReservation(createdReservation);
      setFormMessage(
        selectedService.depositAmount
          ? `Turno tomado. Para terminar de confirmar tu turno aboná la seña al alias: ${settings.depositAlias}.`
          : 'Turno confirmado y guardado.',
      );
      setBookedTimes((currentTimes) => [...new Set([...currentTimes, time])]);
    } catch (error) {
      setFormMessage(error.message || 'No pudimos guardar el turno. Intentá con otro horario.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="servicios" className="section-shell bg-night px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-ash">Servicios</p>
          <h2 className="editorial-section-title">Elegí tu combo y reservá</h2>
          <p className="mx-auto mt-6 max-w-2xl leading-8 text-ash">
            Cada combo abre una ficha de reserva con disponibilidad, datos de contacto, estado de seña y control interno de turnos.
          </p>
        </motion.div>

        <div className="services-booking-grid">
          <div className="grid gap-4">
            <div className="mb-2 flex flex-wrap justify-center gap-2 lg:justify-start">
              {serviceCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`border px-4 py-2 text-xs font-bold uppercase tracking-widest transition ${
                    activeCategory === category
                      ? 'border-cream bg-cream text-night'
                      : 'border-line bg-transparent text-ash hover:border-cream hover:text-cream'
                  }`}
                  onClick={() => {
                    setActiveCategory(category);
                    const nextServices = category === 'Todos' ? services : services.filter((service) => service.category === category);
                    if (!nextServices.some((service) => service.id === selectedService.id)) {
                      setSelectedService(nextServices[0] || services[0]);
                      setTime('');
                      setReservation(null);
                      setFormMessage('');
                    }
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

          {filteredServices.map((service, index) => {
            const { name, description, price, Icon } = service;

            return (
            <motion.article
              key={name}
              className={`cursor-pointer border p-5 transition md:p-6 ${
                selectedService.name === name ? 'border-cream bg-ink' : 'border-line bg-night'
              }`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              onClick={() => {
                setSelectedService(service);
                setTime('');
                setReservation(null);
                setFormMessage('');
              }}
            >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-line bg-ink text-ash">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-3xl font-semibold text-cream">{name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-ash">{description}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-widest text-cream">
                      <span>{price}</span>
                      {service.priceBadge ? (
                        <>
                          <span className="border border-line px-2 py-1 text-[0.62rem] text-ash">{service.priceBadge}</span>
                        </>
                      ) : null}
                      {service.deposit ? (
                        <>
                          <span className="text-ash">·</span>
                          <span>Seña {service.deposit}</span>
                        </>
                      ) : null}
                      <span className="text-ash">·</span>
                      <span>{service.duration}</span>
                    </div>
                  </div>
                </div>
            </motion.article>
            );
          })}
          </div>

          <motion.form
            className="border border-line bg-ink p-6 md:p-8"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleReservationSubmit}
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
                {selectedService.priceBadge ? (
                  <p className="mt-3 inline-flex border border-line px-2 py-1 text-xs font-bold uppercase tracking-widest text-ash">
                    {selectedService.priceBadge}
                  </p>
                ) : null}
              </div>
              <div className="rounded-3xl border border-line bg-ink/70 p-4">
                <p className="text-xs uppercase tracking-widest text-ash">Duración aprox.</p>
                <p className="mt-2 font-serif text-2xl font-semibold text-cream">{selectedService.duration}</p>
              </div>
              {selectedService.deposit ? (
                <div className="rounded-3xl border border-line bg-ink/70 p-4 sm:col-span-2">
                  <p className="text-xs uppercase tracking-widest text-ash">Seña</p>
                  <p className="mt-2 font-serif text-2xl font-semibold text-cream">{selectedService.deposit}</p>
                  <p className="mt-3 text-sm leading-6 text-ash">
                    Para terminar de confirmar tu turno aboná la seña al alias: <span className="font-semibold text-cream">{settings.depositAlias}</span>
                  </p>
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
                  onChange={(event) => {
                    setDate(event.target.value);
                    setTime('');
                    setReservation(null);
                    setFormMessage('');
                  }}
                />
              </span>
              {!selectedDateIsWorkingDay ? (
                <span className="mt-3 block text-sm text-ash">Ese día no está configurado como día laboral.</span>
              ) : null}
            </label>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-3 block text-sm font-semibold text-cream">Nombre</span>
                <input
                  className="w-full rounded-2xl border border-line bg-ink/80 px-4 py-4 text-cream outline-none transition focus:border-moss"
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  placeholder="Tu nombre"
                />
              </label>
              <label className="block">
                <span className="mb-3 block text-sm font-semibold text-cream">Teléfono</span>
                <input
                  className="w-full rounded-2xl border border-line bg-ink/80 px-4 py-4 text-cream outline-none transition focus:border-moss"
                  value={clientPhone}
                  onChange={(event) => setClientPhone(event.target.value)}
                  placeholder="+54 11..."
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-3 block text-sm font-semibold text-cream">Instagram opcional</span>
                <input
                  className="w-full rounded-2xl border border-line bg-ink/80 px-4 py-4 text-cream outline-none transition focus:border-moss"
                  value={clientInstagram}
                  onChange={(event) => setClientInstagram(event.target.value)}
                  placeholder="@usuario"
                />
              </label>
            </div>

            <fieldset className="mt-6">
              <legend className="mb-3 text-sm font-semibold text-cream">Horario</legend>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {settings.timeSlots.map((slot) => {
                  const active = slot === time;
                  const booked = bookedTimes.includes(slot);
                  const disabled = booked || !selectedDateIsWorkingDay;

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={disabled}
                      className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                        active
                          ? 'border-transparent bg-moss text-night shadow-glow'
                          : disabled
                            ? 'cursor-not-allowed border-line bg-line/40 text-ash line-through'
                            : 'border-line bg-ink/70 text-cream hover:border-moss hover:text-moss'
                      }`}
                      onClick={() => {
                        setTime(slot);
                        setReservation(null);
                        setFormMessage('');
                      }}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={!isComplete || isSubmitting}
              className={`mt-8 flex w-full justify-center rounded-full px-6 py-4 text-sm font-bold uppercase tracking-widest transition ${
                isComplete
                  ? 'bg-accent text-night shadow-glow hover:-translate-y-0.5'
                  : 'cursor-not-allowed border border-line bg-ink/60 text-ash'
              }`}
            >
              {isSubmitting ? 'Guardando...' : 'Reservar turno'}
            </button>

            {formMessage ? <p className="mt-4 rounded-2xl border border-line bg-ink/70 p-4 text-sm leading-6 text-ash">{formMessage}</p> : null}

            {reservation ? (
              <div className="mt-4 rounded-2xl border border-moss/40 bg-ink/70 p-4">
                <p className="text-sm font-semibold text-cream">Reserva #{reservation.id.slice(0, 8)}</p>
                <p className="mt-2 text-sm leading-6 text-ash">
                  Estado: {reservation.status === 'pending_deposit' ? 'pendiente de seña' : 'confirmada'} · Seña:{' '}
                  {reservation.depositStatus === 'pending' ? 'pendiente' : reservation.depositStatus}
                </p>
                <a
                  className="mt-4 inline-flex rounded-full border border-line px-5 py-3 text-xs font-bold uppercase tracking-widest text-cream transition hover:border-moss hover:text-moss"
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Avisar por WhatsApp
                </a>
              </div>
            ) : null}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
