import React, { useMemo, useState } from 'react';
import { Motorcycle, BikeStatus } from '../../../types';
import { Icon } from '../../../components/Icon';

interface AdminInventoryManagerProps {
  motorcycles: Motorcycle[];
  onOpenAddNewModal: () => void;
  onOpenEditModal: (bike: Motorcycle) => void;
  onPreviewInCatalog: (bike: Motorcycle) => void;
  onDeleteMotorcycle: (remoteId: string) => Promise<void>;
}

const statusLabels: Record<BikeStatus, string> = {
  disponible: 'Disponible',
  agotada: 'Agotada',
  espera: 'En espera',
  revision: 'En revisión',
};
const statusClasses: Record<BikeStatus, string> = {
  disponible: 'bg-tertiary/10 text-tertiary border-tertiary/20',
  agotada: 'bg-error/10 text-error border-error/20',
  espera: 'bg-primary/10 text-primary border-primary/20',
  revision: 'bg-secondary/10 text-secondary border-secondary/20',
};

export const AdminInventoryManager: React.FC<AdminInventoryManagerProps> = ({
  motorcycles,
  onOpenAddNewModal,
  onOpenEditModal,
  onPreviewInCatalog,
  onDeleteMotorcycle,
}) => {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | BikeStatus>('todos');
  const [deleteCandidate, setDeleteCandidate] = useState<Motorcycle | null>(null);

  const filteredMotorcycles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return motorcycles.filter((bike) => {
      const matchesQuery =
        !normalizedQuery ||
        `${bike.brand} ${bike.name} ${bike.year}`.toLowerCase().includes(normalizedQuery);
      const matchesStatus = statusFilter === 'todos' || bike.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [motorcycles, query, statusFilter]);

  const confirmDelete = async () => {
    if (!deleteCandidate?.remoteId) return;
    await onDeleteMotorcycle(deleteCandidate.remoteId);
    setDeleteCandidate(null);
  };

  return (
    <div className="flex flex-col gap-6 pb-16">
      <header className="flex flex-col gap-5 rounded-2xl border border-surface-container-high bg-surface-container-low p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
            Catálogo / Inventario
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Motos del catálogo</h1>
          <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
            Crea, edita y controla la información pública de cada modelo desde una única modal.
          </p>
        </div>
        <button type="button" onClick={onOpenAddNewModal} className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-label-lg font-bold text-on-primary">
          <Icon name="add_circle" size={20} /> Crear nueva moto
        </button>
      </header>

      <section className="rounded-2xl border border-surface-container-high bg-surface-container-low p-4 sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por marca, modelo o año"
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest py-2.5 pl-10 pr-3 font-body-md text-body-md text-on-surface outline-none focus:border-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as 'todos' | BikeStatus)}
            className="rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2.5 font-body-md text-body-md text-on-surface outline-none focus:border-primary"
          >
            <option value="todos">Todos los estados</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="mt-5 grid gap-3">
          {filteredMotorcycles.length === 0 ? (
            <div className="rounded-xl border border-dashed border-outline-variant p-10 text-center">
              <Icon name="bike" size={36} className="mx-auto text-outline" />
              <p className="mt-3 font-body-md text-body-md text-on-surface-variant">
                No hay motos que coincidan con los filtros.
              </p>
            </div>
          ) : (
            filteredMotorcycles.map((bike) => (
              <article
                key={bike.id}
                className="flex flex-col gap-4 rounded-xl border border-surface-container-high bg-surface-container p-4 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <img
                    src={bike.slides[0]?.url}
                    alt={bike.name}
                    className="h-16 w-24 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-label-sm text-label-sm uppercase tracking-widest text-primary">{bike.brand}</p>
                    <h2 className="truncate font-headline-sm text-headline-sm text-on-surface">
                      {bike.name} <span className="text-on-surface-variant">{bike.year}</span>
                    </h2>
                    <div className="mt-1 flex flex-wrap gap-2 font-label-sm text-label-sm text-on-surface-variant">
                      <span>{bike.priceRawCop ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(bike.priceRawCop) : 'Precio pendiente'}</span>
                      <span>·</span>
                      <span>{bike.colors.length} colores</span>
                      <span>·</span>
                      <span>{bike.slides.length}/6 imágenes</span>
                      <span>·</span>
                      <span>{bike.requiereRevision ? 'Requiere revisión' : 'Revisión al día'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                  <span className={`rounded-full border px-3 py-1 font-label-sm text-label-sm ${statusClasses[bike.status]}`}>
                    {statusLabels[bike.status]}
                  </span>
                  <button type="button" onClick={() => onPreviewInCatalog(bike)} className="rounded-lg border border-outline px-3 py-2 text-on-surface-variant hover:bg-surface-container-high" title="Ver ficha">
                    <Icon name="eye" size={17} />
                  </button>
                  <button type="button" onClick={() => onOpenEditModal(bike)} className="rounded-lg border border-primary px-3 py-2 text-primary" title="Editar moto">
                    <Icon name="pencil" size={17} />
                  </button>
                  <button type="button" onClick={() => setDeleteCandidate(bike)} className="rounded-lg border border-error px-3 py-2 text-error" title="Eliminar moto">
                    <Icon name="delete" size={17} />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
      {deleteCandidate && <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/30 p-4" role="dialog" aria-modal="true"><div className="w-full max-w-md rounded-2xl bg-surface-container-low p-6 shadow-2xl"><h2 className="font-headline-sm text-on-surface">Eliminar moto</h2><p className="mt-2 text-on-surface-variant">¿Confirmas eliminar {deleteCandidate.brand} {deleteCandidate.name}?</p><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setDeleteCandidate(null)} className="rounded-lg border border-outline px-4 py-2 text-on-surface">Cancelar</button><button type="button" onClick={() => void confirmDelete()} className="rounded-lg bg-error px-4 py-2 font-semibold text-on-error">Eliminar</button></div></div></div>}

    </div>
  );
};
