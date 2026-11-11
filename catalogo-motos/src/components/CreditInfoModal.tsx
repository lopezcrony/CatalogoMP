import React from 'react';
import { Icon } from './Icon';

interface CreditInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
}

export const CreditInfoModal: React.FC<CreditInfoModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-on-surface/25 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="credit-info-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-low shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar información de crédito"
          className="absolute right-3 top-3 z-10 rounded-full bg-surface-container-lowest/90 p-2 text-on-surface-variant shadow-sm transition-colors hover:bg-surface-container-high hover:text-on-surface"
        >
          <Icon name="close" size={20} />
        </button>

        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Información sobre crédito para motocicletas"
            className="max-h-[75vh] w-full object-contain"
          />
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3 bg-surface-container p-8 text-center">
            <Icon name="credit_card" size={48} className="text-primary" />
            <h2 id="credit-info-title" className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Información de crédito
            </h2>
            <p className="max-w-md font-body-md text-body-md text-on-surface-variant">
              La imagen informativa del cliente se mostrará aquí cuando sea entregada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
