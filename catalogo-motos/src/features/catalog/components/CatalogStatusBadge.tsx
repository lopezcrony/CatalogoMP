import React from 'react';
import { BikeStatus } from '../../../types';

const statusContent: Record<BikeStatus, { label: string; className: string; dotClassName: string }> = {
  disponible: {
    label: 'Disponible',
    className: 'bg-[#003824]/60 text-[#4edea3] border-[#4edea3]/30',
    dotClassName: 'bg-[#4edea3] animate-pulse shadow-[0_0_8px_#4edea3]',
  },
  espera: {
    label: 'En Espera (15 Días)',
    className: 'bg-[#002a78]/60 text-[#dbe1ff] border-[#b4c5ff]/30',
    dotClassName: 'bg-[#b4c5ff]',
  },
  revision: {
    label: 'En Revisión',
    className: 'bg-[#2d3449]/70 text-[#89ceff] border-[#89ceff]/30',
    dotClassName: 'bg-[#0ea5e9] animate-ping',
  },
  agotada: {
    label: 'Agotado',
    className: 'bg-[#690005]/60 text-[#ffb4ab] border-[#ffb4ab]/30',
    dotClassName: 'bg-[#ffb4ab]',
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
