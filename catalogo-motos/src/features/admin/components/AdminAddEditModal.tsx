import React, { useState } from 'react';
import { Motorcycle, BikeStatus, ColorVariant } from '../../../types';
import { Icon } from '../../../components/Icon';

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
        id: '1',
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
        id: '2',
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
      priceDocsCop: priceRetailCop + priceRegistrationCop,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-surface-container-lowest/80 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-5xl my-auto bg-surface-container-low border border-outline-variant rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* Glow Ribbon */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-28 bg-primary/20 blur-3xl pointer-events-none"></div>

        {/* 1. Modal Header */}
        <div className="px-8 py-5 bg-surface-container border-b border-surface-container-high flex items-center justify-between relative z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shadow-sm border border-outline-variant">
              <Icon name="two_wheeler" size={24} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                  {initialBike ? `Editar Modelo: ${initialBike.name}` : 'Agregar Nueva Moto al Catálogo'}
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm flex items-center gap-1.5 shadow-sm border ${
                    status === 'disponible'
                      ? 'bg-tertiary-container text-tertiary border-tertiary/30'
                      : status === 'espera'
                      ? 'bg-primary-container text-primary border-primary/30'
                      : 'bg-surface-container-high text-on-surface-variant border-outline-variant'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      status === 'disponible' ? 'bg-tertiary' : 'bg-primary'
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
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Configure especificaciones mecánicas, multimedia y reglas comerciales del modelo.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadPreset}
              className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest border border-outline text-primary font-label-sm text-label-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Cargar plantilla de prueba Yamaha MT-07"
            >
              <Icon name="auto_fix_high" size={16} />
              <span>Cargar Preset MT-07</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-surface-container-high hover:bg-surface-container-highest border border-outline text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            >
              <Icon name="close" size={18} />
            </button>
          </div>
        </div>

        {/* 2. Navigation Tabs Bar */}
        <div className="px-8 bg-surface-container-lowest border-b border-surface-container flex items-center gap-2 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`px-4 py-3.5 font-label-lg text-label-lg flex items-center gap-2 transition-colors cursor-pointer relative ${
              activeTab === 'general'
                ? 'text-primary bg-surface-container-low'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="tune" size={18} />
            <span>1. Datos Generales &amp; Técnicos</span>
            {activeTab === 'general' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-3.5 font-label-lg text-label-lg flex items-center gap-2 transition-colors cursor-pointer relative ${
              activeTab === 'gallery'
                ? 'text-primary bg-surface-container-low'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="photo_library" size={18} />
            <span>2. Galería de Fotos</span>
            <span className="bg-surface-container-high px-2 py-0.5 rounded-full font-label-sm text-label-sm text-primary">
              {slides.length}/6
            </span>
            {activeTab === 'gallery' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('variants')}
            className={`px-4 py-3.5 font-label-lg text-label-lg flex items-center gap-2 transition-colors cursor-pointer relative ${
              activeTab === 'variants'
                ? 'text-primary bg-surface-container-low'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="palette" size={18} />
            <span>3. Variantes de Color &amp; Stock</span>
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            {activeTab === 'variants' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`px-4 py-3.5 font-label-lg text-label-lg flex items-center gap-2 transition-colors cursor-pointer relative ${
              activeTab === 'pricing'
                ? 'text-primary bg-surface-container-low'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="receipt_long" size={18} />
            <span>4. Precios &amp; Documentación</span>
            {activeTab === 'pricing' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
            )}
          </button>
        </div>

        {/* 3. Scrollable Tab Content Body */}
        <div className="p-8 overflow-y-auto space-y-8 flex-1">
          {/* TAB 1: DATOS GENERALES Y TÉCNICOS */}
          {activeTab === 'general' && (
            <div className="flex flex-col gap-8">
              {/* Master Status Strip */}
              <div className="bg-surface-container border border-surface-container-high p-4 rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Estado de Publicación en Plataforma
                  </span>
                  <span className="font-body-sm text-body-sm text-outline">
                    Determina visibilidad en el portal público y red de concesionarios
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus('disponible')}
                    className={`p-3 rounded-lg border flex items-center gap-3 transition-all cursor-pointer ${
                      status === 'disponible'
                        ? 'bg-tertiary-container/40 border-tertiary text-on-surface'
                        : 'bg-surface-container-high border-transparent text-on-surface-variant'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-tertiary shadow-[0_0_8px_currentColor]"></div>
                    <div className="flex flex-col text-left">
                      <span className="font-label-md text-label-md">Disponible</span>
                      <span className="font-body-sm text-body-sm text-tertiary">Vitrina y cotización</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('agotada')}
                    className={`p-3 rounded-lg border flex items-center gap-3 transition-all cursor-pointer ${
                      status === 'agotada'
                        ? 'bg-outline-variant border-outline text-on-surface'
                        : 'bg-surface-container-high border-transparent text-on-surface-variant'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-outline"></div>
                    <div className="flex flex-col text-left">
                      <span className="font-label-md text-label-md">Agotada Visible</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Solo catálogo</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('espera')}
                    className={`p-3 rounded-lg border flex items-center gap-3 transition-all cursor-pointer ${
                      status === 'espera'
                        ? 'bg-primary-container/40 border-primary text-on-surface'
                        : 'bg-surface-container-high border-transparent text-on-surface-variant'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_currentColor]"></div>
                    <div className="flex flex-col text-left">
                      <span className="font-label-md text-label-md">En Preventa</span>
                      <span className="font-body-sm text-body-sm text-primary">Cupos anticipados</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('revision')}
                    className={`p-3 rounded-lg border flex items-center gap-3 transition-all cursor-pointer ${
                      status === 'revision'
                        ? 'bg-primary/20 border-primary text-on-surface'
                        : 'bg-surface-container-high border-transparent text-on-surface-variant'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                    <div className="flex flex-col text-left">
                      <span className="font-label-md text-label-md">En Revisión</span>
                      <span className="font-body-sm text-body-sm text-primary">No indexado</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Identification */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Icon name="badge" size={20} className="text-primary" />
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Identificación del Vehículo</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4 flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant">Marca Fabricante *</label>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full h-11 bg-surface-container-lowest text-on-surface border border-outline-variant px-3.5 rounded-lg focus:border-primary focus:outline-none"
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
                    <label className="font-label-md text-label-md text-on-surface-variant">Nombre de Modelo &amp; Edición *</label>
                    <input
                      type="text"
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                      placeholder="Ej. MT-07 Pure / SP Carbon Edition"
                      className="w-full h-11 bg-surface-container-lowest text-on-surface border border-outline-variant px-3.5 rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-3 flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant">Año de Fabricación *</label>
                    <select
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="w-full h-11 bg-surface-container-lowest text-on-surface border border-outline-variant px-3.5 rounded-lg focus:border-primary focus:outline-none"
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
                    <Icon name="speed" size={20} className="text-primary" />
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Ficha Técnica &amp; Desempeño</h3>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Unidades Métricas Certificadas
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-surface-container border border-surface-container-high p-4 rounded-xl flex flex-col gap-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Cilindraje</span>
                    <input
                      type="text"
                      value={cc}
                      onChange={(e) => setCc(e.target.value)}
                      className="w-full h-11 bg-surface-container-lowest border border-outline-variant text-on-surface font-spec-data text-spec-data px-3 rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="bg-surface-container border border-surface-container-high p-4 rounded-xl flex flex-col gap-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Potencia Máxima</span>
                    <input
                      type="text"
                      value={power}
                      onChange={(e) => setPower(e.target.value)}
                      className="w-full h-11 bg-surface-container-lowest border border-outline-variant text-on-surface font-spec-data text-spec-data px-3 rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="bg-surface-container border border-surface-container-high p-4 rounded-xl flex flex-col gap-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Peso en Seco</span>
                    <input
                      type="text"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full h-11 bg-surface-container-lowest border border-outline-variant text-on-surface font-spec-data text-spec-data px-3 rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="bg-surface-container border border-surface-container-high p-4 rounded-xl flex flex-col gap-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Torque / Par Motor</span>
                    <input
                      type="text"
                      value={torque}
                      onChange={(e) => setTorque(e.target.value)}
                      className="w-full h-11 bg-surface-container-lowest border border-outline-variant text-on-surface font-spec-data text-spec-data px-3 rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant">Sistema de Frenos &amp; Pinzas</label>
                    <input
                      type="text"
                      value={brakes}
                      onChange={(e) => setBrakes(e.target.value)}
                      className="w-full h-11 bg-surface-container-lowest border border-outline-variant text-on-surface px-3.5 rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant">Configuración de Suspensión</label>
                    <input
                      type="text"
                      value={suspension}
                      onChange={(e) => setSuspension(e.target.value)}
                      className="w-full h-11 bg-surface-container-lowest border border-outline-variant text-on-surface px-3.5 rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="label" size={20} className="text-primary" />
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Equipamiento &amp; Tags Técnicos</h3>
                  </div>
                  <span className="font-body-sm text-body-sm text-outline">Presione Enter para añadir tags</span>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant p-3 rounded-xl flex flex-wrap items-center gap-2 min-h-14">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md border border-outline"
                    >
                      <Icon name="check" size={16} className="text-primary" />
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(idx)}
                        className="text-outline hover:text-error ml-1 cursor-pointer"
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
                    className="bg-transparent text-on-surface font-body-md text-body-md px-2 py-1 focus:outline-none flex-1 min-w-40 placeholder:text-outline/50"
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-label-sm text-label-sm text-outline">Sugeridos:</span>
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
                      className="text-primary hover:text-on-surface font-label-sm text-label-sm bg-surface-container border border-surface-container-high px-2 py-0.5 rounded transition-colors cursor-pointer"
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-surface-container border border-surface-container-high p-5 rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-error/30 text-error flex items-center justify-center">
                      <Icon name="delete_forever" size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                        Zona de Gestión Crítica
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        La remoción del modelo retirará el modelo de la vitrina pública.
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDangerBox(!showDangerBox)}
                    className="px-3.5 py-2 rounded-lg bg-error/20 hover:bg-error/40 text-error border border-error/30 font-label-md text-label-md flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Icon name="warning" size={16} />
                    <span>Eliminar Modelo</span>
                  </button>
                </div>
                {showDangerBox && (
                  <div className="mt-3 p-4 bg-surface-container-lowest border border-error/40 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-body-sm text-body-sm text-error">
                      ¿Confirmas eliminar permanentemente esta ficha? Esta acción borrará el historial de precios.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDangerBox(false);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-error text-on-error-container font-label-sm text-label-sm font-bold cursor-pointer shrink-0"
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
              <div className="flex items-center justify-between bg-surface-container border border-surface-container-high p-4 rounded-xl">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Gestor Avanzado de Activos Visuales
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
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
                  className="px-4 py-2 bg-primary text-on-primary-container rounded-lg font-label-md text-label-md font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Icon name="upload_file" size={16} />
                  <span>Subir Foto Adicional</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    className="bg-surface-container-lowest border border-surface-container-high rounded-xl overflow-hidden shadow-lg p-3 flex flex-col gap-3"
                  >
                    <img src={slide.url} alt={slide.title} className="w-full h-44 object-cover rounded-lg" />
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-primary font-bold">
                        0{idx + 1} • {slide.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSlides(slides.filter((_, i) => i !== idx))}
                        className="p-1 text-error hover:text-white"
                      >
                        <Icon name="delete" size={16} />
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
              <div className="flex items-center justify-between bg-surface-container border border-surface-container-high p-4 rounded-xl">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Colores de Fábrica &amp; Inventario Físico
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
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
                  className="px-3.5 py-2 bg-surface-container-high hover:bg-surface-container-highest border border-outline text-primary rounded-lg font-label-md text-label-md flex items-center gap-2 cursor-pointer"
                >
                  <Icon name="add_circle" size={16} />
                  <span>+ Nueva Variante de Color</span>
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {variants.map((v) => (
                  <div
                    key={v.id}
                    className="bg-surface-container-lowest border border-surface-container-high p-4 rounded-xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        style={{ backgroundColor: v.colorHex }}
                        className="w-8 h-8 rounded-full shadow-md ring-2 ring-primary"
                      ></div>
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-on-surface font-bold">
                          {v.name}
                        </span>
                        <span className="font-body-sm text-body-sm text-outline">
                          Código OEM: {v.code}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-end">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Stock en Piso</span>
                        <span className="font-spec-data text-spec-data text-tertiary">{v.stock} unidades</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setVariants(variants.filter((item) => item.id !== v.id))}
                        className="p-2 rounded-lg bg-surface-container-high text-error hover:bg-surface-container-highest"
                      >
                        <Icon name="delete" size={16} />
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
              <div className="bg-surface-container border border-surface-container-high p-4 rounded-xl">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Estructura Comercial &amp; Aranceles
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Defina los precios sugeridos al público y gastos de matrícula.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest border border-surface-container-high p-4 rounded-xl flex flex-col gap-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Precio de Venta Contado (PVP COP)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-spec-data text-spec-data text-primary">$</span>
                    <input
                      type="number"
                      value={priceRetailCop}
                      onChange={(e) => setPriceRetailCop(Number(e.target.value))}
                      className="w-full h-11 bg-surface-container-low border border-outline-variant text-on-surface font-spec-data text-spec-data pl-8 pr-3 rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                  <span className="font-body-sm text-body-sm text-outline">IVA e impuestos locales incluidos</span>
                </div>

                <div className="bg-surface-container-lowest border border-surface-container-high p-4 rounded-xl flex flex-col gap-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Gestoría &amp; Placas de Rodaje (COP)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-spec-data text-spec-data text-on-surface">$</span>
                    <input
                      type="number"
                      value={priceRegistrationCop}
                      onChange={(e) => setPriceRegistrationCop(Number(e.target.value))}
                      className="w-full h-11 bg-surface-container-low border border-outline-variant text-on-surface font-spec-data text-spec-data pl-8 pr-3 rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                  <span className="font-body-sm text-body-sm text-outline">Trámite de SOAT y Registro Público</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Modal Footer */}
        <div className="px-8 py-4 bg-surface-container border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-lg relative z-10">
          <div className="flex items-center gap-2 text-outline font-body-sm text-body-sm">
            <Icon name="info" size={16} />
            <span>Los cambios publicados se sincronizan al instante en el catálogo público y cotizador web.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest border border-outline text-on-surface font-label-lg text-label-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => handleSaveAndPublish(true)}
              className="px-5 py-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant text-primary font-label-lg text-label-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Icon name="bookmark" size={18} />
              <span>Guardar como Borrador</span>
            </button>
            <button
              type="button"
              onClick={() => handleSaveAndPublish(false)}
              className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary text-on-primary-container hover:text-on-primary font-label-lg text-label-lg font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>Guardar y Publicar en Vitrina</span>
              <Icon name="arrow_forward" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
