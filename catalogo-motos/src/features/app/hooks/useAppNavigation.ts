import { useState } from 'react';
import { Motorcycle } from '../../../types';

export type AppMode = 'showroom' | 'vdp' | 'admin-login' | 'admin';
export type AdminTab =
  | 'general'
  | 'inventario'
  | 'marcas'
  | 'colores'
  | 'imagenes'
  | 'caracteristicas'
  | 'revisiones';

export const useAppNavigation = () => {
  const [currentMode, setCurrentMode] = useState<AppMode>('showroom');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminTab, setAdminTab] = useState<AdminTab>('inventario');
  const [selectedBikeForDetail, setSelectedBikeForDetail] = useState<Motorcycle | null>(null);

  const selectBikeForDetail = (bike: Motorcycle) => {
    setSelectedBikeForDetail(bike);
    setCurrentMode('vdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAdminPortal = () => {
    setCurrentMode(isAdminLoggedIn ? 'admin' : 'admin-login');
  };

  const loginAdmin = () => {
    setIsAdminLoggedIn(true);
    setCurrentMode('admin');
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setCurrentMode('showroom');
  };

  return {
    currentMode,
    setCurrentMode,
    isAdminLoggedIn,
    adminTab,
    setAdminTab,
    selectedBikeForDetail,
    setSelectedBikeForDetail,
    selectBikeForDetail,
    openAdminPortal,
    loginAdmin,
    logoutAdmin,
  };
};
