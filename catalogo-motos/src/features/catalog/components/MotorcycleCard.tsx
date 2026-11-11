import React from 'react';
import { Motorcycle } from '../../../types';
import { formatCop } from '../../../lib/formatters';
import { CatalogStatusBadge } from './CatalogStatusBadge';
import { MotorcycleGallery } from './MotorcycleGallery';
import { useMotorcycleCardState } from '../hooks/useMotorcycleCardState';
import { Icon } from '../../../components/Icon';

interface MotorcycleCardProps {
  bike: Motorcycle;
  onSelect: (bike: Motorcycle) => void;
}

export const MotorcycleCard: React.FC<MotorcycleCardProps> = ({
  bike,
  onSelect,
}) => {
  const cardState = useMotorcycleCardState();
  const activeColorName = cardState.selectedColor || bike.colors[0]?.name;
  const currentColor = bike.colors.find((color) => color.name === activeColorName) || bike.colors[0];

  return (
    <article className="bg-surface-container-low border border-surface-container-high hover:border-primary/50 rounded-xl overflow-hidden flex flex-col justify-between group shadow-xl hover:shadow-[0_4px_24px_rgba(14,165,233,0.18)] transition-all duration-300">
      <div>
        <div className="p-5 pb-3 flex items-start justify-between gap-3">
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
              {bike.brand}
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface tracking-tight uppercase leading-snug">
              {bike.name} <span className="text-on-surface-variant text-sm font-normal">{bike.year}</span>
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

        <div className="px-5 py-2.5 bg-surface-container-high/40 rounded-lg mx-5 my-2 border border-surface-container-high">
          <div className="flex items-center justify-between text-on-surface mb-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Color:</span>
            <span className="font-label-sm text-label-sm font-bold text-tertiary">
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
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface'
                    : 'ring-1 ring-outline'
                }`}
                title={`${color.name} (${color.statusText})`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 pt-3 bg-surface-container-lowest/80 flex flex-col gap-3 border-t border-surface-container">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block">Precio Oficial</span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {formatCop(bike.priceRawCop)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          
          <button
            onClick={() => onSelect(bike)}
            className="w-full bg-surface-container hover:bg-surface-container-high border border-outline-variant text-on-surface font-label-md text-label-md py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Icon name="assignment" size={16} className="text-primary" />
            Ver Ficha Completa / Abrir Detalle
          </button>
        </div>

      </div>
    </article>
  );
};
