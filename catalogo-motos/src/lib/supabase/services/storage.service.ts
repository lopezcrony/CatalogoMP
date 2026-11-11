import { supabase } from '../client';
import { throwIfSupabaseError } from '../errors';

const bucket = 'motos';

export async function subirArchivoStorage(path: string, file: File) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
  throwIfSupabaseError(error);
  return data;
}
export function obtenerUrlPublicaArchivo(path: string) {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
export async function eliminarArchivoStorage(paths: string[]) {
  const { error } = await supabase.storage.from(bucket).remove(paths);
  throwIfSupabaseError(error);
}
