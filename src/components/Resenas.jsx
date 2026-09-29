import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'Romina Ferro',
    text: 'Nata es una genia, siempre atenta y súper amable, su calidez hace que quieras volver. La tiene clarísima con todo, nutrición, color, corte, todo! Me salvó el pelo de lo maltratado que estaba y además, me hizo darme cuenta del pelazo que tenía con un corte específico para mis rulos. Mis hijas y yo la cambiamos por nada. Súper recomiendo!',
  },
  {
    name: 'Stella Estevez',
    text: 'Amo a Uniq positivo y a Nata, la buena onda que tiene ella, lo lindo que es local lleno de Arte me gustó mucho la artista Jimena Vazquez. Dato de color aman los animales siempre tienen potes de agua para darles. El pelo...divino tengo un rubio soñado me lo recuperó completo, ir a Uniq es mi mejor inversión.',
  },
  {
    name: 'Maria Alejandra Lopez Ruiz',
    text: 'Fui por un corte de puntas, queriendo mantener mi largo y por asesoramiento porque no tenía idea que tipo de pelo tenía, que corte me quedaba mejor, quería comprar buenos productos para cuidar mi pelo y me atendió Nata, súper buena onda y predisposición.',
  },
  {
    name: 'Guadalupe Fernandez Porto',
    text: 'Llegué por recomendación. Nata me recupero el cabello de mucho color mal hecho. Desde entonces voy todos los meses, no conozco otra peluquera que se tome el tiempo que ella se toma para conocerte, explicarte que es lo mejor para vos e interprete lo que uno busca. Gracias Nata y Zaira por atenderme siempre tan bien!!',
  },
  {
    name: 'Melisa Lecchi',
    text: 'Fui por 1 era vez a atenderme por recomendación con excelentes comentarios y amé no solo la calidad humana y el amor con que Nata y las chicas te reciben, sino también el asesoramiento y profesionalismo que hay en el salón. Me fui feliz y con un color que hacía años no lograba tener. Gracias por amar lo que hacen y por trasmitirlo con tanto cariño.',
  },
  {
    name: 'Daiana Vecchi',
    text: 'Excelente! Un espacio hermoso! Hace 10 años mi cabello esta en las manos de Nata, con ella aprendí a sanarlo y a cuidarlo, no mas alisados, no mas productos que lo dañan. Logramos un pelazo!!! Zai y sus masajes cuando te lava el pelo es un 10!!! Son los más chicas!',
  },
  {
    name: 'Guzman Mariana',
    text: 'Hace al menos 10 años que me atiendo con Nati. Fue la única que pudo lograr que pueda disfrutar de mi pelo, sentirlo sano, controlado. Te adoro Nati, no te cambio por nada!!',
  },
];

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

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
          <p className="mb-4 text-sm uppercase tracking-widest text-ash">Referencias</p>
          <h2 className="editorial-section-title">Lo que dicen nuestras clientas</h2>
          <p className="mx-auto mt-6 inline-flex border border-line bg-night px-4 py-2 text-xs font-bold uppercase tracking-widest text-ash">
            referencia de Google · ★★★★★
          </p>
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
                <article className="h-full border border-line bg-night p-6 md:p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-ink font-serif text-lg font-semibold text-cream">
                      {getInitials(review.name)}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-cream">{review.name}</h3>
                      <p className="mt-1 inline-flex border border-line px-2 py-1 text-[0.62rem] font-bold uppercase tracking-widest text-ash">
                        referencia de Google · ★★★★★
                      </p>
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
