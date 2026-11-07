import React from 'react';
import { Motorcycle, CustomerInquiry } from '../../../types';

interface AdminGeneralOverviewProps {
  motorcycles: Motorcycle[];
  inquiries: CustomerInquiry[];
  onNavigateTab: (tab: string) => void;
  onOpenAddNew: () => void;
}

export const AdminGeneralOverview: React.FC<AdminGeneralOverviewProps> = ({
  motorcycles,
  inquiries,
  onNavigateTab,
  onOpenAddNew,
}) => {
  const disponibles = motorcycles.filter((b) => b.status === 'disponible').length;
  const enEspera = motorcycles.filter((b) => b.status === 'espera').length;
  const agotadas = motorcycles.filter((b) => b.status === 'agotada').length;
  const enRevision = motorcycles.filter((b) => b.status === 'revision').length;

  return (
    <div className="flex flex-col w-full gap-8 pb-16 font-sans">
      {/* Banner */}
      <div className="bg-[#131b2e] border border-[#222a3d] p-6 lg:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#4edea3]">
              Portal Central de Operaciones
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-[#dae2fd]">
            Tablero General del Concesionario
          </h1>
          <p className="font-body-md text-body-md text-[#bec8d2]">
            Visión ejecutiva de flota, solicitudes de reserva online y homologaciones técnicas del catálogo 2024 / 2025.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('homologacion')}
            className="flex items-center gap-2 bg-[#222a3d] hover:bg-[#31394d] border border-[#3e4850] text-[#dae2fd] font-label-md text-label-md px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">published_with_changes</span>
            Revisar Homologaciones
          </button>
          <button
            onClick={onOpenAddNew}
            className="flex items-center gap-2 bg-[#0ea5e9] hover:bg-[#0053db] text-[#003751] hover:text-[#cdd7ff] font-label-md text-label-md font-bold px-5 py-2.5 rounded-lg shadow-md transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            + Agregar Nueva Moto
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#171f33] border border-[#222a3d] p-5 rounded-xl flex flex-col justify-between">
          <span className="text-xs uppercase text-[#bec8d2] font-semibold">Total Modelos Registrados</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-[#dae2fd]">{motorcycles.length}</span>
            <span className="text-xs text-[#89ceff] font-bold">100% Homologadas</span>
          </div>
        </div>

        <div className="bg-[#171f33] border border-[#222a3d] p-5 rounded-xl flex flex-col justify-between">
          <span className="text-xs uppercase text-[#bec8d2] font-semibold">Motos Disponibles en Sala</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-[#4edea3]">{disponibles}</span>
            <span className="text-xs text-[#4edea3] font-bold">Entrega Inmediata</span>
          </div>
        </div>

        <div className="bg-[#171f33] border border-[#222a3d] p-5 rounded-xl flex flex-col justify-between">
          <span className="text-xs uppercase text-[#bec8d2] font-semibold">En Preventa / En Tránsito</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-[#b4c5ff]">{enEspera}</span>
            <span className="text-xs text-[#89ceff]">Cupos Activos</span>
          </div>
        </div>

        <div className="bg-[#171f33] border border-[#222a3d] p-5 rounded-xl flex flex-col justify-between">
          <span className="text-xs uppercase text-[#bec8d2] font-semibold">Solicitudes &amp; Reservas Web</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-[#89ceff]">{inquiries.length}</span>
            <span className="text-xs text-[#4edea3] font-bold">Canal Digital</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Inquiries + Flota Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Inquiries List (7 cols) */}
        <div className="lg:col-span-7 bg-[#171f33] border border-[#222a3d] p-6 rounded-2xl flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#222a3d]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#89ceff] text-xl">assignment_turned_in</span>
                <h3 className="font-headline-sm text-headline-sm text-[#dae2fd]">
                  Últimas Solicitudes Recibidas
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('reservas')}
                className="text-xs text-[#89ceff] hover:underline"
              >
                Ver Todas ({inquiries.length})
              </button>
            </div>

            <div className="divide-y divide-[#222a3d] mt-2">
              {inquiries.slice(0, 4).map((inq) => (
                <div key={inq.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#222a3d] text-[#89ceff] flex items-center justify-center text-xs font-bold">
                      {inq.type === 'reserva' ? 'RES' : 'TEST'}
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-[#dae2fd] font-bold">{inq.clientName}</p>
                      <p className="text-xs text-[#bec8d2]">{inq.bikeName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-[#003824] text-[#4edea3]">
                      {inq.status}
                    </span>
                    <span className="block text-[10px] text-[#88929b]">{inq.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('reservas')}
            className="w-full mt-4 bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] py-2 rounded-lg text-xs font-semibold text-center transition-colors cursor-pointer"
          >
            Administrar Bandeja de Entrada de Reservas
          </button>
        </div>

        {/* Quick Flota Snapshot (5 cols) */}
        <div className="lg:col-span-5 bg-[#171f33] border border-[#222a3d] p-6 rounded-2xl flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#222a3d]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#89ceff] text-xl">pie_chart</span>
                <h3 className="font-headline-sm text-headline-sm text-[#dae2fd]">
                  Distribución de Vitrina
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('inventario')}
                className="text-xs text-[#89ceff] hover:underline"
              >
                Abrir Gestor
              </button>
            </div>

            <div className="space-y-4 pt-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#bec8d2]">Disponibles para Venta Inmediata</span>
                  <span className="text-[#4edea3] font-bold">{disponibles} unidades</span>
                </div>
                <div className="w-full bg-[#060e20] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#4edea3] h-full"
                    style={{ width: `${(disponibles / motorcycles.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#bec8d2]">En Preventa / En Tránsito</span>
                  <span className="text-[#b4c5ff] font-bold">{enEspera} unidades</span>
                </div>
                <div className="w-full bg-[#060e20] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#b4c5ff] h-full"
                    style={{ width: `${(enEspera / motorcycles.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#bec8d2]">En Revisión Técnica / PDI</span>
                  <span className="text-[#89ceff] font-bold">{enRevision} unidades</span>
                </div>
                <div className="w-full bg-[#060e20] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#89ceff] h-full"
                    style={{ width: `${(enRevision / motorcycles.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#bec8d2]">Agotadas (Lead Magnet)</span>
                  <span className="text-[#ffb4ab] font-bold">{agotadas} unidades</span>
                </div>
                <div className="w-full bg-[#060e20] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#ffb4ab] h-full"
                    style={{ width: `${(agotadas / motorcycles.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#060e20] rounded-xl border border-[#222a3d] mt-4 flex items-center justify-between text-xs">
            <span className="text-[#bec8d2]">Certificación SOC2 Tipo II</span>
            <span className="text-[#4edea3] font-mono font-bold">Activo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
