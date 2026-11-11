import { supabase } from '../client';
import { requireSupabaseData, throwIfSupabaseError } from '../errors';

export async function obtenerImagenesMoto(motoId: string) {
  const { data, error } = await supabase.from('imagenes_moto').select('*').eq('moto_id', motoId).order('orden');
  throwIfSupabaseError(error);
  return data;
}
export async function subirImagen(motoId: string, file: File) {
  const currentImages = requireSupabaseData(await obtenerImagenesMoto(motoId), 'No se pudieron consultar las imágenes.');
  if (currentImages.length >= 6) {
    throw new Error('Una moto no puede tener más de 6 imágenes.');
  }
  const path = `${motoId}/${crypto.randomUUID()}-${file.name}`;
  const { data: uploadedData, error: uploadError } = await supabase.storage.from('motos').upload(path, file, { upsert: false });
  throwIfSupabaseError(uploadError);
  const uploaded = requireSupabaseData(uploadedData, 'No se pudo subir la imagen.');
  const url = supabase.storage.from('motos').getPublicUrl(uploaded.path).data.publicUrl;
  const { data, error } = await supabase.from('imagenes_moto').insert({
    moto_id: motoId, url_imagen: url, orden: currentImages.length, es_principal: currentImages.length === 0,
  }).select().single();
  throwIfSupabaseError(error);
  return data;
}
export async function establecerImagenPrincipal(id: string, motoId: string) {
  const { error: clearError } = await supabase.from('imagenes_moto').update({ es_principal: false }).eq('moto_id', motoId);
  throwIfSupabaseError(clearError);
  const { data, error } = await supabase.from('imagenes_moto').update({ es_principal: true }).eq('id', id).select().single();
  throwIfSupabaseError(error);
  return data;
}
export async function actualizarOrdenImagenes(images: Array<{ id: string; orden: number }>) {
  for (const image of images) {
    const { error } = await supabase.from('imagenes_moto').update({ orden: image.orden }).eq('id', image.id);
    throwIfSupabaseError(error);
  }
}
export async function eliminarImagen(id: string) {
  const { error } = await supabase.from('imagenes_moto').delete().eq('id', id);
  throwIfSupabaseError(error);
}
