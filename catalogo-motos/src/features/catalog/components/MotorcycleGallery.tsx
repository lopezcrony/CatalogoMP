import React from 'react';
import { BikeSlide } from '../../../types';
import { Icon } from '../../../components/Icon';

interface MotorcycleGalleryProps {
  name: string;
  displacement: string;
  slides: BikeSlide[];
  activeSlideIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
}

export const MotorcycleGallery: React.FC<MotorcycleGalleryProps> = ({
  name,
  displacement,
  slides,
  activeSlideIndex,
  onPrevious,
  onNext,
  onSelectSlide,
}) => {
  const activeSlide = slides[activeSlideIndex] || slides[0];

  return (
    <div className="relative w-full bg-surface-container-lowest overflow-hidden border-y border-surface-container-high">
      <div className="relative w-full h-56 flex items-center justify-center p-3">
        <img
          src={activeSlide?.url}
          alt={`${name} - ${activeSlide?.title}`}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={onPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-surface/80 hover:bg-primary text-on-surface hover:text-on-primary-container p-1.5 rounded-full transition-colors backdrop-blur-md cursor-pointer"
          title="Anterior foto"
        >
          <Icon name="chevron_left" size={16} />
        </button>
        <button
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-surface/80 hover:bg-primary text-on-surface hover:text-on-primary-container p-1.5 rounded-full transition-colors backdrop-blur-md cursor-pointer"
          title="Siguiente foto"
        >
          <Icon name="chevron_right" size={16} />
        </button>
        <span className="absolute bottom-2 left-3 bg-surface-container-lowest/80 backdrop-blur-md text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded border border-surface-container-high">
          {activeSlideIndex + 1}/{slides.length} · {activeSlide?.title}
        </span>
        <span className="absolute bottom-2 right-3 bg-surface-container/90 backdrop-blur-md px-2.5 py-1 rounded font-spec-data text-spec-data text-primary">
          {displacement}
        </span>
      </div>
      <div className="grid grid-cols-6 gap-1 p-2 bg-surface-container-lowest border-t border-surface-container">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            onClick={() => onSelectSlide(index)}
            className={`h-10 rounded overflow-hidden cursor-pointer bg-surface-container p-0.5 transition-all ${
              index === activeSlideIndex
                ? 'ring-2 ring-primary opacity-100'
                : 'opacity-50 hover:opacity-100 hover:bg-surface-container-high'
            }`}
          >
            <img src={slide.url} alt={slide.title} className="w-full h-full object-cover rounded-xs" />
          </button>
        ))}
      </div>
    </div>
  );
};
