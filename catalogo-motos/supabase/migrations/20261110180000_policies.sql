-- Policies for the public catalog, administrator operations, and the motos bucket.
-- Run this file in Supabase SQL Editor after confirming the enum values.

create or replace function public.es_administrador()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.perfiles
    where id = auth.uid()
      and rol = 'admin'
  );
$$;

revoke all on function public.es_administrador() from public;
grant execute on function public.es_administrador() to authenticated;

create policy "catalog_read_marcas"
on public.marcas for select
to anon, authenticated
using (true);

create policy "catalog_read_motos"
on public.motos for select
to anon, authenticated
using (estado <> 'inactiva');

create policy "admin_manage_motos"
on public.motos for all
to authenticated
using (public.es_administrador())
with check (public.es_administrador());

create policy "catalog_read_colors"
on public.variantes_color for select
to anon, authenticated
using (exists (
  select 1 from public.motos
  where motos.id = variantes_color.moto_id
    and motos.estado <> 'inactiva'
));

create policy "admin_manage_colors"
on public.variantes_color for all
to authenticated
using (public.es_administrador())
with check (public.es_administrador());

create policy "catalog_read_images"
on public.imagenes_moto for select
to anon, authenticated
using (exists (
  select 1 from public.motos
  where motos.id = imagenes_moto.moto_id
    and motos.estado <> 'inactiva'
));

create policy "admin_manage_images"
on public.imagenes_moto for all
to authenticated
using (public.es_administrador())
with check (public.es_administrador());

create policy "catalog_read_categories"
on public.categorias_caracteristicas for select
to anon, authenticated
using (true);

create policy "admin_manage_categories"
on public.categorias_caracteristicas for all
to authenticated
using (public.es_administrador())
with check (public.es_administrador());

create policy "catalog_read_characteristics"
on public.caracteristicas for select
to anon, authenticated
using (activa = true);

create policy "admin_manage_characteristics"
on public.caracteristicas for all
to authenticated
using (public.es_administrador())
with check (public.es_administrador());

create policy "catalog_read_motorcycle_characteristics"
on public.moto_caracteristicas for select
to anon, authenticated
using (exists (
  select 1 from public.motos
  where motos.id = moto_caracteristicas.moto_id
    and motos.estado <> 'inactiva'
));

create policy "admin_manage_motorcycle_characteristics"
on public.moto_caracteristicas for all
to authenticated
using (public.es_administrador())
with check (public.es_administrador());

create policy "admin_read_profiles"
on public.perfiles for select
to authenticated
using (id = auth.uid() or public.es_administrador());

create policy "storage_public_read_motos"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'motos');

create policy "storage_admin_insert_motos"
on storage.objects for insert
to authenticated
with check (bucket_id = 'motos' and public.es_administrador());

create policy "storage_admin_update_motos"
on storage.objects for update
to authenticated
using (bucket_id = 'motos' and public.es_administrador())
with check (bucket_id = 'motos' and public.es_administrador());

create policy "storage_admin_delete_motos"
on storage.objects for delete
to authenticated
using (bucket_id = 'motos' and public.es_administrador());
