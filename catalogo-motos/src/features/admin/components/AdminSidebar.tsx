import React from 'react';
import { Icon, type IconName } from '../../../components/Icon';

const catalogSections: Array<{ tab: string; icon: IconName; label: string }> = [
  { tab: 'marcas', icon: 'store', label: 'Marcas' },
  { tab: 'caracteristicas', icon: 'tags', label: 'Características Técnicas' },
  { tab: 'revisiones', icon: 'fact_check', label: 'Revisiones anuales' },
];

interface AdminSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onBackToShowroom: () => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  onBackToShowroom,
  onLogout,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {isOpen && (
        <button
          aria-label="Cerrar menú administrativo"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-on-surface/20 md:hidden"
        />
      )}
      <aside className={`fixed left-0 top-0 h-full w-72 max-w-[85vw] bg-surface-container-lowest border-r border-surface-container z-50 flex flex-col justify-between py-6 shadow-[1px_0_12px_rgba(0,0,0,0.18)] transition-transform duration-200 md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
      <div className="flex flex-col gap-6">
        {/* Brand Header */}
        <div className="px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
          <img
            alt="Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1VAlH_yQvgdRynQYMOqInryGz1B7iboJ9UDnaF6jjb3kzysZlZSAUsEpRv5vV5UgJgIkWorLe4y9V6zCAEZ24JmVVC9KYSHR8qVbEwo1BUW-4ElnXOYq_8REF_m2lG_wNGbrHMAdLboKJ0VJC6MwLSVPPFNRFw6W_VbBWfSVM_d4m3H5XsU8sQgadKFF4oZoB0x2FmRMLXKID0H6kvTa-aprTpuLsUR9FcK0Qk3-rNvg0LemyoWg9COkA"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight uppercase leading-none">
              Moto <span className="text-primary">Sync</span>
            </span>
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">
              Panel Concesionario
            </span>
          </div>
          </div>
          <button
            aria-label="Cerrar menú administrativo"
            onClick={onClose}
            className="p-2 text-on-surface-variant hover:text-on-surface md:hidden"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="px-4 flex flex-col gap-1.5">
          <button
            onClick={() => onSelectTab('general')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-lg text-label-lg transition-colors cursor-pointer w-full text-left ${
              currentTab === 'general'
                ? 'bg-primary text-on-primary-container font-bold shadow-md shadow-primary/20'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <Icon name="dashboard" size={20} />
            Panel General
          </button>

          <button
            onClick={() => onSelectTab('inventario')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-lg text-label-lg transition-colors cursor-pointer w-full text-left ${
              currentTab === 'inventario'
                ? 'bg-primary text-on-primary-container font-bold shadow-md shadow-primary/20'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <Icon name="two_wheeler" size={20} />
            Inventario &amp; Modelos
          </button>

          {catalogSections.map(({ tab, icon, label }) => (
            <button
              key={tab}
              onClick={() => onSelectTab(tab)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-lg text-label-lg transition-colors cursor-pointer w-full text-left ${
                currentTab === tab
                  ? 'bg-primary text-on-primary-container font-bold shadow-md shadow-primary/20'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <Icon name={icon} size={20} />
              {label}
            </button>
          ))}

        </nav>
      </div>

      {/* Bottom Profile and Public Link */}
      <div className="px-6 flex flex-col gap-4">
        {/* Profile Card */}
        <div className="bg-surface-container-low border border-surface-container-high p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3 truncate">
            <img
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover ring-1 ring-outline"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuhRbKmtfTdrEb2wS1y_uLz01RjzNCeey9WVV3mXg2NQ6U4bIIU_hX2kMUayFLN8BsekaicYYu0W2xjy0FVz-Pqxd5nKsaO3_GJvJuMQG9htqxo78vl9mdbzYOYihkyzUfOCWxX7Z3xTccxSwompvfezqeNmSNHMNZjoX6BZ-1co1MKDc_LIzY7p75jiOYR8DJ-UY1K1voxM511i6wQYNtZmuqT4nVEaSkIYj9t-Nz0cZ5Ufb_6zzc"
            />
            <div className="flex flex-col truncate">
              <span className="font-label-md text-label-md text-on-surface truncate">
                Gerencia de Ventas
              </span>
              <span className="font-label-sm text-label-sm text-tertiary uppercase">
                En Línea
              </span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-1 text-outline hover:text-error transition-colors"
            title="Cerrar sesión"
          >
            <Icon name="logout" size={18} />
          </button>
        </div>

        {/* Back to Public Showroom Button */}
        <button
          onClick={onBackToShowroom}
          className="flex items-center justify-center gap-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm uppercase py-2.5 rounded-lg transition-colors border border-outline cursor-pointer"
        >
          <Icon name="arrow_back" size={16} />
          Ver Tienda Pública
        </button>
      </div>
      </aside>
    </>
  );
};
