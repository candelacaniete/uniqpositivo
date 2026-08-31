create table if not exists public.business_settings (
  id text primary key default 'main',
  deposit_alias text not null default 'xxx',
  working_days integer[] not null default array[2, 3, 4, 5, 6],
  time_slots text[] not null default array['10:00', '11:30', '13:00', '15:00', '16:30', '18:00'],
  updated_at timestamptz not null default now()
);

alter table public.business_settings enable row level security;

grant usage on schema public to anon, authenticated;
grant insert, select, update on table public.business_settings to anon, authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'business_settings' and policyname = 'Public can read business settings'
  ) then
    create policy "Public can read business settings"
      on public.business_settings for select
      using (true);
  end if;

  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'business_settings' and policyname = 'MVP admin can insert business settings'
  ) then
    create policy "MVP admin can insert business settings"
      on public.business_settings for insert
      with check (true);
  end if;

  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'business_settings' and policyname = 'MVP admin can update business settings'
  ) then
    create policy "MVP admin can update business settings"
      on public.business_settings for update
      using (true)
      with check (true);
  end if;
end $$;

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
