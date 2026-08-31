alter table public.reservations
  add column if not exists client_email text not null default '',
  add column if not exists client_dni text not null default '';
