import React from 'react';
import { Motorcycle } from '../../../types';
import { Icon } from '../../../components/Icon';

interface AdminGeneralOverviewProps {
  motorcycles: Motorcycle[];
  onNavigateTab: (tab: string) => void;
  onOpenAddNew: () => void;
}

export const AdminGeneralOverview: React.FC<AdminGeneralOverviewProps> = ({
  motorcycles,
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
      <div className="bg-surface-container-low border border-surface-container-high p-6 lg:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary">
              Portal Central de Operaciones
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">
            Tablero General del Concesionario
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Visión ejecutiva de flota y homologaciones técnicas del catálogo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('homologacion')}
            className="flex items-center gap-2 bg-surface-container-high hover:bg-surface-container-highest border border-outline text-on-surface font-label-md text-label-md px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            <Icon name="published_with_changes" size={18} />
            Revisar Homologaciones
          </button>
          <button
            onClick={onOpenAddNew}
            className="flex items-center gap-2 bg-primary hover:bg-primary text-on-primary-container hover:text-on-primary font-label-md text-label-md font-bold px-5 py-2.5 rounded-lg shadow-md transition-all cursor-pointer"
          >
            <Icon name="add_circle" size={18} />
            + Agregar Nueva Moto
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-surface-container border border-surface-container-high p-5 rounded-xl flex flex-col justify-between">
          <span className="text-xs uppercase text-on-surface-variant font-semibold">Total Modelos Registrados</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-on-surface">{motorcycles.length}</span>
            <span className="text-xs text-primary font-bold">100% Homologadas</span>
          </div>
        </div>

        <div className="bg-surface-container border border-surface-container-high p-5 rounded-xl flex flex-col justify-between">
          <span className="text-xs uppercase text-on-surface-variant font-semibold">Motos Disponibles en Sala</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-tertiary">{disponibles}</span>
            <span className="text-xs text-tertiary font-bold">Entrega Inmediata</span>
          </div>
        </div>

        <div className="bg-surface-container border border-surface-container-high p-5 rounded-xl flex flex-col justify-between">
          <span className="text-xs uppercase text-on-surface-variant font-semibold">En Preventa / En Tránsito</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-primary">{enEspera}</span>
            <span className="text-xs text-primary">Cupos Activos</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-surface-container border border-surface-container-high p-6 rounded-2xl flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <Icon name="pie_chart" size={20} className="text-primary" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Distribución de Vitrina
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('inventario')}
                className="text-xs text-primary hover:underline"
              >
                Abrir Gestor
              </button>
            </div>

            <div className="space-y-4 pt-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Disponibles para Venta Inmediata</span>
                  <span className="text-tertiary font-bold">{disponibles} unidades</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-tertiary h-full"
                    style={{ width: `${(disponibles / motorcycles.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">En Preventa / En Tránsito</span>
                  <span className="text-primary font-bold">{enEspera} unidades</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full"
                    style={{ width: `${(enEspera / motorcycles.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">En Revisión Técnica / PDI</span>
                  <span className="text-primary font-bold">{enRevision} unidades</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full"
                    style={{ width: `${(enRevision / motorcycles.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Agotadas (Lead Magnet)</span>
                  <span className="text-error font-bold">{agotadas} unidades</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-error h-full"
                    style={{ width: `${(agotadas / motorcycles.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-surface-container-lowest rounded-xl border border-surface-container-high mt-4 flex items-center justify-between text-xs">
            <span className="text-on-surface-variant">Certificación SOC2 Tipo II</span>
            <span className="text-tertiary font-mono font-bold">Activo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
