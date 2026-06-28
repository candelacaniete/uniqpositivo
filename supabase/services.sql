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
  ('combo-renovacion', 'Combo Renovación', 'Color en raíces + nutrición post color de colágeno y vitaminas.', '$77.000', 77000, '$10.000', 10000, '120 min aprox.', 120, true),
  ('combo-brillo', 'Combo Brillo', 'Corte de cabello + lavado L''Oreal Professionel + nutrición de colágeno y karité.', '$47.000', 47000, null, null, '90 min aprox.', 90, true),
  ('combo-estrella', 'Combo Estrella', 'Corte + lavado + tratamiento personalizado para nutrición, hidratación y restauración capilar.', '$97.000', 97000, null, null, '120 min aprox.', 120, true),
  ('combo-amor-propio', 'Combo Amor Propio', 'Color raíz hasta 3 cm de crecimiento + corte + tratamiento personalizado de nutrición, hidratación y reparación.', '$159.000', 159000, null, null, '180 min aprox.', 180, true),
  ('retoque-raiz', 'Retoque de Raíz', 'Retoque de crecimiento en raíz para mantener el color prolijo, luminoso y cuidado.', '$62.000', 62000, null, null, '90 min aprox.', 90, true),
  ('corte-de-pelo', 'Corte de Pelo', 'Corte diseñado según textura, forma de uso, movimiento natural y estilo personal.', '$32.000', 32000, null, null, '60 min aprox.', 60, true),
  ('canas-diseno', '¿Canas? ¡Poneles diseño!', 'Servicio de color pensado para integrar, diseñar y transformar canas con intención estética.', '$95.000', 95000, null, null, '120 min aprox.', 120, true),
  ('balayage', 'Balayage', 'Diseño de iluminación artesanal para lograr profundidad, contraste suave y brillo natural.', '$185.000', 185000, null, null, '180 min aprox.', 180, true),
  ('rubios-arte-diseno', 'Rubios, llenos de arte diseño personalizado', 'Diseño personalizado de rubios con diagnóstico, técnica y cuidado de la fibra capilar.', '$185.000', 185000, null, null, '180 min aprox.', 180, true),
  ('browns-chocolates-almendras-french-balayage', 'Browns, chocolates, almendras, French balayage', 'Coloraciones cálidas y sofisticadas con dimensión, brillo y acabado natural.', '$185.000', 185000, null, null, '180 min aprox.', 180, true)
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
