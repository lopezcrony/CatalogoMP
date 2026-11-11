import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ShowroomCatalog } from './components/ShowroomCatalog';
import { VehicleDetailPage } from './components/VehicleDetailPage';
import { CreditInfoModal } from './components/CreditInfoModal';

import { AdminSidebar } from './features/admin/components/AdminSidebar';
import { AdminHeader } from './features/admin/components/AdminHeader';
import { AdminGeneralOverview } from './features/admin/components/AdminGeneralOverview';
import { AdminInventoryManager } from './features/admin/components/AdminInventoryManager';
import { AdminLogin } from './features/admin/components/AdminLogin';
import { AdminBrandsManager } from './features/admin/components/AdminBrandsManager';
import { AdminCharacteristicsManager } from './features/admin/components/AdminCharacteristicsManager';
import { AdminReviewsManager } from './features/admin/components/AdminReviewsManager';
import { AdminMotorcycleFormModal, MotorcycleFormData } from './features/admin/components/AdminMotorcycleFormModal';

import { Motorcycle } from './types';
import { useToast } from './hooks/useToast';
import { useAppNavigation } from './features/app/hooks/useAppNavigation';
import { useMotorcycleInventory } from './features/catalog/hooks/useMotorcycleInventory';
import { useAdminCatalogData } from './features/admin/hooks/useAdminCatalogData';
import { Icon } from './components/Icon';
import { useSupabaseAuth } from './features/auth/hooks/useSupabaseAuth';

export default function App() {
  const navigation = useAppNavigation();
  const auth = useSupabaseAuth();
  const { currentMode, loginAdmin } = navigation;
  const inventory = useMotorcycleInventory();
  const catalogData = useAdminCatalogData();
  const { toast: globalToast, showToast } = useToast();

  // Admin Add/Edit Modal
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);
  const [isCreditInfoOpen, setIsCreditInfoOpen] = useState(false);
  const [isMotorcycleModalOpen, setIsMotorcycleModalOpen] = useState(false);
  const [bikeToEdit, setBikeToEdit] = useState<Motorcycle | null>(null);
  const [reviewEditId, setReviewEditId] = useState<string | null>(null);
  const [reviewRefreshSignal, setReviewRefreshSignal] = useState(0);

  useEffect(() => {
    if (!auth.isLoading && auth.isAdmin && currentMode === 'showroom') {
      loginAdmin();
    }
  }, [auth.isAdmin, auth.isLoading, currentMode, loginAdmin]);

  const handleAdminLogin = async (email: string, password: string) => {
    await auth.signIn(email, password);
    navigation.loginAdmin();
    showToast('Sesión Iniciada', 'Bienvenido a la Sala de Control Operativo Apex Moto.');
  };

  const handleAdminLogout = async () => {
    await auth.signOut();
    navigation.logoutAdmin();
    showToast('Sesión Cerrada', 'Has regresado a la vitrina pública de motocicletas.');
  };

  const handlePreviewInCatalog = (bike: Motorcycle) => {
    navigation.selectBikeForDetail(bike);
  };

  const handleSaveMotorcycle = async (data: MotorcycleFormData, remoteId?: string) => {
    await inventory.saveMotorcycle(data, remoteId);
    if (reviewEditId && reviewEditId === remoteId) {
      const nextReviewDate = data.fecha_proxima_revision
        ? new Intl.DateTimeFormat('es-CO', { dateStyle: 'long' }).format(new Date(`${data.fecha_proxima_revision}T00:00:00`))
        : 'sin fecha programada';
      showToast('Revisión actualizada', `La moto fue guardada. Próxima comprobación: ${nextReviewDate}. Puedes marcarla como aprobada cuando confirmes la revisión.`);
      setReviewEditId(null);
      setReviewRefreshSignal((current) => current + 1);
    } else {
      showToast('Moto guardada', 'La información se guardó correctamente en Supabase.');
    }
  };
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-sans">
      {/* ================= MODE: ADMIN LOGIN ================= */}
      {navigation.currentMode === 'admin-login' && (
        <AdminLogin
          onLogin={handleAdminLogin}
          onBackToShowroom={() => navigation.setCurrentMode('showroom')}
        />
      )}

      {/* ================= MODE: DEALERSHIP ADMIN CONSOLE ================= */}
      {navigation.currentMode === 'admin' && (
        <div className="flex w-full min-h-screen bg-surface">
          {/* Fixed Left Sidebar */}
          <AdminSidebar
            currentTab={navigation.adminTab}
            onSelectTab={(tab) => {
              navigation.setAdminTab(tab as typeof navigation.adminTab);
              setIsAdminSidebarOpen(false);
            }}
            onBackToShowroom={() => navigation.setCurrentMode('showroom')}
            onLogout={handleAdminLogout}
            isOpen={isAdminSidebarOpen}
            onClose={() => setIsAdminSidebarOpen(false)}
          />

          {/* Right Main Admin Area */}
          <div className="md:pl-72 flex-1 flex flex-col min-w-0">
            {/* Top Fixed Header */}
            <AdminHeader onMenuClick={() => setIsAdminSidebarOpen(true)} />

            {/* Inner Dashboard View */}
            <main className="relative pt-20 px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
              {inventory.sourceStatus === 'error' && (
                <div className="mb-4 rounded-lg border border-error/30 bg-error-container/30 px-4 py-3 text-sm text-error">
                  No se pudo cargar el inventario desde Supabase.
                  {inventory.sourceError ? ` ${inventory.sourceError}` : ''}
                </div>
              )}
              {inventory.sourceStatus === 'loading' && (
                <div className="mb-4 rounded-lg border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">
                  Cargando inventario desde Supabase...
                </div>
              )}
              {navigation.adminTab === 'general' && (
                <AdminGeneralOverview
                  motorcycles={inventory.motorcycles}
                  onNavigateTab={(tab) => navigation.setAdminTab(tab as typeof navigation.adminTab)}
                  onOpenAddNew={() => { setReviewEditId(null); setBikeToEdit(null); setIsMotorcycleModalOpen(true); }}
                />
              )}

              {navigation.adminTab === 'inventario' && (
                <AdminInventoryManager
                  motorcycles={inventory.motorcycles}
                  onOpenAddNewModal={() => { setReviewEditId(null); setBikeToEdit(null); setIsMotorcycleModalOpen(true); }}
                  onOpenEditModal={(bike) => { setReviewEditId(null); setBikeToEdit(bike); setIsMotorcycleModalOpen(true); }}
                  onPreviewInCatalog={handlePreviewInCatalog}
                  onDeleteMotorcycle={async (remoteId) => {
                    try { await inventory.deleteMotorcycle(remoteId); showToast('Moto eliminada', 'El registro fue eliminado de Supabase.'); }
                    catch (error) { showToast('No se pudo eliminar', error instanceof Error ? error.message : 'Error desconocido', true); }
                  }}
                />
              )}

              {navigation.adminTab === 'marcas' && (
                <div className="flex flex-col gap-6"><header className="rounded-2xl border border-surface-container-high bg-surface-container-low p-6 sm:p-8"><p className="font-label-sm uppercase tracking-widest text-primary">Catálogo / Marcas</p><h1 className="font-headline-lg text-headline-lg text-on-surface">Gestión de marcas</h1><p className="mt-1 text-on-surface-variant">Crea, edita y elimina marcas no asociadas a motos.</p></header><AdminBrandsManager brands={catalogData.brands} onCreate={catalogData.createBrand} onUpdate={catalogData.updateBrand} onRemove={catalogData.removeBrand} /></div>
              )}
              {navigation.adminTab === 'caracteristicas' && (
                <div className="flex flex-col gap-6"><header className="rounded-2xl border border-surface-container-high bg-surface-container-low p-6 sm:p-8"><p className="font-label-sm uppercase tracking-widest text-primary">Catálogo / Datos dinámicos</p><h1 className="font-headline-lg text-headline-lg text-on-surface">Características técnicas</h1><p className="mt-1 text-on-surface-variant">Administra categorías y características desde Supabase.</p></header><AdminCharacteristicsManager categories={catalogData.categories} characteristics={catalogData.characteristics} onCreateCategory={catalogData.createCategory} onUpdateCategory={catalogData.updateCategory} onRemoveCategory={catalogData.removeCategory} onCreate={catalogData.createCharacteristic} onUpdate={catalogData.updateCharacteristic} onRemove={catalogData.removeCharacteristic} /></div>
              )}
              {navigation.adminTab === 'revisiones' && (
                <AdminReviewsManager
                  motorcycles={inventory.motorcycles}
                  refreshSignal={reviewRefreshSignal}
                  onEditMotorcycle={(bike) => {
                    setReviewEditId(bike.remoteId || null);
                    setBikeToEdit(bike);
                    setIsMotorcycleModalOpen(true);
                  }}
                />
              )}
            </main>
          </div>

        </div>
      )}

      <AdminMotorcycleFormModal
        isOpen={isMotorcycleModalOpen}
        initialBike={bikeToEdit}
        brands={catalogData.brands}
        categories={catalogData.categories}
        characteristics={catalogData.characteristics}
        onCreateBrand={catalogData.createBrand}
        onCreateCharacteristic={catalogData.createCharacteristic}
        onClose={() => setIsMotorcycleModalOpen(false)}
        onSave={handleSaveMotorcycle}
      />

      {/* ================= MODE: PUBLIC SHOWROOM & DETAIL ================= */}
      {(navigation.currentMode === 'showroom' || navigation.currentMode === 'vdp') && (
        <div className="flex flex-col min-h-screen">
          {/* Public Top Navbar */}
          <Navbar
            onOpenCreditInfo={() => setIsCreditInfoOpen(true)}
            
            onNavigate={(view) => {
              if (view === 'showroom') {
                navigation.setCurrentMode('showroom');
              } else if (view === 'vdp') {
                navigation.setCurrentMode('vdp');
              }
            }}
          />

          {/* Main Public Content */}
          <main className="flex-1 pt-20">
            {navigation.currentMode === 'showroom' && (
              <ShowroomCatalog
                motorcycles={inventory.motorcycles}
                onSelectBikeForDetail={navigation.selectBikeForDetail}
              />
            )}

            {navigation.currentMode === 'vdp' && navigation.selectedBikeForDetail && (
              <VehicleDetailPage
                bike={navigation.selectedBikeForDetail}
                onBack={() => navigation.setCurrentMode('showroom')}
              />
            )}
          </main>

          {/* Footer */}
          <Footer onOpenAdmin={navigation.openAdminPortal} />

          <CreditInfoModal
            isOpen={isCreditInfoOpen}
            onClose={() => setIsCreditInfoOpen(false)}
          />

          {/* Floating WhatsApp with live advisor status */}
          <WhatsAppButton
            bikeName={
              navigation.currentMode === 'vdp'
                ? navigation.selectedBikeForDetail
                  ? `${navigation.selectedBikeForDetail.brand} ${navigation.selectedBikeForDetail.name}`
                  : undefined
                : undefined
            }
          />

        </div>
      )}

      {/* Global Toast Notification */}
      {globalToast && (
        <div className="fixed bottom-6 left-8 z-50 flex items-center gap-3 bg-surface-container border border-outline-variant text-on-surface px-5 py-3.5 rounded-xl shadow-2xl transition-all duration-300">
          <Icon
            name={globalToast.isError ? 'help' : 'check_circle'}
            size={24}
            className={
              globalToast.isError ? 'text-error' : 'text-tertiary'
            }
          />
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg font-bold">{globalToast.title}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">{globalToast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
