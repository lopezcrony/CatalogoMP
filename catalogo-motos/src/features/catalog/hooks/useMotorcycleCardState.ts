import { useState } from 'react';

export const useMotorcycleCardState = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');

  return {
    activeSlideIndex,
    selectedColor,
    setSelectedColor,
    previousSlide: (slideCount: number) =>
      setActiveSlideIndex((current) => (current - 1 + slideCount) % slideCount),
    nextSlide: (slideCount: number) =>
      setActiveSlideIndex((current) => (current + 1) % slideCount),
    selectSlide: setActiveSlideIndex,
  };
};
