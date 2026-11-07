import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ShowroomCatalog } from './components/ShowroomCatalog';
import { VehicleDetailPage } from './components/VehicleDetailPage';
import { PreorderModal } from './features/reservations/components/PreorderModal';
import { TestRideModal } from './features/reservations/components/TestRideModal';

import { AdminSidebar } from './features/admin/components/AdminSidebar';
import { AdminHeader } from './features/admin/components/AdminHeader';
import { AdminGeneralOverview } from './features/admin/components/AdminGeneralOverview';
import { AdminInventoryManager } from './features/admin/components/AdminInventoryManager';
import { AdminHomologationReview } from './features/admin/components/AdminHomologationReview';
import { AdminReservations } from './features/admin/components/AdminReservations';
import { AdminSettings } from './features/admin/components/AdminSettings';
import { AdminAddEditModal } from './features/admin/components/AdminAddEditModal';
import { AdminLogin } from './features/admin/components/AdminLogin';

import {
  INITIAL_MOTORCYCLES,
} from './data/bikes';
import { Motorcycle } from './types';
import { useToast } from './hooks/useToast';
import { useAppNavigation } from './features/app/hooks/useAppNavigation';
import { useMotorcycleInventory } from './features/catalog/hooks/useMotorcycleInventory';
import { useAdminData } from './features/admin/hooks/useAdminData';
import { useReservationActions } from './features/reservations/hooks/useReservationActions';

export default function App() {
  const navigation = useAppNavigation(INITIAL_MOTORCYCLES);
  const inventory = useMotorcycleInventory((updatedBike) => {
    if (navigation.selectedBikeForDetail.id === updatedBike.id) {
      navigation.setSelectedBikeForDetail(updatedBike);
    }
  });
  const adminData = useAdminData();
  const { toast: globalToast, showToast } = useToast();
  const { submitPreorder, submitTestRide } = useReservationActions(
    adminData.addInquiry,
    showToast
  );

  // Modals for Public Showroom
  const [preorderModalBike, setPreorderModalBike] = useState<Motorcycle | null>(null);
  const [testRideModalBike, setTestRideModalBike] = useState<Motorcycle | null>(null);

  // Admin Add/Edit Modal
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [bikeToEdit, setBikeToEdit] = useState<Motorcycle | null>(null);

  const handleApproveHomologation = (homologationId: string) => {
    adminData.approveHomologation(homologationId);
    if (homologationId === 'h1') inventory.approveMt07Homologation();
  };

  const handleAddNewMotorcycle = (newBike: Parameters<typeof inventory.addMotorcycle>[0]) => {
    inventory.addMotorcycle(newBike);
    showToast('Motocicleta Publicada', `${newBike.brand} ${newBike.name} añadida exitosamente.`);
  };

  const handleAdminLoginSuccess = () => {
    navigation.loginAdmin();
    showToast('Sesión Iniciada', 'Bienvenido a la Sala de Control Operativo Apex Moto.');
  };

  const handleAdminLogout = () => {
    navigation.logoutAdmin();
    showToast('Sesión Cerrada', 'Has regresado a la vitrina pública de motocicletas.');
  };

  const handlePreviewInCatalog = (bike: Motorcycle) => {
    navigation.selectBikeForDetail(bike);
  };

  const pendingHomologationsCount = adminData.homologations.filter((h) => !h.approved).length;
  const pendingReservationsCount = adminData.inquiries.filter((i) => i.status === 'Pendiente').length;

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] flex flex-col font-sans">
      {/* ================= MODE: ADMIN LOGIN ================= */}
      {navigation.currentMode === 'admin-login' && (
        <AdminLogin
          onLoginSuccess={handleAdminLoginSuccess}
          onBackToShowroom={() => navigation.setCurrentMode('showroom')}
        />
      )}

      {/* ================= MODE: DEALERSHIP ADMIN CONSOLE ================= */}
      {navigation.currentMode === 'admin' && (
        <div className="flex w-full min-h-screen bg-[#0b1326]">
          {/* Fixed Left Sidebar */}
          <AdminSidebar
            currentTab={navigation.adminTab}
            onSelectTab={(tab) => navigation.setAdminTab(tab as typeof navigation.adminTab)}
            pendingHomologationsCount={pendingHomologationsCount}
            pendingReservationsCount={pendingReservationsCount}
            onBackToShowroom={() => navigation.setCurrentMode('showroom')}
            onLogout={handleAdminLogout}
          />

          {/* Right Main Admin Area */}
          <div className="pl-72 flex-1 flex flex-col">
            {/* Top Fixed Header */}
            <AdminHeader
              pendingInquiriesCount={pendingReservationsCount}
              onOpenReservations={() => navigation.setAdminTab('reservas')}
            />

            {/* Inner Dashboard View */}
            <main className="relative pt-20 px-8 py-6 w-full flex-1">
              {navigation.adminTab === 'general' && (
                <AdminGeneralOverview
                  motorcycles={inventory.motorcycles}
                  inquiries={adminData.inquiries}
                  onNavigateTab={(tab) => navigation.setAdminTab(tab as typeof navigation.adminTab)}
                  onOpenAddNew={() => {
                    setBikeToEdit(null);
                    setIsAddEditModalOpen(true);
                  }}
                />
              )}

              {navigation.adminTab === 'inventario' && (
                <AdminInventoryManager
                  motorcycles={inventory.motorcycles}
                  onOpenAddNewModal={() => {
                    setBikeToEdit(null);
                    setIsAddEditModalOpen(true);
                  }}
                  onPreviewInCatalog={handlePreviewInCatalog}
                  onUpdateMotorcycle={inventory.updateMotorcycle}
                  onDeleteMotorcycle={inventory.deleteMotorcycle}
                />
              )}

              {navigation.adminTab === 'homologacion' && (
                <AdminHomologationReview
                  homologations={adminData.homologations}
                  onApproveHomologation={handleApproveHomologation}
                  onToast={showToast}
                />
              )}

              {navigation.adminTab === 'reservas' && (
                <AdminReservations
                  inquiries={adminData.inquiries}
                  onUpdateStatus={adminData.updateInquiryStatus}
                  onToast={showToast}
                />
              )}

              {navigation.adminTab === 'ajustes' && <AdminSettings onToast={showToast} />}
            </main>
          </div>

          {/* Admin Add / Edit Modal */}
          <AdminAddEditModal
            isOpen={isAddEditModalOpen}
            initialBike={bikeToEdit}
            onClose={() => setIsAddEditModalOpen(false)}
            onSave={handleAddNewMotorcycle}
          />
        </div>
      )}

      {/* ================= MODE: PUBLIC SHOWROOM & DETAIL ================= */}
      {(navigation.currentMode === 'showroom' || navigation.currentMode === 'vdp') && (
        <div className="flex flex-col min-h-screen">
          {/* Public Top Navbar */}
          <Navbar
            
            onNavigate={(view) => {
              if (view === 'showroom') {
                navigation.setCurrentMode('showroom');
              } else if (view === 'vdp') {
                navigation.setCurrentMode('vdp');
              }
            }}
            isAdminLoggedIn={navigation.isAdminLoggedIn}
            onOpenAdmin={navigation.openAdminPortal}
    
          
          />

          {/* Main Public Content */}
          <main className="flex-1 pt-20">
            {navigation.currentMode === 'showroom' && (
              <ShowroomCatalog
                motorcycles={inventory.motorcycles}
                onSelectBikeForDetail={navigation.selectBikeForDetail}
                onOpenPreorder={(bike) => setPreorderModalBike(bike)}
                onOpenTestRide={(bike) => setTestRideModalBike(bike)}
                onOpenNotify={(bike) => {
                  showToast(
                    'Alerta Activada',
                    `Te notificaremos en cuanto la ${bike.brand} ${bike.name} finalice su inspección de taller.`
                  );
                }}
              />
            )}

            {navigation.currentMode === 'vdp' && (
              <VehicleDetailPage
                bike={navigation.selectedBikeForDetail}
                onBack={() => navigation.setCurrentMode('showroom')}
                onOpenReserve={(bike) => setPreorderModalBike(bike)}
                onOpenTestRide={(bike) => setTestRideModalBike(bike)}
              />
            )}
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating WhatsApp with live advisor status */}
          <WhatsAppButton
            bikeName={
              navigation.currentMode === 'vdp'
                ? `${navigation.selectedBikeForDetail.brand} ${navigation.selectedBikeForDetail.name}`
                : undefined
            }
          />

          {/* Public Modals */}
          <PreorderModal
            bike={preorderModalBike}
            isOpen={Boolean(preorderModalBike)}
            onClose={() => setPreorderModalBike(null)}
            onSubmit={submitPreorder}
          />

          <TestRideModal
            bike={testRideModalBike}
            isOpen={Boolean(testRideModalBike)}
            onClose={() => setTestRideModalBike(null)}
            onSubmit={submitTestRide}
          />
        </div>
      )}

      {/* Global Toast Notification */}
      {globalToast && (
        <div className="fixed bottom-6 left-8 z-50 flex items-center gap-3 bg-[#171f33] border border-[#2d3449] text-[#dae2fd] px-5 py-3.5 rounded-xl shadow-2xl transition-all duration-300">
          <span
            className={`material-symbols-outlined text-2xl ${
              globalToast.isError ? 'text-[#ffb4ab]' : 'text-[#4edea3]'
            }`}
          >
            {globalToast.isError ? 'warning' : 'check_circle'}
          </span>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg font-bold">{globalToast.title}</span>
            <span className="font-body-sm text-body-sm text-[#bec8d2]">{globalToast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
