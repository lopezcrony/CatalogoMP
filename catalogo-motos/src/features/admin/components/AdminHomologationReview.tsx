import React, { useState } from 'react';
import { HomologationModel } from '../../../types';
import { Icon } from '../../../components/Icon';

interface AdminHomologationReviewProps {
  homologations: HomologationModel[];
  onApproveHomologation: (homologationId: string) => void;
  onToast: (title: string, message: string, isError?: boolean) => void;
}

export const AdminHomologationReview: React.FC<AdminHomologationReviewProps> = ({
  homologations,
  onApproveHomologation,
  onToast,
}) => {
  const [selectedId, setSelectedId] = useState(homologations[0]?.id || 'h1');
  const [activeHomologations, setActiveHomologations] = useState<HomologationModel[]>(homologations);

  const current = activeHomologations.find((h) => h.id === selectedId) || activeHomologations[0];

  const handleToggleChecklist = (checkId: string) => {
    setActiveHomologations((prev) =>
      prev.map((item) => {
        if (item.id === current.id) {
          const updatedChecklist = item.checklist.map((c) =>
            c.id === checkId ? { ...c, completed: !c.completed } : c
          );
          return { ...item, checklist: updatedChecklist };
        }
        return item;
      })
    );
  };

  const completedCount = current.checklist.filter((c) => c.completed).length;
  const totalCount = current.checklist.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handleApprove = () => {
    onApproveHomologation(current.id);
    setActiveHomologations((prev) =>
      prev.map((item) => (item.id === current.id ? { ...item, approved: true } : item))
    );
    onToast(
      'Homologación Aprobada',
      `${current.name} (2025) ha sido sincronizada y ya es el modelo oficial visible en la vitrina pública.`
    );
  };

  return (
    <div className="flex flex-col w-full pb-16 font-sans">
      {/* Top Telemetry Ribbon & Header */}
      <div className="relative overflow-hidden bg-surface-container-low border border-surface-container-high rounded-2xl p-6 sm:p-8 shadow-xl mb-8">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-32 bg-tertiary/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-2 max-w-3xl">
            <div className="flex items-center gap-3 text-primary font-label-sm text-label-sm uppercase tracking-widest">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span>Operaciones de Inventario</span>
              <span className="text-outline">/</span>
              <span>Homologación Técnica Anual</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Revisión y Comparador por Cambio de Año <span className="text-primary">(2024 vs 2025)</span>
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Auditoría técnica de cambios mecánicos, equipamiento e instrumentación antes de sincronizar la vitrina pública y habilitar módulos de preventa digital.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onToast('Historial Consultado', '2 homologaciones completadas este trimestre.')}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest border border-outline text-on-surface font-label-lg text-label-lg transition-colors cursor-pointer"
            >
              <Icon name="history" size={18} />
              Historial de Homologaciones
            </button>
            <button
              type="button"
              onClick={handleApprove}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary-container hover:bg-primary font-label-lg text-label-lg font-bold shadow-lg transition-all cursor-pointer"
            >
              <Icon name="verified" size={18} />
              Aprobar y Publicar Año 2025
            </button>
          </div>
        </div>
      </div>

      {/* Operational Alert Banner */}
      <div className="bg-surface-container/70 border border-outline-variant backdrop-blur-md rounded-xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary shrink-0 border border-primary/30">
            <Icon name="sync_problem" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg text-on-surface font-bold">
              Validación Técnica Pendiente
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {activeHomologations.filter((h) => !h.approved).length} modelos detectados con cambio de generación pendiente de validación técnica antes de release público.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error/40 border border-error/30 text-error font-label-sm text-label-sm uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
            Bloqueo de Vitrina Activo
          </span>
        </div>
      </div>

      {/* Model Comparison Selector Tabs */}
      <div className="flex flex-col gap-3 mb-6">
        <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">
          Lotes en Cola de Verificación:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeHomologations.map((h) => {
            const isSelected = h.id === current.id;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => setSelectedId(h.id)}
                className={`flex items-center justify-between p-4 rounded-xl text-left transition-all shadow-md cursor-pointer border ${
                  isSelected
                    ? 'bg-surface-container border-primary'
                    : 'bg-surface-container-low border-surface-container-high hover:bg-surface-container opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-surface-container-high text-primary' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <Icon name={h.name.includes('Ninja') ? 'speed' : 'two_wheeler'} size={24} />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-headline-sm text-headline-sm text-on-surface truncate">
                      {h.name}
                    </span>
                    <span className="font-label-sm text-label-sm text-primary tracking-wide">
                      {h.subtitle}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded font-label-sm text-label-sm uppercase font-bold shrink-0 ml-2 ${
                    h.approved
                      ? 'bg-tertiary-container text-tertiary'
                      : isSelected
                      ? 'bg-primary text-on-primary-container'
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {h.approved ? 'Homologado' : isSelected ? 'Seleccionado' : 'Pendiente'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Diff Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Outgoing Model Column */}
        <div className="bg-surface-container-low border border-surface-container-high rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                  Versión Saliente
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  {current.name} ({current.outgoing.year})
                </span>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-error/30 text-error border border-error/30 font-label-sm text-label-sm uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-error mr-1.5"></span>
                {current.outgoing.badge}
              </span>
            </div>

            <div className="relative w-full h-56 rounded-lg overflow-hidden bg-surface-container-lowest border border-surface-container-high">
              <img
                src={current.outgoing.image}
                alt={current.name}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
              <span className="absolute bottom-3 left-3 bg-surface-container-lowest/80 backdrop-blur-md px-2.5 py-1 rounded font-label-sm text-label-sm text-on-surface-variant uppercase border border-surface-container-high">
                MY{current.outgoing.year} Spec Sheet
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="p-3.5 rounded-lg bg-surface-container border border-surface-container-high flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                    <Icon name="tv" size={14} />
                    Instrumentación &amp; Tablero
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">Estándar</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface">{current.outgoing.display}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-surface-container border border-surface-container-high flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                    <Icon name="album" size={14} />
                    Sistema de Frenado
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">Básico</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface">{current.outgoing.brakes}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-surface-container border border-surface-container-high flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                    <Icon name="memory" size={14} />
                    Electrónica &amp; Ayudas
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">Mecánico</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface">{current.outgoing.electronics}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 bg-surface-container border border-surface-container-high rounded-lg p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Precio Anterior Base</span>
              <span className="font-headline-md text-headline-md text-on-surface font-bold">
                {current.outgoing.priceCop}
              </span>
            </div>
            <div className="text-right">
              <span className="font-label-sm text-label-sm uppercase text-error font-bold block">
                Inventario Remanente
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">
                {current.outgoing.stockInfo}
              </span>
            </div>
          </div>
        </div>

        {/* Incoming Model Column */}
        <div className="bg-surface-container border border-primary/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col gap-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-primary text-on-primary-container font-label-sm text-label-sm uppercase font-bold tracking-wider">
                  Nueva Versión Entrante
                </span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  {current.name} ({current.incoming.year})
                </span>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-tertiary/30 text-tertiary border border-tertiary/40 font-label-sm text-label-sm uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary mr-1.5 shadow-[0_0_8px_rgba(21,128,61,0.35)]"></span>
                {current.incoming.badge}
              </span>
            </div>

            <div className="relative w-full h-56 rounded-lg overflow-hidden bg-surface-container-lowest border border-surface-container-high">
              <img
                src={current.incoming.image}
                alt={current.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
              <div className="absolute top-3 right-3 bg-primary text-on-primary-container px-2 py-0.5 rounded font-label-sm text-label-sm uppercase font-bold flex items-center gap-1 shadow">
                <Icon name="auto_awesome" size={12} />
                Nueva Plataforma
              </div>
              <span className="absolute bottom-3 left-3 bg-surface-container-lowest/80 backdrop-blur-md px-2.5 py-1 rounded font-label-sm text-label-sm text-primary uppercase font-bold border border-surface-container-high">
                MY{current.incoming.year} Press Pack
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="p-3.5 rounded-lg bg-surface-container-high border border-outline flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Icon name="tv" size={14} />
                    Instrumentación &amp; Tablero
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-tertiary/20 text-tertiary font-label-sm text-label-sm font-bold uppercase">
                    <Icon name="arrow_upward" size={12} />
                    {current.incoming.displayDiff}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface font-semibold">
                  {current.incoming.display}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-surface-container-high border border-outline flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Icon name="album" size={14} />
                    Sistema de Frenado
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/20 text-primary font-label-sm text-label-sm font-bold uppercase">
                    <Icon name="tune" size={12} />
                    {current.incoming.brakesDiff}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface font-semibold">
                  {current.incoming.brakes}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-surface-container-high border border-outline flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Icon name="memory" size={14} />
                    Electrónica &amp; Ayudas
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary text-on-surface font-label-sm text-label-sm font-bold uppercase">
                    <Icon name="stars" size={12} />
                    {current.incoming.electronicsDiff}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface font-semibold">
                  {current.incoming.electronics}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 bg-surface-container-high border border-outline rounded-lg p-4 flex items-center justify-between relative z-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                  Precio Nuevo Sugerido
                </span>
                <span className="font-label-sm text-label-sm text-tertiary font-bold">
                  {current.incoming.priceGrowth}
                </span>
              </div>
              <span className="font-headline-md text-headline-md text-primary font-bold">
                {current.incoming.priceCop}
              </span>
            </div>
            <div className="text-right">
              <span className="font-label-sm text-label-sm uppercase text-on-surface font-bold block">
                Disponibilidad Prevista
              </span>
              <span className="font-body-md text-body-md text-primary">
                {current.incoming.availability}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Homologation Checklist & Operational Readiness */}
      <div className="bg-surface-container-low border border-surface-container-high rounded-2xl p-6 sm:p-7 shadow-xl mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <Icon name="fact_check" size={20} />
            </div>
            <div className="flex flex-col">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                Lista de Comprobación Técnica de Homologación
              </h2>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Completitud del protocolo para autorizar la integración del catálogo {current.incoming.year}.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Progreso:</span>
            <div className="w-32 bg-outline-variant rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="font-label-sm text-label-sm text-primary font-bold">
              {completedCount} / {totalCount} ({progressPercent}%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {current.checklist.map((item) => (
            <label
              key={item.id}
              className="flex items-start gap-3 p-4 rounded-xl bg-surface-container border border-surface-container-high hover:border-outline-variant transition-all cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleToggleChecklist(item.id)}
                className="mt-1 h-5 w-5 rounded bg-surface-container-lowest border-outline-variant text-primary focus:ring-0 cursor-pointer accent-primary"
              />
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg text-on-surface font-bold flex items-center gap-2">
                  {item.title}
                  <span className={`px-2 py-0.5 rounded font-label-sm text-label-sm uppercase ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="bg-surface-container/90 backdrop-blur-xl border border-outline-variant rounded-2xl p-5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Icon name="verified_user" size={24} className="text-primary" />
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface font-bold">
              Estado del Expediente Técnico: {current.id.toUpperCase()}-2025-V1
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Al aprobar, la ficha {current.outgoing.year} pasará a archivo de inventario final y {current.incoming.year} será la vista por defecto.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => onToast('Solicitud Enviada', 'Se ha solicitado corrección al departamento técnico.', true)}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-error border border-error/30 font-label-lg text-label-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icon name="cancel" size={16} />
            Rechazar / Solicitar Corrección
          </button>
          <button
            type="button"
            onClick={() => onToast('Borrador Guardado', 'Expediente técnico archivado temporalmente.')}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant text-on-surface font-label-lg text-label-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icon name="save" size={16} />
            Guardar Borrador Técnico
          </button>
          <button
            type="button"
            onClick={handleApprove}
            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-lg bg-primary text-on-primary-container hover:bg-primary font-label-lg text-label-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icon name="published_with_changes" size={16} />
            Aprobar Modelo {current.incoming.year} y Sincronizar en Catálogo
          </button>
        </div>
      </div>
    </div>
  );
};
