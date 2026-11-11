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
  const percentage = (value: number) => motorcycles.length === 0 ? 0 : (value / motorcycles.length) * 100;

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
          
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onOpenAddNew} className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-on-primary">
            <Icon name="add_circle" size={18} /> Agregar nueva moto
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-surface-container border border-surface-container-high p-5 rounded-xl flex flex-col justify-between">
          <span className="text-xs uppercase text-on-surface-variant font-semibold">Total Modelos Registrados</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-on-surface">{motorcycles.length}</span>
            <span className="text-xs text-on-surface-variant">Registros actuales</span>
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
          <span className="text-xs uppercase text-on-surface-variant font-semibold">En espera</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-primary">{enEspera}</span>
            <span className="text-xs text-primary">Pendientes de disponibilidad</span>
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
                    style={{ width: `${percentage(disponibles)}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">En espera</span>
                  <span className="text-primary font-bold">{enEspera} unidades</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full"
                    style={{ width: `${percentage(enEspera)}%` }}
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
                    style={{ width: `${percentage(enRevision)}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Agotadas visibles</span>
                  <span className="text-error font-bold">{agotadas} unidades</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-error h-full"
                    style={{ width: `${percentage(agotadas)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
