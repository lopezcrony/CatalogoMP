import React, { useState } from 'react';
import { Motorcycle, BikeStatus, ColorVariant } from '../../../types';

interface AdminAddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newBike: Motorcycle) => void;
  initialBike?: Motorcycle | null;
}

export const AdminAddEditModal: React.FC<AdminAddEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialBike,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'gallery' | 'variants' | 'pricing'>('general');

  // Fields
  const [brand, setBrand] = useState(initialBike?.brand || 'Yamaha');
  const [modelName, setModelName] = useState(initialBike?.name || '');
  const [year, setYear] = useState(initialBike?.year || 2025);
  const [status, setStatus] = useState<BikeStatus>(initialBike?.status || 'revision');

  // Specs
  const [cc, setCc] = useState(initialBike?.displacement || '689 cc');
  const [power, setPower] = useState(initialBike?.power || '73.4 HP @ 8,750 RPM');
  const [weight, setWeight] = useState(initialBike?.weight || '184 kg');
  const [torque, setTorque] = useState(initialBike?.torque || '67.0 Nm @ 6,500 RPM');
  const [brakes, setBrakes] = useState(initialBike?.brakes || 'Doble disco flotante 298 mm Brembo, ABS Cornering');
  const [suspension, setSuspension] = useState(initialBike?.suspension || 'Horquilla telescópica invertida KYB 41mm ajustable');

  // Equipment tags
  const [tags, setTags] = useState<string[]>(
    initialBike?.extras || [
      'Quickshifter Bidireccional',
      'Pantalla TFT 5" con Conectividad',
      '3 Modos de Manejo (Rain/Street/Sport)',
      'Control de Tracción TCS desconectable',
    ]
  );
  const [newTagInput, setNewTagInput] = useState('');

  // Prices
  const [priceRetailCop, setPriceRetailCop] = useState(initialBike?.priceRawCop || 45000000);
  const [priceReserveCop, setPriceReserveCop] = useState(2000000);
  const [priceRegistrationCop, setPriceRegistrationCop] = useState(1300000);

  // Photos
  const [slides, setSlides] = useState(
    initialBike?.slides || [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcBGV7ns64yN7R-GZxJNaJ4wBHxGwdPMFKqJzdxonWB-oTcXOVndEXTrG-eg_Sbzw2j_TFsYsZnAp1g8zSpXYLYD0bnrEBe8r58rQyKGji7dQBjiqXEkoDo0vjDtYzg5ZP7gUPzyMzxAvuERd_Q4o7r0ZBnt_a0zxqC8AwiaRux0qqbDdtDur7cl2SfL4CQR1kifYeyjUhqnHVJFwk9pWLi4bOskjTlq3_D-SywgQdN6ZjGj6DlqUm',
        title: 'Principal Lateral',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmXUmHCL78oSbr-QKhfClHPR0MuZNcz-7xY9mfyTx55G_kdBsspvkemnVDcLDD7fj3CMaQtLzZ2TTdx55RcRMeZrhJXTBerNcmStZ3n2p0LXb2vIfJlX4pm_Nh7HHkaV_GJ_YkKcf6TSigJCIqxSuSTFElce3wX7AGlmk8U242jaS8Jl0X4VvkB1qNPaxAHADz3A15pe6XIG8fexgM4y9KPp0ygZWuzJdUcEHiTlncLdWo6YQA0yBu',
        title: 'Cockpit TFT 5"',
      },
    ]
  );

  // Variants
  const [variants, setVariants] = useState<ColorVariant[]>(
    initialBike?.colors || [
      {
        id: 'var-1',
        name: 'Cyan Storm (Azul / Gris Nardo)',
        code: 'CS-0924',
        stock: 4,
        transitStock: 2,
        status: 'disponible',
        statusText: 'Disponible',
        colorHex: '#06b6d4',
        secondaryHex: '#64748b',
      },
      {
        id: 'var-2',
        name: 'Tech Black (Negro Mate Satinado)',
        code: 'TB-0118',
        stock: 1,
        transitStock: 0,
        status: 'disponible',
        statusText: 'Disponible',
        colorHex: '#0f172a',
        secondaryHex: '#334155',
      },
    ]
  );

  // Danger box
  const [showDangerBox, setShowDangerBox] = useState(false);

  if (!isOpen) return null;

  const handleLoadPreset = () => {
    setBrand('Yamaha');
    setModelName('MT-07 Pure Edition');
    setYear(2025);
    setStatus('disponible');
    setCc('689 cc');
    setPower('73.4 HP @ 8,750 RPM');
    setWeight('184 kg');
    setTorque('67.0 Nm @ 6,500 RPM');
    setBrakes('Doble disco delantero de 298 mm con pinzas radiales y ABS Cornering');
    setSuspension('Horquilla telescópica invertida de 130 mm de recorrido');
    setPriceRetailCop(49900000);
    setPriceReserveCop(2000000);
    setPriceRegistrationCop(1300000);
    setTags([
      'Quickshifter Bidireccional A&S',
      'Pantalla TFT 5" Y-Connect',
      '3 Modos D-Mode Integrados',
      'Control de Tracción TCS desconectable',
      'Iluminación Full LED Bifuncional',
    ]);
  };

  const handleAddTag = (text: string) => {
    if (text.trim() && !tags.includes(text.trim())) {
      setTags([...tags, text.trim()]);
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSaveAndPublish = (asDraft = false) => {
    const finalStatus = asDraft ? 'revision' : status;
    const finalBike: Motorcycle = {
      id: initialBike?.id || Date.now(),
      brand,
      brandSubtitle: `${brand} Official Range`,
      name: modelName || 'Nueva Motocicleta',
      year,
      displacement: cc,
      displacementSegment: '650-900 cc',
      status: finalStatus,
      statusLabel:
        finalStatus === 'disponible'
          ? 'Disponible'
          : finalStatus === 'espera'
          ? 'En Preventa'
          : finalStatus === 'revision'
          ? 'En Revisión'
          : 'Agotada',
      priceRawCop: priceRetailCop,
      priceDocsCop: priceRetailCop + priceRegistrationCop + priceReserveCop,
      monthlyFinanceCop: Math.round(priceRetailCop / 48),
      chassis: 'Estructura Liviana de Acero',
      power,
      torque,
      brakes,
      suspension,
      weight,
      transmission: '6 velocidades con embrague antirrebote asistido',
      emissions: 'Euro 5+ Homologada',
      consumption: '4.5 L / 100 km',
      acceleration: '0-100 km/h en 3.5 seg',
      description: `${modelName || 'Motocicleta'} con homologación oficial del concesionario y paquete completo de telemetría y seguridad.`,
      colors: variants,
      slides,
      extras: tags,
      verifiedVin: `VIN Verificado #APX-${Math.floor(Math.random() * 9000 + 1000)}`,
    };

    onSave(finalBike);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#060e20]/80 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-5xl my-auto bg-[#131b2e] border border-[#2d3449] rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* Glow Ribbon */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-28 bg-[#0ea5e9]/20 blur-3xl pointer-events-none"></div>

        {/* 1. Modal Header */}
        <div className="px-8 py-5 bg-[#171f33] border-b border-[#222a3d] flex items-center justify-between relative z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#222a3d] flex items-center justify-center text-[#89ceff] shadow-sm border border-[#2d3449]">
              <span className="material-symbols-outlined text-2xl">two_wheeler</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h2 className="font-headline-md text-headline-md text-[#dae2fd] tracking-tight">
                  {initialBike ? `Editar Modelo: ${initialBike.name}` : 'Agregar Nueva Moto al Catálogo'}
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm flex items-center gap-1.5 shadow-sm border ${
                    status === 'disponible'
                      ? 'bg-[#003824] text-[#4edea3] border-[#4edea3]/30'
                      : status === 'espera'
                      ? 'bg-[#002a78] text-[#b4c5ff] border-[#b4c5ff]/30'
                      : 'bg-[#222a3d] text-[#bec8d2] border-[#2d3449]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      status === 'disponible' ? 'bg-[#4edea3]' : 'bg-[#89ceff]'
                    }`}
                  ></span>
                  <span>
                    {status === 'disponible'
                      ? 'Disponible en Vitrina'
                      : status === 'espera'
                      ? 'En Preventa'
                      : 'Borrador / No publicado'}
                  </span>
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-[#bec8d2]">
                Configure especificaciones mecánicas, multimedia y reglas comerciales del modelo.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadPreset}
              className="px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] border border-[#3e4850] text-[#89ceff] font-label-sm text-label-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Cargar plantilla de prueba Yamaha MT-07"
            >
              <span className="material-symbols-outlined text-base">auto_fix_high</span>
              <span>Cargar Preset MT-07</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-[#222a3d] hover:bg-[#31394d] border border-[#3e4850] text-[#dae2fd] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* 2. Navigation Tabs Bar */}
        <div className="px-8 bg-[#060e20] border-b border-[#171f33] flex items-center gap-2 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`px-4 py-3.5 font-label-lg text-label-lg flex items-center gap-2 transition-colors cursor-pointer relative ${
              activeTab === 'general'
                ? 'text-[#89ceff] bg-[#131b2e]'
                : 'text-[#bec8d2] hover:text-[#dae2fd]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">tune</span>
            <span>1. Datos Generales &amp; Técnicos</span>
            {activeTab === 'general' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0ea5e9]"></span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-3.5 font-label-lg text-label-lg flex items-center gap-2 transition-colors cursor-pointer relative ${
              activeTab === 'gallery'
                ? 'text-[#89ceff] bg-[#131b2e]'
                : 'text-[#bec8d2] hover:text-[#dae2fd]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">photo_library</span>
            <span>2. Galería de Fotos</span>
            <span className="bg-[#222a3d] px-2 py-0.5 rounded-full font-label-sm text-label-sm text-[#89ceff]">
              {slides.length}/6
            </span>
            {activeTab === 'gallery' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0ea5e9]"></span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('variants')}
            className={`px-4 py-3.5 font-label-lg text-label-lg flex items-center gap-2 transition-colors cursor-pointer relative ${
              activeTab === 'variants'
                ? 'text-[#89ceff] bg-[#131b2e]'
                : 'text-[#bec8d2] hover:text-[#dae2fd]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">palette</span>
            <span>3. Variantes de Color &amp; Stock</span>
            <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
            {activeTab === 'variants' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0ea5e9]"></span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`px-4 py-3.5 font-label-lg text-label-lg flex items-center gap-2 transition-colors cursor-pointer relative ${
              activeTab === 'pricing'
                ? 'text-[#89ceff] bg-[#131b2e]'
                : 'text-[#bec8d2] hover:text-[#dae2fd]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">receipt_long</span>
            <span>4. Precios &amp; Documentación</span>
            {activeTab === 'pricing' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0ea5e9]"></span>
            )}
          </button>
        </div>

        {/* 3. Scrollable Tab Content Body */}
        <div className="p-8 overflow-y-auto space-y-8 flex-1">
          {/* TAB 1: DATOS GENERALES Y TÉCNICOS */}
          {activeTab === 'general' && (
            <div className="flex flex-col gap-8">
              {/* Master Status Strip */}
              <div className="bg-[#171f33] border border-[#222a3d] p-4 rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase tracking-wider">
                    Estado de Publicación en Plataforma
                  </span>
                  <span className="font-body-sm text-body-sm text-[#88929b]">
                    Determina visibilidad en el portal público y red de concesionarios
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus('disponible')}
                    className={`p-3 rounded-lg border flex items-center gap-3 transition-all cursor-pointer ${
                      status === 'disponible'
                        ? 'bg-[#003824]/40 border-[#4edea3] text-[#dae2fd]'
                        : 'bg-[#222a3d] border-transparent text-[#bec8d2]'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-[#4edea3] shadow-[0_0_8px_currentColor]"></div>
                    <div className="flex flex-col text-left">
                      <span className="font-label-md text-label-md">Disponible</span>
                      <span className="font-body-sm text-body-sm text-[#4edea3]">Vitrina y reserva</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('agotada')}
                    className={`p-3 rounded-lg border flex items-center gap-3 transition-all cursor-pointer ${
                      status === 'agotada'
                        ? 'bg-[#2d3449] border-[#88929b] text-[#dae2fd]'
                        : 'bg-[#222a3d] border-transparent text-[#bec8d2]'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-[#88929b]"></div>
                    <div className="flex flex-col text-left">
                      <span className="font-label-md text-label-md">Agotada Visible</span>
                      <span className="font-body-sm text-body-sm text-[#bec8d2]">Solo catálogo</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('espera')}
                    className={`p-3 rounded-lg border flex items-center gap-3 transition-all cursor-pointer ${
                      status === 'espera'
                        ? 'bg-[#002a78]/40 border-[#b4c5ff] text-[#dae2fd]'
                        : 'bg-[#222a3d] border-transparent text-[#bec8d2]'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-[#b4c5ff] shadow-[0_0_8px_currentColor]"></div>
                    <div className="flex flex-col text-left">
                      <span className="font-label-md text-label-md">En Preventa</span>
                      <span className="font-body-sm text-body-sm text-[#b4c5ff]">Cupos anticipados</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('revision')}
                    className={`p-3 rounded-lg border flex items-center gap-3 transition-all cursor-pointer ${
                      status === 'revision'
                        ? 'bg-[#0ea5e9]/20 border-[#0ea5e9] text-[#dae2fd]'
                        : 'bg-[#222a3d] border-transparent text-[#bec8d2]'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-[#89ceff] animate-pulse"></div>
                    <div className="flex flex-col text-left">
                      <span className="font-label-md text-label-md">En Revisión</span>
                      <span className="font-body-sm text-body-sm text-[#89ceff]">No indexado</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Identification */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#89ceff] text-xl">badge</span>
                  <h3 className="font-headline-sm text-headline-sm text-[#dae2fd]">Identificación del Vehículo</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4 flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-[#bec8d2]">Marca Fabricante *</label>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full h-11 bg-[#060e20] text-[#dae2fd] border border-[#2d3449] px-3.5 rounded-lg focus:border-[#0ea5e9] focus:outline-none"
                    >
                      <option value="Yamaha">Yamaha</option>
                      <option value="Kawasaki">Kawasaki</option>
                      <option value="Honda">Honda</option>
                      <option value="BMW">BMW Motorrad</option>
                      <option value="Ducati">Ducati</option>
                      <option value="KTM">KTM</option>
                    </select>
                  </div>
                  <div className="md:col-span-5 flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-[#bec8d2]">Nombre de Modelo &amp; Edición *</label>
                    <input
                      type="text"
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                      placeholder="Ej. MT-07 Pure / SP Carbon Edition"
                      className="w-full h-11 bg-[#060e20] text-[#dae2fd] border border-[#2d3449] px-3.5 rounded-lg focus:border-[#0ea5e9] focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-3 flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-[#bec8d2]">Año de Fabricación *</label>
                    <select
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="w-full h-11 bg-[#060e20] text-[#dae2fd] border border-[#2d3449] px-3.5 rounded-lg focus:border-[#0ea5e9] focus:outline-none"
                    >
                      <option value={2025}>2025 (Nuevo Modelo)</option>
                      <option value={2024}>2024 (En Curso)</option>
                      <option value={2023}>2023 (Remanente)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Specs */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#89ceff] text-xl">speed</span>
                    <h3 className="font-headline-sm text-headline-sm text-[#dae2fd]">Ficha Técnica &amp; Desempeño</h3>
                  </div>
                  <span className="font-label-sm text-label-sm text-[#88929b] uppercase tracking-wider">
                    Unidades Métricas Certificadas
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-[#171f33] border border-[#222a3d] p-4 rounded-xl flex flex-col gap-2">
                    <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase">Cilindraje</span>
                    <input
                      type="text"
                      value={cc}
                      onChange={(e) => setCc(e.target.value)}
                      className="w-full h-11 bg-[#060e20] border border-[#2d3449] text-[#dae2fd] font-spec-data text-spec-data px-3 rounded-lg focus:border-[#0ea5e9] focus:outline-none"
                    />
                  </div>
                  <div className="bg-[#171f33] border border-[#222a3d] p-4 rounded-xl flex flex-col gap-2">
                    <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase">Potencia Máxima</span>
                    <input
                      type="text"
                      value={power}
                      onChange={(e) => setPower(e.target.value)}
                      className="w-full h-11 bg-[#060e20] border border-[#2d3449] text-[#dae2fd] font-spec-data text-spec-data px-3 rounded-lg focus:border-[#0ea5e9] focus:outline-none"
                    />
                  </div>
                  <div className="bg-[#171f33] border border-[#222a3d] p-4 rounded-xl flex flex-col gap-2">
                    <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase">Peso en Seco</span>
                    <input
                      type="text"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full h-11 bg-[#060e20] border border-[#2d3449] text-[#dae2fd] font-spec-data text-spec-data px-3 rounded-lg focus:border-[#0ea5e9] focus:outline-none"
                    />
                  </div>
                  <div className="bg-[#171f33] border border-[#222a3d] p-4 rounded-xl flex flex-col gap-2">
                    <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase">Torque / Par Motor</span>
                    <input
                      type="text"
                      value={torque}
                      onChange={(e) => setTorque(e.target.value)}
                      className="w-full h-11 bg-[#060e20] border border-[#2d3449] text-[#dae2fd] font-spec-data text-spec-data px-3 rounded-lg focus:border-[#0ea5e9] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-[#bec8d2]">Sistema de Frenos &amp; Pinzas</label>
                    <input
                      type="text"
                      value={brakes}
                      onChange={(e) => setBrakes(e.target.value)}
                      className="w-full h-11 bg-[#060e20] border border-[#2d3449] text-[#dae2fd] px-3.5 rounded-lg focus:border-[#0ea5e9] focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-[#bec8d2]">Configuración de Suspensión</label>
                    <input
                      type="text"
                      value={suspension}
                      onChange={(e) => setSuspension(e.target.value)}
                      className="w-full h-11 bg-[#060e20] border border-[#2d3449] text-[#dae2fd] px-3.5 rounded-lg focus:border-[#0ea5e9] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#89ceff] text-xl">label</span>
                    <h3 className="font-headline-sm text-headline-sm text-[#dae2fd]">Equipamiento &amp; Tags Técnicos</h3>
                  </div>
                  <span className="font-body-sm text-body-sm text-[#88929b]">Presione Enter para añadir tags</span>
                </div>

                <div className="bg-[#060e20] border border-[#2d3449] p-3 rounded-xl flex flex-wrap items-center gap-2 min-h-14">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#222a3d] text-[#dae2fd] font-label-md text-label-md border border-[#3e4850]"
                    >
                      <span className="material-symbols-outlined text-base text-[#89ceff]">check</span>
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(idx)}
                        className="text-[#88929b] hover:text-[#ffb4ab] ml-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag(newTagInput);
                      }
                    }}
                    placeholder="+ Agregar característica..."
                    className="bg-transparent text-[#dae2fd] font-body-md text-body-md px-2 py-1 focus:outline-none flex-1 min-w-40 placeholder:text-[#88929b]/50"
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-label-sm text-label-sm text-[#88929b]">Sugeridos:</span>
                  {[
                    'Embrague Antirrebote A&S',
                    'Iluminación Full LED',
                    'Euro 5+ Certified',
                    'Escape Akrapovič',
                    'Smart Key Y-Connect',
                  ].map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => handleAddTag(sug)}
                      className="text-[#89ceff] hover:text-[#dae2fd] font-label-sm text-label-sm bg-[#171f33] border border-[#222a3d] px-2 py-0.5 rounded transition-colors cursor-pointer"
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-[#171f33] border border-[#222a3d] p-5 rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#93000a]/30 text-[#ffb4ab] flex items-center justify-center">
                      <span className="material-symbols-outlined text-xl">delete_forever</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-[#dae2fd] font-semibold">
                        Zona de Gestión Crítica
                      </span>
                      <span className="font-body-sm text-body-sm text-[#bec8d2]">
                        La remoción del modelo desactivará automáticamente todas las reservas activas.
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDangerBox(!showDangerBox)}
                    className="px-3.5 py-2 rounded-lg bg-[#93000a]/20 hover:bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/30 font-label-md text-label-md flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">warning</span>
                    <span>Eliminar Modelo</span>
                  </button>
                </div>
                {showDangerBox && (
                  <div className="mt-3 p-4 bg-[#060e20] border border-[#93000a]/40 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-body-sm text-body-sm text-[#ffb4ab]">
                      ¿Confirmas eliminar permanentemente esta ficha? Esta acción borrará el historial de precios.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDangerBox(false);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#93000a] text-[#ffdad6] font-label-sm text-label-sm font-bold cursor-pointer shrink-0"
                    >
                      Confirmar Eliminación
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: GALERÍA DE FOTOS */}
          {activeTab === 'gallery' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between bg-[#171f33] border border-[#222a3d] p-4 rounded-xl">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-[#dae2fd]">
                    Gestor Avanzado de Activos Visuales
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#bec8d2]">
                    La primera foto representará la portada en la vitrina pública.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newPhoto = {
                      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvOaaXKcv49SE1DFMPYopbRMSVu71X9bA_SwdlYDqKEhW1YLL78aPUy9A-PkRNQYJTzG7cK2JlOoQL0X7tFqo8Scy6zKsXMhhXjYL-bMtVQo-ccYpzhd067x6SKmqlOoBJqcJDByjfiKwnjlZgz1lIYxGHXL2Bf82zIgeupbKkjDm06iGVvs-sVSumgpMkbCJXP5S1NGfR9ZR8-4B5GE0SArLdDgAOJ5dtXdk6tpAVFGBFL5-Myjtr',
                      title: 'Foto Ángulo Adicional',
                    };
                    if (slides.length < 6) {
                      setSlides([...slides, newPhoto]);
                    }
                  }}
                  className="px-4 py-2 bg-[#0ea5e9] text-[#003751] rounded-lg font-label-md text-label-md font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">upload_file</span>
                  <span>Subir Foto Adicional</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    className="bg-[#060e20] border border-[#222a3d] rounded-xl overflow-hidden shadow-lg p-3 flex flex-col gap-3"
                  >
                    <img src={slide.url} alt={slide.title} className="w-full h-44 object-cover rounded-lg" />
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-[#89ceff] font-bold">
                        0{idx + 1} • {slide.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSlides(slides.filter((_, i) => i !== idx))}
                        className="p-1 text-[#ffb4ab] hover:text-white"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: VARIANTES DE COLOR */}
          {activeTab === 'variants' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between bg-[#171f33] border border-[#222a3d] p-4 rounded-xl">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-[#dae2fd]">
                    Colores de Fábrica &amp; Inventario Físico
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#bec8d2]">
                    Asigne unidades en bodega para cada combinación cromática homologada.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newVar: ColorVariant = {
                      id: `v-${Date.now()}`,
                      name: 'Icon Blue Racing',
                      code: 'IB-2025',
                      stock: 3,
                      transitStock: 1,
                      status: 'disponible',
                      statusText: 'Disponible',
                      colorHex: '#2563eb',
                      secondaryHex: '#94a3b8',
                    };
                    setVariants([...variants, newVar]);
                  }}
                  className="px-3.5 py-2 bg-[#222a3d] hover:bg-[#31394d] border border-[#3e4850] text-[#89ceff] rounded-lg font-label-md text-label-md flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">add_circle</span>
                  <span>+ Nueva Variante de Color</span>
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {variants.map((v) => (
                  <div
                    key={v.id}
                    className="bg-[#060e20] border border-[#222a3d] p-4 rounded-xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        style={{ backgroundColor: v.colorHex }}
                        className="w-8 h-8 rounded-full shadow-md ring-2 ring-[#0ea5e9]"
                      ></div>
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-[#dae2fd] font-bold">
                          {v.name}
                        </span>
                        <span className="font-body-sm text-body-sm text-[#88929b]">
                          Código OEM: {v.code}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-end">
                        <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase">Stock en Piso</span>
                        <span className="font-spec-data text-spec-data text-[#4edea3]">{v.stock} unidades</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setVariants(variants.filter((item) => item.id !== v.id))}
                        className="p-2 rounded-lg bg-[#222a3d] text-[#ffb4ab] hover:bg-[#31394d]"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PRECIOS Y DOCUMENTACIÓN */}
          {activeTab === 'pricing' && (
            <div className="flex flex-col gap-6">
              <div className="bg-[#171f33] border border-[#222a3d] p-4 rounded-xl">
                <h3 className="font-headline-sm text-headline-sm text-[#dae2fd]">
                  Estructura Comercial &amp; Aranceles
                </h3>
                <p className="font-body-sm text-body-sm text-[#bec8d2]">
                  Defina los precios sugeridos al público, cuota de reserva y gastos de matrícula.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#060e20] border border-[#222a3d] p-4 rounded-xl flex flex-col gap-2">
                  <label className="font-label-sm text-label-sm text-[#bec8d2] uppercase">
                    Precio de Venta Contado (PVP COP)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-spec-data text-spec-data text-[#89ceff]">$</span>
                    <input
                      type="number"
                      value={priceRetailCop}
                      onChange={(e) => setPriceRetailCop(Number(e.target.value))}
                      className="w-full h-11 bg-[#131b2e] border border-[#2d3449] text-[#dae2fd] font-spec-data text-spec-data pl-8 pr-3 rounded-lg focus:border-[#0ea5e9] focus:outline-none"
                    />
                  </div>
                  <span className="font-body-sm text-body-sm text-[#88929b]">IVA e impuestos locales incluidos</span>
                </div>

                <div className="bg-[#060e20] border border-[#222a3d] p-4 rounded-xl flex flex-col gap-2">
                  <label className="font-label-sm text-label-sm text-[#bec8d2] uppercase">
                    Monto Mínimo de Apartado (COP)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-spec-data text-spec-data text-[#b4c5ff]">$</span>
                    <input
                      type="number"
                      value={priceReserveCop}
                      onChange={(e) => setPriceReserveCop(Number(e.target.value))}
                      className="w-full h-11 bg-[#131b2e] border border-[#2d3449] text-[#dae2fd] font-spec-data text-spec-data pl-8 pr-3 rounded-lg focus:border-[#0ea5e9] focus:outline-none"
                    />
                  </div>
                  <span className="font-body-sm text-body-sm text-[#88929b]">Bloquea chasis por 5 días hábiles</span>
                </div>

                <div className="bg-[#060e20] border border-[#222a3d] p-4 rounded-xl flex flex-col gap-2">
                  <label className="font-label-sm text-label-sm text-[#bec8d2] uppercase">
                    Gestoría &amp; Placas de Rodaje (COP)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-spec-data text-spec-data text-[#dae2fd]">$</span>
                    <input
                      type="number"
                      value={priceRegistrationCop}
                      onChange={(e) => setPriceRegistrationCop(Number(e.target.value))}
                      className="w-full h-11 bg-[#131b2e] border border-[#2d3449] text-[#dae2fd] font-spec-data text-spec-data pl-8 pr-3 rounded-lg focus:border-[#0ea5e9] focus:outline-none"
                    />
                  </div>
                  <span className="font-body-sm text-body-sm text-[#88929b]">Trámite de SOAT y Registro Público</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Modal Footer */}
        <div className="px-8 py-4 bg-[#171f33] border-t border-[#222a3d] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-lg relative z-10">
          <div className="flex items-center gap-2 text-[#88929b] font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-base">info</span>
            <span>Los cambios publicados se sincronizan al instante en el catálogo público y cotizador web.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] border border-[#3e4850] text-[#dae2fd] font-label-lg text-label-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => handleSaveAndPublish(true)}
              className="px-5 py-2.5 rounded-lg bg-[#060e20] hover:bg-[#131b2e] border border-[#2d3449] text-[#89ceff] font-label-lg text-label-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">bookmark</span>
              <span>Guardar como Borrador</span>
            </button>
            <button
              type="button"
              onClick={() => handleSaveAndPublish(false)}
              className="px-6 py-2.5 rounded-lg bg-[#0ea5e9] hover:bg-[#0053db] text-[#003751] hover:text-[#cdd7ff] font-label-lg text-label-lg font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>Guardar y Publicar en Vitrina</span>
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
