import { useCallback, useEffect, useMemo, useState } from 'react';
import { Icon } from '../../../components/Icon';
import type { Motorcycle } from '../../../types';
import {
  marcarRevisionCompletada,
  obtenerMotosPendientesRevision,
  obtenerRevisionesVencidas,
  programarRevision,
} from '../../../lib/supabase/services/reviews.service';

type ReviewMotorcycle = NonNullable<Awaited<ReturnType<typeof obtenerMotosPendientesRevision>>>[number];

interface ReviewModalState {
  motorcycle: ReviewMotorcycle;
  date: string;
}

interface ApprovalModalState {
  motorcycle: ReviewMotorcycle;
}

const formatDate = (date: string | null) => {
  if (!date) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' }).format(new Date(`${date}T00:00:00`));
};

const isOverdue = (date: string | null) => Boolean(date && date < new Date().toISOString().slice(0, 10));

interface Props {
  motorcycles: Motorcycle[];
  onEditMotorcycle: (motorcycle: Motorcycle) => void;
  refreshSignal?: number;
}

export function AdminReviewsManager({ motorcycles, onEditMotorcycle, refreshSignal = 0 }: Props) {
  const [pending, setPending] = useState<ReviewMotorcycle[]>([]);
  const [overdue, setOverdue] = useState<ReviewMotorcycle[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [modal, setModal] = useState<ReviewModalState | null>(null);
  const [approvalModal, setApprovalModal] = useState<ApprovalModalState | null>(null);
  const [approvalSuccess, setApprovalSuccess] = useState<ReviewMotorcycle | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadReviews = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const [nextPending, nextOverdue] = await Promise.all([
        obtenerMotosPendientesRevision(),
        obtenerRevisionesVencidas(),
      ]);
      setPending(nextPending || []);
      setOverdue(nextOverdue || []);
      setStatus('ready');
    } catch (loadError) {
      setStatus('error');
      setError(loadError instanceof Error ? loadError.message : 'No se pudieron cargar las revisiones.');
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadReviews();
  }, [loadReviews, refreshSignal]);

  const reviews = useMemo(() => {
    const unique = new Map<string, ReviewMotorcycle>();
    [...overdue, ...pending].forEach((motorcycle) => unique.set(motorcycle.id, motorcycle));
    return [...unique.values()].sort((a, b) => {
      const left = a.fecha_proxima_revision || '9999-12-31';
      const right = b.fecha_proxima_revision || '9999-12-31';
      return left.localeCompare(right);
    });
  }, [overdue, pending]);

  const runAction = async (id: string, action: () => Promise<unknown>) => {
    setBusyId(id);
    setActionError(null);
    try {
      await action();
      await loadReviews();
    } catch (actionLoadError) {
      setActionError(actionLoadError instanceof Error ? actionLoadError.message : 'No se pudo actualizar la revisión.');
    } finally {
      setBusyId(null);
    }
  };

  const saveSchedule = async () => {
    if (!modal?.date) {
      setActionError('Selecciona una fecha para programar la revisión.');
      return;
    }
    await runAction(modal.motorcycle.id, async () => {
      await programarRevision(modal.motorcycle.id, modal.date);
      setModal(null);
    });
  };

  const approveReview = async () => {
    if (!approvalModal) return;
    const motorcycle = approvalModal.motorcycle;
    setBusyId(motorcycle.id);
    setActionError(null);
    try {
      await marcarRevisionCompletada(motorcycle.id);
      setApprovalModal(null);
      setApprovalSuccess(motorcycle);
      await loadReviews();
    } catch (approvalError) {
      setActionError(approvalError instanceof Error ? approvalError.message : 'No se pudo aprobar la revisión.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-16">
      <header className="flex flex-col gap-4 rounded-2xl border border-surface-container-high bg-surface-container-low p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <span className="font-label-sm uppercase tracking-widest text-primary">Operación / Mantenimiento</span>
          <h1 className="font-headline-lg text-on-surface">Revisiones anuales</h1>
          <p className="mt-1 text-on-surface-variant">Programa y controla las revisiones de las motos del catálogo.</p>
        </div>
        <button type="button" onClick={() => void loadReviews()} className="flex items-center justify-center gap-2 rounded-lg border border-outline px-4 py-2.5 font-semibold text-on-surface-variant hover:bg-surface-container-high">
          <Icon name="refresh" size={18} /> Actualizar
        </button>
      </header>

      {error && <div className="rounded-xl border border-error/30 bg-error-container/30 px-4 py-3 text-sm text-error">{error}</div>}
      {actionError && <div className="rounded-xl border border-error/30 bg-error-container/30 px-4 py-3 text-sm text-error">{actionError}</div>}

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-secondary/20 bg-secondary/10 p-5">
          <p className="text-sm text-on-surface-variant">Revisiones vencidas</p>
          <p className="mt-2 text-3xl font-bold text-secondary">{overdue.length}</p>
        </div>
        <div className="rounded-2xl border border-primary/20 bg-primary/10 p-5">
          <p className="text-sm text-on-surface-variant">Pendientes programadas</p>
          <p className="mt-2 text-3xl font-bold text-primary">{pending.length}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-surface-container-high bg-surface-container-low p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-headline-sm text-on-surface">Motos que requieren atención</h2>
            <p className="text-sm text-on-surface-variant">Marca una revisión como completada o programa una nueva fecha.</p>
          </div>
        </div>
        {status === 'loading' ? (
          <p className="rounded-xl bg-surface-container p-8 text-center text-on-surface-variant">Cargando revisiones...</p>
        ) : reviews.length === 0 ? (
          <div className="rounded-xl border border-dashed border-outline-variant p-10 text-center">
            <Icon name="check_circle" size={36} className="mx-auto text-tertiary" />
            <p className="mt-3 font-semibold text-on-surface">Todo está al día</p>
            <p className="mt-1 text-sm text-on-surface-variant">No hay motos pendientes de revisión.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {reviews.map((motorcycle) => {
              const overdueReview = isOverdue(motorcycle.fecha_proxima_revision);
              const busy = busyId === motorcycle.id;
              return (
                <article key={motorcycle.id} className="flex flex-col gap-4 rounded-xl border border-surface-container-high bg-surface-container p-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">{motorcycle.marcas?.nombre || 'Sin marca'}</p>
                    <h3 className="truncate text-lg font-bold text-on-surface">{motorcycle.modelo} <span className="font-normal text-on-surface-variant">{motorcycle.anio}</span></h3>
                    <p className={`mt-1 text-sm ${overdueReview ? 'font-semibold text-secondary' : 'text-on-surface-variant'}`}>
                      {overdueReview ? 'Vencida' : 'Próxima revisión'}: {formatDate(motorcycle.fecha_proxima_revision)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => {
                        const editableMotorcycle = motorcycles.find((item) => item.remoteId === motorcycle.id);
                        if (editableMotorcycle) onEditMotorcycle(editableMotorcycle);
                        else setActionError('No se pudo encontrar la información completa de esta moto para editarla.');
                      }}
                      className="rounded-lg border border-outline px-3 py-2 text-sm font-semibold text-on-surface-variant disabled:opacity-50"
                    >
                      Editar moto
                    </button>
                    <button type="button" disabled={busy} onClick={() => setModal({ motorcycle, date: motorcycle.fecha_proxima_revision || '' })} className="rounded-lg border border-primary px-3 py-2 text-sm font-semibold text-primary disabled:opacity-50">
                      Programar
                    </button>
                    <button type="button" disabled={busy} onClick={() => setApprovalModal({ motorcycle })} className="rounded-lg bg-tertiary px-3 py-2 text-sm font-semibold text-on-primary disabled:opacity-50">
                      Marcar como aprobada
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {modal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl border border-surface-container-high bg-surface p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">Revisión anual</p>
                <h2 className="mt-1 font-headline-sm text-on-surface">Programar fecha</h2>
                <p className="mt-1 text-sm text-on-surface-variant">{modal.motorcycle.marcas?.nombre} {modal.motorcycle.modelo}</p>
              </div>
              <button type="button" onClick={() => setModal(null)} className="text-on-surface-variant"><Icon name="close" size={20} /></button>
            </div>
            <label className="mt-5 flex flex-col gap-2">
              <span className="text-sm font-semibold text-on-surface-variant">Próxima revisión</span>
              <input type="date" value={modal.date} onChange={(event) => setModal({ ...modal, date: event.target.value })} className="h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 text-on-surface outline-none focus:border-primary" />
            </label>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setModal(null)} className="rounded-lg border border-outline px-4 py-2 text-sm font-semibold text-on-surface-variant">Cancelar</button>
              <button type="button" disabled={busyId === modal.motorcycle.id} onClick={() => void saveSchedule()} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary disabled:opacity-50">
                Guardar fecha
              </button>
            </div>
          </div>
        </div>
      )}

      {approvalModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl border border-surface-container-high bg-surface p-6 shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Confirmar revisión</p>
            <h2 className="mt-1 font-headline-sm text-on-surface">¿La moto ya aprobó la revisión?</h2>
            <p className="mt-3 text-sm text-on-surface-variant">
              Al confirmar, se guardará la revisión como aprobada y dejará de aparecer como pendiente.
            </p>
            <div className="mt-4 rounded-xl bg-surface-container-low p-4 text-sm">
              <p className="font-bold text-on-surface">{approvalModal.motorcycle.marcas?.nombre} {approvalModal.motorcycle.modelo}</p>
              <p className="mt-1 text-on-surface-variant">Próxima comprobación: {formatDate(approvalModal.motorcycle.fecha_proxima_revision)}</p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setApprovalModal(null)} className="rounded-lg border border-outline px-4 py-2 text-sm font-semibold text-on-surface-variant">Cancelar</button>
              <button type="button" disabled={busyId === approvalModal.motorcycle.id} onClick={() => void approveReview()} className="rounded-lg bg-tertiary px-4 py-2 text-sm font-bold text-on-primary disabled:opacity-50">
                {busyId === approvalModal.motorcycle.id ? 'Guardando...' : 'Confirmar aprobación'}
              </button>
            </div>
          </div>
        </div>
      )}

      {approvalSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl border border-tertiary/30 bg-surface p-6 shadow-2xl">
            <Icon name="check_circle" size={34} className="text-tertiary" />
            <h2 className="mt-3 font-headline-sm text-on-surface">Revisión aprobada</h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              La revisión de {approvalSuccess.marcas?.nombre} {approvalSuccess.modelo} fue guardada correctamente.
            </p>
            <p className="mt-2 text-sm font-semibold text-on-surface">
              Próxima comprobación: {formatDate(approvalSuccess.fecha_proxima_revision)}
            </p>
            <div className="mt-6 flex justify-end">
              <button type="button" onClick={() => setApprovalSuccess(null)} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary">Entendido</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
