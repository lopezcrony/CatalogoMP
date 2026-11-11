import { useMemo, useState } from 'react';
import type { AdminBrand } from '../hooks/useAdminCatalogData';
import { Icon } from '../../../components/Icon';

interface Props {
  brands: AdminBrand[];
  onCreate: (input: { nombre: string }) => Promise<void>;
  onUpdate: (id: string, input: { nombre: string }) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}

export function AdminBrandsManager({ brands, onCreate, onUpdate, onRemove }: Props) {
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState<'create' | AdminBrand | null>(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const visibleBrands = useMemo(() => brands.filter((brand) => brand.nombre.toLowerCase().includes(query.trim().toLowerCase())), [brands, query]);
  const openCreate = () => { setName(''); setModal('create'); setMessage(null); };
  const openEdit = (brand: AdminBrand) => { setName(brand.nombre); setModal(brand); setMessage(null); };
  const save = async () => {
    if (!name.trim()) return setMessage('El nombre de la marca es obligatorio.');
    setBusy(true); setMessage(null);
    try { if (modal === 'create') await onCreate({ nombre: name.trim() }); else if (modal) await onUpdate(modal.id, { nombre: name.trim() }); setModal(null); setName(''); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'No se pudo guardar la marca.'); }
    finally { setBusy(false); }
  };
  const remove = async (brand: AdminBrand) => {
    if (!window.confirm(`¿Eliminar la marca ${brand.nombre}? Solo es posible si no está asociada a motos.`)) return;
    setBusy(true); setMessage(null);
    try { await onRemove(brand.id); } catch (error) { setMessage(error instanceof Error ? error.message : 'No se pudo eliminar la marca.'); } finally { setBusy(false); }
  };
  return <section className="flex flex-col gap-5">
    <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-surface-container-high bg-surface-container p-4"><p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Marcas registradas</p><p className="mt-2 font-headline-lg text-on-surface">{brands.length}</p></div><div className="flex items-center justify-between rounded-2xl border border-surface-container-high bg-surface-container p-4 sm:col-span-2"><div className="relative flex-1"><Icon name="search" size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar marca..." className="h-10 w-full rounded-lg border border-outline-variant bg-surface-container-lowest pl-9 pr-3 text-sm text-on-surface outline-none focus:border-primary" /></div><button type="button" onClick={openCreate} className="ml-3 flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-on-primary"><Icon name="plus" size={17} /> Nueva</button></div></div>
    {message && <p className="rounded-xl border border-error/30 bg-error-container/30 px-4 py-3 text-sm text-error">{message}</p>}
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{visibleBrands.map((brand) => <article key={brand.id} className="flex items-center justify-between rounded-2xl border border-surface-container-high bg-surface-container p-4"><div className="min-w-0"><div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon name="store" size={18} /></span><div><h3 className="truncate font-semibold text-on-surface">{brand.nombre}</h3><p className="text-xs text-on-surface-variant">Marca del catálogo</p></div></div></div><div className="ml-3 flex gap-1"><button type="button" onClick={() => openEdit(brand)} className="rounded-lg p-2 text-primary hover:bg-primary/10" aria-label="Editar"><Icon name="pencil" size={17} /></button><button type="button" disabled={busy} onClick={() => void remove(brand)} className="rounded-lg p-2 text-error hover:bg-error/10" aria-label="Eliminar"><Icon name="delete" size={17} /></button></div></article>)}{visibleBrands.length === 0 && <p className="rounded-xl border border-dashed border-outline-variant p-8 text-center text-on-surface-variant sm:col-span-2 lg:col-span-3">{brands.length ? 'No encontramos marcas con esa búsqueda.' : 'No hay marcas registradas.'}</p>}</div>
    {modal && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-2xl border border-surface-container-high bg-surface p-6 shadow-2xl"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">Catálogo</p><h2 className="font-headline-sm text-on-surface">{modal === 'create' ? 'Nueva marca' : 'Editar marca'}</h2></div><button type="button" onClick={() => setModal(null)} className="text-on-surface-variant"><Icon name="close" size={20} /></button></div><label className="mt-5 flex flex-col gap-2"><span className="text-sm font-semibold text-on-surface-variant">Nombre de la marca *</span><input autoFocus value={name} onChange={(event) => setName(event.target.value)} className="h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 text-on-surface outline-none focus:border-primary" /></label><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setModal(null)} className="rounded-lg border border-outline px-4 py-2 text-sm text-on-surface">Cancelar</button><button type="button" disabled={busy} onClick={() => void save()} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary">{busy ? 'Guardando...' : 'Guardar'}</button></div></div></div>}
  </section>;
}
