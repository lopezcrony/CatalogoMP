import { useMemo, useState } from 'react';
import type { AdminCharacteristic, AdminCharacteristicCategory } from '../hooks/useAdminCatalogData';
import { Icon } from '../../../components/Icon';

interface Props {
  categories: AdminCharacteristicCategory[];
  characteristics: AdminCharacteristic[];
  onCreateCategory: (name: string) => Promise<void>;
  onUpdateCategory: (id: string, name: string) => Promise<void>;
  onRemoveCategory: (id: string) => Promise<void>;
  onCreate: (input: { categoria_id: string; nombre: string; unidad: string | null; tipo_dato: string }) => Promise<void>;
  onUpdate: (id: string, input: { nombre?: string; unidad?: string | null; tipo_dato?: string }) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}

type ModalState =
  | { kind: 'category'; item?: AdminCharacteristicCategory }
  | { kind: 'characteristic'; item?: AdminCharacteristic; keepOpen?: boolean }
  | null;

export function AdminCharacteristicsManager({
  categories,
  characteristics,
  onCreateCategory,
  onUpdateCategory,
  onRemoveCategory,
  onCreate,
  onUpdate,
  onRemove,
}: Props) {
  const [modal, setModal] = useState<ModalState>(null);
  const [categoryName, setCategoryName] = useState('');
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [type, setType] = useState('text');
  const [categoryId, setCategoryId] = useState('');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const grouped = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return categories.map((category) => ({
      category,
      items: characteristics.filter(
        (item) =>
          item.categoria_id === category.id &&
          (!normalizedQuery || item.nombre.toLowerCase().includes(normalizedQuery)),
      ),
    }));
  }, [categories, characteristics, query]);

  const openCategory = (item?: AdminCharacteristicCategory) => {
    setModal({ kind: 'category', item });
    setCategoryName(item?.nombre || '');
    setMessage(null);
  };

  const openCharacteristic = (item?: AdminCharacteristic, preferredCategoryId?: string) => {
    setModal({ kind: 'characteristic', item });
    setName(item?.nombre || '');
    setUnit(item?.unidad || '');
    setType(item?.tipo_dato || 'text');
    setCategoryId(item?.categoria_id || preferredCategoryId || categories[0]?.id || '');
    setMessage(null);
  };

  const close = () => {
    setModal(null);
    setMessage(null);
  };

  const resetCharacteristicForm = () => {
    setName('');
    setUnit('');
    setType('text');
    setMessage(null);
  };

  const save = async (keepOpen = false) => {
    setBusy(true);
    setMessage(null);
    try {
      if (modal?.kind === 'category') {
        if (!categoryName.trim()) throw new Error('El nombre de la categoría es obligatorio.');
        if (modal.item) await onUpdateCategory(modal.item.id, categoryName);
        else await onCreateCategory(categoryName);
        close();
        return;
      }

      if (!name.trim() || !categoryId) throw new Error('Categoría y nombre son obligatorios.');
      if (modal?.item) {
        await onUpdate(modal.item.id, { nombre: name, unidad: unit || null, tipo_dato: type });
        close();
      } else {
        await onCreate({ categoria_id: categoryId, nombre: name, unidad: unit || null, tipo_dato: type });
        if (keepOpen) {
          resetCharacteristicForm();
          setModal({ kind: 'characteristic', keepOpen: true });
        } else {
          close();
        }
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo guardar.');
    } finally {
      setBusy(false);
    }
  };

  const removeCategory = async (category: AdminCharacteristicCategory) => {
    if (!window.confirm(`¿Eliminar la categoría ${category.nombre}?`)) return;
    try {
      await onRemoveCategory(category.id);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo eliminar la categoría.');
    }
  };

  const removeCharacteristic = async (item: AdminCharacteristic) => {
    if (!window.confirm(`¿Eliminar la característica ${item.nombre}?`)) return;
    try {
      await onRemove(item.id);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo eliminar la característica.');
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-surface-container-high bg-surface-container p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Catálogo técnico</p>
          <p className="mt-1 text-sm text-on-surface-variant">{categories.length} categorías · {characteristics.length} características</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar característica..." className="h-10 rounded-lg border border-outline-variant bg-surface-container-lowest pl-9 pr-3 text-sm text-on-surface outline-none focus:border-primary" />
          </div>
          <button type="button" onClick={() => openCategory()} className="flex items-center justify-center gap-2 rounded-lg border border-primary px-3 py-2 text-sm font-bold text-primary">
            <Icon name="plus" size={16} /> Categoría
          </button>
          <button type="button" onClick={() => openCharacteristic()} className="flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-bold text-on-primary">
            <Icon name="plus" size={16} /> Característica
          </button>
        </div>
      </div>

      {message && <p className="rounded-xl border border-error/30 bg-error-container/30 px-4 py-3 text-sm text-error">{message}</p>}

      <div className="grid gap-4 lg:grid-cols-2">
        {grouped.map(({ category, items }) => (
          <section key={category.id} className="rounded-2xl border border-surface-container-high bg-surface-container p-5">
            <header className="flex items-center justify-between gap-3 border-b border-surface-container-high pb-3">
              <div>
                <h2 className="font-headline-sm text-on-surface">{category.nombre}</h2>
                <p className="text-xs text-on-surface-variant">{items.length} características</p>
              </div>
              <div className="flex gap-1">
                <button type="button" onClick={() => openCharacteristic(undefined, category.id)} className="rounded-lg p-2 text-primary hover:bg-primary/10" title="Agregar característica">
                  <Icon name="plus" size={16} />
                </button>
                <button type="button" onClick={() => openCategory(category)} className="rounded-lg p-2 text-primary hover:bg-primary/10" title="Editar categoría">
                  <Icon name="pencil" size={16} />
                </button>
                <button type="button" onClick={() => void removeCategory(category)} className="rounded-lg p-2 text-error hover:bg-error/10" title="Eliminar categoría">
                  <Icon name="delete" size={16} />
                </button>
              </div>
            </header>
            <div className="mt-3 space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl bg-surface-container-low p-3">
                  <div>
                    <p className="font-semibold text-on-surface">{item.nombre}</p>
                    <p className="text-xs text-on-surface-variant">{item.unidad || 'Sin unidad'} · {item.tipo_dato}</p>
                  </div>
                  <div className="flex gap-1">
                    <button type="button" onClick={() => openCharacteristic(item)} className="rounded-lg p-2 text-primary" title="Editar característica"><Icon name="pencil" size={16} /></button>
                    <button type="button" onClick={() => void removeCharacteristic(item)} className="rounded-lg p-2 text-error" title="Eliminar característica"><Icon name="delete" size={16} /></button>
                  </div>
                </div>
              ))}
              {items.length === 0 && <p className="py-5 text-center text-sm text-on-surface-variant">Sin características en esta categoría.</p>}
            </div>
          </section>
        ))}
        {categories.length === 0 && <p className="rounded-xl border border-dashed border-outline-variant p-8 text-center text-on-surface-variant lg:col-span-2">No hay categorías registradas.</p>}
      </div>

      {modal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg rounded-2xl border border-surface-container-high bg-surface p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">Catálogo técnico</p>
                <h2 className="font-headline-sm text-on-surface">
                  {modal.kind === 'category' ? (modal.item ? 'Editar categoría' : 'Nueva categoría') : (modal.item ? 'Editar característica' : 'Nueva característica')}
                </h2>
              </div>
              <button type="button" onClick={close} className="text-on-surface-variant"><Icon name="close" size={20} /></button>
            </div>

            {modal.kind === 'category' ? (
              <label className="mt-5 flex flex-col gap-2">
                <span className="text-sm font-semibold text-on-surface-variant">Nombre</span>
                <input autoFocus value={categoryName} onChange={(event) => setCategoryName(event.target.value)} className="h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 text-on-surface outline-none focus:border-primary" />
              </label>
            ) : (
              <div className="mt-5 space-y-3">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-on-surface-variant">Categoría</span>
                  <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)} className="h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 text-on-surface outline-none focus:border-primary">
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => <option key={category.id} value={category.id}>{category.nombre}</option>)}
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-on-surface-variant">Nombre</span>
                  <input autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="Ej. Cilindraje" className="h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 text-on-surface outline-none focus:border-primary" />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-on-surface-variant">Unidad (opcional)</span>
                    <input value={unit} onChange={(event) => setUnit(event.target.value)} placeholder="Ej. cc" className="h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 text-on-surface outline-none focus:border-primary" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-on-surface-variant">Tipo de dato</span>
                    <select value={type} onChange={(event) => setType(event.target.value)} className="h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 text-on-surface outline-none focus:border-primary">
                      <option value="text">Texto</option>
                      <option value="number">Número</option>
                      <option value="boolean">Sí / No</option>
                    </select>
                  </label>
                </div>
              </div>
            )}

            {message && <p className="mt-4 rounded-lg bg-error-container/30 px-3 py-2 text-sm text-error">{message}</p>}
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={close} className="rounded-lg border border-outline px-4 py-2 text-sm font-semibold text-on-surface-variant">Cancelar</button>
              {modal.kind === 'characteristic' && !modal.item && (
                <button type="button" disabled={busy} onClick={() => void save(true)} className="rounded-lg border border-primary px-4 py-2 text-sm font-bold text-primary disabled:opacity-50">
                  Guardar y crear otra
                </button>
              )}
              <button type="button" disabled={busy} onClick={() => void save()} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary disabled:opacity-50">
                {busy ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
