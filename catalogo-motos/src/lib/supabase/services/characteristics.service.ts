import { supabase } from '../client';
import { throwIfSupabaseError } from '../errors';

export async function crearCategoriaCaracteristica(input: { nombre: string; orden?: number }) {
  const { data, error } = await supabase.from('categorias_caracteristicas').insert(input).select().single();
  throwIfSupabaseError(error); return data;
}
export async function obtenerCategoriasCaracteristicas() {
  const { data, error } = await supabase.from('categorias_caracteristicas').select('*').order('orden');
  throwIfSupabaseError(error); return data;
}
export async function actualizarCategoriaCaracteristica(id: string, input: { nombre?: string; orden?: number }) {
  const { data, error } = await supabase.from('categorias_caracteristicas').update(input).eq('id', id).select().single();
  throwIfSupabaseError(error); return data;
}
export async function eliminarCategoriaCaracteristica(id: string) {
  const { error } = await supabase.from('categorias_caracteristicas').delete().eq('id', id);
  throwIfSupabaseError(error);
}
export async function crearCaracteristica(input: { categoria_id: string; nombre: string; unidad?: string | null; tipo_dato: string }) {
  const { data, error } = await supabase.from('caracteristicas').insert(input).select().single();
  throwIfSupabaseError(error); return data;
}
export async function obtenerCaracteristicas() {
  const { data, error } = await supabase.from('caracteristicas').select('*').eq('activa', true).order('nombre');
  throwIfSupabaseError(error); return data;
}
export async function obtenerCaracteristicasPorCategoria(categoriaId: string) {
  const { data, error } = await supabase.from('caracteristicas').select('*').eq('categoria_id', categoriaId).eq('activa', true).order('nombre');
  throwIfSupabaseError(error); return data;
}
export async function actualizarCaracteristica(id: string, input: { nombre?: string; unidad?: string | null; tipo_dato?: string }) {
  const { data, error } = await supabase.from('caracteristicas').update(input).eq('id', id).select().single();
  throwIfSupabaseError(error); return data;
}
export async function desactivarCaracteristica(id: string) {
  const { data, error } = await supabase.from('caracteristicas').update({ activa: false }).eq('id', id).select().single();
  throwIfSupabaseError(error); return data;
}

export async function eliminarCaracteristica(id: string) {
  const { count, error: countError } = await supabase
    .from('moto_caracteristicas')
    .select('id', { count: 'exact', head: true })
    .eq('caracteristica_id', id);
  throwIfSupabaseError(countError);
  if ((count || 0) > 0) {
    throw new Error('No se puede eliminar la característica porque está asociada a una moto.');
  }
  const { error } = await supabase.from('caracteristicas').delete().eq('id', id);
  throwIfSupabaseError(error);
}
