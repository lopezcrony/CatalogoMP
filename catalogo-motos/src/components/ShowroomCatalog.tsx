import React from 'react';
import { Motorcycle } from '../types';
import { MotorcycleCard } from '../features/catalog/components/MotorcycleCard';
import {
  CATALOG_BRANDS,
  CATALOG_DISPLACEMENTS,
  CATALOG_STATUSES,
} from '../features/catalog/catalog.constants';
import { useCatalogFilters } from '../features/catalog/hooks/useCatalogFilters';

interface ShowroomCatalogProps {
  motorcycles: Motorcycle[];
  onSelectBikeForDetail: (bike: Motorcycle) => void;
  onOpenPreorder: (bike: Motorcycle) => void;
  onOpenTestRide: (bike: Motorcycle) => void;
  onOpenNotify: (bike: Motorcycle) => void;
}

export const ShowroomCatalog: React.FC<ShowroomCatalogProps> = ({
  motorcycles,
  onSelectBikeForDetail,
  onOpenPreorder,
  onOpenTestRide,
  onOpenNotify,
}) => {
  const {
    searchQuery,
    setSearchQuery,
    selectedBrand,
    setSelectedBrand,
    selectedStatus,
    setSelectedStatus,
    filteredBikes,
    resetFilters,
  } = useCatalogFilters(motorcycles);

  return (
    <div className="flex flex-col w-full">
      {/* Dynamic Telemetry Control Bar / Subheader */}
      <section className="w-full bg-[#060e20] border-b border-[#171f33] px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Breadcrumb & Telemetry Count */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#bec8d2] font-label-sm text-label-sm uppercase tracking-wider mb-1">
                <span className="hover:text-[#89ceff] transition-colors cursor-pointer">Inicio</span>
                <span>/</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-[#dae2fd] tracking-tight uppercase">
                Vitrina Digital de Motocicletas
              </h1>
            </div>

            {/* Real-time Units Counter Badge */}
            <div className="flex items-center gap-4 bg-[#171f33] border border-[#222a3d] px-4 py-2.5 rounded-lg self-start md:self-auto shadow-sm">
              <div className="relative flex items-center justify-center w-3 h-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                  Inventario en Red
                </span>
                <span className="font-spec-data text-spec-data text-[#dae2fd]">
                  Mostrando <strong className="text-[#89ceff]">{filteredBikes.length}</strong> motos en exhibición
                </span>
              </div>
              <button
                onClick={() => {
                  resetFilters();
                }}
                className="ml-2 p-1.5 hover:bg-[#31394d] rounded text-[#bec8d2] hover:text-[#89ceff] transition-colors cursor-pointer"
                title="Reiniciar filtros"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
              </button>
            </div>
          </div>

          {/* Quick Filter Matrix Bar */}
          <div className="bg-[#131b2e] border border-[#222a3d] p-4 lg:p-5 rounded-xl flex flex-col gap-5 shadow-lg">
            {/* Search and Brand Selector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-5 relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#bec8d2] text-lg pointer-events-none">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por modelo, motor, chasís o tecnología (ej. Quickshifter, Brembo, SP)..."
                  className="w-full bg-[#060e20] text-[#dae2fd] placeholder:text-[#88929b] font-body-md text-body-md pl-10 pr-10 py-2.5 rounded-lg border border-[#2d3449] focus:outline-none focus:border-[#0ea5e9] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#88929b] hover:text-[#dae2fd]"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                )}
              </div>

              {/* Brand Pills Strip */}
              <div className="lg:col-span-7 flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider shrink-0 mr-1">
                  Marca:
                </span>
                {CATALOG_BRANDS.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`font-label-md text-label-md px-3.5 py-1.5 rounded uppercase font-bold shrink-0 transition-all cursor-pointer ${
                      selectedBrand === brand
                        ? 'bg-[#89ceff] text-[#00344d] shadow-sm'
                        : 'bg-[#171f33] hover:bg-[#31394d] text-[#dae2fd] border border-[#222a3d]'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Multi-filter secondary parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-3 border-t border-[#222a3d]">
              {/* Status Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                  Estado de Disponibilidad:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {CATALOG_STATUSES.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setSelectedStatus(status.value)}
                      className={`font-label-sm text-label-sm px-2.5 py-1 rounded flex items-center gap-1.5 cursor-pointer ${
                        selectedStatus === status.value
                          ? 'bg-[#222a3d] text-[#89ceff] font-bold border border-[#0ea5e9]'
                          : 'bg-[#131b2e] hover:bg-[#171f33] text-[#bec8d2] border border-[#222a3d]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#89ceff]" />
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </section>

      {/* Main Motorcycle Catalog Showcase (Grid 3 Columns) */}
      <section className="w-full px-6 lg:px-12 py-10 bg-[#0b1326]">
        <div className="max-w-7xl mx-auto">
          {filteredBikes.length === 0 ? (
            <div className="p-16 text-center bg-[#131b2e] border border-[#222a3d] rounded-2xl flex flex-col items-center justify-center gap-3">
              <span className="material-symbols-outlined text-[#88929b] text-4xl">two_wheeler</span>
              <h3 className="font-headline-sm text-headline-sm text-[#dae2fd]">
                No se encontraron modelos con los filtros seleccionados
              </h3>
              <p className="font-body-md text-body-md text-[#bec8d2]">
                Prueba ajustando el término de búsqueda, la marca o los estados de disponibilidad.
              </p>
              <button
                onClick={() => {
                  resetFilters();
                }}
                className="mt-2 bg-[#0ea5e9] text-[#003751] font-label-md text-label-md px-4 py-2 rounded-lg font-bold"
              >
                Restablecer Catálogo Completo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBikes.map((bike) => (
                <MotorcycleCard
                  key={bike.id}
                  bike={bike}
                  onSelect={onSelectBikeForDetail}
                  onOpenPreorder={onOpenPreorder}
                  onOpenTestRide={onOpenTestRide}
                  onOpenNotify={onOpenNotify}
                />
              ))}
            </div>
          )}

          {/* Pagination & Telemetry Load Bar */}
          <div className="mt-12 bg-[#131b2e] border border-[#222a3d] p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#89ceff] text-xl">satellite_alt</span>
              <p className="font-body-sm text-body-sm text-[#bec8d2]">
                Actualización de stock y telemetría de puerto en tiempo real sincronizado hace{' '}
                <strong className="text-[#dae2fd]">3 minutos</strong>.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-[#171f33] hover:bg-[#222a3d] text-[#dae2fd] px-4 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-1 border border-[#2d3449]">
                <span className="material-symbols-outlined text-sm">west</span> Anterior
              </button>
              <button className="bg-[#89ceff] text-[#00344d] px-3.5 py-2 rounded-lg font-label-md text-label-md font-bold">
                1
              </button>
              <button className="bg-[#171f33] hover:bg-[#222a3d] text-[#dae2fd] px-3.5 py-2 rounded-lg font-label-md text-label-md transition-colors border border-[#2d3449]">
                2
              </button>
              <button className="bg-[#171f33] hover:bg-[#222a3d] text-[#dae2fd] px-4 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-1 border border-[#2d3449]">
                Siguiente <span className="material-symbols-outlined text-sm">east</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
