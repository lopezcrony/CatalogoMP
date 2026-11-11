import { useCallback, useEffect, useState } from 'react';
import {
  actualizarCaracteristica,
  actualizarCategoriaCaracteristica,
  crearCaracteristica,
  crearCategoriaCaracteristica,
  eliminarCaracteristica,
  eliminarCategoriaCaracteristica,
  obtenerCaracteristicas,
  obtenerCategoriasCaracteristicas,
} from '../../../lib/supabase/services/characteristics.service';
import {
  actualizarMarca,
  crearMarca,
  eliminarMarca,
  obtenerMarcas,
} from '../../../lib/supabase/services/brands.service';

export type AdminCharacteristic = NonNullable<Awaited<ReturnType<typeof obtenerCaracteristicas>>>[number];
export type AdminCharacteristicCategory = NonNullable<Awaited<ReturnType<typeof obtenerCategoriasCaracteristicas>>>[number];
export type AdminBrand = NonNullable<Awaited<ReturnType<typeof obtenerMarcas>>>[number];

export function useAdminCatalogData() {
  const [brands, setBrands] = useState<AdminBrand[]>([]);
  const [categories, setCategories] = useState<AdminCharacteristicCategory[]>([]);
  const [characteristics, setCharacteristics] = useState<AdminCharacteristic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [nextBrands, nextCategories, nextCharacteristics] = await Promise.all([
        obtenerMarcas(),
        obtenerCategoriasCaracteristicas(),
        obtenerCaracteristicas(),
      ]);
      setBrands(nextBrands || []);
      setCategories(nextCategories || []);
      setCharacteristics(nextCharacteristics || []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar la configuración del catálogo.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]); // eslint-disable-line react-hooks/set-state-in-effect

  const createBrand = async (input: string | { nombre: string }) => {
    const normalized = typeof input === 'string' ? input.trim() : input.nombre.trim();
    if (!normalized) throw new Error('El nombre de la marca es obligatorio.');
    const created = await crearMarca({ nombre: normalized });
    await refresh();
    return created;
  };

  const updateBrand = async (id: string, input: string | { nombre: string }) => {
    const normalized = typeof input === 'string' ? input.trim() : input.nombre.trim();
    if (!normalized) throw new Error('El nombre de la marca es obligatorio.');
    await actualizarMarca(id, { nombre: normalized });
    await refresh();
  };

  const removeBrand = async (id: string) => { await eliminarMarca(id); await refresh(); };
  const createCategory = async (name: string) => {
    const normalized = name.trim();
    if (!normalized) throw new Error('El nombre de la categoría es obligatorio.');
    await crearCategoriaCaracteristica({ nombre: normalized, orden: categories.length + 1 });
    await refresh();
  };
  const updateCategory = async (id: string, name: string) => {
    const normalized = name.trim();
    if (!normalized) throw new Error('El nombre de la categoría es obligatorio.');
    await actualizarCategoriaCaracteristica(id, { nombre: normalized });
    await refresh();
  };
  const removeCategory = async (id: string) => { await eliminarCategoriaCaracteristica(id); await refresh(); };
  const createCharacteristic = async (input: { categoria_id: string; nombre: string; unidad: string | null; tipo_dato: string }) => {
    if (!input.nombre.trim() || !input.categoria_id) throw new Error('Categoría y nombre son obligatorios.');
    const created = await crearCaracteristica({ ...input, nombre: input.nombre.trim() });
    await refresh();
    return created;
  };
  const updateCharacteristic = async (id: string, input: { nombre?: string; unidad?: string | null; tipo_dato?: string }) => {
    if (input.nombre !== undefined && !input.nombre.trim()) throw new Error('El nombre es obligatorio.');
    await actualizarCaracteristica(id, input);
    await refresh();
  };
  const removeCharacteristic = async (id: string) => { await eliminarCaracteristica(id); await refresh(); };

  return {
    brands, categories, characteristics, isLoading, error, refresh,
    createBrand, updateBrand, removeBrand,
    createCategory, updateCategory, removeCategory,
    createCharacteristic, updateCharacteristic, removeCharacteristic,
  };
}
