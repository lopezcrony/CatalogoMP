import React, { useState } from 'react';
import { Motorcycle } from '../types';
import { formatCop } from '../lib/formatters';
import { Icon } from './Icon';

interface VehicleDetailPageProps {
  bike: Motorcycle;
  onBack: () => void;
}

export const VehicleDetailPage: React.FC<VehicleDetailPageProps> = ({
  bike,
  onBack,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(bike.colors[0]?.name || '');

  const activeSlide = bike.slides[activeSlideIndex] || bike.slides[0];
  const activeColorObj = bike.colors.find((c) => c.name === selectedColor) || bike.colors[0];

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + bike.slides.length) % bike.slides.length);
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % bike.slides.length);
  };


  return (
    <div className="flex flex-col w-full bg-surface min-h-[calc(100vh-80px)]">
      {/* Sub-Bar for Product Detail Navigation */}
      <section className="w-full bg-surface-container-lowest/90 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-surface-container">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="group flex items-center gap-2.5 text-on-surface-variant hover:text-primary transition-colors py-1 cursor-pointer"
          >
            <Icon name="arrow_back" size={18} className="transition-transform group-hover:-translate-x-1" />
            <span className="font-label-lg text-label-lg font-bold">Volver al Catálogo</span>
          </button>
         
        </div>
      </section>

      {/* Product Header & Key Badge Strip */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                {bike.brandSubtitle || `${bike.brand} Official Performance`}
              </span>
              <span className="bg-surface-container border border-surface-container-high px-2.5 py-0.5 rounded-full text-on-surface font-label-sm text-label-sm">
                Modelo {bike.year}
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-extrabold uppercase flex flex-wrap items-baseline gap-3">
              {bike.name}
              <span className="font-headline-md text-headline-md text-on-surface-variant font-normal">
                {bike.displacement}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-2 bg-surface-container-low border border-surface-container-high px-3.5 py-2 rounded-xl">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Chasis:</span>
              <span className="font-label-sm text-label-sm text-on-surface font-bold tracking-wider">
                {bike.chassis}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-tertiary-container/50 border border-tertiary/40 px-4 py-2 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_10px_rgba(21,128,61,0.35)]"></span>
              <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-tertiary">
                {bike.badge || 'Disponible en Sala'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Showcase Grid: Gallery & Commercial Breakdown */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Large High-Resolution Viewer */}
            <div className="relative w-full aspect-[16/10] bg-surface-container-low border border-surface-container-high rounded-xl overflow-hidden shadow-2xl flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80 pointer-events-none z-10"></div>
              <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>

              <img
                src={activeSlide?.url}
                alt={`${bike.name} - ${activeSlide?.title}`}
                className="w-full h-full object-cover transition-all duration-500 ease-out z-0 group-hover:scale-105"
              />

              {/* View Overlay Chips */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 rounded-md text-on-surface font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1.5 border border-surface-container-high">
                  <Icon name="photo_camera" size={16} className="text-primary" />
                  <span>{activeSlide?.title}</span>
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-on-surface pointer-events-none">
                <span className="font-body-sm text-body-sm bg-surface-container-lowest/80 backdrop-blur-sm px-2.5 py-1 rounded border border-surface-container-high">
                  Resolución Óptica HD 4K
                </span>
                <div className="flex items-center gap-1.5 pointer-events-auto">
                  <button
                    onClick={handlePrevSlide}
                    className="w-8 h-8 rounded-lg bg-surface-container/80 hover:bg-primary hover:text-on-primary-container transition-colors flex items-center justify-center text-on-surface border border-outline-variant cursor-pointer"
                  >
                    <Icon name="chevron_left" size={16} />
                  </button>
                  <span className="font-label-sm text-label-sm px-2 text-on-surface-variant">
                    {activeSlideIndex + 1} / {bike.slides.length}
                  </span>
                  <button
                    onClick={handleNextSlide}
                    className="w-8 h-8 rounded-lg bg-surface-container/80 hover:bg-primary hover:text-on-primary-container transition-colors flex items-center justify-center text-on-surface border border-outline-variant cursor-pointer"
                  >
                    <Icon name="chevron_right" size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* 6 Interactive Thumbnails Strip */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {bike.slides.map((slide, idx) => {
                const isActive = idx === activeSlideIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`flex flex-col p-1.5 rounded-lg text-left transition-all group cursor-pointer ${
                      isActive
                        ? 'bg-surface-container-high ring-2 ring-primary'
                        : 'bg-surface-container hover:bg-surface-container-high border border-surface-container-high'
                    }`}
                  >
                    <div className="w-full aspect-[4/3] rounded bg-surface-container-lowest overflow-hidden mb-1.5">
                      <img
                        src={slide.url}
                        alt={slide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface truncate">
                      {slide.title.split(' ')[0]} {slide.title.split(' ')[1] || ''}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-[10px] leading-tight truncate">
                      Vista #{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Visual Feature Banner */}
            <div className="bg-surface-container-low border border-surface-container-high p-4 rounded-xl flex items-center justify-between gap-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <Icon name="speed" size={20} />
                </div>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface font-bold">
                    Potencia y Par de Fábrica
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {bike.power} · Par motor pico de {bike.torque}
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <span className="font-spec-data text-spec-data text-primary">0-100 km/h</span>
                <span className="block font-label-sm text-label-sm text-on-surface-variant">
                  {bike.acceleration}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Commercial Pricing, Colors & CTAs (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Pricing Card Container */}
            <div className="bg-surface-container-low border border-surface-container-high p-6 rounded-xl shadow-xl flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  Liquidación Comercial {bike.year}
                </span>
                <span className="font-label-sm text-label-sm bg-surface-container text-primary px-2.5 py-1 rounded border border-surface-container-high">
                  Tasa Preferencial 0.99% M.V.
                </span>
              </div>

              {/* Price Level 1: Sin Papeles */}
              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    Precio Base (Sin Papeles):
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    {formatCop(bike.priceRawCop)}
                  </span>
                </div>
                <div className="flex justify-end">
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
      
                  </span>
                </div>
              </div>

              {/* Separator / Highlight Box: Con Papeles */}
              <div className="bg-surface-container border border-primary/40 p-4 rounded-xl flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon name="fact_check" size={18} className="text-primary" />
                    <span className="font-label-lg text-label-lg text-on-surface font-bold">
                      Precio &apos;Listo para Rodar&apos;
                    </span>
                  </div>
                  <span className="font-headline-md text-headline-md text-primary font-extrabold tracking-tight">
                    {formatCop(bike.priceDocsCop)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm">
                  <span>(Matrícula + SOAT + Trámites Departamentales)</span>
                  <span className="font-mono text-on-surface font-bold">
                    {formatCop(bike.priceDocsCop - bike.priceRawCop)}
                  </span>
                </div>

                {/* Detailed Breakdown List */}
                <div className="mt-2 pt-2 bg-surface-container-lowest/60 p-3 rounded-lg space-y-1.5 font-body-sm text-body-sm text-on-surface-variant border border-surface-container-high/50">
                  <div className="flex justify-between">
                    <span>· Matrícula Oficial RUNT y Placa:</span>
                    <span className="text-on-surface font-medium">Incluido</span>
                  </div>
                  <div className="flex justify-between">
                    <span>· Póliza SOAT Vigencia 1 Año:</span>
                    <span className="text-on-surface font-medium">Incluido</span>
                  </div>
                  <div className="flex justify-between">
                    <span>· Impuesto Departamental de Rodamiento:</span>
                    <span className="text-on-surface font-medium">Liquidado {bike.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>· Alistamiento Pre-Entrega &amp; Telemetría PDI:</span>
                    <span className="text-tertiary font-bold">Cortesía Apex</span>
                  </div>
                </div>
              </div>

              {/* Color Swatch & Unit Allocation Selector */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">
                    Variante de Color &amp; Asignación:
                  </label>
                  <span className="font-label-sm text-label-sm text-primary font-bold">
                    {activeColorObj?.name}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {bike.colors.map((color) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <div
                        key={color.id}
                        onClick={() => setSelectedColor(color.name)}
                        className={`p-3 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-surface-container-high border border-primary'
                            : 'bg-surface-container/60 hover:bg-surface-container border border-surface-container-high'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            style={{ backgroundColor: color.colorHex }}
                            className="w-5 h-5 rounded-full shadow-sm ring-1 ring-white/20"
                          ></span>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface font-bold">
                              {color.name}
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                              {color.code}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-low">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              color.status === 'disponible'
                                ? 'bg-tertiary'
                                : color.status === 'espera'
                                ? 'bg-primary'
                                : 'bg-error'
                            }`}
                          ></span>
                          <span
                            className={`font-label-sm text-label-sm font-bold ${
                              color.status === 'disponible'
                                ? 'text-tertiary'
                                : color.status === 'espera'
                                ? 'text-primary'
                                : 'text-error'
                            }`}
                          >
                            {color.stock > 0
                              ? `${color.stock} Unid. Disponibles`
                              : color.transitStock
                              ? `En Tránsito (${color.transitStock} uds)`
                              : 'Agotada'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Trust & Immediate Handover Notes */}
              <div className="flex items-start gap-3 pt-2 text-on-surface-variant font-body-sm text-body-sm">
                <Icon name="verified_user" size={18} className="text-tertiary shrink-0 mt-0.5" />
                <p>
                  <strong className="text-on-surface">Entrega inmediata en sala:</strong> Despacho en 48
                  horas tras aprobación de matrícula. Respaldado por {bike.brand} Motor Corporation y red
                  autorizada Apex.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specification Matrix & Exclusive Features */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Factory Standard Specifications (7 Cols) */}
          <div className="lg:col-span-7 bg-surface-container-low border border-surface-container-high p-6 sm:p-8 rounded-xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
                <div className="flex items-center gap-2.5">
                  <Icon name="tune" size={24} className="text-primary" />
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold uppercase tracking-tight">
                    Características de Fábrica
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                  SPEC SHEET REV. {bike.year}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-surface-container p-4 rounded-lg flex flex-col gap-1 border border-surface-container-high/50">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Cilindraje / Motor
                  </span>
                  <span className="font-spec-data text-spec-data text-on-surface">
                    {bike.displacement}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Refrigeración líquida DOHC de alto rendimiento
                  </span>
                </div>

                <div className="bg-surface-container p-4 rounded-lg flex flex-col gap-1 border border-surface-container-high/50">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Potencia Máxima
                  </span>
                  <span className="font-spec-data text-spec-data text-primary">{bike.power}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Par motor pico: {bike.torque}
                  </span>
                </div>

                <div className="bg-surface-container p-4 rounded-lg flex flex-col gap-1 border border-surface-container-high/50">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Sistema de Frenado
                  </span>
                  <span className="font-spec-data text-spec-data text-on-surface">{bike.brakes}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    ABS Cornering con unidad inercial multieje
                  </span>
                </div>

                <div className="bg-surface-container p-4 rounded-lg flex flex-col gap-1 border border-surface-container-high/50">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Peso en Orden de Marcha
                  </span>
                  <span className="font-spec-data text-spec-data text-on-surface">{bike.weight}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Distribución de masas centrada
                  </span>
                </div>

                <div className="bg-surface-container p-4 rounded-lg flex flex-col gap-1 sm:col-span-2 border border-surface-container-high/50">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Transmisión &amp; Embrague
                  </span>
                  <span className="font-spec-data text-spec-data text-on-surface">
                    {bike.transmission}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Relación de marchas optimizada para aceleración inmediata y crucero en autopista
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 bg-surface-container/60 p-4 rounded-lg flex flex-wrap items-center justify-between gap-4 font-body-sm text-body-sm border border-surface-container-high">
              <div className="flex items-center gap-2 text-on-surface">
                <Icon name="eco" size={16} className="text-tertiary" />
                <span>
                  Normativa de Emisiones: <strong className="text-tertiary">{bike.emissions}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-on-surface">
                <Icon name="local_gas_station" size={16} className="text-primary" />
                <span>
                  Consumo Promedio: <strong>{bike.consumption}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* SP Model Specific Exclusive Features (5 Cols) */}
          <div className="lg:col-span-5 bg-surface-container border border-surface-container-high p-6 sm:p-8 rounded-xl shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-surface-container-high">
                <Icon name="stars" size={24} className="text-tertiary" />
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold uppercase tracking-tight">
                    Equipamiento Exclusivo {bike.name.includes('SP') ? 'SP' : 'Premium'}
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Mejoras mecánicas y electrónicas instaladas en fábrica
                  </p>
                </div>
              </div>

              <ul className="space-y-3 pt-2">
                {bike.extras.map((extra, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 bg-surface-container-low p-3.5 rounded-lg border border-surface-container-high"
                  >
                    <Icon name="check_circle" size={20} className="text-tertiary shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface font-bold">
                        {extra}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 p-3.5 bg-primary/10 border border-primary/30 rounded-lg flex items-center gap-3">
              <Icon name="smart_toy" size={20} className="text-primary" />
              <span className="font-body-sm text-body-sm text-primary font-semibold">
                Homologación oficial Apex Dealership Network garantizada con ficha técnica RUNT.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
