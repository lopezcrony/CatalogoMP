import type { Database } from '../database.types';
import { supabase } from '../client';
import { throwIfSupabaseError } from '../errors';

type ColorInsert = Database['public']['Tables']['variantes_color']['Insert'];
type ColorUpdate = Database['public']['Tables']['variantes_color']['Update'];

export async function crearColor(input: ColorInsert) {
  const { data, error } = await supabase.from('variantes_color').insert(input).select().single();
  throwIfSupabaseError(error);
  return data;
}
export async function obtenerColoresMoto(motoId: string) {
  const { data, error } = await supabase.from('variantes_color').select('*').eq('moto_id', motoId).order('nombre_color');
  throwIfSupabaseError(error);
  return data;
}
export async function actualizarColor(id: string, input: ColorUpdate) {
  const { data, error } = await supabase.from('variantes_color').update(input).eq('id', id).select().single();
  throwIfSupabaseError(error);
  return data;
}
export async function cambiarEstadoColor(id: string, estado: Database['public']['Enums']['estado_variante']) {
  return actualizarColor(id, { estado });
}
export async function eliminarColor(id: string) {
  const { error } = await supabase.from('variantes_color').delete().eq('id', id);
  throwIfSupabaseError(error);
}
