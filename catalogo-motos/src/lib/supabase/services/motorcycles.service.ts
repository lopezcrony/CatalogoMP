import type { Database } from '../database.types';
import { supabase } from '../client';
import { throwIfSupabaseError } from '../errors';

type MotorcycleInsert = Database['public']['Tables']['motos']['Insert'];
type MotorcycleUpdate = Database['public']['Tables']['motos']['Update'];

export async function obtenerMotos() {
  const { data, error } = await supabase.from('motos').select('*, marcas(*), variantes_color(*), imagenes_moto(*), moto_caracteristicas(*, caracteristicas(*, categorias_caracteristicas(*)))').order('fecha_actualizacion', { ascending: false });
  throwIfSupabaseError(error);
  return data;
}

export async function obtenerMotoPorId(id: string) {
  const { data, error } = await supabase.from('motos').select('*, marcas(*), variantes_color(*), imagenes_moto(*)').eq('id', id).single();
  throwIfSupabaseError(error);
  return data;
}

export async function crearMoto(input: MotorcycleInsert) {
  const { data, error } = await supabase.from('motos').insert(input).select().single();
  throwIfSupabaseError(error);
  return data;
}

export async function actualizarMoto(id: string, input: MotorcycleUpdate) {
  const { data, error } = await supabase.from('motos').update(input).eq('id', id).select().single();
  throwIfSupabaseError(error);
  return data;
}

export async function eliminarMoto(id: string) {
  const { error } = await supabase.from('motos').delete().eq('id', id);
  throwIfSupabaseError(error);
}

export async function cambiarEstadoMoto(id: string, estado: Database['public']['Enums']['estado_moto']) {
  return actualizarMoto(id, { estado });
}

export async function obtenerMotosDisponibles() { return obtenerMotosPorEstado('disponible'); }
export async function obtenerMotosAgotadas() { return obtenerMotosPorEstado('agotada'); }
export async function obtenerMotosEnEspera() { return obtenerMotosPorEstado('en_espera'); }
export async function obtenerMotosEnRevision() { return obtenerMotosPorEstado('revision'); }

async function obtenerMotosPorEstado(estado: Database['public']['Enums']['estado_moto']) {
  const { data, error } = await supabase.from('motos').select('*, marcas(*)').eq('estado', estado).order('modelo');
  throwIfSupabaseError(error);
  return data;
}
