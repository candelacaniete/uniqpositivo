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
  (
    'combo-renovacion',
    'Combo Renovación',
    'Color en raíces + nutrición post color de colágeno y vitaminas.',
    '$77.000',
    77000,
    '$10.000',
    10000,
    '120 min aprox.',
    120,
    true
  ),
  (
    'combo-brillo',
    'Combo Brillo',
    'Corte de cabello + lavado L''Oreal Professionel + nutrición de colágeno y karité.',
    '$47.000',
    47000,
    null,
    null,
    '90 min aprox.',
    90,
    true
  ),
  (
    'combo-estrella',
    'Combo Estrella',
    'Corte + lavado + tratamiento personalizado para nutrición, hidratación y restauración capilar.',
    '$97.000',
    97000,
    null,
    null,
    '120 min aprox.',
    120,
    true
  ),
  (
    'combo-amor-propio',
    'Combo Amor Propio',
    'Color raíz hasta 3 cm de crecimiento + corte + tratamiento personalizado de nutrición, hidratación y reparación.',
    '$159.000',
    159000,
    null,
    null,
    '180 min aprox.',
    180,
    true
  )
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

insert into public.business_settings (
  id,
  deposit_alias,
  working_days,
  time_slots
) values (
  'main',
  'xxx',
  array[2, 3, 4, 5, 6],
  array['10:00', '11:30', '13:00', '15:00', '16:30', '18:00']
)
on conflict (id) do nothing;
