insert into public.services (
  id,
  name,
  description,
  price_label,
  price_amount,
  deposit_label,
  deposit_amount,
  duration_label,
  duration_minutes,
  active
) values
  ('combo-renovacion', 'Combo Renovación', 'Color en raíces (hasta 3 cm) + nutrición post color con colágeno y vitaminas para devolver suavidad y brillo después del servicio técnico.', '$77.000', 77000, '$10.000', 10000, '2 horas aprox.', 120, true),
  ('combo-brillo', 'Combo Brillo', 'Corte de cabello + lavado L''Oreal Professionel + nutrición de colágeno y karité.', '$47.000', 47000, null, null, '1 hora y media aprox.', 90, true),
  ('combo-estrella', 'Combo Estrella', 'Corte + lavado + tratamiento personalizado para nutrición, hidratación y restauración capilar.', '$97.000', 97000, null, null, '2 horas aprox.', 120, true),
  ('combo-amor-propio', 'Combo Amor Propio', 'Color raíz (hasta 3 cm de crecimiento) + corte + tratamiento personalizado de nutrición, hidratación y reparación para renovar imagen y fibra capilar.', '$159.000', 159000, null, null, '3 horas aprox.', 180, true),
  ('retoque-raiz', 'Retoque de Raíz (hasta 3 cm)', 'Retoque de crecimiento en raíz (hasta 3 cm) para mantener el color prolijo, luminoso y cuidado entre servicios completos.', '$62.000', 62000, null, null, '1 hora y media aprox.', 90, true),
  ('corte-de-pelo', 'Corte de Pelo', 'Corte diseñado según textura, forma de uso, movimiento natural y estilo personal para realzar la identidad de cada cabello.', '$32.000', 32000, null, null, '1 hora aprox.', 60, true),
  ('diseno-canas', 'Diseño de Canas', 'Servicio de color pensado para integrar, diseñar y transformar canas con intención estética, respetando el crecimiento y la personalidad del cabello.', 'Desde $95.000', 95000, null, null, '2 horas aprox.', 120, true),
  ('balayage', 'Balayage', 'Diseño de iluminación artesanal para lograr profundidad, contraste suave y brillo natural con un acabado personalizado.', '$185.000', 185000, null, null, '3 horas aprox.', 180, true),
  ('rubios-arte-diseno', 'Rubios, llenos de arte: diseño personalizado', 'Diseño personalizado de rubios con diagnóstico, técnica y cuidado de la fibra capilar para lograr un resultado luminoso y saludable.', '$185.000', 185000, null, null, '3 horas aprox.', 180, true),
  ('browns-chocolates-almendras-french-balayage', 'Browns, chocolates, almendras, French balayage', 'Coloraciones cálidas y sofisticadas con dimensión, brillo y acabado natural para tonos marrones, chocolates, almendrados y French balayage.', '$185.000', 185000, null, null, '3 horas aprox.', 180, true)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  price_label = excluded.price_label,
  price_amount = excluded.price_amount,
  deposit_label = excluded.deposit_label,
  deposit_amount = excluded.deposit_amount,
  duration_label = excluded.duration_label,
  duration_minutes = excluded.duration_minutes,
  active = excluded.active;
