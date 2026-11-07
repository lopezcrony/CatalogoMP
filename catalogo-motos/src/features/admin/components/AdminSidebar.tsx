import React from 'react';

interface AdminSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  pendingHomologationsCount: number;
  pendingReservationsCount: number;
  onBackToShowroom: () => void;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  pendingHomologationsCount,
  pendingReservationsCount,
  onBackToShowroom,
  onLogout,
}) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-[#060e20] border-r border-[#171f33] z-50 flex flex-col justify-between py-6 shadow-[1px_0_12px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col gap-6">
        {/* Brand Header */}
        <div className="px-6 flex items-center gap-3">
          <img
            alt="Apex Moto Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1VAlH_yQvgdRynQYMOqInryGz1B7iboJ9UDnaF6jjb3kzysZlZSAUsEpRv5vV5UgJgIkWorLe4y9V6zCAEZ24JmVVC9KYSHR8qVbEwo1BUW-4ElnXOYq_8REF_m2lG_wNGbrHMAdLboKJ0VJC6MwLSVPPFNRFw6W_VbBWfSVM_d4m3H5XsU8sQgadKFF4oZoB0x2FmRMLXKID0H6kvTa-aprTpuLsUR9FcK0Qk3-rNvg0LemyoWg9COkA"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-[#dae2fd] tracking-tight uppercase leading-none">
              Apex <span className="text-[#89ceff]">Moto</span>
            </span>
            <span className="font-label-sm text-label-sm text-[#89ceff] tracking-widest uppercase">
              Panel Concesionario
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="px-4 flex flex-col gap-1.5">
          <button
            onClick={() => onSelectTab('general')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-lg text-label-lg transition-colors cursor-pointer w-full text-left ${
              currentTab === 'general'
                ? 'bg-[#0ea5e9] text-[#003751] font-bold shadow-md shadow-[#0ea5e9]/20'
                : 'text-[#bec8d2] hover:bg-[#222a3d] hover:text-[#dae2fd]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">grid_view</span>
            Panel General
          </button>

          <button
            onClick={() => onSelectTab('inventario')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-lg text-label-lg transition-colors cursor-pointer w-full text-left ${
              currentTab === 'inventario'
                ? 'bg-[#0ea5e9] text-[#003751] font-bold shadow-md shadow-[#0ea5e9]/20'
                : 'text-[#bec8d2] hover:bg-[#222a3d] hover:text-[#dae2fd]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">two_wheeler</span>
            Inventario &amp; Modelos
          </button>

          <button
            onClick={() => onSelectTab('homologacion')}
            className={`flex items-center justify-between px-4 py-3 rounded-lg font-label-lg text-label-lg transition-colors cursor-pointer w-full text-left ${
              currentTab === 'homologacion'
                ? 'bg-[#0ea5e9] text-[#003751] font-bold shadow-md shadow-[#0ea5e9]/20'
                : 'text-[#bec8d2] hover:bg-[#222a3d] hover:text-[#dae2fd]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">published_with_changes</span>
              Revisión Cambio de Año
            </div>
            {pendingHomologationsCount > 0 && (
              <span className="bg-[#89ceff] text-[#00344d] font-label-sm text-label-sm px-1.5 py-0.5 rounded-full font-bold">
                {pendingHomologationsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('reservas')}
            className={`flex items-center justify-between px-4 py-3 rounded-lg font-label-lg text-label-lg transition-colors cursor-pointer w-full text-left ${
              currentTab === 'reservas'
                ? 'bg-[#0ea5e9] text-[#003751] font-bold shadow-md shadow-[#0ea5e9]/20'
                : 'text-[#bec8d2] hover:bg-[#222a3d] hover:text-[#dae2fd]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">assignment_turned_in</span>
              Solicitudes &amp; Reservas
            </div>
            {pendingReservationsCount > 0 && (
              <span className="bg-[#4edea3] text-[#003824] font-label-sm text-label-sm px-1.5 py-0.5 rounded-full font-bold">
                {pendingReservationsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('ajustes')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-lg text-label-lg transition-colors cursor-pointer w-full text-left ${
              currentTab === 'ajustes'
                ? 'bg-[#0ea5e9] text-[#003751] font-bold shadow-md shadow-[#0ea5e9]/20'
                : 'text-[#bec8d2] hover:bg-[#222a3d] hover:text-[#dae2fd]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">tune</span>
            Ajustes &amp; Marcas
          </button>
        </nav>
      </div>

      {/* Bottom Profile and Public Link */}
      <div className="px-6 flex flex-col gap-4">
        {/* Profile Card */}
        <div className="bg-[#131b2e] border border-[#222a3d] p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3 truncate">
            <img
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover ring-1 ring-[#3e4850]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuhRbKmtfTdrEb2wS1y_uLz01RjzNCeey9WVV3mXg2NQ6U4bIIU_hX2kMUayFLN8BsekaicYYu0W2xjy0FVz-Pqxd5nKsaO3_GJvJuMQG9htqxo78vl9mdbzYOYihkyzUfOCWxX7Z3xTccxSwompvfezqeNmSNHMNZjoX6BZ-1co1MKDc_LIzY7p75jiOYR8DJ-UY1K1voxM511i6wQYNtZmuqT4nVEaSkIYj9t-Nz0cZ5Ufb_6zzc"
            />
            <div className="flex flex-col truncate">
              <span className="font-label-md text-label-md text-[#dae2fd] truncate">
                Gerencia de Ventas
              </span>
              <span className="font-label-sm text-label-sm text-[#4edea3] uppercase">
                En Línea
              </span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-1 text-[#88929b] hover:text-[#ffb4ab] transition-colors"
            title="Cerrar sesión"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>

        {/* Back to Public Showroom Button */}
        <button
          onClick={onBackToShowroom}
          className="flex items-center justify-center gap-2 bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-label-sm text-label-sm uppercase py-2.5 rounded-lg transition-colors border border-[#3e4850] cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Ver Tienda Pública
        </button>
      </div>
    </aside>
  );
};
