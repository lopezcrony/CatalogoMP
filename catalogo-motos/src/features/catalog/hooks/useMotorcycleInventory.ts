import { useCallback, useEffect, useState } from 'react';
import { Motorcycle } from '../../../types';
import { obtenerMotos } from '../../../lib/supabase/services/motorcycles.service';
import { obtenerMarcas } from '../../../lib/supabase/services/brands.service';
import { actualizarMoto, crearMoto, eliminarMoto } from '../../../lib/supabase/services/motorcycles.service';
import { reemplazarFichaTecnica } from '../../../lib/supabase/services/technical-sheet.service';
import { actualizarColor, crearColor, eliminarColor, obtenerColoresMoto } from '../../../lib/supabase/services/colors.service';
import { actualizarOrdenImagenes, eliminarImagen, establecerImagenPrincipal, obtenerImagenesMoto, subirImagen } from '../../../lib/supabase/services/images.service';
import { adaptSupabaseMotorcycle } from '../services/supabaseMotorcycleAdapter';
import type { BrandRecord } from '../services/catalogRepository';

export type InventorySourceStatus = 'loading' | 'remote' | 'empty' | 'error';
export interface MotorcycleWriteInput {
  marca_id: string; modelo: string; anio: number; descripcion: string;
  estado: 'disponible' | 'agotada' | 'en_espera' | 'revision' | 'inactiva';
  precio_sin_papeles: number | null; precio_con_papeles: number | null;
  fecha_ultima_revision: string | null; fecha_proxima_revision: string | null;
  estado_revision: 'pendiente' | 'revisada' | null; requiere_revision: boolean;
  ficha: Array<{ caracteristica_id: string; valor: string }>;
  colores: Array<{ id?: string; nombre_color: string; codigo_hex: string | null; estado: 'disponible' | 'agotada' | 'en_espera' | null }>;
  imagenesExistentes: Array<{ id: string; url?: string; orden: number; es_principal: boolean }>;
  imagenesNuevas: File[];
}

export const useMotorcycleInventory = () => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [sourceStatus, setSourceStatus] = useState<InventorySourceStatus>('loading');
  const [sourceError, setSourceError] = useState<string | null>(null);
  const [brands, setBrands] = useState<BrandRecord[]>([]);

  const refresh = useCallback(async () => {
    setSourceStatus('loading');
    try {
      const [remoteMotorcyclesResult, remoteBrandsResult] = await Promise.all([obtenerMotos(), obtenerMarcas()]);
      const remoteMotorcycles = remoteMotorcyclesResult ?? [];
      const remoteBrands = remoteBrandsResult ?? [];
      setBrands(remoteBrands.map((brand) => ({ id: brand.id, name: brand.nombre, createdAt: brand.fecha_creacion || undefined })));
      setMotorcycles(remoteMotorcycles.map((bike, index) => adaptSupabaseMotorcycle(bike, index)));
      setSourceStatus(remoteMotorcycles.length ? 'remote' : 'empty');
      setSourceError(null);
    } catch (error) {
      setSourceError(error instanceof Error ? error.message : 'No se pudo consultar el inventario remoto.');
      setSourceStatus('error');
    }
  }, []);

  useEffect(() => {
    void refresh(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [refresh]);

  const saveMotorcycle = async (input: MotorcycleWriteInput, remoteId?: string) => {
    const { ficha, colores, imagenesExistentes, imagenesNuevas, ...motorcycleInput } = input;
    const saved = remoteId ? await actualizarMoto(remoteId, motorcycleInput) : await crearMoto(motorcycleInput);
    await reemplazarFichaTecnica(saved.id, ficha.filter((item) => item.caracteristica_id && item.valor.trim()));
    const remoteColors = await obtenerColoresMoto(saved.id);
    const incomingColorIds = new Set(colores.filter((color) => color.id).map((color) => color.id));
    for (const color of remoteColors || []) {
      if (!incomingColorIds.has(color.id)) await eliminarColor(color.id);
    }
    for (const color of colores) {
      if (!color.nombre_color.trim()) continue;
      if (color.id) {
        await actualizarColor(color.id, { nombre_color: color.nombre_color.trim(), codigo_hex: color.codigo_hex, estado: color.estado });
      } else {
        await crearColor({ moto_id: saved.id, nombre_color: color.nombre_color.trim(), codigo_hex: color.codigo_hex, estado: color.estado });
      }
    }
    const remoteImages = await obtenerImagenesMoto(saved.id);
    const incomingImageIds = new Set(imagenesExistentes.map((image) => image.id));
    for (const image of remoteImages || []) {
      if (!incomingImageIds.has(image.id)) await eliminarImagen(image.id);
    }
    if (imagenesExistentes.length) {
      await actualizarOrdenImagenes(imagenesExistentes.map((image) => ({ id: image.id, orden: image.orden })));
      const primary = imagenesExistentes.find((image) => image.es_principal);
      if (primary) await establecerImagenPrincipal(primary.id, saved.id);
    }
    for (const file of imagenesNuevas) await subirImagen(saved.id, file);
    await refresh();
  };

  const deleteMotorcycle = async (remoteId: string) => {
    await eliminarMoto(remoteId);
    await refresh();
  };

  return {
    motorcycles,
    sourceStatus,
    sourceError,
    brands,
    saveMotorcycle,
    deleteMotorcycle,
    refresh,
  };
};
