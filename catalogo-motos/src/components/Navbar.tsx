import React from 'react';

interface NavbarProps {
  onNavigate: (view: string) => void;
  onOpenCreditInfo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenCreditInfo,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-surface-container-high shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand / Logo */}
        <div
          onClick={() => onNavigate('showroom')}
          className="flex items-center gap-4 cursor-pointer select-none group"
        >
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">
              Catálogo Oficial de Motocicletas
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden xl:flex items-center gap-6">
          
          
          <button
            onClick={onOpenCreditInfo}
            className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-1.5 px-3"
          >
            Financiamiento
          </button>
         
        </nav>

      </div>
    </header>
  );
};
