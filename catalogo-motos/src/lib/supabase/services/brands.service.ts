import { supabase } from '../client';
import { throwIfSupabaseError } from '../errors';

export async function obtenerMarcas() {
  const { data, error } = await supabase.from('marcas').select('*').order('nombre');
  throwIfSupabaseError(error);
  return data;
}

export async function obtenerMarcaPorId(id: string) {
  const { data, error } = await supabase.from('marcas').select('*').eq('id', id).single();
  throwIfSupabaseError(error);
  return data;
}

export async function crearMarca(input: { nombre: string }) {
  const { data, error } = await supabase.from('marcas').insert(input).select().single();
  throwIfSupabaseError(error);
  return data;
}

export async function actualizarMarca(id: string, input: { nombre?: string }) {
  const { data, error } = await supabase.from('marcas').update(input).eq('id', id).select().single();
  throwIfSupabaseError(error);
  return data;
}

export async function eliminarMarca(id: string) {
  const { count, error: countError } = await supabase
    .from('motos')
    .select('id', { count: 'exact', head: true })
    .eq('marca_id', id);
  throwIfSupabaseError(countError);
  if ((count || 0) > 0) {
    throw new Error('No se puede eliminar la marca porque tiene motos asociadas.');
  }
  const { error } = await supabase.from('marcas').delete().eq('id', id);
  throwIfSupabaseError(error);
}
