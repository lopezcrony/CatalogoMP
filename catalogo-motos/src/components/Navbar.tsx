import React from 'react';
import { Icon } from './Icon';

interface NavbarProps {
  onNavigate: (view: string) => void;
  isAdminLoggedIn: boolean;
  onOpenAdmin: () => void;
  
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  isAdminLoggedIn,
  onOpenAdmin,
  
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
            onClick={() => onNavigate('showroom')}
            className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-1.5 px-3"
          >
            Financiamiento
          </button>
         
        </nav>

        {/* Actions Zone */}
        <div className="flex items-center gap-3 shrink-0">
         
          {/* Admin Switcher Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 bg-surface-container-high hover:bg-surface-container-highest border border-outline text-on-surface px-3.5 py-1.5 rounded-lg transition-all font-semibold shadow-sm cursor-pointer"
          >
            <Icon name="shield" size={16} />
            <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(21,128,61,0.35)]"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-wide">
              {isAdminLoggedIn ? 'Panel Admin' : 'Acceso Admin'}
            </span>
          </button>

        </div>
      </div>
    </header>
  );
};
