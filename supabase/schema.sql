create table if not exists public.services (
  id text primary key,
  name text not null,
  description text not null,
  price_label text not null,
  price_amount integer not null,
  deposit_label text,
  deposit_amount integer,
  duration_label text not null,
  duration_minutes integer not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  service_id text not null references public.services(id),
  service_name text not null,
  service_price_label text not null,
  service_deposit_label text,
  client_name text not null,
  client_phone text not null,
  client_instagram text,
  reservation_date date not null,
  reservation_time text not null,
  status text not null default 'pending_deposit' check (status in ('pending_deposit', 'confirmed', 'cancelled', 'rescheduled')),
  deposit_status text not null default 'pending' check (deposit_status in ('not_required', 'pending', 'paid', 'failed')),
  deposit_amount integer,
  payment_reference text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.business_settings (
  id text primary key default 'main',
  deposit_alias text not null default 'xxx',
  working_days integer[] not null default array[2, 3, 4, 5, 6],
  time_slots text[] not null default array['10:00', '11:30', '13:00', '15:00', '16:30', '18:00'],
  updated_at timestamptz not null default now()
);

create unique index if not exists reservations_unique_active_slot
  on public.reservations (reservation_date, reservation_time)
  where status in ('pending_deposit', 'confirmed');

alter table public.services enable row level security;
alter table public.reservations enable row level security;
alter table public.business_settings enable row level security;

grant usage on schema public to anon, authenticated;
grant select on table public.services to anon, authenticated;
grant insert, select, update on table public.reservations to anon, authenticated;
grant insert, select, update on table public.business_settings to anon, authenticated;

create policy "Public can read active services"
  on public.services for select
  using (active = true);

create policy "Public can create reservations"
  on public.reservations for insert
  with check (true);

-- MVP policy: allows the frontend admin panel to read/update reservations using the anon key.
-- For production, replace this with Supabase Auth or Edge Functions before publishing private client data broadly.
create policy "MVP admin can read reservations"
  on public.reservations for select
  using (true);

create policy "MVP admin can update reservations"
  on public.reservations for update
  using (true)
  with check (true);

create policy "Public can read business settings"
  on public.business_settings for select
  using (true);

create policy "MVP admin can insert business settings"
  on public.business_settings for insert
  with check (true);

create policy "MVP admin can update business settings"
  on public.business_settings for update
  using (true)
  with check (true);
