import React, { useState } from 'react';
import { HomologationModel } from '../../../types';

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
      <div className="relative overflow-hidden bg-[#131b2e] border border-[#222a3d] rounded-2xl p-6 sm:p-8 shadow-xl mb-8">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#89ceff]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-32 bg-[#4edea3]/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-2 max-w-3xl">
            <div className="flex items-center gap-3 text-[#89ceff] font-label-sm text-label-sm uppercase tracking-widest">
              <span className="flex h-2 w-2 rounded-full bg-[#89ceff] animate-pulse"></span>
              <span>Operaciones de Inventario</span>
              <span className="text-[#3e4850]">/</span>
              <span>Homologación Técnica Anual</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-[#dae2fd] tracking-tight">
              Revisión y Comparador por Cambio de Año <span className="text-[#89ceff]">(2024 vs 2025)</span>
            </h1>
            <p className="font-body-md text-body-md text-[#bec8d2] leading-relaxed">
              Auditoría técnica de cambios mecánicos, equipamiento e instrumentación antes de sincronizar la vitrina pública y habilitar módulos de preventa digital.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onToast('Historial Consultado', '2 homologaciones completadas este trimestre.')}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#222a3d] hover:bg-[#31394d] border border-[#3e4850] text-[#dae2fd] font-label-lg text-label-lg transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">history</span>
              Historial de Homologaciones
            </button>
            <button
              type="button"
              onClick={handleApprove}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0ea5e9] text-[#003751] hover:bg-[#89ceff] font-label-lg text-label-lg font-bold shadow-lg transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">verified</span>
              Aprobar y Publicar Año 2025
            </button>
          </div>
        </div>
      </div>

      {/* Operational Alert Banner */}
      <div className="bg-[#171f33]/70 border border-[#2d3449] backdrop-blur-md rounded-xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-[#89ceff]/15 flex items-center justify-center text-[#89ceff] shrink-0 border border-[#89ceff]/30">
            <span className="material-symbols-outlined text-2xl">sync_problem</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg text-[#dae2fd] font-bold">
              Validación Técnica Pendiente
            </span>
            <span className="font-body-sm text-body-sm text-[#bec8d2]">
              {activeHomologations.filter((h) => !h.approved).length} modelos detectados con cambio de generación pendiente de validación técnica antes de release público.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#93000a]/40 border border-[#ffb4ab]/30 text-[#ffb4ab] font-label-sm text-label-sm uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] animate-ping"></span>
            Bloqueo de Vitrina Activo
          </span>
        </div>
      </div>

      {/* Model Comparison Selector Tabs */}
      <div className="flex flex-col gap-3 mb-6">
        <span className="font-label-sm text-label-sm uppercase text-[#bec8d2] tracking-wider">
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
                    ? 'bg-[#171f33] border-[#0ea5e9]'
                    : 'bg-[#131b2e] border-[#222a3d] hover:bg-[#171f33] opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#222a3d] text-[#89ceff]' : 'bg-[#171f33] text-[#bec8d2]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {h.name.includes('Ninja') ? 'speed' : 'two_wheeler'}
                    </span>
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-headline-sm text-headline-sm text-[#dae2fd] truncate">
                      {h.name}
                    </span>
                    <span className="font-label-sm text-label-sm text-[#89ceff] tracking-wide">
                      {h.subtitle}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded font-label-sm text-label-sm uppercase font-bold shrink-0 ml-2 ${
                    h.approved
                      ? 'bg-[#003824] text-[#4edea3]'
                      : isSelected
                      ? 'bg-[#0ea5e9] text-[#003751]'
                      : 'bg-[#222a3d] text-[#bec8d2]'
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
        <div className="bg-[#131b2e] border border-[#222a3d] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#222a3d] text-[#bec8d2] font-label-sm text-label-sm uppercase tracking-wider">
                  Versión Saliente
                </span>
                <span className="font-headline-sm text-headline-sm text-[#dae2fd]">
                  {current.name} ({current.outgoing.year})
                </span>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#93000a]/30 text-[#ffb4ab] border border-[#ffb4ab]/30 font-label-sm text-label-sm uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] mr-1.5"></span>
                {current.outgoing.badge}
              </span>
            </div>

            <div className="relative w-full h-56 rounded-lg overflow-hidden bg-[#060e20] border border-[#222a3d]">
              <img
                src={current.outgoing.image}
                alt={current.name}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-transparent to-transparent"></div>
              <span className="absolute bottom-3 left-3 bg-[#060e20]/80 backdrop-blur-md px-2.5 py-1 rounded font-label-sm text-label-sm text-[#bec8d2] uppercase border border-[#222a3d]">
                MY{current.outgoing.year} Spec Sheet
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="p-3.5 rounded-lg bg-[#171f33] border border-[#222a3d] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">tv</span>
                    Instrumentación &amp; Tablero
                  </span>
                  <span className="font-label-sm text-label-sm text-[#88929b]">Estándar</span>
                </div>
                <p className="font-body-md text-body-md text-[#dae2fd]">{current.outgoing.display}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#171f33] border border-[#222a3d] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">album</span>
                    Sistema de Frenado
                  </span>
                  <span className="font-label-sm text-label-sm text-[#88929b]">Básico</span>
                </div>
                <p className="font-body-md text-body-md text-[#dae2fd]">{current.outgoing.brakes}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#171f33] border border-[#222a3d] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">memory</span>
                    Electrónica &amp; Ayudas
                  </span>
                  <span className="font-label-sm text-label-sm text-[#88929b]">Mecánico</span>
                </div>
                <p className="font-body-md text-body-md text-[#dae2fd]">{current.outgoing.electronics}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 bg-[#171f33] border border-[#222a3d] rounded-lg p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase text-[#bec8d2]">Precio Anterior Base</span>
              <span className="font-headline-md text-headline-md text-[#dae2fd] font-bold">
                {current.outgoing.priceCop}
              </span>
            </div>
            <div className="text-right">
              <span className="font-label-sm text-label-sm uppercase text-[#ffb4ab] font-bold block">
                Inventario Remanente
              </span>
              <span className="font-body-md text-body-md text-[#bec8d2]">
                {current.outgoing.stockInfo}
              </span>
            </div>
          </div>
        </div>

        {/* Incoming Model Column */}
        <div className="bg-[#171f33] border border-[#0ea5e9]/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#0ea5e9]/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col gap-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#0ea5e9] text-[#003751] font-label-sm text-label-sm uppercase font-bold tracking-wider">
                  Nueva Versión Entrante
                </span>
                <span className="font-headline-sm text-headline-sm text-[#89ceff] font-bold">
                  {current.name} ({current.incoming.year})
                </span>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#00b17b]/30 text-[#4edea3] border border-[#4edea3]/40 font-label-sm text-label-sm uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] mr-1.5 shadow-[0_0_8px_#4edea3]"></span>
                {current.incoming.badge}
              </span>
            </div>

            <div className="relative w-full h-56 rounded-lg overflow-hidden bg-[#060e20] border border-[#222a3d]">
              <img
                src={current.incoming.image}
                alt={current.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171f33] via-transparent to-transparent"></div>
              <div className="absolute top-3 right-3 bg-[#0ea5e9] text-[#003751] px-2 py-0.5 rounded font-label-sm text-label-sm uppercase font-bold flex items-center gap-1 shadow">
                <span className="material-symbols-outlined text-xs">auto_awesome</span>
                Nueva Plataforma
              </div>
              <span className="absolute bottom-3 left-3 bg-[#060e20]/80 backdrop-blur-md px-2.5 py-1 rounded font-label-sm text-label-sm text-[#89ceff] uppercase font-bold border border-[#222a3d]">
                MY{current.incoming.year} Press Pack
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="p-3.5 rounded-lg bg-[#222a3d] border border-[#3e4850] flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-[#89ceff] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <span className="material-symbols-outlined text-sm">tv</span>
                    Instrumentación &amp; Tablero
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#4edea3]/20 text-[#4edea3] font-label-sm text-label-sm font-bold uppercase">
                    <span className="material-symbols-outlined text-xs">arrow_upward</span>
                    {current.incoming.displayDiff}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-[#dae2fd] font-semibold">
                  {current.incoming.display}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#222a3d] border border-[#3e4850] flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-[#89ceff] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <span className="material-symbols-outlined text-sm">album</span>
                    Sistema de Frenado
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#89ceff]/20 text-[#89ceff] font-label-sm text-label-sm font-bold uppercase">
                    <span className="material-symbols-outlined text-xs">tune</span>
                    {current.incoming.brakesDiff}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-[#dae2fd] font-semibold">
                  {current.incoming.brakes}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#222a3d] border border-[#3e4850] flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-[#89ceff] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <span className="material-symbols-outlined text-sm">memory</span>
                    Electrónica &amp; Ayudas
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#0053db] text-[#dbe1ff] font-label-sm text-label-sm font-bold uppercase">
                    <span className="material-symbols-outlined text-xs">stars</span>
                    {current.incoming.electronicsDiff}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-[#dae2fd] font-semibold">
                  {current.incoming.electronics}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 bg-[#222a3d] border border-[#3e4850] rounded-lg p-4 flex items-center justify-between relative z-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm uppercase text-[#bec8d2]">
                  Precio Nuevo Sugerido
                </span>
                <span className="font-label-sm text-label-sm text-[#4edea3] font-bold">
                  {current.incoming.priceGrowth}
                </span>
              </div>
              <span className="font-headline-md text-headline-md text-[#89ceff] font-bold">
                {current.incoming.priceCop}
              </span>
            </div>
            <div className="text-right">
              <span className="font-label-sm text-label-sm uppercase text-[#dae2fd] font-bold block">
                Disponibilidad Prevista
              </span>
              <span className="font-body-md text-body-md text-[#89ceff]">
                {current.incoming.availability}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Homologation Checklist & Operational Readiness */}
      <div className="bg-[#131b2e] border border-[#222a3d] rounded-2xl p-6 sm:p-7 shadow-xl mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#89ceff]/10 flex items-center justify-center text-[#89ceff] border border-[#89ceff]/20">
              <span className="material-symbols-outlined text-xl">fact_check</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-headline-sm text-headline-sm text-[#dae2fd]">
                Lista de Comprobación Técnica de Homologación
              </h2>
              <span className="font-body-sm text-body-sm text-[#bec8d2]">
                Completitud del protocolo para autorizar la integración del catálogo {current.incoming.year}.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase">Progreso:</span>
            <div className="w-32 bg-[#2d3449] rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-[#0ea5e9] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="font-label-sm text-label-sm text-[#89ceff] font-bold">
              {completedCount} / {totalCount} ({progressPercent}%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {current.checklist.map((item) => (
            <label
              key={item.id}
              className="flex items-start gap-3 p-4 rounded-xl bg-[#171f33] border border-[#222a3d] hover:border-[#2d3449] transition-all cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleToggleChecklist(item.id)}
                className="mt-1 h-5 w-5 rounded bg-[#060e20] border-[#2d3449] text-[#0ea5e9] focus:ring-0 cursor-pointer accent-[#0ea5e9]"
              />
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg text-[#dae2fd] font-bold flex items-center gap-2">
                  {item.title}
                  <span className={`px-2 py-0.5 rounded font-label-sm text-label-sm uppercase ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </span>
                <span className="font-body-sm text-body-sm text-[#bec8d2] mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="bg-[#171f33]/90 backdrop-blur-xl border border-[#2d3449] rounded-2xl p-5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#89ceff] text-2xl">verified_user</span>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-[#dae2fd] font-bold">
              Estado del Expediente Técnico: {current.id.toUpperCase()}-2025-V1
            </span>
            <span className="font-body-sm text-body-sm text-[#bec8d2]">
              Al aprobar, la ficha {current.outgoing.year} pasará a archivo de inventario final y {current.incoming.year} será la vista por defecto.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => onToast('Solicitud Enviada', 'Se ha solicitado corrección al departamento técnico.', true)}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#ffb4ab] border border-[#ffb4ab]/30 font-label-lg text-label-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">cancel</span>
            Rechazar / Solicitar Corrección
          </button>
          <button
            type="button"
            onClick={() => onToast('Borrador Guardado', 'Expediente técnico archivado temporalmente.')}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-[#060e20] hover:bg-[#131b2e] border border-[#2d3449] text-[#dae2fd] font-label-lg text-label-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">save</span>
            Guardar Borrador Técnico
          </button>
          <button
            type="button"
            onClick={handleApprove}
            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-lg bg-[#0ea5e9] text-[#003751] hover:bg-[#89ceff] font-label-lg text-label-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">published_with_changes</span>
            Aprobar Modelo {current.incoming.year} y Sincronizar en Catálogo
          </button>
        </div>
      </div>
    </div>
  );
};
