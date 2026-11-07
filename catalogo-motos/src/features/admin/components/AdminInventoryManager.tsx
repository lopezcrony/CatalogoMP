import React, { useState } from 'react';
import { Motorcycle, ColorVariant, BikeStatus } from '../../../types';

interface AdminInventoryManagerProps {
  motorcycles: Motorcycle[];
  onOpenAddNewModal: () => void;
  onPreviewInCatalog: (bike: Motorcycle) => void;
  onUpdateMotorcycle: (updatedBike: Motorcycle) => void;
  onDeleteMotorcycle: (bikeId: number) => void;
}

export const AdminInventoryManager: React.FC<AdminInventoryManagerProps> = ({
  motorcycles,
  onOpenAddNewModal,
  onPreviewInCatalog,
  onUpdateMotorcycle,
  onDeleteMotorcycle,
}) => {
  // Current active bike for editing (defaults to MT-07 or first bike)
  const defaultBike = motorcycles.find((b) => b.id === 7) || motorcycles[0];
  const [selectedBikeId, setSelectedBikeId] = useState<number>(defaultBike?.id || 1);

  const currentBike = motorcycles.find((b) => b.id === selectedBikeId) || defaultBike;

  // Active tab within editor
  const [activeTab, setActiveTab] = useState<'specs' | 'media' | 'colors'>('colors');

  // Form states initialized with currentBike
  const [modelName, setModelName] = useState(currentBike?.name || '');
  const [brand, setBrand] = useState(currentBike?.brand.toLowerCase() || 'yamaha');
  const [year, setYear] = useState(currentBike?.year || 2024);
  const [displacement, setDisplacement] = useState(currentBike?.displacement || '689 cc');
  const [brakes, setBrakes] = useState(currentBike?.brakes || 'Cornering ABS + Doble Disco Flotante 298 mm');
  const [transmission, setTransmission] = useState(currentBike?.transmission || '6 velocidades con embrague asistido antirrebote A&S');
  const [power, setPower] = useState(currentBike?.power || '73.4 CV @ 8,750 rpm · 67 Nm @ 6,500 rpm');
  const [priceCop, setPriceCop] = useState(currentBike?.priceRawCop || 46500000);
  const [description, setDescription] = useState(currentBike?.description || '');
  const [masterStatus, setMasterStatus] = useState<BikeStatus>(currentBike?.status || 'revision');
  const [colors, setColors] = useState<ColorVariant[]>(currentBike?.colors || []);

  // UI state: Modals & Toasts
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ title: string; message: string; isError?: boolean } | null>(null);

  // Sync state when selecting a different bike from the dropdown
  const handleSelectDifferentBike = (id: number) => {
    const bike = motorcycles.find((b) => b.id === id);
    if (!bike) return;
    setSelectedBikeId(id);
    setModelName(bike.name);
    setBrand(bike.brand.toLowerCase());
    setYear(bike.year);
    setDisplacement(bike.displacement);
    setBrakes(bike.brakes);
    setTransmission(bike.transmission);
    setPower(bike.power);
    setPriceCop(bike.priceRawCop);
    setDescription(bike.description);
    setMasterStatus(bike.status);
    setColors([...bike.colors]);
    showToast('Unidad Cargada en Editor', `${bike.brand} ${bike.name} seleccionada.`);
  };

  const showToast = (title: string, message: string, isError = false) => {
    setToast({ title, message, isError });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleStatusChange = (status: BikeStatus) => {
    setMasterStatus(status);
    if (status === 'disponible') {
      showToast('Estado: Disponible', 'La unidad ya recibe cotizaciones y reservas inmediatas en la vitrina.');
    } else if (status === 'agotada') {
      showToast('Estado: Agotada en Vitrina', 'Visible como muestra con aviso de lista de espera.');
    } else if (status === 'espera') {
      showToast('Estado: En Espera / Preventa', 'Permite abonos y apartado anticipado de clientes.');
    } else if (status === 'revision') {
      showToast('Estado: En Revisión Técnica', 'Oculta temporalmente de vitrina hasta validación de taller.');
    }
  };

  const handleStockChange = (colorId: string, newStock: number) => {
    setColors((prev) =>
      prev.map((c) => (c.id === colorId ? { ...c, stock: Math.max(0, newStock) } : c))
    );
  };

  const handleDeliveryStatusChange = (colorId: string, newStatus: ColorVariant['status']) => {
    setColors((prev) =>
      prev.map((c) =>
        c.id === colorId
          ? {
              ...c,
              status: newStatus,
              statusText:
                newStatus === 'disponible'
                  ? '• Disponible (Inmediata)'
                  : newStatus === 'espera'
                  ? 'En Espera (7-15 días)'
                  : 'Agotado Temporal',
            }
          : c
      )
    );
  };

  const handleDeleteVariant = (colorId: string) => {
    setColors((prev) => prev.filter((c) => c.id !== colorId));
    showToast('Variante Eliminada', 'Se ha retirado la combinación cromática de inventario.');
  };

  const handleAddColorVariant = () => {
    const newVariant: ColorVariant = {
      id: `c-new-${Date.now()}`,
      name: 'Nueva Variante ' + (colors.length + 1),
      code: '#NV-2025-X',
      stock: 2,
      transitStock: 1,
      status: 'disponible',
      statusText: '• Disponible (Inmediata)',
      colorHex: '#38bdf8',
      secondaryHex: '#0f172a',
    };
    setColors((prev) => [...prev, newVariant]);
    showToast('Variante Añadida', 'Nueva combinación cromática registrada.');
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      const updatedBike: Motorcycle = {
        ...currentBike,
        name: modelName,
        brand: brand.charAt(0).toUpperCase() + brand.slice(1),
        year,
        displacement,
        brakes,
        transmission,
        power,
        priceRawCop: priceCop,
        priceDocsCop: priceCop + 3600000,
        description,
        status: masterStatus,
        statusLabel:
          masterStatus === 'disponible'
            ? 'Disponible'
            : masterStatus === 'espera'
            ? 'En Espera (Preventa)'
            : masterStatus === 'revision'
            ? 'En Revisión Técnica'
            : 'Agotado',
        colors,
      };
      onUpdateMotorcycle(updatedBike);
      showToast('Cambios Guardados', 'Ficha técnica, multimedia y variantes actualizadas en vitrina.');
    }, 700);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    onDeleteMotorcycle(currentBike.id);
    showToast('Modelo Eliminado', `${currentBike.brand} ${currentBike.name} retirada del catálogo.`, true);
    // Switch to another bike
    const remaining = motorcycles.filter((b) => b.id !== currentBike.id);
    if (remaining.length > 0) {
      handleSelectDifferentBike(remaining[0].id);
    }
  };

  return (
    <div className="flex flex-col w-full gap-8 pb-16 font-sans">
      {/* Internal Telemetry Bar & Quick Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-[#131b2e] border border-[#222a3d] p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#89ceff] animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#89ceff]">
              Operaciones de Inventario · Sala de Control
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md text-[#dae2fd] tracking-tight">
            Gestión Maestra de Modelos y Stock
          </h1>
          <p className="font-body-md text-body-md text-[#bec8d2]">
            Monitoreo de disponibilidad en vitrina digital, homologación de catálogo técnico y cambio de año modelo.
          </p>
        </div>

        {/* Quick Action Group */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Quick Motorcycle Picker to edit any bike in inventory */}
          <div className="flex items-center gap-2 bg-[#060e20] border border-[#2d3449] px-3 py-1.5 rounded-lg">
            <span className="material-symbols-outlined text-sm text-[#88929b]">swap_horiz</span>
            <select
              value={selectedBikeId}
              onChange={(e) => handleSelectDifferentBike(Number(e.target.value))}
              className="bg-transparent text-[#dae2fd] text-xs font-semibold focus:outline-none cursor-pointer"
            >
              {motorcycles.map((b) => (
                <option key={b.id} value={b.id} className="bg-[#131b2e] text-[#dae2fd]">
                  {b.brand} {b.name} ({b.year})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onOpenAddNewModal}
            className="flex items-center gap-2 bg-[#89ceff] hover:bg-[#0053db] hover:text-[#cdd7ff] text-[#00344d] font-label-lg text-label-lg font-bold px-5 py-2.5 rounded-lg shadow-md transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">add_circle</span>
            <span>+ Agregar Nueva Moto</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Grid (Technical Telemetry) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Inventario */}
        <div className="bg-[#171f33] border border-[#222a3d] p-5 rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[#bec8d2]">
            <span className="font-label-sm text-label-sm uppercase">Total Motos</span>
            <span className="material-symbols-outlined text-xl text-[#89ceff]">two_wheeler</span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-[#dae2fd]">42</span>
            <span className="font-label-sm text-label-sm text-[#4edea3] font-bold flex items-center">
              <span className="material-symbols-outlined text-sm">trending_up</span>+3 este mes
            </span>
          </div>
          <div className="w-full bg-[#2d3449] h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#89ceff] h-full w-full"></div>
          </div>
        </div>

        {/* Disponibles */}
        <div className="bg-[#171f33] border border-[#222a3d] p-5 rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[#bec8d2]">
            <span className="font-label-sm text-label-sm uppercase">Disponibles</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00b17b]/20 text-[#4edea3] font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3]"></span> Activas
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-[#4edea3]">28</span>
            <span className="font-label-sm text-label-sm text-[#bec8d2]">66.7% catálogo</span>
          </div>
          <div className="w-full bg-[#2d3449] h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#4edea3] h-full w-[66.7%]"></div>
          </div>
        </div>

        {/* En Espera / Preventa */}
        <div className="bg-[#171f33] border border-[#222a3d] p-5 rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[#bec8d2]">
            <span className="font-label-sm text-label-sm uppercase">Preventa / Espera</span>
            <span className="material-symbols-outlined text-xl text-[#c9e6ff]">timelapse</span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-[#c9e6ff]">08</span>
            <span className="font-label-sm text-label-sm text-[#89ceff]">En tránsito</span>
          </div>
          <div className="w-full bg-[#2d3449] h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#c9e6ff] h-full w-[19%]"></div>
          </div>
        </div>

        {/* Agotadas Visibles */}
        <div className="bg-[#171f33] border border-[#222a3d] p-5 rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[#bec8d2]">
            <span className="font-label-sm text-label-sm uppercase">Agotadas (Vitrina)</span>
            <span className="material-symbols-outlined text-xl text-[#ffb4ab]">visibility_off</span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-[#ffb4ab]">04</span>
            <span className="font-label-sm text-label-sm text-[#bec8d2]">Lead magnet</span>
          </div>
          <div className="w-full bg-[#2d3449] h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#ffb4ab] h-full w-[9.5%]"></div>
          </div>
        </div>

        {/* En Revisión */}
        <div className="bg-[#171f33] border border-[#222a3d] p-5 rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[#bec8d2]">
            <span className="font-label-sm text-label-sm uppercase">En Revisión</span>
            <span className="material-symbols-outlined text-xl text-[#b4c5ff]">build_circle</span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-[#b4c5ff]">02</span>
            <span className="font-label-sm text-label-sm text-[#dbe1ff]">Taller PDI</span>
          </div>
          <div className="w-full bg-[#2d3449] h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#b4c5ff] h-full w-[4.8%]"></div>
          </div>
        </div>

        {/* Reservas Pendientes */}
        <div className="bg-[#171f33] border border-[#222a3d] p-5 rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[#bec8d2]">
            <span className="font-label-sm text-label-sm uppercase">Reservas Web</span>
            <span className="material-symbols-outlined text-xl text-[#4edea3]">how_to_reg</span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-[#dae2fd]">15</span>
            <span className="font-label-sm text-label-sm text-[#4edea3] font-bold">Por validar</span>
          </div>
          <div className="w-full bg-[#2d3449] h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#0ea5e9] h-full w-[78%]"></div>
          </div>
        </div>
      </div>

      {/* Main Workspace: Editor and Gestor Rápido de Modelo */}
      <div className="bg-[#131b2e] border border-[#222a3d] rounded-2xl p-6 lg:p-8 shadow-xl flex flex-col gap-8">
        {/* Header of the Editor Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 bg-[#171f33]/60 p-5 rounded-xl border border-[#222a3d]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#222a3d] rounded-xl flex items-center justify-center text-[#89ceff] shadow-inner border border-[#2d3449]">
              <span className="material-symbols-outlined text-3xl">sports_motorsports</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#89ceff]/20 text-[#89ceff] font-label-sm text-label-sm px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                  Unidad Seleccionada: ID #{currentBike.verifiedVin || `APX-${currentBike.id}`}
                </span>
                <span className="text-[#bec8d2] font-label-sm text-label-sm">
                  · Última sincronización: Hoy 14:22
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-[#dae2fd] font-extrabold tracking-tight mt-0.5">
                {currentBike.brand} {currentBike.name} · {currentBike.year}
              </h2>
            </div>
          </div>

          {/* Quick Master Status Radio Badges */}
          <div className="flex flex-col items-start md:items-end gap-1.5">
            <span className="font-label-sm text-label-sm uppercase text-[#bec8d2] tracking-wider">
              Estado Maestro en Vitrina
            </span>
            <div className="inline-flex bg-[#060e20] p-1 rounded-xl border border-[#2d3449] gap-1">
              <button
                type="button"
                onClick={() => handleStatusChange('disponible')}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-bold uppercase transition-all cursor-pointer ${
                  masterStatus === 'disponible'
                    ? 'bg-[#003824] text-[#4edea3] shadow-sm'
                    : 'text-[#bec8d2] hover:text-[#dae2fd]'
                }`}
              >
                • Disponible
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('agotada')}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-bold uppercase transition-all cursor-pointer ${
                  masterStatus === 'agotada'
                    ? 'bg-[#690005] text-[#ffb4ab] shadow-sm'
                    : 'text-[#bec8d2] hover:text-[#dae2fd]'
                }`}
              >
                Agotada (Vitrina)
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('espera')}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-bold uppercase transition-all cursor-pointer ${
                  masterStatus === 'espera'
                    ? 'bg-[#002a78] text-[#dbe1ff] shadow-sm'
                    : 'text-[#bec8d2] hover:text-[#dae2fd]'
                }`}
              >
                En Espera
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('revision')}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-bold uppercase transition-all cursor-pointer ${
                  masterStatus === 'revision'
                    ? 'bg-[#0053db]/40 text-[#b4c5ff] shadow-sm'
                    : 'text-[#bec8d2] hover:text-[#dae2fd]'
                }`}
              >
                En Revisión
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs within Editor */}
        <div className="flex items-center gap-2 bg-[#060e20] p-1.5 rounded-xl w-full max-w-2xl border border-[#2d3449]">
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`flex-1 py-2 px-4 rounded-lg font-label-lg text-label-lg font-bold text-center transition-all cursor-pointer ${
              activeTab === 'specs'
                ? 'bg-[#0ea5e9] text-[#003751] shadow'
                : 'text-[#bec8d2] hover:text-[#dae2fd] hover:bg-[#171f33]'
            }`}
          >
            1. Ficha y Datos Técnicos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`flex-1 py-2 px-4 rounded-lg font-label-lg text-label-lg font-bold text-center transition-all cursor-pointer ${
              activeTab === 'media'
                ? 'bg-[#0ea5e9] text-[#003751] shadow'
                : 'text-[#bec8d2] hover:text-[#dae2fd] hover:bg-[#171f33]'
            }`}
          >
            2. Fotos Multimedia ({currentBike.slides.length}/6)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('colors')}
            className={`flex-1 py-2 px-4 rounded-lg font-label-lg text-label-lg font-bold text-center transition-all cursor-pointer ${
              activeTab === 'colors'
                ? 'bg-[#0ea5e9] text-[#003751] shadow'
                : 'text-[#bec8d2] hover:text-[#dae2fd] hover:bg-[#171f33]'
            }`}
          >
            3. Variantes de Color ({colors.length})
          </button>
        </div>

        {/* TAB 1: DATOS TÉCNICOS */}
        {activeTab === 'specs' && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Marca */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                  Marca Fabricante
                </label>
                <div className="relative">
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full h-11 bg-[#171f33] border border-[#2d3449] px-3.5 rounded-lg text-[#dae2fd] font-body-md text-body-md focus:bg-[#222a3d] focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="yamaha">Yamaha Motor Corp</option>
                    <option value="ducati">Ducati Motor Holding</option>
                    <option value="kawasaki">Kawasaki Motors</option>
                    <option value="bmw">BMW Motorrad</option>
                    <option value="ktm">KTM Sportmotorcycle</option>
                    <option value="honda">Honda Racing</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-[#bec8d2] text-base">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Modelo */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                  Modelo Comercial
                </label>
                <input
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className="w-full h-11 bg-[#171f33] border border-[#2d3449] px-3.5 rounded-lg text-[#dae2fd] font-body-md text-body-md focus:bg-[#222a3d] focus:outline-none"
                />
              </div>

              {/* Año */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                  Año Modelo
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full h-11 bg-[#171f33] border border-[#2d3449] px-3.5 rounded-lg text-[#dae2fd] font-body-md text-body-md focus:bg-[#222a3d] focus:outline-none cursor-pointer"
                >
                  <option value={2025}>2025 (Próximo Lanzamiento)</option>
                  <option value={2024}>2024 (Año en Curso)</option>
                  <option value={2023}>2023 (Remanente)</option>
                </select>
              </div>

              {/* Cilindraje */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                  Cilindraje Exacto
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={displacement}
                    onChange={(e) => setDisplacement(e.target.value)}
                    className="w-full h-11 bg-[#171f33] border border-[#2d3449] px-3.5 rounded-lg text-[#dae2fd] font-body-md text-body-md focus:bg-[#222a3d] focus:outline-none font-bold"
                  />
                  <span className="absolute right-3.5 top-2.5 font-label-sm text-label-sm text-[#89ceff] uppercase">
                    Motor CP
                  </span>
                </div>
              </div>

              {/* Tipo de Freno */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                  Sistema de Frenado
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={brakes}
                    onChange={(e) => setBrakes(e.target.value)}
                    className="w-full h-11 bg-[#171f33] border border-[#2d3449] px-3.5 rounded-lg text-[#dae2fd] font-body-md text-body-md focus:bg-[#222a3d] focus:outline-none"
                  />
                </div>
              </div>

              {/* Transmisión */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                  Transmisión &amp; Embrague
                </label>
                <input
                  type="text"
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  className="w-full h-11 bg-[#171f33] border border-[#2d3449] px-3.5 rounded-lg text-[#dae2fd] font-body-md text-body-md focus:bg-[#222a3d] focus:outline-none"
                />
              </div>

              {/* Potencia y Par */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                  Potencia / Torque Máximo
                </label>
                <input
                  type="text"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                  className="w-full h-11 bg-[#171f33] border border-[#2d3449] px-3.5 rounded-lg text-[#dae2fd] font-body-md text-body-md focus:bg-[#222a3d] focus:outline-none"
                />
              </div>

              {/* Precio Base Concesionario */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                  Precio Base de Vitrina (COP)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 font-bold text-[#89ceff]">$</span>
                  <input
                    type="number"
                    value={priceCop}
                    onChange={(e) => setPriceCop(Number(e.target.value))}
                    className="w-full h-11 bg-[#171f33] border border-[#2d3449] pl-8 pr-3.5 rounded-lg text-[#89ceff] font-spec-data text-spec-data focus:bg-[#222a3d] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Descripción Técnica */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                  Descripción Técnica Detallada (Ficha Comercial y Homologación)
                </label>
                <span className="font-label-sm text-label-sm text-[#bec8d2]">
                  Sincronizado con Vitrina Web Pública
                </span>
              </div>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#171f33] border border-[#2d3449] p-4 rounded-lg text-[#dae2fd] font-body-md text-body-md focus:bg-[#222a3d] focus:outline-none leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* TAB 2: GESTOR DE FOTOS MULTIMEDIA */}
        {activeTab === 'media' && (
          <div className="flex flex-col gap-6">
            {/* Upload Notice Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#222a3d] border border-[#2d3449] p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#89ceff] text-2xl">add_photo_alternate</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-lg text-label-lg font-bold text-[#dae2fd]">
                      Gestor de Fotos de Alta Definición
                    </span>
                    <span className="bg-[#2d3449] text-[#89ceff] font-label-sm text-label-sm px-2 py-0.5 rounded font-bold">
                      {currentBike.slides.length} de 6 Utilizadas
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#bec8d2]">
                    Regla Estricta: Mínimo 1 foto requerida para publicar · Máximo 6 fotos en resolución mínima 1920x1080 px.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#4edea3] font-label-sm text-label-sm flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-base">check_circle</span> Cumple norma de vitrina
                </span>
              </div>
            </div>

            {/* Drag & Drop Simulation */}
            <div
              onClick={() => showToast('Carga de Fotos', 'Arrastre de imágenes simulado con éxito.')}
              className="bg-[#171f33] hover:bg-[#222a3d] border-2 border-dashed border-[#2d3449] hover:border-[#0ea5e9] transition-colors p-8 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-[#89ceff]/10 text-[#89ceff] flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
                <span className="material-symbols-outlined text-2xl">cloud_upload</span>
              </div>
              <p className="font-label-lg text-label-lg text-[#dae2fd] font-bold">
                Arrastra y suelta tu imagen aquí, o haz clic para explorar
              </p>
              <span className="font-body-sm text-body-sm text-[#bec8d2] mt-1">
                Formatos permitidos: WebP, PNG, JPG de alta resolución (Máx 12MB)
              </span>
            </div>

            {/* Current Photos Mosaic (Numbered 1 to 6) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {currentBike.slides.map((slide, idx) => (
                <div
                  key={idx}
                  className="bg-[#171f33] border border-[#222a3d] p-2.5 rounded-xl flex flex-col gap-2 relative shadow-md"
                >
                  <div className="relative w-full h-36 rounded-lg overflow-hidden bg-[#060e20]">
                    <img src={slide.url} alt={slide.title} className="w-full h-full object-cover" />
                    {idx === 0 ? (
                      <span className="absolute top-2 left-2 bg-[#89ceff] text-[#00344d] font-label-sm text-label-sm font-extrabold px-2 py-0.5 rounded shadow">
                        #1 PORTADA
                      </span>
                    ) : (
                      <span className="absolute top-2 left-2 bg-[#060e20]/80 text-[#dae2fd] font-label-sm text-label-sm font-bold px-1.5 py-0.5 rounded">
                        #{idx + 1} {slide.title.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between px-1">
                    {idx === 0 ? (
                      <span className="font-label-sm text-label-sm text-[#89ceff] font-bold">Principal</span>
                    ) : (
                      <button
                        onClick={() => showToast('Foto Portada', `Fijada "${slide.title}" como portada principal.`)}
                        className="font-label-sm text-label-sm text-[#bec8d2] hover:text-[#89ceff] transition-colors"
                      >
                        Fijar portada
                      </button>
                    )}
                    <button
                      onClick={() => showToast('Foto Eliminada', `Foto "${slide.title}" retirada.`)}
                      className="text-[#bec8d2] hover:text-[#ffb4ab] transition-colors cursor-pointer"
                      title="Eliminar foto"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Empty slot if less than 6 */}
              {currentBike.slides.length < 6 && (
                <div
                  onClick={() => showToast('Slot Disponible', 'Haz clic en la zona de carga para añadir foto.')}
                  className="bg-[#171f33]/40 border-2 border-dashed border-[#222a3d] p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 min-h-[190px] cursor-pointer hover:bg-[#222a3d]"
                >
                  <span className="material-symbols-outlined text-3xl text-[#bec8d2]">add_circle_outline</span>
                  <span className="font-label-sm text-label-sm uppercase font-bold text-[#bec8d2]">
                    Espacio #{currentBike.slides.length + 1} Vacío
                  </span>
                  <span className="font-body-sm text-body-sm text-[#bec8d2] text-xs">Disponible</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: VARIANTES DE COLOR Y STOCK FÍSICO */}
        {activeTab === 'colors' && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-[#dae2fd]">
                  Variantes de Color · Asignación de Bodega
                </h3>
                <p className="font-body-sm text-body-sm text-[#bec8d2]">
                  Cada color cuenta con inventario individual y control de reservas en vitrina.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddColorVariant}
                className="flex items-center gap-2 bg-[#222a3d] hover:bg-[#31394d] border border-[#3e4850] text-[#89ceff] font-label-lg text-label-lg px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">palette</span>
                <span>+ Añadir Variante de Color</span>
              </button>
            </div>

            {/* Color Matrix Table */}
            <div className="overflow-x-auto rounded-xl bg-[#171f33] border border-[#222a3d] shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-[#2d3449] text-[#bec8d2] font-label-sm text-label-sm uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Muestra</th>
                    <th className="py-3 px-4">Nombre Comercial</th>
                    <th className="py-3 px-4">Código Acabado</th>
                    <th className="py-3 px-4">Stock Físico (Bodega)</th>
                    <th className="py-3 px-4">Estado de Entrega</th>
                    <th className="py-3 px-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2d3449]/30 font-body-md text-body-md">
                  {colors.map((color) => (
                    <tr key={color.id} className="hover:bg-[#222a3d]/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            style={{ backgroundColor: color.colorHex }}
                            className="w-7 h-7 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.5)] ring-1 ring-white/20"
                          ></div>
                          {color.secondaryHex && (
                            <div
                              style={{ backgroundColor: color.secondaryHex }}
                              className="w-4 h-4 rounded-full -ml-2 ring-1 ring-black/40"
                            ></div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold text-[#dae2fd]">{color.name}</td>
                      <td className="py-3 px-4 font-mono text-[#bec8d2]">{color.code}</td>
                      <td className="py-3 px-4">
                        <div className="inline-flex items-center gap-2 bg-[#060e20] border border-[#2d3449] px-2.5 py-1 rounded-lg">
                          <input
                            type="number"
                            min="0"
                            value={color.stock}
                            onChange={(e) => handleStockChange(color.id, Number(e.target.value))}
                            className="w-12 bg-transparent text-center font-bold text-[#dae2fd] focus:outline-none"
                          />
                          <span className="text-xs text-[#bec8d2]">Uds</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={color.status}
                          onChange={(e) =>
                            handleDeliveryStatusChange(color.id, e.target.value as ColorVariant['status'])
                          }
                          className={`bg-[#060e20] font-label-sm text-label-sm font-bold uppercase px-3 py-1.5 rounded-lg border border-[#2d3449] focus:outline-none cursor-pointer ${
                            color.status === 'disponible'
                              ? 'text-[#4edea3]'
                              : color.status === 'espera'
                              ? 'text-[#c9e6ff]'
                              : 'text-[#ffb4ab]'
                          }`}
                        >
                          <option value="disponible">• Disponible (Inmediata)</option>
                          <option value="espera">En Espera (7-15 días)</option>
                          <option value="agotada">Agotado Temporal</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteVariant(color.id)}
                          className="p-1 text-[#bec8d2] hover:text-[#ffb4ab] transition-colors cursor-pointer"
                          title="Eliminar variante"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Editor Master Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 bg-[#060e20] border border-[#2d3449] p-5 rounded-xl shadow-inner">
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center gap-2 text-[#ffb4ab] hover:bg-[#93000a]/20 border border-transparent hover:border-[#ffb4ab]/30 px-4 py-2.5 rounded-lg font-label-lg text-label-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">delete_forever</span>
            <span>Eliminar Modelo</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onPreviewInCatalog(currentBike)}
              className="flex items-center gap-2 bg-[#222a3d] hover:bg-[#31394d] border border-[#3e4850] text-[#dae2fd] font-label-lg text-label-lg px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">preview</span>
              <span>Vista Previa en Catálogo</span>
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSaveChanges}
              className="flex items-center gap-2 bg-[#89ceff] hover:bg-[#0053db] text-[#00344d] hover:text-[#cdd7ff] font-label-lg text-label-lg font-bold px-6 py-2.5 rounded-lg shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">refresh</span>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">save</span>
                  <span>Guardar Cambios</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#060e20]/80 backdrop-blur-md p-4">
          <div className="bg-[#131b2e] border border-[#2d3449] max-w-lg w-full rounded-2xl p-6 lg:p-8 flex flex-col gap-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#93000a]/30 text-[#ffb4ab] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-3xl">warning</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#ffb4ab] font-bold">
                  Doble Verificación de Seguridad
                </span>
                <h3 className="font-headline-sm text-headline-sm text-[#dae2fd] font-bold">
                  ¿Confirmar eliminación permanente?
                </h3>
              </div>
            </div>

            <div className="bg-[#171f33] border border-[#222a3d] p-4 rounded-xl flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#bec8d2] text-base">two_wheeler</span>
                <span className="font-label-lg text-label-lg text-[#dae2fd] font-bold">
                  {currentBike.brand} {currentBike.name} (Modelo {currentBike.year})
                </span>
              </div>
              <p className="font-body-md text-body-md text-[#bec8d2]">
                Esta acción retirará las fotos asociadas, las variantes de color registradas y anulará el enlace
                público del catálogo. Si existen cotizaciones activas, quedarán en estado histórico archivado.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-5 py-2.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-label-lg text-label-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#93000a] hover:bg-[#690005] text-[#ffdad6] font-label-lg text-label-lg font-bold shadow-lg transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">delete_forever</span>
                <span>Sí, Eliminar Definitivamente</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-8 z-50 flex items-center gap-3 bg-[#222a3d] border border-[#3e4850] text-[#dae2fd] px-5 py-3.5 rounded-xl shadow-2xl transition-all duration-300">
          <span
            className={`material-symbols-outlined text-2xl ${
              toast.isError ? 'text-[#ffb4ab]' : 'text-[#4edea3]'
            }`}
          >
            {toast.isError ? 'warning' : 'check_circle'}
          </span>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg font-bold">{toast.title}</span>
            <span className="font-body-sm text-body-sm text-[#bec8d2]">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
