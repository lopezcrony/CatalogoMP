import type { Database } from '../database.types';
import { supabase } from '../client';
import { throwIfSupabaseError } from '../errors';

export async function obtenerMotosPendientesRevision() {
  const { data, error } = await supabase.from('motos').select('*, marcas(*)').eq('requiere_revision', true).eq('estado_revision', 'pendiente').order('fecha_proxima_revision');
  throwIfSupabaseError(error); return data;
}
export async function obtenerRevisionesVencidas() {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase.from('motos').select('*, marcas(*)').lt('fecha_proxima_revision', today).neq('estado_revision', 'revisada').order('fecha_proxima_revision');
  throwIfSupabaseError(error); return data;
}
export async function programarRevision(id: string, fechaProximaRevision: string) {
  const { data, error } = await supabase.from('motos').update({
    fecha_proxima_revision: fechaProximaRevision,
    estado_revision: 'pendiente' satisfies Database['public']['Enums']['estado_revision'],
    requiere_revision: true,
  }).eq('id', id).select().single();
  throwIfSupabaseError(error); return data;
}
export async function marcarRevisionCompletada(id: string, fechaUltimaRevision = new Date().toISOString().slice(0, 10)) {
  const { data, error } = await supabase.from('motos').update({
    fecha_ultima_revision: fechaUltimaRevision,
    estado_revision: 'revisada',
    requiere_revision: false,
  }).eq('id', id).select().single();
  throwIfSupabaseError(error); return data;
}
