import React from 'react';
import { BikeSlide } from '../../../types';

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
    <div className="relative w-full bg-[#060e20] overflow-hidden border-y border-[#222a3d]">
      <div className="relative w-full h-56 flex items-center justify-center p-3">
        <img
          src={activeSlide?.url}
          alt={`${name} - ${activeSlide?.title}`}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={onPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#0b1326]/80 hover:bg-[#0ea5e9] text-[#dae2fd] hover:text-[#003751] p-1.5 rounded-full transition-colors backdrop-blur-md cursor-pointer"
          title="Anterior foto"
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>
        <button
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0b1326]/80 hover:bg-[#0ea5e9] text-[#dae2fd] hover:text-[#003751] p-1.5 rounded-full transition-colors backdrop-blur-md cursor-pointer"
          title="Siguiente foto"
        >
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>
        <span className="absolute bottom-2 left-3 bg-[#060e20]/80 backdrop-blur-md text-[#bec8d2] font-label-sm text-label-sm px-2 py-0.5 rounded border border-[#222a3d]">
          {activeSlideIndex + 1}/{slides.length} · {activeSlide?.title}
        </span>
        <span className="absolute bottom-2 right-3 bg-[#171f33]/90 backdrop-blur-md px-2.5 py-1 rounded font-spec-data text-spec-data text-[#89ceff]">
          {displacement}
        </span>
      </div>
      <div className="grid grid-cols-6 gap-1 p-2 bg-[#060e20] border-t border-[#171f33]">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            onClick={() => onSelectSlide(index)}
            className={`h-10 rounded overflow-hidden cursor-pointer bg-[#171f33] p-0.5 transition-all ${
              index === activeSlideIndex
                ? 'ring-2 ring-[#0ea5e9] opacity-100'
                : 'opacity-50 hover:opacity-100 hover:bg-[#222a3d]'
            }`}
          >
            <img src={slide.url} alt={slide.title} className="w-full h-full object-cover rounded-xs" />
          </button>
        ))}
      </div>
    </div>
  );
};
