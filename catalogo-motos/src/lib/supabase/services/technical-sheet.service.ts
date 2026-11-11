import { supabase } from '../client';
import { throwIfSupabaseError } from '../errors';

export async function agregarCaracteristicaMoto(input: { moto_id: string; caracteristica_id: string; valor: string }) {
  const { data, error } = await supabase.from('moto_caracteristicas').insert(input).select().single();
  throwIfSupabaseError(error); return data;
}
export async function obtenerFichaTecnica(motoId: string) {
  const { data, error } = await supabase.from('moto_caracteristicas').select('*, caracteristicas(*)').eq('moto_id', motoId);
  throwIfSupabaseError(error); return data;
}
export async function actualizarValorCaracteristica(id: string, valor: string) {
  const { data, error } = await supabase.from('moto_caracteristicas').update({ valor }).eq('id', id).select().single();
  throwIfSupabaseError(error); return data;
}
export async function eliminarCaracteristicaMoto(id: string) {
  const { error } = await supabase.from('moto_caracteristicas').delete().eq('id', id);
  throwIfSupabaseError(error);
}

export async function reemplazarFichaTecnica(
  motoId: string,
  values: Array<{ caracteristica_id: string; valor: string }>
) {
  const { error: deleteError } = await supabase
    .from('moto_caracteristicas')
    .delete()
    .eq('moto_id', motoId);
  throwIfSupabaseError(deleteError);

  if (values.length === 0) return [];

  const { data, error } = await supabase
    .from('moto_caracteristicas')
    .insert(values.map((value) => ({ moto_id: motoId, ...value })))
    .select();
  throwIfSupabaseError(error);
  return data;
}
