import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';

/* TODO: reemplazar con datos reales de Google Reviews API */
const reviews = [
  {
    name: 'Camila R.',
    text: 'Me fui con el pelo sano, brillante y con una energía hermosa. El espacio se siente como entrar en otra dimensión.',
    photo: null,
  },
  {
    name: 'Sofía M.',
    text: 'El diagnóstico fue súper cuidado. Entendieron lo que quería y el resultado quedó elegante, natural y muy yo.',
    photo: null,
  },
  {
    name: 'Laura P.',
    text: 'La mezcla entre salón y galería es única. Cada detalle acompaña la experiencia desde que entrás.',
    photo: null,
  },
  {
    name: 'Valentina G.',
    text: 'Las extensiones quedaron invisibles y livianas. Salí con mucha confianza y una atención impecable.',
    photo: null,
  },
];

export default function Resenas() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true, skipSnaps: false });
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!emblaApi || isPaused) return undefined;

    const timer = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 3600);

    return () => window.clearInterval(timer);
  }, [emblaApi, isPaused]);

  return (
    <section id="resenas" className="section-shell bg-ink px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-ash">Reseñas</p>
          <h2 className="font-serif text-4xl font-bold text-cream md:text-6xl">Lo que dicen nuestras clientas</h2>
        </motion.div>

        <div
          className="overflow-hidden"
          ref={emblaRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="-ml-5 flex">
            {reviews.map((review) => (
              <div key={review.name} className="review-slide">
                <article className="h-full rounded-3xl border border-line bg-night p-6 shadow-soft-card md:p-8">
                  <div className="mb-6 flex items-center gap-4">
                    {/* TODO: reemplazar placeholder con foto real de perfil si existe */}
                    <div className="image-placeholder h-14 w-14 rounded-full" />
                    <div>
                      <h3 className="font-serif text-xl text-cream">{review.name}</h3>
                      <p className="accent-text text-sm tracking-widest">★★★★★</p>
                    </div>
                  </div>
                  <p className="leading-8 text-ash">“{review.text}”</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
