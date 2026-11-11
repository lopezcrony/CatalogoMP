import React from 'react';
import { Motorcycle } from '../types';
import { MotorcycleCard } from '../features/catalog/components/MotorcycleCard';
import {
  CATALOG_STATUSES,
} from '../features/catalog/catalog.constants';
import { useCatalogFilters } from '../features/catalog/hooks/useCatalogFilters';
import { Icon } from './Icon';

interface ShowroomCatalogProps {
  motorcycles: Motorcycle[];
  onSelectBikeForDetail: (bike: Motorcycle) => void;
}

export const ShowroomCatalog: React.FC<ShowroomCatalogProps> = ({
  motorcycles,
  onSelectBikeForDetail,
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
  const catalogBrands = ['Todas', ...new Set(motorcycles.map((motorcycle) => motorcycle.brand))];

  return (
    <div className="flex flex-col w-full">
      {/* Dynamic Telemetry Control Bar / Subheader */}
      <section className="w-full bg-surface-container-lowest border-b border-surface-container-high px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Breadcrumb & Telemetry Count */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-1">
                <span className="hover:text-primary transition-colors cursor-pointer">Inicio</span>
                <span>/</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight uppercase">
                Vitrina Digital de Motocicletas
              </h1>
            </div>

            {/* Real-time Units Counter Badge */}
            <div className="flex items-center gap-4 bg-surface-container border border-surface-container-high px-4 py-2.5 rounded-lg self-start md:self-auto shadow-sm">
              <div className="relative flex items-center justify-center w-3 h-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Inventario en Red
                </span>
                <span className="font-spec-data text-spec-data text-on-surface">
                  Mostrando <strong className="text-primary">{filteredBikes.length}</strong> motos en exhibición
                </span>
              </div>
              <button
                onClick={() => {
                  resetFilters();
                }}
                className="ml-2 p-1.5 hover:bg-surface-container-high rounded text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                title="Reiniciar filtros"
              >
                <Icon name="refresh" size={16} />
              </button>
            </div>
          </div>

          {/* Quick Filter Matrix Bar */}
          <div className="bg-surface-container-low border border-surface-container-high p-4 lg:p-5 rounded-xl flex flex-col gap-5 shadow-lg">
            {/* Search and Brand Selector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-5 relative">
                <Icon name="search" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por modelo, motor, chasís o tecnología (ej. Quickshifter, Brembo, SP)..."
                  className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md pl-10 pr-10 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:border-primary transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                  >
                    <Icon name="close" size={16} />
                  </button>
                )}
              </div>

              {/* Brand Pills Strip */}
              <div className="lg:col-span-7 flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider shrink-0 mr-1">
                  Marca:
                </span>
                {catalogBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`font-label-md text-label-md px-3.5 py-1.5 rounded uppercase font-bold shrink-0 transition-all cursor-pointer ${
                      selectedBrand === brand
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Multi-filter secondary parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-3 border-t border-surface-container-high">
              {/* Status Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Estado de Disponibilidad:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {CATALOG_STATUSES.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setSelectedStatus(status.value)}
                      className={`font-label-sm text-label-sm px-2.5 py-1 rounded flex items-center gap-1.5 cursor-pointer ${
                        selectedStatus === status.value
                          ? 'bg-primary-container text-on-primary-container font-bold border border-primary'
                          : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant border border-outline-variant'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
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
      <section className="w-full px-6 lg:px-12 py-10 bg-surface">
        <div className="max-w-7xl mx-auto">
          {filteredBikes.length === 0 ? (
            <div className="p-16 text-center bg-surface-container-low border border-surface-container-high rounded-2xl flex flex-col items-center justify-center gap-3">
              <Icon name="bike" size={40} className="text-outline" />
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                No se encontraron modelos con los filtros seleccionados
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Prueba ajustando el término de búsqueda, la marca o los estados de disponibilidad.
              </p>
              <button
                onClick={() => {
                  resetFilters();
                }}
                className="mt-2 bg-primary text-on-primary-container font-label-md text-label-md px-4 py-2 rounded-lg font-bold"
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
                />
              ))}
            </div>
          )}

          {/* Pagination & Telemetry Load Bar */}
          <div className="mt-12 bg-surface-container-low border border-surface-container-high p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <Icon name="refresh" size={20} className="text-primary" />
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Actualización de stock y telemetría de puerto en tiempo real sincronizado hace{' '}
                <strong className="text-on-surface">3 minutos</strong>.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-surface-container hover:bg-surface-container-high text-on-surface px-4 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-1 border border-outline-variant">
                <Icon name="arrow_back" size={16} /> Anterior
              </button>
              <button className="bg-primary text-on-primary-container px-3.5 py-2 rounded-lg font-label-md text-label-md font-bold">
                1
              </button>
              <button className="bg-surface-container hover:bg-surface-container-high text-on-surface px-3.5 py-2 rounded-lg font-label-md text-label-md transition-colors border border-outline-variant">
                2
              </button>
              <button className="bg-surface-container hover:bg-surface-container-high text-on-surface px-4 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-1 border border-outline-variant">
                Siguiente <Icon name="arrow_forward" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
