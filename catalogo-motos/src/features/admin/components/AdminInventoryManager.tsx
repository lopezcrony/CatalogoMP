import React, { useState } from 'react';
import { Motorcycle, ColorVariant, BikeStatus } from '../../../types';
import { Icon } from '../../../components/Icon';

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
      showToast('Estado: Disponible', 'La unidad ya recibe solicitudes de cotización en la vitrina.');
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
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-surface-container-low border border-surface-container-high p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
              Operaciones de Inventario · Sala de Control
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
            Gestión Maestra de Modelos y Stock
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Monitoreo de disponibilidad en vitrina digital, homologación de catálogo técnico y cambio de año modelo.
          </p>
        </div>

        {/* Quick Action Group */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Quick Motorcycle Picker to edit any bike in inventory */}
          <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant px-3 py-1.5 rounded-lg">
            <Icon name="swap_horiz" size={14} className="text-outline" />
            <select
              value={selectedBikeId}
              onChange={(e) => handleSelectDifferentBike(Number(e.target.value))}
              className="bg-transparent text-on-surface text-xs font-semibold focus:outline-none cursor-pointer"
            >
              {motorcycles.map((b) => (
                <option key={b.id} value={b.id} className="bg-surface-container-low text-on-surface">
                  {b.brand} {b.name} ({b.year})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onOpenAddNewModal}
            className="flex items-center gap-2 bg-primary hover:bg-primary hover:text-on-primary text-on-primary-container font-label-lg text-label-lg font-bold px-5 py-2.5 rounded-lg shadow-md transition-all cursor-pointer"
          >
            <Icon name="add_circle" size={20} />
            <span>+ Agregar Nueva Moto</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Grid (Technical Telemetry) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Inventario */}
        <div className="bg-surface-container border border-surface-container-high p-5 rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm uppercase">Total Motos</span>
            <Icon name="two_wheeler" size={20} className="text-primary" />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-on-surface">42</span>
            <span className="font-label-sm text-label-sm text-tertiary font-bold flex items-center">
              <Icon name="trending_up" size={14} />+3 este mes
            </span>
          </div>
          <div className="w-full bg-outline-variant h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary h-full w-full"></div>
          </div>
        </div>

        {/* Disponibles */}
        <div className="bg-surface-container border border-surface-container-high p-5 rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm uppercase">Disponibles</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-tertiary/20 text-tertiary font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(21,128,61,0.35)]"></span> Activas
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-tertiary">28</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">66.7% catálogo</span>
          </div>
          <div className="w-full bg-outline-variant h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-tertiary h-full w-[66.7%]"></div>
          </div>
        </div>

        {/* En Espera / Preventa */}
        <div className="bg-surface-container border border-surface-container-high p-5 rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm uppercase">Preventa / Espera</span>
            <Icon name="time" size={20} className="text-primary" />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-primary">08</span>
            <span className="font-label-sm text-label-sm text-primary">En tránsito</span>
          </div>
          <div className="w-full bg-outline-variant h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary h-full w-[19%]"></div>
          </div>
        </div>

        {/* Agotadas Visibles */}
        <div className="bg-surface-container border border-surface-container-high p-5 rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm uppercase">Agotadas (Vitrina)</span>
            <Icon name="visibility_off" size={20} className="text-error" />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-error">04</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Lead magnet</span>
          </div>
          <div className="w-full bg-outline-variant h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-error h-full w-[9.5%]"></div>
          </div>
        </div>

        {/* En Revisión */}
        <div className="bg-surface-container border border-surface-container-high p-5 rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm uppercase">En Revisión</span>
            <Icon name="wrench" size={20} className="text-secondary" />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg text-primary">02</span>
            <span className="font-label-sm text-label-sm text-on-surface">Taller PDI</span>
          </div>
          <div className="w-full bg-outline-variant h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary h-full w-[4.8%]"></div>
          </div>
        </div>

      </div>

      {/* Main Workspace: Editor and Gestor Rápido de Modelo */}
      <div className="bg-surface-container-low border border-surface-container-high rounded-2xl p-6 lg:p-8 shadow-xl flex flex-col gap-8">
        {/* Header of the Editor Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 bg-surface-container/60 p-5 rounded-xl border border-surface-container-high">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-surface-container-high rounded-xl flex items-center justify-center text-primary shadow-inner border border-outline-variant">
              <Icon name="sports_motorsports" size={30} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-primary/20 text-primary font-label-sm text-label-sm px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                  Unidad Seleccionada: ID #{currentBike.verifiedVin || `APX-${currentBike.id}`}
                </span>
                <span className="text-on-surface-variant font-label-sm text-label-sm">
                  · Última sincronización: Hoy 14:22
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight mt-0.5">
                {currentBike.brand} {currentBike.name} · {currentBike.year}
              </h2>
            </div>
          </div>

          {/* Quick Master Status Radio Badges */}
          <div className="flex flex-col items-start md:items-end gap-1.5">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">
              Estado Maestro en Vitrina
            </span>
            <div className="inline-flex bg-surface-container-lowest p-1 rounded-xl border border-outline-variant gap-1">
              <button
                type="button"
                onClick={() => handleStatusChange('disponible')}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-bold uppercase transition-all cursor-pointer ${
                  masterStatus === 'disponible'
                    ? 'bg-tertiary-container text-tertiary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                • Disponible
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('agotada')}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-bold uppercase transition-all cursor-pointer ${
                  masterStatus === 'agotada'
                    ? 'bg-error-container text-error shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Agotada (Vitrina)
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('espera')}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-bold uppercase transition-all cursor-pointer ${
                  masterStatus === 'espera'
                    ? 'bg-primary-container text-on-surface shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                En Espera
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('revision')}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-bold uppercase transition-all cursor-pointer ${
                  masterStatus === 'revision'
                    ? 'bg-primary/40 text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                En Revisión
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs within Editor */}
        <div className="flex items-center gap-2 bg-surface-container-lowest p-1.5 rounded-xl w-full max-w-2xl border border-outline-variant">
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`flex-1 py-2 px-4 rounded-lg font-label-lg text-label-lg font-bold text-center transition-all cursor-pointer ${
              activeTab === 'specs'
                ? 'bg-primary text-on-primary-container shadow'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            1. Ficha y Datos Técnicos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`flex-1 py-2 px-4 rounded-lg font-label-lg text-label-lg font-bold text-center transition-all cursor-pointer ${
              activeTab === 'media'
                ? 'bg-primary text-on-primary-container shadow'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            2. Fotos Multimedia ({currentBike.slides.length}/6)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('colors')}
            className={`flex-1 py-2 px-4 rounded-lg font-label-lg text-label-lg font-bold text-center transition-all cursor-pointer ${
              activeTab === 'colors'
                ? 'bg-primary text-on-primary-container shadow'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
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
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Marca Fabricante
                </label>
                <div className="relative">
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full h-11 bg-surface-container border border-outline-variant px-3.5 rounded-lg text-on-surface font-body-md text-body-md focus:bg-surface-container-high focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="yamaha">Yamaha Motor Corp</option>
                    <option value="ducati">Ducati Motor Holding</option>
                    <option value="kawasaki">Kawasaki Motors</option>
                    <option value="bmw">BMW Motorrad</option>
                    <option value="ktm">KTM Sportmotorcycle</option>
                    <option value="honda">Honda Racing</option>
                  </select>
                  <Icon name="expand_more" size={16} className="absolute right-3 top-3 pointer-events-none text-on-surface-variant" />
                </div>
              </div>

              {/* Modelo */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Modelo Comercial
                </label>
                <input
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className="w-full h-11 bg-surface-container border border-outline-variant px-3.5 rounded-lg text-on-surface font-body-md text-body-md focus:bg-surface-container-high focus:outline-none"
                />
              </div>

              {/* Año */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Año Modelo
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full h-11 bg-surface-container border border-outline-variant px-3.5 rounded-lg text-on-surface font-body-md text-body-md focus:bg-surface-container-high focus:outline-none cursor-pointer"
                >
                  <option value={2025}>2025 (Próximo Lanzamiento)</option>
                  <option value={2024}>2024 (Año en Curso)</option>
                  <option value={2023}>2023 (Remanente)</option>
                </select>
              </div>

              {/* Cilindraje */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Cilindraje Exacto
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={displacement}
                    onChange={(e) => setDisplacement(e.target.value)}
                    className="w-full h-11 bg-surface-container border border-outline-variant px-3.5 rounded-lg text-on-surface font-body-md text-body-md focus:bg-surface-container-high focus:outline-none font-bold"
                  />
                  <span className="absolute right-3.5 top-2.5 font-label-sm text-label-sm text-primary uppercase">
                    Motor CP
                  </span>
                </div>
              </div>

              {/* Tipo de Freno */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Sistema de Frenado
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={brakes}
                    onChange={(e) => setBrakes(e.target.value)}
                    className="w-full h-11 bg-surface-container border border-outline-variant px-3.5 rounded-lg text-on-surface font-body-md text-body-md focus:bg-surface-container-high focus:outline-none"
                  />
                </div>
              </div>

              {/* Transmisión */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Transmisión &amp; Embrague
                </label>
                <input
                  type="text"
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  className="w-full h-11 bg-surface-container border border-outline-variant px-3.5 rounded-lg text-on-surface font-body-md text-body-md focus:bg-surface-container-high focus:outline-none"
                />
              </div>

              {/* Potencia y Par */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Potencia / Torque Máximo
                </label>
                <input
                  type="text"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                  className="w-full h-11 bg-surface-container border border-outline-variant px-3.5 rounded-lg text-on-surface font-body-md text-body-md focus:bg-surface-container-high focus:outline-none"
                />
              </div>

              {/* Precio Base Concesionario */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Precio Base de Vitrina (COP)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 font-bold text-primary">$</span>
                  <input
                    type="number"
                    value={priceCop}
                    onChange={(e) => setPriceCop(Number(e.target.value))}
                    className="w-full h-11 bg-surface-container border border-outline-variant pl-8 pr-3.5 rounded-lg text-primary font-spec-data text-spec-data focus:bg-surface-container-high focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Descripción Técnica */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Descripción Técnica Detallada (Ficha Comercial y Homologación)
                </label>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Sincronizado con Vitrina Web Pública
                </span>
              </div>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant p-4 rounded-lg text-on-surface font-body-md text-body-md focus:bg-surface-container-high focus:outline-none leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* TAB 2: GESTOR DE FOTOS MULTIMEDIA */}
        {activeTab === 'media' && (
          <div className="flex flex-col gap-6">
            {/* Upload Notice Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-high border border-outline-variant p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <Icon name="add_photo_alternate" size={24} className="text-primary" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-lg text-label-lg font-bold text-on-surface">
                      Gestor de Fotos de Alta Definición
                    </span>
                    <span className="bg-outline-variant text-primary font-label-sm text-label-sm px-2 py-0.5 rounded font-bold">
                      {currentBike.slides.length} de 6 Utilizadas
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Regla Estricta: Mínimo 1 foto requerida para publicar · Máximo 6 fotos en resolución mínima 1920x1080 px.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-tertiary font-label-sm text-label-sm flex items-center gap-1 font-bold">
                  <Icon name="check_circle" size={16} /> Cumple norma de vitrina
                </span>
              </div>
            </div>

            {/* Drag & Drop Simulation */}
            <div
              onClick={() => showToast('Carga de Fotos', 'Arrastre de imágenes simulado con éxito.')}
              className="bg-surface-container hover:bg-surface-container-high border-2 border-dashed border-outline-variant hover:border-primary transition-colors p-8 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
                <Icon name="cloud_upload" size={24} />
              </div>
              <p className="font-label-lg text-label-lg text-on-surface font-bold">
                Arrastra y suelta tu imagen aquí, o haz clic para explorar
              </p>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Formatos permitidos: WebP, PNG, JPG de alta resolución (Máx 12MB)
              </span>
            </div>

            {/* Current Photos Mosaic (Numbered 1 to 6) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {currentBike.slides.map((slide, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container border border-surface-container-high p-2.5 rounded-xl flex flex-col gap-2 relative shadow-md"
                >
                  <div className="relative w-full h-36 rounded-lg overflow-hidden bg-surface-container-lowest">
                    <img src={slide.url} alt={slide.title} className="w-full h-full object-cover" />
                    {idx === 0 ? (
                      <span className="absolute top-2 left-2 bg-primary text-on-primary-container font-label-sm text-label-sm font-extrabold px-2 py-0.5 rounded shadow">
                        #1 PORTADA
                      </span>
                    ) : (
                      <span className="absolute top-2 left-2 bg-surface-container-lowest/80 text-on-surface font-label-sm text-label-sm font-bold px-1.5 py-0.5 rounded">
                        #{idx + 1} {slide.title.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between px-1">
                    {idx === 0 ? (
                      <span className="font-label-sm text-label-sm text-primary font-bold">Principal</span>
                    ) : (
                      <button
                        onClick={() => showToast('Foto Portada', `Fijada "${slide.title}" como portada principal.`)}
                        className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
                      >
                        Fijar portada
                      </button>
                    )}
                    <button
                      onClick={() => showToast('Foto Eliminada', `Foto "${slide.title}" retirada.`)}
                      className="text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                      title="Eliminar foto"
                    >
                      <Icon name="delete" size={18} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Empty slot if less than 6 */}
              {currentBike.slides.length < 6 && (
                <div
                  onClick={() => showToast('Slot Disponible', 'Haz clic en la zona de carga para añadir foto.')}
                  className="bg-surface-container/40 border-2 border-dashed border-surface-container-high p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 min-h-[190px] cursor-pointer hover:bg-surface-container-high"
                >
                  <Icon name="add_circle_outline" size={30} className="text-on-surface-variant" />
                  <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">
                    Espacio #{currentBike.slides.length + 1} Vacío
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">Disponible</span>
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
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Variantes de Color · Asignación de Bodega
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Cada color cuenta con inventario individual y estado propio en vitrina.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddColorVariant}
                className="flex items-center gap-2 bg-surface-container-high hover:bg-surface-container-highest border border-outline text-primary font-label-lg text-label-lg px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <Icon name="palette" size={18} />
                <span>+ Añadir Variante de Color</span>
              </button>
            </div>

            {/* Color Matrix Table */}
            <div className="overflow-x-auto rounded-xl bg-surface-container border border-surface-container-high shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-outline-variant text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Muestra</th>
                    <th className="py-3 px-4">Nombre Comercial</th>
                    <th className="py-3 px-4">Código Acabado</th>
                    <th className="py-3 px-4">Stock Físico (Bodega)</th>
                    <th className="py-3 px-4">Estado de Entrega</th>
                    <th className="py-3 px-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 font-body-md text-body-md">
                  {colors.map((color) => (
                    <tr key={color.id} className="hover:bg-surface-container-high/50 transition-colors">
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
                      <td className="py-3 px-4 font-bold text-on-surface">{color.name}</td>
                      <td className="py-3 px-4 font-mono text-on-surface-variant">{color.code}</td>
                      <td className="py-3 px-4">
                        <div className="inline-flex items-center gap-2 bg-surface-container-lowest border border-outline-variant px-2.5 py-1 rounded-lg">
                          <input
                            type="number"
                            min="0"
                            value={color.stock}
                            onChange={(e) => handleStockChange(color.id, Number(e.target.value))}
                            className="w-12 bg-transparent text-center font-bold text-on-surface focus:outline-none"
                          />
                          <span className="text-xs text-on-surface-variant">Uds</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={color.status}
                          onChange={(e) =>
                            handleDeliveryStatusChange(color.id, e.target.value as ColorVariant['status'])
                          }
                          className={`bg-surface-container-lowest font-label-sm text-label-sm font-bold uppercase px-3 py-1.5 rounded-lg border border-outline-variant focus:outline-none cursor-pointer ${
                            color.status === 'disponible'
                              ? 'text-tertiary'
                              : color.status === 'espera'
                              ? 'text-primary'
                              : 'text-error'
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
                          className="p-1 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                          title="Eliminar variante"
                        >
                          <Icon name="delete" size={18} />
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-inner">
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center gap-2 text-error hover:bg-error/20 border border-transparent hover:border-error/30 px-4 py-2.5 rounded-lg font-label-lg text-label-lg transition-colors cursor-pointer"
          >
            <Icon name="delete_forever" size={18} />
            <span>Eliminar Modelo</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onPreviewInCatalog(currentBike)}
              className="flex items-center gap-2 bg-surface-container-high hover:bg-surface-container-highest border border-outline text-on-surface font-label-lg text-label-lg px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              <Icon name="preview" size={18} />
              <span>Vista Previa en Catálogo</span>
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSaveChanges}
              className="flex items-center gap-2 bg-primary hover:bg-primary text-on-primary-container hover:text-on-primary font-label-lg text-label-lg font-bold px-6 py-2.5 rounded-lg shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Icon name="refresh" size={18} className="animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Icon name="save" size={18} />
                  <span>Guardar Cambios</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-container-lowest/80 backdrop-blur-md p-4">
          <div className="bg-surface-container-low border border-outline-variant max-w-lg w-full rounded-2xl p-6 lg:p-8 flex flex-col gap-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-error/30 text-error flex items-center justify-center shrink-0">
                <Icon name="warning" size={30} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-error font-bold">
                  Doble Verificación de Seguridad
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  ¿Confirmar eliminación permanente?
                </h3>
              </div>
            </div>

            <div className="bg-surface-container border border-surface-container-high p-4 rounded-xl flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Icon name="two_wheeler" size={16} className="text-on-surface-variant" />
                <span className="font-label-lg text-label-lg text-on-surface font-bold">
                  {currentBike.brand} {currentBike.name} (Modelo {currentBike.year})
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Esta acción retirará las fotos asociadas, las variantes de color registradas y anulará el enlace
                público del catálogo. Si existen cotizaciones activas, quedarán en estado histórico archivado.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-5 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-error hover:bg-error-container text-on-error-container font-label-lg text-label-lg font-bold shadow-lg transition-colors cursor-pointer"
              >
                <Icon name="delete_forever" size={18} />
                <span>Sí, Eliminar Definitivamente</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-8 z-50 flex items-center gap-3 bg-surface-container-high border border-outline text-on-surface px-5 py-3.5 rounded-xl shadow-2xl transition-all duration-300">
          <Icon
            name={toast.isError ? 'warning' : 'check_circle'}
            size={24}
            className={toast.isError ? 'text-error' : 'text-tertiary'}
          />
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg font-bold">{toast.title}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
