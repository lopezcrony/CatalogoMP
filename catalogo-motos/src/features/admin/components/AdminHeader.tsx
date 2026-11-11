import React, { useState } from 'react';
import { Icon } from '../../../components/Icon';

interface AdminHeaderProps {
  onSearch?: (query: string) => void;
  onMenuClick: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onSearch,
  onMenuClick,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  return (
    <header className="fixed top-0 left-0 md:left-72 right-0 h-16 bg-surface/95 backdrop-blur-xl border-b border-surface-container shadow-[0_1px_8px_rgba(0,0,0,0.12)] z-40 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-3 min-w-0">
        <button
          aria-label="Abrir menú administrativo"
          onClick={onMenuClick}
          className="p-2 text-on-surface-variant hover:text-on-surface md:hidden"
        >
          <Icon name="menu" size={20} />
        </button>
        <span className="hidden sm:inline font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider truncate">
          Centro de Control Operativo
        </span>
        <span className="hidden sm:inline text-outline">/</span>
        <span className="font-label-sm text-label-sm uppercase text-primary font-bold truncate">
          Apex Motor Group S.L.
        </span>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* Expandable Quick Search */}
        {showSearch ? (
          <div className="flex items-center bg-surface-container-low border border-outline-variant rounded-lg px-2.5 py-1">
            <Icon name="search" size={16} className="text-outline" />
            <input
              type="text"
              autoFocus
              value={searchVal}
              onChange={(e) => {
                setSearchVal(e.target.value);
                onSearch?.(e.target.value);
              }}
              placeholder="Buscar modelo o VIN..."
              className="bg-transparent text-on-surface text-xs px-2 py-0.5 focus:outline-none w-48"
            />
            <button
              onClick={() => {
                setShowSearch(false);
                setSearchVal('');
                onSearch?.('');
              }}
              className="text-outline hover:text-on-surface"
            >
              <Icon name="close" size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className="text-on-surface-variant hover:text-on-surface cursor-pointer p-1"
            title="Buscar en inventario"
          >
            <Icon name="search" size={20} />
          </button>
        )}

       
      </div>
    </header>
  );
};
