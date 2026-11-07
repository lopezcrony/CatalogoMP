import React, { useState } from 'react';

interface AdminHeaderProps {
  onSearch?: (query: string) => void;
  pendingInquiriesCount?: number;
  onOpenReservations?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onSearch,
  pendingInquiriesCount = 0,
  onOpenReservations,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-[#0b1326]/85 backdrop-blur-xl border-b border-[#171f33] shadow-[0_1px_8px_rgba(0,0,0,0.3)] z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-3">
        <span className="font-label-sm text-label-sm uppercase text-[#bec8d2] tracking-wider">
          Centro de Control Operativo
        </span>
        <span className="text-[#3e4850]">/</span>
        <span className="font-label-sm text-label-sm uppercase text-[#89ceff] font-bold">
          Apex Motor Group S.L.
        </span>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* Expandable Quick Search */}
        {showSearch ? (
          <div className="flex items-center bg-[#131b2e] border border-[#2d3449] rounded-lg px-2.5 py-1">
            <span className="material-symbols-outlined text-[#88929b] text-base">search</span>
            <input
              type="text"
              autoFocus
              value={searchVal}
              onChange={(e) => {
                setSearchVal(e.target.value);
                onSearch?.(e.target.value);
              }}
              placeholder="Buscar modelo o VIN..."
              className="bg-transparent text-[#dae2fd] text-xs px-2 py-0.5 focus:outline-none w-48"
            />
            <button
              onClick={() => {
                setShowSearch(false);
                setSearchVal('');
                onSearch?.('');
              }}
              className="text-[#88929b] hover:text-[#dae2fd]"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className="text-[#bec8d2] hover:text-[#dae2fd] cursor-pointer p-1"
            title="Buscar en inventario"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
        )}

        {/* Notifications Icon with Badge */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-[#bec8d2] hover:text-[#dae2fd] cursor-pointer p-1 relative"
            title="Notificaciones"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {pendingInquiriesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0ea5e9] text-[#001e2f] text-[10px] font-extrabold flex items-center justify-center">
                {pendingInquiriesCount}
              </span>
            )}
          </button>

          {/* Notifications Drawer */}
          {showNotifications && (
            <div className="absolute right-0 top-10 w-80 bg-[#131b2e] border border-[#2d3449] rounded-xl shadow-2xl p-4 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#222a3d] mb-3">
                <span className="font-label-sm text-label-sm uppercase text-[#dae2fd] font-bold">
                  Centro de Alertas &amp; Reservas
                </span>
                <span className="bg-[#003824] text-[#4edea3] text-[10px] px-1.5 py-0.5 rounded font-bold">
                  {pendingInquiriesCount} Nuevas
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-[#171f33] rounded-lg border border-[#222a3d]">
                  <p className="font-semibold text-[#dae2fd]">Nueva Reserva Web MT-09 SP</p>
                  <p className="text-[#bec8d2] text-[11px]">Alejandro Valdés ha solicitado cupo garantizado.</p>
                  <span className="text-[#89ceff] text-[10px]">Hace 15 minutos</span>
                </div>
                <div className="p-2.5 bg-[#171f33] rounded-lg border border-[#222a3d]">
                  <p className="font-semibold text-[#dae2fd]">Validación Homologación 2025</p>
                  <p className="text-[#bec8d2] text-[11px]">Yamaha MT-07 lista para aprobación y sincronización.</p>
                  <span className="text-[#4edea3] text-[10px]">Taller PDI</span>
                </div>
              </div>
              {onOpenReservations && (
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onOpenReservations();
                  }}
                  className="w-full mt-3 bg-[#222a3d] hover:bg-[#31394d] text-[#89ceff] text-center font-label-sm text-label-sm py-1.5 rounded transition-colors"
                >
                  Ver Todas las Reservas
                </button>
              )}
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <img
          alt="Gerente de Ventas"
          className="w-8 h-8 rounded-full object-cover ring-1 ring-[#3e4850]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuhRbKmtfTdrEb2wS1y_uLz01RjzNCeey9WVV3mXg2NQ6U4bIIU_hX2kMUayFLN8BsekaicYYu0W2xjy0FVz-Pqxd5nKsaO3_GJvJuMQG9htqxo78vl9mdbzYOYihkyzUfOCWxX7Z3xTccxSwompvfezqeNmSNHMNZjoX6BZ-1co1MKDc_LIzY7p75jiOYR8DJ-UY1K1voxM511i6wQYNtZmuqT4nVEaSkIYj9t-Nz0cZ5Ufb_6zzc"
        />
      </div>
    </header>
  );
};
