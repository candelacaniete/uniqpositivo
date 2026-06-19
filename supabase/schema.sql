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

create unique index if not exists reservations_unique_active_slot
  on public.reservations (reservation_date, reservation_time)
  where status in ('pending_deposit', 'confirmed');

alter table public.services enable row level security;
alter table public.reservations enable row level security;

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
