import React from 'react';
import { BikeStatus } from '../../../types';

const statusContent: Record<BikeStatus, { label: string; className: string; dotClassName: string }> = {
  disponible: {
    label: 'Disponible',
    className: 'bg-tertiary-container/60 text-tertiary border-tertiary/30',
    dotClassName: 'bg-tertiary animate-pulse shadow-[0_0_8px_rgba(21,128,61,0.35)]',
  },
  espera: {
    label: 'En Espera (15 Días)',
    className: 'bg-primary-container/60 text-on-surface border-primary/30',
    dotClassName: 'bg-primary',
  },
  revision: {
    label: 'En Revisión',
    className: 'bg-outline-variant/70 text-primary border-primary/30',
    dotClassName: 'bg-primary animate-ping',
  },
  agotada: {
    label: 'Agotado',
    className: 'bg-error-container/60 text-error border-error/30',
    dotClassName: 'bg-error',
  },
};

export const CatalogStatusBadge: React.FC<{ status: BikeStatus }> = ({ status }) => {
  const content = statusContent[status];

  return (
    <span
      className={`${content.className} border font-label-sm text-label-sm px-2.5 py-1 rounded-full uppercase flex items-center gap-1.5 shrink-0`}
    >
      <span className={`w-2 h-2 rounded-full ${content.dotClassName}`} />
      {content.label}
    </span>
  );
};
