import React, { useState } from 'react';
import { Motorcycle } from '../types';
import { formatCop } from '../lib/formatters';

interface VehicleDetailPageProps {
  bike: Motorcycle;
  onBack: () => void;
  onOpenReserve: (bike: Motorcycle) => void;
  onOpenTestRide: (bike: Motorcycle) => void;
}

export const VehicleDetailPage: React.FC<VehicleDetailPageProps> = ({
  bike,
  onBack,
  onOpenReserve,
  onOpenTestRide,
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
    <div className="flex flex-col w-full bg-[#0b1326] min-h-[calc(100vh-80px)]">
      {/* Sub-Bar for Product Detail Navigation */}
      <section className="w-full bg-[#060e20]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-[#171f33]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="group flex items-center gap-2.5 text-[#bec8d2] hover:text-[#89ceff] transition-colors py-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            <span className="font-label-lg text-label-lg font-bold">Volver al Catálogo</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-[#171f33] border border-[#222a3d] px-3.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3] animate-pulse"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#dae2fd]">
                {bike.verifiedVin || 'Unidad Certificada de Fábrica'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#bec8d2] font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[#89ceff] text-base">verified</span>
              <span className="hidden md:inline">Garantía Oficial 3 Años Fábrica</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Header & Key Badge Strip */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#89ceff] font-bold">
                {bike.brandSubtitle || `${bike.brand} Official Performance`}
              </span>
              <span className="bg-[#171f33] border border-[#222a3d] px-2.5 py-0.5 rounded-full text-[#dbe1ff] font-label-sm text-label-sm">
                Modelo {bike.year}
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-[#dae2fd] tracking-tight font-extrabold uppercase flex flex-wrap items-baseline gap-3">
              {bike.name}
              <span className="font-headline-md text-headline-md text-[#bec8d2] font-normal">
                {bike.displacement}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-2 bg-[#131b2e] border border-[#222a3d] px-3.5 py-2 rounded-xl">
              <span className="font-body-sm text-body-sm text-[#bec8d2]">Chasis:</span>
              <span className="font-label-sm text-label-sm text-[#dae2fd] font-bold tracking-wider">
                {bike.chassis}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-[#003824]/50 border border-[#00b17b]/40 px-4 py-2 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] shadow-[0_0_10px_#4edea3]"></span>
              <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-[#4edea3]">
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
            <div className="relative w-full aspect-[16/10] bg-[#131b2e] border border-[#222a3d] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent opacity-80 pointer-events-none z-10"></div>
              <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#0ea5e9]/10 blur-3xl pointer-events-none"></div>

              <img
                src={activeSlide?.url}
                alt={`${bike.name} - ${activeSlide?.title}`}
                className="w-full h-full object-cover transition-all duration-500 ease-out z-0 group-hover:scale-105"
              />

              {/* View Overlay Chips */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="bg-[#060e20]/80 backdrop-blur-md px-3 py-1 rounded-md text-[#dae2fd] font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1.5 border border-[#222a3d]">
                  <span className="material-symbols-outlined text-[#89ceff] text-sm">photo_camera</span>
                  <span>{activeSlide?.title}</span>
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-[#dae2fd] pointer-events-none">
                <span className="font-body-sm text-body-sm bg-[#060e20]/80 backdrop-blur-sm px-2.5 py-1 rounded border border-[#222a3d]">
                  Resolución Óptica HD 4K
                </span>
                <div className="flex items-center gap-1.5 pointer-events-auto">
                  <button
                    onClick={handlePrevSlide}
                    className="w-8 h-8 rounded-lg bg-[#171f33]/80 hover:bg-[#0ea5e9] hover:text-[#003751] transition-colors flex items-center justify-center text-[#dae2fd] border border-[#2d3449] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">chevron_left</span>
                  </button>
                  <span className="font-label-sm text-label-sm px-2 text-[#bec8d2]">
                    {activeSlideIndex + 1} / {bike.slides.length}
                  </span>
                  <button
                    onClick={handleNextSlide}
                    className="w-8 h-8 rounded-lg bg-[#171f33]/80 hover:bg-[#0ea5e9] hover:text-[#003751] transition-colors flex items-center justify-center text-[#dae2fd] border border-[#2d3449] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">chevron_right</span>
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
                        ? 'bg-[#222a3d] ring-2 ring-[#0ea5e9]'
                        : 'bg-[#171f33] hover:bg-[#222a3d] border border-[#222a3d]'
                    }`}
                  >
                    <div className="w-full aspect-[4/3] rounded bg-[#060e20] overflow-hidden mb-1.5">
                      <img
                        src={slide.url}
                        alt={slide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="font-label-sm text-label-sm text-[#dae2fd] truncate">
                      {slide.title.split(' ')[0]} {slide.title.split(' ')[1] || ''}
                    </span>
                    <span className="font-body-sm text-body-sm text-[#bec8d2] text-[10px] leading-tight truncate">
                      Vista #{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Visual Feature Banner */}
            <div className="bg-[#131b2e] border border-[#222a3d] p-4 rounded-xl flex items-center justify-between gap-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0ea5e9]/20 flex items-center justify-center text-[#89ceff]">
                  <span className="material-symbols-outlined text-xl">speed</span>
                </div>
                <div>
                  <p className="font-label-lg text-label-lg text-[#dae2fd] font-bold">
                    Potencia y Par de Fábrica
                  </p>
                  <p className="font-body-sm text-body-sm text-[#bec8d2]">
                    {bike.power} · Par motor pico de {bike.torque}
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <span className="font-spec-data text-spec-data text-[#89ceff]">0-100 km/h</span>
                <span className="block font-label-sm text-label-sm text-[#bec8d2]">
                  {bike.acceleration}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Commercial Pricing, Colors & CTAs (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Pricing Card Container */}
            <div className="bg-[#131b2e] border border-[#222a3d] p-6 rounded-xl shadow-xl flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#bec8d2] font-bold">
                  Liquidación Comercial {bike.year}
                </span>
                <span className="font-label-sm text-label-sm bg-[#171f33] text-[#89ceff] px-2.5 py-1 rounded border border-[#222a3d]">
                  Tasa Preferencial 0.99% M.V.
                </span>
              </div>

              {/* Price Level 1: Sin Papeles */}
              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="font-body-md text-body-md text-[#bec8d2]">
                    Precio Base (Sin Papeles):
                  </span>
                  <span className="font-headline-sm text-headline-sm text-[#dae2fd] font-semibold">
                    {formatCop(bike.priceRawCop)}
                  </span>
                </div>
                <div className="flex justify-end">
                  <span className="font-body-sm text-body-sm text-[#bec8d2] font-mono">
      
                  </span>
                </div>
              </div>

              {/* Separator / Highlight Box: Con Papeles */}
              <div className="bg-[#171f33] border border-[#0ea5e9]/40 p-4 rounded-xl flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#89ceff] text-lg">fact_check</span>
                    <span className="font-label-lg text-label-lg text-[#dae2fd] font-bold">
                      Precio &apos;Listo para Rodar&apos;
                    </span>
                  </div>
                  <span className="font-headline-md text-headline-md text-[#89ceff] font-extrabold tracking-tight">
                    {formatCop(bike.priceDocsCop)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#bec8d2] font-body-sm text-body-sm">
                  <span>(Matrícula + SOAT + Trámites Departamentales)</span>
                  <span className="font-mono text-[#dae2fd] font-bold">
                    {formatCop(bike.priceDocsCop - bike.priceRawCop)}
                  </span>
                </div>

                {/* Detailed Breakdown List */}
                <div className="mt-2 pt-2 bg-[#060e20]/60 p-3 rounded-lg space-y-1.5 font-body-sm text-body-sm text-[#bec8d2] border border-[#222a3d]/50">
                  <div className="flex justify-between">
                    <span>· Matrícula Oficial RUNT y Placa:</span>
                    <span className="text-[#dae2fd] font-medium">Incluido</span>
                  </div>
                  <div className="flex justify-between">
                    <span>· Póliza SOAT Vigencia 1 Año:</span>
                    <span className="text-[#dae2fd] font-medium">Incluido</span>
                  </div>
                  <div className="flex justify-between">
                    <span>· Impuesto Departamental de Rodamiento:</span>
                    <span className="text-[#dae2fd] font-medium">Liquidado {bike.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>· Alistamiento Pre-Entrega &amp; Telemetría PDI:</span>
                    <span className="text-[#4edea3] font-bold">Cortesía Apex</span>
                  </div>
                </div>
              </div>

              {/* Color Swatch & Unit Allocation Selector */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-[#dae2fd] font-bold">
                    Variante de Color &amp; Asignación:
                  </label>
                  <span className="font-label-sm text-label-sm text-[#89ceff] font-bold">
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
                            ? 'bg-[#222a3d] border border-[#0ea5e9]'
                            : 'bg-[#171f33]/60 hover:bg-[#171f33] border border-[#222a3d]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            style={{ backgroundColor: color.colorHex }}
                            className="w-5 h-5 rounded-full shadow-sm ring-1 ring-white/20"
                          ></span>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-[#dae2fd] font-bold">
                              {color.name}
                            </span>
                            <span className="font-body-sm text-body-sm text-[#bec8d2] text-xs">
                              {color.code}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#131b2e]">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              color.status === 'disponible'
                                ? 'bg-[#4edea3]'
                                : color.status === 'espera'
                                ? 'bg-[#b4c5ff]'
                                : 'bg-[#ffb4ab]'
                            }`}
                          ></span>
                          <span
                            className={`font-label-sm text-label-sm font-bold ${
                              color.status === 'disponible'
                                ? 'text-[#4edea3]'
                                : color.status === 'espera'
                                ? 'text-[#b4c5ff]'
                                : 'text-[#ffb4ab]'
                            }`}
                          >
                            {color.stock > 0
                              ? `${color.stock} Unid. Disponibles`
                              : color.transitStock
                              ? `En Tránsito (${color.transitStock} uds)`
                              : 'Agotada / Reserva'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Primary & Secondary Call to Actions */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={() => onOpenReserve(bike)}
                  className="w-full bg-[#0ea5e9] hover:bg-[#0053db] text-[#003751] hover:text-[#cdd7ff] font-label-lg text-label-lg py-3.5 px-6 rounded-lg font-bold flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">lock_open</span>
                  <span>Reservar Unidad Garantizada</span>
                </button>
                <button
                  onClick={() => onOpenTestRide(bike)}
                  className="w-full bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-label-lg text-label-lg py-3.5 px-6 rounded-lg font-bold flex items-center justify-center gap-2.5 transition-colors cursor-pointer border border-[#3e4850]"
                >
                  <span className="material-symbols-outlined text-[#89ceff] text-xl">
                    sports_motorsports
                  </span>
                  <span>Agendar Prueba de Manejo (Test Ride)</span>
                </button>
              </div>

              {/* Trust & Immediate Handover Notes */}
              <div className="flex items-start gap-3 pt-2 text-[#bec8d2] font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[#4edea3] text-lg shrink-0 pt-0.5">
                  verified_user
                </span>
                <p>
                  <strong className="text-[#dae2fd]">Entrega inmediata en sala:</strong> Despacho en 48
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
          <div className="lg:col-span-7 bg-[#131b2e] border border-[#222a3d] p-6 sm:p-8 rounded-xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#222a3d]">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#89ceff] text-2xl">tune</span>
                  <h2 className="font-headline-sm text-headline-sm text-[#dae2fd] font-bold uppercase tracking-tight">
                    Características de Fábrica
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-[#bec8d2] font-mono">
                  SPEC SHEET REV. {bike.year}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-[#171f33] p-4 rounded-lg flex flex-col gap-1 border border-[#222a3d]/50">
                  <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                    Cilindraje / Motor
                  </span>
                  <span className="font-spec-data text-spec-data text-[#dae2fd]">
                    {bike.displacement}
                  </span>
                  <span className="font-body-sm text-body-sm text-[#bec8d2]">
                    Refrigeración líquida DOHC de alto rendimiento
                  </span>
                </div>

                <div className="bg-[#171f33] p-4 rounded-lg flex flex-col gap-1 border border-[#222a3d]/50">
                  <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                    Potencia Máxima
                  </span>
                  <span className="font-spec-data text-spec-data text-[#89ceff]">{bike.power}</span>
                  <span className="font-body-sm text-body-sm text-[#bec8d2]">
                    Par motor pico: {bike.torque}
                  </span>
                </div>

                <div className="bg-[#171f33] p-4 rounded-lg flex flex-col gap-1 border border-[#222a3d]/50">
                  <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                    Sistema de Frenado
                  </span>
                  <span className="font-spec-data text-spec-data text-[#dae2fd]">{bike.brakes}</span>
                  <span className="font-body-sm text-body-sm text-[#bec8d2]">
                    ABS Cornering con unidad inercial multieje
                  </span>
                </div>

                <div className="bg-[#171f33] p-4 rounded-lg flex flex-col gap-1 border border-[#222a3d]/50">
                  <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                    Peso en Orden de Marcha
                  </span>
                  <span className="font-spec-data text-spec-data text-[#dae2fd]">{bike.weight}</span>
                  <span className="font-body-sm text-body-sm text-[#bec8d2]">
                    Distribución de masas centrada
                  </span>
                </div>

                <div className="bg-[#171f33] p-4 rounded-lg flex flex-col gap-1 sm:col-span-2 border border-[#222a3d]/50">
                  <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                    Transmisión &amp; Embrague
                  </span>
                  <span className="font-spec-data text-spec-data text-[#dae2fd]">
                    {bike.transmission}
                  </span>
                  <span className="font-body-sm text-body-sm text-[#bec8d2]">
                    Relación de marchas optimizada para aceleración inmediata y crucero en autopista
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 bg-[#171f33]/60 p-4 rounded-lg flex flex-wrap items-center justify-between gap-4 font-body-sm text-body-sm border border-[#222a3d]">
              <div className="flex items-center gap-2 text-[#dae2fd]">
                <span className="material-symbols-outlined text-[#4edea3] text-base">eco</span>
                <span>
                  Normativa de Emisiones: <strong className="text-[#4edea3]">{bike.emissions}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#dae2fd]">
                <span className="material-symbols-outlined text-[#89ceff] text-base">local_gas_station</span>
                <span>
                  Consumo Promedio: <strong>{bike.consumption}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* SP Model Specific Exclusive Features (5 Cols) */}
          <div className="lg:col-span-5 bg-[#171f33] border border-[#222a3d] p-6 sm:p-8 rounded-xl shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#222a3d]">
                <span className="material-symbols-outlined text-[#4edea3] text-2xl">stars</span>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-[#dae2fd] font-bold uppercase tracking-tight">
                    Equipamiento Exclusivo {bike.name.includes('SP') ? 'SP' : 'Premium'}
                  </h2>
                  <p className="font-body-sm text-body-sm text-[#bec8d2]">
                    Mejoras mecánicas y electrónicas instaladas en fábrica
                  </p>
                </div>
              </div>

              <ul className="space-y-3 pt-2">
                {bike.extras.map((extra, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 bg-[#131b2e] p-3.5 rounded-lg border border-[#222a3d]"
                  >
                    <span className="material-symbols-outlined text-[#4edea3] text-xl shrink-0 pt-0.5">
                      check_circle
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-[#dae2fd] font-bold">
                        {extra}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 p-3.5 bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 rounded-lg flex items-center gap-3">
              <span className="material-symbols-outlined text-[#89ceff] text-xl">smart_toy</span>
              <span className="font-body-sm text-body-sm text-[#89ceff] font-semibold">
                Homologación oficial Apex Dealership Network garantizada con ficha técnica RUNT.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
