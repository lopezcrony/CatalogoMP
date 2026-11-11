import { supabase } from '../client';
import { throwIfSupabaseError } from '../errors';

export async function obtenerCatalogo() {
  const { data, error } = await supabase.from('motos').select('*, marcas(*), variantes_color(*), imagenes_moto(*)')
    .neq('estado', 'inactiva').order('modelo');
  throwIfSupabaseError(error);
  return data;
}

export async function buscarMotos(query: string) {
  const { data, error } = await supabase.from('motos').select('*, marcas(*)')
    .neq('estado', 'inactiva').or(`modelo.ilike.%${query}%,descripcion.ilike.%${query}%`).order('modelo');
  throwIfSupabaseError(error);
  return data;
}

export async function filtrarPorMarca(marcaId: string) {
  const { data, error } = await supabase.from('motos').select('*, marcas(*)').neq('estado', 'inactiva').eq('marca_id', marcaId);
  throwIfSupabaseError(error);
  return data;
}

export async function filtrarPorEstado(estado: string) {
  const { data, error } = await supabase.from('motos').select('*, marcas(*)').neq('estado', 'inactiva').eq('estado', estado);
  throwIfSupabaseError(error);
  return data;
}

export async function filtrarPorAnio(anio: number) {
  const { data, error } = await supabase.from('motos').select('*, marcas(*)').neq('estado', 'inactiva').eq('anio', anio);
  throwIfSupabaseError(error);
  return data;
}

export async function obtenerDetalleMoto(id: string) {
  const { data, error } = await supabase.from('motos').select('*, marcas(*), variantes_color(*), imagenes_moto(*), moto_caracteristicas(*, caracteristicas(*))').eq('id', id).single();
  throwIfSupabaseError(error);
  return data;
}
