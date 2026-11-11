alter table public.motos
  add column if not exists precio_sin_papeles numeric(14, 2),
  add column if not exists precio_con_papeles numeric(14, 2);

create index if not exists idx_motos_marca_id
  on public.motos (marca_id);

create index if not exists idx_moto_caracteristicas_caracteristica_id
  on public.moto_caracteristicas (caracteristica_id);
