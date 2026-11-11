import { useEffect, useMemo, useState } from 'react';
import type { AdminBrand, AdminCharacteristic, AdminCharacteristicCategory } from '../hooks/useAdminCatalogData';
import type { Motorcycle } from '../../../types';
import { Icon, type IconName } from '../../../components/Icon';

type ColorDraft = { id?: string; nombre_color: string; codigo_hex: string | null; estado: 'disponible' | 'agotada' | 'en_espera' | null };

export interface MotorcycleFormData {
  marca_id: string; modelo: string; anio: number; descripcion: string;
  estado: 'disponible' | 'agotada' | 'en_espera' | 'revision' | 'inactiva';
  precio_sin_papeles: number | null; precio_con_papeles: number | null;
  fecha_ultima_revision: string | null; fecha_proxima_revision: string | null;
  estado_revision: 'pendiente' | 'revisada' | null; requiere_revision: boolean;
  ficha: Array<{ caracteristica_id: string; valor: string }>;
  colores: ColorDraft[];
  imagenesExistentes: Array<{ id: string; url: string; orden: number; es_principal: boolean }>;
  imagenesNuevas: File[];
}

interface Props {
  isOpen: boolean; initialBike: Motorcycle | null; brands: AdminBrand[];
  categories: AdminCharacteristicCategory[]; characteristics: AdminCharacteristic[];
  onCreateBrand: (name: string) => Promise<AdminBrand>;
  onCreateCharacteristic: (input: { categoria_id: string; nombre: string; unidad: string | null; tipo_dato: string }) => Promise<AdminCharacteristic>;
  onClose: () => void; onSave: (data: MotorcycleFormData, remoteId?: string) => Promise<void>;
}

type Tab = 'general' | 'prices' | 'review' | 'colors' | 'images' | 'technical';
const tabs: Array<{ id: Tab; label: string; icon: IconName }> = [
  { id: 'general', label: 'Información', icon: 'info' },
  { id: 'prices', label: 'Precios', icon: 'credit_card' },
  { id: 'review', label: 'Revisión', icon: 'fact_check' },
  { id: 'colors', label: 'Colores', icon: 'palette' },
  { id: 'images', label: 'Imágenes', icon: 'photo_library' },
  { id: 'technical', label: 'Ficha técnica', icon: 'tune' },
];
const inputClass = 'h-11 w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10';
const emptyForm = (): MotorcycleFormData => ({
  marca_id: '', modelo: '', anio: 2000, descripcion: '', estado: 'disponible',
  precio_sin_papeles: null, precio_con_papeles: null, fecha_ultima_revision: null,
  fecha_proxima_revision: null, estado_revision: 'pendiente', requiere_revision: true,
  ficha: [], colores: [], imagenesExistentes: [], imagenesNuevas: [],
});

export function AdminMotorcycleFormModal({
  isOpen, initialBike, brands, categories, characteristics, onCreateBrand, onCreateCharacteristic, onClose, onSave,
}: Props) {
  const [form, setForm] = useState<MotorcycleFormData>(emptyForm());
  const [tab, setTab] = useState<Tab>('general');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newCharacteristicModal, setNewCharacteristicModal] = useState(false);
  const [newCharacteristic, setNewCharacteristic] = useState({ categoria_id: '', nombre: '', unidad: '', tipo_dato: 'text' });
  const [busyInline, setBusyInline] = useState(false);
  const [technicalCategoryId, setTechnicalCategoryId] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setForm({ // eslint-disable-line react-hooks/set-state-in-effect
      marca_id: initialBike?.brandId || '', modelo: initialBike?.name || '', anio: initialBike?.year || new Date().getFullYear() + 1,
      descripcion: initialBike?.description || '', estado: initialBike?.status === 'espera' ? 'en_espera' : initialBike?.status || 'disponible',
      precio_sin_papeles: initialBike?.priceRawCop || null, precio_con_papeles: initialBike?.priceDocsCop || null,
      fecha_ultima_revision: initialBike?.fechaUltimaRevision || null, fecha_proxima_revision: initialBike?.fechaProximaRevision || null,
      estado_revision: initialBike?.estadoRevision || 'pendiente', requiere_revision: initialBike?.requiereRevision ?? true,
      ficha: (initialBike?.characteristics || []).map((item) => ({ caracteristica_id: item.id, valor: item.value })),
      colores: (initialBike?.colors || []).map((color) => ({ id: color.id, nombre_color: color.name, codigo_hex: color.colorHex || null, estado: color.status === 'espera' ? 'en_espera' : color.status === 'revision' ? null : color.status })),
      imagenesExistentes: (initialBike?.slides || []).filter((image) => image.remoteId).map((image, index) => ({ id: image.remoteId as string, url: image.url, orden: image.order ?? index, es_principal: image.isPrimary ?? index === 0 })),
      imagenesNuevas: [],
    });
    setTab('general'); setError(null); setBrandModal(false); setNewCharacteristicModal(false);
    setTechnicalCategoryId('');
  }, [initialBike, isOpen]);

  const groupedCharacteristics = useMemo(() => categories.map((category) => ({
    category, items: characteristics.filter((item) => item.categoria_id === category.id),
  })).filter((group) => group.items.length > 0), [categories, characteristics]);
  const activeTechnicalGroup = groupedCharacteristics.find((group) => group.category.id === technicalCategoryId) || groupedCharacteristics[0];

  if (!isOpen) return null;
  const update = <K extends keyof MotorcycleFormData>(field: K, value: MotorcycleFormData[K]) => setForm((current) => ({ ...current, [field]: value }));
  const addColor = () => update('colores', [...form.colores, { nombre_color: '', codigo_hex: '#64748b', estado: 'disponible' }]);
  const selectedCharacteristics = new Set(form.ficha.map((row) => row.caracteristica_id));
  const toggleCharacteristic = (id: string) => {
    if (selectedCharacteristics.has(id)) update('ficha', form.ficha.filter((row) => row.caracteristica_id !== id));
    else update('ficha', [...form.ficha, { caracteristica_id: id, valor: '' }]);
  };
  const toggleCategory = (ids: string[]) => {
    const allSelected = ids.every((id) => selectedCharacteristics.has(id));
    if (allSelected) update('ficha', form.ficha.filter((row) => !ids.includes(row.caracteristica_id)));
    else update('ficha', [...form.ficha, ...ids.filter((id) => !selectedCharacteristics.has(id)).map((id) => ({ caracteristica_id: id, valor: '' }))]);
  };
  const addImageFiles = (files: FileList | null) => {
    if (!files) return;
    const next = [...form.imagenesNuevas, ...Array.from(files)];
    if (form.imagenesExistentes.length + next.length > 6) { setError('Una moto puede tener máximo seis imágenes.'); return; }
    update('imagenesNuevas', next);
  };
  const moveImage = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= form.imagenesExistentes.length) return;
    const next = [...form.imagenesExistentes];
    [next[index], next[target]] = [next[target], next[index]];
    update('imagenesExistentes', next.map((image, imageIndex) => ({ ...image, orden: imageIndex })));
  };
  const createBrandInline = async () => {
    if (!newBrandName.trim()) return setError('Escribe el nombre de la marca.');
    setBusyInline(true); setError(null);
    try { const created = await onCreateBrand(newBrandName); update('marca_id', created.id); setNewBrandName(''); setBrandModal(false); }
    catch (inlineError) { setError(inlineError instanceof Error ? inlineError.message : 'No se pudo crear la marca.'); }
    finally { setBusyInline(false); }
  };
  const createCharacteristicInline = async () => {
    if (!newCharacteristic.categoria_id || !newCharacteristic.nombre.trim()) return setError('Categoría y nombre son obligatorios.');
    setBusyInline(true); setError(null);
    try {
      const created = await onCreateCharacteristic({ ...newCharacteristic, nombre: newCharacteristic.nombre.trim(), unidad: newCharacteristic.unidad || null });
      update('ficha', [...form.ficha, { caracteristica_id: created.id, valor: '' }]);
      setNewCharacteristicModal(false); setNewCharacteristic({ categoria_id: '', nombre: '', unidad: '', tipo_dato: 'text' });
    } catch (inlineError) { setError(inlineError instanceof Error ? inlineError.message : 'No se pudo crear la característica.'); }
    finally { setBusyInline(false); }
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setError(null);
    if (!form.marca_id || !form.modelo.trim() || form.anio < 1900 || form.anio > 2200) return setError('Completa una marca, un modelo y un año válido entre 1900 y 2200.');
    if ((form.precio_sin_papeles !== null && form.precio_sin_papeles < 0) || (form.precio_con_papeles !== null && form.precio_con_papeles < 0)) return setError('Los precios no pueden ser negativos.');
    if (form.colores.some((color) => color.codigo_hex !== null && color.codigo_hex !== '' && !/^#[0-9A-Fa-f]{6}$/.test(color.codigo_hex))) return setError('Cada código hexadecimal debe tener el formato #RRGGBB.');
    setSaving(true);
    try { await onSave({ ...form, modelo: form.modelo.trim(), descripcion: form.descripcion.trim(), ficha: form.ficha.filter((row) => row.caracteristica_id && row.valor.trim()) }, initialBike?.remoteId); onClose(); }
    catch (saveError) { setError(saveError instanceof Error ? saveError.message : 'No se pudo guardar la motocicleta.'); }
    finally { setSaving(false); }
  };

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-2 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true">
    <form onSubmit={submit} className="flex max-h-[96vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-surface-container-high bg-surface shadow-2xl">
      <header className="flex items-start justify-between border-b border-surface-container-high bg-surface-container-low px-5 py-5 sm:px-8">
        <div className="flex gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-on-primary"><Icon name="bike" size={23} /></div><div><p className="font-label-sm uppercase tracking-widest text-primary">Inventario / Supabase</p><h2 className="font-headline-md text-on-surface">{initialBike ? 'Editar motocicleta' : 'Registrar motocicleta'}</h2><p className="mt-1 text-sm text-on-surface-variant">Organiza la información por secciones.</p></div></div>
        <button type="button" onClick={onClose} className="rounded-xl p-2 text-on-surface-variant hover:bg-surface-container-high" aria-label="Cerrar"><Icon name="close" size={21} /></button>
      </header>
      <nav className="flex gap-1 overflow-x-auto border-b border-surface-container-high bg-surface-container-lowest px-3 py-2 sm:px-6">{tabs.map((item) => <button key={item.id} type="button" onClick={() => setTab(item.id)} className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition sm:px-4 ${tab === item.id ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container-high'}`}><Icon name={item.icon} size={16} />{item.label}</button>)}</nav>
      <div className="overflow-y-auto p-4 sm:p-8">
        {error && <div className="mb-6 flex items-start gap-2 rounded-xl border border-error/30 bg-error-container/40 p-3 text-sm text-error"><Icon name="warning" size={18} /><span>{error}</span></div>}
        {tab === 'general' && <Section title="Información general" icon="info" description="Identificación principal del modelo."><div className="grid gap-4 sm:grid-cols-2"><Field label="Marca *"><div className="flex gap-2"><select required value={form.marca_id} onChange={(event) => update('marca_id', event.target.value)} className={inputClass}><option value="">Selecciona una marca</option>{brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.nombre}</option>)}</select><button type="button" onClick={() => setBrandModal(true)} className="rounded-xl border border-primary px-3 text-primary" title="Crear marca"><Icon name="plus" size={18} /></button></div></Field><Field label="Modelo *"><input required value={form.modelo} onChange={(event) => update('modelo', event.target.value)} placeholder="Ej. Pulsar N160 Pro" className={inputClass} /></Field><Field label="Año *"><input required type="number" min="1900" max="2200" value={form.anio} onChange={(event) => update('anio', Number(event.target.value))} className={inputClass} /></Field><Field label="Estado comercial"><select value={form.estado} onChange={(event) => update('estado', event.target.value as MotorcycleFormData['estado'])} className={inputClass}><option value="disponible">Disponible</option><option value="agotada">Agotada</option><option value="en_espera">En espera</option><option value="revision">En revisión</option><option value="inactiva">Inactiva</option></select></Field><Field label="Descripción" className="sm:col-span-2"><textarea rows={5} value={form.descripcion} onChange={(event) => update('descripcion', event.target.value)} placeholder="Describe brevemente el modelo..." className={`${inputClass} h-auto py-3`} /></Field></div></Section>}
        {tab === 'prices' && <Section title="Precios de venta" icon="credit_card" description="Valores en pesos colombianos (COP)."><div className="grid gap-4 sm:grid-cols-2"><PriceField label="Sin papeles" value={form.precio_sin_papeles} onChange={(value) => update('precio_sin_papeles', value)} /><PriceField label="Con papeles" value={form.precio_con_papeles} onChange={(value) => update('precio_con_papeles', value)} /></div></Section>}
        {tab === 'review' && <Section title="Revisión anual" icon="fact_check" description="Control de mantenimiento preventivo."><div className="grid gap-4 sm:grid-cols-2"><Field label="Última revisión"><input type="date" value={form.fecha_ultima_revision || ''} onChange={(event) => update('fecha_ultima_revision', event.target.value || null)} className={inputClass} /></Field><Field label="Próxima revisión"><input type="date" value={form.fecha_proxima_revision || ''} onChange={(event) => update('fecha_proxima_revision', event.target.value || null)} className={inputClass} /></Field><Field label="Estado de revisión"><select value={form.estado_revision || ''} onChange={(event) => update('estado_revision', (event.target.value || null) as MotorcycleFormData['estado_revision'])} className={inputClass}><option value="pendiente">Pendiente</option><option value="revisada">Revisada</option></select></Field><label className="flex items-center gap-3 rounded-xl border border-outline-variant px-3 py-3 text-sm text-on-surface"><input type="checkbox" checked={form.requiere_revision} onChange={(event) => update('requiere_revision', event.target.checked)} className="h-4 w-4 accent-primary" /> Requiere revisión</label></div></Section>}
        {tab === 'colors' && <Section title="Variantes de color" icon="palette" description="Colores disponibles para este modelo."><div className="grid gap-3 sm:grid-cols-2">{form.colores.map((color, index) => <div key={color.id || index} className="rounded-2xl border border-outline-variant bg-surface-container p-4"><div className="flex items-center justify-between gap-2"><div className="flex items-center gap-2"><input type="color" value={color.codigo_hex || '#64748b'} onChange={(event) => update('colores', form.colores.map((item, i) => i === index ? { ...item, codigo_hex: event.target.value } : item))} className="h-10 w-10 cursor-pointer rounded-lg border-0 bg-transparent p-0" /><span className="text-sm font-bold text-on-surface">Color {index + 1}</span></div><button type="button" onClick={() => update('colores', form.colores.filter((_, i) => i !== index))} className="text-error"><Icon name="delete" size={17} /></button></div><div className="mt-3 grid gap-2"><input value={color.nombre_color} onChange={(event) => update('colores', form.colores.map((item, i) => i === index ? { ...item, nombre_color: event.target.value } : item))} placeholder="Ej. Negro mate" className={inputClass} /><div className="grid grid-cols-[1fr_auto] gap-2"><input value={color.codigo_hex || ''} onChange={(event) => { const value = event.target.value; update('colores', form.colores.map((item, i) => i === index ? { ...item, codigo_hex: value } : item)); }} placeholder="#000000" pattern="^#[0-9A-Fa-f]{6}$" className={inputClass} /><span className="flex h-11 w-11 rounded-xl border border-outline-variant" style={{ backgroundColor: color.codigo_hex || '#ffffff' }} title="Vista previa" /></div><select value={color.estado || ''} onChange={(event) => update('colores', form.colores.map((item, i) => i === index ? { ...item, estado: (event.target.value || null) as ColorDraft['estado'] } : item))} className={inputClass}><option value="disponible">Disponible</option><option value="agotada">Agotada</option><option value="en_espera">En espera</option></select></div></div>)}</div>{form.colores.length === 0 && <EmptyState icon="palette" text="No hay variantes de color." /> }<button type="button" onClick={addColor} className="mt-4 flex items-center gap-2 rounded-xl border border-primary px-4 py-2.5 text-sm font-bold text-primary"><Icon name="plus" size={17} /> Añadir color</button></Section>}
        {tab === 'images' && <Section title="Galería de imágenes" icon="photo_library" description="Máximo seis imágenes por motocicleta."><label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 p-8 text-center hover:bg-primary/10"><Icon name="cloud_upload" size={30} className="text-primary" /><span className="mt-2 text-sm font-bold text-on-surface">Seleccionar imágenes</span><span className="mt-1 text-xs text-on-surface-variant">{form.imagenesExistentes.length + form.imagenesNuevas.length}/6 imágenes</span><input type="file" accept="image/*" multiple onChange={(event) => { addImageFiles(event.target.files); event.currentTarget.value = ''; }} className="hidden" /></label><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{form.imagenesExistentes.map((image, index) => <div key={image.id} className="relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container"><img src={image.url} alt={`Imagen ${index + 1}`} className="aspect-square w-full object-cover" /><div className="flex items-center justify-between p-2"><button type="button" onClick={() => update('imagenesExistentes', form.imagenesExistentes.map((item) => ({ ...item, es_principal: item.id === image.id })))} className={`text-xs font-bold ${image.es_principal ? 'text-primary' : 'text-on-surface-variant'}`}>{image.es_principal ? 'Principal' : 'Usar principal'}</button><div className="flex items-center gap-1"><button type="button" disabled={index === 0} onClick={() => moveImage(index, -1)} className="rounded p-1 text-on-surface-variant disabled:opacity-30" aria-label="Mover arriba"><Icon name="arrow_back" size={14} /></button><button type="button" disabled={index === form.imagenesExistentes.length - 1} onClick={() => moveImage(index, 1)} className="rounded p-1 text-on-surface-variant disabled:opacity-30" aria-label="Mover abajo"><Icon name="arrow_forward" size={14} /></button><button type="button" onClick={() => update('imagenesExistentes', form.imagenesExistentes.filter((item) => item.id !== image.id).map((item, imageIndex) => ({ ...item, orden: imageIndex })))} className="text-error"><Icon name="delete" size={16} /></button></div></div></div>)}{form.imagenesNuevas.map((file, index) => <div key={`${file.name}-${index}`} className="flex aspect-square flex-col items-center justify-center rounded-xl border border-primary/30 bg-primary/5 p-3 text-center"><Icon name="photo_camera" size={26} className="text-primary" /><span className="mt-2 line-clamp-3 text-xs text-on-surface">{file.name}</span><button type="button" onClick={() => update('imagenesNuevas', form.imagenesNuevas.filter((_, i) => i !== index))} className="mt-2 text-xs font-bold text-error">Quitar</button></div>)}</div></Section>}
        {tab === 'technical' && <Section title="Ficha técnica" icon="tune" description="Elige una categoría y selecciona sus características sin recorrer todo el listado."><div className="mb-5 flex flex-col gap-3 rounded-xl bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="text-sm text-on-surface"><strong>{form.ficha.length}</strong> características seleccionadas</div><select value={technicalCategoryId || activeTechnicalGroup?.category.id || ''} onChange={(event) => setTechnicalCategoryId(event.target.value)} className={`${inputClass} sm:max-w-xs`}><option value="">Selecciona una categoría</option>{groupedCharacteristics.map((group) => <option key={group.category.id} value={group.category.id}>{group.category.nombre} ({group.items.length})</option>)}</select></div>{activeTechnicalGroup ? <div className="rounded-2xl border border-outline-variant bg-surface-container p-4"><div className="mb-3 flex flex-wrap items-center justify-between gap-2"><div><h3 className="font-semibold text-on-surface">{activeTechnicalGroup.category.nombre}</h3><p className="text-xs text-on-surface-variant">{activeTechnicalGroup.items.filter((item) => selectedCharacteristics.has(item.id)).length} de {activeTechnicalGroup.items.length} seleccionadas</p></div><button type="button" onClick={() => toggleCategory(activeTechnicalGroup.items.map((item) => item.id))} className="rounded-lg border border-primary px-3 py-2 text-xs font-bold text-primary">{activeTechnicalGroup.items.every((item) => selectedCharacteristics.has(item.id)) ? 'Limpiar categoría' : 'Seleccionar todas'}</button></div><div className="grid gap-2 sm:grid-cols-2">{activeTechnicalGroup.items.map((item) => { const row = form.ficha.find((entry) => entry.caracteristica_id === item.id); return <div key={item.id} className={`rounded-xl border p-3 transition ${row ? 'border-primary/40 bg-primary/5' : 'border-outline-variant bg-surface-container-low'}`}><label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={Boolean(row)} onChange={() => toggleCharacteristic(item.id)} className="h-4 w-4 accent-primary" /><span className="text-sm font-semibold text-on-surface">{item.nombre}</span>{item.unidad && <span className="text-xs text-on-surface-variant">({item.unidad})</span>}</label>{row && <input value={row.valor} onChange={(event) => update('ficha', form.ficha.map((entry) => entry.caracteristica_id === item.id ? { ...entry, valor: event.target.value } : entry))} placeholder={`Valor${item.unidad ? ` en ${item.unidad}` : ''}`} className={`${inputClass} mt-2`} />}</div>; })}</div></div> : <p className="rounded-xl border border-dashed border-outline-variant p-8 text-center text-sm text-on-surface-variant">No hay características disponibles. Crea una desde este formulario.</p>}<div className="mt-5 flex flex-wrap gap-2"><button type="button" onClick={() => toggleCategory(characteristics.map((item) => item.id))} className="rounded-xl border border-outline px-4 py-2.5 text-sm font-bold text-on-surface-variant">{form.ficha.length === characteristics.length ? 'Limpiar ficha' : 'Seleccionar todas las categorías'}</button><button type="button" onClick={() => { setNewCharacteristic({ ...newCharacteristic, categoria_id: technicalCategoryId || activeTechnicalGroup?.category.id || categories[0]?.id || '' }); setNewCharacteristicModal(true); }} className="rounded-xl border border-primary px-4 py-2.5 text-sm font-bold text-primary"><Icon name="add_circle" size={16} /> Crear característica</button></div></Section>}
      </div>
      <footer className="flex flex-col-reverse gap-3 border-t border-surface-container-high bg-surface-container-low px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8"><p className="text-xs text-on-surface-variant"><span className="text-error">*</span> Campos obligatorios</p><div className="flex flex-col gap-2 sm:flex-row"><button type="button" onClick={onClose} className="rounded-xl border border-outline px-5 py-2.5 text-sm font-semibold text-on-surface">Cancelar</button><button type="submit" disabled={saving} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-on-primary disabled:opacity-60">{saving ? 'Guardando...' : initialBike ? 'Guardar cambios' : 'Registrar motocicleta'}</button></div></footer>
    </form>
    {brandModal && <InlineModal title="Nueva marca" onClose={() => setBrandModal(false)}><input autoFocus value={newBrandName} onChange={(event) => setNewBrandName(event.target.value)} placeholder="Nombre de la marca" className={inputClass} /><InlineActions busy={busyInline} onCancel={() => setBrandModal(false)} onConfirm={() => void createBrandInline()} label="Crear marca" /></InlineModal>}
    {newCharacteristicModal && <InlineModal title="Nueva característica" onClose={() => setNewCharacteristicModal(false)}><select value={newCharacteristic.categoria_id} onChange={(event) => setNewCharacteristic({ ...newCharacteristic, categoria_id: event.target.value })} className={inputClass}><option value="">Selecciona categoría</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.nombre}</option>)}</select><input value={newCharacteristic.nombre} onChange={(event) => setNewCharacteristic({ ...newCharacteristic, nombre: event.target.value })} placeholder="Nombre, ej. Cilindraje" className={inputClass} /><div className="grid gap-2 sm:grid-cols-2"><input value={newCharacteristic.unidad} onChange={(event) => setNewCharacteristic({ ...newCharacteristic, unidad: event.target.value })} placeholder="Unidad, ej. cc" className={inputClass} /><select value={newCharacteristic.tipo_dato} onChange={(event) => setNewCharacteristic({ ...newCharacteristic, tipo_dato: event.target.value })} className={inputClass}><option value="text">Texto</option><option value="number">Número</option><option value="boolean">Sí / No</option></select></div><InlineActions busy={busyInline} onCancel={() => setNewCharacteristicModal(false)} onConfirm={() => void createCharacteristicInline()} label="Crear característica" /></InlineModal>}
  </div>;
}

function Section({ title, icon, description, children }: { title: string; icon: IconName; description: string; children: React.ReactNode }) { return <section className="rounded-2xl border border-surface-container-high bg-surface-container-low p-4 sm:p-7"><SectionTitle icon={icon} title={title} description={description} />{children}</section>; }
function SectionTitle({ icon, title, description }: { icon: IconName; title: string; description: string }) { return <div className="mb-5 flex items-start gap-2"><Icon name={icon} size={19} className="mt-0.5 text-primary" /><div><h3 className="font-headline-sm text-on-surface">{title}</h3><p className="mt-0.5 text-xs text-on-surface-variant">{description}</p></div></div>; }
function Field({ label, className = '', children }: { label: string; className?: string; children: React.ReactNode }) { return <label className={`flex flex-col gap-1.5 ${className}`}><span className="text-xs font-semibold text-on-surface-variant">{label}</span>{children}</label>; }
function PriceField({ label, value, onChange }: { label: string; value: number | null; onChange: (value: number | null) => void }) { return <Field label={`${label} (COP)`}><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant">$</span><input type="number" min="0" value={value ?? ''} onChange={(event) => onChange(event.target.value ? Number(event.target.value) : null)} placeholder="0" className={`${inputClass} pl-8`} /></div></Field>; }
function EmptyState({ icon, text }: { icon: IconName; text: string }) { return <div className="rounded-xl border border-dashed border-outline-variant p-10 text-center"><Icon name={icon} size={28} className="mx-auto text-outline" /><p className="mt-2 text-sm text-on-surface-variant">{text}</p></div>; }
function InlineModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) { return <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/40 p-4"><div className="w-full max-w-md space-y-4 rounded-2xl bg-surface p-6 shadow-2xl"><div className="flex items-center justify-between"><h3 className="font-headline-sm text-on-surface">{title}</h3><button type="button" onClick={onClose} className="text-on-surface-variant"><Icon name="close" size={19} /></button></div>{children}</div></div>; }
function InlineActions({ busy, onCancel, onConfirm, label }: { busy: boolean; onCancel: () => void; onConfirm: () => void; label: string }) { return <div className="flex justify-end gap-2"><button type="button" onClick={onCancel} className="rounded-lg border border-outline px-4 py-2 text-sm text-on-surface">Cancelar</button><button type="button" disabled={busy} onClick={onConfirm} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary">{busy ? 'Guardando...' : label}</button></div>; }
