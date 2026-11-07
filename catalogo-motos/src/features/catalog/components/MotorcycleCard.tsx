import React from 'react';
import { Motorcycle } from '../../../types';
import { formatCop } from '../../../lib/formatters';
import { CatalogStatusBadge } from './CatalogStatusBadge';
import { MotorcycleGallery } from './MotorcycleGallery';
import { useMotorcycleCardState } from '../hooks/useMotorcycleCardState';

interface MotorcycleCardProps {
  bike: Motorcycle;
  onSelect: (bike: Motorcycle) => void;
  onOpenPreorder: (bike: Motorcycle) => void;
  onOpenTestRide: (bike: Motorcycle) => void;
  onOpenNotify: (bike: Motorcycle) => void;
}

export const MotorcycleCard: React.FC<MotorcycleCardProps> = ({
  bike,
  onSelect,
  onOpenPreorder,
  onOpenTestRide,
  onOpenNotify,
}) => {
  const cardState = useMotorcycleCardState();
  const activeColorName = cardState.selectedColor || bike.colors[0]?.name;
  const currentColor = bike.colors.find((color) => color.name === activeColorName) || bike.colors[0];

  return (
    <article className="bg-[#131b2e] border border-[#222a3d] hover:border-[#0ea5e9]/50 rounded-xl overflow-hidden flex flex-col justify-between group shadow-xl hover:shadow-[0_4px_24px_rgba(14,165,233,0.18)] transition-all duration-300">
      <div>
        <div className="p-5 pb-3 flex items-start justify-between gap-3">
          <div>
            <span className="font-label-sm text-label-sm text-[#89ceff] uppercase tracking-widest font-bold">
              {bike.brand}
            </span>
            <h3 className="font-headline-sm text-headline-sm text-[#dae2fd] tracking-tight uppercase leading-snug">
              {bike.name} <span className="text-[#bec8d2] text-sm font-normal">{bike.year}</span>
            </h3>
          </div>
          <CatalogStatusBadge status={bike.status} />
        </div>

        <MotorcycleGallery
          name={bike.name}
          displacement={bike.displacement}
          slides={bike.slides}
          activeSlideIndex={cardState.activeSlideIndex}
          onPrevious={() => cardState.previousSlide(bike.slides.length)}
          onNext={() => cardState.nextSlide(bike.slides.length)}
          onSelectSlide={cardState.selectSlide}
        />

        <div className="grid grid-cols-4 gap-2 px-5 py-3.5 bg-[#171f33] text-center border-b border-[#222a3d]">
          <Metric label="Cilindrada" value={bike.displacement} highlight />
          <Metric label="Potencia" value={bike.power.split('@')[0]} />
          <Metric label="Frenada" value={`${bike.brakes.split(' ')[0]} ${bike.brakes.split(' ')[1] || ''}`} />
          <Metric label="Peso" value={bike.weight.replace(' (En húmedo)', '')} />
        </div>

        <p className="px-5 pt-3.5 pb-2 font-body-sm text-body-sm text-[#bec8d2] line-clamp-2 leading-relaxed">
          {bike.description}
        </p>

        <div className="px-5 py-2.5 bg-[#222a3d]/40 rounded-lg mx-5 my-2 border border-[#222a3d]">
          <div className="flex items-center justify-between text-[#dae2fd] mb-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#bec8d2]">Color:</span>
            <span className="font-label-sm text-label-sm font-bold text-[#4edea3]">
              {currentColor?.name}: {currentColor?.statusText}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {bike.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => cardState.setSelectedColor(color.name)}
                style={{ backgroundColor: color.colorHex }}
                className={`w-6 h-6 rounded-full transition-transform hover:scale-110 cursor-pointer ${
                  activeColorName === color.name
                    ? 'ring-2 ring-[#0ea5e9] ring-offset-2 ring-offset-[#0b1326]'
                    : 'ring-1 ring-[#88929b]'
                }`}
                title={`${color.name} (${color.statusText})`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 pt-3 bg-[#060e20]/80 flex flex-col gap-3 border-t border-[#171f33]">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase block">Precio Oficial</span>
            <span className="font-headline-sm text-headline-sm text-[#dae2fd] font-bold">
              {formatCop(bike.priceRawCop)}
            </span>
          </div>
          <div className="text-right">
            <span className="font-label-sm text-label-sm text-[#89ceff] uppercase block">Financiamiento Apex</span>
            <span className="font-body-sm text-body-sm text-[#dae2fd] font-bold">
              Desde {formatCop(bike.monthlyFinanceCop)} / mes
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          {bike.status === 'disponible' && (
            <div className="grid grid-cols-2 gap-2">
              <ActionButton onClick={() => onOpenPreorder(bike)} icon="shopping_cart_checkout" primary>
                Cotizar Ahora
              </ActionButton>
              <ActionButton onClick={() => onOpenTestRide(bike)} icon="speed">Test Ride</ActionButton>
            </div>
          )}
          {bike.status === 'espera' && (
            <ActionButton onClick={() => onOpenPreorder(bike)} icon="bookmark_added" primary>
              Reservar Unidad en Espera (Preventa)
            </ActionButton>
          )}
          {bike.status === 'revision' && (
            <ActionButton onClick={() => onOpenNotify(bike)} icon="notifications_active">
              Notificarme Cuando Esté Lista
            </ActionButton>
          )}
          {bike.status === 'agotada' && (
            <ActionButton onClick={() => onOpenPreorder(bike)} icon="hourglass_top">
              Reservar Turno de Fábrica
            </ActionButton>
          )}
          <button
            onClick={() => onSelect(bike)}
            className="w-full bg-[#171f33] hover:bg-[#222a3d] border border-[#2d3449] text-[#dae2fd] font-label-md text-label-md py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-[#89ceff]">read_more</span>
            Ver Ficha Completa / Abrir Detalle
          </button>
        </div>

        <div className="flex items-center justify-between text-[#bec8d2] pt-1 text-xs">
          <button onClick={() => onSelect(bike)} className="flex items-center gap-1 hover:text-[#89ceff] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-xs">compare_arrows</span>
            Comparar Ficha
          </button>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#4edea3]">
            {bike.verifiedVin || 'VIN Verificado'}
          </span>
        </div>
      </div>
    </article>
  );
};

const Metric: React.FC<{ label: string; value: string; highlight?: boolean }> = ({ label, value, highlight }) => (
  <div>
    <span className="font-label-sm text-label-sm text-[#bec8d2] block uppercase">{label}</span>
    <span className={`font-spec-data text-spec-data ${highlight ? 'text-[#89ceff]' : 'text-[#dae2fd]'}`}>
      {value}
    </span>
  </div>
);

const ActionButton: React.FC<{
  onClick: () => void;
  icon: string;
  children: React.ReactNode;
  primary?: boolean;
}> = ({ onClick, icon, children, primary }) => (
  <button
    onClick={onClick}
    className={`w-full font-label-lg text-label-lg py-2.5 px-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
      primary
        ? 'bg-[#0ea5e9] hover:bg-[#0053db] text-[#003751] hover:text-[#cdd7ff] shadow-md'
        : 'bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd]'
    }`}
  >
    <span className="material-symbols-outlined text-base">{icon}</span>
    {children}
  </button>
);
